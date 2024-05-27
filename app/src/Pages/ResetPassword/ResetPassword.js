import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../../Components/Loader/Loader";

const ResetPassword = () => {
    const { resetToken } = useParams();
    const [isValidToken, setIsValidToken] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newPassword) {
            setError("Please enter a new password");
            return;
        } else if (newPassword.length < 8 || newPassword.length > 12) {
            setError("Password must be between 8 to 12 characters");
            return;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}/.test(newPassword)) {
            setError("Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character");
            return
        }

        setLoader(true)

        axios.post(`${process.env.REACT_APP_API_HOST_URL}/api/auth/reset-password/${resetToken}`, {
            newPassword,
        }, { withCredentials: true }).then(response => {
            setLoader(false)
            if (response.data.status) {
                alert('Password has been reset successfully. Click OK to navigate to Products.');
                navigate("/products")
            }
        }).catch(error => {
            setLoader(false)
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className='app-toaster red'>
                        <i className="fa-regular fa-circle-xmark"></i>
                        <h1>{'Invalid or Expired Link'}</h1>
                    </div>
                </div>
            ));
        });
    };

    useEffect(() => {
        const verifyToken = async () => {
            setLoader(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST_URL}/api/auth/verify-reset-token/${resetToken}`, { withCredentials: true });
                setLoader(false)
                if (response.data.status) {
                    setIsValidToken(true);
                }
            } catch (error) {
                setLoader(false)
                setIsValidToken(false);
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className='app-toaster red'>
                            <i className="fa-regular fa-circle-xmark"></i>
                            <h1>{'Invalid or Expired Link'}</h1>
                        </div>
                    </div>
                ));
            }
        };

        verifyToken();
    }, [resetToken]);

    return (
        <div className="forgotPasswordSection">
            <Navbar />
            <Toaster
                position="top-left"
                reverseOrder={false}
            />
            {loader ? <Loader message="Your request is being processed. Please wait..." /> : ""}
            {isValidToken ? (
                <div className="forgotPasswordContainer">
                    <h1>Reset Password</h1>
                    <p>
                        You have reached the password reset page. Please enter your new password below to secure your account.
                    </p>
                    <div className="floating-label-group">
                        <input
                            type="password"
                            id="new-password"
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setError(""); // Clear the error when user starts typing
                            }}
                            className="form-control"
                            autoComplete="off"
                            required
                        />
                        <label className="floating-label">New Password</label>
                    </div>
                    {error && <p className="err-msg-validation" style={{ color: "#aa0000" }}>*{error}</p>}
                    <button onClick={handleSubmit}>Reset Password</button>
                </div>
            ) : (
                <div className="forgotPasswordContainer">
                    <h1>Link Expired</h1>
                    <p>Your password reset link has expired. Don't worry! Just click the button below to restart the process.</p>

                    <a href="/lost-password">RESTART PASSWORD RESET</a>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default ResetPassword;
