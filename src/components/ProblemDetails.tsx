'use client'

import { useState, useEffect } from 'react'
import { problems, Problem } from './Sidebar'
import SolutionDialog from './SolutionDialog'

interface ProblemDetailsProps {
  problemId: string
  showSolution: boolean
}

export default function ProblemDetails({ problemId, showSolution }: ProblemDetailsProps) {
  const [problem, setProblem] = useState<Problem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const foundProblem = problems.find((p: Problem) => p.id === problemId)
    setProblem(foundProblem || null)
    // Close dialog when problem changes
    setIsDialogOpen(false)
  }, [problemId])

  useEffect(() => {
    if (showSolution && problem) {
      setIsDialogOpen(true)
    } else {
      setIsDialogOpen(false)
    }
  }, [showSolution, problem])

  if (!problem) {
    return null
  }

  return (
    <>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{problem.title}</h2>
          <p className="text-sm text-muted-foreground">{problem.description}</p>
        </div>

        {problem.explanation && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Explanation</h3>
            <p className="text-sm">{problem.explanation}</p>
          </div>
        )}

        {problem.example && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Example</h3>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code className="text-sm">{problem.example}</code>
            </pre>
          </div>
        )}
      </div>

      <SolutionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        solution={problem.example || ''}
        testCases={[
          '// Test case 1',
          '// Test case 2',
          '// Test case 3'
        ]}
      />
    </>
  )
} 