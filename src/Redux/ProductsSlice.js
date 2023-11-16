import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const  getProducts = createAsyncThunk('products/getProducts' , async () =>{
    const { data } = await axios('https://ecommerce.routemisr.com/api/v1/products')
    return data.data

})




let initialState ={
    products:[]
}


let productsSlice = createSlice({
    name :'products',
    initialState,
    extraReducers: (builer)=>
    {
    builer.addCase(getProducts.pending , () =>{console.log('pending')})
    .addCase(getProducts.fulfilled ,(state, action) =>{
        state.products += action.payload
    
     })
     .addCase(getProducts.rejected , (err) =>{console.log(err)})
           
    }
})

export let productsReducer = productsSlice.reducer