import type { SecantIteration } from '@/types/secant';
import { formatScientific } from '@/utils/plotHelpers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, TableIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ErrorBar } from '@/components/shared/ErrorBar';

interface IterationTableProps {
  iterations: SecantIteration[];
  root: number | null;
  converged: boolean;
}

export function IterationTable({ iterations, root, converged }: IterationTableProps) {
  if (iterations.length === 0) return null;

  const lastIdx = iterations.length - 1;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-rule pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <TableIcon className="w-3.5 h-3.5" />
            Tabla de Iteraciones
          </span>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {iterations.length} iter.
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Vista móvil: filas compactas */}
        <div className="sm:hidden divide-y divide-border">
          {iterations.map((iter, idx) => {
            const isLast = idx === lastIdx && converged;
            return (
              <div
                key={iter.n}
                className={cn(
                  'px-4 py-3 transition-colors',
                  isLast
                    ? ' '
                    : 'hover:bg-muted/20'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    iter <span className="font-bold text-foreground">{iter.n}</span>
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      'font-mono text-[10px]',
                      iter.error < 1e-4
                        ? ' text-emerald-700   dark:text-emerald-400 '
                        : 'text-muted-foreground'
                    )}
                  >
                    ε = <ErrorBar error={iter.error} />
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <span className="text-muted-foreground">x<sub>n</sub></span>
                  <span className="font-mono text-right">{formatScientific(iter.xCurr)}</span>
                  <span className="text-muted-foreground">f(x<sub>n</sub>)</span>
                  <span className="font-mono text-right">{formatScientific(iter.fxCurr)}</span>
                  <span className="font-medium text-foreground">x<sub>n+1</sub></span>
                  <span className="font-mono font-semibold text-right text-foreground">
                    {formatScientific(iter.xNext)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vista desktop: tabla completa */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-mono text-xs text-muted-foreground w-12">n</TableHead>
                <TableHead className="font-mono text-xs text-muted-foreground">x<sub>n−1</sub></TableHead>
                <TableHead className="font-mono text-xs text-muted-foreground">x<sub>n</sub></TableHead>
                <TableHead className="font-mono text-xs text-muted-foreground">f(x<sub>n−1</sub>)</TableHead>
                <TableHead className="font-mono text-xs text-muted-foreground">f(x<sub>n</sub>)</TableHead>
                <TableHead className="font-mono text-xs text-foreground font-semibold">x<sub>n+1</sub></TableHead>
                <TableHead className="font-mono text-xs text-muted-foreground">Error</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {iterations.map((iter, idx) => {
                const isLast = idx === lastIdx && converged;
                return (
                  <TableRow
                    key={iter.n}
                    className={cn(
                      'transition-colors',
                      isLast
                        ? '  hover: dark:hover:'
                        : 'hover:bg-muted/20'
                    )}
                  >
                    <TableCell className="font-mono text-sm font-semibold">{iter.n}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {formatScientific(iter.xPrev)}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {formatScientific(iter.xCurr)}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {formatScientific(iter.fxPrev)}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {formatScientific(iter.fxCurr)}
                    </TableCell>
                    <TableCell className="font-mono text-sm font-semibold text-foreground">
                      {formatScientific(iter.xNext)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          'font-mono text-[11px] tabular-nums',
                          iter.error < 1e-4
                            ? ' text-emerald-700   dark:text-emerald-400 '
                            : 'text-muted-foreground'
                        )}
                      >
                        <ErrorBar error={iter.error} />
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Result banner */}
        {root !== null && (
          <div className={cn(
            'mx-4 my-4 flex items-center gap-4 rounded-lg px-5 py-4 border',
            converged
              ? '   '
              : '   '
          )}>
            {converged ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-7 h-7 text-amber-600 dark:text-amber-400 shrink-0" />
            )}
            <div>
              <p className={cn(
                'text-xs font-medium',
                converged
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-600 dark:text-amber-400'
              )}>
                {converged ? 'Raíz encontrada' : 'Aproximación — no convergió'}
              </p>
              <p className="font-mono text-xl font-bold mt-0.5 tabular-nums">
                x ≈ {root.toFixed(10)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {iterations.length} iteraciones · φ ≈ 1.618 (convergencia superlineal)
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
