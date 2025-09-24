 import { updatePassword } from '@/API/api'
import React, { useState } from 'react'
 import toast, { Toaster } from 'react-hot-toast'
import { useContext } from 'react';
import { AuthContext } from '@/Context/AuthContext';
import { useNavigate } from 'react-router-dom';

 function Updatepassword() {
    const navigate=useNavigate()
    const {refreshUser}=useContext(AuthContext)
 
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
     setTimeout(() => {
        
         navigate('/profile')
     }, 3000);

 } catch (error) {
    const errorMessage=error.response?.data?.error || 'failed  to update password'
    toast.error(errorMessage)
 } finally{
    setloading(false)
 }
   
    
}



   return (
      
      <div className="min-h-screen w-full bg-white relative">
      {/* Purple Gradient Grid Left Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
            radial-gradient(circle 800px at 0% 200px, #d5c5ff, transparent)
          `,
          backgroundSize: "96px 64px, 96px 64px, 100% 100%",
        }}
      />
         {/* Your Content/Components */}
       
     <div className='flex flex-col relative z-10 gap-3 justify-center items-center min-h-screen  '>
            <h1 className=' text-3xl sm:text-5xl font-bold '>Update password</h1>
        <form onSubmit={handleupdate} className='flex justify-center items-center gap-3 p-4 flex-col border-1 border-black min-h-[50%] min-w-[35%] rounded-2xl' >
            <label htmlFor="">Current password</label>
            <input
             className='border-1 border-black rounded-sm' type="text" 
             value={currentpassword}
             onChange={(e)=> setcurrentpassword(e.target.value)}
              disabled={loading}
             />
            <label htmlFor="">New password</label>
            <input
             className='border-1 border-black rounded-sm' type="text" 
             value={newpassword}
             onChange={(e)=>setnewpassword(e.target.value)}
              disabled={loading}
             />
            <button 
            type='submit'
            className='bg-[#A084DC] px-2 rounded-sm hover:text-white'
             disabled={loading || !currentpassword || !newpassword}
             
             >
           {loading ? 'updating':'update password'}</button>

        </form>
        <Toaster/>

     </div>
    </div>
   )
 }
 
 export default Updatepassword