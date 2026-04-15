import { BlockMath } from '@/components/shared/MathRenderer';

const TRAPEZOID_FORMULA =
  "\\int_a^b f(x)\\,dx \\approx \\frac{h}{2}\\left[f(x_0)+2\\sum_{i=1}^{n-1}f(x_i)+f(x_n)\\right]";

export function NumericalIntegrationHeader() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Patrón de trapecios y parábolas — evoca subdivisiones de área */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 39px, currentColor 39px, currentColor 40px), repeating-linear-gradient(0deg, transparent, transparent 29px, currentColor 29px, currentColor 30px)',
          backgroundSize: '40px 30px',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              10
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Cuadratura · Newton-Cotes
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Integración Numérica
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Aproxima integrales definidas usando la regla del Trapecio
            (segmentos rectos) y la regla de Simpson 1/3 (parábolas).
            Incluye versiones compuestas y estudio de convergencia.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-sm">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Trapecio compuesto
          </p>
          <div className="overflow-x-auto text-center">
            <BlockMath math={TRAPEZOID_FORMULA} />
          </div>
          <div className="mt-3 border-t border-border pt-3 text-center">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Simpson 1/3
            </p>
            <BlockMath
              math={
                "\\int_a^b f(x)\\,dx \\approx \\frac{h}{3}\\left[f(x_0)+4\\sum_{\\text{impar}}f(x_i)+2\\sum_{\\text{par}}f(x_i)+f(x_n)\\right]"
              }
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
