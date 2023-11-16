import React from 'react'
import { Navigate, RouterProvider ,createHashRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import Orders from './components/Orders/Orders'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Address from './components/Address/Address'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProtectedLogin from './components/ProtectedLogin/ProtectedLogin'
import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools  } from 'react-query/devtools'
import ProductBrand from './components/ProductBrand/ProductBrand'
import CategoryDetails from './components/CategoryDetails/CategoryDetails'
import WishList from './components/WishList/WishList'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import { Provider } from 'react-redux'
import store from './Redux/Store'


export default function App() {
 
  let queryClient = new QueryClient()

  let routers = createHashRouter([
    {
      path: '', element: <Layout/>, children: [
        { path: '', element: <Navigate to={'home'} /> },

        { path: 'home', element: <ProtectedRoute><Home/></ProtectedRoute> },
        { path: 'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>},
        { path: 'cart', element: <ProtectedRoute><Cart/></ProtectedRoute> },
        { path: 'wishList', element: <ProtectedRoute><WishList/></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands/></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products/></ProtectedRoute> },
        { path: 'allorders', element:<ProtectedRoute><Orders/></ProtectedRoute>},
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'categoryDetails/:id', element: <ProtectedRoute><CategoryDetails /></ProtectedRoute> },
        { path: 'brand/:id', element: <ProtectedRoute><ProductBrand /></ProtectedRoute> },
        { path: 'address/:cartId', element:<ProtectedRoute><Address/></ProtectedRoute> },

        { path: 'login', element: <ProtectedLogin><Login/> </ProtectedLogin>},
        { path: 'register', element: <ProtectedLogin><Register/></ProtectedLogin> },
        { path: 'forgetpassword', element: <ProtectedLogin><ForgetPassword/></ProtectedLogin> },

        { path: '*', element: <NotFound/> }
      ]
    }
  ])



  return (
    <>

  <Provider store={store}>

  <QueryClientProvider client={queryClient}>
    <RouterProvider router={routers}>

    </RouterProvider> 
    <ReactQueryDevtools/>
    </QueryClientProvider>
  </Provider>
     
       
    </>
  )
}


