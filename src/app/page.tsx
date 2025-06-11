'use client'

import { useState } from 'react'
import { Problem } from '@/types'
import { problems } from '@/lib/problems'
import ProblemCard from '@/components/ProblemCard'
import ProblemDialog from '@/components/ProblemDialog'
import MainSidebar from '@/components/MainSidebar'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('recursion')
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleProblemClick = (problem: Problem) => {
    setSelectedProblem(problem)
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedProblem(null)
  }

  const categoryProblems = problems[selectedCategory] || []

  return (
    <div className="flex h-screen">
      {/* Main Sidebar */}
      <div className="w-[120px] h-screen bg-background border-r">
        <MainSidebar onSelectCategory={setSelectedCategory} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6 capitalize">{selectedCategory.replace('-', ' ')} Problems</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryProblems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                onClick={() => handleProblemClick(problem)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedProblem && (
        <ProblemDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          problem={selectedProblem}
        />
      )}
    </div>
  )
} 