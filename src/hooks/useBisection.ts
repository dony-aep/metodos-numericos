import { useCallback, useState } from 'react';
import type { BisectionInput, BisectionResult } from '@/types/bisection';
import type { ModuleCalculationStatus } from '@/types/method-module';
import { validateExpression } from '@/utils/mathParser';
import { solveBisection } from '@/utils/bisection';

interface UseBisectionReturn {
  result: BisectionResult | null;
  status: ModuleCalculationStatus;
  error: string | null;
  calculate: (input: BisectionInput) => void;
  reset: () => void;
}

export function useBisection(): UseBisectionReturn {
  const [result, setResult] = useState<BisectionResult | null>(null);
  const [status, setStatus] = useState<ModuleCalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((input: BisectionInput) => {
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
      setError('Los extremos a y b deben ser números finitos.');
      return;
    }

    if (input.a >= input.b) {
      setStatus('error');
      setError('El extremo a debe ser menor que b.');
      return;
    }

    const solved = solveBisection(input);

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
