import { LaptopMinimal, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const activeTheme = theme ?? 'system';

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
      <Button
        size="icon-sm"
        variant={activeTheme === 'light' ? 'secondary' : 'ghost'}
        onClick={() => setTheme('light')}
        className={activeTheme === 'light' ? 'text-foreground' : 'text-muted-foreground'}
        aria-label="Tema claro"
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        size="icon-sm"
        variant={activeTheme === 'dark' ? 'secondary' : 'ghost'}
        onClick={() => setTheme('dark')}
        className={activeTheme === 'dark' ? 'text-foreground' : 'text-muted-foreground'}
        aria-label="Tema oscuro"
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        size="icon-sm"
        variant={activeTheme === 'system' ? 'secondary' : 'ghost'}
        onClick={() => setTheme('system')}
        className={activeTheme === 'system' ? 'text-foreground' : 'text-muted-foreground'}
        aria-label="Tema del sistema"
      >
        <LaptopMinimal className="h-4 w-4" />
      </Button>
    </div>
  );
}
