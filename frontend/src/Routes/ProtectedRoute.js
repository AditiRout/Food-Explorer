import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children}) => {
  //const navigate = useNavigate();

  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('token');



  if (!isAuthenticated) {
    // Redirect to login if not authenticated 
    return <Navigate to="/" />;
  }
  
    
  
  

  return children;
};

export default ProtectedRoute;
