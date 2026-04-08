import { useState, useCallback } from 'react';
import type { SecantResult, SecantParams, CalculationStatus } from '@/types/secant';
import { createMathFunction, validateExpression } from '@/utils/mathParser';
import { secantMethod } from '@/utils/secantAlgorithm';

interface UseSecantMethodReturn {
  result: SecantResult | null;
  status: CalculationStatus;
  error: string | null;
  calculate: (params: SecantParams) => void;
  reset: () => void;
}

export function useSecantMethod(): UseSecantMethodReturn {
  const [result, setResult] = useState<SecantResult | null>(null);
  const [status, setStatus] = useState<CalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((params: SecantParams) => {
    setStatus('calculating');
    setError(null);
    setResult(null);

    const validation = validateExpression(params.fn);
    if (!validation.valid) {
      setStatus('error');
      setError(validation.error || 'Expresión inválida');
      return;
    }

    try {
      const fn = createMathFunction(params.fn);
      const calcResult = secantMethod(
        fn,
        params.x0,
        params.x1,
        params.tolerance,
        params.maxIterations
      );

      setResult(calcResult);
      setStatus(calcResult.converged ? 'success' : 'error');
      
      if (!calcResult.converged) {
        setError(calcResult.message);
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setStatus('idle');
    setError(null);
  }, []);

  return { result, status, error, calculate, reset };
}
