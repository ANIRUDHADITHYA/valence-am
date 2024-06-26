import OutsideClickHandler from "react-outside-click-handler";
import { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import { processes, categories, sortProcessByTemperatue, imageCDN } from "../../Utlis/globalVariables.js"
import Navbar from "../../Components/Navbar/Navbar";
import "./Products.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { ProductsContext } from "../../ContextAPI/ProductsContext.js";
import { Toaster } from "react-hot-toast";
import { Helmet } from 'react-helmet';

const Products = () => {

    const { allProducts } = useContext(ProductsContext);

    const [everythingClick, setEverythingClick] = useState(false);
    const [categoriesClick, setCategoriesClick] = useState(false);

    const location = useLocation();
    const history = useNavigate();
    const params = new URLSearchParams(location.search);

    const [category, setCategory] = useState(1);
    const [process, setProcess] = useState(0);


    useEffect(() => {
        const categoryParam = params.get("category");
        const processParam = params.get("process");

        if (categoryParam !== null) {
            setCategory(parseInt(categoryParam));
        } else {
            setCategory(1);
        }

        if (processParam !== null) {
            setProcess(parseInt(processParam));
        } else {
            setProcess(0);
        }

        if (categoryParam > 7 && processParam < 1) {
            history("/products")
        }
        if (categoryParam < 0 || processParam < 0) {
            history("/products")
        }
        if (categoryParam > 11 || processParam > 1) {
            history("/products")
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.get("category"), params.get("process")]);

    const filteredProducts = allProducts.filter(product => {
        const categoryCondition = category === 0 || product.category_id === category;
        const processCondition = product.process.some(product_process => product_process.id === process);
        return categoryCondition && processCondition;
    });

    let sortedProducts = filteredProducts;

    if (sortProcessByTemperatue[process] === "ACC") {
        sortedProducts = filteredProducts.sort((a, b) => a.temperature - b.temperature);
    } else if (sortProcessByTemperatue[process] === "DESC") {
        sortedProducts = filteredProducts.sort((a, b) => b.temperature - a.temperature);
    }

    return (
        <>
            <Helmet>
                <title>Valence | Products</title>
                <meta name="description" content="Our Composite Universe!" />
            </Helmet>
            <div className="products-section">
                < Navbar />
                <Toaster
                    position="top-left"
                    reverseOrder={false}
                />
                <div className="products-container">
                    <h1 className="product-title">Products</h1>
                    <div className="product-header-container">
                        <h2>You're looking at
                            <span class="product-dropdown">

                                <OutsideClickHandler onOutsideClick={() => { setEverythingClick(false) }}>
                                    <button class="product-dropbtn" onClick={() => { setEverythingClick(true) }}><h2>{categories[category]} <i class="fa-solid fa-angle-down"></i></h2></button>
                                </OutsideClickHandler>
                                <span class={everythingClick ? "product-dropdown-content active" : "product-dropdown-content"}>
                                    <Link to={`/products?process=${process}&category=1`} className={category === 1 ? "product-dropdown-selected" : ""}>{categories[1]}</Link>
                                    <Link to={`/products?process=${process}&category=2`} className={category === 2 ? "product-dropdown-selected" : ""}>{categories[2]}</Link>
                                    <Link to={`/products?process=${process}&category=3`} className={category === 3 ? "product-dropdown-selected" : ""}>{categories[3]}</Link>
                                    <Link to={`/products?process=${process}&category=4`} className={category === 4 ? "product-dropdown-selected" : ""}>{categories[4]}</Link>
                                    <Link to={`/products?process=${process}&category=5`} className={category === 5 ? "product-dropdown-selected" : ""}>{categories[5]}</Link>
                                    <Link to={`/products?process=${process}&category=6`} className={category === 6 ? "product-dropdown-selected" : ""}>{categories[6]}</Link>
                                    <Link to={`/products?process=${process}&category=7`} className={category === 7 ? "product-dropdown-selected" : ""}>{categories[7]}</Link>
                                    {process === 1 && <Link to={`/products?process=${process}&category=8`} className={category === 8 ? "product-dropdown-selected" : ""}>{categories[8]}</Link>}
                                    {process === 1 && <Link to={`/products?process=${process}&category=9`} className={category === 9 ? "product-dropdown-selected" : ""}>{categories[9]}</Link>}
                                    {process === 1 && <Link to={`/products?process=${process}&category=10`} className={category === 10 ? "product-dropdown-selected" : ""}>{categories[10]}</Link>}
                                    {process === 1 && <Link to={`/products?process=${process}&category=11`} className={category === 11 ? "product-dropdown-selected" : ""}>{categories[11]}</Link>}
                                </span>

                            </span>

                            suited for

                            <span class="product-dropdown">
                                <OutsideClickHandler onOutsideClick={() => { setCategoriesClick(false) }}>
                                    <button class="product-dropbtn" onClick={() => { setCategoriesClick(true) }}><h2>{processes[process]} <i class="fa-solid fa-angle-down"></i></h2></button>
                                </OutsideClickHandler>
                                <span class={categoriesClick ? "product-dropdown-content active" : "product-dropdown-content"}>
                                    <Link to={`/products?process=0&category=${category}`} className={process === 0 ? "product-dropdown-selected" : ""}>{processes[0]}</Link>
                                    <Link to={`/products?process=1&category=${category}`} className={process === 1 ? "product-dropdown-selected" : ""}>{processes[1]}</Link>
                                </span>

                            </span>

                            process
                        </h2>
                    </div>

                    <div class="container">
                        <div class="row">
                            {sortedProducts.length ? (
                                sortedProducts.map(product => (
                                    <div class="col-6 col-sm-6 col-md-4 col-lg-3 mb-5" key={product.index}>
                                        <Link className="product-card" key={product.index} to={`/products/${product.product_id}?process=${process}`}>
                                            <div className="product-card-img">
                                                <img src={`${imageCDN}/${product.product_image}.jpg`} alt="" />
                                            </div>
                                            <div className="min-details">
                                                <div className="products-card-title-container">
                                                    <h1>{product.product_name}</h1>
                                                    <h2>{categories[product.category_id]}</h2>
                                                </div>
                                                {product.temperature ?
                                                    <div className="products-card-temp-container">
                                                        <i class="fa-solid fa-temperature-full"></i>
                                                        <h2>{product.temperature}°C</h2>
                                                    </div> : ""}
                                            </div>
                                        </Link>
                                    </div>

                                ))
                            ) : (
                                <div className="filter-no-pro">
                                    <h1>Sorry! No Products Found.</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}


export default Products;