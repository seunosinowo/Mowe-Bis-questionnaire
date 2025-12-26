import type { QuestionnaireData, PreFormData } from "@/types/questionnaire"

export interface AnalyticsRecord {
  companyName: string
  departmentName: string
  gender: string
  plan: "standard" | "enterprise"
  scores: {
    belongingScore: number
    leadershipScore: number
    talentFlowScore: number
    cultureScore: number
    overallScore: number
    wellBeingScore?: number
    inclusionScore?: number
  }
  timestamp: string
}

export async function saveResponse(preFormData: PreFormData, questionnaireData: QuestionnaireData): Promise<void> {
  await fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ preFormData, questionnaireData }),
  })
}

export async function getAnalyticsData(): Promise<{ responses: AnalyticsRecord[] }> {
  const res = await fetch("/api/analytics", { cache: "no-store" })
  if (!res.ok) return { responses: [] }
  return res.json()
}
