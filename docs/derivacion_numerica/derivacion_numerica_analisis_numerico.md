# Derivación numérica

## 1. Idea general
La derivación numérica es el conjunto de técnicas que permiten **aproximar derivadas** cuando:
- no se conoce la función de forma analítica,
- la función es muy complicada para derivar simbólicamente,
- solo se tienen datos discretos o experimentales,
- se necesita implementar el cálculo en un programa.

En lugar de usar el límite exacto de la derivada, se sustituyen por **cocientes de diferencias finitas** usando valores cercanos de la función.

---

## 2. Definición de derivada
La derivada de una función f en un punto x se define por

f'(x) = lim(h→0) [f(x+h) - f(x)] / h

En derivación numérica, ese límite se reemplaza por un valor pequeño de h, llamado **paso** o **tamaño de paso**.

---

## 3. ¿Por qué es importante?
La derivación numérica aparece en muchas áreas:
- análisis numérico,
- ingeniería,
- física,
- economía,
- ciencia de datos,
- optimización,
- ecuaciones diferenciales,
- procesamiento de señales.

También es la base de muchos métodos para resolver problemas donde la derivada exacta no está disponible.

---

## 4. Métodos principales de diferencias finitas

### 4.1 Diferencia hacia adelante
Aproxima la primera derivada por

f'(x) ≈ [f(x+h) - f(x)] / h

- Usa el valor en x y en x+h.
- Es sencilla de implementar.
- Tiene error de orden O(h).

### 4.2 Diferencia hacia atrás

f'(x) ≈ [f(x) - f(x-h)] / h

- Usa x y x-h.
- También es de orden O(h).
- Es útil cuando no se tienen valores hacia adelante.

### 4.3 Diferencia centrada

f'(x) ≈ [f(x+h) - f(x-h)] / (2h)

- Usa puntos a ambos lados de x.
- Es más precisa que las fórmulas de un solo lado.
- Su error es de orden O(h²).

---

## 5. Aproximación de derivadas de orden superior

### 5.1 Segunda derivada
Una fórmula muy usada es

f''(x) ≈ [f(x+h) - 2f(x) + f(x-h)] / h²

- Tiene error de orden O(h²).
- Se emplea en optimización, física e ինտérpretes de curvatura.

### 5.2 Fórmulas de mayor precisión
Si se usan más puntos, se pueden obtener aproximaciones más exactas.
Por ejemplo, una fórmula centrada de 5 puntos para la primera derivada es:

f'(x) ≈ [f(x-2h) - 8f(x-h) + 8f(x+h) - f(x+2h)] / (12h)

Estas fórmulas reducen el error de truncamiento, aunque usan más evaluaciones de la función.

---

## 6. Orden del método
El **orden de un método** describe cómo disminuye el error cuando h se hace pequeño.

- Orden O(h): error proporcional a h.
- Orden O(h²): error proporcional a h².
- Orden O(h^p): el error disminuye más rápido cuanto mayor es p.

En general, un método de mayor orden suele ser más preciso para el mismo h, pero puede requerir más cálculos.

---

## 7. Error en derivación numérica
Hay dos errores muy importantes:

### 7.1 Error de truncamiento
Ocurre porque se reemplaza una expresión exacta por una aproximación finita.
- Disminuye cuando h se hace pequeño.
- Se estudia con series de Taylor.

### 7.2 Error de redondeo
Aparece por la aritmética de punto flotante de la computadora.
- Si h es demasiado pequeño, f(x+h) y f(x) pueden ser casi iguales.
- La resta de dos números muy parecidos puede perder cifras significativas.

### 7.3 Compromiso entre ambos errores
- Si h es grande, domina el error de truncamiento.
- Si h es muy pequeño, domina el error de redondeo.

Por eso existe un **h óptimo** o paso adecuado, que equilibra ambos efectos.

---

## 8. Idea con series de Taylor
La mayoría de estas fórmulas se deducen expandiendo f(x+h) y f(x-h) con Taylor:

f(x+h) = f(x) + h f'(x) + h²/2! f''(x) + h³/3! f'''(x) + ...

f(x-h) = f(x) - h f'(x) + h²/2! f''(x) - h³/3! f'''(x) + ...

Al sumar o restar estas expresiones, se eliminan términos y se obtiene una fórmula para la derivada deseada.

Ejemplo:
- Restar ambas series produce una fórmula para f'(x).
- Sumar ambas series produce una fórmula para f''(x).

---

## 9. Derivación numérica a partir de datos tabulados
Muchas veces no se tiene una función explícita, solo una tabla:

x:   x0, x1, x2, x3, ...
f(x): y0, y1, y2, y3, ...

En ese caso, la derivada se aproxima usando los valores disponibles y la separación entre puntos.

Esto es muy útil cuando los datos vienen de experimentos, sensores o simulaciones.

---

## 10. Extrapolación de Richardson
La extrapolación de Richardson es una técnica para mejorar la precisión combinando aproximaciones con diferentes pasos.

La idea básica es:
- calcular una aproximación con h,
- calcular otra con h/2,
- combinar ambas para cancelar el error dominante.

Esto puede elevar el orden del método y mejorar mucho la precisión.

---

## 11. Ventajas
- Fácil de implementar.
- Útil cuando no se puede derivar analíticamente.
- Funciona con datos discretos.
- Se adapta a muchos problemas numéricos.

---

## 12. Desventajas
- No da una derivada exacta.
- Muy sensible al tamaño del paso h.
- Puede amplificar ruido en los datos.
- La resta de valores cercanos puede causar pérdida de precisión.

---

## 13. Aplicaciones
- cálculo de velocidades y aceleraciones a partir de posición,
- estimación de pendientes en datos medidos,
- métodos numéricos para ecuaciones diferenciales,
- búsqueda de máximos y mínimos,
- optimización y machine learning,
- análisis de señales y física computacional.

---

## 14. Algoritmo básico para programar la derivación numérica

### Entrada
- función f,
- punto x,
- paso h,
- tipo de fórmula: hacia adelante, hacia atrás o centrada.

### Proceso
1. Evaluar f en los puntos necesarios.
2. Aplicar la fórmula elegida.
3. Mostrar el valor aproximado de la derivada.

### Salida
- aproximación de f'(x) o f''(x).

---

## 15. Pseudocódigo

```text
leer x, h
leer opcion
si opcion = 1 entonces
    derivada = (f(x+h) - f(x)) / h
si opcion = 2 entonces
    derivada = (f(x) - f(x-h)) / h
si opcion = 3 entonces
    derivada = (f(x+h) - f(x-h)) / (2*h)
mostrar derivada
```

---

## 16. Ejemplo en Python

```python
def f(x):
    return x**3 + 2*x**2 - x + 1

def derivada_adelante(f, x, h):
    return (f(x + h) - f(x)) / h

def derivada_atras(f, x, h):
    return (f(x) - f(x - h)) / h

def derivada_centrada(f, x, h):
    return (f(x + h) - f(x - h)) / (2 * h)

def segunda_derivada(f, x, h):
    return (f(x + h) - 2*f(x) + f(x - h)) / (h**2)

x = 2.0
h = 0.001

print("Adelante:", derivada_adelante(f, x, h))
print("Atrás:", derivada_atras(f, x, h))
print("Centrada:", derivada_centrada(f, x, h))
print("Segunda derivada:", segunda_derivada(f, x, h))
```

---

## 17. Ejemplo matemático
Sea

f(x) = x²

La derivada exacta es

f'(x) = 2x

En x = 1 y h = 0.1:

f'(1) ≈ [f(1.1) - f(1)] / 0.1
      = [1.21 - 1] / 0.1
      = 2.1

La derivada exacta vale 2, así que la aproximación tiene un pequeño error.

---

## 18. Ideas para la presentación
Una exposición sobre derivación numérica puede organizarse así:
1. definición de derivada,
2. necesidad de aproximación numérica,
3. diferencias finitas,
4. error de truncamiento y redondeo,
5. comparación entre fórmulas,
6. ejemplo manual,
7. ejemplo en Python,
8. conclusiones.

---

## 19. Conclusión
La derivación numérica es una herramienta esencial del análisis numérico porque permite aproximar derivadas de forma práctica y computacional. Su eficacia depende mucho del paso h, del método elegido y de la cantidad de puntos usados. Las fórmulas centradas y las de mayor orden suelen ser más precisas, pero siempre hay que equilibrar precisión y estabilidad numérica.

