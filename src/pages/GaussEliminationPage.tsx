import { useMemo, useState } from 'react';
import { Calculator, Eraser, Play, Sigma } from 'lucide-react';
import { MethodEmptyState } from '@/components/shared/MethodEmptyState';
import { MethodModuleLayout } from '@/components/shared/MethodModuleLayout';
import { MethodResultBanner } from '@/components/shared/MethodResultBanner';
import { GaussEliminationResults } from '@/components/topics/eliminacion-gauss/GaussEliminationResults';
import { GaussEliminationTheory } from '@/components/topics/eliminacion-gauss/GaussEliminationTheory';
import { LinearSystemInputGrid } from '@/components/topics/sistemas-lineales/LinearSystemInputGrid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGaussElimination } from '@/hooks/useGaussElimination';

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
        ['3', '2'],
        ['1', '-1'],
      ],
      vector: ['18', '2'],
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
      ['2', '1', '-1'],
      ['-3', '-1', '2'],
      ['-2', '1', '2'],
    ],
    vector: ['8', '-11', '-3'],
  };
}

export default function GaussEliminationPage() {
  const [size, setSize] = useState(3);
  const [coefficients, setCoefficients] = useState<string[][]>(() =>
    createEmptyCoefficients(3)
  );
  const [constants, setConstants] = useState<string[]>(() => createEmptyConstants(3));
  const [parseError, setParseError] = useState<string | null>(null);
  const { result, status, error, calculate, reset } = useGaussElimination();

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
          setParseError(`Coeficiente inválido en la fila ${row + 1}, columna ${col + 1}.`);
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

    setParseError(null);
    calculate({ matrix, vector });
  };

  const resultsSection = useMemo(() => {
    if (!result) return undefined;

    return (
      <div className="space-y-4 sm:space-y-6">
        <MethodResultBanner
          variant={result.hasUniqueSolution ? 'success' : 'warning'}
          message={result.message}
        />
        <GaussEliminationResults result={result} />
      </div>
    );
  }, [result]);

  const emptyState =
    !result && status === 'idle' ? (
      <MethodEmptyState
        title="Sistema listo para triangular"
        description="Ingresa A y b para aplicar eliminación de Gauss con pivoteo parcial."
      />
    ) : null;

  return (
    <MethodModuleLayout
      labels={{
        calculatorTab: 'Calculadora',
        theoryTab: 'Teoría',
        inputSectionTitle: 'Eliminación de Gauss (Ax = b)',
      }}
      calculatorIcon={<Calculator className="h-4 w-4 sm:h-5 sm:w-5" />}
      theoryIcon={<Sigma className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
      inputSection={
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Método directo</Badge>
            <Badge variant="outline">Pivoteo parcial</Badge>
            <Badge variant="outline">Sustitución hacia atrás</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-foreground">Tamaño del sistema:</span>
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

          <LinearSystemInputGrid
            size={size}
            coefficients={coefficients}
            constants={constants}
            onCoefficientChange={handleCoefficientChange}
            onConstantChange={handleConstantChange}
          />

          {parseError ? <p className="text-sm text-destructive">{parseError}</p> : null}

          <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row sm:gap-3">
            <Button
              onClick={handleCalculate}
              disabled={status === 'calculating'}
              size="lg"
              className="w-full gap-2 sm:w-auto"
            >
              <Play className="h-4 w-4" />
              Resolver con Gauss
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
      theorySection={<GaussEliminationTheory />}
    />
  );
}
