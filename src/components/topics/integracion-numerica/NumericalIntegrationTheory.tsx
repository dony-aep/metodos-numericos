import {
  BookOpen,
  RectangleHorizontal,
  Spline,
  Layers,
  AlertTriangle,
  GitCompareArrows,
  Sigma,
} from 'lucide-react';
import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function NumericalIntegrationTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Concepto */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            ¿Qué es la integración numérica?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            La integración numérica (o <strong className="text-foreground">cuadratura</strong>)
            aproxima el valor de una integral definida cuando la función no tiene
            primitiva elemental, o cuando solo se dispone de valores tabulados.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="\int_a^b f(x)\,dx \approx \sum_{i=0}^{n} w_i \, f(x_i)" />
          </div>
          <p>
            Se construyen áreas simples (trapecios o parábolas) bajo la curva.
            Las dos reglas fundamentales son la del{' '}
            <strong className="text-foreground">Trapecio</strong> y la de{' '}
            <strong className="text-foreground">Simpson</strong>, ambas casos
            particulares de las fórmulas de Newton-Cotes.
          </p>
        </CardContent>
      </Card>

      {/* Regla del Trapecio */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <RectangleHorizontal className="h-4 w-4 text-muted-foreground" />
            Regla del Trapecio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Aproxima la función por una <strong className="text-foreground">recta</strong>{' '}
            entre los extremos. El área bajo esa recta es un trapecio:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Fórmula simple
            </p>
            <BlockMath math="\int_a^b f(x)\,dx \approx \frac{b-a}{2}\left[f(a) + f(b)\right]" />
          </div>

          <p>
            En la <strong className="text-foreground">versión compuesta</strong>,
            se divide <InlineMath math="[a,b]" /> en <InlineMath math="n" />{' '}
            subintervalos de ancho <InlineMath math="h = (b-a)/n" />:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Compuesta
            </p>
            <BlockMath math="\int_a^b f(x)\,dx \approx \frac{h}{2}\left[f(x_0) + 2\sum_{i=1}^{n-1} f(x_i) + f(x_n)\right]" />
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Error
            </p>
            <BlockMath math="E_T = -\frac{(b-a)^3}{12}\,f''(\xi), \quad \xi \in (a,b)" />
            <p className="mt-1 text-xs">
              Error global de la versión compuesta:{' '}
              <InlineMath math="O(h^2)" />. Exacta para funciones lineales.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Regla de Simpson */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Spline className="h-4 w-4 text-muted-foreground" />
            Regla de Simpson 1/3
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Aproxima la función por una <strong className="text-foreground">parábola</strong>{' '}
            que pasa por tres puntos equiespaciados:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Fórmula simple
            </p>
            <BlockMath math="\int_a^b f(x)\,dx \approx \frac{b-a}{6}\left[f(a) + 4f\!\left(\frac{a+b}{2}\right) + f(b)\right]" />
          </div>

          <p>
            La <strong className="text-foreground">versión compuesta</strong>{' '}
            requiere un número <strong className="text-foreground">par</strong>{' '}
            de subintervalos <InlineMath math="n" />:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Compuesta
            </p>
            <BlockMath math="\int_a^b f(x)\,dx \approx \frac{h}{3}\left[f(x_0) + 4\sum_{\text{impar}} f(x_i) + 2\sum_{\substack{\text{par} \\ i \neq 0,n}} f(x_i) + f(x_n)\right]" />
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Error
            </p>
            <BlockMath math="E_S = -\frac{(b-a)^5}{2880}\,f^{(4)}(\xi), \quad \xi \in (a,b)" />
            <p className="mt-1 text-xs">
              Error global de la versión compuesta:{' '}
              <InlineMath math="O(h^4)" />. Exacta para polinomios de grado ≤ 3.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Conexión con interpolación */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sigma className="h-4 w-4 text-muted-foreground" />
            Relación con la interpolación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Ambas reglas son casos particulares de las{' '}
            <strong className="text-foreground">fórmulas de Newton-Cotes</strong>:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-1 text-xs font-semibold text-foreground">Trapecio</p>
              <p className="text-xs">
                Interpola <InlineMath math="f" /> con un polinomio de grado 1
                (recta) e integra exactamente ese polinomio.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-1 text-xs font-semibold text-foreground">Simpson</p>
              <p className="text-xs">
                Interpola <InlineMath math="f" /> con un polinomio de grado 2
                (parábola) e integra exactamente ese polinomio.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparación */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GitCompareArrows className="h-4 w-4 text-muted-foreground" />
            Comparación
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/20">
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Método
                  </th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Aproximación
                  </th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Requisito
                  </th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Orden
                  </th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
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
                Simple
              </Badge>
              Fáciles de entender e implementar.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-emerald-300 text-[10px] dark:border-emerald-700"
              >
                Versátil
              </Badge>
              Trabajan con funciones o datos tabulados.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-emerald-300 text-[10px] dark:border-emerald-700"
              >
                Preciso
              </Badge>
              Simpson converge rápidamente para funciones suaves.
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
                Curvatura
              </Badge>
              Trapecio necesita muchos subintervalos si f es muy curva.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-red-300 text-[10px] dark:border-red-700"
              >
                Restricción
              </Badge>
              Simpson requiere un número par de subintervalos.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-red-300 text-[10px] dark:border-red-700"
              >
                Singularidades
              </Badge>
              Fallan si la función tiene discontinuidades en el intervalo.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cuándo usar cada uno */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">¿Cuándo usar cada método?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-1 text-xs font-semibold text-foreground">Trapecio</p>
              <ul className="list-inside list-disc space-y-0.5 text-xs">
                <li>Cuando se necesita algo simple y rápido</li>
                <li>Datos tabulados con pocos puntos</li>
                <li>Primera aproximación gruesa</li>
                <li>Función casi lineal en el intervalo</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-1 text-xs font-semibold text-foreground">Simpson</p>
              <ul className="list-inside list-disc space-y-0.5 text-xs">
                <li>Función suave (derivadas continuas)</li>
                <li>Se requiere mayor precisión</li>
                <li>Se puede usar n par</li>
                <li>Balance entre costo y exactitud</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
