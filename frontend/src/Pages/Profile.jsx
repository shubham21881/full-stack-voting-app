import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { getProfile } from '../API/api'


function Profile() {
const [profiledata,setprofiledata]=useState(null)
useEffect(()=>{
 getProfile().then((userdata)=>{
 setprofiledata(userdata)
 })
},[])
  // const { user} =useContext(AuthContext)
  // console.log(user);
  console.log(profiledata);
  
  return (
    <>
    <div>Profile name:{profiledata?.person.name}</div>
    <div>AdharCardNumber:{profiledata?.person.aadharCardNumber}</div>
    <div>role:{profiledata?.person.role}</div>
    </>
  )
}

export default Profile