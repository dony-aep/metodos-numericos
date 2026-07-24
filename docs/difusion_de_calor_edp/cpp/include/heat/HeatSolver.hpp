#pragma once
#include <functional>
#include "heat/Types.hpp"

namespace heat {

// Resuelve la ecuación del calor 1D  u_t = α·u_xx  con el esquema explícito
// FTCS y fronteras Dirichlet. f0 es la condición inicial u(x, 0).
HeatResult solveFTCS(const HeatParams& p, const std::function<double(double)>& f0);

}  // namespace heat
