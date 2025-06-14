'use client'

import { cn } from '@/lib/utils'

interface MainSidebarProps {
  onSelectCategory: (category: string) => void
}

const categories = [
  { id: 'recursion', label: 'Recursion' },
  { id: 'arrays', label: 'Arrays' },
  { id: 'strings', label: 'Strings' },
  { id: 'nested-array-mutation-spread', label: 'Nested Array Mutation' },
  { id: 'sorting', label: 'Sorting' },
  { id: 'loop', label: 'Loops' },
  { id: 'filters', label: 'Filters' },
  { id: 'polyfills', label: 'Polyfills' },
  { id: 'object-array-mix', label: 'Object Array Mix' },
  { id: 'functions-closures', label: 'Functions & Closures' },
  { id: 'this-keyword', label: 'This Keyword' },
  { id: 'prototypes', label: 'Prototypes' },
  { id: 'async-await', label: 'Async/Await' },
  { id: 'generators', label: 'Generators' },
  { id: 'iterators', label: 'Iterators' },
  { id: 'promises', label: 'Promises' },
  { id: 'big-o-notation', label: 'Big O Notation' },
  { id: 'weired-js', label: 'Weird JS' },
  { id: 'oops-concepts', label: 'OOPs Concepts' }
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