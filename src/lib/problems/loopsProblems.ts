import { Problem } from '@/types'

export const loopsProblems: Problem[] = [
  {
    id: '1',
    title: 'For Loop Basics',
    description: 'Learn the basic syntax and usage of for loops',
    difficulty: 'Easy',
    category: 'loop',
    explanation: 'For loops are used when you know how many times you want to execute a block of code.',
    example: `for (let i = 0; i < 5; i++) {
  console.log(i);
} // ➤ 0 1 2 3 4`
  },
  {
    id: '2',
    title: 'While Loop Basics',
    description: 'Learn the basic syntax and usage of while loops',
    difficulty: 'Easy',
    category: 'loop',
    explanation: 'While loops are used when you want to execute a block of code as long as a condition is true.',
    example: `let i = 0;
while (i < 5) {
  console.log(i);
  i++;
} // ➤ 0 1 2 3 4`
  },
  {
    id: '3',
    title: 'Do-While Loop',
    description: 'Learn the basic syntax and usage of do-while loops',
    difficulty: 'Easy',
    category: 'loop',
    explanation: 'Do-while loops execute the code block at least once before checking the condition.',
    example: `let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5); // ➤ 0 1 2 3 4`
  },
  {
    id: '4',
    title: 'Nested Loops',
    description: 'Learn how to use loops inside other loops',
    difficulty: 'Medium',
    category: 'loop',
    explanation: 'Nested loops are useful when you need to work with multi-dimensional data structures.',
    example: `for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(\`i: \${i}, j: \${j}\`);
  }
} // ➤ Prints all combinations of i and j`
  },
  {
    id: '5',
    title: 'For...of Loop',
    description: 'Learn how to iterate over iterable objects',
    difficulty: 'Easy',
    category: 'loop',
    explanation: 'For...of loops are used to iterate over iterable objects like arrays and strings.',
    example: `const arr = [1, 2, 3, 4, 5];
for (const num of arr) {
  console.log(num);
} // ➤ 1 2 3 4 5`
  },
  {
    id: '6',
    title: 'For...in Loop',
    description: 'Learn how to iterate over object properties',
    difficulty: 'Medium',
    category: 'loop',
    explanation: 'For...in loops are used to iterate over the enumerable properties of an object.',
    example: `const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(\`\${key}: \${obj[key]}\`);
} // ➤ a: 1 b: 2 c: 3`
  },
  {
    id: '7',
    title: 'Array Iteration',
    description: 'Iterate through an array of names',
    difficulty: 'Easy',
    category: 'loop',
    solution: `const names = ['Ali', 'Ben', 'Cara'];

// Modern approach using for...of
for (const name of names) {
  console.log(name);
}

// Traditional approach using for loop
for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}`,
    testCases: [
      {
        input: 'names = ["Ali", "Ben", "Cara"]',
        output: 'Ali\nBen\nCara'
      }
    ]
  },
  {
    id: '8',
    title: 'Object Properties',
    description: 'Iterate through object properties',
    difficulty: 'Easy',
    category: 'loop',
    solution: `const person = { name: "John", age: 30 };

// Modern approach using Object.entries
for (const [key, value] of Object.entries(person)) {
  console.log(key, value);
}

// Traditional approach using for...in
for (let key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key, person[key]);
  }
}`,
    testCases: [
      {
        input: 'person = { name: "John", age: 30 }',
        output: 'name John\nage 30'
      }
    ]
  },
  {
    id: '9',
    title: 'Matrix Traversal',
    description: 'Traverse a 2D array using nested loops',
    difficulty: 'Medium',
    category: 'loop',
    solution: `const matrix = [[1, 2], [3, 4]];

// Modern approach using for...of
const result1 = [];
for (let row of matrix) {
  for (let val of row) {
    result1.push(val);
  }
}
console.log(result1.join('\\n'));

// Traditional approach using for loops
const result2 = [];
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    result2.push(matrix[i][j]);
  }
}
console.log(result2.join('\\n'));`,
    testCases: [
      {
        input: 'matrix = [[1, 2], [3, 4]]',
        output: '1\n2\n3\n4\n1\n2\n3\n4'
      }
    ]
  },
  {
    id: '10',
    title: 'Sum Nested Properties',
    description: 'Calculate sum of nested object properties',
    difficulty: 'Medium',
    category: 'loop',
    solution: `const items = [
  { price: 10, quantity: 2 },
  { price: 20, quantity: 1 },
  { price: 15, quantity: 3 }
];

let total = 0;
for (let item of items) {
  total += item.price * item.quantity;
}
console.log(total);`,
    testCases: [
      {
        input: 'No input required',
        output: '75'
      }
    ]
  },
  {
    id: '11',
    title: 'Performance Loop',
    description: 'Use reverse loop for better performance',
    difficulty: 'Medium',
    category: 'loop',
    solution: `const arr = [1, 2, 3];
const result = [];
for (let i = arr.length; i--;) {
  result.push(arr[i]);
}
console.log(result.join('\\n'));`,
    testCases: [
      {
        input: 'arr = [1, 2, 3]',
        output: '3\n2\n1'
      }
    ]
  },
  {
    id: '12',
    title: 'Dynamic Key Access',
    description: 'Access object properties using dynamic keys',
    difficulty: 'Medium',
    category: 'loop',
    solution: `const keys = ['name', 'age'];
const obj = { name: 'Jay', age: 30 };
const result = [];
for (let key of keys) {
  result.push(\`\${key}: \${obj[key]}\`);
}
console.log(result.join('\\n'));`,
    testCases: [
      {
        input: 'No input required',
        output: 'name: Jay\nage: 30'
      }
    ]
  },
  {
    id: '13',
    title: 'Find First Even',
    description: 'Find the first even number in an array',
    difficulty: 'Easy',
    category: 'loop',
    solution: `const arr = [1, 3, 4, 6];
let firstEven = null;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    firstEven = arr[i];
    break;
  }
}
console.log(firstEven);`,
    testCases: [
      {
        input: 'arr = [1, 3, 4, 6]',
        output: '4'
      }
    ]
  },
  {
    id: '14',
    title: 'Custom ForEach',
    description: 'Implement a custom forEach function',
    difficulty: 'Medium',
    category: 'loop',
    solution: `function myEach(arr, cb) {
  for (let i = 0; i < arr.length; i++) {
    cb(arr[i], i);
  }
}

const result = [];
myEach([1, 2, 3], (val, idx) => {
  result.push(\`\${val} at index \${idx}\`);
});
console.log(result.join('\\n'));`,
    testCases: [
      {
        input: 'arr = [1, 2, 3]',
        output: '1 at index 0\n2 at index 1\n3 at index 2'
      }
    ]
  },
  {
    id: '15',
    title: 'Map Iteration',
    description: 'Iterate through a Map object',
    difficulty: 'Medium',
    category: 'loop',
    solution: `const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3]
]);

const result = [];
for (let [key, value] of map) {
  result.push(\`\${key}: \${value}\`);
}
console.log(result.join('\\n'));`,
    testCases: [
      {
        input: 'No input required',
        output: 'a: 1\nb: 2\nc: 3'
      }
    ]
  },
  {
    id: '16',
    title: 'Range Array',
    description: 'Build a range array using a loop',
    difficulty: 'Easy',
    category: 'loop',
    solution: `function range(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

console.log(range(1, 5).join(','));`,
    testCases: [
      {
        input: 'No input required',
        output: '1,2,3,4,5'
      }
    ]
  },
  {
    id: '17',
    title: 'Uppercase Conversion',
    description: 'Convert array elements to uppercase',
    difficulty: 'Easy',
    category: 'loop',
    solution: `const names = ["raj", "meena", "john"];
const result = [];

for (let i = 0; i < names.length; i++) {
  result.push(names[i].toUpperCase());
}
console.log(result.join(','));`,
    testCases: [
      {
        input: 'No input required',
        output: 'RAJ,MEENA,JOHN'
      }
    ]
  },
  {
    id: '18',
    title: 'Form Validation',
    description: 'Check if all form fields are filled',
    difficulty: 'Medium',
    category: 'loop',
    solution: `function validateForm(form) {
  const requiredFields = ['name', 'email', 'password'];
  const missingFields = [];

  for (let field of requiredFields) {
    if (!form[field] || form[field].trim() === '') {
      missingFields.push(field);
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}

const form = {
  name: "John",
  email: "",
  password: "123"
};

const result = validateForm(form);
console.log(JSON.stringify(result));`,
    testCases: [
      {
        input: 'No input required',
        output: '{"isValid":false,"missingFields":["email"]}'
      }
    ]
  },
  {
    id: '19',
    title: 'Pagination',
    description: 'Implement pagination using a loop',
    difficulty: 'Medium',
    category: 'loop',
    solution: `function paginate(array, pageSize) {
  const pages = [];
  for (let i = 0; i < array.length; i += pageSize) {
    pages.push(array.slice(i, i + pageSize));
  }
  return pages;
}

const data = [1, 2, 3, 4, 5, 6];
const pages = paginate(data, 2);
console.log(JSON.stringify(pages));`,
    testCases: [
      {
        input: 'No input required',
        output: '[[1,2],[3,4],[5,6]]'
      }
    ]
  },
  {
    id: '20',
    title: 'Group by Condition',
    description: 'Group array elements by condition',
    difficulty: 'Medium',
    category: 'loop',
    solution: `function groupByCondition(array) {
  const groups = {
    even: [],
    odd: []
  };

  for (let num of array) {
    if (num % 2 === 0) {
      groups.even.push(num);
    } else {
      groups.odd.push(num);
    }
  }

  return groups;
}

const numbers = [1, 2, 3, 4, 5, 6];
const result = groupByCondition(numbers);
console.log(JSON.stringify(result));`,
    testCases: [
      {
        input: 'No input required',
        output: '{"even":[2,4,6],"odd":[1,3,5]}'
      }
    ]
  },
  {
    id: '21',
    title: 'Find First Even',
    description: 'Find the first even number in an array',
    difficulty: 'Easy',
    category: 'loop',
    solution: `const arr = [1, 3, 4, 6];
let firstEven = null;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) {
    firstEven = arr[i];
    break;
  }
}
console.log(firstEven);`,
    testCases: [
      {
        input: 'arr = [1, 3, 4, 6]',
        output: '4'
      }
    ]
  },
  {
    id: '22',
    title: 'Custom ForEach',
    description: 'Implement a custom forEach function',
    difficulty: 'Medium',
    category: 'loop',
    solution: `function myEach(arr, cb) {
  for (let i = 0; i < arr.length; i++) {
    cb(arr[i], i);
  }
}

const result = [];
myEach([1, 2, 3], (val, idx) => {
  result.push(\`\${val} at index \${idx}\`);
});
console.log(result.join('\\n'));`,
    testCases: [
      {
        input: 'arr = [1, 2, 3]',
        output: '1 at index 0\n2 at index 1\n3 at index 2'
      }
    ]
  },
  {
    id: '23',
    title: 'Map Iteration',
    description: 'Iterate through a Map object',
    difficulty: 'Medium',
    category: 'loop',
    solution: `const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3]
]);

const result = [];
for (let [key, value] of map) {
  result.push(\`\${key}: \${value}\`);
}
console.log(result.join('\\n'));`,
    testCases: [
      {
        input: 'No input required',
        output: 'a: 1\nb: 2\nc: 3'
      }
    ]
  },
  {
    id: '24',
    title: 'Range Array',
    description: 'Build a range array using a loop',
    difficulty: 'Easy',
    category: 'loop',
    solution: `function range(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

console.log(range(1, 5).join(','));`,
    testCases: [
      {
        input: 'No input required',
        output: '1,2,3,4,5'
      }
    ]
  },
  {
    id: '25',
    title: 'Uppercase Conversion',
    description: 'Convert array elements to uppercase',
    difficulty: 'Easy',
    category: 'loop',
    solution: `const names = ["raj", "meena", "john"];
const result = [];

for (let i = 0; i < names.length; i++) {
  result.push(names[i].toUpperCase());
}
console.log(result.join(','));`,
    testCases: [
      {
        input: 'No input required',
        output: 'RAJ,MEENA,JOHN'
      }
    ]
  }
] 