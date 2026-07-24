#include "heat/HeatSolver.hpp"
#include <utility>

namespace heat {

HeatResult solveFTCS(const HeatParams& p, const std::function<double(double)>& f0) {
  HeatResult r;
  r.dx = p.L / p.N;
  r.lambda = p.alpha * p.dt / (r.dx * r.dx);
  r.stable = r.lambda <= 0.5 + 1e-12;

  const int points = p.N + 1;
  r.x.resize(points);
  for (int i = 0; i < points; ++i) r.x[i] = i * r.dx;

  std::vector<double> u(points);
  for (int i = 0; i < points; ++i) u[i] = f0(r.x[i]);
  u.front() = p.uLeft;
  u.back() = p.uRight;

  const int steps = static_cast<int>(p.T / p.dt);
  r.history.assign(1, u);
  r.times.assign(1, 0.0);

  for (int n = 1; n <= steps; ++n) {
    std::vector<double> next = u;
    for (int i = 1; i < points - 1; ++i)
      next[i] = u[i] + r.lambda * (u[i + 1] - 2.0 * u[i] + u[i - 1]);
    next.front() = p.uLeft;
    next.back() = p.uRight;
    u = std::move(next);
    r.history.push_back(u);
    r.times.push_back(n * p.dt);
  }
  return r;
}

}  // namespace heat
