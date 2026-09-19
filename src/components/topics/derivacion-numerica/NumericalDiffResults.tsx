import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import {
  CheckCircle2,
  TrendingDown,
  Table2,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useResponsive';
import { InlineMath } from '@/components/shared/MathRenderer';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { NumericalDiffResult } from '@/types/numerical-diff';
import { useChartTheme } from '@/lib/chartTheme';

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) < 1e-14) return '0';
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-4 && value !== 0))
    return value.toExponential(6);
  return value.toFixed(8);
}

function formatH(value: number): string {
  if (value >= 0.001) return value.toPrecision(4);
  return value.toExponential(2);
}

function ConvergencePlot({
  result,
}: {
  result: NumericalDiffResult;
}) {
  const chart = useChartTheme();
  const isMobile = useIsMobile();

  const option = useMemo((): EChartsOption => {
    const fwdData: [number, number][] = [];
    const bwdData: [number, number][] = [];
    const ctrData: [number, number][] = [];

    for (const entry of result.convergenceStudy) {
      const logH = Math.log10(entry.h);
      fwdData.push([logH, entry.forward]);
      bwdData.push([logH, entry.backward]);
      ctrData.push([logH, entry.centered]);
    }

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: chart.tooltipBg,
        borderColor: chart.grid,
        textStyle: {
          color: chart.text,
          fontSize: 12,
        },
        formatter: (params: unknown) => {
          const items = params as { seriesName: string; value: [number, number]; marker: string }[];
          if (!Array.isArray(items) || items.length === 0) return '';
          const h = Math.pow(10, items[0].value[0]);
          let html = `<strong>h = ${formatH(h)}</strong><br/>`;
          for (const item of items) {
            html += `${item.marker} ${item.seriesName}: ${formatNumber(item.value[1])}<br/>`;
          }
          return html;
        },
      },
      legend: {
        top: 0,
        textStyle: { color: chart.label, fontSize: 11 },
      },
      grid: isMobile
        ? { top: 25, right: 10, bottom: 30, left: 40 }
        : { top: 35, right: 20, bottom: 40, left: 55 },
      xAxis: {
        type: 'value',
        name: 'log₁₀(h)',
        nameLocation: 'center',
        nameGap: 25,
        nameTextStyle: { color: chart.label, fontSize: 11 },
        axisLine: {
          lineStyle: { color: chart.axis },
        },
        splitLine: {
          lineStyle: {
            color: chart.grid,
            type: 'dashed',
          },
        },
        axisLabel: {
          color: chart.label,
          fontSize: 11,
        },
      },
      yAxis: {
        type: 'value',
        name:"f'(x)",
        nameTextStyle: { color: chart.label, fontSize: 11 },
        axisLine: {
          lineStyle: { color: chart.axis },
        },
        splitLine: {
          lineStyle: {
            color: chart.grid,
            type: 'dashed',
          },
        },
        axisLabel: {
          color: chart.label,
          fontSize: 11,
        },
      },
      series: [
        {
          name: 'Adelante',
          type: 'line',
          data: fwdData,
          symbolSize: 6,
          lineStyle: { color: chart.series, width: 2 },
          itemStyle: { color: chart.series },
        },
        {
          name: 'Atrás',
          type: 'line',
          data: bwdData,
          symbolSize: 6,
          lineStyle: {
            color: chart.palette[1],
            width: 2,
            type: 'dashed',
          },
          itemStyle: { color: chart.palette[1] },
        },
        {
          name: 'Centrada',
          type: 'line',
          data: ctrData,
          symbolSize: 6,
          lineStyle: {
            color: chart.palette[2],
            width: 2.5,
            type: 'dotted',
          },
          itemStyle: {
            color: chart.palette[2],
            borderColor: chart.text,
            borderWidth: 2,
          },
        },
      ],
    };
  }, [result, chart, isMobile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
          Convergencia al refinar h
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <ReactECharts
            option={option}
            style={{ height: isMobile ? 250 : 320 }}
            notMerge
            lazyUpdate
          opts={{ renderer: 'svg' }}
        />
        </div>
      </CardContent>
    </Card>
  );
}

export function NumericalDiffReadout({
  result,
}: {
  result: NumericalDiffResult;
}) {
  const secondDerivApprox = result.approximations.filter(
    (a) => a.method === 'second-centered'
  );

  return (
    <div className="space-y-8">
      {/* Resumen */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Resultado
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="outline" className="font-mono text-xs tabular-nums">
            f(x) = {result.expression}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs tabular-nums">
            x = {result.x}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs tabular-nums">
            h = {result.h}
          </Badge>
        </CardContent>
      </Card>
      {/* Segunda derivada */}
      {secondDerivApprox.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              Segunda derivada — <InlineMath math="f''(x)" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {secondDerivApprox.map((a) => (
                <div
                  key={a.method}
                  className="flex items-center justify-between border-b border-rule py-2.5"
                >
                  <div>
                    <p className="text-sm font-medium">{a.label}</p>
                    <p className="text-xs text-muted-foreground">{a.order}</p>
                  </div>
                  <span className="font-mono text-sm tabular-nums font-medium">
                    {formatNumber(a.value)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function NumericalDiffPlots({
  result,
}: {
  result: NumericalDiffResult;
}) {
  return (
    <div>
      {/* Gráfica de convergencia */}
      <ConvergencePlot result={result} />
    </div>
  );
}

export function NumericalDiffTables({
  result,
}: {
  result: NumericalDiffResult;
}) {
  const hasErrors = result.approximations.some((a) => a.error !== null);
  const firstDerivApprox = result.approximations.filter(
    (a) => a.method !== 'second-centered'
  );

  return (
    <div className="space-y-10">
      {/* Primera derivada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            Primera derivada — <InlineMath math="f'(x)" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Método
                  </TableHead>
                  <TableHead>
                    Orden
                  </TableHead>
                  <TableHead className="text-right">
                    Valor
                  </TableHead>
                  {hasErrors && (
                    <TableHead className="text-right">
                      |Error|
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {firstDerivApprox.map((a) => (
                  <TableRow key={a.method}>
                    <TableCell className="font-medium">{a.label}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {a.order}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(a.value)}
                    </TableCell>
                    {hasErrors && (
                      <TableCell
                        className={cn(
                          'text-right font-mono tabular-nums',
                          a.error !== null && a.error < 1e-6
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : ''
                        )}
                      >
                        {a.error !== null ? formatNumber(a.error) : '—'}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Tabla de convergencia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table2 className="h-4 w-4 text-muted-foreground" />
            Estudio de convergencia
            <Badge variant="secondary" className="ml-auto font-mono text-xs">
              h → h/2 → h/4 → …
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    h
                  </TableHead>
                  <TableHead className="text-right">
                    Adelante
                  </TableHead>
                  <TableHead className="text-right">
                    Atrás
                  </TableHead>
                  <TableHead className="text-right">
                    Centrada
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.convergenceStudy.map((row, i) => (
                  <TableRow key={`conv-${i}`}>
                    <TableCell className="font-mono text-xs tabular-nums text-muted-foreground">
                      {formatH(row.h)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(row.forward)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(row.backward)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(row.centered)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
