import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { CheckCircle2, Grid3X3, LineChart as LineChartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useResponsive';
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
import type { InterpolationResult } from '@/types/interpolation';
import type { DataPoint } from '@/types/interpolation';
import { useChartTheme } from '@/lib/chartTheme';

interface InterpolationResultsProps {
  result: InterpolationResult;
  points: DataPoint[];
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) < 1e-10) return '0';
  if (Math.abs(value) >= 1e4 || (Math.abs(value) < 1e-4 && value !== 0))
    return value.toExponential(4);
  return value.toFixed(6);
}

function InterpolationPlot({
  result,
  points,
}: {
  result: InterpolationResult;
  points: DataPoint[];
}) {
  const chart = useChartTheme();
  const isMobile = useIsMobile();

  const option = useMemo((): EChartsOption => {
    const curveData: [number, number][] = result.polynomialPoints.map((p) => [
      p.x,
      p.y,
    ]);

    const pointData: [number, number][] = points.map((p) => [p.x, p.y]);

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
        textStyle: { color: chart.text, fontSize: 12 },
      },
      grid: isMobile
        ? { top: 30, right: 10, bottom: 30, left: 35 }
        : { top: 40, right: 20, bottom: 40, left: 50 },
      xAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: chart.axis } },
        splitLine: {
          lineStyle: { color: chart.grid, type: 'dashed' },
        },
        axisLabel: { color: chart.label, fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: chart.axis } },
        splitLine: {
          lineStyle: { color: chart.grid, type: 'dashed' },
        },
        axisLabel: { color: chart.label, fontSize: 11 },
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
  }, [result, points, chart, isMobile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChartIcon className="h-4 w-4 text-muted-foreground" />
          Gráfica del polinomio interpolante
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

export function InterpolationReadout({
  result,
  points,
}: InterpolationResultsProps) {
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
            {points.length} puntos
          </Badge>
          {result.evaluateAt !== null && result.evaluatedValue !== null ? (
            <Badge
              className="text-xs text-emerald-700 dark:text-emerald-300"
              variant="outline"
            >
              P({formatNumber(result.evaluateAt)}) = {formatNumber(result.evaluatedValue)}
            </Badge>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

export function InterpolationPlots({
  result,
  points,
}: InterpolationResultsProps) {
  return (
    <div>
      {/* Gráfica */}
      <InterpolationPlot result={result} points={points} />
    </div>
  );
}

export function InterpolationTables({
  result,
  points,
}: InterpolationResultsProps) {
  const { dividedDifferences: dd } = result;

  return (
    <div className="space-y-10">
      {/* Tabla de diferencias divididas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4 text-muted-foreground" />
            Tabla de diferencias divididas
            <Badge variant="secondary" className="ml-auto font-mono text-xs">
              {dd.coefficients.length} coef.
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
                  {Array.from({ length: dd.coefficients.length }).map(
                    (_, col) => (
                      <TableHead
                        key={`dd-head-${col}`}
                        className="text-right"
                      >
                        {col === 0 ? (
                          <>f[x<sub>i</sub>]</>
                        ) : (
                          <>Orden {col}</>
                        )}
                      </TableHead>
                    )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dd.table.map((row, rowIndex) => (
                  <TableRow key={`dd-row-${rowIndex}`}>
                    <TableCell className="font-mono tabular-nums text-muted-foreground">
                      {rowIndex}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(points[rowIndex].x)}
                    </TableCell>
                    {row.map((val, colIndex) => (
                      <TableCell
                        key={`dd-cell-${rowIndex}-${colIndex}`}
                        className={cn(
                          'text-right font-mono tabular-nums',
                          rowIndex === 0 &&
                            'font-medium'
                        )}
                      >
                        {formatNumber(val)}
                      </TableCell>
                    ))}
                    {/* Empty cells for alignment */}
                    {Array.from({
                      length: dd.coefficients.length - row.length,
                    }).map((_, emptyIndex) => (
                      <TableCell
                        key={`dd-empty-${rowIndex}-${emptyIndex}`}
                      />
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Coeficientes de Newton */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-base text-muted-foreground">
            Coeficientes del polinomio de Newton
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Término
                  </TableHead>
                  <TableHead className="text-right">
                    Coeficiente
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dd.coefficients.map((coef, i) => (
                  <TableRow key={`coef-${i}`}>
                    <TableCell className="font-medium">
                      {i === 0
                        ? 'f[x₀]'
                        : `f[x₀,…,x${subscript(i)}]`}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(coef)}
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

function subscript(n: number): string {
  const subs = '₀₁₂₃₄₅₆₇₈₉';
  return String(n)
    .split('')
    .map((d) => subs[Number.parseInt(d, 10)] ?? d)
    .join('');
}
