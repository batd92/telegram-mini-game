import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { authToken } = useAuth();

    return authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
