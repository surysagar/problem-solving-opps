src/types/index.ts


export interface Problem {
  id: string
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  solution: string
  category: string
  testCases: {
    input: string
    output: string
  }[]
} 