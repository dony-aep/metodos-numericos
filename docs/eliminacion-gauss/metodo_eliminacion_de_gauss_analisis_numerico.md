# Método de eliminación de Gauss

## 1. Idea general
El método de eliminación de Gauss es un método directo para resolver sistemas de ecuaciones lineales de la forma

\[
A\mathbf{x}=\mathbf{b}
\]

Su objetivo es transformar el sistema original en otro equivalente, pero más fácil de resolver, mediante operaciones elementales por filas. En la práctica, el proceso lleva la matriz a una forma triangular superior y luego se resuelve por sustitución hacia atrás.

## 2. ¿Por qué es importante?

Este método es uno de los pilares del Álgebra Lineal Numérica porque:

- resuelve sistemas lineales de manera sistemática,
- sirve como base para LU,
- permite implementar algoritmos eficientes en software,
- aparece en ciencias, ingeniería, economía, optimización, simulación y modelado.

## 3. Forma general del sistema

Un sistema de \(n\) ecuaciones con \(n\) incógnitas se escribe como:

\[
\begin{aligned}
 a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n &= b_1 \\
 a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n &= b_2 \\
 &\vdots \\
 a_{n1}x_1 + a_{n2}x_2 + \cdots + a_{nn}x_n &= b_n
\end{aligned}
\]

Se representa en forma matricial como:

\[
A\mathbf{x}=\mathbf{b}
\]

## 4. Idea del procedimiento

El método tiene dos etapas:

### 4.1 Eliminación hacia adelante
Se eliminan, una por una, las incógnitas de las ecuaciones inferiores hasta obtener una matriz triangular superior.

### 4.2 Sustitución hacia atrás
Cuando la matriz ya es triangular, se resuelve la última incógnita y luego se sustituyen los valores hacia arriba.

## 5. Operaciones elementales por filas

El método usa tres operaciones básicas:

1. Intercambiar dos filas.
2. Multiplicar una fila por un número distinto de cero.
3. Sumar a una fila un múltiplo de otra fila.

Estas operaciones no cambian el conjunto de soluciones del sistema.

## 6. Algoritmo clásico

Para el pivote de la columna \(k\):

1. Se toma el elemento diagonal \(a_{kk}\) como pivote.
2. Se eliminan los elementos debajo del pivote.
3. Se actualizan las filas restantes.
4. Al finalizar, se obtiene una matriz triangular superior.

## 7. Pivoteo parcial

En problemas reales, el pivote puede ser cero o muy pequeño. Eso puede provocar:

- división por cero,
- errores de redondeo,
- pérdida de precisión numérica.

Por eso se usa el **pivoteo parcial**, que consiste en intercambiar filas para colocar en la posición pivote el elemento de mayor valor absoluto de la columna actual.

## 8. Forma matricial y LU

La eliminación de Gauss está estrechamente relacionada con la factorización:

\[
P A = L U
\]

Donde:

- \(P\) es una matriz de permutación,
- \(L\) es triangular inferior,
- \(U\) es triangular superior.

Esto es muy útil porque, una vez factorizada \(A\), resolver nuevos sistemas con la misma matriz es mucho más rápido.

## 9. Complejidad computacional

La eliminación de Gauss para una matriz densa \(n \times n\) tiene complejidad aproximada:

\[
O(n^3)
\]

La sustitución hacia adelante y hacia atrás cuesta aproximadamente \(O(n^2)\), por lo que la parte dominante es la eliminación.

## 10. Ventajas

- Método directo y sistemático.
- Muy usado en ingeniería y ciencia.
- Sirve como base para LU.
- Fácil de programar para matrices pequeñas y medianas.

## 11. Desventajas

- Puede ser costoso para matrices grandes.
- Sin pivoteo puede ser inestable numéricamente.
- En matrices dispersas, una implementación ingenua puede desperdiciar memoria y tiempo.

## 12. Ejemplo pequeño

Sistema:

\[
\begin{aligned}
2x + y - z &= 8 \\
-3x - y + 2z &= -11 \\
-2x + y + 2z &= -3
\end{aligned}
\]

Matriz aumentada:

\[
\left[
\begin{array}{ccc|c}
2 & 1 & -1 & 8 \\
-3 & -1 & 2 & -11 \\
-2 & 1 & 2 & -3
\end{array}
\right]
\]

Después de la eliminación se obtiene una matriz triangular superior y luego se resuelve por sustitución hacia atrás, obteniendo:

\[
x=2,\quad y=3,\quad z=-1
\]

## 13. Pseudocódigo

```text
para k = 1 hasta n-1
    buscar pivote en la columna k
    si es necesario, intercambiar filas
    para i = k+1 hasta n
        m = A[i,k] / A[k,k]
        para j = k hasta n
            A[i,j] = A[i,j] - m * A[k,j]
        b[i] = b[i] - m * b[k]
    fin para
fin para

resolver Ux = b por sustitución hacia atrás
```

## 14. Implementación en Python

```python
def gauss_elimination(A, b):
    n = len(A)
    A = [row[:] for row in A]
    b = b[:]

    # Eliminación hacia adelante con pivoteo parcial
    for k in range(n - 1):
        pivot = max(range(k, n), key=lambda i: abs(A[i][k]))
        if abs(A[pivot][k]) == 0:
            raise ValueError("La matriz es singular o casi singular")
        if pivot != k:
            A[k], A[pivot] = A[pivot], A[k]
            b[k], b[pivot] = b[pivot], b[k]

        for i in range(k + 1, n):
            m = A[i][k] / A[k][k]
            A[i][k] = 0.0
            for j in range(k + 1, n):
                A[i][j] -= m * A[k][j]
            b[i] -= m * b[k]

    # Sustitución hacia atrás
    x = [0.0] * n
    for i in range(n - 1, -1, -1):
        s = sum(A[i][j] * x[j] for j in range(i + 1, n))
        x[i] = (b[i] - s) / A[i][i]
    return x

# Ejemplo de uso
A = [
    [2, 1, -1],
    [-3, -1, 2],
    [-2, 1, 2]
]
b = [8, -11, -3]

print(gauss_elimination(A, b))
```

## 15. Explicación de la implementación

- Se copia la matriz para no modificar la original.
- Se usa pivoteo parcial para mejorar estabilidad.
- En cada paso se elimina la entrada debajo del pivote.
- Al final se hace sustitución hacia atrás.

## 16. Idea para tu presentación

Puedes organizarla así:

1. Definición del problema \(A\mathbf{x}=\mathbf{b}\).
2. Qué hace la eliminación de Gauss.
3. Operaciones elementales por filas.
4. Ejemplo manual paso a paso.
5. Pivoteo parcial y estabilidad numérica.
6. Complejidad \(O(n^3)\).
7. Relación con LU.
8. Código en Python, Java, C++ o MATLAB.
9. Demostración con un sistema real.
10. Conclusiones.

## 17. Ideas para mostrarlo en programación

Puedes mostrar:

- la matriz aumentada antes y después de cada paso,
- el valor del pivote en cada iteración,
- el multiplicador usado para eliminar cada fila,
- el estado de la matriz triangular al final,
- el proceso de sustitución hacia atrás,
- comparación entre usar pivoteo y no usar pivoteo.

## 18. Posibles conclusiones

- La eliminación de Gauss es uno de los métodos más importantes para resolver sistemas lineales.
- Su versión con pivoteo parcial es la más útil en cálculo numérico práctico.
- Es una base fundamental para métodos más avanzados como LU y para implementaciones en software científico.

## 19. Temas relacionados para ampliar

- Método de Gauss-Jordan
- Factorización LU
- Pivoteo total y parcial
- Condicionamiento numérico
- Error de redondeo
- Matrices dispersas
- Métodos iterativos: Jacobi y Gauss-Seidel

## 20. Fuentes recomendadas para estudiar

- Notas de álgebra lineal numérica de MIT OCW.
- Material de Mathematics LibreTexts sobre eliminación de Gauss y pivoteo parcial.
- Notas de Berkeley sobre factorización LU y pivoteo.

---

Si necesitas convertir esto en diapositivas, también se puede reorganizar en formato de presentación de 8 a 12 slides.

