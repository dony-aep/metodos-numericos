// Visualizador interactivo de la ecuación de difusión del calor 1D (FTCS).
// Dear ImGui + ImPlot + GLFW/OpenGL3. El núcleo numérico vive en HeatSolver.
#include <algorithm>
#include <cmath>
#include <functional>
#include <vector>

#include "imgui.h"
#include "imgui_impl_glfw.h"
#include "imgui_impl_opengl3.h"
#include "implot.h"
#include <GLFW/glfw3.h>

#include "heat/HeatSolver.hpp"

using heat::HeatParams;
using heat::HeatResult;

namespace {
constexpr double PI = 3.14159265358979323846;

// Condiciones iniciales seleccionables (las mismas ideas que en la web).
std::function<double(double)> makeInitial(int kind, double L) {
  switch (kind) {
    case 1:  // pulso gaussiano centrado
      return [L](double x) { return 100.0 * std::exp(-200.0 * (x - L / 2) * (x - L / 2)); };
    case 2:  // perfil triangular (pico en el centro)
      return [L](double x) { return 100.0 * (1.0 - std::fabs(x - L / 2) / (L / 2)); };
    default:  // senoidal
      return [L](double x) { return 100.0 * std::sin(PI * x / L); };
  }
}

// A lo sumo `max` índices repartidos uniformemente en [0, total).
std::vector<int> sampleRows(int total, int max) {
  std::vector<int> idx;
  if (total <= max) {
    for (int i = 0; i < total; ++i) idx.push_back(i);
    return idx;
  }
  for (int i = 0; i < max; ++i)
    idx.push_back(static_cast<int>(std::round(i * (total - 1.0) / (max - 1))));
  return idx;
}

// Aplana la historia en un buffer row-major para ImPlot::PlotHeatmap.
// La fila 0 del buffer queda arriba (t = T) y la última abajo (t = 0).
struct HeatField {
  std::vector<double> data;
  int rows = 0, cols = 0;
  double lo = 0.0, hi = 1.0;
};

HeatField buildField(const HeatResult& r) {
  HeatField f;
  const std::vector<int> rowsIdx = sampleRows(static_cast<int>(r.times.size()), 300);
  f.rows = static_cast<int>(rowsIdx.size());
  f.cols = static_cast<int>(r.x.size());
  f.data.resize(static_cast<size_t>(f.rows) * f.cols);
  f.lo = 1e300;
  f.hi = -1e300;
  for (int rr = 0; rr < f.rows; ++rr) {
    const std::vector<double>& src = r.history[rowsIdx[f.rows - 1 - rr]];  // invertir: t=T arriba
    for (int c = 0; c < f.cols; ++c) {
      const double v = src[c];
      f.data[static_cast<size_t>(rr) * f.cols + c] = v;
      f.lo = std::min(f.lo, v);
      f.hi = std::max(f.hi, v);
    }
  }
  if (f.hi - f.lo < 1e-12) f.hi = f.lo + 1.0;
  return f;
}
}  // namespace

int main() {
  if (!glfwInit()) return 1;
  const char* glsl = "#version 130";
  glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
  glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);
  GLFWwindow* win = glfwCreateWindow(1280, 760, "Difusion del calor 1D - FTCS", nullptr, nullptr);
  if (!win) { glfwTerminate(); return 1; }
  glfwMakeContextCurrent(win);
  glfwSwapInterval(1);

  IMGUI_CHECKVERSION();
  ImGui::CreateContext();
  ImPlot::CreateContext();
  ImGui::StyleColorsDark();
  ImGui_ImplGlfw_InitForOpenGL(win, true);
  ImGui_ImplOpenGL3_Init(glsl);

  // Estado de la UI (defaults: caso senoidal estable, lambda = 0.4).
  float alpha = 1.0f, L = 1.0f, T = 0.1f, dt = 0.001f, uL = 0.0f, uR = 0.0f;
  int N = 20, kind = 0;
  bool playing = true;
  float speed = 2.0f;
  double frameIdx = 0.0;

  HeatResult r;
  HeatField field;
  bool dirty = true;

  while (!glfwWindowShouldClose(win)) {
    glfwPollEvents();
    ImGui_ImplOpenGL3_NewFrame();
    ImGui_ImplGlfw_NewFrame();
    ImGui::NewFrame();

    // --- Panel de parámetros ---
    ImGui::SetNextWindowPos(ImVec2(12, 12), ImGuiCond_FirstUseEver);
    ImGui::SetNextWindowSize(ImVec2(340, 720), ImGuiCond_FirstUseEver);
    ImGui::Begin("Parametros");

    bool changed = false;
    changed |= ImGui::Combo("Condicion inicial", &kind, "Senoidal\0Pulso gaussiano\0Triangular\0");
    // Descripción de la condición inicial seleccionada.
    switch (kind) {
      case 0:
        ImGui::TextWrapped("u(x,0) = 100*sin(pi*x/L). Perfil suave con solucion "
                           "analitica conocida, ideal para validar el metodo.");
        break;
      case 1:
        ImGui::TextWrapped("u(x,0) = 100*exp(-200*(x-L/2)^2). Pulso de calor "
                           "concentrado en el centro que se aplana y disipa.");
        break;
      case 2:
        ImGui::TextWrapped("u(x,0) = triangular. Pico en el centro con pendiente "
                           "constante; muestra como se suaviza una discontinuidad.");
        break;
    }
    ImGui::Spacing();
    changed |= ImGui::InputFloat("alpha (difusividad)", &alpha, 0.1f, 1.0f, "%.4f");
    changed |= ImGui::InputFloat("L (longitud)", &L, 0.1f, 1.0f, "%.4f");
    changed |= ImGui::InputFloat("T (tiempo final)", &T, 0.01f, 0.1f, "%.4f");
    changed |= ImGui::InputInt("N (intervalos)", &N, 1, 10);
    changed |= ImGui::InputFloat("dt (paso temporal)", &dt, 0.0001f, 0.001f, "%.6f");
    changed |= ImGui::InputFloat("u(0, t)", &uL, 1.0f, 10.0f, "%.2f");
    changed |= ImGui::InputFloat("u(L, t)", &uR, 1.0f, 10.0f, "%.2f");
    // Clamp valores para evitar parámetros inválidos.
    if (alpha < 0.01f) alpha = 0.01f;
    if (L < 0.01f) L = 0.01f;
    if (T < 0.001f) T = 0.001f;
    if (N < 2) N = 2;
    if (N > 500) N = 500;
    if (dt < 1e-6f) dt = 1e-6f;

    if (dirty || changed) {
      const HeatParams p{alpha, L, T, N, dt, uL, uR};
      r = heat::solveFTCS(p, makeInitial(kind, L));
      field = buildField(r);
      frameIdx = 0.0;
      dirty = false;
    }

    ImGui::Separator();
    ImGui::Text("dx = %.4f", r.dx);
    ImGui::Text("lambda = %.4f", r.lambda);
    if (r.stable)
      ImGui::TextColored(ImVec4(0.30f, 0.85f, 0.40f, 1.0f), "ESTABLE  (lambda <= 0.5)");
    else
      ImGui::TextColored(ImVec4(0.95f, 0.40f, 0.30f, 1.0f), "INESTABLE (lambda > 0.5): diverge");
    ImGui::Text("pasos de tiempo: %d", static_cast<int>(r.times.size()) - 1);

    // Estadísticas del perfil actual.
    if (!r.history.empty()) {
      const std::vector<double>& cur = r.history[std::clamp(
          static_cast<int>(frameIdx), 0,
          static_cast<int>(r.history.size()) - 1)];
      double uMin = 1e300, uMax = -1e300;
      for (double v : cur) {
        if (v < uMin) uMin = v;
        if (v > uMax) uMax = v;
      }
      ImGui::Text("u min = %.4f   u max = %.4f", uMin, uMax);
    }

    // Validación contra solución analítica (solo caso senoidal con fronteras 0).
    if (kind == 0 && uL == 0.0f && uR == 0.0f) {
      const double tEnd = r.times.back();
      double maxErr = 0.0;
      for (size_t i = 0; i < r.x.size(); ++i) {
        const double exact = 100.0 * std::sin(PI * r.x[i] / L) *
                             std::exp(-std::pow(PI / L, 2) * alpha * tEnd);
        maxErr = std::max(maxErr, std::fabs(r.history.back()[i] - exact));
      }
      ImGui::Text("Error max vs analitica: %.3e", maxErr);
    }

    ImGui::Separator();
    const int total = static_cast<int>(r.times.size());
    ImGui::Checkbox("Reproducir", &playing);
    ImGui::SameLine();
    if (ImGui::Button("Reiniciar")) frameIdx = 0.0;
    ImGui::SliderFloat("Velocidad", &speed, 0.25f, 20.0f, "%.2fx");
    int idxUi = static_cast<int>(frameIdx);
    if (ImGui::SliderInt("t (indice)", &idxUi, 0, total > 0 ? total - 1 : 0)) {
      frameIdx = idxUi;
      playing = false;
    }
    ImGui::End();

    // Avance de la animación.
    if (playing && total > 1) {
      frameIdx += speed;
      if (frameIdx >= total) frameIdx = 0.0;
    }
    const int idx = std::clamp(static_cast<int>(frameIdx), 0, total > 0 ? total - 1 : 0);

    // --- Panel de visualización ---
    ImGui::SetNextWindowPos(ImVec2(364, 12), ImGuiCond_FirstUseEver);
    ImGui::SetNextWindowSize(ImVec2(904, 720), ImGuiCond_FirstUseEver);
    ImGui::Begin("Visualizacion");

    ImGui::Text("Mapa de calor  (posicion x  x  tiempo t)    t actual = %.4f", r.times[idx]);
    ImGui::PushItemWidth(-60);
    ImPlot::PushColormap(ImPlotColormap_Jet);
    if (ImPlot::BeginPlot("##heatmap", ImVec2(-70, 330))) {
      ImPlot::SetupAxes("x", "t");
      ImPlot::SetupAxisLimits(ImAxis_X1, 0, L, ImPlotCond_Always);
      ImPlot::SetupAxisLimits(ImAxis_Y1, 0, T, ImPlotCond_Always);
      ImPlot::PlotHeatmap("u", field.data.data(), field.rows, field.cols, field.lo, field.hi,
                          nullptr, ImPlotPoint(0, 0), ImPlotPoint(L, T));
      ImPlot::EndPlot();
    }
    ImGui::SameLine();
    ImPlot::ColormapScale("u(x,t)", field.lo, field.hi, ImVec2(60, 330), "%.0f", 0,
                          ImPlotColormap_Jet);
    ImPlot::PopColormap();

    ImGui::Text("Perfil de temperatura u(x) avanzando en el tiempo");
    if (ImPlot::BeginPlot("##perfil", ImVec2(-1, 300))) {
      ImPlot::SetupAxes("x", "u");
      ImPlot::SetupAxisLimits(ImAxis_X1, 0, L, ImPlotCond_Always);
      ImPlot::SetupAxisLimits(ImAxis_Y1, field.lo, field.hi, ImPlotCond_Always);
      ImPlot::PlotLine("inicial", r.x.data(), r.history.front().data(),
                       static_cast<int>(r.x.size()));
      ImPlot::PlotLine("actual", r.x.data(), r.history[idx].data(),
                       static_cast<int>(r.x.size()));
      ImPlot::EndPlot();
    }
    ImGui::PopItemWidth();
    ImGui::End();

    ImGui::Render();
    int w, h;
    glfwGetFramebufferSize(win, &w, &h);
    glViewport(0, 0, w, h);
    glClearColor(0.09f, 0.09f, 0.11f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT);
    ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());
    glfwSwapBuffers(win);
  }

  ImGui_ImplOpenGL3_Shutdown();
  ImGui_ImplGlfw_Shutdown();
  ImPlot::DestroyContext();
  ImGui::DestroyContext();
  glfwDestroyWindow(win);
  glfwTerminate();
  return 0;
}
