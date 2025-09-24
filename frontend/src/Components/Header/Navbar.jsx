
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
    <nav className="fixed top-0 left-0 w-full 
  flex justify-between items-center px-3 py-3 
  bg-white/20 sm:backdrop-blur-md shadow-lg border border-white/20
  gap-2.5 sm:w-screen max-w-[100%] z-50 rounded-2xl ">
      <h1 className="text-xl font-bold text-[#A084DC]">Voting App</h1>

      <div
  className={`flex border flex-col sm:hidden absolute z-80 top-[50px] right-0 
    rounded-2xl text-[#222831] 
    bg-white/20 backdrop-blur-md shadow-lg border border-white/20
    font-extrabold fixed w-3/4 p-5 pt-5 pb-5 space-y-4 
    transition-all duration-700 ease-in-out 
    ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
  `}
>
  <div
    className="flex justify-end cursor-pointer"
    onClick={() => setisopen(false)}
  >
    <TiDeleteOutline size={30} />
  </div>

  <NavLink
    onClick={() => setisopen(false)}
    className={({ isActive }) =>
      isActive ? 'text-[#A084DC] font-bold' : 'text-[#222831]'
    }
    to="/"
  >
    Home
  </NavLink>

  <NavLink
    onClick={() => setisopen(false)}
    className={({ isActive }) =>
      isActive ? 'text-[#A084DC] font-bold' : 'text-[#222831]'
    }
    to="/candidate"
  >
    Candidates
  </NavLink>

  <NavLink
    onClick={() => setisopen(false)}
    className={({ isActive }) =>
      isActive ? 'text-[#A084DC] font-bold' : 'text-[#222831]'
    }
    to="/results"
  >
    Results
  </NavLink>

  {user && (
    <NavLink
      onClick={() => setisopen(false)}
      className={({ isActive }) =>
        isActive ? 'text-[#A084DC] font-bold' : 'text-[#222831]'
      }
      to="/profile"
    >
      Profile
    </NavLink>
  )}

  {user?.role === 'admin' && (
    <NavLink
      onClick={() => setisopen(false)}
      className={({ isActive }) =>
        isActive ? 'text-[#A084DC] font-bold' : 'text-[#222831]'
      }
      to="/admin"
    >
      Admin
    </NavLink>
  )}

  {!user ? (
    <>
      <NavLink
        onClick={() => setisopen(false)}
        className={({ isActive }) =>
          isActive ? 'text-[#A084DC] font-bold' : 'text-[#222831]'
        }
        to="/login"
      >
        Login
      </NavLink>
      <NavLink
        onClick={() => setisopen(false)}
        className={({ isActive }) =>
          isActive ? 'text-[#A084DC] font-bold' : 'text-[#222831]'
        }
        to="/signup"
      >
        Signup
      </NavLink>
    </>
  ) : (
    <button
      className="bg-[#A084DC] px-5 py-2 rounded-2xl text-white shadow-md hover:opacity-90"
      onClick={handlelogout}
    >
      Logout
    </button>
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
          <button className="bg-[#A084DC] px-5 rounded-2xl text-white shadow-md hover:opacity-90" onClick={handlelogout}>Logout</button>
        )}
      </div>
         {/* <div className=" h-full w-screen absolute z-40 bg-transparent">
          <h1>Click</h1>
         </div> */}

         


    </nav>
  )
}

export default Navbar