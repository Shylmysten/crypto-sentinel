// src/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';

const AppRoutes = ({ wallet, pool }) => {
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
              <p>Please enter a wallet address above to load dashboard.</p>
            )}
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
