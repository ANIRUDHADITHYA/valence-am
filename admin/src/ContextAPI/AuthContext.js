import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loginValue, setLoginValue] = useState("")

    useEffect(() => {
        const verifyAdmin = async () => {
            try {
                const response = await Axios.get(`${process.env.REACT_APP_API_HOST_URL}/api/auth/admin/verify-admin`, { withCredentials: true });
                setIsAuthenticated(response.data.status);
                setLoginValue(response.data.admin)
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        verifyAdmin();
    }, []);

    const login = async (email, password) => {
        let signinValues = {
            email, password
        }
        try {
            const response = await Axios.post(`${process.env.REACT_APP_API_HOST_URL}/api/auth/admin/signin`, signinValues, { withCredentials: true });
            setIsAuthenticated(response.data.status);
            setLoginValue(response.data)
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await Axios.post(`${process.env.REACT_APP_API_HOST_URL}/api/auth/admin/signout`, {}, { withCredentials: true });
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, loginValue, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
