import { useMemo, useState } from 'react';
import { Calculator, Eraser, Play, Sigma } from 'lucide-react';
import { MethodEmptyState } from '@/components/shared/MethodEmptyState';
import { MethodModuleLayout } from '@/components/shared/MethodModuleLayout';
import { MethodResultBanner } from '@/components/shared/MethodResultBanner';
import { NumericalIntegrationHeader } from '@/components/topics/integracion-numerica/Header';
import { NumericalIntegrationResults } from '@/components/topics/integracion-numerica/NumericalIntegrationResults';
import { NumericalIntegrationTheory } from '@/components/topics/integracion-numerica/NumericalIntegrationTheory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNumericalIntegration } from '@/hooks/useNumericalIntegration';

const EXAMPLE_SETS = [
  {
    label: 'x² + 1',
    expression: 'x^2 + 1',
    a: '0',
    b: '2',
    n: '4',
    exact: String(14 / 3),
    desc: '∫₀² (x²+1)dx = 14/3',
  },
  {
    label: 'sin(x)',
    expression: 'sin(x)',
    a: '0',
    b: String(Math.PI),
    n: '10',
    exact: '2',
    desc: '∫₀ᵖⁱ sin(x)dx = 2',
  },
  {
    label: 'eˣ',
    expression: 'exp(x)',
    a: '0',
    b: '1',
    n: '8',
    exact: String(Math.E - 1),
    desc: '∫₀¹ eˣdx = e − 1',
  },
  {
    label: '1/(1+x²)',
    expression: '1/(1+x^2)',
    a: '0',
    b: '1',
    n: '10',
    exact: String(Math.PI / 4),
    desc: '∫₀¹ 1/(1+x²)dx = π/4',
  },
];

const N_OPTIONS = [2, 4, 6, 8, 10, 20, 50, 100];

export default function NumericalIntegrationPage() {
  const [expression, setExpression] = useState('x^2 + 1');
  const [aStr, setAStr] = useState('0');
  const [bStr, setBStr] = useState('2');
  const [nStr, setNStr] = useState('4');
  const [exactStr, setExactStr] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);
  const { result, status, error, calculate, reset } =
    useNumericalIntegration();

  const handleLoadExample = (ex: (typeof EXAMPLE_SETS)[number]) => {
    setExpression(ex.expression);
    setAStr(ex.a);
    setBStr(ex.b);
    setNStr(ex.n);
    setExactStr(ex.exact);
    setParseError(null);
    reset();
  };

  const handleResetInputs = () => {
    setExpression('');
    setAStr('');
    setBStr('');
    setNStr('4');
    setExactStr('');
    setParseError(null);
    reset();
  };

  const handleCalculate = () => {
    if (!expression.trim()) {
      setParseError('Ingresa una expresión para f(x).');
      return;
    }

    const a = Number.parseFloat(aStr);
    if (!Number.isFinite(a)) {
      setParseError('El límite inferior a debe ser un número válido.');
      return;
    }

    const b = Number.parseFloat(bStr);
    if (!Number.isFinite(b)) {
      setParseError('El límite superior b debe ser un número válido.');
      return;
    }

    if (a >= b) {
      setParseError('El límite inferior a debe ser menor que b.');
      return;
    }

    const n = Number.parseInt(nStr, 10);
    if (!Number.isFinite(n) || n < 1) {
      setParseError('El número de subintervalos n debe ser un entero positivo.');
      return;
    }

    const exactValue = exactStr.trim()
      ? Number.parseFloat(exactStr)
      : undefined;
    if (exactStr.trim() && !Number.isFinite(exactValue)) {
      setParseError('El valor exacto de la integral debe ser numérico.');
      return;
    }

    setParseError(null);
    calculate({ expression: expression.trim(), a, b, n, exactValue });
  };

  const resultsSection = useMemo(() => {
    if (!result) return undefined;
    return (
      <div className="space-y-4 sm:space-y-6">
        <MethodResultBanner variant="success" message={result.message} />
        <NumericalIntegrationResults result={result} />
      </div>
    );
  }, [result]);

  const emptyState =
    !result && status === 'idle' ? (
      <MethodEmptyState
        title="Listo para integrar"
        description="Ingresa una función f(x), los límites [a, b] y el número de subintervalos para aproximar la integral definida."
      />
    ) : null;

  return (
    <div className="space-y-4">
      <NumericalIntegrationHeader />
      <MethodModuleLayout
        labels={{
          calculatorTab: 'Calculadora',
          theoryTab: 'Teoría',
          inputSectionTitle: 'Integración Numérica',
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

            {/* Función */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Función f(x)
              </label>
              <Input
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="Ej: x^2 + 1, sin(x), exp(x)"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Soporta: ^ potencia, sin/cos/tan, exp, log (ln), sqrt, abs
              </p>
            </div>

            {/* Límites y n */}
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Límite a
                </label>
                <Input
                  value={aStr}
                  onChange={(e) => setAStr(e.target.value)}
                  placeholder="0"
                  className="font-mono"
                  type="text"
                  inputMode="decimal"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Límite b
                </label>
                <Input
                  value={bStr}
                  onChange={(e) => setBStr(e.target.value)}
                  placeholder="2"
                  className="font-mono"
                  type="text"
                  inputMode="decimal"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Subintervalos n
                </label>
                <Input
                  value={nStr}
                  onChange={(e) => setNStr(e.target.value)}
                  placeholder="4"
                  className="font-mono"
                  type="text"
                  inputMode="numeric"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Exacta{' '}
                  <span className="text-muted-foreground">(opcional)</span>
                </label>
                <Input
                  value={exactStr}
                  onChange={(e) => setExactStr(e.target.value)}
                  placeholder="Para comparar"
                  className="font-mono"
                  type="text"
                  inputMode="decimal"
                />
              </div>
            </div>

            {/* Selector rápido de n */}
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Selección rápida de n
              </p>
              <div className="flex flex-wrap gap-2">
                {N_OPTIONS.map((val) => (
                  <Button
                    key={val}
                    size="sm"
                    variant={nStr === String(val) ? 'default' : 'outline'}
                    onClick={() => setNStr(String(val))}
                  >
                    {val}
                  </Button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Simpson requiere n par. Si n es impar, solo se calculará el
                Trapecio.
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
                Integrar
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
        theorySection={<NumericalIntegrationTheory />}
      />
    </div>
  );
}
