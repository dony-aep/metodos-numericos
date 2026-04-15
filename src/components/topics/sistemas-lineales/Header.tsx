import { BlockMath } from '@/components/shared/MathRenderer';

const SYSTEM_FORMULA = "A\\mathbf{x} = \\mathbf{b}";

export function LinearSystemHeader() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-card">
      {/* Patrón de cuadrícula — evoca la estructura matricial */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="font-mono text-4xl font-black tracking-tighter text-border select-none sm:text-5xl">
              02
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Álgebra Lineal · Métodos Directos
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Sistemas de Ecuaciones Lineales
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Resolución de sistemas lineales mediante métodos directos.
            Ingresa la matriz de coeficientes y el vector de términos
            independientes para obtener la solución.
          </p>
        </div>

        <div className="w-full rounded-lg border border-border bg-muted/30 p-4 lg:max-w-xs">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Forma matricial
          </p>
          <div className="overflow-x-auto text-center">
            <BlockMath math={SYSTEM_FORMULA} />
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
    </header>
  );
}
