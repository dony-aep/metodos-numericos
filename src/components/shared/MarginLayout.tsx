import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * La rejilla del cuaderno: una columna de margen a la izquierda que recorre
 * toda la página con los rótulos, y la columna de trabajo a la derecha. Los
 * filetes cruzan ambas porque cada sección aporta dos celdas contiguas.
 */
export function MarginGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid lg:grid-cols-[16.5rem_minmax(0,1fr)]',
        className
      )}
    >
      {children}
    </div>
  );
}

interface MarginSectionProps {
  label?: string;
  note?: string;
  children: ReactNode;
  /** El rótulo del margen se alinea arriba salvo que la sección sea muy alta. */
  sticky?: boolean;
  divider?: boolean;
  contentClassName?: string;
}

export function MarginSection({
  label,
  note,
  children,
  sticky = false,
  divider = true,
  contentClassName,
}: MarginSectionProps) {
  const edge = divider ? 'border-b border-border' : '';

  return (
    <>
      <div
        className={cn(
          'hidden px-6 py-6 lg:block lg:border-r lg:border-border lg:pl-10',
          edge
        )}
      >
        {(label || note) && (
          <div className={cn(sticky && 'lg:sticky lg:top-20')}>
            {label && <p className="text-sm font-medium">{label}</p>}
            {note && (
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {note}
              </p>
            )}
          </div>
        )}
      </div>

      <div className={cn('min-w-0 px-6 py-6 lg:px-10', edge, contentClassName)}>
        {label && (
          <p className="mb-4 text-sm font-medium lg:hidden">{label}</p>
        )}
        {children}
      </div>
    </>
  );
}
