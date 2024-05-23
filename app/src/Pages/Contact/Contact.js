import Footer from "../../Components/Footer/Footer"
import Navbar from "../../Components/Navbar/Navbar"
import "./Contact.css";

const Contact = () => {
    return (
        <div className="contact-main">
            <Navbar />

            <div className="page-titles">
                <div className="entry-titles">
                    Contact
                </div>
                <div className="entry-subtitles">
                    <p>We are here to serve you!</p>
                </div>
            </div>
            <div className="contact-gmap">
                {// eslint-disable-next-line
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.154202934989!2d77.60055677457713!3d13.08941191228541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae174d95af27ad%3A0x11ca21cd71d9401!2sValence%20Advanced%20Materials%20Private%20Limited!5e0!3m2!1sen!2sin!4v1715736987990!5m2!1sen!2sin"
                        style={{ border: 0 }}
                        allowfullscreen=""
                        loading="eager"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                }
            </div>
            <div className='contactInformation'>
                <div className='contactMainContainer'>
                    <h1>Contact Information</h1>
                    <table className='contactMainTable'>
                        <tbody>
                            <tr id="contact-address-tr">
                                <td valign="top" className='contactTableHeading mainAddress'>
                                    <div className='india-Office'>
                                        <h4>INDIA</h4>
                                        <p>Registered Office</p>
                                    </div>
                                </td>
                                <td valign="top">
                                    <table className='contactSubTable'>
                                        <tbody>
                                            <tr>
                                                <td className='contactTableSubHeading' valign="top"><h5>ADDRESS</h5></td>
                                                <td>
                                                    <p>
                                                        <a target="_blank" rel="noreferrer" href={"https://www.google.com/maps/place/Valence+Advanced+Materials+Private+Limited/@13.0894067,77.6031317,15z/data=!4m2!3m1!1s0x0:0x11ca21cd71d9401?sa=X&ved=2ahUKEwjW8qbn_8-CAxWRSWwGHbDpApMQ_BJ6BAg5EAA"}>
                                                            Valence Advanced Materials Private Limited<br></br>
                                                            # 223, 3rd B Phase L/O, Shivanahalli (V), Yelahanka (H),<br /> Bangalore - 560 064, Karnataka, India<br></br>
                                                        </a>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='contactTableSubHeading' valign="top"><h5>CIN</h5></td>
                                                <td>
                                                    <p>
                                                        U51909KA2020PTC132570
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='contactTableSubHeading' valign="top"><h5>GST</h5></td>
                                                <td>
                                                    <p>
                                                        29AAHCV3120A1ZR
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='contactTableSubHeading' valign="top"><h5>PHONE</h5></td>
                                                <td><p><a href="tel:+919353784714">+91 9353 78 4714</a></p></td>
                                            </tr>
                                            <tr>
                                                <td className='contactTableSubHeading' valign="top"><h5>EMAIL</h5></td>
                                                <td>
                                                    <p>
                                                        <a href="mailto:enquiry@valence-am.com">enquiry@valence-am.com</a>
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr id="contact-social-tr">
                                <td className='contactTableHeading'>
                                    <h4 className="social">SOCIAL MEDIA</h4>
                                </td>
                                <td>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="contact-us-social"><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/valence-advanced-materials/"><i class="fa-brands fa-linkedin-in"></i></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <div className='getInTouchSection'>
                        <div className='getInTouchSectionContainer'>
                            <h1>Get In Touch</h1>
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
                                            <label className="floating-label">Email</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="floating-label-group">
                                    <input type="text" className="form-control" autoComplete="off" required />
                                    <label className="floating-label">Subject</label>
                                </div>
                                <div className="textAreaContactSection">
                                    <div class="floating-label-group">
                                        <textarea type="text" className="form-control" autoComplete="off" required ></textarea>
                                        <label className="floating-label">Message</label>
                                    </div>
                                </div>
                                <div className='floating-label-group-button'>
                                    <button>Send Message</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default Contact;