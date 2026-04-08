# Sistemas de Ecuaciones Lineales

## 1. Definición
Un sistema de ecuaciones lineales es un conjunto de ecuaciones donde las incógnitas aparecen de forma lineal. Se puede representar como:

Ax = b

donde:
- A: matriz de coeficientes
- x: vector de incógnitas
- b: vector de términos independientes

---

## 2. Clasificación de sistemas

- Sistema cuadrado: mismo número de ecuaciones e incógnitas
- Sistema sobredeterminado: más ecuaciones que incógnitas
- Sistema subdeterminado: más incógnitas que ecuaciones

---

## 3. Métodos de solución

### 3.1 Métodos directos

#### Eliminación Gaussiana
Transforma la matriz en forma triangular y luego se resuelve por sustitución hacia atrás.

#### Factorización LU
Descompone la matriz como:

A = LU

Permite resolver varios sistemas con la misma matriz de forma eficiente.

#### Factorización QR
A = QR

Útil en problemas de mínimos cuadrados.

---

### 3.2 Métodos iterativos

#### Método de Jacobi
Usa valores de la iteración anterior para calcular la siguiente.

#### Método de Gauss-Seidel
Usa valores recién calculados dentro de la misma iteración.

#### Método SOR
Introduce un factor de relajación para acelerar la convergencia.

#### Gradiente Conjugado
Especial para matrices simétricas definidas positivas.

---

## 4. Convergencia

- Jacobi y Gauss-Seidel convergen si la matriz es diagonal dominante
- Gauss-Seidel converge si la matriz es simétrica definida positiva

---

## 5. Mínimos cuadrados

Se utiliza cuando el sistema no tiene solución exacta:

min ||Ax - b||

---

## 6. Condicionamiento

El número de condición mide la sensibilidad del sistema a errores.

- Matriz bien condicionada: solución estable
- Matriz mal condicionada: errores grandes

---

## 7. Implementación en Python

```python
import numpy as np
from scipy.linalg import lu_factor, lu_solve
from scipy.sparse.linalg import cg

A = np.array([
    [4.0, 1.0, 2.0],
    [1.0, 3.0, 0.0],
    [2.0, 0.0, 5.0]
])
b = np.array([7.0, 8.0, 9.0])

# Solución directa
x_directa = np.linalg.solve(A, b)

# LU
lu, piv = lu_factor(A)
x_lu = lu_solve((lu, piv), b)

# Gradiente conjugado
x_cg, info = cg(A, b)

print(x_directa)
print(x_lu)
print(x_cg)
```

---

## 8. Estructura para presentación

1. Definición
2. Forma matricial
3. Clasificación
4. Métodos directos
5. Métodos iterativos
6. Convergencia
7. Mínimos cuadrados
8. Implementación en código

---

## 9. Ideas para exposición

- Mostrar un ejemplo paso a paso de eliminación gaussiana
- Comparar Jacobi vs Gauss-Seidel
- Ejecutar código en vivo
- Explicar cuándo usar cada método

---

## 10. Conclusión

Los sistemas de ecuaciones lineales son fundamentales en análisis numérico y aparecen en múltiples aplicaciones como ingeniería, física, economía y computación científica.

