import { useCallback, useState } from 'react';
import type { NumericalDiffInput, NumericalDiffResult } from '@/types/numerical-diff';
import type { ModuleCalculationStatus } from '@/types/method-module';
import { validateExpression } from '@/utils/mathParser';
import { solveNumericalDiff } from '@/utils/numericalDiff';

interface UseNumericalDiffReturn {
  result: NumericalDiffResult | null;
  status: ModuleCalculationStatus;
  error: string | null;
  calculate: (input: NumericalDiffInput) => void;
  reset: () => void;
}

export function useNumericalDiff(): UseNumericalDiffReturn {
  const [result, setResult] = useState<NumericalDiffResult | null>(null);
  const [status, setStatus] = useState<ModuleCalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((input: NumericalDiffInput) => {
    setStatus('calculating');
    setError(null);
    setResult(null);

    const validation = validateExpression(input.expression);
    if (!validation.valid) {
      setStatus('error');
      setError(validation.error ?? 'Expresión inválida.');
      return;
    }

    if (!Number.isFinite(input.x)) {
      setStatus('error');
      setError('El punto x debe ser un número finito.');
      return;
    }

    if (!Number.isFinite(input.h) || input.h <= 0) {
      setStatus('error');
      setError('El paso h debe ser un número positivo.');
      return;
    }

    const solved = solveNumericalDiff(input);

    if (solved.approximations.length === 0) {
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
