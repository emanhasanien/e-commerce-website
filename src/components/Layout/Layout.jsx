
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import AuthContextProvider from '../AuthContext/AuthContext'
import  { Toaster } from 'react-hot-toast';
import WishListCounterProvider from '../WishListCounterProvider/WishListCounterProvider';


function Layout() {




  return (
    <>
     
<WishListCounterProvider>



     <AuthContextProvider>
     <Navbar />
          <div className="container py-5">
            <Outlet />
          </div>
          <Footer />

          <Toaster/>
    </AuthContextProvider>
   
          

</WishListCounterProvider>
   

   

    </>
  )
}

export default Layout