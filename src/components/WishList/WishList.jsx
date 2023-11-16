import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { AuthContext } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { decrease2 } from '../../Redux/WishListCounterSlice';
import { increase } from '../../Redux/CounterSlice';
// import { CartCounterContext } from '../CartCounterContextProvider/CartCounterContextProvider';
// import { WishListCounterContext } from '../WishListCounterProvider/WishListCounterProvider';

export default function WishList() {

  let [wishListProduct, setWishListProduct] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate()
  let {setIsUserLoggedIn  } = useContext(AuthContext)
  let dispatch = useDispatch()

  useEffect(() => {
    getLoggedUserwishList() ;
  }, []);

  async function getLoggedUserwishList() {
    setIsLoading(true);
    let response = await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishList", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .catch((err) => {
        setErrorMessage(err.response?.data.message);
        setIsUserLoggedIn(false)
        console.log(err.response?.data.message);
      });

    setIsLoading(false);
    if (response) {
      setWishListProduct(response?.data.data);
      
    }


  }



  async function removeProductFromWishList(ProductId) {
    console.log(ProductId);
    setIsLoading(true);
    let res = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/wishlist/" + ProductId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    ).catch((err) => {
      setErrorMessage(err.response?.data.message);
  
    });

    setIsLoading(false);
    if (res) {
      setWishListProduct(res.data?.data);
      getLoggedUserwishList()
      toast.success(res.data?.message)
      dispatch(decrease2())
      
      console.log(res)
     
    }
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
      navigate('/login')
    })

    if(response){
      removeProductFromWishList(productId)
      dispatch(increase())
    }

 
  }




  return (
    <>
    <Helmet>
      <title>WishList</title>
    </Helmet>

    {isLoading ?  <div className="text-center">
          <span>
            <i className="fas fa-spinner fa-spin fa-2x  text-main"></i>
          </span>
        </div>  
        :
       <>
        
        { wishListProduct.length === 0?  <h2 className="alert alert-warning text-center my-5">
         No Products in WishList
       </h2> : 
       
       <div className="container">
       {
        wishListProduct.map( (product, index) =>  <div key={index} className="cart-product rounded-2 ">
            
            <div className="row align-items-center my-3">
               <div className="col-md-2">
                 <img className='w-100' src={product.imageCover} alt="" />
                 
               </div>
  
               <div className="col-md-8">
  
                 <h4>{product.title}</h4>
                 <h5 className='text-main fw-bolder fs-6'>{product.price}EGP </h5>
                  
                  <div className='text-danger cursor-pointer' onClick={()=> removeProductFromWishList(product._id)}>
                     <i className="fa-solid fa-trash-can me-1 fs-5"></i>
                      <span>Remove</span>
                  </div>
               </div>
  
               <div className="col-md-2">
                <button onClick={ ()=> addProductToCart(product._id)}  className='btn btn-outline-success fw-bolder'> Add To Cart</button>
               </div>
            </div>
  
  
  
           </div>
         
       )
       }
      </div>
       
       
       }
        
       
       </>
        
        }
   
    </>
  )
}
