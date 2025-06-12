import { Problem } from '@/types'

export const nestedArrayMutationProblems: Problem[] = [
  {
    id: 'nested-array-1',
    title: 'Deep Clone Nested Array',
    description: `Create a deep clone of a nested array using spread operator and map.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const original = [1, [2, 3], [4, [5, 6]]];
const deepClone = original.map(item => 
  Array.isArray(item) ? [...item].map(subItem => 
    Array.isArray(subItem) ? [...subItem] : subItem
  ) : item
);
console.log(deepClone); // [1, [2, 3], [4, [5, 6]]]`,
    testCases: [
      {
        input: 'original = [1, [2, 3], [4, [5, 6]]]',
        output: '[1, [2, 3], [4, [5, 6]]]'
      }
    ]
  },
  {
    id: 'nested-array-2',
    title: 'Flatten Nested Array',
    description: `Flatten a nested array using spread operator and reduce.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const nested = [1, [2, 3], [4, [5, 6]]];
const flatten = arr => arr.reduce((flat, item) => 
  Array.isArray(item) ? [...flat, ...flatten(item)] : [...flat, item], 
[]);
console.log(flatten(nested)); // [1, 2, 3, 4, 5, 6]`,
    testCases: [
      {
        input: 'nested = [1, [2, 3], [4, [5, 6]]]',
        output: '[1, 2, 3, 4, 5, 6]'
      }
    ]
  },
  {
    id: 'nested-array-3',
    title: 'Update Nested Object in Array',
    description: `Update a nested object property in an array using spread operator.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const users = [
  { id: 1, profile: { name: 'John', age: 30 } },
  { id: 2, profile: { name: 'Jane', age: 25 } }
];
const updated = users.map(user => 
  user.id === 1 
    ? { ...user, profile: { ...user.profile, age: 31 } }
    : user
);
console.log(updated); // Updated age for user with id 1`,
    testCases: [
      {
        input: `users = [
  { id: 1, profile: { name: 'John', age: 30 } },
  { id: 2, profile: { name: 'Jane', age: 25 } }
]`,
        output: `[
  { id: 1, profile: { name: 'John', age: 31 } },
  { id: 2, profile: { name: 'Jane', age: 25 } }
]`
      }
    ]
  },
  {
    id: 'nested-array-4',
    title: 'Merge Nested Arrays',
    description: `Merge two nested arrays while preserving structure.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const arr1 = [1, [2, 3], [4, 5]];
const arr2 = [6, [7, 8], [9, 10]];
const merged = [...arr1, ...arr2];
console.log(merged); // [1, [2, 3], [4, 5], 6, [7, 8], [9, 10]]`,
    testCases: [
      {
        input: 'arr1 = [1, [2, 3], [4, 5]]; arr2 = [6, [7, 8], [9, 10]]',
        output: '[1, [2, 3], [4, 5], 6, [7, 8], [9, 10]]'
      }
    ]
  },
  {
    id: 'nested-array-5',
    title: 'Deep Merge Objects in Array',
    description: `Deep merge objects within an array using spread operator.`,
    difficulty: 'Hard',
    category: 'nested-array-mutation-spread',
    solution: `const items = [
  { id: 1, data: { a: 1, b: 2 } },
  { id: 2, data: { c: 3, d: 4 } }
];
const merged = items.map(item => ({
  ...item,
  data: { ...item.data, extra: 'value' }
}));
console.log(merged); // Objects with extra property in data`,
    testCases: [
      {
        input: `items = [
  { id: 1, data: { a: 1, b: 2 } },
  { id: 2, data: { c: 3, d: 4 } }
]`,
        output: `[
  { id: 1, data: { a: 1, b: 2, extra: 'value' } },
  { id: 2, data: { c: 3, d: 4, extra: 'value' } }
]`
      }
    ]
  },
  {
    id: 'nested-array-6',
    title: 'Filter and Transform Nested Array',
    description: `Filter and transform elements in a nested array.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const data = [1, [2, 3], [4, 5], 6];
const result = data
  .filter(item => Array.isArray(item))
  .map(arr => arr.map(num => num * 2));
console.log(result); // [[4, 6], [8, 10]]`,
    testCases: [
      {
        input: 'data = [1, [2, 3], [4, 5], 6]',
        output: '[[4, 6], [8, 10]]'
      }
    ]
  },
  {
    id: 'nested-array-7',
    title: 'Remove Element from Nested Array',
    description: `Remove an element from a nested array while preserving structure.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const arr = [1, [2, 3, 4], [5, 6]];
const removeFromNested = (arr, value) => 
  arr.map(item => Array.isArray(item) 
    ? item.filter(x => x !== value)
    : item
  );
console.log(removeFromNested(arr, 3)); // [1, [2, 4], [5, 6]]`,
    testCases: [
      {
        input: 'arr = [1, [2, 3, 4], [5, 6]]',
        output: '[1, [2, 4], [5, 6]]'
      }
    ]
  },
  {
    id: 'nested-array-8',
    title: 'Group Nested Array Elements',
    description: `Group elements from a nested array based on a condition.`,
    difficulty: 'Hard',
    category: 'nested-array-mutation-spread',
    solution: `const data = [[1, 2], [3, 4], [5, 6]];
const grouped = data.reduce((acc, curr) => {
  const [even, odd] = curr.reduce(([e, o], num) => 
    num % 2 === 0 ? [[...e, num], o] : [e, [...o, num]], 
    [[], []]
  );
  return {
    even: [...acc.even, ...even],
    odd: [...acc.odd, ...odd]
  };
}, { even: [], odd: [] });
console.log(grouped); // { even: [2, 4, 6], odd: [1, 3, 5] }`,
    testCases: [
      {
        input: 'data = [[1, 2], [3, 4], [5, 6]]',
        output: '{ even: [2, 4, 6], odd: [1, 3, 5] }'
      }
    ]
  },
  {
    id: 'nested-array-9',
    title: 'Transform Nested Array Structure',
    description: `Transform a nested array into a different structure.`,
    difficulty: 'Hard',
    category: 'nested-array-mutation-spread',
    solution: `const input = [[1, 2], [3, 4], [5, 6]];
const transformed = input.reduce((acc, [first, second]) => ({
  ...acc,
  [first]: second
}), {});
console.log(transformed); // { 1: 2, 3: 4, 5: 6 }`,
    testCases: [
      {
        input: 'input = [[1, 2], [3, 4], [5, 6]]',
        output: '{ 1: 2, 3: 4, 5: 6 }'
      }
    ]
  },
  {
    id: 'nested-array-10',
    title: 'Deep Compare Nested Arrays',
    description: `Compare two nested arrays for equality using spread and recursion.`,
    difficulty: 'Hard',
    category: 'nested-array-mutation-spread',
    solution: `const isEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => {
    if (Array.isArray(item) && Array.isArray(arr2[index])) {
      return isEqual(item, arr2[index]);
    }
    return item === arr2[index];
  });
};
const arr1 = [1, [2, 3], [4, [5, 6]]];
const arr2 = [1, [2, 3], [4, [5, 6]]];
console.log(isEqual(arr1, arr2)); // true`,
    testCases: [
      {
        input: 'arr1 = [1, [2, 3], [4, [5, 6]]]; arr2 = [1, [2, 3], [4, [5, 6]]]',
        output: 'true'
      }
    ]
  }
] 