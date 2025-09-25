import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../Components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
  criteriaMode: "firstError"  
});

  const Submit = async (data) => {
    try {
      const res = await signup(data);
      console.log(res);
      toast.success("Successfully signed up");
      setTimeout(() => navigate("/candidate"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to signup");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white relative">
      
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


      <div className="flex justify-center relative z-10 items-center h-[80vh] pt-[200px] sm:pt-[50px] py-3">
        <div className="card w-96 p-2.5">
          <h2 className="text-2xl text-center font-bold mb-4">Signup</h2>
          <form
            onSubmit={handleSubmit(Submit)}
            className="flex flex-col gap-2 bg-white p-5 rounded-2xl"
          >
          
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Full Name is required" })}
              className="border p-1 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

        
            <input
              type="text"
              placeholder="Aadhar Card Number"
              {...register("aadharCardNumber", {
                required: "Aadhaar number is required",
                validate: {
                  isTwelveDigits: (value) =>
                    value.length === 12 ||
                    "Aadhaar number must be exactly 12 digits",
                  isNumeric: (value) =>
                    /^\d+$/.test(value) ||
                    "Aadhaar number must contain only digits",
                },
              })}
              className="border p-1 rounded"
            />
            

          
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="border p-1 rounded"
            />
           

      
            <input
              type="number"
              placeholder="Age"
              {...register("age", {
                required: "Age is required",
                validate: {
                  isEighteenOrOlder: (value) =>
                    value >= 18 || "You must be 18 or older to proceed",
                },
              })}
              className="border p-1 rounded"
            />
            

        
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be valid",
                },
              })}
              className="border p-1 rounded"
            />
            

        
            <input
              type="tel"
              placeholder="Mobile Number"
              {...register("mobile", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Please enter a valid 10-digit Indian mobile number",
                },
              })}
              className="border p-1 rounded"
            />
           

            
            <input
              type="text"
              placeholder="Address"
              {...register("address", { required: "Address is required" })}
              className="border p-1 rounded"
            />
           
        
            <select
              {...register("role")}
              defaultValue="voter"
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="voter">Voter</option>
              <option value="admin">Admin</option>
            </select>

            
             {Object.keys(errors).length > 0 && (
  <div className="bg-red-100 text-red-600 p-2 rounded text-sm mt-2">
    {Object.values(errors)[0].message}
  </div>
)}
            <Button type="submit">Signup</Button>
            <Toaster />
          </form>
        </div>
      </div>
    </div>
  );
}
