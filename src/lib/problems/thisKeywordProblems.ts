import { Problem } from '@/types'

export const thisKeywordProblems: Problem[] = [
  {
    id: 'this-1',
    title: 'Basic: Object Properties and Access',
    description: 'Accessing properties of an object using dot and bracket notation.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const person = {
  name: 'Alice',
  age: 25
};

console.log(person.name); // 'Alice'
console.log(person['age']); // 25`,
    testCases: [{ input: 'person.name', output: 'Alice' }],
    explanation: 'You can access object properties using dot or bracket notation.'
  },
  {
    id: 'this-2',
    title: 'Nested Objects and References',
    description: 'Accessing properties in nested objects.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const user = {
  id: 1,
  profile: {
    username: 'coder123',
    location: {
      city: 'Mumbai',
      zip: '400001'
    }
  }
};

console.log(user.profile.location.city); // 'Mumbai'`,
    testCases: [{ input: 'user.profile.location.city', output: 'Mumbai' }],
    explanation: 'Use dot notation to access deeply nested properties.'
  },
  {
    id: 'this-3',
    title: 'Using this in Methods',
    description: 'The this keyword refers to the object the method is called on.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const person = {
  name: 'John',
  greet() {
    console.log('Hello, ' + this.name);
  }
};

person.greet(); // Hello, John`,
    testCases: [{ input: 'person.greet()', output: 'Hello, John' }],
    explanation: 'Inside a method, this refers to the object the method belongs to.'
  },
  {
    id: 'this-4',
    title: 'Arrow Function and this',
    description: 'Arrow functions do not bind their own this; they use the this from their lexical context.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const person = {
  name: 'Sara',
  greet: () => {
    console.log('Hi ' + this.name);
  }
};

person.greet(); // Hi undefined`,
    testCases: [{ input: 'person.greet()', output: 'Hi undefined' }],
    explanation: 'Arrow functions do not have their own this.'
  },
  {
    id: 'this-5',
    title: 'Correct Arrow Function Usage',
    description: 'Use arrow functions inside regular methods to access the correct this.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const person = {
  name: 'Sara',
  greet() {
    const inner = () => console.log('Hi ' + this.name);
    inner();
  }
};

person.greet(); // Hi Sara`,
    testCases: [{ input: 'person.greet()', output: 'Hi Sara' }],
    explanation: 'Arrow functions inherit this from their enclosing scope.'
  },
  {
    id: 'this-6',
    title: 'Using bind to fix this',
    description: 'The bind method sets the value of this for a function.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const obj = {
  name: 'Bound Example'
};

function printName() {
  console.log(this.name);
}

const boundPrint = printName.bind(obj);
boundPrint(); // Bound Example`,
    testCases: [{ input: 'boundPrint()', output: 'Bound Example' }],
    explanation: 'bind creates a new function with this set to the provided object.'
  },
  {
    id: 'this-7',
    title: 'Method Detached from Object (loses this)',
    description: 'Detaching a method from its object can cause this to be undefined.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const user = {
  name: 'Kiran',
  sayHi() {
    console.log(this.name);
  }
};

const hi = user.sayHi;
hi(); // undefined

const boundHi = user.sayHi.bind(user);
boundHi(); // Kiran`,
    testCases: [{ input: 'boundHi()', output: 'Kiran' }],
    explanation: 'When a method is detached, this is lost unless you bind it.'
  },
  {
    id: 'this-8',
    title: 'Using this in Callbacks (setTimeout, etc.)',
    description: 'this inside a regular function in setTimeout does not refer to the object.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const app = {
  id: 'app123',
  start() {
    setTimeout(function () {
      console.log(this.id); // undefined
    }, 1000);
  }
};

app.start();`,
    testCases: [{ input: 'app.start()', output: 'undefined' }],
    explanation: 'In a regular function, this is not the object inside setTimeout.'
  },
  {
    id: 'this-9',
    title: 'Fixed Callback with Arrow Function',
    description: 'Arrow functions use the this from their lexical context, fixing the callback issue.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const app = {
  id: 'app123',
  start() {
    setTimeout(() => {
      console.log(this.id); // app123
    }, 1000);
  }
};

app.start();`,
    testCases: [{ input: 'app.start()', output: 'app123' }],
    explanation: 'Arrow functions inherit this from the surrounding scope.'
  },
  {
    id: 'this-10',
    title: 'Using this inside loops (Array methods)',
    description: 'this inside a regular function in forEach does not refer to the object.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const team = {
  name: 'Developers',
  members: ['A', 'B', 'C'],
  showTeam() {
    this.members.forEach(function (member) {
      console.log(this.name + ' - ' + member);
    });
  }
};

team.showTeam(); // undefined - A, undefined - B, undefined - C`,
    testCases: [{ input: 'team.showTeam()', output: 'undefined - A' }],
    explanation: 'In a regular function, this is not the object inside forEach.'
  },
  {
    id: 'this-11',
    title: 'Fix with Arrow Function in Array Methods',
    description: 'Arrow functions inside array methods inherit this from the object.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const team = {
  name: 'Developers',
  members: ['A', 'B', 'C'],
  showTeam() {
    this.members.forEach(member => {
      console.log(this.name + ' - ' + member);
    });
  }
};

team.showTeam(); // Developers - A, Developers - B, Developers - C`,
    testCases: [{ input: 'team.showTeam()', output: 'Developers - A' }],
    explanation: 'Arrow functions inside forEach keep the correct this.'
  },
  {
    id: 'this-12',
    title: 'call, apply, and bind – Comparison',
    description: 'call, apply, and bind can set the value of this for a function.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `function show(city) {
  console.log("\${this.name} lives in \${city}");
}

const user = { name: 'Neha' };
show.call(user, 'Delhi'); // Neha lives in Delhi
show.apply(user, ['Mumbai']); // Neha lives in Mumbai
const boundShow = show.bind(user);
boundShow('Pune'); // Neha lives in Pune`,
    testCases: [{ input: 'boundShow("Pune")', output: 'Neha lives in Pune' }],
    explanation: 'call, apply, and bind let you control what this refers to.'
  },
  {
    id: 'this-13',
    title: 'Storing Methods in Separate Object',
    description: 'Methods can be stored in a separate object and used with different objects.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const actions = {
  logName() {
    console.log(this.name);
  }
};

const user = {
  name: 'Nikita',
  doAction: actions.logName
};

user.doAction(); // Nikita`,
    testCases: [{ input: 'user.doAction()', output: 'Nikita' }],
    explanation: 'this refers to the object the method is called on, even if the method is defined elsewhere.'
  },
  {
    id: 'this-14',
    title: 'Dynamic this with Factory Function',
    description: 'Factory functions can create objects with their own this context.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `function createPerson(name) {
  return {
    name,
    greet() {
      return 'Hello, ' + this.name;
    }
  };
}

const a = createPerson('Aryan');
console.log(a.greet()); // Hello, Aryan`,
    testCases: [{ input: 'a.greet()', output: 'Hello, Aryan' }],
    explanation: 'Each object created by the factory function has its own this.'
  },
  {
    id: 'this-15',
    title: 'Deep Nested this Misuse',
    description: 'this inside a nested object refers to the innermost object.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const obj = {
  name: 'Object Level',
  outer() {
    return {
      name: 'Inner Object',
      getName: function () {
        return this.name;
      }
    };
  }
};

console.log(obj.outer().getName()); // Inner Object`,
    testCases: [{ input: 'obj.outer().getName()', output: 'Inner Object' }],
    explanation: 'this refers to the object the method is called on, even in nested objects.'
  },
  {
    id: 'this-16',
    title: 'Object with Arrow Method Inside',
    description: 'Arrow functions inside methods inherit this from the method context.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const obj = {
  name: 'Arrow Master',
  method() {
    const arrowFn = () => this.name;
    return arrowFn();
  }
};

console.log(obj.method()); // Arrow Master`,
    testCases: [{ input: 'obj.method()', output: 'Arrow Master' }],
    explanation: 'Arrow functions inside methods can access the correct this.'
  },
  {
    id: 'this-17',
    title: 'Tricky Scenario: this Lost in Assignment',
    description: 'Assigning a method to a variable can lose the original this context.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const obj = {
  name: 'Confuse',
  show() {
    console.log(this.name);
  }
};

const ref = obj.show;
ref(); // undefined`,
    testCases: [{ input: 'ref()', output: 'undefined' }],
    explanation: 'Assigning a method to a variable loses the original this.'
  },
  {
    id: 'this-18',
    title: 'Fix with bind: this Lost in Assignment',
    description: 'Use bind to fix the this context when assigning a method to a variable.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const obj = {
  name: 'Confuse',
  show() {
    console.log(this.name);
  }
};

const boundRef = obj.show.bind(obj);
boundRef(); // Confuse`,
    testCases: [{ input: 'boundRef()', output: 'Confuse' }],
    explanation: 'bind ensures the correct this context is used.'
  },
  {
    id: 'this-19',
    title: 'Fix the value of this inside a callback',
    description: 'Use .bind(this) to fix the value of this inside a callback function.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const user = {
  name: "Alice",
  greet() {
    setTimeout(function() {
      console.log("Hi " + this.name);
    }.bind(this), 1000);
  }
};
user.greet(); // Hi Alice`,
    testCases: [{ input: 'user.greet()', output: 'Hi Alice' }],
    explanation: 'bind(this) ensures the callback uses the correct this.'
  },
  {
    id: 'this-20',
    title: 'Use call() to borrow a method from another object',
    description: 'Use call() to invoke a method with a different this context.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const person = {
  fullName: function () {
    return this.first + " " + this.last;
  }
};

const user = {
  first: "John",
  last: "Doe"
};

console.log(person.fullName.call(user)); // John Doe`,
    testCases: [{ input: 'person.fullName.call(user)', output: 'John Doe' }],
    explanation: 'call() lets you use a method with a different object as this.'
  },
  {
    id: 'this-21',
    title: 'Apply parameters using apply() instead of call()',
    description: 'Use apply() to pass parameters as an array and set this.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `function greet(msg1, msg2) {
  console.log(\`\${msg1}, \${this.name}. \${msg2}\`);
}

const user = { name: "Jane" };

greet.apply(user, ["Hello", "How are you?"]); // Hello, Jane. How are you?`,
    testCases: [{ input: 'greet.apply(user, ["Hello", "How are you?"])', output: 'Hello, Jane. How are you?' }],
    explanation: 'apply() lets you pass arguments as an array and set this.'
  },
  {
    id: 'this-22',
    title: 'Pre-set parameters with bind()',
    description: 'Use bind() to pre-set parameters and this context.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `function greet(city) {
  console.log("\${this.name} lives in \${city}");
}

const person = { name: "Tom" };

const greetTom = greet.bind(person, "Paris");
greetTom(); // Tom lives in Paris`,
    testCases: [{ input: 'greetTom()', output: 'Tom lives in Paris' }],
    explanation: 'bind() can pre-set both this and arguments.'
  },
  {
    id: 'this-23',
    title: 'Arrow functions don\'t bind this',
    description: 'Arrow functions do not have their own this context.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const person = {
  name: "Eve",
  greet: () => {
    console.log("Hello " + this.name);
  }
};
person.greet(); // Hello undefined`,
    testCases: [{ input: 'person.greet()', output: 'Hello undefined' }],
    explanation: 'Arrow functions inherit this from their lexical scope.'
  },
  {
    id: 'this-24',
    title: 'Maintain this context using arrow functions',
    description: 'Arrow functions can keep the correct this in callbacks.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const user = {
  name: "Ana",
  greet() {
    setTimeout(() => {
      console.log("Hi " + this.name);
    }, 1000);
  }
};
user.greet(); // Hi Ana`,
    testCases: [{ input: 'user.greet()', output: 'Hi Ana' }],
    explanation: 'Arrow functions keep the this context from the enclosing function.'
  },
  {
    id: 'this-25',
    title: 'Reuse array methods with call()',
    description: 'Use call() to reuse array methods on array-like objects.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `console.log(Array.prototype.slice.call(arguments)); // works in function`,
    testCases: [{ input: 'Array.prototype.slice.call(arguments)', output: '[arguments as array]' }],
    explanation: 'call() can be used to borrow array methods for array-like objects.'
  },
  {
    id: 'this-26',
    title: 'Convert arguments to array using apply()',
    description: 'Use apply() to convert arguments to an array.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `function getArgs() {
  return [].concat.apply([], arguments);
}
console.log(getArgs(1, 2, 3)); // [1, 2, 3]`,
    testCases: [{ input: 'getArgs(1, 2, 3)', output: '[1, 2, 3]' }],
    explanation: 'apply() can be used to spread arguments into an array.'
  },
  {
    id: 'this-27',
    title: 'Use this inside a class',
    description: 'this inside a class refers to the instance.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `class Car {
  constructor(model) {
    this.model = model;
  }
  show() {
    console.log(this.model);
  }
}

const c = new Car("Tesla");
c.show(); // Tesla`,
    testCases: [{ input: 'c.show()', output: 'Tesla' }],
    explanation: 'Inside a class, this refers to the instance.'
  },
  {
    id: 'this-28',
    title: 'Method borrowing with bind()',
    description: 'Use bind() to borrow a method and set this.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const obj1 = { val: 10 };
const obj2 = { val: 20 };

function show() {
  console.log(this.val);
}

const boundShow = show.bind(obj2);
boundShow(); // 20`,
    testCases: [{ input: 'boundShow()', output: '20' }],
    explanation: 'bind() can be used to borrow methods and set this.'
  },
  {
    id: 'this-29',
    title: 'Sum using apply() with Math.max',
    description: 'Use apply() to pass an array as arguments to Math.max.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const nums = [1, 5, 2, 7];
console.log(Math.max.apply(null, nums)); // 7`,
    testCases: [{ input: 'Math.max.apply(null, [1, 5, 2, 7])', output: '7' }],
    explanation: 'apply() can be used to pass an array as arguments.'
  },
  {
    id: 'this-30',
    title: 'Arrow function to keep this in class',
    description: 'Arrow functions in classes keep the correct this context.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
}
new Timer().start();`,
    testCases: [{ input: 'new Timer().start()', output: '1, 2, 3, ...' }],
    explanation: 'Arrow functions in setInterval keep the correct this.'
  },
  {
    id: 'this-31',
    title: 'Avoid losing this context',
    description: 'Use a variable like self = this to keep the correct context.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const obj = {
  name: "Box",
  log() {
    const self = this;
    setTimeout(function() {
      console.log(self.name);
    }, 1000);
  }
};
obj.log(); // Box`,
    testCases: [{ input: 'obj.log()', output: 'Box' }],
    explanation: 'Storing this in a variable preserves the context.'
  },
  {
    id: 'this-32',
    title: 'Use bind for event listeners',
    description: 'Use bind() to ensure the correct this in event listeners.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const button = {
  text: "Click me",
  handleClick() {
    console.log(this.text);
  }
};

document.getElementById("btn").addEventListener("click", button.handleClick.bind(button));`,
    testCases: [{ input: 'button.handleClick()', output: 'Click me' }],
    explanation: 'bind() ensures the correct this context in event listeners.'
  },
  {
    id: 'this-33',
    title: 'Create a bound method for multiple calls',
    description: 'Use bind() to create a reusable bound method.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `function greet() {
  console.log("Hello " + this.name);
}
const user = { name: "Mark" };
const boundGreet = greet.bind(user);
boundGreet(); // Hello Mark`,
    testCases: [{ input: 'boundGreet()', output: 'Hello Mark' }],
    explanation: 'bind() creates a reusable function with the correct this.'
  },
  {
    id: 'this-34',
    title: 'Chain multiple binds (only first one works)',
    description: 'Only the first bind call has effect; subsequent binds are ignored.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `function sayName() {
  console.log(this.name);
}
const obj1 = { name: "A" };
const obj2 = { name: "B" };

const bound = sayName.bind(obj1).bind(obj2);
bound(); // A`,
    testCases: [{ input: 'bound()', output: 'A' }],
    explanation: 'bind() only works the first time it is called.'
  },
  {
    id: 'this-35',
    title: 'Custom bind polyfill',
    description: 'Implement a custom version of bind using Function.prototype.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `Function.prototype.myBind = function (ctx, ...args) {
  return (...rest) => this.apply(ctx, [...args, ...rest]);
};

function greet(msg) {
  console.log(msg + " " + this.name);
}

const user = { name: "Tim" };
greet.myBind(user)("Hi"); // Hi Tim`,
    testCases: [{ input: 'greet.myBind(user)("Hi")', output: 'Hi Tim' }],
    explanation: 'A custom bind implementation using closures and apply.'
  },
  {
    id: 'this-36',
    title: 'Passing this via closure',
    description: 'Use a closure to keep the correct this context.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `function Counter() {
  this.count = 0;
  const self = this;
  setInterval(function() {
    self.count++;
    console.log(self.count);
  }, 1000);
}
new Counter();`,
    testCases: [{ input: 'new Counter()', output: '1, 2, 3, ...' }],
    explanation: 'Using self = this is a classic way to keep the correct context.'
  },
  {
    id: 'this-37',
    title: 'this in object methods',
    description: 'this in a regular object method refers to the object.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const obj = {
  a: 10,
  b: function() {
    return this.a;
  }
};
console.log(obj.b()); // 10`,
    testCases: [{ input: 'obj.b()', output: '10' }],
    explanation: 'this refers to the object in regular methods.'
  },
  {
    id: 'this-38',
    title: 'this in arrow function inside object',
    description: 'Arrow functions do not have their own this, even inside objects.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const obj = {
  a: 20,
  b: () => {
    console.log(this.a); // Arrow has no own this
  }
};
obj.b(); // undefined`,
    testCases: [{ input: 'obj.b()', output: 'undefined' }],
    explanation: 'Arrow functions do not have their own this.'
  },
  {
    id: 'this-39',
    title: 'Call a method with different object',
    description: 'Use call() to invoke a function with a different this context.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const cat = { sound: "Meow" };
const dog = { sound: "Woof" };

function speak() {
  console.log(this.sound);
}

speak.call(cat); // Meow
speak.call(dog); // Woof`,
    testCases: [{ input: 'speak.call(cat)', output: 'Meow' }],
    explanation: 'call() can be used to change the context for a function.'
  },
  {
    id: 'this-40',
    title: 'Use bind() to delay method call',
    description: 'Use bind() to delay a method call and keep the correct this.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const person = {
  name: "Leo",
  greet() {
    console.log("Hello " + this.name);
  }
};
setTimeout(person.greet.bind(person), 1000); // Hello Leo`,
    testCases: [{ input: 'person.greet()', output: 'Hello Leo' }],
    explanation: 'bind() is useful for event handlers and delayed calls.'
  },
  {
    id: 'this-41',
    title: 'Preserve this in nested function',
    description: 'Arrow functions in array methods keep the correct this context.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const team = {
  name: "Dev",
  members: ["Alice", "Bob"],
  list() {
    this.members.forEach(member => {
      console.log(member + " from " + this.name);
    });
  }
};
team.list(); // Alice from Dev, Bob from Dev`,
    testCases: [{ input: 'team.list()', output: 'Alice from Dev' }],
    explanation: 'Arrow functions in forEach keep the correct this.'
  },
  {
    id: 'this-42',
    title: 'Function borrowing with apply()',
    description: 'Use apply() to borrow a function and set this.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `function sum() {
  return Array.prototype.reduce.call(arguments, (a, b) => a + b, 0);
}
console.log(sum(1, 2, 3)); // 6`,
    testCases: [{ input: 'sum(1, 2, 3)', output: '6' }],
    explanation: 'apply() and call() can be used to borrow array methods.'
  },
  {
    id: 'this-43',
    title: 'Change context in event handler',
    description: 'Use bind() to ensure the correct this in event handlers.',
    difficulty: 'Easy',
    category: 'this-keyword',
    solution: `const obj = {
  value: 42,
  clickHandler() {
    console.log(this.value);
  }
};

document.getElementById("btn").onclick = obj.clickHandler.bind(obj);`,
    testCases: [{ input: 'obj.clickHandler()', output: '42' }],
    explanation: 'bind() ensures the correct this in event handlers.'
  }
]; 