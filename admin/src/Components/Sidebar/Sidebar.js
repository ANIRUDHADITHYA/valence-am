import React, { useContext } from 'react';
import "./Sidebar.css";
import { AuthContext } from '../../ContextAPI/AuthContext';

const Sidebar = () => {
    const { logout } = useContext(AuthContext);
    return (
        <div className='sidebar-section'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-wrapper'>
                    <img src='/Asserts/icon.png'></img>
                </div>
                <div className='sidebar-item' style={{ marginTop: "25px" }}>
                    <a href='/dashboard'><i class="fa-solid fa-house"></i></a>
                    <div className='icon-title-container'>
                        <h1><a href='/dashboard'>Dashboard</a></h1>
                    </div>
                </div>
                <div className='sidebar-item'>
                    <a href='#'><i class="fa-solid fa-store"></i></a>
                    <div className='icon-title-container'>
                        <h1><a href='#'>Products</a></h1>
                        <div className='sidebar-subitems'>
                            <a href='/add-product'>Add Product</a>
                            <a href='/update-product'>Update Product</a>
                            <a href='/hide-product'>Hide Product</a>
                            <a href='/show-product'>Show Product</a>
                        </div>
                    </div>
                </div>
                <div className='sidebar-item'>
                    <a href='/orders'><i class="fa-solid fa-box-open"></i></a>
                    <div className='icon-title-container'>
                        <h1><a href='/orders'>View Orders</a></h1>
                    </div>
                </div>
                <div className='sidebar-item'>
                    <a href='/account-holders'><i class="fa-solid fa-users"></i></a>
                    <div className='icon-title-container'>
                        <h1><a href='/account-holders'>Account Holders</a></h1>
                    </div>
                </div>
                <div className='sidebar-item logout'>
                    <a href='#' className='sidebar-logout'><i class="fa-solid fa-right-from-bracket" onClick={logout}></i></a>
                    <div className='icon-title-container'>
                        <h1 onClick={logout}><a href='#'>Logout</a></h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
