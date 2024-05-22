import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
    const { resetToken } = useParams()
    const [isValidToken, setIsValidToken] = useState(false);
    const [newPassword, setNewPassword] = useState("")


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/auth/reset-password/" + resetToken, {
            newPassword,
        }, { withCredentials: true }).then(response => {
            if (response.data.status) {
                navigate('/products')
            }
            console.log(response.data)
        }).catch(error => {
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className='app-toaster red'>
                        <i className="fa-regular fa-circle-xmark"></i>
                        <h1>{'Invalid or Expired Link'}</h1>
                    </div>
                </div>
            ))
        })
    };


    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/auth/verify-reset-token/${resetToken}`, { withCredentials: true });
                if (response.data.status) {
                    setIsValidToken(true);
                } else {

                }
            } catch (error) {
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className='app-toaster red'>
                            <i className="fa-regular fa-circle-xmark"></i>
                            <h1>{'Invalid or Expired Link'}</h1>
                        </div>
                    </div>
                ))
            }

        };

        verifyToken();
    }, [resetToken]);

    return (
        <div className="forgotPasswordSection">
            <Navbar />
            {isValidToken ? <div className="forgotPasswordContainer">
                <h1>Reset Password</h1>
                <p>
                    You have reached the password reset page. Please enter your new password below to secure your account
                </p>
                <div className="floating-label-group">
                    <input type="password" id="new-password" onChange={(e) => setNewPassword(e.target.value)} className="form-control" autoComplete="off" required />
                    <label className="floating-label">New Password</label>
                </div>
                <button onClick={handleSubmit}>Reset Password</button>
            </div> :
                <div className="go-back-to-home">
                    <Link to="/">Invalid Link | Go Back to Home</Link>
                </div>}
            <Footer />
        </div>
    )
}


export default ResetPassword;