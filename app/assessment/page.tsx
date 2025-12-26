"use client"

import { useState } from "react"
import PlanSelection from "@/components/questionnaire/plan-selection"
import PreForm from "@/components/questionnaire/pre-form"
import Questionnaire from "@/components/questionnaire/questionnaire"
import Results from "@/components/questionnaire/results"
import type { QuestionnaireData, PreFormData } from "@/types/questionnaire"
import { saveResponse } from "@/lib/analytics"

type Step = "pre-form" | "plan-selection" | "questionnaire" | "results"

export default function AssessmentPage() {
  const [step, setStep] = useState<Step>("pre-form")
  const [preFormData, setPreFormData] = useState<PreFormData | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "enterprise" | null>(null)
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null)

  const handlePreFormSubmit = (data: PreFormData) => {
    setPreFormData(data)
    setStep("plan-selection")
  }

  const handlePlanSelect = (plan: "standard" | "enterprise") => {
    setSelectedPlan(plan)
    setStep("questionnaire")
  }

  const handleQuestionnaireSubmit = (data: QuestionnaireData) => {
    setQuestionnaireData(data)
    if (preFormData) {
      void saveResponse(preFormData, data)
    }
    setStep("results")
  }

  const handleReset = () => {
    setStep("pre-form")
    setPreFormData(null)
    setSelectedPlan(null)
    setQuestionnaireData(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {step === "pre-form" && <PreForm onSubmit={handlePreFormSubmit} />}
        {step === "plan-selection" && <PlanSelection onSelect={handlePlanSelect} />}
        {step === "questionnaire" && selectedPlan && preFormData && (
          <Questionnaire plan={selectedPlan} onSubmit={handleQuestionnaireSubmit} preFormData={preFormData} />
        )}
        {step === "results" && questionnaireData && preFormData && selectedPlan && (
          <Results data={questionnaireData} preFormData={preFormData} plan={selectedPlan} onReset={handleReset} />
        )}
      </div>
    </main>
  )
}
