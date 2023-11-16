import { createSlice } from "@reduxjs/toolkit";

let intialValues ={
    counter: 0 ,
    userName: "Eman"
}


let counterSlice = createSlice( {

    name: "counter",
    initialState:intialValues ,
    reducers: {
        increase: (state) => {
            state.counter++
        },

        decrease: (state) =>{
            state.counter--

        },
        reset: (state) =>{
            state.counter = 0
        }
    }
})

 export let counterReducer = counterSlice.reducer
 export let { increase , decrease, reset} = counterSlice.actions