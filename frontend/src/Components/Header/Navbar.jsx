
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";


function Navbar() {
 const navigate=useNavigate()
  const { user, logout } = useContext(AuthContext);

  function handlelogout(){
     logout()
     navigate('/')

  }

  return (
    <nav className="flex justify-between items-center px-6 py-3 shadow bg-white">
      <h1 className="text-xl font-bold text-blue-600">Voting App</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/candidate">Candidates</Link>
        <Link to="/results">Results</Link>
        {user && <Link to="/profile">Profile</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button onClick={handlelogout}>Logout</button>
        )}
      </div>
    </nav>
  )
}

export default Navbar