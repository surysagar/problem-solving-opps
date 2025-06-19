'use client'

import { useState } from 'react'
import { Problem } from '@/types'
import { problems } from '@/lib/problems'
import ProblemCard from '@/components/ProblemCard'
import ProblemDialog from '@/components/ProblemDialog'
import MainSidebar from '@/components/MainSidebar'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('recursion')
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const categoryProblems = problems[selectedCategory] || []

  const handleProblemClick = (problem: Problem) => {
    const idx = categoryProblems.findIndex(p => p.id === problem.id)
    setCurrentIndex(idx)
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setCurrentIndex(null)
  }

  const handleSlide = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < categoryProblems.length) {
      setCurrentIndex(newIndex)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Sidebar */}
      <div className="w-[200px] h-screen bg-background border-r overflow-y-auto">
        <MainSidebar onSelectCategory={setSelectedCategory} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6 capitalize">{selectedCategory.replace(/-/g, ' ')} Problems</h1>
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

      {currentIndex !== null && categoryProblems[currentIndex] && (
        <ProblemDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          problem={categoryProblems[currentIndex]}
          problems={categoryProblems}
          currentIndex={currentIndex}
          onSlide={handleSlide}
        />
      )}
    </div>
  )
} 