'use client'

import { cn } from '@/lib/utils'

interface MainSidebarProps {
  onSelectCategory: (category: string) => void
}

const categories = [
  { id: 'recursion', label: 'Recursion' },
  { id: 'arrays', label: 'Arrays' },
  { id: 'strings', label: 'Strings' },
  { id: 'linked-lists', label: 'Linked Lists' },
  { id: 'trees', label: 'Trees' },
  { id: 'graphs', label: 'Graphs' },
  { id: 'dynamic-programming', label: 'DP' },
  { id: 'sorting', label: 'Sorting' },
  { id: 'loop', label: 'Loops' }
]

export default function MainSidebar({ onSelectCategory }: MainSidebarProps) {
  return (
    <div className="h-full py-4">
      <div className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              'w-full px-4 py-2 text-sm text-left transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
} 