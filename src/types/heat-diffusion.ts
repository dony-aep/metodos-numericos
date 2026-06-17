export interface HeatDiffusionInput {
  /** Difusividad térmica α */
  alpha: number;
  /** Longitud de la barra L */
  length: number;
  /** Tiempo final T */
  tFinal: number;
  /** Número de intervalos espaciales N (genera N+1 nodos) */
  n: number;
  /** Paso temporal Δt */
  dt: number;
  /** Condición inicial f(x) como expresión en x */
  initialExpression: string;
  /** Frontera Dirichlet izquierda u(0, t) */
  uLeft: number;
  /** Frontera Dirichlet derecha u(L, t) */
  uRight: number;
}

export interface HeatDiffusionResult {
  input: HeatDiffusionInput;
  /** Paso espacial Δx = L/N */
  dx: number;
  /** Número de difusión λ = α·Δt/Δx² */
  lambda: number;
  /** true si λ ≤ 1/2 (esquema FTCS estable) */
  stable: boolean;
  /** Posiciones de los nodos, longitud N+1 */
  x: number[];
  /** Niveles de tiempo */
  times: number[];
  /** Historia de perfiles: history[t][i] = u_i en el tiempo t */
  history: number[][];
  message: string;
}
