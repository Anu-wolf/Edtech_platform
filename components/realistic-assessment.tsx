
'use client'
import { useState, useEffect } from 'react'
import { toast } from "sonner"
import Link from 'next/link'
import { Clock, ChevronRight, ChevronLeft, AlertCircle, Calculator, Database, BrainCircuit, BarChart, Check, BookOpen, Target, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
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
  step: 'selection' | 'assessment' | 'summary'
  subject: 'Algebra' | 'Data Science' | null
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
  subject: string
}

interface StudyPlan {
  level: 'easy' | 'medium' | 'hard'
  title: string
  description: string
  duration: string
  commitment: string
  topics: string[]
  color: string
}

const STUDY_PLANS: Record<string, StudyPlan[]> = {
  'Algebra': [
    {
      level: 'easy',
      title: 'Algebra Foundations',
      description: 'Build a solid base with core concepts.',
      duration: '4 Weeks',
      commitment: '2-3 hours/week',
      topics: ['Variables & Expressions', 'Linear Equations', 'Basic Graphing'],
      color: 'bg-green-500'
    },
    {
      level: 'medium',
      title: 'Intermediate Algebra',
      description: 'Expand your skills to complex problems.',
      duration: '6 Weeks',
      commitment: '4-5 hours/week',
      topics: ['Quadratics', 'Polynomials', 'Systems of Equations'],
      color: 'bg-yellow-500'
    },
    {
      level: 'hard',
      title: 'Advanced Algebra Mastery',
      description: 'Master abstract concepts and deep theory.',
      duration: '8 Weeks',
      commitment: '6-8 hours/week',
      topics: ['Logarithms', 'Matrices', 'Complex Numbers'],
      color: 'bg-red-500'
    }
  ],
  'Data Science': [
    {
      level: 'easy',
      title: 'Data Science 101',
      description: 'Introduction to data handling and visualization.',
      duration: '4 Weeks',
      commitment: '3 hours/week',
      topics: ['Excel Basics', 'Intro to Python', 'Data Visualization'],
      color: 'bg-green-500'
    },
    {
      level: 'medium',
      title: 'Data Analyst Track',
      description: 'Practical skills for real-world analysis.',
      duration: '8 Weeks',
      commitment: '5-6 hours/week',
      topics: ['SQL & Databases', 'Pandas & NumPy', 'Statistical Analysis'],
      color: 'bg-yellow-500'
    },
    {
      level: 'hard',
      title: 'ML Engineer Path',
      description: 'Deep dive into algorithms and models.',
      duration: '12 Weeks',
      commitment: '8-10 hours/week',
      topics: ['Machine Learning', 'Deep Learning', 'Big Data Technologies'],
      color: 'bg-red-500'
    }
  ]
}

const ALGEBRA_QUESTIONS: Question[] = [
  {
    id: 'alg1',
    type: 'mcq',
    subject: 'Algebra',
    difficulty: 'easy',
    question: 'Solve for x: 2x + 5 = 15',
    options: ['5', '10', '7.5', '2.5'],
    correctAnswer: '5',
  },
  {
    id: 'alg2',
    type: 'mcq',
    subject: 'Algebra',
    difficulty: 'medium',
    question: 'What are the roots of the equation x² - 5x + 6 = 0?',
    options: ['2 and 3', '-2 and -3', '1 and 6', '-1 and -6'],
    correctAnswer: '2 and 3',
  },
  {
    id: 'alg3',
    type: 'text',
    subject: 'Algebra',
    difficulty: 'medium',
    question: 'Explain the difference between a linear equation and a quadratic equation provided with examples.',
    minWords: 50,
  },
  {
    id: 'alg4',
    type: 'mcq',
    subject: 'Algebra',
    difficulty: 'hard',
    question: 'If log₂(x) = 3, what is the value of x?',
    options: ['6', '8', '9', '5'],
    correctAnswer: '8',
  },
  {
    id: 'alg5',
    type: 'text',
    subject: 'Algebra',
    difficulty: 'hard',
    question: 'Describe how you would apply the quadratic formula to solve 2x² + 4x - 6 = 0. Walk through the steps.',
    minWords: 80,
  },
]

const DATA_SCIENCE_QUESTIONS: Question[] = [
  {
    id: 'ds1',
    type: 'mcq',
    subject: 'Data Science',
    difficulty: 'easy',
    question: 'Which of the following is NOT a measure of central tendency?',
    options: ['Mean', 'Median', 'Mode', 'Standard Deviation'],
    correctAnswer: 'Standard Deviation',
  },
  {
    id: 'ds2',
    type: 'mcq',
    subject: 'Data Science',
    difficulty: 'medium',
    question: 'In a Pandas DataFrame, which method is used to view the first 5 rows?',
    options: ['.head()', '.top()', '.first()', '.view()'],
    correctAnswer: '.head()',
  },
  {
    id: 'ds3',
    type: 'text',
    subject: 'Data Science',
    difficulty: 'medium',
    question: 'Explain the concept of Overfitting in Machine Learning and how it can be prevented.',
    minWords: 60,
  },
  {
    id: 'ds4',
    type: 'mcq',
    subject: 'Data Science',
    difficulty: 'hard',
    question: 'Which algorithm is best suited for a classification problem with labeled data?',
    options: ['K-Means Clustering', 'Linear Regression', 'Logistic Regression', 'Apriori'],
    correctAnswer: 'Logistic Regression',
  },
  {
    id: 'ds5',
    type: 'text',
    subject: 'Data Science',
    difficulty: 'hard',
    question: 'Describe the steps involved in the data preprocessing phase of a data science project.',
    minWords: 100,
  },
]

function calculateStressLevel(
  currentQuestion: number,
  totalQuestions: number,
  timeSpent: number,
  difficulty: string,
  questions: Question[]
): 'low' | 'moderate' | 'high' {
  let stressScore = 0

  // Time pressure (0-40 points)
  const avgTimePerQuestion = timeSpent / (currentQuestion + 1)
  if (avgTimePerQuestion < 30) stressScore += 40
  else if (avgTimePerQuestion < 60) stressScore += 20
  else stressScore += 0

  // Question difficulty (0-30 points)
  const hardCount = questions.slice(0, currentQuestion + 1).filter(
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
    timeStarted: 0, // Will be set when assessment starts
    submitted: false,
    stressLevel: 'low',
    step: 'selection',
    subject: null,
  })
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [timeLeft, setTimeLeft] = useState(2700)

  // Get current questions based on subject
  const currentQuestions = state.subject === 'Algebra'
    ? ALGEBRA_QUESTIONS
    : state.subject === 'Data Science'
      ? DATA_SCIENCE_QUESTIONS
      : []

  const question = currentQuestions[state.currentQuestion]
  const progress = state.step === 'assessment' ? ((state.currentQuestion + 1) / currentQuestions.length) * 100 : 0
  const answeredCount = Object.keys(state.answers).length

  // Timer effect
  useEffect(() => {
    if (state.step !== 'assessment') return

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
  }, [state.step, state.submitted])

  // Calculate stress level
  useEffect(() => {
    if (state.step !== 'assessment') return

    const timePassed = (Date.now() - state.timeStarted) / 1000
    const stress = calculateStressLevel(
      state.currentQuestion,
      currentQuestions.length,
      timePassed,
      question?.difficulty || 'medium',
      currentQuestions
    )
    setState((prev) => ({ ...prev, stressLevel: stress }))
  }, [state.currentQuestion, state.step])

  const startAssessment = (subject: 'Algebra' | 'Data Science') => {
    setState(prev => ({
      ...prev,
      step: 'assessment',
      subject,
      timeStarted: Date.now(),
      answers: {},
      currentQuestion: 0,
      stressLevel: 'low'
    }))
    setTimeLeft(2700) // Reset timer
  }

  const handleAnswer = (value: string) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [question.id]: value },
    }))
  }

  const handleNext = () => {
    if (state.currentQuestion < currentQuestions.length - 1) {
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
    currentQuestions.forEach((q) => {
      if (q.type === 'mcq' && state.answers[q.id] === q.correctAnswer) {
        correctCount++
      }
    })

    const score = Math.round((correctCount / currentQuestions.length) * 100)
    const accuracy = (answeredCount / currentQuestions.length) * 100
    const timeTaken = Math.round((Date.now() - state.timeStarted) / 1000)

    const assessmentResult: AssessmentResult = {
      totalQuestions: currentQuestions.length,
      answeredQuestions: answeredCount,
      correctAnswers: correctCount,
      score,
      accuracy,
      timeTaken,
      difficulty: 'Mixed',
      stressLevel: state.stressLevel,
      answers: state.answers,
      subject: state.subject || 'General'
    }

    setResult(assessmentResult)
    setState((prev) => ({ ...prev, submitted: true, step: 'summary' }))
  }

  if (state.step === 'selection') {
    return (
      <main className="flex-1 pb-12 pt-24 bg-background min-h-screen">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Select Your Assessment Subject</h1>
            <p className="text-muted-foreground">Choose a topic to begin your personalized assessment journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg group relative overflow-hidden"
              onClick={() => startAssessment('Algebra')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                  <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl">Algebra</CardTitle>
                <CardDescription>Master equations, functions, and variables</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-left space-y-2 mb-6 text-muted-foreground max-w-[200px] mx-auto">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" /> Linear Equations
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" /> Quadratics
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-blue-500" /> Logarithms
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Algebra</Button>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg group relative overflow-hidden"
              onClick={() => startAssessment('Data Science')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                  <Database className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl">Data Science</CardTitle>
                <CardDescription>Explore statistics, ML, and data analysis</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-sm text-left space-y-2 mb-6 text-muted-foreground max-w-[200px] mx-auto">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-green-500" /> Statistics
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-green-500" /> Machine Learning
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-green-500" /> Data Analysis
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">Start Data Science</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    )
  }

  if (state.step === 'summary' && result) {
    return <AssessmentSummary result={result} />
  }

  // Assessment UI
  return (
    <main className="flex-1 pb-12 pt-24 bg-background">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Header Bar */}
        <div className="mb-6 sm:mb-8 rounded-lg sm:rounded-xl border border-border bg-card p-3 sm:p-4">
          <div className="flex flex-col gap-3 mb-4 sm:gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-foreground truncate">{state.subject} Assessment</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Question {state.currentQuestion + 1} of {currentQuestions.length}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <AIAvatar expression="thinking" size="md" />
              <div
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex-shrink-0 ${timeLeft < 300 ? 'bg-destructive/10 text-destructive' : 'bg-secondary/10 text-secondary'
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
                className={`h-2 w-8 rounded-full ${state.stressLevel === 'high' ? 'bg-destructive' : 'bg-destructive/20'
                  }`}
              />
              <div
                className={`h-2 w-8 rounded-full ${state.stressLevel === 'moderate' ? 'bg-accent' : 'bg-accent/20'
                  }`}
              />
              <div
                className={`h-2 w-8 rounded-full ${state.stressLevel === 'low' ? 'bg-secondary' : 'bg-secondary/20'
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
                <CardDescription className="mt-2 text-xs sm:text-sm">{question.subject} • {question.difficulty} difficulty</CardDescription>
              </div>
              <div
                className={`rounded-lg px-2 sm:px-3 py-1 text-xs font-semibold flex-shrink-0 ${question.type === 'mcq'
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
            {currentQuestions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setState((prev) => ({ ...prev, currentQuestion: idx }))}
                className={`h-8 w-8 sm:h-10 sm:w-10 rounded text-xs sm:text-sm font-semibold transition-colors flex-shrink-0 ${idx === state.currentQuestion
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

          {state.currentQuestion === currentQuestions.length - 1 ? (
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={question.type === 'text' ? (state.answers[question.id] || '').length === 0 : !state.answers[question.id]}
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
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  // Determine recommended level based on score
  const recommendedLevel = result.score >= 80 ? 'hard' : result.score >= 50 ? 'medium' : 'easy'

  const plans = STUDY_PLANS[result.subject] || []

  useEffect(() => {
    // Auto-select recommended plan initially
    if (!selectedPlan) {
      setSelectedPlan(recommendedLevel)
    }
  }, [])

  return (
    <main className="flex-1 pb-12 pt-12 bg-background min-h-screen">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-border bg-card mb-8 shadow-xl rounded-xl overflow-hidden">
            <div className={`h-2 w-full ${result.score >= 80 ? 'bg-green-500' : result.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} />
            <CardHeader className="text-center p-8 bg-muted/10">
              <div className="mb-6 flex justify-center">
                <AIAvatar expression="happy" size="lg" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Assessment Complete!</CardTitle>
              <CardDescription className="text-lg">
                You've completed the {result.subject} assessment.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8 p-8">
              {/* Summary Stats */}
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Score', value: `${result.score}%`, icon: BarChart, color: 'text-blue-500' },
                  { label: 'Accuracy', value: `${Math.round(result.accuracy)}%`, icon: Target, color: 'text-purple-500' },
                  { label: 'Time', value: `${Math.floor(result.timeTaken / 60)}m`, icon: Clock, color: 'text-orange-500' },
                  { label: 'Level', value: result.difficulty, icon: BrainCircuit, color: 'text-pink-500' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all">
                    <stat.icon className={`h-6 w-6 mb-2 ${stat.color}`} />
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recommended Plans */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground">Curated Study Plans</h3>
                  <p className="text-muted-foreground mt-2">
                    Based on your performance, we recommend the <span className="font-bold text-primary capitalize">{recommendedLevel}</span> path.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <motion.div
                      key={plan.level}
                      whileHover={{ y: -5 }}
                      className={`relative rounded-xl border-2 cursor-pointer transition-all overflow-hidden ${selectedPlan === plan.level
                        ? 'border-primary shadow-lg ring-2 ring-primary/20 bg-primary/5'
                        : 'border-border bg-card hover:border-primary/50'
                        }`}
                      onClick={() => {
                        setSelectedPlan(plan.level)
                        toast.success(`Selected ${plan.title} plan!`)
                      }}
                    >
                      {recommendedLevel === plan.level && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                          Recommended
                        </div>
                      )}

                      <div className={`h-2 w-full ${plan.color}`} />

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-lg capitalize">{plan.level}</h4>
                          {selectedPlan === plan.level && (
                            <div className="bg-primary rounded-full p-1">
                              <Check className="h-3 w-3 text-primary-foreground" />
                            </div>
                          )}
                        </div>

                        <h5 className="text-xl font-bold mb-2">{plan.title}</h5>
                        <p className="text-sm text-muted-foreground mb-4 h-10">{plan.description}</p>

                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{plan.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{plan.commitment}</span>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-border/50">
                          <p className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Key Topics</p>
                          <ul className="space-y-1">
                            {plan.topics.map((topic, i) => (
                              <li key={i} className="text-sm flex items-center gap-2">
                                <span className={`h-1.5 w-1.5 rounded-full ${plan.color}`} />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row pt-4">
                <Link href="/" className="w-full sm:flex-1">
                  <Button variant="outline" size="lg" className="w-full text-base h-12">
                    Retake Assessment
                  </Button>
                </Link>
                <Link href="/dashboard" className="w-full sm:flex-1">
                  <Button size="lg" className="w-full gap-2 text-base h-12 bg-primary hover:bg-primary/90">
                    <BookOpen className="h-5 w-5" />
                    Start {selectedPlan ? STUDY_PLANS[result.subject]?.find(p => p.level === selectedPlan)?.title : 'Learning'}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
