 import { createContext,useEffect,useState } from "react";
import { login,signupuser } from "../API/api";
import { getProfile } from "../API/api";
  export const AuthContext= createContext(null);

 export  const AuthProvider=(props)=>{
    const [user,setuser]= useState(null);
    const [loading, setLoading] = useState(true);
 
console.log(user);


    useEffect(()=>{
      const token= localStorage.getItem('token');
      const userData= localStorage.getItem('user')
      if(token && userData){
         setuser(JSON.parse(userData));
      }
       setLoading(false)
    },[])

    const Login= async(aadhar,password)=>{
      try{
          const res= await login(aadhar,password)
          setuser(res.user);
          localStorage.setItem('token',res.token)
          localStorage.setItem('user',JSON.stringify(res.user))
          return res
      }catch(error){
            console.error('Login error:', error);
            throw error;
      }
       
    }

   const signup=async(form)=>{
      try{
      const res=await signupuser(form);
 
      console.log(res);
      
      setuser(res.user);
      localStorage.setItem("token",res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      return res
      } catch(error){
       console.error('signup error:', error);
            throw error;  
      }
      
   }


   const refreshUser=async()=>{

      try {
         const userData=await getProfile()
         setuser(userData);
         localStorage.setItem('user',JSON.stringify(userData));

      } catch (error) {
         console.error('refresh user error:',error);
         
      }
   }

 const logout=()=>{
    setuser(null);
    localStorage.removeItem('token')
     localStorage.removeItem('user');
 

 }


return (

   <AuthContext.Provider value={{user,signup,Login,logout,refreshUser}}>
      {props.children}
   </AuthContext.Provider>
)

 

 }