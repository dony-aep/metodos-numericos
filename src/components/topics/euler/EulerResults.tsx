import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import {
  CheckCircle2,
  TrendingUp,
  Table2,
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
import type { EulerResult } from '@/types/euler';
import { useChartTheme } from '@/lib/chartTheme';

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) < 1e-14) return '0';
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-4 && value !== 0))
    return value.toExponential(6);
  return value.toFixed(6);
}

function SolutionPlot({ result }: { result: EulerResult }) {
  const chart = useChartTheme();
  const isMobile = useIsMobile();

  const option = useMemo((): EChartsOption => {
    const eulerData: [number, number][] = result.data.map((s) => [s.x, s.y]);
    const hasExact = result.data.some((s) => s.exactY !== null);

    const series: EChartsOption['series'] = [
      {
        name: 'Euler',
        type: 'line',
        data: eulerData,
        symbolSize: 8,
        lineStyle: {
          color: chart.series,
          width: 2,
        },
        itemStyle: {
          color: chart.series,
          borderColor: chart.series,
          borderWidth: 2,
        },
      },
    ];

    if (hasExact) {
      // Generate denser exact curve for smooth appearance
      const exactData: [number, number][] = result.data
        .filter((s) => s.exactY !== null)
        .map((s) => [s.x, s.exactY!]);

      series.push({
        name: 'Exacta',
        type: 'line',
        data: exactData,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: chart.neutralSeries,
          width: 2.5,
          type: 'dashed',
        },
        z: 2,
      });
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
        name: 'x',
        nameLocation: 'center',
        nameGap: 25,
        nameTextStyle: {
          color: chart.label,
          fontSize: 11,
        },
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
        name: 'y',
        nameTextStyle: {
          color: chart.label,
          fontSize: 11,
        },
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
      series,
    };
  }, [result, chart, isMobile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Curva solución
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <ReactECharts
            option={option}
            style={{ height: isMobile ? 260 : 350 }}
            notMerge
            lazyUpdate
          opts={{ renderer: 'svg' }}
        />
        </div>
      </CardContent>
    </Card>
  );
}

export function EulerReadout({ result }: { result: EulerResult }) {
  const hasExact = result.data.some((s) => s.exactY !== null);
  const lastStep = result.data[result.data.length - 1];

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
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-xs tabular-nums">
              y' = {result.expression}
            </Badge>
            <Badge variant="outline" className="font-mono text-xs tabular-nums">
              y({result.x0}) = {result.y0}
            </Badge>
            <Badge variant="outline" className="font-mono text-xs tabular-nums">
              h = {result.h}
            </Badge>
            <Badge variant="outline" className="font-mono text-xs tabular-nums">
              {result.steps} pasos
            </Badge>
          </div>

          {/* Final value */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border-y border-rule py-4">
              <p className="mb-2 text-xs text-muted-foreground">
                Valor final — <InlineMath math={`y(${formatNumber(lastStep.x)})`} />
              </p>
              <p className="font-mono text-2xl tracking-tight sm:text-[1.75rem]">
                {formatNumber(lastStep.y)}
              </p>
            </div>
            {hasExact && lastStep.exactY !== null && (
              <div className="border-y border-rule py-4">
                <p className="mb-2 text-xs text-muted-foreground">
                  Valor exacto
                </p>
                <p className="font-mono text-2xl tracking-tight sm:text-[1.75rem]">
                  {formatNumber(lastStep.exactY)}
                </p>
                {lastStep.error !== null && (
                  <p
                    className={cn(
                      'mt-1 text-xs font-mono tabular-nums',
                      lastStep.error < 1e-4
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : lastStep.error < 0.1
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-red-600 dark:text-red-400'
                    )}
                  >
                    |Error| = {formatNumber(lastStep.error)}
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function EulerPlots({ result }: { result: EulerResult }) {
  return (
    <div>
      {/* Gráfica */}
      <SolutionPlot result={result} />
    </div>
  );
}

export function EulerTables({ result }: { result: EulerResult }) {
  const hasExact = result.data.some((s) => s.exactY !== null);

  return (
    <div className="space-y-10">
      {/* Tabla de iteraciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table2 className="h-4 w-4 text-muted-foreground" />
            Tabla de iteraciones
            <Badge variant="secondary" className="ml-auto font-mono text-xs">
              {result.data.length} puntos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    n
                  </TableHead>
                  <TableHead className="text-right">
                    <InlineMath math="x_n" />
                  </TableHead>
                  <TableHead className="text-right">
                    <InlineMath math="y_n" />
                  </TableHead>
                  <TableHead className="text-right">
                    <InlineMath math="f(x_n, y_n)" />
                  </TableHead>
                  {hasExact && (
                    <>
                      <TableHead className="text-right">
                        Exacta
                      </TableHead>
                      <TableHead className="text-right">
                        |Error|
                      </TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.data.map((step) => (
                  <TableRow key={`step-${step.n}`}>
                    <TableCell className="font-mono tabular-nums text-muted-foreground">
                      {step.n}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(step.x)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(step.y)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(step.slope)}
                    </TableCell>
                    {hasExact && (
                      <>
                        <TableCell className="text-right font-mono tabular-nums">
                          {step.exactY !== null
                            ? formatNumber(step.exactY)
                            : '—'}
                        </TableCell>
                        <TableCell
                          className={cn(
                            'text-right font-mono tabular-nums',
                            step.error !== null && step.error < 1e-4
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : ''
                          )}
                        >
                          {step.error !== null
                            ? formatNumber(step.error)
                            : '—'}
                        </TableCell>
                      </>
                    )}
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
