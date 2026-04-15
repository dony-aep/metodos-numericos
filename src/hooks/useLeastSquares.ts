import { useCallback, useState } from 'react';
import type { LeastSquaresInput, LeastSquaresResult } from '@/types/least-squares';
import type { ModuleCalculationStatus } from '@/types/method-module';
import { solveLeastSquares } from '@/utils/leastSquares';

interface UseLeastSquaresReturn {
  result: LeastSquaresResult | null;
  status: ModuleCalculationStatus;
  error: string | null;
  calculate: (input: LeastSquaresInput) => void;
  reset: () => void;
}

export function useLeastSquares(): UseLeastSquaresReturn {
  const [result, setResult] = useState<LeastSquaresResult | null>(null);
  const [status, setStatus] = useState<ModuleCalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((input: LeastSquaresInput) => {
    setStatus('calculating');
    setError(null);
    setResult(null);

    if (input.points.length < 2) {
      setStatus('error');
      setError('Se necesitan al menos 2 puntos para el ajuste.');
      return;
    }

    if (
      !input.points.every(
        (p) => Number.isFinite(p.x) && Number.isFinite(p.y)
      )
    ) {
      setStatus('error');
      setError('Todos los valores de x e y deben ser numéricos y finitos.');
      return;
    }

    if (input.degree < 1 || input.degree > 10) {
      setStatus('error');
      setError('El grado debe estar entre 1 y 10.');
      return;
    }

    const solved = solveLeastSquares(input);

    if (solved.coefficients.length === 0) {
      setStatus('error');
      setError(solved.message);
      return;
    }

    setResult(solved);
    setStatus('success');
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setStatus('idle');
    setError(null);
  }, []);

  return { result, status, error, calculate, reset };
}
