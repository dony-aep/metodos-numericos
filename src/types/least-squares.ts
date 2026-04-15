import type { DataPoint } from './interpolation';

export interface LeastSquaresInput {
  points: DataPoint[];
  /** Polynomial degree (1 = linear, 2 = quadratic, etc.) */
  degree: number;
}

export interface LeastSquaresResult {
  /** Polynomial degree used */
  degree: number;
  /** Coefficients [a0, a1, ..., ak] for a0 + a1*x + ... + ak*x^k */
  coefficients: number[];
  /** Fitted curve points for plotting */
  curvePoints: { x: number; y: number }[];
  /** Residuals e_i = y_i - f(x_i) */
  residuals: number[];
  /** Sum of squared residuals S */
  sumSquaredResiduals: number;
  /** Coefficient of determination R² */
  rSquared: number;
  /** Number of data points */
  n: number;
  /** Message describing the result */
  message: string;
}
