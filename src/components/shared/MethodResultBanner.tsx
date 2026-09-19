import type { ReactNode } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ModuleBannerVariant } from '@/types/method-module';

interface MethodResultBannerProps {
  message: string;
  variant: ModuleBannerVariant;
  icon?: ReactNode;
}

/* El color se queda en el icono: en una pagina monocroma un bloque teñido
   grita mas de lo que informa, y el estado ya lo dice el texto. */
const variantStyles: Record<ModuleBannerVariant, string> = {
  success: 'text-emerald-700 dark:text-emerald-400',
  warning: 'text-amber-700 dark:text-amber-400',
  error: 'text-rose-700 dark:text-rose-400',
  info: 'text-sky-700 dark:text-sky-400',
};

const variantIcons: Record<ModuleBannerVariant, ReactNode> = {
  success: <CheckCircle2 className="h-4 w-4 shrink-0" />,
  warning: <AlertTriangle className="h-4 w-4 shrink-0" />,
  error: <AlertCircle className="h-4 w-4 shrink-0" />,
  info: <Info className="h-4 w-4 shrink-0" />,
};

export function MethodResultBanner({
  message,
  variant,
  icon,
}: MethodResultBannerProps) {
  return (
    <div
      className="flex items-center gap-2.5 border-y border-rule py-3"
    >
      <span className={cn('flex', variantStyles[variant])}>
        {icon ?? variantIcons[variant]}
      </span>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
