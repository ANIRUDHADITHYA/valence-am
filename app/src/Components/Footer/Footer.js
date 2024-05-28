import { Link } from "react-router-dom";
import "./Footer.css";


const Footer = () => {

    return (
        <div className="footerContainer">
            <div className="footerMain">
                <Link to="/" className="footerItem start">© 2024 Valence Advanced Materials Private Limited. <br />All Rights Reserved.</Link>
                <div className="footerItem center">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-of-use">Terms of Use</Link>
                </div>
                <div className="footerItem end">
                    <Link to="/become-a-supplier" className="end-bas">Become a Supplier!</Link>
                    <div className="social-footer">
                        <a href="mailto:enquiry@valence-am.com"><i class="fa-regular fa-envelope"></i></a>
                        <a href="https://www.linkedin.com/company/valence-advanced-materials/" target="_blank" rel="noreferrer"><i class="fa-brands fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Footer;