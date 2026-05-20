import { useCallback, useState } from 'react';
import type { NonlinearComparison, NonlinearInput, NonlinearResult } from '@/types/nonlinear';
import type { ModuleCalculationStatus } from '@/types/method-module';
import { validateExpression } from '@/utils/mathParser';
import { solveNonlinear } from '@/utils/nonlinear';

interface UseNonlinearReturn {
  comparison: NonlinearComparison | null;
  status: ModuleCalculationStatus;
  error: string | null;
  calculate: (inputs: NonlinearInput[]) => void;
  reset: () => void;
}

export function useNonlinear(): UseNonlinearReturn {
  const [comparison, setComparison] = useState<NonlinearComparison | null>(null);
  const [status, setStatus] = useState<ModuleCalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((inputs: NonlinearInput[]) => {
    setStatus('calculating');
    setError(null);
    setComparison(null);

    if (inputs.length === 0) {
      setStatus('error');
      setError('Selecciona al menos un método.');
      return;
    }

    const validation = validateExpression(inputs[0].expression);
    if (!validation.valid) {
      setStatus('error');
      setError(validation.error ?? 'Expresión inválida.');
      return;
    }

    const results: NonlinearResult[] = [];
    for (const input of inputs) {
      const result = solveNonlinear(input);
      results.push(result);
    }

    setComparison({ results, expression: inputs[0].expression });
    setStatus('success');
  }, []);

  const reset = useCallback(() => {
    setComparison(null);
    setStatus('idle');
    setError(null);
  }, []);

  return { comparison, status, error, calculate, reset };
}
