import { BlockMath } from '@/components/shared/MathRenderer';

const CENTERED_FORMULA = "f'(x) \\approx \\frac{f(x+h) - f(x-h)}{2h}";

export function NumericalDiffHeader() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Patrón de rectas tangentes — evoca pendientes y derivadas */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(35deg, currentColor 1px, transparent 1px), linear-gradient(-55deg, currentColor 1px, transparent 1px), linear-gradient(80deg, currentColor 0.5px, transparent 0.5px)',
          backgroundSize: '50px 50px, 70px 35px, 90px 90px',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              09
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Aproximación · Diferencias Finitas
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Derivación Numérica
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Aproxima derivadas de funciones utilizando fórmulas de diferencias
            finitas: hacia adelante, hacia atrás, centrada, cinco puntos y
            segunda derivada. Incluye estudio de convergencia al refinar h.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-sm">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Diferencia centrada
          </p>
          <div className="overflow-x-auto text-center">
            <BlockMath math={CENTERED_FORMULA} />
          </div>
          <div className="mt-3 border-t border-border pt-3 text-center">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Cinco puntos
            </p>
            <BlockMath
              math={
                "f'(x) \\approx \\frac{-f(x+2h) + 8f(x+h) - 8f(x-h) + f(x-2h)}{12h}"
              }
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
