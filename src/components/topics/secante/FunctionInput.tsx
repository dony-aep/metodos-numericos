import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FunctionInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const EXAMPLES = [
  { label: 'x³ + 2x² + 10x − 20', value: 'x^3 + 2*x^2 + 10*x - 20', category: 'Polinomio' },
  { label: 'eˣ − 2', value: 'exp(x) - 2', category: 'Exponencial' },
  { label: 'x² − 2', value: 'x^2 - 2', category: 'Polinomio' },
  { label: 'cos(x) − x', value: 'cos(x) - x', category: 'Trigonométrica' },
  { label: 'sin(x) − x/2', value: 'sin(x) - x/2', category: 'Trigonométrica' },
  { label: 'ln(x) − 1', value: 'log(x) - 1', category: 'Logarítmica' },
];

const SYNTAX_HINTS = ['^ potencia', '* multiplicar', 'exp(x)', 'sin/cos', 'sqrt(x)', 'log(x)'];

export function FunctionInput({ value, onChange, error }: FunctionInputProps) {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs sm:text-sm font-medium text-foreground">
            Función f(x)
          </label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowExamples(!showExamples)}
            className="text-xs text-muted-foreground hover:text-foreground h-8 px-2 sm:px-3"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Ejemplos</span>
            <span className="sm:hidden">Ver</span>
            {showExamples ? (
              <ChevronUp className="w-3 h-3 ml-1" />
            ) : (
              <ChevronDown className="w-3 h-3 ml-1" />
            )}
          </Button>
        </div>

        <div className="relative">
          <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-xs sm:text-sm">
            f(x) =
          </span>
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="x^3 + 2*x - 5"
            className={cn(
              'pl-14 sm:pl-16 font-mono h-10 sm:h-12 text-sm sm:text-base',
              error && 'border-destructive focus-visible:ring-destructive/30'
            )}
          />
        </div>

        {error && (
          <p className="text-xs sm:text-sm text-destructive font-medium">{error}</p>
        )}

        {/* Hints de sintaxis */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {SYNTAX_HINTS.map((hint) => (
            <Badge key={hint} variant="secondary" className="text-[10px] sm:text-xs font-mono whitespace-nowrap flex-shrink-0">
              {hint}
            </Badge>
          ))}
        </div>
      </div>

      {/* Panel de ejemplos */}
      {showExamples && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2 p-3 sm:p-4 bg-muted/30 rounded-lg border border-border">
          {EXAMPLES.map((example) => (
            <button
              key={example.value}
              onClick={() => {
                onChange(example.value);
                setShowExamples(false);
              }}
              className="group flex flex-col items-start gap-0.5 sm:gap-1 p-2.5 sm:p-3 rounded-lg text-left transition-colors border border-transparent hover:border-border hover:bg-card active:scale-[0.98]"
            >
              <span className="font-mono text-xs sm:text-sm text-foreground truncate w-full group-hover:text-foreground">
                {example.label}
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                {example.category}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
