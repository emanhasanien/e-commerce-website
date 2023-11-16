import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function Categories() {

  function getAllCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let {data , isLoading} = useQuery('categories', getAllCategories,{
    cacheTime:5000
  })
  console.log(data?.data.data)
  return (
    <>
    <Helmet>
      <title>Categories</title>
    </Helmet>
    {
      isLoading? <div className="d-flex justify-content-center align-items-center py-5 my-s">
      <i className="fas fa-spin fa-spinner fa-2x text-main"></i>
    </div> 
    :
    <div className="container">
      <div className="row g-3">
        { data?.data.data.map((category) => <div key={category._id} className='col-md-3'>
          <Link to={'/categoryDetails/'+category._id} >
            <h5 className='text-center text-success my-3 font-sm fw-bolder'>{category.name}</h5>
            <img className='w-100 brand' height='250px' src={category.image} alt="" />
          </Link>
        </div>)}
      </div>
    </div>
    }

    </>
  )
}
