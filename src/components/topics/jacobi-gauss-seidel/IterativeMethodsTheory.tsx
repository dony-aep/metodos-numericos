import {
  ArrowRightLeft,
  BookOpen,
  CheckCircle2,
  GitCompareArrows,
  Gauge,
  Shield,
} from 'lucide-react';
import { BlockMath } from '@/components/shared/MathRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function IterativeMethodsTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Idea general */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            Idea general
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <p>
            Los métodos iterativos generan una sucesión de aproximaciones
            que converge a la solución del sistema <strong>Ax = b</strong>.
            Se parte de un vector inicial y se mejora en cada paso.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="x^{(0)}, \; x^{(1)}, \; x^{(2)}, \; \dots \;\to\; x^*" />
          </div>
          <p>
            Se descompone la matriz como <strong>A = D − L − U</strong> donde
            D es la diagonal, L la triangular inferior y U la triangular superior.
          </p>
        </CardContent>
      </Card>

      {/* Jacobi */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
            Método de Jacobi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-foreground/90 sm:text-base">
          <p>
            Cada componente se calcula usando <strong>solo los valores de la
            iteración anterior</strong>. No se reutilizan valores recién calculados.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="x_i^{(k+1)} = \frac{1}{a_{ii}}\left(b_i - \sum_{j \neq i} a_{ij}x_j^{(k)}\right)" />
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Forma matricial
            </p>
            <BlockMath math="x^{(k+1)} = D^{-1}(L+U)x^{(k)} + D^{-1}b" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-800 dark:bg-emerald-950/20">
              <p className="mb-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Ventajas
              </p>
              <ul className="space-y-1 text-xs text-foreground/80">
                <li>• Fácil de implementar</li>
                <li>• Ideal para paralelización</li>
                <li>• Conceptualmente simple</li>
              </ul>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50/50 p-3 dark:border-red-800 dark:bg-red-950/20">
              <p className="mb-1 text-xs font-semibold text-red-700 dark:text-red-400">
                Desventajas
              </p>
              <ul className="space-y-1 text-xs text-foreground/80">
                <li>• Convergencia más lenta</li>
                <li>• No siempre converge</li>
                <li>• Requiere buenas condiciones en A</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gauss-Seidel */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GitCompareArrows className="h-4 w-4 text-muted-foreground" />
            Método de Gauss-Seidel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-foreground/90 sm:text-base">
          <p>
            A diferencia de Jacobi, <strong>reutiliza inmediatamente los valores
            nuevos</strong> a medida que se van calculando dentro de la misma iteración.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="x_i^{(k+1)} = \frac{1}{a_{ii}}\left(b_i - \sum_{j=1}^{i-1} a_{ij}x_j^{(k+1)} - \sum_{j=i+1}^{n} a_{ij}x_j^{(k)}\right)" />
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Forma matricial
            </p>
            <BlockMath math="x^{(k+1)} = (D-L)^{-1}Ux^{(k)} + (D-L)^{-1}b" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-800 dark:bg-emerald-950/20">
              <p className="mb-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Ventajas
              </p>
              <ul className="space-y-1 text-xs text-foreground/80">
                <li>• Converge más rápido que Jacobi</li>
                <li>• Menor número de iteraciones</li>
                <li>• Muy usado en la práctica</li>
              </ul>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50/50 p-3 dark:border-red-800 dark:bg-red-950/20">
              <p className="mb-1 text-xs font-semibold text-red-700 dark:text-red-400">
                Desventajas
              </p>
              <ul className="space-y-1 text-xs text-foreground/80">
                <li>• Más difícil de paralelizar</li>
                <li>• Puede fallar sin condiciones adecuadas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparación */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            Comparación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: 'Uso de valores nuevos', jacobi: 'No', gs: 'Sí' },
              { label: 'Velocidad', jacobi: 'Más lenta', gs: 'Más rápida' },
              { label: 'Paralelización', jacobi: 'Mejor', gs: 'Más difícil' },
              { label: 'Iteraciones típicas', jacobi: 'Más', gs: 'Menos' },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-lg border border-border bg-muted/20 p-3"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {row.label}
                </p>
                <div className="mt-1 flex items-center gap-3 text-sm">
                  <span className="font-medium">J: {row.jacobi}</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="font-medium">GS: {row.gs}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Convergencia */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4 text-muted-foreground" />
            Condiciones de convergencia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-foreground/90 sm:text-base">
          <p>
            Estos métodos <strong>no siempre convergen</strong>. La convergencia
            está garantizada si la matriz es estrictamente diagonalmente dominante:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="|a_{ii}| > \sum_{j \neq i} |a_{ij}| \quad \text{para cada fila}" />
          </div>
          <p>
            También converge si el radio espectral de la matriz de iteración
            es menor que 1.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <span className="font-mono text-xs text-muted-foreground">01</span>
              <p className="mt-1 text-sm font-medium">Criterio de parada por error</p>
              <div className="mt-2 rounded border border-border bg-muted/30 p-2">
                <BlockMath math="\|x^{(k+1)} - x^{(k)}\| < \varepsilon" />
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <span className="font-mono text-xs text-muted-foreground">02</span>
              <p className="mt-1 text-sm font-medium">Criterio por residuo</p>
              <div className="mt-2 rounded border border-border bg-muted/30 p-2">
                <BlockMath math="\|b - Ax^{(k)}\| < \varepsilon" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tip */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            Cuándo usar cada método
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-foreground/90 sm:text-base">
          <p>
            Elige <strong>Jacobi</strong> cuando necesites paralelización o un método
            conceptualmente simple. Elige <strong>Gauss-Seidel</strong> cuando busques
            convergencia más rápida en ejecución secuencial. En ambos casos, verifica
            que la matriz sea diagonalmente dominante o que el radio espectral sea menor
            que 1.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
