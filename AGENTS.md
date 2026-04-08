# AGENTS.md

## Propósito del repositorio
Construir una plataforma web educativa de métodos numéricos en español, con dashboard principal y módulos por tema que incluyan teoría, fórmulas, calculadora y visualización de resultados.

## Stack oficial (actual)
- React 19
- Vite 8
- TypeScript 6
- Tailwind CSS 4
- shadcn/ui
- ECharts + echarts-for-react
- mathjs + KaTeX
- react-router-dom

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
