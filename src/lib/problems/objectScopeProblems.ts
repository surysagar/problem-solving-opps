import { Problem } from '@/types'

export const objectScopeProblems: Problem[] = [
  {
    id: 1,
    title: 'Basic Object Properties and Access',
    description: 'Learn how to access object properties using dot notation and bracket notation.',
    difficulty: 'Easy',
    category: 'object-scope',
    solution: `// Basic object with properties
const person = {
  name: 'Alice',
  age: 25
};

// Accessing properties using dot notation
console.log(person.name); // 'Alice'

// Accessing properties using bracket notation
console.log(person['age']); // 25

// Dynamic property access
const propertyName = 'name';
console.log(person[propertyName]); // 'Alice'`,
    testCases: [
      {
        input: 'const obj = { a: 1, b: 2 }; obj.a',
        expectedOutput: '1'
      },
      {
        input: 'const obj = { a: 1, b: 2 }; obj["b"]',
        expectedOutput: '2'
      }
    ]
  },
  {
    id: 2,
    title: 'Nested Objects and References',
    description: 'Learn how to work with nested objects and access deeply nested properties.',
    difficulty: 'Easy',
    category: 'object-scope',
    solution: `// Nested object structure
const user = {
  id: 1,
  profile: {
    username: 'coder123',
    location: {
      city: 'Mumbai',
      zip: '400001'
    }
  }
};

// Accessing nested properties
console.log(user.profile.location.city); // 'Mumbai'

// Using optional chaining
console.log(user?.profile?.location?.city); // 'Mumbai'

// Destructuring nested objects
const { profile: { location: { city } } } = user;
console.log(city); // 'Mumbai'`,
    testCases: [
      {
        input: 'const obj = { a: { b: { c: 1 } } }; obj.a.b.c',
        expectedOutput: '1'
      },
      {
        input: 'const obj = { a: { b: { c: 1 } } }; obj?.a?.b?.c',
        expectedOutput: '1'
      }
    ]
  },
  {
    id: 3,
    title: 'Using this in Methods',
    description: 'Learn how to use the this keyword in object methods.',
    difficulty: 'Medium',
    category: 'object-scope',
    solution: `// Object with method using this
const person = {
  name: 'John',
  greet() {
    console.log('Hello, ' + this.name);
  }
};

// Calling the method
person.greet(); // Hello, John

// Method with multiple this references
const user = {
  name: 'Alice',
  age: 25,
  getInfo() {
    return \`\${this.name} is \${this.age} years old\`;
  }
};

console.log(user.getInfo()); // Alice is 25 years old`,
    testCases: [
      {
        input: 'const obj = { name: "Test", greet() { return "Hello " + this.name; } }; obj.greet()',
        expectedOutput: '"Hello Test"'
      },
      {
        input: 'const obj = { a: 1, b: 2, sum() { return this.a + this.b; } }; obj.sum()',
        expectedOutput: '3'
      }
    ]
  },
  {
    id: 4,
    title: 'Arrow Function and this',
    description: 'Learn how arrow functions handle the this keyword differently from regular functions.',
    difficulty: 'Medium',
    category: 'object-scope',
    solution: `// Regular function method
const person1 = {
  name: 'Sara',
  greet: function() {
    console.log('Hi ' + this.name);
  }
};

// Arrow function method (wrong way)
const person2 = {
  name: 'Sara',
  greet: () => {
    console.log('Hi ' + this.name);
  }
};

// Arrow function inside regular method (correct way)
const person3 = {
  name: 'Sara',
  greet() {
    const inner = () => console.log('Hi ' + this.name);
    inner();
  }
};

person1.greet(); // Hi Sara
person2.greet(); // Hi undefined
person3.greet(); // Hi Sara`,
    testCases: [
      {
        input: 'const obj = { name: "Test", greet: () => this.name }; obj.greet()',
        expectedOutput: 'undefined'
      },
      {
        input: 'const obj = { name: "Test", greet() { const fn = () => this.name; return fn(); } }; obj.greet()',
        expectedOutput: '"Test"'
      }
    ]
  },
  {
    id: 5,
    title: 'Using bind to fix this',
    description: 'Learn how to use the bind method to fix this binding issues.',
    difficulty: 'Medium',
    category: 'object-scope',
    solution: `// Function that uses this
function printName() {
  console.log(this.name);
}

// Object to bind to
const obj = {
  name: 'Bound Example'
};

// Creating bound function
const boundPrint = printName.bind(obj);

// Calling bound function
boundPrint(); // Bound Example

// Original function still works with call/apply
printName.call(obj); // Bound Example
printName.apply(obj); // Bound Example`,
    testCases: [
      {
        input: 'function fn() { return this.x; }.bind({ x: 1 })()',
        expectedOutput: '1'
      },
      {
        input: 'const obj = { x: 2 }; function fn() { return this.x; }.bind(obj)()',
        expectedOutput: '2'
      }
    ]
  },
  {
    id: 6,
    title: 'Method Detached from Object',
    description: 'Learn what happens when a method is detached from its object and how to fix it.',
    difficulty: 'Medium',
    category: 'object-scope',
    solution: `// Object with method
const user = {
  name: 'Kiran',
  sayHi() {
    console.log(this.name);
  }
};

// Method detached from object
const hi = user.sayHi;
hi(); // undefined

// Fix using bind
const boundHi = user.sayHi.bind(user);
boundHi(); // Kiran

// Fix using call/apply
hi.call(user); // Kiran
hi.apply(user); // Kiran`,
    testCases: [
      {
        input: 'const obj = { name: "Test", fn() { return this.name; } }; const fn = obj.fn; fn()',
        expectedOutput: 'undefined'
      },
      {
        input: 'const obj = { name: "Test", fn() { return this.name; } }; const fn = obj.fn.bind(obj); fn()',
        expectedOutput: '"Test"'
      }
    ]
  },
  {
    id: 7,
    title: 'Using this in Callbacks',
    description: 'Learn how to handle this in callback functions, especially with setTimeout and other async operations.',
    difficulty: 'Hard',
    category: 'object-scope',
    solution: `// Object with method using setTimeout
const app = {
  id: 'app123',
  start() {
    // Wrong way - loses this
    setTimeout(function() {
      console.log(this.id); // undefined
    }, 1000);

    // Correct way - using arrow function
    setTimeout(() => {
      console.log(this.id); // app123
    }, 1000);

    // Alternative - using bind
    setTimeout(function() {
      console.log(this.id); // app123
    }.bind(this), 1000);
  }
};

app.start();`,
    testCases: [
      {
        input: 'const obj = { id: 1, start() { setTimeout(() => this.id, 0); } }; obj.start()',
        expectedOutput: 'undefined'
      },
      {
        input: 'const obj = { id: 1, start() { return new Promise(resolve => setTimeout(() => resolve(this.id), 0)); } }; obj.start()',
        expectedOutput: 'Promise<1>'
      }
    ]
  },
  {
    id: 8,
    title: 'Using this in Array Methods',
    description: 'Learn how to handle this in array methods like forEach, map, etc.',
    difficulty: 'Medium',
    category: 'object-scope',
    solution: `// Object with array method
const team = {
  name: 'Developers',
  members: ['A', 'B', 'C'],
  
  // Wrong way - loses this
  showTeam() {
    this.members.forEach(function(member) {
      console.log(this.name + ' - ' + member);
    });
  },

  // Correct way - using arrow function
  showTeamArrow() {
    this.members.forEach(member => {
      console.log(this.name + ' - ' + member);
    });
  },

  // Alternative - using bind
  showTeamBind() {
    this.members.forEach(function(member) {
      console.log(this.name + ' - ' + member);
    }.bind(this));
  }
};

team.showTeam(); // undefined - A, undefined - B, undefined - C
team.showTeamArrow(); // Developers - A, Developers - B, Developers - C
team.showTeamBind(); // Developers - A, Developers - B, Developers - C`,
    testCases: [
      {
        input: 'const obj = { name: "Team", arr: [1,2,3], sum() { return this.arr.reduce((a,b) => a + b, 0); } }; obj.sum()',
        expectedOutput: '6'
      },
      {
        input: 'const obj = { name: "Team", arr: [1,2,3], sum() { return this.arr.map(x => x * 2); } }; obj.sum()',
        expectedOutput: '[2, 4, 6]'
      }
    ]
  },
  {
    id: 9,
    title: 'call, apply, and bind Comparison',
    description: 'Learn the differences between call, apply, and bind methods.',
    difficulty: 'Hard',
    category: 'object-scope',
    solution: `// Function to demonstrate this binding
function show(city) {
  console.log(\`\${this.name} lives in \${city}\`);
}

const user = { name: 'Neha' };

// Using call - arguments passed individually
show.call(user, 'Delhi'); // Neha lives in Delhi

// Using apply - arguments passed as array
show.apply(user, ['Mumbai']); // Neha lives in Mumbai

// Using bind - creates new function
const boundShow = show.bind(user);
boundShow('Pune'); // Neha lives in Pune

// Comparison with multiple arguments
function sum(a, b, c) {
  return this.base + a + b + c;
}

const obj = { base: 10 };

console.log(sum.call(obj, 1, 2, 3)); // 16
console.log(sum.apply(obj, [1, 2, 3])); // 16
console.log(sum.bind(obj)(1, 2, 3)); // 16`,
    testCases: [
      {
        input: 'function fn(a,b) { return this.x + a + b; }.call({ x: 1 }, 2, 3)',
        expectedOutput: '6'
      },
      {
        input: 'function fn(a,b) { return this.x + a + b; }.apply({ x: 1 }, [2, 3])',
        expectedOutput: '6'
      }
    ]
  },
  {
    id: 10,
    title: 'Storing Methods in Separate Object',
    description: 'Learn how to store and reuse methods across different objects.',
    difficulty: 'Medium',
    category: 'object-scope',
    solution: `// Shared methods object
const actions = {
  logName() {
    console.log(this.name);
  },
  logAge() {
    console.log(this.age);
  }
};

// User object using shared methods
const user = {
  name: 'Nikita',
  age: 25,
  doAction: actions.logName
};

// Another user object
const admin = {
  name: 'Admin',
  age: 30,
  doAction: actions.logName
};

user.doAction(); // Nikita
admin.doAction(); // Admin

// Using multiple shared methods
const person = {
  name: 'John',
  age: 30,
  ...actions
};

person.logName(); // John
person.logAge(); // 30`,
    testCases: [
      {
        input: 'const methods = { fn() { return this.x; } }; const obj = { x: 1, ...methods }; obj.fn()',
        expectedOutput: '1'
      },
      {
        input: 'const methods = { fn() { return this.x; } }; const obj = { x: 2, fn: methods.fn }; obj.fn()',
        expectedOutput: '2'
      }
    ]
  },
  {
    id: 11,
    title: 'Dynamic this with Factory Function',
    description: 'Learn how to create objects with methods using factory functions.',
    difficulty: 'Medium',
    category: 'object-scope',
    solution: `// Factory function to create person objects
function createPerson(name) {
  return {
    name,
    greet() {
      return 'Hello, ' + this.name;
    },
    introduce(otherName) {
      return \`\${this.name} meets \${otherName}\`;
    }
  };
}

// Creating person instances
const a = createPerson('Aryan');
const b = createPerson('Bella');

console.log(a.greet()); // Hello, Aryan
console.log(b.greet()); // Hello, Bella
console.log(a.introduce(b.name)); // Aryan meets Bella

// Factory with private data
function createCounter() {
  let count = 0;
  return {
    increment() {
      return ++count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getCount()); // 1`,
    testCases: [
      {
        input: 'const create = (x) => ({ x, get() { return this.x; } }); const obj = create(1); obj.get()',
        expectedOutput: '1'
      },
      {
        input: 'const create = (x) => ({ x, get() { return this.x; } }); const obj = create(2); obj.get()',
        expectedOutput: '2'
      }
    ]
  },
  {
    id: 12,
    title: 'Deep Nested this Misuse',
    description: 'Learn about common pitfalls with this in deeply nested object structures.',
    difficulty: 'Hard',
    category: 'object-scope',
    solution: `// Object with nested structure
const obj = {
  name: 'Object Level',
  outer() {
    return {
      name: 'Inner Object',
      getName: function() {
        return this.name;
      }
    };
  }
};

console.log(obj.outer().getName()); // Inner Object

// Common mistake with nested functions
const user = {
  name: 'John',
  actions: {
    sayHi() {
      function inner() {
        console.log(this.name); // undefined
      }
      inner();
    }
  }
};

// Fix using arrow function
const userFixed = {
  name: 'John',
  actions: {
    sayHi() {
      const inner = () => {
        console.log(this.name); // John
      };
      inner();
    }
  }
};`,
    testCases: [
      {
        input: 'const obj = { x: 1, fn() { return { y: 2, get() { return this.x; } }; } }; obj.fn().get()',
        expectedOutput: 'undefined'
      },
      {
        input: 'const obj = { x: 1, fn() { return { y: 2, get: () => this.x }; } }; obj.fn().get()',
        expectedOutput: '1'
      }
    ]
  },
  {
    id: 13,
    title: 'Object with Arrow Method Inside',
    description: 'Learn how to use arrow functions inside object methods to preserve this context.',
    difficulty: 'Hard',
    category: 'object-scope',
    solution: `// Object with arrow function inside method
const obj = {
  name: 'Arrow Master',
  method() {
    const arrowFn = () => this.name;
    return arrowFn();
  }
};

console.log(obj.method()); // Arrow Master

// Complex example with multiple levels
const complex = {
  name: 'Complex',
  data: {
    value: 42,
    getValue() {
      const inner = () => {
        return {
          name: this.name,
          value: this.value
        };
      };
      return inner();
    }
  }
};

console.log(complex.data.getValue()); // { name: 'Complex', value: 42 }`,
    testCases: [
      {
        input: 'const obj = { x: 1, fn() { const get = () => this.x; return get(); } }; obj.fn()',
        expectedOutput: '1'
      },
      {
        input: 'const obj = { x: 1, fn() { const get = () => this.x; return get; } }; obj.fn()()',
        expectedOutput: '1'
      }
    ]
  },
  {
    id: 14,
    title: 'Tricky Scenario: this Lost in Assignment',
    description: 'Learn about common scenarios where this context is lost and how to fix them.',
    difficulty: 'Hard',
    category: 'object-scope',
    solution: `// Object with method
const obj = {
  name: 'Confuse',
  show() {
    console.log(this.name);
  }
};

// Method reference lost
const ref = obj.show;
ref(); // undefined

// Fix using bind
const boundRef = obj.show.bind(obj);
boundRef(); // Confuse

// Common mistake in event handlers
const button = {
  name: 'Button',
  click() {
    console.log(this.name);
  }
};

// Wrong way
document.addEventListener('click', button.click); // undefined

// Correct way
document.addEventListener('click', button.click.bind(button)); // Button

// Alternative using arrow function
document.addEventListener('click', () => button.click()); // Button`,
    testCases: [
      {
        input: 'const obj = { x: 1, fn() { return this.x; } }; const fn = obj.fn; fn()',
        expectedOutput: 'undefined'
      },
      {
        input: 'const obj = { x: 1, fn() { return this.x; } }; const fn = obj.fn.bind(obj); fn()',
        expectedOutput: '1'
      }
    ]
  }
] 