'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

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
  { id: 'filters', label: 'Filters, Map, Reducer' },
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
  { id: 'oops-concepts', label: 'OOPs Concepts' },
  { id: 'misc', label: 'Misc' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'aws-services', label: 'AWS Services' },
  { id: 'react-next', label: 'React-Next' },
  { id: 'trading', label: 'TRADING' },
  { id: 'responsibilities-communication', label: 'RESPONSIBILITIES-COMMUNICATION' },
  { id: 'css', label: 'CSS' },
  { id: 'jobs', label: 'JOBS' },
  // { id: 'nextjs', label: 'Next.js' }
]

const architectureSubCategories = [
  { id: 'architecture-intermediate', label: 'Intermediate' },
  { id: 'architecture-advanced', label: 'Advanced' },
  { id: 'architecture-deployment', label: 'Deployment' }
]

const nodejsSubCategories = [
  { id: 'node1-general', label: 'General' },
  { id: 'node2-basic', label: 'Basic' },
  { id: 'node3-advanced', label: 'Advanced' }
]

export default function MainSidebar({ onSelectCategory }: MainSidebarProps) {
  const [isArchitectureExpanded, setIsArchitectureExpanded] = useState(false)
  const [isNodejsExpanded, setIsNodejsExpanded] = useState(false)

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
        
        {/* Architecture Accordion */}
        <div className="border-t border-border mt-2 pt-2">
          <button
            onClick={() => setIsArchitectureExpanded(!isArchitectureExpanded)}
            className={cn(
              'w-full px-4 py-2 text-sm text-left transition-colors flex items-center justify-between',
              'hover:bg-accent hover:text-accent-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            <span>Architecture</span>
            <span className={cn(
              'transition-transform duration-200',
              isArchitectureExpanded ? 'rotate-180' : ''
            )}>
              ▼
            </span>
          </button>
          
          {isArchitectureExpanded && (
            <div className="ml-4 space-y-1">
              {architectureSubCategories.map((subCategory) => (
                <button
                  key={subCategory.id}
                  onClick={() => onSelectCategory(subCategory.id)}
                  className={cn(
                    'w-full px-4 py-2 text-sm text-left transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                  )}
                >
                  {subCategory.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Node.js Accordion */}
        <div className="border-t border-border mt-2 pt-2">
          <button
            onClick={() => setIsNodejsExpanded(!isNodejsExpanded)}
            className={cn(
              'w-full px-4 py-2 text-sm text-left transition-colors flex items-center justify-between',
              'hover:bg-accent hover:text-accent-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            <span>NODEJS</span>
            <span className={cn(
              'transition-transform duration-200',
              isNodejsExpanded ? 'rotate-180' : ''
            )}>
              ▼
            </span>
          </button>
          
          {isNodejsExpanded && (
            <div className="ml-4 space-y-1">
              {nodejsSubCategories.map((subCategory) => (
                <button
                  key={subCategory.id}
                  onClick={() => onSelectCategory(subCategory.id)}
                  className={cn(
                    'w-full px-4 py-2 text-sm text-left transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                  )}
                >
                  {subCategory.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 