import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
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

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) < 1e-14) return '0';
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-4 && value !== 0))
    return value.toExponential(6);
  return value.toFixed(6);
}

function SolutionPlot({ result }: { result: EulerResult }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
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
          color: isDark ? '#a1a1aa' : '#71717a',
          width: 2,
        },
        itemStyle: {
          color: isDark ? '#a1a1aa' : '#71717a',
          borderColor: isDark ? '#d4d4d8' : '#52525b',
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
          color: isDark ? '#e4e4e7' : '#3f3f46',
          width: 2.5,
        },
        z: 2,
      });
    }

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: isDark
          ? 'rgba(15,23,42,0.96)'
          : 'rgba(255,255,255,0.95)',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        textStyle: {
          color: isDark ? '#e2e8f0' : '#334155',
          fontSize: 12,
        },
      },
      legend: {
        top: 0,
        textStyle: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 11 },
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
          color: isDark ? '#cbd5e1' : '#64748b',
          fontSize: 11,
        },
        axisLine: {
          lineStyle: { color: isDark ? '#64748b' : '#94a3b8' },
        },
        splitLine: {
          lineStyle: {
            color: isDark ? '#334155' : '#e2e8f0',
            type: 'dashed',
          },
        },
        axisLabel: {
          color: isDark ? '#cbd5e1' : '#64748b',
          fontSize: 11,
        },
      },
      yAxis: {
        type: 'value',
        name: 'y',
        nameTextStyle: {
          color: isDark ? '#cbd5e1' : '#64748b',
          fontSize: 11,
        },
        axisLine: {
          lineStyle: { color: isDark ? '#64748b' : '#94a3b8' },
        },
        splitLine: {
          lineStyle: {
            color: isDark ? '#334155' : '#e2e8f0',
            type: 'dashed',
          },
        },
        axisLabel: {
          color: isDark ? '#cbd5e1' : '#64748b',
          fontSize: 11,
        },
      },
      series,
    };
  }, [result, isDark, isMobile]);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Curva solución
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-muted/10 p-2">
          <ReactECharts
            option={option}
            style={{ height: isMobile ? 260 : 350 }}
            notMerge
            lazyUpdate
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function EulerResults({ result }: { result: EulerResult }) {
  const hasExact = result.data.some((s) => s.exactY !== null);
  const lastStep = result.data[result.data.length - 1];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Resumen */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
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
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Valor final — <InlineMath math={`y(${formatNumber(lastStep.x)})`} />
              </p>
              <p className="font-mono text-lg font-medium tabular-nums">
                {formatNumber(lastStep.y)}
              </p>
            </div>
            {hasExact && lastStep.exactY !== null && (
              <div className="rounded-lg border border-border bg-muted/20 p-3">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Valor exacto
                </p>
                <p className="font-mono text-lg font-medium tabular-nums">
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

      {/* Gráfica */}
      <SolutionPlot result={result} />

      {/* Tabla de iteraciones */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Table2 className="h-4 w-4 text-muted-foreground" />
            Tabla de iteraciones
            <Badge variant="secondary" className="ml-auto font-mono text-xs">
              {result.data.length} puntos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                    n
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    <InlineMath math="x_n" />
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    <InlineMath math="y_n" />
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    <InlineMath math="f(x_n, y_n)" />
                  </TableHead>
                  {hasExact && (
                    <>
                      <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                        Exacta
                      </TableHead>
                      <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
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
