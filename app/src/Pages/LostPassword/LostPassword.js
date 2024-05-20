import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "./LostPassword.css";

const LostPassword = () => {
    return (
        <div className="forgotPasswordSection">
            <Navbar />
            <div className="forgotPasswordContainer">
                <h1>Lost password</h1>
                <p>
                    Lost your password? Please enter your registered email address. You will receive a link to create a new password via email.
                </p>
                <div className="floating-label-group">
                    <input type="text" id="email" className="form-control" autoComplete="off" required />
                    <label className="floating-label">Registered Email Address</label>
                </div>
                <button>Reset Password</button>
            </div>
            <Footer />
        </div>
    )
}


export default LostPassword;