"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { getAnalyticsData, type AnalyticsRecord } from "@/lib/analytics"

export default function GenderAnalytics() {
  const [data, setData] = useState<{ responses: AnalyticsRecord[] }>({ responses: [] })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getAnalyticsData()
      .then((result) => {
        if (!cancelled) {
          setData(result)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData({ responses: [] })
          setIsLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  const genderData = useMemo(() => {
    const grouped: Record<string, any> = {}

    data.responses.forEach((response) => {
      const gender = response.gender || "Not Specified"
      if (!grouped[gender]) {
        grouped[gender] = {
          gender,
          count: 0,
          avgBelonging: 0,
          avgLeadership: 0,
          avgTalent: 0,
          avgCulture: 0,
          avgOverall: 0,
        }
      }
      grouped[gender].count += 1
      grouped[gender].avgBelonging += response.scores.belongingScore
      grouped[gender].avgLeadership += response.scores.leadershipScore
      grouped[gender].avgTalent += response.scores.talentFlowScore
      grouped[gender].avgCulture += response.scores.cultureScore
      grouped[gender].avgOverall += response.scores.overallScore
    })

    return Object.values(grouped).map((item) => ({
      ...item,
      avgBelonging: Math.round(item.avgBelonging / item.count),
      avgLeadership: Math.round(item.avgLeadership / item.count),
      avgTalent: Math.round(item.avgTalent / item.count),
      avgCulture: Math.round(item.avgCulture / item.count),
      avgOverall: Math.round(item.avgOverall / item.count),
    }))
  }, [data])

  const genderDistribution = useMemo(() => {
    return genderData.map((item) => ({
      name: item.gender,
      value: item.count,
      fill: item.gender === "Male" ? "#3b82f6" : item.gender === "Female" ? "#ec4899" : "#8b5cf6",
    }))
  }, [genderData])

  if (isLoading) {
    return <div className="flex items-center justify-center py-12 text-gray-600">Loading analytics...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Gender Distribution</CardTitle>
            <CardDescription>Respondent breakdown by gender</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Scores by Gender</CardTitle>
            <CardDescription>Average scores across all dimensions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={genderData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="gender" fontSize={12} stroke="#6b7280" />
                <YAxis domain={[0, 100]} stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }} />
                <Legend />
                <Bar dataKey="avgBelonging" fill="#10b981" name="Belonging" />
                <Bar dataKey="avgLeadership" fill="#f59e0b" name="Leadership" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">Gender Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {genderData.map((gender) => (
              <div key={gender.gender} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                <h4 className="font-semibold text-gray-900 text-lg mb-2">{gender.gender}</h4>
                <div className="grid grid-cols-5 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Respondents</p>
                    <p className="font-bold text-gray-900 text-lg">{gender.count}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Overall</p>
                    <p className="font-bold text-blue-600 text-lg">{gender.avgOverall}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Belonging</p>
                    <p className="font-bold text-green-600 text-lg">{gender.avgBelonging}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Leadership</p>
                    <p className="font-bold text-amber-600 text-lg">{gender.avgLeadership}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Culture</p>
                    <p className="font-bold text-red-600 text-lg">{gender.avgCulture}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
