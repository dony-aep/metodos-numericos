import { BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function IterativeMethodsTheory() {
  return (
    <TheoryStack>
      {/* Idea general */}
      <TheoryBlock
        title="Idea general"
        asides={[
          { content: (
            <>
          <BlockMath math="x^{(0)}, \; x^{(1)}, \; x^{(2)}, \; \dots \;\to\; x^*" />
            </>
          ) },
        ]}
      >
        <p>
          Los métodos iterativos generan una sucesión de aproximaciones
          que converge a la solución del sistema <strong>Ax = b</strong>.
          Se parte de un vector inicial y se mejora en cada paso.
        </p>
        <p>
          Se descompone la matriz como <strong>A = D − L − U</strong> donde
          D es la diagonal, L la triangular inferior y U la triangular superior.
        </p>
      </TheoryBlock>

      {/* Jacobi */}
      <TheoryBlock
        title="Método de Jacobi"
        asides={[
          { content: (
            <>
          <BlockMath math="x_i^{(k+1)} = \frac{1}{a_{ii}}\left(b_i - \sum_{j \neq i} a_{ij}x_j^{(k)}\right)" />
            </>
          ) },
          { content: (
            <>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Forma matricial
          </p>
          <BlockMath math="x^{(k+1)} = D^{-1}(L+U)x^{(k)} + D^{-1}b" />
            </>
          ) },
        ]}
      >
        <p>
          Cada componente se calcula usando <strong>solo los valores de la
          iteración anterior</strong>. No se reutilizan valores recién calculados.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Ventajas
            </p>
            <ul className="space-y-1 text-xs text-foreground/80">
              <li>• Fácil de implementar</li>
              <li>• Ideal para paralelización</li>
              <li>• Conceptualmente simple</li>
            </ul>
          </div>
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-red-700 dark:text-red-400">
              Desventajas
            </p>
            <ul className="space-y-1 text-xs text-foreground/80">
              <li>• Convergencia más lenta</li>
              <li>• No siempre converge</li>
              <li>• Requiere buenas condiciones en A</li>
            </ul>
          </div>
        </div>
      </TheoryBlock>

      {/* Gauss-Seidel */}
      <TheoryBlock
        title="Método de Gauss-Seidel"
        asides={[
          { content: (
            <>
          <BlockMath math="x_i^{(k+1)} = \frac{1}{a_{ii}}\left(b_i - \sum_{j=1}^{i-1} a_{ij}x_j^{(k+1)} - \sum_{j=i+1}^{n} a_{ij}x_j^{(k)}\right)" />
            </>
          ) },
          { content: (
            <>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Forma matricial
          </p>
          <BlockMath math="x^{(k+1)} = (D-L)^{-1}Ux^{(k)} + (D-L)^{-1}b" />
            </>
          ) },
        ]}
      >
        <p>
          A diferencia de Jacobi, <strong>reutiliza inmediatamente los valores
          nuevos</strong> a medida que se van calculando dentro de la misma iteración.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Ventajas
            </p>
            <ul className="space-y-1 text-xs text-foreground/80">
              <li>• Converge más rápido que Jacobi</li>
              <li>• Menor número de iteraciones</li>
              <li>• Muy usado en la práctica</li>
            </ul>
          </div>
          <div className="border-y border-rule py-4">
            <p className="mb-1 text-xs font-semibold text-red-700 dark:text-red-400">
              Desventajas
            </p>
            <ul className="space-y-1 text-xs text-foreground/80">
              <li>• Más difícil de paralelizar</li>
              <li>• Puede fallar sin condiciones adecuadas</li>
            </ul>
          </div>
        </div>
      </TheoryBlock>

      {/* Comparación */}
      <TheoryBlock
        title="Comparación"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: 'Uso de valores nuevos', jacobi: 'No', gs: 'Sí' },
            { label: 'Velocidad', jacobi: 'Más lenta', gs: 'Más rápida' },
            { label: 'Paralelización', jacobi: 'Mejor', gs: 'Más difícil' },
            { label: 'Iteraciones típicas', jacobi: 'Más', gs: 'Menos' },
          ].map((row) => (
            <div
              key={row.label}
              className="border-y border-rule py-4"
            >
              <p className="text-xs font-medium text-muted-foreground">
                {row.label}
              </p>
              <div className="mt-1 flex items-center gap-3 text-sm">
                <span className="font-medium">J: {row.jacobi}</span>
                <span className="text-muted-foreground">|</span>
                <span className="font-medium">GS: {row.gs}</span>
              </div>
            </div>
          ))}
        </div>
      </TheoryBlock>

      {/* Convergencia */}
      <TheoryBlock
        title="Condiciones de convergencia"
        asides={[
          { content: (
            <>
          <BlockMath math="|a_{ii}| > \sum_{j \neq i} |a_{ij}| \quad \text{para cada fila}" />
            </>
          ) },
        ]}
      >
        <p>
          Estos métodos <strong>no siempre convergen</strong>. La convergencia
          está garantizada si la matriz es estrictamente diagonalmente dominante:
        </p>
        <p>
          También converge si el radio espectral de la matriz de iteración
          es menor que 1.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border-y border-rule py-4">
            <span className="font-mono text-xs text-muted-foreground">01</span>
            <p className="mt-1 text-sm font-medium">Criterio de parada por error</p>
            <div className="mt-2 rounded border border-border bg-muted/30 p-2">
              <BlockMath math="\|x^{(k+1)} - x^{(k)}\| < \varepsilon" />
            </div>
          </div>
          <div className="border-y border-rule py-4">
            <span className="font-mono text-xs text-muted-foreground">02</span>
            <p className="mt-1 text-sm font-medium">Criterio por residuo</p>
            <div className="mt-2 rounded border border-border bg-muted/30 p-2">
              <BlockMath math="\|b - Ax^{(k)}\| < \varepsilon" />
            </div>
          </div>
        </div>
      </TheoryBlock>

      {/* Tip */}
      <TheoryBlock
        title="Cuándo usar cada método"
      >
        <p>
          Elige <strong>Jacobi</strong> cuando necesites paralelización o un método
          conceptualmente simple. Elige <strong>Gauss-Seidel</strong> cuando busques
          convergencia más rápida en ejecución secuencial. En ambos casos, verifica
          que la matriz sea diagonalmente dominante o que el radio espectral sea menor
          que 1.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
