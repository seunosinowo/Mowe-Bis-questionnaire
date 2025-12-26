export interface PreFormData {
  companyName: string
  departmentName: string
  gender: string
}

export interface QuestionItem {
  id: string
  text: string
  section: string
  driver?: string
}

export interface ScoreResult {
  belongingScore: number
  leadershipScore: number
  talentFlowScore: number
  cultureScore: number
  overallScore: number
  wellBeingScore?: number
  inclusionScore?: number
}

export interface QuestionnaireData {
  plan: "standard" | "enterprise"
  answers: Record<string, number>
  scores: ScoreResult
  timestamp: string
}
