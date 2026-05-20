# Método de Bisección

## 1. Introducción
El **método de bisección** es un método numérico para aproximar raíces de ecuaciones no lineales de la forma:

\[
f(x)=0
\]

Se basa en dividir repetidamente un intervalo en dos partes y conservar la mitad donde exista cambio de signo. Es uno de los métodos más importantes en **Análisis Numérico** porque es simple, estable y fácil de programar.

---

## 2. Idea principal
Si una función continua cambia de signo en un intervalo \([a,b]\), entonces existe al menos una raíz dentro de ese intervalo.

Esto se expresa como:

\[
f(a)\cdot f(b) < 0
\]

Si esta condición se cumple, se calcula el punto medio:

\[
c=\frac{a+b}{2}
\]

Luego se evalúa en cuál de las dos mitades ocurre el cambio de signo y se repite el proceso hasta alcanzar una tolerancia deseada.

---

## 3. Fundamento teórico
El método está respaldado por el **Teorema del Valor Intermedio**:

> Si una función es continua en un intervalo cerrado \([a,b]\) y toma valores de signo opuesto en los extremos, entonces existe al menos un valor \(c\in(a,b)\) tal que \(f(c)=0\).

Por eso, el método de bisección requiere dos condiciones básicas:

1. La función debe ser **continua** en el intervalo.
2. Debe existir **cambio de signo** entre los extremos.

---

## 4. Condiciones de aplicación
Para aplicar el método de bisección correctamente:

- La función debe ser continua en \([a,b]\).
- Debe cumplirse \(f(a)\cdot f(b)<0\).
- Si \(f(a)\cdot f(b)>0\), no se garantiza la existencia de raíz en ese intervalo.
- Si \(f(a)=0\) o \(f(b)=0\), entonces ya se encontró una raíz en el extremo.

---

## 5. Procedimiento del método
Dado un intervalo inicial \([a,b]\):

1. Verificar que \(f(a)\cdot f(b)<0\).
2. Calcular el punto medio:
   \[
   c=\frac{a+b}{2}
   \]
3. Evaluar \(f(c)\).
4. Tomar el subintervalo donde haya cambio de signo:
   - Si \(f(a)\cdot f(c)<0\), la raíz está en \([a,c]\).
   - Si \(f(c)\cdot f(b)<0\), la raíz está en \([c,b]\).
5. Repetir hasta cumplir un criterio de parada.

---

## 6. Criterios de parada
El método puede detenerse cuando:

- \(|f(c)|<\text{tolerancia}\)
- \(|b-a|<\text{tolerancia}\)
- Se alcanza un número máximo de iteraciones
- El error aproximado es suficientemente pequeño

---

## 7. Error en el método
Como el intervalo se reduce a la mitad en cada iteración, la cota del error después de \(n\) iteraciones es:

\[
E_n \leq \frac{b-a}{2^n}
\]

Donde:
- \(b-a\) es el tamaño del intervalo inicial.
- \(n\) es el número de iteraciones.

### Error absoluto aproximado
\[
E_a = |c_n-c_{n-1}|
\]

### Error relativo aproximado
\[
E_r = \left|\frac{c_n-c_{n-1}}{c_n}\right|
\]

---

## 8. Convergencia
El método de bisección **siempre converge** si:

- la función es continua,
- y existe cambio de signo en el intervalo.

Su convergencia es **lineal**, por lo que es más lenta que otros métodos como Newton-Raphson o la secante. Sin embargo, su gran ventaja es la estabilidad.

---

## 9. Ventajas
- Fácil de entender e implementar.
- No requiere derivadas.
- Siempre converge si se cumplen las condiciones.
- Es muy útil para introducir programación numérica.
- Permite controlar el error de manera clara.

---

## 10. Desventajas
- Convergencia lenta.
- Requiere un intervalo inicial con cambio de signo.
- No es eficiente para obtener muchas cifras significativas rápidamente.
- No sirve directamente si no se conoce un intervalo adecuado.

---

## 11. Algoritmo paso a paso
Sea una función \(f(x)\), un intervalo \([a,b]\) y una tolerancia \(\varepsilon\):

1. Calcular \(f(a)\) y \(f(b)\).
2. Si \(f(a)f(b)>0\), detenerse: no hay garantía de raíz en el intervalo.
3. Mientras \(|b-a|>\varepsilon\):
   - Calcular \(c=(a+b)/2\).
   - Evaluar \(f(c)\).
   - Si \(f(c)=0\), terminar.
   - Si \(f(a)f(c)<0\), entonces \(b=c\).
   - En caso contrario, \(a=c\).
4. La raíz aproximada es \(c\) o \((a+b)/2\).

---

## 12. Pseudocódigo
```text
Entrada: función f, intervalo [a,b], tolerancia tol, iteraciones máximas max_iter

Si f(a) * f(b) > 0 entonces
    Mostrar "No hay garantía de raíz en el intervalo"
    Terminar
FinSi

Para i = 1 hasta max_iter hacer
    c = (a + b) / 2

    Si f(c) == 0 entonces
        Mostrar c
        Terminar
    FinSi

    Si f(a) * f(c) < 0 entonces
        b = c
    Sino
        a = c
    FinSi

    Si |b - a| < tol entonces
        Terminar
    FinSi
FinPara

Mostrar (a + b) / 2
```

---

## 13. Ejemplo resuelto
Resolver:

\[
f(x)=x^3+4x^2-10
\]

usando el intervalo \([1,2]\).

### Verificación del intervalo
\[
f(1)=1^3+4(1)^2-10=-5
\]

\[
f(2)=2^3+4(2)^2-10=14
\]

Como:

\[
f(1)\cdot f(2)<0
\]

existe al menos una raíz en \([1,2]\).

### Iteración 1
\[
c_1=\frac{1+2}{2}=1.5
\]

\[
f(1.5)=1.5^3+4(1.5)^2-10=2.375
\]

Como \(f(1)\cdot f(1.5)<0\), la raíz está en \([1,1.5]\).

### Iteración 2
\[
c_2=\frac{1+1.5}{2}=1.25
\]

\[
f(1.25)=-1.796875
\]

La raíz está en \([1.25,1.5]\).

### Iteración 3
\[
c_3=\frac{1.25+1.5}{2}=1.375
\]

\[
f(1.375)=0.162109375
\]

La raíz está en \([1.25,1.375]\).

Este proceso continúa hasta lograr la precisión requerida.

---

## 14. Tabla de iteraciones
| Iteración | a | b | c | f(c) | Intervalo nuevo |
|---|---:|---:|---:|---:|---|
| 1 | 1.000000 | 2.000000 | 1.500000 | 2.375000 | [1.000000, 1.500000] |
| 2 | 1.000000 | 1.500000 | 1.250000 | -1.796875 | [1.250000, 1.500000] |
| 3 | 1.250000 | 1.500000 | 1.375000 | 0.162109 | [1.250000, 1.375000] |
| 4 | 1.250000 | 1.375000 | 1.312500 | -0.848389 | [1.312500, 1.375000] |

---

## 15. Implementación en Python
```python
def f(x):
    return x**3 + 4*x**2 - 10


def biseccion(a, b, tol=1e-6, max_iter=100):
    fa = f(a)
    fb = f(b)

    if fa * fb > 0:
        raise ValueError("La función no cambia de signo en el intervalo.")

    for i in range(1, max_iter + 1):
        c = (a + b) / 2
        fc = f(c)

        print(f"Iteración {i}: a={a:.6f}, b={b:.6f}, c={c:.6f}, f(c)={fc:.6f}")

        if abs(fc) < tol or abs(b - a) < tol:
            return c

        if fa * fc < 0:
            b = c
            fb = fc
        else:
            a = c
            fa = fc

    return (a + b) / 2


raiz = biseccion(1, 2, tol=1e-6)
print("Raíz aproximada:", raiz)
```

---

## 16. Implementación en C++
```cpp
#include <iostream>
#include <cmath>
using namespace std;

double f(double x) {
    return pow(x, 3) + 4 * pow(x, 2) - 10;
}

int main() {
    double a = 1.0, b = 2.0, c;
    double tol = 1e-6;
    int max_iter = 100;

    if (f(a) * f(b) > 0) {
        cout << "No hay cambio de signo en el intervalo." << endl;
        return 0;
    }

    for (int i = 1; i <= max_iter; i++) {
        c = (a + b) / 2.0;
        double fc = f(c);

        cout << "Iteracion " << i
             << ": a=" << a
             << ", b=" << b
             << ", c=" << c
             << ", f(c)=" << fc << endl;

        if (fabs(fc) < tol || fabs(b - a) < tol) {
            cout << "Raiz aproximada: " << c << endl;
            return 0;
        }

        if (f(a) * fc < 0)
            b = c;
        else
            a = c;
    }

    cout << "Raiz aproximada: " << (a + b) / 2.0 << endl;
    return 0;
}
```

---

## 17. Complejidad computacional
En cada iteración el intervalo se reduce a la mitad, por lo que el número de iteraciones necesarias para alcanzar una precisión \(\varepsilon\) está dado aproximadamente por:

\[
n \geq \log_2\left(\frac{b-a}{\varepsilon}\right)
\]

Esto hace que el método sea predecible y fácil de analizar.

---

## 18. Comparación con otros métodos
| Método | Usa derivadas | Convergencia garantizada | Velocidad |
|---|---|---|---|
| Bisección | No | Sí | Lenta |
| Newton-Raphson | Sí | No siempre | Muy rápida |
| Secante | No | No siempre | Rápida |
| Falsa posición | No | Sí | Media |

---

## 19. Aplicaciones
El método de bisección se utiliza en:

- ingeniería,
- física,
- economía,
- simulación computacional,
- modelado matemático,
- gráficos por computadora,
- sistemas de control,
- resolución de ecuaciones trascendentales.

---

## 20. Ideas para tu proyecto en programación
Puedes llevar el método a un lenguaje de programación y mostrar:

- ingreso de la función,
- ingreso del intervalo,
- cálculo iterativo de la raíz,
- tabla de iteraciones,
- gráfica de la función,
- animación del intervalo que se reduce,
- comparación con otro método numérico.

### Extras útiles para una presentación
- Mostrar el intervalo en cada iteración.
- Resaltar el punto medio.
- Visualizar el cambio de signo.
- Imprimir error aproximado en cada paso.
- Permitir cambiar la tolerancia.

---

## 21. Conclusión
El método de bisección es una herramienta fundamental en Análisis Numérico. Aunque no es el más rápido, destaca por su simplicidad, estabilidad y facilidad de programación. Es ideal para aprender los conceptos básicos de aproximación de raíces, iteraciones, tolerancia y control de error.

Para proyectos de programación, es una excelente opción porque permite crear aplicaciones que muestren paso a paso cómo se aproxima una raíz de manera confiable y visual.

