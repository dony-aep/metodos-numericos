import type { ReactNode } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ModuleBannerVariant } from '@/types/method-module';

interface MethodResultBannerProps {
  message: string;
  variant: ModuleBannerVariant;
  icon?: ReactNode;
}

const variantStyles: Record<ModuleBannerVariant, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300',
  warning: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300',
  error: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300',
  info: 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-300',
};

const variantIcons: Record<ModuleBannerVariant, ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />,
  warning: <AlertTriangle className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />,
  error: <AlertCircle className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />,
  info: <Info className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />,
};

export function MethodResultBanner({
  message,
  variant,
  icon,
}: MethodResultBannerProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border-2 p-3 sm:gap-4 sm:p-4',
        variantStyles[variant]
      )}
    >
      {icon ?? variantIcons[variant]}
      <p className="text-sm font-medium sm:text-base">{message}</p>
    </div>
  );
}
