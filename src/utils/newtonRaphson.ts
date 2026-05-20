import type { NewtonRaphsonInput, NewtonRaphsonIteration, NewtonRaphsonResult } from '@/types/newton-raphson';
import { createMathFunction } from '@/utils/mathParser';

export function solveNewtonRaphson(input: NewtonRaphsonInput): NewtonRaphsonResult {
  const { expression, derivative, tolerance, maxIterations } = input;
  const f = createMathFunction(expression);
  const df = derivative.trim()
    ? createMathFunction(derivative)
    : numericalDf(f);

  let x = input.x0;
  const iterations: NewtonRaphsonIteration[] = [];

  for (let n = 1; n <= maxIterations; n++) {
    const fx = f(x);
    const dfx = df(x);

    if (!Number.isFinite(fx) || !Number.isFinite(dfx)) {
      return { root: x, iterations, converged: false, expression, message: 'La función o su derivada no se pueden evaluar en el punto actual.' };
    }

    if (Math.abs(dfx) < 1e-14) {
      return { root: x, iterations, converged: false, expression, message: `Derivada cercana a cero en iteración ${n}. El método no puede continuar.` };
    }

    const xNew = x - fx / dfx;
    const error = Math.abs(xNew - x);

    iterations.push({ n, x: xNew, fx: f(xNew), dfx, error });

    if (error < tolerance || Math.abs(f(xNew)) < tolerance) {
      return { root: xNew, iterations, converged: true, expression, message: `Raíz encontrada: x ≈ ${xNew.toFixed(10)} en ${n} iteraciones.` };
    }

    x = xNew;
  }

  const last = iterations[iterations.length - 1];
  return { root: last.x, iterations, converged: false, expression, message: `No convergió en ${maxIterations} iteraciones.` };
}

function numericalDf(f: (x: number) => number): (x: number) => number {
  const h = 1e-7;
  return (x: number) => (f(x + h) - f(x - h)) / (2 * h);
}
