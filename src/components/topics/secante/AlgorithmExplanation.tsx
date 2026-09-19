import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Doble barra invertida: en el bundle queda una sola.
const LATEX = {
  secante:
    'x_{n+1} = x_n - f(x_n) \\cdot \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}',
  newton: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}",
  pendiente: "f'(x_n) \\approx \\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}",
  orden: 'p = \\varphi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618',
  error: '|e_{n+1}| \\approx C\\,|e_n|^{\\varphi}',
  paradaX: '|x_{n+1} - x_n| < \\varepsilon',
  paradaF: '|f(x_{n+1})| < \\varepsilon',
};

const COMPARACION = [
  { metodo: 'Bisección', orden: '1', evaluaciones: '1', derivada: 'No', garantia: 'Global' },
  { metodo: 'Secante', orden: '1.618', evaluaciones: '1', derivada: 'No', garantia: 'Local' },
  { metodo: 'Newton', orden: '2', evaluaciones: '2', derivada: 'Sí', garantia: 'Local' },
];

export function AlgorithmExplanation() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="De dónde sale la fórmula"
        asides={[
          { label: 'Newton-Raphson', content: <BlockMath math={LATEX.newton} /> },
          {
            label: 'La derivada, aproximada',
            content: <BlockMath math={LATEX.pendiente} />,
          },
        ]}
      >
        <p>
          La secante no es un método nuevo: es Newton al que le han quitado la
          derivada. En vez de calcular <InlineMath math="f'(x_n)" /> se estima con
          la pendiente entre los dos últimos puntos, que es una{' '}
          <strong>diferencia finita</strong> de manual.
        </p>
        <p>
          Sustituyendo esa aproximación en la fórmula de Newton sale directamente
          la de la secante. Geométricamente, donde Newton traza la tangente en un
          punto, la secante traza la recta que une dos, y ambas se cortan con el
          eje en el siguiente candidato.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="La fórmula"
        asides={[{ label: 'Iteración', content: <BlockMath math={LATEX.secante} /> }]}
      >
        <p>
          Hace falta arrancar con dos puntos, <InlineMath math="x_0" /> y{' '}
          <InlineMath math="x_1" />, no con uno. A cambio, cada paso solo evalúa la
          función una vez: el valor en el punto anterior ya lo tienes guardado del
          paso previo.
        </p>
        <p>
          Ese detalle es el que decide la comparación con Newton. No importa solo
          cuántas iteraciones hagan falta, sino cuánto cuesta cada una.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Orden de convergencia"
        asides={[
          { label: 'Orden', content: <BlockMath math={LATEX.orden} /> },
          { label: 'Error asintótico', content: <BlockMath math={LATEX.error} /> },
        ]}
      >
        <p>
          El orden es el <strong>número áureo</strong>, 1.618. No es una curiosidad
          buscada: sale de resolver la recurrencia del error, y el exponente que
          aparece resulta ser la razón dorada.
        </p>
        <p>
          Está entre la bisección, que es lineal, y Newton, que es cuadrático. Pero
          como gasta la mitad de evaluaciones que Newton, en tiempo de máquina
          suele salir ganando.
        </p>

        <div className="mt-2 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Método</TableHead>
                <TableHead className="text-right">Orden</TableHead>
                <TableHead className="text-right">Evaluaciones</TableHead>
                <TableHead className="text-right">Derivada</TableHead>
                <TableHead className="text-right">Convergencia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPARACION.map((fila) => (
                <TableRow key={fila.metodo}>
                  <TableCell>{fila.metodo}</TableCell>
                  <TableCell className="text-right font-mono">{fila.orden}</TableCell>
                  <TableCell className="text-right font-mono">
                    {fila.evaluaciones}
                  </TableCell>
                  <TableCell className="text-right">{fila.derivada}</TableCell>
                  <TableCell className="text-right">{fila.garantia}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TheoryBlock>

      <TheoryBlock
        title="Cuándo parar"
        asides={[
          { label: 'Por el paso', content: <BlockMath math={LATEX.paradaX} /> },
          { label: 'Por el residuo', content: <BlockMath math={LATEX.paradaF} /> },
        ]}
      >
        <p>
          Hay dos criterios y no miden lo mismo. El primero dice que el método ya
          casi no se mueve; el segundo, que el valor de la función es casi cero.
        </p>
        <p>
          Cumplir uno no implica cumplir el otro: en una función muy plana el
          residuo puede ser diminuto lejos de la raíz, y en una muy empinada dos
          puntos casi iguales pueden dar valores muy distintos. Conviene vigilar
          los dos y poner un tope de iteraciones como red.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Qué gana y qué pierde">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-foreground">A favor</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>Casi la velocidad de Newton sin necesitar la derivada.</li>
              <li>Una sola evaluación por iteración.</li>
              <li>Sirve cuando la función solo se conoce por tabla o por medida.</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-foreground">En contra</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>Necesita dos puntos de partida.</li>
              <li>No encierra la raíz, así que puede escaparse.</li>
              <li>Si los dos valores se parecen mucho, el paso se dispara.</li>
            </ul>
          </div>
        </div>
        <p className="mt-4">
          La combinación habitual en una biblioteca seria es arrancar con bisección
          para acorralar la raíz y rematar con secante, que es justamente lo que
          hace el método de Brent.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Un ejemplo con el que probarlo">
        <p>
          Con <InlineMath math="f(x) = x^3 + 2x^2 + 10x - 20" /> y los puntos{' '}
          <InlineMath math="x_0 = 0" />, <InlineMath math="x_1 = 1" />, la secante
          llega a <InlineMath math="x \approx 1.368808" /> en unas cinco
          iteraciones.
        </p>
        <p>
          Es el ejemplo que trae cargado la calculadora. Cambia los dos puntos de
          partida y verás que el número de pasos se mueve mucho más de lo que
          esperarías: la convergencia es local, y arrancar lejos se paga.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
