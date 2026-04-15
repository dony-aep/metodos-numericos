import type { DataPoint } from './interpolation';

/** Individual Lagrange basis polynomial evaluation info */
export interface LagrangeBasis {
  /** Index k */
  k: number;
  /** L_k(x) evaluated at target */
  value: number;
  /** y_k * L_k(x) */
  contribution: number;
}

export interface LagrangeResult {
  /** Polynomial degree (n = points.length - 1) */
  n: number;
  /** Data points used */
  points: DataPoint[];
  /** Basis evaluations (only populated when evaluateAt is given) */
  bases: LagrangeBasis[];
  /** Barycentric weights w_j */
  weights: number[];
  /** Evaluated value P(evaluateAt) or null */
  evaluatedValue: number | null;
  /** Point where the polynomial was evaluated, or null */
  evaluateAt: number | null;
  /** Polynomial curve for plotting */
  polynomialPoints: { x: number; y: number }[];
  /** Message describing the result */
  message: string;
}

export interface LagrangeInput {
  points: DataPoint[];
  evaluateAt?: number;
}
