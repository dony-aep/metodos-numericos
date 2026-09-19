import type { MethodFamily, MethodFamilyId } from '@/types/method';

/**
 * El orden es el del temario: cada familia se apoya en la anterior.
 * La barra lateral y el panel principal recorren esta lista tal cual.
 */
export const METHOD_FAMILIES: MethodFamily[] = [
  {
    id: 'fundamentos',
    label: 'Fundamentos',
    summary: 'Cuánto se aleja un número aproximado del exacto, y por qué.',
  },
  {
    id: 'raices',
    label: 'Raíces de ecuaciones',
    summary: 'Encontrar los valores donde una función se anula.',
  },
  {
    id: 'sistemas',
    label: 'Sistemas lineales',
    summary: 'Resolver Ax = b por caminos directos o iterativos.',
  },
  {
    id: 'aproximacion',
    label: 'Interpolación y ajuste',
    summary: 'Pasar de una nube de puntos a una función.',
  },
  {
    id: 'calculo',
    label: 'Cálculo numérico',
    summary: 'Derivar e integrar cuando solo hay muestras.',
  },
  {
    id: 'diferenciales',
    label: 'Ecuaciones diferenciales',
    summary: 'Avanzar una solución en el tiempo, paso a paso.',
  },
];

export function getFamily(id: MethodFamilyId): MethodFamily {
  const family = METHOD_FAMILIES.find((item) => item.id === id);
  if (!family) throw new Error(`Familia desconocida: ${id}`);
  return family;
}
