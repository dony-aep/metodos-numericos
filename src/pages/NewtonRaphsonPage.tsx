import { useMemo, useState } from 'react';
import { Eraser, Play } from 'lucide-react';
import { MethodEmptyState } from '@/components/shared/MethodEmptyState';
import { MethodModuleLayout } from '@/components/shared/MethodModuleLayout';
import { MethodResultBanner } from '@/components/shared/MethodResultBanner';
import {
  NewtonRaphsonPlots,
  NewtonRaphsonReadout,
  NewtonRaphsonTable,
} from '@/components/topics/newton-raphson/NewtonRaphsonResults';
import { NewtonRaphsonTheory } from '@/components/topics/newton-raphson/NewtonRaphsonTheory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNewtonRaphson } from '@/hooks/useNewtonRaphson';

const EXAMPLES = [
  { label: 'x²−2 (√2)', expression: 'x^2 - 2', derivative: '2*x', x0: '1' },
  { label: 'x³−x−2', expression: 'x^3 - x - 2', derivative: '3*x^2 - 1', x0: '1.5' },
  { label: 'cos(x)−x', expression: 'cos(x) - x', derivative: '-sin(x) - 1', x0: '0.5' },
  { label: 'eˣ−3x', expression: 'exp(x) - 3*x', derivative: 'exp(x) - 3', x0: '1' },
];

export default function NewtonRaphsonPage() {
  const [expression, setExpression] = useState('x^2 - 2');
  const [derivative, setDerivative] = useState('2*x');
  const [x0Str, setX0Str] = useState('1');
  const [tolStr, setTolStr] = useState('1e-8');
  const [maxIterStr, setMaxIterStr] = useState('100');
  const [parseError, setParseError] = useState<string | null>(null);

  const { result, status, error, calculate, reset } = useNewtonRaphson();

  const handleLoadExample = (ex: (typeof EXAMPLES)[number]) => {
    setExpression(ex.expression);
    setDerivative(ex.derivative);
    setX0Str(ex.x0);
    setParseError(null);
    reset();
  };

  const handleReset = () => {
    setExpression('');
    setDerivative('');
    setX0Str('');
    setParseError(null);
    reset();
  };

  const handleLoadPitfall = (example: Record<string, string>) => {
    setExpression(example.expression);
    setDerivative(example.derivative);
    setX0Str(example.x0);
    setParseError(null);
    reset();
  };

  const handleCalculate = () => {
    setParseError(null);
    if (!expression.trim()) { setParseError('Ingresa una expresión f(x).'); return; }

    const x0 = Number.parseFloat(x0Str);
    const tol = Number.parseFloat(tolStr);
    const maxIter = Number.parseInt(maxIterStr, 10);

    if (!Number.isFinite(x0)) { setParseError('x₀ debe ser un número válido.'); return; }
    if (!Number.isFinite(tol) || tol <= 0) { setParseError('La tolerancia debe ser positiva.'); return; }
    if (!Number.isFinite(maxIter) || maxIter < 1) { setParseError('Máximo de iteraciones inválido.'); return; }

    calculate({ expression: expression.trim(), derivative: derivative.trim(), x0, tolerance: tol, maxIterations: maxIter });
  };

  const resultSections = useMemo(() => {
    if (!result) return undefined;
    return [
      {
        label: 'Lectura',
        content: (
          <div className="space-y-6">
            <MethodResultBanner
              variant={result.converged ? 'success' : 'warning'}
              message={result.message}
            />
            <NewtonRaphsonReadout result={result} />
          </div>
        ),
      },
      {
        label: 'Traza',
        note: 'Cada iteración sigue la tangente hasta cortar el eje.',
        content: <NewtonRaphsonPlots result={result} />,
      },
      {
        label: 'Iteraciones',
        note: 'La barra del error cae en picado: cerca de la raíz, Newton dobla los dígitos correctos en cada paso.',
        content: <NewtonRaphsonTable result={result} />,
      },
    ];
  }, [result]);

  const emptyState =
    !result && status === 'idle' ? (
      <MethodEmptyState
        title="Listo para calcular"
        description="Ingresa f(x), su derivada f'(x) y un valor inicial x₀ para aproximar la raíz por Newton-Raphson."
      />
    ) : null;

  return (
    <MethodModuleLayout
        onLoadPitfall={handleLoadPitfall}
        slug="newton-raphson"
        inputSection={
          <div className="space-y-4">
            {/* Examples */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-foreground">Ejemplos:</span>
              {EXAMPLES.map((ex) => (
                <Button key={ex.label} size="sm" variant="secondary" onClick={() => handleLoadExample(ex)}>
                  {ex.label}
                </Button>
              ))}
            </div>

            {/* Function and derivative */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Función f(x)</label>
              <Input value={expression} onChange={(e) => setExpression(e.target.value)} placeholder="Ej: x^2 - 2" className="font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Derivada f'(x) <span className="text-muted-foreground">(vacío = numérica)</span>
              </label>
              <Input value={derivative} onChange={(e) => setDerivative(e.target.value)} placeholder="Ej: 2*x" className="font-mono" />
              <p className="text-xs text-muted-foreground">Si se deja vacío, se calcula numéricamente por diferencias centradas.</p>
            </div>

            {/* Parameters */}
            <div className="grid gap-4 @xs:grid-cols-2 @2xl:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">x₀ (valor inicial)</label>
                <Input value={x0Str} onChange={(e) => setX0Str(e.target.value)} placeholder="1" className="font-mono" inputMode="decimal" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tolerancia</label>
                <Input value={tolStr} onChange={(e) => setTolStr(e.target.value)} placeholder="1e-8" className="font-mono" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Máx. iteraciones</label>
                <Input value={maxIterStr} onChange={(e) => setMaxIterStr(e.target.value)} placeholder="100" className="font-mono" inputMode="numeric" />
              </div>
            </div>

            {parseError && <p className="text-sm text-destructive">{parseError}</p>}

            <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row sm:gap-3">
              <Button onClick={handleCalculate} disabled={status === 'calculating'} size="lg" className="w-full gap-2 sm:w-auto">
                <Play className="h-4 w-4" />
                Calcular
              </Button>
              <Button variant="outline" onClick={handleReset} className="w-full gap-2 sm:w-auto">
                <Eraser className="h-4 w-4" />
                Limpiar
              </Button>
            </div>

            {status === 'error' && error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        }
        resultSections={resultSections}
        emptyState={emptyState}
        theorySection={<NewtonRaphsonTheory />}
      />
  );
}
