const FLOOR = 1e-12;

/**
 * El error de una iteración, con una barra en escala logarítmica al lado.
 * La escala es la que hace legible la convergencia: en lineal, a partir de la
 * cuarta fila todas las barras miden lo mismo (cero).
 */
export function ErrorBar({ error, min = 1e-8 }: { error: number; min?: number }) {
  const safe = Math.max(Math.abs(error), FLOOR);
  const span = -Math.log10(min);
  const ratio = Math.min(Math.max((Math.log10(safe) + span) / span, 0), 1);

  return (
    <span className="flex items-center justify-end gap-4">
      <span aria-hidden="true" className="hidden w-36 justify-end sm:flex">
        <span
          className="h-px bg-foreground"
          style={{ width: `${(ratio * 100).toFixed(1)}%` }}
        />
      </span>
      <span className="w-20 text-right font-mono text-muted-foreground">
        {Number.isFinite(error) ? error.toExponential(2) : '—'}
      </span>
    </span>
  );
}
