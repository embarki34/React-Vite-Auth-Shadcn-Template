import React from 'react';
import { Navigate } from 'react-router-dom';
import { tokenManagerInstance }  from '@/const/TokenManagment';
interface ProtectedRouteProps {
  children: React.ReactNode;
}
 
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = tokenManagerInstance.isAuthenticated();

  if (!isAuthenticated && window.location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return (
    
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default ProtectedRoute;