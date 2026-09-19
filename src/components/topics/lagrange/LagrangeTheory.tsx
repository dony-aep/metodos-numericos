import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';
import { Badge } from '@/components/ui/badge';

export function LagrangeTheory() {
  return (
    <TheoryStack>
      {/* Concepto */}
      <TheoryBlock
        title="Idea general"
        asides={[
          { content: (
            <>
          <BlockMath math="P_n(x) = \sum_{k=0}^{n} y_k \, L_k(x)" />
            </>
          ) },
          { content: (
            <>
          <BlockMath math="L_k(x) = \prod_{\substack{j=0 \\ j \ne k}}^{n} \frac{x - x_j}{x_k - x_j}" />
            </>
          ) },
          { content: (
            <>
          <BlockMath
            math={`L_k(x_i) = \\begin{cases} 1, & i = k \\\\ 0, & i \\ne k \\end{cases}`}
          />
            </>
          ) },
        ]}
      >
        <p>
          La <strong className="text-foreground">interpolación de Lagrange</strong> construye un
          polinomio <InlineMath math="P_n(x)" /> de grado ≤ <InlineMath math="n" /> que pasa
          exactamente por los puntos <InlineMath math="(x_0,y_0), \dots, (x_n,y_n)" />.
        </p>
        <p>
          donde cada <strong className="text-foreground">base de Lagrange</strong>{' '}
          <InlineMath math="L_k(x)" /> «enciende» el valor <InlineMath math="y_k" /> en su
          nodo <InlineMath math="x_k" /> y «apaga» a los demás:
        </p>
      </TheoryBlock>

      {/* Existencia y unicidad */}
      <TheoryBlock
        title="Existencia y unicidad"
      >
        <p>
          Si los nodos <InlineMath math="x_0, x_1, \dots, x_n" /> son{' '}
          <strong className="text-foreground">distintos</strong>, existe un único polinomio de
          grado ≤ <InlineMath math="n" /> que interpola los datos. No hay ambigüedad: no importa
          el método (Lagrange, Newton, sistema de Vandermonde), el polinomio resultante es el
          mismo.
        </p>
      </TheoryBlock>

      {/* Forma baricéntrica */}
      <TheoryBlock
        title="Forma baricéntrica"
        asides={[
          { content: (
            <>
          <BlockMath math="P_n(x) = \frac{\displaystyle\sum_{j=0}^{n} \frac{w_j}{x - x_j} \, y_j}{\displaystyle\sum_{j=0}^{n} \frac{w_j}{x - x_j}}" />
            </>
          ) },
          { content: (
            <>
          <BlockMath math="w_j = \frac{1}{\prod_{\substack{i=0 \\ i \ne j}}^{n} (x_j - x_i)}" />
            </>
          ) },
        ]}
      >
        <p>
          Para evaluación numérica estable se usa la{' '}
          <strong className="text-foreground">forma baricéntrica</strong>, que evita recalcular
          todos los productos para cada punto:
        </p>
        <p>con pesos:</p>
      </TheoryBlock>

      {/* Ventajas y desventajas */}
      <div className="grid gap-4 sm:grid-cols-2">
        <TheoryBlock
          title="Ventajas"
        >
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Directo
            </Badge>
            No requiere resolver un sistema lineal.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Claro
            </Badge>
            La forma es muy intuitiva para enseñanza.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Práctico
            </Badge>
            Funciona bien para un número pequeño o moderado de puntos.
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
              Runge
            </Badge>
            Grados altos con nodos equiespaciados pueden oscilar.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Costoso
            </Badge>
            Evaluar repetidamente la fórmula directa es <InlineMath math="O(n^2)" />.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              No incremental
            </Badge>
            Agregar un punto nuevo obliga a recalcular todas las bases.
          </p>
        </TheoryBlock>
      </div>

      {/* Error de interpolación */}
      <TheoryBlock
        title=""
        asides={[
          { content: (
            <>
          <BlockMath math="f(x) - P_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{j=0}^{n}(x - x_j)" />
            </>
          ) },
        ]}
      >
        <p>
          El error depende de la derivada de orden <InlineMath math="n+1" />, de la distribución
          de los nodos y del punto de evaluación. Si los nodos están mal distribuidos, el error
          puede crecer significativamente.
        </p>
      </TheoryBlock>

      {/* Comparación con Newton */}
      <TheoryBlock
        title="Lagrange vs. Newton"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/20">
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Aspecto
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Lagrange
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Newton
                </th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="px-4 py-2 font-medium text-foreground">Forma</td>
                <td className="px-4 py-2">Bases <InlineMath math="L_k(x)" /></td>
                <td className="px-4 py-2">Diferencias divididas</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium text-foreground">Agregar puntos</td>
                <td className="px-4 py-2">Recalcular todo</td>
                <td className="px-4 py-2">Solo una columna más</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium text-foreground">Evaluación</td>
                <td className="px-4 py-2">
                  <InlineMath math="O(n^2)" /> directa
                </td>
                <td className="px-4 py-2">
                  <InlineMath math="O(n)" /> con Horner
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-foreground">Resultado</td>
                <td className="px-4 py-2" colSpan={2}>
                  El mismo polinomio único de grado ≤ n
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TheoryBlock>
    </TheoryStack>
  );
}
