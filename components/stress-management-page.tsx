"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Music, Wind, Palette, Sprout, CloudRain, Star, Flame, Sparkles } from "lucide-react"

export function StressManagementPage() {
  const mindfulnessExercises = [
    {
      id: 1,
      title: 'Deep Breathing',
      icon: <Wind className="h-5 w-5 text-blue-500" />,
      href: '/dashboard/mental', // Direct to Relaxation Hub for now as it has breathing
      desc: "5-minute guided breathing session."
    },
    {
      id: 2,
      title: 'Guided Meditation',
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      href: '/dashboard/mental', // Placeholder until specific page exists
      desc: "Audio-guided mental reset."
    },
    {
      id: 3,
      title: 'Muscle Relaxation',
      icon: <Music className="h-5 w-5 text-orange-500" />,
      href: '/dashboard/mental',
      desc: "Release tension from your body."
    },
    {
      id: 4,
      title: 'Calm Focus',
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      href: '/dashboard/focus',
      desc: "Boost concentration with binaural beats."
    },
  ]

  const games = [
    {
      id: 'coloring',
      title: 'Mindful Coloring',
      icon: <Palette className="h-6 w-6 text-pink-500" />,
      href: '/dashboard/games/coloring',
      desc: "Express creativity with digital painting.",
      color: "bg-pink-500/10"
    },
    {
      id: 'zen',
      title: 'Zen Sand Garden',
      icon: <Sprout className="h-6 w-6 text-green-500" />,
      href: '/dashboard/games/zen-garden',
      desc: "Rake sand and place stones for peace.",
      color: "bg-green-500/10"
    },
    {
      id: 'bubble',
      title: 'Bubble Pop',
      icon: <CloudRain className="h-6 w-6 text-blue-400" />,
      href: '/dashboard/games/bubble-pop',
      desc: "Simple, satisfying bubble popping.",
      color: "bg-blue-400/10"
    },
    {
      id: 'lanterns',
      title: 'Lantern Release',
      icon: <Flame className="h-6 w-6 text-amber-500" />,
      href: '/dashboard/games/lanterns',
      desc: "Write worries and let them float away.",
      color: "bg-amber-500/10"
    }
  ]

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-12 animate-in fade-in duration-500 max-w-7xl">

      {/* Header Section */}
      <div className="flex flex-col gap-4 text-center md:text-left">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Mental Wellness Hub
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 leading-relaxed">
          Your personal sanctuary for stress relief, focus, and emotional balance. Take a moment for yourself.
        </p>
      </div>

      {/* Main Feature Cards */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Relaxation Hub */}
        <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary/50 group">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Wind className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Relaxation Hub</CardTitle>
            </div>
            <CardDescription className="text-base">
              Instant calm with breathing exercises and visual meditations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/mental" className="w-full">
              <Button className="w-full h-11 text-base shadow-md hover:shadow-lg transition-all" variant="default">
                Start Session
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* AI Companion */}
        <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500/50 group">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-purple-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">AI Companion</CardTitle>
            </div>
            <CardDescription className="text-base">
              Vent, reflect, and get emotional support from your AI friend.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/companion" className="w-full">
              <Button variant="outline" className="w-full h-11 text-base border-purple-200 hover:bg-purple-50 hover:text-purple-600 dark:border-purple-800 dark:hover:bg-purple-900/20 transition-all">
                Chat Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Focus Mode */}
        <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500/50 group">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-orange-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Music className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Focus Mode</CardTitle>
            </div>
            <CardDescription className="text-base">
              Deep work timer with ambient soundscapes to boost productivity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/focus" className="w-full">
              <Button variant="secondary" className="w-full h-11 text-base hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-all">
                Enter Focus
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Relaxing Mini-Games */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Relaxing Games</h2>
          {/* <span className="text-sm text-muted-foreground hidden md:block">Interactive visuals to soothe your mind</span> */}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game) => (
            <Link key={game.id} href={game.href}>
              <div className="relative overflow-hidden rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 group cursor-pointer h-full border-t-4 border-t-transparent hover:border-t-primary/50">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${game.color}`} />
                <div className="p-6 flex flex-col gap-4 h-full">
                  <div className={`w-14 h-14 rounded-2xl ${game.color} flex items-center justify-center group-hover:rotate-6 transition-transform duration-300`}>
                    {game.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{game.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{game.desc}</p>
                  </div>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    Play Now <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Exercises */}
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Quick Exercises</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mindfulnessExercises.map((ex) => (
            <Link key={ex.id} href={ex.href}>
              <div className="group flex flex-col gap-3 p-5 rounded-xl border bg-card hover:bg-accent/30 transition-all cursor-pointer h-full hover:border-primary/30">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-background rounded-lg border shadow-sm group-hover:scale-105 transition-transform">
                    {ex.icon}
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-medium text-base">{ex.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5">{ex.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quote Section */}
      <div className="mt-12 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-900/10 rounded-3xl p-8 md:p-12 text-center border border-indigo-100 dark:border-indigo-900/30 shadow-sm">
        <blockquote className="text-xl md:text-2xl font-medium italic text-indigo-900 dark:text-indigo-200 max-w-3xl mx-auto leading-relaxed">
          "Quiet the mind, and the soul will speak."
        </blockquote>
        <p className="mt-6 text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">— Ma Jaya Sati Bhagavati</p>
      </div>

    </div>
  )
}
