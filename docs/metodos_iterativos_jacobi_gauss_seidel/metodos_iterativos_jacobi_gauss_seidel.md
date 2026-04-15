# Métodos iterativos: Jacobi y Gauss-Seidel

## 1. Introducción
Los métodos iterativos son técnicas numéricas usadas para resolver sistemas de ecuaciones lineales de la forma:

\[
Ax=b
\]

En lugar de obtener la solución exacta en un solo paso, estos métodos generan una sucesión de aproximaciones que, bajo ciertas condiciones, converge a la solución del sistema.

Son muy útiles cuando:
- el sistema es grande,
- la matriz es dispersa,
- se busca una implementación computacional eficiente,
- o se necesita una solución aproximada con un error controlado.

---

## 2. Idea general de los métodos iterativos
Se parte de un vector inicial \(x^{(0)}\) y se construyen aproximaciones sucesivas:

\[
x^{(0)}, x^{(1)}, x^{(2)}, \dots
\]

Cada nueva aproximación se obtiene usando una regla de actualización que depende de la matriz \(A\), del vector \(b\) y de la iteración anterior.

La calidad del método depende de:
- la matriz de coeficientes,
- la condición de convergencia,
- la tolerancia elegida,
- y el valor inicial.

---

## 3. Descomposición de la matriz
Para entender Jacobi y Gauss-Seidel, se suele escribir la matriz \(A\) como:

\[
A = D - L - U
\]

donde:
- \(D\): matriz diagonal,
- \(L\): parte triangular inferior,
- \(U\): parte triangular superior.

---

## 4. Método de Jacobi
### 4.1 Fórmula matricial
El método de Jacobi se escribe como:

\[
x^{(k+1)} = D^{-1}(L+U)x^{(k)} + D^{-1}b
\]

### 4.2 Fórmula componente a componente
Para cada ecuación:

\[
x_i^{(k+1)} = \frac{1}{a_{ii}}\left(b_i - \sum_{j \neq i} a_{ij}x_j^{(k)}\right)
\]

### 4.3 Idea del método
En Jacobi, todos los valores de la nueva iteración se calculan usando únicamente los valores de la iteración anterior. No se reutilizan valores recién calculados dentro del mismo ciclo.

### 4.4 Ventajas
- Fácil de entender e implementar.
- Muy útil para paralelización.
- Conceptualmente simple.

### 4.5 Desventajas
- Puede converger lentamente.
- No siempre converge.
- Requiere buenas condiciones en la matriz.

---

## 5. Método de Gauss-Seidel
### 5.1 Fórmula matricial
El método de Gauss-Seidel se expresa como:

\[
x^{(k+1)} = (D-L)^{-1}Ux^{(k)} + (D-L)^{-1}b
\]

### 5.2 Fórmula componente a componente

\[
x_i^{(k+1)} = \frac{1}{a_{ii}}\left(b_i - \sum_{j=1}^{i-1} a_{ij}x_j^{(k+1)} - \sum_{j=i+1}^{n} a_{ij}x_j^{(k)}\right)
\]

### 5.3 Idea del método
A diferencia de Jacobi, Gauss-Seidel usa inmediatamente los valores nuevos a medida que se van calculando dentro de la misma iteración.

### 5.4 Ventajas
- Suele converger más rápido que Jacobi.
- Menor número de iteraciones en muchos casos.
- Muy usado en práctica.

### 5.5 Desventajas
- Menos fácil de paralelizar.
- También puede fallar si la matriz no cumple condiciones adecuadas.

---

## 6. Diferencia entre Jacobi y Gauss-Seidel
| Característica | Jacobi | Gauss-Seidel |
|---|---|---|
| Uso de valores nuevos | No | Sí |
| Velocidad de convergencia | Más lenta | Generalmente más rápida |
| Facilidad de programación | Muy alta | Alta |
| Paralelización | Mejor | Más difícil |
| Iteraciones necesarias | Suele requerir más | Suele requerir menos |

---

## 7. Condiciones de convergencia
Estos métodos no siempre convergen. Algunas condiciones importantes son:

### 7.1 Dominancia diagonal estricta
La matriz \(A\) converge bien si cumple:

\[
|a_{ii}| > \sum_{j \neq i} |a_{ij}|
\]

para cada fila.

### 7.2 Radio espectral
Otra condición general es que el radio espectral de la matriz de iteración sea menor que 1.

### 7.3 Comentario importante
Gauss-Seidel suele tener mejor comportamiento de convergencia que Jacobi, aunque esto depende del problema.

---

## 8. Criterios de parada
La iteración puede detenerse cuando:

\[
\|x^{(k+1)} - x^{(k)}\| < \varepsilon
\]

o cuando el residuo

\[
r = b - Ax^{(k)}
\]

es suficientemente pequeño.

También se puede usar un número máximo de iteraciones para evitar bucles infinitos.

---

## 9. Ejemplo numérico
Considera el sistema:

\[
10x_1 - x_2 + 2x_3 = 6
\]
\[
-x_1 + 11x_2 - x_3 + 3x_4 = 25
\]
\[
2x_1 - x_2 + 10x_3 - x_4 = -11
\]
\[
3x_2 - x_3 + 8x_4 = 15
\]

### 9.1 Forma matricial

\[
A =
\begin{bmatrix}
10 & -1 & 2 & 0 \\
-1 & 11 & -1 & 3 \\
2 & -1 & 10 & -1 \\
0 & 3 & -1 & 8
\end{bmatrix},
\quad
b =
\begin{bmatrix}
6 \\
25 \\
-11 \\
15
\end{bmatrix}
\]

Este sistema es adecuado para probar ambos métodos porque la matriz es diagonalmente dominante.

---

## 10. Algoritmo de Jacobi
1. Elegir un vector inicial \(x^{(0)}\).
2. Calcular cada componente de \(x^{(k+1)}\) usando solo valores de \(x^{(k)}\).
3. Verificar el error o residuo.
4. Repetir hasta cumplir el criterio de parada.

---

## 11. Algoritmo de Gauss-Seidel
1. Elegir un vector inicial \(x^{(0)}\).
2. Calcular cada componente usando inmediatamente los valores nuevos disponibles.
3. Verificar el error o residuo.
4. Repetir hasta cumplir el criterio de parada.

---

## 12. Pseudocódigo
### 12.1 Jacobi
```text
Entrada: A, b, x0, tolerancia, max_iter
x <- x0
para k = 1 hasta max_iter hacer
    x_nuevo <- vector vacío
    para i = 1 hasta n hacer
        suma <- 0
        para j = 1 hasta n hacer
            si j != i entonces
                suma <- suma + a_ij * x[j]
        x_nuevo[i] <- (b[i] - suma) / a_ii
    fin para

    si norma(x_nuevo - x) < tolerancia entonces
        salir
    fin si

    x <- x_nuevo
fin para
Salida: x
```

### 12.2 Gauss-Seidel
```text
Entrada: A, b, x0, tolerancia, max_iter
x <- x0
para k = 1 hasta max_iter hacer
    x_anterior <- x
    para i = 1 hasta n hacer
        suma1 <- 0
        suma2 <- 0
        para j = 1 hasta i-1 hacer
            suma1 <- suma1 + a_ij * x[j]
        para j = i+1 hasta n hacer
            suma2 <- suma2 + a_ij * x_anterior[j]
        x[i] <- (b[i] - suma1 - suma2) / a_ii
    fin para

    si norma(x - x_anterior) < tolerancia entonces
        salir
    fin si
fin para
Salida: x
```

---

## 13. Implementación en Python
```python
import numpy as np

def jacobi(A, b, x0=None, tol=1e-8, max_iter=100):
    A = np.array(A, dtype=float)
    b = np.array(b, dtype=float)
    n = len(b)

    if x0 is None:
        x = np.zeros(n)
    else:
        x = np.array(x0, dtype=float)

    D = np.diag(A)
    R = A - np.diagflat(D)

    for k in range(max_iter):
        x_new = (b - np.dot(R, x)) / D
        if np.linalg.norm(x_new - x, ord=np.inf) < tol:
            return x_new, k + 1
        x = x_new

    return x, max_iter


def gauss_seidel(A, b, x0=None, tol=1e-8, max_iter=100):
    A = np.array(A, dtype=float)
    b = np.array(b, dtype=float)
    n = len(b)

    if x0 is None:
        x = np.zeros(n)
    else:
        x = np.array(x0, dtype=float)

    for k in range(max_iter):
        x_old = x.copy()
        for i in range(n):
            s1 = np.dot(A[i, :i], x[:i])
            s2 = np.dot(A[i, i+1:], x_old[i+1:])
            x[i] = (b[i] - s1 - s2) / A[i, i]

        if np.linalg.norm(x - x_old, ord=np.inf) < tol:
            return x, k + 1

    return x, max_iter


A = [[10, -1, 2, 0],
     [-1, 11, -1, 3],
     [2, -1, 10, -1],
     [0, 3, -1, 8]]

b = [6, 25, -11, 15]

x_j, it_j = jacobi(A, b)
x_g, it_g = gauss_seidel(A, b)

print("Jacobi:", x_j, "Iteraciones:", it_j)
print("Gauss-Seidel:", x_g, "Iteraciones:", it_g)
```

---

## 14. Cómo explicarlo en clase
Puedes explicar el tema así:
- Primero presentas el problema general \(Ax=b\).
- Luego explicas que los métodos directos resuelven de una vez y los iterativos aproximan por etapas.
- Después muestras Jacobi como el método más simple.
- Luego comparas con Gauss-Seidel, que reutiliza los valores nuevos.
- Finalmente presentas el código y un ejemplo numérico.

---

## 15. Conclusión
Los métodos iterativos de Jacobi y Gauss-Seidel son herramientas fundamentales en análisis numérico para resolver sistemas lineales. Jacobi destaca por su sencillez, mientras que Gauss-Seidel suele ser más rápido en convergencia. Ambos son especialmente útiles en problemas grandes y en programación científica.

---

## 16. Posibles ideas para ampliar la presentación
- Método SOR como mejora de Gauss-Seidel.
- Comparación entre métodos directos e iterativos.
- Gráficas de error por iteración.
- Ejecución del código con diferentes tolerancias.
- Aplicaciones en ingeniería y ciencias.

