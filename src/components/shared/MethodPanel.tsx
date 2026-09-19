import { NavLink } from 'react-router';
import { METHOD_FAMILIES } from '@/data/families';
import { NUMERICAL_METHODS } from '@/data/methods';
import { cn } from '@/lib/utils';

/**
 * Índice completo que despliega la barra superior, agrupado por familias.
 * Sin cabecera propia: el botón que lo abre ya dice qué es, y para cerrarlo
 * están ese mismo botón, Escape y el clic fuera.
 */
export function MethodPanel({ onNavigate }: { onNavigate: () => void }) {
  const families = METHOD_FAMILIES.map((family) => ({
    family,
    methods: NUMERICAL_METHODS.filter((method) => method.family === family.id),
  })).filter((entry) => entry.methods.length > 0);

  return (
    <div className="absolute inset-x-0 top-full max-h-[calc(100vh-3.5rem)] overflow-y-auto border-b border-border bg-background shadow-[0_24px_48px_-28px_rgb(0_0_0/0.55)]">
      <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-10">
        {/* Rejilla de verdad: con columnas CSS las familias se repartían por
            altura y los rótulos quedaban a alturas distintas. */}
        <div className="grid gap-x-10 gap-y-7 py-7 sm:grid-cols-2 lg:grid-cols-3">
          {families.map(({ family, methods }) => (
            <div key={family.id}>
              <p className="text-sm font-medium">{family.label}</p>
              <ul className="mt-2.5">
                {methods.map((method) => (
                  <li key={method.slug}>
                    <NavLink
                      to={`/metodos/${method.slug}`}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-2.5 py-1 text-sm transition-colors',
                          isActive
                            ? 'font-medium text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            aria-hidden="true"
                            className={cn(
                              'h-4 w-0.5 shrink-0',
                              isActive ? 'bg-foreground' : 'bg-transparent'
                            )}
                          />
                          {method.navTitle}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
