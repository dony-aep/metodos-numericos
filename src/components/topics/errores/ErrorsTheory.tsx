import { InlineMath, BlockMath } from '@/components/shared/MathRenderer';
import { TheoryBlock, TheoryStack } from '@/components/shared/TheoryBlock';

export function ErrorsTheory() {
  return (
    <TheoryStack>
      {/* Concepto */}
      <TheoryBlock
        title="¿Qué son los errores numéricos?"
      >
        <p>
          En análisis numérico, casi nunca se obtiene una solución exacta. Se
          construyen <strong className="text-foreground">aproximaciones</strong> y
          se estudia qué tan buena es la respuesta midiendo el error.
        </p>
        <p>
          El error mide la diferencia entre el valor verdadero{' '}
          <InlineMath math="x" /> y el valor aproximado{' '}
          <InlineMath math="\tilde{x}" />.
        </p>
      </TheoryBlock>

      {/* Tipos de error */}
      <TheoryBlock
        title="Tipos de error"
      >
        <div>
          <p className="mb-2 font-medium text-foreground">Error absoluto</p>
          <div className="border-y border-rule py-4">
            <BlockMath math="E_a = |x - \tilde{x}|" />
          </div>
          <p className="mt-2">Mide la distancia directa entre el valor verdadero y el aproximado.</p>
        </div>
        <div>
          <p className="mb-2 font-medium text-foreground">Error relativo</p>
          <div className="border-y border-rule py-4">
            <BlockMath math="E_r = \frac{|x - \tilde{x}|}{|x|}" />
          </div>
          <p className="mt-2">Compara el error con el tamaño del valor real. Más útil para comparar magnitudes.</p>
        </div>
        <div>
          <p className="mb-2 font-medium text-foreground">Error porcentual</p>
          <div className="border-y border-rule py-4">
            <BlockMath math="E_\% = E_r \times 100\%" />
          </div>
        </div>
      </TheoryBlock>

      {/* Fuentes de error */}
      <TheoryBlock
        title="Fuentes de error"
      >
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong className="text-foreground">Redondeo:</strong> la computadora
            no puede representar todos los reales exactamente.
          </li>
          <li>
            <strong className="text-foreground">Truncamiento:</strong> se reemplaza
            un objeto exacto (serie infinita, derivada) por una versión finita.
          </li>
          <li>
            <strong className="text-foreground">Cancelación:</strong> restar dos
            números muy parecidos pierde cifras significativas.
          </li>
          <li>
            <strong className="text-foreground">Propagación:</strong> un pequeño
            error de entrada se amplifica durante el cálculo.
          </li>
          <li>
            <strong className="text-foreground">Discretización:</strong> convertir
            un problema continuo en uno discreto (integrales, EDOs).
          </li>
        </ul>
      </TheoryBlock>

      {/* Series de Taylor */}
      <TheoryBlock
        title="Aproximación por series de Taylor"
        asides={[
          { content: (
            <>
          <BlockMath math="f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots" />
            </>
          ) , wide: true },
        ]}
      >
        <p>
          La serie de Taylor permite aproximar una función alrededor de un
          punto <InlineMath math="a" />:
        </p>
        <p>
          Al cortar después de <InlineMath math="n" /> términos, aparece el{' '}
          <strong className="text-foreground">error de truncamiento</strong>,
          que disminuye al aumentar el grado del polinomio.
        </p>
      </TheoryBlock>

      {/* Condicionamiento y estabilidad */}
      <TheoryBlock
        title="Condicionamiento y estabilidad"
        asides={[
          { content: (
            <>
          <BlockMath math="|\text{error}| \leq C \cdot h^p" />
            </>
          ) },
        ]}
      >
        <p>
          <strong className="text-foreground">Condicionamiento:</strong> propiedad
          del problema. Un problema mal condicionado amplifica pequeñas
          perturbaciones en los datos.
        </p>
        <p>
          <strong className="text-foreground">Estabilidad:</strong> propiedad del
          algoritmo. Un algoritmo inestable amplifica errores de redondeo
          durante el cálculo.
        </p>
        <p>
          Donde <InlineMath math="h" /> es el tamaño de paso,{' '}
          <InlineMath math="p" /> es el orden del método y{' '}
          <InlineMath math="C" /> es una constante. Mayor orden = convergencia
          más rápida.
        </p>
      </TheoryBlock>
    </TheoryStack>
  );
}
