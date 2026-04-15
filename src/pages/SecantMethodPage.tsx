import { useState } from 'react';
import { BarChart3, Eraser, Loader2, Play } from 'lucide-react';
import { MethodEmptyState } from '@/components/shared/MethodEmptyState';
import { MethodModuleLayout } from '@/components/shared/MethodModuleLayout';
import { MethodResultBanner } from '@/components/shared/MethodResultBanner';
import { AlgorithmExplanation } from '@/components/topics/secante/AlgorithmExplanation';
import { ConvergencePlot } from '@/components/topics/secante/ConvergencePlot';
import { FunctionInput } from '@/components/topics/secante/FunctionInput';
import { FunctionPlot } from '@/components/topics/secante/FunctionPlot';
import { Header } from '@/components/topics/secante/Header';
import { InitialValuesForm } from '@/components/topics/secante/InitialValuesForm';
import { IterationTable } from '@/components/topics/secante/IterationTable';
import { Button } from '@/components/ui/button';
import { useSecantMethod } from '@/hooks/useSecantMethod';

function SecantMethodPage() {
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

  const inputSection = (
    <>
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

      <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row sm:gap-3">
        <Button
          onClick={handleCalculate}
          disabled={status === 'calculating' || !functionExpr}
          size="lg"
          className="h-11 w-full gap-2 text-sm sm:h-12 sm:w-auto sm:text-base"
        >
          {status === 'calculating' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Calculando...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Calcular
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="h-10 w-full gap-2 text-sm sm:h-11 sm:w-auto"
        >
          <Eraser className="h-4 w-4" />
          Limpiar
        </Button>
      </div>
    </>
  );

  const resultsSection = result ? (
    <div className="space-y-4 sm:space-y-6">
      <MethodResultBanner
        variant={result.converged ? 'success' : 'warning'}
        message={result.message}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:gap-6">
        <FunctionPlot
          functionExpr={functionExpr}
          iterations={result.iterations}
          x0={parseFloat(x0) || 0}
          x1={parseFloat(x1) || 1}
          root={result.root}
        />
        <ConvergencePlot iterations={result.iterations} />
      </div>

      <IterationTable
        iterations={result.iterations}
        root={result.root}
        converged={result.converged}
      />
    </div>
  ) : undefined;

  const emptyState =
    !result && status === 'idle' ? (
      <MethodEmptyState
        title="Listo para calcular"
        description='Ingresa una función y los valores iniciales, luego presiona "Calcular" para encontrar la raíz usando el método de la secante.'
      />
    ) : undefined;

  return (
    <div className="space-y-4">
      <Header />

      <MethodModuleLayout
        labels={{
          calculatorTab: 'Calculadora',
          theoryTab: 'Teoría',
          inputSectionTitle: 'Parámetros de Entrada',
        }}
        calculatorIcon={<BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />}
        inputSection={inputSection}
        resultsSection={resultsSection}
        emptyState={emptyState}
        theorySection={<AlgorithmExplanation />}
      />
    </div>
  );
}

export default SecantMethodPage;
