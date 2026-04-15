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
      'Resolución de sistemas lineales en forma matricial Ax = b mediante métodos directos.',
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
      'Resolución iterativa de sistemas lineales grandes mediante aproximaciones sucesivas.',
    status: 'available',
  },
  {
    slug: 'interpolacion-polinomica',
    title: 'Interpolación polinómica',
    shortDescription:
      'Construcción del polinomio único que pasa exactamente por un conjunto de puntos dados.',
    status: 'available',
  },
  {
    slug: 'newton-diferencias-divididas',
    title: 'Diferencias divididas de Newton',
    shortDescription:
      'Forma incremental de interpolación con tabla de diferencias divididas.',
    status: 'available',
  },
  {
    slug: 'lagrange',
    title: 'Interpolación de Lagrange',
    shortDescription:
      'Interpolación directa usando polinomios base de Lagrange.',
    status: 'available',
  },
  {
    slug: 'minimos-cuadrados',
    title: 'Ajuste por mínimos cuadrados',
    shortDescription:
      'Ajuste de curvas y rectas minimizando el error cuadrático total.',
    status: 'available',
  },
  {
    slug: 'derivacion-numerica',
    title: 'Derivación numérica',
    shortDescription:
      'Aproximación de derivadas con esquemas hacia adelante, atrás y centrados.',
    status: 'available',
  },
  {
    slug: 'integracion-numerica',
    title: 'Integración numérica (Trapecio y Simpson)',
    shortDescription:
      'Aproximación de integrales definidas con reglas compuestas.',
    status: 'available',
  },
  {
    slug: 'euler',
    title: 'Ecuaciones diferenciales ordinarias (Euler)',
    shortDescription:
      'Método de Euler para aproximar la solución de problemas de valor inicial.',
    status: 'available',
  },
];

export function getMethodBySlug(slug: string) {
  return NUMERICAL_METHODS.find((method) => method.slug === slug);
}
