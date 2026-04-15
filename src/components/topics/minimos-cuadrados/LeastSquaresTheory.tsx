import {
  BookOpen,
  Grid3X3,
  TrendingUp,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function LeastSquaresTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Concepto */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            ¿Qué es el ajuste por mínimos cuadrados?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            El método busca la función <InlineMath math="f(x)" /> que mejor representa un conjunto
            de datos <InlineMath math="(x_i, y_i)" />,{' '}
            <strong className="text-foreground">minimizando</strong> la suma de los cuadrados de
            los residuos:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="S = \sum_{i=1}^{n} \left(y_i - f(x_i)\right)^2" />
          </div>
          <p>
            A diferencia de la interpolación, la curva ajustada{' '}
            <strong className="text-foreground">no pasa</strong> necesariamente por todos los
            puntos; busca la mejor aproximación global.
          </p>
        </CardContent>
      </Card>

      {/* Caso lineal */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Ajuste lineal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Para el modelo <InlineMath math="y = a + bx" />, al derivar{' '}
            <InlineMath math="S(a,b)" /> e igualar a cero se obtienen las{' '}
            <strong className="text-foreground">ecuaciones normales</strong>:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1">
            <BlockMath math="na + b\sum x_i = \sum y_i" />
            <BlockMath math="a\sum x_i + b\sum x_i^2 = \sum x_i y_i" />
          </div>
          <p>Despejando:</p>
          <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1">
            <BlockMath math="b = \frac{n\sum x_i y_i - (\sum x_i)(\sum y_i)}{n\sum x_i^2 - (\sum x_i)^2}" />
            <BlockMath math="a = \frac{\sum y_i - b\sum x_i}{n}" />
          </div>
        </CardContent>
      </Card>

      {/* Forma matricial */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Grid3X3 className="h-4 w-4 text-muted-foreground" />
            Forma matricial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            El problema se puede expresar como{' '}
            <InlineMath math="A\mathbf{c} \approx \mathbf{b}" />, y la solución se obtiene con:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="A^T A \, \mathbf{c} = A^T \mathbf{b}" />
          </div>
          <p>
            Para un polinomio de grado <InlineMath math="k" />, la matriz de diseño es:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath
              math={`A = \\begin{bmatrix} 1 & x_1 & x_1^2 & \\cdots & x_1^k \\\\ 1 & x_2 & x_2^2 & \\cdots & x_2^k \\\\ \\vdots & \\vdots & \\vdots & & \\vdots \\\\ 1 & x_n & x_n^2 & \\cdots & x_n^k \\end{bmatrix}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* R² */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">
            Coeficiente de determinación R²
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="R^2 = 1 - \frac{\sum (y_i - f(x_i))^2}{\sum (y_i - \bar{y})^2}" />
          </div>
          <p>
            Un <InlineMath math="R^2" /> cercano a 1 indica un buen ajuste.
            Valores menores sugieren que el modelo no captura bien la variabilidad de los datos.
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
                Simple
              </Badge>
              Fácil de entender e implementar.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-emerald-300 text-[10px] dark:border-emerald-700"
              >
                Flexible
              </Badge>
              Se adapta a rectas, polinomios y modelos complejos.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-emerald-300 text-[10px] dark:border-emerald-700"
              >
                Robusto
              </Badge>
              Funciona bien con datos experimentales ruidosos.
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
                Outliers
              </Badge>
              Sensible a valores atípicos (errores al cuadrado).
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-red-300 text-[10px] dark:border-red-700"
              >
                Sobreajuste
              </Badge>
              Grados altos pueden ajustar ruido en vez de tendencia.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-red-300 text-[10px] dark:border-red-700"
              >
                Condición
              </Badge>
              Las ecuaciones normales pueden ser inestables si la matriz está mal condicionada.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tipos de ajuste */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">Tipos de ajuste</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/20">
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Tipo
                  </th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Modelo
                  </th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Nota
                  </th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium text-foreground">
                    Lineal
                  </td>
                  <td className="px-4 py-2">
                    <InlineMath math="a + bx + cx^2 + \cdots" />
                  </td>
                  <td className="px-4 py-2">
                    Lineal en los parámetros; se resuelve con ecuaciones normales
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium text-foreground">
                    No lineal
                  </td>
                  <td className="px-4 py-2">
                    <InlineMath math="ae^{bx}" />
                  </td>
                  <td className="px-4 py-2">
                    Requiere métodos iterativos (Gauss-Newton, Levenberg-Marquardt)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-foreground">
                    Ponderado
                  </td>
                  <td className="px-4 py-2">
                    <InlineMath math="\sum w_i e_i^2" />
                  </td>
                  <td className="px-4 py-2">
                    Cada dato tiene un peso diferente
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
