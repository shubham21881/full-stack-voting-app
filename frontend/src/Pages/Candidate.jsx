import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {getCandidates, voteCandidate,} from '../API/api'
import CandidateCard from '../Components/CandidateCard'
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import OrbitProgress from "react-loading-indicators/OrbitProgress";



function Candidate() {
  const navigate=useNavigate()
  const notify = (error) => toast(`${error}`);
const [candidate,setcandidate]= useState([])
const [loading,setLoading]=useState(true);
const [error,setError]=useState(null)
const {user,refreshUser}=useContext(AuthContext)

 useEffect(()=>{
  const fetchCandidates=async()=>{
    try {
      
      const data=await getCandidates();
      setcandidate(data)
          setError(null)
    } catch (error) {
      console.log('Error fetching candidates:',error)
      setError('failed to load candidates')
    }finally{
      setLoading(false)
    }
  }
 fetchCandidates()

 },[])

    


 const handlevote= async(candidateid,userid)=>{
  if(!user){

    // setError('please login to vote')
    navigate('/login')
    return
  }
   try {
  await voteCandidate(candidateid,userid);
  const updatedData=await getCandidates()
  setcandidate(updatedData)
  notify('vote successful')
  await refreshUser()
  
  setError(null)
} catch (error) {
   notify(error.response?.data.message)
  // console.error('voting error:',error)
  // setError(error.response?.data.message|| 'Voting failed')
}
   
 }

 if(loading) return <div className='w-screen h-screen flex justify-center items-center'><OrbitProgress variant="track-disc" color="#A084DC" size="small"/></div>
 if(error) return <div>Error:{error}</div>



  return (
    <div className="min-h-screen w-full bg-white relative">
  {/* Dual Gradient Overlay (Bottom) Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 100%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 100% 80%, rgba(59,130,246,0.3), transparent)
      `,
      backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
    }}
  />
     {/* Your Content/Components */}
     <div className=" relative z-10 pt-[50px]">
            {!user && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    Please login to vote for candidates
                </div>
            )}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {candidate.map((c) => {
                    return <CandidateCard key={c._id} candidate={c} onvote={handlevote} />
                })}
            </div>
        </div>
</div>
  )
}

export default Candidate