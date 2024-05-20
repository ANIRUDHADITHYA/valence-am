import React from 'react';
import "./BecomeASupplier.css";
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

export default function BecomeASupplier() {
    return (
        <div className='bas-section'>
            <Navbar />
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
                    <div className='getInTouchBody'>
                        <div className='contact-input-pair'>
                            <div className="contact-input-pair-wrapper">
                                <div className="floating-label-group">
                                    <input type="text" className="form-control" autoComplete="off" required />
                                    <label className="floating-label">Name</label>
                                </div>
                            </div>
                            <div className="floating-label-group-space">
                            </div>
                            <div className="contact-input-pair-wrapper">
                                <div className="floating-label-group">
                                    <input type="text" id="email" className="form-control" autoComplete="off" required />
                                    <label className="floating-label">Company Name</label>
                                </div>
                            </div>
                        </div>
                        <div className='contact-input-pair'>
                            <div className="contact-input-pair-wrapper">
                                <div className="floating-label-group">
                                    <input type="text" className="form-control" autoComplete="off" required />
                                    <label className="floating-label">Email</label>
                                </div>
                            </div>
                            <div className="floating-label-group-space">

                            </div>
                            <div className="contact-input-pair-wrapper">
                                <div className="floating-label-group">
                                    <input type="text" id="email" className="form-control" autoComplete="off" required />
                                    <label className="floating-label">Phone</label>
                                </div>
                            </div>
                        </div>
                        <div className="floating-label-group">
                            <input type="text" className="form-control" autoComplete="off" required />
                            <label className="floating-label">Company Website</label>
                        </div>
                        <div className="textAreaContactSection">
                            <div class="floating-label-group">
                                <textarea type="text" className="form-control" autoComplete="off" required ></textarea>
                                <label className="floating-label">Please describe your areas of interest</label>
                            </div>
                        </div>
                        <div className='floating-label-group-button bas'>
                            <button>Send Message</button>
                        </div>
                    </div>
                    <p className='bas-conatct-info'>Got questions? Contact our support team at <a href="mailto:enquiry@valence-am.com">enquiry@valence-am.com</a> for assistance.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}
