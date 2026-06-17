import { createMathFunction, validateExpression } from '@/utils/mathParser';
import type { HeatDiffusionInput, HeatDiffusionResult } from '@/types/heat-diffusion';

export { validateExpression };

/**
 * Resuelve la ecuación de difusión del calor 1D  u_t = α·u_xx
 * por diferencias finitas con el esquema explícito FTCS y fronteras Dirichlet.
 *
 *   u_i^{n+1} = u_i^n + λ·(u_{i+1}^n − 2·u_i^n + u_{i-1}^n),   λ = α·Δt/Δx²
 *
 * El esquema es estable sólo si λ ≤ 1/2; si no, se calcula igual para
 * mostrar didácticamente la divergencia.
 */
export function solveHeatDiffusion(input: HeatDiffusionInput): HeatDiffusionResult {
  const { alpha, length, tFinal, n, dt, initialExpression, uLeft, uRight } = input;

  const dx = length / n;
  const lambda = (alpha * dt) / (dx * dx);
  const stable = lambda <= 0.5 + 1e-12;

  const f = createMathFunction(initialExpression);
  const points = n + 1;
  const x = Array.from({ length: points }, (_, i) => i * dx);

  let u = x.map((xi) => f(xi));
  u[0] = uLeft;
  u[points - 1] = uRight;

  const steps = Math.floor(tFinal / dt);
  const history: number[][] = [u.slice()];
  const times: number[] = [0];

  for (let s = 1; s <= steps; s++) {
    const next = u.slice();
    for (let i = 1; i < points - 1; i++) {
      next[i] = u[i] + lambda * (u[i + 1] - 2 * u[i] + u[i - 1]);
    }
    next[0] = uLeft;
    next[points - 1] = uRight;
    u = next;
    history.push(u.slice());
    times.push(s * dt);
  }

  const message = stable
    ? `Esquema FTCS estable: λ = ${lambda.toFixed(3)} ≤ 0.5 · ${steps} pasos de tiempo.`
    : `¡Inestable! λ = ${lambda.toFixed(3)} > 0.5: la solución diverge (oscilaciones crecientes). Reduce Δt o aumenta N.`;

  return { input, dx, lambda, stable, x, times, history, message };
}
