# Métodos de solución de ecuaciones no lineales

## 1. Idea general
En Análisis Numérico, una **ecuación no lineal** se escribe normalmente como:

\[
f(x)=0
\]

El objetivo es encontrar uno o varios valores de \(x\) que anulen la función. Estas ecuaciones aparecen cuando no es posible despejar la incógnita de forma algebraica o cuando la solución exacta es difícil de obtener.

Ejemplos:
- \(e^{-x} - x = 0\)
- \(\cos(x) - x = 0\)
- \(x^3 - 2x - 5 = 0\)
- Ecuaciones trascendentes o combinaciones de polinomios, exponenciales, logaritmos y trigonométricas.

---

## 2. Qué se busca en un método numérico
Un método para ecuaciones no lineales debe intentar:

- aproximar una raíz con buena precisión,
- usar pocas iteraciones,
- ser estable,
- permitir una implementación sencilla en un lenguaje de programación,
- indicar cuándo detener el proceso.

En práctica, no siempre se exige encontrar la raíz exacta, sino una **aproximación suficientemente buena**.

---

## 3. Clasificación de métodos
Los métodos más usados se agrupan en dos familias:

### 3.1 Métodos cerrados o de encierro (bracketing)
Trabajan con un intervalo \([a,b]\) donde se sabe que hay una raíz, normalmente porque:

\[
f(a)\,f(b) < 0
\]

Ventajas:
- son más seguros,
- garantizan convergencia bajo condiciones adecuadas,
- permiten controlar la raíz dentro del intervalo.

Desventajas:
- suelen ser más lentos.

Métodos típicos:
- búsqueda incremental,
- bisección,
- falsa posición (regula falsi).

### 3.2 Métodos abiertos
Parten de uno o más valores iniciales sin necesidad de encerrar la raíz.

Ventajas:
- suelen ser más rápidos,
- pueden requerir menos evaluaciones en algunos casos.

Desventajas:
- pueden divergir,
- dependen mucho del valor inicial.

Métodos típicos:
- iteración de punto fijo,
- Newton-Raphson,
- secante,
- variantes híbridas.

---

## 4. Conceptos clave

### 4.1 Raíz o cero de una función
Un número \(r\) es raíz de \(f\) si:

\[
f(r)=0
\]

### 4.2 Error aproximado
Cuando no conocemos la raíz exacta, usamos el error aproximado:

\[
\varepsilon_a = \left|\frac{x_{n+1}-x_n}{x_{n+1}}\right|\times 100\%
\]

### 4.3 Criterios de parada
Un algoritmo normalmente se detiene cuando ocurre alguna de estas condiciones:

- \(|x_{n+1}-x_n| < \text{tolerancia}\)
- \(|f(x_n)| < \text{tolerancia}\)
- se alcanza un número máximo de iteraciones.

---

## 5. Métodos cerrados

## 5.1 Búsqueda incremental
Se recorre el eje real con pasos \(h\) buscando un cambio de signo.

Si:

\[
f(x_i)f(x_{i+1})<0
\]

entonces hay una raíz entre \(x_i\) y \(x_{i+1}\).

### Idea
1. Elegir un punto inicial \(x_0\) y un paso \(h\).
2. Calcular \(f(x_0), f(x_1), f(x_2), \dots\)
3. Detectar el intervalo donde cambia el signo.

### Uso
Sirve para **localizar raíces** antes de aplicar bisección o Newton.

---

## 5.2 Método de bisección
Es uno de los métodos más simples y confiables.

### Requisito
Se necesita un intervalo \([a,b]\) tal que:

\[
f(a)f(b)<0
\]

### Algoritmo
1. Calcular el punto medio:

\[
m = \frac{a+b}{2}
\]

2. Evaluar \(f(m)\).
3. Elegir el subintervalo donde haya cambio de signo.
4. Repetir hasta cumplir la tolerancia.

### Ventajas
- Garantiza convergencia si la función es continua y el intervalo encierra una raíz.
- Es muy fácil de programar.
- Es robusto.

### Desventajas
- Convergencia lenta.
- No usa derivadas ni información extra de la forma de la función.

### Pseudocódigo
```text
entrada: f, a, b, tolerancia, max_iter
si f(a) * f(b) >= 0 entonces
    mostrar "No hay garantía de raíz en el intervalo"
    detener
fin si

para k = 1 hasta max_iter:
    m = (a + b) / 2
    si |f(m)| < tolerancia o |b-a|/2 < tolerancia entonces
        retornar m
    fin si
    si f(a) * f(m) < 0 entonces
        b = m
    si no
        a = m
    fin si
fin para
retornar m
```

---

## 5.3 Método de falsa posición (regula falsi)
En vez de usar el punto medio, usa la recta que une \((a,f(a))\) y \((b,f(b))\). La intersección con el eje \(x\) da una nueva aproximación:

\[
x_r = b - f(b)\frac{b-a}{f(b)-f(a)}
\]

### Ventajas
- Mantiene el encierro de la raíz.
- Puede ser más rápido que bisección.

### Desventajas
- Puede estancarse si uno de los extremos casi no cambia.

### Idea para programar
Misma estructura que bisección, pero cambiando el cálculo de la nueva aproximación por la fórmula de interpolación lineal.

---

## 6. Métodos abiertos

## 6.1 Iteración de punto fijo
Se reescribe la ecuación \(f(x)=0\) como:

\[
x=g(x)
\]

y se itera:

\[
x_{n+1}=g(x_n)
\]

### Condición de convergencia local
Una condición clásica es que, cerca de la raíz \(x^*\), se cumpla:

\[
|g'(x^*)|<1
\]

### Ventajas
- Muy útil cuando se logra una buena transformación.
- Es conceptualmente simple.

### Desventajas
- No toda ecuación puede transformarse de forma conveniente.
- Una mala elección de \(g(x)\) puede hacer divergir el método.

### Ejemplo
De:

\[
x^2-3x+1=0
\]

se puede reordenar como:

\[
x = \frac{x^2+1}{3}
\]

pero no necesariamente esa forma convergerá bien; depende de la derivada de \(g\).

---

## 6.2 Método de Newton-Raphson
Es uno de los más importantes en análisis numérico.

### Fórmula iterativa

\[
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}
\]

### Interpretación geométrica
En cada paso se toma la tangente a la curva en \(x_n\) y se usa su intersección con el eje \(x\) como nueva aproximación.

### Ventajas
- Muy rápido cerca de la raíz.
- Convergencia cuadrática bajo condiciones adecuadas.
- Muy usado en ciencia e ingeniería.

### Desventajas
- Requiere derivada.
- Puede fallar si \(f'(x_n)=0\) o es muy pequeña.
- Necesita una buena aproximación inicial.

### Pseudocódigo
```text
entrada: f, fprima, x0, tolerancia, max_iter
x = x0
para k = 1 hasta max_iter:
    fx = f(x)
    dfx = fprima(x)
    si dfx == 0 entonces
        detener con error
    fin si
    x_nuevo = x - fx / dfx
    si |x_nuevo - x| < tolerancia o |f(x_nuevo)| < tolerancia entonces
        retornar x_nuevo
    fin si
    x = x_nuevo
fin para
retornar x
```

### Comentario importante para programación
Cuando se implementa Newton en un lenguaje como Python, Java, C++ o MATLAB, conviene:
- validar que la derivada no sea cero,
- poner máximo de iteraciones,
- registrar la historia de iteraciones,
- avisar si el método no converge.

---

## 6.3 Método de la secante
Es una alternativa a Newton cuando no se quiere calcular la derivada.

### Fórmula
Usa dos aproximaciones previas \(x_{n-1}\) y \(x_n\):

\[
x_{n+1}=x_n-f(x_n)\frac{x_n-x_{n-1}}{f(x_n)-f(x_{n-1})}
\]

### Ventajas
- No necesita derivada.
- Suele ser más rápido que bisección.
- Más fácil de aplicar cuando derivar es costoso.

### Desventajas
- No garantiza convergencia.
- Puede fallar si \(f(x_n)-f(x_{n-1})=0\).

### Pseudocódigo
```text
entrada: f, x0, x1, tolerancia, max_iter
para k = 1 hasta max_iter:
    f0 = f(x0)
    f1 = f(x1)
    si f1 - f0 == 0 entonces
        detener con error
    fin si
    x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
    si |x2 - x1| < tolerancia o |f(x2)| < tolerancia entonces
        retornar x2
    fin si
    x0 = x1
    x1 = x2
fin para
retornar x1
```

---

## 6.4 Métodos híbridos
Un método híbrido combina lo mejor de dos estrategias.

Ejemplo típico:
- usar bisección para asegurar que la raíz esté encerrada,
- luego aplicar secante o Newton para acelerar la convergencia.

Esto es muy útil en software numérico real porque mezcla **seguridad** y **velocidad**.

---

## 7. Convergencia

### 7.1 Orden de convergencia
Describe qué tan rápido se acerca una sucesión a la raíz.

- **Lineal**: mejora constante por iteración.
- **Cuadrática**: el número de cifras correctas crece muy rápido.
- **Superlineal**: más rápido que lineal, pero no necesariamente cuadrático.

### 7.2 Orden de los métodos más comunes
- Bisección: convergencia lineal.
- Falsa posición: generalmente lineal, aunque puede ser mejor en práctica.
- Punto fijo: depende de \(g\), puede ser lineal.
- Newton-Raphson: cuadrática cerca de la raíz.
- Secante: superlineal.

### 7.3 Influencia del valor inicial
En métodos abiertos, la elección del valor inicial es crítica. Un buen valor inicial puede hacer que el método converja rápido; uno malo puede hacer que diverja o que converja a otra raíz.

---

## 8. Comparación rápida

| Método | ¿Necesita derivada? | ¿Garantiza convergencia? | Velocidad | Observación |
|---|---:|---:|---:|---|
| Bisección | No | Sí, bajo condiciones | Lenta | Muy robusto |
| Falsa posición | No | Sí, bajo condiciones | Media | Más eficiente que bisección en muchos casos |
| Punto fijo | No | No siempre | Variable | Depende de la forma de \(g\) |
| Newton-Raphson | Sí | No siempre | Muy alta | Requiere buen valor inicial |
| Secante | No | No siempre | Alta | Buena opción si no hay derivada |
| Híbrido | A veces | Sí en la parte cerrada | Alta | Muy usado en práctica |

---

## 9. Cómo llevarlo a un lenguaje de programación

### 9.1 Estructura general de un solver de raíces
Todo programa para resolver \(f(x)=0\) suele tener estas partes:

1. Definir la función \(f(x)\).
2. Elegir el método.
3. Definir tolerancia y máximo de iteraciones.
4. Ejecutar las iteraciones.
5. Guardar resultados por paso.
6. Mostrar solución y análisis.

### 9.2 Variables importantes
- `x0`, `x1`, `a`, `b`: valores iniciales.
- `tol`: tolerancia.
- `max_iter`: número máximo de iteraciones.
- `error`: diferencia entre iteraciones.
- `fx`: valor de la función.
- `history`: lista de iteraciones.

### 9.3 Buenas prácticas
- Validar entradas.
- Manejar divisiones por cero.
- Registrar iteraciones para graficar el comportamiento.
- Comparar métodos con la misma función.
- Evaluar tanto error en la variable como error en la función.

---

## 10. Ejemplo base para presentación
Tomemos:

\[
f(x)=x^3-x-2
\]

La raíz real está cerca de \(x \approx 1.521\).

### Con bisección
Se puede elegir un intervalo como \([1,2]\), porque:

\[
f(1)=-2,\quad f(2)=4
\]

hay cambio de signo, así que existe una raíz entre esos valores.

### Con Newton
Derivada:

\[
f'(x)=3x^2-1
\]

Fórmula:

\[
x_{n+1}=x_n-\frac{x_n^3-x_n-2}{3x_n^2-1}
\]

### Con secante
Usar dos valores iniciales, por ejemplo \(x_0=1\) y \(x_1=2\).

Este ejemplo sirve muy bien para mostrar en clase:
- convergencia,
- diferencias entre métodos,
- efecto de la tolerancia,
- visualización del proceso en código.

---

## 11. Código base en Python

```python
import math

def bisection(f, a, b, tol=1e-8, max_iter=100):
    fa = f(a)
    fb = f(b)
    if fa * fb >= 0:
        raise ValueError("El intervalo no encierra una raíz.")

    history = []
    for k in range(max_iter):
        m = (a + b) / 2
        fm = f(m)
        history.append((k + 1, a, b, m, fm))

        if abs(fm) < tol or abs(b - a) / 2 < tol:
            return m, history

        if fa * fm < 0:
            b = m
            fb = fm
        else:
            a = m
            fa = fm

    return m, history


def newton(f, df, x0, tol=1e-8, max_iter=100):
    x = x0
    history = []
    for k in range(max_iter):
        fx = f(x)
        dfx = df(x)
        if dfx == 0:
            raise ZeroDivisionError("La derivada fue cero.")

        x_new = x - fx / dfx
        history.append((k + 1, x, fx, dfx, x_new))

        if abs(x_new - x) < tol or abs(f(x_new)) < tol:
            return x_new, history
        x = x_new

    return x, history


def secant(f, x0, x1, tol=1e-8, max_iter=100):
    history = []
    for k in range(max_iter):
        f0 = f(x0)
        f1 = f(x1)
        denom = f1 - f0
        if denom == 0:
            raise ZeroDivisionError("Diferencia de funciones cero en secante.")

        x2 = x1 - f1 * (x1 - x0) / denom
        history.append((k + 1, x0, x1, x2, f(x2)))

        if abs(x2 - x1) < tol or abs(f(x2)) < tol:
            return x2, history

        x0, x1 = x1, x2

    return x2, history


# Ejemplo
f = lambda x: x**3 - x - 2
df = lambda x: 3*x**2 - 1

root_bis, hist_bis = bisection(f, 1, 2)
root_new, hist_new = newton(f, df, 1.5)
root_sec, hist_sec = secant(f, 1, 2)

print("Bisección:", root_bis)
print("Newton:", root_new)
print("Secante:", root_sec)
```

---

## 12. Qué mostrar en una exposición
Una presentación clara puede incluir:

- definición de ecuación no lineal,
- necesidad de métodos numéricos,
- clasificación de métodos,
- fórmula de cada método,
- comparación de ventajas y desventajas,
- criterio de paro,
- ejemplo resuelto a mano,
- implementación en código,
- gráficas de convergencia.

---

## 13. Ideas para gráficas o demostración en código
Puedes programar:
- la gráfica de \(f(x)\),
- la evolución de los intervalos en bisección,
- la sucesión de aproximaciones de Newton,
- la comparación de error vs. iteración,
- una tabla de iteraciones.

Esto ayuda mucho a mostrar visualmente cómo trabaja cada método.

---

## 14. Recomendación práctica
Si tu objetivo es explicar y programar, una ruta muy buena es esta:

1. empezar con bisección,
2. luego falsa posición,
3. luego punto fijo,
4. después Newton-Raphson,
5. terminar con secante e híbridos.

Así muestras desde los métodos más seguros hasta los más rápidos.

---

## 15. Referencias consultadas
- MIT OpenCourseWare, *Introduction to Numerical Analysis*, capítulo sobre ecuaciones no lineales.
- University of Maryland, notas sobre métodos de punto fijo, Newton y secante.
- Rutgers University, notas de solución numérica de ecuaciones no lineales.
- UIUC, notas de *Rootfinding* y criterios de parada.
- Oregon State University, sección de *Root Finding and Optimization*.

---

## 16. Conclusión
Los métodos de solución de ecuaciones no lineales son esenciales en análisis numérico porque permiten resolver problemas que no tienen solución algebraica simple. La elección del método depende del equilibrio entre seguridad, rapidez, costo computacional y facilidad de implementación. Para programación, Newton, secante y bisección son excelentes puntos de partida, y un método híbrido suele ser la mejor opción en aplicaciones reales.

