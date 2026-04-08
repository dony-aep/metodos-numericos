/**
 * Componente wrapper para renderizar fórmulas LaTeX con KaTeX.
 * Usa KaTeX directamente en lugar de react-katex para tener control
 * sobre la opción `strict` y evitar advertencias en producción.
 */
import katex from 'katex';
import { useMemo } from 'react';

interface MathProps {
  math: string;
  className?: string;
}

/**
 * Renderiza una fórmula matemática en modo bloque (display mode).
 * La fórmula se centra y usa símbolos más grandes.
 */
export function BlockMath({ math, className }: MathProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: true,
        strict: false, // Suprime advertencias como mathVsTextAccents
        throwOnError: false,
        output: 'htmlAndMathml', // Accesibilidad
      });
    } catch {
      return `<span style="color: #cc0000;">Error: ${math}</span>`;
    }
  }, [math]);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}

/**
 * Renderiza una fórmula matemática en línea (inline mode).
 * La fórmula se integra con el texto circundante.
 */
export function InlineMath({ math, className }: MathProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: false,
        strict: false, // Suprime advertencias como mathVsTextAccents
        throwOnError: false,
        output: 'htmlAndMathml', // Accesibilidad
      });
    } catch {
      return `<span style="color: #cc0000;">Error: ${math}</span>`;
    }
  }, [math]);

  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}
