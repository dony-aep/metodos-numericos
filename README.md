# Métodos Numéricos

Dieciséis métodos numéricos, cada uno explicado y ejecutable en el navegador. Metes tus
propios parámetros, ves la tabla de iteraciones y la gráfica de convergencia, y de paso
descubres en qué condiciones el método te va a mentir.

**[metodos-numericos-lovat.vercel.app](https://metodos-numericos-lovat.vercel.app)**

La mayoría de los apuntes de análisis numérico enseñan la fórmula y se van. Aquí cada
módulo intenta responder también por qué existe: de dónde salen los pesos 1, 4, 1 de
Simpson, por qué la diferencia centrada gana un orden sobre la unilateral sin costar una
evaluación más, por qué mínimos cuadrados eleva al cuadrado en vez de tomar el valor
absoluto.

## Qué trae cada módulo

**Una ficha.** Orden de convergencia, coste por iteración y qué necesita el método para
arrancar. Sirve para decidir cuál usar antes de leer nada más.

**Cuándo falla.** Todo método tiene un caso que lo rompe, y esa suele ser la parte que no
aparece en los apuntes. Newton-Raphson diverge si la derivada se acerca a cero, Gauss sin
pivoteo pierde todas las cifras con un pivote minúsculo, el esquema explícito del calor
explota en cuanto λ pasa de ½. Cada módulo lo cuenta, y donde tiene sentido hay un botón
que carga los parámetros exactos para que lo veas fallar.

**Una calculadora.** Expresiones matemáticas escritas a mano, validación de la entrada y
la tabla de iteraciones completa, con la columna de error en escala logarítmica para que
la convergencia se lea como una escalera.

**Gráficas.** La función y sus iteraciones, la convergencia, el mapa de calor de la EDP.
Con colores verificados para daltonismo, porque ahí el color sí es información.

**Teoría.** Prosa, no una lista de fórmulas. Los métodos se enlazan entre ellos donde
comparten maquinaria: la ecuación del calor, por ejemplo, es derivación numérica en el
espacio, Euler en el tiempo y un sistema tridiagonal en cada paso si lo resuelves de forma
implícita.

## Los métodos

| Familia | Métodos |
| --- | --- |
| Fundamentos | Errores y aproximaciones, cifras significativas, series de Taylor |
| Raíces de ecuaciones | Bisección, Newton-Raphson, secante, y un comparador de los tres a la vez |
| Sistemas lineales | Eliminación de Gauss con pivoteo, Jacobi y Gauss-Seidel |
| Interpolación y ajuste | Lagrange, diferencias divididas de Newton, mínimos cuadrados |
| Cálculo numérico | Derivación por diferencias finitas, integración por trapecio y Simpson |
| Ecuaciones diferenciales | Euler para EDO, difusión del calor 1D para EDP |

La difusión del calor tiene además una
[implementación en C++](docs/difusion_de_calor_edp/cpp/) con CMake y vcpkg, por si quieres
comparar contra algo compilado.

## El diseño

La interfaz imita una página de cuaderno con márgenes: una columna a la izquierda que
nombra lo que tiene al lado, líneas finas en lugar de cajas, y una paleta monocroma cálida.
Ni una tarjeta con sombra, ni una insignia redondeada.

La interfaz no tiene color de acento. Las gráficas sí, porque ahí sirve para distinguir una
serie de otra. Las convenciones completas están en [AGENTS.md](AGENTS.md).

## Cómo está construido

React 19 y TypeScript sobre Vite. Tailwind CSS 4 con componentes de shadcn/ui montados
sobre [Base UI](https://base-ui.com/). [ECharts](https://echarts.apache.org/) para las
gráficas, [math.js](https://mathjs.org/) para evaluar las expresiones que escribe el
usuario y [KaTeX](https://katex.org/) para las fórmulas. Enrutado con react-router 8 y
desplegado en Vercel.

Las versiones exactas están en [package.json](package.json), que es la única fuente fiable:
repetirlas aquí solo garantiza que queden desactualizadas.

## Desarrollo local

Necesitas Node 22.22 o superior, que es lo que exige react-router 8.

```bash
npm install --allow-remote=all   # ver la nota de abajo
npm run dev                      # servidor de desarrollo
npm run build                    # tsc -b && vite build
npm run lint                     # eslint, no debe imprimir nada
npm run preview                  # sirve el build de producción
npm run icons                    # regenera los iconos desde public/favicon.svg
```

Lo de `--allow-remote=all` no es capricho. Con npm 12 en adelante, `npm install` aquí falla
con `EALLOWREMOTE`: el paquete `@tailwindcss/oxide-wasm32-wasi` trae `bundleDependencies` y
los valores por defecto de npm bloquean su tarball. Es una dependencia opcional de wasm32
que en Windows x64 ni siquiera se instala, pero aborta el comando igual. Solo hace falta en
los comandos que reconstruyen el árbol (`install`, `update`, `audit fix`); `npm ci` y el
build no se ven afectados. No lo metas en un `.npmrc`, porque eso desactivaría la
protección también en CI.

No hay tests ni runner de tests. Un cambio está listo cuando `npm run lint` y
`npm run build` pasan y la página se ve bien en claro y en oscuro.

## Cómo se organiza el código

Cada método se reparte en cinco capas, y la lógica de cálculo nunca vive en un componente:

```
src/
├── utils/<metodo>.ts               Algoritmo. Funciones puras, sin React
├── types/<metodo>.ts               Entradas, resultados, filas de iteración
├── hooks/use<Metodo>.ts            Validación, ejecución, estado de la interfaz
├── components/topics/<tema>/       Formulario, tabla, gráficas
└── pages/<Metodo>Page.tsx          Composición y teoría
```

Alrededor hay tres carpetas compartidas: `components/shared/` con el andamiaje común
(`MethodModuleLayout`, `TheoryBlock`, `MarginLayout`), `components/ui/` con los primitivos
de shadcn y `data/` con el catálogo de métodos. Ese catálogo, `data/methods.ts`, es lo que
alimenta el panel de navegación, las fichas y los avisos de «cuándo falla», así que un
método nuevo los hereda sin escribir JSX.

En [`docs/`](docs/) está el análisis numérico escrito de cada método, un documento por
carpeta.

## Convenciones

Los commits siguen [Conventional Commits](https://www.conventionalcommits.org/es/) en
español. La interfaz, el contenido y el CHANGELOG también van en español, con sus acentos;
los identificadores del código, en inglés.

Las instrucciones para agentes están en [AGENTS.md](AGENTS.md), que
[CLAUDE.md](CLAUDE.md) importa en vez de duplicar. Los skills viven por duplicado en
[`.claude/skills/`](.claude/skills/) y [`.agents/skills/`](.agents/skills/) porque cada
herramienta lee su propia ruta. Los dos árboles son idénticos byte a byte y tienen que
seguir siéndolo: si editas uno, replica el cambio en el otro dentro del mismo commit y
compruébalo con `diff -r .agents/skills .claude/skills`.

El historial de cambios está en [CHANGELOG.md](CHANGELOG.md).
