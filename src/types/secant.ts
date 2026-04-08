import type { ModuleCalculationStatus } from '@/types/method-module';

export interface SecantIteration {
  n: number;
  xPrev: number;
  xCurr: number;
  fxPrev: number;
  fxCurr: number;
  xNext: number;
  error: number;
}

export interface SecantResult {
  iterations: SecantIteration[];
  root: number | null;
  converged: boolean;
  message: string;
  totalIterations: number;
}

export interface SecantParams {
  fn: string;
  x0: number;
  x1: number;
  tolerance: number;
  maxIterations: number;
}

export interface PlotPoint {
  x: number;
  y: number;
}

export interface SecantLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  iteration: number;
}

export type CalculationStatus = ModuleCalculationStatus;
