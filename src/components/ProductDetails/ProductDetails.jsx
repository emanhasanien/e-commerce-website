import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";

import Slider from "react-slick";
import { AuthContext } from "../AuthContext/AuthContext";
import { useDispatch } from "react-redux";
import { increase } from "../../Redux/CounterSlice";

export default function ProductDetails( productId) {
  let prams = useParams();
  let [productDetails, setproductDetails] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let {setIsUserLoggedIn  } = useContext(AuthContext)
  let dispatch = useDispatch()
  // let { counter , setCounter} = useContext(CartCounterContext)

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  async function getProductDetails() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + prams.id
    );
    setproductDetails(data.data);
    setIsLoading(false);

    console.log(data.data);
  }


  async function addProductToCart(productId){


    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart' ,{
      productId: productId
    } ,
    {
      headers:{
        token :  localStorage.getItem('token')
      }
    }).catch((err) =>{
      toast.error(err.response.data.message)
      localStorage.removeItem("token")
      setIsUserLoggedIn(false)
      Navigate('/login')
    })

    if(response){
      toast.success(response.data.message)
      dispatch(increase())
      // setCounter(++counter)
    }

    console.log(response)
  }

  console.log(prams.id);
  return (
    <>

    <Helmet>
      <title>{productDetails?.title}</title>
    </Helmet>
    
    {


isLoading ? 
   
      <div className="d-flex justify-content-center align-items-center py-5 my-s">
        <i className="fas fa-spin fa-spinner fa-2x text-main"></i>
      </div>
   
   : 
    <div className="container">
      <div className="row align-items-center py-4">
        <div className="col-md-3 col-sm-3">
        

          <Slider {...settings}>

            { productDetails?.images.map( (img ,index) => {
              return <img key={index} className='w-100' src={ img} alt="" />
            })}

          </Slider>
        </div>

        <div className="col-md-9  py-4">
          <h2 className="mt-2">{productDetails?.title}</h2>
          <h5 className="font-sm text-main mt-2">
            {productDetails?.category.name}
          </h5>
          <p className="mt-2">{productDetails?.description}</p>
          <p className="d-flex justify-content-between mt-2">
            <span>{productDetails?.price} EGP </span>
            <span>
              <i className="fas fa-star rating-color me-1" />
              {productDetails?.ratingsAverage}
            </span>
          </p>

          <button onClick={ ()=> addProductToCart( prams.id)}  className="btn bg-main text-white w-100 mt-2">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  
    }
    
    
    </>
  )
}
