import React, { useState } from 'react';
import "./HideProduct.css";
import Sidebar from '../../Components/Sidebar/Sidebar';
import axios from 'axios';

export default function HideProduct() {

    const [productID, setProductID] = useState("");
    const [product, setProduct] = useState("");

    const fetchProductByID = async (productID) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST_URL}/api/products/product/${productID}`, { withCredentials: true });
            const product = response.data.product[0]
            setProduct(product)
        } catch (error) {
            console.log(productID)
            console.error('Failed to fetch product data', error);
        }
    }



    function handleProductIDChange(e) {
        setProductID(e.target.value)
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API_HOST_URL}/api/products/product/hide-product/${productID}`, {}, { withCredentials: true });
            alert('Product updated successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    return (
        <div className='add-product-section'>
            <Sidebar />
            <div className='add-product-container'>
                <h1 className='page-header'>Hide Product from VALENCE-AM.COM</h1>
                <div className='update-search'>
                    <input type='text' placeholder='Enter Product ID' onChange={handleProductIDChange} value={productID} />
                    <button onClick={() => { fetchProductByID(productID) }}>Search</button>
                </div>

                <div className='product-details'>
                    <p><b>Product ID: </b>{product?.product_id}</p>
                    <p><b>Product Name: </b>{product?.product_name}</p>
                    <p><b>Product Status: </b>{product.product_status === true ? "Active" : product.product_status === false ? "Inactive" : ""}</p>
                    {product?.product_status && <button onClick={handleUpdate}>Hide Product</button>}
                </div>
            </div>
        </div>
    )
}
