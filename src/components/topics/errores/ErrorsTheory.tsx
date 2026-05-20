import {
  BookOpen,
  AlertTriangle,
  Layers,
  Target,
  TrendingDown,
} from 'lucide-react';
import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ErrorsTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Concepto */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            ¿Qué son los errores numéricos?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            En análisis numérico, casi nunca se obtiene una solución exacta. Se
            construyen <strong className="text-foreground">aproximaciones</strong> y
            se estudia qué tan buena es la respuesta midiendo el error.
          </p>
          <p>
            El error mide la diferencia entre el valor verdadero{' '}
            <InlineMath math="x" /> y el valor aproximado{' '}
            <InlineMath math="\tilde{x}" />.
          </p>
        </CardContent>
      </Card>

      {/* Tipos de error */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-muted-foreground" />
            Tipos de error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <div>
            <p className="mb-2 font-medium text-foreground">Error absoluto</p>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <BlockMath math="E_a = |x - \tilde{x}|" />
            </div>
            <p className="mt-2">Mide la distancia directa entre el valor verdadero y el aproximado.</p>
          </div>
          <div>
            <p className="mb-2 font-medium text-foreground">Error relativo</p>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <BlockMath math="E_r = \frac{|x - \tilde{x}|}{|x|}" />
            </div>
            <p className="mt-2">Compara el error con el tamaño del valor real. Más útil para comparar magnitudes.</p>
          </div>
          <div>
            <p className="mb-2 font-medium text-foreground">Error porcentual</p>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <BlockMath math="E_\% = E_r \times 100\%" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fuentes de error */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            Fuentes de error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong className="text-foreground">Redondeo:</strong> la computadora
              no puede representar todos los reales exactamente.
            </li>
            <li>
              <strong className="text-foreground">Truncamiento:</strong> se reemplaza
              un objeto exacto (serie infinita, derivada) por una versión finita.
            </li>
            <li>
              <strong className="text-foreground">Cancelación:</strong> restar dos
              números muy parecidos pierde cifras significativas.
            </li>
            <li>
              <strong className="text-foreground">Propagación:</strong> un pequeño
              error de entrada se amplifica durante el cálculo.
            </li>
            <li>
              <strong className="text-foreground">Discretización:</strong> convertir
              un problema continuo en uno discreto (integrales, EDOs).
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Series de Taylor */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Layers className="h-4 w-4 text-muted-foreground" />
            Aproximación por series de Taylor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            La serie de Taylor permite aproximar una función alrededor de un
            punto <InlineMath math="a" />:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots" />
          </div>
          <p>
            Al cortar después de <InlineMath math="n" /> términos, aparece el{' '}
            <strong className="text-foreground">error de truncamiento</strong>,
            que disminuye al aumentar el grado del polinomio.
          </p>
        </CardContent>
      </Card>

      {/* Condicionamiento y estabilidad */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
            Condicionamiento y estabilidad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">Condicionamiento:</strong> propiedad
            del problema. Un problema mal condicionado amplifica pequeñas
            perturbaciones en los datos.
          </p>
          <p>
            <strong className="text-foreground">Estabilidad:</strong> propiedad del
            algoritmo. Un algoritmo inestable amplifica errores de redondeo
            durante el cálculo.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="|\text{error}| \leq C \cdot h^p" />
          </div>
          <p>
            Donde <InlineMath math="h" /> es el tamaño de paso,{' '}
            <InlineMath math="p" /> es el orden del método y{' '}
            <InlineMath math="C" /> es una constante. Mayor orden = convergencia
            más rápida.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
