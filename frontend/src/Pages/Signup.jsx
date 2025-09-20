import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", aadharCardNumber: "", password: "",age:"",email:'',mobile:'',address:"",role:'voter' });
 const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(form);
     navigate('/candidate')
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
   
    <div className="flex justify-center relative z-10 items-center h-[80vh] pt-[50px]  py-3">
      <div className="card w-96 p-2.5">
        <h2 className="text-2xl text-center font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1 bg-white p-5 rounded-2xl">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-1 rounded"
          />
          <input
            type="text"
            placeholder="AadharCardNumber"
            value={form.aadhar}
            onChange={(e) => setForm({ ...form, aadharCardNumber: e.target.value })}
            className="border p-1 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border p-1 rounded"
          />
          <input
            type="Number"
            placeholder="age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="border p-1 rounded"
          />
          <input
            type="Email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-1 rounded"
          />
          <input
            type="Phone"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="border p-1 rounded"
          />
          <input
            type="Address"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="border p-1 rounded"
          />
          <select 
          name="role"
          value={form.role}
          onChange={(e)=>setForm({...form,role:e.target.value})}
           className="w-full border px-3 py-2 rounded-lg"
          >
            <option value='voter'>Voter</option>
            <option value='admin'>Admin</option>
          </select>


          <Button type="submit">Signup</Button>
        </form>
      </div>
    </div>
</div>



  );
}
