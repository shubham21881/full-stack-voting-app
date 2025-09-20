import React, { useEffect, useState } from 'react'
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getVoteCounts } from '../API/api'

// Color palette for different parties
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C']

export function VoteResultsChart() {
  const [voteData, setVoteData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        const data = await getVoteCounts()
        // Transform the data from the API format to chart format
        const transformedData = data.flat().map((item, index) => ({
          party: item.party || 'Independent',
          votes: item.count || 0,
          fill: COLORS[index % COLORS.length]
        }))
        setVoteData(transformedData)
        setError(null)
      } catch (err) {
        console.error('Error fetching vote data:', err)
        setError(err.message || 'Failed to fetch vote data')
      } finally {
        setLoading(false)
      }
    }

    fetchVoteData()
  }, [])

  const chartConfig = {
    votes: {
      label: "Votes",
    },
  }

  if (loading) return <div className="p-4">Loading vote data...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>
  if (!voteData.length) return <div className="p-4">No vote data available</div>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Vote Results - Bar Chart</CardTitle>
          <CardDescription>Vote counts by political party</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={voteData} margin={{ top: 0, right: 10, left: 0, bottom: -10 }}>
              <XAxis 
                dataKey="party" 
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
                tickFormatter={(value) => value.slice(0, 4)}
              />
              <YAxis 
                dataKey="votes"
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip 
                cursor={false} 
                content={<ChartTooltipContent />} 
              />
              <Bar dataKey="votes" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Vote Distribution - Pie Chart</CardTitle>
          <CardDescription>Percentage of votes by party</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <PieChart>
              <Pie
                data={voteData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ party, percent }) => `${party}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="votes"
              >
                {voteData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

// Horizontal Bar Chart Component
export function VoteResultsHorizontalChart() {
  const [voteData, setVoteData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        const data = await getVoteCounts()
        const transformedData = data.flat().map((item, index) => ({
          party: item.party || 'Independent',
          votes: item.count || 0,
          fill: COLORS[index % COLORS.length]
        }))
        setVoteData(transformedData)
        setError(null)
      } catch (err) {
        console.error('Error fetching vote data:', err)
        setError(err.message || 'Failed to fetch vote data')
      } finally {
        setLoading(false)
      }
    }

    fetchVoteData()
  }, [])

  const chartConfig = {
    votes: {
      label: "Votes",
    },
  }

  if (loading) return <div className="p-4">Loading vote data...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>
  if (!voteData.length) return <div className="p-4">No vote data available</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vote Results - Horizontal Bar Chart</CardTitle>
        <CardDescription>Vote counts by political party (horizontal view)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={voteData}
            layout="horizontal"
            margin={{ top: 30, right: 30, left: 10, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis 
              dataKey="party" 
              type="category" 
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={100}
            />
            <ChartTooltip 
              cursor={false} 
              content={<ChartTooltipContent />} 
            />
            <Bar dataKey="votes" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default VoteResultsChart
