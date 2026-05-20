export interface NewtonRaphsonIteration {
  n: number;
  x: number;
  fx: number;
  dfx: number;
  error: number;
}

export interface NewtonRaphsonInput {
  expression: string;
  derivative: string;
  x0: number;
  tolerance: number;
  maxIterations: number;
}

export interface NewtonRaphsonResult {
  root: number;
  iterations: NewtonRaphsonIteration[];
  converged: boolean;
  expression: string;
  message: string;
}
