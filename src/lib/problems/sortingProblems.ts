import { Problem } from '@/types'

export const sortingProblems: Problem[] = [
  {
    id: 'sorting-1',
    title: 'Sort Numbers Ascending',
    description: `Sort an array of numbers in ascending order using the sort method with a comparator function.`,
    difficulty: 'Easy',
    category: 'sorting',
    solution: `const nums = [10, 5, 3, 12, 7];
nums.sort((a, b) => a - b);
console.log(nums); // [3, 5, 7, 10, 12]`,
    testCases: [
      {
        input: 'nums = [10, 5, 3, 12, 7]',
        output: '[3, 5, 7, 10, 12]'
      }
    ]
  },
  {
    id: 'sorting-2',
    title: 'Sort Numbers Descending',
    description: `Sort an array of numbers in descending order using the sort method with a comparator function.`,
    difficulty: 'Easy',
    category: 'sorting',
    solution: `const nums = [10, 5, 3, 12, 7];
nums.sort((a, b) => b - a);
console.log(nums); // [12, 10, 7, 5, 3]`,
    testCases: [
      {
        input: 'nums = [10, 5, 3, 12, 7]',
        output: '[12, 10, 7, 5, 3]'
      }
    ]
  },
  {
    id: 'sorting-3',
    title: 'Sort Strings Alphabetically',
    description: `Sort an array of strings alphabetically using the sort method.`,
    difficulty: 'Easy',
    category: 'sorting',
    solution: `const fruits = ["Banana", "Apple", "Mango", "Guava"];
fruits.sort();
console.log(fruits); // ["Apple", "Banana", "Guava", "Mango"]`,
    testCases: [
      {
        input: 'fruits = ["Banana", "Apple", "Mango", "Guava"]',
        output: '["Apple", "Banana", "Guava", "Mango"]'
      }
    ]
  },
  {
    id: 'sorting-4',
    title: 'Sort Strings Case-Insensitive',
    description: `Sort an array of strings case-insensitively using localeCompare.`,
    difficulty: 'Easy',
    category: 'sorting',
    solution: `const items = ["banana", "Apple", "Mango", "guava"];
items.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(items); // ["Apple", "banana", "guava", "Mango"]`,
    testCases: [
      {
        input: 'items = ["banana", "Apple", "Mango", "guava"]',
        output: '["Apple", "banana", "guava", "Mango"]'
      }
    ]
  },
  {
    id: 'sorting-5',
    title: 'Sort by String Length',
    description: `Sort an array of strings by their length.`,
    difficulty: 'Easy',
    category: 'sorting',
    solution: `const words = ["apple", "mango", "kiwi", "banana"];
words.sort((a, b) => a.length - b.length);
console.log(words); // ["kiwi", "apple", "mango", "banana"]`,
    testCases: [
      {
        input: 'words = ["apple", "mango", "kiwi", "banana"]',
        output: '["kiwi", "apple", "mango", "banana"]'
      }
    ]
  },
  {
    id: 'sorting-6',
    title: 'Sort Array of Objects by Number',
    description: `Sort an array of objects by a numeric property.`,
    difficulty: 'Medium',
    category: 'sorting',
    solution: `const people = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 30 }
];
people.sort((a, b) => a.age - b.age);
console.log(people); // [{name: 'Bob', age: 22}, {name: 'Alice', age: 28}, {name: 'Charlie', age: 30}]`,
    testCases: [
      {
        input: `people = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 30 }
]`,
        output: `[
  { name: "Bob", age: 22 },
  { name: "Alice", age: 28 },
  { name: "Charlie", age: 30 }
]`
      }
    ]
  },
  {
    id: 'sorting-7',
    title: 'Sort Array of Objects by String',
    description: `Sort an array of objects by a string property using localeCompare.`,
    difficulty: 'Medium',
    category: 'sorting',
    solution: `const people = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 30 }
];
people.sort((a, b) => a.name.localeCompare(b.name));
console.log(people); // [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}]`,
    testCases: [
      {
        input: `people = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 30 }
]`,
        output: `[
  { name: "Alice", age: 28 },
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 30 }
]`
      }
    ]
  },
  {
    id: 'sorting-8',
    title: 'Sort by Date',
    description: `Sort an array of objects by date property from newest to oldest.`,
    difficulty: 'Medium',
    category: 'sorting',
    solution: `const posts = [
  { title: "Post A", date: new Date("2023-04-01") },
  { title: "Post B", date: new Date("2024-01-15") },
  { title: "Post C", date: new Date("2022-10-05") }
];
posts.sort((a, b) => b.date - a.date);
console.log(posts); // Posts sorted by date descending`,
    testCases: [
      {
        input: `posts = [
  { title: "Post A", date: new Date("2023-04-01") },
  { title: "Post B", date: new Date("2024-01-15") },
  { title: "Post C", date: new Date("2022-10-05") }
]`,
        output: `[
  { title: "Post B", date: "2024-01-15" },
  { title: "Post A", date: "2023-04-01" },
  { title: "Post C", date: "2022-10-05" }
]`
      }
    ]
  },
  {
    id: 'sorting-9',
    title: 'Sort with Falsy Values',
    description: `Sort an array containing null and undefined values, treating them as 0.`,
    difficulty: 'Medium',
    category: 'sorting',
    solution: `const scores = [3, null, 7, undefined, 1];
scores.sort((a, b) => (a || 0) - (b || 0));
console.log(scores); // [1, 3, 7, null, undefined]`,
    testCases: [
      {
        input: 'scores = [3, null, 7, undefined, 1]',
        output: '[1, 3, 7, null, undefined]'
      }
    ]
  },
  {
    id: 'sorting-10',
    title: 'Stable Sort by Multiple Conditions',
    description: `Sort an array of objects by multiple conditions, maintaining stability.`,
    difficulty: 'Hard',
    category: 'sorting',
    solution: `const students = [
  { name: "Alice", grade: 90 },
  { name: "Bob", grade: 90 },
  { name: "Eve", grade: 85 }
];
students.sort((a, b) => {
  if (b.grade !== a.grade) return b.grade - a.grade;
  return a.name.localeCompare(b.name);
});
console.log(students); // Sorted by grade (desc) then name (asc)`,
    testCases: [
      {
        input: `students = [
  { name: "Alice", grade: 90 },
  { name: "Bob", grade: 90 },
  { name: "Eve", grade: 85 }
]`,
        output: `[
  { name: "Alice", grade: 90 },
  { name: "Bob", grade: 90 },
  { name: "Eve", grade: 85 }
]`
      }
    ]
  },
  {
    id: 'sorting-11',
    title: 'Sort Numbers as Strings (Wrong way)',
    description: `Demonstrate the incorrect way to sort numbers using the default sort method without a comparator.`,
    difficulty: 'Easy',
    category: 'sorting',
    solution: `const nums = [80, 9, 700];
nums.sort(); 
console.log(nums); // ["700", "80", "9"] (Incorrect unless comparator used)`,
    testCases: [
      {
        input: 'nums = [80, 9, 700]',
        output: '["700", "80", "9"]'
      }
    ]
  },
  {
    id: 'sorting-12',
    title: 'Natural Sorting with Mixed Content',
    description: `Sort alphanumeric strings in a natural way using localeCompare with numeric option.`,
    difficulty: 'Medium',
    category: 'sorting',
    solution: `const files = ["file10.txt", "file2.txt", "file1.txt"];
files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
console.log(files); // ["file1.txt", "file2.txt", "file10.txt"]`,
    testCases: [
      {
        input: 'files = ["file10.txt", "file2.txt", "file1.txt"]',
        output: '["file1.txt", "file2.txt", "file10.txt"]'
      }
    ]
  },
  {
    id: 'sorting-13',
    title: 'Sort by Last Word',
    description: `Sort an array of full names by their last name.`,
    difficulty: 'Medium',
    category: 'sorting',
    solution: `const authors = ["John Smith", "Alice Brown", "Charlie Doe"];
authors.sort((a, b) => {
  const lastA = a.split(" ").pop();
  const lastB = b.split(" ").pop();
  return lastA.localeCompare(lastB);
});
console.log(authors); // ["Alice Brown", "Charlie Doe", "John Smith"]`,
    testCases: [
      {
        input: 'authors = ["John Smith", "Alice Brown", "Charlie Doe"]',
        output: '["Alice Brown", "Charlie Doe", "John Smith"]'
      }
    ]
  },
  {
    id: 'sorting-14',
    title: 'Sort Booleans',
    description: `Sort an array of booleans with true values before false.`,
    difficulty: 'Easy',
    category: 'sorting',
    solution: `const bools = [true, false, true, false, true];
bools.sort((a, b) => b - a);
console.log(bools); // [true, true, true, false, false]`,
    testCases: [
      {
        input: 'bools = [true, false, true, false, true]',
        output: '[true, true, true, false, false]'
      }
    ]
  },
  {
    id: 'sorting-15',
    title: 'Sort Hex Color Codes by Brightness',
    description: `Sort an array of hex color codes by their perceived brightness.`,
    difficulty: 'Hard',
    category: 'sorting',
    solution: `const colors = ['#000000', '#ffffff', '#ff0000'];
colors.sort((a, b) => {
  const brightness = hex => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 255, g = (rgb >> 8) & 255, b = rgb & 255;
    return 0.299*r + 0.587*g + 0.114*b;
  };
  return brightness(a) - brightness(b);
});
console.log(colors); // Sorted by brightness`,
    testCases: [
      {
        input: 'colors = ["#000000", "#ffffff", "#ff0000"]',
        output: '["#000000", "#ff0000", "#ffffff"]'
      }
    ]
  },
  {
    id: 'sorting-16',
    title: 'Sort by Frequency',
    description: `Sort an array by the frequency of its elements, with ties broken by value.`,
    difficulty: 'Hard',
    category: 'sorting',
    solution: `const arr = [1, 2, 3, 2, 1, 1, 4];
arr.sort((a, b) => {
  const freq = {};
  arr.forEach(n => freq[n] = (freq[n] || 0) + 1);
  return freq[b] - freq[a] || a - b;
});
console.log(arr); // [1, 1, 1, 2, 2, 3, 4]`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 2, 1, 1, 4]',
        output: '[1, 1, 1, 2, 2, 3, 4]'
      }
    ]
  },
  {
    id: 'sorting-17',
    title: 'Sort by Custom Order',
    description: `Sort an array of objects based on a predefined priority order.`,
    difficulty: 'Medium',
    category: 'sorting',
    solution: `const priority = ["high", "medium", "low"];
const tasks = [
  { task: "A", level: "medium" },
  { task: "B", level: "high" },
  { task: "C", level: "low" }
];
tasks.sort((a, b) => priority.indexOf(a.level) - priority.indexOf(b.level));
console.log(tasks); // Sorted by priority order`,
    testCases: [
      {
        input: `tasks = [
  { task: "A", level: "medium" },
  { task: "B", level: "high" },
  { task: "C", level: "low" }
]`,
        output: `[
  { task: "B", level: "high" },
  { task: "A", level: "medium" },
  { task: "C", level: "low" }
]`
      }
    ]
  },
  {
    id: 'sorting-18',
    title: 'Sort Randomly (Shuffle)',
    description: `Randomly shuffle an array using sort with Math.random(). Note: This is not cryptographically secure.`,
    difficulty: 'Medium',
    category: 'sorting',
    solution: `const arr = [1, 2, 3, 4, 5];
arr.sort(() => Math.random() - 0.5);
console.log(arr); // Random order`,
    testCases: [
      {
        input: 'arr = [1, 2, 3, 4, 5]',
        output: 'Random order of [1, 2, 3, 4, 5]'
      }
    ]
  },
  {
    id: 'sorting-19',
    title: 'Sort Unicode Characters',
    description: `Sort an array of Unicode characters using localeCompare.`,
    difficulty: 'Medium',
    category: 'sorting',
    solution: `const chars = ['é', 'a', 'z', 'ç', 'ü'];
chars.sort((a, b) => a.localeCompare(b));
console.log(chars); // ['a', 'ç', 'é', 'ü', 'z']`,
    testCases: [
      {
        input: 'chars = ["é", "a", "z", "ç", "ü"]',
        output: '["a", "ç", "é", "ü", "z"]'
      }
    ]
  },
  {
    id: 'sorting-20',
    title: 'Sort Sparse Arrays',
    description: `Sort an array containing holes (undefined values) by treating them as 0.`,
    difficulty: 'Medium',
    category: 'sorting',
    solution: `const arr = [3, , 1, 5, , 2];
arr.sort((a, b) => (a || 0) - (b || 0));
console.log(arr); // [1, 2, 3, 5, , ]`,
    testCases: [
      {
        input: 'arr = [3, , 1, 5, , 2]',
        output: '[1, 2, 3, 5, , ]'
      }
    ]
  }
] 