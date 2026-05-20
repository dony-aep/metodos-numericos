import { useCallback, useState } from 'react';
import type { ErrorsInput, ErrorsResult, TaylorInput, TaylorResult } from '@/types/errors';
import type { ModuleCalculationStatus } from '@/types/method-module';
import { computeErrors, computeTaylorApproximation } from '@/utils/errors';
import { validateExpression } from '@/utils/mathParser';

interface UseErrorsReturn {
  errorsResult: ErrorsResult | null;
  taylorResult: TaylorResult | null;
  status: ModuleCalculationStatus;
  error: string | null;
  calculateErrors: (input: ErrorsInput) => void;
  calculateTaylor: (input: TaylorInput) => void;
  reset: () => void;
}

export function useErrors(): UseErrorsReturn {
  const [errorsResult, setErrorsResult] = useState<ErrorsResult | null>(null);
  const [taylorResult, setTaylorResult] = useState<TaylorResult | null>(null);
  const [status, setStatus] = useState<ModuleCalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculateErrors = useCallback((input: ErrorsInput) => {
    setStatus('calculating');
    setError(null);
    setTaylorResult(null);

    if (!Number.isFinite(input.exactValue)) {
      setStatus('error');
      setError('El valor exacto debe ser un número finito.');
      return;
    }
    if (!Number.isFinite(input.approxValue)) {
      setStatus('error');
      setError('El valor aproximado debe ser un número finito.');
      return;
    }

    const result = computeErrors(input);
    setErrorsResult(result);
    setStatus('success');
  }, []);

  const calculateTaylor = useCallback((input: TaylorInput) => {
    setStatus('calculating');
    setError(null);
    setErrorsResult(null);

    const validation = validateExpression(input.expression);
    if (!validation.valid) {
      setStatus('error');
      setError(validation.error ?? 'Expresión inválida.');
      return;
    }

    if (!Number.isFinite(input.a)) {
      setStatus('error');
      setError('El punto a debe ser un número finito.');
      return;
    }
    if (!Number.isFinite(input.x)) {
      setStatus('error');
      setError('El punto x debe ser un número finito.');
      return;
    }
    if (input.n < 1 || input.n > 15) {
      setStatus('error');
      setError('El grado n debe estar entre 1 y 15.');
      return;
    }

    const result = computeTaylorApproximation(input);
    if (result.terms.length === 0) {
      setStatus('error');
      setError(result.message);
      return;
    }

    setTaylorResult(result);
    setStatus('success');
  }, []);

  const reset = useCallback(() => {
    setErrorsResult(null);
    setTaylorResult(null);
    setStatus('idle');
    setError(null);
  }, []);

  return { errorsResult, taylorResult, status, error, calculateErrors, calculateTaylor, reset };
}
