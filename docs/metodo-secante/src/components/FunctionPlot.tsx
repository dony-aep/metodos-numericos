import { useMemo, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { SecantIteration } from '../types';
import { createMathFunction, generateFunctionPoints } from '../utils/mathParser';
import { calculatePlotRange, generateSecantLines } from '../utils/plotHelpers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart as LineChartIcon, Mouse, Hand, SlidersHorizontal, Wrench } from 'lucide-react';
import { useIsMobile } from '../hooks/useResponsive';

interface FunctionPlotProps {
  functionExpr: string;
  iterations: SecantIteration[];
  x0: number;
  x1: number;
  root: number | null;
}

export function FunctionPlot({ functionExpr, iterations, x0, x1, root }: FunctionPlotProps) {
  const chartRef = useRef<ReactECharts>(null);
  const isMobile = useIsMobile();

  // Datos de la gráfica memorizados para mejor rendimiento
  const chartOption = useMemo((): EChartsOption => {
    if (!functionExpr) {
      return {};
    }
    
    try {
      const fn = createMathFunction(functionExpr);
      const range = calculatePlotRange(x0, x1, root);
      const data = generateFunctionPoints(fn, range.xMin, range.xMax, 500);
      
      // Datos de la función principal como array de [x, y]
      const functionData: [number, number][] = data.x.map((x, i) => [x, isFinite(data.y[i]) ? data.y[i] : NaN]);
      
      // Puntos de iteración
      const iterationData: [number, number][] = iterations.map((iter) => [iter.xCurr, iter.fxCurr]);
      
      // Punto raíz
      const rootData: [number, number][] = root !== null ? [[root, 0]] : [];
      
      // Líneas secantes
      const secantLines = generateSecantLines(iterations);
      
      // Series de líneas secantes
      const secantSeries = secantLines.map((line, idx) => {
        const extendedX1 = line.x1 - (line.x2 - line.x1) * 0.3;
        const extendedX2 = line.x2 + (line.x2 - line.x1) * 0.3;
        const slope = (line.y2 - line.y1) / (line.x2 - line.x1);
        const extendedY1 = line.y1 + slope * (extendedX1 - line.x1);
        const extendedY2 = line.y1 + slope * (extendedX2 - line.x1);
        const opacity = 0.3 + (idx / secantLines.length) * 0.7;
        
        return {
          type: 'line' as const,
          name: `Secante ${idx + 1}`,
          data: [[extendedX1, extendedY1], [extendedX2, extendedY2]] as [number, number][],
          lineStyle: {
            color: `rgba(239, 68, 68, ${opacity})`,
            width: 2
          },
          symbol: 'none',
          silent: true
        };
      });

      return {
        // Configuración del grid
        grid: {
          left: 60,
          right: 40,
          top: 60,
          bottom: 100,
          containLabel: false
        },
        
        // Toolbox con herramientas de zoom, reset y guardar imagen
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
              name: 'grafica_funcion'
            }
          },
          right: 20,
          top: 10
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
            const paramArray = params as Array<{ data: [number, number]; seriesName: string; color: string }>;
            if (!Array.isArray(paramArray) || paramArray.length === 0) return '';
            
            const point = paramArray[0];
            if (!point.data || !Array.isArray(point.data)) return '';
            
            const x = point.data[0];
            const y = point.data[1];
            
            return `
              <div style="font-family: 'Google Sans Mono', monospace;">
                <div style="color: #64748b; margin-bottom: 4px;">x = ${x.toFixed(6)}</div>
                <div style="color: #d97706; font-weight: 600;">f(x) = ${isNaN(y) ? 'indefinido' : y.toFixed(6)}</div>
              </div>
            `;
          }
        },
        
        // Leyenda
        legend: {
          show: true,
          data: [
            { name: 'f(x)', icon: 'roundRect' },
            ...(iterationData.length > 0 ? [{ name: 'Iteraciones', icon: 'circle' }] : []),
            ...(rootData.length > 0 ? [{ name: 'Raíz', icon: 'pin' }] : []),
            ...(secantLines.length > 0 ? [{ name: 'Secantes', icon: 'roundRect' }] : [])
          ],
          bottom: 55,
          textStyle: {
            fontFamily: 'Google Sans, sans-serif',
            fontSize: 12,
            color: '#64748b'
          }
        },
        
        // Ejes
        xAxis: {
          type: 'value',
          name: 'x',
          nameLocation: 'middle',
          nameGap: 25,
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
            formatter: (v: number) => v.toFixed(2)
          },
          splitLine: {
            lineStyle: { color: '#e2e8f0', type: 'dashed' }
          }
        },
        
        yAxis: {
          type: 'value',
          name: 'f(x)',
          nameLocation: 'middle',
          nameGap: 45,
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
            formatter: (v: number) => v.toFixed(2)
          },
          splitLine: {
            lineStyle: { color: '#e2e8f0', type: 'dashed' }
          }
        },
        
        // DataZoom para interactividad (scroll zoom + slider)
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'none',
            zoomOnMouseWheel: true,
            moveOnMouseMove: true,
            moveOnMouseWheel: false
          },
          {
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'none',
            zoomOnMouseWheel: true,
            moveOnMouseMove: true,
            moveOnMouseWheel: false
          },
          {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'none',
            height: 25,
            bottom: 20,
            borderColor: '#d97706',
            fillerColor: 'rgba(217, 119, 6, 0.15)',
            handleStyle: {
              color: '#d97706',
              borderColor: '#d97706'
            },
            textStyle: {
              fontFamily: 'Google Sans Mono, monospace',
              fontSize: 10,
              color: '#64748b'
            },
            dataBackground: {
              lineStyle: { color: '#d97706', opacity: 0.3 },
              areaStyle: { color: '#fef3c7', opacity: 0.5 }
            }
          }
        ],
        
        // Series de datos
        series: [
          // Línea de referencia y=0
          {
            type: 'line',
            name: 'Eje X',
            data: [[range.xMin - 10, 0], [range.xMax + 10, 0]] as [number, number][],
            lineStyle: {
              color: '#94a3b8',
              width: 2
            },
            symbol: 'none',
            silent: true,
            z: 1
          },
          
          // Líneas secantes
          ...secantSeries,
          
          // Función principal
          {
            type: 'line',
            name: 'f(x)',
            data: functionData,
            smooth: false,
            lineStyle: {
              color: '#d97706',
              width: 3
            },
            symbol: 'none',
            connectNulls: false,
            z: 10
          },
          
          // Puntos de iteración
          ...(iterationData.length > 0 ? [{
            type: 'scatter' as const,
            name: 'Iteraciones',
            data: iterationData,
            symbolSize: 10,
            itemStyle: {
              color: '#dc2626',
              borderColor: '#ffffff',
              borderWidth: 2
            },
            z: 20
          }] : []),
          
          // Punto raíz
          ...(rootData.length > 0 ? [{
            type: 'scatter' as const,
            name: 'Raíz',
            data: rootData,
            symbol: 'pin',
            symbolSize: 30,
            itemStyle: {
              color: '#16a34a',
              borderColor: '#ffffff',
              borderWidth: 2
            },
            z: 30
          }] : []),
          
          // Serie ficticia para leyenda de secantes
          ...(secantLines.length > 0 ? [{
            type: 'line' as const,
            name: 'Secantes',
            data: [] as [number, number][],
            lineStyle: {
              color: '#ef4444',
              width: 2
            }
          }] : [])
        ]
      };
    } catch {
      return {};
    }
  }, [functionExpr, x0, x1, root, iterations]);

  if (!functionExpr) {
    return (
      <Card className="border-slate-200 shadow-lg shadow-slate-100">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-slate-800 text-base sm:text-lg">
            <LineChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
            Gráfica de f(x)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="h-48 sm:h-80 flex items-center justify-center text-slate-400 text-sm sm:text-base">
            Ingresa una función para ver la gráfica
          </div>
        </CardContent>
      </Card>
    );
  }

  if (Object.keys(chartOption).length === 0) {
    return (
      <Card className="border-slate-200 shadow-lg shadow-slate-100">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-slate-800 text-base sm:text-lg">
            <LineChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
            Gráfica de f(x)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="h-48 sm:h-80 flex items-center justify-center text-red-500 text-sm sm:text-base">
            Error al generar la gráfica
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 shadow-lg shadow-slate-100 overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-slate-50 to-amber-50/30 p-4 sm:p-6 sm:pb-2">
        <CardTitle className="flex items-center gap-2 text-slate-800 text-base sm:text-lg">
          <LineChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
          Gráfica de f(x)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1 sm:p-2 bg-slate-50/50">
        <ReactECharts
          ref={chartRef}
          option={chartOption}
          style={{ height: isMobile ? '300px' : '450px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
          notMerge={true}
        />
        
        {/* Instrucciones de interacción - simplificadas en móvil */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2 px-2 text-[10px] sm:text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Mouse className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 
            <span className="hidden sm:inline">Scroll:</span> Zoom
          </span>
          <span className="flex items-center gap-1">
            <Hand className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 
            <span className="hidden sm:inline">Arrastrar:</span> Pan
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Slider: Navegar
          </span>
          <span className="flex items-center gap-1">
            <Wrench className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 
            <span className="hidden sm:inline">Herramientas</span>
            <span className="sm:hidden">Tools</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
