import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Index'
function Layout() {
  return (
  <>
  
  <Navbar/>
  <Outlet/>
  </>

    
  )
}

export default Layout