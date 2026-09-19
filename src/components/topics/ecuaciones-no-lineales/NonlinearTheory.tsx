import { BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const METODOS = [
  {
    nombre: 'Bisección',
    tipo: 'Cerrado',
    orden: 'Lineal',
    evaluaciones: '1',
    converge: 'Siempre',
  },
  {
    nombre: 'Secante',
    tipo: 'Abierto',
    orden: '1.618',
    evaluaciones: '1',
    converge: 'Si arrancas cerca',
  },
  {
    nombre: 'Newton-Raphson',
    tipo: 'Abierto',
    orden: 'Cuadrático',
    evaluaciones: '2',
    converge: 'Si arrancas cerca',
  },
];

export function NonlinearTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="Por qué hacen falta estos métodos"
        asides={[
          {
            label: 'Ninguna de estas se despeja',
            content: (
              <BlockMath math="\begin{aligned}& e^{-x} - x = 0 \\ & \cos(x) - x = 0 \\ & x^5 - x - 1 = 0\end{aligned}" />
            ),
          },
        ]}
      >
        <p>
          Una ecuación de segundo grado tiene fórmula. Una de tercero y una de
          cuarto también, aunque nadie las use. De quinto grado en adelante{' '}
          <strong>no existe ninguna</strong>, y eso no es que no se haya
          encontrado: Abel demostró en 1824 que no puede existir.
        </p>
        <p>
          Añade a eso cualquier mezcla de exponenciales, senos o logaritmos y el
          despeje algebraico se acaba. Lo que queda es acercarse a la raíz por
          aproximaciones sucesivas, que es de lo que va todo este apartado.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Dos familias, un intercambio">
        <p>
          Los <strong>métodos cerrados</strong> parten de un intervalo donde la
          función cambia de signo y lo van estrechando. Como nunca sueltan la raíz,
          convergen siempre. A cambio son lentos y necesitan que le encuentres ese
          intervalo de partida.
        </p>
        <p>
          Los <strong>métodos abiertos</strong> parten de uno o dos puntos y usan la
          forma de la función para dar el siguiente salto. Son mucho más rápidos y
          no garantizan nada: pueden divergir, ciclar o irse a una raíz distinta de
          la que buscabas.
        </p>
        <p>
          El intercambio es ese y no hay una respuesta correcta. Las bibliotecas
          serias no eligen: arrancan con un método cerrado para acorralar la raíz y
          rematan con uno abierto.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Las tres fórmulas"
        asides={[
          { label: 'Bisección', content: <BlockMath math="m = \frac{a+b}{2}" /> },
          {
            label: 'Newton-Raphson',
            content: <BlockMath math="x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}" />,
          },
          {
            label: 'Secante',
            content: (
              <BlockMath math="x_{n+1} = x_n - f(x_n)\,\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}" />
            ),
          },
        ]}
      >
        <p>
          Las tres hacen lo mismo: sustituir la función por algo más simple y
          resolver eso. La bisección la sustituye por su signo, que es lo mínimo
          que se puede mirar. Newton la sustituye por su tangente. La secante, por
          la recta que une los dos últimos puntos.
        </p>
        <p>
          Cuanta más información de la función usa el método, más rápido va y menos
          garantías da. Mirar solo el signo nunca falla pero apenas avanza; usar la
          derivada dobla los dígitos cuando funciona y te manda al infinito cuando
          no.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Cómo se comparan">
        <p>
          La columna que suele faltar es la de evaluaciones. Newton tiene el orden
          más alto, pero gasta dos evaluaciones por paso porque también necesita la
          derivada. La secante gasta una. Contando trabajo en vez de iteraciones, la
          secante le gana casi siempre.
        </p>

        <div className="mt-2 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Método</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Orden</TableHead>
                <TableHead className="text-right">Evaluaciones</TableHead>
                <TableHead className="text-right">Converge</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {METODOS.map((m) => (
                <TableRow key={m.nombre}>
                  <TableCell>{m.nombre}</TableCell>
                  <TableCell className="text-muted-foreground">{m.tipo}</TableCell>
                  <TableCell className="text-right font-mono">{m.orden}</TableCell>
                  <TableCell className="text-right font-mono">
                    {m.evaluaciones}
                  </TableCell>
                  <TableCell className="text-right">{m.converge}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TheoryBlock>

      <TheoryBlock
        title="Cuándo parar"
        asides={[
          {
            label: 'Los dos criterios',
            content: (
              <BlockMath math="\begin{aligned}& |x_{n+1} - x_n| < \varepsilon \\ & |f(x_n)| < \varepsilon\end{aligned}" />
            ),
          },
        ]}
      >
        <p>
          El primero mide que el método ya casi no se mueve; el segundo, que la
          función ya casi vale cero. No son lo mismo y uno puede cumplirse sin el
          otro.
        </p>
        <p>
          En una función muy plana el residuo es diminuto a bastante distancia de la
          raíz. En una muy empinada, dos puntos casi pegados dan valores muy
          distintos. Por eso se vigilan los dos, y siempre con un tope de
          iteraciones que corte la ejecución si nada converge.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
