import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from './Context/AuthContext'
import { Navbar } from './Components/Index'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Candidate from './Pages/Candidate'
import VoteResults from './Pages/VoteResults'
import Profile from './Pages/Profile'
import AdminDashboard from './Pages/AdminDashboard'
import ErrorPage from './Pages/ErrorPage'
import Layout from './Components/Layout'
import Updatepassword from './Pages/Updatepassword'



















 const router= createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    errorElement:<ErrorPage/>,
    children:[
      {path:'/', element:<Home/>},
      {path:"/login",element:<Login/>},
      {path:"/signup",element:<Signup/>},
      {path:"/candidate",element:<Candidate/>},
      {path:"results",element:<VoteResults/>},
      {path:"profile",element:<Profile/>},
      {path:"/admin",element:<AdminDashboard/>},
      {path:"/updatepassword",element:<Updatepassword/>},
      
    ]
  }
 ])








function App() {
  









  return (
    <>
      {/* <Skiper39/> */}
      {/* <CustomCrowd/> */}
      {/* <CrowdCanvas/> */}
     
      
      <RouterProvider router={router}/>
      {/* <Updatepassword/> */}
    </>
  )
}

export default App
