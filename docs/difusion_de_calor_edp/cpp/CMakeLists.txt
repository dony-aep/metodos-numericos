cmake_minimum_required(VERSION 3.20)
project(difusion_calor_cpp LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(imgui CONFIG REQUIRED)
find_package(implot CONFIG REQUIRED)
find_package(glfw3 CONFIG REQUIRED)
find_package(OpenGL REQUIRED)

add_executable(difusion_calor
  src/main.cpp
  src/HeatSolver.cpp
)
target_include_directories(difusion_calor PRIVATE include)
target_link_libraries(difusion_calor PRIVATE
  imgui::imgui
  implot::implot
  glfw
  OpenGL::GL
)
