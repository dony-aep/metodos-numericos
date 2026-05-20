import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
import { Table2, Activity } from 'lucide-react';
import { useIsMobile } from '@/hooks/useResponsive';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createMathFunction, generateFunctionPoints } from '@/utils/mathParser';
import type { BisectionResult } from '@/types/bisection';

function formatNum(v: number): string {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) < 1e-14) return '0';
  if (Math.abs(v) >= 1e6 || (Math.abs(v) < 1e-4 && v !== 0)) return v.toExponential(6);
  return v.toFixed(8);
}

export function BisectionResults({ result }: { result: BisectionResult }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isMobile = useIsMobile();

  const functionPlotOption = useMemo((): EChartsOption => {
    const f = createMathFunction(result.expression);
    const first = result.iterations[0];
    const xMin = first.a - (first.b - first.a) * 0.3;
    const xMax = first.b + (first.b - first.a) * 0.3;
    const { x, y } = generateFunctionPoints(f, xMin, xMax, 300);

    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', textStyle: { fontSize: 12 } },
      grid: { top: 30, right: 20, bottom: 40, left: isMobile ? 45 : 55 },
      xAxis: {
        type: 'value',
        name: 'x',
        nameLocation: 'middle',
        nameGap: 25,
        axisLine: { lineStyle: { color: isDark ? '#475569' : '#cbd5e1' } },
        axisLabel: { color: isDark ? '#94a3b8' : '#64748b', fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        name: 'f(x)',
        nameLocation: 'middle',
        nameGap: isMobile ? 30 : 40,
        axisLine: { lineStyle: { color: isDark ? '#475569' : '#cbd5e1' } },
        axisLabel: { color: isDark ? '#94a3b8' : '#64748b', fontSize: 11 },
        splitLine: { lineStyle: { color: isDark ? '#1e293b' : '#f1f5f9' } },
      },
      series: [
        {
          type: 'line',
          data: x.map((xi, i) => [xi, y[i]]),
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 2, color: isDark ? '#60a5fa' : '#3b82f6' },
        },
        {
          type: 'scatter',
          data: [[result.root, 0]],
          symbolSize: 10,
          itemStyle: { color: '#ef4444' },
          z: 10,
        },
      ],
    };
  }, [result, isDark, isMobile]);

  const errorPlotOption = useMemo((): EChartsOption => {
    const data = result.iterations.map((it) => [it.n, it.error || 1e-16]);

    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', textStyle: { fontSize: 12 } },
      grid: { top: 30, right: 20, bottom: 40, left: isMobile ? 50 : 60 },
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
      series: [
        {
          type: 'line',
          data,
          smooth: true,
          lineStyle: { width: 2 },
          itemStyle: { color: isDark ? '#60a5fa' : '#3b82f6' },
          areaStyle: { color: isDark ? 'rgba(96,165,250,0.08)' : 'rgba(59,130,246,0.06)' },
        },
      ],
    };
  }, [result, isDark, isMobile]);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard label="Raíz aproximada" value={formatNum(result.root)} />
        <MetricCard label="Iteraciones" value={String(result.iterations.length)} />
        <MetricCard label="Error final" value={formatNum(result.iterations[result.iterations.length - 1]?.error ?? 0)} />
      </div>

      {/* Function plot */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-4 w-4 text-muted-foreground" />
            Gráfica de f(x)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReactECharts option={functionPlotOption} style={{ height: isMobile ? 220 : 280, width: '100%' }} opts={{ renderer: 'svg' }} />
        </CardContent>
      </Card>

      {/* Error convergence */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-4 w-4 text-muted-foreground" />
            Convergencia del error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReactECharts option={errorPlotOption} style={{ height: isMobile ? 220 : 280, width: '100%' }} opts={{ renderer: 'svg' }} />
        </CardContent>
      </Card>

      {/* Iteration table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Table2 className="h-4 w-4 text-muted-foreground" />
            Tabla de iteraciones
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>n</TableHead>
                <TableHead>a</TableHead>
                <TableHead>b</TableHead>
                <TableHead>c</TableHead>
                <TableHead>f(c)</TableHead>
                <TableHead>Error</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.iterations.map((it) => (
                <TableRow key={it.n}>
                  <TableCell className="font-mono">{it.n}</TableCell>
                  <TableCell className="font-mono">{formatNum(it.a)}</TableCell>
                  <TableCell className="font-mono">{formatNum(it.b)}</TableCell>
                  <TableCell className="font-mono">{formatNum(it.c)}</TableCell>
                  <TableCell className="font-mono">{formatNum(it.fc)}</TableCell>
                  <TableCell className="font-mono">{formatNum(it.error)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-mono text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
