"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAnalyticsData, type AnalyticsRecord } from "@/lib/analytics"
import { DOMAIN_INTERPRETATIONS, getDomainInterpretation, getScoreColor, getScoreInterpretation } from "@/lib/scoring"

export default function InterpretationAnalysis() {
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
      }),
      { belonging: 0, leadership: 0, talent: 0, culture: 0 },
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
    }
  }, [data])

  if (isLoading) {
    return <div className="flex items-center justify-center py-12 text-gray-600">Loading analysis...</div>
  }

  const getScoreBandColor = (score: number) => {
    if (score >= 80) return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
    if (score >= 60) return "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
    if (score >= 40) return "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800"
    return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
  }

  const getScoreBandInterpretation = (score: number) => {
    if (score >= 80)
      return {
        label: "Strong — Strategic Asset",
        action: "Amplify",
        description: "This dimension is a competitive advantage. Focus on maintaining and scaling these practices.",
      }
    if (score >= 60)
      return {
        label: "Moderate — Improvement Required",
        action: "Strengthen",
        description: "This dimension has solid foundations but needs targeted improvements.",
      }
    if (score >= 40)
      return {
        label: "Weak — At Risk",
        action: "Repair",
        description: "This dimension requires focused intervention to prevent deterioration.",
      }
    return {
      label: "Critical — Immediate Intervention",
      action: "Stabilize Urgently",
      description: "This dimension needs immediate action to restore organizational health.",
    }
  }

  if (!avgScores) {
    return (
      <Card className="border-gray-200 bg-white">
        <CardContent className="pt-6">
          <p className="text-gray-600">No data available for interpretation analysis.</p>
        </CardContent>
      </Card>
    )
  }

  const domainScores: Array<{ key: keyof typeof DOMAIN_INTERPRETATIONS; name: string; score: number }> = [
    { key: "belongingScore", name: "Belonging Intelligence", score: avgScores.belonging },
    { key: "leadershipScore", name: "Leadership Climate", score: avgScores.leadership },
    { key: "talentFlowScore", name: "Talent Flow (AURA)", score: avgScores.talent },
    { key: "cultureScore", name: "Culture Maturity", score: avgScores.culture },
    { key: "wellBeingScore", name: "Well-being Stability", score: avgScores.wellbeing },
    { key: "inclusionScore", name: "Inclusion & Identity Safety", score: avgScores.inclusion },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {domainScores.map((domain) => (
          <div key={domain.key} className={`border-2 rounded-lg p-6 ${getScoreBandColor(domain.score)}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{domain.name}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {DOMAIN_INTERPRETATIONS[domain.key].description}
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-3">
                  Key drivers:{" "}
                  {DOMAIN_INTERPRETATIONS[domain.key].keyDrivers.join(" • ")}
                </p>
              </div>
              <div className="text-right ml-4">
                <div className="text-4xl font-bold">{domain.score}</div>
                <Badge className={`mt-2 ${getScoreColor(domain.score)}`}>{getScoreInterpretation(domain.score)}</Badge>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-3 rounded mb-3 text-sm">
              <p className="font-semibold mb-2">Executive Rule of Thumb:</p>
              <p className="text-gray-700 dark:text-gray-300">
                {DOMAIN_INTERPRETATIONS[domain.key].ruleOfThumb}
              </p>
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-100 mb-3">
              <strong>Organizational Interpretation:</strong> {getDomainInterpretation(domain.key, domain.score)}
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-white dark:bg-gray-800">
                Action: {getScoreBandInterpretation(domain.score).action}
              </Badge>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {getScoreBandInterpretation(domain.score).description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Card className="border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="text-gray-900">Integration Note</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Read these dimensions holistically — belonging influences leadership, leadership influences culture, culture
            influences talent flow. Use these insights to prioritize interventions and track progress over time.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
