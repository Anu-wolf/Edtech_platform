import Image from 'next/image'
import { cn } from '@/lib/utils'

export type AvatarExpression = 'neutral' | 'thinking' | 'happy' | 'calm'

interface AIAvatarProps {
  expression?: AvatarExpression
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  className?: string
}

const sizeMap = {
  sm: 64,
  md: 96,
  lg: 128,
  xl: 160,
}

const sizeClassMap = {
  sm: 'h-16 w-16',
  md: 'h-24 w-24',
  lg: 'h-32 w-32',
  xl: 'h-40 w-40',
}

export function AIAvatar({
  expression = 'neutral',
  size = 'md',
  animated = false,
  className,
}: AIAvatarProps) {
  const size_px = sizeMap[size]
  const expressionMap = {
    neutral: '/avatar-neutral.jpg',
    thinking: '/avatar-thinking.jpg',
    happy: '/avatar-happy.jpg',
    calm: '/avatar-calm.jpg',
  }

  return (
    <div
      className={cn(
        sizeClassMap[size],
        'relative flex items-center justify-center overflow-hidden rounded-full',
        animated && 'animate-pulse',
        className
      )}
    >
      <Image
        src={expressionMap[expression] || "/placeholder.svg"}
        alt={`AI Mentor - ${expression} expression`}
        width={size_px}
        height={size_px}
        className="h-full w-full object-cover"
        priority
      />
    </div>
  )
}

// Avatar with speech bubble for interactive moments
export function AIAvatarWithMessage({
  expression = 'neutral',
  message,
  size = 'md',
}: {
  expression?: AvatarExpression
  message: string
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <div className="flex items-start gap-3">
      <AIAvatar expression={expression} size={size} />
      <div className="flex flex-col gap-2">
        <div className="rounded-lg bg-card p-3 text-sm shadow-sm">
          <p className="text-foreground">{message}</p>
        </div>
        <div className="h-2 w-2 rounded-full bg-secondary opacity-60" />
      </div>
    </div>
  )
}

// Avatar showcase for different expressions
export function AvatarShowcase() {
  const expressions: AvatarExpression[] = ['neutral', 'thinking', 'happy', 'calm']

  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {expressions.map((expression) => (
        <div key={expression} className="flex flex-col items-center gap-3">
          <AIAvatar expression={expression} size="lg" />
          <p className="text-sm font-medium capitalize text-muted-foreground">
            {expression}
          </p>
        </div>
      ))}
    </div>
  )
}
