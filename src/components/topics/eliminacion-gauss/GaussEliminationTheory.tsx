import { BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function GaussEliminationTheory() {
  return (
    <TheoryStack>
      {/* Idea general */}
      <TheoryBlock
        title="Idea general del método"
        asides={[
          { content: (
            <>
          <BlockMath math="A x = b" />
            </>
          ) },
        ]}
      >
        <p>
          La eliminación de Gauss transforma un sistema lineal en otro equivalente,
          pero más simple de resolver:
        </p>
        <p>
          Primero se aplica <strong>eliminación hacia adelante</strong> para obtener
          una matriz triangular superior, y luego <strong>sustitución hacia atrás</strong>{' '}
          para calcular las incógnitas.
        </p>
      </TheoryBlock>

      {/* Etapas del algoritmo */}
      <TheoryBlock
        title="Etapas del algoritmo"
        asides={[
          { content: (
            <>
          <BlockMath math="m_{ik} = \\frac{a_{ik}}{a_{kk}}, \\quad F_i \\leftarrow F_i - m_{ik}F_k" />
            </>
          ) },
        ]}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { step: '01', label: 'Selección de pivote', desc: 'Elegir el mayor elemento en la columna' },
            { step: '02', label: 'Eliminación por filas', desc: 'Reducir a ceros bajo el pivote' },
            { step: '03', label: 'Sustitución hacia atrás', desc: 'Resolver desde la última ecuación' },
          ].map((item) => (
            <div key={item.step} className="border-y border-rule py-4">
              <span className="font-mono text-xs text-muted-foreground">{item.step}</span>
              <p className="mt-1 font-medium text-sm">{item.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </TheoryBlock>

      {/* Pivoteo parcial */}
      <TheoryBlock
        title="Pivoteo parcial y estabilidad"
        asides={[
          { content: (
            <>
          <BlockMath math="|a_{pk}| = \\max_{i\\ge k}|a_{ik}|" />
            </>
          ) },
        ]}
      >
        <p>
          Para evitar divisiones por valores muy pequeños, se usa pivoteo parcial:
          se intercambia la fila actual con la que tenga el mayor valor absoluto en
          la columna del pivote.
        </p>
        <p>
          Esta estrategia reduce errores de redondeo y mejora la robustez numérica.
        </p>
      </TheoryBlock>

      {/* Complejidad */}
      <TheoryBlock
        title="Complejidad y uso práctico"
        asides={[
          { content: (
            <>
          <BlockMath math="\\text{Costo dominante} \\approx O(n^3)" />
            </>
          ) },
        ]}
      >
        <p>
          Es un método directo fundamental y base de técnicas como la factorización
          LU. Se utiliza ampliamente en ingeniería, simulación y ciencia de datos.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
