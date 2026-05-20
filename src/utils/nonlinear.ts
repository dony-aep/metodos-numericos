import type { NonlinearInput, NonlinearIteration, NonlinearResult } from '@/types/nonlinear';
import { createMathFunction } from '@/utils/mathParser';

export function solveNonlinear(input: NonlinearInput): NonlinearResult {
  const f = createMathFunction(input.expression);

  switch (input.method) {
    case 'bisection':
      return solveBisection(f, input);
    case 'newton':
      return solveNewton(f, input);
    case 'secant':
      return solveSecant(f, input);
  }
}

function solveBisection(f: (x: number) => number, input: NonlinearInput): NonlinearResult {
  const { tolerance, maxIterations } = input;
  let a = input.a!;
  let b = input.b!;
  const iterations: NonlinearIteration[] = [];

  const fa = f(a);
  const fb = f(b);
  if (fa * fb >= 0) {
    return { method: 'bisection', methodLabel: 'Bisección', root: NaN, iterations: [], converged: false, message: 'f(a) y f(b) deben tener signos opuestos.' };
  }

  for (let n = 1; n <= maxIterations; n++) {
    const m = (a + b) / 2;
    const fm = f(m);
    const error = Math.abs(b - a) / 2;

    iterations.push({ n, a, b, x: m, fx: fm, error });

    if (Math.abs(fm) < tolerance || error < tolerance) {
      return { method: 'bisection', methodLabel: 'Bisección', root: m, iterations, converged: true, message: `Raíz encontrada en ${n} iteraciones.` };
    }

    if (f(a) * fm < 0) {
      b = m;
    } else {
      a = m;
    }
  }

  const last = iterations[iterations.length - 1];
  return { method: 'bisection', methodLabel: 'Bisección', root: last.x, iterations, converged: false, message: `No convergió en ${maxIterations} iteraciones.` };
}

function solveNewton(f: (x: number) => number, input: NonlinearInput): NonlinearResult {
  const { tolerance, maxIterations } = input;
  const df = input.derivative ? createMathFunction(input.derivative) : numericalDerivative(f);
  let x = input.x0!;
  const iterations: NonlinearIteration[] = [];

  for (let n = 1; n <= maxIterations; n++) {
    const fx = f(x);
    const dfx = df(x);

    if (Math.abs(dfx) < 1e-14) {
      return { method: 'newton', methodLabel: 'Newton-Raphson', root: x, iterations, converged: false, message: 'Derivada cercana a cero. El método no puede continuar.' };
    }

    const xNew = x - fx / dfx;
    const error = Math.abs(xNew - x);

    iterations.push({ n, x: xNew, fx: f(xNew), error });

    if (error < tolerance || Math.abs(f(xNew)) < tolerance) {
      return { method: 'newton', methodLabel: 'Newton-Raphson', root: xNew, iterations, converged: true, message: `Raíz encontrada en ${n} iteraciones.` };
    }

    x = xNew;
  }

  const last = iterations[iterations.length - 1];
  return { method: 'newton', methodLabel: 'Newton-Raphson', root: last.x, iterations, converged: false, message: `No convergió en ${maxIterations} iteraciones.` };
}

function solveSecant(f: (x: number) => number, input: NonlinearInput): NonlinearResult {
  const { tolerance, maxIterations } = input;
  let x0 = input.x0!;
  let x1 = input.x1!;
  const iterations: NonlinearIteration[] = [];

  for (let n = 1; n <= maxIterations; n++) {
    const f0 = f(x0);
    const f1 = f(x1);
    const denom = f1 - f0;

    if (Math.abs(denom) < 1e-14) {
      return { method: 'secant', methodLabel: 'Secante', root: x1, iterations, converged: false, message: 'Diferencia de funciones cercana a cero.' };
    }

    const x2 = x1 - f1 * (x1 - x0) / denom;
    const error = Math.abs(x2 - x1);

    iterations.push({ n, x: x2, fx: f(x2), error });

    if (error < tolerance || Math.abs(f(x2)) < tolerance) {
      return { method: 'secant', methodLabel: 'Secante', root: x2, iterations, converged: true, message: `Raíz encontrada en ${n} iteraciones.` };
    }

    x0 = x1;
    x1 = x2;
  }

  const last = iterations[iterations.length - 1];
  return { method: 'secant', methodLabel: 'Secante', root: last.x, iterations, converged: false, message: `No convergió en ${maxIterations} iteraciones.` };
}

function numericalDerivative(f: (x: number) => number): (x: number) => number {
  const h = 1e-7;
  return (x: number) => (f(x + h) - f(x - h)) / (2 * h);
}
