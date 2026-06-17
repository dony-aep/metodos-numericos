import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
import { CheckCircle2, Flame, Table2, Waves } from 'lucide-react';
import { useIsMobile } from '@/hooks/useResponsive';
import { InlineMath } from '@/components/shared/MathRenderer';
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
import type { HeatDiffusionResult } from '@/types/heat-diffusion';

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) < 1e-12) return '0';
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-4 && value !== 0))
    return value.toExponential(3);
  return value.toFixed(4);
}

/** Índices de a lo sumo `max` niveles de tiempo, repartidos uniformemente. */
function sampleIndices(total: number, max: number): number[] {
  if (total <= max) return Array.from({ length: total }, (_, i) => i);
  const step = (total - 1) / (max - 1);
  return Array.from({ length: max }, (_, i) => Math.round(i * step));
}

function HeatMap({ result }: { result: HeatDiffusionResult }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isMobile = useIsMobile();

  const option = useMemo((): EChartsOption => {
    const rows = sampleIndices(result.times.length, isMobile ? 60 : 120);
    const xLabels = result.x.map((xi) => xi.toFixed(2));
    const yLabels = rows.map((r) => result.times[r].toFixed(3));

    const data: [number, number, number | null][] = [];
    let min = Infinity;
    let max = -Infinity;
    rows.forEach((r, rowIdx) => {
      result.history[r].forEach((value, i) => {
        const v = Number.isFinite(value) ? value : null;
        if (v !== null) {
          if (v < min) min = v;
          if (v > max) max = v;
        }
        data.push([i, rowIdx, v]);
      });
    });
    if (!Number.isFinite(min)) min = 0;
    if (!Number.isFinite(max)) max = 1;

    return {
      backgroundColor: 'transparent',
      tooltip: {
        position: 'top',
        backgroundColor: isDark ? 'rgba(15,23,42,0.96)' : 'rgba(255,255,255,0.95)',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        textStyle: { color: isDark ? '#e2e8f0' : '#334155', fontSize: 12 },
        formatter: (p: unknown) => {
          const { data: d } = p as { data: [number, number, number | null] };
          const u = d[2];
          return `x = ${xLabels[d[0]]}<br/>t = ${yLabels[d[1]]}<br/>u = ${
            u === null ? '∞' : u.toFixed(3)
          }`;
        },
      },
      grid: isMobile
        ? { top: 10, right: 12, bottom: 50, left: 48 }
        : { top: 10, right: 20, bottom: 55, left: 60 },
      xAxis: {
        type: 'category',
        data: xLabels,
        name: 'posición x',
        nameLocation: 'center',
        nameGap: 28,
        nameTextStyle: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 11 },
        axisLabel: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 10 },
        axisLine: { lineStyle: { color: isDark ? '#64748b' : '#94a3b8' } },
      },
      yAxis: {
        type: 'category',
        data: yLabels,
        name: 'tiempo t',
        nameTextStyle: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 11 },
        axisLabel: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 10 },
        axisLine: { lineStyle: { color: isDark ? '#64748b' : '#94a3b8' } },
      },
      visualMap: {
        min,
        max,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        textStyle: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 10 },
        inRange: {
          color: ['#1e3a8a', '#0ea5e9', '#22c55e', '#facc15', '#f97316', '#dc2626'],
        },
      },
      series: [
        {
          name: 'Temperatura',
          type: 'heatmap',
          data,
          progressive: 2000,
          emphasis: { itemStyle: { borderColor: isDark ? '#e2e8f0' : '#1e293b', borderWidth: 1 } },
        },
      ],
    };
  }, [result, isDark, isMobile]);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Flame className="h-4 w-4 text-muted-foreground" />
          Mapa de calor — posición × tiempo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-muted/10 p-2">
          <ReactECharts
            option={option}
            style={{ height: isMobile ? 320 : 420 }}
            notMerge
            lazyUpdate
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ProfilePlot({ result }: { result: HeatDiffusionResult }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const isMobile = useIsMobile();

  const option = useMemo((): EChartsOption => {
    const snapshots = sampleIndices(result.times.length, 5);
    const palette = isDark
      ? ['#38bdf8', '#34d399', '#fbbf24', '#fb923c', '#f87171']
      : ['#0369a1', '#059669', '#d97706', '#ea580c', '#dc2626'];

    const series: EChartsOption['series'] = snapshots.map((s, idx) => ({
      name: `t = ${result.times[s].toFixed(3)}`,
      type: 'line',
      smooth: true,
      showSymbol: false,
      data: result.x.map((xi, i) => [xi, result.history[s][i]] as [number, number]),
      lineStyle: { color: palette[idx % palette.length], width: 2 },
      itemStyle: { color: palette[idx % palette.length] },
    }));

    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      legend: {
        top: 0,
        textStyle: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 10 },
      },
      grid: isMobile
        ? { top: 30, right: 12, bottom: 35, left: 45 }
        : { top: 35, right: 20, bottom: 40, left: 55 },
      xAxis: {
        type: 'value',
        name: 'x',
        nameLocation: 'center',
        nameGap: 25,
        nameTextStyle: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 11 },
        axisLabel: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 11 },
        axisLine: { lineStyle: { color: isDark ? '#64748b' : '#94a3b8' } },
        splitLine: { lineStyle: { color: isDark ? '#334155' : '#e2e8f0', type: 'dashed' } },
      },
      yAxis: {
        type: 'value',
        name: 'u(x, t)',
        nameTextStyle: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 11 },
        axisLabel: { color: isDark ? '#cbd5e1' : '#64748b', fontSize: 11 },
        axisLine: { lineStyle: { color: isDark ? '#64748b' : '#94a3b8' } },
        splitLine: { lineStyle: { color: isDark ? '#334155' : '#e2e8f0', type: 'dashed' } },
      },
      series,
    };
  }, [result, isDark, isMobile]);

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Waves className="h-4 w-4 text-muted-foreground" />
          Evolución del perfil de temperatura
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg bg-muted/10 p-2">
          <ReactECharts
            option={option}
            style={{ height: isMobile ? 260 : 340 }}
            notMerge
            lazyUpdate
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function HeatDiffusionResults({ result }: { result: HeatDiffusionResult }) {
  const { input, dx, lambda, stable } = result;
  const finalProfile = result.history[result.history.length - 1];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Resumen */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Parámetros del esquema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-xs">α = {input.alpha}</Badge>
            <Badge variant="outline" className="font-mono text-xs">L = {input.length}</Badge>
            <Badge variant="outline" className="font-mono text-xs">T = {input.tFinal}</Badge>
            <Badge variant="outline" className="font-mono text-xs">N = {input.n}</Badge>
            <Badge variant="outline" className="font-mono text-xs">Δt = {input.dt}</Badge>
            <Badge variant="outline" className="font-mono text-xs">{result.times.length - 1} pasos</Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Paso espacial <InlineMath math="\Delta x" />
              </p>
              <p className="font-mono text-lg font-medium tabular-nums">{formatNumber(dx)}</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Número de difusión <InlineMath math="\lambda" />
              </p>
              <p className="font-mono text-lg font-medium tabular-nums">{formatNumber(lambda)}</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Pasos de tiempo
              </p>
              <p className="font-mono text-lg font-medium tabular-nums">{result.times.length - 1}</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Estabilidad (<InlineMath math="\lambda \le 0.5" />)
              </p>
              <Badge
                variant={stable ? 'secondary' : 'destructive'}
                className="mt-0.5 font-mono text-xs"
              >
                {stable ? 'Estable' : 'Inestable'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <HeatMap result={result} />
      <ProfilePlot result={result} />

      {/* Tabla del perfil final */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Table2 className="h-4 w-4 text-muted-foreground" />
            Perfil final <InlineMath math={`(t = ${input.tFinal})`} />
            <Badge variant="secondary" className="ml-auto font-mono text-xs">
              {result.x.length} nodos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="text-[10px] font-semibold uppercase tracking-wider">i</TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    <InlineMath math="x_i" />
                  </TableHead>
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    <InlineMath math="u_i" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.x.map((xi, i) => (
                  <TableRow key={`node-${i}`}>
                    <TableCell className="font-mono tabular-nums text-muted-foreground">{i}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{formatNumber(xi)}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">
                      {formatNumber(finalProfile[i])}
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
