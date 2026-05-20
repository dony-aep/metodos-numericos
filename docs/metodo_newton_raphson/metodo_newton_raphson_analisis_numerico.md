# Método de Newton-Raphson

## 1. Idea general
El método de Newton-Raphson, también llamado **método de Newton** o **método de la tangente**, es un método iterativo para aproximar raíces de ecuaciones no lineales de la forma:

\[
f(x)=0
\]

Su objetivo es encontrar un valor \(x\) tal que la función se anule o quede lo más cerca posible de cero. Es uno de los métodos más importantes de **Análisis Numérico** porque combina una idea matemática muy elegante con una implementación computacional simple y eficiente.

---

## 2. Interpretación geométrica
La idea es tomar un punto inicial \(x_n\) sobre la curva \(y=f(x)\), construir la recta tangente en ese punto y usar el corte de esa tangente con el eje \(x\) como nueva aproximación.

Si la tangente en \(x_n\) tiene ecuación:

\[
y = f(x_n) + f'(x_n)(x-x_n)
\]

y la hacemos igual a cero para hallar su intersección con el eje \(x\), obtenemos:

\[
0 = f(x_n) + f'(x_n)(x_{n+1}-x_n)
\]

Despejando:

\[
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}
\]

Esta es la fórmula central del método.

---

## 3. Fórmula iterativa
La iteración de Newton-Raphson es:

\[
\boxed{x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}}
\]

Donde:
- \(x_n\) es la aproximación actual,
- \(x_{n+1}\) es la siguiente aproximación,
- \(f'(x_n)\) es la derivada evaluada en \(x_n\).

---

## 4. Derivación por aproximación lineal
Cerca de un punto \(x_n\), una función diferenciable puede aproximarse por su recta tangente:

\[
f(x) \approx f(x_n)+f'(x_n)(x-x_n)
\]

Si buscamos una raíz \(r\) tal que \(f(r)=0\), sustituimos \(x=r\):

\[
0 \approx f(x_n)+f'(x_n)(r-x_n)
\]

De aquí se despeja:

\[
r \approx x_n - \frac{f(x_n)}{f'(x_n)}
\]

Y esa aproximación se usa como nueva iteración.

---

## 5. Algoritmo paso a paso
1. Elegir una aproximación inicial \(x_0\).
2. Calcular \(f(x_0)\) y \(f'(x_0)\).
3. Aplicar la fórmula de Newton.
4. Repetir hasta cumplir un criterio de paro.

Pseudocódigo:

```text
Entrada: f, f', x0, tolerancia, max_iter
x = x0
Para n = 1 hasta max_iter:
    si f'(x) = 0:
        detener con error
    x_new = x - f(x)/f'(x)
    si |x_new - x| < tolerancia o |f(x_new)| < tolerancia:
        devolver x_new
    x = x_new
Devolver x con advertencia de no convergencia
```

---

## 6. Criterios de parada
En programación, normalmente se detiene por uno o varios de estos criterios:

- \(|x_{n+1}-x_n| < \varepsilon\)
- \(|f(x_{n+1})| < \varepsilon\)
- número máximo de iteraciones alcanzado

En práctica, conviene usar más de un criterio para evitar falsos positivos.

---

## 7. Condiciones para que funcione bien
El método suele converger rápido cuando:

- la función es diferenciable cerca de la raíz,
- la derivada no se anula cerca de la raíz,
- la estimación inicial está suficientemente cerca de la solución,
- la raíz es simple (no múltiple).

---

## 8. Convergencia y error
Cuando el método converge de forma ideal, su convergencia es **cuadrática**. Eso significa que el error del siguiente paso se comporta aproximadamente como el cuadrado del error anterior:

\[
|e_{n+1}| \approx C|e_n|^2
\]

Esto explica por qué Newton-Raphson puede ser tan rápido: el número de cifras correctas suele aumentar de manera muy notable en pocas iteraciones.

---

## 9. Cuándo puede fallar
El método puede fallar o comportarse mal en estos casos:

- la derivada es cero o muy pequeña,
- la aproximación inicial está lejos de la raíz,
- la función tiene una tangente casi horizontal,
- hay una raíz múltiple,
- la función no es suave o presenta cambios bruscos.

En esos casos puede divergir, oscilar o acercarse muy lentamente.

---

## 10. Raíces múltiples
Si una raíz tiene multiplicidad mayor que 1, el Newton estándar pierde rapidez. Para esos casos existe una variante modificada:

\[
x_{n+1}=x_n - m\frac{f(x_n)}{f'(x_n)}
\]

si se conoce la multiplicidad \(m\).

---

## 11. Relación con otros métodos
- **Bisección:** más lento, pero más seguro.
- **Secante:** no requiere derivada, pero suele converger más lento que Newton.
- **Newton-Raphson:** más rápido, pero exige derivada y buena semilla inicial.

Una comparación útil es:

- Bisección → robusto
- Secante → intermedio
- Newton → muy rápido si todo sale bien

---

## 12. Ejemplo clásico: \(f(x)=x^2-2\)
Queremos hallar \(\sqrt{2}\).

- \(f(x)=x^2-2\)
- \(f'(x)=2x\)

La iteración queda:

\[
x_{n+1}=x_n-\frac{x_n^2-2}{2x_n}=\frac{1}{2}\left(x_n+\frac{2}{x_n}\right)
\]

Si tomamos \(x_0=1\):
- \(x_1=1.5\)
- \(x_2\approx1.4166667\)
- \(x_3\approx1.4142157\)
- \(x_4\approx1.4142136\)

Ya en pocas iteraciones se obtiene una gran precisión.

---

## 13. Implementación en Python

```python
def newton_raphson(f, df, x0, tol=1e-8, max_iter=100):
    x = x0
    for i in range(max_iter):
        fx = f(x)
        dfx = df(x)

        if dfx == 0:
            raise ZeroDivisionError(f"Derivada cero en la iteración {i}, x = {x}")

        x_new = x - fx / dfx

        if abs(x_new - x) < tol or abs(f(x_new)) < tol:
            return x_new, i + 1

        x = x_new

    raise RuntimeError("El método no convergió en el número máximo de iteraciones")
```

### Ejemplo de uso

```python
import math

f = lambda x: x**2 - 2
df = lambda x: 2*x

raiz, iteraciones = newton_raphson(f, df, x0=1)
print("Raíz aproximada:", raiz)
print("Iteraciones:", iteraciones)
```

---

## 14. Versión más completa en código
Si quieres mostrar mejor el proceso en clase, puedes hacer que el programa imprima cada iteración:

```python
def newton_raphson_detallado(f, df, x0, tol=1e-8, max_iter=100):
    x = x0
    print(f"{'n':>3} {'x_n':>15} {'f(x_n)':>15} {'error':>15}")
    print("-" * 55)

    for n in range(1, max_iter + 1):
        fx = f(x)
        dfx = df(x)

        if dfx == 0:
            print("Derivada cero. No se puede continuar.")
            return None

        x_new = x - fx / dfx
        error = abs(x_new - x)

        print(f"{n:>3} {x:>15.10f} {fx:>15.10f} {error:>15.10f}")

        if error < tol or abs(f(x_new)) < tol:
            return x_new

        x = x_new

    print("No convergió.")
    return None
```

---

## 15. Qué conviene explicar en una presentación
Si lo vas a exponer, lo ideal es explicar en este orden:

1. Qué problema resuelve.
2. La idea geométrica de la tangente.
3. La deducción de la fórmula.
4. El algoritmo iterativo.
5. Un ejemplo numérico.
6. La implementación en Python u otro lenguaje.
7. Ventajas, desventajas y casos de falla.

---

## 16. Ventajas
- Muy rápido cerca de la raíz.
- Fácil de programar.
- Muy usado en ciencias e ingeniería.
- Excelente para mostrar relación entre cálculo y programación.

## 17. Desventajas
- Requiere derivada.
- Puede fallar si la semilla es mala.
- No garantiza convergencia global.
- Problemas con derivada cero o raíces múltiples.

---

## 18. Aplicaciones
Se usa en:
- búsqueda de raíces de ecuaciones no lineales,
- sistemas de ecuaciones no lineales,
- optimización,
- física e ingeniería,
- métodos computacionales,
- cálculo de raíces cuadradas y otras funciones especiales.

---

## 19. Resumen corto para estudiar
El método de Newton-Raphson aproxima raíces de \(f(x)=0\) usando tangentes. Su fórmula es:

\[
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}
\]

Es muy rápido cuando converge, normalmente con convergencia cuadrática, pero necesita una buena aproximación inicial y una derivada distinta de cero.

---

## 20. Ideas para ampliar el trabajo
- Comparar Newton con bisección y secante.
- Graficar la función y las tangentes.
- Mostrar la tabla de iteraciones.
- Hacer una interfaz sencilla en Python, Java, C++ o JavaScript.
- Probar distintos valores iniciales para ver cuándo converge o falla.

