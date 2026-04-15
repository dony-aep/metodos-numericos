import {
  BookOpen,
  GitCompareArrows,
  Layers,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ArrowLeftRight,
  Waypoints,
} from 'lucide-react';
import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function NumericalDiffTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Concepto */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            ¿Qué es la derivación numérica?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            La derivación numérica aproxima la derivada de una función{' '}
            <InlineMath math="f(x)" /> a partir de sus valores en puntos
            discretos, sin necesidad de conocer su expresión analítica. Se basa
            en la definición de derivada:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}" />
          </div>
          <p>
            Al tomar un <InlineMath math="h" /> pequeño pero finito, se obtienen
            fórmulas de <strong className="text-foreground">diferencias finitas</strong>{' '}
            que aproximan la derivada con distintos grados de precisión.
          </p>
        </CardContent>
      </Card>

      {/* Diferencia hacia adelante */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            Diferencia hacia adelante
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="f'(x) \approx \frac{f(x+h) - f(x)}{h}" />
          </div>
          <p>
            Es la aproximación más directa de la definición de derivada. Su
            error de truncamiento es de orden{' '}
            <InlineMath math="O(h)" />, lo que significa que al dividir{' '}
            <InlineMath math="h" /> por 2, el error se reduce a la mitad.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Derivación por Taylor
            </p>
            <BlockMath math="f(x+h) = f(x) + hf'(x) + \frac{h^2}{2}f''(\xi)" />
            <p className="mt-1 text-xs">
              Despejando <InlineMath math="f'(x)" />: error ={' '}
              <InlineMath math="-\frac{h}{2}f''(\xi)" />
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Diferencia hacia atrás */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            Diferencia hacia atrás
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="f'(x) \approx \frac{f(x) - f(x-h)}{h}" />
          </div>
          <p>
            Análoga a la diferencia hacia adelante, pero utiliza el punto
            anterior. Tiene el mismo orden de error{' '}
            <InlineMath math="O(h)" />. Es útil cuando solo se dispone de datos
            a la izquierda del punto de interés.
          </p>
        </CardContent>
      </Card>

      {/* Diferencia centrada */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            Diferencia centrada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="f'(x) \approx \frac{f(x+h) - f(x-h)}{2h}" />
          </div>
          <p>
            Combina Taylor en <InlineMath math="x+h" /> y{' '}
            <InlineMath math="x-h" />; los términos de primer orden del error
            se cancelan, dejando un error de orden{' '}
            <InlineMath math="O(h^2)" />. Esto la hace{' '}
            <strong className="text-foreground">significativamente más precisa</strong>{' '}
            que las fórmulas unilaterales.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Error de truncamiento
            </p>
            <BlockMath math="E = -\frac{h^2}{6}f'''(\xi)" />
          </div>
        </CardContent>
      </Card>

      {/* Cinco puntos */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Waypoints className="h-4 w-4 text-muted-foreground" />
            Fórmula de cinco puntos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="f'(x) \approx \frac{f(x-2h) - 8f(x-h) + 8f(x+h) - f(x+2h)}{12h}" />
          </div>
          <p>
            Con error <InlineMath math="O(h^4)" />, esta fórmula es mucho más
            precisa pero requiere evaluar la función en 4 puntos alrededor de{' '}
            <InlineMath math="x" />. Es la combinación lineal óptima de 5
            evaluaciones para aproximar la primera derivada.
          </p>
        </CardContent>
      </Card>

      {/* Segunda derivada */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">Segunda derivada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="f''(x) \approx \frac{f(x+h) - 2f(x) + f(x-h)}{h^2}" />
          </div>
          <p>
            Se obtiene al combinar las expansiones de Taylor hasta segundo orden.
            Tiene error <InlineMath math="O(h^2)" /> y es la fórmula estándar
            para aproximar la segunda derivada.
          </p>
        </CardContent>
      </Card>

      {/* Truncamiento vs redondeo */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GitCompareArrows className="h-4 w-4 text-muted-foreground" />
            Error de truncamiento vs. redondeo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Existe un <strong className="text-foreground">compromiso</strong>{' '}
            al elegir <InlineMath math="h" />:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-1 text-xs font-semibold text-foreground">h grande</p>
              <p className="text-xs">
                Mayor error de truncamiento (los términos ignorados de Taylor
                son significativos).
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
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
        </CardContent>
      </Card>

      {/* Richardson */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">Extrapolación de Richardson</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Combinando dos aproximaciones con diferentes{' '}
            <InlineMath math="h" /> se puede mejorar el orden del error. Para la
            diferencia centrada (<InlineMath math="O(h^2)" />):
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="D = \frac{4D(h/2) - D(h)}{3}" />
          </div>
          <p>
            El resultado tiene error <InlineMath math="O(h^4)" />, ganando dos
            órdenes adicionales de precisión sin usar más puntos base.
          </p>
        </CardContent>
      </Card>

      {/* Ventajas y limitaciones */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              <Layers className="h-4 w-4" />
              Ventajas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-emerald-800 dark:text-emerald-200">
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-emerald-300 text-[10px] dark:border-emerald-700"
              >
                Universal
              </Badge>
              No requiere la forma analítica de la función.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-emerald-300 text-[10px] dark:border-emerald-700"
              >
                Simple
              </Badge>
              Las fórmulas son fáciles de implementar y entender.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-emerald-300 text-[10px] dark:border-emerald-700"
              >
                Escalable
              </Badge>
              Se puede mejorar la precisión con fórmulas de mayor orden o Richardson.
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-300">
              <AlertTriangle className="h-4 w-4" />
              Limitaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-red-800 dark:text-red-200">
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-red-300 text-[10px] dark:border-red-700"
              >
                Inestable
              </Badge>
              Cancelación catastrófica con h muy pequeño.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-red-300 text-[10px] dark:border-red-700"
              >
                Compromiso
              </Badge>
              El h óptimo depende de la función y la aritmética.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-red-300 text-[10px] dark:border-red-700"
              >
                Ruido
              </Badge>
              Datos ruidosos amplifican el error al derivar.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Comparación de fórmulas */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">Comparación de fórmulas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/20">
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Fórmula
                  </th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Orden
                  </th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Puntos
                  </th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
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
        </CardContent>
      </Card>
    </div>
  );
}
