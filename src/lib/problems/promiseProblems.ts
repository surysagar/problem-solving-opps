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
  }
]; 