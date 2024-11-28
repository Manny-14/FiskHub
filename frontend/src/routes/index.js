import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import ProductCategory from "../pages/ProductCategory";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProducts from "../pages/SearchProducts";
import Dashboard from "../pages/Dashboard";
import Listings from "../pages/Listings";
import UserProfile from "../pages/UserProfile";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App />,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category/",
                element : <ProductCategory />
            },
            {
                path : "product/:id",
                element : <ProductDetails />
            },
            {
                path : "cart",
                element : <Cart />
            },
            {
                path : "success",
                element : <Success />
            },
            {
                path : "order-canceled",
                element : <Cancel />
            },
            {
                path : "search",
                element : <SearchProducts />
            },
            {
                path : "order",
                element : <OrderPage />
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    }
                ]
            },
            {
                path : "dashboard",
                element : <Dashboard/>,
                children : [
                    {
                        path : "listings",
                        element : <Listings/>
                    },
                    {
                        path : "user-profile",
                        element : <UserProfile />
                    }
                ]
            },
        ]
    }
])

export default router