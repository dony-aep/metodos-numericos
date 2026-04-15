import { ArrowLeft } from 'lucide-react';
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
      <Card className="border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/20 py-0">
        <CardHeader className="py-4">
          <CardTitle className="text-rose-900 dark:text-rose-300">Método no encontrado</CardTitle>
        </CardHeader>
        <CardContent className="py-2 text-sm text-rose-800 dark:text-rose-400">
          La ruta solicitada no corresponde a un tema registrado.
        </CardContent>
        <CardFooter className="border-t border-rose-200 dark:border-rose-800 bg-rose-100/50 dark:bg-rose-950/30">
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
      <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20 py-0">
        <CardHeader className="py-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-amber-900 dark:text-amber-300">{method.title}</CardTitle>
            <Badge variant="outline">Próximamente</Badge>
          </div>
        </CardHeader>
        <CardContent className="py-2 text-sm text-amber-800 dark:text-amber-400">
          Este módulo está planificado y se implementará próximamente.
        </CardContent>
        <CardFooter className="border-t border-amber-200 dark:border-amber-800 bg-amber-100/50 dark:bg-amber-950/30">
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
            Este módulo está registrado pero su contenido aún no se ha integrado
            a esta vista. Accede desde el dashboard para ver si hay una página
            dedicada disponible.
          </p>
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
