export type IntegrationMethod = 'trapezoid' | 'simpson';

export interface IntegrationInput {
  expression: string;
  a: number;
  b: number;
  n: number;
  /** Optional exact value for error comparison */
  exactValue?: number;
}

export interface IntegrationMethodResult {
  method: IntegrationMethod;
  label: string;
  value: number;
  error: number | null;
  order: string;
  /** Node values used in computation */
  nodes: { x: number; fx: number; weight: number }[];
}

export interface IntegrationResult {
  expression: string;
  a: number;
  b: number;
  n: number;
  h: number;
  trapezoid: IntegrationMethodResult;
  simpson: IntegrationMethodResult | null;
  /** Convergence study: results for increasing n */
  convergenceStudy: {
    n: number;
    trapezoid: number;
    simpson: number | null;
  }[];
  message: string;
}
