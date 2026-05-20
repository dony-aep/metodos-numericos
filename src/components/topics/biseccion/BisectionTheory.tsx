import { BookOpen, Layers, Target, CheckCircle2, AlertTriangle } from 'lucide-react';
import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BisectionTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            Fundamento teórico
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            El método de bisección se basa en el{' '}
            <strong className="text-foreground">Teorema del Valor Intermedio</strong>:
            si <InlineMath math="f" /> es continua en <InlineMath math="[a,b]" /> y{' '}
            <InlineMath math="f(a) \cdot f(b) < 0" />, entonces existe al menos un{' '}
            <InlineMath math="c \in (a,b)" /> tal que <InlineMath math="f(c) = 0" />.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="f(a) \cdot f(b) < 0 \implies \exists\, c \in (a,b) : f(c) = 0" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Layers className="h-4 w-4 text-muted-foreground" />
            Procedimiento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <ol className="list-inside list-decimal space-y-2">
            <li>Verificar que <InlineMath math="f(a) \cdot f(b) < 0" />.</li>
            <li>Calcular el punto medio: <InlineMath math="c = (a+b)/2" />.</li>
            <li>Evaluar <InlineMath math="f(c)" />.</li>
            <li>
              Si <InlineMath math="f(a) \cdot f(c) < 0" />, la raíz está en{' '}
              <InlineMath math="[a,c]" />. Si no, está en <InlineMath math="[c,b]" />.
            </li>
            <li>Repetir hasta cumplir la tolerancia.</li>
          </ol>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-muted-foreground" />
            Error y convergencia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            El intervalo se reduce a la mitad en cada iteración. Después de{' '}
            <InlineMath math="n" /> iteraciones:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="E_n \leq \frac{b - a}{2^n}" />
          </div>
          <p>
            Iteraciones necesarias para alcanzar tolerancia <InlineMath math="\varepsilon" />:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="n \geq \log_2\left(\frac{b-a}{\varepsilon}\right)" />
          </div>
          <p>La convergencia es <strong className="text-foreground">lineal</strong> pero garantizada.</p>
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
            <li>Siempre converge si la función es continua y hay cambio de signo.</li>
            <li>No requiere derivadas.</li>
            <li>Fácil de implementar y entender.</li>
            <li>Error predecible y controlable.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            Desventajas
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          <ul className="list-inside list-disc space-y-1">
            <li>Convergencia lenta comparada con Newton o secante.</li>
            <li>Requiere un intervalo inicial con cambio de signo.</li>
            <li>No aprovecha información de la forma de la función.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
