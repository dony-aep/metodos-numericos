import { useMemo } from 'react';
import { useTheme } from 'next-themes';

/**
 * La interfaz es monocroma; las gráficas no. Ahí el color distingue una serie
 * de otra, que es información, no adorno.
 *
 * El orden importa: es una paleta categórica validada para daltonismo, y las
 * parejas contiguas son las que más se parecen. La peor queda en ΔE 9.1 en
 * claro y 8.4 en oscuro (OKLab ×100, el objetivo es 8), y en visión normal en
 * 19.6 y 19.3 (el suelo es 15). Si añades un tono, revalida la lista entera en
 * vez de elegir a ojo.
 */
const SERIES_LIGHT = [
  '#2a78d6', // azul
  '#eb6834', // naranja
  '#1baf7a', // aguamarina
  '#eda100', // amarillo
  '#e87ba4', // magenta
  '#008300', // verde
] as const;

const SERIES_DARK = [
  '#3987e5',
  '#d95926',
  '#199e70',
  '#c98500',
  '#d55181',
  '#008300',
] as const;

/**
 * Rampa secuencial para magnitudes continuas, como la temperatura de la barra
 * en la difusión del calor: un solo tono, de pálido a intenso. Un arcoíris ahí
 * inventa fronteras donde el dato es continuo.
 */
const HEAT_LIGHT = [
  '#fbeae4',
  '#fbcbb9',
  '#f2a588',
  '#df784e',
  '#c24700',
  '#952400',
] as const;

const HEAT_DARK = [
  '#3f271e',
  '#753a22',
  '#af4d22',
  '#e56730',
  '#ff9467',
  '#ffc2a3',
] as const;

/** Ejes, rejilla y texto sí son cromo: se quedan en la escala de grises. */
const NEUTRALS = {
  light: {
    text: '#171717',
    label: '#636363',
    axis: '#c4c4c4',
    grid: '#ededed',
    tooltipBg: 'rgba(255,255,255,0.97)',
    tooltipBorder: '#d7d7d7',
  },
  dark: {
    text: '#f5f5f5',
    label: '#8a8a8a',
    axis: '#3a3a3a',
    grid: '#232323',
    tooltipBg: 'rgba(15,15,15,0.97)',
    tooltipBorder: '#2e2e2e',
  },
} as const;

export interface ChartTheme {
  isDark: boolean;
  text: string;
  label: string;
  axis: string;
  grid: string;
  tooltipBg: string;
  tooltipBorder: string;
  /** Serie principal de cada gráfica. */
  series: string;
  /** El mismo tono translúcido, para rellenos bajo la curva. */
  seriesSoft: string;
  /** El extremo casi transparente de un degradado. */
  seriesFaint: string;
  /** Segunda serie: la referencia exacta frente a la aproximada. */
  neutralSeries: string;
  /** Series adicionales cuando una gráfica compara varios métodos. */
  palette: readonly string[];
  /** Rampa continua, de menos a más. */
  heat: readonly string[];
  /** El fondo de la página, para marcadores huecos. */
  surface: string;
}

export function useChartTheme(): ChartTheme {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Memorizado para que las opciones de ECharts no se reconstruyan en cada render.
  return useMemo(() => {
    const neutrals = isDark ? NEUTRALS.dark : NEUTRALS.light;
    const palette = isDark ? SERIES_DARK : SERIES_LIGHT;

    return {
      isDark,
      ...neutrals,
      series: palette[0],
      seriesSoft: `${palette[0]}29`,
      seriesFaint: `${palette[0]}0d`,
      neutralSeries: palette[1],
      palette,
      heat: isDark ? HEAT_DARK : HEAT_LIGHT,
      surface: isDark ? '#13120f' : '#faf9f5',
    };
  }, [isDark]);
}
