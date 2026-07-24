# Difusión del calor 1D en C++ (FTCS) — visualizador interactivo

Simulación de la ecuación del calor `u_t = α·u_xx` por diferencias finitas con el
esquema explícito **FTCS** y fronteras Dirichlet, con una **interfaz gráfica**
(Dear ImGui + ImPlot): mapa de calor coloreado posición × tiempo, animación del
perfil `u(x)`, parámetros ajustables en vivo e indicador de estabilidad.

## Requisitos
- Visual Studio 2026 con el workload **"Desarrollo de escritorio con C++"**
  (MSVC, CMake, Ninja).
- **vcpkg** instalado en `C:/Users/doney/vcpkg` (ruta fijada en `CMakePresets.json`
  como `CMAKE_TOOLCHAIN_FILE`, para usar esa instancia y no la que trae Visual
  Studio). Las dependencias (`imgui`, `implot`, `glfw3`) se declaran en
  `vcpkg.json` y se instalan solas al configurar (modo manifiesto). Si mueves
  vcpkg a otra ruta, ajusta esa línea del preset.

## Compilar y ejecutar

### Opción A — Visual Studio
1. *Archivo → Abrir → Carpeta...* y selecciona esta carpeta (`cpp/`).
2. VS detecta `CMakePresets.json` + `vcpkg.json`, instala las dependencias y
   configura el proyecto (la primera vez tarda: compila ImGui/ImPlot/GLFW).
3. Ejecuta el destino `difusion_calor.exe` (F5).

### Opción B — Línea de comandos
```bash
cmake --preset vcpkg
cmake --build build/vcpkg
./build/vcpkg/difusion_calor
```

## Controles
- **Condición inicial**: senoidal, pulso gaussiano o triangular.
- **α, L, T, N, Δt, u(0,t), u(L,t)**: recalculan la simulación en vivo.
- **λ** y el estado **ESTABLE / INESTABLE** se actualizan con cada cambio; sube
  `Δt` hasta `λ > 0.5` para ver divergir el esquema explícito.
- **Reproducir / Velocidad / t (índice)**: anima el perfil avanzando en el tiempo.
- Con la condición senoidal y fronteras 0 se muestra el error máximo contra la
  solución analítica `u(x,t) = 100·sin(πx/L)·e^{-(π/L)²·α·t}`.

## Estructura
```
cpp/
├── CMakeLists.txt          # find_package imgui/implot/glfw3/OpenGL
├── CMakePresets.json       # preset 'vcpkg' (Ninja + toolchain de vcpkg)
├── vcpkg.json              # dependencias (modo manifiesto)
├── include/heat/
│   ├── Types.hpp           # HeatParams, HeatResult
│   └── HeatSolver.hpp      # firma del solver
└── src/
    ├── HeatSolver.cpp      # algoritmo FTCS (núcleo numérico)
    └── main.cpp            # GUI ImGui + ImPlot
```

## Próximos pasos (opcionales)
- Exportar la historia a CSV para reusar el mapa de calor de la app web.
- Añadir el esquema implícito (BTCS/Crank-Nicolson) con el algoritmo de Thomas.
