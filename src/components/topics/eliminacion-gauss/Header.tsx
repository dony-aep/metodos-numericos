import { BlockMath } from '@/components/shared/MathRenderer';

const ELIMINATION_FORMULA =
  "m_{ik} = \\frac{a_{ik}}{a_{kk}}, \\quad F_i \\leftarrow F_i - m_{ik}F_k";

export function GaussEliminationHeader() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Patrón diagonal — evoca la forma triangular superior */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, currentColor, currentColor 1px, transparent 1px, transparent 40px)',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              03
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Álgebra Lineal · Método Directo
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Eliminación de Gauss
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Transformación de un sistema lineal en forma triangular superior
            mediante operaciones elementales de fila, seguida de sustitución
            hacia atrás para obtener la solución.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-sm">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Operación de eliminación
          </p>
          <div className="overflow-x-auto text-center">
            <BlockMath math={ELIMINATION_FORMULA} />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
