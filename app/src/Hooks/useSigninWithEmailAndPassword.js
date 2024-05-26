import { useEffect, useState } from 'react';
import Axios from "axios";
import toast from 'react-hot-toast';

const useSigninWithEmailAndPassword = (Validate) => {

    const [userSigninValues, setUserSigninValues] = useState({
        email: "",
        password: "",
        remember_me: false,
    })

    const [signinValueErrors, setSigninValueErrors] = useState({});
    const [isSignin, setIsSignin] = useState(false);
    const [signinLoader, setSigninLoader] = useState(false);
    const [signinResponseMessage, setSigninResponseMessage] = useState(false);

    const handleSigninValueChange = (event) => {
        const { name, value, type, checked } = event.target;
        setUserSigninValues((prevValues) => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSignin = (event) => {
        event.preventDefault();
        setSigninValueErrors(Validate(userSigninValues));
        setIsSignin(true)
    }

    useEffect(() => {
        const signinUser = async () => {
            try {
                setSigninLoader(true)
                await Axios.post(`${process.env.REACT_APP_API_HOST_URL}/api/auth/signin`, userSigninValues, {
                    withCredentials: true,
                });
                setSigninResponseMessage({ status: true, text: 'Login successful!' });
                setUserSigninValues({
                    email: "",
                    password: "",
                    remember_me: "",
                });
            } catch (error) {
                let errorMessage = 'Login failed. Please try again.';
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
                console.log('Error during login:', error);
            } finally {
                setSigninLoader(false);
            }
        }
        if (Object.keys(signinValueErrors).length === 0 && isSignin) {
            signinUser();
            setIsSignin(false);
        }
    }, [signinValueErrors, isSignin, userSigninValues]);

    return { userSigninValues, signinValueErrors, signinLoader, signinResponseMessage, handleSigninValueChange, handleSignin }
}


export default useSigninWithEmailAndPassword;