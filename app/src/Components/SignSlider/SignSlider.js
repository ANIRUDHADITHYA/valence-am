import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./SignSlider.css";

export default function SignSlider(props) {

    const { isSignInOpen, setSignInOpen } = props;

    const [signIn, setSignIn] = useState(true);


    const handleSidebarClose = (event) => {
        if (event.target === event.currentTarget) {
            setSignInOpen(false);
        }
    }
    return (
        <div>
            <div className={isSignInOpen ? `sign-in-sidebar open` : `sign-in-sidebar`} onClick={handleSidebarClose}>
                <div className='sign-in-container'>
                    <div className="signInBarContainer">
                        <div className="signInHeader">
                            {signIn ? <p className='sign-up-p'>Sign In</p> : <p className='sign-up-p'>Sign Up</p>}
                            <div className="closeButton" onClick={() => setSignInOpen(false)}><p>Close</p> <span> &times;</span></div>
                        </div>
                        {signIn ? <div className="signInInput">
                            <div>
                                <div className="floating-label-group">
                                    <input type="text" id="email" className="form-control" autoComplete="off" required />
                                    <label className="floating-label">Email</label>
                                </div>
                                <div className="floating-label-group bottom">
                                    <input type="password" id="password" className="form-control" autoComplete="off" required />
                                    <label className="floating-label">Password</label>
                                </div>
                            </div>
                            <div className="rememberMe">
                                <input type="checkbox"></input>
                                <label>Remember me</label>
                            </div>
                            {/*loginError && <p className="err-msg-validation">*{loginError}</p>*/}
                            <button className="signInBtn" >SIGN IN</button>
                            <button className="signUpBtn" onClick={() => { setSignIn(false) }} >BECOME A VALENCIAN!</button>
                        </div> :
                            <div className="signInInput">
                                <div>
                                    <div className="floating-label-group">
                                        <input type="text" name="name" /*value={userValues.name} onChange={handleChange}*/ id="name" className="form-control" autoComplete="off" required />
                                        <label className="floating-label">Name</label>
                                        {/*registerErrors.name && <p className="err-msg-validation">*{registerErrors.name}</p>*/}
                                    </div>
                                    <div className="floating-label-group">
                                        <input type="text" name="company_name" /*value={userValues.company_name} onChange={handleChange}*/ id="company_name" className="form-control" autoComplete="off" required />
                                        <label className="floating-label">Company Name</label>
                                        {/*registerErrors.company_name && <p className="err-msg-validation">*{registerErrors.company_name}</p>*/}
                                    </div>
                                    <div className="floating-label-group">
                                        <input type="number" name="mobile" /*value={userValues.mobile} onChange={handleChange}*/ id="mobile" className="form-control" autoComplete="off" required />
                                        <label className="floating-label">Mobile Number</label>
                                        {/*registerErrors.mobile && <p className="err-msg-validation">*{registerErrors.mobile}</p>*/}
                                    </div>
                                    <div className="floating-label-group">
                                        <input type="text" name="email" /*value={userValues.email} onChange={handleChange}*/ id="email" className="form-control" autoComplete="off" required />
                                        <label className="floating-label">Email</label>
                                        {/*registerErrors.email && <p className="err-msg-validation">*{registerErrors.email}</p>*/}
                                    </div>
                                    <div className="floating-label-group bottom">
                                        <input type="password" name="password" /*value={userValues.password} onChange={handlePassword}*/ id="password" className="form-control" autoComplete="off" required />
                                        <label className="floating-label">Password</label>
                                        {/*registerErrors.password && <p className="err-msg-validation">*{registerErrors.password}</p>*/}
                                    </div>
                                    {/*registerErrors.other_error && <p className="err-msg-validation">*{registerErrors.other_error}</p>*/}

                                </div>

                                <button className="signInBtn" >SIGN UP</button>
                            </div>}
                        <div className="lostPass">
                            {signIn ? <Link to="/lost-password" onClick={() => { setSignInOpen(false) }} >LOST YOUR PASSWORD ?</Link> : <button onClick={() => { setSignIn(true) }}>ALREADY A VALENCIAN ?</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
