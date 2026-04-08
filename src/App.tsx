import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/shared/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import GaussEliminationPage from '@/pages/GaussEliminationPage';
import LinearSystemsPage from '@/pages/LinearSystemsPage';
import { MethodPage } from '@/pages/MethodPage';
import SecantMethodPage from '@/pages/SecantMethodPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="metodos/secante" element={<SecantMethodPage />} />
          <Route path="metodos/sistemas-lineales" element={<LinearSystemsPage />} />
          <Route path="metodos/eliminacion-gauss" element={<GaussEliminationPage />} />
          <Route path="metodos/:slug" element={<MethodPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
