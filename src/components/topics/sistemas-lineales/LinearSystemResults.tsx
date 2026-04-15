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
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LinearSystemResult } from '@/types/linear-system';

interface LinearSystemResultsProps {
  result: LinearSystemResult;
}

function formatNumber(value: number): string {
  if (Math.abs(value) < 1e-10) return '0';
  if (Math.abs(value) >= 1e4 || Math.abs(value) < 1e-4) {
    return value.toExponential(6);
  }
  return value.toFixed(6);
}

function toClassificationLabel(classification: LinearSystemResult['classification']) {
  if (classification === 'cuadrado') return 'Cuadrado';
  if (classification === 'sobredeterminado') return 'Sobredeterminado';
  return 'Subdeterminado';
}

export function LinearSystemResults({ result }: LinearSystemResultsProps) {
  return (
    <div className="space-y-4">
      {/* Diagnóstico del sistema */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <Info className="w-4 h-4 text-muted-foreground" />
            Diagnóstico del sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{toClassificationLabel(result.classification)}</Badge>
            <Badge variant={result.isSquare ? 'secondary' : 'outline'}>
              {result.isSquare ? 'Cuadrado' : 'No cuadrado'}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                result.isDiagonallyDominant
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400'
                  : ''
              )}
            >
              {result.isDiagonallyDominant
                ? 'Diagonal dominante'
                : 'Sin diagonal dominante'}
            </Badge>
            <Badge
              className={cn(
                result.hasUniqueSolution
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                  : 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
              )}
            >
              {result.hasUniqueSolution
                ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Solución única
                    </>
                  )
                : (
                    <>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Sin solución única
                    </>
                  )}
            </Badge>
            {result.determinant !== null && (
              <Badge variant="outline" className="font-mono text-xs">
                det(A) = {formatNumber(result.determinant)}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Vector solución */}
      {result.solution && (
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Vector solución
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Variable</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-widest text-muted-foreground">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.solution.map((value, index) => (
                  <TableRow key={`solution-${index}`} className="hover:bg-muted/20">
                    <TableCell className="font-mono text-sm">
                      x<sub>{index + 1}</sub>
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm font-semibold tabular-nums">
                      {formatNumber(value)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Vector residual */}
      {result.residual && (
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
              Residual (Ax − b)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Componente</TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-widest text-muted-foreground">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.residual.map((value, index) => (
                  <TableRow key={`residual-${index}`} className="hover:bg-muted/20">
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      r<sub>{index + 1}</sub>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs text-muted-foreground tabular-nums">
                      {formatNumber(value)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
