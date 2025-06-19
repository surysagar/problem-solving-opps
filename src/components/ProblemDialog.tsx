'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Problem, QuizProblem } from '@/types'
import CodeEditor from './CodeEditor'
import { useState, useEffect } from 'react'

interface ProblemDialogProps {
  isOpen: boolean
  onClose: () => void
  problem: Problem
  problems?: Problem[] // Optional: all problems in the current category
  currentIndex?: number // Optional: index of the current problem
  onSlide?: (newIndex: number) => void // Optional: callback to slide
}

function isNormalProblem(problem: Problem): problem is import('@/types').NormalProblem {
  return (problem as any).description !== undefined;
}

export default function ProblemDialog({ isOpen, onClose, problem, problems, currentIndex, onSlide }: ProblemDialogProps) {
  const [code, setCode] = useState(() => {
    if (isNormalProblem(problem)) {
      return problem.solution || ''
    }
    return ''
  })
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  // Reset code when problem changes
  useEffect(() => {
    if (isNormalProblem(problem)) {
      setCode(problem.solution || '')
    } else {
      setCode('')
    }
  }, [problem])

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  // Quiz rendering
  if ('type' in problem && problem.type === 'quiz') {
    const quiz = problem as QuizProblem
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[90vw] h-[600px] p-0 overflow-y-auto">
          <div className="flex h-full min-h-0">
            {/* Quiz Section (left) */}
            <div className="w-1/2 p-6 space-y-6 border-r overflow-y-auto max-h-[600px]">
              <h2 className="text-lg font-semibold mb-2">{quiz.title}</h2>
              <div className="mb-4 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: quiz.question.replace(/\n/g, '<br/>').replace(/```js([\s\S]*?)```/g, '<pre><code>$1</code></pre>') }} />
              <div className="space-y-2">
                {quiz.choices.map((choice, idx) => (
                  <label key={idx} className={`flex items-center p-2 border rounded cursor-pointer ${selected === idx ? 'border-primary' : 'border-muted'}`}>
                    <input
                      type="radio"
                      name="quiz-choice"
                      checked={selected === idx}
                      onChange={() => { setSelected(idx); setAnswered(true); }}
                      className="mr-2"
                    />
                    <span>{choice}</span>
                  </label>
                ))}
              </div>
              {answered && (
                <div className="mt-4">
                  {selected === quiz.correctAnswer ? (
                    <span className="text-green-600 font-semibold">Correct!</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Incorrect.</span>
                  )}
                </div>
              )}
            </div>
            {/* Explanation Section (right) */}
            <div className="w-1/2 p-6 flex items-center justify-center overflow-y-auto max-h-[600px]">
              {answered && quiz.explanation && (
                <div className="bg-muted rounded p-4 text-sm text-muted-foreground max-w-md">
                  <span className="font-semibold block mb-2">Explanation:</span>
                  {quiz.explanation}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Normal problem rendering
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] h-[90vh] p-0 overflow-hidden">
        {/* Title Header */}
        <div className="px-4 py-1 border-b bg-background overflow-hidden">
          <h2 className="text-lg font-semibold break-words">{problem.title}</h2>
        </div>
        {/* Slider Controls */}
        {problems && typeof currentIndex === 'number' && onSlide && (
          <div className="flex justify-between items-center px-3 py-1 border-b bg-muted overflow-hidden">
            <button
              className="px-2 py-0.5 text-sm rounded disabled:opacity-50 border"
              onClick={() => onSlide(currentIndex - 1)}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <span className="text-sm whitespace-nowrap">{currentIndex + 1} / {problems.length}</span>
            <button
              className="px-2 py-0.5 text-sm rounded disabled:opacity-50 border"
              onClick={() => onSlide(currentIndex + 1)}
              disabled={currentIndex === problems.length - 1}
            >
              Next
            </button>
          </div>
        )}
        <div className="flex h-full min-w-0">
          {/* Editor Section */}
          <div className="w-1/2 border-r min-w-[600px] max-w-[800px] flex-shrink-0">
            <div className="h-[600px] overflow-hidden">
              <CodeEditor
                value={code}
                onChange={handleEditorChange}
              />
            </div>
          </div>

          {/* Solution Section */}
          <div className="flex-1 min-w-0">
            <div className="h-[600px] overflow-y-auto p-4 overflow-x-hidden w-full">
              <div className="space-y-6 w-full">
                {isNormalProblem(problem) && (
                  <>
                    <div className="space-y-2 w-full">
                      <h3 className="text-sm font-medium break-words">Description</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
                        {problem.description}
                      </p>
                    </div>
                    <div className="space-y-2 w-full">
                      <h3 className="text-sm font-medium break-words">Test Cases</h3>
                      <div className="space-y-2 w-full">
                        {Array.isArray(problem.testCases) && problem.testCases.length > 0 ? (
                          problem.testCases.map((testCase, index) => (
                            <div key={index} className="rounded-md bg-muted p-4 w-full overflow-hidden">
                              <div className="space-y-1 w-full">
                                <p className="text-sm font-medium break-words">Input:</p>
                                <pre className="text-sm text-muted-foreground break-words whitespace-pre-wrap overflow-x-auto">{testCase.input}</pre>
                              </div>
                              <div className="mt-2 space-y-1 w-full">
                                <p className="text-sm font-medium break-words">Output:</p>
                                <pre className="text-sm text-muted-foreground break-words whitespace-pre-wrap overflow-x-auto">{testCase.output}</pre>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground break-words">No test cases available.</div>
                        )}
                      </div>
                    </div>
                    {/* Explanation Section */}
                    {problem.explanation && (
                      <div className="space-y-2 w-full">
                        <h3 className="text-sm font-medium break-words">Explanation</h3>
                        <div className="bg-muted rounded p-4 text-sm text-muted-foreground w-full overflow-hidden">
                          <div className="break-words whitespace-pre-wrap">{problem.explanation}</div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 