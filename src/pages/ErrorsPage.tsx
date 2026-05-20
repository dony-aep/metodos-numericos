import { useMemo, useState } from 'react';
import { Calculator, Eraser, Play, Sigma } from 'lucide-react';
import { MethodEmptyState } from '@/components/shared/MethodEmptyState';
import { MethodModuleLayout } from '@/components/shared/MethodModuleLayout';
import { MethodResultBanner } from '@/components/shared/MethodResultBanner';
import { ErrorsHeader } from '@/components/topics/errores/Header';
import { ErrorsResults } from '@/components/topics/errores/ErrorsResults';
import { ErrorsTheory } from '@/components/topics/errores/ErrorsTheory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useErrors } from '@/hooks/useErrors';

export default function ErrorsPage() {
  const [mode, setMode] = useState<'errors' | 'taylor'>('errors');

  // Error inputs
  const [exactStr, setExactStr] = useState('');
  const [approxStr, setApproxStr] = useState('');

  // Taylor inputs
  const [expression, setExpression] = useState('exp(x)');
  const [aStr, setAStr] = useState('0');
  const [xStr, setXStr] = useState('1');
  const [nStr, setNStr] = useState('5');

  const [parseError, setParseError] = useState<string | null>(null);
  const { errorsResult, taylorResult, status, error, calculateErrors, calculateTaylor, reset } = useErrors();

  const handleReset = () => {
    setExactStr('');
    setApproxStr('');
    setExpression('exp(x)');
    setAStr('0');
    setXStr('1');
    setNStr('5');
    setParseError(null);
    reset();
  };

  const handleCalculate = () => {
    setParseError(null);

    if (mode === 'errors') {
      const exact = Number.parseFloat(exactStr);
      const approx = Number.parseFloat(approxStr);
      if (!Number.isFinite(exact)) {
        setParseError('El valor exacto debe ser un número válido.');
        return;
      }
      if (!Number.isFinite(approx)) {
        setParseError('El valor aproximado debe ser un número válido.');
        return;
      }
      calculateErrors({ exactValue: exact, approxValue: approx });
    } else {
      if (!expression.trim()) {
        setParseError('Ingresa una expresión para f(x).');
        return;
      }
      const a = Number.parseFloat(aStr);
      const x = Number.parseFloat(xStr);
      const n = Number.parseInt(nStr, 10);
      if (!Number.isFinite(a)) { setParseError('El punto a debe ser numérico.'); return; }
      if (!Number.isFinite(x)) { setParseError('El punto x debe ser numérico.'); return; }
      if (!Number.isFinite(n) || n < 1 || n > 15) { setParseError('El grado n debe estar entre 1 y 15.'); return; }
      calculateTaylor({ expression: expression.trim(), a, x, n });
    }
  };

  const resultsSection = useMemo(() => {
    if (!errorsResult && !taylorResult) return undefined;
    const message = errorsResult?.message ?? taylorResult?.message ?? '';
    return (
      <div className="space-y-4 sm:space-y-6">
        <MethodResultBanner variant="success" message={message} />
        <ErrorsResults errorsResult={errorsResult} taylorResult={taylorResult} />
      </div>
    );
  }, [errorsResult, taylorResult]);

  const emptyState =
    !errorsResult && !taylorResult && status === 'idle' ? (
      <MethodEmptyState
        title="Listo para calcular"
        description="Ingresa valores para calcular errores numéricos o explora la aproximación por series de Taylor."
      />
    ) : null;

  return (
    <div className="space-y-4">
      <ErrorsHeader />
      <MethodModuleLayout
        labels={{
          calculatorTab: 'Calculadora',
          theoryTab: 'Teoría',
          inputSectionTitle: 'Errores y Aproximaciones',
        }}
        calculatorIcon={<Calculator className="h-4 w-4 sm:h-5 sm:w-5" />}
        theoryIcon={<Sigma className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        inputSection={
          <div className="space-y-4">
            {/* Mode selector */}
            <Tabs value={mode} onValueChange={(v) => { setMode(v as 'errors' | 'taylor'); reset(); setParseError(null); }}>
              <TabsList className="grid w-full max-w-sm grid-cols-2">
                <TabsTrigger value="errors">Cálculo de errores</TabsTrigger>
                <TabsTrigger value="taylor">Serie de Taylor</TabsTrigger>
              </TabsList>

              <TabsContent value="errors" className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Valor exacto (x)</label>
                    <Input value={exactStr} onChange={(e) => setExactStr(e.target.value)} placeholder="Ej: 1.41421356" className="font-mono" inputMode="decimal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Valor aproximado (x̃)</label>
                    <Input value={approxStr} onChange={(e) => setApproxStr(e.target.value)} placeholder="Ej: 1.414" className="font-mono" inputMode="decimal" />
                  </div>
                </div>
                {/* Quick examples */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Ejemplos:</span>
                  <Button size="sm" variant="secondary" onClick={() => { setExactStr(String(Math.sqrt(2))); setApproxStr('1.414'); }}>√2 ≈ 1.414</Button>
                  <Button size="sm" variant="secondary" onClick={() => { setExactStr(String(Math.PI)); setApproxStr('3.14'); }}>π ≈ 3.14</Button>
                  <Button size="sm" variant="secondary" onClick={() => { setExactStr(String(Math.E)); setApproxStr('2.718'); }}>e ≈ 2.718</Button>
                </div>
              </TabsContent>

              <TabsContent value="taylor" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Función f(x)</label>
                  <Input value={expression} onChange={(e) => setExpression(e.target.value)} placeholder="Ej: exp(x), sin(x)" className="font-mono" />
                  <p className="text-xs text-muted-foreground">Soporta: ^ potencia, sin/cos/tan, exp, log (ln), sqrt, abs</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Punto a (centro)</label>
                    <Input value={aStr} onChange={(e) => setAStr(e.target.value)} placeholder="0" className="font-mono" inputMode="decimal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Evaluar en x</label>
                    <Input value={xStr} onChange={(e) => setXStr(e.target.value)} placeholder="1" className="font-mono" inputMode="decimal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Grado n (1–15)</label>
                    <Input value={nStr} onChange={(e) => setNStr(e.target.value)} placeholder="5" className="font-mono" inputMode="numeric" />
                  </div>
                </div>
                {/* Quick examples */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Ejemplos:</span>
                  <Button size="sm" variant="secondary" onClick={() => { setExpression('exp(x)'); setAStr('0'); setXStr('1'); setNStr('5'); }}>eˣ en x=1</Button>
                  <Button size="sm" variant="secondary" onClick={() => { setExpression('sin(x)'); setAStr('0'); setXStr('1'); setNStr('7'); }}>sin(x) en x=1</Button>
                  <Button size="sm" variant="secondary" onClick={() => { setExpression('cos(x)'); setAStr('0'); setXStr('3.14159'); setNStr('10'); }}>cos(x) en x=π</Button>
                </div>
              </TabsContent>
            </Tabs>

            {parseError && <p className="text-sm text-destructive">{parseError}</p>}

            {/* Buttons */}
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
        theorySection={<ErrorsTheory />}
      />
    </div>
  );
}
