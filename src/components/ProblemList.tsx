'use client'

import { Problem } from '@/types'
import { cn } from '@/lib/utils'

interface ProblemListProps {
  problems: Problem[]
  selectedProblem: Problem | null
  onSelectProblem: (problem: Problem) => void
}

export default function ProblemList({ problems, selectedProblem, onSelectProblem }: ProblemListProps) {
  return (
    <div className="space-y-2">
      {problems.map((problem) => (
        <button
          key={problem.id}
          onClick={() => onSelectProblem(problem)}
          className={cn(
            'w-full text-left p-4 rounded-lg transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            selectedProblem?.id === problem.id && 'bg-accent text-accent-foreground'
          )}
        >
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
        </button>
      ))}
    </div>
  )
} 