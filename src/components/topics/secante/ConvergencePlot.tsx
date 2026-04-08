import { useMemo, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
import type { SecantIteration } from '@/types/secant';
import { generateErrorData } from '@/utils/plotHelpers';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingDown, Mouse, Hand, Wrench } from 'lucide-react';
import { useIsMobile } from '@/hooks/useResponsive';

interface ConvergencePlotProps {
  iterations: SecantIteration[];
}

export function ConvergencePlot({ iterations }: ConvergencePlotProps) {
  const chartRef = useRef<ReactECharts>(null);
  const isMobile = useIsMobile();
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';

  const chartOption = useMemo((): EChartsOption => {
    if (iterations.length === 0) {
      return {};
    }

    const errorData = generateErrorData(iterations);
    const colors = {
      tooltipBackground: isDarkTheme ? 'rgba(15, 23, 42, 0.96)' : 'rgba(255, 255, 255, 0.95)',
      tooltipBorder: isDarkTheme ? '#334155' : '#e2e8f0',
      tooltipText: isDarkTheme ? '#e2e8f0' : '#334155',
      mutedText: isDarkTheme ? '#cbd5e1' : '#64748b',
      axisLine: isDarkTheme ? '#64748b' : '#94a3b8',
      axisTick: isDarkTheme ? '#475569' : '#cbd5e1',
      splitLine: isDarkTheme ? '#334155' : '#e2e8f0',
      line: isDarkTheme ? '#22c55e' : '#16a34a',
      sliderFill: isDarkTheme ? 'rgba(34, 197, 94, 0.2)' : 'rgba(22, 163, 74, 0.15)',
      sliderArea: isDarkTheme ? 'rgba(34, 197, 94, 0.15)' : '#dcfce7',
    };
    
    // Convertir a formato ECharts [iteración, logError]
    const chartData: [number, number][] = errorData.map(point => [point.x, point.y]);

    return {
      // Configuración del grid
      grid: {
        left: 70,
        right: 40,
        top: 50,
        bottom: 90,
        containLabel: false
      },
      
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
            fontFamily: 'Google Sans Mono, monospace',
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
            <div style="font-family: 'Google Sans Mono', monospace;">
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
          fontFamily: 'Google Sans Mono, monospace',
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
          fontFamily: 'Google Sans Mono, monospace',
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
            fontFamily: 'Google Sans Mono, monospace',
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
                { offset: 0, color: isDarkTheme ? 'rgba(34, 197, 94, 0.35)' : 'rgba(22, 163, 74, 0.3)' },
                { offset: 1, color: isDarkTheme ? 'rgba(34, 197, 94, 0.08)' : 'rgba(22, 163, 74, 0.05)' }
              ]
            }
          },
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
            color: colors.line,
            borderColor: '#ffffff',
            borderWidth: 2
          },
          emphasis: {
            itemStyle: {
              color: colors.line,
              borderColor: '#ffffff',
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: isDarkTheme
                ? 'rgba(34, 197, 94, 0.5)'
                : 'rgba(22, 163, 74, 0.5)'
            }
          }
        }
      ]
    };
  }, [iterations, isDarkTheme]);

  if (iterations.length === 0) {
    return (
      <Card className="border-border">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            Convergencia
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="h-40 sm:h-64 flex items-center justify-center text-muted-foreground text-sm sm:text-base">
            Ejecuta el cálculo para ver la convergencia
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-background to-green-50/20 p-4 sm:p-6 sm:pb-2 dark:to-green-950/20">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          Convergencia
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs sm:text-sm">
          Error en escala logarítmica por iteración
        </CardDescription>
      </CardHeader>
      <CardContent className={isDarkTheme ? 'p-1 sm:p-2 bg-muted/20' : 'p-1 sm:p-2 bg-slate-50/50'}>
        <ReactECharts
          ref={chartRef}
          option={chartOption}
          style={{ height: isMobile ? '250px' : '320px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
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
