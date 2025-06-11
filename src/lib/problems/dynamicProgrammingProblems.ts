import { Problem } from '@/types'

export const dynamicProgrammingProblems: Problem[] = [
  {
    id: 'dp-1',
    title: 'Climbing Stairs',
    description: `You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    difficulty: 'Easy',
    solution: `function climbStairs(n: number): number {
  if (n <= 2) return n;
  
  let prev = 1;
  let curr = 2;
  
  for (let i = 3; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  
  return curr;
}`,
    testCases: [
      {
        input: 'n = 3',
        output: '3'
      },
      {
        input: 'n = 4',
        output: '5'
      }
    ]
  }
] 