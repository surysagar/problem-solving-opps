import { Problem } from '@/types'

export const sortingProblems: Problem[] = [
  {
    id: 'sorting-1',
    title: 'Quick Sort',
    description: `Implement the quick sort algorithm.`,
    difficulty: 'Medium',
    solution: `function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[0];
  const left: number[] = [];
  const right: number[] = [];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    testCases: [
      {
        input: 'arr = [3, 1, 4, 1, 5, 9, 2, 6]',
        output: '[1, 1, 2, 3, 4, 5, 6, 9]'
      }
    ]
  }
] 