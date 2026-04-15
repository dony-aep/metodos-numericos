# Ajuste por mínimos cuadrados

## 1. Idea general
El **ajuste por mínimos cuadrados** es un método numérico y estadístico que busca la curva o función que mejor representa un conjunto de datos observados, minimizando la suma de los cuadrados de los errores o residuos.

En términos simples, si tienes puntos experimentales \((x_i, y_i)\), el método intenta encontrar un modelo \(f(x)\) tal que la diferencia entre los valores reales y los estimados sea lo más pequeña posible en promedio.

Se usa mucho en:
- regresión lineal,
- ajuste de polinomios,
- calibración de instrumentos,
- modelado de datos experimentales,
- predicción y análisis de tendencias.

---

## 2. Definición matemática
Sea un conjunto de datos \((x_1,y_1), (x_2,y_2), \dots, (x_n,y_n)\). Si el modelo propuesto es \(y \approx f(x,\theta)\), donde \(\theta\) representa los parámetros desconocidos, entonces el residuo de cada dato es:

\[
 e_i = y_i - f(x_i,\theta)
\]

El método de mínimos cuadrados minimiza la función:

\[
S(\theta) = \sum_{i=1}^{n} e_i^2 = \sum_{i=1}^{n}\left(y_i - f(x_i,\theta)\right)^2
\]

La razón de usar cuadrados es que:
- evita cancelaciones entre errores positivos y negativos,
- penaliza más los errores grandes,
- produce una función diferenciable, útil para hallar mínimos con cálculo.

---

## 3. Caso más conocido: ajuste lineal
El modelo lineal más simple es:

\[
y = a + bx
\]

Aquí:
- \(a\) es la ordenada al origen,
- \(b\) es la pendiente.

### 3.1. Función de error
\[
S(a,b) = \sum_{i=1}^{n} \left(y_i - (a + bx_i)\right)^2
\]

### 3.2. Condición de mínimo
Para minimizar, derivamos respecto a \(a\) y \(b\):

\[
\frac{\partial S}{\partial a} = -2\sum_{i=1}^{n}\left(y_i - a - bx_i\right)=0
\]

\[
\frac{\partial S}{\partial b} = -2\sum_{i=1}^{n}x_i\left(y_i - a - bx_i\right)=0
\]

Esto lleva a las **ecuaciones normales**:

\[
na + b\sum x_i = \sum y_i
\]

\[
a\sum x_i + b\sum x_i^2 = \sum x_i y_i
\]

Si despejas, obtienes:

\[
b = \frac{n\sum x_i y_i - (\sum x_i)(\sum y_i)}{n\sum x_i^2 - (\sum x_i)^2}
\]

\[
a = \frac{\sum y_i - b\sum x_i}{n}
\]

---

## 4. Interpretación geométrica
El ajuste por mínimos cuadrados puede verse como la búsqueda de la proyección del vector de datos sobre el subespacio generado por las columnas de la matriz del modelo.

La solución no necesariamente pasa por todos los puntos; más bien, busca la mejor aproximación global.

En regresión lineal, el residuo final representa la distancia vertical entre cada punto y la recta ajustada.

---

## 5. Forma matricial
Para generalizar el método, se escribe el problema como:

\[
A\mathbf{x} \approx \mathbf{b}
\]

donde:
- \(A\) es la matriz de diseño,
- \(\mathbf{x}\) es el vector de parámetros,
- \(\mathbf{b}\) es el vector de observaciones.

El objetivo es minimizar:

\[
\|A\mathbf{x} - \mathbf{b}\|_2^2
\]

Las ecuaciones normales son:

\[
A^T A\mathbf{x} = A^T\mathbf{b}
\]

Si \(A^T A\) es invertible, entonces:

\[
\mathbf{x} = (A^T A)^{-1}A^T\mathbf{b}
\]

### 5.1. Para una recta
Si el modelo es \(y = a + bx\), la matriz queda:

\[
A =
\begin{bmatrix}
1 & x_1 \\
1 & x_2 \\
\vdots & \vdots \\
1 & x_n
\end{bmatrix},
\quad
\mathbf{x} =
\begin{bmatrix}
a \\
b
\end{bmatrix},
\quad
\mathbf{b} =
\begin{bmatrix}
y_1 \\
y_2 \\
\vdots \\
y_n
\end{bmatrix}
\]

---

## 6. Ajuste por polinomios
También puede ajustarse un polinomio de grado \(k\):

\[
y = a_0 + a_1x + a_2x^2 + \cdots + a_kx^k
\]

La función de error es:

\[
S = \sum_{i=1}^{n}\left(y_i - (a_0 + a_1x_i + \cdots + a_kx_i^k)\right)^2
\]

La matriz del problema es:

\[
A =
\begin{bmatrix}
1 & x_1 & x_1^2 & \cdots & x_1^k \\
1 & x_2 & x_2^2 & \cdots & x_2^k \\
\vdots & \vdots & \vdots & & \vdots \\
1 & x_n & x_n^2 & \cdots & x_n^k
\end{bmatrix}
\]

Con esto, el ajuste polinómico se resuelve igual que el lineal, pero con más parámetros.

---

## 7. Tipos de ajuste por mínimos cuadrados

### 7.1. Mínimos cuadrados lineales
El modelo es lineal en los parámetros, aunque no necesariamente en la variable independiente.

Ejemplo:
\[
y = a + bx + cx^2
\]

### 7.2. Mínimos cuadrados no lineales
El modelo depende de los parámetros de forma no lineal.

Ejemplo:
\[
y = ae^{bx}
\]

En este caso, normalmente se usan métodos iterativos como Gauss-Newton o Levenberg-Marquardt.

### 7.3. Mínimos cuadrados ponderados
Cada observación tiene un peso diferente:

\[
S = \sum_{i=1}^{n} w_i\left(y_i - f(x_i)\right)^2
\]

Se usa cuando algunos datos son más confiables que otros.

---

## 8. Ventajas del método
- Es sencillo de entender e implementar.
- Funciona muy bien para aproximar datos experimentales.
- Tiene interpretación geométrica y algebraica clara.
- Se adapta a rectas, polinomios y modelos más complejos.
- Es una base fundamental en análisis numérico, estadística y aprendizaje automático.

---

## 9. Limitaciones
- Los errores grandes influyen mucho porque están al cuadrado.
- Puede ser sensible a valores atípicos.
- En problemas mal condicionados, las ecuaciones normales pueden ser inestables.
- Si el grado del polinomio es muy alto, puede aparecer sobreajuste.

---

## 10. Observación numérica importante
Aunque las ecuaciones normales son una forma teórica muy útil, en cálculo numérico a menudo es mejor resolver el problema con métodos más estables, como:
- factorización QR,
- descomposición SVD.

Esto reduce problemas de estabilidad cuando la matriz está mal condicionada.

---

## 11. Algoritmo general

### Entrada
- Conjunto de datos \((x_i,y_i)\)
- Tipo de modelo: lineal, polinómico o general

### Pasos
1. Definir el modelo \(f(x,\theta)\).
2. Construir la matriz de diseño \(A\).
3. Formar el vector de observaciones \(\mathbf{b}\).
4. Resolver \(A^T A\theta = A^T\mathbf{b}\) o usar QR/SVD.
5. Calcular la curva ajustada.
6. Evaluar el error total.

### Salida
- Parámetros del modelo.
- Curva ajustada.
- Error mínimo obtenido.

---

## 12. Pseudocódigo
```text
Entrada: datos (x_i, y_i), grado k
Construir matriz A con columnas [1, x, x^2, ..., x^k]
Construir vector b con los valores y_i
Resolver el sistema (A^T A) c = A^T b
Devolver coeficientes c
```

---

## 13. Ejemplo simple
Supón los datos:

\[
(1,2), (2,3), (3,5)
\]

Buscamos una recta \(y = a + bx\).

Construimos:

\[
A =
\begin{bmatrix}
1 & 1 \\
1 & 2 \\
1 & 3
\end{bmatrix},
\quad
\mathbf{b} =
\begin{bmatrix}
2 \\
3 \\
5
\end{bmatrix}
\]

Luego resolvemos:

\[
A^TA\begin{bmatrix}a\\b\end{bmatrix} = A^T\mathbf{b}
\]

Al resolver, se obtiene la recta de mejor ajuste.

Este ejemplo te sirve para mostrar en clase el proceso completo: datos → matriz → ecuaciones normales → solución → interpretación.

---

## 14. Implementación en Python
```python
import numpy as np
import matplotlib.pyplot as plt

def ajuste_minimos_cuadrados(x, y, grado=1):
    x = np.asarray(x, dtype=float)
    y = np.asarray(y, dtype=float)

    # Matriz de diseño: [1, x, x^2, ..., x^grado]
    A = np.vander(x, N=grado + 1, increasing=True)

    # Resolver por mínimos cuadrados
    coef, *_ = np.linalg.lstsq(A, y, rcond=None)
    return coef

# Ejemplo
x = np.array([1, 2, 3, 4, 5])
y = np.array([2.2, 2.8, 3.6, 4.5, 5.1])

coef = ajuste_minimos_cuadrados(x, y, grado=1)
a, b = coef
print('a =', a)
print('b =', b)

# Recta ajustada
xx = np.linspace(x.min(), x.max(), 100)
yy = a + b * xx

plt.scatter(x, y, label='Datos')
plt.plot(xx, yy, label='Ajuste lineal')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.grid(True)
plt.show()
```

### Versión manual con ecuaciones normales
```python
import numpy as np

def ajuste_recta_manual(x, y):
    x = np.asarray(x, dtype=float)
    y = np.asarray(y, dtype=float)
    n = len(x)

    sum_x = x.sum()
    sum_y = y.sum()
    sum_x2 = (x**2).sum()
    sum_xy = (x * y).sum()

    b = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x**2)
    a = (sum_y - b * sum_x) / n
    return a, b
```

---

## 15. Implementación en Java
```java
public class MinimosCuadrados {
    public static double[] ajusteRecta(double[] x, double[] y) {
        int n = x.length;
        double sumX = 0, sumY = 0, sumX2 = 0, sumXY = 0;

        for (int i = 0; i < n; i++) {
            sumX += x[i];
            sumY += y[i];
            sumX2 += x[i] * x[i];
            sumXY += x[i] * y[i];
        }

        double b = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        double a = (sumY - b * sumX) / n;
        return new double[]{a, b};
    }

    public static void main(String[] args) {
        double[] x = {1, 2, 3, 4, 5};
        double[] y = {2.2, 2.8, 3.6, 4.5, 5.1};

        double[] coef = ajusteRecta(x, y);
        System.out.println("a = " + coef[0]);
        System.out.println("b = " + coef[1]);
    }
}
```

---

## 16. Aplicaciones
- Predicción de ventas y demanda.
- Ajuste de datos físicos y experimentales.
- Econometría y finanzas.
- Calibración de sensores.
- Ingeniería civil, mecánica y eléctrica.
- Aprendizaje automático, especialmente regresión.

---

## 17. Ideas para tu presentación
Puedes organizar tu exposición así:

1. **Introducción**: qué es el método y por qué se usa.
2. **Fundamento matemático**: residuos, suma de errores cuadrados.
3. **Caso lineal**: deducción de la recta de mejor ajuste.
4. **Forma matricial**: ecuaciones normales.
5. **Generalización**: polinomios y modelos más complejos.
6. **Implementación en código**: Python o Java.
7. **Ejemplo resuelto**: datos, cálculo y gráfica.
8. **Ventajas y limitaciones**.
9. **Conclusión**.

---

## 18. Conclusión
El ajuste por mínimos cuadrados es una herramienta fundamental en análisis numérico porque transforma un conjunto de datos en un modelo matemático útil. Su versión más simple produce la recta de mejor ajuste, pero el método se extiende a polinomios y modelos más avanzados. Además, su implementación computacional permite trabajar con datos reales de forma eficiente.

---

## 19. Resumen corto para estudiar
- Busca la mejor aproximación a datos experimentales.
- Minimiza la suma de los cuadrados de los residuos.
- Para la recta \(y=a+bx\), se obtienen las ecuaciones normales.
- En forma matricial: \(A^TAx=A^Tb\).
- Para polinomios, se construye una matriz con potencias de \(x\).
- En práctica numérica, QR y SVD suelen ser más estables que invertir \(A^TA\).

---

## 20. Fuentes recomendadas para tu exposición
- NIST Handbook of Mathematical Functions / Statistical methods
- Notas de Álgebra Lineal y Análisis Numérico de universidades
- Apuntes de regresión lineal y mínimos cuadrados
- Material sobre factorización QR y SVD

---

## 21. Siguiente paso sugerido
Si vas a presentar este tema, conviene preparar también:
- una diapositiva con la derivación de la recta,
- otra con la versión matricial,
- otra con el código,
- y una con un gráfico de los puntos y la recta ajustada.

