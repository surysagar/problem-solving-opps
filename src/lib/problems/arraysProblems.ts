import { Problem } from '@/types'

export const arraysProblems: Problem[] = [
  {
    id: '1',
    title: 'Array Basics',
    description: 'Learn basic array operations and methods',
    difficulty: 'Easy',
    category: 'arrays',
    explanation: 'Arrays are ordered collections that can store multiple values of any type.',
    example: `const arr = [1, 2, 3, 4, 5];
console.log(arr.length); // ➤ 5
console.log(arr[0]); // ➤ 1
arr.push(6); // Add to end
arr.unshift(0); // Add to start
console.log(arr); // ➤ [0, 1, 2, 3, 4, 5, 6]`
  },
  {
    id: '2',
    title: 'Array Methods',
    description: 'Learn common array methods like map, filter, reduce',
    difficulty: 'Easy',
    category: 'arrays',
    explanation: 'JavaScript provides powerful methods for array manipulation.',
    example: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const even = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(doubled); // ➤ [2, 4, 6, 8, 10]
console.log(even); // ➤ [2, 4]
console.log(sum); // ➤ 15`
  },
  {
    id: '3',
    title: 'Array Sorting',
    description: 'Learn how to sort arrays',
    difficulty: 'Medium',
    category: 'arrays',
    explanation: 'Arrays can be sorted using the sort() method with custom comparison functions.',
    example: `const numbers = [5, 2, 8, 1, 9];
numbers.sort((a, b) => a - b); // Ascending
console.log(numbers); // ➤ [1, 2, 5, 8, 9]

const strings = ['banana', 'apple', 'cherry'];
strings.sort(); // Alphabetical
console.log(strings); // ➤ ['apple', 'banana', 'cherry']`
  },
  {
    id: '4',
    title: 'Array Search',
    description: 'Learn how to search in arrays',
    difficulty: 'Medium',
    category: 'arrays',
    explanation: 'Arrays provide methods like indexOf, includes, and find for searching elements.',
    example: `const arr = [1, 2, 3, 4, 5];
console.log(arr.indexOf(3)); // ➤ 2
console.log(arr.includes(6)); // ➤ false
const found = arr.find(n => n > 3);
console.log(found); // ➤ 4`
  },
  {
    id: '5',
    title: 'Array Manipulation',
    description: 'Learn advanced array manipulation techniques',
    difficulty: 'Medium',
    category: 'arrays',
    explanation: 'Arrays can be manipulated using methods like slice, splice, and concat.',
    example: `const arr = [1, 2, 3, 4, 5];
const sliced = arr.slice(1, 4); // Get elements from index 1 to 3
arr.splice(2, 1, 6); // Remove 1 element at index 2 and insert 6
const combined = arr.concat([7, 8]); // Combine arrays
console.log(sliced); // ➤ [2, 3, 4]
console.log(arr); // ➤ [1, 2, 6, 4, 5]
console.log(combined); // ➤ [1, 2, 6, 4, 5, 7, 8]`
  },
  {
    id: '6',
    title: 'Array Iteration',
    description: 'Learn different ways to iterate over arrays',
    difficulty: 'Easy',
    category: 'arrays',
    explanation: 'Arrays can be iterated using for loops, forEach, for...of, and other methods.',
    example: `const arr = [1, 2, 3, 4, 5];

// forEach
arr.forEach((num, index) => {
  console.log(\`\${index}: \${num}\`);
});

// for...of
for (const num of arr) {
  console.log(num);
}

// map
const doubled = arr.map(num => num * 2);
console.log(doubled); // ➤ [2, 4, 6, 8, 10]`
  }
] 