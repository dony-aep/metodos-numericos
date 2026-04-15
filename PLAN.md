# PLAN DE IMPLEMENTACIÓN - Plataforma de Métodos Numéricos

## Contexto del proyecto
Construir una web educativa de métodos numéricos en un solo lugar, con teoría + fórmulas + calculadora + visualizaciones por tema.

Estado actual confirmado:
- Repositorio creado en `C:\Users\doney\Documents\Data\Stuff\Personal Projects\metodos-numericos`
- Rama por defecto: `main`
- Proyecto base funcional (Vite + React + TS)
- Tailwind CSS v4 y shadcn inicializados
- Código fuente del método de la secante disponible en `docs/metodo-secante/src`
- Investigación de secante en `docs/metodo-secante/Método de la Secante deep-research-report.md`

## Stack y versiones (actual)
- React: `19.2.4`
- React DOM: `19.2.4`
- Vite: `8.0.4`
- TypeScript: `~6.0.2`
- Tailwind CSS: `^4.2.2`
- shadcn CLI: `^4.2.0`
- React Router DOM: `^7.14.0`
- ECharts: `^6.0.0`
- echarts-for-react: `^3.0.6`
- mathjs: `^15.2.0`
- katex: `^0.16.45`
- lucide-react: `^1.7.0`

## Alcance inicial de temas
1. Método de la Secante
2. Sistemas de ecuaciones lineales
3. Método de eliminación de Gauss
4. Métodos iterativos (Jacobi y Gauss-Seidel)
5. Interpolación polinómica
6. Diferencias divididas de Newton
7. Interpolación de Lagrange
8. Ajuste por mínimos cuadrados
9. Derivación numérica
10. Integración numérica (Trapecio y Simpson)
11. Ecuaciones diferenciales ordinarias (Euler)

## Decisión de arquitectura (actualizada)
- Usar `"/"` como dashboard principal.
- Mostrar tarjetas por método con estado: `Disponible` o `Próximamente`.
- Cada método tendrá su ruta dedicada.

## Enfoque de UI (adoptado)
- Usar shadcn/ui como base para nuevos componentes visuales.
- En nuevas páginas, priorizar `@/components/ui/*` para botones, tarjetas, tablas, tabs, badges e inputs.
- Usar Tailwind para layout/composición y ajustes puntuales, no para reimplementar componentes base ya existentes.
- Si un componente no existe aún en el proyecto, agregarlo con:
  - `npx shadcn@latest add <componente>`

Rutas base propuestas:
- `/` -> Dashboard
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

## Estructura objetivo
- `src/pages/` -> páginas de dashboard y métodos
- `src/components/shared/` -> componentes reutilizables
- `src/components/topics/` -> componentes específicos por tema
- `src/hooks/` -> hooks de métodos numéricos
- `src/utils/` -> algoritmos y validaciones
- `src/types/` -> tipos compartidos

## Checklist de progreso

### Fase 1 - Base del proyecto
- [x] Crear proyecto Vite React TS en la carpeta raíz
- [x] Configurar Tailwind CSS v4
- [x] Configurar alias `@/*`
- [x] Inicializar shadcn (`components.json`)
- [x] Instalar dependencias matemáticas y de visualización
- [x] Crear layout global definitivo (header/nav/footer)
- [x] Adoptar shadcn/ui en layout y dashboard base

### Fase 2 - Integración de Secante
- [x] Crear dashboard y sistema de rutas
- [x] Migrar tipos, hooks y utilidades de secante
- [x] Migrar componentes de secante a la nueva estructura
- [x] Adaptar estilos e imports al stack actual con enfoque shadcn/ui
- [x] Dejar `/metodos/secante` funcional end-to-end

### Fase 3 - Plantilla modular para métodos
- [x] Definir plantilla estándar por tema (teoría/formulario/resultados/gráficas)
- [x] Extraer componentes compartidos para reutilización
- [x] Definir contrato de tipos para todos los métodos

### Fase 4 - Implementar métodos restantes
- [x] Sistemas de ecuaciones lineales
- [x] Eliminación de Gauss
- [x] Jacobi y Gauss-Seidel
- [x] Interpolación polinómica
- [x] Diferencias divididas de Newton
- [x] Interpolación de Lagrange
- [x] Ajuste por mínimos cuadrados
- [x] Derivación numérica
- [x] Integración numérica (Trapecio y Simpson)
- [x] EDOs (Euler)

### Fase 5 - Cierre técnico
- [x] Implementar modo oscuro global (selector claro/oscuro/sistema + theming base)
- [x] Homogeneizar UX/UI responsive (gráficos adaptativos con useIsMobile, grids y padding responsive)
- [x] Ajustar copy y contenido didáctico (empty states, descripciones, labels, botones estandarizados)
- [x] Optimizar gráficos y rendimiento (code-splitting automático por página, fuente Google Sans vía CDN)
- [x] Build final limpio para despliegue (0 errores build, 0 errores/warnings lint)

## Seguimiento por tema
- [x] Dashboard principal
- [x] Método de la Secante
- [x] Sistemas de ecuaciones lineales
- [x] Eliminación de Gauss
- [x] Jacobi y Gauss-Seidel
- [x] Interpolación polinómica
- [x] Diferencias divididas de Newton
- [x] Interpolación de Lagrange
- [x] Ajuste por mínimos cuadrados
- [x] Derivación numérica
- [x] Integración numérica (Trapecio y Simpson)
- [x] EDOs (Euler)

## Criterio de "hecho" por tema
Un tema se marca implementado cuando cumple:
- Página con teoría y fórmulas
- Formulario de entrada validado
- Cálculo numérico correcto
- Visualización de resultados (tabla y/o gráfica)
- Integración con rutas y navegación

