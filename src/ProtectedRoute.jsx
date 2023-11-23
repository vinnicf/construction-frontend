import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuth } = useContext(AuthContext);
     console.log("ProtectedRoute - isAuth:", isAuth);

    return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
