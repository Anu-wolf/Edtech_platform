import { AvatarShowcase } from '@/components/ai-avatar'
import { Header } from '@/components/header'

export default function AvatarShowcasePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-12 pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Meet Your AI Mentor
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Your friendly AI companion in multiple expressions
            </p>
          </div>

          <div className="mb-12 rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-8 text-2xl font-bold text-foreground">Avatar Expressions</h2>
            <AvatarShowcase />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 font-bold text-foreground">Neutral / Idle</h3>
              <p className="text-muted-foreground">
                A gentle smile and calm demeanor. Perfect for introducing concepts or starting a new assessment.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 font-bold text-foreground">Thinking / Analyzing</h3>
              <p className="text-muted-foreground">
                Shows focus and concentration. Appears during assessments to indicate the AI is analyzing your responses.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 font-bold text-foreground">Happy / Encouraging</h3>
              <p className="text-muted-foreground">
                Bright smile and enthusiastic energy. Celebrates your achievements and encourages continued learning.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 font-bold text-foreground">Calm / Reassuring</h3>
              <p className="text-muted-foreground">
                Peaceful expression showing empathy and support. Provides comfort during difficult moments and stress management.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
