import { Link } from "react-router-dom";
import "./Footer.css";


const Footer = () => {

    return (
        <div className="footerContainer">
            <div className="footerMain">
                <Link to="/" className="footerItem start">© 2024 Valence Advanced Materials Private Limited. <br />All Rights Reserved.</Link>
                <div className="footerItem center">
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-use">Terms of Use</a>
                </div>
                <div className="footerItem end">
                    <a href="/become-a-supplier" className="end-bas">Become a Supplier!</a>
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