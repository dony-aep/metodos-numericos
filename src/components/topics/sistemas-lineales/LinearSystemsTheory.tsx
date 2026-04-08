import { BlockMath } from '@/components/shared/MathRenderer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LinearSystemsTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Definición y forma matricial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <p>
            Un sistema de ecuaciones lineales reúne ecuaciones donde las incógnitas
            aparecen de forma lineal. Su forma compacta es:
          </p>
          <div className="rounded-lg border bg-muted/40 p-3">
            <BlockMath math="A x = b" />
          </div>
          <p>
            Donde <strong>A</strong> es la matriz de coeficientes, <strong>x</strong>{' '}
            el vector de incógnitas y <strong>b</strong> el vector de términos
            independientes.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clasificación de sistemas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="outline">Cuadrado: m = n</Badge>
          <Badge variant="outline">Sobredeterminado: m &gt; n</Badge>
          <Badge variant="outline">Subdeterminado: m &lt; n</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Métodos de solución</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <p>
            <strong>Directos:</strong> Eliminación Gaussiana, factorización LU y
            factorización QR.
          </p>
          <p>
            <strong>Iterativos:</strong> Jacobi, Gauss-Seidel, SOR y Gradiente
            Conjugado.
          </p>
          <p>
            Jacobi y Gauss-Seidel suelen converger cuando la matriz es diagonal
            dominante.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mínimos cuadrados y condicionamiento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <p>
            Cuando no hay solución exacta, se minimiza el error:
          </p>
          <div className="rounded-lg border bg-muted/40 p-3">
            <BlockMath math="\\min \\|Ax-b\\|" />
          </div>
          <p>
            El número de condición mide sensibilidad a perturbaciones: matrices mal
            condicionadas amplifican errores.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
