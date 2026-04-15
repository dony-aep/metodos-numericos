import { ArrowDownUp, BookOpen, Gauge, Shield } from 'lucide-react';
import { BlockMath } from '@/components/shared/MathRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function GaussEliminationTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Idea general */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            Idea general del método
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <p>
            La eliminación de Gauss transforma un sistema lineal en otro equivalente,
            pero más simple de resolver:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="A x = b" />
          </div>
          <p>
            Primero se aplica <strong>eliminación hacia adelante</strong> para obtener
            una matriz triangular superior, y luego <strong>sustitución hacia atrás</strong>{' '}
            para calcular las incógnitas.
          </p>
        </CardContent>
      </Card>

      {/* Etapas del algoritmo */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
            Etapas del algoritmo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-foreground/90 sm:text-base">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { step: '01', label: 'Selección de pivote', desc: 'Elegir el mayor elemento en la columna' },
              { step: '02', label: 'Eliminación por filas', desc: 'Reducir a ceros bajo el pivote' },
              { step: '03', label: 'Sustitución hacia atrás', desc: 'Resolver desde la última ecuación' },
            ].map((item) => (
              <div key={item.step} className="rounded-lg border border-border bg-muted/20 p-3">
                <span className="font-mono text-xs text-muted-foreground">{item.step}</span>
                <p className="mt-1 font-medium text-sm">{item.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="m_{ik} = \\frac{a_{ik}}{a_{kk}}, \\quad F_i \\leftarrow F_i - m_{ik}F_k" />
          </div>
        </CardContent>
      </Card>

      {/* Pivoteo parcial */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4 text-muted-foreground" />
            Pivoteo parcial y estabilidad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <p>
            Para evitar divisiones por valores muy pequeños, se usa pivoteo parcial:
            se intercambia la fila actual con la que tenga el mayor valor absoluto en
            la columna del pivote.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="|a_{pk}| = \\max_{i\\ge k}|a_{ik}|" />
          </div>
          <p>
            Esta estrategia reduce errores de redondeo y mejora la robustez numérica.
          </p>
        </CardContent>
      </Card>

      {/* Complejidad */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            Complejidad y uso práctico
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
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
