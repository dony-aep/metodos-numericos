# AGENTS.md

## Propósito del repositorio
Construir una plataforma web educativa de métodos numéricos en español, con dashboard principal y módulos por tema que incluyan teoría, fórmulas, calculadora y visualización de resultados.

## Stack oficial
- React + React DOM
- Vite
- TypeScript
- Tailwind CSS (con `@tailwindcss/vite`)
- shadcn CLI + `@base-ui/react`
- ECharts + `echarts-for-react`
- mathjs + KaTeX
- react-router (v8; `react-router-dom` ya no existe)
- lucide-react
- next-themes
- Fuente: Google Sans (declarada en `src/index.css`)

**Las versiones exactas viven en `package.json`, que es la fuente de verdad.** No las dupliques
aquí: se desfasan en cada actualización de dependencias.

## Estructura objetivo
- `src/pages/` -> dashboard y páginas por método
- `src/components/shared/` -> componentes reutilizables
- `src/components/topics/` -> componentes específicos por método
- `src/hooks/` -> hooks de cálculo por método
- `src/utils/` -> algoritmos y validaciones
- `src/types/` -> tipos compartidos
- `docs/metodo-secante/src` -> referencia de migración (no como destino final)

## Rutas esperadas
- `/` dashboard principal
- `/metodos/secante`
- `/metodos/sistemas-lineales`
- `/metodos/eliminacion-gauss`
- `/metodos/jacobi-gauss-seidel`
- `/metodos/interpolacion-polinomica`
- `/metodos/newton-diferencias-divididas`
- `/metodos/lagrange`
- `/metodos/minimos-cuadrados`
- `/metodos/derivacion-numerica`
- `/metodos/integracion-numerica`
- `/metodos/euler`

## Convenciones de implementación
- Mantener UI y contenido en español.
- Usar alias `@/*` para imports internos.
- Priorizar reutilización de componentes y utilidades.
- Mantener lógica numérica en `utils` y hooks; UI desacoplada.
- Evitar `any`; mantener tipado estricto.
- Seguir patrones de shadcn/ui y utilitario `cn`.
- Para nuevas páginas (`src/pages/*`) usar componentes de `@/components/ui/*` por defecto (Card, Button, Badge, Tabs, Table, Input, etc.).
- Evitar construir botones/cards/tablas "a mano" con `div` + clases si ya existe equivalente en shadcn/ui.
- Si falta un componente de UI, agregarlo con `npx shadcn@latest add <componente>` antes de crear una versión custom.

## Enfoque de UI por defecto
- Diseño base: tema por defecto de shadcn.
- Estilos utilitarios con Tailwind solo para layout/espaciado/composición.
- Comportamientos e interacciones en componentes de shadcn siempre que sea posible.

## Flujo de trabajo
1. Revisar `PLAN.md` antes de comenzar cambios grandes.
2. Implementar por fases (primero dashboard + secante).
3. Verificar siempre:
   - `npm run lint`
   - `npm run build`

## Criterio de terminado por tema
- Teoría y fórmulas visibles.
- Formulario de entrada con validación.
- Cálculo numérico funcional.
- Tabla y/o gráfica de resultados.
- Ruta integrada y accesible desde el dashboard.
- Interfaz construida mayormente con componentes shadcn/ui reutilizables.

## Notas operativas
- Rama por defecto: `main`.
- El proyecto se trabaja directamente en esta carpeta (sin subcarpetas anidadas de framework).

## Comandos del proyecto
```bash
npm run dev       # servidor local (Vite)
npm run build     # build de producción (tsc -b && vite build)
npm run lint      # verificación ESLint
npm run preview   # previsualizar build
```
Verificar siempre `npm run lint` y `npm run build` antes de dar una tarea por terminada.

## Convención de commits
- **Idioma:** español (el proyecto es completamente en español).
- Detectar el idioma del mensaje antes de hacer commit: si el mensaje está en otro idioma, reescribirlo en español.
- Formato: `tipo: descripción breve en español`
- Tipos válidos: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`
- Ejemplos:
  - `feat: agregar página del método de Jacobi`
  - `fix: corregir cálculo en eliminación de Gauss`
  - `refactor: extraer componente de tabla de iteraciones`
  - `docs: actualizar PLAN.md con estado de interpolación`

## Estado actual de implementación (Fase 5 completada)
### Completado ✓
- Dashboard principal (`/`)
- Método de la Secante (`/metodos/secante`)
- Sistemas de ecuaciones lineales (`/metodos/sistemas-lineales`)
- Eliminación de Gauss (`/metodos/eliminacion-gauss`)
- Jacobi y Gauss-Seidel (`/metodos/jacobi-gauss-seidel`)
- Interpolación polinómica (`/metodos/interpolacion-polinomica`)
- Diferencias divididas de Newton (`/metodos/newton-diferencias-divididas`)
- Interpolación de Lagrange (`/metodos/lagrange`)
- Ajuste por mínimos cuadrados (`/metodos/minimos-cuadrados`)
- Derivación numérica (`/metodos/derivacion-numerica`)
- Integración numérica — Trapecio y Simpson (`/metodos/integracion-numerica`)
- Ecuaciones diferenciales — Euler (`/metodos/euler`)
- Modo oscuro global (claro/oscuro/sistema)
- UX/UI responsive (gráficos adaptativos, grids responsive)
- Copy y contenido didáctico pulido
- Build y lint limpios para despliegue
