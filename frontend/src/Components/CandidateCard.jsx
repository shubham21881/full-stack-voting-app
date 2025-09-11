



export default function CandidateCard({ candidate ,onvote,userid}) {

 
console.log(candidate._id);






  return (
    <div className="border-2 border-black py-2 card flex flex-col gap-2 items-center">
      <h3 className="text-xl font-semibold">{candidate.name}</h3>
      <p className="text-gray-600">{candidate.party || "Independent"}</p>
      <button  className="bg-green-400 px-2.5" onClick={() => onvote(candidate._id,userid)}>Vote</button>
      
      
    </div>
  );
}