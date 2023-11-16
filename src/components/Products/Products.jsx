import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import Product from '../Product/Product'


export default function Products() {



 
  
  function getAllProducts(){

    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let {data , isLoading}= useQuery('products', getAllProducts ,{
    cacheTime:5000,
    // refetchInterval:2000
  })



  return (
    <>

    <Helmet>
      <title>Products</title>
    </Helmet>

    
    
    { isLoading ? 
    <div className="d-flex justify-content-center align-items-center py-5 my-s">
      <i className="fas fa-spin fa-spinner fa-2x text-main"></i>
    </div>
   : 
    <div className="container">
     
      <div className="row">
        {data?.data.data.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
   }  
    
    </>
  )
 
}