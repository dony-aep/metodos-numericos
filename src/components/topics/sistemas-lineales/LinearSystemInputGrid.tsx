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
    <div className="space-y-3">
      {Array.from({ length: size }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap items-center gap-2">
          {Array.from({ length: size }).map((__, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="flex items-center gap-1">
              <Input
                value={coefficients[rowIndex][colIndex]}
                onChange={(event) =>
                  onCoefficientChange(rowIndex, colIndex, event.target.value)
                }
                className="h-9 w-20 font-mono text-sm"
                placeholder="0"
              />
              <span className="text-xs text-muted-foreground sm:text-sm">
                x{colIndex + 1}
              </span>
              {colIndex < size - 1 ? (
                <span className="text-muted-foreground">+</span>
              ) : null}
            </div>
          ))}
          <span className="mx-1 text-muted-foreground">=</span>
          <Input
            value={constants[rowIndex]}
            onChange={(event) => onConstantChange(rowIndex, event.target.value)}
            className="h-9 w-20 font-mono text-sm"
            placeholder="0"
          />
        </div>
      ))}
    </div>
  );
}
