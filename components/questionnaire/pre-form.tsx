"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PreFormData } from "@/types/questionnaire"

interface PreFormProps {
  onSubmit: (data: PreFormData) => void
}

export default function PreForm({ onSubmit }: PreFormProps) {
  const [companyName, setCompanyName] = useState("")
  const [departmentName, setDepartmentName] = useState("")
  const [gender, setGender] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!companyName.trim()) newErrors.companyName = "Company name is required"
    if (!departmentName.trim()) newErrors.departmentName = "Department name is required"
    if (!gender) newErrors.gender = "Gender is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({ companyName, departmentName, gender })
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">MoWE-BIS Assessment</CardTitle>
          <CardDescription>Let&apos;s gather some information before we begin</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1">
                Company Name
              </label>
              <Input
                id="company"
                placeholder="Enter your company name"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value)
                  if (errors.companyName) setErrors({ ...errors, companyName: "" })
                }}
                className={errors.companyName ? "border-red-500" : ""}
              />
              {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium mb-1">
                Department Name
              </label>
              <Input
                id="department"
                placeholder="e.g., Human Resources, Engineering, Sales"
                value={departmentName}
                onChange={(e) => {
                  setDepartmentName(e.target.value)
                  if (errors.departmentName) setErrors({ ...errors, departmentName: "" })
                }}
                className={errors.departmentName ? "border-red-500" : ""}
              />
              {errors.departmentName && <p className="text-red-500 text-xs mt-1">{errors.departmentName}</p>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium mb-1">
                Gender
              </label>
              <Select
                value={gender}
                onValueChange={(value) => {
                  setGender(value)
                  if (errors.gender) setErrors({ ...errors, gender: "" })
                }}
              >
                <SelectTrigger id="gender" className={errors.gender ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>

            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
