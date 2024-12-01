import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';


function App() {
  const dispatch = useDispatch()
  const [cartCount, setCartCount] = useState(0)

  const fetchUserDetails = async() => {
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()
    console.log("Trying to find user", dataApi)

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }

  }

  const fetchItemsCountInUserCart = async() => {
    const dataResponse = await fetch(SummaryApi.items_in_cart_count.url,{
      method : SummaryApi.items_in_cart_count.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartCount(dataApi?.data?.count)
  }

  useEffect(() => {
    /** User Details */
    fetchUserDetails()
    /** No of items in User Cart */
    fetchItemsCountInUserCart()

  },[])
  return (
    <>
      <Context.Provider value = {{
        fetchUserDetails, // To fetch user detail
        cartCount, // No of items in current user cart
        fetchItemsCountInUserCart,
      }}>
        <ToastContainer 
        position='top-center'
        />

        <Header/>
        <main className='min-h-[calc(100vh-50px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>

      </Context.Provider>
    </>
  );
}

export default App;
