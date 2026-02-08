'use client'

import Link from 'next/link'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Award, TrendingUp, Lightbulb, BookOpen, Zap, Download, Share2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { AIAvatar, AIAvatarWithMessage } from '@/components/ai-avatar'

const SCORE_DATA = [
  { subject: 'Mathematics', score: 87, average: 75 },
  { subject: 'Physics', score: 82, average: 73 },
  { subject: 'Biology', score: 91, average: 76 },
  { subject: 'Chemistry', score: 78, average: 71 },
  { subject: 'English', score: 85, average: 74 },
]

const PROGRESS_DATA = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 72 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 81 },
  { month: 'May', score: 85 },
  { month: 'Jun', score: 87 },
]

const SKILLS_DATA = [
  { skill: 'Problem Solving', value: 85 },
  { skill: 'Analytical Thinking', value: 88 },
  { skill: 'Memory Retention', value: 76 },
  { skill: 'Time Management', value: 82 },
  { skill: 'Concept Application', value: 90 },
  { skill: 'Communication', value: 79 },
]

const TOPIC_MASTERY = [
  { name: 'Calculus', value: 32, fill: '#3b82f6' },
  { name: 'Algebra', value: 28, fill: '#8b5cf6' },
  { name: 'Geometry', value: 25, fill: '#06b6d4' },
  { name: 'Statistics', value: 15, fill: '#f59e0b' },
]

export function ReportPage() {
  return (
    <main className="flex-1 pb-12 pt-24 bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-pretty">Assessment Report</h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-muted-foreground">Mathematics Assessment • June 2, 2024 • 45 minutes</p>
        </div>

        {/* Overall Score */}
        <div className="mb-6 sm:mb-8 grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Overall Score', value: '87%', icon: Award, color: 'text-secondary' },
            { label: 'Percentile Rank', value: '94th', icon: TrendingUp, color: 'text-accent' },
            { label: 'Questions Correct', value: '13/15', icon: Zap, color: 'text-primary' },
            { label: 'Time Efficiency', value: '92%', icon: BookOpen, color: 'text-secondary' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="border-border bg-card rounded-lg">
                <CardContent className="p-4 sm:pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{stat.label}</p>
                      <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`rounded-lg bg-secondary/10 p-2 sm:p-3 flex-shrink-0 ${stat.color}`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="mb-6 sm:mb-8 grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Subject Performance */}
          <Card className="border-border bg-card rounded-lg overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Performance by Subject</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Your score vs class average</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={SCORE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend />
                  <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="average" fill="hsl(var(--muted))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Progress Over Time */}
          <Card className="border-border bg-card rounded-lg overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Your Progress</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Score improvement over 6 months</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={PROGRESS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Skills Assessment */}
          <Card className="border-border bg-card rounded-lg overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Skill Analysis</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Your competency across key skills</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={SKILLS_DATA}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
                  <PolarRadiusAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <Radar
                    name="Your Score"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Topic Mastery */}
          <Card className="border-border bg-card rounded-lg overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Topic Mastery Distribution</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Questions by topic area</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-4 sm:p-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={TOPIC_MASTERY}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {TOPIC_MASTERY.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Feedback Section */}
        <Card className="border-border bg-card mb-6 sm:mb-8 rounded-lg overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
              <div className="rounded-full bg-secondary/10 p-2 sm:p-3 flex-shrink-0">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg sm:text-xl">AI-Generated Insights</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Personalized recommendations from your tutor</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4">
                <h4 className="mb-2 text-sm sm:text-base font-semibold text-foreground">Strengths</h4>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    <span>Exceptional understanding of calculus concepts with 94% accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    <span>Strong analytical thinking demonstrated in complex problem-solving</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    <span>Excellent time management with 92% efficiency score</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 sm:p-4">
                <h4 className="mb-2 text-sm sm:text-base font-semibold text-foreground">Areas for Improvement</h4>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-destructive flex-shrink-0" />
                    <span>Geometry applications need more focus—practice recommended</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-destructive flex-shrink-0" />
                    <span>Statistical reasoning scored 15% below your average</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-accent/20 bg-accent/5 p-3 sm:p-4">
                <h4 className="mb-2 text-sm sm:text-base font-semibold text-foreground">Next Steps</h4>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <span>Start focused practice on statistics with adaptive problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <span>Review geometry fundamentals with interactive visualizations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <span>Take the recommended follow-up assessment in 3 days</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* AI Tutor Section */}
            <div className="rounded-lg border border-border bg-gradient-to-r from-secondary/5 to-accent/5 p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row">
                <div className="flex-shrink-0">
                  <AIAvatar expression="calm" size="sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">Talk to Your Tutor</h4>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                    Get clarifications on difficult concepts or discuss your learning strategy
                  </p>
                  <Link href="/stress-management">
                    <Button className="mt-2 sm:mt-3 gap-2 bg-secondary hover:bg-secondary/90 text-xs sm:text-sm" size="sm">
                      <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                      Open Chat
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row">
          <Button variant="outline" size="lg" className="gap-2 bg-transparent text-sm sm:text-base w-full sm:w-auto">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download Report</span>
            <span className="sm:hidden">Download</span>
          </Button>
          <Button variant="outline" size="lg" className="gap-2 bg-transparent text-sm sm:text-base w-full sm:w-auto">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share with Teachers</span>
            <span className="sm:hidden">Share</span>
          </Button>
          <Link href="/assessment" className="w-full sm:ml-auto sm:w-auto">
            <Button size="lg" className="w-full gap-2 bg-secondary hover:bg-secondary/90 text-sm sm:text-base sm:w-auto">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Start Next Assessment</span>
              <span className="sm:hidden">Next Assessment</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
