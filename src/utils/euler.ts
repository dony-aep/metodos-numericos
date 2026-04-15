import { parse } from 'mathjs';
import { createMathFunction } from '@/utils/mathParser';
import type { EulerInput, EulerStep, EulerResult } from '@/types/euler';

/**
 * Sanitize and compile an expression f(x, y) into a callable two-variable function.
 */
function createTwoVarFunction(expression: string): (x: number, y: number) => number {
  const sanitized = expression
    .replace(/\^/g, '^')
    .replace(/sen/gi, 'sin')
    .replace(/tg/gi, 'tan')
    .replace(/ln/gi, 'log')
    .replace(/raiz/gi, 'sqrt')
    .replace(/\|([^|]+)\|/g, 'abs($1)');

  const node = parse(sanitized);

  return (x: number, y: number): number => {
    try {
      const result = node.evaluate({ x, y, e: Math.E, pi: Math.PI });
      return typeof result === 'number' ? result : NaN;
    } catch {
      return NaN;
    }
  };
}

export function validateTwoVarExpression(expression: string): { valid: boolean; error?: string } {
  try {
    const fn = createTwoVarFunction(expression);
    const testValue = fn(0, 1);
    if (typeof testValue !== 'number' || isNaN(testValue)) {
      return { valid: false, error: 'La expresión f(x, y) no produce un valor numérico válido.' };
    }
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Expresión matemática inválida.',
    };
  }
}

export function solveEuler(input: EulerInput): EulerResult {
  const { expression, x0, y0, h, steps, exactExpression } = input;

  const f = createTwoVarFunction(expression);

  // Verify function evaluates at initial condition
  const testSlope = f(x0, y0);
  if (!Number.isFinite(testSlope)) {
    return {
      expression,
      x0,
      y0,
      h,
      steps,
      data: [],
      message: `Error: f(x, y) no se puede evaluar en (${x0}, ${y0}).`,
    };
  }

  // Optional exact solution
  let exactFn: ((x: number) => number) | null = null;
  if (exactExpression) {
    try {
      exactFn = createMathFunction(exactExpression);
    } catch {
      exactFn = null;
    }
  }

  const data: EulerStep[] = [];
  let x = x0;
  let y = y0;

  for (let n = 0; n <= steps; n++) {
    const slope = f(x, y);
    const exactY = exactFn ? exactFn(x) : null;
    const error =
      exactY !== null && Number.isFinite(exactY)
        ? Math.abs(y - exactY)
        : null;

    data.push({ n, x, y, slope, exactY, error });

    if (n < steps) {
      y = y + h * slope;
      x = x0 + (n + 1) * h; // avoid floating-point drift
    }
  }

  return {
    expression,
    x0,
    y0,
    h,
    steps,
    data,
    message: `Método de Euler para y' = ${expression} con y(${x0}) = ${y0}, h = ${h}, ${steps} pasos.`,
  };
}
