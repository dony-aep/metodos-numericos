export interface DataPoint {
  x: number;
  y: number;
}

export interface InterpolationInput {
  points: DataPoint[];
  evaluateAt?: number;
}

export interface DividedDifferenceTable {
  /** Each row i contains [dd[i][0], dd[i][1], ...] */
  table: number[][];
  /** Coefficients of Newton polynomial (diagonal of table) */
  coefficients: number[];
}

export interface InterpolationResult {
  n: number;
  dividedDifferences: DividedDifferenceTable;
  evaluatedValue: number | null;
  evaluateAt: number | null;
  polynomialPoints: { x: number; y: number }[];
  message: string;
}
