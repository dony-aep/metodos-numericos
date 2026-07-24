# Changelog

Todos los cambios importantes de este proyecto se documentan aquí.

## [Unreleased]

### Security
- Resueltas 8 de las 10 vulnerabilidades reportadas por `npm audit`, incluidas las 2 alertas
  abiertas de Dependabot (`brace-expansion` alta, `@hono/node-server` media):
  - `brace-expansion`, `postcss`, `js-yaml`, `fast-uri` y `body-parser` actualizadas a sus
    versiones parcheadas (transitivas, sin cambios de API),
  - `react-router-dom` actualizado a 7.18.1, que corrige el open redirect vía backslash,
    el XSS de `RSCErrorHandler`, la inyección de constructor en `deserializeErrors()` y el
    DoS por route matching ineficiente.
- Añadido `overrides` de `@hono/node-server` a `^2.0.5` para forzar la versión parcheada
  (path traversal en `serve-static`) dentro de `@modelcontextprotocol/sdk`, del que depende
  el CLI `shadcn`. Upstream aún declara `^1.19.9`, por lo que el override es necesario hasta
  que el SDK suba de major. Verificado que el CLI sigue funcionando.

### Notes
- `GHSA-qwww-vcr4-c8h2` (CSRF en modo RSC de react-router) se mantiene sin aplicar: el aviso
  solo afecta al modo RSC y esta app es una SPA estática con `BrowserRouter` declarativo, sin
  SSR ni `loaders`/`actions`, por lo que el código vulnerable no es alcanzable. La corrección
  que propone `npm audit fix --force` es una **degradación** a `react-router-dom@7.11.0`, que
  reintroduciría las cuatro vulnerabilidades corregidas arriba. La solución real es migrar a
  `react-router@8`, pendiente por ser un cambio de major de la librería de rutas.

## [0.4.0] - 2026-06-17

### Added
- Módulo completo de **Ecuación de difusión del calor (EDP)** (`/metodos/difusion-calor`):
  - Solución de la ecuación del calor 1D con esquema explícito FTCS (diferencias finitas),
  - Visualización con mapa de calor (heatmap) y gráfica de perfiles de temperatura,
  - 6 presets didácticos: senoidal, pico central, inestable, equilibrio térmico, difusión rápida y pulso localizado,
  - Teoría con fórmulas KaTeX: EDP, discretización, FTCS, condición de estabilidad, comparación de esquemas y aplicaciones,
  - Card de relación con otros temas del curso (derivación, Euler, sistemas lineales, Jacobi/Gauss-Seidel).
- Análisis numérico detallado del método en `docs/difusion_de_calor_edp/`.

## [0.3.0] - 2026-05-20

### Added
- Módulo completo de **Errores y aproximaciones numéricas** (`/metodos/errores-aproximaciones`):
  - Calculadora de error absoluto, relativo, porcentual y cifras significativas,
  - Aproximación por series de Taylor con tabla de convergencia y gráfica,
  - Teoría de fuentes de error, condicionamiento y estabilidad.
- Módulo completo de **Métodos de ecuaciones no lineales** (`/metodos/ecuaciones-no-lineales`):
  - Comparador simultáneo de bisección, Newton-Raphson y secante,
  - Gráfica de convergencia comparativa (error vs iteración),
  - Tablas de iteraciones por método,
  - Teoría de clasificación, fórmulas y criterios de parada.
- Módulo completo de **Método de bisección** (`/metodos/biseccion`):
  - Calculadora con intervalo [a, b], tolerancia y máx. iteraciones,
  - Gráfica de f(x) con raíz marcada y gráfica de convergencia del error,
  - Tabla de iteraciones (n, a, b, c, f(c), error),
  - Teoría del Teorema del Valor Intermedio, cota del error y ventajas/desventajas.
- Módulo completo de **Método de Newton-Raphson** (`/metodos/newton-raphson`):
  - Calculadora con f(x), f'(x) (opcional, numérica por defecto) y x₀,
  - Gráfica de f(x) con raíz y gráfica de convergencia,
  - Tabla de iteraciones (n, xₙ, f(xₙ), f'(xₙ₋₁), error),
  - Teoría de interpretación geométrica, convergencia cuadrática y casos de falla.
- Documentación en `docs/` para los 4 temas nuevos.

### Changed
- Dashboard actualizado a 15 módulos disponibles (cobertura completa del plan de clase).
- Footer rediseñado con créditos del desarrollador (portafolio y GitHub) e iconos adaptativos al tema.

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
