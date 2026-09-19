export type MethodStatus = 'available' | 'coming-soon';

export type MethodFamilyId =
  | 'fundamentos'
  | 'raices'
  | 'sistemas'
  | 'aproximacion'
  | 'calculo'
  | 'diferenciales';

/** Fórmula que identifica al método, en LaTeX, para el encabezado del módulo. */
export interface MethodFormula {
  caption: string;
  latex: string;
}

/** Los números que deciden si un método sirve para un problema. */
export interface MethodFacts {
  /** Orden de convergencia, o qué lo gobierna cuando no itera. */
  convergence: string;
  /** Lo que cuesta cada paso, casi siempre en evaluaciones de f. */
  cost: string;
  /** Sin esto el método no se puede aplicar. */
  requires: string[];
}

/** Cómo se rompe el método, que es lo que más enseña de él. */
export interface MethodPitfall {
  title: string;
  note: string;
  /** Parámetros que lo reproducen en la calculadora del módulo. */
  example?: Record<string, string>;
}

export interface NumericalMethod {
  slug: string;
  title: string;
  /** Versión corta para la barra lateral, donde el ancho es de 264px. */
  navTitle: string;
  shortDescription: string;
  /** Párrafo de entrada del módulo. */
  description: string;
  family: MethodFamilyId;
  formulas: MethodFormula[];
  facts: MethodFacts;
  pitfall: MethodPitfall;
  status: MethodStatus;
}

export interface MethodFamily {
  id: MethodFamilyId;
  label: string;
  summary: string;
}
