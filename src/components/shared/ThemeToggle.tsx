import { LaptopMinimal, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const ORDER = ['light', 'dark', 'system'] as const;

const LABELS: Record<(typeof ORDER)[number], string> = {
  light: 'Tema claro',
  dark: 'Tema oscuro',
  system: 'Tema del sistema',
};

const ICONS = {
  light: Sun,
  dark: Moon,
  system: LaptopMinimal,
};

/**
 * Un solo botón que rota entre los tres temas. Tres botones en fila no caben
 * en la barra a 375px y, salvo para elegir, tampoco aportan nada.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const active = (ORDER.find((option) => option === theme) ?? 'system') as
    (typeof ORDER)[number];
  const next = ORDER[(ORDER.indexOf(active) + 1) % ORDER.length];
  const Icon = ICONS[active];

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setTheme(next)}
      className="text-muted-foreground hover:text-foreground"
      aria-label={`${LABELS[active]}. Cambiar a: ${LABELS[next].toLowerCase()}`}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
