export type GaussStepType = 'pivote' | 'intercambio' | 'eliminacion' | 'sustitucion';

export interface GaussEliminationInput {
  matrix: number[][];
  vector: number[];
}

export interface GaussEliminationStep {
  step: number;
  type: GaussStepType;
  pivotColumn: number;
  description: string;
  factor: number | null;
  pivotRow: number | null;
  targetRow: number | null;
  augmentedMatrix: number[][];
}

export interface GaussEliminationResult {
  hasUniqueSolution: boolean;
  determinant: number | null;
  solution: number[] | null;
  residual: number[] | null;
  upperTriangular: number[][] | null;
  steps: GaussEliminationStep[];
  message: string;
}
