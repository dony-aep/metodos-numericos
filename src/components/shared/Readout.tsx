import { cn } from '@/lib/utils';

export interface ReadoutValue {
  label: string;
  value: string;
}

/**
 * Las cifras que resume un cálculo, en monoespaciada y a tamaño grande.
 * Sin tarjetas: las separa el filete vertical, como en un panel de lectura.
 */
export function Readout({
  values,
  className,
}: {
  values: ReadoutValue[];
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap', className)}>
      {values.map((entry, index) => (
        <div
          key={entry.label}
          className={cn(
            'min-w-0 pr-8 sm:pr-12',
            index > 0 && 'border-l border-rule pl-8 sm:pl-12'
          )}
        >
          <p className="text-xs text-muted-foreground">{entry.label}</p>
          <p className="mt-2 font-mono text-2xl tracking-tight sm:text-[1.75rem]">
            {entry.value}
          </p>
        </div>
      ))}
    </div>
  );
}
