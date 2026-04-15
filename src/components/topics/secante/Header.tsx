import { BlockMath } from '@/components/shared/MathRenderer';

const SECANT_FORMULA = "x_{n+1} = x_n - f(x_n) \\cdot \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}";

export function Header() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Patrón de líneas horizontales — sutil textura editorial */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, currentColor, currentColor 1px, transparent 1px, transparent 40px)',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              01
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Análisis Numérico · Búsqueda de raíces
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Método de la Secante
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Método iterativo para encontrar raíces de funciones sin calcular
            derivadas. Aproxima la pendiente usando la recta secante entre dos
            puntos sucesivos de la curva.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-sm">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Fórmula iterativa
          </p>
          <div className="overflow-x-auto">
            <BlockMath math={SECANT_FORMULA} />
          </div>
        </div>
      </div>

      {/* Línea de acento inferior — monocromática */}
      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
