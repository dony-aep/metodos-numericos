import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { NUMERICAL_METHODS } from '@/data/methods';
import { cn } from '@/lib/utils';

const availableCount = NUMERICAL_METHODS.filter((m) => m.status === 'available').length;

export function DashboardPage() {
  return (
    <div>
      {/* Hero */}
      <header className="flex items-start justify-between gap-6 border-b border-border pb-8 pt-2">
        <div className="min-w-0">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Análisis numérico
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Métodos Numéricos
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Módulos con teoría, calculadora interactiva y visualización de
            resultados. Selecciona un tema para comenzar.
          </p>
        </div>
        <div className="hidden shrink-0 flex-col items-end sm:flex">
          <span className="select-none font-mono text-7xl font-thin leading-none tabular-nums text-muted-foreground/25">
            {availableCount.toString().padStart(2, '0')}
          </span>
          <span className="mt-1 text-xs text-muted-foreground">
            / {NUMERICAL_METHODS.length} módulos disponibles
          </span>
        </div>
      </header>

      {/* Section label */}
      <div className="flex items-center gap-3 py-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Todos los módulos
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Mosaic grid */}
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {NUMERICAL_METHODS.map((method, index) => {
          const isAvailable = method.status === 'available';
          const num = (index + 1).toString().padStart(2, '0');

          return (
            <div
              key={method.slug}
              className={cn(
                'group flex flex-col gap-3 bg-background p-5 transition-colors',
                isAvailable ? 'hover:bg-muted/40' : 'opacity-50'
              )}
            >
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground/40">
                {num}
              </span>
              <div className="flex-1 space-y-1.5">
                <h2 className="text-sm font-semibold leading-snug">
                  {method.title}
                </h2>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {method.shortDescription}
                </p>
              </div>
              <div className="border-t border-border pt-3">
                {isAvailable ? (
                  <Link
                    to={`/metodos/${method.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-all hover:gap-2.5"
                  >
                    Entrar al módulo
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ) : (
                  <span className="text-xs text-muted-foreground/50">
                    En preparación
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
