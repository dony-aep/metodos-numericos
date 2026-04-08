import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
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

function AugmentedMatrixTable({
  matrix,
  title,
  description,
}: {
  matrix: number[][];
  title: string;
  description?: string;
}) {
  if (matrix.length === 0) return null;
  const variableCount = matrix[0].length - 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fila</TableHead>
              {Array.from({ length: variableCount }).map((_, index) => (
                <TableHead key={`head-a-${index}`} className="text-right">
                  x{index + 1}
                </TableHead>
              ))}
              <TableHead className="text-right">b</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matrix.map((row, rowIndex) => (
              <TableRow key={`matrix-row-${rowIndex}`}>
                <TableCell>F{rowIndex + 1}</TableCell>
                {row.map((value, colIndex) => (
                  <TableCell
                    key={`matrix-cell-${rowIndex}-${colIndex}`}
                    className="text-right font-mono"
                  >
                    {formatNumber(value)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function StepsTable({ steps }: { steps: GaussEliminationStep[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trazabilidad de pasos</CardTitle>
        <CardDescription>
          Registro del pivoteo, eliminación y sustitución realizado por el algoritmo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Columna pivote</TableHead>
              <TableHead className="text-right">Factor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {steps.map((step) => (
              <TableRow key={`step-${step.step}`}>
                <TableCell>{step.step}</TableCell>
                <TableCell>{typeLabel(step.type)}</TableCell>
                <TableCell>{step.pivotColumn}</TableCell>
                <TableCell className="text-right font-mono">
                  {step.factor === null ? '-' : formatNumber(step.factor)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 space-y-3">
          {steps.map((step) => (
            <div
              key={`step-detail-${step.step}`}
              className="rounded-lg border bg-muted/20 p-3 text-sm"
            >
              <p className="font-medium text-foreground">Paso {step.step}</p>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function GaussEliminationResults({ result }: GaussEliminationResultsProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resumen del resultado</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge variant="outline">Método directo</Badge>
          <Badge variant="outline">Pivoteo parcial</Badge>
          <Badge variant={result.hasUniqueSolution ? 'default' : 'destructive'}>
            {result.hasUniqueSolution ? 'Solución única' : 'Sin solución única'}
          </Badge>
          {result.determinant !== null ? (
            <Badge variant="outline">det(A) = {formatNumber(result.determinant)}</Badge>
          ) : null}
        </CardContent>
      </Card>

      {result.solution ? (
        <Card>
          <CardHeader>
            <CardTitle>Vector solución</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Variable</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.solution.map((value, index) => (
                  <TableRow key={`solution-${index}`}>
                    <TableCell>x{index + 1}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatNumber(value)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}

      {result.residual ? (
        <Card>
          <CardHeader>
            <CardTitle>Vector residual (Ax - b)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Componente</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.residual.map((value, index) => (
                  <TableRow key={`residual-${index}`}>
                    <TableCell>r{index + 1}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatNumber(value)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}

      {result.upperTriangular ? (
        <AugmentedMatrixTable
          matrix={result.upperTriangular}
          title="Matriz aumentada triangular superior"
          description="Estado final tras la eliminación hacia adelante."
        />
      ) : null}

      <StepsTable steps={result.steps} />
    </div>
  );
}
