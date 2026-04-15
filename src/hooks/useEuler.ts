import { useCallback, useState } from 'react';
import type { EulerInput, EulerResult } from '@/types/euler';
import type { ModuleCalculationStatus } from '@/types/method-module';
import { validateTwoVarExpression, solveEuler } from '@/utils/euler';

interface UseEulerReturn {
  result: EulerResult | null;
  status: ModuleCalculationStatus;
  error: string | null;
  calculate: (input: EulerInput) => void;
  reset: () => void;
}

export function useEuler(): UseEulerReturn {
  const [result, setResult] = useState<EulerResult | null>(null);
  const [status, setStatus] = useState<ModuleCalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((input: EulerInput) => {
    setStatus('calculating');
    setError(null);
    setResult(null);

    const validation = validateTwoVarExpression(input.expression);
    if (!validation.valid) {
      setStatus('error');
      setError(validation.error ?? 'Expresión inválida.');
      return;
    }

    if (!Number.isFinite(input.x0) || !Number.isFinite(input.y0)) {
      setStatus('error');
      setError('Las condiciones iniciales x₀ e y₀ deben ser números finitos.');
      return;
    }

    if (!Number.isFinite(input.h) || input.h <= 0) {
      setStatus('error');
      setError('El paso h debe ser un número positivo.');
      return;
    }

    if (!Number.isInteger(input.steps) || input.steps < 1) {
      setStatus('error');
      setError('El número de pasos debe ser un entero positivo.');
      return;
    }

    if (input.steps > 10000) {
      setStatus('error');
      setError('El número de pasos no puede exceder 10,000.');
      return;
    }

    const solved = solveEuler(input);

    if (solved.data.length === 0) {
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
