import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function Brands() {


  function getAllbrands (){

    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')

  }

  let{ data } = useQuery('brands' , getAllbrands)
  console.log(data?.data.data)
  return (
    <>
    <Helmet>
      <title>Brands</title>
    </Helmet>
      
      
      <div className="container">
        <div className="row g-2 ">
          <h1 className='text-center text-main fw-bolder'>All Brands</h1>
          {data?.data.data.map( (brand ) =>  <div key={brand._id} className="col-md-3 text-center brand  cursor-pointer">

             <Link to={'/brand/'+ brand._id} >
             
               <img src={ brand.image} alt="" />
              <h5>{brand.name}</h5>
             
             </Link>
          </div>) }
         
        </div>
      </div>
    </>
  )
}
