import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import Home from "../features/products/pages/Home.jsx"
import CreateProduct from "../features/products/pages/CreateProduct.jsx";
import SellerInventory from "../features/products/pages/SellerProductDetails.jsx";
import Protected from "../features/products/components/Protected.jsx";
import ProductsDetails from "../features/products/pages/ProductsDetails.jsx";



 export const routes = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
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
            path:"/product/:productId",
            element:<ProductsDetails/>
    },

    {
        path:"/seller",
        children:[
            {
                path:"/seller/create_product",
                 element:<Protected role="seller">
                              <CreateProduct /> 
                          </Protected>
            },

           {
        path:"/seller/productDetails",
        element: <Protected>
                  <SellerInventory/> 
                </Protected>   
         }

    ]
       
    }
     , 
    
 ])