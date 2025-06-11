'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Problem } from '@/types'
import CodeEditor from './CodeEditor'
import { useState } from 'react'

interface ProblemDialogProps {
  isOpen: boolean
  onClose: () => void
  problem: Problem
}

export default function ProblemDialog({ isOpen, onClose, problem }: ProblemDialogProps) {
  const [code, setCode] = useState(problem.solution)

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] h-[80vh] p-0">
        <div className="flex h-full">
          {/* Editor Section */}
          <div className="w-1/2 border-r">
            <div className="h-[40px] border-b px-4 flex items-center bg-muted">
              <h3 className="text-sm font-medium">Editor</h3>
            </div>
            <div className="h-[calc(80vh-40px)]">
              <CodeEditor
                value={code}
                onChange={handleEditorChange}
              />
            </div>
          </div>

          {/* Solution Section */}
          <div className="w-1/2">
            <div className="h-[40px] border-b px-4 flex items-center bg-muted">
              <h3 className="text-sm font-medium">Solution</h3>
            </div>
            <div className="h-[calc(80vh-40px)] overflow-y-auto p-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {problem.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Test Cases</h3>
                  <div className="space-y-2">
                    {problem.testCases.map((testCase, index) => (
                      <div key={index} className="rounded-md bg-muted p-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Input:</p>
                          <pre className="text-sm text-muted-foreground">{testCase.input}</pre>
                        </div>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm font-medium">Output:</p>
                          <pre className="text-sm text-muted-foreground">{testCase.output}</pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 