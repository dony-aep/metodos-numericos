import { useMemo, useState } from 'react';
import { Calculator, Eraser, Play, Sigma } from 'lucide-react';
import { MethodEmptyState } from '@/components/shared/MethodEmptyState';
import { MethodModuleLayout } from '@/components/shared/MethodModuleLayout';
import { MethodResultBanner } from '@/components/shared/MethodResultBanner';
import { NonlinearHeader } from '@/components/topics/ecuaciones-no-lineales/Header';
import { NonlinearResults } from '@/components/topics/ecuaciones-no-lineales/NonlinearResults';
import { NonlinearTheory } from '@/components/topics/ecuaciones-no-lineales/NonlinearTheory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNonlinear } from '@/hooks/useNonlinear';
import type { NonlinearInput, NonlinearMethod } from '@/types/nonlinear';

const EXAMPLES = [
  { label: 'x³−x−2', expression: 'x^3 - x - 2', derivative: '3*x^2 - 1', a: '1', b: '2', x0: '1.5', x1: '2' },
  { label: 'cos(x)−x', expression: 'cos(x) - x', derivative: '-sin(x) - 1', a: '0', b: '1', x0: '0.5', x1: '1' },
  { label: 'e⁻ˣ−x', expression: 'exp(-x) - x', derivative: '-exp(-x) - 1', a: '0', b: '1', x0: '0.5', x1: '1' },
];

export default function NonlinearPage() {
  const [expression, setExpression] = useState('x^3 - x - 2');
  const [derivative, setDerivative] = useState('3*x^2 - 1');
  const [aStr, setAStr] = useState('1');
  const [bStr, setBStr] = useState('2');
  const [x0Str, setX0Str] = useState('1.5');
  const [x1Str, setX1Str] = useState('2');
  const [tolStr, setTolStr] = useState('1e-8');
  const [maxIterStr, setMaxIterStr] = useState('100');
  const [methods, setMethods] = useState<NonlinearMethod[]>(['bisection', 'newton', 'secant']);
  const [parseError, setParseError] = useState<string | null>(null);

  const { comparison, status, error, calculate, reset } = useNonlinear();

  const toggleMethod = (m: NonlinearMethod) => {
    setMethods((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);
  };

  const handleLoadExample = (ex: (typeof EXAMPLES)[number]) => {
    setExpression(ex.expression);
    setDerivative(ex.derivative);
    setAStr(ex.a);
    setBStr(ex.b);
    setX0Str(ex.x0);
    setX1Str(ex.x1);
    setParseError(null);
    reset();
  };

  const handleReset = () => {
    setExpression('');
    setDerivative('');
    setAStr('');
    setBStr('');
    setX0Str('');
    setX1Str('');
    setParseError(null);
    reset();
  };

  const handleCalculate = () => {
    setParseError(null);
    if (!expression.trim()) { setParseError('Ingresa una expresión f(x).'); return; }
    if (methods.length === 0) { setParseError('Selecciona al menos un método.'); return; }

    const tol = Number.parseFloat(tolStr);
    const maxIter = Number.parseInt(maxIterStr, 10);
    if (!Number.isFinite(tol) || tol <= 0) { setParseError('La tolerancia debe ser positiva.'); return; }
    if (!Number.isFinite(maxIter) || maxIter < 1) { setParseError('Máximo de iteraciones inválido.'); return; }

    const inputs: NonlinearInput[] = [];

    for (const m of methods) {
      if (m === 'bisection') {
        const a = Number.parseFloat(aStr);
        const b = Number.parseFloat(bStr);
        if (!Number.isFinite(a) || !Number.isFinite(b)) { setParseError('a y b deben ser numéricos para bisección.'); return; }
        inputs.push({ expression: expression.trim(), method: m, a, b, tolerance: tol, maxIterations: maxIter });
      } else if (m === 'newton') {
        const x0 = Number.parseFloat(x0Str);
        if (!Number.isFinite(x0)) { setParseError('x₀ debe ser numérico para Newton.'); return; }
        inputs.push({ expression: expression.trim(), derivative: derivative.trim() || undefined, method: m, x0, tolerance: tol, maxIterations: maxIter });
      } else {
        const x0 = Number.parseFloat(x0Str);
        const x1 = Number.parseFloat(x1Str);
        if (!Number.isFinite(x0) || !Number.isFinite(x1)) { setParseError('x₀ y x₁ deben ser numéricos para secante.'); return; }
        inputs.push({ expression: expression.trim(), method: m, x0, x1, tolerance: tol, maxIterations: maxIter });
      }
    }

    calculate(inputs);
  };

  const resultsSection = useMemo(() => {
    if (!comparison) return undefined;
    const allConverged = comparison.results.every((r) => r.converged);
    const msg = allConverged
      ? 'Todos los métodos convergieron exitosamente.'
      : 'Algunos métodos no convergieron.';
    return (
      <div className="space-y-4 sm:space-y-6">
        <MethodResultBanner variant={allConverged ? 'success' : 'warning'} message={msg} />
        <NonlinearResults comparison={comparison} />
      </div>
    );
  }, [comparison]);

  const emptyState =
    !comparison && status === 'idle' ? (
      <MethodEmptyState
        title="Listo para resolver"
        description="Ingresa una función f(x), selecciona los métodos a comparar y define los parámetros iniciales."
      />
    ) : null;

  return (
    <div className="space-y-4">
      <NonlinearHeader />
      <MethodModuleLayout
        labels={{ calculatorTab: 'Calculadora', theoryTab: 'Teoría', inputSectionTitle: 'Ecuaciones No Lineales' }}
        calculatorIcon={<Calculator className="h-4 w-4 sm:h-5 sm:w-5" />}
        theoryIcon={<Sigma className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
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

            {/* Function */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Función f(x)</label>
              <Input value={expression} onChange={(e) => setExpression(e.target.value)} placeholder="Ej: x^3 - x - 2" className="font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                f'(x) <span className="text-muted-foreground">(opcional, para Newton)</span>
              </label>
              <Input value={derivative} onChange={(e) => setDerivative(e.target.value)} placeholder="Ej: 3*x^2 - 1" className="font-mono" />
            </div>

            {/* Method selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Métodos a comparar</label>
              <div className="flex flex-wrap gap-2">
                {([['bisection', 'Bisección'], ['newton', 'Newton-Raphson'], ['secant', 'Secante']] as const).map(([key, label]) => (
                  <Button
                    key={key}
                    size="sm"
                    variant={methods.includes(key) ? 'default' : 'outline'}
                    onClick={() => toggleMethod(key)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Parameters */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">a (bisección)</label>
                <Input value={aStr} onChange={(e) => setAStr(e.target.value)} placeholder="1" className="font-mono" inputMode="decimal" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">b (bisección)</label>
                <Input value={bStr} onChange={(e) => setBStr(e.target.value)} placeholder="2" className="font-mono" inputMode="decimal" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">x₀</label>
                <Input value={x0Str} onChange={(e) => setX0Str(e.target.value)} placeholder="1.5" className="font-mono" inputMode="decimal" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">x₁ (secante)</label>
                <Input value={x1Str} onChange={(e) => setX1Str(e.target.value)} placeholder="2" className="font-mono" inputMode="decimal" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
                Comparar métodos
              </Button>
              <Button variant="outline" onClick={handleReset} className="w-full gap-2 sm:w-auto">
                <Eraser className="h-4 w-4" />
                Limpiar
              </Button>
            </div>

            {status === 'error' && error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        }
        resultsSection={resultsSection}
        emptyState={emptyState}
        theorySection={<NonlinearTheory />}
      />
    </div>
  );
}
