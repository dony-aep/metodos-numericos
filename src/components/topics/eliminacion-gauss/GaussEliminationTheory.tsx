import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function GaussEliminationTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="La idea"
        asides={[
          {
            label: 'Operación de eliminación',
            content: (
              <BlockMath math="\begin{aligned}m_{ik} &= \frac{a_{ik}}{a_{kk}} \\ F_i &\leftarrow F_i - m_{ik}F_k\end{aligned}" />
            ),
          },
        ]}
      >
        <p>
          Un sistema triangular se resuelve sin esfuerzo: la última ecuación tiene
          una sola incógnita, la penúltima dos y ya conoces una, y así hacia arriba.
          Todo el método consiste en llegar a esa forma.
        </p>
        <p>
          Para conseguirlo se restan múltiplos de una fila a las de abajo hasta
          dejar ceros bajo la diagonal. Restar un múltiplo de una ecuación a otra no
          cambia la solución, así que el sistema que queda es{' '}
          <strong>equivalente</strong> al de partida, solo que resoluble de un
          vistazo.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Las dos fases">
        <p>
          <strong>Eliminación hacia adelante.</strong> Columna por columna se elige
          un pivote y se anulan todos los elementos que quedan debajo. Al terminar,
          la matriz es triangular superior.
        </p>
        <p>
          <strong>Sustitución hacia atrás.</strong> Se despeja la última incógnita,
          se sustituye en la ecuación anterior, se despeja la siguiente, y así hasta
          arriba.
        </p>
        <p>
          El reparto de trabajo es muy desigual: la eliminación se lleva del orden
          de <InlineMath math="n^3" /> operaciones y la sustitución solo{' '}
          <InlineMath math="n^2" />. Por eso, si vas a resolver varios sistemas con
          la misma matriz, interesa guardar la eliminación ya hecha. Eso es la
          factorización LU.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="El pivoteo no es un detalle"
        asides={[
          {
            label: 'Pivoteo parcial',
            content: <BlockMath math="|a_{pk}| = \max_{i \ge k}|a_{ik}|" />,
          },
        ]}
      >
        <p>
          En cada columna se divide entre el pivote. Si ese pivote es minúsculo, el
          multiplicador sale enorme y amplifica también el error de redondeo que
          arrastraba la fila, esparciéndolo por toda la matriz.
        </p>
        <p>
          El <strong>pivoteo parcial</strong> lo evita con algo muy simple: antes de
          eliminar, intercambia filas para que el pivote sea el mayor en valor
          absoluto de su columna. Los multiplicadores quedan entonces menores o
          iguales que uno y el error deja de crecer.
        </p>
        <p>
          No es una mejora opcional. Sin pivoteo la eliminación de Gauss es
          numéricamente inestable, y hay sistemas pequeños y bien planteados donde
          devuelve un resultado sin una sola cifra correcta.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Cuánto cuesta"
        asides={[
          { label: 'Operaciones', content: <BlockMath math="\approx \tfrac{2}{3}n^3" /> },
        ]}
      >
        <p>
          El coste crece con el cubo del tamaño, así que duplicar el número de
          incógnitas multiplica el trabajo por ocho. Un sistema de mil incógnitas
          son unos 700 millones de operaciones; uno de diez mil, 700 mil millones.
        </p>
        <p>
          Ese muro es la razón de que existan los métodos iterativos. Con matrices
          grandes y llenas de ceros sale más barato hacer pasadas de coste{' '}
          <InlineMath math="n^2" /> hasta tener precisión suficiente que completar
          una eliminación entera.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
