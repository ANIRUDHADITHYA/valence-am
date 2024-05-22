import { useContext, useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "./LostPassword.css";
import Axios from "axios"
import { toast } from 'react-hot-toast';
import { AuthContext } from "../../ContextAPI/AuthContext";

const LostPassword = () => {
    const { user, signout } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            signout()
        }
    }, [user, signout])
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deliveryMessage, setDeliveryMessage] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setEmailError('');

        setIsSubmitting(true);
        try {
            await Axios.post(
                `${process.env.REACT_APP_API_HOST_URL}/auth/forgot-password`,
                { email },
                { withCredentials: true } // Include credentials in the request
            );
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className='app-toaster'>
                        <i class="fa-regular fa-circle-check"></i>
                        <h1>Email sent successfully!</h1>
                    </div>
                </div>
            ))
            setDeliveryMessage(true)
        } catch (error) {
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className='app-toaster red'>
                        <i className="fa-regular fa-circle-xmark"></i>
                        <h1>{error.response?.data?.message || 'Failed to send email. Please try again.'}</h1>
                    </div>
                </div>
            ))
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="forgotPasswordSection">
            <Navbar />
            <div className="forgotPasswordContainer">
                <h1>Lost Password</h1>
                {isSubmitting ?
                    <p className="email-sent-msg pl">Please wait. While we process your request.</p> :
                    deliveryMessage ?
                        <p className="email-sent-msg">We have sent you the password reset link to your registered email address. Please check your inbox or spam folder.<b> Note that the link will expire within 5 minutes.</b></p> :
                        <>
                            <p>
                                Lost your password? Please enter your registered email address. You will receive a link to create a new password via email.
                            </p>
                            <div className="floating-label-group">
                                <input type="text" id="email" className="form-control" autoComplete="off" required onChange={handleChange} />
                                <label className="floating-label">Registered Email Address</label>
                                {emailError && <span className="err-msg-validation" style={{ color: "#aa0000" }}>*{emailError}</span>}
                            </div>
                            <button onClick={handleSubmit}>RESET PASSWORD</button>
                        </>
                }
            </div>
            <Footer />
        </div >
    )
}


export default LostPassword;