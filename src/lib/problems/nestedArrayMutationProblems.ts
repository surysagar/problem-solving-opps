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
  },
  {
    id: 'nested-array-11',
    title: 'Sort Numbers Without Mutating Original',
    description: `Create a sorted copy of an array without mutating the original array.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const numbers = [5, 1, 8, 3];
const sorted = [...numbers].sort((a, b) => a - b);
console.log(sorted);        // [1, 3, 5, 8]
console.log(numbers);       // [5, 1, 8, 3]`,
    testCases: [
      {
        input: 'numbers = [5, 1, 8, 3]',
        output: '[1, 3, 5, 8]'
      }
    ]
  },
  {
    id: 'nested-array-12',
    title: 'Reverse Array With Mutation',
    description: `Demonstrate array mutation when using reverse() method.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const nums = [10, 20, 30];
const reversed = nums.reverse();
console.log(reversed);  // [30, 20, 10]
console.log(nums);      // [30, 20, 10] (mutated!)`,
    testCases: [
      {
        input: 'nums = [10, 20, 30]',
        output: '[30, 20, 10]'
      }
    ]
  },
  {
    id: 'nested-array-13',
    title: 'Deep Clone Nested Object',
    description: `Create a deep clone of a nested object to avoid mutation.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const user = { name: 'John', address: { city: 'Delhi' } };
const clone = JSON.parse(JSON.stringify(user));
clone.address.city = 'Mumbai';
console.log(user.address.city); // Delhi (not mutated)`,
    testCases: [
      {
        input: `user = { name: 'John', address: { city: 'Delhi' } }`,
        output: 'Delhi'
      }
    ]
  },
  {
    id: 'nested-array-14',
    title: 'Shallow Copy Fails on Nested Object',
    description: `Demonstrate how shallow copy can lead to unintended mutations.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const original = { name: 'A', info: { age: 20 } };
const shallow = { ...original };
shallow.info.age = 30;
console.log(original.info.age); // 30 (mutated due to shallow copy)`,
    testCases: [
      {
        input: `original = { name: 'A', info: { age: 20 } }`,
        output: '30'
      }
    ]
  },
  {
    id: 'nested-array-15',
    title: 'Merge Arrays Without Duplicates',
    description: `Merge two arrays while removing duplicates using Set and spread operator.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const a = [1, 2, 3];
const b = [3, 4, 5];
const merged = [...new Set([...a, ...b])];
console.log(merged); // [1, 2, 3, 4, 5]`,
    testCases: [
      {
        input: 'a = [1, 2, 3]; b = [3, 4, 5]',
        output: '[1, 2, 3, 4, 5]'
      }
    ]
  },
  {
    id: 'nested-array-16',
    title: 'Optional Chaining in Deep Access',
    description: `Safely access deeply nested properties using optional chaining.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const data = { user: { profile: { name: 'Alice' } } };
console.log(data?.user?.profile?.name); // Alice
console.log(data?.account?.balance);    // undefined`,
    testCases: [
      {
        input: `data = { user: { profile: { name: 'Alice' } } }`,
        output: 'Alice'
      }
    ]
  },
  {
    id: 'nested-array-17',
    title: 'Destructuring With Renaming',
    description: `Use object destructuring with property renaming.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const obj = { id: 101, name: 'Book' };
const { name: productName } = obj;
console.log(productName); // Book`,
    testCases: [
      {
        input: `obj = { id: 101, name: 'Book' }`,
        output: 'Book'
      }
    ]
  },
  {
    id: 'nested-array-18',
    title: 'Remove Key from Object Without Mutation',
    description: `Remove a property from an object without mutating the original.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const user = { id: 1, name: 'Tom', role: 'admin' };
const { role, ...rest } = user;
console.log(rest); // { id: 1, name: 'Tom' }`,
    testCases: [
      {
        input: `user = { id: 1, name: 'Tom', role: 'admin' }`,
        output: '{ id: 1, name: "Tom" }'
      }
    ]
  },
  {
    id: 'nested-array-19',
    title: 'Mutate Nested Array in Object',
    description: `Demonstrate mutation of a nested array within an object.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const obj = { items: [1, 2, 3] };
obj.items.push(4);
console.log(obj); // { items: [1, 2, 3, 4] } (mutated)`,
    testCases: [
      {
        input: `obj = { items: [1, 2, 3] }`,
        output: '{ items: [1, 2, 3, 4] }'
      }
    ]
  },
  {
    id: 'nested-array-20',
    title: 'Update Deep Key Using Spread',
    description: `Update a deeply nested property using spread operator.`,
    difficulty: 'Hard',
    category: 'nested-array-mutation-spread',
    solution: `const state = {
  user: { name: 'Tom', address: { city: 'Delhi' } }
};
const updated = {
  ...state,
  user: {
    ...state.user,
    address: { ...state.user.address, city: 'Mumbai' }
  }
};
console.log(updated.user.address.city); // Mumbai`,
    testCases: [
      {
        input: `state = { user: { name: 'Tom', address: { city: 'Delhi' } } }`,
        output: 'Mumbai'
      }
    ]
  },
  {
    id: 'nested-array-21',
    title: 'Array Destructuring with Skip',
    description: `Use array destructuring to skip elements.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const arr = [10, 20, 30, 40];
const [, second, , fourth] = arr;
console.log(second, fourth); // 20 40`,
    testCases: [
      {
        input: 'arr = [10, 20, 30, 40]',
        output: '20 40'
      }
    ]
  },
  {
    id: 'nested-array-22',
    title: 'Flatten Deep Array',
    description: `Flatten a deeply nested array using flat() method.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const arr = [1, [2, [3, [4]]]];
const flat = arr.flat(Infinity);
console.log(flat); // [1, 2, 3, 4]`,
    testCases: [
      {
        input: 'arr = [1, [2, [3, [4]]]]',
        output: '[1, 2, 3, 4]'
      }
    ]
  },
  {
    id: 'nested-array-23',
    title: 'Sort Array of Objects by Nested Key',
    description: `Sort an array of objects based on a nested property.`,
    difficulty: 'Hard',
    category: 'nested-array-mutation-spread',
    solution: `const users = [
  { id: 1, profile: { age: 30 } },
  { id: 2, profile: { age: 20 } }
];
users.sort((a, b) => a.profile.age - b.profile.age);
console.log(users); // Sorted by age`,
    testCases: [
      {
        input: `users = [
  { id: 1, profile: { age: 30 } },
  { id: 2, profile: { age: 20 } }
]`,
        output: `[
  { id: 2, profile: { age: 20 } },
  { id: 1, profile: { age: 30 } }
]`
      }
    ]
  },
  {
    id: 'nested-array-24',
    title: 'Remove Duplicates Based on Object Key',
    description: `Remove duplicate objects from an array based on a specific key.`,
    difficulty: 'Hard',
    category: 'nested-array-mutation-spread',
    solution: `const list = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 1, name: 'a' }
];
const unique = Object.values(
  list.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {})
);
console.log(unique); // [{id: 1, name: 'a'}, {id: 2, name: 'b'}]`,
    testCases: [
      {
        input: `list = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 1, name: 'a' }
]`,
        output: `[
  { id: 1, name: 'a' },
  { id: 2, name: 'b' }
]`
      }
    ]
  },
  {
    id: 'nested-array-25',
    title: 'Convert Array to Object with reduce',
    description: `Convert an array to an object using reduce method.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const arr = ['a', 'b', 'c'];
const obj = arr.reduce((acc, curr, i) => {
  acc[i] = curr;
  return acc;
}, {});
console.log(obj); // { 0: 'a', 1: 'b', 2: 'c' }`,
    testCases: [
      {
        input: "arr = ['a', 'b', 'c']",
        output: '{ 0: "a", 1: "b", 2: "c" }'
      }
    ]
  },
  {
    id: 'nested-array-26',
    title: 'Use map with Nested Object Mutation',
    description: `Transform objects in an array using map and spread operator.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const items = [{ value: 1 }, { value: 2 }];
const updated = items.map(item => ({ ...item, value: item.value * 10 }));
console.log(updated); // [{ value: 10 }, { value: 20 }]`,
    testCases: [
      {
        input: 'items = [{ value: 1 }, { value: 2 }]',
        output: '[{ value: 10 }, { value: 20 }]'
      }
    ]
  },
  {
    id: 'nested-array-27',
    title: 'Clone and Modify Deeply Nested Array of Objects',
    description: `Create a deep clone of a nested array of objects and modify it.`,
    difficulty: 'Hard',
    category: 'nested-array-mutation-spread',
    solution: `const original = [{ id: 1, tags: ['a', 'b'] }];
const clone = JSON.parse(JSON.stringify(original));
clone[0].tags.push('c');
console.log(original[0].tags); // ['a', 'b']`,
    testCases: [
      {
        input: `original = [{ id: 1, tags: ['a', 'b'] }]`,
        output: '["a", "b"]'
      }
    ]
  },
  {
    id: 'nested-array-28',
    title: 'Triple Dot in Function Args',
    description: `Use rest parameters in a function to handle variable arguments.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3)); // 6`,
    testCases: [
      {
        input: 'sum(1, 2, 3)',
        output: '6'
      }
    ]
  },
  {
    id: 'nested-array-29',
    title: 'Object.entries with map',
    description: `Transform object values using Object.entries and map.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const obj = { a: 1, b: 2 };
const doubled = Object.fromEntries(
  Object.entries(obj).map(([k, v]) => [k, v * 2])
);
console.log(doubled); // { a: 2, b: 4 }`,
    testCases: [
      {
        input: 'obj = { a: 1, b: 2 }',
        output: '{ a: 2, b: 4 }'
      }
    ]
  },
  {
    id: 'nested-array-30',
    title: 'Filter Nested Array in Object',
    description: `Filter elements in a nested array within an object.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const data = {
  students: [
    { name: 'A', marks: 90 },
    { name: 'B', marks: 45 }
  ]
};
const passed = data.students.filter(s => s.marks >= 50);
console.log(passed); // [{ name: 'A', marks: 90 }]`,
    testCases: [
      {
        input: `data = {
  students: [
    { name: 'A', marks: 90 },
    { name: 'B', marks: 45 }
  ]
}`,
        output: '[{ name: "A", marks: 90 }]'
      }
    ]
  },
  {
    id: 'nested-array-31',
    title: 'Unique Array Using Prototype and Spread',
    description: `Add a unique() method to Array.prototype that returns a new array with only unique values using Set and spread operator.`,
    difficulty: 'Medium',
    category: 'nested-array-mutation-spread',
    solution: `const arr = [1,2,4,4,5,5];

Array.prototype.unique = function(){
    return [...new Set(this)]
}

console.log(arr.unique()); // [1, 2, 4, 5]`,
    testCases: [
      {
        input: 'arr = [1,2,4,4,5,5]',
        output: '[1, 2, 4, 5]'
      }
    ]
  }
] 