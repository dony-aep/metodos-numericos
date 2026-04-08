import { useCallback, useState } from 'react';
import type {
  GaussEliminationInput,
  GaussEliminationResult,
} from '@/types/gauss-elimination';
import type { ModuleCalculationStatus } from '@/types/method-module';
import { solveGaussElimination } from '@/utils/gaussElimination';

interface UseGaussEliminationReturn {
  result: GaussEliminationResult | null;
  status: ModuleCalculationStatus;
  error: string | null;
  calculate: (input: GaussEliminationInput) => void;
  reset: () => void;
}

function isFiniteMatrix(matrix: number[][]): boolean {
  return matrix.every((row) => row.every((value) => Number.isFinite(value)));
}

function isFiniteVector(vector: number[]): boolean {
  return vector.every((value) => Number.isFinite(value));
}

export function useGaussElimination(): UseGaussEliminationReturn {
  const [result, setResult] = useState<GaussEliminationResult | null>(null);
  const [status, setStatus] = useState<ModuleCalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((input: GaussEliminationInput) => {
    setStatus('calculating');
    setError(null);
    setResult(null);

    const rows = input.matrix.length;
    const cols = input.matrix[0]?.length ?? 0;

    if (rows === 0 || cols === 0) {
      setStatus('error');
      setError('La matriz no puede estar vacía.');
      return;
    }

    if (input.vector.length !== rows) {
      setStatus('error');
      setError('El vector independiente debe tener el mismo número de filas que la matriz.');
      return;
    }

    const isRectangular = input.matrix.every((row) => row.length === cols);
    if (!isRectangular) {
      setStatus('error');
      setError('La matriz debe tener la misma cantidad de columnas en cada fila.');
      return;
    }

    if (rows !== cols) {
      setStatus('error');
      setError('La eliminación de Gauss en este módulo requiere una matriz cuadrada.');
      return;
    }

    if (!isFiniteMatrix(input.matrix) || !isFiniteVector(input.vector)) {
      setStatus('error');
      setError('Todos los coeficientes deben ser numéricos y finitos.');
      return;
    }

    const solved = solveGaussElimination(input);
    setResult(solved);
    setStatus(solved.hasUniqueSolution ? 'success' : 'error');
    if (!solved.hasUniqueSolution) {
      setError(solved.message);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setStatus('idle');
    setError(null);
  }, []);

  return { result, status, error, calculate, reset };
}
