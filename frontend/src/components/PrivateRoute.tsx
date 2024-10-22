import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/intro" />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
