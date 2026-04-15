import { useMemo, useState } from 'react';
import { Calculator, Eraser, Play, Sigma } from 'lucide-react';
import { MethodEmptyState } from '@/components/shared/MethodEmptyState';
import { MethodModuleLayout } from '@/components/shared/MethodModuleLayout';
import { MethodResultBanner } from '@/components/shared/MethodResultBanner';
import { NumericalDiffHeader } from '@/components/topics/derivacion-numerica/Header';
import { NumericalDiffResults } from '@/components/topics/derivacion-numerica/NumericalDiffResults';
import { NumericalDiffTheory } from '@/components/topics/derivacion-numerica/NumericalDiffTheory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNumericalDiff } from '@/hooks/useNumericalDiff';

const EXAMPLE_SETS = [
  {
    label: 'x²',
    expression: 'x^2',
    x: '2',
    h: '0.1',
    exact: '4',
    desc: "f'(2) = 4",
  },
  {
    label: 'sin(x)',
    expression: 'sin(x)',
    x: '1',
    h: '0.01',
    exact: String(Math.cos(1)),
    desc: "f'(1) = cos(1)",
  },
  {
    label: 'eˣ',
    expression: 'exp(x)',
    x: '0',
    h: '0.1',
    exact: '1',
    desc: "f'(0) = 1",
  },
  {
    label: 'ln(x)',
    expression: 'log(x)',
    x: '2',
    h: '0.01',
    exact: '0.5',
    desc: "f'(2) = 0.5",
  },
];

export default function NumericalDiffPage() {
  const [expression, setExpression] = useState('x^2');
  const [xStr, setXStr] = useState('2');
  const [hStr, setHStr] = useState('0.1');
  const [exactStr, setExactStr] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);
  const { result, status, error, calculate, reset } = useNumericalDiff();

  const handleLoadExample = (ex: (typeof EXAMPLE_SETS)[number]) => {
    setExpression(ex.expression);
    setXStr(ex.x);
    setHStr(ex.h);
    setExactStr(ex.exact);
    setParseError(null);
    reset();
  };

  const handleResetInputs = () => {
    setExpression('');
    setXStr('');
    setHStr('0.1');
    setExactStr('');
    setParseError(null);
    reset();
  };

  const handleCalculate = () => {
    if (!expression.trim()) {
      setParseError('Ingresa una expresión para f(x).');
      return;
    }

    const x = Number.parseFloat(xStr);
    if (!Number.isFinite(x)) {
      setParseError('El punto x debe ser un número válido.');
      return;
    }

    const h = Number.parseFloat(hStr);
    if (!Number.isFinite(h) || h <= 0) {
      setParseError('El paso h debe ser un número positivo.');
      return;
    }

    const exactValue = exactStr.trim()
      ? Number.parseFloat(exactStr)
      : undefined;
    if (exactStr.trim() && !Number.isFinite(exactValue)) {
      setParseError('El valor exacto de la derivada debe ser numérico.');
      return;
    }

    setParseError(null);
    calculate({ expression: expression.trim(), x, h, exactValue });
  };

  const resultsSection = useMemo(() => {
    if (!result) return undefined;
    return (
      <div className="space-y-4 sm:space-y-6">
        <MethodResultBanner variant="success" message={result.message} />
        <NumericalDiffResults result={result} />
      </div>
    );
  }, [result]);

  const emptyState =
    !result && status === 'idle' ? (
      <MethodEmptyState
        title="Listo para derivar"
        description="Ingresa una función f(x), un punto x y el paso h para calcular las aproximaciones numéricas de la derivada."
      />
    ) : null;

  return (
    <div className="space-y-4">
      <NumericalDiffHeader />
      <MethodModuleLayout
        labels={{
          calculatorTab: 'Calculadora',
          theoryTab: 'Teoría',
          inputSectionTitle: 'Derivación Numérica',
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
                placeholder="Ej: x^2, sin(x), exp(x)"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Soporta: ^ potencia, sin/cos/tan, exp, log (ln), sqrt, abs
              </p>
            </div>

            {/* Punto x y paso h */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Punto x
                </label>
                <Input
                  value={xStr}
                  onChange={(e) => setXStr(e.target.value)}
                  placeholder="Ej: 2"
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
                  placeholder="Ej: 0.1"
                  className="font-mono"
                  type="text"
                  inputMode="decimal"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  f'(x) exacta{' '}
                  <span className="text-muted-foreground">(opcional)</span>
                </label>
                <Input
                  value={exactStr}
                  onChange={(e) => setExactStr(e.target.value)}
                  placeholder="Para comparar error"
                  className="font-mono"
                  type="text"
                  inputMode="decimal"
                />
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
                Calcular
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
        theorySection={<NumericalDiffTheory />}
      />
    </div>
  );
}
