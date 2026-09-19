import { cn } from '@/lib/utils';

/**
 * La marca de la aplicación: la misma sigma que el favicon, con terminales
 * rectos en vez de redondeados para que case con los filetes del resto.
 * Hereda el color del texto, así que sirve en los dos temas.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn('h-[18px] w-[18px]', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d="M22.5 8.5H10l6.6 7.5L10 23.5h12.5" />
    </svg>
  );
}
