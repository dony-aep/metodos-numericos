import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { InlineMath } from '@/components/shared/MathRenderer';
import { MarginGrid, MarginSection } from '@/components/shared/MarginLayout';
import { METHOD_FAMILIES } from '@/data/families';
import { NUMERICAL_METHODS } from '@/data/methods';

export function DashboardPage() {
  const families = METHOD_FAMILIES.map((family) => ({
    family,
    methods: NUMERICAL_METHODS.filter((method) => method.family === family.id),
  })).filter((entry) => entry.methods.length > 0);

  return (
    <MarginGrid>
      <MarginSection contentClassName="py-10 lg:py-14">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-[2.5rem] sm:leading-none">
          Métodos numéricos
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Cada módulo trae la teoría del método, una calculadora para probarlo
          con tus propios datos y la tabla de iteraciones que enseña cómo llega
          al resultado.
        </p>
      </MarginSection>

      {families.map(({ family, methods }, index) => (
        <MarginSection
          key={family.id}
          label={family.label}
          note={family.summary}
          divider={index < families.length - 1}
          contentClassName="py-3 lg:py-3"
        >
          <ul>
            {methods.map((method, position) => {
              const isLast = position === methods.length - 1;
              const rowEdge = isLast ? '' : 'border-b border-rule';

              if (method.status !== 'available') {
                return (
                  <li key={method.slug} className={`py-4 opacity-50 ${rowEdge}`}>
                    <p className="text-[15px] font-medium">{method.title}</p>
                    <p className="mt-1.5 text-[13px] text-muted-foreground">
                      En preparación
                    </p>
                  </li>
                );
              }

              return (
                <li key={method.slug} className={rowEdge}>
                  <Link
                    to={`/metodos/${method.slug}`}
                    className="group flex items-center gap-6 py-4 lg:gap-10"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-medium">
                        {method.title}
                      </span>
                      <span className="mt-1.5 block text-[13px] leading-relaxed text-muted-foreground">
                        {method.shortDescription}
                      </span>
                    </span>

                    {/* Un método se reconoce por su fórmula antes que por su
                        nombre; en pantallas estrechas no cabe y se cae. */}
                    <span className="hidden shrink-0 overflow-hidden text-right text-muted-foreground lg:block lg:w-64">
                      <InlineMath math={method.formulas[0].latex} />
                    </span>

                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </MarginSection>
      ))}
    </MarginGrid>
  );
}
