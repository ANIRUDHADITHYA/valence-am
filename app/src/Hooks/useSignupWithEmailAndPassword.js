import { useEffect, useState } from 'react';
import Axios from "axios";
import toast from 'react-hot-toast';

const useSignupWithEmailAndPassword = (Validate) => {

    const [userSignupValues, setUserSignupValues] = useState({
        name: "",
        company_name: "",
        mobile: "",
        email: "",
        password: "",
    })

    const [signupValueErrors, setSignupValueErrors] = useState({});
    const [isSignup, setIsSignup] = useState(false);
    const [signupLoader, setSignupLoader] = useState(false);
    const [signupResponseMessage, setSignupResponseMessage] = useState(false);

    const handleSignupValueChange = (event) => {
        signupValueErrors[event.target.name] = ""
        const { name, value } = event.target;
        setUserSignupValues((preValues) => {
            return {
                ...preValues,
                [name]: value,
            }
        })
    }

    const handleSignup = (event) => {
        event.preventDefault();
        setSignupValueErrors(Validate(userSignupValues));
        setIsSignup(true)
    }

    useEffect(() => {
        const signupUser = async () => {
            try {
                setSignupLoader(true)
                await Axios.post(`${process.env.REACT_APP_API_HOST_URL}/auth/signup`, userSignupValues, { withCredentials: true });
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className='app-toaster'>
                            <i class="fa-regular fa-circle-check"></i>
                            <h1>Registration successful!</h1>
                        </div>
                    </div>
                ))
                setSignupResponseMessage({ status: true, text: 'Registration successful!' });
                setUserSignupValues({
                    name: "",
                    company_name: "",
                    mobile: "",
                    email: "",
                    password: "",
                });
            } catch (error) {
                let errorMessage = 'Registration failed. Please try again.';
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className='app-toaster red'>
                            <i className="fa-regular fa-circle-xmark"></i>
                            <h1>{errorMessage}</h1>
                        </div>
                    </div>
                ))
                console.log('Error during registration:', error);
            } finally {
                setSignupLoader(false);
            }
        }
        if (Object.keys(signupValueErrors).length === 0 && isSignup) {
            signupUser();
            setIsSignup(false);
        }
    }, [signupValueErrors, isSignup, userSignupValues]);

    return { userSignupValues, signupValueErrors, signupLoader, signupResponseMessage, handleSignupValueChange, handleSignup }
}


export default useSignupWithEmailAndPassword;