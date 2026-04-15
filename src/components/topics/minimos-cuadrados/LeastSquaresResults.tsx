import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
import {
  CheckCircle2,
  LineChart as LineChartIcon,
  BarChart3,
  Hash,
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
import type { LeastSquaresResult } from '@/types/least-squares';
import type { DataPoint } from '@/types/interpolation';

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) < 1e-10) return '0';
  if (Math.abs(value) >= 1e4 || (Math.abs(value) < 1e-4 && value !== 0))
    return value.toExponential(4);
  return value.toFixed(6);
}

function FitPlot({
  result,
  points,
}: {
  result: LeastSquaresResult;
  points: DataPoint[];
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isMobile = useIsMobile();

  const option = useMemo((): EChartsOption => {
    const curveData: [number, number][] = result.curvePoints.map((p) => [
      p.x,
      p.y,
    ]);
    const pointData: [number, number][] = points.map((p) => [p.x, p.y]);

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
          name: 'Ajuste',
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
      ],
    };
  }, [result, points, isDark, isMobile]);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <LineChartIcon className="h-4 w-4 text-muted-foreground" />
          Gráfica de ajuste
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

export function LeastSquaresResults({
  result,
  points,
}: {
  result: LeastSquaresResult;
  points: DataPoint[];
}) {
  const rSquaredGood = result.rSquared >= 0.95;
  const rSquaredOk = result.rSquared >= 0.8;

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
            Grado {result.degree}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs tabular-nums">
            {result.n} puntos
          </Badge>
          <Badge
            className={cn(
              'text-xs',
              rSquaredGood
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300'
                : rSquaredOk
                  ? 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300'
                  : 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300'
            )}
            variant="outline"
          >
            R² = {result.rSquared.toFixed(6)}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs tabular-nums">
            S = {formatNumber(result.sumSquaredResiduals)}
          </Badge>
        </CardContent>
      </Card>

      {/* Gráfica */}
      <FitPlot result={result} points={points} />

      {/* Coeficientes */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Hash className="h-4 w-4 text-muted-foreground" />
            Coeficientes del polinomio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Polynomial expression */}
          <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-sm">
            <span className="font-medium">f(x) =</span>
            {result.coefficients.map((coef, k) => {
              const sign = coef >= 0 ? (k > 0 ? ' + ' : '') : ' − ';
              const absCoef = Math.abs(coef);
              const variable =
                k === 0 ? '' : k === 1 ? 'x' : `x${superscript(k)}`;
              return (
                <span
                  key={`c-${k}`}
                  className="font-mono tabular-nums whitespace-nowrap"
                >
                  {sign}
                  {formatNumber(absCoef)}
                  {variable}
                </span>
              );
            })}
          </div>

          {/* Coefficient cards */}
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {result.coefficients.map((coef, k) => (
              <div
                key={`coef-${k}`}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2"
              >
                <span className="text-xs text-muted-foreground">
                  <InlineMath math={`a_{${k}}`} />
                </span>
                <span className="font-mono text-sm tabular-nums font-medium">
                  {formatNumber(coef)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Residuos */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            Residuos
            <Badge
              variant="secondary"
              className="ml-auto font-mono text-xs"
            >
              Σe² = {formatNumber(result.sumSquaredResiduals)}
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
                    x<sub>i</sub>
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    y<sub>i</sub>
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    f(x<sub>i</sub>)
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    e<sub>i</sub>
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    e<sub>i</sub>²
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {points.map((pt, i) => {
                  const fitted = pt.y - result.residuals[i];
                  return (
                    <TableRow key={`r-${i}`}>
                      <TableCell className="font-mono tabular-nums text-muted-foreground">
                        {i + 1}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        {formatNumber(pt.x)}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        {formatNumber(pt.y)}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        {formatNumber(fitted)}
                      </TableCell>
                      <TableCell
                        className={cn(
                          'text-right font-mono tabular-nums',
                          Math.abs(result.residuals[i]) > 1e-10
                            ? ''
                            : 'text-muted-foreground'
                        )}
                      >
                        {formatNumber(result.residuals[i])}
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        {formatNumber(result.residuals[i] ** 2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/** Helper to render superscript digits */
function superscript(n: number): string {
  const sups = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  return String(n)
    .split('')
    .map((d) => sups[Number.parseInt(d, 10)] ?? d)
    .join('');
}
