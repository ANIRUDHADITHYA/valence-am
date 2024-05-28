import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await Axios.get(`${process.env.REACT_APP_API_HOST_URL}/api/products`);
            const products = response.data.products;
            sessionStorage.setItem('products', JSON.stringify(products));
            setAllProducts(products);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedProducts = sessionStorage.getItem('products');
        if (storedProducts) {
            setAllProducts(JSON.parse(storedProducts));
            setLoading(false);
        } else {
            fetchProducts();
        }
    }, []);

    return (
        <ProductsContext.Provider value={{ allProducts, loading }}>
            {children}
        </ProductsContext.Provider>
    );
};
