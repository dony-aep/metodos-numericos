import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/shared/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { MethodPage } from '@/pages/MethodPage';

const ErrorsPage = lazy(() => import('@/pages/ErrorsPage'));
const NonlinearPage = lazy(() => import('@/pages/NonlinearPage'));
const BisectionPage = lazy(() => import('@/pages/BisectionPage'));
const NewtonRaphsonPage = lazy(() => import('@/pages/NewtonRaphsonPage'));
const SecantMethodPage = lazy(() => import('@/pages/SecantMethodPage'));
const LinearSystemsPage = lazy(() => import('@/pages/LinearSystemsPage'));
const GaussEliminationPage = lazy(() => import('@/pages/GaussEliminationPage'));
const JacobiGaussSeidelPage = lazy(() => import('@/pages/JacobiGaussSeidelPage'));
const InterpolationPage = lazy(() => import('@/pages/InterpolationPage'));
const NewtonDDPage = lazy(() => import('@/pages/NewtonDDPage'));
const LagrangePage = lazy(() => import('@/pages/LagrangePage'));
const LeastSquaresPage = lazy(() => import('@/pages/LeastSquaresPage'));
const NumericalDiffPage = lazy(() => import('@/pages/NumericalDiffPage'));
const NumericalIntegrationPage = lazy(() => import('@/pages/NumericalIntegrationPage'));
const EulerPage = lazy(() => import('@/pages/EulerPage'));
const HeatDiffusionPage = lazy(() => import('@/pages/HeatDiffusionPage'));

function PageFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="metodos/errores-aproximaciones" element={<Suspense fallback={<PageFallback />}><ErrorsPage /></Suspense>} />
          <Route path="metodos/ecuaciones-no-lineales" element={<Suspense fallback={<PageFallback />}><NonlinearPage /></Suspense>} />
          <Route path="metodos/biseccion" element={<Suspense fallback={<PageFallback />}><BisectionPage /></Suspense>} />
          <Route path="metodos/newton-raphson" element={<Suspense fallback={<PageFallback />}><NewtonRaphsonPage /></Suspense>} />
          <Route path="metodos/secante" element={<Suspense fallback={<PageFallback />}><SecantMethodPage /></Suspense>} />
          <Route path="metodos/sistemas-lineales" element={<Suspense fallback={<PageFallback />}><LinearSystemsPage /></Suspense>} />
          <Route path="metodos/eliminacion-gauss" element={<Suspense fallback={<PageFallback />}><GaussEliminationPage /></Suspense>} />
          <Route path="metodos/jacobi-gauss-seidel" element={<Suspense fallback={<PageFallback />}><JacobiGaussSeidelPage /></Suspense>} />
          <Route path="metodos/interpolacion-polinomica" element={<Suspense fallback={<PageFallback />}><InterpolationPage /></Suspense>} />
          <Route path="metodos/newton-diferencias-divididas" element={<Suspense fallback={<PageFallback />}><NewtonDDPage /></Suspense>} />
          <Route path="metodos/lagrange" element={<Suspense fallback={<PageFallback />}><LagrangePage /></Suspense>} />
          <Route path="metodos/minimos-cuadrados" element={<Suspense fallback={<PageFallback />}><LeastSquaresPage /></Suspense>} />
          <Route path="metodos/derivacion-numerica" element={<Suspense fallback={<PageFallback />}><NumericalDiffPage /></Suspense>} />
          <Route path="metodos/integracion-numerica" element={<Suspense fallback={<PageFallback />}><NumericalIntegrationPage /></Suspense>} />
          <Route path="metodos/euler" element={<Suspense fallback={<PageFallback />}><EulerPage /></Suspense>} />
          <Route path="metodos/difusion-calor" element={<Suspense fallback={<PageFallback />}><HeatDiffusionPage /></Suspense>} />
          <Route path="metodos/:slug" element={<MethodPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
