import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router';
import { BrandMark } from '@/components/shared/BrandMark';
import { MethodPanel } from '@/components/shared/MethodPanel';
import { SiteCredits } from '@/components/shared/SiteCredits';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { cn } from '@/lib/utils';

export function AppLayout() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelPath, setPanelPath] = useState('');
  const { pathname } = useLocation();

  // Navegar cierra el panel, también con los botones atrás y adelante.
  if (panelOpen && panelPath !== pathname) {
    setPanelOpen(false);
  }

  useEffect(() => {
    if (!panelOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPanelOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [panelOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-background">
        {/* El panel se ancla aquí para caer encima del contenido, no empujarlo. */}
        <div className="relative z-10 border-b border-border bg-background">
          <div className="mx-auto flex h-14 w-full max-w-[90rem] items-center justify-between px-6 lg:px-10">
            <Link to="/" className="flex items-center gap-2">
              <BrandMark />
              <span className="whitespace-nowrap text-sm font-semibold tracking-tight">
                Métodos numéricos
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setPanelPath(pathname);
                  setPanelOpen((open) => !open);
                }}
                aria-expanded={panelOpen}
                className={cn(
                  'inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm transition-colors',
                  panelOpen
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                Métodos
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform',
                    panelOpen && 'rotate-180'
                  )}
                />
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {panelOpen && (
          <MethodPanel onNavigate={() => setPanelOpen(false)} />
        )}
      </header>

      {panelOpen && (
        <button
          type="button"
          aria-label="Cerrar el índice"
          onClick={() => setPanelOpen(false)}
          className="fixed inset-0 z-30 cursor-default bg-black/40"
        />
      )}

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[90rem]">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-[90rem] px-6 py-5 lg:px-10">
          <SiteCredits />
        </div>
      </footer>
    </div>
  );
}
