import type { ScoreResult } from "@/types/questionnaire"

// Scoring formulas based on MoWE-BIS documentation

export function calculateScores(answers: Record<string, number>, plan: "standard" | "enterprise"): ScoreResult {
  // SECTION A: Belonging Score (M-BS)
  const identityScore = calculateDriverScore([
    answers["A1"],
    answers["A2"],
    answers["A3"],
    answers["A4"],
    answers["A5"],
  ])

  const connectionScore = calculateDriverScore([
    answers["A6"],
    answers["A7"],
    answers["A8"],
    answers["A9"],
    answers["A10"],
  ])

  const contributionScore = calculateDriverScore([
    answers["A11"],
    answers["A12"],
    answers["A13"],
    answers["A14"],
    answers["A15"],
  ])

  const appreciationScore = calculateDriverScore([
    answers["A16"],
    answers["A17"],
    answers["A18"],
    answers["A19"],
    answers["A20"],
  ])

  const growthScore = calculateDriverScore([
    answers["A21"],
    answers["A22"],
    answers["A23"],
    answers["A24"],
    answers["A25"],
  ])

  const belongingScore = (identityScore + connectionScore + contributionScore + appreciationScore + growthScore) / 5

  // SECTION B: Talent Flow Score (M-TFS)
  const attractionScore = calculateStageScore([answers["B1"], answers["B2"], answers["B3"]])
  const utilizationScore = calculateStageScore([answers["B4"], answers["B5"], answers["B6"]])
  const retentionScore = calculateStageScore([answers["B7"], answers["B8"], answers["B9"]])
  const advocacyScore = calculateStageScore([answers["B10"], answers["B11"], answers["B12"]])

  const talentFlowScore = (attractionScore + utilizationScore + retentionScore + advocacyScore) / 4

  // SECTION C: Leadership Climate Score (M-LCS)
  const trustScore = calculateClimateScore([answers["C1"], answers["C2"], answers["C3"], answers["C4"]])
  const supportScore = calculateClimateScore([answers["C5"], answers["C6"], answers["C7"], answers["C8"]])
  const performanceScore = calculateClimateScore([answers["C9"], answers["C10"], answers["C11"], answers["C12"]])
  const belongingClimateScore = calculateClimateScore([answers["C13"], answers["C14"], answers["C15"], answers["C16"]])

  const leadershipScore = (trustScore + supportScore + performanceScore + belongingClimateScore) / 4

  // SECTION D: Culture Maturity Index (M-CMI)
  const clarityScore = calculatePillarScore([answers["D1"], answers["D2"]])
  const consistencyScore = calculatePillarScore([answers["D3"], answers["D4"]])
  const capabilityScore = calculatePillarScore([answers["D5"], answers["D6"]])
  const communityScore = ((answers["D7"] - 1) / 4) * 100

  const cultureScore = (clarityScore + consistencyScore + capabilityScore + communityScore) / 4

  // Enterprise additional scores
  let wellBeingScore = 0
  let inclusionScore = 0

  if (plan === "enterprise") {
    // Well-being Score
    wellBeingScore = calculateWellBeingScore([
      answers["E1"],
      answers["E2"],
      answers["E3"],
      answers["E4"],
      answers["E5"],
    ])

    // Inclusion Score
    inclusionScore = calculateInclusionScore([
      answers["E6"],
      answers["E7"],
      answers["E8"],
      answers["E9"],
      answers["E10"],
      answers["E11"],
    ])
  }

  // Overall Experience Score (M-OES)
  const overallScore = 0.4 * belongingScore + 0.25 * leadershipScore + 0.25 * talentFlowScore + 0.1 * cultureScore

  return {
    belongingScore,
    leadershipScore,
    talentFlowScore,
    cultureScore,
    overallScore,
    wellBeingScore,
    inclusionScore,
  }
}

function calculateDriverScore(items: number[]): number {
  const validItems = items.filter((i) => i !== undefined)
  if (validItems.length === 0) return 0
  const rawScore = validItems.reduce((a, b) => a + b, 0)
  return ((rawScore - validItems.length) / (validItems.length * 4)) * 100
}

function calculateStageScore(items: number[]): number {
  const validItems = items.filter((i) => i !== undefined)
  if (validItems.length === 0) return 0
  const rawScore = validItems.reduce((a, b) => a + b, 0)
  return ((rawScore - validItems.length) / (validItems.length * 4)) * 100
}

function calculateClimateScore(items: number[]): number {
  const validItems = items.filter((i) => i !== undefined)
  if (validItems.length === 0) return 0
  const rawScore = validItems.reduce((a, b) => a + b, 0)
  return ((rawScore - validItems.length) / (validItems.length * 4)) * 100
}

function calculatePillarScore(items: number[]): number {
  const validItems = items.filter((i) => i !== undefined)
  if (validItems.length === 0) return 0
  const rawScore = validItems.reduce((a, b) => a + b, 0)
  return ((rawScore - validItems.length) / (validItems.length * 4)) * 100
}

function calculateWellBeingScore(items: number[]): number {
  const validItems = items.filter((i) => i !== undefined)
  if (validItems.length === 0) return 0
  const rawScore = validItems.reduce((a, b) => a + b, 0)
  return ((rawScore - validItems.length) / (validItems.length * 4)) * 100
}

function calculateInclusionScore(items: number[]): number {
  const validItems = items.filter((i) => i !== undefined)
  if (validItems.length === 0) return 0
  const rawScore = validItems.reduce((a, b) => a + b, 0)
  return ((rawScore - validItems.length) / (validItems.length * 4)) * 100
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "bg-green-600"
  if (score >= 60) return "bg-yellow-600"
  if (score >= 40) return "bg-orange-600"
  return "bg-red-600"
}

export function getScoreInterpretation(score: number): string {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Healthy"
  if (score >= 40) return "At Risk"
  return "Critical"
}

export const DOMAIN_INTERPRETATIONS = {
  belongingScore: {
    title: "Belonging Intelligence",
    description: "How connected, valued, and aligned employees feel with the organization",
    keyDrivers: ["Identity Fit", "Connection", "Contribution", "Appreciation", "Growth Security"],
    ruleOfThumb: "If belonging is low, recognition and growth support need attention first.",
    interpretations: {
      excellent:
        "Employees feel deeply connected and valued. Strong sense of identity with the organization and clear growth pathways.",
      healthy:
        "Good foundation of belonging with most employees feeling connected. Some opportunities to strengthen appreciation and growth support.",
      atRisk:
        "Concerns about employee connection and value. Focus needed on recognition, development opportunities, and team cohesion.",
      critical:
        "Urgent action needed to rebuild employee belonging. Review identity alignment, recognition systems, and team dynamics.",
    },
  },
  leadershipScore: {
    title: "Leadership Climate",
    description: "The quality of trust, support, and psychological safety within manager relationships",
    keyDrivers: ["Trust", "Support", "Performance Management", "Belonging Climate"],
    ruleOfThumb: "Leadership quality multiplies everything else; fix it early for fastest impact.",
    interpretations: {
      excellent:
        "Managers are highly trusted and supportive. Clear communication, fair accountability, and strong inclusive leadership creating psychological safety.",
      healthy:
        "Generally good manager relationships with strong foundations. Minor improvements needed in consistency or specific support areas.",
      atRisk:
        "Concerns about manager trust and support. Review communication transparency, fairness in feedback, and inclusive practices.",
      critical:
        "Significant leadership challenges affecting team engagement. Immediate focus on trust-building and management effectiveness.",
    },
  },
  talentFlowScore: {
    title: "Talent Flow (AURA Model)",
    description: "The complete journey from attraction through retention and advocacy in the organization",
    keyDrivers: ["Attraction", "Utilization", "Retention", "Advocacy"],
    ruleOfThumb: "If people leave or disengage, find the biggest leak in AURA and plug it.",
    interpretations: {
      excellent:
        "Seamless talent journey from recruitment through advocacy. Employees stay long-term and actively recommend the organization.",
      healthy:
        "Strong talent pipeline with good retention and some advocacy. Ensure recruitment promises continue to match reality.",
      atRisk:
        "Gaps in talent flow requiring attention. Review role clarity, whether skills are fully utilized, and reasons for attrition.",
      critical:
        "Significant talent challenges affecting organizational sustainability. Urgent review of recruitment, role fit, and retention factors.",
    },
  },
  cultureScore: {
    title: "Culture Maturity",
    description: "The clarity, consistency, and capability of organizational cultural systems and sense of community",
    keyDrivers: ["Clarity", "Consistency", "Capability", "Community"],
    ruleOfThumb: "Culture is what gets repeated; align leaders and systems to reinforce it.",
    interpretations: {
      excellent:
        "Mature culture with clear values, consistent application, strong systems, and genuine sense of community.",
      healthy:
        "Good cultural foundation. Values and expectations are generally clear with mostly consistent application.",
      atRisk:
        "Cultural inconsistencies creating confusion. Review clarity of expectations, consistency in policy application, and system effectiveness.",
      critical:
        "Weak cultural foundation impacting organization. Urgently clarify values, strengthen systems, and ensure consistent leadership behavior.",
    },
  },
  wellBeingScore: {
    title: "Well-being Stability (Burnout Risk Assessment)",
    description:
      "Employee workload management, recovery time, and organizational support for mental and physical health",
    keyDrivers: ["Workload Balance", "Recovery Time", "Organizational Support", "Stress Management"],
    ruleOfThumb: "Sustained overload becomes burnout; balance workload with recovery and support.",
    interpretations: {
      excellent:
        "Sustainable workloads with adequate recovery time. Organization actively supports well-being and employees rarely feel exhausted.",
      healthy:
        "Generally manageable workloads with reasonable support. Some employees may need better recovery or support in stressful periods.",
      atRisk:
        "Signs of stress and burnout risk. Review workloads, recovery opportunities, and employee well-being support programs.",
      critical:
        "High burnout risk requiring immediate intervention. Reduce workloads, increase support, and review pace of work expectations.",
    },
  },
  inclusionScore: {
    title: "Inclusion & Identity Safety",
    description:
      "Psychological safety for diverse identities, fair treatment, and equal opportunities regardless of background",
    keyDrivers: [
      "Identity Respect",
      "Equal Opportunity",
      "Psychological Safety",
      "Fair Decision-Making",
      "Diversity Thriving",
    ],
    ruleOfThumb: "Inclusion is how safe and fair work feels across groups; close opportunity gaps fast.",
    interpretations: {
      excellent:
        "Strong inclusive culture where all identities are respected. Diverse perspectives are valued and psychological safety is high across all groups.",
      healthy:
        "Generally inclusive environment with most employees feeling respected. Minor improvements in diversity representation or voice.",
      atRisk:
        "Concerns about inclusion and identity safety. Review fairness in opportunities, psychological safety for diverse groups, and decision-making processes.",
      critical:
        "Significant inclusion challenges affecting belonging for some employees. Urgent focus on fair practices, diversity initiatives, and creating psychological safety.",
    },
  },
}

export function getDomainInterpretation(domainKey: keyof typeof DOMAIN_INTERPRETATIONS, score: number): string {
  const interpretationLevel = score >= 80 ? "excellent" : score >= 60 ? "healthy" : score >= 40 ? "atRisk" : "critical"
  return DOMAIN_INTERPRETATIONS[domainKey].interpretations[
    interpretationLevel as keyof (typeof DOMAIN_INTERPRETATIONS)[keyof typeof DOMAIN_INTERPRETATIONS]["interpretations"]
  ]
}
