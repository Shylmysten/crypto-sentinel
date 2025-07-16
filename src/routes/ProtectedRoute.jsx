// src/routes/ProtectedRoute.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;