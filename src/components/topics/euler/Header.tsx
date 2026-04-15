import { BlockMath } from '@/components/shared/MathRenderer';

const EULER_FORMULA = "y_{n+1} = y_n + h \\, f(x_n, y_n)";

export function EulerHeader() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Patrón de curvas escalonadas — evoca la aproximación paso a paso */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0px, transparent 19px, currentColor 19px, currentColor 20px), repeating-linear-gradient(90deg, transparent 0px, transparent 39px, currentColor 39px, currentColor 40px)',
          backgroundSize: '20px 20px, 40px 40px',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              11
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              EDO · Valor Inicial
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Método de Euler
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Resuelve problemas de valor inicial para ecuaciones diferenciales
            ordinarias aproximando la curva solución con rectas tangentes en
            cada paso. Es el método más sencillo y fundamental.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-sm">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Fórmula de recurrencia
          </p>
          <div className="overflow-x-auto text-center">
            <BlockMath math={EULER_FORMULA} />
          </div>
          <div className="mt-3 border-t border-border pt-3 text-center">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Problema de valor inicial
            </p>
            <BlockMath
              math={"\\frac{dy}{dx} = f(x,y), \\quad y(x_0) = y_0"}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
