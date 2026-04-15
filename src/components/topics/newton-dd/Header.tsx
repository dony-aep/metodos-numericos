import { BlockMath } from '@/components/shared/MathRenderer';

const NEWTON_FORMULA =
  "P_n(x) = \\sum_{k=0}^{n} f[x_0,\\dots,x_k] \\prod_{j=0}^{k-1}(x - x_j)";

export function NewtonDDHeader() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Patrón triangular — evoca la tabla triangular de diferencias divididas */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(60deg, currentColor 1px, transparent 1px), linear-gradient(-60deg, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              06
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Aproximación · Diferencias Divididas
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Newton — Diferencias Divididas
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Construcción incremental del polinomio interpolante mediante una
            tabla triangular de diferencias divididas. Permite agregar nuevos
            puntos sin recalcular todo el polinomio.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-sm">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Polinomio de Newton
          </p>
          <div className="overflow-x-auto text-center">
            <BlockMath math={NEWTON_FORMULA} />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
