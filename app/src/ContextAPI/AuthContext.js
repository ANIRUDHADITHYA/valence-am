import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    const signout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_HOST_URL}/api/auth/signout`, {}, { withCredentials: true });
            setUser("");
            window.location.reload();
        } catch (error) {
            console.error('Signout failed:', error);
        }
    };

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_HOST_URL}/api/auth/verify-user`, { withCredentials: true });
                if (res.data.status) {
                    setUser(res.data.user.name);
                } else {
                    setUser("");
                }
            } catch (error) {
                setUser("");
            } finally {
                setLoading(false);
            }
        };


        checkUserLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, signout }}>
            {children}
        </AuthContext.Provider>
    );
};
