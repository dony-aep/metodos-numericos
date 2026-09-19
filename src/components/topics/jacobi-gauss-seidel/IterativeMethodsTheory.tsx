import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function IterativeMethodsTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="Adivinar y corregir"
        asides={[
          {
            label: 'La sucesión converge a la solución',
            content: (
              <BlockMath math="x^{(0)},\; x^{(1)},\; x^{(2)},\; \dots \;\to\; x^{*}" />
            ),
          },
        ]}
      >
        <p>
          Gauss resuelve el sistema de una vez y con exactitud, pero cuesta{' '}
          <InlineMath math="n^3" />. Estos métodos hacen lo contrario: parten de una
          solución inventada, normalmente ceros, y la van corrigiendo hasta que deja
          de moverse.
        </p>
        <p>
          Nunca dan la solución exacta, y eso no es un problema: si la precisión
          que necesitas son seis cifras, parar en cuanto las tengas es más barato
          que calcular las dieciséis que nadie va a mirar.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Jacobi"
        asides={[
          {
            label: 'Componente a componente',
            content: (
              <BlockMath math="x_i^{(k+1)} = \frac{1}{a_{ii}}\left(b_i - \sum_{j \neq i} a_{ij}x_j^{(k)}\right)" />
            ),
          },
        ]}
      >
        <p>
          Se despeja cada incógnita de su propia ecuación, usando para el resto los
          valores de la pasada anterior. Toda la pasada trabaja con la misma foto:
          los valores nuevos no se tocan hasta que están todos.
        </p>
        <p>
          Eso lo hace lento y, a la vez, lo único que puede repartirse entre varios
          procesadores sin coordinación: cada componente se calcula
          independientemente de las demás. En cálculo paralelo esa propiedad vale
          más que la velocidad de convergencia.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Gauss-Seidel"
        asides={[
          {
            label: 'Usa lo recién calculado',
            content: (
              <BlockMath math="x_i^{(k+1)} = \frac{1}{a_{ii}}\left(b_i - \sum_{j<i} a_{ij}x_j^{(k+1)} - \sum_{j>i} a_{ij}x_j^{(k)}\right)" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          El cambio es de una línea: en cuanto una componente se recalcula, se usa
          para la siguiente dentro de la misma pasada. No se espera a terminar.
        </p>
        <p>
          Con eso suele converger en la mitad de iteraciones que Jacobi, y además
          no necesita guardar dos vectores porque escribe encima del que tiene. El
          precio es que deja de ser paralelizable: cada componente depende de la
          anterior.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Cuándo convergen y cuándo no"
        asides={[
          {
            label: 'Dominancia diagonal',
            content: (
              <BlockMath math="|a_{ii}| > \sum_{j \neq i} |a_{ij}|" />
            ),
          },
          {
            label: 'Condición exacta',
            content: <BlockMath math="\rho(T) < 1" />,
          },
        ]}
      >
        <p>
          La condición cómoda de comprobar es la <strong>dominancia diagonal</strong>:
          que en cada fila el elemento de la diagonal sea mayor que la suma de todos
          los demás. Si se cumple, ambos métodos convergen sea cual sea el punto de
          partida.
        </p>
        <p>
          Es suficiente pero no necesaria. La condición de verdad es que el radio
          espectral de la matriz de iteración sea menor que uno, y ese número
          además dice a qué velocidad: cuanto más cerca de uno, más lento.
        </p>
        <p>
          Cuando no se cumple, no es que converjan despacio: divergen. El error se
          multiplica en cada pasada y la tabla se va al infinito en unos pocos
          pasos. Muchos sistemas físicos, como las mallas de diferencias finitas,
          salen diagonalmente dominantes por construcción, y por eso estos métodos
          se usan tanto ahí.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Cuál usar">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-foreground">Jacobi</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>Cuando vas a repartir el cálculo entre varios núcleos.</li>
              <li>Cuando necesitas conservar intacta la iteración anterior.</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-foreground">Gauss-Seidel</p>
            <ul className="list-outside list-disc space-y-1.5 pl-5">
              <li>En una máquina secuencial, que es el caso normal.</li>
              <li>Cuando la memoria aprieta: le basta un vector.</li>
            </ul>
          </div>
        </div>
        <p className="mt-4">
          Y si Gauss-Seidel se queda corto, el paso siguiente es sobrerrelajación:
          la misma fórmula multiplicando la corrección por un factor mayor que uno,
          que es como empujar al método en la dirección en la que ya iba.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
