import { BlockMath } from '@/components/shared/MathRenderer';

export function NewtonRaphsonHeader() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(45deg, currentColor 1px, transparent 1px), linear-gradient(-45deg, currentColor 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              04
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Método Abierto · Tangentes
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Newton-Raphson
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Aproxima raíces usando la recta tangente en cada iteración.
            Convergencia cuadrática cerca de la raíz, lo que lo hace uno de los
            métodos más rápidos en análisis numérico.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-sm">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Fórmula iterativa
          </p>
          <div className="overflow-x-auto text-center">
            <BlockMath math={"x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}"} />
          </div>
          <div className="mt-3 border-t border-border pt-3 text-center">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Convergencia cuadrática
            </p>
            <BlockMath math={"|e_{n+1}| \\approx C|e_n|^2"} />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
