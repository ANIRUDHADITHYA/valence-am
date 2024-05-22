import "./Homepage.css";
import HomeCarousel from "../../Components/Carousel/HomeCarousel";
import { Link } from "react-router-dom";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";



const Homepage = () => {
    const [showMobMenuHome, setShowMobMenuHome] = useState(false)
    return (
        <div className="home-section">
            <div className="home-mobile-menu">
                <i class="fa-solid fa-bars" onClick={() => { setShowMobMenuHome(true) }}></i>
            </div>
            <div className="home-container">
                <OutsideClickHandler onOutsideClick={() => { setShowMobMenuHome(false) }}>
                    <div className={showMobMenuHome ? "home-navbar-section show" : "home-navbar-section"}>
                        <ul className="home-navbar-items">
                            <li id="home-close-li"><p className="get-price-header" onClick={() => { setShowMobMenuHome(false) }}>Close <span> &times;</span></p></li>
                            <li className="home-nav-item"><div className="home-logo-wrapper"><img src="/Asserts/logo.png" alt="valence logo"></img></div></li>
                            <li className="home-nav-item span">
                                <Link to="/about" className="home-nav-item-div">
                                    <div className="home-nav-item-span-title">About</div>
                                    <div className="home-nav-item-span-subtitle">
                                        <span className="underline-effect">Where Passion Meets Purpose!</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="home-nav-item">
                                <Link to="/products?process=0" className="products-div">
                                    <div className="home-nav-item-span-title">Products</div>
                                    <div className="home-nav-item-span-subtitle">
                                        <span className="underline-effect">Our Composite Universe!</span>
                                    </div>
                                </Link>
                                <div className="home-nav-subcat">
                                    <Link to="/products?process=0" className='hv-underline' >Autoclave & Oven</Link>
                                    <Link to="/products?process=1" className='hv-underline' >Low Temperature & Infusion</Link>
                                </div>
                            </li>
                            <li className="home-nav-item span">
                                <Link to="/contact" className="home-nav-item-div">
                                    <div className="home-nav-item-span-title">Contact</div>
                                    <div className="home-nav-item-span-subtitle">
                                        <span className="underline-effect">Let's Forge Success Together!</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="home-nav-item span">
                                <Link to="/become-a-supplier" className="home-nav-item-div">
                                    <div className="home-nav-item-span-title">Become A Supplier!</div>
                                    <div className="home-nav-item-span-subtitle">
                                        <span className="underline-effect">Driving innovation through unity.</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </OutsideClickHandler>
                <div className="home-carousel-section">
                    <HomeCarousel />
                    <div className="home-footer-section">
                        <div className="home-footer-conatiner">
                            <p className="home-footer-item start">© 2024 Valence Advanced Materials Private Limited. <br />All Rights Reserved.</p>
                            <div className="home-footer-item end">
                                <a href="mailto:enquiry@valence-am.com"><i class="fa-regular fa-envelope"></i></a>
                                <a href="https://www.linkedin.com/in/valenceadvancedmaterials/" target="_blank" rel="noreferrer"><i class="fa-brands fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default Homepage;