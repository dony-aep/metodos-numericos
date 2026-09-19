import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function EulerTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="El problema de valor inicial"
        asides={[
          {
            label: 'Lo que se da',
            content: (
              <BlockMath math="\begin{cases} y' = f(x, y) \\ y(x_0) = y_0 \end{cases}" />
            ),
          },
        ]}
      >
        <p>
          Una ecuación diferencial no dice cuánto vale{' '}
          <InlineMath math="y" />, dice cómo cambia. Eso deja infinitas soluciones,
          una por cada punto de partida, y la condición inicial elige una.
        </p>
        <p>
          Lo importante es que <InlineMath math="f(x,y)" /> da la pendiente en
          cualquier punto del plano, aunque no sepas qué curva pasa por ahí. Toda la
          integración numérica de EDO explota eso: no hace falta conocer la
          solución para saber hacia dónde va.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Seguir la tangente"
        asides={[
          {
            label: 'El método',
            content: <BlockMath math="y_{n+1} = y_n + h\,f(x_n, y_n)" />,
          },
          {
            label: 'Lo que se descarta',
            content: (
              <BlockMath math="y(x_{n+1}) = y(x_n) + h\,y'(x_n) + \tfrac{h^2}{2}y''(\xi)" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          Estás en un punto y conoces la pendiente. Avanza en línea recta un tramo{' '}
          <InlineMath math="h" />, recalcula la pendiente donde hayas caído y repite.
          Eso es todo el método.
        </p>
        <p>
          Formalmente es Taylor cortado en el primer término. Lo que se tira es{' '}
          <InlineMath math="\tfrac{h^2}{2}y''" />, y ese es el error de cada paso.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Por qué el orden global es uno"
        asides={[
          {
            label: 'Error local',
            content: <BlockMath math="\tau_n = O(h^2)" />,
          },
          {
            label: 'Error global',
            content: <BlockMath math="E_N = |y(x_N) - y_N| = O(h)" />,
          },
        ]}
      >
        <p>
          Cada paso comete un error <InlineMath math="O(h^2)" />, pero para recorrer
          un intervalo fijo hacen falta <InlineMath math="N = (x_f - x_0)/h" />{' '}
          pasos. Al multiplicar, se pierde un orden: el error acumulado es{' '}
          <InlineMath math="O(h)" />.
        </p>
        <p>
          Esa resta de uno pasa en todos los métodos de este tipo, y es lo que hace
          a Euler poco práctico. Partir <InlineMath math="h" /> por la mitad solo
          divide el error por dos, así que ganar tres cifras cuesta mil veces más
          trabajo. Runge-Kutta de cuarto orden lo divide por dieciséis con cuatro
          evaluaciones por paso, y por eso es el que se usa.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Estabilidad: el error que crece solo"
        asides={[
          {
            label: 'Sobre y = λy',
            content: <BlockMath math="y_{n+1} = (1 + h\lambda)\,y_n" />,
          },
          {
            label: 'Condición',
            content: <BlockMath math="|1 + h\lambda| \le 1" />,
          },
        ]}
      >
        <p>
          La precisión y la estabilidad son problemas distintos. Un método preciso
          puede explotar igual si el paso es grande, porque el factor que multiplica
          al error en cada iteración pasa de uno.
        </p>
        <p>
          Con la ecuación de prueba <InlineMath math="y' = \lambda y" />, la
          condición dibuja un disco de radio 1 centrado en{' '}
          <InlineMath math="-1" />. Para <InlineMath math="\lambda" /> real
          negativo, se traduce en <InlineMath math="h \le 2/|\lambda|" />. Por
          encima de eso la solución numérica oscila y se va al infinito mientras la
          exacta decae tranquilamente a cero.
        </p>
        <p>
          En un sistema <strong>rígido</strong>, donde conviven escalas de tiempo
          muy distintas, el <InlineMath math="\lambda" /> más grande manda sobre el
          paso aunque su componente ya se haya extinguido. Ahí Euler explícito
          obliga a pasos absurdamente pequeños, y toca cambiar a un método
          implícito.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Qué gana y qué pierde">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-foreground">A favor</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>Una evaluación de f por paso, la menor posible.</li>
              <li>Se entiende de un vistazo y se programa en tres líneas.</li>
              <li>Es la base de la que salen todos los demás métodos.</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-foreground">En contra</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>Orden 1: la precisión sale carísima.</li>
              <li>Región de estabilidad pequeña, inútil con problemas rígidos.</li>
              <li>El error se acumula sin cancelarse en tramos largos.</li>
            </ul>
          </div>
        </div>
        <p className="mt-4">
          Se estudia porque enseña el mecanismo entero, no porque se use. En cuanto
          el problema es real, Runge-Kutta 4 da mucha más precisión por el mismo
          coste de cálculo.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
