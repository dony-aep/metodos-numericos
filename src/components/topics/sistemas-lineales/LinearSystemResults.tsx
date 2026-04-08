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
      <Card>
        <CardHeader>
          <CardTitle>Resumen del sistema</CardTitle>
          <CardDescription>
            Diagnóstico básico de la estructura y estabilidad del sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{toClassificationLabel(result.classification)}</Badge>
          <Badge variant={result.isSquare ? 'secondary' : 'outline'}>
            {result.isSquare ? 'Sistema cuadrado' : 'No cuadrado'}
          </Badge>
          <Badge variant={result.isDiagonallyDominant ? 'secondary' : 'outline'}>
            {result.isDiagonallyDominant
              ? 'Diagonal dominante'
              : 'Sin diagonal dominante'}
          </Badge>
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
                  <TableHead className="text-right">Residual</TableHead>
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
    </div>
  );
}
