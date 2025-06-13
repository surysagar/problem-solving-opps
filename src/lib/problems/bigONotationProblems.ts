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
// ... 22 more problems will be added here ...
] 