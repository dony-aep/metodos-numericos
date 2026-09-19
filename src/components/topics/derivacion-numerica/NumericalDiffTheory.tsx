import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';
import { Badge } from '@/components/ui/badge';

export function NumericalDiffTheory() {
  return (
    <TheoryStack>
      {/* Concepto */}
      <TheoryBlock
        title="¿Qué es la derivación numérica?"
        asides={[
          { content: (
            <>
          <BlockMath math="f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}" />
            </>
          ) },
        ]}
      >
        <p>
          La derivación numérica aproxima la derivada de una función{' '}
          <InlineMath math="f(x)" /> a partir de sus valores en puntos
          discretos, sin necesidad de conocer su expresión analítica. Se basa
          en la definición de derivada:
        </p>
        <p>
          Al tomar un <InlineMath math="h" /> pequeño pero finito, se obtienen
          fórmulas de <strong className="text-foreground">diferencias finitas</strong>{' '}
          que aproximan la derivada con distintos grados de precisión.
        </p>
      </TheoryBlock>

      {/* Diferencia hacia adelante */}
      <TheoryBlock
        title="Diferencia hacia adelante"
        asides={[
          { content: (
            <>
          <BlockMath math="f'(x) \approx \frac{f(x+h) - f(x)}{h}" />
            </>
          ) },
          { content: (
            <>
          <p className="mb-2 text-xs text-muted-foreground">
            Derivación por Taylor
          </p>
          <BlockMath math="f(x+h) = f(x) + hf'(x) + \frac{h^2}{2}f''(\xi)" />
          <p className="mt-1 text-xs">
            Despejando <InlineMath math="f'(x)" />: error ={' '}
            <InlineMath math="-\frac{h}{2}f''(\xi)" />
          </p>
            </>
          ) },
        ]}
      >
        <p>
          Es la aproximación más directa de la definición de derivada. Su
          error de truncamiento es de orden{' '}
          <InlineMath math="O(h)" />, lo que significa que al dividir{' '}
          <InlineMath math="h" /> por 2, el error se reduce a la mitad.
        </p>
      </TheoryBlock>

      {/* Diferencia hacia atrás */}
      <TheoryBlock
        title="Diferencia hacia atrás"
        asides={[
          { content: (
            <>
          <BlockMath math="f'(x) \approx \frac{f(x) - f(x-h)}{h}" />
            </>
          ) },
        ]}
      >
        <p>
          Análoga a la diferencia hacia adelante, pero utiliza el punto
          anterior. Tiene el mismo orden de error{' '}
          <InlineMath math="O(h)" />. Es útil cuando solo se dispone de datos
          a la izquierda del punto de interés.
        </p>
      </TheoryBlock>

      {/* Diferencia centrada */}
      <TheoryBlock
        title="Diferencia centrada"
        asides={[
          { content: (
            <>
          <BlockMath math="f'(x) \approx \frac{f(x+h) - f(x-h)}{2h}" />
            </>
          ) },
          { content: (
            <>
          <p className="mb-2 text-xs text-muted-foreground">
            Error de truncamiento
          </p>
          <BlockMath math="E = -\frac{h^2}{6}f'''(\xi)" />
            </>
          ) },
        ]}
      >
        <p>
          Combina Taylor en <InlineMath math="x+h" /> y{' '}
          <InlineMath math="x-h" />; los términos de primer orden del error
          se cancelan, dejando un error de orden{' '}
          <InlineMath math="O(h^2)" />. Esto la hace{' '}
          <strong className="text-foreground">significativamente más precisa</strong>{' '}
          que las fórmulas unilaterales.
        </p>
      </TheoryBlock>

      {/* Cinco puntos */}
      <TheoryBlock
        title="Fórmula de cinco puntos"
        asides={[
          { content: (
            <>
          <BlockMath math="f'(x) \approx \frac{f(x-2h) - 8f(x-h) + 8f(x+h) - f(x+2h)}{12h}" />
            </>
          ) , wide: true },
        ]}
      >
        <p>
          Con error <InlineMath math="O(h^4)" />, esta fórmula es mucho más
          precisa pero requiere evaluar la función en 4 puntos alrededor de{' '}
          <InlineMath math="x" />. Es la combinación lineal óptima de 5
          evaluaciones para aproximar la primera derivada.
        </p>
      </TheoryBlock>

      {/* Segunda derivada */}
      <TheoryBlock
        title=""
        asides={[
          { content: (
            <>
          <BlockMath math="f''(x) \approx \frac{f(x+h) - 2f(x) + f(x-h)}{h^2}" />
            </>
          ) },
        ]}
      >
        <p>
          Se obtiene al combinar las expansiones de Taylor hasta segundo orden.
          Tiene error <InlineMath math="O(h^2)" /> y es la fórmula estándar
          para aproximar la segunda derivada.
        </p>
      </TheoryBlock>

      {/* Truncamiento vs redondeo */}
      <TheoryBlock
        title="Error de truncamiento vs. redondeo"
      >
        <p>
          Existe un <strong className="text-foreground">compromiso</strong>{' '}
          al elegir <InlineMath math="h" />:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-foreground">h grande</p>
            <p className="text-xs">
              Mayor error de truncamiento (los términos ignorados de Taylor
              son significativos).
            </p>
          </div>
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-foreground">h pequeño</p>
            <p className="text-xs">
              Mayor error de redondeo (la resta de valores cercanos amplifica
              los errores de punto flotante).
            </p>
          </div>
        </div>
        <p>
          Para la diferencia centrada, el <InlineMath math="h" /> óptimo es
          aproximadamente <InlineMath math="h^* \approx \epsilon_{\text{mach}}^{1/3}" />,
          donde <InlineMath math="\epsilon_{\text{mach}} \approx 2.2 \times 10^{-16}" />{' '}
          para doble precisión.
        </p>
      </TheoryBlock>

      {/* Richardson */}
      <TheoryBlock
        title=""
        asides={[
          { content: (
            <>
          <BlockMath math="D = \frac{4D(h/2) - D(h)}{3}" />
            </>
          ) },
        ]}
      >
        <p>
          Combinando dos aproximaciones con diferentes{' '}
          <InlineMath math="h" /> se puede mejorar el orden del error. Para la
          diferencia centrada (<InlineMath math="O(h^2)" />):
        </p>
        <p>
          El resultado tiene error <InlineMath math="O(h^4)" />, ganando dos
          órdenes adicionales de precisión sin usar más puntos base.
        </p>
      </TheoryBlock>

      {/* Ventajas y limitaciones */}
      <div className="grid gap-4 sm:grid-cols-2">
        <TheoryBlock
          title="Ventajas"
        >
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Universal
            </Badge>
            No requiere la forma analítica de la función.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Simple
            </Badge>
            Las fórmulas son fáciles de implementar y entender.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Escalable
            </Badge>
            Se puede mejorar la precisión con fórmulas de mayor orden o Richardson.
          </p>
        </TheoryBlock>

        <TheoryBlock
          title="Limitaciones"
        >
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Inestable
            </Badge>
            Cancelación catastrófica con h muy pequeño.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Compromiso
            </Badge>
            El h óptimo depende de la función y la aritmética.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Ruido
            </Badge>
            Datos ruidosos amplifican el error al derivar.
          </p>
        </TheoryBlock>
      </div>

      {/* Comparación de fórmulas */}
      <TheoryBlock
        title=""
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/20">
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Fórmula
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Orden
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Puntos
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Nota
                </th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="px-4 py-2 font-medium text-foreground">Hacia adelante</td>
                <td className="px-4 py-2"><InlineMath math="O(h)" /></td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">Útil en bordes del dominio</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium text-foreground">Hacia atrás</td>
                <td className="px-4 py-2"><InlineMath math="O(h)" /></td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">Simétrica a la anterior</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium text-foreground">Centrada</td>
                <td className="px-4 py-2"><InlineMath math="O(h^2)" /></td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">La más usada para primera derivada</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium text-foreground">Cinco puntos</td>
                <td className="px-4 py-2"><InlineMath math="O(h^4)" /></td>
                <td className="px-4 py-2">4</td>
                <td className="px-4 py-2">Alta precisión, más evaluaciones</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-foreground">2ª derivada</td>
                <td className="px-4 py-2"><InlineMath math="O(h^2)" /></td>
                <td className="px-4 py-2">3</td>
                <td className="px-4 py-2">Fórmula estándar para f″(x)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TheoryBlock>
    </TheoryStack>
  );
}
