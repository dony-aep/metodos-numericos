import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface InterpolationInputGridProps {
  xValues: string[];
  yValues: string[];
  onXChange: (index: number, value: string) => void;
  onYChange: (index: number, value: string) => void;
  onAddPoint: () => void;
  onRemovePoint: (index: number) => void;
}

export function InterpolationInputGrid({
  xValues,
  yValues,
  onXChange,
  onYChange,
  onAddPoint,
  onRemovePoint,
}: InterpolationInputGridProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Puntos de datos ({xValues.length})
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-7 gap-1 text-xs"
          onClick={onAddPoint}
        >
          <Plus className="h-3 w-3" />
          Punto
        </Button>
      </div>

      <div className="space-y-2">
        {/* Header labels */}
        <div className="grid grid-cols-[1fr_1fr_2rem] items-center gap-2 px-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            x
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            y
          </span>
          <span />
        </div>

        {xValues.map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr_2rem] items-center gap-2"
          >
            <Input
              value={xValues[index]}
              onChange={(e) => onXChange(index, e.target.value)}
              className="h-9 font-mono text-sm text-center"
              placeholder={`${index}`}
            />
            <Input
              value={yValues[index]}
              onChange={(e) => onYChange(index, e.target.value)}
              className="h-9 font-mono text-sm text-center"
              placeholder={`${index}`}
            />
            {xValues.length > 2 ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => onRemovePoint(index)}
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <span />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
