import { Input } from '@/components/ui/input';

interface LinearSystemInputGridProps {
  size: number;
  coefficients: string[][];
  constants: string[];
  onCoefficientChange: (row: number, col: number, value: string) => void;
  onConstantChange: (row: number, value: string) => void;
}

export function LinearSystemInputGrid({
  size,
  coefficients,
  constants,
  onCoefficientChange,
  onConstantChange,
}: LinearSystemInputGridProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto py-2">
      {/* Corchete izquierdo de la matriz A */}
      <div className="hidden sm:flex h-full items-stretch self-stretch">
        <div className="w-1.5 rounded-l border-y-2 border-l-2 border-foreground/20" />
      </div>

      <div className="space-y-2">
        {Array.from({ length: size }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-1.5 sm:gap-2">
            {/* Coeficientes */}
            {Array.from({ length: size }).map((__, colIndex) => (
              <Input
                key={`${rowIndex}-${colIndex}`}
                value={coefficients[rowIndex][colIndex]}
                onChange={(event) =>
                  onCoefficientChange(rowIndex, colIndex, event.target.value)
                }
                className="h-9 w-16 sm:w-20 font-mono text-sm text-center"
                placeholder="0"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Corchete derecho de la matriz A */}
      <div className="hidden sm:flex h-full items-stretch self-stretch">
        <div className="w-1.5 rounded-r border-y-2 border-r-2 border-foreground/20" />
      </div>

      {/* Vector de variables */}
      <div className="hidden sm:flex flex-col items-center justify-center gap-2 px-1">
        {Array.from({ length: size }).map((_, i) => (
          <div key={i} className="flex h-9 items-center">
            <span className="font-mono text-sm text-muted-foreground">
              x<sub>{i + 1}</sub>
            </span>
          </div>
        ))}
      </div>

      {/* Signo igual */}
      <div className="flex items-center px-1">
        <span className="text-lg font-light text-muted-foreground">=</span>
      </div>

      {/* Corchete izquierdo del vector b */}
      <div className="hidden sm:flex h-full items-stretch self-stretch">
        <div className="w-1.5 rounded-l border-y-2 border-l-2 border-foreground/20" />
      </div>

      {/* Vector b */}
      <div className="space-y-2">
        {Array.from({ length: size }).map((_, rowIndex) => (
          <Input
            key={`b-${rowIndex}`}
            value={constants[rowIndex]}
            onChange={(event) => onConstantChange(rowIndex, event.target.value)}
            className="h-9 w-16 sm:w-20 font-mono text-sm text-center"
            placeholder="0"
          />
        ))}
      </div>

      {/* Corchete derecho del vector b */}
      <div className="hidden sm:flex h-full items-stretch self-stretch">
        <div className="w-1.5 rounded-r border-y-2 border-r-2 border-foreground/20" />
      </div>
    </div>
  );
}
