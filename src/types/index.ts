export interface NormalProblem {
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
  explanation?: string
}

export interface QuizProblem {
  id: string
  type: 'quiz'
  title: string
  question: string
  choices: string[]
  correctAnswer: number
  explanation?: string
  category?: string
}

export type Problem = NormalProblem | QuizProblem 