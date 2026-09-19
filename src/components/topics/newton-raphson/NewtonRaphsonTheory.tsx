import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function NewtonRaphsonTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="De dónde sale la fórmula"
        asides={[
          {
            label: 'Recta tangente',
            content: <BlockMath math="y = f(x_n) + f'(x_n)(x - x_n)" />,
          },
          {
            label: 'Al igualarla a cero',
            content: <BlockMath math="x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}" />,
          },
        ]}
      >
        <p>
          La idea es sustituir la función por algo que sí sabemos resolver. Cerca
          de <InlineMath math="x_n" /> la curva se parece a su{' '}
          <strong>recta tangente</strong>, y una recta se cruza con el eje en un
          punto que se despeja de cabeza.
        </p>
        <p>
          Ese punto es la siguiente aproximación. Es Taylor cortado en el primer
          término: te quedas con la pendiente y tiras el resto.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Procedimiento">
        <ol className="list-outside list-decimal space-y-2 pl-5">
          <li>
            Partir de un <InlineMath math="x_0" /> razonablemente cerca de la raíz.
          </li>
          <li>
            Evaluar <InlineMath math="f(x_n)" /> y <InlineMath math="f'(x_n)" />.
          </li>
          <li>
            Comprobar que la derivada no es cero: una tangente horizontal no corta
            el eje y el método se rompe ahí mismo.
          </li>
          <li>Restar el cociente y quedarse con el nuevo punto.</li>
          <li>Repetir hasta bajar de la tolerancia.</li>
        </ol>
      </TheoryBlock>

      <TheoryBlock
        title="Por qué va tan rápido"
        asides={[
          {
            label: 'Error de un paso al siguiente',
            content: (
              <BlockMath math="|e_{n+1}| \approx \frac{|f''(r)|}{2|f'(r)|}\,|e_n|^2" />
            ),
          },
        ]}
      >
        <p>
          El error nuevo es proporcional al <strong>cuadrado</strong> del anterior.
          En la práctica eso significa que el número de cifras correctas se dobla
          en cada paso: de 3 decimales pasas a 6, y de 6 a 12.
        </p>
        <p>
          Ese comportamiento es local. Solo aparece cuando ya estás cerca y la
          derivada en la raíz no se anula. Lejos, la tangente apunta a donde le
          parece y el método puede alejarse, quedarse en un ciclo o saltar a otra
          raíz distinta de la que buscabas.
        </p>
        <p>
          Con una raíz múltiple la derivada también se anula ahí y la convergencia
          cae a lineal: deja de doblar dígitos y se arrastra como la bisección.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Qué gana y qué pierde">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-foreground">A favor</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>El más rápido de los cuatro cuando arranca bien.</li>
              <li>Cuatro o cinco iteraciones bastan para la precisión de la máquina.</li>
              <li>Se generaliza a sistemas de ecuaciones sin cambiar la idea.</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-foreground">En contra</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>Hace falta la derivada, y no siempre se tiene.</li>
              <li>Gasta dos evaluaciones por iteración, el doble que la secante.</li>
              <li>No garantiza nada si el punto de partida está lejos.</li>
            </ul>
          </div>
        </div>
      </TheoryBlock>

      <TheoryBlock
        title="Un ejemplo con el que probarlo"
        asides={[
          {
            label: 'Iteración para √2',
            content: (
              <BlockMath math="x_{n+1} = \frac{1}{2}\left(x_n + \frac{2}{x_n}\right)" />
            ),
          },
        ]}
      >
        <p>
          Con <InlineMath math="f(x) = x^2 - 2" /> la fórmula se simplifica a la
          media entre <InlineMath math="x_n" /> y <InlineMath math="2/x_n" />. Es el
          algoritmo que usaban los babilonios para extraer raíces cuadradas, mil
          años antes que Newton.
        </p>
        <p>
          Desde <InlineMath math="x_0 = 1" /> da 1.5, luego 1.41667, luego
          1.4142157 y después ya coincide con √2 en diez cifras. Cuatro pasos.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
