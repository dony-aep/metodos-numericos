import { BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';
import { Badge } from '@/components/ui/badge';

export function LinearSystemsTheory() {
  return (
    <TheoryStack>
      {/* Definición */}
      <TheoryBlock
        title="Definición y forma matricial"
      >
        <p>
          Un sistema de ecuaciones lineales reúne ecuaciones donde las incógnitas
          aparecen de forma lineal. Su forma compacta es:
        </p>
        <div className="border-y border-rule py-4 sm:p-4 text-center overflow-x-auto">
          <BlockMath math="A\mathbf{x} = \mathbf{b}" />
        </div>
        <p>
          Donde <strong className="text-foreground">A</strong> es la matriz de coeficientes,{' '}
          <strong className="text-foreground">x</strong> el vector de incógnitas y{' '}
          <strong className="text-foreground">b</strong> el vector de términos independientes.
        </p>
      </TheoryBlock>

      {/* Clasificación */}
      <TheoryBlock
        title="Clasificación de sistemas"
      >
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { label: 'Cuadrado', desc: 'm = n', detail: 'Mismo número de ecuaciones e incógnitas' },
            { label: 'Sobredeterminado', desc: 'm > n', detail: 'Más ecuaciones que incógnitas' },
            { label: 'Subdeterminado', desc: 'm < n', detail: 'Menos ecuaciones que incógnitas' },
          ].map((item) => (
            <div key={item.label} className="border-y border-rule py-4">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-xs font-mono">{item.desc}</Badge>
              </div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
            </div>
          ))}
        </div>
      </TheoryBlock>

      {/* Métodos de solución */}
      <TheoryBlock
        title="Métodos de solución"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-y border-rule py-4 sm:p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Directos</p>
            <p className="text-sm text-muted-foreground">
              Eliminación Gaussiana, factorización LU y factorización QR.
            </p>
          </div>
          <div className="border-y border-rule py-4 sm:p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Iterativos</p>
            <p className="text-sm text-muted-foreground">
              Jacobi, Gauss-Seidel, SOR y Gradiente Conjugado. Convergen cuando la
              matriz es diagonal dominante.
            </p>
          </div>
        </div>
      </TheoryBlock>

      {/* Mínimos cuadrados */}
      <TheoryBlock
        title="Mínimos cuadrados y condicionamiento"
      >
        <p>
          Cuando no hay solución exacta, se minimiza el error:
        </p>
        <div className="border-y border-rule py-4 sm:p-4 text-center overflow-x-auto">
          <BlockMath math={"\\min \\|A\\mathbf{x}-\\mathbf{b}\\|"} />
        </div>
        <p>
          El <strong className="text-foreground">número de condición</strong> mide sensibilidad a
          perturbaciones: matrices mal condicionadas amplifican errores.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
