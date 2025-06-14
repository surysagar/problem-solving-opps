import { Problem } from '@/types'

export const weiredJSProblems: Problem[] = [
  {
    id: 'weird-1',
    title: 'NaN is Weird',
    description: `NaN, short for "Not a Number," is a peculiar beast in JavaScript. It represents a value that is not a legal number. But here's the kicker – NaN is not equal to itself!`,
    difficulty: 'Easy',
    category: 'weired-js',
    solution: `console.log(NaN === NaN); // false`,
    testCases: [{ input: 'NaN === NaN', output: 'false' }],
    explanation: 'NaN is the only value in JavaScript that is not equal to itself. This can lead to unexpected results.'
  },
  {
    id: 'weird-2',
    title: 'The Falsy-Truthy Circus',
    description: `JavaScript's loose equality rules can lead to some unexpected outcomes, especially when dealing with falsy and truthy values.`,
    difficulty: 'Easy',
    category: 'weired-js',
    solution: `console.log(1 == true); // true\nconsole.log(2 == true); // false\nconsole.log(0 == false); // true\nconsole.log("" == false); // true\nconsole.log("" == 0); // true`,
    testCases: [{ input: '1 == true', output: 'true' }],
    explanation: 'Loose equality (==) in JavaScript can coerce types, leading to surprising results.'
  },
  {
    id: 'weird-3',
    title: 'The Curious Case of Coercion',
    description: `JavaScript's automatic type coercion can sometimes lead to bizarre results.`,
    difficulty: 'Easy',
    category: 'weired-js',
    solution: `console.log(1 + "2"); // "12"\nconsole.log(1 - "2"); // -1\nconsole.log(1 * "2"); // 2\nconsole.log(1 / "2"); // 0.5`,
    testCases: [{ input: '1 + "2"', output: '"12"' }],
    explanation: 'JavaScript tries to convert types automatically, which can be confusing if you are not aware of it.'
  },
  {
    id: 'weird-4',
    title: 'The Infamous Callback Hell',
    description: `JavaScript's asynchronous nature can lead to what developers affectionately call "callback hell."`,
    solution: `doSomething(function() {\n  doSomethingElse(function() {\n    doYetAnotherThing(function() {\n      // And it goes on...\n    });\n  });\n});`,
    explanation: 'Deeply nested callbacks make code hard to read and maintain. Promises and async/await help avoid this.'
  },
  {
    id: 'weird-5',
    title: 'The Strange Case of "this"',
    description: `The behavior of the this keyword in JavaScript can be perplexing, especially for newcomers.`,
    solution: `const obj = {\n  foo: function() {\n    console.log(this === obj);\n  }\n};\nobj.foo(); // true\nconst bar = obj.foo;\nbar(); // false`,
    explanation: 'The value of this depends on how a function is called, not where it is defined.'
  },
  {
    id: 'weird-6',
    title: 'The Mysterious Closure',
    description: `Closures in JavaScript are powerful, but they can also be a source of confusion for many developers.`,
    solution: `function outer() {\n  let count = 0;\n  function inner() {\n    count++;\n    console.log(count);\n  }\n  return inner;\n}\nconst closureFunc = outer();\nclosureFunc(); // Output: 1\nclosureFunc(); // Output: 2`,
    explanation: 'A closure allows a function to access variables from its outer scope even after the outer function has finished executing.'
  },
  {
    id: 'weird-7',
    title: 'The Elusive ===',
    description: `Even strict equality (===) can have quirks in JavaScript.`,
    solution: `console.log(NaN === NaN); // false\nconsole.log(+0 === -0); // true`,
    explanation: 'NaN is never equal to itself, and +0 and -0 are considered equal in JavaScript.'
  },
  {
    id: 'weird-8',
    title: 'The Surreal World of Hoisting',
    description: `JavaScript's variable and function declarations are hoisted to the top of their containing scope during compilation.`,
    solution: `console.log(x); // undefined\nvar x = 5;\nsayHello(); // "Hello, world!"\nfunction sayHello() {\n  console.log("Hello, world!");\n}`,
    explanation: 'Variable declarations (but not initializations) and function declarations are hoisted to the top of their scope.'
  },
  {
    id: 'weird-9',
    title: 'The Perplexing typeof Operator',
    description: `The typeof operator in JavaScript is used to determine the data type of its operand, but can yield puzzling results.`,
    solution: `console.log(typeof null); // "object"\nconsole.log(typeof []); // "object"\nconsole.log(typeof function() {}); // "function"`,
    explanation: 'typeof null returns "object" (a long-standing bug), and arrays are also considered objects.'
  },
  {
    id: 'weird-10',
    title: 'The Whimsical for...in Loop',
    description: `The for...in loop in JavaScript can traverse unexpected properties inherited from the object's prototype chain.`,
    solution: `const person = { name: "Alice", age: 30 };\nObject.prototype.sayHello = function() { console.log("Hello!"); };\nfor (const prop in person) {\n  console.log(prop); // "name", "age", "sayHello"\n}`,
    explanation: 'for...in iterates over all enumerable properties, including those inherited from the prototype chain.'
  },
  {
    id: 'weird-11',
    title: 'The Bewildering eval() Function',
    description: `JavaScript's eval() function can execute JavaScript code represented as a string.`,
    solution: `const x = 10;\nconst y = 20;\nconst result = eval('x + y');\nconsole.log(result); // 30`,
    explanation: 'eval() can execute code dynamically, but it is a security risk and should be avoided.'
  },
  {
    id: 'weird-12',
    title: 'The Mysterious void Operator',
    description: `The void operator evaluates an expression and then returns undefined.`,
    solution: `const result = void 42;\nconsole.log(result); // undefined`,
    explanation: 'void is rarely used, but it always returns undefined.'
  },
  {
    id: 'weird-13',
    title: 'The Uncanny with Statement',
    description: `The with statement extends the scope chain for a statement.`,
    solution: `const obj = { x: 10 };\nwith (obj) {\n  console.log(x); // 10\n}`,
    explanation: 'with is discouraged because it makes code harder to understand and debug.'
  },
  {
    id: 'weird-14',
    title: 'The Cryptic delete Operator',
    description: `The delete operator removes a property from an object.`,
    solution: `const obj = { x: 10 };\ndelete obj.x;\nconsole.log(obj.x); // undefined`,
    explanation: 'delete only removes own properties, not those inherited from the prototype chain.'
  },
  {
    id: 'weird-15',
    title: 'The Strange arguments Object',
    description: `Inside functions, the arguments object provides access to all arguments passed to the function.`,
    solution: `function sum() {\n  let total = 0;\n  for (let i = 0; i < arguments.length; i++) {\n    total += arguments[i];\n  }\n  return total;\n}\nconsole.log(sum(1, 2, 3)); // 6`,
    explanation: 'arguments is array-like but not a real array. Use rest parameters (...args) in modern code.'
  },
  {
    id: 'weird-16',
    title: 'The Esoteric Generator Functions',
    description: `Generator functions allow you to define an iterative algorithm by writing a single function with multiple yield expressions.`,
    solution: `function* generateSequence() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\nconst sequence = generateSequence();\nconsole.log(sequence.next().value); // 1\nconsole.log(sequence.next().value); // 2\nconsole.log(sequence.next().value); // 3`,
    explanation: 'Generators can pause and resume execution, making them useful for iterators and async flows.'
  },
  {
    id: 'weird-17',
    title: 'The Enigmatic Proxy Object',
    description: `The Proxy object enables you to create a proxy for another object, allowing you to intercept and customize operations.`,
    solution: `const target = {};\nconst handler = { get: function(target, prop) { return prop in target ? target[prop] : 0; } };\nconst proxy = new Proxy(target, handler);\nconsole.log(proxy.foo); // 0`,
    explanation: 'Proxies can be used for logging, validation, and more by intercepting object operations.'
  },
  {
    id: 'weird-18',
    title: 'The Eccentric Array Methods',
    description: `JavaScript arrays come with a plethora of methods for manipulation and traversal, such as map(), filter(), and reduce().`,
    solution: `const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]`,
    explanation: 'Array methods enable concise and expressive code using a functional programming style.'
  },
  {
    id: 'weird-19',
    title: 'The Curious Symbol.species Property',
    description: `The Symbol.species property allows you to customize the constructor function used to create derived objects.`,
    solution: `class MyArray extends Array {\n  static get [Symbol.species]() { return Array; }\n}\nconst myArray = new MyArray(1, 2, 3);\nconst mapped = myArray.map(x => x * x);\nconsole.log(mapped instanceof MyArray); // false\nconsole.log(mapped instanceof Array); // true`,
    explanation: 'Symbol.species lets you control what constructor is used for derived objects in subclassed arrays.'
  },
  {
    id: 'weird-20',
    title: 'The Intriguing Intl Object',
    description: `The Intl object provides language-sensitive functionalities for internationalization and localization.`,
    solution: `const date = new Date();\nconst formatted = new Intl.DateTimeFormat('en-US').format(date);\nconsole.log(formatted); // e.g., "4/10/2024"`,
    explanation: 'Intl provides robust support for formatting dates, numbers, and more for different locales.'
  },
  {
    id: 'weird-21',
    title: 'The Bizarre Falsy Behavior of Empty Arrays',
    description: `Empty arrays in JavaScript are considered truthy, contrary to what one might expect.`,
    solution: `if ([]) {\n  console.log("An empty array is truthy!"); // Output: "An empty array is truthy!"\n}`,
    explanation: 'All arrays, even empty ones, are truthy in JavaScript.'
  },
  {
    id: 'weird-22',
    title: 'The Confounding String Concatenation',
    description: `String concatenation in JavaScript can sometimes lead to unexpected results.`,
    solution: `console.log("2" + 2); // "22"\nconsole.log(2 + "2"); // "22"`,
    explanation: 'When one operand is a string, + performs string concatenation.'
  },
  {
    id: 'weird-23',
    title: 'The Eccentric Array Length Property',
    description: `The length property of arrays can be manipulated directly, leading to unexpected outcomes.`,
    solution: `const arr = [1, 2, 3];\narr.length = 0;\nconsole.log(arr); // []`,
    explanation: 'Setting array.length to a smaller value truncates the array.'
  },
  {
    id: 'weird-24',
    title: 'The Quirky Date Object',
    description: `Working with dates in JavaScript can be quite peculiar, especially with months indexed from 0.`,
    solution: `const date = new Date(2024, 3, 10);\nconsole.log(date); // 2024-04-10T00:00:00.000Z`,
    explanation: 'Months in JavaScript Date are zero-based (0 = January, 3 = April).'
  },
  {
    id: 'weird-25',
    title: 'The Curious Case of undefined',
    description: `Accessing properties of undefined variables doesn't throw an error in JavaScript; instead, it returns undefined.`,
    solution: `const obj = {};\nconsole.log(obj.foo); // undefined`,
    explanation: 'Accessing a non-existent property on an object returns undefined, not an error.'
  }
] 