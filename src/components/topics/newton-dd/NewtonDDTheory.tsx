import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function NewtonDDTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="Qué es una diferencia dividida"
        asides={[
          {
            label: 'Primer orden',
            content: (
              <BlockMath math="f[x_i, x_j] = \frac{f(x_j) - f(x_i)}{x_j - x_i}" />
            ),
          },
          {
            label: 'Orden k, por recurrencia',
            content: (
              <BlockMath math="f[x_i,\dots,x_j] = \frac{f[x_{i+1},\dots,x_j] - f[x_i,\dots,x_{j-1}]}{x_j - x_i}" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          Una diferencia dividida de primer orden es una pendiente: el incremento
          de la función entre el incremento de la variable. Las de orden superior
          son pendientes de pendientes.
        </p>
        <p>
          Son el equivalente discreto de las derivadas. De hecho, si juntas los
          nodos hasta hacerlos coincidir, la diferencia dividida de orden{' '}
          <InlineMath math="k" /> tiende a la derivada <InlineMath math="k" />-ésima
          dividida por <InlineMath math="k!" />. Esa es la razón de que el polinomio
          de Newton se parezca tanto a una serie de Taylor.
        </p>
      </TheoryBlock>

      <TheoryBlock title="La tabla triangular">
        <p>
          Se organizan en columnas. La primera son los valores{' '}
          <InlineMath math="f(x_i)" />; la segunda, las diferencias de primer orden
          entre pares consecutivos; la tercera, las de esas, y así hasta que queda
          un único número.
        </p>
        <p>
          Los coeficientes del polinomio son la <strong>diagonal superior</strong> de
          esa tabla. Cada uno se usa una vez y ya está: no hay que resolver ningún
          sistema.
        </p>
        <p>
          La tabla es además la razón de ser del método. Añadir un punto nuevo
          significa añadir una fila por abajo, que arrastra un coeficiente más. Lo
          calculado antes sigue valiendo.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="El polinomio"
        asides={[
          {
            label: 'Forma de Newton',
            content: (
              <BlockMath math="P_n(x) = \sum_{k=0}^{n} f[x_0,\dots,x_k]\prod_{j<k}(x - x_j)" />
            ),
            wide: true,
          },
          {
            label: 'Evaluación anidada',
            content: (
              <BlockMath math="P_n(x) = f[x_0] + (x-x_0)\bigl(f[x_0,x_1] + (x-x_1)(\cdots)\bigr)" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          Cada término añade una corrección al anterior y se anula en todos los
          nodos que ya estaban colocados, así que no estropea el ajuste conseguido.
          El polinomio se va construyendo por capas.
        </p>
        <p>
          Para evaluarlo no se calcula cada producto por separado: se anida, como en
          el esquema de Horner. Eso baja el coste de una evaluación de{' '}
          <InlineMath math="n^2" /> a <InlineMath math="n" /> y de paso reduce el
          error de redondeo.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Frente a Lagrange"
        asides={[
          {
            label: 'Mismo polinomio, mismo error',
            content: (
              <BlockMath math="E_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{j=0}^{n}(x - x_j)" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          Producen el mismo polinomio, así que el error es idéntico y ninguna de las
          dos formas aproxima mejor. La diferencia está en el trabajo.
        </p>
        <p>
          Newton gana cuando los datos van llegando, cuando quieres subir el grado
          poco a poco o cuando vas a evaluar muchas veces. Lagrange se escribe más
          rápido a mano y es más limpia para demostrar cosas.
        </p>
        <p>
          Lo que Newton no arregla es el fenómeno de Runge: es el mismo polinomio,
          y con nodos equiespaciados oscilará igual cerca de los extremos.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
