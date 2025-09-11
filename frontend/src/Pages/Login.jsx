import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { Login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
    const res=  await Login(aadharCardNumber, password);
     console.log(res);
     
     if(res.user.role==='admin'){
       navigate("/admin"); // Redirect to home page after successful login

     }else{
      navigate('/')
     }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="card w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Aadhar Number"
            value={aadharCardNumber}
            onChange={(e) => setAadharCardNumber(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}