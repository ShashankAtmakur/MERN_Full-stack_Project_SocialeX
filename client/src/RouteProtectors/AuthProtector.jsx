import { Navigate } from 'react-router-dom';

const AuthProtector =  ({ children }) => {
  return localStorage.getItem('userToken') ? children : <Navigate to="/landing" replace />;
};

export default AuthProtector;