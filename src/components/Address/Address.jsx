import React from 'react'

import {  useFormik  } from 'formik'
import { useParams } from 'react-router-dom'
import axios from 'axios'
export default function Address( ) {

  let params = useParams()
  console.log(params.cartId)

async  function order(shippingAddress){

   let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${params.cartId}?url=http://localhost:3000` ,{
    shippingAddress},
    {
      headers:{
        token: localStorage.getItem("token")
      }
    })
    console.log(res.data?.session.url)
    if(res){
      window.location.href = res.data?.session.url
    }
   
  }

  let formik = useFormik({
    initialValues: {
      
      details: '',
      phone: '',
      city : ''
    },
    onSubmit: order,
    
  })

  return (
    
      
      
      <div className="w-75 m-auto my-5">
        <h1>Address : </h1>
        <form onSubmit={formik.handleSubmit}>
        

          <label htmlFor="details">Details: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} className='form-control mb-3' type="text" id='details' name='details' />

          <label htmlFor="phone">Phone: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control mb-3' type="tel" id='phone' name='phone' />
       

          <label htmlFor="city">City: </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} className='form-control mb-3' type="text" id='city' name='city' />
        
              </form>
              <button onClick={()=> order()} className='btn bg-main text-white'>Order </button>
          </div> 
    
  )
}
