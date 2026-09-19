import { BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function InterpolationTheory() {
  return (
    <TheoryStack>
      {/* Idea general */}
      <TheoryBlock
        title="Definición"
        asides={[
          { content: (
            <>
          <BlockMath math="P_n(x_i) = y_i, \quad i = 0, 1, \dots, n" />
            </>
          ) },
        ]}
      >
        <p>
          Dados <strong>n + 1</strong> puntos con abscisas distintas, existe un
          único polinomio de grado a lo sumo n que pasa por todos ellos:
        </p>
        <p>
          Se usa para estimar valores intermedios, modelar curvas a partir de
          mediciones y preparar datos para simulación.
        </p>
      </TheoryBlock>

      {/* Lagrange */}
      <TheoryBlock
        title="Forma de Lagrange"
        asides={[
          { content: (
            <>
          <BlockMath math="P_n(x) = \sum_{i=0}^{n} y_i \, L_i(x)" />
            </>
          ) },
          { content: (
            <>
          <BlockMath math="L_i(x) = \prod_{j=0,\, j \neq i}^{n} \frac{x - x_j}{x_i - x_j}" />
            </>
          ) },
        ]}
      >
        <p>
          El polinomio se escribe como combinación lineal de las bases de
          Lagrange, donde cada base vale 1 en su nodo y 0 en los demás:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Ventaja
            </p>
            <p className="text-xs text-foreground/80">
              Clara, directa y fácil de entender conceptualmente.
            </p>
          </div>
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-red-700 dark:text-red-400">
              Desventaja
            </p>
            <p className="text-xs text-foreground/80">
              Si agregas un nuevo dato, normalmente debes recalcular todo.
            </p>
          </div>
        </div>
      </TheoryBlock>

      {/* Newton */}
      <TheoryBlock
        title="Forma de Newton"
        asides={[
          { content: (
            <>
          <BlockMath math="P_n(x) = f[x_0] + f[x_0,x_1](x{-}x_0) + f[x_0,x_1,x_2](x{-}x_0)(x{-}x_1) + \cdots" />
            </>
          ) , wide: true },
          { content: (
            <>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Diferencias divididas
          </p>
          <BlockMath math="f[x_i] = y_i, \qquad f[x_i, \dots, x_j] = \frac{f[x_{i+1}, \dots, x_j] - f[x_i, \dots, x_{j-1}]}{x_j - x_i}" />
            </>
          ) , wide: true },
        ]}
      >
        <p>
          Usa <strong>diferencias divididas</strong> como coeficientes. Permite
          agregar nuevos puntos sin rehacer todo desde cero.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Ventaja
            </p>
            <p className="text-xs text-foreground/80">
              Permite agregar datos incrementalmente. Mejor para cálculos numéricos.
            </p>
          </div>
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-red-700 dark:text-red-400">
              Desventaja
            </p>
            <p className="text-xs text-foreground/80">
              La tabla de diferencias divididas puede ser costosa de construir para muchos puntos.
            </p>
          </div>
        </div>
      </TheoryBlock>

      {/* Error */}
      <TheoryBlock
        title="Error de interpolación"
        asides={[
          { content: (
            <>
          <BlockMath math="f(x) - P_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{i=0}^{n}(x - x_i)" />
            </>
          ) },
        ]}
      >
        <p>
          Si la función original tiene derivada (n+1) continua, el error se
          puede expresar como:
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { title: 'Suavidad', desc: 'Depende de las derivadas de f' },
            { title: 'Distribución', desc: 'Depende de la ubicación de los nodos' },
            { title: 'Grado', desc: 'Mayor grado no siempre mejora la aproximación' },
          ].map((item) => (
            <div
              key={item.title}
              className="border-y border-rule py-4"
            >
              <p className="text-xs font-semibold">{item.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </TheoryBlock>

      {/* Runge */}
      <TheoryBlock
        title="Fenómeno de Runge"
      >
        <p>
          Con nodos equidistantes y grado alto, pueden aparecer
          <strong> oscilaciones grandes</strong> cerca de los extremos del
          intervalo. El polinomio pasa por todos los puntos pero aproxima mal
          la función entre ellos.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { step: '01', label: 'Usar menos grado' },
            { step: '02', label: 'Nodos de Chebyshev' },
            { step: '03', label: 'Splines por tramos' },
          ].map((item) => (
            <div
              key={item.step}
              className="border-y border-rule py-4"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {item.step}
              </span>
              <p className="mt-1 text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </TheoryBlock>

      {/* Tip */}
      <TheoryBlock
        title="Consejo práctico"
      >
        <p>
          Para pocos puntos, la interpolación polinómica funciona bien. Con
          muchos datos, prefiere <strong>splines cúbicos</strong> o
          interpolación por tramos para evitar oscilaciones indeseadas.
          La forma de Newton suele ser la mejor opción para implementación.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
