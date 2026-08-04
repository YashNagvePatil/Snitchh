import './App.css'
import { routes } from './app.routes.jsx'
import { RouterProvider, Routes } from 'react-router'
import { useSelector } from 'react-redux'
import { useAuth } from '../features/auth/hook/useAuth.js'
function App() {
  
  const {handleGetMe} = useAuth()
  const user = useSelector(state => state.auth.user)

  console.log(user)

  return (
    <>
           <RouterProvider router={routes}/>
    </>
  )
}

export default App
