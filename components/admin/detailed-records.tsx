"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { getAnalyticsData, type AnalyticsRecord } from "@/lib/analytics"
import { Search } from "lucide-react"

export default function DetailedRecords() {
  const [data, setData] = useState<{ responses: AnalyticsRecord[] }>({ responses: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    let cancelled = false
    getAnalyticsData()
      .then((result) => {
        if (!cancelled) {
          setData(result)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData({ responses: [] })
          setIsLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  const filteredResponses = useMemo(() => {
    return data.responses.filter((response) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        response.companyName.toLowerCase().includes(searchLower) ||
        response.departmentName.toLowerCase().includes(searchLower) ||
        response.gender.toLowerCase().includes(searchLower)
      )
    })
  }, [data.responses, searchTerm])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-100 text-emerald-700 border-emerald-300"
    if (score >= 60) return "bg-blue-100 text-blue-700 border-blue-300"
    if (score >= 40) return "bg-amber-100 text-amber-700 border-amber-300"
    return "bg-red-100 text-red-700 border-red-300"
  }

  if (isLoading) {
    return <div className="flex items-center justify-center py-12 text-gray-600">Loading records...</div>
  }

  return (
    <Card className="border-gray-200 bg-white">
      <CardHeader>
        <div className="space-y-4">
          <div>
            <CardTitle className="text-gray-900">Assessment Records</CardTitle>
            <CardDescription>Complete list of all {data.responses.length} submissions</CardDescription>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by company, department, or gender..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 hover:bg-gray-50">
                <TableHead className="text-gray-900">Company</TableHead>
                <TableHead className="text-gray-900">Department</TableHead>
                <TableHead className="text-gray-900">Gender</TableHead>
                <TableHead className="text-gray-900">Plan</TableHead>
                <TableHead className="text-gray-900">Overall</TableHead>
                <TableHead className="text-gray-900">Belonging</TableHead>
                <TableHead className="text-gray-900">Leadership</TableHead>
                <TableHead className="text-gray-900">Talent</TableHead>
                <TableHead className="text-gray-900">Culture</TableHead>
                <TableHead className="text-gray-900">Well-being</TableHead>
                <TableHead className="text-gray-900">Inclusion</TableHead>
                <TableHead className="text-gray-900">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResponses.map((response, idx) => (
                <TableRow key={idx} className="border-gray-200 hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">{response.companyName}</TableCell>
                  <TableCell className="text-gray-700">{response.departmentName}</TableCell>
                  <TableCell className="text-gray-700">{response.gender}</TableCell>
                  <TableCell>
                    <Badge
                      variant={response.plan === "enterprise" ? "default" : "secondary"}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {response.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`border ${getScoreColor(response.scores.overallScore)}`}>
                      {Math.round(response.scores.overallScore)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{Math.round(response.scores.belongingScore)}</TableCell>
                  <TableCell className="text-gray-700">{Math.round(response.scores.leadershipScore)}</TableCell>
                  <TableCell className="text-gray-700">{Math.round(response.scores.talentFlowScore)}</TableCell>
                  <TableCell className="text-gray-700">{Math.round(response.scores.cultureScore)}</TableCell>
                  <TableCell className="text-gray-700">
                    {response.plan === "enterprise" ? Math.round(response.scores.wellBeingScore ?? 0) : "—"}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {response.plan === "enterprise" ? Math.round(response.scores.inclusionScore ?? 0) : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(response.timestamp).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredResponses.length === 0 && (
            <div className="text-center py-8 text-gray-600">
              No records found matching &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
