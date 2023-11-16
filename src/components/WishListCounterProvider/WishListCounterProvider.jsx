import React, { createContext, useState } from 'react'


export const WishListCounterContext =createContext()

export default function WishListCounterProvider({ children }) {

    let [WishListcounter , setWishListcounter] = useState(0)
  return (
    <>
    <WishListCounterContext.Provider  value={{ WishListcounter ,setWishListcounter}}>
    { children }

    </WishListCounterContext.Provider>

      
    </>
  )
}
