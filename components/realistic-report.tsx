'use client'

import { useMemo, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import {
  Award,
  TrendingUp,
  Lightbulb,
  Zap,
  Download,
  Share2,
  Heart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AIAvatar } from '@/components/ai-avatar'

interface ReportProps {
  score?: number
  accuracy?: number
  timeTaken?: number
  stressLevel?: 'low' | 'moderate' | 'high'
}

export function RealisticReport({
  score = 78,
  accuracy = 85,
  timeTaken = 1520,
  stressLevel = 'moderate',
}: ReportProps) {
  const [date, setDate] = useState("")

  useEffect(() => {
    setDate(new Date().toLocaleDateString())
  }, [])

  // Performance Data
  const performanceData = useMemo(() => {
    return [
      { topic: 'Problem Solving', score: score - 5, average: 72 },
      { topic: 'Concept Understanding', score: Math.min(score + 3, 100), average: 75 },
      { topic: 'Application', score: score - 8, average: 70 },
      { topic: 'Analysis', score: score - 2, average: 73 },
      { topic: 'Communication', score: score + 5, average: 74 },
    ]
  }, [score])

  const progressData = [
    { month: 'Apr', score: Math.max(score - 20, 45) },
    { month: 'May', score: Math.max(score - 15, 50) },
    { month: 'Jun', score: Math.max(score - 10, 55) },
    { month: 'Jul', score: Math.max(score - 5, 60) },
    { month: 'Aug', score: Math.max(score - 2, 65) },
    { month: 'Today', score: score },
  ]

  const skillsData = [
    { skill: 'Problem Solving', value: score - 5 },
    { skill: 'Memory Retention', value: score - 3 },
    { skill: 'Time Mgmt', value: accuracy },
    { skill: 'Focus', value: score + 2 },
    { skill: 'Comprehension', value: score + 4 },
    { skill: 'Critical Thinking', value: score - 1 },
  ]

  const topicData = [
    { name: 'Strong Areas', value: 35, fill: '#3b82f6' },
    { name: 'Developing Areas', value: 45, fill: '#f59e0b' },
    { name: 'Focus Areas', value: 20, fill: '#ef4444' },
  ]

  // Encouragement
  const encouragement = {
    title: 'Great Effort!',
    message:
      'You made solid progress and showed understanding of key concepts. Every attempt helps you grow.',
  }

  // Download Report
  const handleDownload = () => {
    const reportText = `
Assessment Report
Date: ${date}
Score: ${score}%
Accuracy: ${accuracy}%
Time Taken: ${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s
Stress Level: ${stressLevel}

Keep learning and improving!
    `

    const blob = new Blob([reportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'assessment-report.txt'
    a.click()

    URL.revokeObjectURL(url)
  }

  // Share Report
  const handleShare = () => {
    const message = `My assessment score: ${score}% with ${accuracy}% accuracy.`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <main className="flex-1 pb-12 pt-24 bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Encouraging Message */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex gap-4">
              <AIAvatar expression="calm" size="md" />
              <div>
                <CardTitle>{encouragement.title}</CardTitle>
                <CardDescription>
                  {encouragement.message}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Your Assessment Report
          </h1>
          <p className="text-muted-foreground">
            Detailed analysis • {date} • Stress Level:{' '}
            <span className="capitalize font-semibold">
              {stressLevel}
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>

          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share with Teacher
          </Button>

          <Link href="/assessment">
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              New Assessment
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
