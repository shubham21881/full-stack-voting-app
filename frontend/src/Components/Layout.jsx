import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Index'
import { CrowdCanvas, Skiper39 } from "./ui/skiper-ui/skiper39";



// Using the complete component
const DemoSkiper39 = () => {
  return <Skiper39 />;
};

// Using just the crowd canvas
const CustomCrowd = () => {
  return (
    <div className="relative  h-[80%] w-full">
      <CrowdCanvas src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png" rows={15} cols={7} />
    </div>
  );
};





function Layout() {
  return (
  <>
  
  <Navbar/>
  <Outlet/>
  <CustomCrowd/>
  
  
  </>

    
  )
}

export default Layout