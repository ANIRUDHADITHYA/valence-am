import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./SignSlider.css";
import useSignupWithEmailAndPassword from '../../Hooks/useSignupWithEmailAndPassword';
import useSigninWithEmailAndPassword from '../../Hooks/useSigninWithEmailAndPassword';
import ValidateSignup from '../../Utlis/ValidateSignup';
import ValidateSignin from '../../Utlis/ValidateSignin';

export default function SignSlider(props) {

    const { isSignInOpen, setSignInOpen, openSignSlider } = props;

    const [signIn, setSignIn] = useState(true);


    const handleSidebarClose = (event) => {
        if (event.target === event.currentTarget) {
            setSignInOpen(false);
        }
    }

    const { userSignupValues, signupValueErrors, signupLoader, signupResponseMessage, handleSignupValueChange, handleSignup } = useSignupWithEmailAndPassword(ValidateSignup);
    const { userSigninValues, signinValueErrors, signinLoader, signinResponseMessage, handleSigninValueChange, handleSignin } = useSigninWithEmailAndPassword(ValidateSignin);

    useEffect(() => {
        if (signupResponseMessage.status) {
            setSignIn(true)
        }
        if (signinResponseMessage.status) {
            window.location.reload()
        }
        if (openSignSlider) {
            setSignInOpen(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signupResponseMessage, signinResponseMessage, openSignSlider])
    return (
        <div>

            <div className={isSignInOpen ? `sign-in-sidebar open` : `sign-in-sidebar`} onClick={handleSidebarClose}>
                <div className='sign-in-container'>
                    <div className="signInBarContainer">

                        <div className="signInHeader">
                            {signIn ? <p className='sign-up-p'>Sign In</p> : <p className='sign-up-p'>Sign Up</p>}
                            <div className="closeButton" onClick={() => setSignInOpen(false)}><p>Close</p> <span> &times;</span></div>
                        </div>
                        {signIn ?
                            <div className={signinLoader ? "signInInput loader" : "signInInput"}>
                                {!signinLoader && <>
                                    <div className="floating-label-group slider-login">
                                        <input
                                            type="text"
                                            id="email"
                                            className="form-control"
                                            name="email"
                                            value={userSigninValues.email}
                                            onChange={handleSigninValueChange}
                                            autoComplete="off"
                                            required
                                        />
                                        <label className="floating-label">Email</label>
                                        {signinValueErrors.email && <span className="err-msg-validation">*{signinValueErrors.email}</span>}
                                    </div>
                                    <div className="floating-label-group slider-login">
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            name="password"
                                            value={userSigninValues.password}
                                            onChange={handleSigninValueChange}
                                            autoComplete="off"
                                            required
                                        />
                                        <label className="floating-label">Password</label>
                                        {signinValueErrors.password && <span className="err-msg-validation">*{signinValueErrors.password}</span>}
                                    </div>
                                    <div className="rememberMe">
                                        <input
                                            type="checkbox"
                                            name="remember_me"
                                            checked={userSigninValues.remember_me}
                                            onChange={handleSigninValueChange}
                                        />
                                        <label>Remember me</label>
                                    </div>
                                </>}
                                {signinLoader ? <button className="signInBtn">SIGNING IN PLEASE WAIT...</button> : <button className="signInBtn" onClick={handleSignin}>SIGN IN</button>}
                                {!signinLoader && <button className="signUpBtn" onClick={() => { setSignIn(false) }} >BECOME A VALENCIAN</button>}
                            </div> :
                            <div className={signupLoader ? "signInInput loader" : "signInInput"}>
                                {!signupLoader && <div>
                                    <div className="floating-label-group slider">
                                        <input
                                            type="text"
                                            name="name"
                                            value={userSignupValues.name}
                                            onChange={handleSignupValueChange}
                                            id="name"
                                            className="form-control"
                                            autoComplete="off" required
                                        />
                                        <label className="floating-label">Name</label>
                                        {signupValueErrors.name && <p className="err-msg-validation">*{signupValueErrors.name}</p>}
                                    </div>
                                    <div className="floating-label-group slider">
                                        <input
                                            type="text"
                                            name="company_name"
                                            value={userSignupValues.company_name}
                                            onChange={handleSignupValueChange}
                                            id="company_name"
                                            className="form-control"
                                            autoComplete="off" required
                                        />
                                        <label className="floating-label">Company Name</label>
                                        {signupValueErrors.company_name && <p className="err-msg-validation">*{signupValueErrors.company_name}</p>}
                                    </div>
                                    <div className="floating-label-group slider">
                                        <input
                                            type="number"
                                            name="mobile"
                                            value={userSignupValues.mobile}
                                            onChange={handleSignupValueChange}
                                            id="mobile"
                                            className="form-control"
                                            autoComplete="off"
                                            required
                                        />
                                        <label className="floating-label">Mobile Number</label>
                                        {signupValueErrors.mobile && <p className="err-msg-validation">*{signupValueErrors.mobile}</p>}
                                    </div>
                                    <div className="floating-label-group slider">
                                        <input
                                            type="text"
                                            name="email"
                                            value={userSignupValues.email}
                                            onChange={handleSignupValueChange}
                                            id="email"
                                            className="form-control"
                                            autoComplete="off"
                                            required
                                        />
                                        <label className="floating-label">Email</label>
                                        {signupValueErrors.email && <p className="err-msg-validation">*{signupValueErrors.email}</p>}
                                    </div>
                                    <div className="floating-label-group slider">
                                        <input
                                            type="password"
                                            name="password"
                                            value={userSignupValues.password}
                                            onChange={handleSignupValueChange}
                                            id="password"
                                            className="form-control"
                                            autoComplete="off"
                                            required
                                        />
                                        <label className="floating-label">Password</label>
                                        {signupValueErrors.password && <p className="err-msg-validation">*{signupValueErrors.password}</p>}
                                    </div>
                                </div>}
                                {signupLoader ? <button className="signInBtn">SIGNING UP PLEASE WAIT...</button> : <button className="signInBtn" onClick={handleSignup}>SIGN UP</button>}
                            </div>}
                        {(!signupLoader || !signinLoader) &&
                            <div className="lostPass">
                                {signIn ? <Link to="/lost-password" onClick={() => { setSignInOpen(false) }} >LOST YOUR PASSWORD ?</Link> : <button onClick={() => { setSignIn(true) }}>ALREADY A VALENCIAN ?</button>}
                            </div>}
                    </div>
                </div>
            </div>
        </div >
    )
}
