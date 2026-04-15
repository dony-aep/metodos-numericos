# Interpolación de Lagrange

## 1. Idea general
La interpolación de Lagrange es un método de **interpolación polinómica** que permite construir un polinomio que pasa exactamente por un conjunto de puntos dados:

\[
(x_0, y_0), (x_1, y_1), \dots, (x_n, y_n)
\]

Se usa mucho en **Análisis Numérico** para:
- aproximar funciones a partir de datos discretos,
- reconstruir curvas,
- estimar valores intermedios,
- enseñar conceptos de aproximación polinómica,
- y como base para métodos más avanzados.

La idea es encontrar un polinomio \(P_n(x)\) de grado menor o igual que \(n\) tal que:

\[
P_n(x_i)=y_i, \quad i=0,1,\dots,n
\]

---

## 2. Definición matemática
El polinomio interpolante de Lagrange se escribe como:

\[
P_n(x)=\sum_{k=0}^{n} y_k\,L_k(x)
\]

donde \(L_k(x)\) son las **bases de Lagrange**:

\[
L_k(x)=\prod_{\substack{j=0 \\ j\ne k}}^{n}\frac{x-x_j}{x_k-x_j}
\]

Cada base cumple:

\[
L_k(x_i)=
\begin{cases}
1, & i=k \\
0, & i\ne k
\end{cases}
\]

Por eso el polinomio final cumple exactamente con los datos.

---

## 3. Interpretación intuitiva
Cada \(L_k(x)\) “enciende” el valor \(y_k\) en su punto \(x_k\) y “apaga” a los demás puntos. Al sumar todos los términos, se obtiene una curva única que pasa por todos los nodos.

---

## 4. Existencia y unicidad
Si los valores \(x_0, x_1, \dots, x_n\) son **distintos**, entonces existe un único polinomio de grado a lo sumo \(n\) que interpola esos puntos.

Esto es importante porque garantiza que no hay ambigüedad: con los mismos datos, el polinomio interpolante es único.

---

## 5. Ventajas del método
- Es conceptualmente sencillo.
- No requiere resolver un sistema lineal explícito.
- La forma de Lagrange es muy clara para explicar en clase.
- Funciona bien para un número pequeño o moderado de puntos.
- Es útil para implementar en programación como ejercicio académico.

---

## 6. Desventajas y limitaciones
Aunque es muy útil, no siempre es la mejor opción en la práctica:

- Para muchos puntos, el polinomio puede oscilar demasiado.
- Puede aparecer el **fenómeno de Runge** cuando se usan nodos equiespaciados.
- Evaluar la fórmula directa puede ser costoso si se hace muchas veces.
- En grados altos, la estabilidad numérica puede deteriorarse.

Por eso, en cómputo científico suele preferirse la **forma baricéntrica** o el polinomio de Newton para ciertas implementaciones.

---

## 7. Error de interpolación
Si la función original \(f(x)\) es suficientemente suave, el error de interpolación se expresa como:

\[
f(x)-P_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{j=0}^{n}(x-x_j)
\]

para algún \(\xi\) dentro del intervalo que contiene a los nodos.

### Interpretación del error
El error depende de:
- la derivada de orden \(n+1\) de la función,
- la distribución de los nodos,
- y el punto donde se evalúa.

Si los nodos están mal distribuidos, el error puede crecer bastante.

---

## 8. Forma baricéntrica
Una forma más estable y eficiente para evaluar el polinomio de Lagrange es la **forma baricéntrica**:

\[
P_n(x)=\frac{\sum_{j=0}^{n} \frac{w_j}{x-x_j}y_j}{\sum_{j=0}^{n} \frac{w_j}{x-x_j}}
\]

con pesos:

\[
w_j=\frac{1}{\prod_{\substack{i=0\\i\ne j}}^{n}(x_j-x_i)}
\]

Esta forma es muy importante si piensas llevar el método a un lenguaje de programación.

---

## 9. Algoritmo básico
### Entrada
- Nodos \(x_0, x_1, \dots, x_n\)
- Valores \(y_0, y_1, \dots, y_n\)
- Punto \(x\) donde se quiere evaluar

### Proceso
1. Inicializar \(P_n(x)=0\).
2. Para cada \(k\), calcular la base \(L_k(x)\).
3. Multiplicar por \(y_k\).
4. Sumar todos los términos.
5. Retornar el resultado.

---

## 10. Pseudocódigo
```text
funcion lagrange(x, xs, ys):
    n = longitud(xs)
    resultado = 0

    para k desde 0 hasta n-1:
        base = 1
        para j desde 0 hasta n-1:
            si j != k:
                base = base * (x - xs[j]) / (xs[k] - xs[j])
        resultado = resultado + ys[k] * base

    retornar resultado
```

---

## 11. Implementación en Python
```python
def lagrange_interpolation(x, xs, ys):
    """
    Calcula el polinomio interpolante de Lagrange en el punto x.

    Parameters
    ----------
    x : float
        Punto donde se evalúa el polinomio.
    xs : list or tuple of float
        Nodos de interpolación.
    ys : list or tuple of float
        Valores de la función en los nodos.

    Returns
    -------
    float
        Valor interpolado en x.
    """
    if len(xs) != len(ys):
        raise ValueError("xs y ys deben tener la misma longitud")

    n = len(xs)
    total = 0.0

    for k in range(n):
        lk = 1.0
        for j in range(n):
            if j != k:
                denominator = xs[k] - xs[j]
                if denominator == 0:
                    raise ZeroDivisionError("Hay nodos repetidos en xs")
                lk *= (x - xs[j]) / denominator
        total += ys[k] * lk

    return total


# Ejemplo
xs = [1, 2, 3]
ys = [1, 4, 9]

print(lagrange_interpolation(2.5, xs, ys))
```

---

## 12. Versión en Python con varias evaluaciones
Si quieres graficar el polinomio en muchos puntos:

```python
import numpy as np

def lagrange_values(x_values, xs, ys):
    x_values = np.asarray(x_values, dtype=float)
    xs = np.asarray(xs, dtype=float)
    ys = np.asarray(ys, dtype=float)

    if len(xs) != len(ys):
        raise ValueError("xs y ys deben tener la misma longitud")

    result = np.zeros_like(x_values, dtype=float)
    n = len(xs)

    for k in range(n):
        lk = np.ones_like(x_values, dtype=float)
        for j in range(n):
            if j != k:
                lk *= (x_values - xs[j]) / (xs[k] - xs[j])
        result += ys[k] * lk

    return result
```

---

## 13. Ejemplo manual sencillo
Dados los puntos:

\[
(1,1),\ (2,4),\ (3,9)
\]

La interpolación de Lagrange construye un polinomio que pasa por esos tres puntos. En este caso, el resultado coincide con:

\[
P(x)=x^2
\]

porque los datos pertenecen exactamente a la parábola \(y=x^2\).

Este ejemplo es muy útil para mostrar en clase cómo el método recupera una función conocida.

---

## 14. Qué conviene mostrar en una presentación
Una presentación clara podría tener estas partes:

1. Motivación del problema de interpolación.
2. Definición de interpolación polinómica.
3. Fórmula de Lagrange y bases \(L_k(x)\).
4. Propiedades: existencia y unicidad.
5. Ejemplo numérico paso a paso.
6. Error de interpolación.
7. Problemas numéricos: Runge y estabilidad.
8. Forma baricéntrica.
9. Implementación en Python, Java, C++ o Matlab.
10. Gráfica comparando puntos originales vs. polinomio interpolante.

---

## 15. Recomendación para programarlo
Para una demo en clase, lo más práctico es:
- usar pocos puntos,
- calcular el polinomio en una malla de valores,
- graficar la curva resultante,
- y comparar con los datos originales.

Si el objetivo es eficiencia, usar la **forma baricéntrica**.
Si el objetivo es aprendizaje, usar la **fórmula directa** de Lagrange.

---

## 16. Idea de estructura para exponer
### Inicio
- ¿Qué es interpolar?
- ¿Por qué necesitamos aproximar funciones con datos discretos?

### Desarrollo
- Fórmula de Lagrange.
- Bases de Lagrange.
- Ejemplo con datos concretos.
- Error y limitaciones.

### Cierre
- Comparación con otros métodos.
- Implementación en programación.
- Conclusiones.

---

## 17. Comparación breve con otros métodos
- **Lagrange**: directo y elegante, útil para teoría y ejemplos.
- **Newton**: más conveniente si se agregan nuevos puntos.
- **Forma baricéntrica**: mejor para evaluación numérica estable.

---

## 18. Conclusión
La interpolación de Lagrange es uno de los métodos clásicos más importantes en Análisis Numérico. Permite construir un polinomio que pasa exactamente por un conjunto de puntos y sirve como base para entender la aproximación numérica, el error de interpolación y la estabilidad computacional.

Para una exposición, es ideal porque combina teoría, ejemplo manual y programación.

---

## 19. Fuentes consultadas para estudiar el tema
- NIST Digital Library of Mathematical Functions, sección de interpolación.
- MIT OpenCourseWare, capítulo de interpolación.
- University of Utah, notas de interpolación polinómica.
- University of Toronto, notas de interpolación y forma baricéntrica.
- University of Warwick, notas sobre condicionamiento y fenómenos numéricos.

