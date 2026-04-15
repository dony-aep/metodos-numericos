export interface EulerInput {
  /** Expression f(x, y) — the right-hand side of y' = f(x, y) */
  expression: string;
  x0: number;
  y0: number;
  h: number;
  steps: number;
  /** Optional exact solution expression in terms of x for error comparison */
  exactExpression?: string;
}

export interface EulerStep {
  n: number;
  x: number;
  y: number;
  slope: number;
  exactY: number | null;
  error: number | null;
}

export interface EulerResult {
  expression: string;
  x0: number;
  y0: number;
  h: number;
  steps: number;
  data: EulerStep[];
  message: string;
}
