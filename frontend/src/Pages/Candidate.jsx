import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import {AuthContext} from '../Context/AuthContext'
import {getCandidates, voteCandidate,} from '../API/api'
import CandidateCard from '../Components/CandidateCard'





function Candidate() {
const {user}=useContext(AuthContext)
const [candidate,setcandidate]= useState([])

// console.log(user.id);

useEffect(()=>{
    getCandidates().then((data)=>{
    setcandidate(data)
  })
},[])

// console.log(candidate);
 const handlevote= async(candidateid,userid)=>{
   await voteCandidate(candidateid,userid)
 }

  return (
    <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-3">{
      candidate.map((c)=>{
        // console.log(c._id);
        
         return <CandidateCard key={c._id} candidate={c} onvote={handlevote} userid={user?.id} />
      })
      }</div>
  )
}

export default Candidate