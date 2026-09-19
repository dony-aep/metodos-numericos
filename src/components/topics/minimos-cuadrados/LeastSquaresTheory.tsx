import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function LeastSquaresTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="Pasar cerca, no por encima"
        asides={[
          {
            label: 'Lo que se minimiza',
            content: <BlockMath math="S = \sum_{i=1}^{n}\bigl(y_i - f(x_i)\bigr)^2" />,
          },
        ]}
      >
        <p>
          Interpolar exige que la curva pase por todos los puntos. Con datos de
          laboratorio eso es justo lo que no quieres: cada medida trae ruido, y
          obligar al polinomio a respetarlo significa ajustar el ruido.
        </p>
        <p>
          Aquí se cambia la exigencia por otra. La curva pasa{' '}
          <strong>cerca</strong> de todos, y «cerca» se define como que la suma de
          los residuos al cuadrado sea la menor posible.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Por qué al cuadrado"
        asides={[
          {
            label: 'Condición de mínimo',
            content: (
              <BlockMath math="\frac{\partial S}{\partial a} = 0,\quad \frac{\partial S}{\partial b} = 0" />
            ),
          },
        ]}
      >
        <p>
          Sumar los residuos sin más no sirve: los positivos cancelan a los
          negativos y una recta pésima puede dar suma cero. El valor absoluto
          arregla eso, pero no es derivable en el origen y deja el problema sin
          solución cerrada.
        </p>
        <p>
          El cuadrado cumple las dos cosas: penaliza en las dos direcciones y es
          derivable en todas partes. Igualar las derivadas a cero convierte el
          ajuste en un sistema lineal, y ahí se acaba el problema.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Las ecuaciones normales"
        asides={[
          {
            label: 'Para la recta y = a + bx',
            content: (
              <BlockMath math="\begin{aligned} na + b\textstyle\sum x_i &= \textstyle\sum y_i \ a\textstyle\sum x_i + b\textstyle\sum x_i^2 &= \textstyle\sum x_i y_i \end{aligned}" />
            ),
            wide: true,
          },
          {
            label: 'Pendiente',
            content: (
              <BlockMath math="b = \frac{n\sum x_i y_i - \sum x_i \sum y_i}{n\sum x_i^2 - \left(\sum x_i\right)^2}" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          Derivar e igualar a cero deja dos ecuaciones con dos incógnitas. Todo lo
          que hace falta para resolverlas son cinco sumas sobre los datos, así que
          el ajuste se calcula de una pasada.
        </p>
        <p>
          La ordenada sale después: <InlineMath math="a = \bar{y} - b\bar{x}" />.
          De ahí una propiedad útil, que la recta siempre pasa por el centro de
          gravedad de la nube.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Lineal en los parámetros"
        asides={[
          {
            label: 'Sistema normal',
            content: <BlockMath math="A^{T}A\,\mathbf{c} = A^{T}\mathbf{b}" />,
          },
        ]}
      >
        <p>
          «Lineal» no se refiere a la forma de la curva sino a cómo entran los
          coeficientes. Una parábola, un polinomio de grado ocho o una suma de
          senos se ajustan con el mismo sistema: basta cambiar las columnas de la
          matriz de diseño.
        </p>
        <p>
          Lo que sí queda fuera es <InlineMath math="ae^{bx}" />, porque{' '}
          <InlineMath math="b" /> está en el exponente. Se puede linealizar tomando
          logaritmos, aunque eso deforma los pesos de los datos, o resolver el
          problema no lineal con Gauss-Newton.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Qué mide R² y qué no"
        asides={[
          {
            label: 'Coeficiente de determinación',
            content: (
              <BlockMath math="R^2 = 1 - \frac{\sum (y_i - f(x_i))^2}{\sum (y_i - \bar{y})^2}" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          Compara el error del modelo con el de la respuesta más simple posible,
          predecir siempre la media. Un <InlineMath math="R^2" /> de 0,95 dice que
          el ajuste explica el 95 % de la variabilidad que había.
        </p>
        <p>
          Lo que no dice es si el modelo es el adecuado. Subir el grado siempre
          sube el <InlineMath math="R^2" />, y con grado{' '}
          <InlineMath math="n-1" /> llega a 1 exacto porque ya está interpolando.
          Para decidir el grado hay que mirar también los residuos: si conservan un
          patrón, falta estructura; si parecen ruido, ya está.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Dónde se rompe">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-foreground">A favor</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>Solución directa, sin iterar ni adivinar un punto inicial.</li>
              <li>Vale para cualquier modelo lineal en los coeficientes.</li>
              <li>Filtra el ruido en vez de reproducirlo.</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-foreground">En contra</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>Un solo dato atípico arrastra toda la curva.</li>
              <li>Grado alto vuelve a ajustar ruido.</li>
              <li>
                <InlineMath math="A^{T}A" /> multiplica el número de condición.
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-4">
          El último punto es el que sorprende: resolver por ecuaciones normales
          pierde el doble de cifras que trabajar con la matriz original. Por eso en
          producción se factoriza <InlineMath math="A" /> con QR y nunca se forma{' '}
          <InlineMath math="A^{T}A" />.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
