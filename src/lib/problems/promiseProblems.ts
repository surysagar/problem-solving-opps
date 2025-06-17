import { Problem } from '@/types'

export const promiseProblems: Problem[] = [
  {
    id: 'promise-1',
    title: 'What is a Promise in JavaScript?',
    description: `A Promise is a special JavaScript object that represents the eventual result of an asynchronous action.\n\n- You can pass a callback to a Promise constructor.\n- You typically return a Promise from a function to signal asynchronous work.\n- A Promise has 3 states: 'pending', 'fulfilled', and 'rejected'.\n- A Promise can be used to handle asynchronous operations in a more manageable way than callbacks.`,
    difficulty: 'Easy',
    category: 'promise',
    solution: `// Example: Returning a Promise\nfunction fetchData() {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      resolve('data loaded');\n    }, 1000);\n  });\n}\n\nconst promise = fetchData();\npromise.then(result => console.log(result)); // 'data loaded'\n\n// States:\n// 1. pending: initial state, neither fulfilled nor rejected\n// 2. fulfilled: operation completed successfully\n// 3. rejected: operation failed`,
    testCases: [
      { input: 'fetchData().then(r => r)', output: 'data loaded' }
    ],
    explanation: `A Promise represents a value that may be available now, later, or never.\nYou can chain .then() and .catch() to handle fulfilled and rejected states.\nPromises help avoid callback hell and make async code easier to read.`
  },
  {
    id: 'promise-2',
    title: 'Example: Rejected Promise Console Output',
    description: 'See how a rejected Promise appears in the browser console.',
    difficulty: 'Easy',
    category: 'promise',
    solution: `const myPromise = new Promise(function (resolve, reject) {\n  reject('reason');\n});\nconsole.log(myPromise);\n\n/*\nPromise <rejected>: "reason"\n  __proto__: Promise\n    [[PromiseStatus]]: "rejected"\n    [[PromiseValue]]: "reason"\n*/`,
    testCases: [],
    explanation: 'When a Promise is rejected, logging it in the browser console shows its status as "rejected" and the rejection reason.'
  },
  {
    id: 'promise-3',
    title: 'Promise: Only the First Call Matters',
    description: 'What happens if you call both resolve and reject in a Promise? See the console output.',
    difficulty: 'Easy',
    category: 'promise',
    solution: `const myPromise = new Promise(function (resolve, reject) {
  resolve('value');
  resolve('value2');
  reject('reason');
});
console.log(myPromise);

/*
Promise <resolved>: "value"
  __proto__: Promise
    [[PromiseStatus]]: "resolved"
    [[PromiseValue]]: "value"
*/`,
    testCases: [],
    explanation: `In a Promise, only the first call to either resolve or reject has any effect. Subsequent calls are ignored. In this example, resolve('value') is called first, so the Promise is fulfilled with 'value'. The later resolve('value2') and reject('reason') calls do nothing. This is why the console shows the Promise as resolved with the value 'value'.\n\nWhy? The Promise specification states that a Promise can only transition from 'pending' to either 'fulfilled' or 'rejected' once. After this transition, any further calls to resolve or reject are ignored. That's why only the first resolve('value') matters, and the Promise is resolved with 'value', not 'value2'.`
  },
  {
    id: 'promise-4',
    title: 'Promise .then() is Asynchronous',
    description: 'Demonstrates that code after myPromise.then runs before the onFulfilled function.',
    difficulty: 'Easy',
    category: 'promise',
    solution: `const myPromise = new Promise(function (resolve, reject) {
  resolve('Hello world');
});
myPromise.then(value => {
  console.log('This is inside the onFulfilled function');
});
console.log('This is written after myPromise.then');

// Output:
// This is written after myPromise.then
// This is inside the onFulfilled function`,
    testCases: [],
    explanation: `Even though resolve is called immediately, the function passed to .then() is always executed asynchronously, after the current call stack is empty. That's why 'This is written after myPromise.then' is logged first, and only then does the onFulfilled function run. This is part of the JavaScript event loop and microtask queue behavior.`
  },
  {
    id: 'promise-5',
    title: 'Promise with Async Operation and Input Validation',
    description: 'A function that returns a Promise, validates input, and resolves after a delay.',
    difficulty: 'Easy',
    category: 'promise',
    solution: `function calculateSquare(number) {
  const promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (typeof number !== 'number') {
        return reject(new Error('Argument of type number is expected'));
      }
      const result = number * number;
      resolve(result);
    }, 1000);
  });
  return promise;
}

calculateSquare(2)
  .then(value => {
    console.log('Success: ' + value);
  }, reason => {
    console.log('Error: ' + reason);
  });

// Output:
// Promise <pending>
// Success: 4`,
    testCases: [],
    explanation: `This example shows a function that returns a Promise, performs input validation, and resolves asynchronously after a delay. If the input is not a number, the Promise is rejected with an error. Otherwise, it resolves with the square of the number after 1 second. The .then() method handles both success and error cases. This pattern is common for wrapping asynchronous operations and input checks in JavaScript.`
  },
  {
    id: 'promise-6',
    title: 'Real-World Example: Promises with Database Queries',
    description: 'Demonstrates using Promises to handle asynchronous database queries, with MongoDB connection setup.',
    difficulty: 'Medium',
    category: 'promise',
    solution: `// MongoDB connection setup (Node.js)
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}
connectMongo();

// Example: Using Promises for a SQL query (Node.js, e.g. with mysql)
function getUsers() {
  return new Promise(function (resolve, reject) {
    connection.query('SELECT * FROM users', function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
}

getUsers()
  .then(function (users) {
    console.log('List of users:');
    users.forEach(function (user) {
      console.log("\${user.user_id}. \${user.firstname} \${user.lastname}");
    });
  })
  .catch(function (error) {
    console.log('Error:', error);
  });`,
    testCases: [],
    explanation: `This example shows how Promises are used in real-world applications to handle asynchronous database operations. The MongoDB setup demonstrates connecting to a database using async/await. The SQL example wraps a callback-based query in a Promise, allowing you to use .then() and .catch() for cleaner, more readable code. This pattern is common in Node.js for working with databases and other asynchronous APIs.`
  },
  {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    id: 'promise-7',
    title: 'Promise Chaining Example',
    description: 'Demonstrates chaining multiple .then() calls and error handling with Promises.',
    difficulty: 'Easy',
    category: 'promise',
    solution: `calculateSquare(1)
  .then(value => {
    console.log(value); // 1
    return calculateSquare(2);
  })
  .then(value2 => {
    console.log(value2); // 4
  }, reason => {
    console.log('error happened: ' + reason);
  });

// Another chain with an error:
calculateSquare(1)
  .then(value => {
    console.log(value); // 1
    return calculateSquare('string'); // This will reject
  })
  .then(value2 => {
    console.log(value2);
  }, reason => {
    console.log('error happened: ' + reason); // error happened: Error: Argument of type number is expected
  });`,
    testCases: [],
    explanation: `This example demonstrates Promise chaining: each .then() returns a new Promise, allowing you to sequence asynchronous operations. If a .then() returns another Promise, the next .then() waits for it to resolve. If a Promise is rejected (e.g., by passing a string to calculateSquare), the error is caught by the next .then()'s error handler. This pattern is useful for running async operations in sequence and handling errors at any step in the chain.`
  },
  {
    id: 'promise-8',
    title: 'Promise Chaining vs Callback Hell vs Async/Await',
    description: 'Compare deeply nested callbacks, Promise chaining, and async/await for sequential asynchronous operations.',
    difficulty: 'Easy',
    category: 'promise',
    solution: `// Without Promises (Callback Hell)
asyncOperation1(function(result1) {
    asyncOperation2(result1, function(result2) {
        asyncOperation3(result2, function(result3) {
            asyncOperation4(result3, function(result4) {
                asyncOperation3(result4, function(result5) {
                    // ... more nested callbacks
                });
            });
        });
    });
});

// With Promises (Chaining)
asyncOperation1()
    .then(result1 => asyncOperation2(result1))
    .then(result2 => asyncOperation3(result2))
    .then(result3 => {
        // ... more code here
    })
    .catch(error => {
        // Handle errors here
    });

// With async/await
try {
    const result1 = await asyncOperation1();
    const result2 = await asyncOperation2(result1);
    const result3 = await asyncOperation3(result2);
    // ... more code here
} catch (error) {
    // Handle errors here
}`,
    testCases: [],
    explanation: `This example compares three ways to handle sequential asynchronous operations:\n- Callback Hell: Deeply nested callbacks make code hard to read and maintain.\n- Promise Chaining: Promises allow you to chain .then() calls, flattening the structure and improving readability.\n- Async/Await: Provides a synchronous-like style for writing asynchronous code, making it even easier to follow and maintain.\n\nAsync/await is built on top of Promises and is the modern standard for handling async flows in JavaScript.`
  },
  {
    id: 'promise-9',
    title: 'Promise.all with Multiple Async Operations',
    description: 'Use Promise.all to run multiple asynchronous operations in parallel and collect their results.',
    difficulty: 'Easy',
    category: 'promise',
    solution: `function askFirstDealer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(8000), 3000);
  });
}
function askSecondDealer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(12000), 5000);
  });
}
function askThirdDealer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(10000), 8000);
  });
}

Promise.all([askFirstDealer(), askSecondDealer(), askThirdDealer()])
  .then(prices => {
    console.log(prices); // [8000, 12000, 10000]
  });`,
    testCases: [],
    explanation: `Promise.all allows you to run multiple asynchronous operations in parallel and wait for all of them to complete. It returns a new Promise that resolves with an array of results, in the same order as the input Promises. In this example, prices from three dealers are fetched in parallel, and the final array contains all the results once every Promise has resolved. If any Promise rejects, Promise.all rejects immediately with that reason.`
  },
  {
    id: 'promise-10',
    title: 'Handling Promise Rejections',
    description: 'Demonstrates how to handle errors and rejections in Promises using .catch() and async/await.',
    difficulty: 'Easy',
    category: 'promise',
    solution: `// Using .catch() with Promises
function mayReject(value) {
  return new Promise((resolve, reject) => {
    if (value < 0) reject('Negative value!');
    else resolve('Success: ' + value);
  });
}

mayReject(-1)
  .then(result => console.log(result))
  .catch(error => console.error('Caught error:', error));

// Using try/catch with async/await
async function run() {
  try {
    const result = await mayReject(-1);
    console.log(result);
  } catch (error) {
    console.error('Caught error:', error);
  }
}
run();`,
    testCases: [],
    explanation: `To handle Promise rejections, use .catch() after your .then() chain, or use try/catch with async/await. If a Promise is rejected and you don't handle it, you'll get an unhandled promise rejection warning. Always handle errors to make your code robust and user-friendly.`
  },
  {
    id: 'promise-11',
    title: 'Handling Rejections in Promise.all',
    description: 'Demonstrates handling individual Promise rejections inside Promise.all and what happens if any Promise is rejected directly.',
    difficulty: 'Medium',
    category: 'promise',
    solution: `Promise.all([
  askFirstDealer().catch(error => { return error }),
  askSecondDealer().catch(error => { return error }),
  askThirdDealer().catch(error => { return error }),
  Promise.reject('rejected for some reason')
])
  .then(prices => {
    console.log(prices);
  })
  .catch(error => {
    console.log(error); // 'rejected for some reason'
  });

// Output:
// rejected for some reason
// Promise {<resolved>: undefined}`,
    testCases: [],
    explanation: `In this example, each dealer Promise is wrapped with .catch to handle its own rejection and return an error value instead. However, if any Promise in the array is directly rejected (like Promise.reject('rejected for some reason')), Promise.all will immediately reject with that reason, and the .catch handler for the whole Promise.all will run. This pattern is useful for collecting results even if some Promises fail, but be aware that any unhandled rejection in the array will cause Promise.all to reject.`
  },
  {
    id: 'promise-12',
    title: 'Polyfill for Promise.all',
    description: 'Implement Promise.all from scratch to understand how it works internally.',
    difficulty: 'Medium',
    category: 'promise',
    solution: `// Polyfill for Promise.all
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(value => {
          results[i] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

// Usage:
promiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then(console.log); // [1, 2, 3]`,
    testCases: [],
    explanation: `This polyfill for Promise.all takes an array of Promises (or values), and returns a new Promise that resolves when all input Promises resolve, or rejects as soon as one rejects. It collects results in order and resolves with an array of results. This is how Promise.all works internally in JavaScript.`
  },
  {
    id: 'promise-13',
    title: 'Promise.all vs Promise.allSettled',
    description: 'Compare Promise.all and Promise.allSettled with examples and explanations.',
    difficulty: 'Easy',
    category: 'promise',
    solution: `// Promise.all example
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject('fail')
])
  .then(results => {
    // This will not run because one promise rejected
    console.log('All resolved:', results);
  })
  .catch(error => {
    console.log('Promise.all rejected:', error); // 'fail'
  });

// Promise.allSettled example
Promise.allSettled([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject('fail')
])
  .then(results => {
    console.log('All settled:', results);
    /*
    [
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 },
      { status: 'rejected', reason: 'fail' }
    ]
    */
  });`,
    testCases: [],
    explanation: `Promise.all waits for all promises to resolve, but if any reject, it immediately rejects with that reason. Use it when you need all results to succeed.\n\nPromise.allSettled waits for all promises to finish, regardless of whether they resolve or reject. It returns an array of objects describing the outcome of each promise. Use it when you want to know the result of every promise, even if some fail.`
  },
  {
    id: 'promise-14',
    title: 'Promise.race Examples',
    description: 'Demonstrates how Promise.race resolves or rejects with the first settled promise.',
    difficulty: 'Easy',
    category: 'promise',
    solution: `// Example 1: First to resolve wins
const p1 = new Promise(resolve => setTimeout(() => resolve('A'), 100));
const p2 = new Promise(resolve => setTimeout(() => resolve('B'), 200));
Promise.race([p1, p2]).then(result => console.log(result)); // 'A'

// Example 2: First to reject wins
const p3 = new Promise((_, reject) => setTimeout(() => reject('Error!'), 50));
const p4 = new Promise(resolve => setTimeout(() => resolve('Success'), 100));
Promise.race([p3, p4])
  .then(result => console.log(result))
  .catch(error => console.log(error)); // 'Error!'

// Example 3: Competing timeouts
function timeoutPromise(ms) {
  return new Promise((_, reject) => setTimeout(() => reject('Timeout!'), ms));
}
const slow = new Promise(resolve => setTimeout(() => resolve('Done!'), 500));
Promise.race([slow, timeoutPromise(200)])
  .then(result => console.log(result))
  .catch(error => console.log(error)); // 'Timeout!'`,
    testCases: [],
    explanation: `Promise.race takes an array of promises and settles as soon as the first promise settles (resolves or rejects).\n- In Example 1, the fastest resolve wins.\n- In Example 2, the fastest reject wins.\n- In Example 3, a timeout can "race" against a slow operation to provide a fallback if it takes too long.\n\nUse Promise.race when you want the result of the first completed async operation, whether it succeeds or fails.`
  }
]; 