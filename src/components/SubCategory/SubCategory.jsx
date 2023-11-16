import React from 'react'

export default function SubCategory({subCategory}) {
  return (
      <>
   
      <div  className='col-md-4 subcategory cursor-pointer'>

           <h4>{subCategory?.name}</h4>

    </div>
      
      </>
    
      )
  
}
 