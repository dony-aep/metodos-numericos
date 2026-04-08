import { Calculator, Sigma } from 'lucide-react';
import { BlockMath } from '@/components/shared/MathRenderer';

// Fórmula LaTeX - usar doble backslash que se convierte en uno solo en el bundle
const SECANT_FORMULA = "x_{n+1} = x_n - f(x_n) \\cdot \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}";

export function Header() {
  return (
    <header className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-background via-background to-amber-50/25 dark:to-amber-950/20">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #e2e8f0 1px, transparent 1px),
            linear-gradient(#e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Gradient orb decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-orange-300/15 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
          {/* Title section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              <Sigma className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
              <span className="text-[10px] sm:text-xs font-medium tracking-wide text-amber-700 uppercase">
                Análisis Numérico
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Método de la
              <span className="block bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Secante
              </span>
            </h1>
            
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed">
              Herramienta interactiva para encontrar raíces de funciones. 
              Visualiza el proceso iterativo y comprende la convergencia.
            </p>
          </div>

          {/* Formula card con KaTeX - visible en todas las pantallas */}
          <div className="w-full sm:w-auto">
            <div className="bg-background/85 backdrop-blur border border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <Calculator className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600" />
                <span className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Fórmula iterativa
                </span>
              </div>
              <div className="text-foreground text-sm md:text-base overflow-x-auto">
                <BlockMath math={SECANT_FORMULA} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
    </header>
  );
}
