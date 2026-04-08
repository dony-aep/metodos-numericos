import { ArrowLeft, Construction } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getMethodBySlug } from '@/data/methods';
import { cn } from '@/lib/utils';

export function MethodPage() {
  const { slug } = useParams();
  const method = slug ? getMethodBySlug(slug) : undefined;

  if (!method) {
    return (
      <Card className="border-rose-200 bg-rose-50 py-0">
        <CardHeader className="py-4">
          <CardTitle className="text-rose-900">Método no encontrado</CardTitle>
        </CardHeader>
        <CardContent className="py-2 text-sm text-rose-800">
          La ruta solicitada no corresponde a un tema registrado.
        </CardContent>
        <CardFooter className="border-t border-rose-200 bg-rose-100/50">
          <Link to="/" className={cn(buttonVariants({ size: 'sm' }), 'gap-2')}>
            <ArrowLeft className="h-4 w-4" />
            Volver al dashboard
          </Link>
        </CardFooter>
      </Card>
    );
  }

  if (method.status !== 'available') {
    return (
      <Card className="border-amber-200 bg-amber-50 py-0">
        <CardHeader className="py-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-amber-900">{method.title}</CardTitle>
            <Badge variant="outline">Próximamente</Badge>
          </div>
        </CardHeader>
        <CardContent className="py-2 text-sm text-amber-800">
          Este módulo está planificado y se implementará en las siguientes fases.
        </CardContent>
        <CardFooter className="border-t border-amber-200 bg-amber-100/50">
          <Link to="/" className={cn(buttonVariants({ size: 'sm' }), 'gap-2')}>
            <ArrowLeft className="h-4 w-4" />
            Volver al dashboard
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
      <Card className="py-0">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-2xl tracking-tight">
            {method.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground sm:text-base">
            El módulo está habilitado y este espacio quedó preparado para la
            migración completa del contenido (teoría, calculadora, tabla y gráficas).
          </p>
          <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-foreground/90">
            <p className="inline-flex items-center gap-2 font-medium">
              <Construction className="h-4 w-4 text-amber-600" />
              Siguiente implementación: migrar el código de secante desde
              <code className="ml-1 rounded bg-muted px-1 py-0.5 text-xs">
                docs/metodo-secante/src
              </code>
            </p>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/20">
        <Link
          to="/"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al dashboard
        </Link>
      </CardFooter>
    </Card>
  );
}
