# Diferencias divididas de Newton

## 1. Idea general
Las **diferencias divididas de Newton** son una herramienta para construir el polinomio interpolante de un conjunto de puntos cuando los nodos **no tienen por qué estar igualmente espaciados**. El método es muy usado en Análisis Numérico porque permite:

- interpolar datos experimentales o tabulados,
- agregar nuevos puntos sin rehacer todo el polinomio,
- evaluar el polinomio de forma eficiente,
- implementarlo fácilmente en programación.

La forma de Newton es una alternativa a la interpolación de Lagrange, pero suele ser más práctica para cálculo numérico.

---

## 2. Problema de interpolación
Dado un conjunto de datos:

\[
(x_0,f(x_0)), (x_1,f(x_1)), \dots, (x_n,f(x_n))
\]

se busca un polinomio \(P_n(x)\) de grado a lo sumo \(n\) tal que:

\[
P_n(x_i)=f(x_i), \quad i=0,1,\dots,n.
\]

Ese polinomio existe y es único si los nodos \(x_i\) son distintos.

---

## 3. Definición de diferencias divididas
Las diferencias divididas se definen recursivamente.

### Orden 0
\[
f[x_i] = f(x_i)
\]

### Orden 1
\[
f[x_i,x_{i+1}] = \frac{f[x_{i+1}] - f[x_i]}{x_{i+1}-x_i}
= \frac{f(x_{i+1})-f(x_i)}{x_{i+1}-x_i}
\]

### Orden 2
\[
f[x_i,x_{i+1},x_{i+2}] = \frac{f[x_{i+1},x_{i+2}] - f[x_i,x_{i+1}]}{x_{i+2}-x_i}
\]

### Orden general
\[
f[x_i,\dots,x_{i+k}] = \frac{f[x_{i+1},\dots,x_{i+k}] - f[x_i,\dots,x_{i+k-1}]}{x_{i+k}-x_i}
\]

Esta relación permite construir una tabla triangular de forma ordenada.

---

## 4. Polinomio interpolante de Newton
Con las diferencias divididas, el polinomio interpolante toma la forma:

\[
P_n(x)=f[x_0]
+f[x_0,x_1](x-x_0)
+f[x_0,x_1,x_2](x-x_0)(x-x_1)
+\cdots
+f[x_0,\dots,x_n]\prod_{j=0}^{n-1}(x-x_j)
\]

También puede escribirse como:

\[
P_n(x)=\sum_{k=0}^{n} f[x_0,x_1,\dots,x_k]\prod_{j=0}^{k-1}(x-x_j)
\]

con el convenio de que el producto vacío vale 1.

---

## 5. Tabla de diferencias divididas
La forma práctica de calcular los coeficientes es mediante una tabla triangular.

### Estructura
- Primera columna: valores \(f(x_i)\)
- Segunda columna: primeras diferencias divididas
- Tercera columna: segundas diferencias divididas
- Y así sucesivamente

Los coeficientes del polinomio de Newton son exactamente los elementos de la **primera fila** de cada columna.

### Ejemplo de esquema

| \(x_i\) | \(f[x_i]\) | \(f[x_i,x_{i+1}]\) | \(f[x_i,x_{i+1},x_{i+2}]\) |
|---|---:|---:|---:|
| \(x_0\) | \(f(x_0)\) |  |  |
| \(x_1\) | \(f(x_1)\) |  |  |
| \(x_2\) | \(f(x_2)\) |  |  |

En la práctica, la tabla se llena columna por columna.

---

## 6. Propiedades importantes
### 6.1. No exige nodos equidistantes
A diferencia de las fórmulas de interpolación basadas en diferencias finitas, Newton con diferencias divididas funciona con nodos arbitrarios.

### 6.2. Es incremental
Si llega un nuevo punto \((x_{n+1}, f(x_{n+1}))\), no hace falta rehacer todo desde cero: basta agregar una nueva fila/columna a la tabla.

### 6.3. Evalúa rápido
Una vez calculados los coeficientes, el polinomio puede evaluarse con una forma anidada similar a Horner, con costo lineal.

### 6.4. Relación con derivadas
Las diferencias divididas pueden interpretarse como una generalización discreta de derivadas. Cuando los puntos se acercan, se relacionan con derivadas de orden superior.

---

## 7. Error de interpolación
Si \(f\) es suficientemente derivable, el error del polinomio interpolante viene dado por:

\[
E_n(x)=f(x)-P_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{j=0}^{n}(x-x_j)
\]

para algún \(\xi\) que depende de \(x\) y está en el intervalo que contiene a los nodos.

### Consecuencias
- Si \(f\) es un polinomio de grado \(\le n\), el error es cero.
- El error depende tanto de la derivada \(f^{(n+1)}\) como de la distribución de los nodos.
- Elegir nodos muy separados puede producir oscilaciones grandes.

---

## 8. Ventajas frente a Lagrange
### Newton
- más eficiente para agregar nuevos datos,
- más cómodo para programar,
- fácil de evaluar con forma anidada,
- la tabla de coeficientes es reutilizable.

### Lagrange
- útil para la teoría,
- expresión simétrica,
- menos práctico si se quiere actualizar el interpolante.

En aplicaciones numéricas, Newton suele ser preferido cuando el cálculo debe hacerse paso a paso.

---

## 9. Algoritmo paso a paso
1. Ordenar los nodos \(x_0, x_1, \dots, x_n\).
2. Colocar los valores \(f(x_i)\) en la primera columna.
3. Calcular diferencias divididas de orden 1.
4. Repetir para orden 2, 3, ..., n.
5. Tomar el primer valor de cada columna como coeficiente del polinomio.
6. Evaluar con forma anidada.

---

## 10. Pseudocódigo
```text
Entrada: x[0..n], y[0..n]
Salida: coeficientes c[0..n]

c[i] = y[i] para i=0..n
para k = 1 hasta n:
    para j = n hasta k:
        c[j] = (c[j] - c[j-1]) / (x[j] - x[j-k])

# c[0], c[1], ..., c[n] son los coeficientes de Newton
```

### Evaluación anidada
```text
p = c[n]
para k = n-1 hasta 0:
    p = c[k] + (x0_eval - x[k]) * p
retornar p
```

---

## 11. Implementación en Python
```python
from typing import List

def divided_differences(x: List[float], y: List[float]) -> List[float]:
    """Devuelve los coeficientes del polinomio de Newton."""
    if len(x) != len(y):
        raise ValueError("x e y deben tener la misma longitud")
    if len(set(x)) != len(x):
        raise ValueError("Los nodos x deben ser distintos")

    n = len(x)
    c = y.copy()

    for k in range(1, n):
        for j in range(n - 1, k - 1, -1):
            denom = x[j] - x[j - k]
            if denom == 0:
                raise ZeroDivisionError("Se repitió un nodo en la tabla")
            c[j] = (c[j] - c[j - 1]) / denom

    return c


def newton_evaluate(x_nodes: List[float], coeffs: List[float], x_eval: float) -> float:
    """Evalúa el polinomio de Newton usando forma anidada."""
    if len(x_nodes) != len(coeffs):
        raise ValueError("x_nodes y coeffs deben tener la misma longitud")

    p = coeffs[-1]
    for k in range(len(coeffs) - 2, -1, -1):
        p = coeffs[k] + (x_eval - x_nodes[k]) * p
    return p


# Ejemplo de uso
x = [1, 2, 4]
y = [1, 4, 16]
coeffs = divided_differences(x, y)
print(coeffs)          # coeficientes de Newton
print(newton_evaluate(x, coeffs, 3))
```

---

## 12. Ejemplo manual corto
Supongamos los puntos:

\[
(1,1),\ (2,4),\ (4,16)
\]

### Primera columna
\[
f[x_0]=1,\quad f[x_1]=4,\quad f[x_2]=16
\]

### Primera diferencia dividida
\[
f[x_0,x_1]=\frac{4-1}{2-1}=3
\]
\[
f[x_1,x_2]=\frac{16-4}{4-2}=6
\]

### Segunda diferencia dividida
\[
f[x_0,x_1,x_2]=\frac{6-3}{4-1}=1
\]

### Polinomio
\[
P_2(x)=1+3(x-1)+1(x-1)(x-2)
\]

Al simplificar:

\[
P_2(x)=x^2
\]

que coincide con los datos.

---

## 13. Cómo exponerlo en una presentación
Una buena estructura de exposición puede ser:

1. Definición de interpolación.
2. Problema que resuelve el método.
3. Definición de diferencias divididas.
4. Construcción de la tabla.
5. Fórmula del polinomio de Newton.
6. Error de interpolación.
7. Ventajas y desventajas.
8. Ejemplo manual.
9. Implementación en código.
10. Conclusiones.

---

## 14. Ideas para mostrarlo en programación
Puedes mostrar el método de varias maneras:

### Opción A: Mostrar la tabla
- Ingresas los puntos.
- El programa genera la tabla de diferencias divididas.
- Se resaltan los coeficientes.

### Opción B: Evaluar en un punto
- Se pide un valor \(x\).
- El programa calcula \(P_n(x)\).
- Se compara con el valor real si existe.

### Opción C: Graficar
- Graficar los puntos originales.
- Graficar el polinomio interpolante.
- Comparar ambas curvas.

---

## 15. Errores comunes
- Usar nodos repetidos sin tratar interpolación de Hermite.
- Confundir diferencias divididas con diferencias finitas.
- Olvidar que el orden de los nodos afecta la forma del polinomio, aunque no el polinomio final.
- Evaluar el polinomio escribiéndolo expandido en potencias, cuando la forma de Newton es más estable y práctica.

---

## 16. Resumen final
Las diferencias divididas de Newton son una forma eficiente y elegante de construir polinomios interpolantes. Su mayor ventaja es que permiten trabajar con nodos no uniformes y que facilitan tanto la actualización del modelo como su implementación en programación. En Análisis Numérico, este método es una base importante para interpolación, aproximación y cómputo científico.

---

## 17. Fuentes recomendadas para estudiar
- Notas de análisis numérico sobre interpolación de Newton.
- Material universitario sobre diferencias divididas.
- Sección de interpolación de textos de métodos numéricos.
- Apuntes con tablas de diferencias divididas y evaluación con forma de Horner.

