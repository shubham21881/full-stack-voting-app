import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { getProfile } from '../API/api'
import { Link } from 'react-router-dom'

function Profile() {
const [profiledata,setprofiledata]=useState(null)
useEffect(()=>{
const profile=async()=>{
  const data = await getProfile()
  setprofiledata(data)
}

profile()
},[])
  // const { user} =useContext(AuthContext)
  // console.log(user);
  console.log(profiledata);
  
  return (
  
    

    <div className='h-screen w-screen pt-[100px] flex justify-center  '>
      <div className='flex flex-col gap-2  items-center p-2 min-w-[30%] mb-6 pt-5 border-2 border-black rounded-2xl '>
        <img src="https://placehold.co/200x200" alt="" srcset="" className='rounded-[50%] h-[100px] sm:h-[200px]' />
        <h1 className='text-2xl font-bold'>{profiledata?.person.name}</h1>
        <p>AadharCardNumer:{profiledata?.person.aadharCardNumber}</p>
        <p>Role:{profiledata?.person.role}</p>
        <p>age:{profiledata?.person.age}</p>
        <p>Address:{profiledata?.person.address}</p>
        <p>Mobile No.:{profiledata?.person.mobile}</p>
        <Link to={'/updatePassword'}> <button className='bg-[#A084DC] px-5 rounded-2xl text-white hover:text-black'>change password</button></Link>
      </div>
      
    </div>
    
    
  )
}

export default Profile