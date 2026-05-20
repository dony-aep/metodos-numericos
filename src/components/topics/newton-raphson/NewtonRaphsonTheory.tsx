import { BookOpen, Layers, Target, CheckCircle2, AlertTriangle } from 'lucide-react';
import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function NewtonRaphsonTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            Interpretación geométrica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            En cada iteración se traza la <strong className="text-foreground">recta tangente</strong> a{' '}
            <InlineMath math="f(x)" /> en el punto <InlineMath math="(x_n, f(x_n))" />.
            La intersección de esa tangente con el eje <InlineMath math="x" /> da la
            siguiente aproximación <InlineMath math="x_{n+1}" />.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="y = f(x_n) + f'(x_n)(x - x_n)" />
          </div>
          <p>
            Igualando <InlineMath math="y = 0" /> y despejando:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Layers className="h-4 w-4 text-muted-foreground" />
            Algoritmo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <ol className="list-inside list-decimal space-y-2">
            <li>Elegir una aproximación inicial <InlineMath math="x_0" />.</li>
            <li>Calcular <InlineMath math="f(x_n)" /> y <InlineMath math="f'(x_n)" />.</li>
            <li>Verificar que <InlineMath math="f'(x_n) \neq 0" />.</li>
            <li>Aplicar <InlineMath math="x_{n+1} = x_n - f(x_n)/f'(x_n)" />.</li>
            <li>Repetir hasta cumplir la tolerancia.</li>
          </ol>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-muted-foreground" />
            Convergencia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Cuando converge, el método tiene convergencia{' '}
            <strong className="text-foreground">cuadrática</strong>: el número de
            cifras correctas se duplica aproximadamente en cada iteración.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="|e_{n+1}| \approx \frac{|f''(r)|}{2|f'(r)|} |e_n|^2" />
          </div>
          <p>
            Condiciones para convergencia rápida: función diferenciable,{' '}
            <InlineMath math="f'(r) \neq 0" />, y <InlineMath math="x_0" /> cercano a la raíz.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            Ventajas
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          <ul className="list-inside list-disc space-y-1">
            <li>Convergencia muy rápida (cuadrática).</li>
            <li>Fácil de programar.</li>
            <li>Muy usado en ciencia e ingeniería.</li>
            <li>Pocas iteraciones para alta precisión.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            Desventajas y casos de falla
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          <ul className="list-inside list-disc space-y-1">
            <li>Requiere conocer o calcular la derivada.</li>
            <li>Puede divergir si <InlineMath math="x_0" /> está lejos de la raíz.</li>
            <li>Falla si <InlineMath math="f'(x_n) = 0" /> (tangente horizontal).</li>
            <li>Convergencia lenta en raíces múltiples.</li>
            <li>No garantiza convergencia global.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Example */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            Ejemplo: calcular √2
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Con <InlineMath math="f(x) = x^2 - 2" /> y{' '}
            <InlineMath math="f'(x) = 2x" />, la iteración queda:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="x_{n+1} = \frac{1}{2}\left(x_n + \frac{2}{x_n}\right)" />
          </div>
          <p>
            Con <InlineMath math="x_0 = 1" />: <InlineMath math="x_1 = 1.5" />,{' '}
            <InlineMath math="x_2 \approx 1.4167" />,{' '}
            <InlineMath math="x_3 \approx 1.41422" />. En 4 iteraciones se alcanza
            precisión de 10 cifras.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
