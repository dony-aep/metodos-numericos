import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function NonlinearTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="¿Qué es una ecuación no lineal?"
        asides={[
          { content: (
            <>
          <p className="mb-2 text-xs font-medium text-foreground">Ejemplos:</p>
          <BlockMath math="e^{-x} - x = 0, \quad \cos(x) - x = 0, \quad x^3 - 2x - 5 = 0" />
            </>
          ) , wide: true },
        ]}
      >
        <p>
          Una ecuación no lineal se escribe como <InlineMath math="f(x) = 0" />.
          El objetivo es encontrar valores de <InlineMath math="x" /> (raíces)
          que anulen la función, cuando no es posible despejar algebraicamente.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Clasificación de métodos"
      >
        <div>
          <p className="mb-2 font-medium text-foreground">Métodos cerrados (bracketing)</p>
          <p>
            Trabajan con un intervalo <InlineMath math="[a,b]" /> donde{' '}
            <InlineMath math="f(a) \cdot f(b) < 0" />. Garantizan convergencia
            pero son más lentos. Ejemplo: <strong className="text-foreground">bisección</strong>.
          </p>
        </div>
        <div>
          <p className="mb-2 font-medium text-foreground">Métodos abiertos</p>
          <p>
            Parten de valores iniciales sin encerrar la raíz. Son más rápidos
            pero pueden divergir. Ejemplos: <strong className="text-foreground">Newton-Raphson</strong>,{' '}
            <strong className="text-foreground">secante</strong>.
          </p>
        </div>
      </TheoryBlock>

      <TheoryBlock
        title="Fórmulas principales"
      >
        <div>
          <p className="mb-2 font-medium text-foreground">Bisección</p>
          <div className="border-y border-rule py-4">
            <BlockMath math="m = \frac{a+b}{2}" />
          </div>
          <p className="mt-2">Se elige el subintervalo donde hay cambio de signo.</p>
        </div>
        <div>
          <p className="mb-2 font-medium text-foreground">Newton-Raphson</p>
          <div className="border-y border-rule py-4">
            <BlockMath math="x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}" />
          </div>
          <p className="mt-2">Convergencia cuadrática cerca de la raíz. Requiere derivada.</p>
        </div>
        <div>
          <p className="mb-2 font-medium text-foreground">Secante</p>
          <div className="border-y border-rule py-4">
            <BlockMath math="x_{n+1} = x_n - f(x_n) \frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}" />
          </div>
          <p className="mt-2">No requiere derivada. Convergencia superlineal.</p>
        </div>
      </TheoryBlock>

      <TheoryBlock
        title="Criterios de parada"
      >
        <ul className="list-inside list-disc space-y-2">
          <li><InlineMath math="|x_{n+1} - x_n| < \text{tolerancia}" /></li>
          <li><InlineMath math="|f(x_n)| < \text{tolerancia}" /></li>
          <li>Se alcanza el número máximo de iteraciones</li>
        </ul>
      </TheoryBlock>

      <TheoryBlock
        title="Convergencia"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-2 pr-4 font-medium text-foreground">Método</th>
                <th className="pb-2 pr-4 font-medium text-foreground">Orden</th>
                <th className="pb-2 font-medium text-foreground">Garantiza conv.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="py-2 pr-4">Bisección</td><td className="py-2 pr-4">Lineal</td><td className="py-2">Sí</td></tr>
              <tr><td className="py-2 pr-4">Newton-Raphson</td><td className="py-2 pr-4">Cuadrática</td><td className="py-2">No</td></tr>
              <tr><td className="py-2 pr-4">Secante</td><td className="py-2 pr-4">Superlineal (~1.618)</td><td className="py-2">No</td></tr>
            </tbody>
          </table>
        </div>
      </TheoryBlock>
    </TheoryStack>
  );
}
