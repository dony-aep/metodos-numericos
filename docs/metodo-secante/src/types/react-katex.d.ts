// Declaración de tipos para react-katex
// Este módulo no tiene tipos oficiales en @types/react-katex

declare module 'react-katex' {
  import type { ReactNode } from 'react';

  interface KatexProps {
    math: string;
    block?: boolean;
    errorColor?: string;
    renderError?: (error: Error) => ReactNode;
    settings?: object;
    children?: ReactNode;
  }

  export const InlineMath: React.FC<KatexProps>;
  export const BlockMath: React.FC<KatexProps>;
}
