 import { updatePassword } from '@/API/api'
import React, { useState } from 'react'
 import toast, { Toaster } from 'react-hot-toast'
import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthContext';
import { useNavigate } from 'react-router-dom';

 function Updatepassword() {
    const navigate=useNavigate()
    const {refreshUser}=useContext(AuthContext)
 const notify = (error) => toast(`${error}`);
      const [currentpassword,setcurrentpassword]=useState("")
       const[newpassword,setnewpassword]=useState('')
       const [loading, setloading]=useState(false)


       
const handleupdate=async(e)=>{
      e.preventDefault();
      setloading(true)
 try {
     const res= await updatePassword(currentpassword,newpassword)
     toast.success(res.message)
     await refreshUser()
     setcurrentpassword('')
     setnewpassword('')
     navigate('/profile')

 } catch (error) {
    const errorMessage=error.response?.data?.error || 'failed  to update password'
    toast.error(errorMessage)
 } finally{
    setloading(false)
 }
   
    
}



   return (
     <div className='flex flex-col gap-3 justify-center items-center min-h-screen '>
            <h1 className=' text-3xl sm:text-5xl font-bold '>Update password</h1>
        <form onSubmit={handleupdate} className='flex justify-center items-center gap-3 p-4 flex-col border-2 border-black min-h-[50%] min-w-[50%] rounded-2xl' >
            <label htmlFor="">Current password</label>
            <input
             className='border-2 border-black rounded-sm' type="text" 
             value={currentpassword}
             onChange={(e)=> setcurrentpassword(e.target.value)}
              disabled={loading}
             />
            <label htmlFor="">New password</label>
            <input
             className='border-2 border-black rounded-sm' type="text" 
             value={newpassword}
             onChange={(e)=>setnewpassword(e.target.value)}
              disabled={loading}
             />
            <button 
            type='submit'
            className='bg-[#A084DC] px-2 rounded-sm'
             disabled={loading || !currentpassword || !newpassword}
             
             >
           {loading ? 'updating':'update password'}</button>

        </form>
        <Toaster/>

     </div>
   )
 }
 
 export default Updatepassword