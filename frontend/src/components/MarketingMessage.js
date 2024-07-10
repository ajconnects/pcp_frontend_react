import React from 'react';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Marketing01 from './static/Marketing01.jpeg';
import Marketing03 from './static/Marketing03.jpeg';
import Marketing04 from './static/Marketing04.jpeg';
import Marketing06 from './static/Marketing06.jpeg';

function MarketingMessage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const slides = [
    {
      title: "Finding the Right Programmer",
      text: "Unlocking top talent starts here. Embrace innovation and secure the best minds for your projects, effortlessly.",
      image: Marketing01
    },
    {
      title: "Employment Situation",
      text: "Streamline your hiring process and discover exceptional talent with ease, tailored to your project's needs.",
      image: Marketing03
    },
    {
      title: "Stay Secure",
      text: "Safeguard your operations with state-of-the-art tools, ensuring optimal efficiency and peace of mind.",
      image: Marketing06
    },
    {
      title: "More Potential",
      text: "Unlock global collaboration effortlessly, harnessing diverse teams for limitless possibilities.",
      image: Marketing04
    }
  ];

  return (
    <div className="marketing-message">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <MDBRow className="d-flex align-items-center">
              <MDBCol size="md-6" className="image-container d-flex justify-content-center">
                <img src={slide.image} alt={slide.title} className="uploaded-image" />
              </MDBCol>
              <MDBCol size="md-6">
                <h2 className="title">{slide.title}</h2>
                <p className="text">{slide.text}</p>
              </MDBCol>
            </MDBRow>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MarketingMessage;


