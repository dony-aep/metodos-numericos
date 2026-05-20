import { useMemo, useState } from 'react';
import { Calculator, Eraser, Play, Sigma } from 'lucide-react';
import { MethodEmptyState } from '@/components/shared/MethodEmptyState';
import { MethodModuleLayout } from '@/components/shared/MethodModuleLayout';
import { MethodResultBanner } from '@/components/shared/MethodResultBanner';
import { BisectionHeader } from '@/components/topics/biseccion/Header';
import { BisectionResults } from '@/components/topics/biseccion/BisectionResults';
import { BisectionTheory } from '@/components/topics/biseccion/BisectionTheory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBisection } from '@/hooks/useBisection';

const EXAMPLES = [
  { label: 'x³+4x²−10', expression: 'x^3 + 4*x^2 - 10', a: '1', b: '2' },
  { label: 'cos(x)−x', expression: 'cos(x) - x', a: '0', b: '1' },
  { label: 'e⁻ˣ−x', expression: 'exp(-x) - x', a: '0', b: '1' },
  { label: 'x³−x−2', expression: 'x^3 - x - 2', a: '1', b: '2' },
];

export default function BisectionPage() {
  const [expression, setExpression] = useState('x^3 + 4*x^2 - 10');
  const [aStr, setAStr] = useState('1');
  const [bStr, setBStr] = useState('2');
  const [tolStr, setTolStr] = useState('1e-6');
  const [maxIterStr, setMaxIterStr] = useState('100');
  const [parseError, setParseError] = useState<string | null>(null);

  const { result, status, error, calculate, reset } = useBisection();

  const handleLoadExample = (ex: (typeof EXAMPLES)[number]) => {
    setExpression(ex.expression);
    setAStr(ex.a);
    setBStr(ex.b);
    setParseError(null);
    reset();
  };

  const handleReset = () => {
    setExpression('');
    setAStr('');
    setBStr('');
    setParseError(null);
    reset();
  };

  const handleCalculate = () => {
    setParseError(null);
    if (!expression.trim()) { setParseError('Ingresa una expresión f(x).'); return; }

    const a = Number.parseFloat(aStr);
    const b = Number.parseFloat(bStr);
    const tol = Number.parseFloat(tolStr);
    const maxIter = Number.parseInt(maxIterStr, 10);

    if (!Number.isFinite(a) || !Number.isFinite(b)) { setParseError('a y b deben ser numéricos.'); return; }
    if (a >= b) { setParseError('a debe ser menor que b.'); return; }
    if (!Number.isFinite(tol) || tol <= 0) { setParseError('La tolerancia debe ser positiva.'); return; }
    if (!Number.isFinite(maxIter) || maxIter < 1) { setParseError('Máximo de iteraciones inválido.'); return; }

    calculate({ expression: expression.trim(), a, b, tolerance: tol, maxIterations: maxIter });
  };

  const resultsSection = useMemo(() => {
    if (!result) return undefined;
    return (
      <div className="space-y-4 sm:space-y-6">
        <MethodResultBanner variant={result.converged ? 'success' : 'warning'} message={result.message} />
        <BisectionResults result={result} />
      </div>
    );
  }, [result]);

  const emptyState =
    !result && status === 'idle' ? (
      <MethodEmptyState
        title="Listo para calcular"
        description="Ingresa una función f(x) y un intervalo [a, b] donde exista cambio de signo para encontrar la raíz por bisección."
      />
    ) : null;

  return (
    <div className="space-y-4">
      <BisectionHeader />
      <MethodModuleLayout
        labels={{ calculatorTab: 'Calculadora', theoryTab: 'Teoría', inputSectionTitle: 'Método de Bisección' }}
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
              <Input value={expression} onChange={(e) => setExpression(e.target.value)} placeholder="Ej: x^3 + 4*x^2 - 10" className="font-mono" />
              <p className="text-xs text-muted-foreground">Soporta: ^ potencia, sin/cos/tan, exp, log (ln), sqrt, abs</p>
            </div>

            {/* Interval and params */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">a (extremo izquierdo)</label>
                <Input value={aStr} onChange={(e) => setAStr(e.target.value)} placeholder="1" className="font-mono" inputMode="decimal" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">b (extremo derecho)</label>
                <Input value={bStr} onChange={(e) => setBStr(e.target.value)} placeholder="2" className="font-mono" inputMode="decimal" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tolerancia</label>
                <Input value={tolStr} onChange={(e) => setTolStr(e.target.value)} placeholder="1e-6" className="font-mono" />
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
        resultsSection={resultsSection}
        emptyState={emptyState}
        theorySection={<BisectionTheory />}
      />
    </div>
  );
}
