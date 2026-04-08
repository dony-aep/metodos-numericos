import { useState } from 'react';
import { Header } from './components/Header';
import { FunctionInput } from './components/FunctionInput';
import { InitialValuesForm } from './components/InitialValuesForm';
import { IterationTable } from './components/IterationTable';
import { FunctionPlot } from './components/FunctionPlot';
import { ConvergencePlot } from './components/ConvergencePlot';
import { AlgorithmExplanation } from './components/AlgorithmExplanation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSecantMethod } from './hooks/useSecantMethod';
import { 
  Calculator, 
  BookOpen, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  BarChart3
} from 'lucide-react';

function App() {
  const [functionExpr, setFunctionExpr] = useState('x^3 + 2*x^2 + 10*x - 20');
  const [x0, setX0] = useState('0');
  const [x1, setX1] = useState('1');
  const [tolerance, setTolerance] = useState('1e-6');
  const [maxIterations, setMaxIterations] = useState('100');

  const { result, status, error, calculate, reset } = useSecantMethod();

  const handleCalculate = () => {
    calculate({
      fn: functionExpr,
      x0: parseFloat(x0) || 0,
      x1: parseFloat(x1) || 1,
      tolerance: parseFloat(tolerance) || 1e-6,
      maxIterations: parseInt(maxIterations) || 100,
    });
  };

  const handleReset = () => {
    reset();
    setFunctionExpr('');
    setX0('0');
    setX1('1');
    setTolerance('1e-6');
    setMaxIterations('100');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <Tabs defaultValue="calculator" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full max-w-xs sm:max-w-md grid-cols-2 mx-auto h-10 sm:h-11">
            <TabsTrigger value="calculator" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Calculadora
            </TabsTrigger>
            <TabsTrigger value="theory" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Teoría
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-4 sm:space-y-6">
            {/* Input Section */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  Parámetros de Entrada
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
                <FunctionInput
                  value={functionExpr}
                  onChange={setFunctionExpr}
                  error={status === 'error' ? error || undefined : undefined}
                />

                <InitialValuesForm
                  x0={x0}
                  x1={x1}
                  tolerance={tolerance}
                  maxIterations={maxIterations}
                  onX0Change={setX0}
                  onX1Change={setX1}
                  onToleranceChange={setTolerance}
                  onMaxIterationsChange={setMaxIterations}
                />

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t">
                  <Button
                    onClick={handleCalculate}
                    disabled={status === 'calculating' || !functionExpr}
                    size="lg"
                    className="gap-2 w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base"
                  >
                    {status === 'calculating' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Calculando...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Calcular
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleReset} 
                    className="gap-2 w-full sm:w-auto h-10 sm:h-11 text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reiniciar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            {result && (
              <>
                {/* Status Banner */}
                <div className={`
                  p-3 sm:p-4 rounded-lg border-2 flex items-center gap-3 sm:gap-4
                  ${result.converged 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-amber-50 border-amber-200'
                  }
                `}>
                  {result.converged ? (
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
                  )}
                  <p className={`font-medium text-sm sm:text-base ${result.converged ? 'text-green-800' : 'text-amber-800'}`}>
                    {result.message}
                  </p>
                </div>

                {/* Plots Grid - Una columna, dos filas para mejor visualización */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  <FunctionPlot
                    functionExpr={functionExpr}
                    iterations={result.iterations}
                    x0={parseFloat(x0) || 0}
                    x1={parseFloat(x1) || 1}
                    root={result.root}
                  />
                  <ConvergencePlot iterations={result.iterations} />
                </div>

                {/* Iterations Table */}
                <IterationTable
                  iterations={result.iterations}
                  root={result.root}
                  converged={result.converged}
                />
              </>
            )}

            {/* Empty State */}
            {!result && status === 'idle' && (
              <Card className="bg-muted/30">
                <CardContent className="py-10 sm:py-16 text-center px-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-muted flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                    Listo para calcular
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
                    Ingresa una función y los valores iniciales, luego presiona "Calcular" 
                    para encontrar la raíz usando el método de la secante.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="theory">
            <AlgorithmExplanation />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 py-6 sm:py-8 mt-8 sm:mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-1.5 sm:space-y-2">
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Método de la Secante — Herramienta de Análisis Numérico
          </p>
          <p className="text-[10px] sm:text-xs text-slate-500">
            Construido con React, TypeScript, Vite, shadcn/ui, Tailwind CSS, ECharts y KaTeX
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
