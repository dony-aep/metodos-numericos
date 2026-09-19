import { Button } from '@/components/ui/button';
import type { MethodFacts, MethodPitfall } from '@/types/method';

/**
 * Los tres números que deciden si un método sirve para un problema. El orden
 * de convergencia se suele citar solo, pero sin el coste por iteración no dice
 * nada: la secante converge más despacio que Newton y aun así suele ganarle,
 * porque gasta la mitad de evaluaciones.
 */
export function MethodFactSheet({ facts }: { facts: MethodFacts }) {
  const rows = [
    { label: 'Convergencia', value: facts.convergence },
    { label: 'Coste por paso', value: facts.cost },
    { label: 'Necesita', value: facts.requires.join(' · ') },
  ];

  return (
    <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)]">
      {rows.map((row) => (
        <div key={row.label} className="contents">
          <dt className="text-xs text-muted-foreground sm:pt-0.5">{row.label}</dt>
          <dd className="m-0 text-[15px] leading-relaxed">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

interface PitfallProps {
  pitfall: MethodPitfall;
  /** Carga en la calculadora los parámetros que rompen el método. */
  onLoadExample?: (example: Record<string, string>) => void;
}

export function MethodPitfallNote({ pitfall, onLoadExample }: PitfallProps) {
  const canRun = Boolean(pitfall.example && onLoadExample);

  return (
    <div className="max-w-2xl">
      <p className="text-[15px] font-medium">{pitfall.title}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        {pitfall.note}
      </p>
      {canRun && (
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => onLoadExample?.(pitfall.example!)}
        >
          Cargar el caso que falla
        </Button>
      )}
    </div>
  );
}
