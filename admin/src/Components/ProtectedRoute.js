// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../ContextAPI/AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
