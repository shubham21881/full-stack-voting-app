import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "../Components/LoginForm";
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";

export default function Login() {
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
    criteriaMode: "firstError"  
  });
  
  const { Login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const Submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
    const res=  await Login(aadharCardNumber, password);
     console.log(res);
     
     if(res.user.role==='admin'){
       navigate("/admin"); 

     }else{
      navigate('/candidate')
     }
    } catch (err) {
      console.log(err)
      // setError(err.response?.data?.error || "Login failed");
      toast.error(err.response?.data?.error || "login failed")
    }
  };

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
    
    <div className="flex pt-[50px] justify-center relative z-10 items-center h-[80vh]">
      <LoginForm data={{submit:Submit,aadharCardNumber:aadharCardNumber,password:password,setAadharCardNumber:setAadharCardNumber,setPassword:setPassword}}/>
      <Toaster />
      {/* <div className="card w-96">
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
      </div> */}
    </div>
</div>


  );
}