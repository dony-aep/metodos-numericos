import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';
import { Badge } from '@/components/ui/badge';

export function LeastSquaresTheory() {
  return (
    <TheoryStack>
      {/* Concepto */}
      <TheoryBlock
        title="¿Qué es el ajuste por mínimos cuadrados?"
        asides={[
          { content: (
            <>
          <BlockMath math="S = \sum_{i=1}^{n} \left(y_i - f(x_i)\right)^2" />
            </>
          ) },
        ]}
      >
        <p>
          El método busca la función <InlineMath math="f(x)" /> que mejor representa un conjunto
          de datos <InlineMath math="(x_i, y_i)" />,{' '}
          <strong className="text-foreground">minimizando</strong> la suma de los cuadrados de
          los residuos:
        </p>
        <p>
          A diferencia de la interpolación, la curva ajustada{' '}
          <strong className="text-foreground">no pasa</strong> necesariamente por todos los
          puntos; busca la mejor aproximación global.
        </p>
      </TheoryBlock>

      {/* Caso lineal */}
      <TheoryBlock
        title="Ajuste lineal"
      >
        <p>
          Para el modelo <InlineMath math="y = a + bx" />, al derivar{' '}
          <InlineMath math="S(a,b)" /> e igualar a cero se obtienen las{' '}
          <strong className="text-foreground">ecuaciones normales</strong>:
        </p>
        <div className="border-y border-rule py-4 space-y-1">
          <BlockMath math="na + b\sum x_i = \sum y_i" />
          <BlockMath math="a\sum x_i + b\sum x_i^2 = \sum x_i y_i" />
        </div>
        <p>Despejando:</p>
        <div className="border-y border-rule py-4 space-y-1">
          <BlockMath math="b = \frac{n\sum x_i y_i - (\sum x_i)(\sum y_i)}{n\sum x_i^2 - (\sum x_i)^2}" />
          <BlockMath math="a = \frac{\sum y_i - b\sum x_i}{n}" />
        </div>
      </TheoryBlock>

      {/* Forma matricial */}
      <TheoryBlock
        title="Forma matricial"
        asides={[
          { content: (
            <>
          <BlockMath math="A^T A \, \mathbf{c} = A^T \mathbf{b}" />
            </>
          ) },
          { content: (
            <>
          <BlockMath
            math={`A = \\begin{bmatrix} 1 & x_1 & x_1^2 & \\cdots & x_1^k \\\\ 1 & x_2 & x_2^2 & \\cdots & x_2^k \\\\ \\vdots & \\vdots & \\vdots & & \\vdots \\\\ 1 & x_n & x_n^2 & \\cdots & x_n^k \\end{bmatrix}`}
          />
            </>
          ) },
        ]}
      >
        <p>
          El problema se puede expresar como{' '}
          <InlineMath math="A\mathbf{c} \approx \mathbf{b}" />, y la solución se obtiene con:
        </p>
        <p>
          Para un polinomio de grado <InlineMath math="k" />, la matriz de diseño es:
        </p>
      </TheoryBlock>

      {/* R² */}
      <TheoryBlock
        title="Coeficiente de determinación R²"
        asides={[
          { content: (
            <>
          <BlockMath math="R^2 = 1 - \frac{\sum (y_i - f(x_i))^2}{\sum (y_i - \bar{y})^2}" />
            </>
          ) },
        ]}
      >
        <p>
          Un <InlineMath math="R^2" /> cercano a 1 indica un buen ajuste.
          Valores menores sugieren que el modelo no captura bien la variabilidad de los datos.
        </p>
      </TheoryBlock>

      {/* Ventajas y limitaciones */}
      <div className="grid gap-4 sm:grid-cols-2">
        <TheoryBlock
          title="Ventajas"
        >
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Simple
            </Badge>
            Fácil de entender e implementar.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Flexible
            </Badge>
            Se adapta a rectas, polinomios y modelos complejos.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Robusto
            </Badge>
            Funciona bien con datos experimentales ruidosos.
          </p>
        </TheoryBlock>

        <TheoryBlock
          title="Limitaciones"
        >
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Outliers
            </Badge>
            Sensible a valores atípicos (errores al cuadrado).
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Sobreajuste
            </Badge>
            Grados altos pueden ajustar ruido en vez de tendencia.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Condición
            </Badge>
            Las ecuaciones normales pueden ser inestables si la matriz está mal condicionada.
          </p>
        </TheoryBlock>
      </div>

      {/* Tipos de ajuste */}
      <TheoryBlock
        title=""
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/20">
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Tipo
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Modelo
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Nota
                </th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="px-4 py-2 font-medium text-foreground">
                  Lineal
                </td>
                <td className="px-4 py-2">
                  <InlineMath math="a + bx + cx^2 + \cdots" />
                </td>
                <td className="px-4 py-2">
                  Lineal en los parámetros; se resuelve con ecuaciones normales
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium text-foreground">
                  No lineal
                </td>
                <td className="px-4 py-2">
                  <InlineMath math="ae^{bx}" />
                </td>
                <td className="px-4 py-2">
                  Requiere métodos iterativos (Gauss-Newton, Levenberg-Marquardt)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-foreground">
                  Ponderado
                </td>
                <td className="px-4 py-2">
                  <InlineMath math="\sum w_i e_i^2" />
                </td>
                <td className="px-4 py-2">
                  Cada dato tiene un peso diferente
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TheoryBlock>
    </TheoryStack>
  );
}
