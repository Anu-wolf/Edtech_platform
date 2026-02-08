'use client'

import React from "react"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FocusModeProps {
  children: React.ReactNode
  title: string
  duration: number
  onClose?: () => void
}

export function FocusMode({ children, title, duration, onClose }: FocusModeProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [isActive, setIsActive] = useState(true)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft <= 0 && isActive) {
        setCompleted(true)
        setIsActive(false)
      }
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false)
          setCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, timeLeft])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const handleExit = () => {
    setIsActive(false)
    onClose?.()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dimmed Background */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />

      {/* Focus Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header with Close Button */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <Link href="/stress-management">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-muted/50 hover:bg-muted text-foreground"
              onClick={handleExit}
            >
              <X className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Title */}
        <h2 className="mb-6 text-center text-2xl sm:text-3xl font-bold text-foreground text-pretty">
          {title}
        </h2>

        {/* Main Content */}
        <div className="mb-8 w-full">
          {children}
        </div>

        {/* Timer */}
        {!completed && (
          <div className="mb-8 text-center">
            <div className="inline-block rounded-full bg-muted/30 px-6 py-3 border border-border">
              <p className="text-sm text-muted-foreground mb-1">Time Remaining</p>
              <p className="text-3xl font-bold text-foreground font-mono">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </p>
            </div>
          </div>
        )}

        {/* Completion Message */}
        {completed && (
          <div className="mb-8 text-center">
            <div className="inline-block rounded-lg bg-secondary/10 px-6 py-4 border border-secondary/20">
              <p className="text-lg font-semibold text-secondary mb-2">Exercise Complete!</p>
              <p className="text-sm text-foreground">
                Great job taking care of your mental health. You're doing amazing.
              </p>
            </div>
          </div>
        )}

        {/* Exit Button */}
        <Link href="/stress-management">
          <Button
            size="lg"
            variant={completed ? 'default' : 'outline'}
            className={`w-full sm:w-auto ${completed ? 'bg-secondary hover:bg-secondary/90' : ''}`}
          >
            {completed ? 'Return to Wellness' : 'Exit Calmly'}
          </Button>
        </Link>
      </div>
    </div>
  )
}

// Breathing Exercise Component
export function BreathingExercise() {
  const [phase, setPhase] = useState<'inhale' | 'hold-in' | 'exhale' | 'hold-out'>('inhale')
  const phaseTimings = {
    inhale: 4,
    'hold-in': 4,
    exhale: 4,
    'hold-out': 4
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const nextPhase = (current: typeof phase) => {
      const phases: (typeof phase)[] = ['inhale', 'hold-in', 'exhale', 'hold-out']
      const currentIndex = phases.indexOf(current)
      return phases[(currentIndex + 1) % phases.length]
    }

    timeoutId = setTimeout(() => {
      setPhase((current) => nextPhase(current))
    }, phaseTimings[phase] * 1000)

    return () => clearTimeout(timeoutId)
  }, [phase])

  const phaseText = {
    inhale: 'Breathe In',
    'hold-in': 'Hold',
    exhale: 'Breathe Out',
    'hold-out': 'Hold'
  }

  const phaseSize = {
    inhale: 'scale-100',
    'hold-in': 'scale-100',
    exhale: 'scale-50',
    'hold-out': 'scale-50'
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-8 flex h-48 w-48 items-center justify-center">
        <div
          className={`h-32 w-32 rounded-full bg-gradient-to-br from-secondary to-secondary/50 shadow-lg transition-all duration-1000 ease-in-out ${phaseSize[phase]}`}
        />
      </div>
      <p className="mb-2 text-2xl font-bold text-foreground">{phaseText[phase]}</p>
      <p className="text-muted-foreground">{phaseTimings[phase]} seconds</p>
    </div>
  )
}

// Meditation Component
export function MeditationExercise() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-8 flex h-48 w-48 items-center justify-center">
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-secondary/30 to-transparent animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-t from-secondary/20 to-transparent" />
        </div>
      </div>
      <p className="mb-4 text-center text-lg text-foreground max-w-md leading-relaxed">
        Find a comfortable position. Let your thoughts flow without judgment. You are safe, present, and at peace.
      </p>
      <p className="text-sm text-muted-foreground italic">
        Breathe naturally. No effort required.
      </p>
    </div>
  )
}

// Progressive Muscle Relaxation Component
export function MuscleRelaxationExercise() {
  const [currentMuscle, setCurrentMuscle] = useState(0)

  const muscles = [
    { name: 'Toes & Feet', instruction: 'Tense your toes, then release' },
    { name: 'Legs', instruction: 'Tighten your leg muscles, then let go' },
    { name: 'Core & Stomach', instruction: 'Tense your abs, then relax' },
    { name: 'Chest & Back', instruction: 'Squeeze your chest, then release' },
    { name: 'Arms & Hands', instruction: 'Make fists and tense arms, then relax' },
    { name: 'Neck & Shoulders', instruction: 'Raise shoulders to ears, then drop' },
    { name: 'Face & Head', instruction: 'Tense facial muscles, then let go' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentMuscle < muscles.length - 1) {
        setCurrentMuscle(currentMuscle + 1)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentMuscle, muscles.length])

  const progress = ((currentMuscle + 1) / muscles.length) * 100

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-8 w-full max-w-sm">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">
            {muscles[currentMuscle].name}
          </p>
          <p className="text-xs text-muted-foreground">
            {currentMuscle + 1} of {muscles.length}
          </p>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-secondary to-secondary/50 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="text-center">
        <p className="mb-3 text-xl font-semibold text-foreground">
          {muscles[currentMuscle].name}
        </p>
        <p className="text-base text-muted-foreground">
          {muscles[currentMuscle].instruction}
        </p>
      </div>
    </div>
  )
}
