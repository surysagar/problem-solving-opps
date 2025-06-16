import { Problem } from '@/types'

export const filtersProblems: Problem[] = [
  {
    id: '1',
    title: 'Basic Array Filter',
    description: 'Filter even numbers from an array',
    difficulty: 'Easy',
    category: 'filters',
    solution: `function filterEvenNumbers(arr: number[]): number[] {
  return arr.filter(num => num % 2 === 0);
}

// Example usage:
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = filterEvenNumbers(numbers);
console.log(evenNumbers); // [2, 4, 6]`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 5, 6]',
        output: '[2, 4, 6]'
      },
      {
        input: 'arr = [1, 3, 5]',
        output: '[]'
      }
    ]
  },
  {
    id: '2',
    title: 'Filter Objects by Property',
    description: 'Filter objects based on a specific property value',
    difficulty: 'Easy',
    category: 'filters',
    solution: `function filterByProperty<T>(arr: T[], property: keyof T, value: any): T[] {
  return arr.filter(item => item[property] === value);
}

// Example usage:
const users = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'John', age: 35 }
];
const johns = filterByProperty(users, 'name', 'John');
console.log(johns); // [{ id: 1, name: 'John', age: 30 }, { id: 3, name: 'John', age: 35 }]`,
    testCases: [
      {
        input: 'arr = [{ id: 1, name: "John" }, { id: 2, name: "Jane" }], property = "name", value = "John"',
        output: '[{ id: 1, name: "John" }]'
      },
      {
        input: 'arr = [{ age: 25 }, { age: 30 }], property = "age", value = 30',
        output: '[{ age: 30 }]'
      }
    ]
  },
  {
    id: '3',
    title: 'Filter with Multiple Conditions',
    description: 'Filter array elements based on multiple conditions',
    difficulty: 'Medium',
    category: 'filters',
    solution: `function filterWithConditions<T>(arr: T[], conditions: ((item: T) => boolean)[]): T[] {
  return arr.filter(item => conditions.every(condition => condition(item)));
}

// Example usage:
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const conditions = [
  (n: number) => n > 5,
  (n: number) => n % 2 === 0
];
const filtered = filterWithConditions(numbers, conditions);
console.log(filtered); // [6, 8, 10]`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 5, 6], conditions = [n => n > 3, n => n % 2 === 0]',
        output: '[4, 6]'
      },
      {
        input: 'arr = [10, 20, 30], conditions = [n => n > 15, n => n < 25]',
        output: '[20]'
      }
    ]
  },
  {
    id: '4',
    title: 'Filter with Custom Context',
    description: 'Use filter with a custom this context',
    difficulty: 'Medium',
    category: 'filters',
    solution: `function filterWithContext<T>(arr: T[], callback: (this: any, item: T) => boolean, context: any): T[] {
  return arr.filter(callback, context);
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
const context = { min: 2, max: 4 };
const filtered = filterWithContext(numbers, function(n) {
  return n >= this.min && n <= this.max;
}, context);
console.log(filtered); // [2, 3, 4]`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 5], callback = function(n) { return n >= this.min && n <= this.max; }, context = { min: 2, max: 4 }',
        output: '[2, 3, 4]'
      },
      {
        input: 'arr = [10, 20, 30], callback = function(n) { return n > this.threshold; }, context = { threshold: 15 }',
        output: '[20, 30]'
      }
    ]
  },
  {
    id: '5',
    title: 'Filter with Type Guard',
    description: 'Filter array elements using a type guard function',
    difficulty: 'Medium',
    category: 'filters',
    solution: `function filterByType<T, U extends T>(arr: T[], typeGuard: (item: T) => item is U): U[] {
  return arr.filter(typeGuard);
}

// Example usage:
interface Animal { type: string; }
interface Dog extends Animal { breed: string; }
interface Cat extends Animal { lives: number; }

const animals: Animal[] = [
  { type: 'dog', breed: 'labrador' },
  { type: 'cat', lives: 9 },
  { type: 'dog', breed: 'poodle' }
];

const isDog = (animal: Animal): animal is Dog => animal.type === 'dog';
const dogs = filterByType(animals, isDog);
console.log(dogs); // [{ type: 'dog', breed: 'labrador' }, { type: 'dog', breed: 'poodle' }]`,
    testCases: [
      {
        input: 'arr = [{ type: "dog", breed: "lab" }, { type: "cat", lives: 9 }], typeGuard = (a: Animal): a is Dog => a.type === "dog"',
        output: '[{ type: "dog", breed: "lab" }]'
      },
      {
        input: 'arr = [{ type: "cat", lives: 9 }, { type: "cat", lives: 7 }], typeGuard = (a: Animal): a is Cat => a.type === "cat"',
        output: '[{ type: "cat", lives: 9 }, { type: "cat", lives: 7 }]'
      }
    ]
  },
  {
    id: '6',
    title: 'Filter with Async Predicate',
    description: 'Filter array elements using an asynchronous predicate function',
    difficulty: 'Hard',
    category: 'filters',
    solution: `async function filterAsync<T>(arr: T[], predicate: (item: T) => Promise<boolean>): Promise<T[]> {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_, index) => results[index]);
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
const isEvenAsync = async (n: number) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return n % 2 === 0;
};

const evenNumbers = await filterAsync(numbers, isEvenAsync);
console.log(evenNumbers); // [2, 4]`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4], predicate = async (n) => { await new Promise(r => setTimeout(r, 100)); return n % 2 === 0; }',
        output: '[2, 4]'
      },
      {
        input: 'arr = [10, 20, 30], predicate = async (n) => { await new Promise(r => setTimeout(r, 100)); return n > 15; }',
        output: '[20, 30]'
      }
    ]
  },
  {
    id: '7',
    title: 'Filter with Memoization',
    description: 'Implement a memoized filter function for better performance',
    difficulty: 'Hard',
    category: 'filters',
    solution: `function memoizedFilter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  const cache = new Map<string, boolean>();
  
  return arr.filter(item => {
    const key = JSON.stringify(item);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = predicate(item);
    cache.set(key, result);
    return result;
  });
}

// Example usage:
const numbers = [1, 2, 3, 4, 5, 1, 2, 3];
const isPrime = (n: number) => {
  console.log('Computing for:', n); // This will only run once per unique number
  return n > 1 && !Array.from({ length: n - 2 }, (_, i) => i + 2).some(i => n % i === 0);
};

const primes = memoizedFilter(numbers, isPrime);
console.log(primes); // [2, 3, 5, 2, 3]`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 1, 2], predicate = n => n % 2 === 0',
        output: '[2, 4, 2]'
      },
      {
        input: 'arr = [10, 20, 10, 30], predicate = n => n > 15',
        output: '[20, 30]'
      }
    ]
  },
  {
    id: '8',
    title: 'Filter with Custom Iterator',
    description: 'Implement a custom filter function using iterators',
    difficulty: 'Hard',
    category: 'filters',
    solution: `function* filterIterator<T>(iterator: Iterator<T>, predicate: (item: T) => boolean): Iterator<T> {
  let result = iterator.next();
  while (!result.done) {
    if (predicate(result.value)) {
      yield result.value;
    }
    result = iterator.next();
  }
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
const iterator = numbers[Symbol.iterator]();
const evenIterator = filterIterator(iterator, n => n % 2 === 0);

console.log([...evenIterator]); // [2, 4]`,
    testCases: [
      {
        input: 'iterator = [1, 2, 3, 4][Symbol.iterator](), predicate = n => n % 2 === 0',
        output: '[2, 4]'
      },
      {
        input: 'iterator = [10, 20, 30][Symbol.iterator](), predicate = n => n > 15',
        output: '[20, 30]'
      }
    ]
  },
  {
    id: '9',
    title: 'Filter with Error Handling',
    description: 'Implement a filter function with proper error handling',
    difficulty: 'Medium',
    category: 'filters',
    solution: `function filterWithErrorHandling<T>(arr: T[], predicate: (item: T) => boolean): { result: T[], errors: Error[] } {
  const result: T[] = [];
  const errors: Error[] = [];

  for (const item of arr) {
    try {
      if (predicate(item)) {
        result.push(item);
      }
    } catch (error) {
      errors.push(error instanceof Error ? error : new Error(String(error)));
    }
  }

  return { result, errors };
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
const { result, errors } = filterWithErrorHandling(numbers, n => {
  if (n === 3) throw new Error('Invalid number');
  return n % 2 === 0;
});

console.log(result); // [2, 4]
console.log(errors); // [Error: Invalid number]`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4], predicate = n => { if (n === 3) throw new Error("Invalid"); return n % 2 === 0; }',
        output: '{ result: [2, 4], errors: [Error: Invalid] }'
      },
      {
        input: 'arr = [10, 20, 30], predicate = n => { if (n === 20) throw new Error("Invalid"); return n > 15; }',
        output: '{ result: [30], errors: [Error: Invalid] }'
      }
    ]
  },
  {
    id: '10',
    title: 'Filter with Performance Metrics',
    description: 'Implement a filter function that tracks performance metrics',
    difficulty: 'Hard',
    category: 'filters',
    solution: `function filterWithMetrics<T>(arr: T[], predicate: (item: T) => boolean): { result: T[], metrics: { time: number, itemsProcessed: number } } {
  const start = performance.now();
  const result = arr.filter(predicate);
  const end = performance.now();

  return {
    result,
    metrics: {
      time: end - start,
      itemsProcessed: arr.length
    }
  };
}

// Example usage:
const numbers = Array.from({ length: 1000 }, (_, i) => i);
const { result, metrics } = filterWithMetrics(numbers, n => n % 2 === 0);

console.log(result.length); // 500
console.log(metrics); // { time: <execution time in ms>, itemsProcessed: 1000 }`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 5], predicate = n => n % 2 === 0',
        output: '{ result: [2, 4], metrics: { time: <execution time>, itemsProcessed: 5 } }'
      },
      {
        input: 'arr = [10, 20, 30], predicate = n => n > 15',
        output: '{ result: [20, 30], metrics: { time: <execution time>, itemsProcessed: 3 } }'
      }
    ]
  },
  // .reduce() Examples (Beginner to Advanced)
  {
    id: 'reduce-1',
    title: 'Sum of numbers with reduce',
    description: 'Sum all numbers in an array using reduce.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `[1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0); // 10`,
    testCases: [
      { input: '[1, 2, 3, 4]', output: '10' }
    ]
  },
  {
    id: 'reduce-2',
    title: 'Product of numbers with reduce',
    description: 'Multiply all numbers in an array using reduce.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `[1, 2, 3, 4].reduce((acc, curr) => acc * curr, 1); // 24`,
    testCases: [
      { input: '[1, 2, 3, 4]', output: '24' }
    ]
  },
  {
    id: 'reduce-3',
    title: 'Find max number with reduce',
    description: 'Find the maximum number in an array using reduce.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `[3, 7, 2, 9, 5].reduce((max, curr) => Math.max(max, curr), -Infinity); // 9`,
    testCases: [
      { input: '[3, 7, 2, 9, 5]', output: '9' }
    ]
  },
  {
    id: 'reduce-4',
    title: 'Find min number with reduce',
    description: 'Find the minimum number in an array using reduce.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `[3, 7, 2, 9, 5].reduce((min, curr) => Math.min(min, curr), Infinity); // 2`,
    testCases: [
      { input: '[3, 7, 2, 9, 5]', output: '2' }
    ]
  },
  {
    id: 'reduce-5',
    title: 'Flatten a 2D array with reduce',
    description: 'Flatten a 2D array into a 1D array using reduce.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `[[1, 2], [3, 4], [5]].reduce((acc, curr) => acc.concat(curr), []); // [1, 2, 3, 4, 5]`,
    testCases: [
      { input: '[[1, 2], [3, 4], [5]]', output: '[1, 2, 3, 4, 5]' }
    ]
  },
  {
    id: 'reduce-6',
    title: 'Count frequency of items with reduce',
    description: 'Count the frequency of each item in an array using reduce.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `['a', 'b', 'a', 'c'].reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {}); // { a: 2, b: 1, c: 1 }`,
    testCases: [
      { input: "['a', 'b', 'a', 'c']", output: "{ a: 2, b: 1, c: 1 }" }
    ]
  },
  {
    id: 'reduce-7',
    title: 'Group by property with reduce',
    description: 'Group array of objects by a property using reduce.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Eve', role: 'admin' }
];
users.reduce((acc, user) => {
  acc[user.role] = acc[user.role] || [];
  acc[user.role].push(user.name);
  return acc;
}, {}); // { admin: ['Alice', 'Eve'], user: ['Bob'] }`,
    testCases: [
      { input: '[{ name: "Alice", role: "admin" }, { name: "Bob", role: "user" }, { name: "Eve", role: "admin" }]', output: "{ admin: ['Alice', 'Eve'], user: ['Bob'] }" }
    ]
  },
  {
    id: 'reduce-8',
    title: 'Map-like transformation with reduce',
    description: 'Transform an array like map using reduce.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `[1, 2, 3].reduce((acc, n) => {
  acc.push(n * 2);
  return acc;
}, []); // [2, 4, 6]`,
    testCases: [
      { input: '[1, 2, 3]', output: '[2, 4, 6]' }
    ]
  },
  {
    id: 'reduce-9',
    title: 'Filter-like transformation with reduce',
    description: 'Filter an array like filter using reduce.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `[1, 2, 3, 4].reduce((acc, n) => {
  if (n % 2 === 0) acc.push(n);
  return acc;
}, []); // [2, 4]`,
    testCases: [
      { input: '[1, 2, 3, 4]', output: '[2, 4]' }
    ]
  },
  {
    id: 'reduce-10',
    title: 'Reverse a string with reduce',
    description: 'Reverse a string using reduce.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `'hello'.split('').reduce((rev, char) => char + rev, ''); // 'olleh'`,
    testCases: [
      { input: "'hello'", output: "'olleh'" }
    ]
  },
  {
    id: 'reduce-11',
    title: 'Compose functions with reduce',
    description: 'Compose functions from right to left using reduce.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `const add = x => x + 1;
const double = x => x * 2;
const funcs = [add, double];
const result = funcs.reduce((accFn, fn) => x => fn(accFn(x)), x => x);
result(2); // 6`,
    testCases: [
      { input: 'result(2)', output: '6' }
    ]
  },
  {
    id: 'reduce-12',
    title: 'Parse CSV rows into objects with reduce',
    description: 'Parse CSV rows into objects using reduce.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `const headers = ['id', 'name'];
const rows = [['1', 'Alice'], ['2', 'Bob']];
rows.reduce((acc, row) => {
  acc.push(Object.fromEntries(headers.map((h, i) => [h, row[i]])));
  return acc;
}, []); // [{id: '1', name: 'Alice'}, {id: '2', name: 'Bob'}]`,
    testCases: [
      { input: 'rows = [["1", "Alice"], ["2", "Bob"]]', output: "[{id: '1', name: 'Alice'}, {id: '2', name: 'Bob'}]" }
    ]
  },
  {
    id: 'reduce-13',
    title: 'Remove duplicates with reduce',
    description: 'Remove duplicate values from an array using reduce.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `[1, 2, 2, 3].reduce((acc, val) => {
  if (!acc.includes(val)) acc.push(val);
  return acc;
}, []); // [1, 2, 3]`,
    testCases: [
      { input: '[1, 2, 2, 3]', output: '[1, 2, 3]' }
    ]
  },
  {
    id: 'reduce-14',
    title: 'Nested object flattening with reduce',
    description: 'Flatten a nested object using reduce and Object.entries.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `const input = { a: 1, b: { c: 2, d: 3 } };
const flat = Object.entries(input).reduce((acc, [key, value]) => {
  if (typeof value === 'object') {
    Object.entries(value).forEach(([k, v]) => acc[\`\${key}.\${k}\`] = v);
  } else {
    acc[key] = value;
  }
  return acc;
}, {}); // { a: 1, 'b.c': 2, 'b.d': 3 }`,
    testCases: [
      { input: '{ a: 1, b: { c: 2, d: 3 } }', output: "{ a: 1, 'b.c': 2, 'b.d': 3 }" }
    ]
  },
  {
    id: 'reduce-15',
    title: 'Running total array with reduce',
    description: 'Create a running total array using reduce.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `[1, 2, 3].reduce((acc, curr, i) => {
  acc.push((acc[i - 1] || 0) + curr);
  return acc;
}, []); // [1, 3, 6]`,
    testCases: [
      { input: '[1, 2, 3]', output: '[1, 3, 6]' }
    ]
  },
  {
    id: 'reduce-16',
    title: 'Convert array to object with index keys using reduce',
    description: 'Convert an array to an object with index keys using reduce.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `['a', 'b', 'c'].reduce((acc, val, idx) => {
  acc[idx] = val;
  return acc;
}, {}); // { 0: 'a', 1: 'b', 2: 'c' }`,
    testCases: [
      { input: "['a', 'b', 'c']", output: "{ 0: 'a', 1: 'b', 2: 'c' }" }
    ]
  },
  {
    id: 'reduce-17',
    title: 'Merge array of objects with reduce',
    description: 'Merge an array of objects into a single object using reduce.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `[{ a: 1 }, { b: 2 }, { c: 3 }].reduce((acc, obj) => {
  return { ...acc, ...obj };
}, {}); // { a: 1, b: 2, c: 3 }`,
    testCases: [
      { input: '[{ a: 1 }, { b: 2 }, { c: 3 }]', output: '{ a: 1, b: 2, c: 3 }' }
    ]
  },
  {
    id: 'reduce-18',
    title: 'Chain Promises with reduce',
    description: 'Chain an array of promise-returning functions using reduce.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `const fns = [
  () => Promise.resolve(1),
  (prev) => Promise.resolve(prev + 2),
  (prev) => Promise.resolve(prev * 3)
];
fns.reduce((p, fn) => p.then(fn), Promise.resolve()).then(console.log); // 9`,
    testCases: [
      { input: 'fns = [() => Promise.resolve(1), (prev) => Promise.resolve(prev + 2), (prev) => Promise.resolve(prev * 3)]', output: '9' }
    ]
  },
  {
    id: 'reduce-19',
    title: 'Count word frequency in sentence with reduce',
    description: 'Count the frequency of each word in a sentence using reduce.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `const text = "the cat and the hat";
text.split(" ").reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {}); // { the: 2, cat: 1, and: 1, hat: 1 }`,
    testCases: [
      { input: 'text = "the cat and the hat"', output: '{ the: 2, cat: 1, and: 1, hat: 1 }' }
    ]
  },
  {
    id: 'reduce-20',
    title: 'Build a lookup map from array with reduce',
    description: 'Build a lookup map from an array using reduce.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `const people = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];
people.reduce((acc, person) => {
  acc[person.id] = person.name;
  return acc;
}, {}); // { 1: 'Alice', 2: 'Bob' }`,
    testCases: [
      { input: '[{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]', output: "{ 1: 'Alice', 2: 'Bob' }" }
    ]
  },
  // .map() Examples (Easy to Expert)
  {
    id: 'map-1',
    title: 'Double the numbers with map',
    description: 'Double each number in an array using map.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `[1, 2, 3].map(n => n * 2); // [2, 4, 6]`,
    testCases: [
      { input: '[1, 2, 3]', output: '[2, 4, 6]' }
    ]
  },
  {
    id: 'map-2',
    title: 'Convert numbers to strings with map',
    description: 'Convert each number to a string using map.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `[1, 2, 3].map(n => String(n)); // ["1", "2", "3"]`,
    testCases: [
      { input: '[1, 2, 3]', output: '["1", "2", "3"]' }
    ]
  },
  {
    id: 'map-3',
    title: 'Square the numbers with map',
    description: 'Square each number in an array using map.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `[2, 4, 6].map(n => n * n); // [4, 16, 36]`,
    testCases: [
      { input: '[2, 4, 6]', output: '[4, 16, 36]' }
    ]
  },
  {
    id: 'map-4',
    title: 'Capitalize words with map',
    description: 'Capitalize the first letter of each word using map.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `['hello', 'world'].map(w => w[0].toUpperCase() + w.slice(1)); // ["Hello", "World"]`,
    testCases: [
      { input: "['hello', 'world']", output: '["Hello", "World"]' }
    ]
  },
  {
    id: 'map-5',
    title: 'Add index to value with map',
    description: 'Add the index to each value using map.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `['a', 'b', 'c'].map((val, i) => \`\${i}-\${val}\`); // ["0-a", "1-b", "2-c"]`,
    testCases: [
      { input: "['a', 'b', 'c']", output: '["0-a", "1-b", "2-c"]' }
    ]
  },
  {
    id: 'map-6',
    title: 'Extract property from object array with map',
    description: 'Extract a property from each object in an array using map.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `const users = [{ name: 'Alice' }, { name: 'Bob' }];
users.map(user => user.name); // ["Alice", "Bob"]`,
    testCases: [
      { input: '[{ name: "Alice" }, { name: "Bob" }]', output: '["Alice", "Bob"]' }
    ]
  },
  {
    id: 'map-7',
    title: 'Format prices with map',
    description: 'Format each price as a string with a dollar sign using map.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `[12, 25, 7].map(price => \`\${price.toFixed(2)}\`); // ["$12.00", "$25.00", "$7.00"]`,
    testCases: [
      { input: '[12, 25, 7]', output: '["$12.00", "$25.00", "$7.00"]' }
    ]
  },
  {
    id: 'map-8',
    title: 'Convert array of strings to numbers with map',
    description: 'Convert each string to a number using map.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `["10", "20", "30"].map(Number); // [10, 20, 30]`,
    testCases: [
      { input: '["10", "20", "30"]', output: '[10, 20, 30]' }
    ]
  },
  {
    id: 'map-9',
    title: 'Uppercase nested object property with map',
    description: 'Uppercase the name property in each object using map.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `const people = [{ name: "john" }, { name: "doe" }];
people.map(p => ({ ...p, name: p.name.toUpperCase() })); // [{name: "JOHN"}, {name: "DOE"}]`,
    testCases: [
      { input: '[{ name: "john" }, { name: "doe" }]', output: '[{name: "JOHN"}, {name: "DOE"}]' }
    ]
  },
  {
    id: 'map-10',
    title: 'Boolean check with condition using map',
    description: 'Check if each number is greater than 7 using map.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `[5, 10, 15].map(n => n > 7); // [false, true, true]`,
    testCases: [
      { input: '[5, 10, 15]', output: '[false, true, true]' }
    ]
  },
  {
    id: 'map-11',
    title: 'Generate HTML list items with map',
    description: 'Generate HTML <li> elements from an array using map.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `['Home', 'About'].map(text => \`<li>\${text}</li>\`); // ["<li>Home</li>", "<li>About</li>"]`,
    testCases: [
      { input: "['Home', 'About']", output: '["<li>Home</li>", "<li>About</li>"]' }
    ]
  },
  {
    id: 'map-12',
    title: 'Map with conditional transformation',
    description: 'Transform numbers to "even" or "odd" using map.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `[1, 2, 3, 4].map(n => n % 2 === 0 ? 'even' : 'odd'); // ["odd", "even", "odd", "even"]`,
    testCases: [
      { input: '[1, 2, 3, 4]', output: '["odd", "even", "odd", "even"]' }
    ]
  },
  {
    id: 'map-13',
    title: 'Transform nested arrays with map',
    description: 'Multiply each number in nested arrays by 10 using map.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `[[1, 2], [3, 4]].map(arr => arr.map(n => n * 10)); // [[10, 20], [30, 40]]`,
    testCases: [
      { input: '[[1, 2], [3, 4]]', output: '[[10, 20], [30, 40]]' }
    ]
  },
  {
    id: 'map-14',
    title: 'Convert CSV row to object using headers with map',
    description: 'Convert CSV rows to objects using headers and map.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `const headers = ['id', 'name'];
const rows = [['1', 'Alice'], ['2', 'Bob']];
rows.map(row => Object.fromEntries(headers.map((h, i) => [h, row[i]])));
// [{id: "1", name: "Alice"}, {id: "2", name: "Bob"}]`,
    testCases: [
      { input: 'rows = [["1", "Alice"], ["2", "Bob"]]', output: '[{id: "1", name: "Alice"}, {id: "2", name: "Bob"}]' }
    ]
  },
  {
    id: 'map-15',
    title: 'Create lookup keys with map',
    description: 'Create objects with key and value from an array using map.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `['apple', 'banana'].map((fruit, i) => ({ key: i, value: fruit }));
// [{key: 0, value: "apple"}, {key: 1, value: "banana"}]`,
    testCases: [
      { input: "['apple', 'banana']", output: '[{key: 0, value: "apple"}, {key: 1, value: "banana"}]' }
    ]
  },
  {
    id: 'map-16',
    title: 'Track original and new values with map',
    description: 'Track original and doubled values using map.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `[2, 4, 6].map(n => ({ original: n, doubled: n * 2 }));
// [{original: 2, doubled: 4}, {original: 4, doubled: 8}, {original: 6, doubled: 12}]`,
    testCases: [
      { input: '[2, 4, 6]', output: '[{original: 2, doubled: 4}, {original: 4, doubled: 8}, {original: 6, doubled: 12}]' }
    ]
  },
  {
    id: 'map-17',
    title: 'Chain map with filter',
    description: 'Filter even numbers and then multiply by 10 using map.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `[1, 2, 3, 4, 5]
  .filter(n => n % 2 === 0)
  .map(n => n * 10); // [20, 40]`,
    testCases: [
      { input: '[1, 2, 3, 4, 5]', output: '[20, 40]' }
    ]
  },
  {
    id: 'map-18',
    title: 'Map and sort based on computed values',
    description: 'Map strings to objects with length and sort by length descending.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `['short', 'longest', 'mid'].map(str => ({ str, len: str.length }))
                           .sort((a, b) => b.len - a.len);
// Sorts strings by length descending`,
    testCases: [
      { input: "['short', 'longest', 'mid']", output: '[{"str":"longest","len":7},{"str":"short","len":5},{"str":"mid","len":3}]' }
    ]
  },
  {
    id: 'map-19',
    title: 'Image URL to <img> tags with map',
    description: 'Convert image URLs to <img> tags using map.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `['img1.jpg', 'img2.jpg'].map(src => \`<img src="\${src}" alt="">\`);
// ["<img src='img1.jpg' alt=''>", "<img src='img2.jpg' alt=''>"]`,
    testCases: [
      { input: "['img1.jpg', 'img2.jpg']", output: '["<img src=\'img1.jpg\' alt=\'\'>", "<img src=\'img2.jpg\' alt=\'\'>"]' }
    ]
  },
  {
    id: 'map-20',
    title: 'Transform deeply nested objects with map',
    description: 'Double the price in deeply nested objects using map.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `const items = [
  { id: 1, data: { price: 10 } },
  { id: 2, data: { price: 20 } }
];
items.map(item => ({ ...item, data: { ...item.data, price: item.data.price * 2 } }));
// [{id: 1, data: {price: 20}}, {id: 2, data: {price: 40}}]`,
    testCases: [
      { input: '[{ id: 1, data: { price: 10 } }, { id: 2, data: { price: 20 } }]', output: '[{id: 1, data: {price: 20}}, {id: 2, data: {price: 40}}]' }
    ]
  },
  // .map() + .reduce() Combinations
  {
    id: 'mapreduce-1',
    title: 'Sum of squares with map and reduce',
    description: 'Square each number and sum the results using map and reduce.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `[1, 2, 3].map(x => x * x).reduce((acc, val) => acc + val, 0); // 14`,
    testCases: [
      { input: '[1, 2, 3]', output: '14' }
    ]
  },
  {
    id: 'mapreduce-2',
    title: 'Count characters in array of strings',
    description: 'Count total characters in an array of strings using map and reduce.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `['hi', 'hello', 'hey'].map(str => str.length).reduce((acc, len) => acc + len, 0); // 10`,
    testCases: [
      { input: "['hi', 'hello', 'hey']", output: '10' }
    ]
  },
  {
    id: 'mapreduce-3',
    title: 'Flatten and double nested arrays',
    description: 'Flatten nested arrays and double each value using reduce and map.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `[[1, 2], [3], [4, 5]].reduce((acc, arr) => acc.concat(arr), []).map(n => n * 2); // [2, 4, 6, 8, 10]`,
    testCases: [
      { input: '[[1, 2], [3], [4, 5]]', output: '[2, 4, 6, 8, 10]' }
    ]
  },
  {
    id: 'mapreduce-4',
    title: 'Word frequency from sentences',
    description: 'Count word frequency from an array of sentences using map, flat, and reduce.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `const sentences = ['hi hi', 'hello hi'];
sentences
  .map(s => s.split(' '))
  .flat()
  .reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {}); // { hi: 3, hello: 1 }`,
    testCases: [
      { input: "['hi hi', 'hello hi']", output: '{ hi: 3, hello: 1 }' }
    ]
  },
  {
    id: 'mapreduce-5',
    title: 'Group and average scores by category',
    description: 'Group scores by subject and compute averages using reduce and map.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `const scores = [
  { subject: 'math', score: 80 },
  { subject: 'math', score: 90 },
  { subject: 'sci', score: 70 }
];
const grouped = scores.reduce((acc, curr) => {
  acc[curr.subject] = acc[curr.subject] || [];
  acc[curr.subject].push(curr.score);
  return acc;
}, {});
const avg = Object.entries(grouped).map(([key, arr]) => ({
  subject: key,
  avg: arr.reduce((a, b) => a + b) / arr.length
}));
// [ { subject: 'math', avg: 85 }, { subject: 'sci', avg: 70 } ]`,
    testCases: [
      { input: '[{ subject: "math", score: 80 }, { subject: "math", score: 90 }, { subject: "sci", score: 70 }]', output: '[{ subject: "math", avg: 85 }, { subject: "sci", avg: 70 }]' }
    ]
  },
  // Real-world React .map()/.reduce() Usage
  {
    id: 'react-1',
    title: 'React: List Rendering with map',
    description: 'Render a list of tasks in React using map.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `const tasks = ['Walk dog', 'Buy milk', 'Code JS'];
return (
  <ul>
    {tasks.map((task, i) => (
      <li key={i}>{task}</li>
    ))}
  </ul>
);`,
    testCases: [
      { input: "['Walk dog', 'Buy milk', 'Code JS']", output: '<ul><li>Walk dog</li><li>Buy milk</li><li>Code JS</li></ul>' }
    ]
  },
  {
    id: 'react-2',
    title: 'React: Table Rendering with map',
    description: 'Render a table of users in React using map.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 }
];
return (
  <table>
    <thead>
      <tr><th>Name</th><th>Age</th></tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.age}</td>
        </tr>
      ))}
    </tbody>
  </table>
);`,
    testCases: [
      { input: '[{ id: 1, name: "Alice", age: 25 }, { id: 2, name: "Bob", age: 30 }]', output: '<table>...</table>' }
    ]
  },
  {
    id: 'react-3',
    title: 'React: Render stats from reduce',
    description: 'Render a total from an array of expenses using reduce in React.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `const expenses = [
  { item: 'Food', amount: 100 },
  { item: 'Transport', amount: 50 }
];
const total = expenses.reduce((acc, e) => acc + e.amount, 0);
return <p>Total: ₹{total}</p>;`,
    testCases: [
      { input: '[{ item: "Food", amount: 100 }, { item: "Transport", amount: 50 }]', output: 'Total: ₹150' }
    ]
  },
  {
    id: 'react-4',
    title: 'React: Render group summary with reduce and map',
    description: 'Render a summary of orders by city using reduce and map in React.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `const orders = [
  { city: 'Pune', amount: 120 },
  { city: 'Pune', amount: 80 },
  { city: 'Mumbai', amount: 100 }
];
const cityGroups = orders.reduce((acc, order) => {
  acc[order.city] = (acc[order.city] || 0) + order.amount;
  return acc;
}, {});
return (
  <ul>
    {Object.entries(cityGroups).map(([city, total]) => (
      <li key={city}>{city}: ₹{total}</li>
    ))}
  </ul>
);`,
    testCases: [
      { input: '[{ city: "Pune", amount: 120 }, { city: "Pune", amount: 80 }, { city: "Mumbai", amount: 100 }]', output: '<ul><li>Pune: ₹200</li><li>Mumbai: ₹100</li></ul>' }
    ]
  },
  // More MAP + ARRAY TASKS
  {
    id: 'maparr-1',
    title: 'Convert Celsius to Fahrenheit',
    description: 'Convert an array of Celsius values to Fahrenheit using map.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `const celsius = [0, 10, 20];
const fahrenheit = celsius.map(c => c * 1.8 + 32);
// [32, 50, 68]`,
    testCases: [
      { input: '[0, 10, 20]', output: '[32, 50, 68]' }
    ]
  },
  {
    id: 'maparr-2',
    title: 'Add id key to each object',
    description: 'Add a unique id to each object in an array using map.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `const users = [{ name: "A" }, { name: "B" }];
const withId = users.map((u, i) => ({ id: i + 1, ...u }));
// [{id: 1, name: "A"}, {id: 2, name: "B"}]`,
    testCases: [
      { input: '[{ name: "A" }, { name: "B" }]', output: '[{id: 1, name: "A"}, {id: 2, name: "B"}]' }
    ]
  },
  {
    id: 'maparr-3',
    title: 'Create an HTML list from array',
    description: 'Create an array of <li> elements from a string array using map.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `const fruits = ['apple', 'banana'];
const listItems = fruits.map(f => \`<li>\${f}</li>\`);
// ["<li>apple</li>", "<li>banana</li>"]`,
    testCases: [
      { input: "['apple', 'banana']", output: '["<li>apple</li>", "<li>banana</li>"]' }
    ]
  },
  {
    id: 'maparr-4',
    title: 'Multiply nested array',
    description: 'Multiply each value in a nested array by 2 using map.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `const arr = [[1, 2], [3, 4]];
const doubled = arr.map(inner => inner.map(n => n * 2));
// [[2, 4], [6, 8]]`,
    testCases: [
      { input: '[[1, 2], [3, 4]]', output: '[[2, 4], [6, 8]]' }
    ]
  },
  // REDUCE ONLY TASKS
  {
    id: 'reduceonly-1',
    title: 'Sum all numbers with reduce',
    description: 'Sum all numbers in an array using reduce.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `const nums = [1, 2, 3, 4];
const total = nums.reduce((acc, val) => acc + val, 0);
// 10`,
    testCases: [
      { input: '[1, 2, 3, 4]', output: '10' }
    ]
  },
  {
    id: 'reduceonly-2',
    title: 'Group items by property with reduce',
    description: 'Group items in an array by a property using reduce.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `const items = [
  { type: "fruit", name: "apple" },
  { type: "veg", name: "carrot" },
  { type: "fruit", name: "banana" }
];
const grouped = items.reduce((acc, item) => {
  acc[item.type] = acc[item.type] || [];
  acc[item.type].push(item.name);
  return acc;
}, {});
// { fruit: ["apple", "banana"], veg: ["carrot"] }`,
    testCases: [
      { input: '[{ type: "fruit", name: "apple" }, { type: "veg", name: "carrot" }, { type: "fruit", name: "banana" }]', output: '{ fruit: ["apple", "banana"], veg: ["carrot"] }' }
    ]
  },
  {
    id: 'reduceonly-3',
    title: 'Count word frequency with reduce',
    description: 'Count the frequency of each word in an array using reduce.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `const words = ['apple', 'banana', 'apple'];
const freq = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
// { apple: 2, banana: 1 }`,
    testCases: [
      { input: "['apple', 'banana', 'apple']", output: '{ apple: 2, banana: 1 }' }
    ]
  },
  {
    id: 'reduceonly-4',
    title: 'Find max value with reduce',
    description: 'Find the maximum value in an array using reduce.',
    difficulty: 'Easy',
    category: 'filters',
    solution: `const nums = [2, 7, 4];
const max = nums.reduce((a, b) => (a > b ? a : b));
// 7`,
    testCases: [
      { input: '[2, 7, 4]', output: '7' }
    ]
  },
  // COMBINED: FILTER + MAP + REDUCE
  {
    id: 'combo-1',
    title: 'Get total of positive numbers only',
    description: 'Filter positive numbers and sum them using reduce.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `const nums = [1, -2, 3, -1, 5];
const totalPos = nums.filter(n => n > 0).reduce((a, b) => a + b, 0);
// 9`,
    testCases: [
      { input: '[1, -2, 3, -1, 5]', output: '9' }
    ]
  },
  {
    id: 'combo-2',
    title: 'Average score of only students who passed',
    description: 'Filter students who passed and compute their average score.',
    difficulty: 'Hard',
    category: 'filters',
    solution: `const students = [
  { name: "A", score: 90 },
  { name: "B", score: 40 },
  { name: "C", score: 80 }
];
const passed = students.filter(s => s.score >= 50);
const avg = passed.reduce((a, b) => a + b.score, 0) / passed.length;
// 85`,
    testCases: [
      { input: '[{ name: "A", score: 90 }, { name: "B", score: 40 }, { name: "C", score: 80 }]', output: '85' }
    ]
  },
  {
    id: 'combo-3',
    title: 'Names of students with even roll numbers',
    description: 'Get names of students with even roll numbers using filter and map.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `const students = [
  { roll: 1, name: "A" },
  { roll: 2, name: "B" },
  { roll: 4, name: "C" }
];
const names = students.filter(s => s.roll % 2 === 0).map(s => s.name);
// ["B", "C"]`,
    testCases: [
      { input: '[{ roll: 1, name: "A" }, { roll: 2, name: "B" }, { roll: 4, name: "C" }]', output: '["B", "C"]' }
    ]
  },
  {
    id: 'combo-4',
    title: 'Sum of prices above ₹100',
    description: 'Sum the prices of items above ₹100 using filter and reduce.',
    difficulty: 'Medium',
    category: 'filters',
    solution: `const items = [
  { name: "A", price: 80 },
  { name: "B", price: 120 },
  { name: "C", price: 200 }
];
const total = items
  .filter(item => item.price > 100)
  .reduce((acc, curr) => acc + curr.price, 0);
// 320`,
    testCases: [
      { input: '[{ name: "A", price: 80 }, { name: "B", price: 120 }, { name: "C", price: 200 }]', output: '320' }
    ]
  }
]; 