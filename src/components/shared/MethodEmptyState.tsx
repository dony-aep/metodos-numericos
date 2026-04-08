import type { ReactNode } from 'react';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MethodEmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function MethodEmptyState({
  title,
  description,
  icon,
}: MethodEmptyStateProps) {
  return (
    <Card className="bg-muted/30">
      <CardContent className="px-4 py-10 text-center sm:py-16">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted sm:mb-4 sm:h-16 sm:w-16">
          {icon ?? <BarChart3 className="h-6 w-6 text-muted-foreground sm:h-8 sm:w-8" />}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground sm:text-xl">{title}</h3>
        <p className="mx-auto max-w-md text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
