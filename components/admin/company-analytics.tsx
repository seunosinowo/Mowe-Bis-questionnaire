"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { getAnalyticsData, type AnalyticsRecord } from "@/lib/analytics"
import { Building2 } from "lucide-react"

export default function CompanyAnalytics() {
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

  const companyData = useMemo(() => {
    const grouped: Record<string, any> = {}

    data.responses.forEach((response) => {
      const company = response.companyName || "Unknown"
      if (!grouped[company]) {
        grouped[company] = {
          company,
          count: 0,
          enterpriseCount: 0,
          avgBelonging: 0,
          avgLeadership: 0,
          avgTalent: 0,
          avgCulture: 0,
          avgWellbeing: 0,
          avgInclusion: 0,
          avgOverall: 0,
        }
      }
      grouped[company].count += 1
      grouped[company].avgBelonging += response.scores.belongingScore
      grouped[company].avgLeadership += response.scores.leadershipScore
      grouped[company].avgTalent += response.scores.talentFlowScore
      grouped[company].avgCulture += response.scores.cultureScore
      grouped[company].avgOverall += response.scores.overallScore

      if (response.plan === "enterprise") {
        grouped[company].enterpriseCount += 1
        grouped[company].avgWellbeing += response.scores.wellBeingScore ?? 0
        grouped[company].avgInclusion += response.scores.inclusionScore ?? 0
      }
    })

    return Object.values(grouped).map((item) => ({
      ...item,
      avgBelonging: Math.round(item.avgBelonging / item.count),
      avgLeadership: Math.round(item.avgLeadership / item.count),
      avgTalent: Math.round(item.avgTalent / item.count),
      avgCulture: Math.round(item.avgCulture / item.count),
      avgWellbeing: item.enterpriseCount > 0 ? Math.round(item.avgWellbeing / item.enterpriseCount) : 0,
      avgInclusion: item.enterpriseCount > 0 ? Math.round(item.avgInclusion / item.enterpriseCount) : 0,
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
          <CardTitle className="text-gray-900">Company Domain Comparison</CardTitle>
          <CardDescription>Performance metrics across all organizations</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={companyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="company" fontSize={12} stroke="#6b7280" />
              <YAxis domain={[0, 100]} stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                labelStyle={{ color: "#111827" }}
              />
              <Legend />
              <Bar dataKey="avgBelonging" fill="#10b981" name="Belonging" />
              <Bar dataKey="avgLeadership" fill="#3b82f6" name="Leadership" />
              <Bar dataKey="avgTalent" fill="#f59e0b" name="Talent" />
              <Bar dataKey="avgCulture" fill="#ef4444" name="Culture" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {companyData.length === 0 ? (
          <Card className="border-gray-200 bg-white">
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">No company data available yet</p>
            </CardContent>
          </Card>
        ) : (
          companyData.map((company) => (
            <Card key={company.company} className="border-gray-200 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-4">{company.company}</h3>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-600 text-xs mb-1">Responses</p>
                        <p className="font-bold text-gray-900">{company.count}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-600 text-xs mb-1">Overall Score</p>
                        <p className="font-bold text-blue-600">{company.avgOverall}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-600 text-xs mb-1">Health Status</p>
                        <p className="font-bold text-emerald-600">
                          {company.avgOverall >= 80 ? "Excellent" : company.avgOverall >= 60 ? "Healthy" : "At Risk"}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-600 text-xs mb-1">Top Domain</p>
                        <p className="font-bold text-amber-600">
                          {company.avgBelonging > company.avgLeadership
                            ? company.avgBelonging > company.avgTalent
                              ? "Belonging"
                              : "Talent"
                            : company.avgLeadership > company.avgTalent
                              ? "Leadership"
                              : "Talent"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
