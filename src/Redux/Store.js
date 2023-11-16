import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { WhishlistCounterReducer } from "./WishListCounterSlice";
import { productsReducer } from "./ProductsSlice";




let store = configureStore( {
   
    reducer:{
      counter: counterReducer,
      wishlistCounter: WhishlistCounterReducer,
      products:productsReducer
     
    }
   
})


export default store