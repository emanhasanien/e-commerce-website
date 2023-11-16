import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import { useDispatch } from "react-redux";
import { increase } from "../../Redux/CounterSlice";
import store from "../../Redux/Store";
import { dispatch2, increase2 } from "../../Redux/WishListCounterSlice";

 



export default function Product({ product }) {


  let {setIsUserLoggedIn  } = useContext(AuthContext)
  let [errorMessage, setErrorMessage] = useState("");
  let[isClicked ,setIsClicked] =useState()
  let dispatch = useDispatch()
  
  let navigate = useNavigate()

  
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
      navigate('/login')
    })
     
    
    if(response){
      toast.success(response.data?.message)
      dispatch(increase())
   
    }
  }



 async function addProductToWishList(productId){
    setIsClicked(true)


    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist' ,{
      productId: productId
    } ,
    {
      headers:{
        token :  localStorage.getItem('token')
      }
    }).catch((err) =>{
      toast.error(err.response.data?.message)
      localStorage.removeItem("token")
      setIsUserLoggedIn(false)
      navigate('/login')
    })
     
    if(response){
    
      toast.success(response.data?.message)
      dispatch(increase2())

      console.log(response)
    }
   
    setIsClicked(true)
  }




  return (
    <div className="col-md-3 col-sm-4" >
     
        <div className="product cursor-pointer px-2 py-3">

        <div onClick={()=> addProductToWishList(product._id)}>
         
            <i  className= {isClicked? "clicked fa-solid fa-heart fs-3 opacity-0 " :" notClicked fa-solid fa-heart fs-3 opacity-0 "}></i>
        </div>

        <Link to={ '/productDetails/'+ product._id}>
         
          <img className="w-100" src={product.imageCover} alt="" />
          <h5 className="font-sm text-main ">{product.category.name}</h5>
          <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>

          <p className="d-flex justify-content-between">
            <span>{product.price} EGP</span>
            <span>
              <i className="fas fa-star rating-color" />
              {product.ratingsAverage}
            </span>
          </p>
          </Link>
      <button onClick={ ()=> addProductToCart(product._id)} className="btn bg-main text-white w-100">Add To Cart </button>
        </div>

     

    </div>
  );
}
