import type { DataPoint } from '@/types/interpolation';
import type {
  LagrangeBasis,
  LagrangeInput,
  LagrangeResult,
} from '@/types/lagrange';

/**
 * Evaluates the Lagrange interpolating polynomial at point x.
 * Returns the value and each basis contribution.
 */
function evaluateLagrange(
  points: DataPoint[],
  x: number
): { value: number; bases: LagrangeBasis[] } {
  const n = points.length;
  const bases: LagrangeBasis[] = [];
  let total = 0;

  for (let k = 0; k < n; k++) {
    let lk = 1;
    for (let j = 0; j < n; j++) {
      if (j !== k) {
        lk *= (x - points[j].x) / (points[k].x - points[j].x);
      }
    }
    const contribution = points[k].y * lk;
    bases.push({ k, value: lk, contribution });
    total += contribution;
  }

  return { value: total, bases };
}

/**
 * Computes barycentric weights w_j for the given nodes.
 */
function computeBarycentricWeights(points: DataPoint[]): number[] {
  const n = points.length;
  const weights: number[] = new Array(n);

  for (let j = 0; j < n; j++) {
    let prod = 1;
    for (let i = 0; i < n; i++) {
      if (i !== j) {
        prod *= points[j].x - points[i].x;
      }
    }
    weights[j] = 1 / prod;
  }

  return weights;
}

/**
 * Generates polynomial curve points for plotting using Lagrange evaluation.
 */
function generateLagrangeCurve(
  points: DataPoint[],
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
    const { value } = evaluateLagrange(points, x);
    curve.push({ x, y: value });
  }
  return curve;
}

/**
 * Main solver for Lagrange interpolation.
 */
export function solveLagrange(input: LagrangeInput): LagrangeResult {
  const { points, evaluateAt } = input;
  const n = points.length;

  // Check for duplicate x values
  const xSet = new Set(points.map((p) => p.x));
  if (xSet.size !== n) {
    return {
      n: 0,
      points,
      bases: [],
      weights: [],
      evaluatedValue: null,
      evaluateAt: evaluateAt ?? null,
      polynomialPoints: [],
      message: 'Error: hay nodos x repetidos. Todos los xᵢ deben ser distintos.',
    };
  }

  const weights = computeBarycentricWeights(points);
  const polynomialPoints = generateLagrangeCurve(points);

  let evaluatedValue: number | null = null;
  let bases: LagrangeBasis[] = [];

  if (evaluateAt !== undefined && Number.isFinite(evaluateAt)) {
    const ev = evaluateLagrange(points, evaluateAt);
    evaluatedValue = ev.value;
    bases = ev.bases;
  }

  const degree = n - 1;

  return {
    n: degree,
    points,
    bases,
    weights,
    evaluatedValue,
    evaluateAt: evaluateAt ?? null,
    polynomialPoints,
    message: `Polinomio de Lagrange de grado ${degree} construido con ${n} puntos.`,
  };
}
