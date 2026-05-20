export type NonlinearMethod = 'bisection' | 'newton' | 'secant';

export interface NonlinearIteration {
  n: number;
  a?: number;
  b?: number;
  x: number;
  fx: number;
  error: number;
}

export interface NonlinearInput {
  expression: string;
  derivative?: string;
  method: NonlinearMethod;
  a?: number;
  b?: number;
  x0?: number;
  x1?: number;
  tolerance: number;
  maxIterations: number;
}

export interface NonlinearResult {
  method: NonlinearMethod;
  methodLabel: string;
  root: number;
  iterations: NonlinearIteration[];
  converged: boolean;
  message: string;
}

export interface NonlinearComparison {
  results: NonlinearResult[];
  expression: string;
}
