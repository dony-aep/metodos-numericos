#pragma once
#include <vector>

namespace heat {

// Parámetros de entrada de la simulación.
struct HeatParams {
  double alpha = 1.0;   // difusividad térmica
  double L = 1.0;       // longitud de la barra
  double T = 0.1;       // tiempo final
  int N = 20;           // intervalos espaciales (genera N+1 nodos)
  double dt = 0.001;    // paso temporal
  double uLeft = 0.0;   // frontera Dirichlet u(0, t)
  double uRight = 0.0;  // frontera Dirichlet u(L, t)
};

// Resultado: malla, número de difusión y la historia de perfiles.
struct HeatResult {
  double dx = 0.0;                            // paso espacial L/N
  double lambda = 0.0;                        // número de difusión α·Δt/Δx²
  bool stable = false;                        // λ ≤ 1/2
  std::vector<double> x;                      // posiciones de los nodos (N+1)
  std::vector<double> times;                  // niveles de tiempo
  std::vector<std::vector<double>> history;   // history[n][i] = u_i^n
};

}  // namespace heat
