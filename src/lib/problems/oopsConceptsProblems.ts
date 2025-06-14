import { Problem } from '@/types'

export const oopsConceptsProblems: Problem[] = [
  {
    id: 'oops-1',
    title: 'What is a Class?',
    description: 'A class is like a blueprint for creating objects. It defines properties and methods that its objects will have.',
    difficulty: 'Easy',
    category: 'oops-concepts',
    solution: `class Student {
  constructor(name, age, standard) {
    this.name = name;
    this.age = age;
    this.standard = standard;
  }
  study() { /* ... */ }
  play() { /* ... */ }
  doHomeWork() { /* ... */ }
}

const student1 = new Student('John', 15, 9);
const student2 = new Student('Gorge', 18, 12);`,
    testCases: [{ input: 'new Student("John", 15, 9)', output: 'Student { name: "John", age: 15, standard: 9 }' }],
    explanation: 'A class defines the structure and behavior for its objects.'
  },
  {
    id: 'oops-2',
    title: 'What is an Object?',
    description: 'An object is an instance of a class. It contains real values for the properties defined by the class.',
    difficulty: 'Easy',
    category: 'oops-concepts',
    solution: `const student1 = new Student('John', 15, 9);
console.log(student1.name); // "John"`,
    testCases: [{ input: 'student1.name', output: '"John"' }],
    explanation: 'Objects are created from classes and hold actual data.'
  },
  {
    id: 'oops-3',
    title: 'Abstraction',
    description: 'Abstraction means hiding complex details and showing only the essentials.',
    difficulty: 'Easy',
    category: 'oops-concepts',
    solution: `class Phone {
  camera() { /* essential feature */ }
  volumeBtn() { /* essential feature */ }
  // Internal details like verifyTemperature() are hidden
}`,
    testCases: [{ input: 'typeof Phone.prototype.camera', output: '"function"' }],
    explanation: 'Abstraction exposes only what is necessary to the user.'
  },
  {
    id: 'oops-4',
    title: 'Encapsulation',
    description: 'Encapsulation means keeping properties and methods private inside a class, so they are not accessible from outside.',
    difficulty: 'Easy',
    category: 'oops-concepts',
    solution: `class User {
  #name;
  constructor(name) {
    this.#name = name;
  }
  getName() {
    return this.#name;
  }
}
const user = new User('Alice');
console.log(user.getName()); // "Alice"`,
    testCases: [{ input: 'user.getName()', output: '"Alice"' }],
    explanation: 'Private fields (with #) are not accessible from outside the class.'
  },
  {
    id: 'oops-5',
    title: 'Inheritance',
    description: 'Inheritance allows a class to use properties and methods of another class.',
    difficulty: 'Easy',
    category: 'oops-concepts',
    solution: `class Animal {
  speak() { console.log('Animal speaks'); }
}
class Dog extends Animal {
  speak() { console.log('Dog barks'); }
}
const dog = new Dog();
dog.speak(); // "Dog barks"`,
    testCases: [{ input: 'dog.speak()', output: 'Dog barks' }],
    explanation: 'Dog inherits from Animal and overrides the speak method.'
  },
  {
    id: 'oops-6',
    title: 'Polymorphism',
    description: 'Polymorphism means having many forms. A child class can override methods from its parent class.',
    difficulty: 'Easy',
    category: 'oops-concepts',
    solution: `class User {
  login() { console.log('User login'); }
}
class Admin extends User {
  login() { console.log('Admin login'); }
}
const admin = new Admin();
admin.login(); // "Admin login"`,
    testCases: [{ input: 'admin.login()', output: 'Admin login' }],
    explanation: 'Admin overrides the login method from User.'
  },
  {
    id: 'oops-7',
    title: 'Prototypal Inheritance',
    description: 'JavaScript objects can inherit from other objects using prototypes.',
    difficulty: 'Easy',
    category: 'oops-concepts',
    solution: `function User(name) {
  this.name = name;
}
User.prototype.printName = function() {
  console.log(this.name);
};
const user = new User('Kedar');
user.printName(); // "Kedar"`,
    testCases: [{ input: 'user.printName()', output: 'Kedar' }],
    explanation: 'Functions on the prototype are shared by all instances.'
  },
  {
    id: 'oops-8',
    title: 'Constructor Functions',
    description: 'Before ES6, constructor functions were used to create objects and set up inheritance.',
    difficulty: 'Easy',
    category: 'oops-concepts',
    solution: `function User(name) {
  this.name = name;
}
const user = new User('Kedar');
console.log(user.name); // "Kedar"`,
    testCases: [{ input: 'user.name', output: '"Kedar"' }],
    explanation: 'Constructor functions are called with the new keyword.'
  },
  {
    id: 'oops-9',
    title: 'ES6 Classes',
    description: 'ES6 introduced the class syntax as a cleaner way to create objects and handle inheritance.',
    difficulty: 'Easy',
    category: 'oops-concepts',
    solution: `class User {
  constructor(name) {
    this.name = name;
  }
  printName() {
    console.log(this.name);
  }
}
const user = new User('Kedar');
user.printName(); // "Kedar"`,
    testCases: [{ input: 'user.printName()', output: 'Kedar' }],
    explanation: 'Classes are syntactic sugar over constructor functions and prototypes.'
  },
  {
    id: 'oops-10',
    title: 'Object.create()',
    description: 'Object.create() creates a new object with the specified prototype object and properties.',
    difficulty: 'Easy',
    category: 'oops-concepts',
    solution: `const User = {
  printName() { console.log(this.name); },
  init(name) { this.name = name; }
};
const Admin = Object.create(User);
Admin.init = function(name) { User.init.call(this, name); };
Admin.stats = function() { console.log('Stats'); };
const kedar = Object.create(Admin);
kedar.init('Kedar');
kedar.printName(); // "Kedar"`,
    testCases: [{ input: 'kedar.printName()', output: 'Kedar' }],
    explanation: 'Object.create() is a simple way to set up inheritance between objects.'
  },
  {
    id: 'oops-11',
    title: 'Protected Properties',
    description: 'A protected property is usually indicated by a leading underscore (_). It is a convention to signal that it should not be accessed from outside the class.',
    difficulty: 'Easy',
    category: 'oops-concepts',
    solution: `class User {
  constructor(name, password) {
    this._name = name;
    this._password = password;
  }
}
const user = new User('Kedar', 123456);
console.log(user._password); // 123456`,
    testCases: [{ input: 'user._password', output: '123456' }],
    explanation: 'The underscore is a convention, not enforced by JavaScript.'
  },
  {
    id: 'oops-12',
    title: 'Private Properties',
    description: 'Private properties use the # symbol and cannot be accessed from outside the class.',
    difficulty: 'Easy',
    category: 'oops-concepts',
    solution: `class User {
  #name;
  constructor(name) {
    this.#name = name;
  }
  getName() { return this.#name; }
}
const user = new User('Kedar');
console.log(user.getName()); // "Kedar"`,
    testCases: [{ input: 'user.getName()', output: '"Kedar"' }],
    explanation: 'Private fields are truly private and not accessible outside the class.'
  }
] 