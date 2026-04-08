import type {
  GaussEliminationInput,
  GaussEliminationResult,
  GaussEliminationStep,
  GaussStepType,
} from '@/types/gauss-elimination';

const EPSILON = 1e-10;

function sanitizeNumber(value: number): number {
  return Math.abs(value) < EPSILON ? 0 : value;
}

function cloneMatrix(matrix: number[][]): number[][] {
  return matrix.map((row) => [...row]);
}

function createAugmentedMatrix(matrix: number[][], vector: number[]): number[][] {
  return matrix.map((row, index) => [...row, vector[index]]);
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
    return sanitizeNumber(lhs - vector[rowIndex]);
  });
}

function stepTypeLabel(type: GaussStepType): string {
  if (type === 'pivote') return 'Selección de pivote';
  if (type === 'intercambio') return 'Intercambio de filas';
  if (type === 'eliminacion') return 'Eliminación';
  return 'Sustitución hacia atrás';
}

function appendStep(
  steps: GaussEliminationStep[],
  type: GaussStepType,
  pivotColumn: number,
  matrix: number[][],
  vector: number[],
  payload: {
    factor?: number;
    pivotRow?: number;
    targetRow?: number;
    description: string;
  }
): void {
  steps.push({
    step: steps.length + 1,
    type,
    pivotColumn,
    description: `${stepTypeLabel(type)}: ${payload.description}`,
    factor: payload.factor ?? null,
    pivotRow: payload.pivotRow ?? null,
    targetRow: payload.targetRow ?? null,
    augmentedMatrix: createAugmentedMatrix(
      matrix.map((row) => row.map((value) => sanitizeNumber(value))),
      vector.map((value) => sanitizeNumber(value))
    ),
  });
}

export function solveGaussElimination(input: GaussEliminationInput): GaussEliminationResult {
  const n = input.matrix.length;
  const a = cloneMatrix(input.matrix);
  const b = [...input.vector];
  const steps: GaussEliminationStep[] = [];
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
      return {
        hasUniqueSolution: false,
        determinant: 0,
        solution: null,
        residual: null,
        upperTriangular: createAugmentedMatrix(a, b),
        steps,
        message:
          'La matriz es singular o casi singular: no se puede continuar con pivotes válidos.',
      };
    }

    appendStep(steps, 'pivote', k + 1, a, b, {
      pivotRow: pivotRow + 1,
      description: `Columna ${k + 1}: pivote elegido en la fila ${pivotRow + 1}.`,
    });

    if (pivotRow !== k) {
      [a[k], a[pivotRow]] = [a[pivotRow], a[k]];
      [b[k], b[pivotRow]] = [b[pivotRow], b[k]];
      swapCount++;

      appendStep(steps, 'intercambio', k + 1, a, b, {
        pivotRow: k + 1,
        targetRow: pivotRow + 1,
        description: `Intercambio F${k + 1} ↔ F${pivotRow + 1} para mejorar estabilidad.`,
      });
    }

    for (let i = k + 1; i < n; i++) {
      const factor = a[i][k] / a[k][k];
      if (Math.abs(factor) < EPSILON) {
        a[i][k] = 0;
        continue;
      }

      for (let j = k; j < n; j++) {
        a[i][j] = sanitizeNumber(a[i][j] - factor * a[k][j]);
      }
      b[i] = sanitizeNumber(b[i] - factor * b[k]);
      a[i][k] = 0;

      appendStep(steps, 'eliminacion', k + 1, a, b, {
        factor,
        pivotRow: k + 1,
        targetRow: i + 1,
        description: `F${i + 1} = F${i + 1} - (${factor.toFixed(6)})·F${k + 1}.`,
      });
    }
  }

  const solution = Array<number>(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    const diagonal = a[i][i];
    if (Math.abs(diagonal) < EPSILON) {
      return {
        hasUniqueSolution: false,
        determinant: 0,
        solution: null,
        residual: null,
        upperTriangular: createAugmentedMatrix(a, b),
        steps,
        message: 'No fue posible completar la sustitución hacia atrás por un pivote nulo.',
      };
    }

    let rhs = b[i];
    for (let j = i + 1; j < n; j++) {
      rhs -= a[i][j] * solution[j];
    }

    solution[i] = sanitizeNumber(rhs / diagonal);

    appendStep(steps, 'sustitucion', i + 1, a, b, {
      pivotRow: i + 1,
      description: `Se calcula x${i + 1} = ${solution[i].toFixed(6)}.`,
    });
  }

  let determinant = swapCount % 2 === 0 ? 1 : -1;
  for (let i = 0; i < n; i++) {
    determinant *= a[i][i];
  }
  determinant = sanitizeNumber(determinant);

  const residual = calculateResidual(input.matrix, input.vector, solution);

  return {
    hasUniqueSolution: true,
    determinant,
    solution,
    residual,
    upperTriangular: createAugmentedMatrix(a, b),
    steps,
    message: `El sistema se resolvió con eliminación de Gauss con pivoteo parcial (${n}x${n}).`,
  };
}
