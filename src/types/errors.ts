export type ErrorType = 'absolute' | 'relative' | 'percentage';

export interface ErrorsInput {
  exactValue: number;
  approxValue: number;
}

export interface ErrorsResult {
  exactValue: number;
  approxValue: number;
  absoluteError: number;
  relativeError: number;
  percentageError: number;
  significantDigits: number;
  message: string;
}

export interface TaylorInput {
  expression: string;
  a: number;
  x: number;
  n: number;
}

export interface TaylorTermResult {
  n: number;
  approximation: number;
  error: number;
}

export interface TaylorResult {
  exactValue: number;
  terms: TaylorTermResult[];
  message: string;
}
