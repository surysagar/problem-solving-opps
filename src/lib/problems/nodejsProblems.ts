import { Problem } from '@/types'

export const nodejsProblems: Problem[] = [
  {
    id: 'nodejs-1',
    title: 'Role of Queue and Event Queue in Node.js',
    description: 'Understanding the fundamental concepts of queues and the event queue in Node.js, their importance in asynchronous programming, and how they enable non-blocking I/O operations.',
    difficulty: 'Medium',
    category: 'nodejs',
    solution: `// Node.js Event Loop and Queues

// 1. CALLBACK QUEUE (Task Queue)
// Stores callbacks from completed async operations
setTimeout(() => {
  console.log('Timer callback');
}, 0);

// 2. MICROTASK QUEUE
// Higher priority than callback queue
Promise.resolve().then(() => {
  console.log('Microtask');
});

// 3. EVENT QUEUE (Event Loop)
// Main mechanism that processes queues
console.log('Start');

setTimeout(() => {
  console.log('Timer 1');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
});

setTimeout(() => {
  console.log('Timer 2');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 2');
});

console.log('End');

// Output:
// Start
// End
// Promise 1
// Promise 2
// Timer 1
// Timer 2

// 4. QUEUE TYPES IN NODE.JS
// - Timer Queue: setTimeout, setInterval
// - I/O Queue: File operations, network requests
// - Check Queue: setImmediate
// - Close Queue: Close event callbacks
// - Microtask Queue: Promises, process.nextTick

// 5. PRIORITY ORDER
// 1. Microtasks (Promise, process.nextTick)
// 2. Timers
// 3. I/O callbacks
// 4. setImmediate
// 5. Close callbacks

// 6. PRACTICAL EXAMPLE
const fs = require('fs');

console.log('1. Start');

setTimeout(() => {
  console.log('2. Timer callback');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise resolved');
});

fs.readFile(__filename, () => {
  console.log('4. File read callback');
  
  setTimeout(() => {
    console.log('5. Timer in file callback');
  }, 0);
  
  Promise.resolve().then(() => {
    console.log('6. Promise in file callback');
  });
});

setImmediate(() => {
  console.log('7. setImmediate callback');
});

console.log('8. End');

// Expected output order:
// 1. Start
// 8. End
// 3. Promise resolved
// 2. Timer callback
// 7. setImmediate callback
// 4. File read callback
// 6. Promise in file callback
// 5. Timer in file callback`,
    testCases: [
      { 
        input: `console.log('Start');
setTimeout(() => console.log('Timer'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('End');`, 
        output: `Start
End
Promise
Timer` 
      }
    ],
    explanation: `The Event Queue (Event Loop) is the core mechanism that makes Node.js non-blocking and efficient:

**Key Concepts:**
1. **Event Loop**: Continuously checks if the call stack is empty and processes queued callbacks
2. **Queue Types**: Different types of operations go into different queues with different priorities
3. **Non-blocking I/O**: Allows Node.js to handle multiple operations concurrently without blocking the main thread

**Queue Priority Order:**
1. **Microtask Queue** (highest priority): Promises, process.nextTick()
2. **Timer Queue**: setTimeout, setInterval callbacks
3. **I/O Queue**: File system, network callbacks
4. **Check Queue**: setImmediate callbacks
5. **Close Queue**: Close event callbacks

**Why It's Important:**
- Enables asynchronous programming without threads
- Prevents blocking operations from freezing the application
- Allows efficient handling of I/O operations
- Provides predictable execution order for different types of operations
- Forms the foundation for Node.js's single-threaded, event-driven architecture

**Real-world Impact:**
- Web servers can handle thousands of concurrent connections
- File operations don't block other operations
- Network requests are handled efficiently
- Database operations can be performed asynchronously

This architecture is what makes Node.js particularly well-suited for I/O-intensive applications like web servers, APIs, and real-time applications.`
  },
  {
    id: 'nodejs-2',
    title: 'How Many Error Codes in Node.js',
    description: 'Understanding the comprehensive list of error codes in Node.js, their categories, and how to handle different types of errors effectively in Node.js applications.',
    difficulty: 'Medium',
    category: 'nodejs',
    solution: `// Node.js Error Codes Overview

// 1. SYSTEM ERRORS (OS-level errors)
// EACCES: Permission denied
// EADDRINUSE: Address already in use
// ECONNREFUSED: Connection refused
// ENOENT: No such file or directory
// ENOTFOUND: DNS lookup failed

// 2. COMMON ERROR CODES BY CATEGORY

// File System Errors (50+ codes)
const fs = require('fs');

try {
  fs.readFileSync('nonexistent.txt');
} catch (error) {
  console.log(error.code); // 'ENOENT'
  console.log(error.message); // 'ENOENT: no such file or directory, open 'nonexistent.txt''
}

// Network Errors (20+ codes)
const http = require('http');

const req = http.request('http://invalid-url', (res) => {});
req.on('error', (error) => {
  console.log(error.code); // 'ENOTFOUND'
});

// Process Errors (10+ codes)
process.on('uncaughtException', (error) => {
  console.log(error.code); // Various codes
});

// 3. COMPLETE LIST OF MAJOR ERROR CODES

// File System Errors
const fileSystemErrors = {
  'EACCES': 'Permission denied',
  'EADDRINUSE': 'Address already in use',
  'EBADF': 'Bad file descriptor',
  'ECONNREFUSED': 'Connection refused',
  'ECONNRESET': 'Connection reset by peer',
  'EEXIST': 'File exists',
  'EISDIR': 'Is a directory',
  'EMFILE': 'Too many open files',
  'ENOENT': 'No such file or directory',
  'ENOTDIR': 'Not a directory',
  'ENOTEMPTY': 'Directory not empty',
  'ENOTFOUND': 'DNS lookup failed',
  'EPERM': 'Operation not permitted',
  'EPIPE': 'Broken pipe',
  'ETIMEDOUT': 'Operation timed out'
};

// 4. ERROR HANDLING PATTERNS

// Pattern 1: Try-Catch with specific error codes
try {
  const data = fs.readFileSync('file.txt');
} catch (error) {
  switch (error.code) {
    case 'ENOENT':
      console.log('File not found, creating new file');
      fs.writeFileSync('file.txt', '');
      break;
    case 'EACCES':
      console.log('Permission denied');
      break;
    case 'EMFILE':
      console.log('Too many open files');
      break;
    default:
      console.log('Unknown error:', error.code);
  }
}

// Pattern 2: Async error handling
fs.readFile('file.txt', (error, data) => {
  if (error) {
    if (error.code === 'ENOENT') {
      console.log('File does not exist');
    } else if (error.code === 'EACCES') {
      console.log('Permission denied');
    } else {
      console.log('Error:', error.code, error.message);
    }
    return;
  }
  console.log('File content:', data);
});

// Pattern 3: Promise-based error handling
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

readFileAsync('file.txt')
  .then(data => console.log(data))
  .catch(error => {
    switch (error.code) {
      case 'ENOENT':
        console.log('File not found');
        break;
      case 'EACCES':
        console.log('Permission denied');
        break;
      default:
        console.log('Error:', error.code);
    }
  });

// 5. CUSTOM ERROR CLASSES
class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = 'CustomError';
  }
}

// 6. ERROR CODES COUNT BY CATEGORY
const errorCategories = {
  'System Errors': 50,      // OS-level errors
  'File System': 25,        // File operations
  'Network': 20,           // HTTP, TCP, UDP
  'Process': 15,           // Process management
  'Crypto': 10,            // Cryptographic operations
  'DNS': 8,                // Domain name resolution
  'TLS/SSL': 12,           // Security layer
  'Zlib': 6,               // Compression
  'Total': 146             // Approximate total
};

console.log('Total Node.js Error Codes:', errorCategories.Total);

// 7. PRACTICAL ERROR HANDLING EXAMPLE
const express = require('express');
const app = express();

app.get('/file/:filename', (req, res) => {
  const filename = req.params.filename;
  
  fs.readFile(filename, (error, data) => {
    if (error) {
      switch (error.code) {
        case 'ENOENT':
          return res.status(404).json({ error: 'File not found' });
        case 'EACCES':
          return res.status(403).json({ error: 'Access denied' });
        case 'EISDIR':
          return res.status(400).json({ error: 'Path is a directory' });
        default:
          return res.status(500).json({ error: 'Internal server error' });
      }
    }
    res.send(data);
  });
});`,
    testCases: [
      { 
        input: `const fs = require('fs');
try {
  fs.readFileSync('nonexistent.txt');
} catch (error) {
  console.log(error.code);
}`, 
        output: `ENOENT` 
      },
      {
        input: `const errorCategories = {
  'System Errors': 50,
  'File System': 25,
  'Network': 20,
  'Process': 15,
  'Crypto': 10,
  'DNS': 8,
  'TLS/SSL': 12,
  'Zlib': 6
};
const total = Object.values(errorCategories).reduce((sum, count) => sum + count, 0);
console.log(total);`,
        output: `146`
      }
    ],
    explanation: `Node.js has approximately **146 error codes** across different categories:

**Error Code Categories:**

1. **System Errors (50 codes)**: OS-level errors like EACCES, ENOENT, ECONNREFUSED
2. **File System Errors (25 codes)**: File operations like EISDIR, EMFILE, ENOTDIR
3. **Network Errors (20 codes)**: HTTP, TCP, UDP operations
4. **Process Errors (15 codes)**: Process management and signals
5. **Crypto Errors (10 codes)**: Cryptographic operations
6. **DNS Errors (8 codes)**: Domain name resolution
7. **TLS/SSL Errors (12 codes)**: Security layer operations
8. **Zlib Errors (6 codes)**: Compression operations

**Key Error Codes to Know:**
- **ENOENT**: No such file or directory
- **EACCES**: Permission denied
- **EADDRINUSE**: Address already in use
- **ECONNREFUSED**: Connection refused
- **ENOTFOUND**: DNS lookup failed
- **ETIMEDOUT**: Operation timed out
- **EMFILE**: Too many open files
- **EPERM**: Operation not permitted

**Error Handling Best Practices:**
1. **Always check error codes** for specific handling
2. **Use try-catch** for synchronous operations
3. **Handle async errors** in callbacks or promises
4. **Create custom error classes** for application-specific errors
5. **Log errors appropriately** for debugging
6. **Provide user-friendly messages** based on error codes

**Why Understanding Error Codes Matters:**
- Enables proper error handling and recovery
- Improves application reliability and user experience
- Helps with debugging and troubleshooting
- Allows for graceful degradation of services
- Essential for building robust Node.js applications

This comprehensive understanding of Node.js error codes is crucial for building production-ready applications that handle failures gracefully.`
  }
] 