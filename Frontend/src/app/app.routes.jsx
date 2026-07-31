import { createBrowserRouter } from "react-router";
import Register from "../auth/pages/register";
import Login from "../auth/pages/Login";




 export const routes = createBrowserRouter([
    {
        path:"/",
        element:<h1> dashboard </h1>
    },

     {
        path:"/register",
        element:<Register/>
    },
     {
        path:"/login",
        element:<Login/>
    }
 ])