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
    <Card className="border-border bg-card">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-base">
          <Info className="h-4 w-4 text-muted-foreground" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20">
                <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                  Fila
                </TableHead>
                {Array.from({ length: variableCount }).map((_, index) => (
                  <TableHead
                    key={`head-a-${index}`}
                    className="text-right text-[10px] font-semibold uppercase tracking-wider"
                  >
                    x{index + 1}
                  </TableHead>
                ))}
                <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
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
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <List className="h-4 w-4 text-muted-foreground" />
          Trazabilidad de pasos
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            {steps.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20">
                <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                  #
                </TableHead>
                <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                  Tipo
                </TableHead>
                <TableHead className="text-[10px] font-semibold uppercase tracking-wider">
                  Col. pivote
                </TableHead>
                <TableHead className="text-right text-[10px] font-semibold uppercase tracking-wider">
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

export function GaussEliminationResults({ result }: GaussEliminationResultsProps) {
  const unique = result.hasUniqueSolution;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Diagnóstico */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
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
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300'
                : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300'
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
        <Card className="border-border bg-card">
          <CardHeader className="pb-0">
            <CardTitle className="text-base text-muted-foreground">
              Vector residual (Ax − b)
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
