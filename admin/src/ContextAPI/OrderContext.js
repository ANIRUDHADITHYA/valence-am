// OrderContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const OrderContext = createContext();

// Create the provider component
export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch orders from the backend
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST_URL}/api/orders/get-all-orders`, { withCredentials: true })
                setOrders(response.data.orders);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <OrderContext.Provider value={{ orders, loading, error }}>
            {children}
        </OrderContext.Provider>
    );
};
