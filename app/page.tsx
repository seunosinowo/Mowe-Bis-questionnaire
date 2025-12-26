import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, ClipboardList, TrendingUp, BarChart3 } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">MoWE-BIS</div>
          <Link href="/admin/login">
            <Button variant="outline" size="sm">
              Admin Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white text-balance">
              Measure Your Organizational Wellness
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 text-balance">
              Assess your organization across 6 critical dimensions: Belonging Intelligence, Leadership Climate, Talent
              Flow, Culture Maturity, Well-being Stability, and Inclusion & Identity Safety.
            </p>
          </div>

          {/* CTA Button */}
          <Link href="/assessment">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Assessment
            </Button>
          </Link>
        </div>

        {/* Features Grid with Icons */}
        <div className="grid md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto mb-20">
          <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 flex flex-col items-start gap-4">
              <Lock className="w-8 h-8 text-blue-600" />
              <div>
                <CardTitle className="text-base mb-2">100% Anonymous</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">No personal data collected</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 flex flex-col items-start gap-4">
              <ClipboardList className="w-8 h-8 text-blue-600" />
              <div>
                <CardTitle className="text-base mb-2">60-80 Questions</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">Comprehensive assessment</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 flex flex-col items-start gap-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <CardTitle className="text-base mb-2">6 Key Domains</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">Multi-dimensional insights</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 flex flex-col items-start gap-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <div>
                <CardTitle className="text-base mb-2">Rich Analytics</CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">Visual data dashboard</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assessment Sections Showcase */}
        <div className="max-w-5xl mx-auto mb-20">
          <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl">Assessment Domains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Belonging Intelligence</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Measure sense of inclusion and connection
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Leadership Climate</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Assess organizational leadership effectiveness
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Talent Flow (AURA)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Track employee attraction, utilization, retention, advocacy
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Culture Maturity</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Evaluate organizational culture development
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Well-being Stability</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Assess employee wellness and burnout levels
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    6
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Inclusion & Identity Safety</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Measure psychological safety and belonging
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Updated Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Flexible Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Choose Standard (60 questions) or Enterprise (80 questions) based on your needs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Get actionable interpretations and see exactly where your organization stands
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Admin Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Track trends across departments, companies, and demographics with visual dashboards
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
