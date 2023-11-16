import axios from "axios";
import Product from "../Product/Product";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
// import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {  useEffect, useState } from "react";




export default function Home() {


 
  let [isLoading, setIsLoading] = useState(false);

  let [products, setProducts] = useState([]);
  let [isSearched ,setIsSearched] = useState(false)
  const [search ,setSearch] =useState("") 

  

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    setIsLoading(true);
    
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    ).catch( (err)=>{
      console.log(err)
    })
if(data){
  setIsSearched(false)
  setProducts(data.data);
  setIsLoading(false);
 
}


  }

  const filterProducts =products.filter((product) =>{
     
   
    if(
     product.title.toLowerCase().includes(search) ||
     product.category.name.toLowerCase().includes(search) 
    ){
   
     return product
    }
   
     })
   



  // function getAllProducts(){

  //   return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  // }

  // let {data ,isLoading}= useQuery('products', getAllProducts ,{
  //   cacheTime:5000,
  //   // refetchInterval:2000
  // })

  // console.log(data?.data.data)


  return (
    <>

    <Helmet>
      <title>Home</title>
    </Helmet>
    
    { isLoading ? 
    <div className="d-flex justify-content-center align-items-center py-5 my-s">
      <i className="fas fa-spin fa-spinner fa-2x text-main"></i>
    </div>
   : 
    <div className="container">
     
      <MainSlider/>
      <CategorySlider/>

      <input 
        className="form-control my-4  " 
        type="text" placeholder="Search...." 
        onChange={ (e)=>{
          setSearch(e.target.value.toLowerCase())
        }}
        
        />
     
     
      { isSearched ? (
         <div className="row">
       
         {products.map((product) => (
           <Product key={product._id} product={product} />
         ))}
       </div>
      )

       : 
       
      (
        <div className="row">
        {filterProducts.map( (product) => <Product key={product._id} product={product} />)}
    </div>
      )
       
       }

     


    </div>
   }  
    
    </>
  )
 
}
