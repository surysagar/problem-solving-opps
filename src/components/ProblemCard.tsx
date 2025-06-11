'use client'

import { Problem } from '@/types'
import { cn } from '@/lib/utils'

interface ProblemCardProps {
  problem: Problem
  onClick: () => void
}

export default function ProblemCard({ problem, onClick }: ProblemCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{problem.title}</h3>
          <span
            className={cn(
              'px-2 py-1 text-xs font-medium rounded-full',
              problem.difficulty === 'Easy' && 'bg-green-100 text-green-800',
              problem.difficulty === 'Medium' && 'bg-yellow-100 text-yellow-800',
              problem.difficulty === 'Hard' && 'bg-red-100 text-red-800'
            )}
          >
            {problem.difficulty}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {problem.description}
        </p>
      </div>
    </button>
  )
} 