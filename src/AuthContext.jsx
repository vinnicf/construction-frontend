
import React, { createContext, useState, useEffect } from 'react';
import * as authService from './authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);  // State to hold user data

    useEffect(() => {
        const checkAuth = () => {
            const userData = authService.getUser();
            setIsAuth(!!userData); // If userData is not null, the user is authenticated
            setUser(userData); // Store user data in state
        };
    
        checkAuth();
    }, []);

    const login = async (username, password) => {
        const userData = await authService.login(username, password);
        if (userData) {
            setIsAuth(true);
            setUser(userData);  // Save user data after login
        }
    };

    const logout = () => {
        authService.logout();
        setIsAuth(false);
        setUser(null); // Clear user data on logout
    };

    return (
        <AuthContext.Provider value={{ isAuth, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContext;
