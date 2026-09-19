import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function LagrangeTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="Un interruptor por cada nodo"
        asides={[
          {
            label: 'Base de Lagrange',
            content: (
              <BlockMath math="L_k(x) = \prod_{j \ne k} \frac{x - x_j}{x_k - x_j}" />
            ),
          },
          {
            label: 'Lo que vale en los nodos',
            content: (
              <BlockMath math="L_k(x_i) = \begin{cases}1, & i = k \\ 0, & i \ne k\end{cases}" />
            ),
          },
        ]}
      >
        <p>
          La construcción es más ingeniosa de lo que parece. Para cada nodo se
          fabrica un polinomio que vale <strong>uno ahí y cero en todos los demás</strong>.
        </p>
        <p>
          Conseguirlo es directo: pones en el numerador un factor{' '}
          <InlineMath math="(x - x_j)" /> por cada nodo que quieres anular, con lo
          que el producto se hace cero en todos ellos, y divides entre lo que valga
          eso en <InlineMath math="x_k" /> para que ahí dé uno.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Sumarlos ponderados"
        asides={[
          {
            label: 'El polinomio',
            content: <BlockMath math="P_n(x) = \sum_{k=0}^{n} y_k\,L_k(x)" />,
          },
        ]}
      >
        <p>
          Con esas bases, el polinomio interpolante se escribe de un tirón: cada
          valor <InlineMath math="y_k" /> multiplicado por su interruptor.
        </p>
        <p>
          Al evaluar en <InlineMath math="x_i" />, todos los términos se anulan
          menos el <InlineMath math="i" />-ésimo, que vale <InlineMath math="y_i" />.
          El polinomio pasa por los puntos por construcción, sin resolver ningún
          sistema y sin despejar nada.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Existencia y unicidad"
        asides={[
          {
            label: 'Determinante de Vandermonde',
            content: (
              <BlockMath math="\prod_{i<j}(x_j - x_i) \neq 0" />
            ),
          },
        ]}
      >
        <p>
          Que la fórmula se escriba ya demuestra que el polinomio{' '}
          <strong>existe</strong>. Que sea único se ve por otro lado: si hubiera
          dos, su diferencia sería un polinomio de grado <InlineMath math="n" /> con{' '}
          <InlineMath math="n+1" /> raíces, y eso solo lo cumple el polinomio cero.
        </p>
        <p>
          La única condición es que los nodos sean distintos. Si dos coinciden, el
          determinante de Vandermonde se anula y el problema deja de tener sentido:
          estarías pidiendo dos valores para la misma abscisa.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="La forma baricéntrica"
        asides={[
          {
            label: 'Pesos, calculados una vez',
            content: (
              <BlockMath math="w_k = \frac{1}{\prod_{j \ne k}(x_k - x_j)}" />
            ),
          },
          {
            label: 'Evaluación',
            content: (
              <BlockMath math="P_n(x) = \frac{\sum_k \dfrac{w_k}{x - x_k}\,y_k}{\sum_k \dfrac{w_k}{x - x_k}}" />
            ),
          },
        ]}
      >
        <p>
          La fórmula clásica cuesta <InlineMath math="n^2" /> operaciones cada vez
          que evalúas, porque rehace todos los productos. La forma baricéntrica
          reordena lo mismo: calcula los pesos una sola vez y luego cada evaluación
          cuesta <InlineMath math="n" />.
        </p>
        <p>
          No es solo más rápida, también es más estable numéricamente. Es la que se
          usa en la práctica; la clásica se enseña porque explica mejor de dónde
          sale.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Frente a Newton">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-foreground">A favor</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>Se escribe directamente, sin tabla previa ni sistema.</li>
              <li>Es la forma más limpia para demostrar resultados.</li>
              <li>En versión baricéntrica, la más rápida al evaluar.</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-foreground">En contra</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>Un punto nuevo obliga a rehacer todas las bases.</li>
              <li>La forma clásica cuesta n² por evaluación.</li>
              <li>Con nodos equiespaciados sufre Runge, como cualquier otra.</li>
            </ul>
          </div>
        </div>
        <p className="mt-4">
          Las dos formas dan el mismo polinomio y el mismo error. Se elige por cómo
          llegan los datos: de golpe, Lagrange; poco a poco, Newton.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
