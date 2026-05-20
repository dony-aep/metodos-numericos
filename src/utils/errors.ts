import type { ErrorsInput, ErrorsResult, TaylorInput, TaylorResult } from '@/types/errors';
import { createMathFunction } from '@/utils/mathParser';

export function computeErrors(input: ErrorsInput): ErrorsResult {
  const { exactValue, approxValue } = input;

  const absoluteError = Math.abs(exactValue - approxValue);
  const relativeError = exactValue !== 0 ? absoluteError / Math.abs(exactValue) : 0;
  const percentageError = relativeError * 100;

  // Significant digits: n where relative error < 0.5 * 10^(2-n)
  let significantDigits = 0;
  if (relativeError > 0) {
    significantDigits = Math.max(0, Math.floor(-Math.log10(2 * relativeError)));
  } else {
    significantDigits = 16; // máxima precisión de punto flotante
  }

  return {
    exactValue,
    approxValue,
    absoluteError,
    relativeError,
    percentageError,
    significantDigits,
    message: `Error absoluto: ${absoluteError.toExponential(6)}`,
  };
}

export function computeTaylorApproximation(input: TaylorInput): TaylorResult {
  const { expression, a, x, n } = input;
  const f = createMathFunction(expression);
  const exactValue = f(x);

  if (!Number.isFinite(exactValue)) {
    return { exactValue: NaN, terms: [], message: 'No se pudo evaluar f(x) en el punto dado.' };
  }

  const h = 1e-5;
  const terms: TaylorResult['terms'] = [];

  // Compute numerical derivatives at point a using central differences
  const derivatives: number[] = [f(a)];
  for (let k = 1; k <= n; k++) {
    derivatives.push(numericalDerivative(f, a, k, h));
  }

  // Build Taylor polynomial incrementally
  let approx = 0;
  for (let k = 0; k <= n; k++) {
    approx += (derivatives[k] / factorial(k)) * Math.pow(x - a, k);
    terms.push({
      n: k,
      approximation: approx,
      error: Math.abs(exactValue - approx),
    });
  }

  return {
    exactValue,
    terms,
    message: `Aproximación de Taylor de grado ${n} alrededor de a = ${a}`,
  };
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function numericalDerivative(
  f: (x: number) => number,
  x: number,
  order: number,
  h: number
): number {
  // Recursive central difference for higher-order derivatives
  if (order === 0) return f(x);
  if (order === 1) return (f(x + h) - f(x - h)) / (2 * h);

  const hk = h * Math.pow(2, order - 1);
  return (
    (numericalDerivative(f, x + hk, order - 1, h) -
      numericalDerivative(f, x - hk, order - 1, h)) /
    (2 * hk)
  );
}
