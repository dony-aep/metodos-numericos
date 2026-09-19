import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';
import { Badge } from '@/components/ui/badge';

export function NewtonDDTheory() {
  return (
    <TheoryStack>
      {/* Concepto */}
      <TheoryBlock
        title="¿Qué son las diferencias divididas?"
      >
        <p>
          Las <strong className="text-foreground">diferencias divididas</strong> son coeficientes
          que se calculan recursivamente a partir de un conjunto de datos{' '}
          <InlineMath math="(x_i, y_i)" /> y permiten construir el polinomio interpolante de
          Newton.
        </p>
        <div className="space-y-2 border-y border-rule py-4">
          <p className="text-xs font-medium text-foreground">Definición recursiva</p>
          <BlockMath math="f[x_i] = f(x_i)" />
          <BlockMath math="f[x_i, x_{i+1}] = \frac{f[x_{i+1}] - f[x_i]}{x_{i+1} - x_i}" />
          <BlockMath math="f[x_i, \dots, x_{i+k}] = \frac{f[x_{i+1}, \dots, x_{i+k}] - f[x_i, \dots, x_{i+k-1}]}{x_{i+k} - x_i}" />
        </div>
      </TheoryBlock>

      {/* Tabla triangular */}
      <TheoryBlock
        title="Estructura de la tabla"
      >
        <p>
          Los valores se organizan en una{' '}
          <strong className="text-foreground">tabla triangular</strong>. Cada columna representa un
          orden de diferencia dividida; los coeficientes del polinomio de Newton son la{' '}
          <strong className="text-foreground">diagonal principal</strong> (primera fila de cada
          columna).
        </p>
        <div className="border-y border-rule py-4">
          <BlockMath
            math={`\\begin{array}{c|cccc}
x_i & f[x_i] & f[\\cdot,\\cdot] & f[\\cdot,\\cdot,\\cdot] & \\cdots \\\\
\\hline
x_0 & f[x_0] & & & \\\\
   &        & f[x_0,x_1] & & \\\\
x_1 & f[x_1] &             & f[x_0,x_1,x_2] & \\\\
   &        & f[x_1,x_2] & & \\ddots \\\\
x_2 & f[x_2] & & & \\\\
\\vdots & & & &
\\end{array}`}
          />
        </div>
      </TheoryBlock>

      {/* Polinomio de Newton */}
      <TheoryBlock
        title="Polinomio de Newton"
        asides={[
          { content: (
            <>
          <BlockMath math="P_n(x) = \sum_{k=0}^{n} f[x_0, \dots, x_k] \prod_{j=0}^{k-1} (x - x_j)" />
            </>
          ) },
          { content: (
            <>
          <BlockMath
            math={`P_n(x) = f[x_0] + f[x_0,x_1](x - x_0) + f[x_0,x_1,x_2](x - x_0)(x - x_1) + \\cdots`}
          />
            </>
          ) , wide: true },
          { content: (
            <>
          <BlockMath
            math={`P_n(x) = f[x_0] + (x - x_0)\\bigl(f[x_0,x_1] + (x - x_1)(\\cdots)\\bigr)`}
          />
            </>
          ) , wide: true },
        ]}
      >
        <p>
          Esto equivale a la forma expandida:
        </p>
        <p>
          Para evaluar eficientemente se utiliza la{' '}
          <strong className="text-foreground">forma anidada (Horner)</strong>:
        </p>
      </TheoryBlock>

      {/* Ventajas y propiedades */}
      <div className="grid gap-4 sm:grid-cols-2">
        <TheoryBlock
          title="Ventajas"
        >
          <p>
            <Badge variant="outline" className="mr-1 text-[10px]">
              Incremental
            </Badge>
            Agregar un punto nuevo solo requiere una columna más, sin recalcular todo.
          </p>
          <p>
            <Badge variant="outline" className="mr-1 text-[10px]">
              Eficiente
            </Badge>
            Evaluación en <InlineMath math="O(n)" /> con Horner.
          </p>
          <p>
            <Badge variant="outline" className="mr-1 text-[10px]">
              Reutilizable
            </Badge>
            La tabla se construye una vez y sirve para evaluar en cualquier punto.
          </p>
        </TheoryBlock>

        <TheoryBlock
          title="Limitaciones"
        >
          <p>
            <Badge variant="outline" className="mr-1 text-[10px]">
              Runge
            </Badge>
            Grados altos con nodos equidistantes pueden oscilar en los extremos.
          </p>
          <p>
            <Badge variant="outline" className="mr-1 text-[10px]">
              Nodos
            </Badge>
            Los <InlineMath math="x_i" /> deben ser distintos para evitar división por cero.
          </p>
        </TheoryBlock>
      </div>

      {/* Error de interpolación */}
      <TheoryBlock
        title=""
        asides={[
          { content: (
            <>
          <BlockMath math="E_n(x) = f[x_0, x_1, \dots, x_n, x] \prod_{j=0}^{n}(x - x_j)" />
            </>
          ) },
          { content: (
            <>
          <BlockMath math="E_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{j=0}^{n}(x - x_j)" />
            </>
          ) },
        ]}
      >
        <p>
          Si <InlineMath math="f" /> es <InlineMath math="(n+1)" /> veces diferenciable, existe{' '}
          <InlineMath math="\xi" /> tal que:
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
