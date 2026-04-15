import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
import {
  CheckCircle2,
  TrendingDown,
  Table2,
  Activity,
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
import type { NumericalDiffResult } from '@/types/numerical-diff';

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) < 1e-14) return '0';
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-4 && value !== 0))
    return value.toExponential(6);
  return value.toFixed(8);
}

function formatH(value: number): string {
  if (value >= 0.001) return value.toPrecision(4);
  return value.toExponential(2);
}

function ConvergencePlot({
  result,
}: {
  result: NumericalDiffResult;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isMobile = useIsMobile();

  const option = useMemo((): EChartsOption => {
    const fwdData: [number, number][] = [];
    const bwdData: [number, number][] = [];
    const ctrData: [number, number][] = [];

    for (const entry of result.convergenceStudy) {
      const logH = Math.log10(entry.h);
      fwdData.push([logH, entry.forward]);
      bwdData.push([logH, entry.backward]);
      ctrData.push([logH, entry.centered]);
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
        formatter: (params: unknown) => {
          const items = params as { seriesName: string; value: [number, number]; marker: string }[];
          if (!Array.isArray(items) || items.length === 0) return '';
          const h = Math.pow(10, items[0].value[0]);
          let html = `<strong>h = ${formatH(h)}</strong><br/>`;
          for (const item of items) {
            html += `${item.marker} ${item.seriesName}: ${formatNumber(item.value[1])}<br/>`;
          }
          return html;
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
        name: 'log₁₀(h)',
        nameLocation: 'center',
        nameGap: 25,
        nameTextStyle: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 11 },
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
        name: "f'(x)",
        nameTextStyle: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 11 },
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
          name: 'Adelante',
          type: 'line',
          data: fwdData,
          symbolSize: 6,
          lineStyle: { color: isDark ? '#a1a1aa' : '#71717a', width: 2 },
          itemStyle: { color: isDark ? '#a1a1aa' : '#71717a' },
        },
        {
          name: 'Atrás',
          type: 'line',
          data: bwdData,
          symbolSize: 6,
          lineStyle: {
            color: isDark ? '#a1a1aa' : '#71717a',
            width: 2,
            type: 'dashed',
          },
          itemStyle: { color: isDark ? '#a1a1aa' : '#71717a' },
        },
        {
          name: 'Centrada',
          type: 'line',
          data: ctrData,
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
      ],
    };
  }, [result, isDark, isMobile]);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
          Convergencia al refinar h
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-muted/10 p-2">
          <ReactECharts
            option={option}
            style={{ height: isMobile ? 250 : 320 }}
            notMerge
            lazyUpdate
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function NumericalDiffResults({
  result,
}: {
  result: NumericalDiffResult;
}) {
  const hasErrors = result.approximations.some((a) => a.error !== null);

  const firstDerivApprox = result.approximations.filter(
    (a) => a.method !== 'second-centered'
  );
  const secondDerivApprox = result.approximations.filter(
    (a) => a.method === 'second-centered'
  );

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
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="outline" className="font-mono text-xs tabular-nums">
            f(x) = {result.expression}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs tabular-nums">
            x = {result.x}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs tabular-nums">
            h = {result.h}
          </Badge>
        </CardContent>
      </Card>

      {/* Primera derivada */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-4 w-4 text-muted-foreground" />
            Primera derivada — <InlineMath math="f'(x)" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                    Método
                  </TableHead>
                  <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                    Orden
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    Valor
                  </TableHead>
                  {hasErrors && (
                    <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                      |Error|
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {firstDerivApprox.map((a) => (
                  <TableRow key={a.method}>
                    <TableCell className="font-medium">{a.label}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {a.order}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(a.value)}
                    </TableCell>
                    {hasErrors && (
                      <TableCell
                        className={cn(
                          'text-right font-mono tabular-nums',
                          a.error !== null && a.error < 1e-6
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : ''
                        )}
                      >
                        {a.error !== null ? formatNumber(a.error) : '—'}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Segunda derivada */}
      {secondDerivApprox.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4 text-muted-foreground" />
              Segunda derivada — <InlineMath math="f''(x)" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {secondDerivApprox.map((a) => (
                <div
                  key={a.method}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium">{a.label}</p>
                    <p className="text-xs text-muted-foreground">{a.order}</p>
                  </div>
                  <span className="font-mono text-sm tabular-nums font-medium">
                    {formatNumber(a.value)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gráfica de convergencia */}
      <ConvergencePlot result={result} />

      {/* Tabla de convergencia */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Table2 className="h-4 w-4 text-muted-foreground" />
            Estudio de convergencia
            <Badge variant="secondary" className="ml-auto font-mono text-xs">
              h → h/2 → h/4 → …
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                    h
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    Adelante
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    Atrás
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    Centrada
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.convergenceStudy.map((row, i) => (
                  <TableRow key={`conv-${i}`}>
                    <TableCell className="font-mono text-xs tabular-nums text-muted-foreground">
                      {formatH(row.h)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(row.forward)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(row.backward)}
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(row.centered)}
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
