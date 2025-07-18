// src/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import { useAuth } from './context/useAuth';

const AppRoutes = () => {
  const { settings } = useAuth();

  const wallet = settings?.walletOrToken;
  const pool = settings?.pool || 'ethermine';

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {wallet ? (
              <Dashboard wallet={wallet} pool={pool} />
            ) : (
              <p className="text-green-400 text-center mt-8">
                No wallet or token configured. Please enter it above.
              </p>
            )}
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
