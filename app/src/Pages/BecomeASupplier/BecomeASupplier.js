import React from 'react';
import "./BecomeASupplier.css";
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import useBecomeASupplierForm from '../../Hooks/useBecomeASupplierForm';
import ValidateBecomeASupplier from '../../Utlis/ValidateBecomeASupplier';
import { Toaster } from 'react-hot-toast';
import Loader from '../../Components/Loader/Loader';
import { Helmet } from 'react-helmet';

export default function BecomeASupplier() {
    const { values, valuesError, loader, handleValueChange, handleSubmit } = useBecomeASupplierForm(ValidateBecomeASupplier);
    return (
        <>
            <Helmet>
                <title>Valence | Become A Supplier</title>
                <meta name="description" content="Driving innovation through unity." />
            </Helmet>
            <div className='bas-section'>
                <Navbar />
                <Toaster
                    position="top-left"
                    reverseOrder={false}
                />
                <div className="page-titles">
                    <div className="entry-titles-bas">
                        Welcome Composite Vendors!
                    </div>
                    <div className="entry-subtitles-bas">
                        <p>Are you a supplier of high-quality materials tailored to aid the manufacturing of composite parts?
                            <br />

                            <span>Join us and gain exposure to a targeted audience eager for innovative solutions.</span></p>
                    </div>
                </div>
                <div className='bas-image'></div>
                <div className='bas-features-container'>
                    <h1 className='bas-features-title'>Why Choose Us?</h1>
                    <div className='about-us-features'>
                        <div className='about-us-features-container'>
                            <img src='/Asserts/BAS/icon1.png' alt="Specialized Audience"></img>
                            <h3>Specialized Audience</h3>
                            <p>Our platform caters specifically to composite manufacturers and enthusiasts ensuring that your products are seen by the right audience.</p>
                        </div>
                        <div className='about-us-features-container'>
                            <img src='/Asserts/BAS/icon2.png' alt="Versatile Manufacturing Compatibility"></img>
                            <h3>Industry Expertise</h3>
                            <p>Benefit from our deep understanding of the composite manufacturing process and our network of professionals who are constantly seeking new & innovative materials to enhance their projects.</p>
                        </div>
                        <div className='about-us-features-container'>
                            <img src='/Asserts/BAS/icon3.png' alt="Extensive Customization Options"></img>
                            <h3>Market Expanison</h3>
                            <p>Expand your market reach by showcasing your products to a global community of composite manufacturers, research scientists and engineers passionate about composites.</p>
                        </div>
                    </div>
                </div>
                <div className="aboutUsMainContainer bas">
                    <h1>Our Commitment</h1>
                    <h3>We're committed to providing you with a platform that empowers your business growth. Our team is dedicated to supporting you throughout your journey on our platform, from setting up a seamless supplychain, stocking as per your standards and customer's demands thereby maximizing your sales potential.</h3>
                </div>
                <div className='getInTouchSection bas'>
                    <div className='getInTouchSectionContainer'>
                        <h1>Ready to Get Started ?</h1>
                        {loader ?
                            <Loader message={"Your application is being processed. Please wait..."} />
                            : ""}
                        <div className='getInTouchBody'>
                            <div className='contact-input-pair'>
                                <div className="contact-input-pair-wrapper">
                                    <div className="floating-label-group">
                                        <input
                                            type="text"
                                            name='name'
                                            value={values.name}
                                            onChange={handleValueChange}
                                            className="form-control"
                                            autoComplete="off"
                                            required />
                                        <label className="floating-label">Name</label>
                                    </div>
                                    {valuesError.name && <span className="err-msg-validation" style={{ color: "#aa0000" }}>*{valuesError.name}</span>}
                                </div>
                                <div className="floating-label-group-space">
                                </div>
                                <div className="contact-input-pair-wrapper">
                                    <div className="floating-label-group">
                                        <input
                                            type="text"
                                            name='company_name'
                                            value={values.company_name}
                                            onChange={handleValueChange}
                                            className="form-control"
                                            autoComplete="off"
                                            required />
                                        <label className="floating-label">Company Name</label>
                                    </div>
                                    {valuesError.company_name && <span className="err-msg-validation" style={{ color: "#aa0000" }}>*{valuesError.company_name}</span>}
                                </div>
                            </div>
                            <div className='contact-input-pair'>
                                <div className="contact-input-pair-wrapper">
                                    <div className="floating-label-group">
                                        <input
                                            type="text"
                                            name='email'
                                            value={values.email}
                                            onChange={handleValueChange}
                                            className="form-control"
                                            autoComplete="off"
                                            required />
                                        <label className="floating-label">Email</label>
                                    </div>
                                    {valuesError.email && <span className="err-msg-validation" style={{ color: "#aa0000" }}>*{valuesError.email}</span>}
                                </div>
                                <div className="floating-label-group-space">
                                </div>
                                <div className="contact-input-pair-wrapper">
                                    <div className="floating-label-group">
                                        <input
                                            type="number"
                                            name='phone'
                                            value={values.phone}
                                            onChange={handleValueChange}
                                            className="form-control"
                                            autoComplete="off"
                                            required />
                                        <label className="floating-label">Phone</label>
                                    </div>
                                    {valuesError.phone && <span className="err-msg-validation" style={{ color: "#aa0000" }}>*{valuesError.phone}</span>}
                                </div>
                            </div>
                            <div className="floating-label-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    autoComplete="off"
                                    name='company_website'
                                    value={values.company_website}
                                    onChange={handleValueChange}
                                    required />
                                <label className="floating-label">Company Website</label>
                            </div>
                            {valuesError.company_website && <span className="err-msg-validation" style={{ color: "#aa0000" }}>*{valuesError.company_website}</span>}
                            <div className="textAreaContactSection">
                                <div class="floating-label-group">
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        autoComplete="off"
                                        name='message'
                                        value={values.message}
                                        onChange={handleValueChange}
                                        required
                                    >
                                    </textarea>
                                    <label className="floating-label">Please describe your areas of interest</label>
                                </div>
                                {valuesError.message && <span className="err-msg-validation" style={{ color: "#aa0000" }}>*{valuesError.message}</span>}
                            </div>
                            <div className='floating-label-group-button bas'>
                                <button onClick={handleSubmit}>Send Message</button>
                            </div>
                        </div>
                        <p className='bas-conatct-info'>Got questions? Contact our support team at <a href="mailto:enquiry@valence-am.com">enquiry@valence-am.com</a> for assistance.</p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
