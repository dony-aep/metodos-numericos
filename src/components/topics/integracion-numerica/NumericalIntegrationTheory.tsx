import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function NumericalIntegrationTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="Cuando no hay primitiva"
        asides={[
          {
            label: 'Toda regla tiene esta forma',
            content: <BlockMath math="\int_a^b f(x)\,dx \approx \sum_{i=0}^{n} w_i\,f(x_i)" />,
            wide: true,
          },
        ]}
      >
        <p>
          La mayoría de las funciones no tienen primitiva elemental.{' '}
          <InlineMath math="e^{-x^2}" /> es el ejemplo clásico, y está en el centro
          de la estadística. Y aunque exista, puede que solo tengas una tabla de
          medidas y ninguna fórmula que integrar.
        </p>
        <p>
          Todas las reglas hacen lo mismo: evaluar la función en unos cuantos
          puntos y sumar con pesos. Lo único que las distingue es dónde se colocan
          los puntos y cuánto pesa cada uno.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="De dónde salen los pesos"
        asides={[
          {
            label: 'Trapecio: recta por dos puntos',
            content: <BlockMath math="\int_a^b f \approx \frac{b-a}{2}\bigl[f(a) + f(b)\bigr]" />,
            wide: true,
          },
          {
            label: 'Simpson: parábola por tres',
            content: (
              <BlockMath math="\int_a^b f \approx \frac{b-a}{6}\left[f(a) + 4f\!\left(\tfrac{a+b}{2}\right) + f(b)\right]" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          Los coeficientes no son arbitrarios. Sustituyes{' '}
          <InlineMath math="f" /> por su polinomio interpolante e integras ese, que
          sí tiene primitiva. Con dos puntos sale una recta y el área es un
          trapecio; con tres, una parábola y salen los pesos 1, 4, 1.
        </p>
        <p>
          Integrar y interpolar son el mismo problema, y por eso el error de estas
          reglas es el error de interpolación integrado.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Las versiones compuestas"
        asides={[
          {
            label: 'Trapecio compuesto',
            content: (
              <BlockMath math="\frac{h}{2}\left[f(x_0) + 2\sum_{i=1}^{n-1} f(x_i) + f(x_n)\right]" />
            ),
            wide: true,
          },
          {
            label: 'Simpson compuesto',
            content: (
              <BlockMath math="\frac{h}{3}\left[f(x_0) + 4\!\!\sum_{i\ \text{impar}}\!\! f(x_i) + 2\!\!\sum_{i\ \text{par}}\!\! f(x_i) + f(x_n)\right]" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          Una sola parábola sobre todo el intervalo aproxima mal. La solución no es
          subir el grado, que trae el fenómeno de Runge, sino partir{' '}
          <InlineMath math="[a,b]" /> en trozos pequeños y aplicar la regla simple
          en cada uno.
        </p>
        <p>
          Al sumarlo todo, los extremos interiores aparecen dos veces y de ahí
          salen los coeficientes 2 y 4. Simpson necesita un{' '}
          <InlineMath math="n" /> par porque cada parábola consume dos
          subintervalos.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="El orden, y una sorpresa"
        asides={[
          {
            label: 'Error del trapecio',
            content: <BlockMath math="E_T = -\frac{(b-a)h^2}{12}f''(\xi)" />,
          },
          {
            label: 'Error de Simpson',
            content: <BlockMath math="E_S = -\frac{(b-a)h^4}{180}f^{(4)}(\xi)" />,
          },
        ]}
      >
        <p>
          El trapecio es <InlineMath math="O(h^2)" /> y su error depende de{' '}
          <InlineMath math="f''" />, la curvatura. Con una función lineal es exacto,
          porque no hay curvatura que perder.
        </p>
        <p>
          Simpson es <InlineMath math="O(h^4)" />. Lo curioso es que se construye
          con una parábola y sale exacto hasta grado <strong>tres</strong>: el error
          del término cúbico es simétrico respecto del punto medio y se cancela
          solo. Un grado de regalo.
        </p>
        <p>
          En la práctica la diferencia es grande. Duplicar los puntos divide el
          error del trapecio por 4 y el de Simpson por 16, con el mismo número de
          evaluaciones.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Cuándo ninguna de las dos sirve">
        <p>
          Las dos suponen que la función es suave. Si tiene un pico, una
          discontinuidad en la derivada o una singularidad en un extremo, el error
          teórico deja de valer: <InlineMath math="f^{(4)}" /> no está acotada y el{' '}
          <InlineMath math="O(h^4)" /> es una promesa vacía.
        </p>
        <p>
          Ahí conviene partir el intervalo por el punto problemático, usar
          cuadratura adaptativa, que refina solo donde el error local es grande, o
          cambiar de variable para absorber la singularidad.
        </p>
        <p>
          Hay una excepción que compensa: con una función periódica integrada sobre
          un periodo completo, el humilde trapecio converge más rápido que
          cualquier potencia de <InlineMath math="h" />.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Cuál elegir">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="text-muted-foreground">
              <tr className="border-b border-rule">
                <th className="py-2 pr-4 font-normal">Regla</th>
                <th className="py-2 pr-4 font-normal">Error</th>
                <th className="py-2 pr-4 font-normal">Exacta hasta</th>
                <th className="py-2 font-normal">Condición</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-rule">
                <td className="py-2 pr-4 text-foreground">Trapecio</td>
                <td className="py-2 pr-4">
                  <InlineMath math="O(h^2)" />
                </td>
                <td className="py-2 pr-4">Grado 1</td>
                <td className="py-2">Cualquier n</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-foreground">Simpson 1/3</td>
                <td className="py-2 pr-4">
                  <InlineMath math="O(h^4)" />
                </td>
                <td className="py-2 pr-4">Grado 3</td>
                <td className="py-2">n par</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          Con una función suave, Simpson siempre. El trapecio se queda para datos
          ruidosos, donde su menor sensibilidad compensa el orden más bajo, y para
          los casos en que el número de puntos viene dado y es impar.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
