import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function LinearSystemsTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="Qué se está resolviendo"
        asides={[
          { label: 'Forma matricial', content: <BlockMath math="A\mathbf{x} = \mathbf{b}" /> },
        ]}
      >
        <p>
          Un sistema lineal es un montón de ecuaciones donde las incógnitas
          aparecen multiplicadas por números y nada más: ni cuadrados, ni senos, ni
          productos entre ellas. Esa restricción es lo que lo hace tratable.
        </p>
        <p>
          Escribirlo como <InlineMath math="A\mathbf{x} = \mathbf{b}" /> no es
          taquigrafía. Separa lo que define el problema, la matriz{' '}
          <InlineMath math="A" />, de lo que se pregunta, el vector{' '}
          <InlineMath math="\mathbf{b}" />. Si resuelves varios sistemas con la
          misma matriz y distintos términos independientes, el trabajo caro se hace
          una vez.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Cuántas soluciones hay"
        asides={[
          {
            label: 'El determinante decide',
            content: (
              <BlockMath math="\det(A) \neq 0 \iff \text{solución única}" />
            ),
          },
        ]}
      >
        <p>
          Con tantas ecuaciones como incógnitas y determinante no nulo, la solución
          existe y es única. Si el determinante se anula hay dos casos: o ninguna
          solución, porque las ecuaciones se contradicen, o infinitas, porque
          algunas repiten lo que ya decían otras.
        </p>
        <p>
          Con más ecuaciones que incógnitas normalmente no hay solución exacta, y lo
          que se busca entonces es la que menos se equivoca: eso es el ajuste por
          mínimos cuadrados. Con menos ecuaciones que incógnitas sobran grados de
          libertad y hay infinitas.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Dos maneras de atacarlo">
        <p>
          Los <strong>métodos directos</strong> llegan a la solución exacta en un
          número fijo de operaciones, sin aproximar: eliminación de Gauss,
          factorización LU, factorización QR. Cuestan del orden de{' '}
          <InlineMath math="n^3" />, lo que con una matriz de mil incógnitas ya se
          nota y con un millón es imposible.
        </p>
        <p>
          Los <strong>métodos iterativos</strong> parten de una solución tentativa
          y la refinan: Jacobi, Gauss-Seidel, gradiente conjugado. Cada pasada
          cuesta <InlineMath math="n^2" /> o menos si la matriz es dispersa, y se
          para cuando la precisión basta. A cambio solo convergen bajo condiciones,
          como la dominancia diagonal.
        </p>
        <p>
          La regla práctica: matrices pequeñas y densas, directos; matrices enormes
          y con muchos ceros, iterativos.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="El número de condición"
        asides={[
          {
            label: 'Cuánto se amplifica un error',
            content: (
              <BlockMath math="\kappa(A) = \|A\|\,\|A^{-1}\|" />
            ),
          },
        ]}
      >
        <p>
          Hay sistemas que no se pueden resolver bien con ningún método, y conviene
          saber reconocerlos. Si dos ecuaciones son casi paralelas, las rectas se
          cortan en un ángulo muy abierto y mover un poco una de ellas desplaza el
          punto de corte muchísimo.
        </p>
        <p>
          El número de condición mide exactamente eso. Si vale{' '}
          <InlineMath math="10^6" />, puedes perder seis cifras significativas por
          el camino aunque el algoritmo sea impecable. No es un defecto del método:
          es el problema el que está mal planteado.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
