import { useMemo, useState } from 'react';
import { Calculator, Eraser, Play, Sigma } from 'lucide-react';
import { MethodEmptyState } from '@/components/shared/MethodEmptyState';
import { MethodModuleLayout } from '@/components/shared/MethodModuleLayout';
import { MethodResultBanner } from '@/components/shared/MethodResultBanner';
import { LeastSquaresHeader } from '@/components/topics/minimos-cuadrados/Header';
import { InterpolationInputGrid } from '@/components/topics/interpolacion/InterpolationInputGrid';
import { LeastSquaresResults } from '@/components/topics/minimos-cuadrados/LeastSquaresResults';
import { LeastSquaresTheory } from '@/components/topics/minimos-cuadrados/LeastSquaresTheory';
import { Button } from '@/components/ui/button';
import { useLeastSquares } from '@/hooks/useLeastSquares';
import type { DataPoint } from '@/types/interpolation';

const DEFAULT_X = ['1', '2', '3', '4', '5'];
const DEFAULT_Y = ['2.2', '2.8', '3.6', '4.5', '5.1'];

const EXAMPLE_SETS: { label: string; x: string[]; y: string[] }[] = [
  {
    label: 'Lineal',
    x: ['1', '2', '3', '4', '5'],
    y: ['2.2', '2.8', '3.6', '4.5', '5.1'],
  },
  {
    label: 'Cuadrático',
    x: ['0', '1', '2', '3', '4', '5'],
    y: ['1', '1.8', '5.1', '10.2', '17.5', '26.1'],
  },
  {
    label: 'Ruidoso',
    x: ['1', '2', '3', '4', '5', '6', '7', '8'],
    y: ['2.1', '3.9', '6.2', '7.8', '10.3', '11.9', '14.1', '16.2'],
  },
];

const DEGREE_OPTIONS = [
  { value: 1, label: 'Lineal (grado 1)' },
  { value: 2, label: 'Cuadrático (grado 2)' },
  { value: 3, label: 'Cúbico (grado 3)' },
  { value: 4, label: 'Grado 4' },
  { value: 5, label: 'Grado 5' },
];

export default function LeastSquaresPage() {
  const [xValues, setXValues] = useState<string[]>(DEFAULT_X);
  const [yValues, setYValues] = useState<string[]>(DEFAULT_Y);
  const [degree, setDegree] = useState(1);
  const [parseError, setParseError] = useState<string | null>(null);
  const { result, status, error, calculate, reset } = useLeastSquares();

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
    setDegree(1);
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

    if (points.length <= degree) {
      setParseError(
        `Se necesitan al menos ${degree + 1} puntos para un ajuste de grado ${degree}.`
      );
      return;
    }

    setParseError(null);
    calculate({ points, degree });
  };

  const parsedPoints = useMemo((): DataPoint[] => {
    return xValues
      .map((xStr, i) => ({
        x: Number.parseFloat(xStr),
        y: Number.parseFloat(yValues[i]),
      }))
      .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
  }, [xValues, yValues]);

  const resultsSection = useMemo(() => {
    if (!result) return undefined;

    return (
      <div className="space-y-4 sm:space-y-6">
        <MethodResultBanner variant="success" message={result.message} />
        <LeastSquaresResults result={result} points={parsedPoints} />
      </div>
    );
  }, [result, parsedPoints]);

  const emptyState =
    !result && status === 'idle' ? (
      <MethodEmptyState
        title="Listo para ajustar"
        description="Ingresa los puntos (x, y) y selecciona el grado del polinomio para encontrar la curva de mejor ajuste."
      />
    ) : null;

  return (
    <div className="space-y-4">
      <LeastSquaresHeader />
      <MethodModuleLayout
        labels={{
          calculatorTab: 'Calculadora',
          theoryTab: 'Teoría',
          inputSectionTitle: 'Ajuste por Mínimos Cuadrados',
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

            {/* Grado del polinomio */}
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Grado del polinomio
              </p>
              <div className="flex flex-wrap gap-2">
                {DEGREE_OPTIONS.map((opt) => (
                  <Button
                    key={opt.value}
                    size="sm"
                    variant={degree === opt.value ? 'default' : 'outline'}
                    onClick={() => setDegree(opt.value)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
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
                Ajustar
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
        theorySection={<LeastSquaresTheory />}
      />
    </div>
  );
}
