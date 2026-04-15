import { createMathFunction } from '@/utils/mathParser';
import type {
  IntegrationInput,
  IntegrationMethodResult,
  IntegrationResult,
} from '@/types/numerical-integration';

function compositeTrapezoid(
  f: (x: number) => number,
  a: number,
  b: number,
  n: number
): IntegrationMethodResult {
  const h = (b - a) / n;
  const nodes: IntegrationMethodResult['nodes'] = [];

  for (let i = 0; i <= n; i++) {
    const x = a + i * h;
    const fx = f(x);
    const weight = i === 0 || i === n ? 1 : 2;
    nodes.push({ x, fx, weight });
  }

  const sum = nodes.reduce((acc, node) => acc + node.weight * node.fx, 0);
  const value = (h / 2) * sum;

  return {
    method: 'trapezoid',
    label: 'Regla del Trapecio',
    value,
    error: null,
    order: 'O(h²)',
    nodes,
  };
}

function compositeSimpson(
  f: (x: number) => number,
  a: number,
  b: number,
  n: number
): IntegrationMethodResult | null {
  if (n % 2 !== 0) return null;

  const h = (b - a) / n;
  const nodes: IntegrationMethodResult['nodes'] = [];

  for (let i = 0; i <= n; i++) {
    const x = a + i * h;
    const fx = f(x);
    let weight: number;
    if (i === 0 || i === n) {
      weight = 1;
    } else if (i % 2 !== 0) {
      weight = 4;
    } else {
      weight = 2;
    }
    nodes.push({ x, fx, weight });
  }

  const sum = nodes.reduce((acc, node) => acc + node.weight * node.fx, 0);
  const value = (h / 3) * sum;

  return {
    method: 'simpson',
    label: 'Regla de Simpson 1/3',
    value,
    error: null,
    order: 'O(h⁴)',
    nodes,
  };
}

export function solveNumericalIntegration(
  input: IntegrationInput
): IntegrationResult {
  const { expression, a, b, n, exactValue } = input;

  const f = createMathFunction(expression);

  // Verify function evaluates at endpoints
  const testA = f(a);
  const testB = f(b);
  if (!Number.isFinite(testA) || !Number.isFinite(testB)) {
    return {
      expression,
      a,
      b,
      n,
      h: (b - a) / n,
      trapezoid: {
        method: 'trapezoid',
        label: 'Regla del Trapecio',
        value: NaN,
        error: null,
        order: 'O(h²)',
        nodes: [],
      },
      simpson: null,
      convergenceStudy: [],
      message: `Error: la función no se puede evaluar en el intervalo [${a}, ${b}].`,
    };
  }

  const h = (b - a) / n;

  const trapezoid = compositeTrapezoid(f, a, b, n);
  const simpson = compositeSimpson(f, a, b, n);

  // Compute errors if exact value given
  if (exactValue !== undefined && Number.isFinite(exactValue)) {
    trapezoid.error = Math.abs(trapezoid.value - exactValue);
    if (simpson) {
      simpson.error = Math.abs(simpson.value - exactValue);
    }
  }

  // Convergence study: n, 2n, 4n, 8n, 16n, 32n
  const convergenceStudy: IntegrationResult['convergenceStudy'] = [];
  const baseN = Math.max(2, n % 2 === 0 ? n : n + 1); // ensure even for Simpson
  let currentN = baseN;
  for (let i = 0; i < 6; i++) {
    const trap = compositeTrapezoid(f, a, b, currentN);
    const simp = compositeSimpson(f, a, b, currentN);
    convergenceStudy.push({
      n: currentN,
      trapezoid: trap.value,
      simpson: simp ? simp.value : null,
    });
    currentN *= 2;
  }

  const simpsonNote = n % 2 !== 0
    ? ' Simpson requiere n par; se muestra solo Trapecio para n = ' + n + '.'
    : '';

  return {
    expression,
    a,
    b,
    n,
    h,
    trapezoid,
    simpson,
    convergenceStudy,
    message: `Integral de f(x) = ${expression} en [${a}, ${b}] con n = ${n} subintervalos (h = ${h.toPrecision(4)}).${simpsonNote}`,
  };
}
