"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface PlanSelectionProps {
  onSelect: (plan: "standard" | "enterprise") => void
}

export default function PlanSelection({ onSelect }: PlanSelectionProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Choose Your Assessment Plan</h1>
          <p className="text-gray-600">Select the plan that fits your needs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Standard Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle>Standard</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">Free</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>60-item assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>5 belonging drivers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>4 leadership climates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>AURA talent flow analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Culture maturity index</span>
                </li>
              </ul>
              <Button onClick={() => onSelect("standard")} className="w-full" variant="default">
                Start Standard Assessment
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
            <Badge className="absolute top-4 right-4 bg-blue-600">Most Popular</Badge>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>Advanced insights & analytics</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">Premium</span>
                <p className="text-sm text-gray-600 mt-2">Requires payment</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>80-item assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>6 belonging drivers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>5 leadership climates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Well-being & burnout analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Inclusion & identity safety</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Advanced heatmaps & correlations</span>
                </li>
              </ul>
              <Button onClick={() => onSelect("enterprise")} className="w-full bg-blue-600 hover:bg-blue-700">
                Start Enterprise Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
