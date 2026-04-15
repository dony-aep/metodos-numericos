import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
import {
  CheckCircle2,
  TrendingUp,
  Table2,
  BarChart3,
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
import type { IntegrationResult } from '@/types/numerical-integration';
import { createMathFunction, generateFunctionPoints } from '@/utils/mathParser';

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) < 1e-14) return '0';
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-4 && value !== 0))
    return value.toExponential(6);
  return value.toFixed(8);
}

function IntegrationPlot({ result }: { result: IntegrationResult }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isMobile = useIsMobile();

  const option = useMemo((): EChartsOption => {
    const f = createMathFunction(result.expression);
    const margin = (result.b - result.a) * 0.1;
    const { x: xVals, y: yVals } = generateFunctionPoints(
      f,
      result.a - margin,
      result.b + margin,
      400
    );

    const curveData: [number, number][] = xVals.map((x, i) => [x, yVals[i]]);

    // Area under curve (trapezoid nodes)
    const areaData: [number, number][] = [];
    areaData.push([result.a, 0]);
    for (const node of result.trapezoid.nodes) {
      areaData.push([node.x, node.fx]);
    }
    areaData.push([result.b, 0]);

    // Trapezoid node markers
    const nodeData: [number, number][] = result.trapezoid.nodes.map((n) => [
      n.x,
      n.fx,
    ]);

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
        ? { top: 25, right: 10, bottom: 30, left: 35 }
        : { top: 35, right: 20, bottom: 40, left: 50 },
      xAxis: {
        type: 'value',
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
      series: [
        {
          name: 'f(x)',
          type: 'line',
          data: curveData,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            color: isDark ? '#e4e4e7' : '#3f3f46',
            width: 2.5,
          },
          z: 3,
        },
        {
          name: 'Área (Trapecio)',
          type: 'line',
          data: areaData,
          showSymbol: false,
          lineStyle: {
            color: isDark ? '#a1a1aa' : '#71717a',
            width: 1,
            type: 'dashed',
          },
          areaStyle: {
            color: isDark
              ? 'rgba(161,161,170,0.15)'
              : 'rgba(113,113,122,0.12)',
          },
          z: 1,
        },
        {
          name: 'Nodos',
          type: 'scatter',
          data: nodeData,
          symbolSize: 8,
          itemStyle: {
            color: isDark ? '#e4e4e7' : '#3f3f46',
            borderColor: isDark ? '#fafafa' : '#18181b',
            borderWidth: 2,
          },
          z: 4,
        },
      ],
    };
  }, [result, isDark, isMobile]);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          Gráfica de integración
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

function ConvergencePlot({ result }: { result: IntegrationResult }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isMobile = useIsMobile();

  const option = useMemo((): EChartsOption => {
    const trapData: [number, number][] = result.convergenceStudy.map((r) => [
      r.n,
      r.trapezoid,
    ]);
    const simpData: [number, number][] = result.convergenceStudy
      .filter((r) => r.simpson !== null)
      .map((r) => [r.n, r.simpson!]);

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
        name: 'n (subintervalos)',
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
        name: '∫f(x)dx',
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
      series: [
        {
          name: 'Trapecio',
          type: 'line',
          data: trapData,
          symbolSize: 6,
          lineStyle: {
            color: isDark ? '#a1a1aa' : '#71717a',
            width: 2,
          },
          itemStyle: { color: isDark ? '#a1a1aa' : '#71717a' },
        },
        ...(simpData.length > 0
          ? [
              {
                name: 'Simpson',
                type: 'line' as const,
                data: simpData,
                symbolSize: 6,
                lineStyle: {
                  color: isDark ? '#e4e4e7' : '#3f3f46',
                  width: 2.5,
                },
                itemStyle: {
                  color: isDark ? '#e4e4e7' : '#3f3f46',
                  borderColor: isDark ? '#fafafa' : '#18181b',
                  borderWidth: 2,
                },
              },
            ]
          : []),
      ],
    };
  }, [result, isDark, isMobile]);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Convergencia al aumentar n
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-muted/10 p-2">
          <ReactECharts
            option={option}
            style={{ height: isMobile ? 240 : 300 }}
            notMerge
            lazyUpdate
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function NumericalIntegrationResults({
  result,
}: {
  result: IntegrationResult;
}) {
  const trapError = result.trapezoid.error;
  const simpError = result.simpson?.error ?? null;
  const hasErrors = trapError !== null;

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
              f(x) = {result.expression}
            </Badge>
            <Badge variant="outline" className="font-mono text-xs tabular-nums">
              [{result.a}, {result.b}]
            </Badge>
            <Badge variant="outline" className="font-mono text-xs tabular-nums">
              n = {result.n}
            </Badge>
            <Badge variant="outline" className="font-mono text-xs tabular-nums">
              h = {result.h.toPrecision(4)}
            </Badge>
          </div>

          {/* Method results side by side */}
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Trapecio */}
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Trapecio — <InlineMath math="O(h^2)" />
              </p>
              <p className="font-mono text-lg font-medium tabular-nums">
                {formatNumber(result.trapezoid.value)}
              </p>
              {hasErrors && trapError !== null && (
                <p
                  className={cn(
                    'mt-1 text-xs font-mono tabular-nums',
                    trapError < 1e-6
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : trapError < 1e-2
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-red-600 dark:text-red-400'
                  )}
                >
                  |Error| = {formatNumber(trapError)}
                </p>
              )}
            </div>

            {/* Simpson */}
            {result.simpson ? (
              <div className="rounded-lg border border-border bg-muted/20 p-3">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Simpson 1/3 — <InlineMath math="O(h^4)" />
                </p>
                <p className="font-mono text-lg font-medium tabular-nums">
                  {formatNumber(result.simpson.value)}
                </p>
                {hasErrors && simpError !== null && (
                  <p
                    className={cn(
                      'mt-1 text-xs font-mono tabular-nums',
                      simpError < 1e-6
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : simpError < 1e-2
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-red-600 dark:text-red-400'
                    )}
                  >
                    |Error| = {formatNumber(simpError)}
                  </p>
                )}
              </div>
            ) : (
              <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-800 dark:bg-amber-950/20">
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Simpson requiere un número par de subintervalos (n = {result.n}{' '}
                  es impar).
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gráfica */}
      <IntegrationPlot result={result} />

      {/* Tabla de nodos */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Table2 className="h-4 w-4 text-muted-foreground" />
            Nodos de evaluación
            <Badge variant="secondary" className="ml-auto font-mono text-xs">
              {result.trapezoid.nodes.length} nodos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                    i
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    <InlineMath math="x_i" />
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    <InlineMath math="f(x_i)" />
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    Peso Trap.
                  </TableHead>
                  {result.simpson && (
                    <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                      Peso Simp.
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.trapezoid.nodes.map((node, i) => (
                  <TableRow key={`node-${i}`}>
                    <TableCell className="font-mono tabular-nums text-muted-foreground">
                      {i}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(node.x)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(node.fx)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums text-muted-foreground">
                      {node.weight}
                    </TableCell>
                    {result.simpson && (
                      <TableCell className="text-right font-mono tabular-nums text-muted-foreground">
                        {result.simpson.nodes[i]?.weight ?? '—'}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Convergencia */}
      <ConvergencePlot result={result} />

      {/* Tabla de convergencia */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Estudio de convergencia
            <Badge variant="secondary" className="ml-auto font-mono text-xs">
              n → 2n → 4n → …
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
                    Trapecio
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    Simpson
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.convergenceStudy.map((row, i) => (
                  <TableRow key={`conv-${i}`}>
                    <TableCell className="font-mono tabular-nums text-muted-foreground">
                      {row.n}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(row.trapezoid)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {row.simpson !== null ? formatNumber(row.simpson) : '—'}
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
