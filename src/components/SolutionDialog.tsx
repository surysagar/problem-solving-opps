'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface SolutionDialogProps {
  isOpen: boolean
  onClose: () => void
  solution: string
  testCases?: string[]
}

export default function SolutionDialog({ isOpen, onClose, solution, testCases }: SolutionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px]">
        <DialogHeader>
          <DialogTitle>Solution</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 overflow-y-auto h-[calc(600px-80px)] pr-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Implementation</h3>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code className="text-sm">{solution}</code>
            </pre>
          </div>
          {testCases && testCases.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Test Cases</h3>
              <div className="space-y-2">
                {testCases.map((testCase, index) => (
                  <pre key={index} className="bg-muted p-2 rounded-md text-sm">
                    {testCase}
                  </pre>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 