import './App.css'
import { routes } from './app.routes.jsx'
import { RouterProvider, Routes } from 'react-router'
function App() {


  return (
    <>
           <RouterProvider router={routes}/>
    </>
  )
}

export default App
