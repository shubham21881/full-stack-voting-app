import { useState,useEffect, useContext } from 'react'
import { getProfile } from '../API/api'
import { AuthContext } from '../Context/AuthContext'
import toast, { Toaster } from 'react-hot-toast';
import { ConfettiButton } from "./ui/confetti";

export default function CandidateCard({ candidate ,onvote}) {

const [user,setuser]=useState(null)
const [loading,setLoading]=useState(true)
const [hasVoted,setHasVoted]=useState(false)
const {user:authUser}= useContext(AuthContext)

useEffect(()=>{
const handleprofiledata=async()=>{
  try{
    if(authUser){
      const data=await getProfile()
      setuser(data)
      setHasVoted(data.person.isvoted)
    }
  }catch(error){
    console.error('error fetching profile:',error)
  }finally{
    setLoading(false)
  }
}

handleprofiledata()
},[authUser])

// console.log(user.person._id);
// console.log(user.person.isvoted);
// console.log(user.person.role);

    const isDisabled = authUser?.role === "admin" || hasVoted || !authUser
// console.log(candidate._id);

// console.log(user.id);
// console.log(user.isvoted);
// console.log(user.role);


if (loading) {
        return (
            <div className="border-2 border-black py-2 card flex justify-between gap-1 items-center rounded-xl">
      <img className='rounded-[50%]' src="https://placehold.co/50x50" alt="" />

                <h3 className="sm:text-xl font-semibold">{candidate.name}</h3>
                <p className="text-gray-600">{candidate.party || "Independent"}</p>
                <div className="px-2.5 py-1 rounded text-white bg-gray-400">
                    Loading...
                </div>
            </div>
        )
    }



  return (
    <div className="border-1 border-black py-2 px-2 card flex justify-between  gap-1 items-center  rounded-xl">
      <img className='rounded-[50%]' src="https://placehold.co/50x50" alt="" />
            <p className="  text-[15px] sm:text-xl font-semibold">{candidate.name}</p>
            <p className="text-gray-600">{candidate.party || "Independent"}</p>
            <ConfettiButton
                disabled={false}
                className={`px-2 text-[15px] sm:text-xl py-1 rounded text-white ${
                    isDisabled ? "bg-[#A084DC] cursor-not-allowed" : "bg-[#A084DC]"
                }`}
                onClick={() => onvote(candidate._id)}
            >
                {!authUser ? "Login" :  <ConfettiButton>vote</ConfettiButton>}
            </ConfettiButton>
            <Toaster />
           
        </div>
  );
}