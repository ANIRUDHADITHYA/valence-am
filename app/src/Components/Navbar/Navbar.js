import React, { useContext, useEffect, useState } from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import SignSlider from '../SignSlider/SignSlider';
import OutsideClickHandler from 'react-outside-click-handler';
import { AuthContext } from '../../ContextAPI/AuthContext';

export default function Navbar(props) {

    const { openSignSlider } = props;

    const [isSignInOpen, setSignInOpen] = useState(false);

    const [mobileNavbar, setMobileNavbar] = useState(false);

    const [cartValues, setCartValues] = useState([]);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const { user, signout } = useContext(AuthContext);

    const [showLogout, setShowLogout] = useState(false);

    useEffect(() => {
        const existingCartValuesJSON = localStorage.getItem('cartValues');
        if (existingCartValuesJSON) {
            const parsedCartValues = JSON.parse(existingCartValuesJSON);
            setCartValues(parsedCartValues);
        }
    },// eslint-disable-next-line react-hooks/exhaustive-deps
        [localStorage.getItem('cartValues')]);


    return (
        <>
            <div className='navbar-section'>
                <div className='toaster-section'>
                </div>
                <div className='navbar-container'>

                    <div className='nav-items start'>
                        <Link className='nav-logo-wrapper' to='/'>
                            <img src="/Asserts/logo.png" alt='logo'></img>
                        </Link>
                    </div>
                    <ul className='nav-items mid'>
                        <li><Link className='hv-underline' to="/about">About</Link></li>
                        <li
                            onMouseEnter={() => { setTooltipOpen("autoclave") }}
                            onMouseLeave={() => { setTooltipOpen(false) }}
                        >
                            <Link className='hv-underline' to="/products?process=0"><span className='mid-main'>Autoclave & Oven</span></Link>
                            <ul className={tooltipOpen === "autoclave" ? 'nav-items-tooltip-container autoclave' : 'nav-items-tooltip-container'}>
                                <li><Link className='hv-underline opx' to="/products?process=0&category=1">Vacuum Bagging Films</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=0&category=2">Release Films</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=0&category=3">Breathers & Bleeders</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=0&category=4">Peel Ply</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=0&category=5">Sealant Tapes</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=0&category=6">Pressure Sensitive Tapes</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=0&category=7">Vacuum Valves & Hoses</Link></li>
                            </ul>
                        </li>

                        <li
                            onMouseEnter={() => { setTooltipOpen("resin") }}
                            onMouseLeave={() => { setTooltipOpen(false) }}
                        >
                            <Link className='hv-underline' to="/products?process=1"><span className='mid-main'>Low Temperature & Infusion</span></Link>
                            <ul className={tooltipOpen === "resin" ? 'nav-items-tooltip-container resin' : 'nav-items-tooltip-container'}>
                                <li><Link className='hv-underline opx' to="/products?process=1&category=1" >Vacuum Bagging Films</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=1&category=2" >Release Films</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=1&category=3" >Breathers & Bleeders</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=1&category=4" >Peel Ply</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=1&category=5" >Sealant Tapes</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=1&category=6" >Pressure Sensitive Tapes</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=1&category=7" >Vacuum Valves & Hoses</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=1&category=8" >Resin Flow Mesh</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=1&category=9" >Infusion Tooling & Accessories</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=1&category=10" >Infusion Flow & Control Systems</Link></li>
                                <li><Link className='hv-underline opx' to="/products?process=1&category=11" >Combinators</Link></li>
                            </ul>
                        </li>
                        <li><Link className='hv-underline' to="/contact">Contact</Link></li>
                    </ul>
                    <div className='nav-items end'>

                        {user ?
                            <div className='nav-display-user-details'
                                onMouseEnter={() => { setShowLogout(true) }}
                                onMouseLeave={() => { setShowLogout(false) }}
                            >
                                <p className='display-user-name'>{user}</p>
                                <p className={showLogout ? 'nav-logout-btn show' : 'nav-logout-btn'}><span className='hv-underline' onClick={signout}>Logout</span></p>
                            </div> :
                            <p onClick={() => { setSignInOpen(true) }}>Sign In</p>}
                        <Link className="cart-wrapper" to="/my-cart">
                            <img src="/Asserts/Icons/cart.png" alt="cart button"></img>
                        </Link>
                        <span className={cartValues.length ? "cart-item-count blue" : "cart-item-count"}>{cartValues.length}</span>
                    </div>
                </div >
                <SignSlider setSignInOpen={setSignInOpen} isSignInOpen={isSignInOpen} openSignSlider={openSignSlider} />
            </div >
            <OutsideClickHandler onOutsideClick={() => { setMobileNavbar(false) }}>
                <div className='nav-mobile-section'>
                    <div className='nav-mobile-header'>
                        <i class="fa-solid fa-bars" onClick={() => { setMobileNavbar(true) }}></i>
                        <div className='nav-mobile-logo'>
                            <Link className='nav-mobile-logo-wrapper' to='/'>
                                <img src="/Asserts/logo.png" alt='logo'></img>
                            </Link>
                        </div>
                        <div className='nav-mobile-cart'>
                            <Link className="cart-wrapper" to="/my-cart">
                                <img src="/Asserts/Icons/cart.png" alt="cart button" onClick={() => { setMobileNavbar(false) }}></img>
                                <span onClick={() => { setMobileNavbar(false) }} className={cartValues.length ? "cart-item-count blue" : "cart-item-count"}>{cartValues.length}</span>
                            </Link>
                        </div>
                    </div>
                    <div className={mobileNavbar ? 'nav-mobile-container show' : 'nav-mobile-container'}>
                        <p className="get-price-header" onClick={() => { setMobileNavbar(false) }}>Close <span> &times;</span></p>
                        <ul className='nav-items mid'>

                            <li onClick={() => { setMobileNavbar(false) }}><Link className='hv-underline' to="/about">About</Link></li>
                            <li onClick={() => { setMobileNavbar(false) }}><Link className='hv-underline' to="/products?process=0"><span className='mid-main'>Autoclave & Oven</span></Link></li>
                            <li onClick={() => { setMobileNavbar(false) }}><Link className='hv-underline' to="/products?process=1"><span className='mid-main'>Low Temperature & Infusion</span></Link></li>
                            <li onClick={() => { setMobileNavbar(false) }}><Link className='hv-underline' to="/contact">Contact</Link></li>
                            <li onClick={() => { setMobileNavbar(false) }}><Link className='hv-underline' to="/become-a-supplier">Become A Supplier!</Link></li>
                        </ul>
                        <div className='nav-items end'>
                            {user ?
                                <div className='nav-display-user-details'
                                    onMouseEnter={() => { setShowLogout(true) }}
                                    onMouseLeave={() => { setShowLogout(false) }}
                                >
                                    <p className='display-user-name'>{user}</p>
                                    <p className={showLogout ? 'nav-logout-btn show' : 'nav-logout-btn'}><span className='hv-underline' onClick={signout}>Logout</span></p>
                                </div> :
                                <p onClick={() => { setSignInOpen(true); setMobileNavbar(false) }}>Sign In</p>}
                        </div>
                    </div>
                    <SignSlider setSignInOpen={setSignInOpen} isSignInOpen={isSignInOpen} openSignSlider={openSignSlider} />
                </div>
            </OutsideClickHandler>
        </>
    )
}
