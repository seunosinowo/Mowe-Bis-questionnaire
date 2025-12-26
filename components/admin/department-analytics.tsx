"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { getAnalyticsData, type AnalyticsRecord } from "@/lib/analytics"

export default function DepartmentAnalytics() {
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

  const departmentData = useMemo(() => {
    const grouped: Record<string, any> = {}

    data.responses.forEach((response) => {
      const dept = response.departmentName || "Unknown"
      if (!grouped[dept]) {
        grouped[dept] = {
          department: dept,
          count: 0,
          avgBelonging: 0,
          avgLeadership: 0,
          avgTalent: 0,
          avgCulture: 0,
          avgOverall: 0,
        }
      }
      grouped[dept].count += 1
      grouped[dept].avgBelonging += response.scores.belongingScore
      grouped[dept].avgLeadership += response.scores.leadershipScore
      grouped[dept].avgTalent += response.scores.talentFlowScore
      grouped[dept].avgCulture += response.scores.cultureScore
      grouped[dept].avgOverall += response.scores.overallScore
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

  if (isLoading) {
    return <div className="flex items-center justify-center py-12 text-gray-600">Loading analytics...</div>
  }

  return (
    <div className="space-y-6">
      <Card className="border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">Department Analysis</CardTitle>
          <CardDescription>Performance metrics by department</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="department" fontSize={12} stroke="#6b7280" />
              <YAxis domain={[0, 100]} stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }} />
              <Legend />
              <Bar dataKey="avgBelonging" fill="#10b981" name="Belonging" />
              <Bar dataKey="avgLeadership" fill="#f59e0b" name="Leadership" />
              <Bar dataKey="avgTalent" fill="#3b82f6" name="Talent Flow" />
              <Bar dataKey="avgCulture" fill="#ef4444" name="Culture" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">Department Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentData.map((dept) => (
              <div key={dept.department} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                <h4 className="font-semibold text-gray-900 text-lg mb-2">{dept.department}</h4>
                <div className="grid grid-cols-5 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Responses</p>
                    <p className="font-bold text-gray-900 text-lg">{dept.count}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Overall</p>
                    <p className="font-bold text-blue-600 text-lg">{dept.avgOverall}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Belonging</p>
                    <p className="font-bold text-green-600 text-lg">{dept.avgBelonging}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Leadership</p>
                    <p className="font-bold text-amber-600 text-lg">{dept.avgLeadership}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Culture</p>
                    <p className="font-bold text-red-600 text-lg">{dept.avgCulture}</p>
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
