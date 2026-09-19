import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';
import { Badge } from '@/components/ui/badge';

export function NumericalIntegrationTheory() {
  return (
    <TheoryStack>
      {/* Concepto */}
      <TheoryBlock
        title="¿Qué es la integración numérica?"
        asides={[
          { content: (
            <>
          <BlockMath math="\int_a^b f(x)\,dx \approx \sum_{i=0}^{n} w_i \, f(x_i)" />
            </>
          ) },
        ]}
      >
        <p>
          La integración numérica (o <strong className="text-foreground">cuadratura</strong>)
          aproxima el valor de una integral definida cuando la función no tiene
          primitiva elemental, o cuando solo se dispone de valores tabulados.
        </p>
        <p>
          Se construyen áreas simples (trapecios o parábolas) bajo la curva.
          Las dos reglas fundamentales son la del{' '}
          <strong className="text-foreground">Trapecio</strong> y la de{' '}
          <strong className="text-foreground">Simpson</strong>, ambas casos
          particulares de las fórmulas de Newton-Cotes.
        </p>
      </TheoryBlock>

      {/* Regla del Trapecio */}
      <TheoryBlock
        title="Regla del Trapecio"
        asides={[
          { content: (
            <>
          <p className="mb-2 text-xs text-muted-foreground">
            Fórmula simple
          </p>
          <BlockMath math="\int_a^b f(x)\,dx \approx \frac{b-a}{2}\left[f(a) + f(b)\right]" />
            </>
          ) },
          { content: (
            <>
          <p className="mb-2 text-xs text-muted-foreground">
            Compuesta
          </p>
          <BlockMath math="\int_a^b f(x)\,dx \approx \frac{h}{2}\left[f(x_0) + 2\sum_{i=1}^{n-1} f(x_i) + f(x_n)\right]" />
            </>
          ) },
          { content: (
            <>
          <p className="mb-2 text-xs text-muted-foreground">
            Error
          </p>
          <BlockMath math="E_T = -\frac{(b-a)^3}{12}\,f''(\xi), \quad \xi \in (a,b)" />
          <p className="mt-1 text-xs">
            Error global de la versión compuesta:{' '}
            <InlineMath math="O(h^2)" />. Exacta para funciones lineales.
          </p>
            </>
          ) },
        ]}
      >
        <p>
          Aproxima la función por una <strong className="text-foreground">recta</strong>{' '}
          entre los extremos. El área bajo esa recta es un trapecio:
        </p>

        <p>
          En la <strong className="text-foreground">versión compuesta</strong>,
          se divide <InlineMath math="[a,b]" /> en <InlineMath math="n" />{' '}
          subintervalos de ancho <InlineMath math="h = (b-a)/n" />:
        </p>

      </TheoryBlock>

      {/* Regla de Simpson */}
      <TheoryBlock
        title="Regla de Simpson 1/3"
        asides={[
          { content: (
            <>
          <p className="mb-2 text-xs text-muted-foreground">
            Fórmula simple
          </p>
          <BlockMath math="\int_a^b f(x)\,dx \approx \frac{b-a}{6}\left[f(a) + 4f\!\left(\frac{a+b}{2}\right) + f(b)\right]" />
            </>
          ) , wide: true },
          { content: (
            <>
          <p className="mb-2 text-xs text-muted-foreground">
            Compuesta
          </p>
          <BlockMath math="\int_a^b f(x)\,dx \approx \frac{h}{3}\left[f(x_0) + 4\sum_{\text{impar}} f(x_i) + 2\sum_{\substack{\text{par} \\ i \neq 0,n}} f(x_i) + f(x_n)\right]" />
            </>
          ) , wide: true },
          { content: (
            <>
          <p className="mb-2 text-xs text-muted-foreground">
            Error
          </p>
          <BlockMath math="E_S = -\frac{(b-a)^5}{2880}\,f^{(4)}(\xi), \quad \xi \in (a,b)" />
          <p className="mt-1 text-xs">
            Error global de la versión compuesta:{' '}
            <InlineMath math="O(h^4)" />. Exacta para polinomios de grado ≤ 3.
          </p>
            </>
          ) },
        ]}
      >
        <p>
          Aproxima la función por una <strong className="text-foreground">parábola</strong>{' '}
          que pasa por tres puntos equiespaciados:
        </p>

        <p>
          La <strong className="text-foreground">versión compuesta</strong>{' '}
          requiere un número <strong className="text-foreground">par</strong>{' '}
          de subintervalos <InlineMath math="n" />:
        </p>

      </TheoryBlock>

      {/* Conexión con interpolación */}
      <TheoryBlock
        title="Relación con la interpolación"
      >
        <p>
          Ambas reglas son casos particulares de las{' '}
          <strong className="text-foreground">fórmulas de Newton-Cotes</strong>:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-foreground">Trapecio</p>
            <p className="text-xs">
              Interpola <InlineMath math="f" /> con un polinomio de grado 1
              (recta) e integra exactamente ese polinomio.
            </p>
          </div>
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-foreground">Simpson</p>
            <p className="text-xs">
              Interpola <InlineMath math="f" /> con un polinomio de grado 2
              (parábola) e integra exactamente ese polinomio.
            </p>
          </div>
        </div>
      </TheoryBlock>

      {/* Comparación */}
      <TheoryBlock
        title="Comparación"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/20">
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Método
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Aproximación
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Requisito
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Orden
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Exacta para
                </th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="px-4 py-2 font-medium text-foreground">Trapecio</td>
                <td className="px-4 py-2">Rectas</td>
                <td className="px-4 py-2">Ninguno</td>
                <td className="px-4 py-2"><InlineMath math="O(h^2)" /></td>
                <td className="px-4 py-2">Polinomios grado ≤ 1</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-foreground">Simpson 1/3</td>
                <td className="px-4 py-2">Parábolas</td>
                <td className="px-4 py-2">n par</td>
                <td className="px-4 py-2"><InlineMath math="O(h^4)" /></td>
                <td className="px-4 py-2">Polinomios grado ≤ 3</td>
              </tr>
            </tbody>
          </table>
        </div>
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
              Simple
            </Badge>
            Fáciles de entender e implementar.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Versátil
            </Badge>
            Trabajan con funciones o datos tabulados.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Preciso
            </Badge>
            Simpson converge rápidamente para funciones suaves.
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
              Curvatura
            </Badge>
            Trapecio necesita muchos subintervalos si f es muy curva.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Restricción
            </Badge>
            Simpson requiere un número par de subintervalos.
          </p>
          <p>
            <Badge
              variant="outline"
              className="mr-1 text-[10px]"
            >
              Singularidades
            </Badge>
            Fallan si la función tiene discontinuidades en el intervalo.
          </p>
        </TheoryBlock>
      </div>

      {/* Cuándo usar cada uno */}
      <TheoryBlock
        title=""
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-foreground">Trapecio</p>
            <ul className="list-inside list-disc space-y-0.5 text-xs">
              <li>Cuando se necesita algo simple y rápido</li>
              <li>Datos tabulados con pocos puntos</li>
              <li>Primera aproximación gruesa</li>
              <li>Función casi lineal en el intervalo</li>
            </ul>
          </div>
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-foreground">Simpson</p>
            <ul className="list-inside list-disc space-y-0.5 text-xs">
              <li>Función suave (derivadas continuas)</li>
              <li>Se requiere mayor precisión</li>
              <li>Se puede usar n par</li>
              <li>Balance entre costo y exactitud</li>
            </ul>
          </div>
        </div>
      </TheoryBlock>
    </TheoryStack>
  );
}
