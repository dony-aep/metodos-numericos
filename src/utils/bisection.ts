import type { BisectionInput, BisectionIteration, BisectionResult } from '@/types/bisection';
import { createMathFunction } from '@/utils/mathParser';

export function solveBisection(input: BisectionInput): BisectionResult {
  const { expression, tolerance, maxIterations } = input;
  let a = input.a;
  let b = input.b;
  const f = createMathFunction(expression);
  const iterations: BisectionIteration[] = [];

  let fa = f(a);
  const fb = f(b);

  if (!Number.isFinite(fa) || !Number.isFinite(fb)) {
    return { root: NaN, iterations: [], converged: false, expression, message: 'La función no se puede evaluar en los extremos del intervalo.' };
  }

  if (fa * fb >= 0) {
    return { root: NaN, iterations: [], converged: false, expression, message: 'f(a) y f(b) deben tener signos opuestos (no hay garantía de raíz).' };
  }

  for (let n = 1; n <= maxIterations; n++) {
    const c = (a + b) / 2;
    const fc = f(c);
    const error = Math.abs(b - a) / 2;

    iterations.push({ n, a, b, c, fc, error });

    if (Math.abs(fc) < tolerance || error < tolerance) {
      return { root: c, iterations, converged: true, expression, message: `Raíz encontrada: x ≈ ${c.toFixed(10)} en ${n} iteraciones.` };
    }

    if (fa * fc < 0) {
      b = c;
    } else {
      a = c;
      fa = fc;
    }
  }

  const last = iterations[iterations.length - 1];
  return { root: last.c, iterations, converged: false, expression, message: `No convergió en ${maxIterations} iteraciones. Última aproximación: ${last.c.toFixed(10)}` };
}
