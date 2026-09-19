import type { ReactNode } from 'react';

export interface TheoryAside {
  /** Qué es lo que hay debajo: «Cota del error», «Caso límite»… */
  label?: string;
  content: ReactNode;
  /**
   * Una ecuación larga, de las que se despliegan término a término, no cabe en
   * el margen: baja a todo el ancho bajo el texto. Es una decisión editorial,
   * no de tamaño: lo que es un apunte va al margen y lo que es una ecuación en
   * toda regla se muestra como tal.
   */
  wide?: boolean;
}

interface TheoryBlockProps {
  title: string;
  /** Fórmulas y apuntes que acompañan al texto, en el margen derecho. */
  asides?: TheoryAside[];
  children: ReactNode;
}

/**
 * Un apartado de teoría compuesto como una página de libro: la prosa en una
 * medida legible, de unos 68 caracteres, y las fórmulas fuera del cuerpo del
 * texto, en el margen. Antes cada fórmula partía el párrafo en dos y todo
 * pesaba igual.
 */
export function TheoryBlock({ title, asides, children }: TheoryBlockProps) {
  const margin = asides?.filter((aside) => !aside.wide) ?? [];
  const wide = asides?.filter((aside) => aside.wide) ?? [];

  return (
    <section className="border-t border-border pt-7 first:border-t-0 first:pt-0">
      <h3 className="text-sm font-medium">{title}</h3>

      <div className="mt-5 grid gap-x-10 gap-y-7 lg:grid-cols-[minmax(0,33rem)_minmax(0,20rem)] lg:items-start">
        <div className="min-w-0 space-y-4 text-[15px] leading-[1.7] text-muted-foreground [&_li]:leading-[1.7] [&_strong]:font-medium [&_strong]:text-foreground">
          {children}
        </div>

        {margin.length > 0 && (
          <aside className="min-w-0 space-y-6">
            {margin.map((aside, index) => (
              <figure key={aside.label ?? index} className="m-0 min-w-0">
                {aside.label && (
                  <figcaption className="mb-2 text-xs text-muted-foreground">
                    {aside.label}
                  </figcaption>
                )}
                <div className="text-[13px] text-foreground">{aside.content}</div>
              </figure>
            ))}
          </aside>
        )}

        {wide.map((aside, index) => (
          <figure key={aside.label ?? index} className="m-0 min-w-0 lg:col-span-2">
            {aside.label && (
              <figcaption className="mb-2 text-xs text-muted-foreground">
                {aside.label}
              </figcaption>
            )}
            <div className="text-foreground">{aside.content}</div>
          </figure>
        ))}
      </div>
    </section>
  );
}

/** Los apartados de teoría de un método, separados por filete. */
export function TheoryStack({ children }: { children: ReactNode }) {
  return <div className="space-y-7">{children}</div>;
}
