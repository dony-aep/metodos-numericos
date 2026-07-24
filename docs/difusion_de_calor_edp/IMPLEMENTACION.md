# Handoff: implementación de la ecuación de difusión del calor

Guía para la sesión de implementación. Trabajar desde la raíz del proyecto (`metodos-numericos`).

## Objetivo
Añadir la **ecuación de difusión del calor (EDP)** como nueva sección de la plataforma, en la ruta `/metodos/difusion-calor`, reutilizando el stack existente (React 19 + Vite + TS, ECharts, KaTeX, mathjs, shadcn/ui, react-router-dom).

## Material de partida
- Investigación completa: `docs/difusion_de_calor_edp/difusion_de_calor_edp_analisis_numerico.md` (21 secciones: teoría, esquemas FTCS/BTCS/Crank-Nicolson, estabilidad, ejemplo resuelto, código y aplicaciones).
- Reporte profundo de referencia: `deep-research-report.md` (fuera del repo, en la carpeta de la asignatura).
- Convenciones del proyecto: `AGENTS.md` y estado en `PLAN.md`.

## Antes de empezar
1. Leer `AGENTS.md` (UI en español, alias `@/*`, componentes shadcn/ui, tipado estricto sin `any`).
2. Revisar un método ya implementado como **plantilla de referencia**, idealmente Euler (es EDO → análogo a esta EDP):
   - `src/pages/EulerPage.tsx`
   - `src/hooks/useEuler.ts` (o el hook correspondiente)
   - `src/utils/` y `src/types/` de Euler
   - cómo aparece en `src/data/methods.ts` y `src/App.tsx`

## Archivos a crear/editar
- `src/types/heat-diffusion.ts` — tipos de entrada (α, L, T, N, Δt, condición inicial, fronteras) y de resultado (historia de perfiles, λ, flag de estabilidad).
- `src/utils/heatDiffusion.ts` — algoritmo numérico (empezar por FTCS explícito).
- `src/hooks/useHeatDiffusion.ts` — hook que valida entradas y ejecuta el cálculo.
- `src/pages/HeatDiffusionPage.tsx` — teoría + fórmulas (KaTeX) + formulario validado + visualización.
- `src/data/methods.ts` — agregar la entrada del método (slug `difusion-calor`, `status: 'available'`).
- `src/App.tsx` — agregar la ruta lazy `metodos/difusion-calor`.

## Núcleo numérico (método explícito FTCS)
Parámetro de difusión:
```
λ = α · Δt / Δx²        (Δx = L / N)
```
Actualización en nodos interiores:
```
u_i^{n+1} = u_i^n + λ · (u_{i+1}^n − 2·u_i^n + u_{i-1}^n)
```
- Condición de estabilidad: **λ ≤ 0.5** (si no, avisar/diverge).
- Fronteras Dirichlet: fijar `u[0]` y `u[N]` en cada paso.
- Referencia TS lista en la sección 13 del documento de investigación.

## Visualización (ECharts)
- **Heatmap** posición (x) × tiempo (t) con la historia de temperaturas.
- Opcional: animación del perfil `u(x)` avanzando en el tiempo.
- **Gancho didáctico**: control deslizante de λ (o de Δt) que muestre en vivo cómo el método explícito diverge cuando λ > 0.5.

## Extensiones opcionales (si da tiempo)
- Método implícito (BTCS) y Crank-Nicolson → sistema tridiagonal con algoritmo de Thomas (ver secciones 6–7 del documento).
- Condiciones de frontera Neumann/Robin (sección 2.4).

## Criterio de "hecho" (de AGENTS.md)
- Teoría y fórmulas visibles.
- Formulario de entrada con validación.
- Cálculo numérico funcional.
- Tabla y/o gráfica de resultados.
- Ruta integrada y accesible desde el dashboard.
- UI construida con componentes shadcn/ui.

## Verificación final
```bash
npm run lint
npm run build
```
Actualizar `PLAN.md` (marcar el nuevo tema) y confirmar la entrada en `src/data/methods.ts`.

## Commit (convención del repo)
Español, formato `tipo: descripción`. Ejemplo:
```
feat: agregar página de la ecuación de difusión del calor
```
