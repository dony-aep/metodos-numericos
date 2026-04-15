import { BlockMath } from '@/components/shared/MathRenderer';

const NORMAL_EQ = "A^T A \\, \\mathbf{c} = A^T \\mathbf{b}";

export function LeastSquaresHeader() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Patrón de líneas de regresión — evoca rectas de ajuste cruzándose */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(25deg, currentColor 1px, transparent 1px), linear-gradient(-15deg, currentColor 1px, transparent 1px)',
          backgroundSize: '60px 30px, 80px 40px',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              08
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Aproximación · Regresión
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Ajuste por Mínimos Cuadrados
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Encuentra la curva que mejor representa un conjunto de datos
            minimizando la suma de los cuadrados de los residuos. Soporta
            ajuste lineal y polinómico de grado arbitrario.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-sm">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Ecuaciones normales
          </p>
          <div className="overflow-x-auto text-center">
            <BlockMath math={NORMAL_EQ} />
          </div>
          <div className="mt-3 border-t border-border pt-3 text-center">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Minimizar
            </p>
            <BlockMath math={"S = \\sum_{i=1}^{n} \\left(y_i - f(x_i)\\right)^2"} />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
