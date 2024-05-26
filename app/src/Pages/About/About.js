import { Toaster } from "react-hot-toast";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "./About.css";

const About = () => {
    return (
        <div className="about-us-main">
            <Navbar />

            <Toaster
                position="top-left"
                reverseOrder={false}
            />
            <div className="page-titles">
                <div className="entry-titles">
                    About
                </div>
                <div className="entry-subtitles">
                    <p>House of Composite Consumables</p>
                </div>
            </div>
            <div className='about-us-image'>
            </div>
            <div className='aboutUsInformation'>
                <div className="aboutUsMainContainer">
                    <h1>The Company</h1>
                    <h3>Welcome to Valence Advanced Materials – your gateway to cutting-edge composite solutions. With a commitment to excellence, we provide a meticulously curated selection of premium consumables, engineered to elevate your projects to new heights of performance and precision.</h3>
                    <p>
                        Whether you are pushing the boundaries of aerospace engineering, revolutionizing wind blade design, or crafting aerial vehicle marvels, our state-of-the-art materials empower you to achieve unparalleled results.
                    </p>
                    <p>
                        Join us at Valence, where every roll of film, every layer of fabric, carries within it the promise of progress, the promise of transformation. Together, let us weave a tapestry of innovation, where technology and emotion converge to shape a world where the only limit is our imagination.
                    </p>

                    <div className='aboutUsMainBody'>
                        <div className='aboutUsVM'>
                            <h4>Our Mission</h4>
                            <p>To empower the composite industry with high-quality consumables that bridge imagination with reality and support the visionaries who shape the future through their creations.</p>
                        </div>
                        <div className='aboutUsVM'>
                            <h4>Our Vision</h4>
                            <p>We envision a future to become the foremost global provider of composite consumables, driving unparalleled innovation and setting the standard for excellence.</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className='about-us-features'>
                <div className='about-us-features-container'>
                    <img src='/Asserts/About/icon1.png' alt="Extreme Temperature Resilience"></img>
                    <h3>Extreme Temperature Resilience</h3>
                    <p>Valence's consumables thrive in temperatures from room level to an impressive 260°C, ensuring reliability in diverse conditions.</p>
                </div>
                <div className='about-us-features-container'>
                    <img src='/Asserts/About/icon2.png' alt="Versatile Manufacturing Compatibility"></img>
                    <h3>Versatile Manufacturing Compatibility</h3>
                    <p>Our products excel across wet layup, resin infusion, oven curing, and autoclave curing processes, enduring pressures up to 10 bar for consistent, high-quality results.</p>
                </div>
                <div className='about-us-features-container'>
                    <img src='/Asserts/About/icon3.png' alt="Extensive Customization Options"></img>
                    <h3>Extensive Customization Options</h3>
                    <p>With over 200 unique product lines, Valence offers tailored solutions, from varying thicknesses to customizable widths, empowering clients with precise tools for enhanced efficiency and performance.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About;