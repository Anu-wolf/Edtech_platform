'use client'

import Link from 'next/link'
import { ChevronRight, BookOpen, Zap, Target, Calendar, Award, ArrowUpRight, Heart, BarChart3, Leaf } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AIAvatar, AIAvatarWithMessage } from '@/components/ai-avatar'

export function Dashboard() {
  return (
    <main className="flex-1 space-y-6 bg-background pb-12 pt-24 sm:space-y-8">
      {/* Welcome Header */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl sm:text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Your learning hub. Everything you need in one place.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4 mb-8">
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Assessments Taken</p>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">5</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Average Score</p>
              <p className="text-2xl sm:text-3xl font-bold text-secondary">78%</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Wellness Streak</p>
              <p className="text-2xl sm:text-3xl font-bold text-accent">8 days</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Current Mood</p>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">Calm</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Navigation Cards */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <h2 className="mb-4 text-xl sm:text-2xl font-bold text-foreground">What would you like to do?</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Assessment Card */}
          <Link href="/assessment">
            <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer h-full group">
              <CardHeader>
                <div className="mb-3 inline-flex rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 p-3">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="group-hover:text-secondary transition-colors">
                  Start / Resume Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Take a realistic assessment to measure your understanding and get instant feedback
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          {/* Report Card */}
          <Link href="/report">
            <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer h-full group">
              <CardHeader>
                <div className="mb-3 inline-flex rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 p-3">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="group-hover:text-accent transition-colors">
                  View Performance Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  See detailed analytics, progress charts, and AI-generated insights
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          {/* Stress Management Card */}
          <Link href="/stress-management">
            <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer h-full group">
              <CardHeader>
                <div className="mb-3 inline-flex rounded-lg bg-gradient-to-br from-destructive/10 to-destructive/5 p-3">
                  <Heart className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle className="group-hover:text-destructive transition-colors">
                  Manage Stress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Take a mindfulness break with guided exercises designed for students
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Daily Wellness Tip Card */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Card className="border-border bg-gradient-to-r from-card to-card/50">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-secondary" />
                  Daily Wellness Tip
                </CardTitle>
                <CardDescription>For a better study session</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              Take a 5-minute break every hour. Step away from your desk, stretch, or do some deep breathing. Your brain will thank you, and you'll actually learn faster!
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Motivation Section */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-border p-4 sm:p-8 md:p-12 md:rounded-2xl">
          <div className="grid gap-6 md:grid-cols-2 md:items-center sm:gap-8">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <h2 className="mb-2 text-2xl font-bold text-pretty text-foreground sm:mb-3 sm:text-3xl md:text-4xl">
                You're Doing Amazing
              </h2>
              <p className="mb-4 text-sm text-muted-foreground sm:mb-6 sm:text-base lg:text-lg">
                Keep up with your assessments, take care of your mental health, and remember—learning is a marathon, not a sprint. You've got this.
              </p>
            </div>

            {/* Right Avatar */}
            <div className="flex justify-center">
              <AIAvatar expression="happy" size="xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <h3 className="mb-3 text-xl sm:text-2xl font-bold text-foreground">Your Progress</h3>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Assessments Completed', value: '12', icon: Target, trend: '+2 this week' },
            { label: 'Accuracy Rate', value: '87%', icon: Award, trend: '+5% improvement' },
            { label: 'Learning Streak', value: '8 days', icon: Calendar, trend: 'Keep it up!' },
            { label: 'Skills Mastered', value: '23', icon: Zap, trend: '+3 new skills' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <Card key={i} className="border-border bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{stat.label}</p>
                      <p className="mt-2 text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{stat.trend}</p>
                    </div>
                    <div className="rounded-lg bg-secondary/10 p-2 sm:p-3 flex-shrink-0">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Assessment Modules */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 items-start justify-between mb-4 sm:flex-row sm:items-center">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">Available Assessments</h3>
          <Button variant="ghost" className="gap-1 text-secondary hover:text-secondary text-sm sm:text-base">
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              subject: 'Mathematics',
              title: 'Calculus Fundamentals',
              difficulty: 'Advanced',
              questions: 15,
              time: '45 min',
              progress: 60,
              color: 'from-blue-500/20 to-blue-600/20',
              badge: 'chart-1',
            },
            {
              subject: 'Physics',
              title: 'Quantum Mechanics',
              difficulty: 'Expert',
              questions: 20,
              time: '60 min',
              progress: 35,
              color: 'from-purple-500/20 to-purple-600/20',
              badge: 'chart-2',
            },
            {
              subject: 'Biology',
              title: 'Cell Biology & Genetics',
              difficulty: 'Intermediate',
              questions: 12,
              time: '35 min',
              progress: 80,
              color: 'from-green-500/20 to-green-600/20',
              badge: 'chart-3',
            },
          ].map((assessment, i) => (
            <Card key={i} className="border-border bg-card overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
              <div className={`h-1 w-full bg-gradient-to-r ${assessment.color}`} />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">{assessment.subject}</p>
                    <h4 className="text-lg font-bold text-foreground">{assessment.title}</h4>
                  </div>
                  <Badge variant="secondary">{assessment.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-foreground">{assessment.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
                      style={{ width: `${assessment.progress}%` }}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <BookOpen className="h-3 w-3" />
                    <span>{assessment.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{assessment.time}</span>
                  </div>
                </div>

                {/* Action */}
                <Link href="/assessment" className="w-full">
                  <Button className="w-full gap-2 bg-secondary hover:bg-secondary/90 text-primary-foreground group-hover:shadow-lg transition-all">
                    <span>{assessment.progress === 100 ? 'Review' : 'Continue'}</span>
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Companion Section */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <Card className="border-border bg-gradient-to-br from-card to-card/50 overflow-hidden">
          <div className="grid gap-6 md:grid-cols-2 md:items-center p-4 sm:p-8 md:p-12 sm:gap-8">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <h3 className="mb-2 text-xl sm:text-2xl font-bold text-foreground">Meet Your AI Tutor</h3>
              <p className="mb-4 text-sm sm:text-base text-muted-foreground">
                Your personalized AI companion analyzes your learning patterns and provides real-time feedback to accelerate your growth.
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {[
                  'Adaptive learning paths tailored to your pace',
                  'Real-time explanations for complex concepts',
                  '24/7 availability for instant support',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    <span className="text-sm sm:text-base text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/report" className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-2 bg-secondary hover:bg-secondary/90 sm:w-auto">
                  <Zap className="h-4 w-4" />
                  Ask Your Tutor
                </Button>
              </Link>
            </div>

            {/* Right Avatar */}
            <div className="flex justify-center">
              <AIAvatar expression="calm" size="xl" />
            </div>
          </div>
        </Card>
      </section>

      {/* Stress Management & Wellness */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="rounded-lg sm:rounded-2xl bg-gradient-to-r from-destructive/5 to-accent/5 border border-border p-4 sm:p-8 md:p-12">
          <div className="grid gap-4 md:grid-cols-2 md:items-center sm:gap-8">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
                <h3 className="text-sm sm:text-base font-semibold text-destructive">Wellness Focus</h3>
              </div>
              <h2 className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-pretty">
                Manage Your Stress & Build Resilience
              </h2>
              <p className="mb-4 text-xs sm:text-sm md:text-base text-muted-foreground">
                Access mindfulness exercises, coping strategies, and wellness tips to maintain peak mental health throughout your learning journey.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Link href="/stress-management" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full gap-2 bg-destructive hover:bg-destructive/90 sm:w-auto text-xs sm:text-base">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                    Explore Wellness
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Stats */}
            <div className="grid gap-2 sm:gap-3 grid-cols-2">
              <Card className="border-border bg-card/50 rounded">
                <CardContent className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Stress Level</p>
                  <p className="mt-1 text-lg sm:text-2xl font-bold text-foreground">35%</p>
                  <p className="text-xs text-muted-foreground">Normal Range</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/50 rounded">
                <CardContent className="p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Exercises Done</p>
                  <p className="mt-1 text-lg sm:text-2xl font-bold text-foreground">5</p>
                  <p className="text-xs text-muted-foreground">This Week</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
