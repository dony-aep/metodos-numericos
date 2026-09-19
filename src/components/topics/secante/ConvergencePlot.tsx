import { useMemo, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { SecantIteration } from '@/types/secant';
import { generateErrorData } from '@/utils/plotHelpers';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingDown, Mouse, Hand, Wrench } from 'lucide-react';
import { useIsMobile } from '@/hooks/useResponsive';
import { useChartTheme } from '@/lib/chartTheme';

interface ConvergencePlotProps {
  iterations: SecantIteration[];
}

export function ConvergencePlot({ iterations }: ConvergencePlotProps) {
  const chartRef = useRef<ReactECharts>(null);
  const isMobile = useIsMobile();
  const chart = useChartTheme();

  const chartOption = useMemo((): EChartsOption => {
    if (iterations.length === 0) {
      return {};
    }

    const errorData = generateErrorData(iterations);
    const colors = {
      tooltipBackground: chart.tooltipBg,
      tooltipBorder: chart.grid,
      tooltipText: chart.text,
      mutedText: chart.label,
      axisLine: chart.axis,
      axisTick: chart.axis,
      splitLine: chart.grid,
      line: chart.series,
      sliderFill: chart.seriesSoft,
      sliderArea: chart.seriesSoft,
    };
    
    // Convertir a formato ECharts [iteración, logError]
    const chartData: [number, number][] = errorData.map(point => [point.x, point.y]);

    return {
      // Configuración del grid
      grid: isMobile
        ? { left: 45, right: 20, top: 35, bottom: 65, containLabel: false }
        : { left: 70, right: 40, top: 50, bottom: 90, containLabel: false },
      
      // Toolbox con herramientas
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
            title: {
              zoom: 'Zoom área',
              back: 'Restaurar zoom'
            }
          },
          restore: {
            title: 'Restaurar'
          },
          saveAsImage: {
            title: 'Guardar imagen',
            name: 'convergencia'
          }
        },
        right: 20,
        top: 5
      },
      
      // Tooltip mejorado
        tooltip: {
          trigger: 'axis',
          backgroundColor: colors.tooltipBackground,
          borderColor: colors.tooltipBorder,
          borderWidth: 1,
          textStyle: {
            color: colors.tooltipText,
            fontFamily: 'Google Sans Code, monospace',
            fontSize: 12
        },
        formatter: (params: unknown) => {
          const paramArray = params as Array<{ data: [number, number] }>;
          if (!Array.isArray(paramArray) || paramArray.length === 0) return '';
          
          const point = paramArray[0];
          if (!point.data || !Array.isArray(point.data)) return '';
          
          const iteration = point.data[0];
          const logError = point.data[1];
          const actualError = Math.pow(10, logError);
          
          return `
            <div style="font-family: 'Google Sans Code', monospace;">
                <div style="color: ${colors.mutedText}; margin-bottom: 4px;">Iteración ${iteration}</div>
                <div style="color: ${colors.line}; font-weight: 600;">log₁₀(error) = ${logError.toFixed(4)}</div>
                <div style="color: ${colors.mutedText}; font-size: 11px; margin-top: 4px;">Error ≈ ${actualError.toExponential(3)}</div>
              </div>
            `;
        }
      },
      
      // Leyenda
      legend: {
        show: true,
        data: ['Error (log₁₀)'],
        bottom: 55,
          textStyle: {
            fontFamily: 'Google Sans, sans-serif',
            fontSize: 12,
            color: colors.mutedText
          }
        },
      
      // Ejes
      xAxis: {
        type: 'value',
        name: 'Iteración',
        nameLocation: 'middle',
        nameGap: 25,
        min: 0,
        minInterval: 1,
        nameTextStyle: {
          fontFamily: 'Google Sans, sans-serif',
          fontSize: 13,
          color: colors.mutedText
        },
        axisLine: { lineStyle: { color: colors.axisLine } },
        axisTick: { lineStyle: { color: colors.axisTick } },
        axisLabel: {
          fontFamily: 'Google Sans Code, monospace',
          fontSize: 11,
          color: colors.mutedText,
          formatter: (v: number) => Math.round(v).toString()
        },
        splitLine: {
          lineStyle: { color: colors.splitLine, type: 'dashed' }
        }
      },
      
      yAxis: {
        type: 'value',
        name: 'log₁₀(error)',
        nameLocation: 'middle',
        nameGap: 50,
        nameTextStyle: {
          fontFamily: 'Google Sans, sans-serif',
          fontSize: 13,
          color: colors.mutedText
        },
        axisLine: { lineStyle: { color: colors.axisLine } },
        axisTick: { lineStyle: { color: colors.axisTick } },
        axisLabel: {
          fontFamily: 'Google Sans Code, monospace',
          fontSize: 11,
          color: colors.mutedText,
          formatter: (v: number) => v.toFixed(1)
        },
        splitLine: {
          lineStyle: { color: colors.splitLine, type: 'dashed' }
        }
      },
      
      // DataZoom para interactividad
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: 0,
          filterMode: 'none',
          zoomOnMouseWheel: true,
          moveOnMouseMove: true
        },
        {
          type: 'inside',
          yAxisIndex: 0,
          filterMode: 'none',
          zoomOnMouseWheel: true,
          moveOnMouseMove: true
        },
        {
          type: 'slider',
          xAxisIndex: 0,
          filterMode: 'none',
          height: 20,
          bottom: 20,
          borderColor: colors.line,
          fillerColor: colors.sliderFill,
          handleStyle: {
            color: colors.line,
            borderColor: colors.line
          },
          textStyle: {
            fontFamily: 'Google Sans Code, monospace',
            fontSize: 10,
            color: colors.mutedText
          },
          dataBackground: {
            lineStyle: { color: colors.line, opacity: 0.3 },
            areaStyle: { color: colors.sliderArea, opacity: 0.5 }
          }
        }
      ],
      
      // Series de datos
      series: [
        {
          type: 'line',
          name: 'Error (log₁₀)',
          data: chartData,
          smooth: true,
          lineStyle: {
            color: colors.line,
            width: 3
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: chart.seriesSoft },
                { offset: 1, color: chart.seriesFaint }
              ]
            }
          },
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
            color: colors.line,
            borderColor: chart.surface,
            borderWidth: 2
          },
          emphasis: {
            itemStyle: {
              color: colors.line,
              borderColor: chart.surface,
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: chart.seriesSoft
            }
          }
        }
      ]
    };
  }, [iterations, chart, isMobile]);

  if (iterations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            Convergencia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 sm:h-64 flex items-center justify-center text-muted-foreground text-sm sm:text-base">
            Ejecuta el cálculo para ver la convergencia
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          Convergencia
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs sm:text-sm">
          Error en escala logarítmica por iteración
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts
          ref={chartRef}
          option={chartOption}
          style={{ height: isMobile ? '250px' : '320px', width: '100%' }}
          opts={{ renderer: 'svg' }}
          notMerge={true}
        />
        
        {/* Información y controles */}
        <div className="px-3 sm:px-4 pb-2">
          <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed mb-2">
            <span className="hidden sm:inline">El método de la secante tiene convergencia superlineal con orden φ ≈ 1.618 (número áureo).</span>
            <span className="sm:hidden">Convergencia superlineal (φ ≈ 1.618)</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Mouse className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 
              <span className="hidden sm:inline">Scroll:</span> Zoom
            </span>
            <span className="flex items-center gap-1">
              <Hand className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 
              <span className="hidden sm:inline">Arrastrar:</span> Pan
            </span>
            <span className="flex items-center gap-1">
              <Wrench className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 
              <span className="hidden sm:inline">Herramientas</span>
              <span className="sm:hidden">Tools</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
