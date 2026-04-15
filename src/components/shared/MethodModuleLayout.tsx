import type { ReactNode } from 'react';
import { BookOpen, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { MethodTemplateLabels } from '@/types/method-module';

interface MethodModuleLayoutProps {
  labels?: Partial<MethodTemplateLabels>;
  calculatorIcon?: ReactNode;
  theoryIcon?: ReactNode;
  inputSection: ReactNode;
  resultsSection?: ReactNode;
  emptyState?: ReactNode;
  theorySection: ReactNode;
  defaultTab?: 'calculator' | 'theory';
}

const DEFAULT_LABELS: MethodTemplateLabels = {
  calculatorTab: 'Calculadora',
  theoryTab: 'Teoría',
  inputSectionTitle: 'Parámetros de Entrada',
};

export function MethodModuleLayout({
  labels,
  calculatorIcon,
  theoryIcon,
  inputSection,
  resultsSection,
  emptyState,
  theorySection,
  defaultTab = 'calculator',
}: MethodModuleLayoutProps) {
  const mergedLabels: MethodTemplateLabels = {
    ...DEFAULT_LABELS,
    ...labels,
  };

  return (
    <section className="space-y-4 sm:space-y-6">
      <Tabs defaultValue={defaultTab} className="space-y-4 sm:space-y-6">
        <TabsList className="mx-auto grid h-10 w-full max-w-xs grid-cols-2 sm:h-11 sm:max-w-md">
          <TabsTrigger
            value="calculator"
            className="gap-1.5 text-xs sm:gap-2 sm:text-sm"
          >
            {calculatorIcon ?? <Calculator className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            {mergedLabels.calculatorTab}
          </TabsTrigger>
          <TabsTrigger
            value="theory"
            className="gap-1.5 text-xs sm:gap-2 sm:text-sm"
          >
            {theoryIcon ?? <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            {mergedLabels.theoryTab}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                {calculatorIcon ?? (
                  <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
                {mergedLabels.inputSectionTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 pt-0 sm:space-y-6 sm:p-6 sm:pt-0">
              {inputSection}
            </CardContent>
          </Card>

          {resultsSection}
          {emptyState}
        </TabsContent>

        <TabsContent value="theory">{theorySection}</TabsContent>
      </Tabs>
    </section>
  );
}
