import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
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

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) < 1e-10) return '0';
  if (Math.abs(value) >= 1e4 || (Math.abs(value) < 1e-4 && value !== 0))
    return value.toExponential(4);
  return value.toFixed(6);
}

function LagrangePlot({ result }: { result: LagrangeResult }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
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
        backgroundColor: isDark
          ? 'rgba(15,23,42,0.96)'
          : 'rgba(255,255,255,0.95)',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        textStyle: {
          color: isDark ? '#e2e8f0' : '#334155',
          fontSize: 12,
        },
      },
      grid: isMobile
        ? { top: 30, right: 10, bottom: 30, left: 35 }
        : { top: 40, right: 20, bottom: 40, left: 50 },
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
          name: 'P(x)',
          type: 'line',
          data: curveData,
          smooth: false,
          showSymbol: false,
          lineStyle: {
            color: isDark ? '#a1a1aa' : '#71717a',
            width: 2,
          },
        },
        {
          name: 'Datos',
          type: 'scatter',
          data: pointData,
          symbolSize: 10,
          itemStyle: {
            color: isDark ? '#e4e4e7' : '#3f3f46',
            borderColor: isDark ? '#fafafa' : '#18181b',
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
                  color: isDark ? '#34d399' : '#10b981',
                  borderColor: isDark ? '#6ee7b7' : '#059669',
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
          <LineChartIcon className="h-4 w-4 text-muted-foreground" />
          Gráfica del polinomio de Lagrange
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

export function LagrangeResults({ result }: { result: LagrangeResult }) {
  const hasBases = result.bases.length > 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Diagnóstico */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Resultado
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge
            className="border-emerald-200 bg-emerald-50 text-xs text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
            variant="outline"
          >
            Grado {result.n}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs tabular-nums">
            {result.points.length} puntos
          </Badge>
          {result.evaluateAt !== null && result.evaluatedValue !== null ? (
            <Badge
              className="border-emerald-200 bg-emerald-50 text-xs text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
              variant="outline"
            >
              P({formatNumber(result.evaluateAt)}) ={' '}
              {formatNumber(result.evaluatedValue)}
            </Badge>
          ) : null}
        </CardContent>
      </Card>

      {/* Gráfica */}
      <LagrangePlot result={result} />

      {/* Pesos baricéntricos */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
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
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                    j
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    x<sub>j</sub>
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    y<sub>j</sub>
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
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
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sigma className="h-4 w-4 text-muted-foreground" />
              Bases de Lagrange en{' '}
              <InlineMath math={`x = ${formatNumber(result.evaluateAt!)}`} />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20">
                    <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                      k
                    </TableHead>
                    <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                      L<sub>k</sub>(x)
                    </TableHead>
                    <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                      y<sub>k</sub>
                    </TableHead>
                    <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
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
                      className="text-right text-xs font-semibold uppercase tracking-wider"
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

      {/* Forma explícita del polinomio */}
      <Card className="border-border bg-card">
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
                  className="rounded-lg border border-border bg-muted/20 px-3 py-2"
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
