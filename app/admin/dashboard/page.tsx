"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, BarChart3, Users, TrendingUp, Activity, BookOpen } from "lucide-react"
import AnalyticsOverview from "@/components/admin/analytics-overview"
import CompanyAnalytics from "@/components/admin/company-analytics"
import DepartmentAnalytics from "@/components/admin/department-analytics"
import GenderAnalytics from "@/components/admin/gender-analytics"
import DetailedRecords from "@/components/admin/detailed-records"
import InterpretationAnalysis from "@/components/admin/interpretation-analysis"

export default function AdminDashboard() {
  const router = useRouter()
  const [token] = useState(() => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("adminToken")
  })

  useEffect(() => {
    if (!token) {
      router.push("/admin/login")
    }
  }, [router, token])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin/login")
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-2 border-blue-500 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-700 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MoWE-BIS Analytics</h1>
              <p className="text-sm text-gray-600">Organizational Intelligence Platform</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 border-gray-300 hover:bg-gray-100 text-gray-900 bg-white"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <div className="flex overflow-x-auto">
            <TabsList className="grid w-full max-w-3xl grid-cols-6 gap-2 bg-gray-100 border border-gray-200 p-1 rounded-lg">
              <TabsTrigger
                value="overview"
                className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="company"
                className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Company</span>
              </TabsTrigger>
              <TabsTrigger
                value="department"
                className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700"
              >
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Dept</span>
              </TabsTrigger>
              <TabsTrigger
                value="gender"
                className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Gender</span>
              </TabsTrigger>
              <TabsTrigger
                value="records"
                className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Records</span>
              </TabsTrigger>
              <TabsTrigger
                value="interpretations"
                className="gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Analysis</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-8">
            <AnalyticsOverview />
          </TabsContent>

          <TabsContent value="company" className="space-y-8">
            <CompanyAnalytics />
          </TabsContent>

          <TabsContent value="department" className="space-y-8">
            <DepartmentAnalytics />
          </TabsContent>

          <TabsContent value="gender" className="space-y-8">
            <GenderAnalytics />
          </TabsContent>

          <TabsContent value="records" className="space-y-8">
            <DetailedRecords />
          </TabsContent>

          <TabsContent value="interpretations" className="space-y-8">
            <InterpretationAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
