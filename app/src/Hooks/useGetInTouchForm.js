import { useEffect, useState } from 'react';
import Axios from "axios";
import toast from 'react-hot-toast';
import React from 'react'




const useGetInTouchForm = (Validate) => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const [valuesError, setValuesError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loader, setLoader] = useState(false);
    const [responseMessage, setResponseMessage] = useState(false);

    const handleValueChange = (event) => {
        valuesError[event.target.name] = ""
        const { name, value } = event.target;
        setValues((preValues) => {
            return {
                ...preValues,
                [name]: value,
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValuesError(Validate(values));
        setIsSubmit(true)
    }

    useEffect(() => {
        const getInTouch = async () => {
            try {
                setLoader(true)
                await Axios.post(`${process.env.REACT_APP_API_HOST_URL}/api/forms/getin-touch`, values);
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className='app-toaster'>
                            <i class="fa-regular fa-circle-check"></i>
                            <h1>Request Submitted!</h1>
                        </div>
                    </div>
                ))
                setResponseMessage({ status: true, text: 'We have Received your Feedback successfully!' });
                setValues({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            } catch (error) {
                let errorMessage = 'Sending Feedback Failed!!';
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
            } finally {
                setLoader(false);
            }
        }
        if (Object.keys(valuesError).length === 0 && isSubmit) {
            getInTouch();
            setIsSubmit(false);
        }
    }, [valuesError, isSubmit, values]);

    return { values, valuesError, loader, responseMessage, handleValueChange, handleSubmit }
}


export default useGetInTouchForm;