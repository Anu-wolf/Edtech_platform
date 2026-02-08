'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, CheckCircle, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { AIAvatar } from '@/components/ai-avatar'

interface Question {
  id: number
  type: 'mcq' | 'text'
  subject: string
  question: string
  options?: string[]
  answer?: string
  userAnswer?: string
  timeSpent?: number
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'mcq',
    subject: 'Mathematics',
    question: 'What is the derivative of f(x) = 3x² + 2x + 1?',
    options: ['6x + 2', '6x + 1', '3x + 2', '2x + 1'],
    answer: '6x + 2',
  },
  {
    id: 2,
    type: 'mcq',
    subject: 'Physics',
    question: 'Which of the following best describes quantum superposition?',
    options: [
      'A particle can exist in multiple states simultaneously until measured',
      'A particle can move faster than the speed of light',
      'A particle has infinite mass in quantum states',
      'A particle is always at rest in quantum mechanics',
    ],
    answer: 'A particle can exist in multiple states simultaneously until measured',
  },
  {
    id: 3,
    type: 'text',
    subject: 'Biology',
    question: 'Explain the process of photosynthesis and its importance to life on Earth. (150-250 words)',
    answer: 'sample',
  },
  {
    id: 4,
    type: 'mcq',
    subject: 'Chemistry',
    question: 'What is the pH of a neutral solution at 25°C?',
    options: ['0', '7', '14', '10'],
    answer: '7',
  },
  {
    id: 5,
    type: 'text',
    subject: 'English Literature',
    question: 'Analyze the symbolism of the green light in "The Great Gatsby". How does it represent Gatsby\'s dreams?',
    answer: 'sample',
  },
]

export function AssessmentFlow() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(2700) // 45 minutes
  const [submitted, setSubmitted] = useState(false)

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const question = QUESTIONS[currentQuestion]
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [question.id]: value,
    })
  }

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return <AssessmentSummary questions={QUESTIONS} answers={answers} timeLeft={timeLeft} />
  }

  return (
    <main className="flex-1 pb-12 pt-24 bg-background">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Header Bar with Avatar */}
        <div className="mb-6 sm:mb-8 rounded-lg sm:rounded-xl border border-border bg-card p-3 sm:p-4">
          <div className="flex flex-col gap-3 mb-4 sm:gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-foreground truncate">Mathematics Assessment</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">Question {currentQuestion + 1} of {QUESTIONS.length}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <AIAvatar expression="thinking" size="md" />
              <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex-shrink-0 ${timeLeft < 300 ? 'bg-destructive/10 text-destructive' : 'bg-secondary/10 text-secondary'}`}>
                <Clock className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0`} />
                <span>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="border-border bg-card mb-6 sm:mb-8 shadow-lg rounded-lg sm:rounded-xl">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg sm:text-2xl text-foreground text-pretty">{question.question}</CardTitle>
                <CardDescription className="mt-2 text-xs sm:text-sm">{question.subject}</CardDescription>
              </div>
              <div className={`rounded-lg px-2 sm:px-3 py-1 text-xs font-semibold flex-shrink-0 ${
                question.type === 'mcq' 
                  ? 'bg-secondary/10 text-secondary' 
                  : 'bg-accent/10 text-accent'
              }`}>
                {question.type === 'mcq' ? 'Multiple Choice' : 'Short Essay'}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            {/* MCQ Options */}
            {question.type === 'mcq' && question.options && (
              <RadioGroup value={answers[question.id] || ''} onValueChange={handleAnswer}>
                <div className="space-y-2 sm:space-y-3">
                  {question.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors cursor-pointer">
                      <RadioGroupItem value={option} id={`option-${idx}`} className="flex-shrink-0" />
                      <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer text-sm sm:text-base text-foreground">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {/* Text Input */}
            {question.type === 'text' && (
              <div className="space-y-2">
                <Label htmlFor="text-answer" className="text-sm sm:text-base text-foreground font-semibold">
                  Your Answer
                </Label>
                <Textarea
                  id="text-answer"
                  placeholder="Type your answer here... (minimum 150 words)"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="min-h-40 sm:min-h-48 resize-none border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:bg-background text-sm sm:text-base"
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center text-xs text-muted-foreground">
                  <span>AI Assistant will provide detailed feedback</span>
                  <span className="font-semibold">{(answers[question.id] || '').split(' ').filter(Boolean).length} words</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation and Submission */}
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="gap-2 bg-transparent w-full sm:w-auto"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex gap-1 sm:gap-2 flex-wrap justify-center sm:justify-start overflow-auto">
            {QUESTIONS.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(idx)}
                className={`h-8 w-8 sm:h-10 sm:w-10 rounded text-xs sm:text-sm font-semibold transition-colors flex-shrink-0 ${
                  idx === currentQuestion
                    ? 'bg-secondary text-primary-foreground'
                    : answers[q.id]
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-border bg-card text-foreground hover:bg-muted'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {currentQuestion === QUESTIONS.length - 1 ? (
            <Button
              size="lg"
              onClick={handleSubmit}
              className="gap-2 bg-secondary hover:bg-secondary/90 w-full sm:w-auto"
            >
              <CheckCircle className="h-4 w-4" />
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

interface AssessmentSummaryProps {
  questions: Question[]
  answers: Record<number, string>
  timeLeft: number
}

function AssessmentSummary({ questions, answers, timeLeft }: AssessmentSummaryProps) {
  const answeredCount = Object.keys(answers).length
  const completionRate = (answeredCount / questions.length) * 100

  return (
    <main className="flex-1 pb-12 pt-24 bg-background">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <Card className="border-border bg-card mb-6 sm:mb-8 shadow-lg rounded-lg sm:rounded-xl">
          <CardHeader className="text-center p-4 sm:p-6">
            <div className="mb-3 sm:mb-4 flex justify-center">
              <AIAvatar expression="happy" size="lg" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl text-foreground">Assessment Submitted!</CardTitle>
            <CardDescription className="mt-2 text-sm sm:text-lg">
              Our AI is analyzing your responses. Your personalized feedback will be ready shortly.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            {/* Summary Stats */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
              {[
                { label: 'Questions Answered', value: `${answeredCount}/${questions.length}`, icon: CheckCircle },
                { label: 'Completion Rate', value: `${Math.round(completionRate)}%`, icon: AlertCircle },
                { label: 'Time Remaining', value: `${Math.floor((2700 - timeLeft) / 60)} min used`, icon: Clock },
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="rounded-lg border border-border bg-muted/30 p-3 sm:p-4 text-center">
                    <Icon className="mx-auto mb-2 h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                    <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                )
              })}
            </div>

            {/* Next Steps */}
            <div className="rounded-lg border border-border bg-secondary/5 p-4 sm:p-6">
              <h3 className="mb-2 sm:mb-3 font-bold text-foreground text-sm sm:text-base">What's Next?</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-foreground">
                <li>✓ Your responses are being analyzed by our advanced AI</li>
                <li>✓ Detailed feedback will highlight strengths and areas for improvement</li>
                <li>✓ Personalized learning recommendations will be generated</li>
                <li>✓ You'll receive adaptive follow-up questions tailored to your performance</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row">
              <Link href="/" className="w-full sm:flex-1">
                <Button variant="outline" size="lg" className="w-full bg-transparent">
                  Return to Dashboard
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
