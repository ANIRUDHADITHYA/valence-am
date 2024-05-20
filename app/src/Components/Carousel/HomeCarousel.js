import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import "./HomeCarousel.css";

export default function HomeCarousel() {
    return (
        <div className='home-carousel-container'>
            <Carousel pause={false} controls={false} interval={5000} fade={true} >
                <Carousel.Item interval={4000}>
                    <img src="/Asserts/Carousel/caro1_c.jpeg"></img>
                    <Carousel.Caption className='start'>
                        <div class="slide-right">
                            <h2>House <span className='span-of' style={{ fontFamily: "of", paddingRight: "35px" }}>of</span><br /> Composite Consumables</h2>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img src="/Asserts/Carousel/caro2_c.jpeg"></img>

                    <Carousel.Caption className='mid'>
                        <div class="slide-right">
                            <h2>Autoclave <span className='span-and' style={{ fontFamily: "of", paddingRight: "5px" }}>&</span> Oven</h2>
                            <a href="/products?process=0">Discover Now</a>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={8000}>
                    <video autoPlay loop muted className='home-caro-video'>
                        <source src="/Asserts/Carousel/caro3.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <img src="/Asserts/Carousel/caro3.gif" className='home-caro-img'></img>
                    <Carousel.Caption>
                        <div class="slide-right">
                            <h2>Low Temperature <span className='span-and' style={{ fontFamily: "of", paddingRight: "5px" }}>&</span> Infusion</h2>
                            <a href="/products?process=1">Discover Now</a>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
