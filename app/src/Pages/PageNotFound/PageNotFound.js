import React from 'react';
import "./PageNotFound.css";
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <div className='page-not-found-section'>
            <Navbar />
            <div className='page-not-found-container'>
                <p>Error 404</p>
                <h1>Oops.</h1>
                <h3>The page you're looking for isn't available.</h3>
                <h3>Use the go back button below to navigate to our Home Page.</h3>
                <Link to="/"><i class="fa-solid fa-arrow-left"></i>Go Back</Link>
            </div>
            <Footer />

        </div>
    )
}
