'use client'

import { useState } from 'react'
import { Problem, NormalProblem } from '@/types'

interface CodeGeneratorProps {
  isOpen: boolean
  onClose: () => void
  problem: Problem
  category: string
}

export default function CodeGenerator({ isOpen, onClose, problem, category }: CodeGeneratorProps) {
  const [copied, setCopied] = useState(false)

  const generateCode = () => {
    const categoryName = category.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()) + 'Problems'
    const fileName = `${category}Problems.ts`
    
    // Only handle NormalProblem types for now
    if ('difficulty' in problem) {
      const normalProblem = problem as NormalProblem
      const problemCode = `  {
    id: '${normalProblem.id}',
    title: '${normalProblem.title.replace(/'/g, "\\'")}',
    description: '${normalProblem.description.replace(/'/g, "\\'")}',
    difficulty: '${normalProblem.difficulty}',
    category: '${normalProblem.category}',
    solution: \`${normalProblem.solution.replace(/`/g, '\\`')}\`,
    testCases: [],
    explanation: '${normalProblem.explanation?.replace(/'/g, "\\'") || ''}'
  },`

      const fullCode = `// Add this to the beginning of the array in src/lib/problems/${fileName}
// Insert after: export const ${categoryName}: Problem[] = [

${problemCode}

// Make sure to add a comma after the last existing problem in the array`

      return fullCode
    }
    
    return '// This problem type is not supported for code generation'
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateCode())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add to Problem File</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Copy the code below and add it to the beginning of the array in your problem file:
            </p>
            <div className="bg-gray-100 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  src/lib/problems/{category}Problems.ts
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                <code>{generateCode()}</code>
              </pre>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <h3 className="font-medium text-yellow-800 mb-2">Instructions:</h3>
            <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
              <li>Copy the code above</li>
              <li>Open the file: <code className="bg-yellow-100 px-1 rounded">src/lib/problems/{category}Problems.ts</code></li>
              <li>Find the array declaration: <code className="bg-yellow-100 px-1 rounded">export const {category.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}Problems: Problem[] = [</code></li>
              <li>Paste the code after the opening bracket <code className="bg-yellow-100 px-1 rounded">[</code></li>
              <li>Make sure to add a comma after the last existing problem</li>
              <li>Save the file and restart your development server</li>
            </ol>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 