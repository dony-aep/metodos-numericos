import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function BisectionTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="Fundamento teórico"
        asides={[
          {
            label: 'Teorema del valor intermedio',
            content: (
              <BlockMath math={'\\begin{aligned}& f(a) \\cdot f(b) < 0 \\\\ \\implies\\;& \\exists\\, c \\in (a,b) : f(c) = 0\\end{aligned}'} />
            ),
          },
        ]}
      >
        <p>
          El método se apoya en el <strong>teorema del valor intermedio</strong>: si{' '}
          <InlineMath math="f" /> es continua en <InlineMath math="[a,b]" /> y toma
          signos opuestos en los extremos, entonces en algún punto interior vale
          cero.
        </p>
        <p>
          El teorema no dice cuál es esa raíz ni cuántas hay, solo que existe al
          menos una. De ahí que baste con estrechar el intervalo para acorralarla.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Procedimiento"
        asides={[
          { label: 'Punto medio', content: <BlockMath math="c = \frac{a + b}{2}" /> },
        ]}
      >
        <ol className="list-outside list-decimal space-y-2 pl-5">
          <li>
            Comprobar que <InlineMath math="f(a) \cdot f(b) < 0" />, o el método no
            arranca.
          </li>
          <li>Calcular el punto medio del intervalo.</li>
          <li>
            Evaluar <InlineMath math="f(c)" /> ahí.
          </li>
          <li>
            Si <InlineMath math="f(a) \cdot f(c) < 0" />, la raíz cae en{' '}
            <InlineMath math="[a,c]" />; si no, en <InlineMath math="[c,b]" />.
          </li>
          <li>Repetir con la mitad que se conserva, hasta bajar de la tolerancia.</li>
        </ol>
      </TheoryBlock>

      <TheoryBlock
        title="Error y convergencia"
        asides={[
          {
            label: 'Cota del error',
            content: <BlockMath math="E_n \leq \frac{b - a}{2^n}" />,
          },
          {
            label: 'Iteraciones necesarias',
            content: (
              <BlockMath math="n \geq \log_2\left(\frac{b-a}{\varepsilon}\right)" />
            ),
          },
        ]}
      >
        <p>
          El intervalo se parte por la mitad en cada paso, así que el error también.
          Eso fija de antemano cuántas iteraciones hacen falta: no depende de la
          función, solo del ancho inicial y de la tolerancia que pidas.
        </p>
        <p>
          La convergencia es <strong>lineal</strong>. Gana algo más de tres decimales
          cada diez iteraciones, siempre, sin sorpresas y sin acelerones.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Qué gana y qué pierde">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-foreground">A favor</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>Converge siempre que haya continuidad y cambio de signo.</li>
              <li>No necesita la derivada.</li>
              <li>El error está acotado antes de empezar.</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-foreground">En contra</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>Es el más lento de los cuatro.</li>
              <li>Hace falta un intervalo inicial que encierre la raíz.</li>
              <li>Ignora la forma de la función: solo mira el signo.</li>
            </ul>
          </div>
        </div>
      </TheoryBlock>
    </TheoryStack>
  );
}
