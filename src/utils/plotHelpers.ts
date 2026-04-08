import type { SecantIteration, SecantLine, PlotPoint } from '@/types/secant';

export function generateSecantLines(iterations: SecantIteration[]): SecantLine[] {
  return iterations.map((iter) => ({
    x1: iter.xPrev,
    y1: iter.fxPrev,
    x2: iter.xCurr,
    y2: iter.fxCurr,
    iteration: iter.n
  }));
}

export function calculatePlotRange(
  x0: number,
  x1: number,
  root: number | null,
  padding: number = 2
): { xMin: number; xMax: number } {
  const values = [x0, x1];
  if (root !== null) values.push(root);

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 2;

  return {
    xMin: min - range * padding,
    xMax: max + range * padding
  };
}

export function generateErrorData(iterations: SecantIteration[]): PlotPoint[] {
  return iterations.map((iter) => ({
    x: iter.n,
    y: iter.error > 0 ? Math.log10(iter.error) : -16
  }));
}

export function formatScientific(value: number, precision: number = 6): string {
  if (Math.abs(value) < 1e-10) return '0';
  if (Math.abs(value) >= 1e4 || Math.abs(value) < 1e-4) {
    return value.toExponential(precision);
  }
  return value.toFixed(precision);
}
