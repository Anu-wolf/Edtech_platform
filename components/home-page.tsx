'use client'

import Link from 'next/link'
import { BookOpen, BarChart3, Heart, Leaf, ChevronRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AIAvatar } from '@/components/ai-avatar'

export function HomePage() {
  const features = [
    {
      id: 1,
      title: 'Smart Assessments',
      description: 'Adaptive quizzes that adjust to your level and track your progress',
      icon: BookOpen,
      href: '/dashboard',
      color: 'from-secondary/10 to-secondary/5'
    },
    {
      id: 2,
      title: 'AI Performance Reports',
      description: 'Get personalized insights with visual analytics and actionable feedback',
      icon: BarChart3,
      href: '/report',
      color: 'from-accent/10 to-accent/5'
    },
    {
      id: 3,
      title: 'Stress-Aware Learning',
      description: 'Real-time stress detection that helps you stay balanced and focused',
      icon: Zap,
      href: '/dashboard',
      color: 'from-destructive/10 to-destructive/5'
    },
    {
      id: 4,
      title: 'Guided Relaxation',
      description: 'Mindfulness exercises designed specifically for students under pressure',
      icon: Leaf,
      href: '/stress-management',
      color: 'from-primary/10 to-primary/5'
    }
  ]

  return (
    <main className="flex-1 bg-background">
      {/* Hero Section */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-24 pb-8 sm:px-6 sm:pt-32 sm:pb-12 md:pt-40 md:pb-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl text-pretty">
              Learn Your Way
            </h1>
            <p className="mb-2 text-base text-secondary font-semibold uppercase tracking-wide">
              LEARNLY StudyLab
            </p>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl leading-relaxed">
              Take realistic assessments, get personalized feedback, and manage stress—all in one place designed with students in mind.
            </p>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="w-full gap-2 bg-secondary hover:bg-secondary/90 sm:w-auto">
                  <ChevronRight className="h-5 w-5" />
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/assessment">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Start Assessment
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Trusted by students worldwide</p>
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="font-bold text-foreground">10K+</p>
                  <p className="text-muted-foreground">Active Students</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">4.8/5</p>
                  <p className="text-muted-foreground">Average Rating</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">95%</p>
                  <p className="text-muted-foreground">Stress Reduction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Avatar */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <AIAvatar expression="happy" size="xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Overview Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A connected platform that brings together assessment, analytics, and wellness
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.id} href={feature.href}>
                <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer h-full group">
                  <CardHeader>
                    <div className={`mb-3 inline-flex rounded-lg bg-gradient-to-br ${feature.color} p-3`}>
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-secondary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* AI Mentor Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-2xl bg-gradient-to-r from-secondary/5 to-accent/5 border border-border p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="flex flex-col justify-center">
              <h3 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
                Your Personal AI Mentor
              </h3>
              <p className="mb-4 text-muted-foreground text-base leading-relaxed">
                You're not alone on this journey. Our AI mentor understands student stress and adapts to your learning pace.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                  <span className="text-foreground">Learn at your own pace without pressure</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                  <span className="text-foreground">Get real-time support when stress builds up</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                  <span className="text-foreground">Celebrate wins and learn from challenges</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="rounded-2xl bg-card border border-border p-6 text-center">
                <AIAvatar expression="calm" size="lg" />
                <p className="mt-4 italic text-foreground">
                  "Learn at your pace. I'll guide you."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 mb-8">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 sm:p-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to Stress Less and Study Smart?
          </h2>
          <p className="mb-6 text-primary-foreground/90 text-lg max-w-2xl mx-auto">
            Join thousands of students taking control of their learning and wellbeing
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <ChevronRight className="h-5 w-5" />
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
