import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import {
  CheckCircle2,
  LineChart as LineChartIcon,
  Scale,
  Sigma,
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
import type { LagrangeResult } from '@/types/lagrange';
import { useChartTheme } from '@/lib/chartTheme';

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) < 1e-10) return '0';
  if (Math.abs(value) >= 1e4 || (Math.abs(value) < 1e-4 && value !== 0))
    return value.toExponential(4);
  return value.toFixed(6);
}

function LagrangePlot({ result }: { result: LagrangeResult }) {
  const chart = useChartTheme();
  const isMobile = useIsMobile();

  const option = useMemo((): EChartsOption => {
    const curveData: [number, number][] = result.polynomialPoints.map((p) => [
      p.x,
      p.y,
    ]);
    const pointData: [number, number][] = result.points.map((p) => [p.x, p.y]);
    const evalData: [number, number][] =
      result.evaluateAt !== null && result.evaluatedValue !== null
        ? [[result.evaluateAt, result.evaluatedValue]]
        : [];

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: chart.tooltipBg,
        borderColor: chart.grid,
        textStyle: {
          color: chart.text,
          fontSize: 12,
        },
      },
      grid: isMobile
        ? { top: 30, right: 10, bottom: 30, left: 35 }
        : { top: 40, right: 20, bottom: 40, left: 50 },
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
          name: 'P(x)',
          type: 'line',
          data: curveData,
          smooth: false,
          showSymbol: false,
          lineStyle: {
            color: chart.series,
            width: 2,
          },
        },
        {
          name: 'Datos',
          type: 'scatter',
          data: pointData,
          symbolSize: 10,
          itemStyle: {
            color: chart.neutralSeries,
            borderColor: chart.text,
            borderWidth: 2,
          },
        },
        ...(evalData.length > 0
          ? [
              {
                name: 'Evaluación',
                type: 'scatter' as const,
                data: evalData,
                symbolSize: 14,
                symbol: 'diamond',
                itemStyle: {
                  color: chart.palette[2],
                  borderColor: chart.palette[2],
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
          <LineChartIcon className="h-4 w-4 text-muted-foreground" />
          Gráfica del polinomio de Lagrange
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

export function LagrangeReadout({ result }: { result: LagrangeResult }) {
  return (
    <div className="space-y-8">
      {/* Diagnóstico */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Resultado
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge
            className="text-xs text-emerald-700 dark:text-emerald-300"
            variant="outline"
          >
            Grado {result.n}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs tabular-nums">
            {result.points.length} puntos
          </Badge>
          {result.evaluateAt !== null && result.evaluatedValue !== null ? (
            <Badge
              className="text-xs text-emerald-700 dark:text-emerald-300"
              variant="outline"
            >
              P({formatNumber(result.evaluateAt)}) ={' '}
              {formatNumber(result.evaluatedValue)}
            </Badge>
          ) : null}
        </CardContent>
      </Card>
      {/* Forma explícita del polinomio */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            Forma del polinomio de Lagrange
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-sm">
            <span className="font-medium">
              P<sub>{result.n}</sub>(x) =
            </span>
            {result.points.map((pt, k) => {
              const sign = pt.y >= 0 ? (k > 0 ? ' + ' : '') : ' − ';
              const absY = Math.abs(pt.y);
              return (
                <span
                  key={`term-${k}`}
                  className="font-mono tabular-nums whitespace-nowrap"
                >
                  {sign}
                  {formatNumber(absY)} · L<sub>{k}</sub>(x)
                </span>
              );
            })}
          </div>

          {/* Bases as small cards */}
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {result.points.map((_, k) => {
              const factors = result.points
                .filter((__, j) => j !== k)
                .map(
                  (pj) =>
                    `(x − ${pj.x})`
                )
                .join('');
              const denom = result.points
                .filter((__, j) => j !== k)
                .map(
                  (pj) =>
                    `(${result.points[k].x} − ${pj.x})`
                )
                .join('');
              return (
                <div
                  key={`lk-${k}`}
                  className="border-b border-rule py-2.5"
                >
                  <p className="mb-1 text-xs text-muted-foreground">
                    <InlineMath math={`L_{${k}}(x)`} />
                  </p>
                  <p className="font-mono text-[11px] tabular-nums leading-relaxed break-all">
                    {factors} / {denom}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function LagrangePlots({ result }: { result: LagrangeResult }) {
  return (
    <div>
      {/* Gráfica */}
      <LagrangePlot result={result} />
    </div>
  );
}

export function LagrangeTables({ result }: { result: LagrangeResult }) {
  const hasBases = result.bases.length > 0;

  return (
    <div className="space-y-10">
      {/* Pesos baricéntricos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-muted-foreground" />
            Pesos baricéntricos
            <Badge
              variant="secondary"
              className="ml-auto font-mono text-xs"
            >
              {result.weights.length} nodos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    j
                  </TableHead>
                  <TableHead className="text-right">
                    x<sub>j</sub>
                  </TableHead>
                  <TableHead className="text-right">
                    y<sub>j</sub>
                  </TableHead>
                  <TableHead className="text-right">
                    w<sub>j</sub>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.points.map((pt, j) => (
                  <TableRow key={`w-${j}`}>
                    <TableCell className="font-mono tabular-nums text-muted-foreground">
                      {j}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(pt.x)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(pt.y)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums font-medium">
                      {formatNumber(result.weights[j])}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Bases de Lagrange (solo si hubo evaluación) */}
      {hasBases ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sigma className="h-4 w-4 text-muted-foreground" />
              Bases de Lagrange en{' '}
              <InlineMath math={`x = ${formatNumber(result.evaluateAt!)}`} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      k
                    </TableHead>
                    <TableHead className="text-right">
                      L<sub>k</sub>(x)
                    </TableHead>
                    <TableHead className="text-right">
                      y<sub>k</sub>
                    </TableHead>
                    <TableHead className="text-right">
                      y<sub>k</sub> · L<sub>k</sub>(x)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.bases.map((b) => (
                    <TableRow key={`b-${b.k}`}>
                      <TableCell className="font-mono tabular-nums text-muted-foreground">
                        {b.k}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        {formatNumber(b.value)}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        {formatNumber(result.points[b.k].y)}
                      </TableCell>
                      <TableCell
                        className={cn(
                          'text-right font-mono tabular-nums font-medium',
                          Math.abs(b.contribution) > 1e-10
                            ? ''
                            : 'text-muted-foreground'
                        )}
                      >
                        {formatNumber(b.contribution)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Total row */}
                  <TableRow className="border-t-2 bg-muted/10">
                    <TableCell
                      colSpan={3}
                      className="text-right"
                    >
                      Σ
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums font-bold">
                      {formatNumber(result.evaluatedValue!)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
