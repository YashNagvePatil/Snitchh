import React, { use } from 'react'
import { useSelector } from 'react-redux'
import { useActionData } from 'react-router'
import { Navigate } from 'react-router'

 const Protected = ({children,role="buyer"}) => {

     const user = useSelector(state => state.auth.user)
     const loading = useSelector(state => state.auth.loading)

     if (loading) {
        return <div>Loading...</div>

     }

     if(!user){
        return <Navigate to="/login"></Navigate>
     }

     if(user.role !== role){
         return <Navigate to="/"/>
     }

     


  return children
}

export default Protected