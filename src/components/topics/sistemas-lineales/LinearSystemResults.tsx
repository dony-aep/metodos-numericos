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

export function LinearSystemReadout({ result }: LinearSystemResultsProps) {
  return (
    <div className="space-y-8">
      {/* Diagnóstico del sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <Info className="w-4 h-4 text-muted-foreground" />
            Diagnóstico del sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{toClassificationLabel(result.classification)}</Badge>
            <Badge variant={result.isSquare ? 'secondary' : 'outline'}>
              {result.isSquare ? 'Cuadrado' : 'No cuadrado'}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                result.isDiagonallyDominant
                  ? '  text-emerald-700   dark:text-emerald-400'
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
                  ? ' text-emerald-800 border   dark:text-emerald-400 '
                  : ' text-amber-800 border   dark:text-amber-400 '
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
    </div>
  );
}

export function LinearSystemTables({ result }: LinearSystemResultsProps) {
  return (
    <div className="space-y-10">
      {/* Vector solución */}
      {result.solution && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Vector solución
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-medium text-muted-foreground">Variable</TableHead>
                  <TableHead className="text-right text-xs font-medium text-muted-foreground">Valor</TableHead>
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
              Residual (Ax − b)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-medium text-muted-foreground">Componente</TableHead>
                  <TableHead className="text-right text-xs font-medium text-muted-foreground">Valor</TableHead>
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
