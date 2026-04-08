/**
 * Implementación del Método de la Secante
 * ========================================
 * 
 * El método de la secante es una técnica iterativa para encontrar raíces
 * de funciones reales f(x) = 0. Se basa en aproximar la derivada mediante
 * la pendiente de la recta secante que une dos puntos sucesivos de la función.
 * 
 * Fórmula principal:
 * ------------------
 *   x_{n+1} = x_n - f(x_n) * (x_n - x_{n-1}) / (f(x_n) - f(x_{n-1}))
 * 
 * Equivalentemente:
 *   x_{n+1} = (x_{n-1} * f(x_n) - x_n * f(x_{n-1})) / (f(x_n) - f(x_{n-1}))
 * 
 * Derivación:
 * -----------
 * Se obtiene a partir de Newton-Raphson reemplazando la derivada f'(x_n)
 * por una aproximación mediante diferencias finitas:
 *   f'(x_n) ≈ (f(x_n) - f(x_{n-1})) / (x_n - x_{n-1})
 * 
 * Orden de convergencia:
 * ----------------------
 * El método tiene orden de convergencia superlineal:
 *   p = φ = (1 + √5) / 2 ≈ 1.618 (número áureo)
 * 
 * Esto significa que cerca de una raíz simple, el error decrece como:
 *   |e_{n+1}| ≈ C * |e_n|^φ
 * 
 * Ventajas:
 * - No requiere calcular derivadas (solo evalúa f)
 * - Una evaluación de f por iteración
 * - Más rápido que bisección
 * 
 * Desventajas:
 * - No garantiza convergencia (método abierto)
 * - Requiere dos estimaciones iniciales
 * - Puede fallar si f(x_n) ≈ f(x_{n-1}) (división por cero)
 */
import type { SecantIteration, SecantResult } from '@/types/secant';

/**
 * Ejecuta el método de la secante para encontrar la raíz de una función.
 * 
 * @param fn - La función f(x) de la cual encontrar la raíz
 * @param x0 - Primera estimación inicial
 * @param x1 - Segunda estimación inicial
 * @param tolerance - Tolerancia para el criterio de convergencia |x_{n+1} - x_n| < tol
 * @param maxIterations - Número máximo de iteraciones permitidas
 * @returns Objeto con los resultados: iteraciones, raíz encontrada, estado de convergencia
 */
export function secantMethod(
  fn: (x: number) => number,
  x0: number,
  x1: number,
  tolerance: number = 1e-6,
  maxIterations: number = 100
): SecantResult {
  // Arreglo para almacenar el historial de cada iteración
  const iterations: SecantIteration[] = [];
  
  // Variables de trabajo para los dos puntos actuales del método
  // xPrev = x_{n-1}, xCurr = x_n
  let xPrev = x0;
  let xCurr = x1;
  
  // Evaluamos f en los puntos iniciales
  let fxPrev = fn(xPrev);  // f(x_{n-1})
  let fxCurr = fn(xCurr);  // f(x_n)

  // Validación: verificar que f(x₀) sea un número finito
  if (!isFinite(fxPrev)) {
    return {
      iterations: [],
      root: null,
      converged: false,
      message: `f(x₀) no es finito. Verifica el valor inicial x₀ = ${x0}`,
      totalIterations: 0
    };
  }

  // Validación: verificar que f(x₁) sea un número finito
  if (!isFinite(fxCurr)) {
    return {
      iterations: [],
      root: null,
      converged: false,
      message: `f(x₁) no es finito. Verifica el valor inicial x₁ = ${x1}`,
      totalIterations: 0
    };
  }

  // Bucle principal de iteración
  for (let n = 0; n < maxIterations; n++) {
    // Calculamos el denominador: f(x_n) - f(x_{n-1})
    // Este valor representa la pendiente de la secante multiplicada por (x_n - x_{n-1})
    const denominator = fxCurr - fxPrev;

    // Verificar división por cero:
    // Si f(x_n) ≈ f(x_{n-1}), la secante es casi horizontal
    // y no intersecta el eje x de forma estable
    if (Math.abs(denominator) < Number.EPSILON) {
      return {
        iterations,
        root: null,
        converged: false,
        message: `División por cero: f(x${n}) ≈ f(x${n-1}). El método no puede continuar.`,
        totalIterations: n
      };
    }

    // FÓRMULA PRINCIPAL DEL MÉTODO DE LA SECANTE:
    // x_{n+1} = x_n - f(x_n) * (x_n - x_{n-1}) / (f(x_n) - f(x_{n-1}))
    //
    // Geométricamente: encontramos la intersección con el eje x
    // de la recta secante que pasa por (x_{n-1}, f(x_{n-1})) y (x_n, f(x_n))
    const xNext = xCurr - fxCurr * (xCurr - xPrev) / denominator;
    
    // Calculamos el error como |x_{n+1} - x_n|
    // Este es el criterio de parada más común
    const error = Math.abs(xNext - xCurr);

    // Guardamos los datos de esta iteración para visualización
    iterations.push({
      n,
      xPrev,
      xCurr,
      fxPrev,
      fxCurr,
      xNext,
      error
    });

    // CRITERIO DE CONVERGENCIA:
    // Si el cambio |x_{n+1} - x_n| es menor que la tolerancia, consideramos
    // que hemos encontrado la raíz con suficiente precisión
    if (error < tolerance) {
      return {
        iterations,
        root: xNext,
        converged: true,
        message: `Convergencia alcanzada en ${n + 1} iteraciones. Raíz ≈ ${xNext.toFixed(10)}`,
        totalIterations: n + 1
      };
    }

    // Verificar que el nuevo valor sea finito (detecta divergencia)
    if (!isFinite(xNext)) {
      return {
        iterations,
        root: null,
        converged: false,
        message: 'El método diverge. Intenta con otros valores iniciales.',
        totalIterations: n + 1
      };
    }

    // ACTUALIZACIÓN para la siguiente iteración:
    // Desplazamos los valores: x_{n-1} ← x_n, x_n ← x_{n+1}
    xPrev = xCurr;
    fxPrev = fxCurr;
    xCurr = xNext;
    fxCurr = fn(xNext);  // Evaluamos f en el nuevo punto

    // Verificar que f(x_{n+1}) sea finito
    if (!isFinite(fxCurr)) {
      return {
        iterations,
        root: null,
        converged: false,
        message: `f(x) no es finito en x = ${xCurr}. El método no puede continuar.`,
        totalIterations: n + 1
      };
    }
  }

  // Si llegamos aquí, se alcanzó el máximo de iteraciones sin converger
  return {
    iterations,
    root: xCurr,
    converged: false,
    message: `Máximo de iteraciones alcanzado (${maxIterations}). Última aproximación: ${xCurr.toFixed(10)}`,
    totalIterations: maxIterations
  };
}
