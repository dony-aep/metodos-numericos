import { useCallback, useState } from 'react';
import type { NewtonRaphsonInput, NewtonRaphsonResult } from '@/types/newton-raphson';
import type { ModuleCalculationStatus } from '@/types/method-module';
import { validateExpression } from '@/utils/mathParser';
import { solveNewtonRaphson } from '@/utils/newtonRaphson';

interface UseNewtonRaphsonReturn {
  result: NewtonRaphsonResult | null;
  status: ModuleCalculationStatus;
  error: string | null;
  calculate: (input: NewtonRaphsonInput) => void;
  reset: () => void;
}

export function useNewtonRaphson(): UseNewtonRaphsonReturn {
  const [result, setResult] = useState<NewtonRaphsonResult | null>(null);
  const [status, setStatus] = useState<ModuleCalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((input: NewtonRaphsonInput) => {
    setStatus('calculating');
    setError(null);
    setResult(null);

    const validation = validateExpression(input.expression);
    if (!validation.valid) {
      setStatus('error');
      setError(validation.error ?? 'Expresión inválida.');
      return;
    }

    if (input.derivative.trim()) {
      const dv = validateExpression(input.derivative);
      if (!dv.valid) {
        setStatus('error');
        setError('La derivada ingresada no es válida.');
        return;
      }
    }

    if (!Number.isFinite(input.x0)) {
      setStatus('error');
      setError('x₀ debe ser un número finito.');
      return;
    }

    const solved = solveNewtonRaphson(input);

    if (solved.iterations.length === 0) {
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
