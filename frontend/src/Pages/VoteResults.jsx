import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/Config.js';
import VoteResultsChart from '../Components/VoteResultsChart';
import OrbitProgress from "react-loading-indicators/OrbitProgress";




function VoteResults() {
    const [votecount, setvotecount] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchVoteCounts = async () => {
            try {
                // Direct fetch test
                const response = await fetch(`${API_BASE_URL}/candidate/vote/count`);
                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Vote data:', data);
                setvotecount(data)
                setError(null)
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message || 'Failed to fetch vote counts')
            } finally {
                setLoading(false)
            }
        }

        fetchVoteCounts()
    }, [])

    if (loading) return <div className='w-screen h-screen flex justify-center items-center'><OrbitProgress variant="track-disc" color="#A084DC" size="small"/></div>
    if (error) return <div>Error: {error}</div>
    if (!votecount) return <div>No vote data available</div>

    return (
        <div className="min-h-screen w-full relative">
        {/* Purple Gradient Grid Left Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #f0f0f0 1px, transparent 1px),
              linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
              radial-gradient(800px circle at 0% 200px, #d5c5ff, transparent)
            `,
            backgroundSize: "96px 64px, 96px 64px, 100% 100%",
          }}
        />
      
        {/* Your Content/Components */}
        <div className="relative z-10 pt-[30px] bg-white/70 backdrop-blur-sm">
          <div className="sm:w-full h-full">
          
            <VoteResultsChart />
          </div>
          <h1 className="text-2xl text-center m-2 font-bold mb-4">Election Results</h1>
          <div className="grid gap-1 m-2">
          <div
                 
                    className="border  sm:p-2 rounded shadow flex justify-between bg-white/80"
                  >  <span>Ranking</span>
                    <h3 className=" text-sm sm:text-xl font-semibold">
                       partyname
                    </h3>
                    <p className="text-lg">Votes</p>
                  </div>
            {votecount?.map((data, index) => (
              <div key={index} className="grid gap-4">
                {data.map((info) => (
                  <div
                    key={info.party}
                    className="border  sm:p-2 rounded shadow flex justify-between bg-white/80"
                    
                  > 
                  {index+1===1?<span className='bg-green-200 min-w-[80px]  text-[15px] min-h-[50%] sm:min-h-[25px] sm:min-w-[100px] rounded-2xl flex justify-center items-center'> winner {index+1}</span>:<span>{index+1}</span>}
                  
                    <h3 className=" text-sm ">
                       {info.party || "Independent"}
                    </h3>
                    <p className="text-lg">{info.count}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
    )
}

export default VoteResults