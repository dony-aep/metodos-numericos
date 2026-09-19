import type { MethodFamilyId, NumericalMethod } from '@/types/method';

export const NUMERICAL_METHODS: NumericalMethod[] = [
  {
    slug: 'errores-aproximaciones',
    facts: {
      convergence: 'No itera: el error cae con el orden del término donde cortes',
      cost: 'Una evaluación de la derivada por término de la serie',
      requires: ['El valor exacto, o al menos una cota suya'],
    },
    pitfall: {
      title: 'Cancelación catastrófica',
      note: 'Restar dos números casi iguales borra las cifras significativas que tenían en común. El error absoluto sigue siendo diminuto y el relativo se dispara, que es el que importa.',
    },
    title: 'Errores y aproximaciones',
    navTitle: 'Errores y aproximaciones',
    shortDescription:
      'Cálculo de errores absoluto, relativo y porcentual. Aproximación por series de Taylor.',
    description:
      'Calcula errores absoluto, relativo y porcentual. Explora la aproximación por series de Taylor y analiza cómo el truncamiento afecta la precisión del resultado.',
    family: 'fundamentos',
    formulas: [
      { caption: 'Error relativo', latex: 'E_r = \\frac{|x - \\tilde{x}|}{|x|}' },
      {
        caption: 'Serie de Taylor',
        latex: 'f(x) \\approx \\sum_{k=0}^{n} \\frac{f^{(k)}(a)}{k!}(x-a)^k',
      },
    ],
    status: 'available',
  },
  {
    slug: 'ecuaciones-no-lineales',
    facts: {
      convergence: 'Según el método: lineal, superlineal de orden 1.618 o cuadrático',
      cost: 'Una o dos evaluaciones por iteración, según el método',
      requires: ['Una función continua', 'Un punto o un intervalo de partida'],
    },
    pitfall: {
      title: 'El de mayor orden no siempre gana',
      note: 'Newton dobla los dígitos correctos, pero gasta dos evaluaciones por paso y puede divergir. La secante gasta una y le sigue el ritmo, así que en tiempo real suele salir ganando.',
    },
    title: 'Ecuaciones no lineales',
    navTitle: 'Comparador de métodos',
    shortDescription:
      'Comparación de bisección, Newton-Raphson y secante para encontrar raíces de funciones.',
    description:
      'Aplica bisección, Newton-Raphson y secante a una misma función para ver de cerca en qué se diferencian un método cerrado y uno abierto.',
    family: 'raices',
    formulas: [
      { caption: 'Newton-Raphson', latex: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}" },
      { caption: 'Bisección', latex: 'm = \\frac{a + b}{2}, \\quad f(a)f(b) < 0' },
    ],
    status: 'available',
  },
  {
    slug: 'biseccion',
    facts: {
      convergence: 'Lineal, con razón 1/2 exacta',
      cost: 'Una evaluación de f por iteración',
      requires: ['f continua en [a, b]', 'Cambio de signo: f(a)·f(b) < 0'],
    },
    pitfall: {
      title: 'Una raíz doble lo deja fuera de juego',
      note: 'Si la función toca el eje sin cruzarlo, como (x−1)², no hay cambio de signo en ningún intervalo que la contenga y el método ni siquiera arranca.',
      example: { expression: 'x^2 - 2*x + 1', a: '0', b: '3' },
    },
    title: 'Método de bisección',
    navTitle: 'Bisección',
    shortDescription:
      'Método cerrado que divide el intervalo a la mitad iterativamente hasta encontrar la raíz.',
    description:
      'Divide el intervalo en dos mitades y conserva aquella donde la función cambia de signo. Es lento, pero si se cumple el teorema del valor intermedio siempre llega.',
    family: 'raices',
    formulas: [
      { caption: 'Punto medio', latex: 'c = \\frac{a + b}{2}' },
      { caption: 'Cota del error', latex: 'E_n \\leq \\frac{b - a}{2^n}' },
    ],
    status: 'available',
  },
  {
    slug: 'newton-raphson',
    facts: {
      convergence: 'Cuadrático cerca de la raíz',
      cost: 'Dos evaluaciones por iteración: f y su derivada',
      requires: ['f derivable', 'Un x₀ suficientemente cerca de la raíz'],
    },
    pitfall: {
      title: 'La tangente puede meterte en un bucle',
      note: 'Con x³ − 2x + 2 desde x₀ = 0 la iteración salta a 1, vuelve a 0 y se queda dando vueltas para siempre. No diverge ni converge: cicla.',
      example: {
        expression: 'x^3 - 2*x + 2',
        derivative: '3*x^2 - 2',
        x0: '0',
      },
    },
    title: 'Newton-Raphson',
    navTitle: 'Newton-Raphson',
    shortDescription:
      'Método abierto que usa la tangente para aproximar raíces con convergencia cuadrática.',
    description:
      'Aproxima la raíz siguiendo la recta tangente en cada iteración. Cerca de la solución dobla los dígitos correctos en cada paso, y lejos de ella puede escaparse.',
    family: 'raices',
    formulas: [
      { caption: 'Fórmula iterativa', latex: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}" },
      { caption: 'Convergencia cuadrática', latex: '|e_{n+1}| \\approx C|e_n|^2' },
    ],
    status: 'available',
  },
  {
    slug: 'secante',
    facts: {
      convergence: 'Superlineal, orden 1.618, el número áureo',
      cost: 'Una evaluación de f por iteración',
      requires: ['Dos puntos de partida', 'Que f(x₀) y f(x₁) no sean casi iguales'],
    },
    pitfall: {
      title: 'División por casi cero',
      note: 'La pendiente de la secante es la diferencia de las imágenes entre la de las abscisas. Si los dos puntos dan valores parecidos el denominador se acerca a cero y el siguiente punto se dispara lejísimos.',
    },
    title: 'Método de la secante',
    navTitle: 'Secante',
    shortDescription:
      'Método iterativo para encontrar raíces de ecuaciones no lineales sin usar derivadas.',
    description:
      'Sustituye la tangente de Newton por la secante entre dos puntos sucesivos. Convergencia casi tan rápida sin necesidad de derivar la función.',
    family: 'raices',
    formulas: [
      {
        caption: 'Fórmula iterativa',
        latex:
          'x_{n+1} = x_n - f(x_n) \\cdot \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}',
      },
    ],
    status: 'available',
  },
  {
    slug: 'sistemas-lineales',
    facts: {
      convergence: 'Método directo: acaba en un número fijo de operaciones',
      cost: 'Del orden de 2n³/3 operaciones',
      requires: ['Matriz cuadrada', 'Determinante distinto de cero'],
    },
    pitfall: {
      title: 'Mal condicionamiento',
      note: 'Si el determinante es casi nulo, un cambio diminuto en el vector b mueve la solución muchísimo. No es culpa del método: el problema es así y ningún algoritmo lo arregla.',
    },
    title: 'Sistemas de ecuaciones lineales',
    navTitle: 'Sistemas Ax = b',
    shortDescription:
      'Resolución de sistemas lineales en forma matricial Ax = b mediante métodos directos.',
    description:
      'Ingresa la matriz de coeficientes y el vector de términos independientes para resolver el sistema por métodos directos.',
    family: 'sistemas',
    formulas: [{ caption: 'Forma matricial', latex: 'A\\mathbf{x} = \\mathbf{b}' }],
    status: 'available',
  },
  {
    slug: 'eliminacion-gauss',
    facts: {
      convergence: 'Directo, n − 1 etapas de eliminación',
      cost: 'Del orden de 2n³/3 operaciones',
      requires: ['Pivotes no nulos, o pivoteo parcial que los busque'],
    },
    pitfall: {
      title: 'Un pivote diminuto arruina el resultado',
      note: 'Dividir entre un pivote casi cero multiplica el error de redondeo por un número enorme y lo arrastra por toda la matriz. El pivoteo parcial existe exactamente para evitarlo.',
    },
    title: 'Eliminación de Gauss',
    navTitle: 'Eliminación de Gauss',
    shortDescription:
      'Resolución paso a paso de sistemas lineales mediante eliminación y sustitución.',
    description:
      'Lleva el sistema a forma triangular superior con operaciones elementales de fila y luego resuelve por sustitución hacia atrás.',
    family: 'sistemas',
    formulas: [
      {
        caption: 'Operación de eliminación',
        latex: 'm_{ik} = \\frac{a_{ik}}{a_{kk}}, \\quad F_i \\leftarrow F_i - m_{ik}F_k',
      },
    ],
    status: 'available',
  },
  {
    slug: 'jacobi-gauss-seidel',
    facts: {
      convergence: 'Lineal, con razón igual al radio espectral de la matriz de iteración',
      cost: 'Del orden de n² operaciones por iteración',
      requires: ['Diagonal estrictamente dominante, o radio espectral menor que 1'],
    },
    pitfall: {
      title: 'Sin diagonal dominante, diverge',
      note: 'La condición no es un formalismo: si la diagonal no manda, el error se multiplica en cada pasada y la tabla de iteraciones se va al infinito en unos pocos pasos.',
    },
    title: 'Jacobi y Gauss-Seidel',
    navTitle: 'Jacobi y Gauss-Seidel',
    shortDescription:
      'Resolución iterativa de sistemas lineales grandes mediante aproximaciones sucesivas.',
    description:
      'Parten de una solución tentativa y la refinan hasta que deja de moverse. Ganan terreno frente a los métodos directos en sistemas grandes y dispersos.',
    family: 'sistemas',
    formulas: [
      {
        caption: 'Fórmula de Jacobi',
        latex:
          'x_i^{(k+1)} = \\frac{1}{a_{ii}}\\left(b_i - \\sum_{j \\neq i} a_{ij}x_j^{(k)}\\right)',
      },
    ],
    status: 'available',
  },
  {
    slug: 'interpolacion-polinomica',
    facts: {
      convergence: 'El error depende de la derivada n+1 y de dónde estén los nodos',
      cost: 'Del orden de n² para construirlo y n para evaluarlo',
      requires: ['Nodos distintos entre sí'],
    },
    pitfall: {
      title: 'Fenómeno de Runge',
      note: 'Con nodos equiespaciados y grado alto, el polinomio oscila sin control cerca de los extremos del intervalo. Añadir puntos empeora el resultado en vez de mejorarlo.',
    },
    title: 'Interpolación polinómica',
    navTitle: 'Interpolación polinómica',
    shortDescription:
      'Construcción del polinomio único que pasa exactamente por un conjunto de puntos dados.',
    description:
      'Construye el polinomio que pasa exactamente por los puntos conocidos, para estimar valores intermedios a partir de datos discretos.',
    family: 'aproximacion',
    formulas: [
      {
        caption: 'Forma de Lagrange',
        latex:
          'P_n(x) = \\sum_{i=0}^{n} y_i \\prod_{j \\neq i} \\frac{x - x_j}{x_i - x_j}',
      },
    ],
    status: 'available',
  },
  {
    slug: 'newton-diferencias-divididas',
    facts: {
      convergence: 'Es el mismo polinomio que Lagrange, con el mismo error',
      cost: 'Del orden de n² para la tabla; añadir un punto cuesta n',
      requires: ['Nodos distintos entre sí'],
    },
    pitfall: {
      title: 'Nodos casi repetidos',
      note: 'Cada diferencia dividida es un cociente cuyo denominador es la distancia entre nodos. Dos nodos muy próximos lo acercan a cero y la tabla pierde precisión fila a fila.',
    },
    title: 'Diferencias divididas de Newton',
    navTitle: 'Diferencias divididas',
    shortDescription:
      'Forma incremental de interpolación con tabla de diferencias divididas.',
    description:
      'Construye el polinomio interpolante con una tabla triangular. Agregar un punto nuevo añade un término, sin rehacer el cálculo anterior.',
    family: 'aproximacion',
    formulas: [
      {
        caption: 'Polinomio de Newton',
        latex:
          'P_n(x) = \\sum_{k=0}^{n} f[x_0,\\dots,x_k] \\prod_{j=0}^{k-1}(x - x_j)',
      },
    ],
    status: 'available',
  },
  {
    slug: 'lagrange',
    facts: {
      convergence: 'El mismo polinomio y el mismo error que las demás formas',
      cost: 'Del orden de n² por evaluación, sin tabla previa',
      requires: ['Nodos distintos entre sí'],
    },
    pitfall: {
      title: 'Un punto nuevo obliga a rehacerlo todo',
      note: 'Cada base depende de todos los nodos a la vez, así que al añadir un dato no se reaprovecha nada de lo calculado. Ahí es donde gana la forma de Newton.',
    },
    title: 'Interpolación de Lagrange',
    navTitle: 'Lagrange',
    shortDescription: 'Interpolación directa usando polinomios base de Lagrange.',
    description:
      'Cada base vale 1 en su nodo y 0 en los demás, así que la suma ponderada pasa por todos los puntos sin resolver ningún sistema.',
    family: 'aproximacion',
    formulas: [
      { caption: 'Fórmula de Lagrange', latex: 'P_n(x) = \\sum_{k=0}^{n} y_k \\, L_k(x)' },
      {
        caption: 'Base de Lagrange',
        latex:
          'L_k(x) = \\prod_{\\substack{j=0 \\\\ j \\ne k}}^{n} \\frac{x - x_j}{x_k - x_j}',
      },
    ],
    status: 'available',
  },
  {
    slug: 'minimos-cuadrados',
    facts: {
      convergence: 'Directo: resuelve un sistema, no itera',
      cost: 'Montar AᵀA y resolver un sistema de grado+1 incógnitas',
      requires: ['Más puntos que coeficientes a ajustar'],
    },
    pitfall: {
      title: 'Las ecuaciones normales empeoran el condicionamiento',
      note: 'Formar AᵀA eleva al cuadrado el número de condición del problema. Con grado alto el ajuste se vuelve inestable y conviene resolverlo por factorización QR.',
    },
    title: 'Ajuste por mínimos cuadrados',
    navTitle: 'Mínimos cuadrados',
    shortDescription:
      'Ajuste de curvas y rectas minimizando el error cuadrático total.',
    description:
      'Cuando los datos traen ruido no interesa pasar por todos los puntos, sino acercarse a todos. Admite ajuste lineal y polinómico de grado arbitrario.',
    family: 'aproximacion',
    formulas: [
      { caption: 'Ecuaciones normales', latex: 'A^T A \\, \\mathbf{c} = A^T \\mathbf{b}' },
      { caption: 'Minimizar', latex: 'S = \\sum_{i=1}^{n} \\left(y_i - f(x_i)\\right)^2' },
    ],
    status: 'available',
  },
  {
    slug: 'derivacion-numerica',
    facts: {
      convergence: 'O(h) hacia adelante y atrás, O(h²) centrada, O(h⁴) cinco puntos',
      cost: 'Dos evaluaciones la centrada, cuatro la de cinco puntos',
      requires: ['f derivable tantas veces como el orden del esquema'],
    },
    pitfall: {
      title: 'Bajar h deja de ayudar',
      note: 'El error de truncamiento cae con h, pero el de redondeo sube como 1/h porque restas números cada vez más parecidos. Hay un h óptimo y por debajo de él el resultado empeora.',
    },
    title: 'Derivación numérica',
    navTitle: 'Derivación',
    shortDescription:
      'Aproximación de derivadas con esquemas hacia adelante, atrás y centrados.',
    description:
      'Aproxima la derivada con diferencias finitas: hacia adelante, hacia atrás, centrada, cinco puntos y segunda derivada. Incluye el estudio de convergencia al refinar h.',
    family: 'calculo',
    formulas: [
      {
        caption: 'Diferencia centrada',
        latex: "f'(x) \\approx \\frac{f(x+h) - f(x-h)}{2h}",
      },
      {
        caption: 'Cinco puntos',
        latex:
          "f'(x) \\approx \\frac{-f(x+2h) + 8f(x+h) - 8f(x-h) + f(x-2h)}{12h}",
      },
    ],
    status: 'available',
  },
  {
    slug: 'integracion-numerica',
    facts: {
      convergence: 'O(h²) el trapecio, O(h⁴) Simpson',
      cost: 'n + 1 evaluaciones de f, se refine como se refine',
      requires: ['Número par de subintervalos para Simpson compuesto'],
    },
    pitfall: {
      title: 'Refinar a ciegas desperdicia evaluaciones',
      note: 'Si la función tiene un pico en una zona pequeña, partir todo el intervalo por igual gasta evaluaciones donde no hacen falta. Ahí es donde entran los métodos adaptativos.',
    },
    title: 'Integración numérica',
    navTitle: 'Integración',
    shortDescription:
      'Aproximación de integrales definidas con reglas compuestas.',
    description:
      'Mide el área bajo la curva con segmentos rectos (trapecio) o con parábolas (Simpson 1/3), en sus versiones compuestas.',
    family: 'calculo',
    formulas: [
      {
        caption: 'Trapecio compuesto',
        latex:
          '\\int_a^b f(x)\\,dx \\approx \\frac{h}{2}\\left[f(x_0)+2\\sum_{i=1}^{n-1}f(x_i)+f(x_n)\\right]',
      },
      {
        caption: 'Simpson 1/3',
        latex:
          '\\int_a^b f(x)\\,dx \\approx \\frac{h}{3}\\left[f(x_0)+4\\sum_{\\text{impar}}f(x_i)+2\\sum_{\\text{par}}f(x_i)+f(x_n)\\right]',
      },
    ],
    status: 'available',
  },
  {
    slug: 'euler',
    facts: {
      convergence: 'O(h) global, O(h²) en cada paso',
      cost: 'Una evaluación de f por paso',
      requires: ['Una condición inicial', 'f continua y de Lipschitz en y'],
    },
    pitfall: {
      title: 'Con un problema rígido explota',
      note: 'Para y′ = −20y hace falta h < 0.1 o la solución numérica oscila y crece, aunque la real decaiga suavemente hacia cero. La estabilidad manda sobre la precisión.',
      example: {
        expression: '-20*y',
        x0: '0',
        y0: '1',
        h: '0.2',
        steps: '20',
        exact: 'exp(-20*x)',
      },
    },
    title: 'Método de Euler',
    navTitle: 'Euler',
    shortDescription:
      'Método de Euler para aproximar la solución de problemas de valor inicial.',
    description:
      'Sigue la curva solución a base de rectas tangentes, un paso h cada vez. Es el método más sencillo para un problema de valor inicial, y la base de todos los demás.',
    family: 'diferenciales',
    formulas: [
      { caption: 'Fórmula de recurrencia', latex: 'y_{n+1} = y_n + h \\, f(x_n, y_n)' },
      {
        caption: 'Problema de valor inicial',
        latex: '\\frac{dy}{dx} = f(x,y), \\quad y(x_0) = y_0',
      },
    ],
    status: 'available',
  },
  {
    slug: 'difusion-calor',
    facts: {
      convergence: 'O(Δt + Δx²)',
      cost: 'n multiplicaciones por paso de tiempo',
      requires: ['λ = αΔt/Δx² no mayor que 1/2'],
    },
    pitfall: {
      title: 'Pasado λ = 0.5, la barra explota',
      note: 'El esquema explícito es condicionalmente estable. Si subes el paso de tiempo por encima de ese límite, la temperatura empieza a oscilar de nodo a nodo y crece sin freno.',
    },
    title: 'Ecuación de difusión del calor',
    navTitle: 'Difusión del calor',
    shortDescription:
      'Esquema explícito FTCS por diferencias finitas para la ecuación del calor en 1D.',
    description:
      'Aquí entran dos variables, espacio y tiempo. El esquema explícito FTCS avanza la temperatura de la barra hasta que el calor se reparte y todo se equilibra.',
    family: 'diferenciales',
    formulas: [
      {
        caption: 'Ecuación del calor (1D)',
        latex:
          '\\frac{\\partial u}{\\partial t} = \\alpha\\,\\frac{\\partial^2 u}{\\partial x^2}',
      },
      {
        caption: 'Esquema explícito (FTCS)',
        latex:
          'u_i^{\\,n+1} = u_i^{\\,n} + \\lambda\\left(u_{i+1}^{\\,n} - 2u_i^{\\,n} + u_{i-1}^{\\,n}\\right)',
      },
    ],
    status: 'available',
  },
];

export function getMethodBySlug(slug: string) {
  return NUMERICAL_METHODS.find((method) => method.slug === slug);
}

export function getMethodsByFamily(family: MethodFamilyId) {
  return NUMERICAL_METHODS.filter((method) => method.family === family);
}
