import { parse } from 'mathjs';

export function createMathFunction(expression: string): (x: number) => number {
  // Sanitize and convert common notations
  const sanitized = expression
    .replace(/\^/g, '^')  // Keep ^ as mathjs supports it
    .replace(/sen/gi, 'sin')
    .replace(/tg/gi, 'tan')
    .replace(/ln/gi, 'log')
    .replace(/raiz/gi, 'sqrt')
    .replace(/\|([^|]+)\|/g, 'abs($1)');

  // Parse once to validate and compile
  const node = parse(sanitized);

  return (x: number): number => {
    try {
      const result = node.evaluate({ x, e: Math.E, pi: Math.PI });
      return typeof result === 'number' ? result : NaN;
    } catch {
      return NaN;
    }
  };
}

export function validateExpression(expression: string): { valid: boolean; error?: string } {
  try {
    const fn = createMathFunction(expression);
    const testValue = fn(1);
    
    if (typeof testValue !== 'number' || isNaN(testValue)) {
      return { valid: false, error: 'La expresión no produce un valor numérico válido' };
    }
    
    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : 'Expresión matemática inválida' 
    };
  }
}

export function generateFunctionPoints(
  fn: (x: number) => number,
  xMin: number,
  xMax: number,
  numPoints: number = 500
): { x: number[]; y: number[] } {
  const xValues: number[] = [];
  const yValues: number[] = [];
  const step = (xMax - xMin) / (numPoints - 1);

  for (let i = 0; i < numPoints; i++) {
    const x = xMin + i * step;
    const y = fn(x);
    
    if (isFinite(y) && Math.abs(y) < 1e10) {
      xValues.push(x);
      yValues.push(y);
    }
  }

  return { x: xValues, y: yValues };
}
