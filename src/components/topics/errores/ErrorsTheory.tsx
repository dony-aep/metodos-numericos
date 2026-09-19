import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function ErrorsTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="Por qué el error no es un fallo"
        asides={[
          {
            label: 'Las tres medidas',
            content: (
              <BlockMath math="\begin{aligned}E_a &= |x - \tilde{x}| \\[2pt] E_r &= \frac{|x - \tilde{x}|}{|x|} \\[2pt] E_\% &= E_r \times 100\end{aligned}" />
            ),
          },
        ]}
      >
        <p>
          En análisis numérico el resultado exacto casi nunca existe, y cuando
          existe casi nunca se puede escribir. Trabajas con aproximaciones desde el
          primer paso, así que la pregunta no es si hay error, sino{' '}
          <strong>cuánto</strong> y si puedes acotarlo.
        </p>
        <p>
          El absoluto es la distancia sin más. El relativo la divide entre el
          tamaño de lo que mides, y es el que suele importar: equivocarte en un
          milímetro midiendo una mesa y midiendo la órbita de la Luna no es el
          mismo error, aunque el absoluto sea idéntico.
        </p>
      </TheoryBlock>

      <TheoryBlock title="De dónde viene">
        <p>
          <strong>Redondeo.</strong> Un ordenador guarda los números en 53 bits de
          mantisa, así que 0.1 no es 0.1 sino lo más cerca que se puede llegar. El
          error aparece antes de que empieces a calcular.
        </p>
        <p>
          <strong>Truncamiento.</strong> Cortas algo infinito: una serie, un límite,
          una derivada. Es el error que tú eliges, y el único que se reduce
          trabajando más.
        </p>
        <p>
          <strong>Cancelación.</strong> Al restar dos números casi iguales, las
          cifras que compartían desaparecen y lo que queda es ruido. El error
          absoluto no ha cambiado; el relativo se ha disparado.
        </p>
        <p>
          <strong>Propagación.</strong> Los errores anteriores no se quedan
          quietos: cada operación los arrastra y a veces los multiplica. De ahí que
          el orden en que haces las cuentas importe.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Taylor, o cómo se cambia una función por un polinomio"
        asides={[
          {
            label: 'Serie de Taylor en torno a a',
            content: (
              <BlockMath math="f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          Casi todos los métodos de este curso salen de aquí. Cerca de un punto,
          una función se parece a un polinomio, y un polinomio sí se sabe sumar,
          derivar e integrar.
        </p>
        <p>
          Newton-Raphson es esta serie cortada en el primer término. Las fórmulas
          de derivación numérica salen de restar dos de estos desarrollos. El
          trapecio y Simpson, de integrarlos. Cortar la serie es lo que introduce
          el error de truncamiento, y el primer término que tiras es el que manda
          en su tamaño.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Condicionamiento y estabilidad"
        asides={[
          {
            label: 'Error de un método de orden p',
            content: <BlockMath math="|\text{error}| \leq C \cdot h^{p}" />,
          },
        ]}
      >
        <p>
          Son dos cosas distintas que se confunden a menudo. El{' '}
          <strong>condicionamiento</strong> es del problema: dice cuánto se mueve
          la solución cuando mueves un poco los datos. Un problema mal condicionado
          lo está para todos los algoritmos, y cambiar de método no lo arregla.
        </p>
        <p>
          La <strong>estabilidad</strong> es del algoritmo: dice si amplifica sus
          propios errores de redondeo mientras calcula. Un algoritmo inestable
          estropea un problema que estaba bien planteado, y eso sí se arregla
          eligiendo otro.
        </p>
        <p>
          El orden <InlineMath math="p" /> es la otra cifra que verás por todas
          partes. Con orden 2, partir el paso por la mitad divide el error entre
          cuatro; con orden 4, entre dieciséis. Por eso se persigue el orden alto,
          aunque cada paso cueste más.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
