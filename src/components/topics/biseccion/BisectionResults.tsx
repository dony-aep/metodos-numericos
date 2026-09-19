import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useIsMobile } from '@/hooks/useResponsive';
import { ErrorBar } from '@/components/shared/ErrorBar';
import { Readout } from '@/components/shared/Readout';
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
import { useChartTheme } from '@/lib/chartTheme';

function formatNum(v: number): string {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) < 1e-14) return '0';
  if (Math.abs(v) >= 1e6 || (Math.abs(v) < 1e-4 && v !== 0)) return v.toExponential(6);
  return v.toFixed(8);
}

export function BisectionReadout({ result }: { result: BisectionResult }) {
  const last = result.iterations[result.iterations.length - 1];

  return (
    <Readout
      values={[
        { label: 'Raíz aproximada', value: formatNum(result.root) },
        { label: 'Iteraciones', value: String(result.iterations.length) },
        { label: 'Error final', value: formatNum(last?.error ?? 0) },
      ]}
    />
  );
}

export function BisectionPlots({ result }: { result: BisectionResult }) {
  const chart = useChartTheme();
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
      grid: { top: 24, right: 16, bottom: 40, left: isMobile ? 45 : 55 },
      xAxis: {
        type: 'value',
        name: 'x',
        nameLocation: 'middle',
        nameGap: 25,
        axisLine: { lineStyle: { color: chart.axis } },
        axisLabel: { color: chart.label, fontSize: 11 },
        splitLine: { lineStyle: { color: chart.grid } },
      },
      yAxis: {
        type: 'value',
        name: 'f(x)',
        nameLocation: 'middle',
        nameGap: isMobile ? 30 : 40,
        axisLine: { lineStyle: { color: chart.axis } },
        axisLabel: { color: chart.label, fontSize: 11 },
        splitLine: { lineStyle: { color: chart.grid } },
      },
      series: [
        {
          type: 'line',
          data: x.map((xi, i) => [xi, y[i]]),
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 2, color: chart.series },
        },
        {
          type: 'scatter',
          data: [[result.root, 0]],
          symbolSize: 9,
          itemStyle: {
            color: chart.isDark ? '#13120f' : '#faf9f5',
            borderColor: chart.series,
            borderWidth: 2,
          },
          z: 10,
        },
      ],
    };
  }, [result, chart, isMobile]);

  const errorPlotOption = useMemo((): EChartsOption => {
    const data = result.iterations.map((it) => [it.n, it.error || 1e-16]);

    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', textStyle: { fontSize: 12 } },
      grid: { top: 24, right: 16, bottom: 40, left: isMobile ? 50 : 60 },
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
      series: [
        {
          type: 'line',
          data,
          smooth: true,
          lineStyle: { width: 2, color: chart.series },
          itemStyle: { color: chart.series },
          areaStyle: { color: chart.seriesSoft },
        },
      ],
    };
  }, [result, chart, isMobile]);

  return (
    <div className="grid gap-8 xl:grid-cols-2">
      <figure className="m-0">
        <ReactECharts
          option={functionPlotOption}
          style={{ height: isMobile ? 220 : 260, width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
        <figcaption className="mt-2 border-t border-rule pt-2 text-xs text-muted-foreground">
          La función y la raíz encontrada
        </figcaption>
      </figure>
      <figure className="m-0">
        <ReactECharts
          option={errorPlotOption}
          style={{ height: isMobile ? 220 : 260, width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
        <figcaption className="mt-2 border-t border-rule pt-2 text-xs text-muted-foreground">
          Error por iteración, en escala logarítmica
        </figcaption>
      </figure>
    </div>
  );
}

export function BisectionTable({ result }: { result: BisectionResult }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-right">n</TableHead>
            <TableHead className="text-right">a</TableHead>
            <TableHead className="text-right">b</TableHead>
            <TableHead className="text-right">c</TableHead>
            <TableHead className="text-right">f(c)</TableHead>
            <TableHead className="text-right">error</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.iterations.map((it) => (
            <TableRow key={it.n}>
              <TableCell className="text-right font-mono text-muted-foreground">
                {it.n}
              </TableCell>
              <TableCell className="text-right font-mono">{formatNum(it.a)}</TableCell>
              <TableCell className="text-right font-mono">{formatNum(it.b)}</TableCell>
              <TableCell className="text-right font-mono">{formatNum(it.c)}</TableCell>
              <TableCell className="text-right font-mono">{formatNum(it.fc)}</TableCell>
              <TableCell>
                <ErrorBar error={it.error} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
