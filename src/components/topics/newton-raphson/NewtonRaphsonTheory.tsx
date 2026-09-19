import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function NewtonRaphsonTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="Interpretación geométrica"
        asides={[
          { content: (
            <>
          <BlockMath math="y = f(x_n) + f'(x_n)(x - x_n)" />
            </>
          ) },
          { content: (
            <>
          <BlockMath math="x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}" />
            </>
          ) },
        ]}
      >
        <p>
          En cada iteración se traza la <strong className="text-foreground">recta tangente</strong> a{' '}
          <InlineMath math="f(x)" /> en el punto <InlineMath math="(x_n, f(x_n))" />.
          La intersección de esa tangente con el eje <InlineMath math="x" /> da la
          siguiente aproximación <InlineMath math="x_{n+1}" />.
        </p>
        <p>
          Igualando <InlineMath math="y = 0" /> y despejando:
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Algoritmo"
      >
        <ol className="list-inside list-decimal space-y-2">
          <li>Elegir una aproximación inicial <InlineMath math="x_0" />.</li>
          <li>Calcular <InlineMath math="f(x_n)" /> y <InlineMath math="f'(x_n)" />.</li>
          <li>Verificar que <InlineMath math="f'(x_n) \neq 0" />.</li>
          <li>Aplicar <InlineMath math="x_{n+1} = x_n - f(x_n)/f'(x_n)" />.</li>
          <li>Repetir hasta cumplir la tolerancia.</li>
        </ol>
      </TheoryBlock>

      <TheoryBlock
        title="Convergencia"
        asides={[
          { content: (
            <>
          <BlockMath math="|e_{n+1}| \approx \frac{|f''(r)|}{2|f'(r)|} |e_n|^2" />
            </>
          ) },
        ]}
      >
        <p>
          Cuando converge, el método tiene convergencia{' '}
          <strong className="text-foreground">cuadrática</strong>: el número de
          cifras correctas se duplica aproximadamente en cada iteración.
        </p>
        <p>
          Condiciones para convergencia rápida: función diferenciable,{' '}
          <InlineMath math="f'(r) \neq 0" />, y <InlineMath math="x_0" /> cercano a la raíz.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Ventajas"
      >
        <ul className="list-inside list-disc space-y-1">
          <li>Convergencia muy rápida (cuadrática).</li>
          <li>Fácil de programar.</li>
          <li>Muy usado en ciencia e ingeniería.</li>
          <li>Pocas iteraciones para alta precisión.</li>
        </ul>
      </TheoryBlock>

      <TheoryBlock
        title="Desventajas y casos de falla"
      >
        <ul className="list-inside list-disc space-y-1">
          <li>Requiere conocer o calcular la derivada.</li>
          <li>Puede divergir si <InlineMath math="x_0" /> está lejos de la raíz.</li>
          <li>Falla si <InlineMath math="f'(x_n) = 0" /> (tangente horizontal).</li>
          <li>Convergencia lenta en raíces múltiples.</li>
          <li>No garantiza convergencia global.</li>
        </ul>
      </TheoryBlock>

      {/* Example */}
      <TheoryBlock
        title="Ejemplo: calcular √2"
        asides={[
          { content: (
            <>
          <BlockMath math="x_{n+1} = \frac{1}{2}\left(x_n + \frac{2}{x_n}\right)" />
            </>
          ) },
        ]}
      >
        <p>
          Con <InlineMath math="f(x) = x^2 - 2" /> y{' '}
          <InlineMath math="f'(x) = 2x" />, la iteración queda:
        </p>
        <p>
          Con <InlineMath math="x_0 = 1" />: <InlineMath math="x_1 = 1.5" />,{' '}
          <InlineMath math="x_2 \approx 1.4167" />,{' '}
          <InlineMath math="x_3 \approx 1.41422" />. En 4 iteraciones se alcanza
          precisión de 10 cifras.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
