export interface BisectionIteration {
  n: number;
  a: number;
  b: number;
  c: number;
  fc: number;
  error: number;
}

export interface BisectionInput {
  expression: string;
  a: number;
  b: number;
  tolerance: number;
  maxIterations: number;
}

export interface BisectionResult {
  root: number;
  iterations: BisectionIteration[];
  converged: boolean;
  expression: string;
  message: string;
}
