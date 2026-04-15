import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
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
        backgroundColor: isDark
          ? 'rgba(15,23,42,0.96)'
          : 'rgba(255,255,255,0.95)',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        textStyle: { color: isDark ? '#e2e8f0' : '#334155', fontSize: 12 },
      },
      grid: isMobile
        ? { top: 30, right: 10, bottom: 30, left: 35 }
        : { top: 40, right: 20, bottom: 40, left: 50 },
      xAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: isDark ? '#64748b' : '#94a3b8' } },
        splitLine: {
          lineStyle: { color: isDark ? '#334155' : '#e2e8f0', type: 'dashed' },
        },
        axisLabel: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: isDark ? '#64748b' : '#94a3b8' } },
        splitLine: {
          lineStyle: { color: isDark ? '#334155' : '#e2e8f0', type: 'dashed' },
        },
        axisLabel: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 11 },
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
  }, [result, points, isDark, isMobile]);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <LineChartIcon className="h-4 w-4 text-muted-foreground" />
          Gráfica del polinomio interpolante
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

export function InterpolationResults({
  result,
  points,
}: InterpolationResultsProps) {
  const { dividedDifferences: dd } = result;

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
            {points.length} puntos
          </Badge>
          {result.evaluateAt !== null && result.evaluatedValue !== null ? (
            <Badge
              className="border-emerald-200 bg-emerald-50 text-xs text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
              variant="outline"
            >
              P({formatNumber(result.evaluateAt)}) = {formatNumber(result.evaluatedValue)}
            </Badge>
          ) : null}
        </CardContent>
      </Card>

      {/* Gráfica */}
      <InterpolationPlot result={result} points={points} />

      {/* Tabla de diferencias divididas */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Grid3X3 className="h-4 w-4 text-muted-foreground" />
            Tabla de diferencias divididas
            <Badge variant="secondary" className="ml-auto font-mono text-xs">
              {dd.coefficients.length} coef.
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
                  {Array.from({ length: dd.coefficients.length }).map(
                    (_, col) => (
                      <TableHead
                        key={`dd-head-${col}`}
                        className="text-right text-[10px] font-semibold uppercase tracking-wider"
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
      <Card className="border-border bg-card">
        <CardHeader className="pb-0">
          <CardTitle className="text-base text-muted-foreground">
            Coeficientes del polinomio de Newton
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                    Término
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
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
