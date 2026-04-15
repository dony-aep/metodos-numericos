# Interpolación polinómica

## 1. Idea general
La **interpolación polinómica** busca construir un polinomio que pase exactamente por un conjunto de puntos conocidos
\((x_0,y_0), (x_1,y_1), \dots, (x_n,y_n)\).

En Análisis Numérico se usa para aproximar una función cuando solo se conocen ciertos valores o mediciones. La idea es reemplazar la función original por un polinomio más fácil de evaluar, analizar y programar.

### ¿Para qué sirve?
- Estimar valores intermedios entre datos conocidos.
- Modelar curvas a partir de mediciones.
- Crear algoritmos de aproximación.
- Preparar datos para simulación, gráficos y control numérico.

---

## 2. Definición matemática
Dados \(n+1\) puntos con abscisas distintas \(x_0, x_1, \dots, x_n\), existe un único polinomio \(P_n(x)\) de grado a lo sumo \(n\) que satisface:

\[
P_n(x_i)=y_i, \quad i=0,1,\dots,n
\]

Este polinomio se llama **polinomio interpolante**.

---

## 3. Formas principales de interpolación polinómica

### 3.1 Forma de Lagrange
El polinomio se escribe como:

\[
P_n(x)=\sum_{i=0}^{n} y_i L_i(x)
\]

con

\[
L_i(x)=\prod_{j=0, j\neq i}^{n} \frac{x-x_j}{x_i-x_j}
\]

Cada base \(L_i(x)\) vale 1 en \(x_i\) y 0 en los demás nodos.

**Ventaja:** es clara y directa.

**Desventaja:** si agregas un nuevo dato, normalmente debes recalcular todo.

---

### 3.2 Forma de Newton
Se escribe como:

\[
P_n(x)=f[x_0] + f[x_0,x_1](x-x_0) + f[x_0,x_1,x_2](x-x_0)(x-x_1) + \cdots
\]

usando **diferencias divididas**.

Esta forma es muy útil porque permite agregar nuevos puntos sin rehacer todo desde cero.

#### Diferencias divididas
Se definen recursivamente así:

\[
f[x_i]=y_i
\]

\[
f[x_i,\dots,x_j]=\frac{f[x_{i+1},\dots,x_j]-f[x_i,\dots,x_{j-1}]}{x_j-x_i}
\]

---

## 4. Propiedad de unicidad
Si los nodos \(x_i\) son distintos, el polinomio interpolante de grado menor o igual que \(n\) es **único**. Esto significa que, con los mismos datos, no hay dos polinomios distintos de grado \(\le n\) que pasen por todos los puntos.

---

## 5. Error de interpolación
La interpolación no solo busca construir el polinomio, también interesa saber qué tan bien aproxima a la función real.

Si \(f\) es la función original y \(P_n\) el interpolante, el error en un punto \(x\) es:

\[
E_n(x)=f(x)-P_n(x)
\]

Si \(f\) tiene derivada \(n+1\) continua, entonces el error puede expresarse como:

\[
f(x)-P_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{i=0}^{n}(x-x_i)
\]

para algún \(\xi\) dentro del intervalo que contiene a los nodos.

### Qué implica esta fórmula
- El error depende de la suavidad de la función.
- También depende de cómo estén distribuidos los nodos.
- Si los puntos están mal elegidos, el error puede crecer bastante.

---

## 6. Problema del fenómeno de Runge
Cuando se usa un polinomio de grado alto con nodos equidistantes, pueden aparecer oscilaciones grandes cerca de los extremos del intervalo. Esto se conoce como **fenómeno de Runge**.

### Consecuencia práctica
Aunque el polinomio pase por todos los puntos, puede aproximar muy mal la función entre ellos.

### Forma de evitarlo
- Usar menos grado.
- Usar nodos de Chebyshev.
- Usar interpolación por tramos, como splines.

---

## 7. Interpolación por tramos y splines
En lugar de usar un solo polinomio de grado alto, se puede dividir el intervalo en partes y usar polinomios pequeños en cada tramo.

Los **splines cúbicos** son una opción muy popular porque producen curvas suaves y reducen oscilaciones. En la práctica computacional moderna, suelen ser más estables que un único polinomio global de grado alto.

---

## 8. Método de trabajo paso a paso

### Con Lagrange
1. Tomar los datos \((x_i,y_i)\).
2. Construir cada base \(L_i(x)\).
3. Multiplicar cada base por \(y_i\).
4. Sumar todos los términos.

### Con Newton
1. Ordenar los puntos.
2. Construir la tabla de diferencias divididas.
3. Tomar la diagonal principal como coeficientes.
4. Escribir el polinomio en forma de Newton.

---

## 9. Algoritmo de diferencias divididas
Si tienes los puntos \(x_0, x_1, \dots, x_n\) y valores \(y_0, y_1, \dots, y_n\), la tabla se calcula así:

- Columna 0: valores de la función.
- Columna 1: diferencias divididas de primer orden.
- Columna 2: diferencias divididas de segundo orden.
- Y así sucesivamente.

La diagonal de la tabla contiene los coeficientes del polinomio de Newton.

---

## 10. Pseudocódigo para programarlo

### 10.1 Newton por diferencias divididas
```text
Entrada: arreglos x[0..n], y[0..n]
Crear tabla dd[0..n][0..n]
Para i = 0 hasta n:
    dd[i][0] = y[i]

Para j = 1 hasta n:
    Para i = 0 hasta n-j:
        dd[i][j] = (dd[i+1][j-1] - dd[i][j-1]) / (x[i+j] - x[i])

Coeficientes = dd[0][0], dd[0][1], ..., dd[0][n]
```

### 10.2 Evaluación del polinomio de Newton
```text
Entrada: x_eval, x[0..n], coef[0..n]
Resultado = coef[n]
Para i = n-1 hasta 0:
    Resultado = Resultado * (x_eval - x[i]) + coef[i]
Retornar Resultado
```

---

## 11. Implementación en Python

```python
from typing import List


def divided_differences(x: List[float], y: List[float]) -> List[float]:
    """Devuelve los coeficientes del polinomio de Newton."""
    n = len(x)
    if n != len(y):
        raise ValueError("x e y deben tener la misma longitud")
    if len(set(x)) != n:
        raise ValueError("Los valores de x deben ser distintos")

    coef = y.copy()
    for j in range(1, n):
        for i in range(n - 1, j - 1, -1):
            coef[i] = (coef[i] - coef[i - 1]) / (x[i] - x[i - j])
    return coef


def newton_evaluate(x_data: List[float], coef: List[float], x_value: float) -> float:
    """Evalúa el polinomio de Newton por el método de Horner."""
    result = coef[-1]
    for i in range(len(coef) - 2, -1, -1):
        result = result * (x_value - x_data[i]) + coef[i]
    return result


# Ejemplo
x = [1, 2, 4]
y = [1, 4, 16]
coef = divided_differences(x, y)
print("Coeficientes:", coef)
print("P(3) =", newton_evaluate(x, coef, 3))
```

---

## 12. Implementación en JavaScript

```javascript
function dividedDifferences(x, y) {
  if (x.length !== y.length) {
    throw new Error("x y y deben tener la misma longitud");
  }
  const uniqueX = new Set(x);
  if (uniqueX.size !== x.length) {
    throw new Error("Los valores de x deben ser distintos");
  }

  const coef = y.slice();
  for (let j = 1; j < x.length; j++) {
    for (let i = x.length - 1; i >= j; i--) {
      coef[i] = (coef[i] - coef[i - 1]) / (x[i] - x[i - j]);
    }
  }
  return coef;
}

function newtonEvaluate(xData, coef, xValue) {
  let result = coef[coef.length - 1];
  for (let i = coef.length - 2; i >= 0; i--) {
    result = result * (xValue - xData[i]) + coef[i];
  }
  return result;
}

const x = [1, 2, 4];
const y = [1, 4, 16];
const coef = dividedDifferences(x, y);
console.log("Coeficientes:", coef);
console.log("P(3) =", newtonEvaluate(x, coef, 3));
```

---

## 13. Comparación rápida entre métodos

### Lagrange
- Fácil de entender.
- Poco conveniente para actualizar datos.

### Newton
- Muy útil para programación.
- Permite agregar datos con más facilidad.
- Suele ser mejor para cálculos numéricos.

### Splines
- Recomendados cuando hay muchos datos.
- Más estables que un polinomio global de grado alto.

---

## 14. Aplicaciones
- Aproximación de funciones experimentales.
- Ingeniería y física.
- Gráficas computacionales.
- Procesamiento de señales.
- Modelado de trayectorias.
- Métodos numéricos para integración y diferenciación aproximada.

---

## 15. Ideas para tu presentación
Puedes organizarla así:

1. Definición del problema.
2. Ejemplo gráfico con pocos puntos.
3. Método de Lagrange.
4. Método de Newton.
5. Diferencias divididas.
6. Error de interpolación.
7. Fenómeno de Runge.
8. Comparación con splines.
9. Demo en Python o JavaScript.
10. Conclusiones.

---

## 16. Conclusiones
La interpolación polinómica es una herramienta fundamental en Análisis Numérico para reconstruir o aproximar funciones a partir de datos discretos. Sus dos formas más importantes son Lagrange y Newton. Newton suele ser más práctico para programación porque usa diferencias divididas y permite actualizar el polinomio con mayor facilidad. Sin embargo, al aumentar demasiado el grado, pueden aparecer oscilaciones y errores grandes, por lo que en muchos problemas reales conviene usar polinomios por tramos o splines.

---

## 17. Referencias sugeridas para citar en tu trabajo
- Notas de interpolación polinómica de UBC sobre bases de Lagrange, Newton, diferencias divididas y análisis del error.
- Notas de SDSU sobre interpolación e introducción a diferencias divididas y polinomios de Hermite.
- Notas de UBC sobre el fenómeno de Runge y la interpolación por tramos.
- Documentación de SciPy sobre interpolación y splines cúbicos.

