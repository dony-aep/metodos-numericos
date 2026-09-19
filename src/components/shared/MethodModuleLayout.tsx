import type { ReactNode } from 'react';
import { BlockMath } from '@/components/shared/MathRenderer';
import {
  MethodFactSheet,
  MethodPitfallNote,
} from '@/components/shared/MethodFactSheet';
import { MarginGrid, MarginSection } from '@/components/shared/MarginLayout';
import { getFamily } from '@/data/families';
import { getMethodBySlug } from '@/data/methods';

export interface MethodSection {
  label: string;
  note?: string;
  content: ReactNode;
}

interface MethodModuleLayoutProps {
  slug: string;
  /** Rótulo de la sección de entrada en el margen. */
  inputTitle?: string;
  inputSection: ReactNode;
  /** Resultados divididos, cada parte con su rótulo en el margen. */
  resultSections?: MethodSection[];
  emptyState?: ReactNode;
  theorySection: ReactNode;
  /**
   * Carga en la calculadora los parámetros con los que el método falla. Los
   * módulos que lo pasan muestran el botón; los demás solo describen el caso.
   */
  onLoadPitfall?: (example: Record<string, string>) => void;
}

/**
 * Cada método se compone sobre la rejilla del cuaderno: el margen nombra lo
 * que hay a su derecha y los filetes separan las secciones de arriba abajo.
 */
export function MethodModuleLayout({
  slug,
  inputTitle = 'Parámetros',
  inputSection,
  resultSections,
  emptyState,
  theorySection,
  onLoadPitfall,
}: MethodModuleLayoutProps) {
  const method = getMethodBySlug(slug);
  if (!method) throw new Error(`Método desconocido: ${slug}`);
  const family = getFamily(method.family);

  const sections = resultSections ?? [];

  return (
    <MarginGrid>
      <MarginSection label={method.title}>
        <div className="flex flex-col gap-8 2xl:flex-row 2xl:items-start 2xl:justify-between 2xl:gap-12">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{family.label}</p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {method.description}
            </p>
          </div>

          <div className="flex min-w-0 flex-wrap gap-x-10 gap-y-6">
            {method.formulas.map((formula) => (
              <figure key={formula.caption} className="min-w-0 max-w-full">
                {/* El desplazamiento lo lleva ya BlockMath; envolverlo en otro
                    contenedor con overflow dejaba dos píxeles de barra fantasma. */}
                <BlockMath math={formula.latex} className="text-[15px]" />
                <figcaption className="mt-2 text-xs text-muted-foreground">
                  {formula.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </MarginSection>

      <MarginSection label="Ficha">
        <MethodFactSheet facts={method.facts} />
      </MarginSection>

      <MarginSection
        label="Cuándo falla"
        note="Lo que un método no puede hacer explica mejor para qué sirve que cualquier lista de ventajas."
      >
        <MethodPitfallNote
          pitfall={method.pitfall}
          onLoadExample={onLoadPitfall}
        />
      </MarginSection>

      <MarginSection label={inputTitle} contentClassName="@container">
        {inputSection}
      </MarginSection>

      {sections.map((section) => (
        <MarginSection
          key={section.label}
          label={section.label}
          note={section.note}
          sticky
        >
          {section.content}
        </MarginSection>
      ))}

      {emptyState && <MarginSection>{emptyState}</MarginSection>}

      <MarginSection label="Teoría" sticky divider={false}>
        {theorySection}
      </MarginSection>
    </MarginGrid>
  );
}
