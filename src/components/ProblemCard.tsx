'use client'

import { Problem, NormalProblem, QuizProblem } from '@/types'
import { cn } from '@/lib/utils'

interface ProblemCardProps {
  problem: Problem
  onClick: () => void
  onDelete?: (id: string) => void
  onGenerateCode?: (problem: Problem) => void
}

export default function ProblemCard({ problem, onClick, onDelete, onGenerateCode }: ProblemCardProps) {
  const isCustomCard = problem.id.startsWith('custom-')
  const isNormalProblem = 'difficulty' in problem

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDelete && isCustomCard) {
      onDelete(problem.id)
    }
  }

  const handleGenerateCode = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onGenerateCode && isCustomCard) {
      onGenerateCode(problem)
    }
  }

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-lg border bg-card hover:bg-accent transition-colors relative group"
    >
      {isCustomCard && (
        <div className="absolute top-2 right-2 flex space-x-1">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            Custom
          </span>
          {onGenerateCode && (
            <button
              onClick={handleGenerateCode}
              className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 hover:bg-green-200 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Generate code for problem file"
            >
              &lt;/&gt;
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 hover:bg-red-200 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete card"
            >
              ×
            </button>
          )}
        </div>
      )}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{problem.title}</h3>
          {isNormalProblem && (
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
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {isNormalProblem ? problem.description : (problem as QuizProblem).question}
        </p>
      </div>
    </button>
  )
} 