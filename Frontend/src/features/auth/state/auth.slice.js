import { createSlice } from "@reduxjs/toolkit";
import { User } from "lucide-react";

 const authSlice = createSlice({
    name: "auth",
    initialState:{
        user:null,
        loading:true,
        error:null       
    },
    reducers:{
        setUser:(state,action) =>{
            state.user = action.payload;
        },
        sertLoading:(state,action) =>{
            state.loading = action.payload;
        },
        setError:(state,action) =>{ 
            state.error = action.payload;
        }
    }
  }
 )

 export const {setError,setUser,sertLoading} = authSlice.actions;
 export default authSlice.reducer;