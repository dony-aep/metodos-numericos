import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { Table2, Activity } from 'lucide-react';
import { useIsMobile } from '@/hooks/useResponsive';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { NonlinearComparison } from '@/types/nonlinear';
import { useChartTheme } from '@/lib/chartTheme';
import { ErrorBar } from '@/components/shared/ErrorBar';

function formatNum(v: number): string {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) < 1e-14) return '0';
  if (Math.abs(v) >= 1e6 || (Math.abs(v) < 1e-4 && v !== 0)) return v.toExponential(6);
  return v.toFixed(10);
}

export function NonlinearReadout({ comparison }: { comparison: NonlinearComparison }) {
  const chart = useChartTheme();

  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {comparison.results.map((r, i) => (
          <Card key={r.method}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-4 shrink-0"
                  style={{ backgroundColor: chart.palette[i % chart.palette.length] }}
                />
                <span className="text-sm font-semibold text-foreground">{r.methodLabel}</span>
                <Badge variant={r.converged ? 'default' : 'destructive'} className="ml-auto text-[10px]">
                  {r.converged ? 'Convergió' : 'No convergió'}
                </Badge>
              </div>
              <p className="font-mono text-2xl tracking-tight sm:text-[1.75rem]">{formatNum(r.root)}</p>
              <p className="text-xs text-muted-foreground">{r.iterations.length} iteraciones</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function NonlinearPlots({ comparison }: { comparison: NonlinearComparison }) {
  const chart = useChartTheme();
  const isMobile = useIsMobile();
  const chartOption = useMemo((): EChartsOption => {
    const series = comparison.results.map((r, i) => ({
      name: r.methodLabel,
      type: 'line' as const,
      data: r.iterations.map((it) => [it.n, it.error || 1e-16]),
      smooth: true,
      lineStyle: { width: 2 },
      itemStyle: { color: chart.palette[i % chart.palette.length] },
    }));

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: chart.tooltipBg,
        borderColor: chart.grid,
        textStyle: { color: chart.text, fontSize: 12 },
      },
      legend: {
        data: comparison.results.map((r) => r.methodLabel),
        top: 0,
        textStyle: { color: chart.label, fontSize: 11 },
      },
      grid: { top: 46, right: 20, bottom: 44, left: isMobile ? 50 : 60 },
      xAxis: {
        type: 'value',
        name: 'Iteración',
        nameLocation: 'middle',
        nameGap: 25,
        axisLine: { lineStyle: { color: chart.axis } },
        axisLabel: { color: chart.label, fontSize: 11 },
        splitLine: { lineStyle: { color: chart.grid } },
      },
      yAxis: {
        type: 'log',
        name: 'Error',
        nameLocation: 'middle',
        nameGap: isMobile ? 35 : 45,
        axisLine: { lineStyle: { color: chart.axis } },
        axisLabel: { color: chart.label, fontSize: 11 },
        splitLine: { lineStyle: { color: chart.grid } },
      },
      series,
    };
  }, [comparison, chart, isMobile]);

  return (
    <div>
      {/* Convergence chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            Comparación de convergencia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReactECharts
            option={chartOption}
            style={{ height: isMobile ? 250 : 320, width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function NonlinearTables({ comparison }: { comparison: NonlinearComparison }) {
  return (
    <div className="space-y-10">
      {/* Iteration tables */}
      {comparison.results.map((r) => (
        <Card key={r.method}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Table2 className="h-4 w-4 text-muted-foreground" />
              Iteraciones — {r.methodLabel}
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>n</TableHead>
                  {r.method === 'bisection' && <TableHead>a</TableHead>}
                  {r.method === 'bisection' && <TableHead>b</TableHead>}
                  <TableHead>x</TableHead>
                  <TableHead>f(x)</TableHead>
                  <TableHead>Error</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {r.iterations.slice(0, 20).map((it) => (
                  <TableRow key={it.n}>
                    <TableCell className="font-mono">{it.n}</TableCell>
                    {r.method === 'bisection' && <TableCell className="font-mono">{formatNum(it.a!)}</TableCell>}
                    {r.method === 'bisection' && <TableCell className="font-mono">{formatNum(it.b!)}</TableCell>}
                    <TableCell className="font-mono">{formatNum(it.x)}</TableCell>
                    <TableCell className="font-mono">{formatNum(it.fx)}</TableCell>
                    <TableCell>
                      <ErrorBar error={it.error} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {r.iterations.length > 20 && (
              <p className="mt-2 text-xs text-muted-foreground">Mostrando 20 de {r.iterations.length} iteraciones.</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
