import React from 'react';
import { Navigate } from 'react-router-dom';

interface Protected {
  Component: React.FC<any>;
  isLogged: boolean;
  [key: string]: any;
}

const ProtectedRoute: React.FC<Protected> = ({
  Component,
  isLogged,
  ...props
}) => {
  return isLogged ? <Component {...props} /> : <Navigate to="./sign-in" />;
};

export default ProtectedRoute;
