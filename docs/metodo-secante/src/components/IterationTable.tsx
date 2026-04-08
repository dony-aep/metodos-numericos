import type { SecantIteration } from '../types';
import { formatScientific } from '../utils/plotHelpers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Target } from 'lucide-react';

interface IterationTableProps {
  iterations: SecantIteration[];
  root: number | null;
  converged: boolean;
}

export function IterationTable({ iterations, root, converged }: IterationTableProps) {
  if (iterations.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
          Tabla de Iteraciones
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Vista móvil: tarjetas compactas */}
        <div className="sm:hidden px-4 pb-4 space-y-2">
          {iterations.map((iter, idx) => (
            <div 
              key={iter.n}
              className={`p-3 rounded-lg border ${
                idx === iterations.length - 1 && converged 
                  ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800' 
                  : 'bg-muted/30 border-border'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">Iteración {iter.n}</span>
                <Badge 
                  variant={iter.error < 1e-6 ? 'default' : 'secondary'}
                  className={`font-mono text-[10px] ${iter.error < 1e-6 ? 'bg-green-500 hover:bg-green-600' : ''}`}
                >
                  {formatScientific(iter.error)}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                <div className="text-muted-foreground">x<sub>n</sub>:</div>
                <div className="font-mono text-right">{formatScientific(iter.xCurr)}</div>
                <div className="text-muted-foreground">f(x<sub>n</sub>):</div>
                <div className="font-mono text-right">{formatScientific(iter.fxCurr)}</div>
                <div className="text-amber-600 font-medium">x<sub>n+1</sub>:</div>
                <div className="font-mono text-amber-600 font-medium text-right">{formatScientific(iter.xNext)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Vista desktop: tabla completa */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">n</TableHead>
                <TableHead className="font-semibold">x<sub>n-1</sub></TableHead>
                <TableHead className="font-semibold">x<sub>n</sub></TableHead>
                <TableHead className="font-semibold">f(x<sub>n-1</sub>)</TableHead>
                <TableHead className="font-semibold">f(x<sub>n</sub>)</TableHead>
                <TableHead className="font-semibold">x<sub>n+1</sub></TableHead>
                <TableHead className="font-semibold">Error</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {iterations.map((iter, idx) => (
                <TableRow 
                  key={iter.n}
                  className={idx === iterations.length - 1 && converged ? 'bg-green-50 dark:bg-green-950/20' : ''}
                >
                  <TableCell className="font-semibold">{iter.n}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {formatScientific(iter.xPrev)}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {formatScientific(iter.xCurr)}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {formatScientific(iter.fxPrev)}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {formatScientific(iter.fxCurr)}
                  </TableCell>
                  <TableCell className="font-mono text-sm font-medium text-amber-600 dark:text-amber-400">
                    {formatScientific(iter.xNext)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={iter.error < 1e-6 ? 'default' : 'secondary'}
                      className={`font-mono text-xs ${iter.error < 1e-6 ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    >
                      {formatScientific(iter.error)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Result summary */}
        {root !== null && (
          <div className={`
            m-3 sm:m-4 p-3 sm:p-4 rounded-lg border-2 flex items-center gap-3 sm:gap-4
            ${converged 
              ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800' 
              : 'bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800'
            }
          `}>
            {converged ? (
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 dark:text-amber-400 shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <p className={`font-semibold text-sm sm:text-lg ${converged ? 'text-green-800 dark:text-green-200' : 'text-amber-800 dark:text-amber-200'}`}>
                {converged ? 'Raíz encontrada' : 'Aproximación (no convergió)'}
              </p>
              <p className="font-mono text-base sm:text-xl mt-1 truncate">
                x ≈ <span className="font-bold">{root.toFixed(10)}</span>
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {iterations.length} iteraciones completadas
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
