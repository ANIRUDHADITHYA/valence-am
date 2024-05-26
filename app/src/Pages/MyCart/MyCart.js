import { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "./MyCart.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../ContextAPI/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import { categories } from "../../Utlis/globalVariables.js"
import Loader from "../../Components/Loader/Loader.js";

const MyCart = () => {
    const [cartValues, setCartValues] = useState([]);
    const [loader, setLoader] = useState(false);
    const [showThankyou, setShowThankyou] = useState(false);
    const { user } = useContext(AuthContext);
    const [openSignslider, setOpenSignSlider] = useState(false);
    const [orderId, setOrderID] = useState("")


    useEffect(() => {
        const existingCartValuesJSON = localStorage.getItem('cartValues');
        if (existingCartValuesJSON) {
            const parsedCartValues = JSON.parse(existingCartValuesJSON);
            setCartValues(parsedCartValues);
        }
    }, []);

    function handleDelete(cartId) {
        const updatedCartValues = cartValues.filter(item => item.cart_id !== cartId);
        localStorage.setItem('cartValues', JSON.stringify(updatedCartValues));
        setCartValues(updatedCartValues);
    }

    function handleMinus(cartId) {
        const cartItem = cartValues.find(item => item.cart_id === cartId);
        if (cartItem) {
            const newQuantity = Math.max(cartItem.quantity - 1, 1);
            updateCartItemQuantity(cartId, newQuantity);
        }
    }

    function handlePlus(cartId) {
        const cartItem = cartValues.find(item => item.cart_id === cartId);
        if (cartItem) {
            const newQuantity = cartItem.quantity + 1;
            updateCartItemQuantity(cartId, newQuantity);
        }
    }

    function updateCartItemQuantity(cartId, newQuantity) {
        const updatedCartValues = cartValues.map(item => {
            if (item.cart_id === cartId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        localStorage.setItem('cartValues', JSON.stringify(updatedCartValues));
        setCartValues(updatedCartValues);
    }

    function handleClearCart() {
        const updatedCartValues = [];
        localStorage.removeItem('cartValues');
        setCartValues(updatedCartValues);
    }

    const getPrice = async () => {
        if (user) {
            setLoader(true);
            try {
                const response = await Axios.post(`${process.env.REACT_APP_API_HOST_URL}/api/orders/create-order`, { cartValues }, {
                    withCredentials: true,
                });
                setLoader(false);
                handleClearCart();
                setShowThankyou(true)
                setOrderID(response.data.order_id)
            } catch (error) {
                console.error("Error fetching price:", error);
                setLoader(false);
            }
        }
        else {
            setOpenSignSlider(true)
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className='app-toaster red'>
                        <i className="fa-regular fa-circle-xmark"></i>
                        <h1>{'Login to Get Price Details.'}</h1>
                    </div>
                </div>
            ))
        }
    }


    return (
        <div className="cart-section">
            <Navbar openSignSlider={openSignslider} />
            <Toaster
                position="top-left"
                reverseOrder={false}
            />
            <div className="cart-container-main">
                <p>Cart</p>
                <div style={{ overflowX: "auto" }} className="cart-table-wrap">
                    <table>
                        <tbody>
                            <tr className="cart-prod-title-wrapper">
                                <th style={{ whiteSpace: "nowrap" }}>Product - Description</th>
                                <th></th>
                                <th>Quantity</th>
                                <th className="table-price-header">Price</th>
                                <th></th>
                            </tr>
                            {cartValues.length ?
                                cartValues.map((cartItem, index) => (
                                    <tr key={index} className="cart-prod-wrapper">
                                        <td className="cart-prod-img-wrapper" >
                                            <img src={`/Asserts/Products/${cartItem.product_image}.jpg`} alt="" />
                                        </td>
                                        <td>
                                            <div className="prod-disc-table">
                                                <Link to={`/products/${cartItem.product_id}`}><h1>{cartItem.product_name}</h1></Link>
                                                <h2>{categories[cartItem.product_category_id]}</h2>
                                                {cartItem.product_temperature ? <h5 key={index}><b>Peak Temperature:</b> {cartItem.product_temperature}</h5> : ""}
                                                {cartItem.product_properties.map((prop, index) => (
                                                    <>
                                                        <h5 key={index}><b>{prop.property_name}:</b> {prop.value}</h5>
                                                        {prop.customized && <h5>({prop.custom_value})</h5>}
                                                    </>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="cart-quantity">
                                            <div className="wrapper">
                                                <span className="minus" onClick={() => { handleMinus(cartItem.cart_id) }} style={cartItem.quantity === 1 ? { opacity: 0 } : { opacity: 1 }}>-</span>
                                                <span className="num">{cartItem.quantity}</span>
                                                <span className="plus" onClick={() => { handlePlus(cartItem.cart_id) }}>+</span>
                                            </div>
                                        </td>
                                        <td className="price-tag-img">
                                            {
                                                // eslint-disable-next-line
                                                <img src="/Asserts/pricetag.jpeg" alt={`image${index}`} style={{ mixBlendMode: "revert-layer" }} />
                                            }
                                        </td>
                                        <td style={{ textAlign: "center" }} className="cart-prod-delete"><i className="fa-solid fa-xmark" id="cart-delete" onClick={() => { handleDelete(cartItem.cart_id) }}></i></td>
                                    </tr>



                                )) :
                                <>
                                    <tr className="no-product-br">
                                        <td colSpan={5} style={{ borderBottom: "none" }}></td>
                                    </tr>
                                    <tr className="no-product-tr">
                                        <td colSpan={5} style={{ borderBottom: "none" }} className="no-products">No Products in the Cart. <Link to="/products">Shop Now</Link></td>
                                    </tr>
                                    <tr className="no-product-br">
                                        <td colSpan={5} className="no-products"></td>
                                    </tr>
                                </>

                            }
                            {cartValues.length ?
                                <tr className="clear-cart-container" >
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }} className="no-td"></td>
                                    <td style={{ borderBottom: "none", paddingTop: "30px", textAlign: "center", whiteSpace: "nowrap" }} className="prod-clear-btn" ><span className="noBorder" onClick={handleClearCart}>CLEAR CART</span></td>
                                    <td style={{ borderBottom: "none", paddingTop: "30px", textAlign: "center", whiteSpace: "nowrap" }}><span className="noBorder-getBtn" onClick={getPrice}>GET PRICE</span></td>
                                </tr> : ""}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />

            {(loader || showThankyou) ?
                loader ?

                    <Loader message={"Please wait. While we process your request..."} /> :
                    showThankyou ?
                        <div className="get-price-card-container">
                            <div className="get-price-card">
                                <p className="get-price-header" onClick={() => { window.location.reload() }}>Close <span> &times;</span></p>
                                <div className="get-price-content">
                                    <h1>Thank You!</h1>
                                    <p>Your exclusive offer and tailored requirements are about to hit your
                                        inbox – keep an eye out for them in your registered email!</p>
                                    <p style={{ color: "var(--primary-color)", paddingTop: "10px" }}><b>Your Order ID is {orderId}</b></p>
                                </div>
                            </div>
                        </div> : "" : ""

            }
        </div >
    )
}

export default MyCart;
