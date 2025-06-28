'use client'

import { useState } from 'react'
import { Problem } from '@/types'

interface AddCardDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddCard: (newProblem: Problem) => void
  category: string
}

export default function AddCardDialog({ isOpen, onClose, onAddCard, category }: AddCardDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    solution: '',
    explanation: '',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newProblem: Problem = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      solution: formData.solution,
      explanation: formData.explanation,
      difficulty: formData.difficulty,
      category: category,
      testCases: []
    }

    onAddCard(newProblem)
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      solution: '',
      explanation: '',
      difficulty: 'Medium'
    })
    
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add New Card</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) => handleInputChange('difficulty', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Solution *
            </label>
            <textarea
              value={formData.solution}
              onChange={(e) => handleInputChange('solution', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              rows={8}
              placeholder="// Your code solution here..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Explanation
            </label>
            <textarea
              value={formData.explanation}
              onChange={(e) => handleInputChange('explanation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Explain the solution..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Card
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 