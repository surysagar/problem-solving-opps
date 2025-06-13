import { Problem } from '@/types'

export const bigONotationProblems: Problem[] = [
  {
    id: 'bigo-1',
    title: 'O(1) - Accessing Array Element',
    description: 'Demonstrate constant time access in an array.',
    difficulty: 'Easy',
    category: 'big-o-notation',
    solution: `// Normal JS
var arr = [10, 20, 30];
console.log(arr[1]); // 20

// ES6
const arrES6 = [10, 20, 30];
console.log(arrES6[1]); // 20`,
    testCases: [
      { input: 'arr = [10, 20, 30]', output: '20' }
    ]
  },
  {
    id: 'bigo-2',
    title: 'O(n) - Linear Search',
    description: 'Demonstrate linear time search in an array.',
    difficulty: 'Easy',
    category: 'big-o-notation',
    solution: `// Normal JS
var arr = [1, 2, 3, 4, 5];
var found = false;
for (var i = 0; i < arr.length; i++) {
  if (arr[i] === 4) found = true;
}
console.log(found); // true

// ES6
const arrES6 = [1, 2, 3, 4, 5];
const foundES6 = arrES6.includes(4);
console.log(foundES6); // true`,
    testCases: [
      { input: 'arr = [1, 2, 3, 4, 5]', output: 'true' }
    ]
  },
  {
    id: 'bigo-3',
    title: 'O(n^2) - Nested Loop',
    description: 'Demonstrate quadratic time with nested loops.',
    difficulty: 'Easy',
    category: 'big-o-notation',
    solution: `// Normal JS
var arr = [1, 2, 3];
var pairs = [];
for (var i = 0; i < arr.length; i++) {
  for (var j = 0; j < arr.length; j++) {
    pairs.push([arr[i], arr[j]]);
  }
}
console.log(pairs);

// ES6
const arrES6 = [1, 2, 3];
const pairsES6 = arrES6.flatMap(x => arrES6.map(y => [x, y]));
console.log(pairsES6);`,
    testCases: [
      { input: 'arr = [1, 2, 3]', output: '[[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,1],[3,2],[3,3]]' }
    ]
  },
  {
    id: 'bigo-4',
    title: 'O(log n) - Binary Search',
    description: 'Demonstrate logarithmic time with binary search.',
    difficulty: 'Medium',
    category: 'big-o-notation',
    solution: `// Normal JS
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    var mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
console.log(binarySearch([1,2,3,4,5], 4)); // 3

// ES6
const binarySearchES6 = (arr, target) => {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
};
console.log(binarySearchES6([1,2,3,4,5], 4)); // 3`,
    testCases: [
      { input: 'arr = [1,2,3,4,5], target = 4', output: '3' }
    ]
  },
  {
    id: 'bigo-5',
    title: 'O(n^3) - Triple Nested Loop',
    description: 'Demonstrate cubic time with triple nested loops.',
    difficulty: 'Medium',
    category: 'big-o-notation',
    solution: `// Normal JS
var arr = [1,2,3];
var triplets = [];
for (var i = 0; i < arr.length; i++) {
  for (var j = 0; j < arr.length; j++) {
    for (var k = 0; k < arr.length; k++) {
      triplets.push([arr[i], arr[j], arr[k]]);
    }
  }
}
console.log(triplets);

// ES6
const arrES6 = [1,2,3];
const tripletsES6 = arrES6.flatMap(x => arrES6.flatMap(y => arrES6.map(z => [x, y, z])));
console.log(tripletsES6);`,
    testCases: [
      { input: 'arr = [1,2,3]', output: '[[1,1,1],[1,1,2],[1,1,3],...,[3,3,3]]' }
    ]
  },
  {
    id: 'bigo-6',
    title: 'O(n!) - Permutations',
    description: 'Demonstrate factorial time with permutations.',
    difficulty: 'Hard',
    category: 'big-o-notation',
    solution: `// Normal JS
function permute(arr) {
  if (arr.length <= 1) return [arr];
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    var rest = arr.slice(0, i).concat(arr.slice(i+1));
    for (var p of permute(rest)) {
      result.push([arr[i]].concat(p));
    }
  }
  return result;
}
console.log(permute([1,2,3]));

// ES6
const permuteES6 = arr => arr.length <= 1 ? [arr] : arr.flatMap((v, i) => permuteES6([...arr.slice(0,i), ...arr.slice(i+1)]).map(p => [v, ...p]));
console.log(permuteES6([1,2,3]));`,
    testCases: [
      { input: 'arr = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' }
    ]
  },
  {
    id: 'bigo-7',
    title: 'O(2^n) - Fibonacci Recursive',
    description: 'Demonstrate exponential time with naive recursive Fibonacci.',
    difficulty: 'Hard',
    category: 'big-o-notation',
    solution: `// Normal JS
function fib(n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}
console.log(fib(5)); // 5

// ES6
const fibES6 = n => n <= 1 ? n : fibES6(n-1) + fibES6(n-2);
console.log(fibES6(5)); // 5`,
    testCases: [
      { input: 'n = 5', output: '5' }
    ]
  },
  {
    id: 'bigo-8',
    title: 'O(n log n) - Merge Sort',
    description: 'Demonstrate n log n time with merge sort.',
    difficulty: 'Hard',
    category: 'big-o-notation',
    solution: `// Normal JS
function mergeSort(arr) {
  if (arr.length < 2) return arr;
  var mid = Math.floor(arr.length / 2);
  var left = mergeSort(arr.slice(0, mid));
  var right = mergeSort(arr.slice(mid));
  var result = [];
  while (left.length && right.length) {
    result.push(left[0] < right[0] ? left.shift() : right.shift());
  }
  return result.concat(left, right);
}
console.log(mergeSort([3,1,4,2]));

// ES6
const mergeSortES6 = arr => arr.length < 2 ? arr : ((mid = Math.floor(arr.length/2)), left = mergeSortES6(arr.slice(0,mid)), right = mergeSortES6(arr.slice(mid)), [...(function merge(l, r) { let res = []; while(l.length && r.length) res.push(l[0]<r[0]?l.shift():r.shift()); return [...res, ...l, ...r]; })([...left],[...right])]);
console.log(mergeSortES6([3,1,4,2]));`,
    testCases: [
      { input: 'arr = [3,1,4,2]', output: '[1,2,3,4]' }
    ]
  },
  {
    id: 'bigo-quiz-1',
    type: 'quiz',
    title: 'Time Complexity Quiz: logUpTo',
    question: `Determine the **time complexity** for the following function:\n\n\
function logUpTo(n) {\n  for (var i = 1; i <= n; i++) {\n    console.log(i);\n  }\n}`,
    choices: [
      'O(n)',
      'O(n^2)',
      'O(n log n)'
    ],
    correctAnswer: 0,
    explanation: 'The loop runs n times, so the time complexity is O(n).',
  },
  {
    id: 'bigo-quiz-2',
    type: 'quiz',
    title: 'Time Complexity Quiz: logAtMost10',
    question: `Determine the **time complexity** for the following function:\n\n\
function logAtMost10(n) {\n  for (var i = 1; i <= Math.min(n, 10); i++) {\n    console.log(i);\n  }\n}`,
    choices: [
      'O(1)',
      'O(n)',
      'O(n^2)'
    ],
    correctAnswer: 0,
    explanation: 'The loop runs at most 10 times, regardless of n, so the time complexity is O(1).',
  },
  {
    id: 'bigo-quiz-3',
    type: 'quiz',
    title: 'Time Complexity Quiz: logAtLeast10',
    question: `Determine the time complexity for the following function:\n\n\
function logAtLeast10(n) {\n  for (var i = 1; i <= Math.max(n, 10); i++) {\n    console.log(i);\n  }\n}`,
    choices: [
      'O(n)',
      'O(1)',
      'O(n log n)'
    ],
    correctAnswer: 0,
    explanation: 'The loop runs at least 10 times, but for large n it runs n times, so the time complexity is O(n).',
  },
  {
    id: 'bigo-quiz-4',
    type: 'quiz',
    title: 'Time Complexity Quiz: onlyElementsAtEvenIndex',
    question: `Determine the time complexity for the following function:\n\n\
function onlyElementsAtEvenIndex(array) {\n  var newArray = Array(Math.ceil(array.length / 2));\n  for (var i = 0; i < array.length; i++) {\n    if (i % 2 === 0) {\n      newArray[i / 2] = array[i];\n    }\n  }\n  return newArray;\n}`,
    choices: [
      'O(n)',
      'O(1)',
      'O(n^2)'
    ],
    correctAnswer: 0,
    explanation: 'The function iterates through the array once, so the time complexity is O(n).',
  },
  {
    id: 'bigo-quiz-5',
    type: 'quiz',
    title: 'Time Complexity Quiz: subtotals',
    question: `Determine the time complexity for the following function:\n\n\
function subtotals(array) {\n  var subtotalArray = Array(array.length);\n  for (var i = 0; i < array.length; i++) {\n    var subtotal = 0;\n    for (var j = 0; j <= i; j++) {\n      subtotal += array[j];\n    }\n    subtotalArray[i] = subtotal;\n  }\n  return subtotalArray;\n}`,
    choices: [
      'O(1)',
      'O(n)',
      'O(n^2)'
    ],
    correctAnswer: 2,
    explanation: 'There is a nested loop: for each i, the inner loop runs up to i times, resulting in O(n^2) time complexity.',
  },
  {
    id: 'bigo-quiz-6',
    type: 'quiz',
    title: 'Simplify Big O: O(n + 10)',
    question: 'Simplify the big O expression as much as possible - O(n + 10)',
    choices: ['O(n)', 'O(n^2)', 'O(n log n)'],
    correctAnswer: 0,
    explanation: 'In Big O, constants are dropped, so O(n + 10) simplifies to O(n).',
  },
  {
    id: 'bigo-quiz-7',
    type: 'quiz',
    title: 'Simplify Big O: O(100 * n)',
    question: 'Simplify the big O expression as much as possible - O(100 * n)',
    choices: ['O(2n)', 'O(1)', 'O(n)'],
    correctAnswer: 2,
    explanation: 'In Big O, constant factors are dropped, so O(100 * n) simplifies to O(n).',
  },
  {
    id: 'bigo-quiz-8',
    type: 'quiz',
    title: 'Simplify Big O: O(25)',
    question: 'Simply the following big O expression as much as possible - O(25)',
    choices: ['O(n)', 'O(n!)', 'O(1)'],
    correctAnswer: 2,
    explanation: 'O(25) is a constant, so it simplifies to O(1).',
  },
  {
    id: 'bigo-quiz-9',
    type: 'quiz',
    title: 'Simplify Big O: O(n^2 + n^3)',
    question: 'Simply the following big O expression as much as possible - O(n^2 + n^3)',
    choices: ['O(n^2)', 'O(n)', 'O(n^3)'],
    correctAnswer: 2,
    explanation: 'In Big O, the highest order term dominates, so O(n^2 + n^3) simplifies to O(n^3).',
  },
  {
    id: 'bigo-quiz-10',
    type: 'quiz',
    title: 'Simplify Big O: O(n + n + n + n)',
    question: 'Simply the following big O expression as much as possible - O(n + n + n + n)',
    choices: ['O(4n)', 'O(n)', 'O(n^2)'],
    correctAnswer: 1,
    explanation: 'O(n + n + n + n) = O(4n), but constants are dropped, so it simplifies to O(n).',
  },
  {
    id: 'bigo-quiz-11',
    type: 'quiz',
    title: 'Space Complexity Quiz: logUpTo',
    question: `Determine the space complexity for the following function:\n\n\
function logUpTo(n) {\n  for (var i = 1; i <= n; i++) {\n    console.log(i);\n  }\n}`,
    choices: [
      'O(1)',
      'O(n)',
      'O(n log n)'
    ],
    correctAnswer: 0,
    explanation: 'The function only uses a constant amount of extra space, regardless of n, so the space complexity is O(1).',
  },
  {
    id: 'bigo-quiz-12',
    type: 'quiz',
    title: 'Space Complexity Quiz: logAtMost10',
    question: `Determine the space complexity for the following function:\n\n\
function logAtMost10(n) {\n  for (var i = 1; i <= Math.min(n, 10); i++) {\n    console.log(i);\n  }\n}`,
    choices: [
      'O(1)',
      'O(n)',
      'O(n log n)'
    ],
    correctAnswer: 0,
    explanation: 'The function only uses a constant amount of extra space, regardless of n, so the space complexity is O(1).',
  },
  {
    id: 'bigo-quiz-13',
    type: 'quiz',
    title: 'Space Complexity Quiz: logAtMost10 (repeat)',
    question: `Determine the space complexity for the following function:\n\n\
function logAtMost10(n) {\n  for (var i = 1; i <= Math.min(n, 10); i++) {\n    console.log(i);\n  }\n}`,
    choices: [
      'O(1)',
      'O(n)',
      'O(n log n)'
    ],
    correctAnswer: 0,
    explanation: 'The function only uses a constant amount of extra space, regardless of n, so the space complexity is O(1).',
  },
  {
    id: 'bigo-quiz-14',
    type: 'quiz',
    title: 'Space Complexity Quiz: onlyElementsAtEvenIndex',
    question: `Determine the space complexity for the following function:\n\n\
function onlyElementsAtEvenIndex(array) {\n  var newArray = Array(Math.ceil(array.length / 2));\n  for (var i = 0; i < array.length; i++) {\n    if (i % 2 === 0) {\n      newArray[i / 2] = array[i];\n    }\n  }\n  return newArray;\n}`,
    choices: [
      'O(n)',
      'O(n log n)',
      'O(n^2)'
    ],
    correctAnswer: 0,
    explanation: 'The function creates a new array of size n/2, which is O(n) space complexity.',
  },
  {
    id: 'bigo-quiz-15',
    type: 'quiz',
    title: 'Space Complexity Quiz: subtotals',
    question: `Determine the space complexity for the following function:\n\n\
function subtotals(array) {\n  var subtotalArray = Array(array.length);\n  for (var i = 0; i < array.length; i++) {\n    var subtotal = 0;\n    for (var j = 0; j <= i; j++) {\n      subtotal += array[j];\n    }\n    subtotalArray[i] = subtotal;\n  }\n  return subtotalArray;\n}`,
    choices: [
      'O(1)',
      'O(n)',
      'O(n^2)'
    ],
    correctAnswer: 1,
    explanation: 'The function creates a new array of size n, so the space complexity is O(n).',
  },
  // ... 20 more problems will be added here ...
] 