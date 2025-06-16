import { Problem } from '@/types'

export const miscProblems: Problem[] = [
  {
    id: 'misc-1',
    title: 'What does [_, v] mean in Object.entries?',
    description: 'Understand array destructuring in Object.entries and why _ is used as a throwaway variable.',
    difficulty: 'Easy',
    category: 'misc',
    solution: `const obj = { a: 50, b: 150, c: 200 };
// Object.entries(obj) → [['a', 50], ['b', 150], ['c', 200]]
const filtered = Object.entries(obj).filter(([_, v]) => v > 100);
console.log(filtered); // [['b', 150], ['c', 200]]
// _ is the key (ignored), v is the value (used)`,
    testCases: [
      { input: 'Object.entries({ a: 50, b: 150, c: 200 }).filter(([_, v]) => v > 100)', output: "[['b', 150], ['c', 200]]" }
    ],
    explanation: `In .filter(([_, v]) => v > 100), _ is a throwaway variable for the key, v is the value. This is a common convention to show the key is unused. You could also write ([key, value]) => value > 100 for clarity.`
  }
]; 