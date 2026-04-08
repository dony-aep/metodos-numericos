# Método de la Secante

## Resumen ejecutivo  
El **método de la secante** es una técnica iterativa para encontrar raíces de funciones reales **f(x)=0**. Se basa en aproximar la derivada mediante la pendiente de la *recta secante* que une dos puntos sucesivos de la función【6†L140-L147】【38†L25-L33】. A partir de dos aproximaciones iniciales \(x_0,x_1\), la iteración general es: 

\[
x_{n+1} = x_n - f(x_n)\,\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}\,,
\]

lo cual se deduce de la fórmula de Newton-Raphson reemplazando \(f'(x_n)\approx (f(x_n)-f(x_{n-1}))/(x_n-x_{n-1})\)【16†L255-L262】【38†L25-L33】. Geométricamente, cada paso corresponde a trazar la recta que pasa por \((x_{n-1},f(x_{n-1}))\) y \((x_n,f(x_n))\) (“secante”) y tomar su intersección con el eje \(x\) como nueva aproximación【6†L174-L183】【38†L25-L33】.  

En cuanto a la **convergencia**, el método de la secante tiene orden asintótico \(\varphi=(1+\sqrt{5})/2\approx1.618\)【6†L189-L197】【22†L229-L231】 (convergencia *superlineal*, inferior a la convergencia cuadrática de Newton). Esto implica que, cerca de una raíz simple, el error decae aproximadamente como \(|e_{n+1}|\approx C\,|e_n|^\varphi\) para alguna constante \(C\). En la práctica, si las aproximaciones iniciales están suficientemente cerca de la raíz y ésta es simple ( \(f'(r)\neq0\) ), el método converge rápido; de lo contrario puede fallar o divergir al igual que Newton【6†L195-L199】【22†L229-L231】. Entre las ventajas destaca que **no requiere evaluar derivadas**, sólo la función \(f\), por lo que en problemas donde calcular \(f'\) es costoso o impracticable puede resultar más eficiente【17†L228-L233】【22†L229-L231】. Sus principales desventajas son la *falta de garantía de convergencia* (es un método “abierto” sin acotamiento de intervalo) y que precisa dos estimaciones iniciales.  

En comparación con otros métodos: la **bisección** es mucho más robusta (siempre converge cuando hay cambio de signo en un intervalo) pero converge linealmente y suele requerir más iteraciones【17†L205-L213】. El **método de Newton-Raphson** converge más rápidamente (cuadráticamente) que la secante, pero exige el cálculo de \(f'\) en cada paso, mientras que la secante sólo evalúa \(f\)【17†L228-L233】【6†L195-L199】. Debido a esto, en la práctica la secante puede superar a Newton en velocidad computacional cuando \(f'\) es caro o no está disponible. En la siguiente tabla se resumen estas diferencias:

| Método           | Orden de convergencia       | Requiere derivada | Garantía/Robustez                | Comentarios clave                                                                 |
|------------------|-----------------------------|-------------------|----------------------------------|------------------------------------------------------------------------------------|
| Bisección        | 1 (lineal, razón 1/2)       | No                | *Garantizada* (bracketing)       | Siempre converge si \(f(a)f(b)<0\); lento (divide intervalo en mitades)【17†L205-L213】. |
| Newton-Raphson   | 2 (cuadrático)             | Sí                | Local (necesita buen inicio)     | Convergencia muy rápida cerca de la raíz; puede divergir si \(f'\) cambia de signo o no se elige bien \(x_0\)【17†L228-L233】【6†L195-L199】. |
| Secante          | \(\approx1.618\) (φ) superlin. | No (solo \(f\))    | Local (condiciones similares a Newton) | Requiere dos puntos iniciales; más rápido que bisección, más lento que Newton; converge si inicio es razonable【6†L189-L197】【22†L229-L231】. |

## Definición, interpretación geométrica y derivación  
En **análisis numérico**, el método de la secante se define como un algoritmo iterativo para encontrar ceros de una función \(f:\mathbb R\to\mathbb R\)【6†L140-L147】. La derivación clásica se obtiene aproximando la derivada por diferencias finitas. Dada la fórmula de Newton-Raphson 

\[
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)},
\]

se sustituye \(f'(x_n)\approx\frac{f(x_n)-f(x_{n-1})}{x_n-x_{n-1}}\)【38†L25-L33】. Después de simplificar, se obtiene la relación de recurrencia del método de la secante: 

\[
x_{n+1} \;=\; x_n - f(x_n)\,\frac{x_n - x_{n-1}}{f(x_n)-f(x_{n-1})} 
\;=\; \frac{x_{n-1}\,f(x_n) - x_n\,f(x_{n-1})}{f(x_n)-f(x_{n-1})}.
\]

Como se observa, cada nuevo iterado \(x_{n+1}\) se construye interceptando con el eje \(x\) la *recta secante* que pasa por \((x_{n-1},f(x_{n-1}))\) y \((x_n,f(x_n))\). En la Fig. 1 (ilustrativa) se aprecia este proceso: se parte de \(x_0,x_1\), se traza la secante y se obtiene \(x_2\), y así sucesivamente.

```mermaid
flowchart TD
    A[Inicio: dos estimaciones iniciales \(x_0,x_1\)] --> B{Denominador \\ \(f(x_1)-f(x_0)\)?}
    B -- No es 0 --> C[Calcular \(x_2 = x_1 - f(x_1)\frac{x_1-x_0}{f(x_1)-f(x_0)}\)]
    B -- =0 --> D[Error: pendiente nula (terminar o reajustar)]
    C --> E{¿\(|x_2 - x_1| < \text{tol}\)?}
    E -- Sí --> F[Detener: raíz aproximada \(x_2\)]
    E -- No --> G[Actualizar: \(x_0\leftarrow x_1,\;x_1\leftarrow x_2\)]
    G --> B
```
<center><small>**Figura 1:** Diagrama de flujo simplificado del método de la secante.</small></center>

Nótese que el método exige dos valores iniciales \(x_0,x_1\) para comenzar la iteración【6†L162-L170】【16†L260-L262】. Su analogía geométrica explica por qué a veces se le llama “Newton sin derivadas”: en cada paso se acerca a la raíz usando la pendiente de la secante en lugar de la tangente【6†L143-L151】【38†L25-L33】. No se requieren intervalos acotados (*no es un método de intervalos fijos*), y por ello no garantiza convergencia global; se considera un método abierto.

## Análisis de convergencia  
En un entorno favorable (función suave y raíces simples), el método de la secante **converge superlinealmente** de orden \(\varphi=(1+\sqrt5)/2\approx1.618\)【6†L189-L197】【22†L229-L231】. Esto significa que el error asintótico satisface \(\lim_{n\to\infty} |x_{n+1}-r|/|x_n-r|^\varphi = C\) para la raíz \(r\). El factor exacto depende de \(f'\) y \(f''\) en la raíz, pero típicamente basta saber que \(\varphi>1\) indica velocidad intermedia entre lineal y cuadrática. En cambio, la convergencia es **lineal** (razón \(1/2\) por iteración) para bisección, y **cuadrática** (orden 2) para Newton. Por esto Newton supera en velocidad a la secante, aunque a costa de evaluar derivadas【17†L228-L233】【6†L189-L197】.

Los *criterios de convergencia* típicos son similares a los de otros métodos iterativos: se detiene cuando el cambio \(|x_{n+1}-x_n|\) cae por debajo de una tolerancia prescrita, o cuando \(|f(x_{n+1})|\) es suficientemente pequeño. Sin embargo, a diferencia de la bisección, no existe una cota a priori del error en función del número de iteraciones, debido a la ausencia de intervalo acotado【25†L131-L139】. En la práctica, se supervisan ambas cantidades (cambio en \(x\) y valor residual) y se fija un máximo de iteraciones.

El método **no asegura convergencia** en general, particularmente si las suposiciones no se cumplen【6†L195-L199】【22†L229-L231】. Se requiere que las aproximaciones iniciales estén “razonablemente cercanas” a la raíz y que \(f'(r)\neq0\). Además, conviene que la pendiente de la recta secante no se anule ni sea extremadamente pequeña (caso en que la línea sería casi horizontal y no cortaría el eje \(x\) de forma estable)【38†L53-L59】. Si \(f(x_n)\) y \(f(x_{n-1})\) tienen signos distintos, la secante corta el eje entre ellos (similar a la regla falsa), pero el método **no exige** cambio de signo previo (no opera con intervalos acotados), por lo que puede saltar fuera de la región de la raíz.

En resumen, **orden de convergencia**: \(\varphi\approx1.618\) (no garantizado si la raíz no es simple)【6†L189-L197】【22†L229-L231】. **Estimación de error**: asintóticamente \(|x_{n+1}-r|\approx K|x_n-r|^\varphi\), pero en la práctica se controla iterativamente. **Condiciones**: función continua, raíz simple, evaluaciones iniciales cercanas. Véase, por ejemplo, Ortega & Rheinboldt (1970) o Burden & Faires (2011) para análisis riguroso (no citados aquí).

## Comparación con Newton-Raphson y bisección  
El método de la secante combina elementos de Newton y de la regla falsa. En la práctica:

- **Newton-Raphson**: Convergencia cuadrática (orden 2) frente a 1.618 de la secante【17†L228-L233】. Newton requiere conocer \(f'(x)\) en cada paso, lo cual puede ser costoso o inviable. La secante reemplaza esta derivada por diferencias finitas, sacrificando un poco de velocidad por no necesitar derivada【17†L228-L233】【16†L255-L262】. Newton típicamente necesita una sola aproximación inicial, mientras que la secante necesita dos. Ambos métodos son locales (sin bracketing), por lo que comparten riesgos: divergencia si los puntos iniciales están mal elegidos.  

- **Bisección**: Es un método de intervalos con convergencia lineal garantizada. Es mucho más lento numéricamente (requiere dividir el intervalo repetidamente)【17†L205-L213】. Sin embargo, es robusto: si \(f(a)f(b)<0\), asegura convergencia. La secante suele requerir **muchas menos iteraciones** que la bisección para la misma precisión, pues aprovecha la forma de la función. En la tabla siguiente se resumen ventajas y desventajas clave:

| Método        | Orden de conv.    | Derivada requerida | Robustez (garantía)           | Ventajas / Desventajas principales                                                                           |
|---------------|-------------------|--------------------|-------------------------------|-------------------------------------------------------------------------------------------------------------|
| Newton        | 2 (cuadrático)    | Sí                 | Local (sin garantía global)   | Muy rápido cercano a raíz; rápido crecimiento si \(f'\) se anula; requiere buen \(x_0\).                     |
| Secante       | ~1.618 (superlin.)| No                 | Local (sin garantía)         | Solo evalúa \(f\) (no \(f'\)); usualmente menos iteraciones que bisección; puede divergir si inicio pobre.   |
| Bisección     | 1 (lineal)        | No                 | Garantizada con cambio de signo | Convergencia lenta; siempre converge si existe cambio de signo; fácil de implementar.                     |

En conclusión, la secante suele considerarse un compromiso práctico: es más rápida que la bisección y más general que Newton cuando no se dispone de derivadas【17†L205-L213】【17†L228-L233】. Sin embargo, como sucede con Newton, **no garantiza convergencia global** y su comportamiento puede ser errático si los puntos iniciales son inapropiados【6†L195-L199】【38†L53-L59】. Una alternativa segura es emplear un método híbrido (por ejemplo, comenzar con bisección hasta enmarcar la raíz y luego aplicar la secante) o usar métodos avanzados como *Brent* o *Dekker*, que combinan bisección, interpolación y reglas de falsa posición para mayor robustez.

## Ejemplos numéricos  
A continuación se muestran ejemplos ilustrativos de iteraciones concretas del método de la secante, con tablas de iterados y errores.

**Ejemplo 1:** Buscar la raíz de \(f(x)=x^3 + 2x^2 + 10x - 20\) iniciando en \(x_0=0,\;x_1=1\). Se aplican iteraciones hasta alcanzar \(|x_{n+1}-x_n|<10^{-3}\). Los resultados son (tomados de 【17†L259-L268】 y confirmados con Python):

| \(n\) | \(x_n\)     | \(|x_{n+1}-x_n|\) |
|:-----:|------------:|-------------------|
| 0     | 0.000000    | —                 |
| 1     | 1.000000    | 1.000000          |
| 2     | 1.538462    | 0.538462          |
| 3     | 1.350311    | 0.188151          |
| 4     | 1.367917    | 0.017606          |
| 5     | 1.368813    | 0.000896          |
| **6** | **1.368808**| **0.000005**      |

Tras 5 iteraciones adicionales (hasta \(n=6\)), la aproximación se estabiliza en \(x\approx1.368808\) con tolerancia \(10^{-3}\)【17†L259-L268】. Nótese que converge rápidamente cerca de la raíz.  

**Ejemplo 2:** Resolver \(f(x)=x^3 + x + 16=0\) con \(x_0=-3,\;x_1=-2\). Se detiene cuando \(|x_{n+1}-x_n|<10^{-4}\). Las primeras iteraciones son (calculadas manualmente en 【19†L126-L134】【19†L147-L155】):

| \(n\) | \(x_n\)       | \(|x_{n+1}-x_n|\)  |
|:-----:|--------------:|-------------------:|
| 0     | \(-3.000000\) | —                  |
| 1     | \(-2.000000\) | 1.000000           |
| 2     | \(-2.750000\) | 0.750000           |
| 3     | \(-2.330000\) | 0.420000           |
| 4     | \(-2.379000\) | 0.049000           |
| 5     | \(-2.387000\) | 0.008000           |

Finalmente la raíz aproximada es \(x\approx -2.3870\) (error relativo ~0.33% en la iteración 5)【19†L223-L231】. Se aprecia que la convergencia se acelera: después de caer la magnitud del error al orden \(10^{-2}\), pronto se acerca a la raíz.  

**Ejemplo 3:** Encontrar la raíz de \(f(x)=e^x - 2\) (solución exacta \(\ln2\approx0.693147\)) con \(x_0=0,\;x_1=1\). Iterando hasta \(\tol=10^{-6}\) da:

| \(n\) | \(x_n\)    | \(|x_{n+1}-x_n|\) |
|:-----:|-----------:|-------------------|
| 0     | 0.000000   | —                 |
| 1     | 1.000000   | 1.000000          |
| 2     | 0.581977   | 0.418023          |
| 3     | 0.676693   | 0.094716          |
| 4     | 0.694081   | 0.017388          |
| 5     | 0.693139   | 0.000942          |
| 6     | 0.693147   | 0.000008          |
| **7** | **0.693147**| **0.000000**      |

Observamos que en \(n=6\) ya se cumple la tolerancia deseada. El método alcanzó la raíz con alta precisión en pocas iteraciones.  

Estos ejemplos ilustran el procedimiento **punto por punto** y muestran que el error disminuye rápidamente cuando se empieza cerca de la raíz, lo cual concuerda con la convergencia superlineal descrita. En cada iteración se calcula \(x_{n+1}\) según la fórmula secante y se evalúan la diferencia \(|x_{n+1}-x_n|\) o \(|f(x_{n+1})|\) para decidir si detenerse. 

## Implementaciones en Python, MATLAB y C  

El algoritmo es fácil de codificar en distintos lenguajes. A continuación se presenta un bosquejo (pseudocódigo) y luego implementaciones típicas:

1. **Pseudocódigo general:**  
   - Dado \(f\), puntos iniciales \(x_0,x_1\), tolerancia `tol`, máximo de iteraciones `maxit`.  
   - Si \(f(x_0)=f(x_1)\), abortar (división por cero).  
   - Para \(k=1,2,\dots\):  
     - Calcular \(x_2 = x_1 - f(x_1)\frac{x_1-x_0}{f(x_1)-f(x_0)}\).  
     - Si \(|x_2-x_1|<\text{tol}\) o \(|f(x_2)|<\text{tol}\), retornar \(x_2\).  
     - De otro modo, actualizar \(x_0\leftarrow x_1,\;x_1\leftarrow x_2\) y continuar.  
   - Si se alcanza `maxit` sin converger, informar fallo.  

Este esquema se puede expresar en código de diversas maneras. Por ejemplo, en **Python** se podría escribir:  

```python
def secante(f, x0, x1, tol=1e-6, maxit=100):
    """Encuentra raíz de f usando el método de la secante."""
    fx0 = f(x0); fx1 = f(x1)
    if fx0 * fx1 > 0:
        print("Advertencia: f(x0) y f(x1) tienen mismo signo.")
    for i in range(maxit):
        if fx1 == fx0:
            raise ZeroDivisionError("División por cero en secante: f(x0)=f(x1).")
        # Fórmula de la secante
        x2 = x1 - fx1*(x1 - x0)/(fx1 - fx0)
        if abs(x2 - x1) < tol:
            return x2
        x0, x1 = x1, x2
        fx0, fx1 = fx1, f(x1)
    raise RuntimeError("No convergió en el número máximo de iteraciones.")
```

En **MATLAB** (o Octave) la implementación típica es:  

```matlab
function x = secante(f, x0, x1, tol, maxit)
    if nargin < 4, tol = 1e-6; end
    if nargin < 5, maxit = 100; end
    fx0 = f(x0); fx1 = f(x1);
    for k = 1:maxit
        if fx1 == fx0
            error('División por cero: f(x0)=f(x1).');
        end
        x2 = x1 - fx1*(x1 - x0)/(fx1 - fx0);   % iteración secante
        if abs(x2 - x1) < tol
            x = x2; return;
        end
        x0 = x1; fx0 = fx1; 
        x1 = x2; fx1 = f(x1);
    end
    error('No convergió en %d iteraciones.', maxit);
end
```

Y en **C** (esquemáticamente) podría ser:  

```c
double secante(double (*f)(double), double x0, double x1, double tol, int maxit) {
    double f0 = f(x0), f1 = f(x1), x2;
    for(int k=0; k<maxit; k++) {
        if (fabs(f1 - f0) < 1e-12) {
            fprintf(stderr, "División por cero en método secante.\n");
            return x1;
        }
        x2 = x1 - f1*(x1 - x0)/(f1 - f0);
        if (fabs(x2 - x1) < tol) return x2;
        x0 = x1; f0 = f1;
        x1 = x2; f1 = f(x1);
    }
    fprintf(stderr, "No convergió en %d iteraciones.\n", maxit);
    return x1;
}
```

**Comentarios sobre estabilidad y criterio de paro:** En todas las implementaciones anteriores se revisa el cambio en la iteración \(|x_{n+1}-x_n|\) y se fija una tolerancia. También es aconsejable chequear \(|f(x_n)|<\) tol para mayor seguridad. Conviene evitar divisiones por cero comprobando que \(f(x_1)\neq f(x_0)\) antes de calcular cada nueva iteración. Como se ve, la mayor vulnerabilidad numérica ocurre cuando \(f(x_n)\approx f(x_{n-1})\), lo que produce un denominador muy pequeño y saltos erráticos en \(x_{n+1}\). En tales casos puede ser útil reacomodar los puntos o interrumpir la iteración. En entornos reales se suele combinar la secante con un método de bisección o regula falsa (**métodos híbridos**) para garantizar convergencia.  

## Peligros comunes y estrategias (bracketing, híbridos, iniciales)  
El método de la secante, al no exigir un intervalo acotado, puede exhibir varios modos de falla:  
- **Choque de denominador:** Si en algún paso \(f(x_n)=f(x_{n-1})\), la fórmula se indetermina. Esto suele ocurrir cuando el método se atasca en un punto donde la secante es horizontal. Se debe entonces reiniciar con otras estimaciones o abortar.  
- **No convergencia:** Al igual que Newton, la secante puede divergir si los puntos iniciales no están cerca de una raíz o si la raíz es múltiple. Por ejemplo, para funciones con inflexiones o raíces múltiples el orden \(\approx1.618\) puede incluso caer a lineal o peor.  
- **Oscilaciones:** A veces las iteraciones oscilan sin converger. Esto puede suceder si \(f\) cambia muy rápido o si se “salta” la raíz.  

**Estrategias de mitigación:**  
- **Bracketing inicial:** Aunque la secante no exige un cambio de signo, es buena práctica escoger \(x_0,x_1\) dentro de un intervalo donde \(f(x)\) cambia de signo, así se incrementa la probabilidad de encontrar una raíz real cercana.  
- **Híbridos con bisección/regula falsa:** Una estrategia común es aplicar inicialmente algunos pasos de bisección (o regla falsa modificada) para acercarse al cero con garantía, y luego cambiar al método de la secante para acelerar la convergencia. Esto combina robustez con rapidez. 
- **Selección de inicios:** A veces se elige uno de los puntos iniciales como la última aproximación del método anterior (por ejemplo, aplicar Newton y cuando \(f'\) se anule cambiar a secante). En entornos donde se usan varios métodos (como en [`fzero` de MATLAB](https://www.mathworks.com/help/matlab/ref/fzero.html) o en **Brent’s method**), la secante se usa en cuanto es seguro hacerlo. 
- **Detección de falla:** Se debe limitar el número de iteraciones y comprobar el progreso. Si el método no reduce el error después de varias iteraciones, es mejor interrumpir y probar otra táctica (nuevo par inicial, cambio de método, etc.).  

En resumen, el método de la secante **padece los mismos riesgos de no convergencia** que Newton-Raphson cuando se usa aisladamente【6†L195-L199】【38†L53-L59】, por lo que en aplicaciones críticas se suele acompañar de estrategias de respaldo. No obstante, su sencillez y buena velocidad en muchos casos lo hacen muy útil en práctica.

## Recursos didácticos y bibliografía recomendada  
Para preparar la presentación se pueden consultar diversos recursos en español, entre ellos apuntes y libros. Se destacan:

- **Apuntes universitarios**: Ejemplos incluyen los apuntes de Métodos Numéricos de la Facultad de Ingeniería (UNMdP)【38†L25-L33】【38†L53-L59】, u otros cursos como los de la UNAM.  
- **Libros de texto**: Capítulos dedicados a métodos de raíces en textos clásicos (ver *Análisis Numérico* de Burden & Faires, Ortega & Rheinboldt, Quarteroni et al.). Aunque muchas ediciones son en inglés, existen traducciones al español de algunos de estos.  
- **Artículos y tesis**: Para análisis avanzado se puede consultar trabajos especializados (por ejemplo, la tesis de Moysi-Amieva sobre métodos tipo secante【12†L25-L33】).  
- **Tutoriales en línea y videos**: Páginas web y blogs de matemáticas (por ejemplo AnalyticsLane【24†L75-L84】) y videos en YouTube explican el método con ejemplos didácticos. Sin embargo, es esencial verificar la exactitud matemática de fuentes informales.  
- **Software científico**: MATLAB (función `fzero`), Python (SciPy), GNU Octave, etc., contienen implementaciones robustas del método de la secante que pueden estudiarse. En MATLAB Central File Exchange existen códigos (por ejemplo, [**Secante-MatLab** de 2024】) que muestran implementaciones y permiten comprender detalles prácticos.  

Para la bibliografía formal se recomienda citar fuentes primarias y libros de texto reconocidos. Algunos títulos útiles (no todos en español) son:  
- Atkinson, K. (2008), *Análisis Numérico* (cap. raíces no lineales).  
- Burden, R.L. & Faires, J.D. (2011), *Análisis Numérico* (cap. 9, métodos de raíces).  
- Ortega, J.M. & Rheinboldt, W.C. (2000), *Iterative Solution of Nonlinear Equations*.  
- Saad, Y. (2003), *Iterative Methods for Sparse Linear Systems* (para perspectiva iterativa general).  
- Recursos en español como “Métodos Numéricos” de Excel-M (versiones locales).  

## Estructura sugerida de la presentación y demos visuales  
Para la exposición en diapositivas, conviene seguir un esquema lógico:  
1. **Introducción**: Presentar el problema de encontrar raíces. Mencionar brevemente Newton y necesidad de métodos sin derivadas.  
2. **Definición y deducción**: Mostrar la derivación desde Newton a la secante con fórmulas, apoyado en un diagrama sencillo (Fig. 1).  
3. **Análisis de convergencia**: Explicar el orden \(\varphi\approx1.618\), condiciones de validez y diferencias con otros métodos (usar la tabla comparativa).  
4. **Ejemplos numéricos**: Incluir al menos dos ejemplos con tablas de iteración (como los anteriores), indicando criterios de paro. Se pueden presentar gráficas ilustrativas de la función y la convergencia.  
5. **Código e implementación**: Mostrar fragmentos de código (en Python/MATLAB) comentados, recalcando robustez (ver secuencia que se mostraba en la sección anterior).  
6. **Ventajas, desventajas y casos especiales**: Listar brevemente los pros/contras. Mencionar estrategias de fallback (regla falsa, híbridos).  
7. **Conclusiones**: Resumen de cuándo conviene usar la secante. 

Para las **demos interactivas**, se sugiere:  
- Graficar una función sencilla (por ejemplo \(f(x)=x^3-2x-5\)) e ilustrar en tiempo real las iteraciones: dibujar las secantes sucesivas y cómo convergen al cero. Esto se puede hacer con Python (Matplotlib) en una demostración en vivo o usando GeoGebra.  
- Mostrar un diagrama de error en escala logarítmica vs iteración (ver ejemplo de código abajo) para comparar visualmente la tasa de convergencia.  
- Live-coding de las implementaciones: ingresar una función anónima y ver cómo el código converge (por ejemplo con *fzero* de MATLAB usando secante, o un notebook de Python).  
- Un diagrama de flujo o mermaid (como arriba) puede clarificar la lógica del algoritmo.  

Ejemplo de generación de gráficas (en Python):  

```python
import numpy as np
import matplotlib.pyplot as plt

# Ejemplo: f(x) = x^3+2x^2+10x-20, iteraciones secante desde 0 y 1:
f = lambda x: x**3 + 2*x**2 + 10*x - 20
x0, x1 = 0.0, 1.0
xs = [x0, x1]
for i in range(5):
    fx0, fx1 = f(x0), f(x1)
    x2 = x1 - fx1*(x1-x0)/(fx1-fx0)
    xs.append(x2)
    x0, x1 = x1, x2

# Gráfico de la función y las rectas secantes (iteraciones 1 y 2)
x_vals = np.linspace(-3, 3, 300)
y_vals = [f(x) for x in x_vals]
plt.figure(figsize=(5,4))
plt.plot(x_vals, y_vals, label='f(x)')
# Secante inicial (x0,x1)
m01 = (f(xs[1])-f(xs[0]))/(xs[1]-xs[0])
b01 = f(xs[0]) - m01*xs[0]
plt.plot(x_vals, m01*x_vals+b01, '--', label='Secante 1')
# Segunda secante (x1,x2)
m12 = (f(xs[2])-f(xs[1]))/(xs[2]-xs[1])
b12 = f(xs[1]) - m12*xs[1]
plt.plot(x_vals, m12*x_vals+b12, '--', label='Secante 2')
plt.axhline(0, color='k', linewidth=0.5)
plt.legend(); plt.title('Secante: primeras iteraciones')
plt.xlabel('x'); plt.ylabel('f(x)')
plt.show()

# Gráfico de error vs iteración
errors = [abs(xs[i+1]-xs[i]) for i in range(1,len(xs))]
plt.figure(figsize=(4,3))
plt.plot(range(1,len(errors)+1), errors, 'o-')
plt.yscale('log')
plt.xlabel('Iteración'); plt.ylabel('Error aproximado')
plt.title('Convergencia del error')
plt.show()
```

Estas gráficas (iteraciones sobre la función y convergencia logarítmica del error) ayudan a visualizar el comportamiento rápido de la secante.  

## Bibliografía  
1. *“Método de la secante”*, Wikipedia (español)【6†L140-L147】【6†L189-L197】.  
2. Russo, R., *Apuntes de Métodos Numéricos*, Facultad de Ingeniería (UNMdP), Unidad “Secante”【38†L25-L33】【38†L53-L59】.  
3. Rodríguez, D., *El método de la secante e implementación en Python*, AnalyticsLane (blog técnico)【24†L75-L84】【25†L130-L139】.  
4. DyNamecas, H., *Métodos Numéricos* (slides, 2020), sección secante (SlideShare)【40†L86-L94】【40†L100-L108】.  
5. Press, W. H., et al. *Numerical Recipes*, Cap. “Roots of a Function” (implementaciones en C/Python).  
6. Ortega, J.M. & Rheinboldt, W.C., *Iterative Solution of Nonlinear Equations in Several Variables* (1987).  
7. Burden, R.L. & Faires, J.D., *Análisis Numérico*, ed. en español, Cap. 2.3 (raíz de ecuaciones).  

Estos recursos ofrecen definiciones, derivaciones completas y ejemplos adicionales. Se recomienda seguir las referencias citadas para mayor profundidad teórica.