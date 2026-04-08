export type LinearSystemClassification =
  | 'cuadrado'
  | 'sobredeterminado'
  | 'subdeterminado';

export interface LinearSystemInput {
  matrix: number[][];
  vector: number[];
}

export interface LinearSystemResult {
  classification: LinearSystemClassification;
  isSquare: boolean;
  hasUniqueSolution: boolean;
  isDiagonallyDominant: boolean;
  determinant: number | null;
  solution: number[] | null;
  residual: number[] | null;
  message: string;
}
