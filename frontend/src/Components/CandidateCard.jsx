import { useState,useEffect, useContext } from 'react'
import { getProfile } from '../API/api'
import { AuthContext } from '../Context/AuthContext'
import toast, { Toaster } from 'react-hot-toast';

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
            <div className="border-2 border-black py-2 card flex flex-col gap-2 items-center">
                <h3 className="text-xl font-semibold">{candidate.name}</h3>
                <p className="text-gray-600">{candidate.party || "Independent"}</p>
                <div className="px-2.5 py-1 rounded text-white bg-gray-400">
                    Loading...
                </div>
            </div>
        )
    }



  return (
    <div className="border-2 border-black py-2 card flex flex-col gap-2 items-center">
            <h3 className="text-xl font-semibold">{candidate.name}</h3>
            <p className="text-gray-600">{candidate.party || "Independent"}</p>
            <button
                disabled={false}
                className={`px-2.5 py-1 rounded text-white ${
                    isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={() => onvote(candidate._id)}
            >
                {!authUser ? "Login to Vote" : "Vote"}
            </button>
            <Toaster />
        </div>
  );
}