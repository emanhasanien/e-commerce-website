import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SubCategory from '../SubCategory/SubCategory'

export default function CategoryDetails() {
  let prams = useParams()
  
  let [allSubCategoriesOnCategory , setAllSubCategoriesOnCategory] = useState(null)



  useEffect(()=> {
    getAllSubCategoriesOnCategory()
  },[])

  async function getAllSubCategoriesOnCategory(){


    let {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${prams.id}/subcategories`)
    setAllSubCategoriesOnCategory(data?.data)
    console.log(setAllSubCategoriesOnCategory)
    // console.log(data)
  }

 
  

  console.log(allSubCategoriesOnCategory)
  return (
    <>
       <div className="container">
        <div className="row gx-2 gy-3">
          <h2 className='ms-4 my-5 text-main fw-bolder'>All SubCategories</h2>
        {
         allSubCategoriesOnCategory?.map((subCategory) => <SubCategory key={subCategory._id} subCategory ={subCategory} />)
        }
        </div>
       </div>
    </>
  )
}
