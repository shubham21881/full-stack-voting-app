
import { Link } from "react-router-dom";
import { useContext,useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { TfiMenu } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
import { TiDeleteOutline } from "react-icons/ti";
function Navbar() {
 const navigate=useNavigate()
  const { user, logout } = useContext(AuthContext);
  const [isOpen,setisopen]=useState(false)
  function handlelogout(){
     setisopen(false)
     logout()
     navigate('/')
  }

  return (
    <nav className="flex justify-between  items-center px-3 py-3 shadow  gap-2.5  sm:w-screen left-2 top-1 lg:bg-white max-w-[100%]    left-[40px]    z-50 border-1 rounded-2xl   border-black  ">
      <h1 className="text-xl font-bold text-blue-600">Voting App</h1>

      <div className={`  flex flex-col sm:hidden  absolute z-80 top-[50px] right-0 rounded-2xl text-[#222831] bg-[radial-gradient(circle,rgba(213,197,255,1)_0%,rgba(238,221,221,1)_100%)]   font-extrabold fixed  w-3/4 p-5 pt-5 pb-5 space-y-4 transition-all duration-1000 ease-in-out ${isOpen? 'scale-100 opacity-100':'scale-0 opacity-0'}   `}>
         <div className="  flex justify-end cursor-pointer " onClick={()=>setisopen(false)}><TiDeleteOutline size={30} /></div>
        <NavLink onClick={()=>setisopen(false)} className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-[#222831]"} to={"/"}>Home</NavLink>
        <NavLink onClick={()=>setisopen(false)} className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-[#222831]"} to={"/candidate"}>Candidates</NavLink>
        <NavLink onClick={()=>setisopen(false)} className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-[#222831]"} to={"/results"}>Results</NavLink>
        {user && <NavLink onClick={()=>setisopen(false)}  className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-[#222831]"} to="/profile">Profile</NavLink>}
        {user?.role === "admin" && <NavLink onClick={()=>setisopen(false)} className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-[#222831]"} to="/admin">Admin</NavLink>}
        {!user ? (
          <>
            <NavLink onClick={()=>setisopen(false)} className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-[#222831]"} to="/login">Login</NavLink>
            <NavLink onClick={()=>setisopen(false)} className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-[#222831]"} to="/signup">Signup</NavLink>
          </>
        ) : (
          <button className="bg-[#A084DC] px-5 rounded-2xl" onClick={handlelogout}>Logout</button>
        )}
      </div>
      <span onClick={()=>setisopen(!isOpen)} className='sm:hidden'><button>{!isOpen?<TfiMenu/>:''}</button></span>

      <div className={` hidden sm:flex items-center gap-6  `}>
        <NavLink onClick={()=>setisopen(false)} className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-gray-600"} to={"/"}>Home</NavLink>
        <NavLink onClick={()=>setisopen(false)} className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-gray-600"} to="/candidate">Candidates</NavLink>
        <NavLink onClick={()=>setisopen(false)} className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-gray-600"} to="/results">Results</NavLink>
        {user && <NavLink onClick={()=>setisopen(false)}  className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-gray-600"} to="/profile">Profile</NavLink>}
        {user?.role === "admin" && <NavLink onClick={()=>setisopen(false)} className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-gray-600"} to="/admin">Admin</NavLink>}
        {!user ? (
          <>
            <NavLink onClick={()=>setisopen(false)} className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-gray-600"} to="/login">Login</NavLink>
            <NavLink onClick={()=>setisopen(false)} className={({isActive})=> isActive? "text-[#A084DC] font-bold" : "text-gray-600"} to="/signup">Signup</NavLink>
          </>
        ) : (
          <button className="bg-[#A084DC] px-5 rounded-2xl text-white" onClick={handlelogout}>Logout</button>
        )}
      </div>
         {/* <div className=" h-full w-screen absolute z-40 bg-transparent">
          <h1>Click</h1>
         </div> */}

         


    </nav>
  )
}

export default Navbar