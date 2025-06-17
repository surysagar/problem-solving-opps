import { Problem } from '@/types'

export const typescriptProblems: Problem[] = [
  { id: 'ts-22', title: 'Lexical this', description: 'Lexical this refers to how arrow functions capture the this value from their surrounding context.', difficulty: 'Easy', category: 'typescript', solution: `class Counter {
  count = 0;
  start() {
    setInterval(() => {
      this.count++;
      console.log(this.count);
    }, 1000);
  }
}
new Counter().start(); // 'this' refers to the Counter instance`, testCases: [], explanation: 'Arrow functions do not have their own this; they inherit it from the enclosing scope.' },
  { id: 'ts-23', title: 'readonly modifier', description: 'The readonly modifier makes a property immutable after initialization.', difficulty: 'Easy', category: 'typescript', solution: `class User {
  readonly id: number;
  constructor(id: number) {
    this.id = id;
  }
}
const user = new User(1);
// user.id = 2; // Error: Cannot assign to read only property`, testCases: [], explanation: 'Use readonly to prevent reassignment of properties.' },
  { id: 'ts-24', title: 'Union Types', description: 'Union types allow a variable to hold values of different types.', difficulty: 'Easy', category: 'typescript', solution: `let value: string | number;
value = 'hello';
value = 42;`, testCases: [], explanation: 'Use | to combine multiple types.' },
  { id: 'ts-25', title: 'Literal Types', description: 'Literal types restrict a variable to a specific value.', difficulty: 'Easy', category: 'typescript', solution: `let direction: 'left' | 'right';
direction = 'left';
// direction = 'up'; // Error`, testCases: [], explanation: 'Literal types are useful for limited sets of values.' },
  { id: 'ts-26', title: 'Type Narrowing', description: 'Type narrowing lets you refine a variable\'s type within a block.', difficulty: 'Easy', category: 'typescript', solution: `function printId(id: string | number) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}`, testCases: [], explanation: 'TypeScript uses control flow to narrow types.' },
  { id: 'ts-27', title: 'Discriminated Unions', description: 'Discriminated unions use a common property to distinguish between types.', difficulty: 'Easy', category: 'typescript', solution: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number };
function area(shape: Shape) {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.size ** 2;
  }
}`, testCases: [], explanation: 'A common literal property (kind) helps TypeScript discriminate between types.' },
  { id: 'ts-28', title: 'Class Parameter Properties', description: 'Parameter properties let you declare and initialize members in the constructor.', difficulty: 'Easy', category: 'typescript', solution: `class Point {
  constructor(public x: number, private y: number) {}
}
const pt = new Point(1, 2);`, testCases: [], explanation: 'Use public/private/protected in constructor params to create properties.' },
  { id: 'ts-29', title: 'Strict Compiler Option', description: 'The strict option enables all strict type-checking options.', difficulty: 'Easy', category: 'typescript', solution: `// tsconfig.json
{
  "compilerOptions": {
    "strict": true
  }
}`, testCases: [], explanation: 'Strict mode helps catch more errors at compile time.' },
  { id: 'ts-30', title: 'Null versus Undefined', description: 'null and undefined are distinct types in TypeScript.', difficulty: 'Easy', category: 'typescript', solution: `let a: null = null;
let b: undefined = undefined;`, testCases: [], explanation: 'Use strictNullChecks to distinguish between null and undefined.' },
  { id: 'ts-31', title: 'Intersection types', description: 'Intersection types combine multiple types into one.', difficulty: 'Easy', category: 'typescript', solution: `type A = { a: number };
type B = { b: string };
type AB = A & B;
const ab: AB = { a: 1, b: 'hi' };`, testCases: [], explanation: 'Use & to combine types.' },
  { id: 'ts-32', title: 'Optional modifier', description: 'The ? modifier marks a property as optional.', difficulty: 'Easy', category: 'typescript', solution: `interface User {
  name: string;
  age?: number;
}
const u: User = { name: 'Alice' };`, testCases: [], explanation: 'Optional properties may be omitted.' },
  { id: 'ts-33', title: 'Non-null Assertion Operator', description: 'The ! operator tells TypeScript a value is not null or undefined.', difficulty: 'Easy', category: 'typescript', solution: `function process(str?: string) {
  console.log(str!.length);
}`, testCases: [], explanation: 'Use with caution; it overrides TypeScript\'s null checks.' },
  { id: 'ts-34', title: 'Interfaces', description: 'Interfaces define the shape of an object.', difficulty: 'Easy', category: 'typescript', solution: `interface Person {
  name: string;
  age: number;
}
const p: Person = { name: 'Bob', age: 30 };`, testCases: [], explanation: 'Interfaces are used for type-checking object structure.' },
  { id: 'ts-35', title: 'Interface Declaration Merging', description: 'Multiple interface declarations with the same name are merged.', difficulty: 'Easy', category: 'typescript', solution: `interface Box { height: number; }
interface Box { width: number; }
const b: Box = { height: 1, width: 2 };`, testCases: [], explanation: 'All properties from merged declarations are required.' },
  { id: 'ts-36', title: 'Types versus Interfaces', description: 'Types and interfaces are similar but have some differences.', difficulty: 'Easy', category: 'typescript', solution: `type A = { a: number };
interface B { b: string }
// Types can use unions/intersections, interfaces can merge.`, testCases: [], explanation: 'Use type for unions/intersections, interface for object shapes.' },
  { id: 'ts-37', title: 'never type', description: 'The never type represents values that never occur.', difficulty: 'Easy', category: 'typescript', solution: `function fail(msg: string): never {
  throw new Error(msg);
}`, testCases: [], explanation: 'Use never for functions that never return.' }
]; 