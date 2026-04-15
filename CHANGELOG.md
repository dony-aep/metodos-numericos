# Changelog

Todos los cambios importantes de este proyecto se documentan aquí.

## [0.2.0] - 2026-04-15

### Added
- Módulo completo de **Jacobi y Gauss-Seidel** (`/metodos/jacobi-gauss-seidel`):
  - Teoría comparativa de ambos métodos con tabla de convergencia,
  - Selector de método (Jacobi / Gauss-Seidel),
  - Resolución iterativa con tabla de aproximaciones y vector residual.
- Módulo completo de **Interpolación polinómica** (`/metodos/interpolacion-polinomica`):
  - Teoría de formas de Lagrange y Newton, fenómeno de Runge,
  - Grid de puntos reutilizable (`InterpolationInputGrid`),
  - Tabla de diferencias divididas y gráfica del polinomio interpolante.
- Módulo completo de **Diferencias divididas de Newton** (`/metodos/newton-diferencias-divididas`):
  - Teoría de construcción incremental y evaluación con Horner,
  - Tabla triangular de diferencias divididas,
  - Gráfica del polinomio de Newton.
- Módulo completo de **Interpolación de Lagrange** (`/metodos/lagrange`):
  - Teoría de bases de Lagrange y forma baricéntrica,
  - Tabla de pesos baricéntricos y evaluación de bases,
  - Comparación Lagrange vs. Newton.
- Módulo completo de **Ajuste por mínimos cuadrados** (`/metodos/minimos-cuadrados`):
  - Teoría de ajuste lineal, forma matricial y R²,
  - Selector de grado (1–5) con ejemplos predefinidos,
  - Gráfica de ajuste con datos y curva, tabla de residuos.
- Módulo completo de **Derivación numérica** (`/metodos/derivacion-numerica`):
  - Teoría de 5 esquemas (adelante, atrás, centrada, cinco puntos, segunda derivada),
  - Extrapolación de Richardson y análisis de error,
  - Gráfica de convergencia al refinar h.
- Módulo completo de **Integración numérica** (`/metodos/integracion-numerica`):
  - Teoría de Trapecio y Simpson 1/3 (simple y compuesta),
  - Comparación lado a lado de ambos métodos,
  - Gráfica de integración y convergencia al aumentar n.
- Módulo completo de **Método de Euler para EDOs** (`/metodos/euler`):
  - Teoría de derivación, algoritmo, error y estabilidad,
  - Soporte para funciones f(x, y) con parser de dos variables,
  - Curva solución con comparación exacta opcional.
- Documentación de investigación para todos los temas en `docs/`.

### Changed
- **UX/UI responsive**: gráficos adaptativos con `useIsMobile` en los 9 componentes de charts (ECharts), padding y altura responsive, grids de formularios corregidos.
- **Fuente principal**: migración de Geist Variable a Google Sans vía CDN (Google Fonts).
- **Rendimiento**: code-splitting automático por página (Vite lazy loading), `chunkSizeWarningLimit` ajustado.
- **Copy y contenido didáctico**:
  - Empty states estandarizados al patrón "Listo para [verbo]" en las 11 páginas,
  - Botón secundario unificado a "Limpiar" con icono `Eraser`,
  - Descripciones de métodos en dashboard refinadas,
  - Columna de residual homogeneizada entre módulos,
  - Tarjetas de error/no disponible en `MethodPage` con soporte dark mode.
- **Dark mode**: correcciones en tarjetas de estado de `MethodPage` (rose/amber) para tema oscuro.

### Fixed
- Lint: `prefer-const` en `solveGaussSeidel` (`iterativeMethods.ts`).
- Lint: dependencia `isMobile` agregada a todos los `useMemo` de gráficos.
- Texto obsoleto de "migración de secante" eliminado de `MethodPage`.

## [0.1.0] - 2026-04-08

### Added
- Estructura base del proyecto con React 19 + Vite 8 + TypeScript 6.
- Integración de Tailwind CSS 4 y shadcn/ui con alias `@/*`.
- Dashboard principal (`/`) con tarjetas por tema y estado de disponibilidad.
- Enrutamiento modular para todos los temas definidos en el plan.
- Plantilla reusable para módulos (`MethodModuleLayout`, estados y banner de resultados).
- Módulo completo de **Método de la Secante**:
  - Teoría con fórmulas (KaTeX),
  - Formulario y validaciones,
  - Algoritmo numérico,
  - Tabla de iteraciones,
  - Gráficas de función y convergencia (ECharts).
- Módulo completo de **Sistemas de ecuaciones lineales**:
  - Teoría base de sistemas lineales,
  - Entrada matricial interactiva,
  - Resolución con algoritmo gaussiano,
  - Visualización de solución y residual.
- Módulo completo de **Eliminación de Gauss**:
  - Teoría del método con pivoteo parcial,
  - Calculadora matricial 2x2, 3x3 y 4x4,
  - Resolución por eliminación + sustitución hacia atrás,
  - Matriz triangular superior,
  - Trazabilidad paso a paso de operaciones por fila.
- Modo oscuro global con `next-themes`:
  - Selector claro/oscuro/sistema,
  - Integración en layout y componentes clave.
- Documentación de proyecto:
  - `PLAN.md` con fases, checklist y progreso,
  - `AGENTS.md` con convenciones técnicas.

### Changed
- Refactor de estilos para usar tokens semánticos compatibles con tema claro/oscuro.
- Homologación de UI principal hacia componentes shadcn/ui reutilizables.
