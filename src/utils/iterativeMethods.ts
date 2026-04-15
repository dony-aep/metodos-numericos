import type {
  IterativeMethodInput,
  IterativeMethodResult,
  IterationRow,
} from '@/types/iterative-methods';

function isDiagonallyDominant(matrix: number[][]): boolean {
  return matrix.every((row, i) => {
    const diagonal = Math.abs(row[i]);
    const offDiagonalSum = row.reduce(
      (sum, val, j) => (j === i ? sum : sum + Math.abs(val)),
      0
    );
    return diagonal > offDiagonalSum;
  });
}

function infinityNorm(a: number[], b: number[]): number {
  let max = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = Math.abs(a[i] - b[i]);
    if (diff > max) max = diff;
  }
  return max;
}

function calculateResidual(
  matrix: number[][],
  vector: number[],
  solution: number[]
): number[] {
  return matrix.map((row, i) => {
    const ax = row.reduce((sum, val, j) => sum + val * solution[j], 0);
    return ax - vector[i];
  });
}

function solveJacobi(input: IterativeMethodInput): IterativeMethodResult {
  const { matrix, vector, tolerance, maxIterations, initialGuess } = input;
  const n = matrix.length;
  const diagonalDominant = isDiagonallyDominant(matrix);

  let x = initialGuess ? [...initialGuess] : new Array<number>(n).fill(0);
  const iterations: IterationRow[] = [];

  iterations.push({
    iteration: 0,
    values: [...x],
    error: Number.NaN,
  });

  for (let k = 1; k <= maxIterations; k++) {
    const xNew = new Array<number>(n);

    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          sum += matrix[i][j] * x[j];
        }
      }
      xNew[i] = (vector[i] - sum) / matrix[i][i];
    }

    const error = infinityNorm(xNew, x);

    iterations.push({
      iteration: k,
      values: [...xNew],
      error,
    });

    if (error < tolerance) {
      const residual = calculateResidual(matrix, vector, xNew);
      return {
        method: 'jacobi',
        converged: true,
        isDiagonallyDominant: diagonalDominant,
        iterations,
        solution: xNew,
        residual,
        totalIterations: k,
        finalError: error,
        message: `El método de Jacobi convergió en ${k} iteraciones con error ${error.toExponential(4)}.`,
      };
    }

    x = xNew;
  }

  return {
    method: 'jacobi',
    converged: false,
    isDiagonallyDominant: diagonalDominant,
    iterations,
    solution: x,
    residual: calculateResidual(matrix, vector, x),
    totalIterations: maxIterations,
    finalError: iterations[iterations.length - 1].error,
    message: `El método de Jacobi no convergió después de ${maxIterations} iteraciones.`,
  };
}

function solveGaussSeidel(input: IterativeMethodInput): IterativeMethodResult {
  const { matrix, vector, tolerance, maxIterations, initialGuess } = input;
  const n = matrix.length;
  const diagonalDominant = isDiagonallyDominant(matrix);

  const x = initialGuess ? [...initialGuess] : new Array<number>(n).fill(0);
  const iterations: IterationRow[] = [];

  iterations.push({
    iteration: 0,
    values: [...x],
    error: Number.NaN,
  });

  for (let k = 1; k <= maxIterations; k++) {
    const xOld = [...x];

    for (let i = 0; i < n; i++) {
      let sum1 = 0;
      for (let j = 0; j < i; j++) {
        sum1 += matrix[i][j] * x[j]; // uses updated values
      }
      let sum2 = 0;
      for (let j = i + 1; j < n; j++) {
        sum2 += matrix[i][j] * xOld[j]; // uses old values
      }
      x[i] = (vector[i] - sum1 - sum2) / matrix[i][i];
    }

    const error = infinityNorm(x, xOld);

    iterations.push({
      iteration: k,
      values: [...x],
      error,
    });

    if (error < tolerance) {
      const residual = calculateResidual(matrix, vector, x);
      return {
        method: 'gauss-seidel',
        converged: true,
        isDiagonallyDominant: diagonalDominant,
        iterations,
        solution: [...x],
        residual,
        totalIterations: k,
        finalError: error,
        message: `El método de Gauss-Seidel convergió en ${k} iteraciones con error ${error.toExponential(4)}.`,
      };
    }
  }

  return {
    method: 'gauss-seidel',
    converged: false,
    isDiagonallyDominant: diagonalDominant,
    iterations,
    solution: [...x],
    residual: calculateResidual(matrix, vector, x),
    totalIterations: maxIterations,
    finalError: iterations[iterations.length - 1].error,
    message: `El método de Gauss-Seidel no convergió después de ${maxIterations} iteraciones.`,
  };
}

export function solveIterativeMethod(
  input: IterativeMethodInput
): IterativeMethodResult {
  // Validate diagonal elements are not zero
  for (let i = 0; i < input.matrix.length; i++) {
    if (Math.abs(input.matrix[i][i]) < 1e-15) {
      return {
        method: input.method,
        converged: false,
        isDiagonallyDominant: false,
        iterations: [],
        solution: null,
        residual: null,
        totalIterations: 0,
        finalError: Infinity,
        message: `El elemento diagonal a[${i + 1}][${i + 1}] es cero o casi cero. Intenta reordenar las ecuaciones.`,
      };
    }
  }

  if (input.method === 'jacobi') {
    return solveJacobi(input);
  }
  return solveGaussSeidel(input);
}
