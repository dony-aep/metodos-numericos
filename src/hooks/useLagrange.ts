import { useCallback, useState } from 'react';
import type { LagrangeInput, LagrangeResult } from '@/types/lagrange';
import type { ModuleCalculationStatus } from '@/types/method-module';
import { solveLagrange } from '@/utils/lagrange';

interface UseLagrangeReturn {
  result: LagrangeResult | null;
  status: ModuleCalculationStatus;
  error: string | null;
  calculate: (input: LagrangeInput) => void;
  reset: () => void;
}

export function useLagrange(): UseLagrangeReturn {
  const [result, setResult] = useState<LagrangeResult | null>(null);
  const [status, setStatus] = useState<ModuleCalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((input: LagrangeInput) => {
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

    const solved = solveLagrange(input);

    if (solved.n === 0 && solved.polynomialPoints.length === 0) {
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
