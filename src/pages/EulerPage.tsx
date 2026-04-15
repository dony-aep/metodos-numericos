import { useMemo, useState } from 'react';
import { Calculator, Eraser, Play, Sigma } from 'lucide-react';
import { MethodEmptyState } from '@/components/shared/MethodEmptyState';
import { MethodModuleLayout } from '@/components/shared/MethodModuleLayout';
import { MethodResultBanner } from '@/components/shared/MethodResultBanner';
import { EulerHeader } from '@/components/topics/euler/Header';
import { EulerResults } from '@/components/topics/euler/EulerResults';
import { EulerTheory } from '@/components/topics/euler/EulerTheory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEuler } from '@/hooks/useEuler';

const EXAMPLE_SETS = [
  {
    label: 'y − x² + 1',
    expression: 'y - x^2 + 1',
    x0: '0',
    y0: '0.5',
    h: '0.2',
    steps: '10',
    exact: '(x+1)^2 - 0.5*exp(x)',
    desc: "y' = y − x² + 1, y(0)=0.5 (Burden & Faires)",
  },
  {
    label: 'x + y',
    expression: 'x + y',
    x0: '0',
    y0: '1',
    h: '0.1',
    steps: '10',
    exact: '2*exp(x) - x - 1',
    desc: "y' = x + y, y(0)=1",
  },
  {
    label: '−2xy',
    expression: '-2*x*y',
    x0: '0',
    y0: '1',
    h: '0.1',
    steps: '10',
    exact: 'exp(-x^2)',
    desc: "y' = −2xy, y(0)=1, exacta: e^{-x²}",
  },
];

const STEP_OPTIONS = [5, 10, 20, 50, 100];

export default function EulerPage() {
  const [expression, setExpression] = useState('y - x^2 + 1');
  const [x0Str, setX0Str] = useState('0');
  const [y0Str, setY0Str] = useState('0.5');
  const [hStr, setHStr] = useState('0.2');
  const [stepsStr, setStepsStr] = useState('10');
  const [exactStr, setExactStr] = useState('(x+1)^2 - 0.5*exp(x)');
  const [parseError, setParseError] = useState<string | null>(null);
  const { result, status, error, calculate, reset } = useEuler();

  const handleLoadExample = (ex: (typeof EXAMPLE_SETS)[number]) => {
    setExpression(ex.expression);
    setX0Str(ex.x0);
    setY0Str(ex.y0);
    setHStr(ex.h);
    setStepsStr(ex.steps);
    setExactStr(ex.exact);
    setParseError(null);
    reset();
  };

  const handleResetInputs = () => {
    setExpression('');
    setX0Str('');
    setY0Str('');
    setHStr('0.2');
    setStepsStr('10');
    setExactStr('');
    setParseError(null);
    reset();
  };

  const handleCalculate = () => {
    if (!expression.trim()) {
      setParseError('Ingresa una expresión para f(x, y).');
      return;
    }

    const x0 = Number.parseFloat(x0Str);
    if (!Number.isFinite(x0)) {
      setParseError('x₀ debe ser un número válido.');
      return;
    }

    const y0 = Number.parseFloat(y0Str);
    if (!Number.isFinite(y0)) {
      setParseError('y₀ debe ser un número válido.');
      return;
    }

    const h = Number.parseFloat(hStr);
    if (!Number.isFinite(h) || h <= 0) {
      setParseError('El paso h debe ser un número positivo.');
      return;
    }

    const steps = Number.parseInt(stepsStr, 10);
    if (!Number.isFinite(steps) || steps < 1) {
      setParseError('El número de pasos debe ser un entero positivo.');
      return;
    }

    setParseError(null);
    calculate({
      expression: expression.trim(),
      x0,
      y0,
      h,
      steps,
      exactExpression: exactStr.trim() || undefined,
    });
  };

  const resultsSection = useMemo(() => {
    if (!result) return undefined;
    return (
      <div className="space-y-4 sm:space-y-6">
        <MethodResultBanner variant="success" message={result.message} />
        <EulerResults result={result} />
      </div>
    );
  }, [result]);

  const emptyState =
    !result && status === 'idle' ? (
      <MethodEmptyState
        title="Listo para resolver"
        description="Ingresa la función f(x, y), las condiciones iniciales y el paso h para aproximar la solución del PVI con el método de Euler."
      />
    ) : null;

  return (
    <div className="space-y-4">
      <EulerHeader />
      <MethodModuleLayout
        labels={{
          calculatorTab: 'Calculadora',
          theoryTab: 'Teoría',
          inputSectionTitle: 'Método de Euler',
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
                  title={ex.desc}
                >
                  {ex.label}
                </Button>
              ))}
            </div>

            {/* Función f(x, y) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Función f(x, y)
              </label>
              <Input
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="Ej: y - x^2 + 1, x + y, -2*x*y"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Usa variables <span className="font-mono">x</span> e{' '}
                <span className="font-mono">y</span>. Soporta: ^ potencia,
                sin/cos/tan, exp, log (ln), sqrt, abs
              </p>
            </div>

            {/* Condiciones iniciales y parámetros */}
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  x₀
                </label>
                <Input
                  value={x0Str}
                  onChange={(e) => setX0Str(e.target.value)}
                  placeholder="0"
                  className="font-mono"
                  type="text"
                  inputMode="decimal"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  y₀
                </label>
                <Input
                  value={y0Str}
                  onChange={(e) => setY0Str(e.target.value)}
                  placeholder="0.5"
                  className="font-mono"
                  type="text"
                  inputMode="decimal"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Paso h
                </label>
                <Input
                  value={hStr}
                  onChange={(e) => setHStr(e.target.value)}
                  placeholder="0.2"
                  className="font-mono"
                  type="text"
                  inputMode="decimal"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  N° pasos
                </label>
                <Input
                  value={stepsStr}
                  onChange={(e) => setStepsStr(e.target.value)}
                  placeholder="10"
                  className="font-mono"
                  type="text"
                  inputMode="numeric"
                />
              </div>
            </div>

            {/* Selector rápido de pasos */}
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Selección rápida de pasos
              </p>
              <div className="flex flex-wrap gap-2">
                {STEP_OPTIONS.map((val) => (
                  <Button
                    key={val}
                    size="sm"
                    variant={stepsStr === String(val) ? 'default' : 'outline'}
                    onClick={() => setStepsStr(String(val))}
                  >
                    {val}
                  </Button>
                ))}
              </div>
            </div>

            {/* Solución exacta (opcional) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Solución exacta y(x){' '}
                <span className="text-muted-foreground">(opcional)</span>
              </label>
              <Input
                value={exactStr}
                onChange={(e) => setExactStr(e.target.value)}
                placeholder="Ej: (x+1)^2 - 0.5*exp(x)"
                className="font-mono"
                type="text"
              />
              <p className="text-xs text-muted-foreground">
                Si se proporciona, se calcula el error en cada paso. Expresión
                en función de <span className="font-mono">x</span>.
              </p>
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
                Resolver
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
        theorySection={<EulerTheory />}
      />
    </div>
  );
}
