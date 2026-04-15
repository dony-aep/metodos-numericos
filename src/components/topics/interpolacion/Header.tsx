import { BlockMath } from '@/components/shared/MathRenderer';

const LAGRANGE_FORMULA =
  "P_n(x) = \\sum_{i=0}^{n} y_i \\prod_{j \\neq i} \\frac{x - x_j}{x_i - x_j}";

export function InterpolationHeader() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Patrón de curva sinuosa — evoca la interpolación entre puntos */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80px 40px at 50% 50%, currentColor 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              05
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Aproximación · Polinomios
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Interpolación Polinómica
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Construcción de un polinomio que pasa exactamente por un conjunto
            de puntos conocidos. Útil para estimar valores intermedios y
            aproximar funciones a partir de datos discretos.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-sm">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Forma de Lagrange
          </p>
          <div className="overflow-x-auto text-center">
            <BlockMath math={LAGRANGE_FORMULA} />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
