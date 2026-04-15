import { useMemo, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
import type { SecantIteration } from '@/types/secant';
import { createMathFunction, generateFunctionPoints } from '@/utils/mathParser';
import { calculatePlotRange, generateSecantLines } from '@/utils/plotHelpers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart as LineChartIcon, Mouse, Hand, SlidersHorizontal, Wrench } from 'lucide-react';
import { useIsMobile } from '@/hooks/useResponsive';

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
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';

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
      const colors = {
        tooltipBackground: isDarkTheme ? 'rgba(15, 23, 42, 0.96)' : 'rgba(255, 255, 255, 0.95)',
        tooltipBorder: isDarkTheme ? '#334155' : '#e2e8f0',
        tooltipText: isDarkTheme ? '#e2e8f0' : '#334155',
        mutedText: isDarkTheme ? '#cbd5e1' : '#64748b',
        axisLine: isDarkTheme ? '#64748b' : '#94a3b8',
        axisTick: isDarkTheme ? '#475569' : '#cbd5e1',
        splitLine: isDarkTheme ? '#334155' : '#e2e8f0',
        secant: isDarkTheme ? '#a1a1aa' : '#71717a',
        functionLine: isDarkTheme ? '#e4e4e7' : '#3f3f46',
        iteration: isDarkTheme ? '#d4d4d8' : '#52525b',
        root: isDarkTheme ? '#22c55e' : '#16a34a',
        sliderBorder: isDarkTheme ? '#a1a1aa' : '#71717a',
        sliderFill: isDarkTheme ? 'rgba(161, 161, 170, 0.2)' : 'rgba(113, 113, 122, 0.15)',
        sliderArea: isDarkTheme ? 'rgba(161, 161, 170, 0.15)' : 'rgba(228, 228, 231, 0.5)',
      };

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
            color: `rgba(${isDarkTheme ? '161, 161, 170' : '113, 113, 122'}, ${opacity})`,
            width: 2
          },
          symbol: 'none',
          silent: true
        };
      });

      return {
        // Configuración del grid
        grid: isMobile
          ? { left: 40, right: 20, top: 40, bottom: 70, containLabel: false }
          : { left: 60, right: 40, top: 60, bottom: 100, containLabel: false },
        
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
          backgroundColor: colors.tooltipBackground,
          borderColor: colors.tooltipBorder,
          borderWidth: 1,
          textStyle: {
            color: colors.tooltipText,
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
                <div style="color: ${colors.mutedText}; margin-bottom: 4px;">x = ${x.toFixed(6)}</div>
                <div style="color: ${colors.functionLine}; font-weight: 600;">f(x) = ${isNaN(y) ? 'indefinido' : y.toFixed(6)}</div>
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
            color: colors.mutedText
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
            color: colors.mutedText
          },
          axisLine: { lineStyle: { color: colors.axisLine } },
          axisTick: { lineStyle: { color: colors.axisTick } },
          axisLabel: {
            fontFamily: 'Google Sans Mono, monospace',
            fontSize: 11,
            color: colors.mutedText,
            formatter: (v: number) => v.toFixed(2)
          },
          splitLine: {
            lineStyle: { color: colors.splitLine, type: 'dashed' }
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
            color: colors.mutedText
          },
          axisLine: { lineStyle: { color: colors.axisLine } },
          axisTick: { lineStyle: { color: colors.axisTick } },
          axisLabel: {
            fontFamily: 'Google Sans Mono, monospace',
            fontSize: 11,
            color: colors.mutedText,
            formatter: (v: number) => v.toFixed(2)
          },
          splitLine: {
            lineStyle: { color: colors.splitLine, type: 'dashed' }
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
            borderColor: colors.sliderBorder,
            fillerColor: colors.sliderFill,
            handleStyle: {
              color: colors.sliderBorder,
              borderColor: colors.sliderBorder
            },
            textStyle: {
              fontFamily: 'Google Sans Mono, monospace',
              fontSize: 10,
              color: colors.mutedText
            },
            dataBackground: {
              lineStyle: { color: colors.sliderBorder, opacity: 0.3 },
              areaStyle: { color: colors.sliderArea, opacity: 0.5 }
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
              color: colors.axisLine,
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
              color: colors.functionLine,
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
              color: colors.iteration,
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
              color: colors.root,
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
              color: colors.secant,
              width: 2
            }
          }] : [])
        ]
      };
    } catch {
      return {};
    }
  }, [functionExpr, x0, x1, root, iterations, isDarkTheme, isMobile]);

  if (!functionExpr) {
    return (
      <Card className="border-border">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <LineChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            Gráfica de f(x)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="h-48 sm:h-80 flex items-center justify-center text-muted-foreground text-sm sm:text-base">
            Ingresa una función para ver la gráfica
          </div>
        </CardContent>
      </Card>
    );
  }

  if (Object.keys(chartOption).length === 0) {
    return (
      <Card className="border-border">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <LineChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            Gráfica de f(x)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="h-48 sm:h-80 flex items-center justify-center text-destructive text-sm sm:text-base">
            Error al generar la gráfica
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border overflow-hidden">
      <CardHeader className="pb-2 p-4 sm:p-6 sm:pb-2">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <LineChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          Gráfica de f(x)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1 sm:p-2 bg-muted/10">
        <ReactECharts
          ref={chartRef}
          option={chartOption}
          style={{ height: isMobile ? '300px' : '450px', width: '100%' }}
          opts={{ renderer: 'canvas' }}
          notMerge={true}
        />
        
        {/* Instrucciones de interacción - simplificadas en móvil */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2 px-2 text-[10px] sm:text-xs text-muted-foreground">
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
