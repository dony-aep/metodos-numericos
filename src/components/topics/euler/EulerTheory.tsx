import {
  BookOpen,
  GitCompareArrows,
  AlertTriangle,
  TrendingUp,
  Layers,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function EulerTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* EDO y PVI */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            Ecuaciones diferenciales ordinarias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Una <strong className="text-foreground">ecuación diferencial
            ordinaria</strong> (EDO) de primer orden relaciona una función
            desconocida <InlineMath math="y(x)" /> con su derivada:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="y' = f(x, y)" />
          </div>
          <p>
            Un <strong className="text-foreground">problema de valor
            inicial</strong> (PVI) agrega la condición{' '}
            <InlineMath math="y(x_0) = y_0" />, lo que permite determinar
            una solución única bajo condiciones de Lipschitz.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="\begin{cases} y' = f(x, y) \\ y(x_0) = y_0 \end{cases}" />
          </div>
          <p>
            Cuando la solución analítica no es viable, los{' '}
            <strong className="text-foreground">métodos numéricos</strong>{' '}
            producen una sucesión de aproximaciones{' '}
            <InlineMath math="y_1, y_2, \ldots, y_N" /> en puntos discretos.
          </p>
        </CardContent>
      </Card>

      {/* Derivación de Euler */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GitCompareArrows className="h-4 w-4 text-muted-foreground" />
            Derivación del método de Euler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            El método se obtiene truncando la expansión de Taylor de{' '}
            <InlineMath math="y(x)" /> alrededor de <InlineMath math="x_n" />:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="y(x_{n+1}) = y(x_n) + h\,y'(x_n) + \frac{h^2}{2}\,y''(\xi_n)" />
          </div>
          <p>
            Descartando el término de orden <InlineMath math="O(h^2)" /> y
            sustituyendo <InlineMath math="y'(x_n) = f(x_n, y_n)" /> se
            obtiene la <strong className="text-foreground">fórmula de
            Euler</strong>:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="y_{n+1} = y_n + h \cdot f(x_n,\, y_n)" />
          </div>
          <p>
            Geométricamente, cada paso sigue la{' '}
            <strong className="text-foreground">recta tangente</strong> a
            la curva solución en <InlineMath math="(x_n, y_n)" /> durante
            un intervalo <InlineMath math="h" />.
          </p>
        </CardContent>
      </Card>

      {/* Algoritmo paso a paso */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Layers className="h-4 w-4 text-muted-foreground" />
            Algoritmo paso a paso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <ol className="list-inside list-decimal space-y-2">
            <li>
              Definir <InlineMath math="f(x, y)" />, la condición
              inicial <InlineMath math="(x_0, y_0)" />, el paso{' '}
              <InlineMath math="h" /> y el número de pasos{' '}
              <InlineMath math="N" />.
            </li>
            <li>
              Para <InlineMath math="n = 0, 1, \ldots, N-1" />:
              <div className="ml-6 mt-1 space-y-1">
                <p>a) Calcular la pendiente: <InlineMath math="m_n = f(x_n, y_n)" /></p>
                <p>
                  b) Avanzar:{' '}
                  <InlineMath math="y_{n+1} = y_n + h \cdot m_n" />
                </p>
                <p>
                  c) Actualizar: <InlineMath math="x_{n+1} = x_n + h" />
                </p>
              </div>
            </li>
            <li>
              Reportar la tabla{' '}
              <InlineMath math="\{(x_n,\, y_n)\}_{n=0}^{N}" />.
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Error */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            Análisis del error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Error local de truncamiento
              </p>
              <BlockMath math="\tau_n = \frac{h^2}{2}\,y''(\xi_n) = O(h^2)" />
              <p className="mt-1 text-xs">
                Error cometido en <strong className="text-foreground">un solo
                paso</strong>, proporcional a <InlineMath math="h^2" />.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Error global acumulado
              </p>
              <BlockMath math="E_N = |y(x_N) - y_N| = O(h)" />
              <p className="mt-1 text-xs">
                Después de <InlineMath math="N = (x_f - x_0)/h" /> pasos, el
                error total es de <strong className="text-foreground">primer
                orden</strong>.
              </p>
            </div>
          </div>
          <p>
            Reducir <InlineMath math="h" /> a la mitad divide el error global
            aproximadamente por 2, pero duplica el número de evaluaciones
            de <InlineMath math="f" />.
          </p>
        </CardContent>
      </Card>

      {/* Estabilidad */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Estabilidad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Aplicando Euler a la ecuación modelo{' '}
            <InlineMath math="y' = \lambda y" /> con{' '}
            <InlineMath math="\lambda \in \mathbb{C}" />:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="y_{n+1} = (1 + h\lambda)\,y_n" />
          </div>
          <p>
            La solución numérica es estable si y sólo si{' '}
            <InlineMath math="|1 + h\lambda| \leq 1" />, lo que define un
            disco de radio 1 centrado en <InlineMath math="-1" /> en el
            plano complejo.
          </p>
          <p>
            Para problemas <strong className="text-foreground">stiff</strong>{' '}
            (ecuaciones rígidas), Euler explícito requiere{' '}
            <InlineMath math="h" /> extremadamente pequeño y se prefieren
            métodos implícitos.
          </p>
        </CardContent>
      </Card>

      {/* Ventajas y limitaciones */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Ventajas
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="list-inside list-disc space-y-1">
              <li>Extremadamente simple de implementar y entender.</li>
              <li>Bajo costo computacional por paso.</li>
              <li>Base pedagógica para métodos superiores.</li>
              <li>Fácilmente extensible a sistemas de EDOs.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              Limitaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="list-inside list-disc space-y-1">
              <li>Precisión de primer orden — error global O(h).</li>
              <li>Región de estabilidad pequeña.</li>
              <li>Inadecuado para problemas stiff sin h muy pequeño.</li>
              <li>El error se acumula en intervalos largos.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Métodos relacionados */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Layers className="h-4 w-4 text-muted-foreground" />
            Métodos relacionados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Heun (Euler mejorado) — O(h²)</Badge>
            <Badge variant="secondary">Runge-Kutta 4 — O(h⁴)</Badge>
            <Badge variant="secondary">Euler implícito — A-estable</Badge>
            <Badge variant="secondary">Adams-Bashforth — multipaso</Badge>
          </div>
          <p className="mt-2">
            El método de <strong className="text-foreground">Heun</strong>{' '}
            promedia la pendiente en ambos extremos del paso, logrando
            segundo orden. <strong className="text-foreground">Runge-Kutta
            de orden 4</strong> (RK4) evalúa la pendiente en cuatro puntos
            intermedios y es el estándar práctico para EDOs no stiff.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
