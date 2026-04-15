import { BookOpenCheck, Sigma } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { NUMERICAL_METHODS } from '@/data/methods';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { cn } from '@/lib/utils';

const availableMethods = NUMERICAL_METHODS.filter(
  (method) => method.status === 'available'
).length;

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-foreground">
            <Sigma className="h-5 w-5" />
            <span className="text-sm font-semibold sm:text-base">
              Métodos Numéricos
            </span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <nav className="flex items-center gap-2 text-sm">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    buttonVariants({ variant: isActive ? 'secondary' : 'ghost', size: 'sm' }),
                    'text-foreground'
                  )
                }
              >
                Dashboard
              </NavLink>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-muted-foreground sm:px-6 sm:text-sm">
          <p className="inline-flex items-center gap-2 font-medium text-foreground">
            <BookOpenCheck className="h-4 w-4" />
            Plataforma de aprendizaje de análisis numérico
          </p>
          <Separator className="my-1" />
          <p className="inline-flex items-center gap-2">
            <span>Métodos disponibles:</span>
            <Badge variant="secondary">
              {availableMethods} / {NUMERICAL_METHODS.length}
            </Badge>
          </p>
        </div>
      </footer>
    </div>
  );
}
