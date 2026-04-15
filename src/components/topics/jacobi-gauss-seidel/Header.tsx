import { BlockMath } from '@/components/shared/MathRenderer';

const JACOBI_FORMULA =
  "x_i^{(k+1)} = \\frac{1}{a_{ii}}\\left(b_i - \\sum_{j \\neq i} a_{ij}x_j^{(k)}\\right)";

export function IterativeMethodsHeader() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Patrón de puntos — evoca la naturaleza iterativa (puntos sucesivos) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              04
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Álgebra Lineal · Métodos Iterativos
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Jacobi y Gauss-Seidel
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Métodos iterativos para resolver sistemas lineales mediante
            aproximaciones sucesivas. Especialmente útiles para sistemas grandes
            y matrices dispersas.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-sm">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Fórmula de Jacobi
          </p>
          <div className="overflow-x-auto text-center">
            <BlockMath math={JACOBI_FORMULA} />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
