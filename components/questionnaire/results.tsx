"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { QuestionnaireData, PreFormData } from "@/types/questionnaire"
import { getScoreColor, getScoreInterpretation } from "@/lib/scoring"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface ResultsProps {
  data: QuestionnaireData
  preFormData: PreFormData
  plan: "standard" | "enterprise"
  onReset: () => void
}

export default function Results({ data, preFormData, plan, onReset }: ResultsProps) {
  const scores = data.scores

  const barChartData = [
    { name: "Belonging\nIntelligence", value: Math.round(scores.belongingScore) },
    { name: "Leadership\nClimate", value: Math.round(scores.leadershipScore) },
    { name: "Talent Flow\n(AURA)", value: Math.round(scores.talentFlowScore) },
    { name: "Culture\nMaturity", value: Math.round(scores.cultureScore) },
  ]

  const enterpriseChartData =
    plan === "enterprise"
      ? [
          ...barChartData,
          { name: "Well-being\nStability", value: Math.round(scores.wellBeingScore || 0) },
          { name: "Inclusion &\nIdentity Safety", value: Math.round(scores.inclusionScore || 0) },
        ]
      : barChartData

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader>
          <CardTitle className="text-3xl">Assessment Results</CardTitle>
          <CardDescription className="text-base mt-2">
            {preFormData.companyName} • {preFormData.departmentName} • {plan === "standard" ? "Standard" : "Enterprise"}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Experience Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">{Math.round(scores.overallScore)}</div>
            <Badge className={`text-lg ${getScoreColor(scores.overallScore)}`}>
              {getScoreInterpretation(scores.overallScore)}
            </Badge>
            <p className="text-gray-600 mt-4">
              {scores.overallScore >= 80 &&
                "Excellent - Your organization has strong foundations for employee engagement and belonging."}
              {scores.overallScore >= 60 &&
                scores.overallScore < 80 &&
                "Good - You have positive engagement with room for targeted improvements."}
              {scores.overallScore >= 40 &&
                scores.overallScore < 60 &&
                "At Risk - Consider focused interventions to strengthen employee experience."}
              {scores.overallScore < 40 && "Critical - Immediate action needed to address organizational challenges."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Scores Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Dimension Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enterpriseChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6">
                {enterpriseChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Belonging Intelligence</h4>
              <div className="text-2xl font-bold text-blue-600">{Math.round(scores.belongingScore)}</div>
              <p className="text-sm text-gray-600 mt-1">How connected and valued people feel</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Leadership Climate</h4>
              <div className="text-2xl font-bold text-green-600">{Math.round(scores.leadershipScore)}</div>
              <p className="text-sm text-gray-600 mt-1">Quality of manager relationships</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Talent Flow (AURA)</h4>
              <div className="text-2xl font-bold text-amber-600">{Math.round(scores.talentFlowScore)}</div>
              <p className="text-sm text-gray-600 mt-1">Attraction through Advocacy</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Culture Maturity</h4>
              <div className="text-2xl font-bold text-red-600">{Math.round(scores.cultureScore)}</div>
              <p className="text-sm text-gray-600 mt-1">Organizational culture strength</p>
            </div>

            {plan === "enterprise" && (
              <>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Well-being Stability</h4>
                  <div className="text-2xl font-bold text-purple-600">{Math.round(scores.wellBeingScore || 0)}</div>
                  <p className="text-sm text-gray-600 mt-1">Burnout risk assessment</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Inclusion & Identity Safety</h4>
                  <div className="text-2xl font-bold text-cyan-600">{Math.round(scores.inclusionScore || 0)}</div>
                  <p className="text-sm text-gray-600 mt-1">Diversity and psychological safety</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button onClick={onReset} size="lg">
          Take Assessment Again
        </Button>
      </div>
    </div>
  )
}
