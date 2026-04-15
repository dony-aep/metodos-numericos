import type { DataPoint } from '@/types/interpolation';
import type { LeastSquaresInput, LeastSquaresResult } from '@/types/least-squares';

/**
 * Solves A^T A c = A^T b via Gaussian elimination with partial pivoting.
 * Returns the coefficient vector c, or null if the system is singular.
 */
function solveNormalEquations(
  ATA: number[][],
  ATb: number[]
): number[] | null {
  const m = ATA.length;
  // Build augmented matrix
  const aug: number[][] = ATA.map((row, i) => [...row, ATb[i]]);

  for (let col = 0; col < m; col++) {
    // Partial pivoting
    let maxRow = col;
    let maxVal = Math.abs(aug[col][col]);
    for (let row = col + 1; row < m; row++) {
      if (Math.abs(aug[row][col]) > maxVal) {
        maxVal = Math.abs(aug[row][col]);
        maxRow = row;
      }
    }
    if (maxVal < 1e-14) return null; // Singular

    if (maxRow !== col) {
      [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];
    }

    // Eliminate below
    for (let row = col + 1; row < m; row++) {
      const factor = aug[row][col] / aug[col][col];
      for (let j = col; j <= m; j++) {
        aug[row][j] -= factor * aug[col][j];
      }
    }
  }

  // Back substitution
  const c = new Array<number>(m);
  for (let i = m - 1; i >= 0; i--) {
    let sum = aug[i][m];
    for (let j = i + 1; j < m; j++) {
      sum -= aug[i][j] * c[j];
    }
    c[i] = sum / aug[i][i];
  }

  return c;
}

/**
 * Evaluates polynomial a0 + a1*x + a2*x^2 + ... at x.
 */
function evaluatePolynomial(coefficients: number[], x: number): number {
  let result = 0;
  let xPow = 1;
  for (const c of coefficients) {
    result += c * xPow;
    xPow *= x;
  }
  return result;
}

/**
 * Generates fitted curve points for plotting.
 */
function generateFittedCurve(
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
    const y = evaluatePolynomial(coefficients, x);
    curve.push({ x, y });
  }
  return curve;
}

/**
 * Main solver for least squares polynomial fitting.
 * Uses normal equations: A^T A c = A^T b
 */
export function solveLeastSquares(
  input: LeastSquaresInput
): LeastSquaresResult {
  const { points, degree } = input;
  const n = points.length;

  if (n <= degree) {
    return {
      degree,
      coefficients: [],
      curvePoints: [],
      residuals: [],
      sumSquaredResiduals: 0,
      rSquared: 0,
      n,
      message: `Error: se necesitan al menos ${degree + 1} puntos para un ajuste de grado ${degree}.`,
    };
  }

  const m = degree + 1; // Number of parameters

  // Build A^T A and A^T b directly (without forming A explicitly)
  // (A^T A)_{jk} = sum_i x_i^{j+k}
  // (A^T b)_j = sum_i x_i^j * y_i

  // Precompute sums of powers: sum_i x_i^p for p = 0..2*degree
  const maxPow = 2 * degree;
  const sumPow = new Array<number>(maxPow + 1).fill(0);
  const sumPowY = new Array<number>(m).fill(0);

  for (let i = 0; i < n; i++) {
    let xPow = 1;
    for (let p = 0; p <= maxPow; p++) {
      sumPow[p] += xPow;
      if (p < m) {
        sumPowY[p] += xPow * points[i].y;
      }
      xPow *= points[i].x;
    }
  }

  // Build A^T A
  const ATA: number[][] = Array.from({ length: m }, (_, j) =>
    Array.from({ length: m }, (__, k) => sumPow[j + k])
  );

  // A^T b
  const ATb = sumPowY;

  // Solve
  const coefficients = solveNormalEquations(ATA, ATb);

  if (!coefficients) {
    return {
      degree,
      coefficients: [],
      curvePoints: [],
      residuals: [],
      sumSquaredResiduals: 0,
      rSquared: 0,
      n,
      message:
        'Error: el sistema de ecuaciones normales es singular. Verifica que los datos no sean colineales o repetidos.',
    };
  }

  // Compute residuals
  const residuals = points.map(
    (p) => p.y - evaluatePolynomial(coefficients, p.x)
  );
  const sumSquaredResiduals = residuals.reduce(
    (sum, e) => sum + e * e,
    0
  );

  // Compute R²
  const yMean = points.reduce((sum, p) => sum + p.y, 0) / n;
  const ssTot = points.reduce((sum, p) => sum + (p.y - yMean) ** 2, 0);
  const rSquared = ssTot > 1e-14 ? 1 - sumSquaredResiduals / ssTot : 1;

  // Generate fitted curve
  const curvePoints = generateFittedCurve(points, coefficients);

  const degreeLabel =
    degree === 1
      ? 'lineal'
      : degree === 2
        ? 'cuadrático'
        : `de grado ${degree}`;

  return {
    degree,
    coefficients,
    curvePoints,
    residuals,
    sumSquaredResiduals,
    rSquared,
    n,
    message: `Ajuste ${degreeLabel} calculado con ${n} puntos — R² = ${rSquared.toFixed(6)}.`,
  };
}
