import {
  BookOpen,
  Grid3X3,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function NewtonDDTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Concepto */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            ¿Qué son las diferencias divididas?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Las <strong className="text-foreground">diferencias divididas</strong> son coeficientes
            que se calculan recursivamente a partir de un conjunto de datos{' '}
            <InlineMath math="(x_i, y_i)" /> y permiten construir el polinomio interpolante de
            Newton.
          </p>
          <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-xs font-medium text-foreground">Definición recursiva</p>
            <BlockMath math="f[x_i] = f(x_i)" />
            <BlockMath math="f[x_i, x_{i+1}] = \frac{f[x_{i+1}] - f[x_i]}{x_{i+1} - x_i}" />
            <BlockMath math="f[x_i, \dots, x_{i+k}] = \frac{f[x_{i+1}, \dots, x_{i+k}] - f[x_i, \dots, x_{i+k-1}]}{x_{i+k} - x_i}" />
          </div>
        </CardContent>
      </Card>

      {/* Tabla triangular */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Grid3X3 className="h-4 w-4 text-muted-foreground" />
            Estructura de la tabla
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Los valores se organizan en una{' '}
            <strong className="text-foreground">tabla triangular</strong>. Cada columna representa un
            orden de diferencia dividida; los coeficientes del polinomio de Newton son la{' '}
            <strong className="text-foreground">diagonal principal</strong> (primera fila de cada
            columna).
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath
              math={`\\begin{array}{c|cccc}
x_i & f[x_i] & f[\\cdot,\\cdot] & f[\\cdot,\\cdot,\\cdot] & \\cdots \\\\
\\hline
x_0 & f[x_0] & & & \\\\
     &        & f[x_0,x_1] & & \\\\
x_1 & f[x_1] &             & f[x_0,x_1,x_2] & \\\\
     &        & f[x_1,x_2] & & \\ddots \\\\
x_2 & f[x_2] & & & \\\\
\\vdots & & & &
\\end{array}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Polinomio de Newton */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Polinomio de Newton
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="P_n(x) = \sum_{k=0}^{n} f[x_0, \dots, x_k] \prod_{j=0}^{k-1} (x - x_j)" />
          </div>
          <p>
            Esto equivale a la forma expandida:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath
              math={`P_n(x) = f[x_0] + f[x_0,x_1](x - x_0) + f[x_0,x_1,x_2](x - x_0)(x - x_1) + \\cdots`}
            />
          </div>
          <p>
            Para evaluar eficientemente se utiliza la{' '}
            <strong className="text-foreground">forma anidada (Horner)</strong>:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath
              math={`P_n(x) = f[x_0] + (x - x_0)\\bigl(f[x_0,x_1] + (x - x_1)(\\cdots)\\bigr)`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Ventajas y propiedades */}
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
              <Badge variant="outline" className="mr-1 border-emerald-300 text-[10px] dark:border-emerald-700">
                Incremental
              </Badge>
              Agregar un punto nuevo solo requiere una columna más, sin recalcular todo.
            </p>
            <p>
              <Badge variant="outline" className="mr-1 border-emerald-300 text-[10px] dark:border-emerald-700">
                Eficiente
              </Badge>
              Evaluación en <InlineMath math="O(n)" /> con Horner.
            </p>
            <p>
              <Badge variant="outline" className="mr-1 border-emerald-300 text-[10px] dark:border-emerald-700">
                Reutilizable
              </Badge>
              La tabla se construye una vez y sirve para evaluar en cualquier punto.
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-300">
              <Layers className="h-4 w-4" />
              Limitaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-red-800 dark:text-red-200">
            <p>
              <Badge variant="outline" className="mr-1 border-red-300 text-[10px] dark:border-red-700">
                Runge
              </Badge>
              Grados altos con nodos equidistantes pueden oscilar en los extremos.
            </p>
            <p>
              <Badge variant="outline" className="mr-1 border-red-300 text-[10px] dark:border-red-700">
                Nodos
              </Badge>
              Los <InlineMath math="x_i" /> deben ser distintos para evitar división por cero.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Error de interpolación */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">Error de interpolación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="E_n(x) = f[x_0, x_1, \dots, x_n, x] \prod_{j=0}^{n}(x - x_j)" />
          </div>
          <p>
            Si <InlineMath math="f" /> es <InlineMath math="(n+1)" /> veces diferenciable, existe{' '}
            <InlineMath math="\xi" /> tal que:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="E_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{j=0}^{n}(x - x_j)" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
