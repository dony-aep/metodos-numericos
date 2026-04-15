import { useMemo, useState } from 'react';
import { Calculator, Eraser, Play, Sigma } from 'lucide-react';
import { MethodEmptyState } from '@/components/shared/MethodEmptyState';
import { MethodModuleLayout } from '@/components/shared/MethodModuleLayout';
import { MethodResultBanner } from '@/components/shared/MethodResultBanner';
import { IterativeMethodsHeader } from '@/components/topics/jacobi-gauss-seidel/Header';
import { IterativeMethodResults } from '@/components/topics/jacobi-gauss-seidel/IterativeMethodResults';
import { IterativeMethodsTheory } from '@/components/topics/jacobi-gauss-seidel/IterativeMethodsTheory';
import { LinearSystemInputGrid } from '@/components/topics/sistemas-lineales/LinearSystemInputGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIterativeMethod } from '@/hooks/useIterativeMethod';
import type { IterativeMethod } from '@/types/iterative-methods';

function createEmptyCoefficients(size: number): string[][] {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => ''));
}

function createEmptyConstants(size: number): string[] {
  return Array.from({ length: size }, () => '');
}

function getExampleBySize(size: number): { matrix: string[][]; vector: string[] } {
  if (size === 2) {
    return {
      matrix: [
        ['4', '1'],
        ['1', '3'],
      ],
      vector: ['1', '2'],
    };
  }

  if (size === 4) {
    return {
      matrix: [
        ['10', '-1', '2', '0'],
        ['-1', '11', '-1', '3'],
        ['2', '-1', '10', '-1'],
        ['0', '3', '-1', '8'],
      ],
      vector: ['6', '25', '-11', '15'],
    };
  }

  return {
    matrix: [
      ['5', '-1', '1'],
      ['2', '8', '-1'],
      ['-1', '1', '4'],
    ],
    vector: ['10', '11', '3'],
  };
}

export default function JacobiGaussSeidelPage() {
  const [size, setSize] = useState(3);
  const [coefficients, setCoefficients] = useState<string[][]>(() =>
    createEmptyCoefficients(3)
  );
  const [constants, setConstants] = useState<string[]>(() => createEmptyConstants(3));
  const [method, setMethod] = useState<IterativeMethod>('jacobi');
  const [tolerance, setTolerance] = useState('1e-6');
  const [maxIterations, setMaxIterations] = useState('100');
  const [parseError, setParseError] = useState<string | null>(null);
  const { result, status, error, calculate, reset } = useIterativeMethod();

  const handleSizeChange = (nextSize: number) => {
    setSize(nextSize);
    setCoefficients(createEmptyCoefficients(nextSize));
    setConstants(createEmptyConstants(nextSize));
    setParseError(null);
    reset();
  };

  const handleCoefficientChange = (row: number, col: number, value: string) => {
    setCoefficients((prev) =>
      prev.map((line, lineIndex) =>
        lineIndex === row
          ? line.map((entry, colIndex) => (colIndex === col ? value : entry))
          : line
      )
    );
  };

  const handleConstantChange = (row: number, value: string) => {
    setConstants((prev) => prev.map((entry, index) => (index === row ? value : entry)));
  };

  const handleLoadExample = () => {
    const example = getExampleBySize(size);
    setCoefficients(example.matrix);
    setConstants(example.vector);
    setParseError(null);
    reset();
  };

  const handleResetInputs = () => {
    setCoefficients(createEmptyCoefficients(size));
    setConstants(createEmptyConstants(size));
    setParseError(null);
    reset();
  };

  const handleCalculate = () => {
    const matrix: number[][] = [];
    const vector: number[] = [];

    for (let row = 0; row < size; row++) {
      matrix[row] = [];
      for (let col = 0; col < size; col++) {
        const parsed = Number.parseFloat(coefficients[row][col]);
        if (!Number.isFinite(parsed)) {
          setParseError(
            `Coeficiente inválido en la fila ${row + 1}, columna ${col + 1}.`
          );
          return;
        }
        matrix[row][col] = parsed;
      }

      const parsedB = Number.parseFloat(constants[row]);
      if (!Number.isFinite(parsedB)) {
        setParseError(`Término independiente inválido en la fila ${row + 1}.`);
        return;
      }
      vector[row] = parsedB;
    }

    const tol = Number.parseFloat(tolerance);
    if (!Number.isFinite(tol) || tol <= 0) {
      setParseError('La tolerancia debe ser un número positivo (ej. 1e-6).');
      return;
    }

    const maxIter = Number.parseInt(maxIterations, 10);
    if (!Number.isFinite(maxIter) || maxIter < 1) {
      setParseError('El número máximo de iteraciones debe ser al menos 1.');
      return;
    }

    setParseError(null);
    calculate({ matrix, vector, method, tolerance: tol, maxIterations: maxIter });
  };

  const resultsSection = useMemo(() => {
    if (!result) return undefined;

    return (
      <div className="space-y-4 sm:space-y-6">
        <MethodResultBanner
          variant={result.converged ? 'success' : 'warning'}
          message={result.message}
        />
        <IterativeMethodResults result={result} />
      </div>
    );
  }, [result]);

  const emptyState =
    !result && status === 'idle' ? (
      <MethodEmptyState
        title="Listo para iterar"
        description="Ingresa la matriz, el vector b y los parámetros para ejecutar Jacobi o Gauss-Seidel."
      />
    ) : null;

  return (
    <div className="space-y-4">
      <IterativeMethodsHeader />
      <MethodModuleLayout
        labels={{
          calculatorTab: 'Calculadora',
          theoryTab: 'Teoría',
          inputSectionTitle: 'Métodos Iterativos (Ax = b)',
        }}
        calculatorIcon={<Calculator className="h-4 w-4 sm:h-5 sm:w-5" />}
        theoryIcon={<Sigma className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        inputSection={
          <div className="space-y-4">
            {/* Selector de método */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-foreground">Método:</span>
              <Button
                size="sm"
                variant={method === 'jacobi' ? 'default' : 'outline'}
                onClick={() => {
                  setMethod('jacobi');
                  reset();
                }}
              >
                Jacobi
              </Button>
              <Button
                size="sm"
                variant={method === 'gauss-seidel' ? 'default' : 'outline'}
                onClick={() => {
                  setMethod('gauss-seidel');
                  reset();
                }}
              >
                Gauss-Seidel
              </Button>
            </div>

            {/* Tamaño del sistema */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                Tamaño del sistema:
              </span>
              {[2, 3, 4].map((candidate) => (
                <Button
                  key={candidate}
                  size="sm"
                  variant={size === candidate ? 'default' : 'outline'}
                  onClick={() => handleSizeChange(candidate)}
                >
                  {candidate}x{candidate}
                </Button>
              ))}
              <Button size="sm" variant="secondary" onClick={handleLoadExample}>
                Cargar ejemplo
              </Button>
            </div>

            {/* Matriz de entrada */}
            <LinearSystemInputGrid
              size={size}
              coefficients={coefficients}
              constants={constants}
              onCoefficientChange={handleCoefficientChange}
              onConstantChange={handleConstantChange}
            />

            {/* Parámetros iterativos */}
            <div className="flex flex-wrap items-end gap-3 rounded-lg border border-border bg-muted/20 p-3">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Tolerancia
                </label>
                <Input
                  value={tolerance}
                  onChange={(e) => setTolerance(e.target.value)}
                  className="h-9 w-28 font-mono text-sm"
                  placeholder="1e-6"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Máx. iteraciones
                </label>
                <Input
                  value={maxIterations}
                  onChange={(e) => setMaxIterations(e.target.value)}
                  className="h-9 w-28 font-mono text-sm"
                  placeholder="100"
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
                Resolver con {method === 'jacobi' ? 'Jacobi' : 'Gauss-Seidel'}
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
        theorySection={<IterativeMethodsTheory />}
      />
    </div>
  );
}
