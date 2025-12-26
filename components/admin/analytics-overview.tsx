"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { getAnalyticsData, type AnalyticsRecord } from "@/lib/analytics"
import { TrendingUp, Users, Target, Zap } from "lucide-react"

export default function AnalyticsOverview() {
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

  const avgScores = useMemo(() => {
    if (data.responses.length === 0) return null
    const total = data.responses.reduce(
      (acc, resp) => ({
        belonging: acc.belonging + resp.scores.belongingScore,
        leadership: acc.leadership + resp.scores.leadershipScore,
        talent: acc.talent + resp.scores.talentFlowScore,
        culture: acc.culture + resp.scores.cultureScore,
        overall: acc.overall + resp.scores.overallScore,
      }),
      { belonging: 0, leadership: 0, talent: 0, culture: 0, overall: 0 },
    )

    const enterpriseResponses = data.responses.filter((r) => r.plan === "enterprise")
    const enterpriseTotal = enterpriseResponses.reduce(
      (acc, resp) => ({
        wellbeing: acc.wellbeing + (resp.scores.wellBeingScore ?? 0),
        inclusion: acc.inclusion + (resp.scores.inclusionScore ?? 0),
      }),
      { wellbeing: 0, inclusion: 0 },
    )

    const count = data.responses.length
    const enterpriseCount = enterpriseResponses.length
    return {
      belonging: Math.round(total.belonging / count),
      leadership: Math.round(total.leadership / count),
      talent: Math.round(total.talent / count),
      culture: Math.round(total.culture / count),
      wellbeing: enterpriseCount > 0 ? Math.round(enterpriseTotal.wellbeing / enterpriseCount) : 0,
      inclusion: enterpriseCount > 0 ? Math.round(enterpriseTotal.inclusion / enterpriseCount) : 0,
      overall: Math.round(total.overall / count),
    }
  }, [data])

  const scoreDistribution = useMemo(() => {
    return [
      {
        name: "Excellent",
        value: data.responses.filter((r) => r.scores.overallScore >= 80).length,
        fill: "#10b981",
      },
      {
        name: "Healthy",
        value: data.responses.filter((r) => r.scores.overallScore >= 60 && r.scores.overallScore < 80).length,
        fill: "#3b82f6",
      },
      {
        name: "At Risk",
        value: data.responses.filter((r) => r.scores.overallScore >= 40 && r.scores.overallScore < 60).length,
        fill: "#f59e0b",
      },
      {
        name: "Critical",
        value: data.responses.filter((r) => r.scores.overallScore < 40).length,
        fill: "#ef4444",
      },
    ]
  }, [data])

  const allDomainsComparison = useMemo(() => {
    return [
      { name: "Belonging", value: avgScores?.belonging || 0 },
      { name: "Leadership", value: avgScores?.leadership || 0 },
      { name: "Talent Flow", value: avgScores?.talent || 0 },
      { name: "Culture", value: avgScores?.culture || 0 },
      { name: "Well-being", value: avgScores?.wellbeing || 0 },
      { name: "Inclusion", value: avgScores?.inclusion || 0 },
    ]
  }, [avgScores])

  const planDistribution = useMemo(() => {
    const standard = data.responses.filter((r) => r.plan === "standard").length
    const enterprise = data.responses.filter((r) => r.plan === "enterprise").length
    return [
      { name: "Standard", value: standard, fill: "#3b82f6" },
      { name: "Enterprise", value: enterprise, fill: "#8b5cf6" },
    ]
  }, [data])

  const genderDistribution = useMemo(() => {
    const grouped: Record<string, number> = {}
    data.responses.forEach((r) => {
      grouped[r.gender] = (grouped[r.gender] || 0) + 1
    })
    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
      fill: ["#ec4899", "#06b6d4", "#f59e0b"][Object.keys(grouped).indexOf(name) % 3],
    }))
  }, [data])

  if (isLoading) {
    return <div className="flex items-center justify-center py-12 text-gray-600">Loading analytics...</div>
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-200 bg-white hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Total Responses</CardTitle>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{data.responses.length}</div>
            <p className="text-xs text-gray-600 mt-1">Complete assessments</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Overall Score</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{avgScores?.overall || 0}</div>
            <p className="text-xs text-gray-600 mt-1">Aggregate health</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Standard %</CardTitle>
              <Target className="w-4 h-4 text-rose-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {data.responses.length > 0
                ? Math.round((data.responses.filter((r) => r.plan === "standard").length / data.responses.length) * 100)
                : 0}
              %
            </div>
            <p className="text-xs text-gray-600 mt-1">Standard plan usage</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700">Enterprise %</CardTitle>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {data.responses.length > 0
                ? Math.round(
                    (data.responses.filter((r) => r.plan === "enterprise").length / data.responses.length) * 100,
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-gray-600 mt-1">Premium adoption</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 bg-white lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-gray-900">All Six Domains Performance</CardTitle>
            <CardDescription>Average scores across all MoWE-BIS dimensions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={allDomainsComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" fontSize={12} stroke="#6b7280" />
                <YAxis domain={[0, 100]} stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                  labelStyle={{ color: "#111827" }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Score Distribution</CardTitle>
            <CardDescription>Health status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scoreDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                  labelStyle={{ color: "#111827" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Plan Distribution</CardTitle>
            <CardDescription>Standard vs Enterprise adoption</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                  labelStyle={{ color: "#111827" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Gender Distribution</CardTitle>
            <CardDescription>Demographics breakdown</CardDescription>
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
                <Tooltip
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                  labelStyle={{ color: "#111827" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-gray-900">Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-1">Highest Domain</p>
              <p className="text-lg font-semibold text-emerald-600">
                {allDomainsComparison.reduce((a, b) => (a.value > b.value ? a : b)).name}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-1">Needs Attention</p>
              <p className="text-lg font-semibold text-amber-600">
                {allDomainsComparison.reduce((a, b) => (a.value < b.value ? a : b)).name}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-1">Healthy Organizations</p>
              <p className="text-lg font-semibold text-blue-600">
                {data.responses.length > 0
                  ? Math.round(
                      (((scoreDistribution.find((s) => s.name === "Excellent")?.value || 0) +
                        (scoreDistribution.find((s) => s.name === "Healthy")?.value || 0)) /
                        data.responses.length) *
                        100,
                    )
                  : 0}
                %
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
