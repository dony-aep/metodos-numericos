# EDOs y Método de Euler

## 1. Introducción
Las **ecuaciones diferenciales ordinarias (EDO)** son ecuaciones que relacionan una función desconocida con una o más de sus derivadas respecto a **una sola variable independiente**. En Análisis Numérico, muchas EDO no se resuelven de forma exacta o es muy difícil obtener una solución cerrada, por eso se usan **métodos numéricos** para aproximarlas.

El **método de Euler** es uno de los métodos más sencillos para resolver **problemas de valor inicial** de la forma:

\[
\frac{dy}{dx} = f(x,y), \qquad y(x_0)=y_0
\]

Su idea principal es aproximar la curva solución con la recta tangente en cada paso.

---

## 2. Conceptos básicos

### 2.1 Ecuación diferencial ordinaria
Una EDO contiene derivadas de una función desconocida respecto a una sola variable.

Ejemplo:
\[
\frac{dy}{dx} = x+y
\]

### 2.2 Problema de valor inicial (PVI)
Además de la ecuación diferencial, se da una condición inicial:

\[
y(x_0)=y_0
\]

Eso permite construir una solución aproximada paso a paso.

### 2.3 Idea de la aproximación
Si conocemos la pendiente en un punto, podemos avanzar un pequeño paso \(h\) usando la fórmula de la recta tangente:

\[
y(x_0+h) \approx y_0 + h\,f(x_0,y_0)
\]

Repitiendo este proceso obtenemos una sucesión de valores aproximados.

---

## 3. Derivación del método de Euler
Partimos de la expansión de Taylor:

\[
y(x+h)=y(x)+hy'(x)+\frac{h^2}{2}y''(\xi)
\]

para algún \(\xi\) entre \(x\) y \(x+h\).

Si despreciamos los términos de orden superior, queda:

\[
y(x+h)\approx y(x)+h\,y'(x)
\]

Como \(y'(x)=f(x,y)\), se obtiene la fórmula de Euler:

\[
\boxed{y_{n+1}=y_n+h\,f(x_n,y_n)}
\]

con

\[
x_{n+1}=x_n+h
\]

---

## 4. Interpretación geométrica
Euler usa la **pendiente instantánea** en cada punto para avanzar un paso fijo \(h\). Es decir:

- calcula la pendiente en \((x_n,y_n)\),
- proyecta una recta tangente,
- toma el siguiente valor sobre esa recta.

Cuanto menor sea el paso \(h\), más cerca estará la aproximación de la solución real, aunque también aumenta el número de iteraciones.

---

## 5. Algoritmo del método de Euler

### Entrada
- función \(f(x,y)\)
- condición inicial \((x_0,y_0)\)
- paso \(h\)
- número de pasos \(N\) o intervalo final

### Proceso
Para \(n=0,1,2,\dots,N-1\):
1. calcular \(f(x_n,y_n)\)
2. actualizar \(y_{n+1}=y_n+h f(x_n,y_n)\)
3. actualizar \(x_{n+1}=x_n+h\)

### Salida
Tabla de valores aproximados \((x_n,y_n)\)

---

## 6. Pseudocódigo

```text
Leer f, x0, y0, h, N
x = x0
y = y0
Imprimir x, y
Para i = 1 hasta N hacer:
    y = y + h * f(x, y)
    x = x + h
    Imprimir x, y
Fin Para
```

---

## 7. Ejemplo resuelto
Resolver aproximadamente:

\[
y' = y - x^2 + 1, \qquad y(0)=0.5
\]

con paso \(h=0.2\).

La función es:

\[
f(x,y)=y-x^2+1
\]

### Paso 0
\[
x_0=0, \quad y_0=0.5
\]

### Paso 1
\[
f(x_0,y_0)=0.5-0^2+1=1.5
\]
\[
y_1=0.5+0.2(1.5)=0.8
\]
\[
x_1=0.2
\]

### Paso 2
\[
f(x_1,y_1)=0.8-(0.2)^2+1=1.76
\]
\[
y_2=0.8+0.2(1.76)=1.152
\]
\[
x_2=0.4
\]

Y así sucesivamente.

---

## 8. Tabla de cálculo

| n | x_n | y_n | f(x_n, y_n) | y_{n+1} |
|---|---:|---:|---:|---:|
| 0 | 0.0 | 0.5000 | 1.5000 | 0.8000 |
| 1 | 0.2 | 0.8000 | 1.7600 | 1.1520 |
| 2 | 0.4 | 1.1520 | 2.0712 | 1.5662 |
| 3 | 0.6 | 1.5662 | 2.4062 | 2.0474 |

---

## 9. Error del método
Euler es un método de **primer orden**.

- **Error local de truncamiento:** \(O(h^2)\)
- **Error global acumulado:** \(O(h)\)

Eso significa que al reducir el paso a la mitad, normalmente el error global también disminuye aproximadamente a la mitad.

### Observación importante
Euler es fácil de implementar, pero no es muy preciso cuando:
- la solución cambia rápido,
- el paso \(h\) es grande,
- el problema es rígido o de alta sensibilidad.

---

## 10. Estabilidad numérica
La estabilidad indica qué tanto crece o se controla el error al avanzar en el tiempo.

En problemas simples, Euler puede funcionar bien. Pero en problemas más delicados, un paso demasiado grande puede producir resultados oscilantes o divergentes aunque la solución exacta sea estable.

Por eso, la elección del paso \(h\) es crucial.

---

## 11. Ventajas y desventajas

### Ventajas
- muy fácil de entender,
- muy fácil de programar,
- útil para introducir métodos numéricos,
- sirve como base para métodos más avanzados.

### Desventajas
- baja precisión comparado con otros métodos,
- puede requerir pasos muy pequeños,
- su estabilidad puede ser pobre,
- no es recomendable para problemas exigentes.

---

## 12. Método de Euler en programación
Euler se adapta muy bien a lenguajes como Python, C++, Java, MATLAB o JavaScript.

### Implementación en Python
```python
def euler_method(f, x0, y0, h, n_steps):
    """
    Aproxima la solución de y' = f(x, y) con el método de Euler.

    Parameters
    ----------
    f : function
        Función f(x, y) de la EDO.
    x0 : float
        Valor inicial de x.
    y0 : float
        Valor inicial de y.
    h : float
        Tamaño del paso.
    n_steps : int
        Número de pasos a calcular.

    Returns
    -------
    list of tuples
        Lista con (x_n, y_n).
    """
    x = x0
    y = y0
    points = [(x, y)]

    for _ in range(n_steps):
        y = y + h * f(x, y)
        x = x + h
        points.append((x, y))

    return points


# Ejemplo de uso
def f(x, y):
    return y - x**2 + 1

result = euler_method(f, x0=0.0, y0=0.5, h=0.2, n_steps=3)

for x, y in result:
    print(f"x = {x:.1f}, y = {y:.6f}")
```

### Qué mostrar en la presentación
- entrada de datos,
- cálculo de la pendiente,
- actualización de \(y\),
- tabla de resultados,
- comparación con la solución exacta si existe.

---

## 13. Ejemplo gráfico para exponer
Puedes mostrar tres curvas en una gráfica:
1. solución exacta,
2. Euler con \(h\) grande,
3. Euler con \(h\) pequeño.

Eso ayuda a ver visualmente cómo mejora la aproximación al disminuir el paso.

---

## 14. Métodos relacionados
Euler es el punto de partida de otros métodos más precisos:

- **Euler mejorado / Heun**
- **Punto medio**
- **Runge-Kutta de orden 4 (RK4)**

Estos métodos conservan la idea de avanzar por pasos, pero usan mejores aproximaciones de la pendiente.

---

## 15. Aplicaciones
El método de Euler y las EDO aparecen en:
- física,
- ingeniería,
- economía,
- biología,
- circuitos eléctricos,
- modelos de crecimiento poblacional,
- dinámica de fluidos,
- sistemas mecánicos.

---

## 16. Estructura sugerida para tu presentación

### Diapositiva 1
Título: EDOs y Método de Euler

### Diapositiva 2
Definición de EDO y problema de valor inicial

### Diapositiva 3
Idea geométrica del método

### Diapositiva 4
Derivación desde Taylor

### Diapositiva 5
Fórmula de recurrencia

### Diapositiva 6
Ejemplo numérico paso a paso

### Diapositiva 7
Código en Python o el lenguaje que uses

### Diapositiva 8
Errores, estabilidad y limitaciones

### Diapositiva 9
Comparación con otros métodos

### Diapositiva 10
Conclusiones

---

## 17. Conclusión
El método de Euler es uno de los algoritmos más importantes para iniciar el estudio de las EDO en Análisis Numérico. Aunque no es el más preciso, su simplicidad lo convierte en una excelente herramienta pedagógica para entender cómo una ecuación diferencial puede resolverse paso a paso en una computadora.

---

## 18. Fuentes consultadas
- LibreTexts: Euler’s Method
- LibreTexts: Euler’s Method for Solving Ordinary Differential Equations
- LibreTexts: The Improved Euler Method and Related Methods
- FNC Book: Initial-value problems for ODEs
- Notas académicas sobre error local, error global y estabilidad numérica

