# Métodos Numéricos

Aplicación web interactiva para aprender y experimentar con métodos numéricos. Cada módulo combina **teoría** (fórmulas con notación matemática), una **calculadora interactiva** paso a paso y **visualizaciones gráficas** de los resultados y la convergencia.

🔗 **Demo**: desplegada con Vercel.

## Módulos disponibles

### Errores y fundamentos
- **Errores y aproximaciones numéricas**: error absoluto, relativo, porcentual, cifras significativas y series de Taylor.

### Ecuaciones no lineales
- **Bisección**, **Newton-Raphson** y **Secante**, con un comparador simultáneo de convergencia entre los tres métodos.

### Sistemas de ecuaciones lineales
- **Eliminación de Gauss** (con pivoteo) y métodos iterativos de **Jacobi y Gauss-Seidel**.

### Interpolación y ajuste
- **Interpolación de Lagrange**, **diferencias divididas de Newton** y **mínimos cuadrados**.

### Cálculo numérico
- **Derivación numérica** (diferencias finitas) e **integración numérica** (trapecio, Simpson).

### Ecuaciones diferenciales
- **Método de Euler** para EDOs.
- **Difusión del calor (EDP)**: solución de la ecuación del calor 1D por diferencias finitas, con análisis numérico detallado en [`docs/difusion_de_calor_edp/`](docs/difusion_de_calor_edp/).

## Tecnologías

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) + [Base UI](https://base-ui.com/) para la interfaz
- [ECharts](https://echarts.apache.org/) para las gráficas interactivas
- [math.js](https://mathjs.org/) para la evaluación de expresiones matemáticas
- [KaTeX](https://katex.org/) para el renderizado de fórmulas

## Desarrollo local

Requisitos: Node.js 20+.

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run lint     # linter
```

## Estructura del proyecto

```
src/
├── components/
│   ├── topics/      # Módulos por método numérico (teoría + calculadora + gráficas)
│   ├── shared/      # Componentes compartidos
│   └── ui/          # Componentes base de interfaz
├── pages/           # Páginas de cada método
├── hooks/           # Hooks personalizados
├── lib/ y utils/    # Lógica de cálculo y utilidades
docs/                # Documentación y análisis numérico de los métodos
```

## Documentación

El historial de cambios está en [CHANGELOG.md](CHANGELOG.md) y la documentación teórica de los métodos en la carpeta [`docs/`](docs/).
