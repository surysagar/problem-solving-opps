import { Problem } from '@/types'

export const nodeBasicProblems: Problem[] = [
  {
    id: 'nodejs-basic-1',
    title: 'Node.js Vocabulary and Key Terms',
    description: 'Understanding the fundamental vocabulary and key terms used in Node.js development, including core concepts, architecture components, and common terminology.',
    difficulty: 'Easy',
    category: 'nodejs',
    solution: `// Node.js Vocabulary and Key Terms

// 1. CORE NODE.JS CONCEPTS

// Node.js (Node)
// An open-source, cross-platform JavaScript runtime environment
// that allows for server-side execution of JavaScript code,
// built on Chrome's V8 JavaScript engine.

console.log('Node.js is a JavaScript runtime environment');

// V8 Engine
// Google's open-source JavaScript engine that compiles
// JavaScript into machine code, used by Node.js for
// high-performance execution.

const v8Info = {
  engine: 'V8',
  type: 'JavaScript Engine',
  developer: 'Google',
  purpose: 'Compiles JavaScript to machine code'
};

// npm (Node Package Manager)
// The default package manager for Node.js, used to install,
// manage, and share reusable code packages (modules).

// Example package.json
const packageJson = {
  name: 'my-nodejs-app',
  version: '1.0.0',
  dependencies: {
    'express': '^4.17.1',
    'lodash': '^4.17.21'
  },
  scripts: {
    'start': 'node index.js',
    'dev': 'nodemon index.js'
  }
};

// 2. MODULE SYSTEM

// Module
// A self-contained unit of code that can be imported
// and used in other parts of an application.
// Node.js has a built-in module system.

// CommonJS Module (require/exports)
const fs = require('fs');
const path = require('path');

module.exports = {
  readFile: fs.readFile,
  join: path.join
};

// ES6 Module (import/export)
import { readFile } from 'fs';
import { join } from 'path';

export const fileUtils = {
  readFile,
  join
};

// 3. ASYNCHRONOUS PROGRAMMING

// Event Loop
// A core component of Node.js's asynchronous, non-blocking I/O model,
// responsible for handling events and executing callbacks.

console.log('1. Start');
setTimeout(() => {
  console.log('3. Timer callback');
}, 0);
Promise.resolve().then(() => {
  console.log('2. Promise microtask');
});
console.log('4. End');

// Output:
// 1. Start
// 4. End
// 2. Promise microtask
// 3. Timer callback

// Asynchronous
// Operations that do not block the execution of subsequent code,
// allowing for concurrent handling of multiple tasks, often
// relying on callbacks, Promises, or async/await.

// Callback-based async
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('File content:', data);
});

// Promise-based async
const readFilePromise = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('file.txt', 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

// Async/await
async function readFileAsync() {
  try {
    const data = await readFilePromise();
    console.log('File content:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 4. I/O OPERATIONS

// Non-blocking I/O
// Input/Output operations that do not pause the main thread
// while waiting for data, allowing Node.js to handle many
// connections efficiently.

// Non-blocking file read
fs.readFile('large-file.txt', 'utf8', (err, data) => {
  console.log('File read completed');
});

console.log('This runs immediately, not waiting for file read');

// 5. CALLBACKS AND PROMISES

// Callback
// A function passed as an argument to another function,
// to be executed after the completion of an asynchronous operation.

function processData(data, callback) {
  // Simulate async processing
  setTimeout(() => {
    const result = data.toUpperCase();
    callback(null, result);
  }, 1000);
}

processData('hello world', (err, result) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Result:', result);
});

// Promise
// An object representing the eventual completion (or failure)
// of an asynchronous operation and its resulting value.

const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'John Doe' };
      resolve(data);
    }, 1000);
  });
};

fetchData()
  .then(data => console.log('Data:', data))
  .catch(error => console.error('Error:', error));

// 6. STREAMS AND BUFFERS

// Streams
// Abstract interfaces for working with streaming data in Node.js,
// enabling efficient processing of data in chunks
// (e.g., Readable, Writable, Duplex, Transform).

// Readable Stream
const readStream = fs.createReadStream('input.txt', 'utf8');
let data = '';

readStream.on('data', (chunk) => {
  data += chunk;
});

readStream.on('end', () => {
  console.log('File read complete:', data);
});

// Writable Stream
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Hello World');
writeStream.end();

// Buffer
// A global object in Node.js for handling raw binary data directly,
// distinct from JavaScript's native data types.

const buffer = Buffer.from('Hello World', 'utf8');
console.log('Buffer:', buffer);
console.log('Buffer as string:', buffer.toString());
console.log('Buffer length:', buffer.length);

// 7. EVENT EMITTERS

// EventEmitter
// A core class in Node.js's events module that allows for
// defining and handling custom events within an application.

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Register event listener
myEmitter.on('event', (data) => {
  console.log('Event received:', data);
});

// Emit event
myEmitter.emit('event', 'Hello from event emitter');

// 8. VERSIONING AND SUPPORT

// LTS (Long-Term Support)
// Designates specific Node.js release lines that receive
// extended maintenance and support from the Node.js project.

const nodeVersions = {
  current: '20.x.x',
  lts: '18.x.x',
  maintenance: '16.x.x'
};

// 9. PRACTICAL EXAMPLES

// Example 1: Simple HTTP Server
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

// Example 2: File System Operations
const fileOperations = {
  read: () => {
    fs.readFile('example.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Read error:', err);
        return;
      }
      console.log('File content:', data);
    });
  },
  
  write: () => {
    fs.writeFile('output.txt', 'Hello Node.js!', (err) => {
      if (err) {
        console.error('Write error:', err);
        return;
      }
      console.log('File written successfully');
    });
  },
  
  append: () => {
    fs.appendFile('output.txt', '\\nNew line', (err) => {
      if (err) {
        console.error('Append error:', err);
        return;
      }
      console.log('Content appended successfully');
    });
  }
};

// Example 3: Environment Variables
const environment = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL
};

console.log('Environment:', environment);

// Example 4: Process Information
const processInfo = {
  pid: process.pid,
  version: process.version,
  platform: process.platform,
  arch: process.arch,
  memoryUsage: process.memoryUsage()
};

console.log('Process Info:', processInfo);

// 10. COMMON PATTERNS

// Error-First Callback Pattern
function asyncOperation(callback) {
  // Simulate async operation
  setTimeout(() => {
    const error = Math.random() > 0.5 ? new Error('Random error') : null;
    const result = error ? null : 'Operation successful';
    callback(error, result);
  }, 1000);
}

asyncOperation((err, result) => {
  if (err) {
    console.error('Error:', err.message);
    return;
  }
  console.log('Result:', result);
});

// Promise Chain
fetchData()
  .then(data => {
    console.log('Step 1:', data);
    return { ...data, processed: true };
  })
  .then(processedData => {
    console.log('Step 2:', processedData);
    return processedData;
  })
  .catch(error => {
    console.error('Chain error:', error);
  });

// Async/Await Pattern
async function processUserData() {
  try {
    const userData = await fetchData();
    console.log('User data:', userData);
    
    // Process the data
    const processedData = { ...userData, processed: true };
    console.log('Processed data:', processedData);
    
    return processedData;
  } catch (error) {
    console.error('Processing error:', error);
    throw error;
  }
}

// 11. DEBUGGING AND LOGGING

// Console Methods
console.log('Regular log message');
console.error('Error message');
console.warn('Warning message');
console.info('Info message');
console.debug('Debug message');

// Process Events
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// 12. MODULE PATTERNS

// Singleton Pattern
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
    this.connection = 'Connected to database';
  }
  
  query(sql) {
    console.log('Executing query:', sql);
    return Promise.resolve({ rows: [] });
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true

// Factory Pattern
class LoggerFactory {
  static createLogger(type) {
    switch (type) {
      case 'file':
        return new FileLogger();
      case 'console':
        return new ConsoleLogger();
      default:
        return new ConsoleLogger();
    }
  }
}

class FileLogger {
  log(message) {
    console.log('File Logger:', message);
  }
}

class ConsoleLogger {
  log(message) {
    console.log('Console Logger:', message);
  }
}

const logger = LoggerFactory.createLogger('console');
logger.log('Hello World');`,
    testCases: [
      {
        input: 'console.log("Hello Node.js");',
        output: 'Hello Node.js'
      },
      {
        input: 'const fs = require("fs"); fs.readFile("test.txt", "utf8", (err, data) => console.log(data));',
        output: 'File content (if test.txt exists)'
      },
      {
        input: 'Promise.resolve("Hello").then(data => console.log(data));',
        output: 'Hello'
      }
    ],
    explanation: `**Node.js Vocabulary and Key Terms** provides a comprehensive overview of the essential terminology and concepts used in Node.js development. Understanding these terms is crucial for effective Node.js programming and communication within the development community.

**Core Concepts:**

**1. Node.js (Node)**
- **Definition**: Open-source, cross-platform JavaScript runtime environment
- **Purpose**: Enables server-side JavaScript execution
- **Foundation**: Built on Chrome's V8 JavaScript engine
- **Key Feature**: Event-driven, non-blocking I/O model

**2. V8 Engine**
- **Origin**: Google's open-source JavaScript engine
- **Function**: Compiles JavaScript to native machine code
- **Performance**: High-performance execution
- **Integration**: Core engine powering Node.js

**3. npm (Node Package Manager)**
- **Role**: Default package manager for Node.js
- **Functions**: Install, manage, and share code packages
- **Registry**: World's largest software registry
- **Dependencies**: Manages project dependencies

**4. Module System**
- **CommonJS**: Traditional require/exports system
- **ES6 Modules**: Modern import/export syntax
- **Purpose**: Code organization and reusability
- **Scope**: Encapsulation and dependency management

**Asynchronous Programming:**

**5. Event Loop**
- **Function**: Core of Node.js asynchronous architecture
- **Operation**: Continuously processes events and callbacks
- **Phases**: Timers, I/O callbacks, poll, check, close
- **Priority**: Microtasks (Promises) > Macrotasks (setTimeout)

**6. Asynchronous Operations**
- **Non-blocking**: Operations don't pause execution
- **Concurrent**: Multiple operations handled simultaneously
- **Patterns**: Callbacks, Promises, async/await
- **Benefits**: High throughput and responsiveness

**7. Non-blocking I/O**
- **Principle**: I/O operations don't block main thread
- **Efficiency**: Handles thousands of concurrent connections
- **Performance**: Optimized for I/O-intensive applications
- **Scalability**: Linear scaling with connection count

**Programming Patterns:**

**8. Callbacks**
- **Definition**: Functions passed as arguments
- **Execution**: Called after async operation completion
- **Pattern**: Error-first callback convention
- **Usage**: Traditional async programming in Node.js

**9. Promises**
- **Purpose**: Handle async operation results
- **States**: Pending, fulfilled, rejected
- **Methods**: .then(), .catch(), .finally()
- **Benefits**: Cleaner than callbacks, better error handling

**10. Streams**
- **Types**: Readable, Writable, Duplex, Transform
- **Purpose**: Efficient data processing in chunks
- **Benefits**: Memory efficient, backpressure handling
- **Use Cases**: File processing, network operations

**11. Buffers**
- **Function**: Handle raw binary data
- **Creation**: Buffer.from(), Buffer.alloc()
- **Operations**: Reading, writing, manipulation
- **Usage**: Network protocols, file operations

**12. EventEmitter**
- **Class**: Core events module
- **Function**: Custom event creation and handling
- **Methods**: .on(), .emit(), .once(), .removeListener()
- **Pattern**: Observer pattern implementation

**Versioning and Support:**

**13. LTS (Long-Term Support)**
- **Definition**: Extended maintenance release lines
- **Duration**: 30 months of support
- **Stability**: Production-ready, stable APIs
- **Updates**: Security and bug fixes

**Practical Applications:**

**14. HTTP Servers**
- **Creation**: http.createServer()
- **Handling**: Request/response processing
- **Routing**: URL-based request handling
- **Middleware**: Request processing pipeline

**15. File System Operations**
- **Reading**: fs.readFile(), fs.createReadStream()
- **Writing**: fs.writeFile(), fs.createWriteStream()
- **Async**: Non-blocking file operations
- **Sync**: Blocking alternatives (use sparingly)

**16. Environment Management**
- **Variables**: process.env
- **Configuration**: Environment-specific settings
- **Security**: Sensitive data handling
- **Deployment**: Production vs development

**17. Process Management**
- **Information**: process.pid, process.version
- **Events**: uncaughtException, unhandledRejection
- **Memory**: process.memoryUsage()
- **Platform**: process.platform, process.arch

**Common Patterns:**

**18. Error-First Callbacks**
- **Convention**: (error, result) => {}
- **Handling**: Check error before processing result
- **Standard**: Node.js callback convention
- **Benefits**: Consistent error handling

**19. Promise Chains**
- **Structure**: .then().then().catch()
- **Flow**: Sequential async operations
- **Error Handling**: Centralized in .catch()
- **Readability**: Clean, linear code flow

**20. Async/Await**
- **Syntax**: async function, await keyword
- **Benefits**: Synchronous-looking async code
- **Error Handling**: try-catch blocks
- **Modern**: ES2017+ feature

**21. Singleton Pattern**
- **Purpose**: Single instance across application
- **Implementation**: Constructor pattern
- **Use Cases**: Database connections, configuration
- **Benefits**: Resource sharing, consistency

**22. Factory Pattern**
- **Purpose**: Object creation abstraction
- **Flexibility**: Different object types
- **Configuration**: Runtime object selection
- **Maintainability**: Centralized creation logic

**Debugging and Logging:**

**23. Console Methods**
- **Levels**: log, error, warn, info, debug
- **Output**: Different severity levels
- **Formatting**: String interpolation, objects
- **Environment**: Development vs production

**24. Process Events**
- **uncaughtException**: Unhandled synchronous errors
- **unhandledRejection**: Unhandled promise rejections
- **Handling**: Graceful error recovery
- **Logging**: Error tracking and monitoring

**Best Practices:**

**25. Error Handling**
- **Always handle errors**: Never ignore async errors
- **Use try-catch**: For async/await operations
- **Log errors**: Proper error logging and monitoring
- **Graceful degradation**: Handle failures gracefully

**26. Performance**
- **Avoid blocking**: Keep event loop free
- **Use streams**: For large data processing
- **Memory management**: Monitor memory usage
- **Caching**: Implement appropriate caching strategies

**27. Security**
- **Input validation**: Validate all inputs
- **Environment variables**: Secure configuration
- **Dependencies**: Regular security updates
- **HTTPS**: Use secure connections

**28. Code Organization**
- **Modular structure**: Separate concerns
- **Consistent patterns**: Use established conventions
- **Documentation**: Clear code documentation
- **Testing**: Comprehensive test coverage

**Real-World Applications:**

**29. Web Applications**
- **Express.js**: Popular web framework
- **REST APIs**: HTTP-based services
- **Real-time**: WebSocket, Socket.io
- **Authentication**: JWT, sessions

**30. Microservices**
- **Service architecture**: Small, focused services
- **Communication**: HTTP, message queues
- **Deployment**: Containerization, orchestration
- **Monitoring**: Health checks, metrics

**31. CLI Tools**
- **Command-line interfaces**: User-friendly tools
- **Argument parsing**: Command-line arguments
- **Interactive prompts**: User input handling
- **File processing**: Batch operations

**32. Data Processing**
- **ETL pipelines**: Extract, transform, load
- **Stream processing**: Real-time data handling
- **Database operations**: CRUD operations
- **File manipulation**: Large file processing

Understanding these Node.js terms and concepts provides a solid foundation for effective Node.js development, enabling developers to build scalable, efficient, and maintainable applications.`
  }
] 