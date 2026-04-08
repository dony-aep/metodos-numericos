import { BlockMath } from '@/components/shared/MathRenderer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function GaussEliminationTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Idea general del método</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <p>
            La eliminación de Gauss transforma un sistema lineal en otro equivalente,
            pero más simple de resolver:
          </p>
          <div className="rounded-lg border bg-muted/40 p-3">
            <BlockMath math="A x = b" />
          </div>
          <p>
            Primero se aplica <strong>eliminación hacia adelante</strong> para obtener
            una matriz triangular superior, y luego <strong>sustitución hacia atrás</strong>{' '}
            para calcular las incógnitas.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Etapas del algoritmo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">1. Selección de pivote</Badge>
            <Badge variant="outline">2. Eliminación por filas</Badge>
            <Badge variant="outline">3. Sustitución hacia atrás</Badge>
          </div>
          <p>
            En cada columna se elimina lo que está debajo del pivote para construir la
            forma triangular superior.
          </p>
          <div className="rounded-lg border bg-muted/40 p-3">
            <BlockMath math="m_{ik} = \\frac{a_{ik}}{a_{kk}}, \\quad F_i \\leftarrow F_i - m_{ik}F_k" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pivoteo parcial y estabilidad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <p>
            Para evitar divisiones por valores muy pequeños, se usa pivoteo parcial:
            se intercambia la fila actual con la que tenga el mayor valor absoluto en
            la columna del pivote.
          </p>
          <div className="rounded-lg border bg-muted/40 p-3">
            <BlockMath math="|a_{pk}| = \\max_{i\\ge k}|a_{ik}|" />
          </div>
          <p>
            Esta estrategia reduce errores de redondeo y mejora la robustez numérica.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Complejidad y uso práctico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <div className="rounded-lg border bg-muted/40 p-3">
            <BlockMath math="\\text{Costo dominante} \\approx O(n^3)" />
          </div>
          <p>
            Es un método directo fundamental y base de técnicas como la factorización
            LU. Se utiliza ampliamente en ingeniería, simulación y ciencia de datos.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
