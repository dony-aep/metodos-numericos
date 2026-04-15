import { useCallback, useState } from 'react';
import type { IntegrationInput, IntegrationResult } from '@/types/numerical-integration';
import type { ModuleCalculationStatus } from '@/types/method-module';
import { validateExpression } from '@/utils/mathParser';
import { solveNumericalIntegration } from '@/utils/numericalIntegration';

interface UseNumericalIntegrationReturn {
  result: IntegrationResult | null;
  status: ModuleCalculationStatus;
  error: string | null;
  calculate: (input: IntegrationInput) => void;
  reset: () => void;
}

export function useNumericalIntegration(): UseNumericalIntegrationReturn {
  const [result, setResult] = useState<IntegrationResult | null>(null);
  const [status, setStatus] = useState<ModuleCalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((input: IntegrationInput) => {
    setStatus('calculating');
    setError(null);
    setResult(null);

    const validation = validateExpression(input.expression);
    if (!validation.valid) {
      setStatus('error');
      setError(validation.error ?? 'Expresión inválida.');
      return;
    }

    if (!Number.isFinite(input.a) || !Number.isFinite(input.b)) {
      setStatus('error');
      setError('Los límites a y b deben ser números finitos.');
      return;
    }

    if (input.a >= input.b) {
      setStatus('error');
      setError('El límite inferior a debe ser menor que b.');
      return;
    }

    if (!Number.isInteger(input.n) || input.n < 1) {
      setStatus('error');
      setError('El número de subintervalos n debe ser un entero positivo.');
      return;
    }

    const solved = solveNumericalIntegration(input);

    if (!Number.isFinite(solved.trapezoid.value)) {
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
