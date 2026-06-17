import { BlockMath } from '@/components/shared/MathRenderer';

const HEAT_EQUATION = '\\frac{\\partial u}{\\partial t} = \\alpha\\,\\frac{\\partial^2 u}{\\partial x^2}';
const FTCS_FORMULA = 'u_i^{\\,n+1} = u_i^{\\,n} + \\lambda\\left(u_{i+1}^{\\,n} - 2u_i^{\\,n} + u_{i-1}^{\\,n}\\right)';

export function HeatDiffusionHeader() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Patrón de gradiente — evoca la difusión del calor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 0%, currentColor 0px, transparent 60%)',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              12
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              EDP · Parabólica
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Ecuación de difusión del calor
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Resuelve la ecuación del calor en 1D mediante diferencias finitas con
            el esquema explícito FTCS. Pasamos de las EDO (una variable) a las EDP
            (espacio y tiempo): el calor fluye de lo caliente a lo frío hasta
            equilibrarse.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-sm">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Ecuación del calor (1D)
          </p>
          <div className="overflow-x-auto text-center">
            <BlockMath math={HEAT_EQUATION} />
          </div>
          <div className="mt-3 border-t border-border pt-3 text-center">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Esquema explícito (FTCS)
            </p>
            <div className="overflow-x-auto">
              <BlockMath math={FTCS_FORMULA} />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
