import { BlockMath } from '@/components/shared/MathRenderer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Grid3X3, Wrench, BarChart3 } from 'lucide-react';

export function LinearSystemsTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Definición */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-foreground text-base sm:text-lg">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            Definición y forma matricial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 sm:p-6 pt-0 text-sm text-muted-foreground sm:text-base">
          <p>
            Un sistema de ecuaciones lineales reúne ecuaciones donde las incógnitas
            aparecen de forma lineal. Su forma compacta es:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4 text-center overflow-x-auto">
            <BlockMath math="A\mathbf{x} = \mathbf{b}" />
          </div>
          <p>
            Donde <strong className="text-foreground">A</strong> es la matriz de coeficientes,{' '}
            <strong className="text-foreground">x</strong> el vector de incógnitas y{' '}
            <strong className="text-foreground">b</strong> el vector de términos independientes.
          </p>
        </CardContent>
      </Card>

      {/* Clasificación */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-foreground text-base sm:text-lg">
            <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            Clasificación de sistemas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { label: 'Cuadrado', desc: 'm = n', detail: 'Mismo número de ecuaciones e incógnitas' },
              { label: 'Sobredeterminado', desc: 'm > n', detail: 'Más ecuaciones que incógnitas' },
              { label: 'Subdeterminado', desc: 'm < n', detail: 'Menos ecuaciones que incógnitas' },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border bg-muted/20 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs font-mono">{item.desc}</Badge>
                </div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métodos de solución */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-foreground text-base sm:text-lg">
            <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            Métodos de solución
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 sm:p-6 pt-0">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/20 p-3 sm:p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Directos</p>
              <p className="text-sm text-muted-foreground">
                Eliminación Gaussiana, factorización LU y factorización QR.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3 sm:p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Iterativos</p>
              <p className="text-sm text-muted-foreground">
                Jacobi, Gauss-Seidel, SOR y Gradiente Conjugado. Convergen cuando la
                matriz es diagonal dominante.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mínimos cuadrados */}
      <Card className="border-border bg-card">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-foreground text-base sm:text-lg">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            Mínimos cuadrados y condicionamiento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4 sm:p-6 pt-0 text-sm text-muted-foreground sm:text-base">
          <p>
            Cuando no hay solución exacta, se minimiza el error:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4 text-center overflow-x-auto">
            <BlockMath math={"\\min \\|A\\mathbf{x}-\\mathbf{b}\\|"} />
          </div>
          <p>
            El <strong className="text-foreground">número de condición</strong> mide sensibilidad a
            perturbaciones: matrices mal condicionadas amplifican errores.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
