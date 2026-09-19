import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function InterpolationTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="Un polinomio, y solo uno"
        asides={[
          {
            label: 'Lo que se le exige',
            content: <BlockMath math="P_n(x_i) = y_i,\quad i = 0,\dots,n" />,
          },
        ]}
      >
        <p>
          Dados <InlineMath math="n+1" /> puntos con abscisas distintas, existe{' '}
          <strong>exactamente un</strong> polinomio de grado <InlineMath math="n" />{' '}
          o menos que pasa por todos. Ni ninguno ni varios: uno.
        </p>
        <p>
          Esa unicidad tiene una consecuencia práctica que confunde al principio.
          Lagrange, Newton y resolver el sistema de Vandermonde dan el{' '}
          <strong>mismo polinomio</strong>. No son tres respuestas distintas, son
          tres formas de escribir la misma, y se elige por cuál cuesta menos
          construir o evaluar, no por cuál es mejor.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="La forma de Lagrange"
        asides={[
          {
            label: 'Combinación de bases',
            content: <BlockMath math="P_n(x) = \sum_{k=0}^{n} y_k\,L_k(x)" />,
          },
          {
            label: 'Cada base',
            content: (
              <BlockMath math="L_k(x) = \prod_{j \ne k} \frac{x - x_j}{x_k - x_j}" />
            ),
          },
        ]}
      >
        <p>
          El truco es fabricar, para cada nodo, un polinomio que valga uno ahí y
          cero en todos los demás. Sumándolos ponderados por los valores{' '}
          <InlineMath math="y_k" />, cada término aporta solo en su nodo y se
          calla en el resto.
        </p>
        <p>
          Se escribe sin resolver ningún sistema, que es su gracia. Su defecto es
          que cada base depende de todos los nodos: si añades un punto hay que
          recalcularlo todo desde cero.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="La forma de Newton"
        asides={[
          {
            label: 'Construcción incremental',
            content: (
              <BlockMath math="P_n(x) = \sum_{k=0}^{n} f[x_0,\dots,x_k] \prod_{j<k}(x - x_j)" />
            ),
          },
        ]}
      >
        <p>
          Resuelve justo ese problema. Cada término nuevo corrige el polinomio
          anterior sin tocarlo, así que añadir un punto cuesta una fila más en la
          tabla de diferencias divididas y nada más.
        </p>
        <p>
          Es la forma que conviene cuando los datos llegan poco a poco, o cuando
          quieres ir subiendo el grado hasta que el ajuste te valga.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Cuánto te puedes fiar"
        asides={[
          {
            label: 'Error de interpolación',
            content: (
              <BlockMath math="f(x) - P_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{j=0}^{n}(x - x_j)" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          La fórmula del error tiene dos partes y conviene leerlas por separado. La
          derivada de orden <InlineMath math="n+1" /> no la controlas: depende de la
          función. El productorio sí, porque depende de dónde pongas los nodos.
        </p>
        <p>
          Ese producto se anula en cada nodo, como es lógico, y se dispara entre
          ellos, sobre todo cerca de los extremos del intervalo. Ahí está la
          semilla de todos los problemas.
        </p>
      </TheoryBlock>

      <TheoryBlock title="El fenómeno de Runge">
        <p>
          La intuición dice que con más puntos la aproximación mejora. Con nodos
          equiespaciados es falso, y el contraejemplo es famoso:{' '}
          <InlineMath math="f(x) = 1/(1+25x^2)" /> en{' '}
          <InlineMath math="[-1, 1]" />.
        </p>
        <p>
          Con cinco nodos el ajuste es regular. Con quince, el polinomio oscila
          cerca de los extremos con amplitudes mayores que la propia función. Con
          más nodos todavía, peor. El error no tiende a cero: tiende a infinito.
        </p>
        <p>
          La salida no es interpolar menos, sino repartir los nodos de otra forma.
          Los <strong>nodos de Chebyshev</strong>, más juntos cerca de los bordes,
          minimizan justo ese productorio y eliminan el problema. La otra salida es
          renunciar al polinomio único y usar trozos de grado bajo, que es lo que
          hacen los splines.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
