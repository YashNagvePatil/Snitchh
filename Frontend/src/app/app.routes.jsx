import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import Dashboard from "../features/products/pages/Dashboard.jsx";
import CreateProduct from "../features/products/pages/CreateProduct.jsx";
import SellerInventory from "../features/products/pages/SellerProductDetails.jsx";



 export const routes = createBrowserRouter([
    {
        path:"/",
        element:<Dashboard/>
    },

     {
        path:"/register",
        element:<Register/>
    },
     {
        path:"/login",
        element:<Login/>
    },

    {
        path:"/seller",
        children:[
            {
                path:"/seller/create_product",
                 element:<CreateProduct/>
            },

           {
        path:"/seller/productDetails",
        element:<SellerInventory/>
         }

    ]
       
    }
     , 
    
 ])