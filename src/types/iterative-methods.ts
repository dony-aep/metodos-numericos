export type IterativeMethod = 'jacobi' | 'gauss-seidel';

export interface IterativeMethodInput {
  matrix: number[][];
  vector: number[];
  method: IterativeMethod;
  tolerance: number;
  maxIterations: number;
  initialGuess?: number[];
}

export interface IterationRow {
  iteration: number;
  values: number[];
  error: number;
}

export interface IterativeMethodResult {
  method: IterativeMethod;
  converged: boolean;
  isDiagonallyDominant: boolean;
  iterations: IterationRow[];
  solution: number[] | null;
  residual: number[] | null;
  totalIterations: number;
  finalError: number;
  message: string;
}
