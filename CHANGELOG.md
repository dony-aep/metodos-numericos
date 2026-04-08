# Changelog

Todos los cambios importantes de este proyecto se documentan aquí.

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
