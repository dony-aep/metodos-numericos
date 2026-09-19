import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useIsMobile } from '@/hooks/useResponsive';
import { ErrorBar } from '@/components/shared/ErrorBar';
import { Readout } from '@/components/shared/Readout';
import { FigureGrid, ResultFigure } from '@/components/shared/ResultFigure';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createMathFunction, generateFunctionPoints } from '@/utils/mathParser';
import type { NewtonRaphsonResult } from '@/types/newton-raphson';
import { useChartTheme } from '@/lib/chartTheme';

function formatNum(v: number): string {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) < 1e-14) return '0';
  if (Math.abs(v) >= 1e6 || (Math.abs(v) < 1e-4 && v !== 0)) return v.toExponential(6);
  return v.toFixed(10);
}

export function NewtonRaphsonReadout({ result }: { result: NewtonRaphsonResult }) {
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

export function NewtonRaphsonPlots({ result }: { result: NewtonRaphsonResult }) {
  const chart = useChartTheme();
  const isMobile = useIsMobile();

  const functionPlotOption = useMemo((): EChartsOption => {
    const f = createMathFunction(result.expression);
    const root = result.root;
    const range = Math.max(Math.abs(root) * 0.5, 2);
    const xMin = root - range;
    const xMax = root + range;
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
          data: [[root, 0]],
          symbolSize: 10,
          itemStyle: {
            color: chart.surface,
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
      grid: { top: 30, right: 20, bottom: 40, left: isMobile ? 50 : 60 },
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
          lineStyle: { width: 2 },
          itemStyle: { color: chart.series },
          areaStyle: { color: chart.seriesSoft },
        },
      ],
    };
  }, [result, chart, isMobile]);

  return (
    <FigureGrid>
      <ResultFigure caption="La función y la raíz encontrada">
        <ReactECharts
          option={functionPlotOption}
          style={{ height: isMobile ? 220 : 260, width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </ResultFigure>
      <ResultFigure caption="Error por iteración, en escala logarítmica">
        <ReactECharts
          option={errorPlotOption}
          style={{ height: isMobile ? 220 : 260, width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </ResultFigure>
    </FigureGrid>
  );
}

export function NewtonRaphsonTable({ result }: { result: NewtonRaphsonResult }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-right">n</TableHead>
            <TableHead className="text-right">xₙ</TableHead>
            <TableHead className="text-right">f(xₙ)</TableHead>
            <TableHead className="text-right">f'(xₙ)</TableHead>
            <TableHead className="text-right">error</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.iterations.map((it) => (
            <TableRow key={it.n}>
              <TableCell className="text-right font-mono text-muted-foreground">
                {it.n}
              </TableCell>
              <TableCell className="text-right font-mono">{formatNum(it.x)}</TableCell>
              <TableCell className="text-right font-mono">{formatNum(it.fx)}</TableCell>
              <TableCell className="text-right font-mono">{formatNum(it.dfx)}</TableCell>
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
