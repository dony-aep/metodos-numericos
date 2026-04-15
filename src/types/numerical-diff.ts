export type DiffMethod =
  | 'forward'
  | 'backward'
  | 'centered'
  | 'five-point'
  | 'second-centered';

export interface DiffApproximation {
  method: DiffMethod;
  label: string;
  value: number;
  error: number | null;
  order: string;
}

export interface NumericalDiffInput {
  expression: string;
  x: number;
  h: number;
  /** Optional exact derivative value for error comparison */
  exactValue?: number;
}

export interface NumericalDiffResult {
  x: number;
  h: number;
  expression: string;
  approximations: DiffApproximation[];
  /** Convergence study: results for decreasing h values */
  convergenceStudy: {
    h: number;
    forward: number;
    backward: number;
    centered: number;
  }[];
  message: string;
}
