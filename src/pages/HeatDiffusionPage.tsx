import { useMemo, useState } from 'react';
import { Calculator, Eraser, Play, Sigma } from 'lucide-react';
import { MethodEmptyState } from '@/components/shared/MethodEmptyState';
import { MethodModuleLayout } from '@/components/shared/MethodModuleLayout';
import { MethodResultBanner } from '@/components/shared/MethodResultBanner';
import { HeatDiffusionHeader } from '@/components/topics/difusion-calor/Header';
import { HeatDiffusionResults } from '@/components/topics/difusion-calor/HeatDiffusionResults';
import { HeatDiffusionTheory } from '@/components/topics/difusion-calor/HeatDiffusionTheory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useHeatDiffusion } from '@/hooks/useHeatDiffusion';

interface Preset {
  label: string;
  desc: string;
  alpha: string;
  length: string;
  tFinal: string;
  n: string;
  dt: string;
  initial: string;
  uLeft: string;
  uRight: string;
}

const PRESETS: Preset[] = [
  {
    label: 'Senoidal',
    desc: 'u(x,0)=100·sin(πx), λ=0.4 (estable)',
    alpha: '1',
    length: '1',
    tFinal: '0.1',
    n: '20',
    dt: '0.001',
    initial: '100*sin(pi*x)',
    uLeft: '0',
    uRight: '0',
  },
  {
    label: 'Pico central',
    desc: 'Pulso de calor en el centro, λ=0.32 (estable)',
    alpha: '1',
    length: '1',
    tFinal: '0.05',
    n: '40',
    dt: '0.0002',
    initial: '100*exp(-200*(x-0.5)^2)',
    uLeft: '0',
    uRight: '0',
  },
  {
    label: 'Inestable',
    desc: 'λ=0.6 > 0.5: el método explícito diverge',
    alpha: '1',
    length: '1',
    tFinal: '0.03',
    n: '20',
    dt: '0.0015',
    initial: '100*sin(pi*x)',
    uLeft: '0',
    uRight: '0',
  },
  {
    label: 'Equilibrio térmico',
    desc: 'Fronteras a 100 °C y 25 °C: la barra alcanza un perfil lineal',
    alpha: '1',
    length: '1',
    tFinal: '0.5',
    n: '30',
    dt: '0.0004',
    initial: '25',
    uLeft: '100',
    uRight: '25',
  },
  {
    label: 'Difusión rápida',
    desc: 'Alta difusividad (α=5): el calor se reparte muy rápido',
    alpha: '5',
    length: '1',
    tFinal: '0.02',
    n: '50',
    dt: '0.00002',
    initial: '100*sin(pi*x)',
    uLeft: '0',
    uRight: '0',
  },
  {
    label: 'Pulso localizado',
    desc: 'Punto de calor estrecho que se aplana y disipa',
    alpha: '1',
    length: '1',
    tFinal: '0.02',
    n: '50',
    dt: '0.00002',
    initial: '100*exp(-1000*(x-0.5)^2)',
    uLeft: '0',
    uRight: '0',
  },
];

export default function HeatDiffusionPage() {
  const [alpha, setAlpha] = useState('1');
  const [length, setLength] = useState('1');
  const [tFinal, setTFinal] = useState('0.1');
  const [n, setN] = useState('20');
  const [dt, setDt] = useState('0.001');
  const [initial, setInitial] = useState('100*sin(pi*x)');
  const [uLeft, setULeft] = useState('0');
  const [uRight, setURight] = useState('0');
  const [parseError, setParseError] = useState<string | null>(null);
  const { result, status, error, calculate, reset } = useHeatDiffusion();

  const handleLoadPreset = (p: Preset) => {
    setAlpha(p.alpha);
    setLength(p.length);
    setTFinal(p.tFinal);
    setN(p.n);
    setDt(p.dt);
    setInitial(p.initial);
    setULeft(p.uLeft);
    setURight(p.uRight);
    setParseError(null);
    reset();
  };

  const handleReset = () => {
    setAlpha('');
    setLength('');
    setTFinal('');
    setN('');
    setDt('');
    setInitial('');
    setULeft('0');
    setURight('0');
    setParseError(null);
    reset();
  };

  const handleCalculate = () => {
    if (!initial.trim()) {
      setParseError('Ingresa la condición inicial f(x).');
      return;
    }
    setParseError(null);
    calculate({
      alpha: Number.parseFloat(alpha),
      length: Number.parseFloat(length),
      tFinal: Number.parseFloat(tFinal),
      n: Number.parseInt(n, 10),
      dt: Number.parseFloat(dt),
      initialExpression: initial.trim(),
      uLeft: Number.parseFloat(uLeft),
      uRight: Number.parseFloat(uRight),
    });
  };

  const resultsSection = useMemo(() => {
    if (!result) return undefined;
    return (
      <div className="space-y-4 sm:space-y-6">
        <MethodResultBanner
          variant={result.stable ? 'success' : 'warning'}
          message={result.message}
        />
        <HeatDiffusionResults result={result} />
      </div>
    );
  }, [result]);

  const emptyState =
    !result && status === 'idle' ? (
      <MethodEmptyState
        title="Listo para simular"
        description="Define la difusividad α, la geometría de la barra, la condición inicial f(x) y las fronteras para resolver la ecuación del calor con el esquema explícito FTCS."
      />
    ) : null;

  const field = (
    label: React.ReactNode,
    value: string,
    setter: (v: string) => void,
    placeholder: string,
    inputMode: 'decimal' | 'numeric' = 'decimal',
  ) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Input
        value={value}
        onChange={(e) => setter(e.target.value)}
        placeholder={placeholder}
        className="font-mono"
        type="text"
        inputMode={inputMode}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <HeatDiffusionHeader />
      <MethodModuleLayout
        labels={{
          calculatorTab: 'Calculadora',
          theoryTab: 'Teoría',
          inputSectionTitle: 'Difusión del calor (FTCS)',
        }}
        calculatorIcon={<Calculator className="h-4 w-4 sm:h-5 sm:w-5" />}
        theoryIcon={<Sigma className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        inputSection={
          <div className="space-y-4">
            {/* Ejemplos rápidos */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-foreground">Ejemplos:</span>
              {PRESETS.map((p) => (
                <Button
                  key={p.label}
                  size="sm"
                  variant="secondary"
                  onClick={() => handleLoadPreset(p)}
                  title={p.desc}
                >
                  {p.label}
                </Button>
              ))}
            </div>

            {/* Condición inicial */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Condición inicial f(x)
              </label>
              <Input
                value={initial}
                onChange={(e) => setInitial(e.target.value)}
                placeholder="Ej: 100*sin(pi*x)"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Temperatura inicial en función de <span className="font-mono">x</span>.
                Soporta: ^ potencia, sin/cos/tan, exp, log (ln), sqrt, pi.
              </p>
            </div>

            {/* Parámetros físicos y de malla */}
            <div className="grid gap-4 sm:grid-cols-3">
              {field('Difusividad α', alpha, setAlpha, '1')}
              {field('Longitud L', length, setLength, '1')}
              {field('Tiempo final T', tFinal, setTFinal, '0.1')}
              {field('Intervalos N', n, setN, '20', 'numeric')}
              {field('Paso temporal Δt', dt, setDt, '0.001')}
              <div className="grid grid-cols-2 gap-3">
                {field('u(0, t)', uLeft, setULeft, '0')}
                {field('u(L, t)', uRight, setURight, '0')}
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
                Simular
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
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
        theorySection={<HeatDiffusionTheory />}
      />
    </div>
  );
}
