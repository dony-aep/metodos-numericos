import {
  BookOpen,
  CheckCheck,
  GitCompareArrows,
  ShieldAlert,
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

export function LagrangeTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Concepto */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            Idea general
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            La <strong className="text-foreground">interpolación de Lagrange</strong> construye un
            polinomio <InlineMath math="P_n(x)" /> de grado ≤ <InlineMath math="n" /> que pasa
            exactamente por los puntos <InlineMath math="(x_0,y_0), \dots, (x_n,y_n)" />.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="P_n(x) = \sum_{k=0}^{n} y_k \, L_k(x)" />
          </div>
          <p>
            donde cada <strong className="text-foreground">base de Lagrange</strong>{' '}
            <InlineMath math="L_k(x)" /> «enciende» el valor <InlineMath math="y_k" /> en su
            nodo <InlineMath math="x_k" /> y «apaga» a los demás:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="L_k(x) = \prod_{\substack{j=0 \\ j \ne k}}^{n} \frac{x - x_j}{x_k - x_j}" />
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath
              math={`L_k(x_i) = \\begin{cases} 1, & i = k \\\\ 0, & i \\ne k \\end{cases}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Existencia y unicidad */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCheck className="h-4 w-4 text-muted-foreground" />
            Existencia y unicidad
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          <p>
            Si los nodos <InlineMath math="x_0, x_1, \dots, x_n" /> son{' '}
            <strong className="text-foreground">distintos</strong>, existe un único polinomio de
            grado ≤ <InlineMath math="n" /> que interpola los datos. No hay ambigüedad: no importa
            el método (Lagrange, Newton, sistema de Vandermonde), el polinomio resultante es el
            mismo.
          </p>
        </CardContent>
      </Card>

      {/* Forma baricéntrica */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            Forma baricéntrica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Para evaluación numérica estable se usa la{' '}
            <strong className="text-foreground">forma baricéntrica</strong>, que evita recalcular
            todos los productos para cada punto:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="P_n(x) = \frac{\displaystyle\sum_{j=0}^{n} \frac{w_j}{x - x_j} \, y_j}{\displaystyle\sum_{j=0}^{n} \frac{w_j}{x - x_j}}" />
          </div>
          <p>con pesos:</p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="w_j = \frac{1}{\prod_{\substack{i=0 \\ i \ne j}}^{n} (x_j - x_i)}" />
          </div>
        </CardContent>
      </Card>

      {/* Ventajas y desventajas */}
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
                Directo
              </Badge>
              No requiere resolver un sistema lineal.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-emerald-300 text-[10px] dark:border-emerald-700"
              >
                Claro
              </Badge>
              La forma es muy intuitiva para enseñanza.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-emerald-300 text-[10px] dark:border-emerald-700"
              >
                Práctico
              </Badge>
              Funciona bien para un número pequeño o moderado de puntos.
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
              <Badge
                variant="outline"
                className="mr-1 border-red-300 text-[10px] dark:border-red-700"
              >
                Runge
              </Badge>
              Grados altos con nodos equiespaciados pueden oscilar.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-red-300 text-[10px] dark:border-red-700"
              >
                Costoso
              </Badge>
              Evaluar repetidamente la fórmula directa es <InlineMath math="O(n^2)" />.
            </p>
            <p>
              <Badge
                variant="outline"
                className="mr-1 border-red-300 text-[10px] dark:border-red-700"
              >
                No incremental
              </Badge>
              Agregar un punto nuevo obliga a recalcular todas las bases.
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
            <BlockMath math="f(x) - P_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{j=0}^{n}(x - x_j)" />
          </div>
          <p>
            El error depende de la derivada de orden <InlineMath math="n+1" />, de la distribución
            de los nodos y del punto de evaluación. Si los nodos están mal distribuidos, el error
            puede crecer significativamente.
          </p>
        </CardContent>
      </Card>

      {/* Comparación con Newton */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GitCompareArrows className="h-4 w-4 text-muted-foreground" />
            Lagrange vs. Newton
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/20">
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Aspecto
                  </th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Lagrange
                  </th>
                  <th className="px-4 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Newton
                  </th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium text-foreground">Forma</td>
                  <td className="px-4 py-2">Bases <InlineMath math="L_k(x)" /></td>
                  <td className="px-4 py-2">Diferencias divididas</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium text-foreground">Agregar puntos</td>
                  <td className="px-4 py-2">Recalcular todo</td>
                  <td className="px-4 py-2">Solo una columna más</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium text-foreground">Evaluación</td>
                  <td className="px-4 py-2">
                    <InlineMath math="O(n^2)" /> directa
                  </td>
                  <td className="px-4 py-2">
                    <InlineMath math="O(n)" /> con Horner
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium text-foreground">Resultado</td>
                  <td className="px-4 py-2" colSpan={2}>
                    El mismo polinomio único de grado ≤ n
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
