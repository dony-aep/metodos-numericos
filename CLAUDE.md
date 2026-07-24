@AGENTS.md

# Instrucciones para Claude Code

Lo anterior (`AGENTS.md`) define stack, estructura, convenciones, comandos y formato de
commits. Esta sección añade solo lo que no se deduce leyendo el código.

## Fuente de verdad de las versiones

`package.json` manda sobre la lista "Stack oficial" de `AGENTS.md`, que se desactualiza con
cada bump de dependencias. Verifica ahí antes de afirmar una versión.

## Agregar un método numérico

Cada tema se implementa en cinco capas separadas. **IMPORTANTE:** no pongas lógica de cálculo
en la página ni en los componentes.

| Capa | Ubicación | Contenido |
| --- | --- | --- |
| Algoritmo | `src/utils/<metodo>.ts` | Funciones puras, sin React |
| Tipos | `src/types/<metodo>.ts` | Entradas, resultados, filas de iteración |
| Estado | `src/hooks/use<Metodo>.ts` | Validación, ejecución, estado de UI |
| Vistas | `src/components/topics/<tema>/` | Formulario, tabla, gráficas |
| Página | `src/pages/<Metodo>Page.tsx` | Composición + teoría |

Luego hay que conectarlo en **dos** sitios, o el método no aparece:

1. `src/data/methods.ts` — registra el `slug` con `status: 'available'`. Alimenta el dashboard
   y la pantalla de "próximamente"; un slug ausente cae en "Método no encontrado".
2. `src/App.tsx` — importa la página con `lazy()` y añade su `<Route>` envuelta en
   `<Suspense fallback={<PageFallback />}>`, igual que las demás.

**IMPORTANTE:** en `App.tsx` las rutas concretas van **antes** de `metodos/:slug`, que es el
catch-all que renderiza `MethodPage`. Una ruta declarada después nunca se alcanza.

## Verificación

No hay tests ni test runner en el proyecto. No ejecutes `npm test` ni instales Vitest/Jest
salvo que se pida explícitamente. La verificación de "terminado" es:

```bash
npm run lint     # debe salir sin output
npm run build    # tsc -b && vite build
```

Ambos deben pasar antes de dar una tarea por cerrada. Para cambios de UI, comprobar además la
vista en claro y oscuro.

## Dependencias y seguridad

**IMPORTANTE: nunca ejecutes `npm audit fix --force` en este repo.** Su "arreglo" para el aviso
abierto de react-router es degradar a `react-router-dom@7.11.0`, que reintroduce cuatro
vulnerabilidades ya corregidas (open redirect, XSS, inyección de constructor, DoS).

- El aviso restante (`GHSA-qwww-vcr4-c8h2`) solo afecta al modo RSC. Esta app es una SPA
  estática con `BrowserRouter` declarativo, sin SSR ni `loaders`/`actions`, así que no aplica.
  El detalle está en la sección `[Unreleased]` del `CHANGELOG.md`.
- El campo `overrides` de `package.json` fuerza `@hono/node-server` parcheado dentro del CLI de
  shadcn. No lo borres hasta que `@modelcontextprotocol/sdk` suba de major.

## Entorno

El proyecto se desarrolla en Windows: la shell por defecto es PowerShell, no bash. Usa rutas
con `/` en el código y comandos de PowerShell en la terminal.

## Detalles con trampa

- Las gráficas de ECharts fijan `fontFamily: 'Google Sans'` en línea, tema por tema. Si cambias
  la tipografía en `src/index.css`, esas cadenas no se actualizan solas.
- `MethodPage` es pantalla de relleno para slugs registrados pero sin implementar, no una página
  de método real. No añadas ahí la lógica de un tema nuevo.
