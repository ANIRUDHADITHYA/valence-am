import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {

    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProducts = async () => {
        try {
            const response = await Axios.get('http://localhost:4000/api/products');
            setAllProducts(response.data.products);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{ allProducts, loading }}>
            {children}
        </ProductsContext.Provider>
    );
};
