import { AlertTriangle, CheckCircle2, Info, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { IterativeMethodResult } from '@/types/iterative-methods';

interface IterativeMethodResultsProps {
  result: IterativeMethodResult;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) < 1e-10) return '0';
  if (Math.abs(value) >= 1e4 || (Math.abs(value) < 1e-4 && value !== 0))
    return value.toExponential(4);
  return value.toFixed(6);
}

function formatError(value: number): string {
  if (Number.isNaN(value)) return '—';
  return value.toExponential(4);
}

export function IterativeMethodResults({ result }: IterativeMethodResultsProps) {
  const methodLabel = result.method === 'jacobi' ? 'Jacobi' : 'Gauss-Seidel';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Diagnóstico */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            {result.converged ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            )}
            Diagnóstico — {methodLabel}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge
            className={cn(
              'text-xs',
              result.converged
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300'
                : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300'
            )}
            variant="outline"
          >
            {result.converged ? 'Convergió' : 'No convergió'}
          </Badge>
          <Badge
            className={cn(
              'text-xs',
              result.isDiagonallyDominant
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300'
                : ''
            )}
            variant="outline"
          >
            {result.isDiagonallyDominant
              ? 'Diagonalmente dominante'
              : 'No diagonalmente dominante'}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs tabular-nums">
            {result.totalIterations} iteraciones
          </Badge>
          <Badge variant="outline" className="font-mono text-xs tabular-nums">
            error = {formatError(result.finalError)}
          </Badge>
        </CardContent>
      </Card>

      {/* Vector solución */}
      {result.solution ? (
        <Card className="border-border bg-card">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              Vector solución
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20">
                    <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                      Variable
                    </TableHead>
                    <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                      Valor
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.solution.map((value, index) => (
                    <TableRow key={`sol-${index}`}>
                      <TableCell className="font-medium">
                        x<sub>{index + 1}</sub>
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        {formatNumber(value)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Tabla de iteraciones */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
            Tabla de iteraciones
            <Badge variant="secondary" className="ml-auto font-mono text-xs">
              {result.iterations.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                    k
                  </TableHead>
                  {result.solution
                    ? result.solution.map((_, i) => (
                        <TableHead
                          key={`th-x-${i}`}
                          className="text-right text-[10px] font-semibold uppercase tracking-wider"
                        >
                          x{i + 1}
                        </TableHead>
                      ))
                    : result.iterations[0]?.values.map((_, i) => (
                        <TableHead
                          key={`th-x-${i}`}
                          className="text-right text-[10px] font-semibold uppercase tracking-wider"
                        >
                          x{i + 1}
                        </TableHead>
                      ))}
                  <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                    Error
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.iterations.map((row) => {
                  const isConverged =
                    result.converged && row.iteration === result.totalIterations;
                  return (
                    <TableRow
                      key={`iter-${row.iteration}`}
                      className={cn(
                        isConverged &&
                          'bg-emerald-50 dark:bg-emerald-950/30'
                      )}
                    >
                      <TableCell className="font-mono tabular-nums text-muted-foreground">
                        {row.iteration}
                      </TableCell>
                      {row.values.map((val, i) => (
                        <TableCell
                          key={`val-${row.iteration}-${i}`}
                          className="text-right font-mono tabular-nums"
                        >
                          {formatNumber(val)}
                        </TableCell>
                      ))}
                      <TableCell className="text-right font-mono tabular-nums">
                        {formatError(row.error)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Vector residual */}
      {result.residual ? (
        <Card className="border-border bg-card">
          <CardHeader className="pb-0">
            <CardTitle className="text-base text-muted-foreground">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Vector residual (Ax − b)
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20">
                    <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                      Componente
                    </TableHead>
                    <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
                      Valor
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.residual.map((val, i) => (
                    <TableRow key={`res-${i}`}>
                      <TableCell className="font-medium text-muted-foreground">
                        r<sub>{i + 1}</sub>
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">
                        {formatNumber(val)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
