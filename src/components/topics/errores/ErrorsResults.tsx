import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
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
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
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
    <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-mono text-lg font-semibold text-foreground">{value}</p>
      {formula && (
        <div className="pt-1">
          <InlineMath math={formula} />
        </div>
      )}
    </div>
  );
}

function TaylorResults({ result }: { result: TaylorResult }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isMobile = useIsMobile();

  const chartOption = useMemo((): EChartsOption => {
    const data: [number, number][] = result.terms.map((t) => [t.n, t.error]);

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: isDark ? 'rgba(15,23,42,0.96)' : 'rgba(255,255,255,0.95)',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        textStyle: { color: isDark ? '#e2e8f0' : '#334155', fontSize: 12 },
      },
      grid: { top: 40, right: 20, bottom: 40, left: isMobile ? 50 : 60 },
      xAxis: {
        type: 'category',
        data: result.terms.map((t) => `n=${t.n}`),
        name: 'Grado',
        nameLocation: 'middle',
        nameGap: 25,
        axisLine: { lineStyle: { color: isDark ? '#475569' : '#cbd5e1' } },
        axisLabel: { color: isDark ? '#94a3b8' : '#64748b', fontSize: 11 },
      },
      yAxis: {
        type: 'log',
        name: 'Error',
        nameLocation: 'middle',
        nameGap: isMobile ? 35 : 45,
        axisLine: { lineStyle: { color: isDark ? '#475569' : '#cbd5e1' } },
        axisLabel: { color: isDark ? '#94a3b8' : '#64748b', fontSize: 11 },
        splitLine: { lineStyle: { color: isDark ? '#1e293b' : '#f1f5f9' } },
      },
      series: [
        {
          type: 'line',
          data: data.map((d) => d[1] || 1e-16),
          smooth: true,
          lineStyle: { width: 2 },
          itemStyle: { color: isDark ? '#60a5fa' : '#3b82f6' },
          areaStyle: { color: isDark ? 'rgba(96,165,250,0.08)' : 'rgba(59,130,246,0.06)' },
        },
      ],
    };
  }, [result, isDark, isMobile]);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
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
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
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
                  <TableCell className="font-mono">{formatNumber(t.error)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
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
