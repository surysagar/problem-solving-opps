import { Problem } from '@/types'

export const objectArrayMixProblems: Problem[] = [
  {
    id: 1,
    title: 'Simple Object Destructuring',
    description: 'Learn how to destructure object properties into variables.',
    difficulty: 'Easy',
    category: 'object-array-mix',
    solution: `// Basic object destructuring
const user = { name: 'Alice', age: 25 };
const { name, age } = user;
console.log(name, age); // Alice 25

// Destructuring with default values
const { name: userName = 'Guest', role = 'user' } = user;
console.log(userName, role); // Alice user

// Destructuring in function parameters
function printUser({ name, age }) {
  console.log(\`\${name} is \${age} years old\`);
}
printUser(user); // Alice is 25 years old`,
    testCases: [
      {
        input: 'const obj = { x: 1, y: 2 }; const { x, y } = obj; [x, y]',
        expectedOutput: '[1, 2]'
      },
      {
        input: 'const obj = { a: 1 }; const { a, b = 2 } = obj; [a, b]',
        expectedOutput: '[1, 2]'
      }
    ]
  },
  {
    id: 2,
    title: 'Array of Objects - Map to Extract Property',
    description: 'Learn how to extract specific properties from an array of objects using map.',
    difficulty: 'Easy',
    category: 'object-array-mix',
    solution: `// Extract names from array of objects
const users = [{ name: 'A' }, { name: 'B' }];
const names = users.map(u => u.name);
console.log(names); // ['A', 'B']

// Extract multiple properties
const usersWithAge = [
  { name: 'A', age: 20 },
  { name: 'B', age: 30 }
];
const userInfo = usersWithAge.map(({ name, age }) => ({ name, age }));
console.log(userInfo); // [{ name: 'A', age: 20 }, { name: 'B', age: 30 }]`,
    testCases: [
      {
        input: '[{ id: 1 }, { id: 2 }].map(x => x.id)',
        expectedOutput: '[1, 2]'
      },
      {
        input: '[{ a: 1, b: 2 }, { a: 3, b: 4 }].map(({ a, b }) => a + b)',
        expectedOutput: '[3, 7]'
      }
    ]
  },
  {
    id: 3,
    title: 'Object with Array Property',
    description: 'Learn how to work with objects that contain array properties.',
    difficulty: 'Easy',
    category: 'object-array-mix',
    solution: `// Object with array property
const person = { 
  name: 'Alice', 
  hobbies: ['reading', 'coding'] 
};

// Access array elements
console.log(person.hobbies[1]); // coding

// Modify array
person.hobbies.push('gaming');
console.log(person.hobbies); // ['reading', 'coding', 'gaming']

// Array methods on object property
const totalHobbies = person.hobbies.length;
console.log(totalHobbies); // 3`,
    testCases: [
      {
        input: 'const obj = { arr: [1, 2, 3] }; obj.arr[1]',
        expectedOutput: '2'
      },
      {
        input: 'const obj = { arr: [1, 2] }; obj.arr.push(3); obj.arr',
        expectedOutput: '[1, 2, 3]'
      }
    ]
  },
  {
    id: 4,
    title: 'Object.entries() on Nested Object',
    description: 'Learn how to use Object.entries() to iterate over object properties.',
    difficulty: 'Medium',
    category: 'object-array-mix',
    solution: `// Basic Object.entries usage
const obj = { a: 1, b: 2 };
Object.entries(obj).forEach(([key, value]) => 
  console.log(key, value)
);

// Convert to array of pairs
const pairs = Object.entries(obj);
console.log(pairs); // [['a', 1], ['b', 2]]

// Create new object from entries
const newObj = Object.fromEntries(pairs);
console.log(newObj); // { a: 1, b: 2 }`,
    testCases: [
      {
        input: 'Object.entries({ x: 1, y: 2 })',
        expectedOutput: '[["x", 1], ["y", 2]]'
      },
      {
        input: 'Object.fromEntries([["a", 1], ["b", 2]])',
        expectedOutput: '{ a: 1, b: 2 }'
      }
    ]
  },
  {
    id: 5,
    title: 'Merge Two Objects (Spread Operator)',
    description: 'Learn how to merge objects using the spread operator.',
    difficulty: 'Easy',
    category: 'object-array-mix',
    solution: `// Basic object merge
const a = { x: 1 };
const b = { y: 2 };
const c = { ...a, ...b };
console.log(c); // { x: 1, y: 2 }

// Merge with property override
const d = { x: 1, y: 2 };
const e = { y: 3, z: 4 };
const f = { ...d, ...e };
console.log(f); // { x: 1, y: 3, z: 4 }

// Merge multiple objects
const g = { ...a, ...b, ...d };
console.log(g); // { x: 1, y: 2 }`,
    testCases: [
      {
        input: '{ ...{ a: 1 }, ...{ b: 2 } }',
        expectedOutput: '{ a: 1, b: 2 }'
      },
      {
        input: '{ ...{ a: 1 }, ...{ a: 2 } }',
        expectedOutput: '{ a: 2 }'
      }
    ]
  },
  {
    id: 6,
    title: 'Filter Array of Objects',
    description: 'Learn how to filter arrays containing objects based on property values.',
    difficulty: 'Medium',
    category: 'object-array-mix',
    solution: `// Filter objects by property value
const products = [
  { price: 100, name: 'A' },
  { price: 200, name: 'B' }
];
const filtered = products.filter(p => p.price > 150);
console.log(filtered); // [{ price: 200, name: 'B' }]

// Filter with multiple conditions
const users = [
  { age: 20, role: 'user' },
  { age: 30, role: 'admin' }
];
const admins = users.filter(u => u.age > 25 && u.role === 'admin');
console.log(admins); // [{ age: 30, role: 'admin' }]`,
    testCases: [
      {
        input: '[{ x: 1 }, { x: 2 }].filter(obj => obj.x > 1)',
        expectedOutput: '[{ x: 2 }]'
      },
      {
        input: '[{ a: 1, b: 2 }, { a: 2, b: 1 }].filter(obj => obj.a > obj.b)',
        expectedOutput: '[{ a: 2, b: 1 }]'
      }
    ]
  },
  {
    id: 7,
    title: 'Nested Destructuring',
    description: 'Learn how to destructure nested objects and arrays.',
    difficulty: 'Hard',
    category: 'object-array-mix',
    solution: `// Nested object destructuring
const data = { 
  user: { 
    id: 1, 
    info: { 
      email: 'a@b.com' 
    } 
  } 
};
const { user: { info: { email } } } = data;
console.log(email); // a@b.com

// Nested array destructuring
const arr = [1, [2, 3], 4];
const [first, [second, third], fourth] = arr;
console.log(first, second, third, fourth); // 1 2 3 4

// Mixed destructuring
const mixed = {
  user: {
    name: 'John',
    scores: [80, 90, 100]
  }
};
const { user: { name, scores: [firstScore, ...rest] } } = mixed;
console.log(name, firstScore, rest); // John 80 [90, 100]`,
    testCases: [
      {
        input: 'const { a: { b: { c } } } = { a: { b: { c: 1 } } }; c',
        expectedOutput: '1'
      },
      {
        input: 'const [a, [b, c]] = [1, [2, 3]]; [a, b, c]',
        expectedOutput: '[1, 2, 3]'
      }
    ]
  },
  {
    id: 8,
    title: 'Group by Property',
    description: 'Learn how to group array elements by a specific property.',
    difficulty: 'Hard',
    category: 'object-array-mix',
    solution: `// Group array elements by property
const arr = [
  { category: 'fruit', item: 'apple' },
  { category: 'vegetable', item: 'carrot' },
  { category: 'fruit', item: 'banana' }
];

const grouped = arr.reduce((acc, obj) => {
  acc[obj.category] = acc[obj.category] || [];
  acc[obj.category].push(obj.item);
  return acc;
}, {});

console.log(grouped);
// { fruit: ['apple', 'banana'], vegetable: ['carrot'] }

// Group with multiple properties
const items = [
  { type: 'A', value: 1 },
  { type: 'B', value: 2 },
  { type: 'A', value: 3 }
];

const groupedByType = items.reduce((acc, item) => {
  if (!acc[item.type]) {
    acc[item.type] = [];
  }
  acc[item.type].push(item.value);
  return acc;
}, {});

console.log(groupedByType); // { A: [1, 3], B: [2] }`,
    testCases: [
      {
        input: '[{ type: "A" }, { type: "B" }, { type: "A" }].reduce((acc, obj) => { acc[obj.type] = (acc[obj.type] || 0) + 1; return acc; }, {})',
        expectedOutput: '{ A: 2, B: 1 }'
      },
      {
        input: '[{ x: 1, y: "a" }, { x: 2, y: "b" }, { x: 1, y: "c" }].reduce((acc, obj) => { acc[obj.x] = (acc[obj.x] || []).concat(obj.y); return acc; }, {})',
        expectedOutput: '{ 1: ["a", "c"], 2: ["b"] }'
      }
    ]
  },
  {
    id: 9,
    title: 'Convert Array to Object',
    description: 'Learn different ways to convert arrays to objects.',
    difficulty: 'Medium',
    category: 'object-array-mix',
    solution: `// Convert array to object using Object.assign
const arr = ['a', 'b', 'c'];
const obj = Object.assign({}, arr);
console.log(obj); // {0: 'a', 1: 'b', 2: 'c'}

// Convert using reduce
const obj2 = arr.reduce((acc, val, idx) => {
  acc[idx] = val;
  return acc;
}, {});

// Convert array of pairs to object
const pairs = [['a', 1], ['b', 2]];
const obj3 = Object.fromEntries(pairs);
console.log(obj3); // { a: 1, b: 2 }`,
    testCases: [
      {
        input: 'Object.assign({}, ["a", "b"])',
        expectedOutput: '{ 0: "a", 1: "b" }'
      },
      {
        input: 'Object.fromEntries([["x", 1], ["y", 2]])',
        expectedOutput: '{ x: 1, y: 2 }'
      }
    ]
  },
  {
    id: 10,
    title: 'Array of Objects to One Object (reduce)',
    description: 'Learn how to transform an array of objects into a single object.',
    difficulty: 'Hard',
    category: 'object-array-mix',
    solution: `// Convert array of objects to single object
const arr = [
  { id: 1, val: 'a' },
  { id: 2, val: 'b' }
];

// Using reduce
const obj = arr.reduce((acc, curr) => {
  acc[curr.id] = curr.val;
  return acc;
}, {});

console.log(obj); // {1: 'a', 2: 'b'}

// Using Object.fromEntries
const obj2 = Object.fromEntries(
  arr.map(({ id, val }) => [id, val])
);

// Complex transformation
const users = [
  { id: 1, name: 'John', role: 'admin' },
  { id: 2, name: 'Jane', role: 'user' }
];

const userMap = users.reduce((acc, user) => {
  acc[user.id] = {
    name: user.name,
    role: user.role
  };
  return acc;
}, {});

console.log(userMap);
// {
//   1: { name: 'John', role: 'admin' },
//   2: { name: 'Jane', role: 'user' }
// }`,
    testCases: [
      {
        input: '[{ id: 1, val: "a" }, { id: 2, val: "b" }].reduce((acc, curr) => { acc[curr.id] = curr.val; return acc; }, {})',
        expectedOutput: '{ 1: "a", 2: "b" }'
      },
      {
        input: 'Object.fromEntries([{ id: 1, val: "a" }, { id: 2, val: "b" }].map(({ id, val }) => [id, val]))',
        expectedOutput: '{ 1: "a", 2: "b" }'
      }
    ]
  },
  {
    id: 11,
    title: 'Flatten Nested Object',
    description: 'Learn how to flatten nested objects into a single-level object.',
    difficulty: 'Hard',
    category: 'object-array-mix',
    solution: `// Flatten nested object (1 level)
const nested = { a: 1, b: { c: 2, d: 3 } };
const flat = { ...nested, ...nested.b };
delete flat.b;
console.log(flat); // { a: 1, c: 2, d: 3 }

// Recursive flatten
function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? \`\${prefix}.\${k}\` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      Object.assign(acc, flattenObject(obj[k], pre));
    } else {
      acc[pre] = obj[k];
    }
    return acc;
  }, {});
}

const deep = { a: { b: { c: 1 } }, d: 2 };
console.log(flattenObject(deep));
// { 'a.b.c': 1, 'd': 2 }`,
    testCases: [
      {
        input: 'const obj = { a: 1, b: { c: 2 } }; const flat = { ...obj, ...obj.b }; delete flat.b; flat',
        expectedOutput: '{ a: 1, c: 2 }'
      },
      {
        input: 'flattenObject({ a: { b: 1 }, c: 2 })',
        expectedOutput: '{ "a.b": 1, "c": 2 }'
      }
    ]
  },
  {
    id: 12,
    title: 'Create Object from Pairs',
    description: 'Learn how to create objects from arrays of key-value pairs.',
    difficulty: 'Medium',
    category: 'object-array-mix',
    solution: `// Create object from array of pairs
const pairs = [['x', 10], ['y', 20]];
const obj = Object.fromEntries(pairs);
console.log(obj); // { x: 10, y: 20 }

// Create from array of objects
const items = [
  { key: 'a', value: 1 },
  { key: 'b', value: 2 }
];
const obj2 = Object.fromEntries(
  items.map(({ key, value }) => [key, value])
);
console.log(obj2); // { a: 1, b: 2 }

// Create with transformation
const data = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];
const userMap = Object.fromEntries(
  data.map(user => [user.id, user.name])
);
console.log(userMap); // { 1: 'John', 2: 'Jane' }`,
    testCases: [
      {
        input: 'Object.fromEntries([["a", 1], ["b", 2]])',
        expectedOutput: '{ a: 1, b: 2 }'
      },
      {
        input: 'Object.fromEntries([{ k: "x", v: 1 }, { k: "y", v: 2 }].map(({ k, v }) => [k, v]))',
        expectedOutput: '{ x: 1, y: 2 }'
      }
    ]
  },
  {
    id: 13,
    title: 'Mutate Values in Array of Objects',
    description: 'Learn how to modify values in arrays of objects.',
    difficulty: 'Medium',
    category: 'object-array-mix',
    solution: `// Mutate values in array of objects
const users = [{ score: 10 }, { score: 20 }];
users.forEach(u => u.score *= 2);
console.log(users); // [{score: 20}, {score: 40}]

// Create new array instead of mutating
const users2 = [{ score: 10 }, { score: 20 }];
const updated = users2.map(u => ({
  ...u,
  score: u.score * 2
}));
console.log(updated); // [{score: 20}, {score: 40}]

// Complex mutation
const data = [
  { value: 1, multiplier: 2 },
  { value: 2, multiplier: 3 }
];
data.forEach(item => {
  item.result = item.value * item.multiplier;
});
console.log(data);
// [{ value: 1, multiplier: 2, result: 2 },
//  { value: 2, multiplier: 3, result: 6 }]`,
    testCases: [
      {
        input: 'const arr = [{ x: 1 }, { x: 2 }]; arr.forEach(obj => obj.x *= 2); arr',
        expectedOutput: '[{ x: 2 }, { x: 4 }]'
      },
      {
        input: '[{ a: 1 }, { a: 2 }].map(obj => ({ ...obj, a: obj.a * 2 }))',
        expectedOutput: '[{ a: 2 }, { a: 4 }]'
      }
    ]
  },
  {
    id: 14,
    title: 'Object.keys with Array',
    description: 'Learn how to use Object.keys with array-like objects.',
    difficulty: 'Easy',
    category: 'object-array-mix',
    solution: `// Object.keys with array-like object
const obj = { 0: 'a', 1: 'b' };
console.log(Object.keys(obj)); // ['0', '1']

// Convert array to object and get keys
const arr = ['a', 'b', 'c'];
const obj2 = Object.assign({}, arr);
console.log(Object.keys(obj2)); // ['0', '1', '2']

// Get keys of array-like object with gaps
const sparse = { 0: 'a', 2: 'c' };
console.log(Object.keys(sparse)); // ['0', '2']`,
    testCases: [
      {
        input: 'Object.keys({ 0: "a", 1: "b" })',
        expectedOutput: '["0", "1"]'
      },
      {
        input: 'Object.keys(Object.assign({}, ["a", "b"]))',
        expectedOutput: '["0", "1"]'
      }
    ]
  },
  {
    id: 15,
    title: 'Check Object Property Exists',
    description: 'Learn different ways to check if a property exists in an object.',
    difficulty: 'Easy',
    category: 'object-array-mix',
    solution: `// Check property exists
const user = { name: 'John' };

// Using in operator
console.log('name' in user); // true
console.log('age' in user); // false

// Using hasOwnProperty
console.log(user.hasOwnProperty('name')); // true

// Using Object.prototype.hasOwnProperty
console.log(Object.prototype.hasOwnProperty.call(user, 'name')); // true

// Using optional chaining
console.log(user?.name); // John
console.log(user?.age); // undefined`,
    testCases: [
      {
        input: '"name" in { name: "John" }',
        expectedOutput: 'true'
      },
      {
        input: 'Object.prototype.hasOwnProperty.call({ name: "John" }, "name")',
        expectedOutput: 'true'
      }
    ]
  },
  {
    id: 16,
    title: 'Transform Object Values',
    description: 'Learn how to transform values in an object while maintaining the structure.',
    difficulty: 'Medium',
    category: 'object-array-mix',
    solution: `// Transform object values
const obj = { a: 1, b: 2 };

// Using Object.entries and Object.fromEntries
const doubled = Object.fromEntries(
  Object.entries(obj).map(([k, v]) => [k, v * 2])
);
console.log(doubled); // { a: 2, b: 4 }

// Using reduce
const tripled = Object.entries(obj).reduce((acc, [key, value]) => {
  acc[key] = value * 3;
  return acc;
}, {});

// Complex transformation
const data = {
  price: 100,
  quantity: 2
};
const total = Object.entries(data).reduce((acc, [key, value]) => {
  if (key === 'price') acc.total = value;
  if (key === 'quantity') acc.total *= value;
  return acc;
}, {});
console.log(total); // { total: 200 }`,
    testCases: [
      {
        input: 'Object.fromEntries(Object.entries({ a: 1, b: 2 }).map(([k, v]) => [k, v * 2]))',
        expectedOutput: '{ a: 2, b: 4 }'
      },
      {
        input: 'Object.entries({ x: 1, y: 2 }).reduce((acc, [k, v]) => { acc[k] = v * 3; return acc; }, {})',
        expectedOutput: '{ x: 3, y: 6 }'
      }
    ]
  },
  {
    id: 17,
    title: 'Combine Arrays inside Object',
    description: 'Learn how to combine arrays stored as object properties.',
    difficulty: 'Medium',
    category: 'object-array-mix',
    solution: `// Combine arrays from object properties
const obj = {
  group1: [1, 2],
  group2: [3, 4]
};
const combined = [...obj.group1, ...obj.group2];
console.log(combined); // [1, 2, 3, 4]

// Combine with transformation
const data = {
  numbers: [1, 2],
  letters: ['a', 'b']
};
const result = [
  ...data.numbers.map(n => n * 2),
  ...data.letters.map(l => l.toUpperCase())
];
console.log(result); // [2, 4, 'A', 'B']

// Combine with filtering
const mixed = {
  evens: [2, 4, 6],
  odds: [1, 3, 5]
};
const allEvens = [
  ...mixed.evens,
  ...mixed.odds.filter(n => n % 2 === 0)
];
console.log(allEvens); // [2, 4, 6]`,
    testCases: [
      {
        input: 'const obj = { a: [1, 2], b: [3, 4] }; [...obj.a, ...obj.b]',
        expectedOutput: '[1, 2, 3, 4]'
      },
      {
        input: 'const obj = { x: [1, 2], y: [3, 4] }; [...obj.x.map(n => n * 2), ...obj.y]',
        expectedOutput: '[2, 4, 3, 4]'
      }
    ]
  },
  {
    id: 18,
    title: 'Chain flatMap on Array of Objects',
    description: 'Learn how to use flatMap to transform and flatten arrays of objects.',
    difficulty: 'Hard',
    category: 'object-array-mix',
    solution: `// Chain flatMap on array of objects
const items = [
  { id: 1, tags: ['a', 'b'] },
  { id: 2, tags: ['b', 'c'] }
];

// Get all unique tags
const allTags = items.flatMap(item => item.tags);
const uniqueTags = [...new Set(allTags)];
console.log(uniqueTags); // ['a', 'b', 'c']

// Complex transformation
const users = [
  { name: 'John', roles: ['admin', 'user'] },
  { name: 'Jane', roles: ['user'] }
];

const roleUsers = users.flatMap(user =>
  user.roles.map(role => ({
    name: user.name,
    role: role
  }))
);

console.log(roleUsers);
// [
//   { name: 'John', role: 'admin' },
//   { name: 'John', role: 'user' },
//   { name: 'Jane', role: 'user' }
// ]`,
    testCases: [
      {
        input: '[{ tags: ["a", "b"] }, { tags: ["b", "c"] }].flatMap(x => x.tags)',
        expectedOutput: '["a", "b", "b", "c"]'
      },
      {
        input: '[...new Set([{ tags: ["a", "b"] }, { tags: ["b", "c"] }].flatMap(x => x.tags))]',
        expectedOutput: '["a", "b", "c"]'
      }
    ]
  },
  {
    id: 19,
    title: 'Update Specific Object in Array by ID',
    description: 'Learn how to update specific objects in an array based on their ID.',
    difficulty: 'Medium',
    category: 'object-array-mix',
    solution: `// Update object in array by ID
const arr = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' }
];

// Update single object
const updated = arr.map(obj =>
  obj.id === 2 ? { ...obj, name: 'Updated' } : obj
);
console.log(updated);
// [{ id: 1, name: 'A' }, { id: 2, name: 'Updated' }]

// Update multiple objects
const updates = { 1: { name: 'New A' }, 2: { name: 'New B' } };
const updated2 = arr.map(obj =>
  updates[obj.id] ? { ...obj, ...updates[obj.id] } : obj
);

// Complex update with conditions
const users = [
  { id: 1, role: 'user', active: true },
  { id: 2, role: 'admin', active: false }
];

const updatedUsers = users.map(user =>
  user.role === 'admin' && !user.active
    ? { ...user, active: true }
    : user
);`,
    testCases: [
      {
        input: '[{ id: 1, x: 1 }, { id: 2, x: 2 }].map(obj => obj.id === 2 ? { ...obj, x: 3 } : obj)',
        expectedOutput: '[{ id: 1, x: 1 }, { id: 2, x: 3 }]'
      },
      {
        input: '[{ id: 1, role: "user" }, { id: 2, role: "admin" }].map(obj => obj.role === "admin" ? { ...obj, role: "superadmin" } : obj)',
        expectedOutput: '[{ id: 1, role: "user" }, { id: 2, role: "superadmin" }]'
      }
    ]
  },
  {
    id: 20,
    title: 'Find Duplicate Objects in Array',
    description: 'Learn how to find duplicate objects in an array based on their properties.',
    difficulty: 'Hard',
    category: 'object-array-mix',
    solution: `// Find duplicate objects
const arr = [
  { name: 'A', age: 1 },
  { name: 'B', age: 2 },
  { name: 'A', age: 1 }
];

// Find duplicates by comparing all properties
const duplicates = arr.filter((item, index, self) =>
  index !== self.findIndex(obj =>
    JSON.stringify(obj) === JSON.stringify(item)
  )
);
console.log(duplicates); // [{ name: 'A', age: 1 }]

// Find duplicates by specific property
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' }
];

const duplicateIds = users.filter((user, index, self) =>
  index !== self.findIndex(u => u.id === user.id)
);

// Find duplicates with custom comparison
const items = [
  { value: 'a', count: 1 },
  { value: 'b', count: 2 },
  { value: 'a', count: 3 }
];

const duplicateValues = items.filter((item, index, self) =>
  index !== self.findIndex(i => i.value === item.value)
);`,
    testCases: [
      {
        input: '[{ x: 1 }, { x: 2 }, { x: 1 }].filter((item, i, self) => i !== self.findIndex(obj => obj.x === item.x))',
        expectedOutput: '[{ x: 1 }]'
      },
      {
        input: '[{ id: 1 }, { id: 2 }, { id: 1 }].filter((item, i, self) => i !== self.findIndex(obj => obj.id === item.id))',
        expectedOutput: '[{ id: 1 }]'
      }
    ]
  }
] 