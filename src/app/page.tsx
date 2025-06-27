'use client'

import { useState, useEffect } from 'react'
import { Problem } from '@/types'
import { problems } from '@/lib/problems'
import ProblemCard from '@/components/ProblemCard'
import ProblemDialog from '@/components/ProblemDialog'
import AddCardDialog from '@/components/AddCardDialog'
import CodeGenerator from '@/components/CodeGenerator'
import MainSidebar from '@/components/MainSidebar'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('recursion')
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAddCardOpen, setIsAddCardOpen] = useState(false)
  const [isCodeGeneratorOpen, setIsCodeGeneratorOpen] = useState(false)
  const [customProblems, setCustomProblems] = useState<Record<string, Problem[]>>({})
  const [selectedProblemForCode, setSelectedProblemForCode] = useState<Problem | null>(null)

  

  

  const baseProblems = problems[selectedCategory] || []
  const userProblems = customProblems[selectedCategory] || []
  const categoryProblems = [...userProblems, ...baseProblems]

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

  const handleAddCard = (newProblem: Problem) => {
    setCustomProblems(prev => ({
      ...prev,
      [selectedCategory]: [newProblem, ...(prev[selectedCategory] || [])]
    }))
  }

  const handleDeleteCard = (problemId: string) => {
    setCustomProblems(prev => ({
      ...prev,
      [selectedCategory]: (prev[selectedCategory] || []).filter(p => p.id !== problemId)
    }))
  }

  const handleGenerateCode = (problem: Problem) => {
    setSelectedProblemForCode(problem)
    setIsCodeGeneratorOpen(true)
  }

  const handleCloseCodeGenerator = () => {
    setIsCodeGeneratorOpen(false)
    setSelectedProblemForCode(null)
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
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold capitalize">{selectedCategory.replace(/-/g, ' ')} Problems</h1>
              {userProblems.length > 0 && (
                <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                  {userProblems.length} custom card{userProblems.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsAddCardOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add New Card
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryProblems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                onClick={() => handleProblemClick(problem)}
                onDelete={handleDeleteCard}
                onGenerateCode={handleGenerateCode}
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

      <AddCardDialog
        isOpen={isAddCardOpen}
        onClose={() => setIsAddCardOpen(false)}
        onAddCard={handleAddCard}
        category={selectedCategory}
      />

      {isCodeGeneratorOpen && selectedProblemForCode && (
        <CodeGenerator
          isOpen={isCodeGeneratorOpen}
          onClose={handleCloseCodeGenerator}
          problem={selectedProblemForCode}
          category={selectedCategory}
        />
      )}
    </div>
  )
} 