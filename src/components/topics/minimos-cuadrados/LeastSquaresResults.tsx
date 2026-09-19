import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
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
import { useChartTheme } from '@/lib/chartTheme';

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
  const chart = useChartTheme();
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
          name: 'Ajuste',
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
      ],
    };
  }, [result, points, chart, isMobile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChartIcon className="h-4 w-4 text-muted-foreground" />
          Gráfica de ajuste
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

export function LeastSquaresReadout({ result }: { result: LeastSquaresResult }) {
  const rSquaredGood = result.rSquared >= 0.95;
  const rSquaredOk = result.rSquared >= 0.8;

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
            Grado {result.degree}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs tabular-nums">
            {result.n} puntos
          </Badge>
          <Badge
            className={cn(
              'text-xs',
              rSquaredGood
                ? '  text-emerald-700   dark:text-emerald-300'
                : rSquaredOk
                  ? '  text-amber-700   dark:text-amber-300'
                  : '  text-red-700   dark:text-red-300'
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
      {/* Coeficientes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
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
                className="flex items-center justify-between border-b border-rule py-2.5"
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
    </div>
  );
}

export function LeastSquaresPlots({
  result,
  points,
}: {
  result: LeastSquaresResult;
  points: DataPoint[];
}) {
  return (
    <div className="grid gap-8 xl:grid-cols-2">
      {/* Gráfica */}
      <FitPlot result={result} points={points} />
      {/* Residuos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
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
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    i
                  </TableHead>
                  <TableHead className="text-right">
                    x<sub>i</sub>
                  </TableHead>
                  <TableHead className="text-right">
                    y<sub>i</sub>
                  </TableHead>
                  <TableHead className="text-right">
                    f(x<sub>i</sub>)
                  </TableHead>
                  <TableHead className="text-right">
                    e<sub>i</sub>
                  </TableHead>
                  <TableHead className="text-right">
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
