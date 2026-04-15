import {
  AlertTriangle,
  BookOpen,
  GitCompareArrows,
  Gauge,
  Lightbulb,
} from 'lucide-react';
import { BlockMath } from '@/components/shared/MathRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function InterpolationTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Idea general */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            Definición
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <p>
            Dados <strong>n + 1</strong> puntos con abscisas distintas, existe un
            único polinomio de grado a lo sumo n que pasa por todos ellos:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="P_n(x_i) = y_i, \quad i = 0, 1, \dots, n" />
          </div>
          <p>
            Se usa para estimar valores intermedios, modelar curvas a partir de
            mediciones y preparar datos para simulación.
          </p>
        </CardContent>
      </Card>

      {/* Lagrange */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GitCompareArrows className="h-4 w-4 text-muted-foreground" />
            Forma de Lagrange
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-foreground/90 sm:text-base">
          <p>
            El polinomio se escribe como combinación lineal de las bases de
            Lagrange, donde cada base vale 1 en su nodo y 0 en los demás:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="P_n(x) = \sum_{i=0}^{n} y_i \, L_i(x)" />
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="L_i(x) = \prod_{j=0,\, j \neq i}^{n} \frac{x - x_j}{x_i - x_j}" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-800 dark:bg-emerald-950/20">
              <p className="mb-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Ventaja
              </p>
              <p className="text-xs text-foreground/80">
                Clara, directa y fácil de entender conceptualmente.
              </p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50/50 p-3 dark:border-red-800 dark:bg-red-950/20">
              <p className="mb-1 text-xs font-semibold text-red-700 dark:text-red-400">
                Desventaja
              </p>
              <p className="text-xs text-foreground/80">
                Si agregas un nuevo dato, normalmente debes recalcular todo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Newton */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GitCompareArrows className="h-4 w-4 text-muted-foreground" />
            Forma de Newton
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-foreground/90 sm:text-base">
          <p>
            Usa <strong>diferencias divididas</strong> como coeficientes. Permite
            agregar nuevos puntos sin rehacer todo desde cero.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="P_n(x) = f[x_0] + f[x_0,x_1](x{-}x_0) + f[x_0,x_1,x_2](x{-}x_0)(x{-}x_1) + \cdots" />
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Diferencias divididas
            </p>
            <BlockMath math="f[x_i] = y_i, \qquad f[x_i, \dots, x_j] = \frac{f[x_{i+1}, \dots, x_j] - f[x_i, \dots, x_{j-1}]}{x_j - x_i}" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-800 dark:bg-emerald-950/20">
              <p className="mb-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Ventaja
              </p>
              <p className="text-xs text-foreground/80">
                Permite agregar datos incrementalmente. Mejor para cálculos numéricos.
              </p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50/50 p-3 dark:border-red-800 dark:bg-red-950/20">
              <p className="mb-1 text-xs font-semibold text-red-700 dark:text-red-400">
                Desventaja
              </p>
              <p className="text-xs text-foreground/80">
                La tabla de diferencias divididas puede ser costosa de construir para muchos puntos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            Error de interpolación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <p>
            Si la función original tiene derivada (n+1) continua, el error se
            puede expresar como:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="f(x) - P_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{i=0}^{n}(x - x_i)" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { title: 'Suavidad', desc: 'Depende de las derivadas de f' },
              { title: 'Distribución', desc: 'Depende de la ubicación de los nodos' },
              { title: 'Grado', desc: 'Mayor grado no siempre mejora la aproximación' },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-muted/20 p-3"
              >
                <p className="text-xs font-semibold">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Runge */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            Fenómeno de Runge
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90 sm:text-base">
          <p>
            Con nodos equidistantes y grado alto, pueden aparecer
            <strong> oscilaciones grandes</strong> cerca de los extremos del
            intervalo. El polinomio pasa por todos los puntos pero aproxima mal
            la función entre ellos.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { step: '01', label: 'Usar menos grado' },
              { step: '02', label: 'Nodos de Chebyshev' },
              { step: '03', label: 'Splines por tramos' },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-lg border border-border bg-muted/20 p-3"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {item.step}
                </span>
                <p className="mt-1 text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tip */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            Consejo práctico
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-foreground/90 sm:text-base">
          <p>
            Para pocos puntos, la interpolación polinómica funciona bien. Con
            muchos datos, prefiere <strong>splines cúbicos</strong> o
            interpolación por tramos para evitar oscilaciones indeseadas.
            La forma de Newton suele ser la mejor opción para implementación.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
