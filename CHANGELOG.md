# Changelog

Todos los cambios importantes de este proyecto se documentan aquí.

## [0.5.0] - 2026-10-23

Rediseño de la interfaz sobre una rejilla de cuaderno, con la teoría de los dieciséis métodos
reescrita, icono propio y el stack al día en **0 vulnerabilidades** (`npm audit`).

### Added
- **La rejilla del cuaderno** (`MarginGrid` y `MarginSection`): cada sección son dos celdas
  contiguas, el rótulo en el margen y el contenido al lado. Por debajo de 1024px el margen
  desaparece y el rótulo se cuela encima de su contenido.
- `MethodModuleLayout` monta un método desde su `slug` y una lista de secciones de resultado,
  con el vocabulario compartido: «Lectura» para las cifras, «Traza» para las gráficas y «Tablas»
  para las iteraciones.
- `TheoryBlock` compone cada apartado de teoría como una página de libro: la prosa a una medida
  de unos 68 caracteres y las fórmulas en el margen derecho con su rótulo. Son 90 bloques en los
  dieciséis métodos. Las ecuaciones que son un desarrollo término a término se marcan con `wide`
  y bajan a todo el ancho bajo el texto.
- `Readout` y `ErrorBar` como primitivas de las cifras. La barra de error va en escala
  logarítmica, así que la convergencia se lee como una escalera.
- La ficha de datos y el caso que falla se declaran en `methods.ts`, de donde los hereda
  cualquier método nuevo sin tocar componentes.
- **Icono propio**: una sigma sobre teja oscura, con terminales rectos y unión en inglete para
  que case con los filetes de la interfaz. `npm run icons` deriva de ese único SVG el
  `favicon.ico` de tres tamaños, el `apple-touch-icon` de 180, los iconos de 192 y 512 y la
  tarjeta social de 1200x630, cuyo fondo es el fractal de Newton sobre z³ = 1.

### Changed
- La barra lateral fija se sustituye por un panel flotante que abre el botón «Métodos» de la
  cabecera, con los dieciséis métodos agrupados por las seis familias del temario y la fórmula
  de cada uno. Cierra con Escape, con clic fuera y con el propio botón.
- **Teoría reescrita en los quince métodos restantes**, que conservaban el texto anterior. Cada
  módulo explica ahora por qué existe la fórmula: de dónde salen los pesos de Simpson, por qué
  la diferencia centrada gana un orden sobre la unilateral, qué pierde Euler al acumular pasos.
- `Card`, `Badge` y el aviso de resultado quedan aplanados a filetes, sin fondos, sin pastillas
  y sin sombras.
- El alias `@` de la configuración de Vite se resuelve con `import.meta.dirname` en vez de
  `__dirname`, del que Vite 8.3 avisa que no funciona con el cargador nativo.
- Stack al día: `react` y `react-dom` 19.3.1, `react-router` 8.5.0, `vite` 8.3.5,
  `@base-ui/react` 1.9.0, `lucide-react` 1.61.0, `eslint` 10.13.0, `typescript-eslint` 8.72.0,
  `shadcn` 4.22.1, `sharp` 0.35.5, `@vitejs/plugin-react` 6.1.2, `globals` 17.13.0 y
  `@types/node` 24.19.2.
- **KaTeX sube a 0.19.0.** La versión reporta las métricas de carácter que faltan a través de la
  opción `strict` y cambia el tipado de sus callbacks. `MathRenderer` llama a `renderToString`
  con `strict: false`, un booleano y no un callback, así que no hubo que tocar nada. Fórmulas
  comprobadas en claro y oscuro.
- `typescript` se queda en 6.0.3 y `@types/node` en la serie 24. `typescript-eslint` 8.72.0
  declara el peer `>=4.8.4 <6.1.0`, que deja fuera a TypeScript 7, y los tipos de Node siguen al
  runtime de Node 24 del despliegue.

### Fixed
- Las etiquetas `og:image` y `twitter:image` apuntaban al SVG, que ninguna red social renderiza,
  así que el enlace salía sin imagen.

### Removed
- Los dieciséis encabezados de método clonados, 884 líneas, sustituidos por uno solo alimentado
  desde `methods.ts`. Cae con ellos el número de dos dígitos, que fingía un orden que no existe.

### Security
- Cerrados los 6 avisos de `npm audit` (4 altos y 2 moderados), que cubren las 9 alertas abiertas
  de Dependabot: `vite` (lectura de archivos fuera de `server.fs.allow` y ejecución de comandos
  de `launch-editor` en Windows), `sharp` (CVE-2026-96889 en librsvg) y cuatro transitivas del
  CLI de `shadcn` y del toolchain de Tailwind, `@modelcontextprotocol/sdk`, `hono`,
  `source-map-js` e `ip-address`. Todas se resuelven con las actualizaciones de los paquetes
  directos, sin forzar ninguna versión.

### Documentation
- `AGENTS.md` pasa a ser la única fuente de instrucciones para los agentes y `CLAUDE.md` queda
  como puente con `@AGENTS.md`. Documenta las convenciones del rediseño, `npm run icons` y el
  flag `--allow-remote=all`, sin el que `npm install` falla con npm 12 en adelante.
- El README abre con lo que distingue al proyecto, con el enlace al despliegue en la primera
  pantalla.

## [0.4.2] - 2026-09-15

Versión de mantenimiento: sin módulos ni funcionalidad nueva. Pone el stack al día y vuelve a
dejar el proyecto en **0 vulnerabilidades** (`npm audit`) y **0 alertas abiertas** de Dependabot.

### Security
- Cerradas las 11 alertas de Dependabot, 9 avisos en `npm audit` (4 altas, 4 moderadas y 1 baja).
  Todas venían de dependencias transitivas del toolchain de build y lint: `browserslist`,
  `fast-uri`, `js-yaml`, `nanoid`, `qs`, `hono`, `@humanfs/node`, `baseline-browser-mapping` y
  `postcss-selector-parser`. Las arrastran las actualizaciones de los paquetes directos, sin
  forzar ninguna versión.

### Changed
- Stack al día en sus últimas versiones compatibles: `react` y `react-dom` 19.3.0,
  `react-router` 8.4.0, `vite` 8.3.0, `tailwindcss` y `@tailwindcss/vite` 4.3.3,
  `@base-ui/react` 1.8.0, `lucide-react` 1.46.0, `shadcn` 4.21.0, `typescript-eslint` 8.70.0 y
  `@vitejs/plugin-react` 6.1.1.
- **ESLint sube a 10.10.0**, porque npm ya marca la serie 9 como fuera de soporte. La
  configuración plana de `eslint.config.js` no necesita cambios y los cuatro plugins ya declaran
  el peer `^10`. Su regla nueva `no-useless-assignment` destapó una asignación muerta en
  `computeErrors()`: el `let significantDigits = 0` que las dos ramas sobrescribían pasa a ser un
  `const` con ternario, sin cambio de comportamiento.
- **KaTeX sube a 0.18.7.** La versión renombra las clases CSS internas del renderizado, pero el
  proyecto solo usa `renderToString` y la hoja de estilos del propio paquete, así que no hubo que
  tocar nada. Fórmulas comprobadas en claro y oscuro.
- `package.json` abandona el `version: 0.0.0` heredado de la plantilla de Vite y pasa a seguir al
  CHANGELOG.

### Removed
- Eliminado el `overrides` de `@hono/node-server`. `@modelcontextprotocol/sdk` ya declara
  `^1.19.9 || ^2.0.5`, npm resuelve 2.1.1 por su cuenta y el audit sale limpio en las dos ramas,
  así que el pin solo frenaba parches.

### Documentation
- El README describe las convenciones del repositorio.

## [0.4.1] - 2026-07-24

Versión de mantenimiento: sin módulos ni funcionalidad nueva. Deja el proyecto en
**0 vulnerabilidades** (`npm audit`) y **0 alertas abiertas** de Dependabot.

### Security
- Resueltas las 10 vulnerabilidades reportadas por `npm audit`:
  - `brace-expansion`, `postcss`, `js-yaml`, `fast-uri` y `body-parser` actualizadas a sus
    versiones parcheadas (transitivas, sin cambios de API),
  - `react-router` actualizado, corrigiendo el open redirect vía backslash, el XSS de
    `RSCErrorHandler`, la inyección de constructor en `deserializeErrors()`, el DoS por route
    matching ineficiente y el CSRF de modo RSC (`GHSA-qwww-vcr4-c8h2`).
- Añadido `overrides` de `@hono/node-server` a `^2.0.5` para forzar la versión parcheada
  (path traversal en `serve-static`) dentro de `@modelcontextprotocol/sdk`, del que depende
  el CLI `shadcn`. Upstream aún declara `^1.19.9`, por lo que el override es necesario hasta
  que el SDK suba de major. Verificado que el CLI sigue funcionando.

### Changed
- Migración a **react-router 8.3.0**, primera versión fuera del rango vulnerable de
  `GHSA-qwww-vcr4-c8h2`. `react-router-dom` se elimina como dependencia porque el paquete
  desaparece en la v8: los 4 archivos que lo usaban (`App.tsx`, `AppLayout.tsx`,
  `DashboardPage.tsx`, `MethodPage.tsx`) ahora importan de `react-router`, sin cambios de firma.
- `react` y `react-dom` suben a 19.2.8 para cumplir el peer `>=19.2.7` de react-router 8.
- Eliminada la dependencia sin uso `@fontsource-variable/geist`, sobrante de la migración a
  Google Sans de la 0.2.0.

### Documentation
- Añadido `CLAUDE.md` con instrucciones para Claude Code, que importa `AGENTS.md` en lugar de
  duplicarlo.
- `AGENTS.md` deja de fijar versiones exactas del stack: se desfasaban en cada actualización de
  dependencias y ahora remite a `package.json`.

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
