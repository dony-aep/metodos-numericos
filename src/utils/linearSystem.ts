import type {
  LinearSystemClassification,
  LinearSystemInput,
  LinearSystemResult,
} from '@/types/linear-system';

const EPSILON = 1e-10;

function classifySystem(rows: number, cols: number): LinearSystemClassification {
  if (rows === cols) return 'cuadrado';
  if (rows > cols) return 'sobredeterminado';
  return 'subdeterminado';
}

function isDiagonallyDominant(matrix: number[][]): boolean {
  return matrix.every((row, rowIndex) => {
    const diagonal = Math.abs(row[rowIndex] ?? 0);
    const nonDiagonalSum = row.reduce((sum, value, colIndex) => {
      if (colIndex === rowIndex) return sum;
      return sum + Math.abs(value);
    }, 0);
    return diagonal >= nonDiagonalSum;
  });
}

function calculateResidual(
  matrix: number[][],
  vector: number[],
  solution: number[]
): number[] {
  return matrix.map((row, rowIndex) => {
    const lhs = row.reduce(
      (sum, coefficient, colIndex) => sum + coefficient * solution[colIndex],
      0
    );
    return lhs - vector[rowIndex];
  });
}

function solveSquareByGaussian(
  matrix: number[][],
  vector: number[]
): { solution: number[] | null; determinant: number; isSingular: boolean } {
  const n = matrix.length;
  const a = matrix.map((row) => [...row]);
  const b = [...vector];
  let swapCount = 0;

  for (let k = 0; k < n; k++) {
    let pivotRow = k;
    let maxAbsPivot = Math.abs(a[k][k]);

    for (let i = k + 1; i < n; i++) {
      const candidate = Math.abs(a[i][k]);
      if (candidate > maxAbsPivot) {
        maxAbsPivot = candidate;
        pivotRow = i;
      }
    }

    if (maxAbsPivot < EPSILON) {
      return { solution: null, determinant: 0, isSingular: true };
    }

    if (pivotRow !== k) {
      [a[k], a[pivotRow]] = [a[pivotRow], a[k]];
      [b[k], b[pivotRow]] = [b[pivotRow], b[k]];
      swapCount++;
    }

    for (let i = k + 1; i < n; i++) {
      const factor = a[i][k] / a[k][k];
      a[i][k] = 0;
      for (let j = k + 1; j < n; j++) {
        a[i][j] -= factor * a[k][j];
      }
      b[i] -= factor * b[k];
    }
  }

  const solution = Array<number>(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    const diagonal = a[i][i];
    if (Math.abs(diagonal) < EPSILON) {
      return { solution: null, determinant: 0, isSingular: true };
    }

    let rhs = b[i];
    for (let j = i + 1; j < n; j++) {
      rhs -= a[i][j] * solution[j];
    }
    solution[i] = rhs / diagonal;
  }

  let determinant = swapCount % 2 === 0 ? 1 : -1;
  for (let i = 0; i < n; i++) {
    determinant *= a[i][i];
  }

  return { solution, determinant, isSingular: false };
}

export function solveLinearSystem(input: LinearSystemInput): LinearSystemResult {
  const rows = input.matrix.length;
  const cols = input.matrix[0]?.length ?? 0;
  const classification = classifySystem(rows, cols);
  const isSquare = classification === 'cuadrado';
  const diagonalDominance = isSquare ? isDiagonallyDominant(input.matrix) : false;

  if (!isSquare) {
    return {
      classification,
      isSquare,
      hasUniqueSolution: false,
      isDiagonallyDominant: diagonalDominance,
      determinant: null,
      solution: null,
      residual: null,
      message:
        'Este calculador resuelve por ahora solo sistemas cuadrados (mismas ecuaciones e incógnitas).',
    };
  }

  const solved = solveSquareByGaussian(input.matrix, input.vector);

  if (solved.isSingular || !solved.solution) {
    return {
      classification,
      isSquare,
      hasUniqueSolution: false,
      isDiagonallyDominant: diagonalDominance,
      determinant: solved.determinant,
      solution: null,
      residual: null,
      message:
        'La matriz es singular o casi singular. El sistema no tiene solución única.',
    };
  }

  const residual = calculateResidual(input.matrix, input.vector, solved.solution);

  return {
    classification,
    isSquare,
    hasUniqueSolution: true,
    isDiagonallyDominant: diagonalDominance,
    determinant: solved.determinant,
    solution: solved.solution,
    residual,
    message: `Sistema resuelto con éxito para ${rows} incógnitas.`,
  };
}
