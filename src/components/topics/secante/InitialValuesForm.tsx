import { Input } from '@/components/ui/input';

interface InitialValuesFormProps {
  x0: string;
  x1: string;
  tolerance: string;
  maxIterations: string;
  onX0Change: (value: string) => void;
  onX1Change: (value: string) => void;
  onToleranceChange: (value: string) => void;
  onMaxIterationsChange: (value: string) => void;
}

export function InitialValuesForm({
  x0,
  x1,
  tolerance,
  maxIterations,
  onX0Change,
  onX1Change,
  onToleranceChange,
  onMaxIterationsChange,
}: InitialValuesFormProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-medium text-foreground">
          x₀ <span className="text-muted-foreground font-normal hidden sm:inline">(inicial)</span>
        </label>
        <Input
          type="number"
          step="any"
          value={x0}
          onChange={(e) => onX0Change(e.target.value)}
          placeholder="0"
          className="font-mono text-sm sm:text-base h-9 sm:h-10"
        />
      </div>
      
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-medium text-foreground">
          x₁ <span className="text-muted-foreground font-normal hidden sm:inline">(inicial)</span>
        </label>
        <Input
          type="number"
          step="any"
          value={x1}
          onChange={(e) => onX1Change(e.target.value)}
          placeholder="1"
          className="font-mono text-sm sm:text-base h-9 sm:h-10"
        />
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-medium text-foreground">
          Tolerancia
        </label>
        <Input
          type="number"
          step="any"
          value={tolerance}
          onChange={(e) => onToleranceChange(e.target.value)}
          placeholder="1e-6"
          className="font-mono text-sm sm:text-base h-9 sm:h-10"
        />
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-medium text-foreground">
          <span className="hidden sm:inline">Máx iteraciones</span>
          <span className="sm:hidden">Máx iter.</span>
        </label>
        <Input
          type="number"
          min="1"
          max="1000"
          value={maxIterations}
          onChange={(e) => onMaxIterationsChange(e.target.value)}
          placeholder="100"
          className="font-mono text-sm sm:text-base h-9 sm:h-10"
        />
      </div>
    </div>
  );
}
