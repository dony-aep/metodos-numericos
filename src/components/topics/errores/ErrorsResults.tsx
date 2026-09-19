import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { CheckCircle2, Table2, Activity } from 'lucide-react';
import { useIsMobile } from '@/hooks/useResponsive';
import { InlineMath } from '@/components/shared/MathRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ErrorsResult, TaylorResult } from '@/types/errors';
import { useChartTheme } from '@/lib/chartTheme';
import { ErrorBar } from '@/components/shared/ErrorBar';

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) < 1e-14) return '0';
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-4 && value !== 0))
    return value.toExponential(6);
  return value.toFixed(8);
}

export function ErrorsResults({ errorsResult, taylorResult }: { errorsResult: ErrorsResult | null; taylorResult: TaylorResult | null }) {
  if (errorsResult) return <ErrorsSummary result={errorsResult} />;
  if (taylorResult) return <TaylorResults result={taylorResult} />;
  return null;
}

function ErrorsSummary({ result }: { result: ErrorsResult }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          Resultados del análisis de error
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard label="Valor exacto" value={formatNumber(result.exactValue)} />
          <MetricCard label="Valor aproximado" value={formatNumber(result.approxValue)} />
          <MetricCard label="Error absoluto" value={formatNumber(result.absoluteError)} formula="E_a = |x - \tilde{x}|" />
          <MetricCard label="Error relativo" value={formatNumber(result.relativeError)} formula="E_r = E_a / |x|" />
          <MetricCard label="Error porcentual" value={`${result.percentageError.toFixed(4)}%`} formula="E_\% = E_r \times 100" />
          <MetricCard label="Cifras significativas" value={String(result.significantDigits)} />
        </div>
      </CardContent>
    </Card>
  );
}

function MetricCard({ label, value, formula }: { label: string; value: string; formula?: string }) {
  return (
    <div className="border-y border-rule py-4 space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="font-mono text-2xl tracking-tight sm:text-[1.75rem]">{value}</p>
      {formula && (
        <div className="pt-1">
          <InlineMath math={formula} />
        </div>
      )}
    </div>
  );
}

function TaylorResults({ result }: { result: TaylorResult }) {
  const chart = useChartTheme();
  const isMobile = useIsMobile();

  const chartOption = useMemo((): EChartsOption => {
    const data: [number, number][] = result.terms.map((t) => [t.n, t.error]);

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: chart.tooltipBg,
        borderColor: chart.grid,
        textStyle: { color: chart.text, fontSize: 12 },
      },
      grid: { top: 40, right: 20, bottom: 40, left: isMobile ? 50 : 60 },
      xAxis: {
        type: 'category',
        data: result.terms.map((t) => `n=${t.n}`),
        name: 'Grado',
        nameLocation: 'middle',
        nameGap: 25,
        axisLine: { lineStyle: { color: chart.axis } },
        axisLabel: { color: chart.label, fontSize: 11 },
        splitLine: { lineStyle: { color: chart.grid } },
      },
      yAxis: {
        type: 'log',
        name: 'Error',
        nameLocation: 'middle',
        nameGap: isMobile ? 35 : 45,
        axisLine: { lineStyle: { color: chart.axis } },
        axisLabel: { color: chart.label, fontSize: 11 },
        splitLine: { lineStyle: { color: chart.grid } },
      },
      series: [
        {
          type: 'line',
          data: data.map((d) => d[1] || 1e-16),
          smooth: true,
          lineStyle: { width: 2 },
          itemStyle: { color: chart.series },
          areaStyle: { color: chart.seriesSoft },
        },
      ],
    };
  }, [result, chart, isMobile]);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            Aproximación de Taylor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard label="Valor exacto f(x)" value={formatNumber(result.exactValue)} />
            <MetricCard
              label={`Aprox. grado ${result.terms[result.terms.length - 1]?.n ?? 0}`}
              value={formatNumber(result.terms[result.terms.length - 1]?.approximation ?? 0)}
            />
            <MetricCard
              label="Error final"
              value={formatNumber(result.terms[result.terms.length - 1]?.error ?? 0)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table2 className="h-4 w-4 text-muted-foreground" />
            Tabla de convergencia
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Grado n</TableHead>
                <TableHead>Aproximación</TableHead>
                <TableHead>Error absoluto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.terms.map((t) => (
                <TableRow key={t.n}>
                  <TableCell className="font-mono">{t.n}</TableCell>
                  <TableCell className="font-mono">{formatNumber(t.approximation)}</TableCell>
                  <TableCell>
                    <ErrorBar error={t.error} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            Convergencia del error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReactECharts
            option={chartOption}
            style={{ height: isMobile ? 250 : 320, width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
