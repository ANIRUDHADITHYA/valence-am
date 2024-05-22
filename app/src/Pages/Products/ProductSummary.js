import { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "./ProductSummary.css";
import { Link, useLocation, useParams } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import { useEffect } from "react";
import { categories } from "../../Utlis/globalVariables.js"
import { useContext } from "react";
import { ProductsContext } from "../../ContextAPI/ProductsContext.js";

const ProductSummary = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const { allProducts } = useContext(ProductsContext);

    const [showCartNotifier, setShowCartNotifier] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };


    const { productID } = useParams();

    const [currentProcess, setCurrentProcess] = useState(0);

    useEffect(() => {
        const processParam = params.get("process");

        if (processParam !== null) {
            setCurrentProcess(parseInt(processParam));
        } else {
            setCurrentProcess(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.get("process")]);

    const filterProduct = allProducts.filter(product => product.product_id === productID)[0];



    function generateCartId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let cartId = '';
        for (let i = 0; i < 6; i++) {
            cartId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return cartId;
    }



    const [property, setProperty] = useState([]);


    const Dropdown = ({ name, id, options, currentValue, index, propertyValues, setProperty }) => {

        const [showOption, setShowOption] = useState("");
        const isPreviousSelected = index === 0 || propertyValues[index - 1] !== undefined;
        const handleChange = (newValue) => {
            setProperty((prevState) => {
                const newState = [...prevState.slice(0, index), { value: newValue, property_id: id, property_name: name }];
                return newState;
            });
        };

        return (
            <>
                {isPreviousSelected && (
                    <div className="prod-prop">
                        <h3 htmlFor={id}>{name} </h3>
                        <OutsideClickHandler onOutsideClick={() => { setShowOption("") }}>
                            <h4 className="phy-prop-select" onClick={() => { setShowOption(id) }}>{currentValue ? currentValue.value : `Select ${name}`}<i class="fa-solid fa-angle-down"></i></h4>
                        </OutsideClickHandler>
                        <div className={showOption === id ? "phy-prop-option active" : "phy-prop-option"}>
                            {options.map((option, index) => (
                                <h4
                                    className={currentValue ? currentValue.value === option ? "phy-prop-selected" : "" : ""}
                                    key={index}
                                    onClick={() => { handleChange(option) }}
                                >{option}</h4>
                            ))}
                        </div>

                    </div >
                )}
            </>
        );
    };


    function handleAddToCart() {
        if (filterProduct.physical_dimensions.length === property.length) {

            const existingCartValuesJSON = localStorage.getItem('cartValues');
            let cartValues = [];

            if (existingCartValuesJSON) {
                cartValues = JSON.parse(existingCartValuesJSON);

                const existingProductIndex = cartValues.findIndex(item =>
                    item.product_id === filterProduct.product_id &&
                    item.product_temperature === filterProduct.temperature &&
                    JSON.stringify(item.product_properties) === JSON.stringify(property)
                );

                if (existingProductIndex !== -1) {
                    cartValues[existingProductIndex].quantity += quantity;
                } else {
                    cartValues.push({
                        cart_id: generateCartId(),
                        product_id: filterProduct.product_id,
                        product_image: filterProduct.product_image,
                        product_name: filterProduct.display_title,
                        product_category: filterProduct.category_id,
                        product_temperature: filterProduct.temperature,
                        quantity: quantity,
                        product_properties: property
                    });
                }
            } else {
                cartValues.push({
                    cart_id: generateCartId(),
                    product_id: filterProduct.product_id,
                    product_image: filterProduct.product_image,
                    product_name: filterProduct.display_title,
                    product_category: filterProduct.category_id,
                    product_temperature: filterProduct.temperature,
                    quantity: quantity,
                    product_properties: property
                });
            }

            const cartValuesJSON = JSON.stringify(cartValues);
            localStorage.setItem('cartValues', cartValuesJSON);

            setProperty([]);
            setQuantity(1)
            setShowCartNotifier(true);

            setTimeout(() => {
                setShowCartNotifier(false);
            }, 5000);
        }
    }



    return (
        <div className="product-page-main">
            <Navbar />
            {filterProduct ?
                <div className="product-summary-container">
                    <div className="product-summary-header">
                        <ul className="ps-nav-container">
                            <li><Link to="/">Home</Link><i class="fa-solid fa-angle-right"></i></li>
                            <li><Link to="/products">Products</Link><i class="fa-solid fa-angle-right"></i></li>
                            <li><Link to={`/products?process=${currentProcess}`}>{categories[filterProduct.category_id]}</Link><i class="fa-solid fa-angle-right"></i></li>
                            <li><Link to="#">{filterProduct.display_title}</Link></li>
                        </ul>
                        <div className="ps-nav-container-pn">
                            <Link to="/#">PREV</Link>
                            <Link to="/#">NEXT</Link>
                        </div>
                    </div>
                    <div className="ps-details-container">
                        <div className="ps-image-section">
                            <div className="ps-image-conatiner">
                                <div className="ps-image-wrapper">
                                    <img src={`/Asserts/Products/${filterProduct.product_image}.jpg`} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="ps-details-data-section">
                            <div className="ps-details-data-container">
                                <div className="ps-details-data-header">
                                    <div className="ps-details-data-title">
                                        <h1>{filterProduct.display_title}</h1>
                                        <h2>{categories[filterProduct.category_id]}</h2>
                                    </div>
                                    {filterProduct.temperature ? <div className="ps-details-data-temperature">
                                        <div className="ps-details-data-temperature-image-wrapper">
                                            <i class="fa-solid fa-temperature-full"></i>
                                        </div>
                                        <h1>{filterProduct.temperature}</h1>
                                    </div> : ""}
                                </div>
                                <div className="ps-details-data-body">
                                    <p>{filterProduct.product_discription}</p>
                                    <div className="pc-physical-dimentions-container">
                                        {filterProduct.physical_dimensions && filterProduct.physical_dimensions.length > 0 && filterProduct.physical_dimensions.map((dimension, index) => (
                                            <Dropdown
                                                key={index}
                                                name={dimension.name}
                                                id={dimension.id}
                                                options={filterProduct.dimension_values
                                                    .filter((value) => {
                                                        if (index === 0) {
                                                            return true;
                                                        } else {
                                                            const prevValue = property[index - 1];
                                                            return prevValue && value.values[filterProduct.physical_dimensions[index - 1].id] === prevValue.value;
                                                        }
                                                    })
                                                    .map((value) => value.values[dimension.id])
                                                    .filter((value, idx, self) => self.indexOf(value) === idx)
                                                }
                                                currentValue={property[index]}
                                                index={index}
                                                propertyValues={property}
                                                setProperty={setProperty}
                                            />

                                        ))}
                                    </div>
                                    <div className="ps-button-wrapper">
                                        <div className="prod-prop-quantity">
                                            <h3 id="quantity_products">Quantity</h3>
                                            <div className="wrapper products">
                                                <span className="minus" onClick={decreaseQuantity} style={quantity === 1 ? { opacity: 0 } : { opacity: 1 }}>-</span>
                                                <span className="num">{quantity}</span>
                                                <span className="plus" onClick={increaseQuantity}>+</span>
                                            </div>
                                        </div>
                                        <button className={filterProduct.physical_dimensions.length === property.length ? "ps-add-to-cart-btn hover" : "ps-add-to-cart-btn no-hover"}
                                            onClick={handleAddToCart}>Add to Cart</button>
                                    </div>
                                    <a className="prod-download-section" href={process.env.PUBLIC_URL + "/Asserts/TechnicalDatasheet/" + filterProduct.product_id + ".pdf"} target="_blank" rel="noreferrer">
                                        <i class="fa-solid fa-download"></i>
                                        <p>Download Technical Datasheet</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <div className="filter-no-pro">
                    <h1>Sorry! No Products Found.</h1>
                </div>}
            <div className={`cart-notifier ${showCartNotifier ? 'show' : ''}`}>
                <div className="cart-notifier-start">
                    <i class="fa-regular fa-circle-check"></i>
                    <h2>"{filterProduct?.display_title}" has been added to your cart.</h2>
                </div>
                <div className="cart-notifier-end">
                    <Link to="/my-cart">VIEW CART</Link>
                    <i className="fa-solid fa-xmark" onClick={() => { setShowCartNotifier(false) }}></i>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default ProductSummary;