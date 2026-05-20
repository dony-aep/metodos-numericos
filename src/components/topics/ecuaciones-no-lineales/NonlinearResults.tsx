import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
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

function formatNum(v: number): string {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) < 1e-14) return '0';
  if (Math.abs(v) >= 1e6 || (Math.abs(v) < 1e-4 && v !== 0)) return v.toExponential(6);
  return v.toFixed(10);
}

const METHOD_COLORS = ['#3b82f6', '#ef4444', '#10b981'];

export function NonlinearResults({ comparison }: { comparison: NonlinearComparison }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isMobile = useIsMobile();

  const chartOption = useMemo((): EChartsOption => {
    const series = comparison.results.map((r, i) => ({
      name: r.methodLabel,
      type: 'line' as const,
      data: r.iterations.map((it) => [it.n, it.error || 1e-16]),
      smooth: true,
      lineStyle: { width: 2 },
      itemStyle: { color: METHOD_COLORS[i % METHOD_COLORS.length] },
    }));

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: isDark ? 'rgba(15,23,42,0.96)' : 'rgba(255,255,255,0.95)',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        textStyle: { color: isDark ? '#e2e8f0' : '#334155', fontSize: 12 },
      },
      legend: {
        data: comparison.results.map((r) => r.methodLabel),
        textStyle: { color: isDark ? '#94a3b8' : '#64748b', fontSize: 11 },
      },
      grid: { top: 50, right: 20, bottom: 40, left: isMobile ? 50 : 60 },
      xAxis: {
        type: 'value',
        name: 'Iteración',
        nameLocation: 'middle',
        nameGap: 25,
        axisLine: { lineStyle: { color: isDark ? '#475569' : '#cbd5e1' } },
        axisLabel: { color: isDark ? '#94a3b8' : '#64748b', fontSize: 11 },
      },
      yAxis: {
        type: 'log',
        name: 'Error',
        nameLocation: 'middle',
        nameGap: isMobile ? 35 : 45,
        axisLine: { lineStyle: { color: isDark ? '#475569' : '#cbd5e1' } },
        axisLabel: { color: isDark ? '#94a3b8' : '#64748b', fontSize: 11 },
        splitLine: { lineStyle: { color: isDark ? '#1e293b' : '#f1f5f9' } },
      },
      series,
    };
  }, [comparison, isDark, isMobile]);

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {comparison.results.map((r, i) => (
          <Card key={r.method} className="border-border bg-card">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: METHOD_COLORS[i] }} />
                <span className="text-sm font-semibold text-foreground">{r.methodLabel}</span>
                <Badge variant={r.converged ? 'default' : 'destructive'} className="ml-auto text-[10px]">
                  {r.converged ? 'Convergió' : 'No convergió'}
                </Badge>
              </div>
              <p className="font-mono text-lg font-semibold">{formatNum(r.root)}</p>
              <p className="text-xs text-muted-foreground">{r.iterations.length} iteraciones</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Convergence chart */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
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

      {/* Iteration tables */}
      {comparison.results.map((r) => (
        <Card key={r.method} className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
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
                    <TableCell className="font-mono">{formatNum(it.error)}</TableCell>
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
