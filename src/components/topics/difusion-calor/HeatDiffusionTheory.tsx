import {
  BookOpen,
  Grid3x3,
  GitCompareArrows,
  AlertTriangle,
  Layers,
  Globe2,
  Cpu,
  FlaskConical,
  TrendingUp,
  Image,
  TreePine,
  Link2,
  Thermometer,
} from 'lucide-react';
import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HeatDiffusionTheory() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* EDP y ecuación del calor */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            De las EDO a las EDP
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Una <strong className="text-foreground">ecuación en derivadas
            parciales</strong> (EDP) relaciona una función de varias variables
            con sus derivadas parciales. La <strong className="text-foreground">ecuación
            del calor</strong> es el ejemplo clásico de EDP parabólica: describe
            cómo la temperatura <InlineMath math="u(x,t)" /> se distribuye en el
            espacio y el tiempo.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="\frac{\partial u}{\partial t} = \alpha\,\frac{\partial^2 u}{\partial x^2}" />
          </div>
          <p>
            donde <InlineMath math="\alpha = k/(\rho\,c_p)" /> es la{' '}
            <strong className="text-foreground">difusividad térmica</strong>. Se
            necesita una <strong className="text-foreground">condición inicial</strong>{' '}
            <InlineMath math="u(x,0)=f(x)" /> y{' '}
            <strong className="text-foreground">condiciones de frontera</strong>{' '}
            (aquí Dirichlet: <InlineMath math="u(0,t)=T_a,\ u(L,t)=T_b" />) para
            tener solución única.
          </p>
        </CardContent>
      </Card>

      {/* Malla y diferencias finitas */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Grid3x3 className="h-4 w-4 text-muted-foreground" />
            Discretización por diferencias finitas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Se construye una malla <InlineMath math="x_i = i\,\Delta x" /> con{' '}
            <InlineMath math="\Delta x = L/N" /> y <InlineMath math="t_n = n\,\Delta t" />,
            con <InlineMath math="u_i^n \approx u(x_i,t_n)" />. Las derivadas se
            reemplazan por diferencias:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Tiempo — adelante <InlineMath math="O(\Delta t)" />
              </p>
              <BlockMath math="\frac{\partial u}{\partial t} \approx \frac{u_i^{\,n+1}-u_i^{\,n}}{\Delta t}" />
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Espacio — central <InlineMath math="O(\Delta x^2)" />
              </p>
              <BlockMath math="\frac{\partial^2 u}{\partial x^2} \approx \frac{u_{i+1}^{\,n}-2u_i^{\,n}+u_{i-1}^{\,n}}{\Delta x^2}" />
            </div>
          </div>
          <p>
            Define el <strong className="text-foreground">número de difusión</strong>:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="\lambda = \frac{\alpha\,\Delta t}{\Delta x^2}" />
          </div>
        </CardContent>
      </Card>

      {/* FTCS */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GitCompareArrows className="h-4 w-4 text-muted-foreground" />
            Método explícito (FTCS)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">FTCS</strong> (Forward-Time,
            Central-Space) despeja el valor futuro directamente con valores
            conocidos del paso anterior — sin resolver ningún sistema:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <BlockMath math="u_i^{\,n+1} = u_i^{\,n} + \lambda\left(u_{i+1}^{\,n}-2u_i^{\,n}+u_{i-1}^{\,n}\right)" />
          </div>
          <p>
            Cada valor nuevo depende de tres puntos del paso anterior. Es muy
            fácil de programar, pero sólo <strong className="text-foreground">condicionalmente
            estable</strong>.
          </p>
        </CardContent>
      </Card>

      {/* Estabilidad */}
      <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            Condición de estabilidad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            El análisis de von Neumann exige, para el esquema explícito:
          </p>
          <div className="rounded-lg border border-border bg-card p-3">
            <BlockMath math="\lambda = \frac{\alpha\,\Delta t}{\Delta x^2} \le \frac{1}{2}" />
          </div>
          <p>
            Si <InlineMath math="\lambda \le 1/2" /> la solución se suaviza
            correctamente; si <InlineMath math="\lambda > 1/2" /> aparecen{' '}
            <strong className="text-foreground">oscilaciones crecientes</strong> y
            la solución diverge. Reducir <InlineMath math="\Delta x" /> a la mitad
            obliga a dividir <InlineMath math="\Delta t" /> entre 4, lo que vuelve
            costoso al método explícito en mallas finas.
          </p>
        </CardContent>
      </Card>

      {/* Comparación de esquemas */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Layers className="h-4 w-4 text-muted-foreground" />
            Comparación de esquemas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-3 font-semibold">Esquema</th>
                  <th className="py-2 pr-3 font-semibold">Estabilidad</th>
                  <th className="py-2 pr-3 font-semibold">Orden (t)</th>
                  <th className="py-2 font-semibold">¿Resuelve sistema?</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-3">Explícito (FTCS)</td>
                  <td className="py-2 pr-3">Condicional (λ ≤ ½)</td>
                  <td className="py-2 pr-3">O(Δt)</td>
                  <td className="py-2">No</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-3">Implícito (BTCS)</td>
                  <td className="py-2 pr-3">Incondicional</td>
                  <td className="py-2 pr-3">O(Δt)</td>
                  <td className="py-2">Sí (tridiagonal)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3">Crank-Nicolson</td>
                  <td className="py-2 pr-3">Incondicional</td>
                  <td className="py-2 pr-3">O(Δt²)</td>
                  <td className="py-2">Sí (tridiagonal)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Los esquemas implícitos resuelven en cada paso un sistema{' '}
            <strong className="text-foreground">tridiagonal</strong> (algoritmo de
            Thomas), conectando este tema con la eliminación de Gauss y los métodos
            iterativos del curso.
          </p>
        </CardContent>
      </Card>

      {/* Aplicaciones — expandidas */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe2 className="h-4 w-4 text-muted-foreground" />
            Aplicaciones del mundo real
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            La ecuación de difusión modela todo proceso donde una magnitud se
            reparte y suaviza con el tiempo. Aparece en campos muy diversos:
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Ingeniería térmica */}
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <div className="mb-1 flex items-center gap-2">
                <Thermometer className="h-3.5 w-3.5 text-orange-500 dark:text-orange-400" />
                <p className="text-xs font-semibold text-foreground">Ingeniería térmica</p>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Enfriamiento de motores, diseño de disipadores de calor, hornos
                industriales y aislamiento térmico de edificios. La difusividad
                típica de metales es{' '}
                <InlineMath math="\alpha \approx 10^{-6}\text{–}10^{-5}\,\mathrm{m^2/s}" />{' '}
                (ej. cobre, acero). Incluye paradas y arranques de turbinas,
                calderas e intercambiadores donde se diseñan tiempos de
                enfriamiento seguros.
              </p>
            </div>

            {/* Difusión de sustancias */}
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <div className="mb-1 flex items-center gap-2">
                <FlaskConical className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
                <p className="text-xs font-semibold text-foreground">Difusión de sustancias</p>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Dispersión de contaminantes en ríos o la atmósfera, tinta
                disolviéndose en agua, y dopaje de semiconductores. Es la misma
                EDP con un coeficiente de difusión{' '}
                <InlineMath math="D" /> en lugar de <InlineMath math="\alpha" />.
                En medios porosos (suelos, rocas) se usa un{' '}
                <InlineMath math="\alpha" /> efectivo ajustado a la conductividad
                del medio.
              </p>
            </div>

            {/* Finanzas */}
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <div className="mb-1 flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                <p className="text-xs font-semibold text-foreground">Finanzas — Black-Scholes</p>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                La ecuación de <strong>Black-Scholes</strong> para valorar opciones
                financieras es matemáticamente equivalente a la ecuación del calor.
                Con un cambio de variables, el precio de una opción{' '}
                <InlineMath math="V(S,t)" /> se transforma en un problema de
                difusión estándar, resuelto con las mismas técnicas numéricas.
              </p>
            </div>

            {/* Procesamiento de imágenes */}
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <div className="mb-1 flex items-center gap-2">
                <Image className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
                <p className="text-xs font-semibold text-foreground">Procesamiento de imágenes</p>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                El <strong>difuminado gaussiano</strong> (blur) y la reducción de
                ruido aplican difusión a la intensidad de los píxeles: cada píxel
                promedia con sus vecinos, suavizando la imagen. Es la base de
                filtros como el de Perona-Malik (difusión anisotrópica).
              </p>
            </div>

            {/* Biología */}
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <div className="mb-1 flex items-center gap-2">
                <TreePine className="h-3.5 w-3.5 text-lime-500 dark:text-lime-400" />
                <p className="text-xs font-semibold text-foreground">Biología y medicina</p>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Difusión de nutrientes y fármacos en tejidos, transporte de
                oxígeno en capilares, y modelos de propagación de poblaciones
                (ecuación de reacción-difusión de Fisher). La misma EDP describe
                cómo las sustancias se distribuyen espacialmente en organismos vivos.
              </p>
            </div>

            {/* Geofísica */}
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <div className="mb-1 flex items-center gap-2">
                <Globe2 className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                <p className="text-xs font-semibold text-foreground">Geofísica</p>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Temperatura del subsuelo y el interior del planeta, flujo de calor
                en volcanes y zonas geotérmicas. También modela la difusión de
                calor en suelos y rocas, fundamental para ingeniería geotérmica y
                estudios climáticos a largo plazo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Relación con otros temas del curso */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Link2 className="h-4 w-4 text-muted-foreground" />
            Relación con otros temas del curso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            La ecuación del calor <strong className="text-foreground">integra</strong>{' '}
            varios métodos ya estudiados en el curso de Análisis Numérico:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex gap-2 rounded-lg border border-border bg-muted/20 p-3">
              <Cpu className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-semibold text-foreground">Derivación numérica</p>
                <p className="text-xs text-muted-foreground">
                  Se usa la <strong>diferencia central</strong> para aproximar{' '}
                  <InlineMath math="\partial^2 u / \partial x^2" />.
                </p>
              </div>
            </div>
            <div className="flex gap-2 rounded-lg border border-border bg-muted/20 p-3">
              <Cpu className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-semibold text-foreground">Método de Euler</p>
                <p className="text-xs text-muted-foreground">
                  La marcha en el tiempo es <strong>Euler explícito</strong>{' '}
                  aplicado nodo por nodo.
                </p>
              </div>
            </div>
            <div className="flex gap-2 rounded-lg border border-border bg-muted/20 p-3">
              <Cpu className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-semibold text-foreground">Sistemas lineales</p>
                <p className="text-xs text-muted-foreground">
                  Los métodos implícito y Crank-Nicolson reducen cada paso a un{' '}
                  <strong>sistema tridiagonal</strong> (eliminación de Gauss /
                  algoritmo de Thomas).
                </p>
              </div>
            </div>
            <div className="flex gap-2 rounded-lg border border-border bg-muted/20 p-3">
              <Cpu className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-semibold text-foreground">Jacobi y Gauss-Seidel</p>
                <p className="text-xs text-muted-foreground">
                  Alternativa iterativa para resolver el sistema tridiagonal en
                  mallas grandes.
                </p>
              </div>
            </div>
          </div>
          <p>
            Por esto, la ecuación del calor es un excelente <strong className="text-foreground">
            tema de cierre</strong> que conecta de forma natural casi todos los
            métodos del curso.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

