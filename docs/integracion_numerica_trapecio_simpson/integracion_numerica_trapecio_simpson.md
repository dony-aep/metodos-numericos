# Integración numérica: Regla del Trapecio y Regla de Simpson

## 1. Idea general
La **integración numérica** busca aproximar una integral definida cuando:

- la función es complicada o no tiene primitiva elemental,
- solo se conocen valores tabulados o muestreados,
- se desea implementar el cálculo en un programa.

En vez de calcular exactamente

\[
\int_a^b f(x)\,dx
\]

se construye una aproximación usando áreas simples.

Estas dos reglas son de las más importantes en Análisis Numérico:

- **Regla del Trapecio**: aproxima la curva por segmentos rectos.
- **Regla de Simpson**: aproxima la curva por parábolas.

---

## 2. Regla del Trapecio

### 2.1. Idea geométrica
En un intervalo \([a,b]\), se toma la recta que une los puntos \((a,f(a))\) y \((b,f(b))\). El área bajo esa recta es un trapecio.

### 2.2. Fórmula simple
\[
\int_a^b f(x)\,dx \approx \frac{b-a}{2}\,[f(a)+f(b)]
\]

Si definimos \(h=b-a\), también puede verse como:

\[
I_T = \frac{h}{2}(f(a)+f(b))
\]

### 2.3. Regla del Trapecio compuesta
Se divide el intervalo en \(n\) subintervalos iguales:

\[
h=\frac{b-a}{n}, \quad x_i=a+ih
\]

Entonces:

\[
\int_a^b f(x)\,dx \approx \frac{h}{2}\left[f(x_0)+2\sum_{i=1}^{n-1}f(x_i)+f(x_n)\right]
\]

### 2.4. Error
Para una sola aplicación, el error local depende de la segunda derivada:

\[
E_T = -\frac{(b-a)^3}{12}f''(\xi)
\quad \text{para algún } \xi\in(a,b)
\]

En la versión compuesta, el error global es de orden:

\[
O(h^2)
\]

### 2.5. Exactitud
La regla del trapecio es exacta para funciones lineales.

### 2.6. Ventajas y desventajas
**Ventajas:**
- Fácil de entender e implementar.
- Útil con datos tabulados.
- Rápida.

**Desventajas:**
- Menor precisión que Simpson.
- Requiere muchos subintervalos para buena exactitud si la función es muy curvada.

---

## 3. Regla de Simpson

### 3.1. Idea geométrica
En vez de unir puntos con una recta, Simpson aproxima la función por una **parábola** en cada bloque de tres puntos.

### 3.2. Fórmula simple (1/3)
Si \(m\) es el punto medio del intervalo:

\[
\int_a^b f(x)\,dx \approx \frac{b-a}{6}\left[f(a)+4f\left(\frac{a+b}{2}\right)+f(b)\right]
\]

O usando \(h=(b-a)/2\):

\[
I_S=\frac{h}{3}\,[f(x_0)+4f(x_1)+f(x_2)]
\]

### 3.3. Regla de Simpson compuesta
Se divide el intervalo en un número **par** de subintervalos \(n\), con paso:

\[
h=\frac{b-a}{n}
\]

La fórmula queda:

\[
\int_a^b f(x)\,dx \approx \frac{h}{3}\left[f(x_0)+4\sum_{i\ \text{impar}} f(x_i)+2\sum_{i\ \text{par},\ i\neq 0,n} f(x_i)+f(x_n)\right]
\]

### 3.4. Error
El error local depende de la cuarta derivada:

\[
E_S = -\frac{(b-a)^5}{2880}f^{(4)}(\xi)
\quad \text{para algún } \xi\in(a,b)
\]

En la versión compuesta, el error global es de orden:

\[
O(h^4)
\]

### 3.5. Exactitud
Simpson es exacta para polinomios de grado hasta 3.

### 3.6. Ventajas y desventajas
**Ventajas:**
- Más precisa que la regla del trapecio.
- Muy buena para funciones suaves.

**Desventajas:**
- Requiere un número par de subintervalos.
- Su implementación es un poco más delicada.

---

## 4. Comparación rápida

| Método | Aproximación | Requisito | Orden de error global | Exactitud típica |
|---|---|---:|---:|---|
| Trapecio | Rectas | Ninguno especial | \(O(h^2)\) | Funciones lineales |
| Simpson | Parábolas | Número par de subintervalos | \(O(h^4)\) | Polinomios hasta grado 3 |

---

## 5. Cuándo usar cada método

### Usar Trapecio cuando:
- quieres algo muy simple,
- tienes pocos datos,
- la función no es demasiado curva,
- necesitas una primera aproximación.

### Usar Simpson cuando:
- la función es suave,
- quieres más precisión,
- puedes usar un número par de subintervalos,
- el costo computacional sigue siendo importante pero aceptas más exactitud.

---

## 6. Interpretación desde interpolación
Estas reglas pueden entenderse como casos particulares de fórmulas de Newton-Cotes:

- Trapecio: interpolación lineal entre dos puntos.
- Simpson: interpolación cuadrática entre tres puntos.

Esta idea es muy útil para explicar el método en una presentación, porque conecta:

1. interpolación,
2. integración,
3. error de aproximación.

---

## 7. Ejemplo resuelto
Aproximemos

\[
\int_0^2 (x^2+1)\,dx
\]

La integral exacta es:

\[
\left[\frac{x^3}{3}+x\right]_0^2 = \frac{8}{3}+2=\frac{14}{3}\approx 4.6667
\]

### 7.1. Trapecio simple
\[
f(0)=1,\quad f(2)=5
\]

\[
I_T=\frac{2-0}{2}(1+5)=6
\]

Error:

\[
6-4.6667=1.3333
\]

### 7.2. Simpson simple
Punto medio \(x=1\):

\[
f(1)=2
\]

\[
I_S=\frac{2-0}{6}(1+4\cdot 2+5)=\frac{2}{6}(14)=\frac{14}{3}
\]

Simpson da el valor exacto porque el integrando es un polinomio de grado 2.

---

## 8. Algoritmo para programar

### 8.1. Trapecio compuesta
1. Leer la función o los datos.
2. Definir \(a\), \(b\) y \(n\).
3. Calcular \(h=(b-a)/n\).
4. Evaluar \(f(x_i)\) en todos los nodos.
5. Sumar con pesos 1, 2, 2, ..., 2, 1.
6. Multiplicar por \(h/2\).

### 8.2. Simpson compuesta
1. Leer la función o los datos.
2. Definir \(a\), \(b\) y un \(n\) **par**.
3. Calcular \(h=(b-a)/n\).
4. Evaluar \(f(x_i)\) en los nodos.
5. Sumar con pesos 1, 4, 2, 4, 2, ..., 4, 1.
6. Multiplicar por \(h/3\).

---

## 9. Pseudocódigo

### Trapecio
```text
leer a, b, n
h = (b - a) / n
suma = f(a) + f(b)
para i = 1 hasta n-1:
    x = a + i*h
    suma = suma + 2*f(x)
I = (h/2)*suma
mostrar I
```

### Simpson
```text
leer a, b, n
si n es impar:
    detener con error
h = (b - a) / n
suma = f(a) + f(b)
para i = 1 hasta n-1:
    x = a + i*h
    si i es impar:
        suma = suma + 4*f(x)
    si i es par:
        suma = suma + 2*f(x)
I = (h/3)*suma
mostrar I
```

---

## 10. Ejemplo en Python

```python
import math


def trapecio_compuesto(f, a, b, n):
    h = (b - a) / n
    suma = f(a) + f(b)
    for i in range(1, n):
        x = a + i * h
        suma += 2 * f(x)
    return (h / 2) * suma


def simpson_compuesto(f, a, b, n):
    if n % 2 != 0:
        raise ValueError("Simpson compuesto requiere n par")
    h = (b - a) / n
    suma = f(a) + f(b)
    for i in range(1, n):
        x = a + i * h
        if i % 2 == 0:
            suma += 2 * f(x)
        else:
            suma += 4 * f(x)
    return (h / 3) * suma


# Ejemplo de uso
f = lambda x: x**2 + 1

print("Trapecio:", trapecio_compuesto(f, 0, 2, 4))
print("Simpson:", simpson_compuesto(f, 0, 2, 4))
```

---

## 11. Idea para explicar en la presentación
Puedes organizar tus diapositivas así:

1. Concepto de integración numérica.
2. ¿Por qué se necesita?
3. Regla del trapecio: idea geométrica y fórmula.
4. Regla de Simpson: idea geométrica y fórmula.
5. Error y precisión.
6. Comparación entre métodos.
7. Implementación en código.
8. Ejemplo numérico.
9. Conclusiones.

---

## 12. Conclusión
La integración numérica permite aproximar integrales cuando resolverlas exactamente es difícil o innecesario. La regla del trapecio es simple y eficiente, mientras que Simpson ofrece mayor precisión para funciones suaves. En programación, ambas reglas son fáciles de implementar y sirven muy bien para mostrar cómo un método matemático puede traducirse a un algoritmo.

