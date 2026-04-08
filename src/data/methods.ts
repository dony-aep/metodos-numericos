import type { NumericalMethod } from '@/types/method';

export const NUMERICAL_METHODS: NumericalMethod[] = [
  {
    slug: 'secante',
    title: 'Método de la Secante',
    shortDescription:
      'Método iterativo para encontrar raíces de ecuaciones no lineales sin usar derivadas.',
    status: 'available',
  },
  {
    slug: 'sistemas-lineales',
    title: 'Sistemas de ecuaciones lineales',
    shortDescription:
      'Fundamentos para representar y resolver sistemas lineales en forma matricial.',
    status: 'available',
  },
  {
    slug: 'eliminacion-gauss',
    title: 'Método de eliminación de Gauss',
    shortDescription:
      'Resolución paso a paso de sistemas lineales mediante eliminación y sustitución.',
    status: 'available',
  },
  {
    slug: 'jacobi-gauss-seidel',
    title: 'Métodos iterativos (Jacobi y Gauss-Seidel)',
    shortDescription:
      'Métodos aproximados para sistemas lineales y análisis de convergencia.',
    status: 'coming-soon',
  },
  {
    slug: 'interpolacion-polinomica',
    title: 'Interpolación polinómica',
    shortDescription:
      'Construcción de polinomios que aproximan un conjunto de datos discretos.',
    status: 'coming-soon',
  },
  {
    slug: 'newton-diferencias-divididas',
    title: 'Diferencias divididas de Newton',
    shortDescription:
      'Forma incremental de interpolación con tabla de diferencias divididas.',
    status: 'coming-soon',
  },
  {
    slug: 'lagrange',
    title: 'Interpolación de Lagrange',
    shortDescription:
      'Interpolación directa usando polinomios base de Lagrange.',
    status: 'coming-soon',
  },
  {
    slug: 'minimos-cuadrados',
    title: 'Ajuste por mínimos cuadrados',
    shortDescription:
      'Ajuste de curvas y rectas minimizando el error cuadrático total.',
    status: 'coming-soon',
  },
  {
    slug: 'derivacion-numerica',
    title: 'Derivación numérica',
    shortDescription:
      'Aproximación de derivadas con esquemas hacia adelante, atrás y centrados.',
    status: 'coming-soon',
  },
  {
    slug: 'integracion-numerica',
    title: 'Integración numérica (Trapecio y Simpson)',
    shortDescription:
      'Aproximación de integrales definidas con reglas compuestas.',
    status: 'coming-soon',
  },
  {
    slug: 'euler',
    title: 'Ecuaciones diferenciales ordinarias (Euler)',
    shortDescription:
      'Método de Euler para aproximar la solución de problemas de valor inicial.',
    status: 'coming-soon',
  },
];

export function getMethodBySlug(slug: string) {
  return NUMERICAL_METHODS.find((method) => method.slug === slug);
}
