import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <div className="flex justify-center items-center h-[80vh]">
      <div className="card w-96">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="AadharCardNumber"
            value={form.aadhar}
            onChange={(e) => setForm({ ...form, aadharCardNumber: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="Number"
            placeholder="age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="Email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="Phone"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="Address"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="border p-2 rounded"
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


          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}
