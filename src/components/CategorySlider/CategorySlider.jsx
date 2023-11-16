


import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubCategory from '../SubCategory/SubCategory';
import { Link } from 'react-router-dom';

export default function CategorySlider() {

    let [ categories ,setCategories] = useState([])

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);


    useEffect(() => {

      setNav1(slider1);
      setNav2(slider2);
  
    });

    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav',
        centerMode: false,
      };

      const settingsThumbs = {
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor:'.slider-for',
        dots: false,
        centerMode: false,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '10px'
      };

  

useEffect( ()=> {
  
    getAllCategories()
  
} , [])


async function getAllCategories(){

let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')

setCategories(data?.data)
}

console.log(categories)

  return (

    <div className="slider-wrapper">

    <Slider
      {...settingsMain}
      asNavFor={nav2}
      ref={category => (setSlider1(category))}
    >

      {categories.map((category) =>

        <div className="slick-slide" key={category._id}>
         
          <img height="200px" className="slick-slide-image" src={category.image} alt="" />
         
        </div>

      )}
      

    </Slider>
   

    <div className="thumbnail-slider-wrap">
          <Slider
            {...settingsThumbs}
            asNavFor={nav1}
            ref={category => (setSlider2(category))}>

            {categories.map((category) =>

           <div className="slick-slide cursor-pointer" key={category._id}>
             <Link to={'/categoryDetails/'+category._id}  >
                
                <img height="200px" className="slick-slide-image" src={category.image} alt="" />
                <h5 className='font-sm text-main'>{category.name}</h5>
              </Link>

           </div>

            )}

          </Slider>
        </div>
  </div>
  )
}
