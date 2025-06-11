'use client'

import * as Toggle from '@radix-ui/react-toggle'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SolutionToggleProps {
  showSolution: boolean
  onToggle: () => void
}

export default function SolutionToggle({ showSolution, onToggle }: SolutionToggleProps) {
  return (
    <Toggle.Root
      pressed={showSolution}
      onPressedChange={onToggle}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-colors',
        'hover:bg-muted hover:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground'
      )}
    >
      {showSolution ? (
        <>
          <EyeOff className="mr-2 h-4 w-4" />
          Hide Solution
        </>
      ) : (
        <>
          <Eye className="mr-2 h-4 w-4" />
          Show Solution
        </>
      )}
    </Toggle.Root>
  )
} 