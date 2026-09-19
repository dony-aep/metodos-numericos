import { AlertTriangle, CheckCircle2, Info, List } from 'lucide-react';
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
import type {
  GaussEliminationResult,
  GaussEliminationStep,
  GaussStepType,
} from '@/types/gauss-elimination';

interface GaussEliminationResultsProps {
  result: GaussEliminationResult;
}

function formatNumber(value: number): string {
  if (Math.abs(value) < 1e-10) return '0';
  if (Math.abs(value) >= 1e4 || Math.abs(value) < 1e-4) return value.toExponential(4);
  return value.toFixed(6);
}

function typeLabel(type: GaussStepType): string {
  if (type === 'pivote') return 'Pivote';
  if (type === 'intercambio') return 'Intercambio';
  if (type === 'eliminacion') return 'Eliminación';
  return 'Sustitución';
}

function typeBadgeVariant(type: GaussStepType) {
  if (type === 'intercambio') return 'secondary' as const;
  if (type === 'sustitucion') return 'outline' as const;
  return 'outline' as const;
}

function AugmentedMatrixTable({
  matrix,
  title,
}: {
  matrix: number[][];
  title: string;
}) {
  if (matrix.length === 0) return null;
  const variableCount = matrix[0].length - 1;

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Fila
                </TableHead>
                {Array.from({ length: variableCount }).map((_, index) => (
                  <TableHead
                    key={`head-a-${index}`}
                    className="text-right"
                  >
                    x{index + 1}
                  </TableHead>
                ))}
                <TableHead className="text-right">
                  b
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matrix.map((row, rowIndex) => (
                <TableRow key={`matrix-row-${rowIndex}`}>
                  <TableCell className="font-medium text-muted-foreground">
                    F{rowIndex + 1}
                  </TableCell>
                  {row.map((value, colIndex) => (
                    <TableCell
                      key={`matrix-cell-${rowIndex}-${colIndex}`}
                      className={cn(
                        'text-right font-mono tabular-nums',
                        colIndex === variableCount && 'border-l border-border'
                      )}
                    >
                      {formatNumber(value)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function StepsTable({ steps }: { steps: GaussEliminationStep[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="h-4 w-4 text-muted-foreground" />
          Trazabilidad de pasos
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            {steps.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  #
                </TableHead>
                <TableHead>
                  Tipo
                </TableHead>
                <TableHead>
                  Col. pivote
                </TableHead>
                <TableHead className="text-right">
                  Factor
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {steps.map((step) => (
                <TableRow key={`step-${step.step}`}>
                  <TableCell className="font-mono tabular-nums text-muted-foreground">
                    {step.step}
                  </TableCell>
                  <TableCell>
                    <Badge variant={typeBadgeVariant(step.type)} className="text-xs">
                      {typeLabel(step.type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono tabular-nums">{step.pivotColumn}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {step.factor === null ? '—' : formatNumber(step.factor)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-px border-t border-border">
          {steps.map((step) => (
            <div
              key={`step-detail-${step.step}`}
              className="flex gap-3 border-b border-border px-4 py-3 text-sm last:border-b-0"
            >
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {String(step.step).padStart(2, '0')}
              </span>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function GaussEliminationReadout({ result }: GaussEliminationResultsProps) {
  const unique = result.hasUniqueSolution;

  return (
    <div className="space-y-8">
      {/* Diagnóstico */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            {unique ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            )}
            Diagnóstico
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge
            className={cn(
              'text-xs',
              unique
                ? '  text-emerald-700   dark:text-emerald-300'
                : '  text-amber-700   dark:text-amber-300'
            )}
            variant="outline"
          >
            {unique ? 'Solución única' : 'Sin solución única'}
          </Badge>
          {result.determinant !== null ? (
            <Badge variant="outline" className="font-mono text-xs tabular-nums">
              det(A) = {formatNumber(result.determinant)}
            </Badge>
          ) : null}
        </CardContent>
      </Card>
      {/* Triangular superior */}
      {result.upperTriangular ? (
        <AugmentedMatrixTable
          matrix={result.upperTriangular}
          title="Matriz triangular superior"
        />
      ) : null}
      {/* Pasos */}
      <StepsTable steps={result.steps} />
    </div>
  );
}

export function GaussEliminationTables({ result }: GaussEliminationResultsProps) {
  return (
    <div className="space-y-10">
      {/* Vector solución */}
      {result.solution ? (
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              Vector solución
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Variable
                    </TableHead>
                    <TableHead className="text-right">
                      Valor
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.solution.map((value, index) => (
                    <TableRow key={`solution-${index}`}>
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
      {/* Residual */}
      {result.residual ? (
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-base text-muted-foreground">
              Vector residual (Ax − b)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Componente
                    </TableHead>
                    <TableHead className="text-right">
                      Valor
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.residual.map((value, index) => (
                    <TableRow key={`residual-${index}`}>
                      <TableCell className="font-medium text-muted-foreground">
                        r<sub>{index + 1}</sub>
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
    </div>
  );
}
