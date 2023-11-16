import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { decrease, increase, reset } from "../../Redux/CounterSlice";


export default function Cart() {
  let [errorMessage, setErrorMessage] = useState("");
  let [cartProduct, setCartProduct] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [reqTimeOut, setReqTimeOut] = useState();
  let [totalCartPrice, setTotalCartPrice] = useState(0);
  let [cartId, setCartId] = useState();
  let dispatch = useDispatch()
 

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  async function getLoggedUserCart() {
    setIsLoading(true);
    let response = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .catch((err) => {
        setErrorMessage(err.response.data?.message);
        console.log(err.response.data?.message);
      });

    setIsLoading(false);
    if (response) {
      setCartProduct(response.data.data.products);
      setTotalCartPrice(response.data.data.totalCartPrice);
      setCartId(response.data?.data._id);
    }
    console.log(response);
    console.log(cartId);
  }

  async function removeProductFromCart(ProductId) {
    setIsLoading(true);
    let res = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + ProductId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setIsLoading(false);
    if (res) {
      setCartProduct(res.data?.data.products);
      setTotalCartPrice(res.data?.data.totalCartPrice);
      dispatch(decrease())
      // setCounter(--counter)
    }
  }

  async function clearCart() {

    setIsLoading(true);
   
    
    let res = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setIsLoading(false);

    if (res) {
      setCartProduct([]);
      setTotalCartPrice(0);
      dispatch(reset())
      // setCounter(0)
    }
   
   
  
  }

  function updateProductCount(ProductId, count, index) {
    let res;

    let newCartProduct = [...cartProduct];
    
    if( count === 0 ){

     removeProductFromCart(ProductId)
    setCartProduct([])

    }else{

      newCartProduct[index].count = count;

      setCartProduct(newCartProduct);
  
      clearTimeout(reqTimeOut);
  
      setReqTimeOut(
        setTimeout(async () => {
          res = await axios.put(
            "https://ecommerce.routemisr.com/api/v1/cart/" + ProductId,
            {
              count: count,
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          ).catch((err)=>{
            setErrorMessage(err.response.data?.message);
          })
  
          if (res) {
            setCartProduct(res.data?.data.products);
            setTotalCartPrice(res.data?.data.totalCartPrice);
         
          }
        }, 2000)
      );
    }

   
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {isLoading ? (
        <div className="text-center">
          <span>
            <i className="fas fa-spinner fa-spin fa-2x  text-main"></i>
          </span>
        </div>
      ) : (
        <>
          {cartProduct.length === 0 ? (
            <h2 className="alert alert-warning text-center my-5">
              No Products in Cart
            </h2>
          ) : (
            <div>
              <button
                onClick={clearCart}
                className="btn btn-outline-danger d-block ms-auto "
              >
                Clear Cart{" "}
              </button>
              {cartProduct?.map((product, index) => {
                return (
                  <div key={product._id} className="cart-product rounded-2 ">
                    <div className="row align-items-center my-3">
                      <div className="col-md-2">
                        <img
                          className="w-100"
                          src={product.product.imageCover}
                          alt=""
                        />
                      </div>

                      <div className="col-md-8">
                        <h2>{product.product.title}</h2>
                        <h5 className="font-sm text-main">
                          {product.product.category.name}
                        </h5>
                        <p className="d-flex justify-content-between">
                          <span>{product.price} EGP</span>
                          <span>
                            <i className="fas fa-star rating-color me-1"></i>
                            {product.product.ratingsAverage}
                          </span>
                        </p>
                        <p>
                          <span className="fw-bolder">
                            Total Price: {product.price * product.count}
                          </span>
                        </p>
                      </div>

                      <div className="col-md-2 align-items-center ">
                        <p
                          onClick={() =>
                            removeProductFromCart(product.product._id)
                          }
                          className="text-danger mb-2 cursor-pointer"
                        >
                          Remove
                        </p>
                        <button
                          className="btn btn-success mx-2"
                          onClick={() =>
                            {
                              updateProductCount(
                                product.product._id,
                                product.count - 1,
                                index
                              )
                              dispatch(decrease())
                            }
                          }
                        >
                          {" "}
                          -{" "}
                        </button>
                        <span> {product.count} </span>
                        <button
                          className="btn btn-success mx-2"
                          onClick={() =>
                           {
                            updateProductCount(
                              product.product._id,
                              product.count + 1,
                              index
                            )
                            dispatch(increase())
                           }
                          }
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="d-flex justify-content-between">
                <Link
                  to={"/address/" + cartId}
                  className="btn bg-main text-white"
                >
                  Checkout
                </Link>
                <p>
                  <span className="fw-bolder">Total Cart Price :</span>
                  {totalCartPrice} EGP
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
