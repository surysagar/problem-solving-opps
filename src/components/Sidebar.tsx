'use client'

import { useState } from 'react'

export interface Problem {
  id: string
  title: string
  description: string
  difficulty: 'basic' | 'intermediate' | 'advanced' | 'tricky'
  category: string
  explanation?: string
  example?: string
}

export const problems: Problem[] = [
  // Recursion Problems
  { 
    id: '1', 
    title: 'Basic Recursion Structure',
    description: 'Understanding the three parts of a recursive function',
    difficulty: 'basic',
    category: 'recursion',
    explanation: 'A recursive function has three crucial parts: 1) Function Declaration, 2) Base Case, and 3) Recursive Call. The base case stops the recursion, while the recursive call handles the function calling itself.',
    example: `function recursion() {
    if (condition) {       // Base case
        return;            // Stop recursion
    }
    // Function code
    recursion();          // Recursive call
}`
  },
  { 
    id: '2', 
    title: 'Factorial',
    description: 'Calculate factorial using recursion',
    difficulty: 'basic',
    category: 'recursion',
    explanation: 'The factorial of a number n is the product of all positive integers less than or equal to n. The base case is when n is 0 or 1, returning 1.',
    example: `function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`
  },
  { 
    id: '3', 
    title: 'Fibonacci',
    description: 'Generate Fibonacci sequence using recursion',
    difficulty: 'basic',
    category: 'recursion',
    explanation: 'The Fibonacci sequence is a series where each number is the sum of the two preceding ones. The base cases are when n is 0 or 1.',
    example: `function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}`
  },
  { 
    id: '4', 
    title: 'Sum of Natural Numbers',
    description: 'Calculate sum of first n natural numbers using recursion',
    difficulty: 'basic',
    category: 'recursion',
    explanation: 'The sum of first n natural numbers can be calculated recursively by adding n to the sum of (n-1) numbers. The base case is when n is 0.',
    example: `function sumOfNaturalNumbers(n) {
    if (n === 0) {
        return 0;
    }
    return n + sumOfNaturalNumbers(n - 1);
}`
  },
  { 
    id: '5', 
    title: 'Countdown',
    description: 'Create a countdown using recursion',
    difficulty: 'basic',
    category: 'recursion',
    explanation: 'A countdown function prints numbers from n down to 1, then prints "Done!". The base case is when n reaches 0.',
    example: `function countdown(n) {
    if (n <= 0) {
        console.log("Done!");
        return;
    }
    console.log(n);
    countdown(n - 1);
}`
  },
  { 
    id: '6', 
    title: 'Power Function',
    description: 'Calculate x raised to power n using recursion',
    difficulty: 'intermediate',
    category: 'recursion',
    explanation: 'The power function calculates x^n by multiplying x by itself n times. The base case is when n is 0, returning 1.',
    example: `function power(x, n) {
    if (n === 0) {
        return 1;
    }
    return x * power(x, n - 1);
}`
  },
  { 
    id: '7', 
    title: 'GCD',
    description: 'Find Greatest Common Divisor using recursion',
    difficulty: 'intermediate',
    category: 'recursion',
    explanation: 'The GCD of two numbers can be found using Euclid\'s algorithm. The base case is when the second number is 0.',
    example: `function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}`
  },
  { 
    id: '8', 
    title: 'Tower of Hanoi',
    description: 'Solve Tower of Hanoi puzzle using recursion',
    difficulty: 'advanced',
    category: 'recursion',
    explanation: 'The Tower of Hanoi is a mathematical puzzle where we need to move disks from one rod to another, following specific rules. The base case is when there\'s only one disk.',
    example: `function towerOfHanoi(n, source, auxiliary, target) {
    if (n === 1) {
        console.log(\`Move disk 1 from \${source} to \${target}\`);
        return;
    }
    towerOfHanoi(n - 1, source, target, auxiliary);
    console.log(\`Move disk \${n} from \${source} to \${target}\`);
    towerOfHanoi(n - 1, auxiliary, source, target);
}`
  },
  { 
    id: '9', 
    title: 'Binary Search',
    description: 'Implement binary search using recursion',
    difficulty: 'intermediate',
    category: 'recursion',
    explanation: 'Binary search is an efficient algorithm for finding an element in a sorted array. The base case is when the array is empty or the element is found.',
    example: `function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
        return -1;
    }
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
        return mid;
    }
    if (arr[mid] > target) {
        return binarySearch(arr, target, left, mid - 1);
    }
    return binarySearch(arr, target, mid + 1, right);
}`
  },
  { 
    id: '10', 
    title: 'Merge Sort',
    description: 'Implement merge sort using recursion',
    difficulty: 'advanced',
    category: 'recursion',
    explanation: 'Merge sort is a divide-and-conquer algorithm that recursively splits the array into halves, sorts them, and merges them back. The base case is when the array has 0 or 1 elements.',
    example: `function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}`
  },

  // Intermediate Recursion
  { 
    id: '11', 
    title: 'Binary Search', 
    description: 'Implement binary search using recursion',
    difficulty: 'intermediate',
    category: 'recursion'
  },
  { 
    id: '12', 
    title: 'Merge Sort', 
    description: 'Implement merge sort using recursion',
    difficulty: 'intermediate',
    category: 'recursion'
  },
  { 
    id: '13', 
    title: 'Quick Sort', 
    description: 'Implement quick sort using recursion',
    difficulty: 'intermediate',
    category: 'recursion'
  },
  { 
    id: '14', 
    title: 'Tree Traversal', 
    description: 'Implement tree traversal using recursion',
    difficulty: 'intermediate',
    category: 'recursion'
  },

  // Advanced Recursion
  { 
    id: '15', 
    title: 'N-Queens', 
    description: 'Solve N-Queens problem using recursion',
    difficulty: 'advanced',
    category: 'recursion'
  },
  { 
    id: '16', 
    title: 'Sudoku Solver', 
    description: 'Solve Sudoku puzzle using recursion',
    difficulty: 'advanced',
    category: 'recursion'
  },
  { 
    id: '17', 
    title: 'Word Break', 
    description: 'Word break problem using recursion',
    difficulty: 'advanced',
    category: 'recursion'
  },
  { 
    id: '18', 
    title: 'Permutations', 
    description: 'Generate all permutations using recursion',
    difficulty: 'advanced',
    category: 'recursion'
  },
  { 
    id: '19', 
    title: 'Combinations', 
    description: 'Generate all combinations using recursion',
    difficulty: 'advanced',
    category: 'recursion'
  },

  // Tricky Recursion
  { 
    id: '20', 
    title: 'Ackermann', 
    description: 'Implement Ackermann function',
    difficulty: 'tricky',
    category: 'recursion'
  },
  { 
    id: '21', 
    title: 'Josephus', 
    description: 'Solve Josephus problem using recursion',
    difficulty: 'tricky',
    category: 'recursion'
  },
  { 
    id: '22', 
    title: 'Gray Code', 
    description: 'Generate Gray code using recursion',
    difficulty: 'tricky',
    category: 'recursion'
  },
  { 
    id: '23', 
    title: 'Catalan Numbers', 
    description: 'Generate Catalan numbers using recursion',
    difficulty: 'tricky',
    category: 'recursion'
  },
  { 
    id: '24', 
    title: 'Hilbert Curve', 
    description: 'Generate Hilbert curve using recursion',
    difficulty: 'tricky',
    category: 'recursion'
  },

  // Objects & Arrays Problems
  { 
    id: '25', 
    title: 'Deep Clone',
    description: 'Create a deep clone of an object',
    difficulty: 'basic',
    category: 'objects-arrays'
  },
  { 
    id: '26', 
    title: 'Array Flatten',
    description: 'Flatten a nested array',
    difficulty: 'basic',
    category: 'objects-arrays'
  },
  { 
    id: '27', 
    title: 'Object Merge',
    description: 'Merge two objects deeply',
    difficulty: 'basic',
    category: 'objects-arrays'
  },

  // This Keyword Problems
  { 
    id: '28', 
    title: 'Method Binding',
    description: 'Implement method binding with this',
    difficulty: 'basic',
    category: 'this-keyword'
  },
  { 
    id: '29', 
    title: 'Arrow Functions',
    description: 'Understand this in arrow functions',
    difficulty: 'basic',
    category: 'this-keyword'
  },
  { 
    id: '30', 
    title: 'Constructor',
    description: 'Use this in constructor functions',
    difficulty: 'basic',
    category: 'this-keyword'
  },

  // Closures Problems
  { 
    id: '31', 
    title: 'Counter',
    description: 'Create a counter using closure',
    difficulty: 'basic',
    category: 'closures'
  },
  { 
    id: '32', 
    title: 'Private Variables',
    description: 'Implement private variables using closure',
    difficulty: 'basic',
    category: 'closures'
  },
  { 
    id: '33', 
    title: 'Function Factory',
    description: 'Create a function factory using closure',
    difficulty: 'basic',
    category: 'closures'
  },

  // Strings Problems
  { 
    id: '34', 
    title: 'Palindrome',
    description: 'Check if a string is palindrome',
    difficulty: 'basic',
    category: 'strings'
  },
  { 
    id: '35', 
    title: 'Anagram',
    description: 'Check if two strings are anagrams',
    difficulty: 'basic',
    category: 'strings'
  },
  { 
    id: '36', 
    title: 'String Reverse',
    description: 'Reverse a string without using built-in methods',
    difficulty: 'basic',
    category: 'strings'
  }
]

interface SidebarProps {
  onSelectProblem: (problemId: string) => void
  selectedCategory: string
}

export default function Sidebar({ onSelectProblem, selectedCategory }: SidebarProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleProblemClick = (problemId: string) => {
    setSelectedId(problemId)
    onSelectProblem(problemId)
  }

  // Filter problems based on selected category
  const filteredProblems = problems.filter(p => p.category === selectedCategory)

  return (
    <div className="h-full overflow-y-auto">
      <nav className="space-y-1">
        {filteredProblems.map((problem) => (
          <button
            key={problem.id}
            onClick={() => handleProblemClick(problem.id)}
            className={`w-full text-left px-3 h-[30px] text-sm rounded-md transition-colors flex items-center
              ${selectedId === problem.id
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
              }`}
            title={problem.description}
          >
            <div className="truncate">{problem.title}</div>
          </button>
        ))}
      </nav>
    </div>
  )
} 