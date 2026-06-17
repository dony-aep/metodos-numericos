import { useCallback, useState } from 'react';
import type { HeatDiffusionInput, HeatDiffusionResult } from '@/types/heat-diffusion';
import type { ModuleCalculationStatus } from '@/types/method-module';
import { solveHeatDiffusion, validateExpression } from '@/utils/heatDiffusion';

interface UseHeatDiffusionReturn {
  result: HeatDiffusionResult | null;
  status: ModuleCalculationStatus;
  error: string | null;
  calculate: (input: HeatDiffusionInput) => void;
  reset: () => void;
}

export function useHeatDiffusion(): UseHeatDiffusionReturn {
  const [result, setResult] = useState<HeatDiffusionResult | null>(null);
  const [status, setStatus] = useState<ModuleCalculationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback((input: HeatDiffusionInput) => {
    setStatus('calculating');
    setError(null);
    setResult(null);

    const fail = (msg: string) => {
      setStatus('error');
      setError(msg);
    };

    if (!Number.isFinite(input.alpha) || input.alpha <= 0)
      return fail('La difusividad α debe ser un número positivo.');
    if (!Number.isFinite(input.length) || input.length <= 0)
      return fail('La longitud L debe ser un número positivo.');
    if (!Number.isFinite(input.tFinal) || input.tFinal <= 0)
      return fail('El tiempo final T debe ser un número positivo.');
    if (!Number.isInteger(input.n) || input.n < 2)
      return fail('El número de intervalos N debe ser un entero ≥ 2.');
    if (input.n > 200) return fail('El número de intervalos N no puede exceder 200.');
    if (!Number.isFinite(input.dt) || input.dt <= 0)
      return fail('El paso temporal Δt debe ser un número positivo.');
    if (!Number.isFinite(input.uLeft) || !Number.isFinite(input.uRight))
      return fail('Las fronteras u(0, t) y u(L, t) deben ser números finitos.');

    const steps = Math.floor(input.tFinal / input.dt);
    if (steps < 1) return fail('Δt es demasiado grande: no completa ni un paso hasta T.');
    if (steps > 5000) return fail('Demasiados pasos de tiempo (> 5000). Aumenta Δt o reduce T.');

    const validation = validateExpression(input.initialExpression);
    if (!validation.valid)
      return fail(validation.error ?? 'La condición inicial f(x) es inválida.');

    setResult(solveHeatDiffusion(input));
    setStatus('success');
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setStatus('idle');
    setError(null);
  }, []);

  return { result, status, error, calculate, reset };
}
