import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ShowProduct.css";
import Sidebar from '../../Components/Sidebar/Sidebar';

export default function ShowProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST_URL}/api/products`, { withCredentials: true });
                const inactiveProducts = response.data.products.filter(product => !product.product_status);
                setProducts(inactiveProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    const makeProductActive = async (productId) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_HOST_URL}/api/products/product/unhide-product/${productId}`, {}, { withCredentials: true });
            alert('Product updated successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error updating product status:', error);
        }
    };
    return (
        <div className='add-product-section'>
            <Sidebar />
            <div className='add-product-container'>
                <h1 className='page-header'>Show Product to VALENCE-AM.COM</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    products.map(product => (
                        <div key={product.product_id} className='product-show-card'>
                            <p><b>Product ID: </b>{product.product_id}</p>
                            <p><b>Product Name: </b>{product.product_name}</p>
                            <button onClick={() => makeProductActive(product.product_id)}>Make as Active</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
