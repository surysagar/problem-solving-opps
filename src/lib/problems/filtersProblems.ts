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
  }
] 