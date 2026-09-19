import type { ReactNode } from 'react';

interface MethodEmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function MethodEmptyState({ title, description }: MethodEmptyStateProps) {
  return (
    <div className="border-y border-border py-12 text-center">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
