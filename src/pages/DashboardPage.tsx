import { ArrowRight, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NUMERICAL_METHODS } from '@/data/methods';
import { cn } from '@/lib/utils';

export function DashboardPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Dashboard de Métodos Numéricos
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
          Selecciona un tema para entrar a su módulo. Cada tema tendrá teoría,
          fórmulas, calculadora interactiva y visualización de resultados.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {NUMERICAL_METHODS.map((method) => {
          const isAvailable = method.status === 'available';

          return (
            <Card key={method.slug} className="h-full justify-between py-0">
              <CardHeader className="border-b py-4">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{method.title}</CardTitle>
                  <Badge variant={isAvailable ? 'secondary' : 'outline'}>
                    {isAvailable ? 'Disponible' : 'Próximamente'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <p className="text-sm text-muted-foreground">{method.shortDescription}</p>
              </CardContent>
              <CardFooter className="border-t bg-muted/20">
                {isAvailable ? (
                  <Link
                    to={`/metodos/${method.slug}`}
                    className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'gap-2')}
                  >
                    Entrar al módulo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
                    <Clock3 className="h-4 w-4" />
                    En preparación
                  </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
