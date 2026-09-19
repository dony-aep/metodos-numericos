import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
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
import { useChartTheme } from '@/lib/chartTheme';

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) < 1e-14) return '0';
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-4 && value !== 0))
    return value.toExponential(6);
  return value.toFixed(8);
}

function IntegrationPlot({ result }: { result: IntegrationResult }) {
  const chart = useChartTheme();
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
        ? { top: 25, right: 10, bottom: 30, left: 35 }
        : { top: 35, right: 20, bottom: 40, left: 50 },
      xAxis: {
        type: 'value',
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
          name: 'f(x)',
          type: 'line',
          data: curveData,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            color: chart.series,
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
            color: chart.palette[1],
            width: 1,
            type: 'dashed',
          },
          areaStyle: {
            color: chart.isDark
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
            color: chart.palette[1],
            borderColor: chart.text,
            borderWidth: 2,
          },
          z: 4,
        },
      ],
    };
  }, [result, chart, isMobile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          Gráfica de integración
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

function ConvergencePlot({ result }: { result: IntegrationResult }) {
  const chart = useChartTheme();
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
        name: 'n (subintervalos)',
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
        name: '∫f(x)dx',
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
      series: [
        {
          name: 'Trapecio',
          type: 'line',
          data: trapData,
          symbolSize: 6,
          lineStyle: {
            color: chart.series,
            width: 2,
          },
          itemStyle: { color: chart.series },
        },
        ...(simpData.length > 0
          ? [
              {
                name: 'Simpson',
                type: 'line' as const,
                data: simpData,
                symbolSize: 6,
                lineStyle: {
                  color: chart.neutralSeries,
                  width: 2.5,
                  type: 'dashed' as const,
                },
                itemStyle: {
                  color: chart.neutralSeries,
                  borderColor: chart.text,
                  borderWidth: 2,
                },
              },
            ]
          : []),
      ],
    };
  }, [result, chart, isMobile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Convergencia al aumentar n
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <ReactECharts
            option={option}
            style={{ height: isMobile ? 240 : 300 }}
            notMerge
            lazyUpdate
          opts={{ renderer: 'svg' }}
        />
        </div>
      </CardContent>
    </Card>
  );
}

export function NumericalIntegrationReadout({
  result,
}: {
  result: IntegrationResult;
}) {
  const trapError = result.trapezoid.error;
  const simpError = result.simpson?.error ?? null;
  const hasErrors = trapError !== null;

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
            <div className="border-y border-rule py-4">
              <p className="mb-2 text-xs text-muted-foreground">
                Trapecio — <InlineMath math="O(h^2)" />
              </p>
              <p className="font-mono text-2xl tracking-tight sm:text-[1.75rem]">
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
              <div className="border-y border-rule py-4">
                <p className="mb-2 text-xs text-muted-foreground">
                  Simpson 1/3 — <InlineMath math="O(h^4)" />
                </p>
                <p className="font-mono text-2xl tracking-tight sm:text-[1.75rem]">
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
              <div className="border-y border-rule py-4">
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Simpson requiere un número par de subintervalos (n = {result.n}{' '}
                  es impar).
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function NumericalIntegrationPlots({
  result,
}: {
  result: IntegrationResult;
}) {
  return (
    <div className="grid gap-8 xl:grid-cols-2">
      {/* Gráfica */}
      <IntegrationPlot result={result} />
      {/* Convergencia */}
      <ConvergencePlot result={result} />
    </div>
  );
}

export function NumericalIntegrationTables({
  result,
}: {
  result: IntegrationResult;
}) {
  return (
    <div className="space-y-10">
      {/* Tabla de nodos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table2 className="h-4 w-4 text-muted-foreground" />
            Nodos de evaluación
            <Badge variant="secondary" className="ml-auto font-mono text-xs">
              {result.trapezoid.nodes.length} nodos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    i
                  </TableHead>
                  <TableHead className="text-right">
                    <InlineMath math="x_i" />
                  </TableHead>
                  <TableHead className="text-right">
                    <InlineMath math="f(x_i)" />
                  </TableHead>
                  <TableHead className="text-right">
                    Peso Trap.
                  </TableHead>
                  {result.simpson && (
                    <TableHead className="text-right">
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
      {/* Tabla de convergencia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Estudio de convergencia
            <Badge variant="secondary" className="ml-auto font-mono text-xs">
              n → 2n → 4n → …
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
                    Trapecio
                  </TableHead>
                  <TableHead className="text-right">
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
