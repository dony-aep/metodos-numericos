import { BlockMath } from '@/components/shared/MathRenderer';

const LAGRANGE_FORMULA =
  "P_n(x) = \\sum_{k=0}^{n} y_k \\, L_k(x)";

export function LagrangeHeader() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Patrón de arcos cruzados — evoca las curvas base L_k que se encienden/apagan */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 0% 50%, currentColor 1px, transparent 1px), radial-gradient(circle at 100% 50%, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              07
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Interpolación · Polinomios Base
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Interpolación de Lagrange
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Construcción directa del polinomio interpolante mediante bases
            de Lagrange. Cada base «enciende» un valor en su nodo y «apaga»
            los demás, garantizando paso exacto por todos los puntos.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-sm">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Fórmula de Lagrange
          </p>
          <div className="overflow-x-auto text-center">
            <BlockMath math={LAGRANGE_FORMULA} />
          </div>
          <div className="mt-3 border-t border-border pt-3 text-center">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Base de Lagrange
            </p>
            <BlockMath math={"L_k(x) = \\prod_{\\substack{j=0 \\\\ j \\ne k}}^{n} \\frac{x - x_j}{x_k - x_j}"} />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
