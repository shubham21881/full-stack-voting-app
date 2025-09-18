import React, { useEffect, useState } from 'react'
import MyBarChart from "../Components/MyBarChart";
function VoteResults() {
    const [votecount, setvotecount] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchVoteCounts = async () => {
            try {
                // Direct fetch test
                const response = await fetch('http://localhost:3000/candidate/vote/count');
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

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!votecount) return <div>No vote data available</div>

    return (
        <div className="pt-[100px]">
            <div className='w-1/2 h-1/2'>

            <MyBarChart />
            </div>
            <h1 className="text-2xl font-bold mb-4">Election Results</h1>
            <div className="grid gap-4">
                {votecount?.map((data, index) => (
                    <div key={index} className="grid gap-4">
                        {data.map((info) => (
                            <div key={info.party} className="border p-4 rounded shadow">
                                <h2 className="text-xl font-semibold">
                                    Party: {info.party || 'Independent'}
                                </h2>
                                <p className="text-lg">Votes: {info.count}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VoteResults