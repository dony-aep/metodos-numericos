import type { ReactNode } from 'react';

/** Una gráfica con su pie, separada del resto por un filete y no por una caja. */
export function ResultFigure({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="m-0 min-w-0">
      {children}
      <figcaption className="mt-2 border-t border-rule pt-2 text-xs text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

/** Rejilla para las gráficas de una sección: dos por fila cuando hay sitio. */
export function FigureGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-8 xl:grid-cols-2">{children}</div>;
}
