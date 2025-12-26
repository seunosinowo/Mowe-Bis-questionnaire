import { prisma } from "@/lib/prisma"
import type { AnalyticsRecord } from "@/lib/analytics"
import { NextResponse } from "next/server"

type AnalyticsResponseRow = Awaited<ReturnType<typeof prisma.analyticsResponse.findMany>>[number]

export async function GET() {
  try {
    const rows = await prisma.analyticsResponse.findMany({
      orderBy: { submittedAt: "desc" },
    })

    const responses: AnalyticsRecord[] = rows.map((row: AnalyticsResponseRow) => ({
      companyName: row.companyName,
      departmentName: row.departmentName,
      gender: row.gender,
      plan: row.plan,
      scores: {
        belongingScore: row.belongingScore,
        leadershipScore: row.leadershipScore,
        talentFlowScore: row.talentFlowScore,
        cultureScore: row.cultureScore,
        overallScore: row.overallScore,
        wellBeingScore: row.wellBeingScore ?? undefined,
        inclusionScore: row.inclusionScore ?? undefined,
      },
      timestamp: row.submittedAt.toISOString(),
    }))

    return NextResponse.json({ responses })
  } catch {
    return NextResponse.json({ responses: [] satisfies AnalyticsRecord[] }, { status: 200 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const preFormData = body?.preFormData
    const questionnaireData = body?.questionnaireData

    if (
      !preFormData ||
      typeof preFormData.companyName !== "string" ||
      typeof preFormData.departmentName !== "string" ||
      typeof preFormData.gender !== "string"
    ) {
      return NextResponse.json({ error: "Invalid preFormData" }, { status: 400 })
    }

    if (
      !questionnaireData ||
      (questionnaireData.plan !== "standard" && questionnaireData.plan !== "enterprise") ||
      typeof questionnaireData.timestamp !== "string" ||
      typeof questionnaireData.answers !== "object" ||
      questionnaireData.answers === null ||
      typeof questionnaireData.scores !== "object" ||
      questionnaireData.scores === null
    ) {
      return NextResponse.json({ error: "Invalid questionnaireData" }, { status: 400 })
    }

    const scores = questionnaireData.scores
    const requiredScoreKeys = ["belongingScore", "leadershipScore", "talentFlowScore", "cultureScore", "overallScore"] as const
    for (const key of requiredScoreKeys) {
      if (typeof scores[key] !== "number") {
        return NextResponse.json({ error: `Invalid score: ${key}` }, { status: 400 })
      }
    }

    const submittedAt = new Date(questionnaireData.timestamp)
    if (Number.isNaN(submittedAt.getTime())) {
      return NextResponse.json({ error: "Invalid timestamp" }, { status: 400 })
    }

    const created = await prisma.analyticsResponse.create({
      data: {
        companyName: preFormData.companyName,
        departmentName: preFormData.departmentName,
        gender: preFormData.gender,
        plan: questionnaireData.plan,
        answers: questionnaireData.answers,
        belongingScore: scores.belongingScore,
        leadershipScore: scores.leadershipScore,
        talentFlowScore: scores.talentFlowScore,
        cultureScore: scores.cultureScore,
        overallScore: scores.overallScore,
        wellBeingScore: typeof scores.wellBeingScore === "number" ? scores.wellBeingScore : null,
        inclusionScore: typeof scores.inclusionScore === "number" ? scores.inclusionScore : null,
        submittedAt,
      },
      select: { id: true },
    })

    return NextResponse.json({ id: created.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to save response" }, { status: 500 })
  }
}
