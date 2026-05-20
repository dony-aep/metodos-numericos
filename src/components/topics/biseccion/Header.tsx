import { BlockMath } from '@/components/shared/MathRenderer';

export function BisectionHeader() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 20px)',
          backgroundSize: '100% 20px',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              03
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Método Cerrado · Raíces
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Método de Bisección
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Divide repetidamente un intervalo en dos mitades y conserva aquella
            donde la función cambia de signo. Simple, robusto y siempre converge
            si se cumplen las condiciones del Teorema del Valor Intermedio.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-sm">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Punto medio
          </p>
          <div className="overflow-x-auto text-center">
            <BlockMath math={"c = \\frac{a + b}{2}"} />
          </div>
          <div className="mt-3 border-t border-border pt-3 text-center">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Cota del error
            </p>
            <BlockMath math={"E_n \\leq \\frac{b - a}{2^n}"} />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
