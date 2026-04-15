import { useCallback, useState } from 'react';
import type { InterpolationInput, InterpolationResult } from '@/types/interpolation';
import type { ModuleCalculationStatus } from '@/types/method-module';
import { solveInterpolation } from '@/utils/interpolation';

interface UseInterpolationReturn {
  result: InterpolationResult | null;
  status: ModuleCalculationStatus;
  error: string | null;
  calculate: (input: InterpolationInput) => void;
  reset: () => void;
}

export function useInterpolation(): UseInterpolationReturn {
  const [result, setResult] = useState<InterpolationResult | null>(null);
  const [status, setStatus] = useState<ModuleCalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((input: InterpolationInput) => {
    setStatus('calculating');
    setError(null);
    setResult(null);

    if (input.points.length < 2) {
      setStatus('error');
      setError('Se necesitan al menos 2 puntos para interpolar.');
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

    const solved = solveInterpolation(input);

    if (solved.dividedDifferences.coefficients.length === 0) {
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
