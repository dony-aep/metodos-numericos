import { useMemo, useState } from 'react';
import { Calculator, Eraser, Play, Sigma } from 'lucide-react';
import { MethodEmptyState } from '@/components/shared/MethodEmptyState';
import { MethodModuleLayout } from '@/components/shared/MethodModuleLayout';
import { MethodResultBanner } from '@/components/shared/MethodResultBanner';
import { LagrangeHeader } from '@/components/topics/lagrange/Header';
import { InterpolationInputGrid } from '@/components/topics/interpolacion/InterpolationInputGrid';
import { LagrangeResults } from '@/components/topics/lagrange/LagrangeResults';
import { LagrangeTheory } from '@/components/topics/lagrange/LagrangeTheory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLagrange } from '@/hooks/useLagrange';
import type { DataPoint } from '@/types/interpolation';

const DEFAULT_X = ['1', '2', '3'];
const DEFAULT_Y = ['1', '4', '9'];

const EXAMPLE_SETS: { label: string; x: string[]; y: string[] }[] = [
  { label: 'x²', x: ['1', '2', '3'], y: ['1', '4', '9'] },
  {
    label: 'sen(x)',
    x: ['0', '1.57', '3.14', '4.71', '6.28'],
    y: ['0', '1', '0', '-1', '0'],
  },
  {
    label: '1/x',
    x: ['1', '2', '4', '8'],
    y: ['1', '0.5', '0.25', '0.125'],
  },
];

export default function LagrangePage() {
  const [xValues, setXValues] = useState<string[]>(DEFAULT_X);
  const [yValues, setYValues] = useState<string[]>(DEFAULT_Y);
  const [evalAt, setEvalAt] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);
  const { result, status, error, calculate, reset } = useLagrange();

  const handleXChange = (index: number, value: string) => {
    setXValues((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  const handleYChange = (index: number, value: string) => {
    setYValues((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  const handleAddPoint = () => {
    setXValues((prev) => [...prev, '']);
    setYValues((prev) => [...prev, '']);
  };

  const handleRemovePoint = (index: number) => {
    setXValues((prev) => prev.filter((_, i) => i !== index));
    setYValues((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLoadExample = (example: (typeof EXAMPLE_SETS)[number]) => {
    setXValues([...example.x]);
    setYValues([...example.y]);
    setParseError(null);
    reset();
  };

  const handleResetInputs = () => {
    setXValues(['', '', '']);
    setYValues(['', '', '']);
    setEvalAt('');
    setParseError(null);
    reset();
  };

  const handleCalculate = () => {
    const points: DataPoint[] = [];

    for (let i = 0; i < xValues.length; i++) {
      const x = Number.parseFloat(xValues[i]);
      const y = Number.parseFloat(yValues[i]);
      if (!Number.isFinite(x)) {
        setParseError(`Valor de x inválido en el punto ${i + 1}.`);
        return;
      }
      if (!Number.isFinite(y)) {
        setParseError(`Valor de y inválido en el punto ${i + 1}.`);
        return;
      }
      points.push({ x, y });
    }

    const evaluateAt = evalAt.trim()
      ? Number.parseFloat(evalAt)
      : undefined;
    if (evalAt.trim() && !Number.isFinite(evaluateAt)) {
      setParseError('El valor de evaluación debe ser numérico.');
      return;
    }

    setParseError(null);
    calculate({ points, evaluateAt });
  };

  const resultsSection = useMemo(() => {
    if (!result) return undefined;

    return (
      <div className="space-y-4 sm:space-y-6">
        <MethodResultBanner variant="success" message={result.message} />
        <LagrangeResults result={result} />
      </div>
    );
  }, [result]);

  const emptyState =
    !result && status === 'idle' ? (
      <MethodEmptyState
        title="Listo para interpolar"
        description="Ingresa los puntos (x, y) y opcionalmente un valor a evaluar para construir el polinomio de Lagrange."
      />
    ) : null;

  return (
    <div className="space-y-4">
      <LagrangeHeader />
      <MethodModuleLayout
        labels={{
          calculatorTab: 'Calculadora',
          theoryTab: 'Teoría',
          inputSectionTitle: 'Interpolación de Lagrange',
        }}
        calculatorIcon={<Calculator className="h-4 w-4 sm:h-5 sm:w-5" />}
        theoryIcon={<Sigma className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        inputSection={
          <div className="space-y-4">
            {/* Ejemplos rápidos */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                Ejemplos:
              </span>
              {EXAMPLE_SETS.map((ex) => (
                <Button
                  key={ex.label}
                  size="sm"
                  variant="secondary"
                  onClick={() => handleLoadExample(ex)}
                >
                  {ex.label}
                </Button>
              ))}
            </div>

            {/* Grid de puntos */}
            <InterpolationInputGrid
              xValues={xValues}
              yValues={yValues}
              onXChange={handleXChange}
              onYChange={handleYChange}
              onAddPoint={handleAddPoint}
              onRemovePoint={handleRemovePoint}
            />

            {/* Evaluar en un punto */}
            <div className="flex flex-wrap items-end gap-3 rounded-lg border border-border bg-muted/20 p-3">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Evaluar P(x) en
                </label>
                <Input
                  value={evalAt}
                  onChange={(e) => setEvalAt(e.target.value)}
                  className="h-9 w-32 font-mono text-sm"
                  placeholder="ej: 2.5"
                />
              </div>
              <p className="pb-2 text-xs text-muted-foreground">(opcional)</p>
            </div>

            {parseError ? (
              <p className="text-sm text-destructive">{parseError}</p>
            ) : null}

            {/* Botones */}
            <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row sm:gap-3">
              <Button
                onClick={handleCalculate}
                disabled={status === 'calculating'}
                size="lg"
                className="w-full gap-2 sm:w-auto"
              >
                <Play className="h-4 w-4" />
                Interpolar
              </Button>
              <Button
                variant="outline"
                onClick={handleResetInputs}
                className="w-full gap-2 sm:w-auto"
              >
                <Eraser className="h-4 w-4" />
                Limpiar
              </Button>
            </div>

            {status === 'error' && error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : null}
          </div>
        }
        resultsSection={resultsSection}
        emptyState={emptyState}
        theorySection={<LagrangeTheory />}
      />
    </div>
  );
}
