import React, { createContext, useContext, useState } from 'react';
import { login } from '../services/api';

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (credentials: { username: string; password: string }, onSuccess?: () => void) => Promise<void>;
    logout: (onLogout?: () => void) => void;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    isAuthenticated: false,
    login: async () => {
        throw new Error('login function must be overridden');
    },
    logout: () => {
        throw new Error('logout function must be overridden');
    },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    const handleLogin = async (credentials: { username: string; password: string }, onSuccess?: () => void) => {
        const data = await login(credentials);
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        onSuccess?.();
    };

    const handleLogout = (onLogout?: () => void) => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
        onLogout?.();
    };

    const value = {
        token,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};