# Errores y aproximaciones numéricas

## 1. Idea general
En **Análisis Numérico**, casi nunca se obtiene una solución exacta con computadora. En su lugar, se construyen **aproximaciones** y se estudia qué tan buena es la respuesta.

Este tema responde a tres preguntas clave:

1. **¿De dónde sale el error?**
2. **¿Qué tan grande es?**
3. **¿Cómo se controla o reduce?**

---

## 2. Conceptos básicos

### 2.1 Error absoluto
Si el valor exacto es \(x\) y el valor aproximado es \(\tilde{x}\), el error absoluto es:

\[
E_a = |x - \tilde{x}|
\]

Mide la distancia directa entre el valor verdadero y el aproximado.

### 2.2 Error relativo
\[
E_r = \frac{|x - \tilde{x}|}{|x|}
\]

Es más útil cuando el tamaño del valor importa, porque compara el error con el valor real.

### 2.3 Error porcentual
\[
E_\% = E_r \times 100\%
\]

### 2.4 Cifra significativa
Una aproximación tiene más calidad cuando conserva más cifras significativas correctas. En análisis numérico, esto se relaciona con el error relativo.

---

## 3. Precisión, exactitud y confiabilidad

- **Precisión**: cuántos dígitos o cuánta resolución se usa en el cálculo.
- **Exactitud**: qué tan cerca está el resultado del valor verdadero.
- **Confiabilidad**: si el método produce resultados razonables de forma consistente.

En computación, un resultado puede ser muy preciso pero poco exacto si el problema o el algoritmo son inestables.

---

## 4. Fuentes de error en cómputo numérico

### 4.1 Error de redondeo (roundoff)
Aparece porque la computadora no puede representar todos los números reales exactamente. Por ejemplo, muchos decimales periódicos o números con muchas cifras deben almacenarse con un número finito de dígitos.

Ejemplo típico:
- \(1/3 = 0.333333\ldots\)
- La computadora guarda una versión truncada o redondeada.

### 4.2 Error de truncamiento
Sucede cuando se reemplaza un objeto exacto por una versión finita o parcial.

Ejemplos:
- cortar una serie de Taylor después de algunos términos,
- reemplazar una derivada por una diferencia finita,
- usar un método iterativo y detenerlo antes de converger.

### 4.3 Error de discretización
Se presenta al convertir un problema continuo en uno discreto, por ejemplo:
- una integral por suma de rectángulos o trapecios,
- una ecuación diferencial por pasos finitos.

### 4.4 Error de propagación
Un pequeño error de entrada puede ampliarse durante el proceso de cálculo.

### 4.5 Error de cancelación
Ocurre cuando se restan dos números muy parecidos. Se pierden cifras significativas y el resultado puede quedar muy inexacto.

Ejemplo:
\[
1000001 - 1000000 = 1
\]
Si los números se aproximan con pocos dígitos, la resta puede perder precisión.

### 4.6 Error de terminación
En métodos iterativos, se produce cuando el proceso se detiene antes de alcanzar la tolerancia deseada.

---

## 5. Error total
En muchos problemas, el error total puede verse como la combinación de:

\[
\text{Error total} \approx \text{error de truncamiento} + \text{error de redondeo}
\]

En la práctica, reducir uno demasiado puede aumentar el otro. Por ejemplo, al disminuir el tamaño de paso \(h\), el truncamiento baja, pero aumentan los cálculos y puede crecer el redondeo.

---

## 6. Aproximaciones numéricas

### 6.1 ¿Qué es aproximar?
Aproximar es reemplazar una función, número o solución exacta por otra más fácil de calcular.

### 6.2 ¿Por qué se aproxima?
Porque muchas veces:
- no existe solución exacta cerrada,
- la solución exacta es muy costosa,
- el problema real solo se conoce con datos aproximados.

### 6.3 Ejemplos de aproximación
- Polinomios de Taylor.
- Interpolación polinómica.
- Integración numérica.
- Derivación numérica.
- Resolución numérica de ecuaciones diferenciales.

---

## 7. Aproximación con series de Taylor

La serie de Taylor permite aproximar una función alrededor de un punto \(a\):

\[
f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots
\]

Si se corta después de \(n\) términos, aparece el **resto** o **error de truncamiento**.

### 7.1 Polinomio de Taylor de grado 1
\[
f(x) \approx f(a) + f'(a)(x-a)
\]

### 7.2 Polinomio de Taylor de grado 2
\[
f(x) \approx f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2
\]

### 7.3 Importancia del resto
El resto da una cota del error de aproximación. Es una herramienta esencial para justificar métodos numéricos.

---

## 8. Cota del error
Una **cota** indica un límite superior del error.

Ejemplo general:
\[
|\text{error}| \leq C h^p
\]

donde:
- \(h\) es el tamaño de paso,
- \(p\) es el orden del método,
- \(C\) es una constante.

Esto permite comparar métodos:
- mayor \(p\) suele significar mayor exactitud,
- menor \(h\) suele reducir el error de truncamiento.

---

## 9. Condicionamiento del problema

El **condicionamiento** mide qué tan sensible es el problema a pequeñas perturbaciones en los datos.

- **Bien condicionado**: pequeños cambios en la entrada producen pequeños cambios en la salida.
- **Mal condicionado**: pequeños cambios en la entrada pueden producir grandes cambios en la salida.

Esto no depende del algoritmo, sino del problema matemático.

### Ejemplo intuitivo
Resolver un sistema lineal con una matriz casi singular puede ser muy sensible a errores pequeños en los datos.

---

## 10. Estabilidad del algoritmo

La **estabilidad** describe cómo se comporta el algoritmo frente a los errores de redondeo o perturbaciones durante el cálculo.

- Un algoritmo estable controla bien el crecimiento del error.
- Un algoritmo inestable puede amplificar errores pequeños hasta volver el resultado poco confiable.

### Idea importante
Un problema puede estar bien condicionado, pero un algoritmo inestable puede dar malos resultados.

---

## 11. Relación entre condicionamiento, estabilidad y error

- **Condicionamiento**: propiedad del problema.
- **Estabilidad**: propiedad del algoritmo.
- **Error**: diferencia entre la aproximación y el valor exacto.

Una buena forma de pensar esto es:

> problema sensible + algoritmo inestable = resultados peligrosos

> problema estable + algoritmo estable = resultados confiables

---

## 12. Ejemplo clásico de cancelación

Supón que quieres calcular:

\[
\sqrt{x+1} - \sqrt{x}
\]

para \(x\) muy grande.

Esta resta puede sufrir cancelación porque ambas raíces son casi iguales. Una forma más estable es racionalizar:

\[
\sqrt{x+1} - \sqrt{x} = \frac{1}{\sqrt{x+1} + \sqrt{x}}
\]

La expresión equivalente evita restar números casi iguales.

---

## 13. Métodos de aproximación más importantes

### 13.1 Derivación numérica
Aproxima derivadas con diferencias finitas.

- Adelante:
\[
f'(x) \approx \frac{f(x+h)-f(x)}{h}
\]

- Atrás:
\[
f'(x) \approx \frac{f(x)-f(x-h)}{h}
\]

- Central:
\[
f'(x) \approx \frac{f(x+h)-f(x-h)}{2h}
\]

La diferencia central suele ser más exacta que las unilaterales.

### 13.2 Integración numérica
Aproxima integrales definidas.

- Regla del trapecio
- Regla de Simpson

Ambas sustituyen la curva por aproximaciones más simples.

### 13.3 Ecuaciones diferenciales
Métodos como Euler y Runge-Kutta aproximan soluciones paso a paso.

---

## 14. Orden de un método
El orden indica cómo disminuye el error al reducir \(h\).

- Orden 1: error proporcional a \(h\)
- Orden 2: error proporcional a \(h^2\)
- Orden 4: error proporcional a \(h^4\)

Cuanto mayor es el orden, más rápido baja el error cuando disminuye el paso.

---

## 15. Idea para presentarlo en clase

Puedes estructurarlo así:

1. Definición de error y aproximación.
2. Error absoluto, relativo y porcentual.
3. Fuentes de error.
4. Truncamiento vs redondeo.
5. Taylor como base de aproximaciones.
6. Condicionamiento y estabilidad.
7. Ejemplo en Python.
8. Conclusiones.

---

## 16. Ejemplo en Python

```python
import math

# Valor exacto y aproximado
x_real = math.sqrt(2)
x_aprox = 1.414

# Errores
error_absoluto = abs(x_real - x_aprox)
error_relativo = error_absoluto / abs(x_real)
error_porcentual = error_relativo * 100

print("Valor real:", x_real)
print("Valor aproximado:", x_aprox)
print("Error absoluto:", error_absoluto)
print("Error relativo:", error_relativo)
print("Error porcentual:", error_porcentual)
```

### Ejemplo de cancelación y reescritura estable

```python
import math

x = 10**8

# Forma propensa a cancelación
forma_directa = math.sqrt(x + 1) - math.sqrt(x)

# Forma más estable
forma_estable = 1 / (math.sqrt(x + 1) + math.sqrt(x))

print("Directa:", forma_directa)
print("Estable:", forma_estable)
```

### Aproximación por Taylor de e^x cerca de 0

```python
import math

def taylor_exp(x, n):
    s = 0.0
    for k in range(n + 1):
        s += x**k / math.factorial(k)
    return s

x = 1
for n in [1, 2, 3, 5, 10]:
    aprox = taylor_exp(x, n)
    error = abs(math.exp(x) - aprox)
    print(n, aprox, error)
```

---

## 17. Pseudocódigo para una presentación

### Cálculo de error

1. Ingresar valor real \(x\)
2. Ingresar valor aproximado \(\tilde{x}\)
3. Calcular \(|x - \tilde{x}|\)
4. Calcular \(|x - \tilde{x}| / |x|\)
5. Mostrar resultados

### Método general de análisis de error

1. Definir el problema.
2. Identificar el tipo de aproximación.
3. Estimar el error de truncamiento.
4. Revisar redondeo y cancelación.
5. Verificar estabilidad.
6. Comparar resultados numéricos.

---

## 18. Conclusiones

- En análisis numérico, el objetivo no es solo obtener una respuesta, sino medir su calidad.
- Los errores más importantes suelen ser redondeo, truncamiento, cancelación y propagación.
- La aproximación es inevitable, pero puede controlarse con buenas fórmulas, pasos adecuados y algoritmos estables.
- Taylor, diferencias finitas, reglas de integración y métodos iterativos son herramientas centrales para construir aproximaciones.
- Saber distinguir entre condicionamiento y estabilidad ayuda a entender por qué un resultado numérico puede ser confiable o no.

---

## 19. Ideas de cierre para tu exposición

Puedes cerrar con una frase como:

> "El análisis numérico no busca reemplazar la matemática exacta, sino construir soluciones útiles, rápidas y controladas para problemas que en la práctica no se resuelven de forma simbólica."

