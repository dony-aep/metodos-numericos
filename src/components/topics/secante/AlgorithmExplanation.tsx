import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  Lightbulb, 
  TrendingUp, 
  CheckCircle2, 
  XCircle,
  Zap,
  Target,
  Clock,
  Percent,
  BookOpen,
  Code,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

// Fórmulas LaTeX - usar doble backslash que se convierte en uno solo en el bundle
const LATEX = {
  // Fórmulas básicas
  fx0: "f(x) = 0",
  x0: "x_0",
  x1: "x_1",
  x: "x",
  xn1: "x_{n+1}",
  fpx: "f'(x)",
  fpxn: "f'(x_n)",
  n: "n",
  r: "r",
  f: "f",
  
  // Fórmulas principales del método
  secantFormula: "x_{n+1} = x_n - f(x_n) \\cdot \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}",
  secantFormulaAlt: "x_{n+1} = \\frac{x_{n-1} \\cdot f(x_n) - x_n \\cdot f(x_{n-1})}{f(x_n) - f(x_{n-1})}",
  newtonFormula: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}",
  derivApprox: "f'(x_n) \\approx \\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}",
  slopeApprox: "\\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}} \\approx f'(x_n)",
  
  // Puntos para geometría
  pointPrev: "(x_{n-1}, f(x_{n-1}))",
  pointCurr: "(x_n, f(x_n))",
  
  // Convergencia
  goldenRatio: "p = \\varphi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618",
  errorFormula: "|e_{n+1}| \\approx C \\cdot |e_n|^{\\varphi}",
  errorDef: "e_n = x_n - r",
  phi: "\\varphi",
  
  // Criterios de parada
  tolDiff: "|x_{n+1} - x_n| < \\text{tolerancia}",
  tolFunc: "|f(x_{n+1})| < \\text{tolerancia}",
  
  // Peligros
  divZero: "f(x_n) = f(x_{n-1})",
  approxEqual: "f(x_n) \\approx f(x_{n-1})",
  x0x1: "x_0, x_1",
  
  // Ejemplo numérico
  exampleFunc: "f(x) = x^3 + 2x^2 + 10x - 20",
  exampleX0: "x_0 = 0",
  exampleX1: "x_1 = 1",
  xn: "x_n",
  diffFormula: "|x_{n+1} - x_n|",
  result: "x \\approx 1.368808",
};

export function AlgorithmExplanation() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Resumen Ejecutivo */}
      <Card className="border-slate-200 bg-slate-50">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-slate-800 text-base sm:text-lg">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            Resumen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            El <strong className="text-amber-700">método de la secante</strong> es una técnica iterativa 
            para encontrar raíces de funciones reales <InlineMath math={LATEX.fx0} />. Se basa en aproximar 
            la derivada mediante la pendiente de la <em>recta secante</em> que une dos puntos sucesivos 
            de la función.
          </p>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            A partir de dos aproximaciones iniciales <InlineMath math={LATEX.x0} /> y <InlineMath math={LATEX.x1} />, 
            el método genera una secuencia de valores que converge hacia la raíz de la función.
          </p>
        </CardContent>
      </Card>

      {/* Fórmula Principal */}
      <Card className="relative overflow-hidden border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-200/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-amber-800 text-base sm:text-lg">
            <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
            Fórmula del Método
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
          <div className="bg-white border border-amber-200 rounded-lg p-3 sm:p-6 text-center shadow-sm overflow-x-auto">
            <BlockMath math={LATEX.secantFormula} />
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Forma equivalente (despejando):
          </p>
          <div className="bg-amber-100/50 border border-amber-200 rounded-lg p-3 sm:p-4 text-center overflow-x-auto">
            <BlockMath math={LATEX.secantFormulaAlt} />
          </div>
        </CardContent>
      </Card>

      {/* Derivación desde Newton-Raphson */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-blue-800 text-base sm:text-lg">
            <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            Derivación desde Newton-Raphson
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            La derivación clásica se obtiene aproximando la derivada por <strong>diferencias finitas</strong>. 
            Partiendo de la fórmula de Newton-Raphson:
          </p>
          <div className="bg-white border border-blue-200 rounded-lg p-3 sm:p-4 text-center overflow-x-auto">
            <BlockMath math={LATEX.newtonFormula} />
          </div>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Se sustituye la derivada <InlineMath math={LATEX.fpxn} /> por su aproximación mediante diferencias finitas:
          </p>
          <div className="bg-blue-100/50 border border-blue-200 rounded-lg p-3 sm:p-4 text-center overflow-x-auto">
            <BlockMath math={LATEX.derivApprox} />
          </div>
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">Esto produce la fórmula de la secante</span>
          </div>
        </CardContent>
      </Card>

      {/* Interpretación Geométrica */}
      <Card className="border-slate-200 bg-white">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-slate-800 text-base sm:text-lg">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            Interpretación Geométrica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            El método de la secante es una <strong>aproximación del método de Newton-Raphson</strong> 
            que evita calcular la derivada <InlineMath math={LATEX.fpx} />.
          </p>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            En lugar de usar la recta tangente, se utiliza una <strong className="text-amber-600">recta secante</strong> que 
            pasa por los puntos <InlineMath math={LATEX.pointPrev} /> y <InlineMath math={LATEX.pointCurr} />.
          </p>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            La intersección de esta secante con el eje <InlineMath math={LATEX.x} /> da el siguiente valor <InlineMath math={LATEX.xn1} />.
          </p>
          
          <div className="bg-amber-50 border border-amber-200 p-3 sm:p-4 rounded-lg">
            <div className="flex items-start gap-2 sm:gap-3">
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-amber-900">
                  La pendiente de la secante aproxima la derivada:
                </p>
                <div className="mt-2 overflow-x-auto">
                  <BlockMath math={LATEX.slopeApprox} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orden de Convergencia - CORREGIDO A MODO CLARO */}
      <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-indigo-800 text-base sm:text-lg">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            Orden de Convergencia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
          <p className="text-slate-700 text-sm sm:text-base">
            El método de la secante tiene orden de convergencia{' '}
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300 text-xs">
              superlineal
            </Badge>
            :
          </p>
          <div className="bg-white border border-indigo-200 p-3 sm:p-4 rounded-lg text-center shadow-sm overflow-x-auto">
            <BlockMath math={LATEX.goldenRatio} />
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Donde <InlineMath math={LATEX.phi} /> es el <strong>número áureo</strong> (golden ratio).
          </p>
          
          <div className="bg-indigo-100/50 border border-indigo-200 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-indigo-800">
              <strong>Significado:</strong> El error asintótico satisface:
            </p>
            <div className="mt-2 text-center overflow-x-auto">
              <BlockMath math={LATEX.errorFormula} />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              donde <InlineMath math={LATEX.errorDef} /> es el error en la iteración <InlineMath math={LATEX.n} /> y <InlineMath math={LATEX.r} /> es la raíz.
            </p>
          </div>

          <div className="mt-4 sm:mt-6">
            <h4 className="text-indigo-700 font-semibold text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Comparación de Métodos
            </h4>
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <Table className="text-xs sm:text-sm">
                <TableHeader>
                  <TableRow className="border-indigo-200 hover:bg-indigo-50/50">
                    <TableHead className="text-slate-600 whitespace-nowrap">Método</TableHead>
                    <TableHead className="text-slate-600 whitespace-nowrap">Orden</TableHead>
                    <TableHead className="text-slate-600 whitespace-nowrap hidden sm:table-cell">Evaluaciones</TableHead>
                    <TableHead className="text-slate-600 whitespace-nowrap">Derivada</TableHead>
                    <TableHead className="text-slate-600 whitespace-nowrap hidden sm:table-cell">Garantía</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-indigo-100 hover:bg-indigo-50/30">
                    <TableCell className="text-slate-700 whitespace-nowrap">Bisección</TableCell>
                    <TableCell className="text-slate-700">1</TableCell>
                    <TableCell className="text-slate-600 hidden sm:table-cell">1/iter</TableCell>
                    <TableCell className="text-slate-600">No</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="bg-green-100 text-green-700 border border-green-200 text-[10px]">Garantizada</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-indigo-100 bg-amber-50/50 hover:bg-amber-100/50">
                    <TableCell className="text-amber-700 font-semibold whitespace-nowrap">Secante</TableCell>
                    <TableCell className="text-amber-700 font-semibold">≈1.618</TableCell>
                    <TableCell className="text-amber-600 hidden sm:table-cell">1/iter</TableCell>
                    <TableCell className="text-amber-600">No</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="bg-yellow-100 text-yellow-700 border border-yellow-200 text-[10px]">Local</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-indigo-100 hover:bg-indigo-50/30">
                    <TableCell className="text-slate-700 whitespace-nowrap">Newton</TableCell>
                    <TableCell className="text-slate-700">2</TableCell>
                    <TableCell className="text-slate-600 hidden sm:table-cell">f + f'/iter</TableCell>
                    <TableCell className="text-slate-600">Sí</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="bg-yellow-100 text-yellow-700 border border-yellow-200 text-[10px]">Local</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Criterios de Convergencia */}
      <Card className="border-teal-200 bg-teal-50/50">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-teal-800 text-base sm:text-lg">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
            Criterios de Convergencia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Los criterios de parada típicos son:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white border border-teal-200 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm font-medium text-teal-800 mb-2">Por diferencia absoluta:</p>
              <div className="text-center overflow-x-auto">
                <BlockMath math={LATEX.tolDiff} />
              </div>
            </div>
            <div className="bg-white border border-teal-200 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm font-medium text-teal-800 mb-2">Por valor de la función:</p>
              <div className="text-center overflow-x-auto">
                <BlockMath math={LATEX.tolFunc} />
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            En la práctica, se supervisan ambas cantidades y se fija un máximo de iteraciones como respaldo.
          </p>
        </CardContent>
      </Card>

      {/* Peligros y Estrategias */}
      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-orange-800 text-base sm:text-lg">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            Peligros y Estrategias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
          <div className="space-y-2 sm:space-y-3">
            <div className="bg-white border border-orange-200 rounded-lg p-3 sm:p-4">
              <p className="font-medium text-orange-800 flex items-center gap-2 text-sm sm:text-base">
                <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                División por cero
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Si <InlineMath math={LATEX.divZero} />, la secante es horizontal y la fórmula se indetermina.
              </p>
            </div>
            <div className="bg-white border border-orange-200 rounded-lg p-3 sm:p-4">
              <p className="font-medium text-orange-800 flex items-center gap-2 text-sm sm:text-base">
                <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                No convergencia
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Puede divergir si los puntos iniciales no están cerca de la raíz o si la raíz es múltiple.
              </p>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
            <p className="font-medium text-green-800 flex items-center gap-2 mb-2 text-sm sm:text-base">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Estrategias de mitigación
            </p>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Escoger <InlineMath math={LATEX.x0x1} /> donde <InlineMath math={LATEX.f} /> cambia de signo</li>
              <li>Combinar con bisección para garantizar convergencia inicial</li>
              <li>Limitar el número de iteraciones y detectar progreso</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Ventajas y Desventajas */}
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2 sm:pb-3 p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-green-700 text-sm sm:text-base">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              Ventajas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <ul className="space-y-2 sm:space-y-3">
              {[
                { icon: Calculator, text: 'No requiere calcular derivadas' },
                { icon: Percent, text: 'Una evaluación de f por iteración' },
                { icon: Zap, text: 'Más rápido que bisección' },
                { icon: Target, text: 'Fácil de implementar' },
                { icon: TrendingUp, text: 'Convergencia superlineal (φ ≈ 1.618)' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-green-800">
                  <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-2 sm:pb-3 p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-red-700 text-sm sm:text-base">
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              Desventajas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-red-800">
                <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 shrink-0" />
                No garantiza convergencia global
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-red-800">
                <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 shrink-0" />
                Sensible a valores iniciales
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-red-800">
                <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 shrink-0" />
                <span>Falla si <InlineMath math={LATEX.approxEqual} /></span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-red-800">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 shrink-0" />
                Más lento que Newton-Raphson
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-red-800">
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 shrink-0" />
                Requiere dos estimaciones iniciales
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Ejemplo Numérico */}
      <Card className="border-slate-200 bg-slate-50">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-slate-800 text-base sm:text-lg">
            <Code className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            Ejemplo Numérico
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
          <p className="text-slate-700 text-sm sm:text-base">
            Encontrar la raíz de <InlineMath math={LATEX.exampleFunc} /> con{' '}
            <InlineMath math={LATEX.exampleX0} /> y <InlineMath math={LATEX.exampleX1} />:
          </p>
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <Table className="text-xs sm:text-sm">
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-600">n</TableHead>
                  <TableHead className="text-slate-600"><InlineMath math={LATEX.xn} /></TableHead>
                  <TableHead className="text-slate-600"><InlineMath math={LATEX.diffFormula} /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { n: 0, x: '0.000000', diff: '—' },
                  { n: 1, x: '1.000000', diff: '1.000000' },
                  { n: 2, x: '1.538462', diff: '0.538462' },
                  { n: 3, x: '1.350311', diff: '0.188151' },
                  { n: 4, x: '1.367917', diff: '0.017606' },
                  { n: 5, x: '1.368813', diff: '0.000896' },
                  { n: 6, x: '1.368808', diff: '0.000005' },
                ].map((row, i) => (
                  <TableRow key={i} className={`border-slate-200 ${i === 6 ? 'bg-green-50' : 'hover:bg-slate-100/50'}`}>
                    <TableCell className={i === 6 ? 'text-green-700 font-semibold' : 'text-slate-700'}>{row.n}</TableCell>
                    <TableCell className={`font-mono ${i === 6 ? 'text-green-700 font-semibold' : 'text-slate-700'}`}>{row.x}</TableCell>
                    <TableCell className={`font-mono ${i === 6 ? 'text-green-700 font-semibold' : 'text-slate-600'}`}>{row.diff}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            La raíz aproximada es <InlineMath math={LATEX.result} /> después de 6 iteraciones.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
