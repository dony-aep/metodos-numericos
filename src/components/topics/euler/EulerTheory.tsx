import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';
import { Badge } from '@/components/ui/badge';

export function EulerTheory() {
  return (
    <TheoryStack>
      {/* EDO y PVI */}
      <TheoryBlock
        title="Ecuaciones diferenciales ordinarias"
        asides={[
          { content: (
            <>
          <BlockMath math="y' = f(x, y)" />
            </>
          ) },
          { content: (
            <>
          <BlockMath math="\begin{cases} y' = f(x, y) \\ y(x_0) = y_0 \end{cases}" />
            </>
          ) },
        ]}
      >
        <p>
          Una <strong className="text-foreground">ecuación diferencial
          ordinaria</strong> (EDO) de primer orden relaciona una función
          desconocida <InlineMath math="y(x)" /> con su derivada:
        </p>
        <p>
          Un <strong className="text-foreground">problema de valor
          inicial</strong> (PVI) agrega la condición{' '}
          <InlineMath math="y(x_0) = y_0" />, lo que permite determinar
          una solución única bajo condiciones de Lipschitz.
        </p>
        <p>
          Cuando la solución analítica no es viable, los{' '}
          <strong className="text-foreground">métodos numéricos</strong>{' '}
          producen una sucesión de aproximaciones{' '}
          <InlineMath math="y_1, y_2, \ldots, y_N" /> en puntos discretos.
        </p>
      </TheoryBlock>

      {/* Derivación de Euler */}
      <TheoryBlock
        title="Derivación del método de Euler"
        asides={[
          { content: (
            <>
          <BlockMath math="y(x_{n+1}) = y(x_n) + h\,y'(x_n) + \frac{h^2}{2}\,y''(\xi_n)" />
            </>
          ) },
          { content: (
            <>
          <BlockMath math="y_{n+1} = y_n + h \cdot f(x_n,\, y_n)" />
            </>
          ) },
        ]}
      >
        <p>
          El método se obtiene truncando la expansión de Taylor de{' '}
          <InlineMath math="y(x)" /> alrededor de <InlineMath math="x_n" />:
        </p>
        <p>
          Descartando el término de orden <InlineMath math="O(h^2)" /> y
          sustituyendo <InlineMath math="y'(x_n) = f(x_n, y_n)" /> se
          obtiene la <strong className="text-foreground">fórmula de
          Euler</strong>:
        </p>
        <p>
          Geométricamente, cada paso sigue la{' '}
          <strong className="text-foreground">recta tangente</strong> a
          la curva solución en <InlineMath math="(x_n, y_n)" /> durante
          un intervalo <InlineMath math="h" />.
        </p>
      </TheoryBlock>

      {/* Algoritmo paso a paso */}
      <TheoryBlock
        title="Algoritmo paso a paso"
      >
        <ol className="list-inside list-decimal space-y-2">
          <li>
            Definir <InlineMath math="f(x, y)" />, la condición
            inicial <InlineMath math="(x_0, y_0)" />, el paso{' '}
            <InlineMath math="h" /> y el número de pasos{' '}
            <InlineMath math="N" />.
          </li>
          <li>
            Para <InlineMath math="n = 0, 1, \ldots, N-1" />:
            <div className="ml-6 mt-1 space-y-1">
              <p>a) Calcular la pendiente: <InlineMath math="m_n = f(x_n, y_n)" /></p>
              <p>
                b) Avanzar:{' '}
                <InlineMath math="y_{n+1} = y_n + h \cdot m_n" />
              </p>
              <p>
                c) Actualizar: <InlineMath math="x_{n+1} = x_n + h" />
              </p>
            </div>
          </li>
          <li>
            Reportar la tabla{' '}
            <InlineMath math="\{(x_n,\, y_n)\}_{n=0}^{N}" />.
          </li>
        </ol>
      </TheoryBlock>

      {/* Error */}
      <TheoryBlock
        title="Análisis del error"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-y border-rule py-4">
            <p className="mb-2 text-xs text-muted-foreground">
              Error local de truncamiento
            </p>
            <BlockMath math="\tau_n = \frac{h^2}{2}\,y''(\xi_n) = O(h^2)" />
            <p className="mt-1 text-xs">
              Error cometido en <strong className="text-foreground">un solo
              paso</strong>, proporcional a <InlineMath math="h^2" />.
            </p>
          </div>
          <div className="border-y border-rule py-4">
            <p className="mb-2 text-xs text-muted-foreground">
              Error global acumulado
            </p>
            <BlockMath math="E_N = |y(x_N) - y_N| = O(h)" />
            <p className="mt-1 text-xs">
              Después de <InlineMath math="N = (x_f - x_0)/h" /> pasos, el
              error total es de <strong className="text-foreground">primer
              orden</strong>.
            </p>
          </div>
        </div>
        <p>
          Reducir <InlineMath math="h" /> a la mitad divide el error global
          aproximadamente por 2, pero duplica el número de evaluaciones
          de <InlineMath math="f" />.
        </p>
      </TheoryBlock>

      {/* Estabilidad */}
      <TheoryBlock
        title="Estabilidad"
        asides={[
          { content: (
            <>
          <BlockMath math="y_{n+1} = (1 + h\lambda)\,y_n" />
            </>
          ) },
        ]}
      >
        <p>
          Aplicando Euler a la ecuación modelo{' '}
          <InlineMath math="y' = \lambda y" /> con{' '}
          <InlineMath math="\lambda \in \mathbb{C}" />:
        </p>
        <p>
          La solución numérica es estable si y sólo si{' '}
          <InlineMath math="|1 + h\lambda| \leq 1" />, lo que define un
          disco de radio 1 centrado en <InlineMath math="-1" /> en el
          plano complejo.
        </p>
        <p>
          Para problemas <strong className="text-foreground">stiff</strong>{' '}
          (ecuaciones rígidas), Euler explícito requiere{' '}
          <InlineMath math="h" /> extremadamente pequeño y se prefieren
          métodos implícitos.
        </p>
      </TheoryBlock>

      {/* Ventajas y limitaciones */}
      <div className="grid gap-4 sm:grid-cols-2">
        <TheoryBlock
          title="Ventajas"
        >
          <ul className="list-inside list-disc space-y-1">
            <li>Extremadamente simple de implementar y entender.</li>
            <li>Bajo costo computacional por paso.</li>
            <li>Base pedagógica para métodos superiores.</li>
            <li>Fácilmente extensible a sistemas de EDOs.</li>
          </ul>
        </TheoryBlock>
        <TheoryBlock
          title="Limitaciones"
        >
          <ul className="list-inside list-disc space-y-1">
            <li>Precisión de primer orden — error global O(h).</li>
            <li>Región de estabilidad pequeña.</li>
            <li>Inadecuado para problemas stiff sin h muy pequeño.</li>
            <li>El error se acumula en intervalos largos.</li>
          </ul>
        </TheoryBlock>
      </div>

      {/* Métodos relacionados */}
      <TheoryBlock
        title="Métodos relacionados"
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Heun (Euler mejorado) — O(h²)</Badge>
          <Badge variant="secondary">Runge-Kutta 4 — O(h⁴)</Badge>
          <Badge variant="secondary">Euler implícito — A-estable</Badge>
          <Badge variant="secondary">Adams-Bashforth — multipaso</Badge>
        </div>
        <p className="mt-2">
          El método de <strong className="text-foreground">Heun</strong>{' '}
          promedia la pendiente en ambos extremos del paso, logrando
          segundo orden. <strong className="text-foreground">Runge-Kutta
          de orden 4</strong> (RK4) evalúa la pendiente en cuatro puntos
          intermedios y es el estándar práctico para EDOs no stiff.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
