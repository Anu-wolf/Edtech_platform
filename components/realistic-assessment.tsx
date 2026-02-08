'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { AIAvatar } from '@/components/ai-avatar'

interface Question {
  id: string
  type: 'mcq' | 'text'
  subject: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options?: string[]
  correctAnswer?: string
  minWords?: number
}

interface AssessmentState {
  currentQuestion: number
  answers: Record<string, string>
  timeStarted: number
  submitted: boolean
  stressLevel: 'low' | 'moderate' | 'high'
}

interface AssessmentResult {
  totalQuestions: number
  answeredQuestions: number
  correctAnswers: number
  score: number
  accuracy: number
  timeTaken: number
  difficulty: string
  stressLevel: 'low' | 'moderate' | 'high'
  answers: Record<string, string>
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'mcq',
    subject: 'Mathematics',
    difficulty: 'medium',
    question: 'What is the derivative of f(x) = 3x² + 2x + 1?',
    options: ['6x + 2', '6x + 1', '3x + 2', '2x + 1'],
    correctAnswer: '6x + 2',
  },
  {
    id: 'q2',
    type: 'mcq',
    subject: 'Physics',
    difficulty: 'hard',
    question: 'Which principle best describes quantum superposition?',
    options: [
      'A particle exists in multiple states until observed',
      'A particle always moves faster than light',
      'A particle cannot exist in quantum states',
      'Quantum mechanics is not applicable to particles',
    ],
    correctAnswer: 'A particle exists in multiple states until observed',
  },
  {
    id: 'q3',
    type: 'text',
    subject: 'Literature',
    difficulty: 'medium',
    question: 'Explain how theme develops in the first chapter of your assigned reading.',
    minWords: 100,
  },
  {
    id: 'q4',
    type: 'mcq',
    subject: 'History',
    difficulty: 'easy',
    question: 'In what year did the Industrial Revolution begin in Britain?',
    options: ['1650', '1750', '1850', '1950'],
    correctAnswer: '1750',
  },
  {
    id: 'q5',
    type: 'text',
    subject: 'Science',
    difficulty: 'hard',
    question: 'Describe the water cycle and its importance to Earth\'s ecosystems.',
    minWords: 150,
  },
]

function calculateStressLevel(
  currentQuestion: number,
  totalQuestions: number,
  timeSpent: number,
  difficulty: string
): 'low' | 'moderate' | 'high' {
  let stressScore = 0

  // Time pressure (0-40 points)
  const avgTimePerQuestion = timeSpent / (currentQuestion + 1)
  if (avgTimePerQuestion < 30) stressScore += 40
  else if (avgTimePerQuestion < 60) stressScore += 20
  else stressScore += 0

  // Question difficulty (0-30 points)
  const hardCount = QUESTIONS.slice(0, currentQuestion + 1).filter(
    (q) => q.difficulty === 'hard'
  ).length
  stressScore += (hardCount / (currentQuestion + 1)) * 30

  // Completion rate (0-30 points)
  const progressRate = (currentQuestion + 1) / totalQuestions
  if (progressRate < 0.3) stressScore += 30
  else if (progressRate < 0.6) stressScore += 15
  else stressScore += 0

  if (stressScore >= 60) return 'high'
  if (stressScore >= 30) return 'moderate'
  return 'low'
}

export function RealisticAssessment() {
  const [state, setState] = useState<AssessmentState>({
    currentQuestion: 0,
    answers: {},
    timeStarted: Date.now(),
    submitted: false,
    stressLevel: 'low',
  })
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [timeLeft, setTimeLeft] = useState(2700)

  const question = QUESTIONS[state.currentQuestion]
  const progress = ((state.currentQuestion + 1) / QUESTIONS.length) * 100
  const answeredCount = Object.keys(state.answers).length

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [state.submitted])

  // Calculate stress level
  useEffect(() => {
    const timePassed = (Date.now() - state.timeStarted) / 1000
    const stress = calculateStressLevel(
      state.currentQuestion,
      QUESTIONS.length,
      timePassed,
      question.difficulty
    )
    setState((prev) => ({ ...prev, stressLevel: stress }))
  }, [state.currentQuestion])

  const handleAnswer = (value: string) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [question.id]: value },
    }))
  }

  const handleNext = () => {
    if (state.currentQuestion < QUESTIONS.length - 1) {
      setState((prev) => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }))
    }
  }

  const handlePrev = () => {
    if (state.currentQuestion > 0) {
      setState((prev) => ({ ...prev, currentQuestion: prev.currentQuestion - 1 }))
    }
  }

  const handleSubmit = () => {
    // Calculate score
    let correctCount = 0
    QUESTIONS.forEach((q) => {
      if (q.type === 'mcq' && state.answers[q.id] === q.correctAnswer) {
        correctCount++
      }
    })

    const score = Math.round((correctCount / QUESTIONS.length) * 100)
    const accuracy = (answeredCount / QUESTIONS.length) * 100
    const timeTaken = Math.round((Date.now() - state.timeStarted) / 1000)

    const assessmentResult: AssessmentResult = {
      totalQuestions: QUESTIONS.length,
      answeredQuestions: answeredCount,
      correctAnswers: correctCount,
      score,
      accuracy,
      timeTaken,
      difficulty: 'Mixed',
      stressLevel: state.stressLevel,
      answers: state.answers,
    }

    setResult(assessmentResult)
    setState((prev) => ({ ...prev, submitted: true }))
  }

  const isAnswered = state.answers[question.id]
  const isRequired = question.type === 'text' ? (state.answers[question.id] || '').length > 0 : !!isAnswered

  if (state.submitted && result) {
    return <AssessmentSummary result={result} />
  }

  return (
    <main className="flex-1 pb-12 pt-24 bg-background">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Header Bar */}
        <div className="mb-6 sm:mb-8 rounded-lg sm:rounded-xl border border-border bg-card p-3 sm:p-4">
          <div className="flex flex-col gap-3 mb-4 sm:gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-foreground truncate">Assessment</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Question {state.currentQuestion + 1} of {QUESTIONS.length}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <AIAvatar expression="thinking" size="md" />
              <div
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex-shrink-0 ${
                  timeLeft < 300 ? 'bg-destructive/10 text-destructive' : 'bg-secondary/10 text-secondary'
                }`}
              >
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />

          {/* Stress Indicator */}
          <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-muted-foreground">Stress Level:</span>
            <div className="flex gap-1">
              <div
                className={`h-2 w-8 rounded-full ${
                  state.stressLevel === 'high' ? 'bg-destructive' : 'bg-destructive/20'
                }`}
              />
              <div
                className={`h-2 w-8 rounded-full ${
                  state.stressLevel === 'moderate' ? 'bg-accent' : 'bg-accent/20'
                }`}
              />
              <div
                className={`h-2 w-8 rounded-full ${
                  state.stressLevel === 'low' ? 'bg-secondary' : 'bg-secondary/20'
                }`}
              />
            </div>
            <span className="capitalize text-muted-foreground">{state.stressLevel}</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="border-border bg-card mb-6 sm:mb-8 shadow-lg rounded-lg sm:rounded-xl">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg sm:text-2xl text-foreground text-pretty">{question.question}</CardTitle>
                <CardDescription className="mt-2 text-xs sm:text-sm">{question.subject}</CardDescription>
              </div>
              <div
                className={`rounded-lg px-2 sm:px-3 py-1 text-xs font-semibold flex-shrink-0 ${
                  question.type === 'mcq'
                    ? 'bg-secondary/10 text-secondary'
                    : 'bg-accent/10 text-accent'
                }`}
              >
                {question.type === 'mcq' ? 'Multiple Choice' : 'Short Answer'}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            {question.type === 'mcq' && question.options && (
              <RadioGroup value={state.answers[question.id] || ''} onValueChange={handleAnswer}>
                <div className="space-y-2 sm:space-y-3">
                  {question.options.map((option, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option} id={`option-${idx}`} className="flex-shrink-0" />
                      <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer text-sm sm:text-base text-foreground">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {question.type === 'text' && (
              <div className="space-y-2">
                <Label htmlFor="text-answer" className="text-sm sm:text-base text-foreground font-semibold">
                  Your Answer
                </Label>
                <Textarea
                  id="text-answer"
                  placeholder={`Type your answer here... (minimum ${question.minWords} words)`}
                  value={state.answers[question.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="min-h-40 sm:min-h-48 resize-none border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:bg-background text-sm sm:text-base"
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center text-xs text-muted-foreground">
                  <span>Personalized feedback will be provided</span>
                  <span className="font-semibold">
                    {(state.answers[question.id] || '').split(' ').filter(Boolean).length} words
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            disabled={state.currentQuestion === 0}
            className="gap-2 bg-transparent w-full sm:w-auto"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex gap-1 sm:gap-2 flex-wrap justify-center overflow-auto">
            {QUESTIONS.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setState((prev) => ({ ...prev, currentQuestion: idx }))}
                className={`h-8 w-8 sm:h-10 sm:w-10 rounded text-xs sm:text-sm font-semibold transition-colors flex-shrink-0 ${
                  idx === state.currentQuestion
                    ? 'bg-secondary text-primary-foreground'
                    : state.answers[q.id]
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-border bg-card text-foreground hover:bg-muted'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {state.currentQuestion === QUESTIONS.length - 1 ? (
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!isRequired}
              className="gap-2 bg-secondary hover:bg-secondary/90 w-full sm:w-auto disabled:opacity-50"
            >
              <span className="hidden sm:inline">Submit Assessment</span>
              <span className="sm:hidden">Submit</span>
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleNext}
              className="gap-2 bg-secondary hover:bg-secondary/90 w-full sm:w-auto"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}

function AssessmentSummary({ result }: { result: AssessmentResult }) {
  return (
    <main className="flex-1 pb-12 pt-24 bg-background">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <Card className="border-border bg-card mb-6 sm:mb-8 shadow-lg rounded-lg sm:rounded-xl">
          <CardHeader className="text-center p-4 sm:p-6">
            <div className="mb-3 sm:mb-4 flex justify-center">
              <AIAvatar expression="happy" size="lg" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl text-foreground">Assessment Complete!</CardTitle>
            <CardDescription className="mt-2 text-sm sm:text-base">
              Your responses are being analyzed. Detailed insights coming up.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            {/* Summary Stats */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
              {[
                { label: 'Score', value: `${result.score}%` },
                { label: 'Accuracy', value: `${Math.round(result.accuracy)}%` },
                { label: 'Time Taken', value: `${Math.floor(result.timeTaken / 60)}m` },
              ].map((stat, i) => (
                <div key={i} className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4 text-center">
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Next Steps */}
            <div className="rounded-lg border border-border bg-secondary/5 p-4 sm:p-6">
              <h3 className="mb-2 sm:mb-3 font-bold text-foreground text-sm sm:text-base">What's Next?</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-foreground">
                <li>✓ Your responses are being analyzed</li>
                <li>✓ Personalized feedback is being generated</li>
                <li>✓ Learning recommendations will be tailored to you</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row">
              <Link href="/" className="w-full sm:flex-1">
                <Button variant="outline" size="lg" className="w-full bg-transparent">
                  Back to Dashboard
                </Button>
              </Link>
              <Link href="/report" className="w-full sm:flex-1">
                <Button size="lg" className="w-full gap-2 bg-secondary hover:bg-secondary/90">
                  View Report
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
