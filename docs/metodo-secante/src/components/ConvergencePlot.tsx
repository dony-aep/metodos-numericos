import { useMemo, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { SecantIteration } from '../types';
import { generateErrorData } from '../utils/plotHelpers';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingDown, Mouse, Hand, Wrench } from 'lucide-react';
import { useIsMobile } from '../hooks/useResponsive';

interface ConvergencePlotProps {
  iterations: SecantIteration[];
}

export function ConvergencePlot({ iterations }: ConvergencePlotProps) {
  const chartRef = useRef<ReactECharts>(null);
  const isMobile = useIsMobile();

  const chartOption = useMemo((): EChartsOption => {
    if (iterations.length === 0) {
      return {};
    }

    const errorData = generateErrorData(iterations);
    
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
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        textStyle: {
          color: '#334155',
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
              <div style="color: #64748b; margin-bottom: 4px;">Iteración ${iteration}</div>
              <div style="color: #16a34a; font-weight: 600;">log₁₀(error) = ${logError.toFixed(4)}</div>
              <div style="color: #475569; font-size: 11px; margin-top: 4px;">Error ≈ ${actualError.toExponential(3)}</div>
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
          color: '#475569'
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
          color: '#64748b'
        },
        axisLine: { lineStyle: { color: '#94a3b8' } },
        axisTick: { lineStyle: { color: '#cbd5e1' } },
        axisLabel: {
          fontFamily: 'Google Sans Mono, monospace',
          fontSize: 11,
          color: '#64748b',
          formatter: (v: number) => Math.round(v).toString()
        },
        splitLine: {
          lineStyle: { color: '#e2e8f0', type: 'dashed' }
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
          color: '#64748b'
        },
        axisLine: { lineStyle: { color: '#94a3b8' } },
        axisTick: { lineStyle: { color: '#cbd5e1' } },
        axisLabel: {
          fontFamily: 'Google Sans Mono, monospace',
          fontSize: 11,
          color: '#64748b',
          formatter: (v: number) => v.toFixed(1)
        },
        splitLine: {
          lineStyle: { color: '#e2e8f0', type: 'dashed' }
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
          borderColor: '#16a34a',
          fillerColor: 'rgba(22, 163, 74, 0.15)',
          handleStyle: {
            color: '#16a34a',
            borderColor: '#16a34a'
          },
          textStyle: {
            fontFamily: 'Google Sans Mono, monospace',
            fontSize: 10,
            color: '#64748b'
          },
          dataBackground: {
            lineStyle: { color: '#16a34a', opacity: 0.3 },
            areaStyle: { color: '#dcfce7', opacity: 0.5 }
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
            color: '#16a34a',
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
                { offset: 0, color: 'rgba(22, 163, 74, 0.3)' },
                { offset: 1, color: 'rgba(22, 163, 74, 0.05)' }
              ]
            }
          },
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
            color: '#16a34a',
            borderColor: '#ffffff',
            borderWidth: 2
          },
          emphasis: {
            itemStyle: {
              color: '#16a34a',
              borderColor: '#ffffff',
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(22, 163, 74, 0.5)'
            }
          }
        }
      ]
    };
  }, [iterations]);

  if (iterations.length === 0) {
    return (
      <Card className="border-slate-200 shadow-lg shadow-slate-100">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-slate-800 text-base sm:text-lg">
            <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            Convergencia
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="h-40 sm:h-64 flex items-center justify-center text-slate-400 text-sm sm:text-base">
            Ejecuta el cálculo para ver la convergencia
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 shadow-lg shadow-slate-100 overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-slate-50 to-green-50/30 p-4 sm:p-6 sm:pb-2">
        <CardTitle className="flex items-center gap-2 text-slate-800 text-base sm:text-lg">
          <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          Convergencia
        </CardTitle>
        <CardDescription className="text-slate-500 text-xs sm:text-sm">
          Error en escala logarítmica por iteración
        </CardDescription>
      </CardHeader>
      <CardContent className="p-1 sm:p-2 bg-slate-50/50">
        <ReactECharts
          ref={chartRef}
          option={chartOption}
          style={{ height: isMobile ? '250px' : '320px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
          notMerge={true}
        />
        
        {/* Información y controles */}
        <div className="px-3 sm:px-4 pb-2">
          <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed mb-2">
            <span className="hidden sm:inline">El método de la secante tiene convergencia superlineal con orden φ ≈ 1.618 (número áureo).</span>
            <span className="sm:hidden">Convergencia superlineal (φ ≈ 1.618)</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-500">
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
