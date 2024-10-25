import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyTelegramToken } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import { AxiosResponse } from 'axios';

const TokenHandler: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { authToken, setAuthToken } = useAuth();

    const handleTokenVerification = async (token: string) => {
        try {
            const response: AxiosResponse<{ status: string }> = await verifyTelegramToken(token);
            if (response) {
                setAuthToken(token);
                localStorage.setItem('authToken', token);
                navigate('/home');
            } else {
                navigate('/login');
            }
        } catch {
            navigate('/login');
        }
    };

    useEffect(() => {
        const tokenFromUrl = new URLSearchParams(location.search).get('token');
        const existingToken = localStorage.getItem('authToken');

        if (tokenFromUrl) {
            handleTokenVerification(tokenFromUrl);
        } else if (existingToken) {
            handleTokenVerification(existingToken);
        } else {
            navigate('/login');
        }
    }, [authToken]);

    return null;
};

export default TokenHandler;
