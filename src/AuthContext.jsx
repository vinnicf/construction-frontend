
import React, { createContext, useState, useEffect } from 'react';
import * as authService from './authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(authService.isAuthenticated());
    }, []);

    const login = (username, password) => {
        return authService.login(username, password).then(() => {
            setIsAuth(true);
        });
    };

    const logout = () => {
        authService.logout();
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContext;
