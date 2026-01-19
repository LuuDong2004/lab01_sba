import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return children;
}

export default ProtectedRoute;