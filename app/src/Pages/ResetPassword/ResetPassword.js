import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
    const { resetToken } = useParams()

    const [newPassword, setNewPassword] = useState("")


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/auth/reset-password/" + resetToken, {
            newPassword,
        }).then(response => {
            if (response.data.status) {
                navigate('/')
            }
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
    };

    return (
        <div className="forgotPasswordSection">
            <Navbar />
            <div className="forgotPasswordContainer">
                <h1>Reset Password</h1>
                <p>
                    You have reached the password reset page. Please enter your new password below to secure your account
                </p>
                <div className="floating-label-group">
                    <input type="password" id="new-password" onChange={(e) => setNewPassword(e.target.value)} className="form-control" autoComplete="off" required />
                    <label className="floating-label">New Password</label>
                </div>
                <button onClick={handleSubmit}>Reset Password</button>
            </div>
            <Footer />
        </div>
    )
}


export default ResetPassword;