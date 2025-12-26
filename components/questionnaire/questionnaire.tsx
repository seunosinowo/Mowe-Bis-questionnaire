"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { QuestionnaireData, PreFormData } from "@/types/questionnaire"
import { STANDARD_QUESTIONS, ENTERPRISE_QUESTIONS, SECTION_HEADERS } from "@/lib/questions"
import { calculateScores } from "@/lib/scoring"

interface QuestionnaireProps {
  plan: "standard" | "enterprise"
  onSubmit: (data: QuestionnaireData) => void
  preFormData: PreFormData
}

interface CategoryGroup {
  driver: string
  questions: typeof STANDARD_QUESTIONS
}

export default function Questionnaire({ plan, onSubmit, preFormData }: QuestionnaireProps) {
  const questions = plan === "standard" ? STANDARD_QUESTIONS : ENTERPRISE_QUESTIONS
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(false)

  const groupedBySection = questions.reduce(
    (acc, q) => {
      const section = q.section
      if (!acc[section]) {
        acc[section] = {}
      }
      const driver = q.driver || "Other"
      if (!acc[section][driver]) {
        acc[section][driver] = []
      }
      acc[section][driver].push(q)
      return acc
    },
    {} as Record<string, Record<string, typeof STANDARD_QUESTIONS>>,
  )

  // Create flat list of categories
  const categories: CategoryGroup[] = []
  Object.entries(groupedBySection).forEach(([section, drivers]) => {
    Object.entries(drivers).forEach(([driver, qs]) => {
      categories.push({ driver, questions: qs })
    })
  })

  const currentCategory = categories[currentCategoryIndex]
  const totalCategories = categories.length
  const progress = ((currentCategoryIndex + 1) / totalCategories) * 100

  const sectionHeader = SECTION_HEADERS[currentCategory.questions[0].section as keyof typeof SECTION_HEADERS]

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: Number.parseInt(value),
    })
  }

  const allCategoryAnswered = currentCategory.questions.every((q) => answers[q.id] !== undefined)

  const handleNext = () => {
    if (!allCategoryAnswered) return

    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)
    const scores = calculateScores(answers, plan)
    onSubmit({
      plan,
      answers,
      scores,
      timestamp: new Date().toISOString(),
    })
  }

  const isLastCategory = currentCategoryIndex === categories.length - 1

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardContent className="pt-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">
                Category {currentCategoryIndex + 1} of {totalCategories}
              </h2>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Section & Category Header */}
          <div className="mb-8 pb-4 border-b">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-600 text-white text-xs font-medium">{sectionHeader?.title}</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-2">{currentCategory.driver}</h3>
            <p className="text-sm text-gray-600">{sectionHeader?.description}</p>
          </div>

          {/* Questions in Category */}
          <div className="space-y-8 mb-8">
            {currentCategory.questions.map((question, idx) => (
              <div key={question.id} className="border-l-4 border-blue-200 pl-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex items-center justify-center min-w-[32px] h-8 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {idx + 1}
                  </div>
                  <h4 className="text-lg font-medium pt-1">{question.text}</h4>
                </div>

                {/* Answer Options */}
                <RadioGroup
                  value={answers[question.id]?.toString() || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  <div className="space-y-2 ml-11">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div
                        key={value}
                        className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                      >
                        <RadioGroupItem value={value.toString()} id={`${question.id}-${value}`} />
                        <Label htmlFor={`${question.id}-${value}`} className="cursor-pointer flex-1">
                          <div className="text-sm font-medium">
                            {value === 1 && "Strongly Disagree"}
                            {value === 2 && "Disagree"}
                            {value === 3 && "Neither Agree nor Disagree"}
                            {value === 4 && "Agree"}
                            {value === 5 && "Strongly Agree"}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handlePrev} variant="outline" disabled={currentCategoryIndex === 0}>
              Previous Category
            </Button>
            <Button onClick={handleNext} disabled={!allCategoryAnswered || isLoading} className="flex-1">
              {isLastCategory ? "Complete Assessment" : "Next Category"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
