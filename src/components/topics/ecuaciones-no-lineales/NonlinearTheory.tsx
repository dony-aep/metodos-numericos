import { BookOpen, GitCompareArrows, Layers, Target, Zap } from 'lucide-react';
import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function NonlinearTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            ¿Qué es una ecuación no lineal?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Una ecuación no lineal se escribe como <InlineMath math="f(x) = 0" />.
            El objetivo es encontrar valores de <InlineMath math="x" /> (raíces)
            que anulen la función, cuando no es posible despejar algebraicamente.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="mb-2 text-xs font-medium text-foreground">Ejemplos:</p>
            <BlockMath math="e^{-x} - x = 0, \quad \cos(x) - x = 0, \quad x^3 - 2x - 5 = 0" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GitCompareArrows className="h-4 w-4 text-muted-foreground" />
            Clasificación de métodos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <div>
            <p className="mb-2 font-medium text-foreground">Métodos cerrados (bracketing)</p>
            <p>
              Trabajan con un intervalo <InlineMath math="[a,b]" /> donde{' '}
              <InlineMath math="f(a) \cdot f(b) < 0" />. Garantizan convergencia
              pero son más lentos. Ejemplo: <strong className="text-foreground">bisección</strong>.
            </p>
          </div>
          <div>
            <p className="mb-2 font-medium text-foreground">Métodos abiertos</p>
            <p>
              Parten de valores iniciales sin encerrar la raíz. Son más rápidos
              pero pueden divergir. Ejemplos: <strong className="text-foreground">Newton-Raphson</strong>,{' '}
              <strong className="text-foreground">secante</strong>.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Layers className="h-4 w-4 text-muted-foreground" />
            Fórmulas principales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <div>
            <p className="mb-2 font-medium text-foreground">Bisección</p>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <BlockMath math="m = \frac{a+b}{2}" />
            </div>
            <p className="mt-2">Se elige el subintervalo donde hay cambio de signo.</p>
          </div>
          <div>
            <p className="mb-2 font-medium text-foreground">Newton-Raphson</p>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <BlockMath math="x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}" />
            </div>
            <p className="mt-2">Convergencia cuadrática cerca de la raíz. Requiere derivada.</p>
          </div>
          <div>
            <p className="mb-2 font-medium text-foreground">Secante</p>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <BlockMath math="x_{n+1} = x_n - f(x_n) \frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}" />
            </div>
            <p className="mt-2">No requiere derivada. Convergencia superlineal.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-muted-foreground" />
            Criterios de parada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <ul className="list-inside list-disc space-y-2">
            <li><InlineMath math="|x_{n+1} - x_n| < \text{tolerancia}" /></li>
            <li><InlineMath math="|f(x_n)| < \text{tolerancia}" /></li>
            <li>Se alcanza el número máximo de iteraciones</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Zap className="h-4 w-4 text-muted-foreground" />
            Convergencia
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 pr-4 font-medium text-foreground">Método</th>
                  <th className="pb-2 pr-4 font-medium text-foreground">Orden</th>
                  <th className="pb-2 font-medium text-foreground">Garantiza conv.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td className="py-2 pr-4">Bisección</td><td className="py-2 pr-4">Lineal</td><td className="py-2">Sí</td></tr>
                <tr><td className="py-2 pr-4">Newton-Raphson</td><td className="py-2 pr-4">Cuadrática</td><td className="py-2">No</td></tr>
                <tr><td className="py-2 pr-4">Secante</td><td className="py-2 pr-4">Superlineal (~1.618)</td><td className="py-2">No</td></tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
