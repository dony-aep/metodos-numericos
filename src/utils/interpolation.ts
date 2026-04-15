import type {
  DataPoint,
  DividedDifferenceTable,
  InterpolationInput,
  InterpolationResult,
} from '@/types/interpolation';

/**
 * Builds the full divided differences table.
 * table[i][j] = f[x_i, ..., x_{i+j}]
 */
function buildDividedDifferences(
  points: DataPoint[]
): DividedDifferenceTable {
  const n = points.length;
  const table: number[][] = Array.from({ length: n }, () => []);

  // Column 0: y values
  for (let i = 0; i < n; i++) {
    table[i][0] = points[i].y;
  }

  // Columns 1..n-1
  for (let j = 1; j < n; j++) {
    for (let i = 0; i < n - j; i++) {
      const denominator = points[i + j].x - points[i].x;
      table[i][j] = (table[i + 1][j - 1] - table[i][j - 1]) / denominator;
    }
  }

  // Coefficients are the first row: table[0][0], table[0][1], ...
  const coefficients = table[0].slice();

  return { table, coefficients };
}

/**
 * Evaluates the Newton polynomial at a given x using Horner's method.
 */
function evaluateNewton(
  points: DataPoint[],
  coefficients: number[],
  x: number
): number {
  const n = coefficients.length;
  let result = coefficients[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    result = result * (x - points[i].x) + coefficients[i];
  }
  return result;
}

/**
 * Generates points along the polynomial curve for plotting.
 */
function generatePolynomialCurve(
  points: DataPoint[],
  coefficients: number[],
  numSamples: number = 200
): { x: number; y: number }[] {
  if (points.length < 2) return [];

  const xValues = points.map((p) => p.x);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const margin = (xMax - xMin) * 0.1 || 1;
  const lo = xMin - margin;
  const hi = xMax + margin;
  const step = (hi - lo) / (numSamples - 1);

  const curve: { x: number; y: number }[] = [];
  for (let i = 0; i < numSamples; i++) {
    const x = lo + i * step;
    const y = evaluateNewton(points, coefficients, x);
    curve.push({ x, y });
  }
  return curve;
}

export function solveInterpolation(
  input: InterpolationInput
): InterpolationResult {
  const { points, evaluateAt } = input;
  const n = points.length;

  // Check for duplicate x values
  const xSet = new Set(points.map((p) => p.x));
  if (xSet.size !== n) {
    return {
      n: n - 1,
      dividedDifferences: { table: [], coefficients: [] },
      evaluatedValue: null,
      evaluateAt: evaluateAt ?? null,
      polynomialPoints: [],
      message: 'Los valores de x deben ser todos distintos.',
    };
  }

  const dd = buildDividedDifferences(points);
  const polynomialPoints = generatePolynomialCurve(points, dd.coefficients);

  let evaluatedValue: number | null = null;
  if (evaluateAt !== undefined && Number.isFinite(evaluateAt)) {
    evaluatedValue = evaluateNewton(points, dd.coefficients, evaluateAt);
  }

  return {
    n: n - 1,
    dividedDifferences: dd,
    evaluatedValue,
    evaluateAt: evaluateAt ?? null,
    polynomialPoints,
    message: `Polinomio interpolante de grado ${n - 1} construido con ${n} puntos.`,
  };
}
