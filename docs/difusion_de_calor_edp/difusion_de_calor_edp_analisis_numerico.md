# Ecuación de difusión del calor (EDP)

## 1. Introducción
La **ecuación de difusión del calor** (o simplemente *ecuación del calor*) es una **ecuación en derivadas parciales (EDP)** que describe cómo se distribuye la temperatura en un cuerpo a lo largo del **espacio** y del **tiempo**.

A diferencia de las **EDO** (como las que resuelve el método de Euler), donde la función desconocida depende de **una sola variable**, aquí la incógnita \(u(x,t)\) depende de **al menos dos variables**: la posición \(x\) y el tiempo \(t\). Por eso aparecen **derivadas parciales**.

Su forma más sencilla, en una dimensión espacial, es:

\[
\frac{\partial u}{\partial t} = \alpha \frac{\partial^2 u}{\partial x^2}
\]

donde:
- \(u(x,t)\) = temperatura en la posición \(x\) y el tiempo \(t\),
- \(\alpha\) = **difusividad térmica** del material (constante positiva).

La idea física es intuitiva: **el calor fluye de las zonas calientes a las frías**, y con el tiempo la temperatura tiende a suavizarse y equilibrarse.

> Este tema es la continuación natural del método de Euler: pasamos de resolver EDOs (una variable) a resolver EDPs (varias variables) mediante **diferencias finitas**.

---

## 2. Conceptos básicos

### 2.1 ¿Qué es una EDP?
Una **ecuación en derivadas parciales** relaciona una función desconocida de varias variables con sus **derivadas parciales**. La ecuación del calor es el ejemplo clásico de EDP de tipo **parabólico**, que modela procesos de **difusión** dependientes del tiempo.

### 2.2 Difusividad térmica \(\alpha\)
La constante \(\alpha\) mide qué tan rápido se propaga el calor en un material:

\[
\alpha = \frac{k}{\rho\, c_p}
\]

- \(k\): conductividad térmica,
- \(\rho\): densidad,
- \(c_p\): calor específico.

Materiales como el cobre tienen \(\alpha\) alta (el calor se propaga rápido); la madera o el aire tienen \(\alpha\) baja.

### 2.3 Condición inicial
Describe la temperatura en todo el dominio en el instante \(t=0\):

\[
u(x,0) = f(x)
\]

### 2.4 Condiciones de frontera
Describen qué pasa en los extremos del dominio durante todo el tiempo. Las más comunes:

- **Dirichlet** (temperatura fija en los bordes):
\[
u(0,t)=T_a, \qquad u(L,t)=T_b
\]
- **Neumann** (flujo de calor fijo; por ejemplo, borde aislado):
\[
\frac{\partial u}{\partial x}\Big|_{x=0} = 0
\]
- **Robin** (mixta: combina valor y flujo; modela **convección** con el ambiente):
\[
a\,u + b\,\frac{\partial u}{\partial n} = g \quad \text{en la frontera}
\]
Es la más realista en ingeniería: representa una superficie que intercambia calor con un fluido (ley de enfriamiento de Newton). Numéricamente se discretiza con una diferencia hacia afuera o un **nodo fantasma** (p. ej. en \(x=0\): \(a u_0 - b\,(u_1-u_{-1})/(2\Delta x) = g\), despejando \(u_{-1}\)).

Una EDP **necesita** condición inicial **y** condiciones de frontera para tener solución única.

---

## 3. La ecuación en 1D, 2D y 3D
De forma general, con el operador **laplaciano** \(\nabla^2\):

\[
\frac{\partial u}{\partial t} = \alpha\,\nabla^2 u
\]

### 3.1 Una dimensión (barra)
Modela una barra delgada de longitud \(L\):

\[
\frac{\partial u}{\partial t} = \alpha \frac{\partial^2 u}{\partial x^2}, \qquad 0 < x < L,\ t>0
\]

### 3.2 Dos dimensiones (placa)
Modela una placa plana:

\[
\frac{\partial u}{\partial t} = \alpha\left(\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}\right)
\]

### 3.3 Tres dimensiones (bloque)
\[
\frac{\partial u}{\partial t} = \alpha\left(\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} + \frac{\partial^2 u}{\partial z^2}\right)
\]

En esta investigación nos centramos en el **caso 1D**, que es el más usado para enseñar y programar. Los esquemas y la idea de estabilidad se extienden a 2D/3D aplicando diferencias centradas en cada dirección (en 2D la cota explícita pasa a ser aproximadamente \(\Delta t \le h^2/(4\alpha)\)).

---

## 4. Discretización por diferencias finitas
La idea central es **reemplazar las derivadas por aproximaciones discretas** (igual que en derivación numérica), construyendo una **malla** en espacio y tiempo.

### 4.1 La malla
- Dividimos el espacio en \(N\) intervalos: \(x_i = i\,\Delta x\), con \(\Delta x = L/N\).
- Dividimos el tiempo en pasos: \(t_n = n\,\Delta t\).
- Notación: \(u_i^n \approx u(x_i, t_n)\).

### 4.2 Aproximación de las derivadas
- **Derivada temporal** (diferencia hacia adelante, orden \(O(\Delta t)\)):
\[
\frac{\partial u}{\partial t} \approx \frac{u_i^{\,n+1}-u_i^{\,n}}{\Delta t}
\]

- **Segunda derivada espacial** (diferencia central, orden \(O(\Delta x^2)\)):
\[
\frac{\partial^2 u}{\partial x^2} \approx \frac{u_{i+1}^{\,n}-2u_i^{\,n}+u_{i-1}^{\,n}}{\Delta x^2}
\]

Combinando ambas aproximaciones obtenemos los distintos **esquemas numéricos**.

Definimos el **número de difusión** (parámetro clave):

\[
\boxed{\lambda = \frac{\alpha\,\Delta t}{\Delta x^2}}
\]

---

## 5. Método explícito (FTCS)
**FTCS** = *Forward-Time, Central-Space* (adelante en tiempo, central en espacio).

Sustituyendo las aproximaciones del apartado 4 y despejando el valor futuro \(u_i^{n+1}\):

\[
\frac{u_i^{\,n+1}-u_i^{\,n}}{\Delta t} = \alpha\,\frac{u_{i+1}^{\,n}-2u_i^{\,n}+u_{i-1}^{\,n}}{\Delta x^2}
\]

\[
\boxed{u_i^{\,n+1} = u_i^{\,n} + \lambda\left(u_{i+1}^{\,n}-2u_i^{\,n}+u_{i-1}^{\,n}\right)}
\]

### Características
- **Explícito**: cada valor futuro se calcula **directamente** con valores conocidos del paso anterior. No hay que resolver ningún sistema.
- Muy fácil de programar.
- **Pero** es **condicionalmente estable** (ver apartado 8).

### Molécula computacional
El valor nuevo en un punto depende de **tres puntos** del paso anterior:

```
        u_i^{n+1}
           |
   u_{i-1}^n  u_i^n  u_{i+1}^n
```

---

## 6. Método implícito (BTCS)
**BTCS** = *Backward-Time, Central-Space*. Evalúa la segunda derivada espacial en el **nuevo** paso de tiempo \(n+1\):

\[
\frac{u_i^{\,n+1}-u_i^{\,n}}{\Delta t} = \alpha\,\frac{u_{i+1}^{\,n+1}-2u_i^{\,n+1}+u_{i-1}^{\,n+1}}{\Delta x^2}
\]

Reordenando:

\[
-\lambda\,u_{i-1}^{\,n+1} + (1+2\lambda)\,u_i^{\,n+1} - \lambda\,u_{i+1}^{\,n+1} = u_i^{\,n}
\]

### Características
- En cada paso de tiempo hay que **resolver un sistema de ecuaciones lineales** (matriz **tridiagonal**).
- Se resuelve eficientemente con el **algoritmo de Thomas** (eliminación de Gauss especializada para tridiagonales).
- **Incondicionalmente estable**: funciona con cualquier \(\Delta t\).

> Aquí se **conectan** varios temas del curso: la EDP se reduce a resolver un **sistema lineal** (eliminación de Gauss / métodos iterativos).

---

## 7. Método de Crank-Nicolson
Es el **promedio** del esquema explícito y el implícito. Evalúa la segunda derivada como el promedio entre el paso \(n\) y \(n+1\):

\[
\frac{u_i^{\,n+1}-u_i^{\,n}}{\Delta t} = \frac{\alpha}{2}\left(\frac{\delta^2 u_i^{\,n+1} + \delta^2 u_i^{\,n}}{\Delta x^2}\right)
\]

donde \(\delta^2 u_i = u_{i+1}-2u_i+u_{i-1}\).

### Características
- **Incondicionalmente estable**.
- **Más preciso**: orden \(O(\Delta t^2) + O(\Delta x^2)\) (segundo orden también en el tiempo).
- También requiere resolver un sistema tridiagonal por paso.
- Es el método **más usado en la práctica** por su equilibrio entre precisión y estabilidad.

### Comparación rápida

| Método | Tipo | Estabilidad | Orden en tiempo | ¿Resuelve sistema? |
|---|---|---|---|---|
| Explícito (FTCS) | Explícito | Condicional (\(\lambda \le 1/2\)) | \(O(\Delta t)\) | No |
| Implícito (BTCS) | Implícito | Incondicional | \(O(\Delta t)\) | Sí (tridiagonal) |
| Crank-Nicolson | Mixto | Incondicional | \(O(\Delta t^2)\) | Sí (tridiagonal) |

---

## 8. Estabilidad numérica (condición clave)
Para el **método explícito**, el análisis de estabilidad de **von Neumann** exige:

\[
\boxed{\lambda = \frac{\alpha\,\Delta t}{\Delta x^2} \le \frac{1}{2}}
\]

### ¿Qué significa?
- Si \(\lambda \le 1/2\): la solución es estable y se suaviza correctamente.
- Si \(\lambda > 1/2\): aparecen **oscilaciones crecientes** y la solución **diverge** (resultados sin sentido), aunque la solución física real sea estable.

### Consecuencia práctica
Si refinas la malla en espacio (reduces \(\Delta x\) a la mitad), debes reducir \(\Delta t\) a **la cuarta parte** para mantener la estabilidad. Esto vuelve al método explícito **muy costoso** en mallas finas.

Por eso, para problemas exigentes se prefieren los métodos **implícito** o **Crank-Nicolson**, que son **incondicionalmente estables**.

---

## 9. Algoritmo (método explícito)

### Entrada
- difusividad \(\alpha\), longitud \(L\), tiempo final \(T\),
- número de nodos espaciales \(N\), paso de tiempo \(\Delta t\),
- condición inicial \(f(x)\),
- condiciones de frontera \(u(0,t)\), \(u(L,t)\).

### Proceso
1. Calcular \(\Delta x = L/N\) y \(\lambda = \alpha\,\Delta t/\Delta x^2\).
2. **Verificar estabilidad**: si \(\lambda > 0.5\), avisar/ajustar \(\Delta t\).
3. Inicializar el vector \(u\) con la condición inicial.
4. Para cada paso de tiempo:
   - calcular el nuevo vector con la fórmula FTCS en los nodos interiores,
   - aplicar las condiciones de frontera,
   - guardar el estado (para graficar/animar).

### Salida
Matriz/serie temporal de perfiles de temperatura \(u_i^n\).

---

## 10. Pseudocódigo (método explícito)

```text
Leer alfa, L, T, N, dt, f(x), u_izq, u_der
dx = L / N
lambda = alfa * dt / (dx*dx)

Si lambda > 0.5 entonces
    Avisar "Inestable: reducir dt o aumentar dx"
Fin Si

# Condición inicial
Para i = 0 hasta N hacer
    u[i] = f(i * dx)
Fin Para

# Avance en el tiempo
n_pasos = T / dt
Para n = 1 hasta n_pasos hacer
    u_nuevo = copia(u)
    Para i = 1 hasta N-1 hacer
        u_nuevo[i] = u[i] + lambda * (u[i+1] - 2*u[i] + u[i-1])
    Fin Para
    u_nuevo[0] = u_izq      # frontera Dirichlet
    u_nuevo[N] = u_der
    u = u_nuevo
    Guardar u
Fin Para
```

---

## 11. Ejemplo resuelto paso a paso
Barra de longitud \(L=1\), con \(\alpha=1\), dividida en \(N=4\) intervalos, así que \(\Delta x = 0.25\).

Tomamos \(\Delta t = 0.025\). Entonces:

\[
\lambda = \frac{1 \cdot 0.025}{0.25^2} = \frac{0.025}{0.0625} = 0.4 \le 0.5 \ \checkmark \ \text{(estable)}
\]

**Condición inicial** (barra caliente en el centro, fría en los extremos):

| \(i\) | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| \(x_i\) | 0.00 | 0.25 | 0.50 | 0.75 | 1.00 |
| \(u_i^0\) | 0 | 50 | 100 | 50 | 0 |

**Fronteras (Dirichlet):** \(u_0=0\) y \(u_4=0\) en todo momento.

### Paso 1 (de \(t=0\) a \(t=\Delta t\))
Fórmula: \(u_i^{1} = u_i^{0} + 0.4\,(u_{i+1}^{0}-2u_i^{0}+u_{i-1}^{0})\)

- \(u_1^1 = 50 + 0.4(100 - 2\cdot 50 + 0) = 50 + 0.4(0) = 50\)
- \(u_2^1 = 100 + 0.4(50 - 2\cdot 100 + 50) = 100 + 0.4(-100) = 60\)
- \(u_3^1 = 50 + 0.4(0 - 2\cdot 50 + 100) = 50 + 0.4(0) = 50\)

| \(i\) | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| \(u_i^1\) | 0 | 50 | 60 | 50 | 0 |

### Paso 2
- \(u_1^2 = 50 + 0.4(60 - 100 + 0) = 50 + 0.4(-40) = 34\)
- \(u_2^2 = 60 + 0.4(50 - 120 + 50) = 60 + 0.4(-20) = 52\)
- \(u_3^2 = 50 + 0.4(0 - 100 + 60) = 50 + 0.4(-40) = 34\)

| \(i\) | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| \(u_i^2\) | 0 | 34 | 52 | 34 | 0 |

Se observa la **física esperada**: el pico de calor del centro **baja** y se **reparte** hacia los lados. Con el tiempo, toda la barra tiende a \(0\) (la temperatura de las fronteras).

---

## 12. Errores y orden
- **Método explícito y BTCS:** error de truncamiento \(O(\Delta t) + O(\Delta x^2)\).
- **Crank-Nicolson:** error \(O(\Delta t^2) + O(\Delta x^2)\) (mejor en el tiempo).

Las fuentes de error son:
- **Truncamiento**: por aproximar derivadas con diferencias finitas.
- **Redondeo**: por la aritmética de punto flotante.
- **Inestabilidad**: si no se respeta la condición \(\lambda \le 1/2\) (solo explícito).

### 12.1 Consistencia, estabilidad y convergencia
Tres conceptos clave que conviene distinguir:
- **Consistencia**: el esquema discreto tiende a la EDP continua cuando \(\Delta t, \Delta x \to 0\) (los tres esquemas lo cumplen).
- **Estabilidad**: los errores no crecen sin control al avanzar en el tiempo (explícito: condicional; implícito y CN: incondicional).
- **Convergencia**: la solución numérica tiende a la solución exacta al refinar la malla.

El **teorema de equivalencia de Lax** los conecta: para un problema lineal bien planteado,
\[
\textbf{consistencia} + \textbf{estabilidad} \;\Longrightarrow\; \textbf{convergencia}.
\]
Por eso, en la práctica, garantizar estabilidad (respetar \(\lambda \le 1/2\) o usar un esquema incondicional) basta para confiar en que el método converge. La convergencia se verifica empíricamente **refinando la malla** y comparando contra una solución analítica conocida, p. ej. \(u(x,t)=\sin(\pi x)\,e^{-\pi^2\alpha t}\).

---

## 13. Implementación en programación

### Python (método explícito)
```python
import numpy as np

def calor_explicito(alpha, L, T, N, dt, f, u_izq, u_der):
    """Resuelve u_t = alpha * u_xx por diferencias finitas (FTCS)."""
    dx = L / N
    lam = alpha * dt / dx**2
    if lam > 0.5:
        raise ValueError(f"Inestable: lambda={lam:.3f} > 0.5")

    x = np.linspace(0, L, N + 1)
    u = f(x)                       # condición inicial
    u[0], u[-1] = u_izq, u_der

    pasos = int(T / dt)
    historia = [u.copy()]
    for _ in range(pasos):
        nuevo = u.copy()
        nuevo[1:-1] = u[1:-1] + lam * (u[2:] - 2*u[1:-1] + u[:-2])
        nuevo[0], nuevo[-1] = u_izq, u_der
        u = nuevo
        historia.append(u.copy())
    return x, np.array(historia)

# Ejemplo: barra con pico de calor en el centro
f = lambda x: np.where((x > 0.4) & (x < 0.6), 100.0, 0.0)
x, hist = calor_explicito(alpha=1.0, L=1.0, T=0.1, N=20, dt=0.001,
                          f=f, u_izq=0.0, u_der=0.0)
print(hist[-1])   # perfil final de temperatura
```

### C++ (núcleo del método explícito)
```cpp
#include <vector>
#include <stdexcept>

std::vector<std::vector<double>>
calorExplicito(double alpha, double L, double T,
               int N, double dt,
               const std::vector<double>& u0,
               double uIzq, double uDer) {
    double dx = L / N;
    double lam = alpha * dt / (dx * dx);
    if (lam > 0.5) throw std::runtime_error("Inestable: lambda > 0.5");

    std::vector<double> u = u0;
    int pasos = static_cast<int>(T / dt);
    std::vector<std::vector<double>> historia{u};

    for (int n = 0; n < pasos; ++n) {
        std::vector<double> nuevo = u;
        for (int i = 1; i < N; ++i)
            nuevo[i] = u[i] + lam * (u[i+1] - 2*u[i] + u[i-1]);
        nuevo[0] = uIzq; nuevo[N] = uDer;
        u = nuevo;
        historia.push_back(u);
    }
    return historia;
}
```

### JavaScript / TypeScript (para web)
```ts
export function calorExplicito(
  alpha: number, L: number, T: number,
  N: number, dt: number,
  u0: number[], uIzq: number, uDer: number,
): number[][] {
  const dx = L / N;
  const lambda = (alpha * dt) / (dx * dx);
  if (lambda > 0.5) throw new Error(`Inestable: λ=${lambda.toFixed(3)} > 0.5`);

  let u = [...u0];
  const pasos = Math.floor(T / dt);
  const historia: number[][] = [[...u]];

  for (let n = 0; n < pasos; n++) {
    const nuevo = [...u];
    for (let i = 1; i < N; i++) {
      nuevo[i] = u[i] + lambda * (u[i + 1] - 2 * u[i] + u[i - 1]);
    }
    nuevo[0] = uIzq;
    nuevo[N] = uDer;
    u = nuevo;
    historia.push([...u]);
  }
  return historia;
}
```

---

## 14. Aplicaciones del mundo real
La ecuación de difusión aparece en muchísimos campos, no solo en calor:

- **Ingeniería térmica**: enfriamiento de motores, disipadores, hornos, aislamiento de edificios.
- **Difusión de sustancias**: dispersión de contaminantes, tinta en agua, dopaje de semiconductores.
- **Finanzas**: la ecuación de **Black-Scholes** (precios de opciones) es matemáticamente una ecuación de difusión.
- **Procesamiento de imágenes**: el difuminado gaussiano y la reducción de ruido son difusión.
- **Biología**: difusión de nutrientes, modelos de propagación.
- **Geofísica**: temperatura del subsuelo, propagación de calor en el planeta.

### Casos de estudio con parámetros típicos
- **Conducción en sólidos**: enfriamiento de una barra o placa metálica. Difusividad de metales \(\alpha \approx 10^{-6}\)–\(10^{-5}\ \mathrm{m^2/s}\) (aceros, cobre), normalmente con frontera **Robin** (convección con el aire).
- **Enfriamiento industrial**: paradas/arranques de turbinas, calderas e intercambiadores de calor, donde se requieren perfiles de temperatura para diseñar tiempos de enfriamiento seguros.
- **Medios porosos**: misma EDP con un \(\alpha\) **efectivo** ajustado a la conductividad del medio; aplica a calor en suelos/rocas y a difusión de contaminantes.

---

## 15. Relación con otros temas del curso
Este tema **integra** varios métodos ya vistos:

- **Derivación numérica** → para aproximar \(\partial^2 u/\partial x^2\).
- **Método de Euler** → la marcha en el tiempo es Euler aplicado a cada nodo.
- **Sistemas de ecuaciones lineales / eliminación de Gauss** → el método implícito y Crank-Nicolson reducen cada paso a un sistema **tridiagonal**.
- **Métodos iterativos (Jacobi/Gauss-Seidel)** → alternativa para resolver ese sistema en mallas grandes.

Es, por tanto, un excelente tema de **cierre** que conecta casi todo el curso.

---

## 16. Opciones de implementación para el proyecto

### Opción A — Integrar en la web (React) [Recomendada]
Añadir una nueva ruta `/metodos/difusion-calor` a la plataforma existente.
- **Ventajas**: reutiliza todo el stack ya montado (ECharts para el mapa de calor animado, KaTeX para fórmulas, shadcn para la UI, mathjs). Coherente con los otros 15 métodos. Desplegable y demostrable en clase desde el navegador.
- **Visualización ideal**: un **mapa de calor (heatmap)** posición × tiempo, más una **animación** del perfil de temperatura evolucionando, y un control deslizante de \(\lambda\) que muestre en vivo cuándo el método explícito se vuelve inestable.

### Opción B — Simulación en C++
- **Ventajas**: rendimiento alto para mallas grandes o casos 2D/3D. Se apoya en bibliotecas maduras: **Eigen** (álgebra lineal densa/dispersa, ideal para el sistema tridiagonal de BTCS/CN), **PETSc** y **Trilinos** (solvers paralelos MPI/GPU para HPC).
- **Desventajas**: no se integra con la plataforma web, requiere otra forma de visualizar (exportar datos, gnuplot, etc.). Mejor como complemento de "alto rendimiento", no como entrega principal educativa.
- **Puente C++ ↔ web**: el núcleo C++ puede compilarse a **WebAssembly** (Emscripten) y llamarse desde JS/TS, combinando rendimiento nativo con el navegador. La visualización pesada (2D/3D) puede usar **WebGL/Three.js**, y para gráficos 2D bastan ECharts/Plotly/D3.

**Recomendación:** ir por la **Opción A** (web). Es lo más coherente con tu proyecto y con el mayor impacto didáctico. C++ queda como posible extensión futura para destacar el lado de rendimiento. En la sección 19 se detalla cómo sería ese proyecto de software completo.

---

## 17. Estructura sugerida para la presentación

1. Título: Ecuación de difusión del calor (EDP)
2. ¿Qué es una EDP? Diferencia con las EDO
3. La ecuación del calor y su sentido físico
4. La malla y las diferencias finitas
5. Método explícito (FTCS) y su fórmula
6. La condición de estabilidad \(\lambda \le 1/2\) (¡con demo de divergencia!)
7. Métodos implícito y Crank-Nicolson
8. Ejemplo numérico paso a paso
9. Demostración en vivo (animación del mapa de calor)
10. Aplicaciones del mundo real
11. Conclusiones

---

## 18. Métodos alternativos: Diferencias Finitas, Elementos Finitos y Volúmenes Finitos
Las diferencias finitas (FD) no son la única familia para resolver EDPs. Las otras dos grandes familias son **Elementos Finitos (FEM)** y **Volúmenes Finitos (FV)**.

| Método | Principio | Ventajas | Desventajas |
|---|---|---|---|
| **Diferencias finitas (FD)** | Aproxima derivadas por cocientes finitos en nodos de una malla estructurada. | Muy simple en geometrías regulares; directo. | Difícil en geometrías complejas; no es conservativo de forma explícita. |
| **Elementos finitos (FEM)** | Divide el dominio en elementos (triángulos/tetraedros) y usa funciones base locales con una formulación débil. | Maneja geometrías arbitrarias; preciso y adaptativo. | Ensamblaje de matrices e integración numérica; más complejo. |
| **Volúmenes finitos (FV)** | Integra las leyes de conservación sobre celdas y evalúa flujos en las caras (teorema de Gauss). | **Conservativo**; admite mallas no estructuradas; estándar en CFD. | Cálculo de flujos y reconstrucción; complejidad intermedia. |

En resumen: FD es lo ideal para aprender y para dominios sencillos (como esta plataforma); FEM y FV ganan cuando la geometría es irregular o se exige conservación física estricta.

### 18.1 Mallas no uniformes
Cuando hay zonas con gradientes fuertes (cerca de una frontera), conviene **refinar localmente** usando pasos \(\Delta x_i\) variables. La segunda derivada se generaliza así:
\[
u_{xx}(x_i)\approx \frac{2}{\Delta x_{i}+\Delta x_{i-1}}\left(\frac{u_{i+1}-u_i}{\Delta x_{i}}-\frac{u_i-u_{i-1}}{\Delta x_{i-1}}\right)
\]
Reduce algo el orden de precisión, pero permite mallar fino solo donde hace falta.

---

## 19. Ampliación: implementación como proyecto de software completo
Si el tema se llevara más allá de la plataforma educativa (p. ej. una simulación 2D/3D de alto rendimiento), el reporte de investigación profunda propone esta hoja de ruta.

### 19.1 Bibliotecas y tecnologías

| Herramienta | Tecnología | Ámbito | Nota |
|---|---|---|---|
| **Eigen** | C++ (header-only) | Álgebra lineal | Fácil y rápida para sistemas densos/dispersos medianos; sin paralelismo nativo. |
| **PETSc** | C/Fortran/Python | PDE / solvers | Escalable MPI/GPU; curva de aprendizaje alta. |
| **Trilinos** | C++ | HPC multifísica | Modular (FEM, solvers, precondicionadores); overhead alto. |
| **WebAssembly** | Emscripten | Frontend | Velocidad casi nativa en el navegador reutilizando C/C++. |
| **WebGL / Three.js** | JS / Web | Gráficos 2D/3D | Aceleración GPU; requiere shaders. |
| **D3.js / Plotly / ECharts** | JavaScript | Visualización 2D | Mapas de calor y curvas interactivas. |

### 19.2 Arquitectura cliente/servidor

```mermaid
graph LR
    Cliente["Cliente Web (JS/TS)"] -->|parámetros: malla, dt, BC| Servidor["Servidor (Node/Python o WASM)"]
    Servidor --> Solver["Solver C++ (Eigen/PETSc)"]
    Servidor -->|solución u(x,t)| Cliente
    Cliente --> Visual["Visualización (WebGL / ECharts)"]
```

### 19.3 Buenas prácticas de software
- **Paralelización**: OpenMP en bucles, MPI para dominios distribuidos, GPU para cómputo intensivo.
- **Precisión**: usar `double` por estabilidad; `float` solo si el rendimiento en GPU lo exige.
- **Validación**: tests unitarios (p. ej. la diferencia centrada da 0 para polinomios de grado 2), comparación contra soluciones analíticas y pruebas de convergencia al refinar la malla.
- **Visualización en vivo**: Web Workers o WebSockets para transmitir resultados parciales y mover parámetros en tiempo real.

### 19.4 Plan paso a paso (resumen)
1. Requisitos (dominio, \(\alpha\), condiciones, precisión).
2. Diseño modular: malla, solver, condiciones de frontera, E/S.
3. Implementar 1D explícito → validar con solución analítica.
4. Extender a implícito/Crank-Nicolson y a 2D.
5. Pruebas de convergencia y benchmarks de rendimiento.
6. Optimización (perfilado, BLAS optimizado, paralelismo).
7. Integración web (WASM o API REST) + visualización.

> Estimación del reporte para un equipo de 2–3 personas con experiencia: **~5.5 meses** de trabajo completo (código + pruebas + frontend + documentación). Para tu entrega de curso, la **Opción A** (página web sobre el stack actual) es mucho más acotada y realista.

---

## 20. Conclusión
La ecuación de difusión del calor es la puerta de entrada a las **ecuaciones en derivadas parciales** en Análisis Numérico. Mediante **diferencias finitas** se transforma una EDP en una sucesión de operaciones sencillas (método explícito) o en sistemas lineales tridiagonales (implícito y Crank-Nicolson).

El concepto más importante a transmitir es la **estabilidad**: el método explícito solo funciona si \(\lambda \le 1/2\), mientras que los métodos implícito y Crank-Nicolson son incondicionalmente estables a cambio de resolver un sistema en cada paso. Este tema conecta de forma natural casi todos los métodos del curso (derivación, Euler, sistemas lineales), por lo que es un cierre ideal para la plataforma.

---

## 21. Fuentes consultadas
- LibreTexts — *The Heat Equation* y *Finite Difference Methods for the Heat Equation*.
- FNC Book (Fundamentals of Numerical Computation) — *Diffusion equations* y *The method of lines*.
- Análisis de estabilidad de **von Neumann** para esquemas en diferencias finitas.
- **Teorema de equivalencia de Lax** (consistencia + estabilidad ⇒ convergencia).
- Notas académicas sobre esquemas FTCS, BTCS y Crank-Nicolson, y la condición de estabilidad \(\alpha\,\Delta t/\Delta x^2 \le 1/2\).
- Reporte de investigación profunda *deep-research-report.md* (formulación 1D/2D/3D, condiciones Robin, FEM/FV, mallas no uniformes, casos de estudio y plan de implementación).
- Documentación oficial de **Eigen**, **PETSc** y **Trilinos**; **Emscripten** (WebAssembly) y **Three.js/WebGL** para la implementación.
