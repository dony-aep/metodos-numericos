import { createMathFunction } from '@/utils/mathParser';
import type {
  DiffApproximation,
  NumericalDiffInput,
  NumericalDiffResult,
} from '@/types/numerical-diff';

function forward(f: (x: number) => number, x: number, h: number): number {
  return (f(x + h) - f(x)) / h;
}

function backward(f: (x: number) => number, x: number, h: number): number {
  return (f(x) - f(x - h)) / h;
}

function centered(f: (x: number) => number, x: number, h: number): number {
  return (f(x + h) - f(x - h)) / (2 * h);
}

function fivePoint(f: (x: number) => number, x: number, h: number): number {
  return (f(x - 2 * h) - 8 * f(x - h) + 8 * f(x + h) - f(x + 2 * h)) / (12 * h);
}

function secondCentered(f: (x: number) => number, x: number, h: number): number {
  return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
}

export function solveNumericalDiff(
  input: NumericalDiffInput
): NumericalDiffResult {
  const { expression, x, h, exactValue } = input;

  const f = createMathFunction(expression);

  // Verify function evaluates properly
  const testVal = f(x);
  if (!Number.isFinite(testVal)) {
    return {
      x,
      h,
      expression,
      approximations: [],
      convergenceStudy: [],
      message: `Error: la función no se puede evaluar en x = ${x}.`,
    };
  }

  const fwd = forward(f, x, h);
  const bwd = backward(f, x, h);
  const ctr = centered(f, x, h);
  const fp = fivePoint(f, x, h);
  const sc = secondCentered(f, x, h);

  const computeError = (val: number): number | null => {
    if (exactValue === undefined || !Number.isFinite(exactValue)) return null;
    return Math.abs(val - exactValue);
  };

  const approximations: DiffApproximation[] = [
    {
      method: 'forward',
      label: 'Diferencia hacia adelante',
      value: fwd,
      error: computeError(fwd),
      order: 'O(h)',
    },
    {
      method: 'backward',
      label: 'Diferencia hacia atrás',
      value: bwd,
      error: computeError(bwd),
      order: 'O(h)',
    },
    {
      method: 'centered',
      label: 'Diferencia centrada',
      value: ctr,
      error: computeError(ctr),
      order: 'O(h²)',
    },
    {
      method: 'five-point',
      label: 'Centrada 5 puntos',
      value: fp,
      error: computeError(fp),
      order: 'O(h⁴)',
    },
    {
      method: 'second-centered',
      label: 'Segunda derivada centrada',
      value: sc,
      error: null, // Different derivative order, not comparable
      order: 'O(h²)',
    },
  ];

  // Convergence study: compute for h, h/2, h/4, h/8, h/16, h/32
  const convergenceStudy: NumericalDiffResult['convergenceStudy'] = [];
  let currentH = h;
  for (let i = 0; i < 8; i++) {
    convergenceStudy.push({
      h: currentH,
      forward: forward(f, x, currentH),
      backward: backward(f, x, currentH),
      centered: centered(f, x, currentH),
    });
    currentH /= 2;
  }

  return {
    x,
    h,
    expression,
    approximations,
    convergenceStudy,
    message: `Derivadas numéricas de f(x) = ${expression} evaluadas en x = ${x} con h = ${h}.`,
  };
}
