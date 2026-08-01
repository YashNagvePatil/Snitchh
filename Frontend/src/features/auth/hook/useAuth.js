import { setError,sertLoading,setUser } from "../state/auth.slice.js";
import { register,login } from "../service/auth.api.js";
import { useDispatch } from "react-redux";

  export function useAuth(){

    const dispatch = useDispatch();
    async function registerUser({email,password,contact,fullName,role}){

         const data = await register({email,password,contact,fullName,role})
        
         dispatch(setUser(data.user))

         return data.user
    }

    async function loginUser({email,password}){

        const data = await login({email,password})

        dispatch(setUser(data.user))
      
        return data.user
    }

    return { registerUser, loginUser };     
    
}