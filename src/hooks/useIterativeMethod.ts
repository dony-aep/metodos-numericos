import { useCallback, useState } from 'react';
import type {
  IterativeMethodInput,
  IterativeMethodResult,
} from '@/types/iterative-methods';
import type { ModuleCalculationStatus } from '@/types/method-module';
import { solveIterativeMethod } from '@/utils/iterativeMethods';

interface UseIterativeMethodReturn {
  result: IterativeMethodResult | null;
  status: ModuleCalculationStatus;
  error: string | null;
  calculate: (input: IterativeMethodInput) => void;
  reset: () => void;
}

function isFiniteMatrix(matrix: number[][]): boolean {
  return matrix.every((row) => row.every((value) => Number.isFinite(value)));
}

function isFiniteVector(vector: number[]): boolean {
  return vector.every((value) => Number.isFinite(value));
}

export function useIterativeMethod(): UseIterativeMethodReturn {
  const [result, setResult] = useState<IterativeMethodResult | null>(null);
  const [status, setStatus] = useState<ModuleCalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((input: IterativeMethodInput) => {
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

    if (rows !== cols) {
      setStatus('error');
      setError('Los métodos iterativos requieren una matriz cuadrada.');
      return;
    }

    if (input.vector.length !== rows) {
      setStatus('error');
      setError('El vector independiente debe tener el mismo número de filas que la matriz.');
      return;
    }

    if (!isFiniteMatrix(input.matrix) || !isFiniteVector(input.vector)) {
      setStatus('error');
      setError('Todos los coeficientes deben ser numéricos y finitos.');
      return;
    }

    if (input.tolerance <= 0) {
      setStatus('error');
      setError('La tolerancia debe ser un número positivo.');
      return;
    }

    if (input.maxIterations < 1) {
      setStatus('error');
      setError('El número máximo de iteraciones debe ser al menos 1.');
      return;
    }

    const solved = solveIterativeMethod(input);
    setResult(solved);
    setStatus(solved.converged ? 'success' : 'error');
    if (!solved.converged) {
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
