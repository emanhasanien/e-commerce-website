
import React from 'react'
import Slider from "react-slick";
import slider1 from "../../Assets/Images/slider-image-3.jpeg";
import slider2 from "../../Assets/Images/slider-image-2.jpeg";
import slider3 from "../../Assets/Images/slider-image-1.jpeg";
import img1 from "../../Assets/Images/blog-img-1.jpeg";
import img2 from "../../Assets/Images/blog-img-2.jpeg";

export default function MainSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

  return (
    <div className="row">
        <div className="col-md-9 py-5 px-0">
          <Slider {...settings}>
            <img className="w-100" height="500px" src={slider1} alt="" />
            <img className="w-100" height="500px" src={slider2} alt="" />
            <img className="w-100" height="500px" src={slider3} alt="" />
          </Slider>
        </div>

        <div className="col-md-3 py-5 px-0">
          <img className="w-100 " height="250px" src={img1} alt="" />
          <img className="w-100" height="250px" src={img2} alt="" />
        </div>
      </div>
  )
}
