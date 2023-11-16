import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductBrand() {

  let prams = useParams()
  let [brandDetails , setbrandDetails] =useState(null)

  useEffect( ()=>{

     getSpecificProductBrand()
  },[])

  async function getSpecificProductBrand(){
   let  {data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/`+ prams.id)
   setbrandDetails(data.data)
     console.log(data.data)
  }


  return (
    <div>
      <div className="container">
        <div className="row brand">
          
          <div className="col-md-3">
            <img src={brandDetails?.image} alt="" />
          </div>
          <div className="col-md-2 d-flex align-items-center ">
            <h3>{brandDetails?.name}</h3>
          </div>
        </div>
      </div>
     
    </div>
  )
}
