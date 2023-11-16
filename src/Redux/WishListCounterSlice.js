import { createSlice } from "@reduxjs/toolkit"



let   initialState ={
    WishlistCounter: 0
}


let WishlistCounterSlice = createSlice({
    name: 'WishlistCounter',
    initialState,
    reducers:{

        increase2: (state) => {
            state.WishlistCounter++
        },

        decrease2: (state) =>{
            state.WishlistCounter--

        },
        reset2: (state) =>{
            state.WishlistCounter = 0
        }

    }
})


export let WhishlistCounterReducer = WishlistCounterSlice.reducer
export let {increase2, decrease2 , reset2} = WishlistCounterSlice.actions