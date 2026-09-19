import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function NumericalDiffTheory() {
  return (
    <TheoryStack>
      <TheoryBlock
        title="Derivar sin la fórmula"
        asides={[
          {
            label: 'La definición',
            content: <BlockMath math="f'(x) = \lim_{h \to 0}\frac{f(x+h) - f(x)}{h}" />,
          },
        ]}
      >
        <p>
          La definición de derivada es un límite, y un ordenador no toma límites.
          Lo que sí puede es quedarse a medio camino: usar un{' '}
          <InlineMath math="h" /> pequeño pero finito y aceptar el error que eso
          introduce.
        </p>
        <p>
          El truco vale también cuando no hay función que derivar. Con una tabla de
          medidas, o con un simulador que devuelve números y nada más, estas
          fórmulas son la única derivada disponible.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Las fórmulas unilaterales"
        asides={[
          {
            label: 'Hacia adelante',
            content: <BlockMath math="f'(x) \approx \frac{f(x+h) - f(x)}{h}" />,
          },
          {
            label: 'Hacia atrás',
            content: <BlockMath math="f'(x) \approx \frac{f(x) - f(x-h)}{h}" />,
          },
        ]}
      >
        <p>
          Son la definición copiada tal cual, con el límite quitado. Taylor dice
          cuánto se pierde con eso: el término que se descarta es{' '}
          <InlineMath math="-\tfrac{h}{2}f''(\xi)" />, así que el error es{' '}
          <InlineMath math="O(h)" />. Partir <InlineMath math="h" /> por la mitad
          reduce el error a la mitad, y nada más.
        </p>
        <p>
          Es poco, pero a veces no hay alternativa. En el primer punto de una tabla
          no existe <InlineMath math="f(x-h)" />, y ahí la fórmula hacia adelante es
          lo único que se puede aplicar.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="La centrada, y por qué gana un orden"
        asides={[
          {
            label: 'Diferencia centrada',
            content: <BlockMath math="f'(x) \approx \frac{f(x+h) - f(x-h)}{2h}" />,
          },
          {
            label: 'Error',
            content: <BlockMath math="E = -\frac{h^2}{6}f'''(\xi)" />,
          },
        ]}
      >
        <p>
          Al restar los desarrollos de Taylor en <InlineMath math="x+h" /> y{' '}
          <InlineMath math="x-h" />, los términos pares se cancelan: desaparece el
          de <InlineMath math="f''" />, que era el que dominaba el error.
        </p>
        <p>
          El resultado es <InlineMath math="O(h^2)" /> con las mismas dos
          evaluaciones de antes. Partir <InlineMath math="h" /> por la mitad divide
          el error por cuatro. Sale gratis, y por eso es la fórmula por defecto
          cuando hay puntos a los dos lados.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Más puntos, más orden"
        asides={[
          {
            label: 'Cinco puntos',
            content: (
              <BlockMath math="f'(x) \approx \frac{f(x-2h) - 8f(x-h) + 8f(x+h) - f(x+2h)}{12h}" />
            ),
            wide: true,
          },
          {
            label: 'Segunda derivada',
            content: (
              <BlockMath math="f''(x) \approx \frac{f(x+h) - 2f(x) + f(x-h)}{h^2}" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          La idea se repite: con cuatro evaluaciones se pueden cancelar también los
          términos de <InlineMath math="h^2" /> y <InlineMath math="h^3" />, y el
          error cae a <InlineMath math="O(h^4)" />.
        </p>
        <p>
          Sumar los dos desarrollos en vez de restarlos cancela los términos impares
          y deja la segunda derivada, con error <InlineMath math="O(h^2)" />. Es la
          fórmula que aparece en cualquier malla de diferencias finitas, incluida la
          de la ecuación del calor.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="El h no puede ser tan pequeño como quieras"
        asides={[
          {
            label: 'Óptimo para la centrada',
            content: (
              <BlockMath math="h^{*} \approx \sqrt[3]{\varepsilon_{\text{mach}}} \approx 6\times 10^{-6}" />
            ),
            wide: true,
          },
        ]}
      >
        <p>
          Aquí está el conflicto que define el método. El error de truncamiento baja
          al reducir <InlineMath math="h" />, pero el de redondeo sube: la resta de
          dos números casi iguales pierde cifras significativas, y luego se divide
          entre algo minúsculo, que amplifica lo poco que quedaba.
        </p>
        <p>
          La suma de los dos tiene un mínimo. Para la centrada está en la raíz
          cúbica del épsilon de máquina, alrededor de{' '}
          <InlineMath math="10^{-6}" /> en doble precisión. Con{' '}
          <InlineMath math="h = 10^{-12}" /> el resultado es peor, no mejor, y con{' '}
          <InlineMath math="h = 10^{-16}" /> la resta da cero exacto.
        </p>
        <p>
          Con datos medidos el problema es más serio. El ruido experimental hace de
          épsilon y es muchos órdenes mayor, así que conviene suavizar los datos o
          derivar un ajuste en lugar de la tabla.
        </p>
      </TheoryBlock>

      <TheoryBlock
        title="Extrapolación de Richardson"
        asides={[
          {
            label: 'Combinando dos pasos',
            content: <BlockMath math="D = \frac{4\,D(h/2) - D(h)}{3}" />,
          },
        ]}
      >
        <p>
          Si conoces la forma del error, puedes cancelarlo. Calcula la centrada con{' '}
          <InlineMath math="h" /> y con <InlineMath math="h/2" />: el término en{' '}
          <InlineMath math="h^2" /> aparece en las dos con pesos conocidos, y esa
          combinación lo elimina.
        </p>
        <p>
          El resultado es <InlineMath math="O(h^4)" /> sin estrenar fórmulas.
          Aplicado sobre una regla de integración, este mismo mecanismo es el método
          de Romberg.
        </p>
      </TheoryBlock>

      <TheoryBlock title="Resumen de las fórmulas">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="text-muted-foreground">
              <tr className="border-b border-rule">
                <th className="py-2 pr-4 font-normal">Fórmula</th>
                <th className="py-2 pr-4 font-normal">Orden</th>
                <th className="py-2 pr-4 font-normal">Puntos</th>
                <th className="py-2 font-normal">Cuándo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-rule">
                <td className="py-2 pr-4 text-foreground">Hacia adelante o atrás</td>
                <td className="py-2 pr-4">
                  <InlineMath math="O(h)" />
                </td>
                <td className="py-2 pr-4">2</td>
                <td className="py-2">En los bordes del dominio</td>
              </tr>
              <tr className="border-b border-rule">
                <td className="py-2 pr-4 text-foreground">Centrada</td>
                <td className="py-2 pr-4">
                  <InlineMath math="O(h^2)" />
                </td>
                <td className="py-2 pr-4">2</td>
                <td className="py-2">Por defecto, con puntos a los dos lados</td>
              </tr>
              <tr className="border-b border-rule">
                <td className="py-2 pr-4 text-foreground">Cinco puntos</td>
                <td className="py-2 pr-4">
                  <InlineMath math="O(h^4)" />
                </td>
                <td className="py-2 pr-4">4</td>
                <td className="py-2">Si evaluar sale barato y hace falta precisión</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-foreground">Segunda derivada</td>
                <td className="py-2 pr-4">
                  <InlineMath math="O(h^2)" />
                </td>
                <td className="py-2 pr-4">3</td>
                <td className="py-2">Curvatura y mallas de diferencias finitas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TheoryBlock>
    </TheoryStack>
  );
}
