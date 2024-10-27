import React, { createContext, useContext, useEffect, useState } from 'react';
import { IMe } from '../interfaces/IMe';
import { fetchMe } from '../services/apiService';

interface AuthContextType {
    authToken: string | null;
    setAuthToken: (token: string | null) => void;
    me: IMe | null;
    setMe: (IMe: IMe | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [me, setMe] = useState<IMe | null>(null);

    useEffect(() => {
        if (authToken) {
            localStorage.setItem('authToken', authToken);
            fetchMe().then(user => setMe(user));
        } else {
            localStorage.removeItem('authToken');
            setMe(null);
        }
    }, [authToken]);

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, me, setMe }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
