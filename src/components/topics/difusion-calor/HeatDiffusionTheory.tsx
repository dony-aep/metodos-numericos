import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function HeatDiffusionTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="De una variable a dos"
        asides={[
          {
            label: 'Ecuación del calor',
            content: (
              <BlockMath math="\frac{\partial u}{\partial t} = \alpha\,\frac{\partial^2 u}{\partial x^2}" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          Hasta aquí la incógnita dependía de una variable. La temperatura de una
          barra depende de dos, la posición y el tiempo, y eso convierte la
          ecuación diferencial en una ecuación en derivadas parciales.
        </p>
        <p>
          Lo que dice es simple: un punto se calienta si está más frío que sus
          vecinos. La segunda derivada en el espacio mide exactamente esa
          diferencia, y <InlineMath math="\alpha" /> fija a qué velocidad ocurre.
        </p>
        <p>
          Hace falta además un perfil inicial <InlineMath math="u(x,0)=f(x)" /> y
          qué pasa en los dos extremos. Aquí son condiciones de Dirichlet, los
          bordes se mantienen a temperatura fija.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Cambiar las derivadas por diferencias"
        asides={[
          {
            label: 'Tiempo, hacia adelante',
            content: (
              <BlockMath math="\frac{\partial u}{\partial t} \approx \frac{u_i^{\,n+1}-u_i^{\,n}}{\Delta t}" />
            ),
            wide: true,
          },
          {
            label: 'Espacio, centrada',
            content: (
              <BlockMath math="\frac{\partial^2 u}{\partial x^2} \approx \frac{u_{i+1}^{\,n}-2u_i^{\,n}+u_{i-1}^{\,n}}{\Delta x^2}" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          Se cubre la barra con una malla,{' '}
          <InlineMath math="x_i = i\,\Delta x" /> y{' '}
          <InlineMath math="t_n = n\,\Delta t" />, y se guarda un valor{' '}
          <InlineMath math="u_i^{\,n}" /> en cada nodo. Las dos derivadas se
          sustituyen por las fórmulas de diferencias finitas del tema anterior.
        </p>
        <p>
          La asimetría es deliberada. En el tiempo basta mirar hacia adelante, que
          es hacia donde se avanza; en el espacio hay vecinos a los dos lados, así
          que se usa la centrada y se gana un orden.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="El esquema explícito"
        asides={[
          {
            label: 'Un paso',
            content: (
              <BlockMath math="u_i^{\,n+1} = u_i^{\,n} + \lambda\left(u_{i+1}^{\,n}-2u_i^{\,n}+u_{i-1}^{\,n}\right)" />
            ),
            wide: true,
          },
          {
            label: 'Número de Fourier',
            content: <BlockMath math="\lambda = \frac{\alpha\,\Delta t}{\Delta x^2}" />,
          },
        ]}
      >
        <p>
          Despejando el valor nuevo queda una fórmula directa: cada nodo se calcula
          a partir de tres nodos del instante anterior, sin resolver nada. La malla
          entera avanza recorriéndola una vez.
        </p>
        <p>
          Todo el comportamiento depende de un único número,{' '}
          <InlineMath math="\lambda" />, que combina la difusividad con los dos
          pasos. Es el peso que se da a los vecinos frente al propio nodo.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="La condición que no se puede saltar"
        asides={[
          {
            label: 'Estabilidad del explícito',
            content: <BlockMath math="\lambda = \frac{\alpha\,\Delta t}{\Delta x^2} \le \frac{1}{2}" />,
            wide: true,
          },
        ]}
      >
        <p>
          Con <InlineMath math="\lambda > 1/2" /> el coeficiente del propio nodo,{' '}
          <InlineMath math="1 - 2\lambda" />, se vuelve negativo: el punto reacciona
          al revés de como debería. Aparecen oscilaciones de signo alterno que
          crecen en cada paso hasta que la solución se va al infinito.
        </p>
        <p>
          No es un fallo de precisión que se arregle mirando mejor. El físico es
          claro: el calor se reparte, nunca se concentra, y el esquema tiene que
          respetarlo.
        </p>
        <p>
          El coste es alto. Como <InlineMath math="\Delta x" /> está al cuadrado,
          refinar la malla a la mitad obliga a dividir{' '}
          <InlineMath math="\Delta t" /> entre cuatro. Diez veces más nodos son cien
          veces más pasos de tiempo.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Los esquemas implícitos">
        <p>
          La alternativa es evaluar la parte espacial en el instante{' '}
          <strong>nuevo</strong> en vez del viejo. Entonces cada nodo depende de sus
          vecinos futuros y ya no hay fórmula directa: cada paso de tiempo es un
          sistema de ecuaciones.
        </p>
        <p>
          El sistema es tridiagonal, porque cada ecuación toca solo tres nodos, y el
          algoritmo de Thomas lo resuelve en <InlineMath math="O(N)" />. Eso es
          menos de lo que parece, y a cambio desaparece el límite sobre{' '}
          <InlineMath math="\Delta t" />.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="text-muted-foreground">
              <tr className="border-b border-rule">
                <th className="py-2 pr-4 font-normal">Esquema</th>
                <th className="py-2 pr-4 font-normal">Estabilidad</th>
                <th className="py-2 pr-4 font-normal">Orden en t</th>
                <th className="py-2 font-normal">Coste por paso</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-rule">
                <td className="py-2 pr-4 text-foreground">Explícito (FTCS)</td>
                <td className="py-2 pr-4">Solo si λ ≤ ½</td>
                <td className="py-2 pr-4">
                  <InlineMath math="O(\Delta t)" />
                </td>
                <td className="py-2">Una pasada</td>
              </tr>
              <tr className="border-b border-rule">
                <td className="py-2 pr-4 text-foreground">Implícito (BTCS)</td>
                <td className="py-2 pr-4">Siempre</td>
                <td className="py-2 pr-4">
                  <InlineMath math="O(\Delta t)" />
                </td>
                <td className="py-2">Sistema tridiagonal</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-foreground">Crank-Nicolson</td>
                <td className="py-2 pr-4">Siempre</td>
                <td className="py-2 pr-4">
                  <InlineMath math="O(\Delta t^2)" />
                </td>
                <td className="py-2">Sistema tridiagonal</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          Crank-Nicolson promedia los dos instantes y con eso sube a segundo orden
          en el tiempo por el mismo coste que el implícito. Es el que se usa por
          defecto, con la salvedad de que un perfil inicial con un salto brusco le
          provoca oscilaciones durante los primeros pasos.
        </p>
      </TheoryBlock>

      <TheoryBlock title="La misma ecuación en otros sitios">
        <p>
          El nombre es histórico, pero la ecuación describe cualquier magnitud que
          se reparta y se suavice con el tiempo, y aparece bastante lejos de la
          termodinámica.
        </p>
        <ul className="list-outside list-disc space-y-2 pl-5">
          <li>
            <strong>Difusión de sustancias.</strong> Contaminantes en un río, tinta
            en agua, dopaje de semiconductores. Es idéntica cambiando{' '}
            <InlineMath math="\alpha" /> por el coeficiente de difusión{' '}
            <InlineMath math="D" />.
          </li>
          <li>
            <strong>Black-Scholes.</strong> La ecuación que valora opciones
            financieras se convierte, con un cambio de variables, en la ecuación del
            calor. Los mismos esquemas resuelven las dos.
          </li>
          <li>
            <strong>Difuminado de imágenes.</strong> Aplicar difusión a la
            intensidad de los píxeles es el desenfoque gaussiano. La difusión
            anisotrópica de Perona-Malik hace lo mismo frenando{' '}
            <InlineMath math="\alpha" /> en los bordes, para suavizar el ruido sin
            borrar los contornos.
          </li>
          <li>
            <strong>Biología.</strong> Fármacos en un tejido, oxígeno en los
            capilares, y con un término de reacción añadido, la propagación de
            poblaciones que describe la ecuación de Fisher.
          </li>
        </ul>
      </TheoryBlock>

      <TheoryBlock title="Lo que junta del curso">
        <p>
          Este tema no introduce casi nada nuevo: monta piezas que ya están
          construidas. La segunda derivada espacial es la fórmula centrada de{' '}
          <strong>derivación numérica</strong>. La marcha en el tiempo es{' '}
          <strong>Euler explícito</strong> aplicado nodo a nodo, con su misma
          restricción de estabilidad y su mismo orden 1.
        </p>
        <p>
          Y los esquemas implícitos acaban en un sistema tridiagonal en cada paso,
          que es <strong>eliminación de Gauss</strong> con una estructura
          aprovechada, o bien <strong>Gauss-Seidel</strong>: la matriz sale
          diagonalmente dominante por construcción, así que converge siempre.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
