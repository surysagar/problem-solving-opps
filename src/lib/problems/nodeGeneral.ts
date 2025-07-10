import { Problem } from '@/types'

export const nodeGeneralProblems: Problem[] = [
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
},
{
  id: 'nodejs-3',
  title: 'What are Exit Codes in Node.js',
  description: 'Understanding Node.js exit codes, their meanings, how to use them, and best practices for proper application termination and error handling.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// Node.js Exit Codes Overview

// 1. WHAT ARE EXIT CODES?
// Exit codes are numeric values returned by a process when it terminates
// They indicate whether the process completed successfully or encountered an error

// 2. STANDARD EXIT CODES

// Success codes
console.log('Success exit code:', 0); // 0 = Success

// Common error codes
const exitCodes = {
0: 'Success - No error occurred',
1: 'Uncaught Fatal Exception - Unhandled exception',
2: 'Unused - Reserved by Bash for builtin misuse',
3: 'Internal JavaScript Parse Error - Invalid JavaScript syntax',
4: 'Internal JavaScript Evaluation Failure - Invalid JavaScript code',
5: 'Fatal Error - V8 engine fatal error',
6: 'Non-function Internal Exception Handler - Uncaught exception',
7: 'Internal Exception Handler Run-Time Failure - Exception handler error',
8: 'Unused - Reserved by Node.js',
9: 'Invalid Argument - Invalid argument passed',
10: 'Internal JavaScript Run-Time Failure - JavaScript runtime error',
11: 'Invalid Debug Argument - Invalid debug argument',
12: 'Signal Exits - Process terminated by signal',
13: 'Unfinished Top-Level Await - Top-level await not resolved',
14: 'Unused - Reserved by Node.js',
15: 'Unused - Reserved by Node.js'
};

// 3. CUSTOM EXIT CODES

// Define custom exit codes for your application
const CUSTOM_EXIT_CODES = {
CONFIG_ERROR: 100,
DATABASE_ERROR: 101,
NETWORK_ERROR: 102,
VALIDATION_ERROR: 103,
AUTHENTICATION_ERROR: 104
};

// 4. USING EXIT CODES

// Method 1: process.exit()
console.log('Starting application...');

// Simulate an error condition
const hasError = true;

if (hasError) {
console.error('Application error occurred');
process.exit(1); // Exit with error code 1
}

// Method 2: process.exitCode (set exit code without exiting)
process.exitCode = 5; // Will exit with code 5 when process ends

// Method 3: Throwing uncaught exceptions
// This will cause exit code 1
// throw new Error('Uncaught exception');

// 5. PRACTICAL EXAMPLES

// Example 1: Configuration validation
function validateConfig() {
const config = {
  port: process.env.PORT,
  database: process.env.DATABASE_URL
};

if (!config.port) {
  console.error('PORT environment variable is required');
  process.exit(CUSTOM_EXIT_CODES.CONFIG_ERROR);
}

if (!config.database) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(CUSTOM_EXIT_CODES.CONFIG_ERROR);
}

return config;
}

// Example 2: Database connection
async function connectDatabase() {
try {
  // Simulate database connection
  const isConnected = Math.random() > 0.5;
  
  if (!isConnected) {
    throw new Error('Database connection failed');
  }
  
  console.log('Database connected successfully');
} catch (error) {
  console.error('Database error:', error.message);
  process.exit(CUSTOM_EXIT_CODES.DATABASE_ERROR);
}
}

// Example 3: Graceful shutdown
process.on('SIGINT', () => {
console.log('\\nReceived SIGINT. Shutting down gracefully...');

// Cleanup operations
cleanup();

// Exit with success code
process.exit(0);
});

process.on('SIGTERM', () => {
console.log('\\nReceived SIGTERM. Shutting down gracefully...');

// Cleanup operations
cleanup();

// Exit with success code
process.exit(0);
});

function cleanup() {
console.log('Performing cleanup operations...');
// Close database connections, file handles, etc.
}

// 6. EXIT CODE HANDLING IN SCRIPTS

// package.json script example
const packageJsonScripts = {
"scripts": {
  "start": "node app.js",
  "test": "node test.js",
  "build": "node build.js"
}
};

// Shell script to check exit codes
const shellScript = \`
#!/bin/bash
node app.js
if [ $? -eq 0 ]; then
  echo "Application exited successfully"
else
  echo "Application failed with exit code $?"
fi
\`;

// 7. TESTING EXIT CODES

// Test script to demonstrate different exit codes
function testExitCodes() {
const testCases = [
  { name: 'Success', code: 0, condition: true },
  { name: 'Config Error', code: 100, condition: false },
  { name: 'Database Error', code: 101, condition: Math.random() > 0.7 }
];

for (const test of testCases) {
  if (!test.condition) {
    console.error(\`Test failed: \${test.name}\`);
    process.exit(test.code);
  }
}

console.log('All tests passed');
process.exit(0);
}

// 8. EXIT CODE BEST PRACTICES

// Best Practice 1: Use descriptive exit codes
const EXIT_CODES = {
SUCCESS: 0,
INVALID_ARGUMENTS: 1,
CONFIGURATION_ERROR: 2,
DATABASE_CONNECTION_ERROR: 3,
NETWORK_ERROR: 4,
PERMISSION_ERROR: 5,
VALIDATION_ERROR: 6
};

// Best Practice 2: Log exit codes
function exitWithCode(code, message) {
console.error(\`Exiting with code \${code}: \${message}\`);
process.exit(code);
}

// Best Practice 3: Handle cleanup before exit
function gracefulExit(code) {
console.log('Performing cleanup...');

// Close database connections
// Clear timers
// Close file handles

console.log('Cleanup completed');
process.exit(code);
}

// 9. MONITORING EXIT CODES

// Example: Process monitoring
const childProcess = require('child_process');

const child = childProcess.spawn('node', ['worker.js']);

child.on('close', (code) => {
console.log(\`Child process exited with code \${code}\`);

switch (code) {
  case 0:
    console.log('Worker completed successfully');
    break;
  case 1:
    console.log('Worker encountered a fatal error');
    break;
  case 100:
    console.log('Worker configuration error');
    break;
  default:
    console.log(\`Worker exited with unknown code: \${code}\`);
}
});

// 10. EXIT CODE DOCUMENTATION

const exitCodeDocumentation = {
'Standard Codes': {
  0: 'Success',
  1: 'Uncaught Fatal Exception',
  2: 'Unused (Bash builtin misuse)',
  3: 'Internal JavaScript Parse Error',
  4: 'Internal JavaScript Evaluation Failure',
  5: 'Fatal Error (V8)',
  6: 'Non-function Internal Exception Handler',
  7: 'Internal Exception Handler Run-Time Failure',
  8: 'Unused (Node.js reserved)',
  9: 'Invalid Argument',
  10: 'Internal JavaScript Run-Time Failure',
  11: 'Invalid Debug Argument',
  12: 'Signal Exits',
  13: 'Unfinished Top-Level Await',
  14: 'Unused (Node.js reserved)',
  15: 'Unused (Node.js reserved)'
},
'Custom Codes (100+)': {
  100: 'Configuration Error',
  101: 'Database Error',
  102: 'Network Error',
  103: 'Validation Error',
  104: 'Authentication Error'
}
};`,
  testCases: [
    { 
      input: `console.log('Success');
process.exit(0);`, 
      output: `Success` 
    },
    {
      input: `const exitCodes = {
SUCCESS: 0,
ERROR: 1,
CONFIG_ERROR: 100
};
console.log(exitCodes.SUCCESS);`,
      output: `0`
    },
    {
      input: `process.exitCode = 5;
console.log('Exit code set to:', process.exitCode);`,
      output: `Exit code set to: 5`
    }
  ],
  explanation: `**Exit codes in Node.js** are numeric values that indicate how a process terminated. They are crucial for:

**Standard Exit Codes (0-15):**
- **0**: Success - No error occurred
- **1**: Uncaught Fatal Exception - Most common error code
- **2**: Unused (reserved by Bash)
- **3**: Internal JavaScript Parse Error - Syntax errors
- **4**: Internal JavaScript Evaluation Failure - Runtime errors
- **5**: Fatal Error - V8 engine errors
- **6-15**: Various internal Node.js errors

**Custom Exit Codes (100+):**
- **100+**: Available for application-specific errors
- Common custom codes: 100 (config error), 101 (database error), 102 (network error)

**How to Use Exit Codes:**

1. **process.exit(code)**: Immediately terminate with specific code
2. **process.exitCode**: Set exit code without terminating
3. **Uncaught exceptions**: Automatically exit with code 1
4. **Signal handlers**: Handle SIGINT/SIGTERM for graceful shutdown

**Best Practices:**
- Use 0 for success, non-zero for errors
- Document custom exit codes (100+)
- Handle cleanup before exit
- Log exit codes for debugging
- Use descriptive error codes for different failure types

**Real-world Usage:**
- **CI/CD pipelines**: Check exit codes to determine build success
- **Process monitoring**: Track application health
- **Error handling**: Provide specific error information
- **Graceful shutdown**: Clean up resources before exit

**Why Exit Codes Matter:**
- Enable automated error detection and handling
- Improve debugging and troubleshooting
- Allow proper integration with external systems
- Provide clear success/failure indicators
- Essential for production monitoring and alerting

Understanding exit codes is fundamental for building robust Node.js applications that can be properly monitored, debugged, and integrated with other systems.`
},
{
  id: 'nodejs-4',
  title: 'Uncaught Failures and Exceptional Errors in Node.js',
  description: 'Understanding uncaught exceptions, error handling strategies, process crashes, and best practices for managing exceptional errors in Node.js applications.',
  difficulty: 'Hard',
  category: 'nodejs',
  solution: `// Uncaught Failures and Exceptional Errors in Node.js

// 1. WHAT ARE UNCAUGHT EXCEPTIONS?
// Uncaught exceptions are errors that are not handled by try-catch blocks
// They cause the Node.js process to crash with exit code 1

// 2. TYPES OF UNCAUGHT EXCEPTIONS

// Synchronous uncaught exceptions
function synchronousError() {
// This will crash the process
throw new Error('Synchronous uncaught exception');
}

// Asynchronous uncaught exceptions
function asynchronousError() {
// This will also crash the process
setTimeout(() => {
  throw new Error('Asynchronous uncaught exception');
}, 1000);
}

// Promise rejections (unhandled)
function unhandledPromiseRejection() {
// This will cause an unhandled promise rejection
Promise.reject(new Error('Unhandled promise rejection'));
}

// 3. HANDLING UNCAUGHT EXCEPTIONS

// Method 1: process.on('uncaughtException')
process.on('uncaughtException', (error) => {
console.error('Uncaught Exception:', error.message);
console.error('Stack trace:', error.stack);

// Log the error
console.error('Process will exit in 5 seconds...');

// Graceful shutdown
setTimeout(() => {
  process.exit(1);
}, 5000);
});

// Method 2: process.on('unhandledRejection')
process.on('unhandledRejection', (reason, promise) => {
console.error('Unhandled Rejection at:', promise);
console.error('Reason:', reason);

// Don't exit immediately, just log
console.error('Application continues running...');
});

// Method 3: Domain-based error handling (deprecated but still works)
const domain = require('domain');

const d = domain.create();
d.on('error', (error) => {
console.error('Domain caught error:', error.message);
// Handle the error gracefully
});

d.run(() => {
// Code that might throw errors
throw new Error('Domain error');
});

// 4. PREVENTING UNCAUGHT EXCEPTIONS

// Always wrap async operations in try-catch
async function safeAsyncOperation() {
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  console.error('Caught async error:', error.message);
  // Handle the error appropriately
  return null;
}
}

// Handle promise rejections
function safePromiseOperation() {
return riskyPromise()
  .then(result => {
    return result;
  })
  .catch(error => {
    console.error('Caught promise error:', error.message);
    // Handle the error appropriately
    return null;
  });
}

// 5. ERROR HANDLING PATTERNS

// Pattern 1: Express.js error handling
const express = require('express');
const app = express();

// Error handling middleware
app.use((error, req, res, next) => {
console.error('Express error:', error.message);

// Log error details
console.error('Stack:', error.stack);
console.error('URL:', req.url);
console.error('Method:', req.method);

// Send appropriate response
res.status(500).json({
  error: 'Internal Server Error',
  message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
});
});

// Pattern 2: Async error wrapper
function asyncHandler(fn) {
return (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
}

// Usage
app.get('/api/data', asyncHandler(async (req, res) => {
const data = await fetchData();
res.json(data);
}));

// Pattern 3: Process monitoring
let uncaughtExceptionCount = 0;
const MAX_CRASHES = 5;

process.on('uncaughtException', (error) => {
uncaughtExceptionCount++;

console.error(\`Uncaught Exception #\${uncaughtExceptionCount}:\`, error.message);

if (uncaughtExceptionCount >= MAX_CRASHES) {
  console.error('Too many crashes, exiting permanently');
  process.exit(1);
}

// Restart the application or specific service
console.log('Restarting application...');
});

// 6. DEBUGGING UNCAUGHT EXCEPTIONS

// Enable source maps for better stack traces
// require('source-map-support').install();

// Enhanced error logging
process.on('uncaughtException', (error) => {
const errorInfo = {
  message: error.message,
  stack: error.stack,
  timestamp: new Date().toISOString(),
  processId: process.pid,
  memoryUsage: process.memoryUsage(),
  uptime: process.uptime()
};

console.error('Detailed error info:', JSON.stringify(errorInfo, null, 2));

// Send to external logging service
// sendToLoggingService(errorInfo);
});

// 7. RECOVERY STRATEGIES

// Strategy 1: Graceful degradation
process.on('uncaughtException', (error) => {
console.error('Critical error:', error.message);

// Close database connections
// closeDatabaseConnections();

// Save any pending data
// savePendingData();

// Notify monitoring systems
// notifyMonitoring(error);

// Exit gracefully
process.exit(1);
});

// Strategy 2: Restart specific modules
let moduleRestartCount = 0;

process.on('uncaughtException', (error) => {
if (error.message.includes('database')) {
  console.log('Database error detected, restarting database module...');
  // restartDatabaseModule();
} else if (error.message.includes('network')) {
  console.log('Network error detected, restarting network module...');
  // restartNetworkModule();
} else {
  console.error('Unknown error, exiting...');
  process.exit(1);
}
});

// Strategy 3: Circuit breaker pattern
class CircuitBreaker {
constructor() {
  this.failureCount = 0;
  this.lastFailureTime = null;
  this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
}

call(fn) {
  if (this.state === 'OPEN') {
    if (Date.now() - this.lastFailureTime > 60000) { // 1 minute
      this.state = 'HALF_OPEN';
    } else {
      throw new Error('Circuit breaker is OPEN');
    }
  }
  
  try {
    const result = fn();
    this.onSuccess();
    return result;
  } catch (error) {
    this.onFailure();
    throw error;
  }
}

onSuccess() {
  this.failureCount = 0;
  this.state = 'CLOSED';
}

onFailure() {
  this.failureCount++;
  this.lastFailureTime = Date.now();
  
  if (this.failureCount >= 5) {
    this.state = 'OPEN';
  }
}
}

// 8. MONITORING AND ALERTING

// Custom error monitoring
class ErrorMonitor {
constructor() {
  this.errorCount = 0;
  this.lastErrorTime = null;
  this.errorThreshold = 10;
  this.timeWindow = 60000; // 1 minute
}

recordError(error) {
  this.errorCount++;
  this.lastErrorTime = Date.now();
  
  // Check if we should alert
  if (this.shouldAlert()) {
    this.sendAlert(error);
  }
}

shouldAlert() {
  return this.errorCount >= this.errorThreshold &&
         (Date.now() - this.lastErrorTime) < this.timeWindow;
}

sendAlert(error) {
  console.error('ALERT: High error rate detected!');
  console.error('Error count:', this.errorCount);
  console.error('Last error:', error.message);
  
  // Send to external monitoring service
  // sendToMonitoringService({
  //   type: 'HIGH_ERROR_RATE',
  //   errorCount: this.errorCount,
  //   lastError: error.message
  // });
}

reset() {
  this.errorCount = 0;
  this.lastErrorTime = null;
}
}

const errorMonitor = new ErrorMonitor();

process.on('uncaughtException', (error) => {
errorMonitor.recordError(error);

// Continue with normal error handling
console.error('Uncaught Exception:', error.message);
process.exit(1);
});

// 9. BEST PRACTICES

// Best Practice 1: Always handle promises
Promise.resolve()
.then(() => {
  throw new Error('Promise error');
})
.catch(error => {
  console.error('Handled promise error:', error.message);
});

// Best Practice 2: Use async/await with try-catch
async function safeFunction() {
try {
  const result = await riskyAsyncOperation();
  return result;
} catch (error) {
  console.error('Handled async error:', error.message);
  // Handle appropriately
  return null;
}
}

// Best Practice 3: Validate inputs
function validateInput(input) {
if (!input) {
  throw new Error('Input is required');
}

if (typeof input !== 'string') {
  throw new Error('Input must be a string');
}

return input;
}

// Best Practice 4: Use error boundaries
function withErrorBoundary(fn) {
return (...args) => {
  try {
    return fn(...args);
  } catch (error) {
    console.error('Error boundary caught:', error.message);
    // Handle gracefully
    return null;
  }
};
}

// 10. COMMON UNCAUGHT EXCEPTION SCENARIOS

// Scenario 1: Undefined variable
// const undefinedVariable = someUndefinedVariable; // This will crash

// Scenario 2: JSON parse error
function parseJSON(jsonString) {
try {
  return JSON.parse(jsonString);
} catch (error) {
  console.error('JSON parse error:', error.message);
  return null;
}
}

// Scenario 3: File system errors
const fs = require('fs');

function readFileSafely(filename) {
try {
  return fs.readFileSync(filename, 'utf8');
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('File not found:', filename);
  } else {
    console.error('File read error:', error.message);
  }
  return null;
}
}

// Scenario 4: Network errors
const http = require('http');

function makeRequest(url) {
return new Promise((resolve, reject) => {
  const req = http.request(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve(data));
  });
  
  req.on('error', (error) => {
    console.error('Network error:', error.message);
    reject(error);
  });
  
  req.end();
});
}`,
  testCases: [
    { 
      input: `try {
throw new Error('Test error');
} catch (error) {
console.log('Caught:', error.message);
}`, 
      output: `Caught: Test error` 
    },
    {
      input: `process.on('uncaughtException', (error) => {
console.log('Uncaught:', error.message);
});
throw new Error('Uncaught test');`,
      output: `Uncaught: Uncaught test`
    },
    {
      input: `Promise.reject(new Error('Promise error'))
.catch(error => console.log('Handled:', error.message));`,
      output: `Handled: Promise error`
    }
  ],
  explanation: `**Uncaught failures and exceptional errors** in Node.js are critical issues that can crash your application. Understanding how to handle them is essential for building robust applications.

**Types of Uncaught Exceptions:**

1. **Synchronous Exceptions**: Errors thrown in synchronous code without try-catch
2. **Asynchronous Exceptions**: Errors in callbacks, timers, or event handlers
3. **Unhandled Promise Rejections**: Promise rejections without .catch() handlers
4. **Process-level Errors**: System-level errors that affect the entire process

**Key Handling Strategies:**

1. **process.on('uncaughtException')**: Catch all uncaught exceptions
2. **process.on('unhandledRejection')**: Handle unhandled promise rejections
3. **Domain-based handling**: Isolate error contexts (deprecated but functional)
4. **Error boundaries**: Wrap risky operations in error handlers

**Prevention Techniques:**

- **Always use try-catch** for synchronous operations
- **Handle promise rejections** with .catch() or try-catch with async/await
- **Validate inputs** before processing
- **Use error boundaries** for critical operations
- **Implement circuit breakers** for external dependencies

**Recovery Strategies:**

1. **Graceful degradation**: Continue with reduced functionality
2. **Module restart**: Restart specific failed modules
3. **Process restart**: Restart the entire application
4. **Circuit breaker**: Temporarily disable failing operations

**Monitoring and Alerting:**

- **Track error rates** and patterns
- **Set up alerts** for high error frequencies
- **Log detailed error information** for debugging
- **Monitor process health** and restart when necessary

**Best Practices:**

- **Never ignore uncaught exceptions** - always handle them
- **Log errors appropriately** with context and stack traces
- **Implement graceful shutdown** procedures
- **Use external monitoring** services for production
- **Test error scenarios** thoroughly
- **Document error handling** procedures

**Why This Matters:**

- **Prevents application crashes** and data loss
- **Improves user experience** with graceful error handling
- **Enables proper debugging** and troubleshooting
- **Supports high availability** and reliability
- **Essential for production applications** and monitoring

Understanding uncaught failures and exceptional errors is crucial for building production-ready Node.js applications that can handle failures gracefully and maintain high availability.`
},
{
  id: 'nodejs-5',
  title: 'Major Steps to Optimize Performance of Node.js App for High Volume',
  description: 'Understanding comprehensive performance optimization strategies for Node.js applications handling large volumes of traffic, including profiling, caching, database optimization, and scaling techniques.',
  difficulty: 'Hard',
  category: 'nodejs',
  solution: `// Major Steps to Optimize Node.js App Performance for High Volume

// 1. PERFORMANCE PROFILING AND MONITORING

// Use built-in profiler
const profiler = require('v8-profiler-next');

// Start profiling
profiler.startProfiling('CPU Profile');

// Stop profiling after some time
setTimeout(() => {
const profile = profiler.stopProfiling();
profile.export((error, result) => {
  require('fs').writeFileSync('./profile.cpuprofile', result);
  profile.delete();
});
}, 30000);

// Memory profiling
const heapProfiler = require('v8-profiler-next');
heapProfiler.startProfiling('Heap Profile');

setTimeout(() => {
const profile = heapProfiler.stopProfiling();
profile.export((error, result) => {
  require('fs').writeFileSync('./profile.heapprofile', result);
  profile.delete();
});
}, 30000);

// 2. CODE OPTIMIZATION

// Optimize 1: Avoid blocking operations
// BAD - Blocking
function blockingOperation() {
const result = require('crypto').randomBytes(1000000); // Blocks event loop
return result;
}

// GOOD - Non-blocking
function nonBlockingOperation() {
return new Promise((resolve) => {
  setImmediate(() => {
    const result = require('crypto').randomBytes(1000000);
    resolve(result);
  });
});
}

// Optimize 2: Use worker threads for CPU-intensive tasks
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
// Main thread
function heavyComputation(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: data
    });
    
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(\`Worker stopped with exit code \${code}\`));
    });
  });
}
} else {
// Worker thread
const result = performHeavyComputation(workerData);
parentPort.postMessage(result);
}

// Optimize 3: Optimize loops and data structures
// BAD - Inefficient array operations
function inefficientArrayOps() {
const arr = [];
for (let i = 0; i < 1000000; i++) {
  arr.push(i); // Resizes array multiple times
}
return arr;
}

// GOOD - Pre-allocate array
function efficientArrayOps() {
const arr = new Array(1000000);
for (let i = 0; i < 1000000; i++) {
  arr[i] = i; // No resizing
}
return arr;
}

// 3. CACHING STRATEGIES

// In-memory caching with LRU
const LRU = require('lru-cache');

const cache = new LRU({
max: 500, // Maximum number of items
maxAge: 1000 * 60 * 5, // 5 minutes
updateAgeOnGet: true
});

function getCachedData(key) {
let data = cache.get(key);
if (!data) {
  data = fetchDataFromDatabase(key);
  cache.set(key, data);
}
return data;
}

// Redis caching
const redis = require('redis');
const client = redis.createClient();

async function getCachedUser(userId) {
const cached = await client.get(\`user:\${userId}\`);
if (cached) {
  return JSON.parse(cached);
}

const user = await fetchUserFromDatabase(userId);
await client.setex(\`user:\${userId}\`, 3600, JSON.stringify(user)); // 1 hour TTL
return user;
}

// 4. DATABASE OPTIMIZATION

// Connection pooling
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
host: 'localhost',
user: 'user',
password: 'password',
database: 'mydb',
connectionLimit: 20, // Optimize based on your needs
acquireTimeout: 60000,
timeout: 60000,
reconnect: true
});

// Optimized queries with indexing
async function getOptimizedUsers() {
const [rows] = await pool.execute(
  'SELECT id, name, email FROM users WHERE status = ? LIMIT 1000',
  ['active']
);
return rows;
}

// Batch operations
async function batchInsertUsers(users) {
const values = users.map(user => [user.name, user.email, user.status]);
const [result] = await pool.execute(
  'INSERT INTO users (name, email, status) VALUES ?',
  [values]
);
return result;
}

// 5. ASYNC/AWAIT OPTIMIZATION

// Parallel execution
async function parallelOperations() {
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
]);

return { users, posts, comments };
}

// Sequential vs Parallel
// BAD - Sequential
async function sequentialOps() {
const user = await fetchUser(1);
const posts = await fetchPosts(user.id);
const comments = await fetchComments(posts[0].id);
return { user, posts, comments };
}

// GOOD - Parallel where possible
async function parallelOps() {
const user = await fetchUser(1);
const [posts, comments] = await Promise.all([
  fetchPosts(user.id),
  fetchComments(user.id)
]);
return { user, posts, comments };
}

// 6. MEMORY OPTIMIZATION

// Stream processing for large files
const fs = require('fs');
const csv = require('csv-parser');

function processLargeFile(filename) {
return new Promise((resolve, reject) => {
  const results = [];
  
  fs.createReadStream(filename)
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
      // Process in chunks to avoid memory issues
      if (results.length >= 1000) {
        processChunk(results.splice(0, 1000));
      }
    })
    .on('end', () => {
      if (results.length > 0) {
        processChunk(results);
      }
      resolve();
    })
    .on('error', reject);
});
}

// Garbage collection optimization
const v8 = require('v8');

// Set memory limits
v8.setFlagsFromString('--max_old_space_size=4096'); // 4GB heap

// Monitor memory usage
setInterval(() => {
const memUsage = process.memoryUsage();
console.log('Memory usage:', {
  rss: Math.round(memUsage.rss / 1024 / 1024) + ' MB',
  heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + ' MB',
  heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + ' MB'
});
}, 30000);

// 7. NETWORK OPTIMIZATION

// HTTP/2 for better performance
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
key: fs.readFileSync('key.pem'),
cert: fs.readFileSync('cert.pem')
});

server.on('stream', (stream, headers) => {
stream.respond({
  'content-type': 'application/json',
  ':status': 200
});

stream.end(JSON.stringify({ message: 'Hello HTTP/2!' }));
});

// Compression middleware
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression({
level: 6, // Balance between compression and CPU usage
threshold: 1024, // Only compress responses > 1KB
filter: (req, res) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
}
}));

// 8. LOAD BALANCING AND CLUSTERING

// Built-in clustering
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
console.log(\`Master \${process.pid} is running\`);

// Fork workers
for (let i = 0; i < numCPUs; i++) {
  cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
  console.log(\`Worker \${worker.process.pid} died\`);
  // Replace the dead worker
  cluster.fork();
});
} else {
// Worker process
require('./app.js');
}

// PM2 for process management
const pm2Config = {
apps: [{
  name: 'my-app',
  script: 'app.js',
  instances: 'max', // Use all CPU cores
  exec_mode: 'cluster',
  max_memory_restart: '1G',
  env: {
    NODE_ENV: 'production'
  }
}]
};

// 9. MONITORING AND METRICS

// Application metrics
const prometheus = require('prom-client');
const register = new prometheus.Registry();

// HTTP request duration histogram
const httpRequestDuration = new prometheus.Histogram({
name: 'http_request_duration_seconds',
help: 'Duration of HTTP requests in seconds',
labelNames: ['method', 'route', 'status_code'],
buckets: [0.1, 0.5, 1, 2, 5]
});

register.registerMetric(httpRequestDuration);

// Custom metrics
const activeConnections = new prometheus.Gauge({
name: 'active_connections',
help: 'Number of active connections'
});

// 10. MICROSERVICES OPTIMIZATION

// Service discovery and load balancing
const consul = require('consul')();

// Register service
consul.agent.service.register({
name: 'my-service',
port: 3000,
check: {
  http: 'http://localhost:3000/health',
  interval: '10s'
}
});

// Circuit breaker pattern
const CircuitBreaker = require('opossum');

const breaker = new CircuitBreaker(asyncFunction, {
timeout: 3000,
errorThresholdPercentage: 50,
resetTimeout: 30000
});

// 11. CONFIGURATION OPTIMIZATION

// Environment-specific configs
const config = {
development: {
  poolSize: 10,
  cacheTTL: 300,
  compression: false
},
production: {
  poolSize: 50,
  cacheTTL: 3600,
  compression: true,
  cluster: true
}
}[process.env.NODE_ENV || 'development'];

// 12. PERFORMANCE TESTING

// Load testing with Artillery
const artilleryConfig = {
config: {
  target: 'http://localhost:3000',
  phases: [
    { duration: 60, arrivalRate: 10 },
    { duration: 120, arrivalRate: 50 },
    { duration: 60, arrivalRate: 100 }
  ]
},
scenarios: [
  {
    name: 'API endpoints',
    requests: [
      { get: { url: '/api/users' } },
      { get: { url: '/api/posts' } }
    ]
  }
]
};

// 13. OPTIMIZATION CHECKLIST

const optimizationChecklist = {
'Code Level': [
  'Use async/await instead of callbacks',
  'Implement proper error handling',
  'Avoid blocking operations',
  'Use worker threads for CPU-intensive tasks',
  'Optimize loops and data structures'
],
'Caching': [
  'Implement in-memory caching (LRU)',
  'Use Redis for distributed caching',
  'Cache database queries',
  'Implement CDN for static assets'
],
'Database': [
  'Use connection pooling',
  'Optimize queries with proper indexing',
  'Implement batch operations',
  'Use read replicas for read-heavy workloads'
],
'Infrastructure': [
  'Use load balancers',
  'Implement horizontal scaling',
  'Use CDN for static content',
  'Optimize server configurations'
],
'Monitoring': [
  'Implement application metrics',
  'Set up alerting',
  'Monitor resource usage',
  'Track performance bottlenecks'
]
};

// 14. PERFORMANCE MONITORING DASHBOARD

class PerformanceMonitor {
constructor() {
  this.metrics = {
    requests: 0,
    errors: 0,
    responseTime: [],
    memoryUsage: [],
    cpuUsage: []
  };
}

recordRequest(duration, success) {
  this.metrics.requests++;
  this.metrics.responseTime.push(duration);
  
  if (!success) {
    this.metrics.errors++;
  }
  
  // Keep only last 1000 measurements
  if (this.metrics.responseTime.length > 1000) {
    this.metrics.responseTime.shift();
  }
}

getStats() {
  const avgResponseTime = this.metrics.responseTime.reduce((a, b) => a + b, 0) / this.metrics.responseTime.length;
  const errorRate = (this.metrics.errors / this.metrics.requests) * 100;
  
  return {
    totalRequests: this.metrics.requests,
    errorRate: errorRate.toFixed(2) + '%',
    avgResponseTime: avgResponseTime.toFixed(2) + 'ms',
    memoryUsage: process.memoryUsage()
  };
}
}

const monitor = new PerformanceMonitor();

// Middleware to record metrics
app.use((req, res, next) => {
const start = Date.now();

res.on('finish', () => {
  const duration = Date.now() - start;
  const success = res.statusCode < 400;
  monitor.recordRequest(duration, success);
});

next();
});`,
  testCases: [
    { 
      input: `const cache = new Map();
function getCachedData(key) {
if (cache.has(key)) {
  return cache.get(key);
}
const data = fetchData(key);
cache.set(key, data);
return data;
}`, 
      output: `// Caching implementation for performance optimization` 
    },
    {
      input: `async function parallelFetch() {
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);
return { users, posts };
}`,
      output: `// Parallel execution for better performance`
    },
    {
      input: `const pool = mysql.createPool({
connectionLimit: 20,
acquireTimeout: 60000
});`,
      output: `// Database connection pooling configuration`
    }
  ],
  explanation: `**Performance optimization for high-volume Node.js applications** requires a comprehensive approach across multiple layers. Here are the major steps:

**1. Performance Profiling and Monitoring:**
- Use V8 profiler to identify bottlenecks
- Monitor CPU, memory, and I/O usage
- Set up real-time performance dashboards
- Track key metrics like response time, throughput, error rates

**2. Code-Level Optimizations:**
- **Avoid blocking operations** in the event loop
- **Use worker threads** for CPU-intensive tasks
- **Optimize data structures** and algorithms
- **Implement proper async/await** patterns
- **Use parallel execution** where possible

**3. Caching Strategies:**
- **In-memory caching** with LRU eviction
- **Redis caching** for distributed systems
- **Database query caching**
- **CDN for static assets**
- **Application-level caching** for frequently accessed data

**4. Database Optimization:**
- **Connection pooling** to reuse connections
- **Query optimization** with proper indexing
- **Batch operations** for bulk data processing
- **Read replicas** for read-heavy workloads
- **Database sharding** for horizontal scaling

**5. Memory Management:**
- **Stream processing** for large files
- **Garbage collection optimization**
- **Memory leak detection** and prevention
- **Efficient data structures**
- **Memory usage monitoring**

**6. Network Optimization:**
- **HTTP/2** for multiplexing and compression
- **Response compression** (gzip, brotli)
- **Connection pooling** for external APIs
- **Load balancing** across multiple servers
- **CDN implementation**

**7. Scaling Strategies:**
- **Horizontal scaling** with clustering
- **Load balancing** with nginx/HAProxy
- **Microservices architecture**
- **Container orchestration** (Docker, Kubernetes)
- **Auto-scaling** based on metrics

**8. Infrastructure Optimization:**
- **Server configuration** tuning
- **Network optimization**
- **Storage optimization** (SSDs, RAID)
- **Cloud provider optimization**
- **Geographic distribution**

**9. Monitoring and Alerting:**
- **Application performance monitoring** (APM)
- **Real-time metrics** collection
- **Automated alerting** for performance issues
- **Log aggregation** and analysis
- **Performance regression** detection

**10. Testing and Validation:**
- **Load testing** with tools like Artillery
- **Stress testing** to find breaking points
- **Performance regression** testing
- **A/B testing** for optimization validation
- **Continuous performance** monitoring

**Key Performance Metrics to Track:**
- **Response time** (p50, p95, p99)
- **Throughput** (requests per second)
- **Error rate** and availability
- **Resource utilization** (CPU, memory, I/O)
- **Database performance** metrics

**Best Practices for High Volume:**
- **Start with profiling** to identify bottlenecks
- **Optimize the critical path** first
- **Implement caching** at multiple levels
- **Use async operations** everywhere possible
- **Monitor everything** in production
- **Plan for horizontal scaling** from the start
- **Test at scale** before deployment
- **Implement circuit breakers** for external dependencies
- **Use connection pooling** for all external services
- **Optimize for the 95th percentile** response times

**Why Performance Optimization Matters:**
- **User experience** and satisfaction
- **Cost reduction** through efficient resource usage
- **Scalability** to handle growth
- **Competitive advantage** in the market
- **Reliability** and availability
- **SEO benefits** from faster loading times

Performance optimization is an ongoing process that requires continuous monitoring, testing, and refinement to maintain optimal performance as your application scales.`
},
{
  id: 'nodejs-6',
  title: 'What is Child Process, How to Create Child Process and What is Significant About Child Process',
  description: 'Understanding child processes in Node.js, different methods to create them, their significance in handling CPU-intensive tasks, and best practices for process management.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// Child Processes in Node.js

// 1. WHAT IS A CHILD PROCESS?
// A child process is a separate process created by the parent Node.js process
// It runs independently and can execute different code, handle CPU-intensive tasks
// and communicate with the parent process through IPC (Inter-Process Communication)

// 2. WHY USE CHILD PROCESSES?

// Problem: Node.js is single-threaded
function cpuIntensiveTask() {
let result = 0;
for (let i = 0; i < 1000000000; i++) {
  result += Math.sqrt(i);
}
return result;
}

// This blocks the event loop for a long time
// console.log(cpuIntensiveTask()); // Blocks everything

// Solution: Use child process
// This allows the main process to continue handling other requests

// 3. METHODS TO CREATE CHILD PROCESSES

// Method 1: spawn() - Most flexible, streams data
const { spawn } = require('child_process');

function createSpawnProcess() {
// Spawn a new process
const child = spawn('node', ['worker.js'], {
  stdio: ['pipe', 'pipe', 'pipe'] // stdin, stdout, stderr
});

// Send data to child process
child.stdin.write('Hello from parent\\n');
child.stdin.end();

// Receive data from child process
child.stdout.on('data', (data) => {
  console.log('Child output:', data.toString());
});

child.stderr.on('data', (data) => {
  console.error('Child error:', data.toString());
});

// Handle process completion
child.on('close', (code) => {
  console.log(\`Child process exited with code \${code}\`);
});

return child;
}

// Method 2: exec() - Simpler, buffers output
const { exec } = require('child_process');

function createExecProcess() {
exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  if (stderr) {
    console.error('Stderr:', stderr);
    return;
  }
  console.log('Stdout:', stdout);
});
}

// Method 3: execFile() - Execute files directly
const { execFile } = require('child_process');

function createExecFileProcess() {
execFile('node', ['worker.js'], (error, stdout, stderr) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Output:', stdout);
});
}

// Method 4: fork() - Specialized for Node.js processes
const { fork } = require('child_process');

function createForkProcess() {
// Fork creates a new Node.js process
const child = fork('./worker.js', ['arg1', 'arg2'], {
  silent: false, // Inherit parent's stdio
  execArgv: ['--max-old-space-size=4096'] // Pass Node.js options
});

// Send message to child
child.send({ type: 'task', data: 'process this data' });

// Receive message from child
child.on('message', (message) => {
  console.log('Message from child:', message);
});

// Handle process events
child.on('exit', (code, signal) => {
  console.log(\`Child exited with code \${code} and signal \${signal}\`);
});

child.on('error', (error) => {
  console.error('Child process error:', error);
});

return child;
}

// 4. WORKER.JS EXAMPLE (Child Process File)
// This would be in a separate file called worker.js

/*
const { parentPort } = require('worker_threads');

// Receive message from parent
parentPort.on('message', (message) => {
console.log('Worker received:', message);

// Do some work
const result = heavyComputation(message.data);

// Send result back to parent
parentPort.postMessage({
  type: 'result',
  data: result
});
});

function heavyComputation(data) {
let result = 0;
for (let i = 0; i < 1000000; i++) {
  result += Math.sqrt(i);
}
return result;
}
*/

// 5. PRACTICAL EXAMPLES

// Example 1: CPU-intensive task in child process
function runCPUIntensiveTask() {
const child = fork('./cpuWorker.js');

child.send({ task: 'compute', data: 1000000 });

child.on('message', (result) => {
  console.log('Computation result:', result);
  child.kill(); // Terminate child process
});
}

// Example 2: File processing with spawn
function processLargeFile(filename) {
const child = spawn('grep', ['error', filename]);

let output = '';

child.stdout.on('data', (data) => {
  output += data.toString();
});

child.on('close', (code) => {
  console.log('File processing complete');
  console.log('Found errors:', output.split('\\n').length - 1);
});
}

// Example 3: Database backup with exec
function backupDatabase() {
const command = 'mysqldump -u root -p database_name > backup.sql';

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('Backup failed:', error);
    return;
  }
  console.log('Database backup completed successfully');
});
}

// Example 4: Multiple child processes for parallel processing
function parallelProcessing() {
const tasks = ['task1', 'task2', 'task3', 'task4'];
const children = [];

tasks.forEach((task, index) => {
  const child = fork('./worker.js');
  
  child.send({ task, index });
  
  child.on('message', (result) => {
    console.log(\`Task \${task} completed: \${result}\`);
    child.kill();
  });
  
  children.push(child);
});

// Wait for all children to complete
Promise.all(children.map(child => {
  return new Promise((resolve) => {
    child.on('exit', resolve);
  });
})).then(() => {
  console.log('All tasks completed');
});
}

// 6. COMMUNICATION BETWEEN PROCESSES

// IPC (Inter-Process Communication) with fork()
function ipcExample() {
const child = fork('./ipcWorker.js');

// Send data to child
child.send({
  type: 'calculation',
  numbers: [1, 2, 3, 4, 5]
});

// Receive data from child
child.on('message', (message) => {
  switch (message.type) {
    case 'result':
      console.log('Calculation result:', message.data);
      break;
    case 'progress':
      console.log('Progress:', message.percent + '%');
      break;
    case 'error':
      console.error('Child error:', message.error);
      break;
  }
});
}

// 7. PROCESS MANAGEMENT

// Process pool for managing multiple child processes
class ProcessPool {
constructor(size) {
  this.size = size;
  this.processes = [];
  this.queue = [];
  this.active = 0;
}

async execute(task) {
  return new Promise((resolve, reject) => {
    if (this.active < this.size) {
      this.runTask(task, resolve, reject);
    } else {
      this.queue.push({ task, resolve, reject });
    }
  });
}

runTask(task, resolve, reject) {
  this.active++;
  
  const child = fork('./worker.js');
  
  child.send(task);
  
  child.on('message', (result) => {
    resolve(result);
    this.active--;
    child.kill();
    
    // Process next task in queue
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      this.runTask(next.task, next.resolve, next.reject);
    }
  });
  
  child.on('error', (error) => {
    reject(error);
    this.active--;
    child.kill();
  });
}
}

// Usage of process pool
const pool = new ProcessPool(4);

async function useProcessPool() {
const tasks = Array.from({ length: 10 }, (_, i) => ({ id: i, data: i * 1000 }));

const results = await Promise.all(
  tasks.map(task => pool.execute(task))
);

console.log('All tasks completed:', results);
}

// 8. ERROR HANDLING AND MONITORING

function robustChildProcess() {
const child = fork('./worker.js');

// Set timeout for child process
const timeout = setTimeout(() => {
  console.log('Child process timeout, killing...');
  child.kill('SIGKILL');
}, 30000); // 30 seconds

child.send({ task: 'longRunningTask' });

child.on('message', (result) => {
  clearTimeout(timeout);
  console.log('Task completed:', result);
  child.kill();
});

child.on('error', (error) => {
  clearTimeout(timeout);
  console.error('Child process error:', error);
});

child.on('exit', (code, signal) => {
  clearTimeout(timeout);
  if (code !== 0) {
    console.error(\`Child process exited with code \${code}\`);
  }
});
}

// 9. SIGNIFICANCE OF CHILD PROCESSES

const childProcessSignificance = {
'CPU Intensive Tasks': {
  description: 'Handle heavy computations without blocking the main event loop',
  example: 'Image processing, data analysis, mathematical computations'
},
'Parallel Processing': {
  description: 'Execute multiple tasks simultaneously across different processes',
  example: 'Processing multiple files, handling multiple requests'
},
'Process Isolation': {
  description: 'Isolate failures and prevent one process from affecting others',
  example: 'Microservices architecture, fault tolerance'
},
'Resource Management': {
  description: 'Better control over memory and CPU usage',
  example: 'Memory leaks in child processes don\'t affect parent'
},
'Scalability': {
  description: 'Scale horizontally by adding more processes',
  example: 'Load balancing across multiple worker processes'
},
'Security': {
  description: 'Run untrusted code in isolated processes',
  example: 'Sandboxed execution, plugin systems'
}
};

// 10. BEST PRACTICES

const bestPractices = {
'Process Creation': [
  'Use fork() for Node.js processes',
  'Use spawn() for external commands',
  'Use exec() for simple commands with buffered output',
  'Always handle process events (exit, error, message)'
],
'Communication': [
  'Use IPC for parent-child communication',
  'Keep messages small and serializable',
  'Handle communication errors gracefully',
  'Use timeouts for long-running operations'
],
'Resource Management': [
  'Always kill child processes when done',
  'Implement process pools for multiple workers',
  'Monitor memory and CPU usage',
  'Set appropriate timeouts'
],
'Error Handling': [
  'Handle all process events',
  'Implement retry mechanisms',
  'Log errors appropriately',
  'Graceful degradation on failures'
]
};

// 11. PERFORMANCE COMPARISON

function performanceComparison() {
console.log('Performance Comparison:');

// Single-threaded (blocking)
const start1 = Date.now();
cpuIntensiveTask();
const time1 = Date.now() - start1;
console.log(\`Single-threaded: \${time1}ms\`);

// Multi-process (non-blocking)
const start2 = Date.now();
const child = fork('./cpuWorker.js');

child.send({ task: 'compute' });

child.on('message', (result) => {
  const time2 = Date.now() - start2;
  console.log(\`Multi-process: \${time2}ms\`);
  console.log('Result:', result);
  child.kill();
});
}

// 12. REAL-WORLD USE CASES

const realWorldUseCases = {
'Web Servers': {
  description: 'Handle multiple requests with worker processes',
  implementation: 'PM2, cluster module'
},
'Data Processing': {
  description: 'Process large datasets in parallel',
  implementation: 'Map-reduce patterns, batch processing'
},
'File Operations': {
  description: 'Handle large file uploads/downloads',
  implementation: 'Stream processing, chunked operations'
},
'API Aggregation': {
  description: 'Fetch data from multiple sources',
  implementation: 'Parallel API calls, result aggregation'
},
'Background Jobs': {
  description: 'Run long-running tasks in background',
  implementation: 'Job queues, task scheduling'
}
};`,
  testCases: [
    { 
      input: `const { fork } = require('child_process');
const child = fork('./worker.js');
child.send({ data: 'test' });
child.on('message', (msg) => console.log('Received:', msg));`, 
      output: `// Child process communication example` 
    },
    {
      input: `const { spawn } = require('child_process');
const child = spawn('ls', ['-la']);
child.stdout.on('data', (data) => console.log(data.toString()));`,
      output: `// Spawn child process for external command`
    },
    {
      input: `const { exec } = require('child_process');
exec('echo "Hello World"', (error, stdout) => {
console.log(stdout.trim());
});`,
      output: `Hello World`
    }
  ],
  explanation: `**Child processes in Node.js** are separate processes created by the parent Node.js process that run independently and can handle CPU-intensive tasks without blocking the main event loop.

**What is a Child Process?**

A child process is a separate process that:
- Runs independently of the parent process
- Has its own memory space and event loop
- Can execute different code or external commands
- Communicates with the parent through IPC (Inter-Process Communication)
- Can handle CPU-intensive tasks without blocking the main thread

**How to Create Child Processes:**

1. **spawn()** - Most flexible method
 - Creates a new process with streams for stdin/stdout/stderr
 - Best for long-running processes with continuous data exchange
 - Example: Running external commands, file processing

2. **exec()** - Simple buffered execution
 - Executes a command and buffers the output
 - Best for simple commands with limited output
 - Example: Running shell commands, simple scripts

3. **execFile()** - Direct file execution
 - Executes a file directly without shell interpretation
 - More secure than exec() for user input
 - Example: Running executable files, scripts

4. **fork()** - Specialized for Node.js
 - Creates a new Node.js process
 - Enables IPC communication between parent and child
 - Best for Node.js-specific tasks
 - Example: CPU-intensive computations, parallel processing

**Significance of Child Processes:**

**1. CPU-Intensive Task Handling:**
- Node.js is single-threaded and can't handle CPU-intensive tasks efficiently
- Child processes allow heavy computations without blocking the event loop
- Enables responsive applications even during heavy processing

**2. Parallel Processing:**
- Multiple child processes can run simultaneously
- Significantly improves performance for parallelizable tasks
- Enables true multi-core utilization

**3. Process Isolation:**
- Failures in child processes don't affect the parent process
- Provides fault tolerance and stability
- Enables graceful error handling and recovery

**4. Resource Management:**
- Better control over memory and CPU usage
- Memory leaks in child processes are isolated
- Can terminate problematic processes without affecting others

**5. Scalability:**
- Horizontal scaling by adding more worker processes
- Load balancing across multiple processes
- Better resource utilization across CPU cores

**6. Security:**
- Run untrusted code in isolated processes
- Sandboxed execution for plugins or user code
- Reduced security risks from malicious code

**Key Benefits:**

- **Non-blocking operations** for CPU-intensive tasks
- **Improved performance** through parallel processing
- **Better resource utilization** across multiple CPU cores
- **Enhanced stability** through process isolation
- **Scalable architecture** for high-load applications
- **Fault tolerance** and error isolation

**Common Use Cases:**

- **Web servers** with worker processes
- **Data processing** and batch operations
- **File operations** and stream processing
- **API aggregation** from multiple sources
- **Background jobs** and task scheduling
- **Microservices** architecture

**Best Practices:**

- Always handle process events (exit, error, message)
- Implement proper error handling and timeouts
- Use process pools for managing multiple workers
- Keep IPC messages small and serializable
- Always kill child processes when done
- Monitor resource usage and implement limits

Child processes are essential for building scalable, high-performance Node.js applications that can handle CPU-intensive tasks while maintaining responsiveness and reliability.`
},
{
  id: 'nodejs-7',
  title: 'Why Google Uses V8 Engine for Node.js',
  description: 'Understanding the V8 JavaScript engine, its architecture, performance characteristics, and why it was chosen as the foundation for Node.js, including its benefits and technical advantages.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// Why Google Uses V8 Engine for Node.js

// 1. WHAT IS V8 ENGINE?

// V8 is Google's open-source JavaScript engine written in C++
// It compiles JavaScript directly to native machine code before execution
// Originally developed for Google Chrome browser

// V8 Engine Architecture
const v8Architecture = {
'Parser': 'Converts JavaScript code to Abstract Syntax Tree (AST)',
'Ignition': 'Interpreter that executes bytecode',
'TurboFan': 'Optimizing compiler that generates machine code',
'Orinoco': 'Garbage collector for memory management',
'Liftoff': 'Baseline compiler for WebAssembly'
};

// 2. V8 ENGINE FEATURES

// Feature 1: Just-In-Time (JIT) Compilation
function demonstrateJIT() {
// V8 compiles frequently executed code to machine code
let sum = 0;

// This loop gets optimized by V8's TurboFan compiler
for (let i = 0; i < 1000000; i++) {
  sum += i;
}

return sum;
}

// Feature 2: Hidden Classes and Inline Caching
function demonstrateHiddenClasses() {
// V8 optimizes object property access
const obj1 = { x: 1, y: 2 };
const obj2 = { x: 3, y: 4 };

// Both objects have the same hidden class
// V8 can optimize property access
return obj1.x + obj2.x;
}

// Feature 3: Garbage Collection
function demonstrateGC() {
// V8's Orinoco garbage collector manages memory automatically
const largeArray = new Array(1000000);

// When this function ends, V8 will clean up the memory
return largeArray.length;
}

// 3. WHY V8 WAS CHOSEN FOR NODE.JS

// Reason 1: Performance
const performanceComparison = {
'V8 Engine': {
  'Compilation': 'JIT compilation to native code',
  'Optimization': 'Advanced optimization techniques',
  'Memory': 'Efficient garbage collection',
  'Speed': 'Near-native performance'
},
'Other Engines': {
  'Compilation': 'Interpreted or basic compilation',
  'Optimization': 'Limited optimization',
  'Memory': 'Basic memory management',
  'Speed': 'Slower execution'
}
};

// Reason 2: Event Loop Implementation
// V8's event loop is perfect for Node.js's non-blocking I/O model
const eventLoopExample = {
'V8 Event Loop': [
  'Call Stack',
  'Microtask Queue (Promises)',
  'Macrotask Queue (setTimeout, setInterval)',
  'I/O Callback Queue',
  'Check Queue (setImmediate)',
  'Close Callback Queue'
]
};

// Reason 3: Memory Management
function demonstrateV8Memory() {
// V8's garbage collector is highly optimized
const v8MemoryFeatures = {
  'Generational GC': 'Separates young and old objects',
  'Incremental GC': 'Minimizes pause times',
  'Concurrent GC': 'Runs alongside application code',
  'Memory Pooling': 'Efficient memory allocation'
};

return v8MemoryFeatures;
}

// 4. V8 ENGINE ARCHITECTURE DETAILS

// Compilation Pipeline
const compilationPipeline = {
'Step 1: Parsing': {
  'Scanner': 'Converts source code to tokens',
  'Parser': 'Creates Abstract Syntax Tree (AST)',
  'PreParser': 'Quick parsing for lazy compilation'
},
'Step 2: Compilation': {
  'Ignition': 'Generates bytecode from AST',
  'TurboFan': 'Optimizes hot code paths',
  'Liftoff': 'Fast baseline compilation'
},
'Step 3: Execution': {
  'Bytecode Interpreter': 'Executes bytecode',
  'Optimized Code': 'Executes compiled machine code',
  'Deoptimization': 'Falls back to bytecode if needed'
}
};

// 5. V8 OPTIMIZATION TECHNIQUES

// Technique 1: Inline Caching
function inlineCachingExample() {
const objects = [
  { type: 'user', name: 'John' },
  { type: 'user', name: 'Jane' },
  { type: 'user', name: 'Bob' }
];

// V8 optimizes this property access through inline caching
let totalLength = 0;
for (const obj of objects) {
  totalLength += obj.name.length; // Optimized access
}

return totalLength;
}

// Technique 2: Hidden Classes
function hiddenClassExample() {
// V8 creates hidden classes for object shapes
const user1 = { id: 1, name: 'John', email: 'john@example.com' };
const user2 = { id: 2, name: 'Jane', email: 'jane@example.com' };

// Both objects share the same hidden class
// V8 optimizes property access
return user1.name + user2.name;
}

// Technique 3: Function Optimization
function optimizedFunction() {
// V8 optimizes frequently called functions
let result = 0;

// This function gets optimized after several calls
for (let i = 0; i < 1000; i++) {
  result += Math.sqrt(i);
}

return result;
}

// 6. V8 AND NODE.JS INTEGRATION

// How Node.js uses V8
const nodejsV8Integration = {
'Event Loop': 'Built on V8\'s event loop',
'JavaScript Engine': 'V8 executes all JavaScript code',
'C++ Bindings': 'Node.js provides C++ APIs to V8',
'Memory Management': 'V8 handles garbage collection',
'Performance': 'V8\'s optimizations benefit Node.js'
};

// V8 API Usage in Node.js
const v8 = require('v8');

// Access V8 heap statistics
function getV8Stats() {
const heapStats = v8.getHeapStatistics();
return {
  totalHeapSize: heapStats.total_heap_size,
  usedHeapSize: heapStats.used_heap_size,
  heapSizeLimit: heapStats.heap_size_limit,
  totalAvailableSize: heapStats.total_available_size
};
}

// Set V8 flags
function configureV8() {
// Increase heap size
v8.setFlagsFromString('--max_old_space_size=4096');

// Enable optimization
v8.setFlagsFromString('--optimize-for-size');
}

// 7. PERFORMANCE BENEFITS

// Benchmark: V8 vs Other Engines
const performanceBenchmarks = {
'V8 Engine': {
  'Execution Speed': 'Very Fast (JIT compiled)',
  'Memory Usage': 'Efficient (Generational GC)',
  'Startup Time': 'Fast (Lazy compilation)',
  'Optimization': 'Advanced (TurboFan)'
},
'SpiderMonkey (Firefox)': {
  'Execution Speed': 'Fast',
  'Memory Usage': 'Good',
  'Startup Time': 'Medium',
  'Optimization': 'Good'
},
'JavaScriptCore (Safari)': {
  'Execution Speed': 'Fast',
  'Memory Usage': 'Good',
  'Startup Time': 'Fast',
  'Optimization': 'Good'
}
};

// 8. V8 ENGINE EVOLUTION

// V8 Version History
const v8Evolution = {
'2008': 'Initial release with Chrome',
'2009': 'Node.js adopts V8',
'2015': 'Ignition and TurboFan introduced',
'2017': 'Orinoco garbage collector',
'2018': 'Liftoff WebAssembly compiler',
'2020': 'Sparkplug compiler',
'2022': 'Maglev compiler',
'2023': 'Turboshaft optimization'
};

// 9. V8 ENGINE FEATURES FOR NODE.JS

// Feature 1: Async/Await Support
async function v8AsyncSupport() {
// V8 natively supports async/await
const result = await Promise.resolve('Hello V8');
return result;
}

// Feature 2: ES6+ Features
function v8ES6Features() {
// V8 supports all modern JavaScript features
const features = {
  'Arrow Functions': () => 'supported',
  'Destructuring': ({ a, b }) => ({ a, b }),
  'Template Literals': \`V8 supports \${'template literals'}\`,
  'Classes': class Example { constructor() {} },
  'Modules': 'ES6 modules supported',
  'Generators': function* gen() { yield 1; },
  'Proxies': new Proxy({}, {}),
  'WeakMap/WeakSet': new WeakMap()
};

return features;
}

// Feature 3: WebAssembly Support
async function v8WebAssembly() {
// V8 supports WebAssembly
const wasmCode = new Uint8Array([
  0x00, 0x61, 0x73, 0x6d, // WASM magic number
  0x01, 0x00, 0x00, 0x00  // Version
]);

const wasmModule = await WebAssembly.compile(wasmCode);
return wasmModule;
}

// 10. V8 ENGINE OPTIMIZATION TECHNIQUES

// Optimization 1: Function Inlining
function demonstrateInlining() {
// V8 inlines small functions
function add(a, b) {
  return a + b;
}

let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += add(i, 1); // This gets inlined
}

return sum;
}

// Optimization 2: Loop Optimization
function demonstrateLoopOptimization() {
// V8 optimizes loops
const array = new Array(1000000);

// This loop gets optimized
for (let i = 0; i < array.length; i++) {
  array[i] = i * 2;
}

return array;
}

// Optimization 3: Type Specialization
function demonstrateTypeSpecialization() {
// V8 specializes code for specific types
let sum = 0;

// V8 optimizes for number operations
for (let i = 0; i < 1000000; i++) {
  sum += i; // Optimized for numbers
}

return sum;
}

// 11. V8 ENGINE MEMORY MANAGEMENT

// Memory Management Features
const v8MemoryManagement = {
'Generational Garbage Collection': {
  'Young Generation': 'New objects, collected frequently',
  'Old Generation': 'Surviving objects, collected less frequently',
  'Large Object Space': 'Large objects bypass young generation'
},
'Incremental Marking': 'Reduces pause times',
'Concurrent Sweeping': 'Runs alongside application',
'Memory Pooling': 'Efficient allocation patterns'
};

// Memory Usage Monitoring
function monitorV8Memory() {
const memUsage = process.memoryUsage();
const v8Stats = v8.getHeapStatistics();

return {
  'RSS': memUsage.rss,
  'Heap Used': memUsage.heapUsed,
  'Heap Total': memUsage.heapTotal,
  'External': memUsage.external,
  'V8 Heap Size': v8Stats.total_heap_size,
  'V8 Heap Used': v8Stats.used_heap_size
};
}

// 12. V8 ENGINE AND NODE.JS ECOSYSTEM

// Ecosystem Benefits
const ecosystemBenefits = {
'Performance': 'Fast execution enables high-performance applications',
'Compatibility': 'Same engine as Chrome ensures compatibility',
'Tooling': 'Chrome DevTools work with Node.js',
'Community': 'Large V8 community contributes to Node.js',
'Innovation': 'V8 improvements automatically benefit Node.js',
'Standards': 'Implements latest JavaScript standards quickly'
};

// 13. V8 ENGINE CONFIGURATION

// V8 Flags for Node.js
const v8Flags = {
'Memory Management': [
  '--max_old_space_size=4096', // 4GB heap
  '--initial_old_space_size=512', // Initial heap size
  '--max_semi_space_size=64' // Young generation size
],
'Performance': [
  '--optimize-for-size', // Optimize for memory usage
  '--max_optimization_count=1000', // Optimization limit
  '--allow_natives_syntax' // Allow V8 intrinsics
],
'Debugging': [
  '--trace_opt', // Trace optimizations
  '--trace_deopt', // Trace deoptimizations
  '--prof' // Enable profiling
]
};

// 14. FUTURE OF V8 AND NODE.JS

// Upcoming V8 Features
const futureV8Features = {
'Performance': [
  'Turboshaft optimization pipeline',
  'Improved garbage collection',
  'Better JIT compilation'
],
'Language Features': [
  'Latest ECMAScript proposals',
  'Enhanced WebAssembly support',
  'Improved debugging capabilities'
],
'Memory': [
  'More efficient memory usage',
  'Better memory profiling',
  'Reduced garbage collection pauses'
]
};

// 15. WHY V8 IS PERFECT FOR NODE.JS

const whyV8IsPerfect = {
'Performance': 'JIT compilation provides near-native speed',
'Memory Efficiency': 'Advanced garbage collection',
'Event Loop': 'Perfect for non-blocking I/O',
'Standards Compliance': 'Implements latest JavaScript features',
'Tooling': 'Excellent debugging and profiling tools',
'Community': 'Large, active development community',
'Innovation': 'Continuous performance improvements',
'Stability': 'Battle-tested in Chrome browser',
'Scalability': 'Handles large applications efficiently',
'Future-Proof': 'Regular updates and new features'
};`,
  testCases: [
    { 
      input: `const v8 = require('v8');
const stats = v8.getHeapStatistics();
console.log('Heap size:', stats.total_heap_size);`, 
      output: `// V8 heap statistics access` 
    },
    {
      input: `function optimizedLoop() {
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}
return sum;
}`,
      output: `// V8 JIT optimization example`
    },
    {
      input: `const v8 = require('v8');
v8.setFlagsFromString('--max_old_space_size=4096');
console.log('V8 configured for 4GB heap');`,
      output: `V8 configured for 4GB heap`
    }
  ],
  explanation: `**Google uses the V8 engine for Node.js** because it provides exceptional performance, advanced optimization techniques, and a robust foundation for server-side JavaScript execution.

**What is V8 Engine?**

V8 is Google's open-source JavaScript engine that:
- **Compiles JavaScript to native machine code** using Just-In-Time (JIT) compilation
- **Provides near-native performance** through advanced optimization techniques
- **Manages memory efficiently** with sophisticated garbage collection
- **Supports modern JavaScript features** and ECMAScript standards
- **Powers Google Chrome** and other Chromium-based browsers

**Why V8 Was Chosen for Node.js:**

**1. Performance Excellence:**
- **JIT Compilation**: Converts JavaScript to optimized machine code
- **TurboFan Optimizer**: Advanced compiler for hot code paths
- **Hidden Classes**: Optimizes object property access
- **Inline Caching**: Speeds up function calls and property access

**2. Event Loop Architecture:**
- **Perfect for Node.js**: V8's event loop aligns with Node.js's non-blocking I/O model
- **Efficient Task Queuing**: Handles microtasks and macrotasks effectively
- **Async/Await Support**: Native support for modern asynchronous patterns

**3. Memory Management:**
- **Generational Garbage Collection**: Separates young and old objects for efficiency
- **Incremental Marking**: Reduces pause times during garbage collection
- **Concurrent Sweeping**: Runs alongside application code
- **Memory Pooling**: Efficient allocation patterns

**4. Advanced Optimization Techniques:**
- **Function Inlining**: Reduces function call overhead
- **Loop Optimization**: Optimizes frequently executed loops
- **Type Specialization**: Creates specialized code for specific data types
- **Dead Code Elimination**: Removes unused code paths

**5. Standards Compliance:**
- **Latest ECMAScript Features**: Implements modern JavaScript standards quickly
- **WebAssembly Support**: Enables high-performance code execution
- **Future-Proof**: Regular updates with new language features

**6. Ecosystem Benefits:**
- **Chrome DevTools**: Same debugging tools work with Node.js
- **Large Community**: Extensive documentation and support
- **Battle-Tested**: Proven reliability in Chrome browser
- **Continuous Innovation**: Regular performance improvements

**V8 Engine Architecture:**

**Compilation Pipeline:**
1. **Parsing**: Converts source code to Abstract Syntax Tree (AST)
2. **Ignition**: Generates bytecode from AST
3. **TurboFan**: Optimizes hot code paths to machine code
4. **Execution**: Runs optimized code with fallback to bytecode

**Memory Management:**
- **Young Generation**: New objects, collected frequently
- **Old Generation**: Surviving objects, collected less frequently
- **Large Object Space**: Large objects bypass young generation

**Performance Benefits:**

**Speed:**
- **JIT Compilation**: Near-native execution speed
- **Optimization**: Advanced code optimization techniques
- **Efficient Data Structures**: Optimized for JavaScript patterns

**Memory Efficiency:**
- **Smart Garbage Collection**: Minimal memory overhead
- **Memory Pooling**: Efficient allocation patterns
- **Reduced Pause Times**: Incremental and concurrent GC

**Scalability:**
- **Multi-core Support**: Efficiently utilizes multiple CPU cores
- **Large Application Support**: Handles complex applications
- **Resource Management**: Efficient CPU and memory usage

**Why V8 is Perfect for Node.js:**

1. **Performance**: JIT compilation provides exceptional speed
2. **Memory Efficiency**: Advanced garbage collection
3. **Event Loop**: Perfect alignment with Node.js architecture
4. **Standards Compliance**: Latest JavaScript features
5. **Tooling**: Excellent debugging and profiling capabilities
6. **Community**: Large, active development community
7. **Innovation**: Continuous performance improvements
8. **Stability**: Battle-tested in production environments
9. **Scalability**: Handles large-scale applications
10. **Future-Proof**: Regular updates and new features

**Real-world Impact:**

- **High-Performance Applications**: Enables fast server-side applications
- **Scalable Architecture**: Supports large-scale deployments
- **Developer Experience**: Excellent debugging and profiling tools
- **Ecosystem Growth**: Drives Node.js adoption and innovation
- **Standards Leadership**: Influences JavaScript language development

V8's combination of performance, memory efficiency, and advanced optimization techniques makes it the ideal engine for Node.js, enabling high-performance server-side JavaScript applications that can compete with traditional server technologies.`
},
{
  id: 'nodejs-8',
  title: 'Code Works in Staging/UAT but Fails in Production - Debugging Approach',
  description: 'Understanding systematic approaches to debug production issues when code works in staging and UAT environments, including environment differences, monitoring strategies, and debugging techniques.',
  difficulty: 'Hard',
  category: 'nodejs',
  solution: `// Code Works in Staging/UAT but Fails in Production - Debugging Approach

// 1. SYSTEMATIC DEBUGGING APPROACH

// Step 1: Immediate Response and Assessment
class ProductionDebugger {
constructor() {
  this.issueLog = [];
  this.environmentDiff = {};
  this.monitoringData = {};
}

// Immediate response checklist
immediateResponse() {
  return {
    '1. Assess Impact': 'Determine severity and user impact',
    '2. Rollback Decision': 'Consider immediate rollback if critical',
    '3. Enable Debugging': 'Turn on verbose logging',
    '4. Monitor Metrics': 'Watch error rates and performance',
    '5. Team Alert': 'Notify relevant team members'
  };
}
}

// 2. ENVIRONMENT DIFFERENCES ANALYSIS

// Common environment differences that cause issues
const environmentDifferences = {
'Infrastructure': {
  'CPU/Memory': 'Different resource allocations',
  'Network': 'Latency, bandwidth, firewall rules',
  'Storage': 'Disk space, I/O performance',
  'Load Balancers': 'Different configurations'
},
'Configuration': {
  'Environment Variables': 'Missing or different values',
  'Database Connections': 'Connection pools, timeouts',
  'External Services': 'API endpoints, credentials',
  'Feature Flags': 'Different feature toggles'
},
'Data': {
  'Database Size': 'Production has more data',
  'Data Types': 'Different data characteristics',
  'User Load': 'Higher concurrent users',
  'Data Volume': 'Larger datasets'
},
'Dependencies': {
  'Node.js Version': 'Different runtime versions',
  'Package Versions': 'Different npm package versions',
  'System Libraries': 'OS-level differences',
  'Third-party Services': 'Different service versions'
}
};

// 3. DEBUGGING TOOLS AND TECHNIQUES

// Enhanced logging for production debugging
class ProductionLogger {
constructor() {
  this.logLevel = process.env.LOG_LEVEL || 'info';
  this.requestId = null;
}

// Structured logging with context
log(level, message, context = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: level,
    message: message,
    requestId: this.requestId,
    environment: process.env.NODE_ENV,
    version: process.env.APP_VERSION,
    ...context
  };
  
  console.log(JSON.stringify(logEntry));
}

// Request-specific logging
startRequest(req) {
  this.requestId = req.headers['x-request-id'] || this.generateId();
  this.log('info', 'Request started', {
    method: req.method,
    url: req.url,
    userAgent: req.headers['user-agent'],
    ip: req.ip
  });
}

// Error logging with stack traces
logError(error, context = {}) {
  this.log('error', error.message, {
    stack: error.stack,
    name: error.name,
    code: error.code,
    ...context
  });
}

generateId() {
  return Math.random().toString(36).substr(2, 9);
}
}

// 4. MONITORING AND METRICS

// Production monitoring setup
class ProductionMonitor {
constructor() {
  this.metrics = {
    requests: 0,
    errors: 0,
    responseTime: [],
    memoryUsage: [],
    cpuUsage: []
  };
}

// Track request metrics
trackRequest(duration, success) {
  this.metrics.requests++;
  this.metrics.responseTime.push(duration);
  
  if (!success) {
    this.metrics.errors++;
  }
}

// Memory monitoring
trackMemory() {
  const memUsage = process.memoryUsage();
  this.metrics.memoryUsage.push({
    timestamp: Date.now(),
    rss: memUsage.rss,
    heapUsed: memUsage.heapUsed,
    heapTotal: memUsage.heapTotal,
    external: memUsage.external
  });
}

// Get current metrics
getMetrics() {
  const avgResponseTime = this.metrics.responseTime.length > 0 
    ? this.metrics.responseTime.reduce((a, b) => a + b, 0) / this.metrics.responseTime.length 
    : 0;
  
  const errorRate = this.metrics.requests > 0 
    ? (this.metrics.errors / this.metrics.requests) * 100 
    : 0;
  
  return {
    totalRequests: this.metrics.requests,
    errorRate: errorRate.toFixed(2) + '%',
    avgResponseTime: avgResponseTime.toFixed(2) + 'ms',
    memoryUsage: this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1]
  };
}
}

// 5. ENVIRONMENT COMPARISON TOOL

// Compare environments systematically
class EnvironmentComparator {
constructor() {
  this.comparisons = {};
}

// Compare environment variables
compareEnvVars(stagingEnv, prodEnv) {
  const differences = {};
  
  for (const [key, stagingValue] of Object.entries(stagingEnv)) {
    const prodValue = prodEnv[key];
    
    if (stagingValue !== prodValue) {
      differences[key] = {
        staging: stagingValue,
        production: prodValue,
        type: 'different'
      };
    }
  }
  
  // Check for missing variables
  for (const [key, prodValue] of Object.entries(prodEnv)) {
    if (!stagingEnv.hasOwnProperty(key)) {
      differences[key] = {
        staging: 'missing',
        production: prodValue,
        type: 'missing_in_staging'
      };
    }
  }
  
  return differences;
}

// Compare system resources
async compareSystemResources() {
  const os = require('os');
  
  return {
    'CPU Cores': {
      staging: 'Check staging CPU cores',
      production: os.cpus().length,
      type: 'system'
    },
    'Memory': {
      staging: 'Check staging memory',
      production: Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB',
      type: 'system'
    },
    'Node.js Version': {
      staging: 'Check staging Node version',
      production: process.version,
      type: 'runtime'
    },
    'Platform': {
      staging: 'Check staging platform',
      production: os.platform(),
      type: 'system'
    }
  };
}

// Compare database connections
async compareDatabaseConfig() {
  // This would compare actual database configurations
  return {
    'Connection Pool Size': {
      staging: 'Check staging pool size',
      production: process.env.DB_POOL_SIZE || 'default',
      type: 'database'
    },
    'Connection Timeout': {
      staging: 'Check staging timeout',
      production: process.env.DB_TIMEOUT || 'default',
      type: 'database'
    }
  };
}
}

// 6. DEBUGGING STRATEGIES

// Strategy 1: Gradual debugging approach
class GradualDebugger {
constructor() {
  this.steps = [];
  this.currentStep = 0;
}

// Step-by-step debugging process
async debugStepByStep() {
  const steps = [
    {
      name: 'Check Application Logs',
      action: () => this.checkApplicationLogs(),
      description: 'Look for error messages and stack traces'
    },
    {
      name: 'Verify Environment Variables',
      action: () => this.verifyEnvironmentVariables(),
      description: 'Ensure all required env vars are set correctly'
    },
    {
      name: 'Check Database Connectivity',
      action: () => this.checkDatabaseConnectivity(),
      description: 'Verify database connections and queries'
    },
    {
      name: 'Monitor Resource Usage',
      action: () => this.monitorResourceUsage(),
      description: 'Check CPU, memory, and disk usage'
    },
    {
      name: 'Test External Dependencies',
      action: () => this.testExternalDependencies(),
      description: 'Verify third-party service connections'
    },
    {
      name: 'Compare with Staging',
      action: () => this.compareWithStaging(),
      description: 'Systematic comparison of environments'
    }
  ];
  
  for (const step of steps) {
    console.log(\`\\n=== Step \${this.currentStep + 1}: \${step.name} ===\`);
    console.log(\`Description: \${step.description}\`);
    
    try {
      await step.action();
      console.log('✓ Step completed successfully');
    } catch (error) {
      console.error('✗ Step failed:', error.message);
      return { step: step.name, error: error.message };
    }
    
    this.currentStep++;
  }
  
  return { success: true, message: 'All debugging steps completed' };
}

// Individual debugging methods
async checkApplicationLogs() {
  // Simulate log checking
  console.log('Checking application logs...');
  // In real implementation, this would read log files
}

async verifyEnvironmentVariables() {
  const requiredVars = [
    'NODE_ENV',
    'DATABASE_URL',
    'API_KEY',
    'REDIS_URL'
  ];
  
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(\`Missing environment variables: \${missing.join(', ')}\`);
  }
  
  console.log('All required environment variables are set');
}

async checkDatabaseConnectivity() {
  // Simulate database connectivity check
  console.log('Checking database connectivity...');
  // In real implementation, this would test actual DB connection
}

async monitorResourceUsage() {
  const os = require('os');
  const memUsage = process.memoryUsage();
  
  console.log('Resource Usage:');
  console.log('- CPU Load:', os.loadavg());
  console.log('- Memory RSS:', Math.round(memUsage.rss / 1024 / 1024) + ' MB');
  console.log('- Heap Used:', Math.round(memUsage.heapUsed / 1024 / 1024) + ' MB');
}

async testExternalDependencies() {
  console.log('Testing external dependencies...');
  // In real implementation, this would test API connections
}

async compareWithStaging() {
  console.log('Comparing with staging environment...');
  // In real implementation, this would compare configurations
}
}

// 7. PRODUCTION-SPECIFIC DEBUGGING TECHNIQUES

// Technique 1: Feature flag debugging
class FeatureFlagDebugger {
constructor() {
  this.featureFlags = new Map();
}

// Check if feature flags are causing issues
checkFeatureFlags() {
  const flags = {
    'NEW_FEATURE': process.env.NEW_FEATURE === 'true',
    'OPTIMIZATION': process.env.OPTIMIZATION === 'true',
    'CACHE_ENABLED': process.env.CACHE_ENABLED === 'true'
  };
  
  console.log('Feature Flags Status:', flags);
  
  // Temporarily disable features to isolate issues
  return flags;
}

// Temporarily disable a feature
disableFeature(featureName) {
  console.log(\`Temporarily disabling feature: \${featureName}\`);
  // In real implementation, this would update feature flags
}
}

// Technique 2: Load testing comparison
class LoadTestComparer {
constructor() {
  this.stagingResults = {};
  this.productionResults = {};
}

// Compare performance under load
async compareLoadPerformance() {
  console.log('Comparing load performance between staging and production...');
  
  // In real implementation, this would run actual load tests
  return {
    staging: {
      avgResponseTime: '50ms',
      errorRate: '0.1%',
      throughput: '1000 req/s'
    },
    production: {
      avgResponseTime: '200ms',
      errorRate: '5%',
      throughput: '500 req/s'
    }
  };
}
}

// Technique 3: Database query analysis
class DatabaseAnalyzer {
constructor() {
  this.slowQueries = [];
}

// Analyze slow queries
async analyzeSlowQueries() {
  console.log('Analyzing slow database queries...');
  
  // In real implementation, this would query database logs
  return {
    slowQueries: this.slowQueries,
    recommendations: [
      'Add database indexes',
      'Optimize query structure',
      'Increase connection pool size'
    ]
  };
}

// Compare query performance
async compareQueryPerformance() {
  console.log('Comparing query performance between environments...');
  
  // In real implementation, this would run the same queries on both environments
  return {
    staging: {
      avgQueryTime: '10ms',
      slowQueries: 0
    },
    production: {
      avgQueryTime: '100ms',
      slowQueries: 5
    }
  };
}
}

// 8. ROLLBACK AND RECOVERY STRATEGIES

// Rollback strategy
class RollbackStrategy {
constructor() {
  this.rollbackSteps = [];
}

// Immediate rollback if critical
async immediateRollback() {
  console.log('Initiating immediate rollback...');
  
  const steps = [
    'Stop new deployments',
    'Revert to previous stable version',
    'Restart application services',
    'Verify system stability',
    'Monitor error rates'
  ];
  
  for (const step of steps) {
    console.log(\`- \${step}\`);
    // In real implementation, this would execute actual rollback steps
  }
  
  return { success: true, message: 'Rollback completed' };
}

// Gradual rollback with monitoring
async gradualRollback() {
  console.log('Initiating gradual rollback...');
  
  return {
    step1: 'Reduce traffic to new version',
    step2: 'Monitor error rates',
    step3: 'If stable, continue; if not, full rollback',
    step4: 'Verify all systems are working'
  };
}
}

// 9. PREVENTION STRATEGIES

// Prevention checklist
const preventionStrategies = {
'Before Deployment': [
  'Environment parity testing',
  'Load testing in staging',
  'Database migration testing',
  'Configuration validation',
  'Health check verification'
],
'During Deployment': [
  'Blue-green deployment',
  'Canary releases',
  'Gradual traffic shifting',
  'Real-time monitoring',
  'Rollback readiness'
],
'After Deployment': [
  'Post-deployment monitoring',
  'Performance comparison',
  'Error rate tracking',
  'User feedback collection',
  'Automated health checks'
]
};

// 10. DEBUGGING CHECKLIST

const debuggingChecklist = {
'Immediate Actions': [
  '✓ Assess impact and severity',
  '✓ Enable verbose logging',
  '✓ Check application logs',
  '✓ Monitor error rates',
  '✓ Consider rollback if critical'
],
'Environment Analysis': [
  '✓ Compare environment variables',
  '✓ Check system resources',
  '✓ Verify database connectivity',
  '✓ Test external dependencies',
  '✓ Compare with staging configuration'
],
'Code Analysis': [
  '✓ Review recent changes',
  '✓ Check for environment-specific code',
  '✓ Verify feature flags',
  '✓ Test database queries',
  '✓ Analyze performance metrics'
],
'Infrastructure Check': [
  '✓ Verify server resources',
  '✓ Check network connectivity',
  '✓ Monitor load balancer health',
  '✓ Verify SSL certificates',
  '✓ Check firewall rules'
],
'Data Analysis': [
  '✓ Compare data volumes',
  '✓ Check for data type differences',
  '✓ Verify database indexes',
  '✓ Analyze query performance',
  '✓ Check for data corruption'
]
};

// 11. COMMON PRODUCTION ISSUES AND SOLUTIONS

const commonIssues = {
'Memory Leaks': {
  symptoms: ['Gradual memory increase', 'Application slowdown', 'Out of memory errors'],
  solutions: ['Profile memory usage', 'Check for unclosed connections', 'Implement proper cleanup']
},
'Database Issues': {
  symptoms: ['Connection timeouts', 'Slow queries', 'Connection pool exhaustion'],
  solutions: ['Optimize queries', 'Increase connection pool', 'Add database indexes']
},
'Network Issues': {
  symptoms: ['Timeout errors', 'Connection refused', 'Slow response times'],
  solutions: ['Check firewall rules', 'Verify DNS resolution', 'Test network connectivity']
},
'Configuration Issues': {
  symptoms: ['Feature flags not working', 'Missing environment variables', 'Wrong API endpoints'],
  solutions: ['Verify environment variables', 'Check configuration files', 'Test external services']
},
'Load Issues': {
  symptoms: ['High CPU usage', 'Memory pressure', 'Slow response times'],
  solutions: ['Scale horizontally', 'Optimize code', 'Implement caching']
}
};

// 12. MONITORING AND ALERTING SETUP

class ProductionAlerting {
constructor() {
  this.alerts = [];
  this.thresholds = {
    errorRate: 5, // 5% error rate
    responseTime: 2000, // 2 seconds
    memoryUsage: 80, // 80% memory usage
    cpuUsage: 90 // 90% CPU usage
  };
}

// Set up monitoring alerts
setupAlerts() {
  console.log('Setting up production monitoring alerts...');
  
  const alertTypes = [
    'High error rate alert',
    'Slow response time alert',
    'High memory usage alert',
    'High CPU usage alert',
    'Database connection alert',
    'External service failure alert'
  ];
  
  return alertTypes;
}

// Check if alert should be triggered
shouldAlert(metric, value) {
  const threshold = this.thresholds[metric];
  return value > threshold;
}
}

// 13. POST-INCIDENT ANALYSIS

class PostIncidentAnalysis {
constructor() {
  this.incidentData = {};
}

// Conduct post-incident review
async conductReview() {
  console.log('Conducting post-incident analysis...');
  
  const reviewSteps = [
    'Gather all logs and metrics',
    'Timeline reconstruction',
    'Root cause analysis',
    'Impact assessment',
    'Prevention measures',
    'Documentation update'
  ];
  
  return reviewSteps;
}

// Update runbooks and documentation
updateDocumentation() {
  console.log('Updating documentation and runbooks...');
  
  return {
    'Updated Documents': [
      'Deployment checklist',
      'Rollback procedures',
      'Monitoring setup',
      'Troubleshooting guide',
      'Environment comparison tool'
    ]
  };
}
}`,
  testCases: [
    { 
      input: `const logger = new ProductionLogger();
logger.log('error', 'Database connection failed', { 
dbHost: 'prod-db.example.com',
errorCode: 'ECONNREFUSED' 
});`, 
      output: `// Structured error logging for production debugging` 
    },
    {
      input: `const monitor = new ProductionMonitor();
monitor.trackRequest(150, true);
const metrics = monitor.getMetrics();
console.log('Error rate:', metrics.errorRate);`,
      output: `Error rate: 0.00%`
    },
    {
      input: `const debugger = new GradualDebugger();
debugger.verifyEnvironmentVariables();`,
      output: `All required environment variables are set`
    }
  ],
  explanation: `**When code works in staging/UAT but fails in production**, it's a common and challenging scenario that requires a systematic debugging approach. Here's a comprehensive strategy:

**Immediate Response Strategy:**

1. **Assess Impact**: Determine severity and user impact
2. **Rollback Decision**: Consider immediate rollback if critical
3. **Enable Debugging**: Turn on verbose logging and monitoring
4. **Team Alert**: Notify relevant team members
5. **Monitor Metrics**: Watch error rates and performance indicators

**Systematic Debugging Approach:**

**Step 1: Environment Differences Analysis**
- **Infrastructure**: CPU, memory, network, storage differences
- **Configuration**: Environment variables, database connections, external services
- **Data**: Database size, data types, user load, data volume
- **Dependencies**: Node.js version, package versions, system libraries

**Step 2: Enhanced Logging and Monitoring**
- **Structured Logging**: Include request IDs, timestamps, context
- **Error Tracking**: Capture stack traces, error codes, user context
- **Performance Metrics**: Response times, memory usage, CPU utilization
- **Real-time Monitoring**: Set up alerts for critical thresholds

**Step 3: Gradual Debugging Process**
1. **Check Application Logs**: Look for error messages and stack traces
2. **Verify Environment Variables**: Ensure all required variables are set
3. **Check Database Connectivity**: Test connections and query performance
4. **Monitor Resource Usage**: Check CPU, memory, and disk usage
5. **Test External Dependencies**: Verify third-party service connections
6. **Compare with Staging**: Systematic environment comparison

**Common Production-Specific Issues:**

**1. Memory Leaks:**
- **Symptoms**: Gradual memory increase, application slowdown
- **Solutions**: Profile memory usage, check for unclosed connections

**2. Database Issues:**
- **Symptoms**: Connection timeouts, slow queries, pool exhaustion
- **Solutions**: Optimize queries, increase connection pool, add indexes

**3. Network Issues:**
- **Symptoms**: Timeout errors, connection refused, slow responses
- **Solutions**: Check firewall rules, verify DNS, test connectivity

**4. Configuration Issues:**
- **Symptoms**: Feature flags not working, missing env vars
- **Solutions**: Verify environment variables, check configurations

**5. Load Issues:**
- **Symptoms**: High CPU usage, memory pressure, slow responses
- **Solutions**: Scale horizontally, optimize code, implement caching

**Debugging Tools and Techniques:**

**1. Enhanced Logging:**
- Structured logging with context and request IDs
- Error logging with stack traces and error codes
- Performance logging with timing information

**2. Monitoring and Metrics:**
- Real-time performance monitoring
- Error rate tracking and alerting
- Resource usage monitoring
- Custom metrics for business logic

**3. Environment Comparison:**
- Systematic comparison of configurations
- Database connection and query analysis
- External dependency testing
- Load testing comparison

**Rollback and Recovery Strategies:**

**1. Immediate Rollback:**
- Stop new deployments
- Revert to previous stable version
- Restart application services
- Verify system stability

**2. Gradual Rollback:**
- Reduce traffic to new version
- Monitor error rates
- Full rollback if needed
- Verify all systems working

**Prevention Strategies:**

**Before Deployment:**
- Environment parity testing
- Load testing in staging
- Database migration testing
- Configuration validation

**During Deployment:**
- Blue-green deployment
- Canary releases
- Gradual traffic shifting
- Real-time monitoring

**After Deployment:**
- Post-deployment monitoring
- Performance comparison
- Error rate tracking
- Automated health checks

**Key Success Factors:**

1. **Systematic Approach**: Follow a structured debugging process
2. **Environment Parity**: Ensure staging matches production
3. **Comprehensive Monitoring**: Set up proper logging and alerting
4. **Quick Rollback**: Have rollback procedures ready
5. **Team Communication**: Keep stakeholders informed
6. **Documentation**: Update runbooks and procedures
7. **Post-Incident Analysis**: Learn from each incident

**Why This Approach Works:**

- **Reduces Downtime**: Quick identification and resolution
- **Prevents Recurrence**: Systematic analysis prevents future issues
- **Improves Reliability**: Better monitoring and alerting
- **Enhances Team Skills**: Systematic debugging improves team capabilities
- **Builds Confidence**: Structured approach reduces stress and uncertainty

This systematic approach ensures that production issues are resolved quickly and efficiently while building a more robust and reliable system.`
},
{
  id: 'nodejs-9',
  title: 'What is Middleware and How Middleware Works',
  description: 'Understanding middleware in Node.js, its purpose, how it works in the request-response cycle, different types of middleware, and best practices for implementing custom middleware.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// What is Middleware and How Middleware Works

// 1. WHAT IS MIDDLEWARE?

// Middleware is software that acts as a bridge between different applications or components
// In Node.js/Express, middleware functions have access to request (req), response (res), and next() function
// They can execute code, modify request/response objects, end the request-response cycle, or call the next middleware

// 2. MIDDLEWARE CONCEPTS

// Basic middleware structure
function basicMiddleware(req, res, next) {
// Execute any code
console.log('Middleware executing...');

// Modify request/response objects
req.timestamp = new Date();

// Call next() to pass control to the next middleware
next();
}

// 3. HOW MIDDLEWARE WORKS - THE REQUEST-RESPONSE CYCLE

// Express application with middleware chain
const express = require('express');
const app = express();

// Middleware 1: Logging middleware
app.use((req, res, next) => {
console.log(new Date().toISOString() + ' - ' + req.method + ' ' + req.url);
next(); // Pass control to next middleware
});

// Middleware 2: Authentication middleware
app.use((req, res, next) => {
const token = req.headers.authorization;

if (!token) {
  return res.status(401).json({ error: 'No token provided' });
}

// Verify token logic here...
req.user = { id: 1, name: 'John' }; // Add user to request
next(); // Pass control to next middleware
});

// Middleware 3: Request processing
app.use((req, res, next) => {
req.processed = true;
next();
});

// Route handler (final middleware)
app.get('/api/data', (req, res) => {
res.json({ 
  message: 'Data retrieved',
  user: req.user,
  timestamp: req.timestamp,
  processed: req.processed
});
});

// 4. TYPES OF MIDDLEWARE

// 4.1 Application-level middleware
// Applied to all routes
app.use((req, res, next) => {
console.log('Application-level middleware');
next();
});

// 4.2 Router-level middleware
// Applied to specific routes
const router = express.Router();

router.use((req, res, next) => {
console.log('Router-level middleware');
next();
});

// 4.3 Error-handling middleware
// Must have 4 parameters (err, req, res, next)
app.use((err, req, res, next) => {
console.error('Error:', err.message);
res.status(500).json({ error: 'Internal server error' });
});

// 4.4 Built-in middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static('public')); // Serve static files

// 4.5 Third-party middleware
const cors = require('cors');
const helmet = require('helmet');

app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers

// 5. CUSTOM MIDDLEWARE EXAMPLES

// 5.1 Request timing middleware
function requestTimer(req, res, next) {
req.startTime = Date.now();

res.on('finish', () => {
  const duration = Date.now() - req.startTime;
  console.log(\`\${req.method} \${req.url} - \${duration}ms\`);
});

next();
}

// 5.2 Request ID middleware
function requestId(req, res, next) {
req.id = req.headers['x-request-id'] || generateId();
res.setHeader('x-request-id', req.id);
next();
}

function generateId() {
return Math.random().toString(36).substr(2, 9);
}

// 5.3 Rate limiting middleware
class RateLimiter {
constructor(limit, windowMs) {
  this.limit = limit;
  this.windowMs = windowMs;
  this.requests = new Map();
}

middleware(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  
  if (!this.requests.has(ip)) {
    this.requests.set(ip, []);
  }
  
  const userRequests = this.requests.get(ip);
  
  // Remove old requests outside the window
  const validRequests = userRequests.filter(time => now - time < this.windowMs);
  
  if (validRequests.length >= this.limit) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  validRequests.push(now);
  this.requests.set(ip, validRequests);
  
  next();
}
}

const rateLimiter = new RateLimiter(100, 60000); // 100 requests per minute

// 5.4 Authentication middleware
function authenticate(req, res, next) {
const token = req.headers.authorization?.replace('Bearer ', '');

if (!token) {
  return res.status(401).json({ error: 'Authentication required' });
}

try {
  // Verify JWT token (simplified)
  const decoded = verifyToken(token);
  req.user = decoded;
  next();
} catch (error) {
  return res.status(401).json({ error: 'Invalid token' });
}
}

function verifyToken(token) {
// Simplified token verification
return { id: 1, name: 'User', role: 'admin' };
}

// 5.5 Validation middleware
function validateUser(req, res, next) {
const { name, email, age } = req.body;

const errors = [];

if (!name || name.length < 2) {
  errors.push('Name must be at least 2 characters');
}

if (!email || !email.includes('@')) {
  errors.push('Valid email is required');
}

if (!age || age < 18) {
  errors.push('Age must be 18 or older');
}

if (errors.length > 0) {
  return res.status(400).json({ errors });
}

next();
}

// 5.6 Caching middleware
class CacheMiddleware {
constructor() {
  this.cache = new Map();
}

middleware(ttl = 300000) { // 5 minutes default
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return res.json(cached.data);
    }
    
    // Store original send method
    const originalSend = res.json;
    
    // Override send method to cache response
    res.json = function(data) {
      this.cache.set(key, {
        data: data,
        timestamp: Date.now()
      });
      
      originalSend.call(this, data);
    }.bind(this);
    
    next();
  };
}
}

const cacheMiddleware = new CacheMiddleware();

// 6. MIDDLEWARE EXECUTION ORDER

// Middleware execution order example
app.use((req, res, next) => {
console.log('1. First middleware');
next();
});

app.use((req, res, next) => {
console.log('2. Second middleware');
next();
});

app.use('/api', (req, res, next) => {
console.log('3. API-specific middleware');
next();
});

app.get('/api/users', (req, res, next) => {
console.log('4. Route-specific middleware');
next();
}, (req, res) => {
console.log('5. Route handler');
res.json({ users: [] });
});

// 7. CONDITIONAL MIDDLEWARE

// Middleware that runs conditionally
function conditionalMiddleware(condition) {
return (req, res, next) => {
  if (condition(req)) {
    // Execute middleware logic
    console.log('Conditional middleware executed');
  }
  next();
};
}

// Usage examples
app.use(conditionalMiddleware(req => req.method === 'POST'));
app.use(conditionalMiddleware(req => req.path.startsWith('/admin')));

// 8. ASYNC MIDDLEWARE

// Async middleware with proper error handling
async function asyncMiddleware(req, res, next) {
try {
  // Async operation
  const data = await fetchDataFromDatabase();
  req.data = data;
  next();
} catch (error) {
  next(error); // Pass error to error handling middleware
}
}

async function fetchDataFromDatabase() {
// Simulate async database operation
return new Promise(resolve => {
  setTimeout(() => resolve({ id: 1, name: 'Test' }), 100);
});
}

// 9. MIDDLEWARE FACTORY

// Factory function to create middleware with configuration
function createLoggerMiddleware(options = {}) {
const { level = 'info', format = 'simple' } = options;

return (req, res, next) => {
  const logData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.headers['user-agent']
  };
  
       if (format === 'json') {
     console.log(JSON.stringify(logData));
   } else {
     console.log('[' + logData.timestamp + '] ' + logData.method + ' ' + logData.url);
   }
  
  next();
};
}

// Usage
const simpleLogger = createLoggerMiddleware();
const jsonLogger = createLoggerMiddleware({ format: 'json' });

// 10. MIDDLEWARE COMPOSITION

// Compose multiple middleware functions
function compose(...middlewares) {
return (req, res, next) => {
  let index = 0;
  
  function executeNext() {
    if (index >= middlewares.length) {
      return next();
    }
    
    const middleware = middlewares[index++];
    middleware(req, res, executeNext);
  }
  
  executeNext();
};
}

// Usage
const composedMiddleware = compose(
requestTimer,
requestId,
authenticate
);

app.use('/api/protected', composedMiddleware);

// 11. MIDDLEWARE ERROR HANDLING

// Error handling middleware
function errorHandler(err, req, res, next) {
console.error('Error:', err);

// Log error details
console.error('Stack:', err.stack);
console.error('URL:', req.url);
console.error('Method:', req.method);

// Send appropriate error response
if (err.name === 'ValidationError') {
  return res.status(400).json({ error: err.message });
}

if (err.name === 'UnauthorizedError') {
  return res.status(401).json({ error: 'Unauthorized' });
}

// Default error
res.status(500).json({ error: 'Internal server error' });
}

// 12. MIDDLEWARE TESTING

// Testing middleware
function testMiddleware(middleware) {
return (req, res, next) => {
  const originalSend = res.send;
  const originalJson = res.json;
  
  // Track if response was sent
  let responseSent = false;
  
  res.send = function(data) {
    responseSent = true;
    originalSend.call(this, data);
  };
  
  res.json = function(data) {
    responseSent = true;
    originalJson.call(this, data);
  };
  
  // Execute middleware
  middleware(req, res, (error) => {
    if (error && !responseSent) {
      console.error('Middleware error:', error);
    }
    next();
  });
};
}

// 13. MIDDLEWARE BEST PRACTICES

const middlewareBestPractices = {
'Order Matters': [
  'Place security middleware first',
  'Put logging middleware early',
  'Handle errors last',
  'Consider middleware execution order'
],
'Error Handling': [
  'Always handle errors in async middleware',
  'Use next(error) to pass errors',
  'Implement proper error handling middleware',
  'Log errors appropriately'
],
'Performance': [
  'Keep middleware lightweight',
  'Use caching where appropriate',
  'Avoid blocking operations',
  'Profile middleware performance'
],
'Security': [
  'Validate input in middleware',
  'Sanitize data',
  'Implement rate limiting',
  'Use security headers'
],
'Maintainability': [
  'Keep middleware focused and single-purpose',
  'Use middleware factories for configuration',
  'Document middleware behavior',
  'Test middleware thoroughly'
]
};

// 14. COMPLETE MIDDLEWARE EXAMPLE

// Complete Express application with various middleware
const completeApp = express();

// Security middleware
completeApp.use(helmet());
completeApp.use(cors());

// Logging middleware
completeApp.use(requestTimer);
completeApp.use(requestId);

// Body parsing middleware
completeApp.use(express.json());
completeApp.use(express.urlencoded({ extended: true }));

// Rate limiting
completeApp.use(rateLimiter.middleware.bind(rateLimiter));

// Authentication for protected routes
completeApp.use('/api/protected', authenticate);

// Validation middleware for specific routes
completeApp.post('/api/users', validateUser);

// Caching for GET requests
completeApp.use('/api/data', cacheMiddleware.middleware());

// Error handling (must be last)
completeApp.use(errorHandler);

// 15. MIDDLEWARE PATTERNS

const middlewarePatterns = {
'Chain of Responsibility': 'Middleware chain processes requests sequentially',
'Decorator Pattern': 'Add functionality without modifying existing code',
'Pipeline Pattern': 'Data flows through multiple processing stages',
'Interceptor Pattern': 'Intercept and modify requests/responses',
'Filter Pattern': 'Filter requests based on conditions'
};

// 16. MIDDLEWARE MONITORING

class MiddlewareMonitor {
constructor() {
  this.metrics = new Map();
}

// Monitor middleware performance
monitor(middlewareName) {
  return (req, res, next) => {
    const startTime = Date.now();
    
    // Store original end method
    const originalEnd = res.end;
    
    res.end = function() {
      const duration = Date.now() - startTime;
      
      if (!this.metrics.has(middlewareName)) {
        this.metrics.set(middlewareName, []);
      }
      
      this.metrics.get(middlewareName).push(duration);
      
      originalEnd.apply(this, arguments);
    }.bind(this);
    
    next();
  };
}

// Get middleware performance stats
getStats() {
  const stats = {};
  
  for (const [name, durations] of this.metrics) {
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    stats[name] = {
      count: durations.length,
      avgDuration: avg.toFixed(2) + 'ms',
      minDuration: Math.min(...durations) + 'ms',
      maxDuration: Math.max(...durations) + 'ms'
    };
  }
  
  return stats;
}
}

const monitor = new MiddlewareMonitor();

// Usage
app.use('/api', monitor.monitor('api-middleware'));`,
  testCases: [
    { 
      input: `function basicMiddleware(req, res, next) {
req.timestamp = new Date();
next();
}`, 
      output: `// Basic middleware function` 
    },
    {
      input: `app.use((req, res, next) => {
console.log(req.method, req.url);
next();
});`,
      output: `// Application-level middleware`
    },
    {
      input: `app.use((err, req, res, next) => {
console.error(err.message);
res.status(500).json({ error: 'Server error' });
});`,
      output: `// Error handling middleware`
    }
  ],
  explanation: `**Middleware in Node.js** is software that acts as a bridge between different applications or components, processing requests and responses in a chain-like manner.

**What is Middleware?**

Middleware functions in Node.js/Express:
- **Have access** to request (req), response (res), and next() function
- **Can execute code** during the request-response cycle
- **Can modify** request and response objects
- **Can end** the request-response cycle
- **Can call** the next middleware in the stack

**How Middleware Works:**

**1. Request-Response Cycle:**
1. **Request arrives** at the server
2. **Middleware chain executes** in order
3. **Each middleware** can process the request
4. **Route handler** processes the final request
5. **Response sent** back to client

**2. Middleware Flow:**
\`\`\`
Request → Middleware 1 → Middleware 2 → ... → Route Handler → Response
\`\`\`

**3. The next() Function:**
- **Passes control** to the next middleware
- **If not called**, request hangs
- **Can pass errors** to error handling middleware

**Types of Middleware:**

**1. Application-level Middleware:**
- Applied to **all routes** in the application
- Example: Logging, authentication, CORS

**2. Router-level Middleware:**
- Applied to **specific routes** or route groups
- Example: API-specific middleware

**3. Error-handling Middleware:**
- Must have **4 parameters** (err, req, res, next)
- Handles errors from other middleware
- Should be placed **last** in the middleware stack

**4. Built-in Middleware:**
- **express.json()**: Parse JSON request bodies
- **express.urlencoded()**: Parse URL-encoded bodies
- **express.static()**: Serve static files

**5. Third-party Middleware:**
- **cors**: Enable Cross-Origin Resource Sharing
- **helmet**: Security headers
- **morgan**: HTTP request logging

**Custom Middleware Examples:**

**1. Request Timing:**
- Track request duration
- Log performance metrics
- Monitor response times

**2. Authentication:**
- Verify user tokens
- Add user data to request
- Protect routes

**3. Validation:**
- Validate request data
- Check required fields
- Sanitize input

**4. Rate Limiting:**
- Limit requests per IP
- Prevent abuse
- Protect resources

**5. Caching:**
- Cache responses
- Improve performance
- Reduce server load

**Middleware Execution Order:**

**Important**: Middleware executes in the order it's defined:
1. **Security middleware** (helmet, cors)
2. **Logging middleware** (request timing, logging)
3. **Body parsing middleware** (express.json, express.urlencoded)
4. **Authentication middleware** (verify tokens)
5. **Route-specific middleware** (validation, caching)
6. **Route handlers**
7. **Error handling middleware** (last)

**Best Practices:**

**1. Order Matters:**
- Place security middleware first
- Put logging middleware early
- Handle errors last
- Consider execution order carefully

**2. Error Handling:**
- Always handle errors in async middleware
- Use next(error) to pass errors
- Implement proper error handling middleware
- Log errors appropriately

**3. Performance:**
- Keep middleware lightweight
- Use caching where appropriate
- Avoid blocking operations
- Profile middleware performance

**4. Security:**
- Validate input in middleware
- Sanitize data
- Implement rate limiting
- Use security headers

**5. Maintainability:**
- Keep middleware focused and single-purpose
- Use middleware factories for configuration
- Document middleware behavior
- Test middleware thoroughly

**Common Middleware Patterns:**

**1. Chain of Responsibility:**
- Middleware chain processes requests sequentially
- Each middleware can handle or pass the request

**2. Decorator Pattern:**
- Add functionality without modifying existing code
- Wrap existing functionality with new behavior

**3. Pipeline Pattern:**
- Data flows through multiple processing stages
- Each stage transforms the data

**4. Interceptor Pattern:**
- Intercept and modify requests/responses
- Add cross-cutting concerns

**Why Middleware is Important:**

1. **Modularity**: Break down complex logic into reusable pieces
2. **Separation of Concerns**: Each middleware has a specific responsibility
3. **Reusability**: Middleware can be shared across different routes
4. **Maintainability**: Easy to add, remove, or modify functionality
5. **Testing**: Individual middleware can be tested in isolation
6. **Flexibility**: Can be applied conditionally or globally

**Real-world Applications:**

- **Authentication**: Verify user credentials
- **Logging**: Track requests and responses
- **Caching**: Improve performance
- **Validation**: Ensure data integrity
- **Rate Limiting**: Prevent abuse
- **CORS**: Handle cross-origin requests
- **Compression**: Reduce response size
- **Security**: Add security headers

Middleware is a fundamental concept in Node.js that enables building modular, maintainable, and scalable applications by providing a clean way to handle cross-cutting concerns and request processing logic.`
},
{
  id: 'nodejs-10',
  title: 'Advantages of Express.js over Node.js',
  description: 'Understanding the key advantages and benefits that Express.js provides as a web framework built on top of Node.js, and how it simplifies web application development.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// Express.js vs Node.js - Key Advantages

// 1. ROUTING SIMPLIFICATION
// Node.js (Vanilla) - Complex routing
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
const parsedUrl = url.parse(req.url, true);
const path = parsedUrl.pathname;

if (path === '/users' && req.method === 'GET') {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ users: [] }));
} else if (path === '/users' && req.method === 'POST') {
  // Handle POST logic
} else if (path.startsWith('/users/')) {
  const userId = path.split('/')[2];
  // Handle specific user logic
} else {
  res.writeHead(404);
  res.end('Not Found');
}
});

// Express.js - Simple routing
const express = require('express');
const app = express();

app.get('/users', (req, res) => {
res.json({ users: [] });
});

app.post('/users', (req, res) => {
// Handle POST logic
});

app.get('/users/:id', (req, res) => {
const userId = req.params.id;
// Handle specific user logic
});

// 2. MIDDLEWARE SUPPORT
// Node.js (Vanilla) - Manual middleware implementation
const server2 = http.createServer((req, res) => {
// Manual authentication check
const token = req.headers.authorization;
if (!token) {
  res.writeHead(401);
  res.end('Unauthorized');
  return;
}

// Manual body parsing
let body = '';
req.on('data', chunk => {
  body += chunk.toString();
});

req.on('end', () => {
  try {
    const data = JSON.parse(body);
    // Process data
  } catch (error) {
    res.writeHead(400);
    res.end('Invalid JSON');
  }
});
});

// Express.js - Built-in middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Custom middleware
app.use((req, res, next) => {
const token = req.headers.authorization;
if (!token) {
  return res.status(401).json({ error: 'Unauthorized' });
}
next();
});

// 3. ERROR HANDLING
// Node.js (Vanilla) - Manual error handling
const server3 = http.createServer((req, res) => {
try {
  // Route logic
} catch (error) {
  res.writeHead(500);
  res.end('Internal Server Error');
}
});

// Express.js - Centralized error handling
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ error: 'Something went wrong!' });
});

// 4. TEMPLATE ENGINE SUPPORT
// Express.js - Built-in template support
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/dashboard', (req, res) => {
res.render('dashboard', { user: req.user });
});

// 5. STATIC FILE SERVING
// Express.js - Simple static file serving
app.use(express.static('public'));

// 6. REQUEST VALIDATION
// Express.js - Easy parameter extraction
app.get('/users/:id/posts/:postId', (req, res) => {
const { id, postId } = req.params;
const { page, limit } = req.query;

console.log('User ID:', id);
console.log('Post ID:', postId);
console.log('Page:', page);
console.log('Limit:', limit);
});

// 7. RESPONSE HELPERS
// Express.js - Convenient response methods
app.get('/api/data', (req, res) => {
// JSON response
res.json({ success: true, data: [] });

// Status codes
res.status(201).json({ message: 'Created' });

// Redirect
res.redirect('/dashboard');

// Send file
res.sendFile('/path/to/file.pdf');
});

// 8. ROUTE ORGANIZATION
// Express.js - Modular routing
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// 9. CORS HANDLING
// Express.js - Easy CORS setup
const cors = require('cors');

app.use(cors({
origin: 'http://localhost:3000',
credentials: true
}));

// 10. REQUEST LOGGING
// Express.js - Built-in logging
const morgan = require('morgan');

app.use(morgan('combined')); // Log all requests

// 11. SECURITY MIDDLEWARE
// Express.js - Security headers
const helmet = require('helmet');

app.use(helmet()); // Add security headers

// 12. RATE LIMITING
// Express.js - Rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes
max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// 13. FILE UPLOAD HANDLING
// Express.js - File uploads
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
res.json({ filename: req.file.filename });
});

// 14. SESSION MANAGEMENT
// Express.js - Session handling
const session = require('express-session');

app.use(session({
secret: 'your-secret-key',
resave: false,
saveUninitialized: false
}));

// 15. COMPRESSION
// Express.js - Response compression
const compression = require('compression');

app.use(compression()); // Compress all responses

// 16. DEVELOPMENT TOOLS
// Express.js - Development utilities
if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev')); // Colored logging
}

// 17. API DOCUMENTATION
// Express.js - Auto-generated API docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 18. TESTING SUPPORT
// Express.js - Easy testing
const request = require('supertest');

describe('User API', () => {
it('should get users', async () => {
  const response = await request(app)
    .get('/api/users')
    .expect(200);
  
  expect(response.body).toHaveProperty('users');
});
});

// 19. PRODUCTION READY FEATURES
// Express.js - Production optimizations
app.set('trust proxy', 1); // Trust first proxy
app.set('view cache', true); // Enable view caching

// 20. EXTENSIBILITY
// Express.js - Plugin ecosystem
app.use(require('express-ws')(app)); // WebSocket support
app.use(require('socket.io')(server)); // Real-time features`,
  testCases: [
    { 
      input: `// Express.js routing
app.get('/users', (req, res) => {
res.json({ users: [] });
});`, 
      output: `// Simple and clean routing` 
    },
    {
      input: `// Express.js middleware
app.use(express.json());
app.use((req, res, next) => {
console.log(req.method, req.url);
next();
});`,
      output: `// Easy middleware implementation`
    },
    {
      input: `// Express.js error handling
app.use((err, req, res, next) => {
res.status(500).json({ error: err.message });
});`,
      output: `// Centralized error handling`
    }
  ],
  explanation: `**Express.js** is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Here are the key advantages of Express.js over vanilla Node.js:

**1. Simplified Routing**
- **Express.js**: Clean, declarative routing with HTTP method support
- **Node.js**: Manual URL parsing and method checking required
- **Benefit**: Faster development, cleaner code, better maintainability

**2. Built-in Middleware Support**
- **Express.js**: Extensive middleware ecosystem and easy integration
- **Node.js**: Manual implementation of cross-cutting concerns
- **Benefit**: Reusable components, faster development, better architecture

**3. Request/Response Enhancement**
- **Express.js**: Enhanced req/res objects with convenient methods
- **Node.js**: Basic HTTP request/response objects
- **Benefit**: Easier data access, better developer experience

**4. Template Engine Integration**
- **Express.js**: Built-in support for multiple template engines
- **Node.js**: Manual template rendering and file serving
- **Benefit**: Easy server-side rendering, better separation of concerns

**5. Static File Serving**
- **Express.js**: One-line static file serving
- **Node.js**: Manual file system operations and MIME type handling
- **Benefit**: Faster development, better performance

**6. Error Handling**
- **Express.js**: Centralized error handling with middleware
- **Node.js**: Manual try-catch blocks throughout the application
- **Benefit**: Consistent error handling, better debugging

**7. Security Features**
- **Express.js**: Built-in security middleware and best practices
- **Node.js**: Manual security implementation required
- **Benefit**: Better security out of the box, reduced vulnerabilities

**8. Development Tools**
- **Express.js**: Rich ecosystem of development and debugging tools
- **Node.js**: Limited built-in development support
- **Benefit**: Faster debugging, better development experience

**9. Community and Ecosystem**
- **Express.js**: Large community, extensive documentation, many plugins
- **Node.js**: Core functionality only, limited web-specific features
- **Benefit**: More resources, faster problem-solving, better support

**10. Production Readiness**
- **Express.js**: Built-in production optimizations and best practices
- **Node.js**: Manual optimization and configuration required
- **Benefit**: Better performance, easier deployment

**11. Code Organization**
- **Express.js**: Clear separation of routes, middleware, and handlers
- **Node.js**: Monolithic server code with mixed concerns
- **Benefit**: Better maintainability, easier testing, cleaner architecture

**12. API Development**
- **Express.js**: Optimized for RESTful API development
- **Node.js**: Manual API structure and response handling
- **Benefit**: Faster API development, better API design

**13. Testing Support**
- **Express.js**: Excellent testing utilities and frameworks
- **Node.js**: Manual test setup and HTTP client simulation
- **Benefit**: Easier testing, better test coverage

**14. Performance Optimizations**
- **Express.js**: Built-in performance features and optimizations
- **Node.js**: Manual performance tuning required
- **Benefit**: Better performance out of the box

**15. Extensibility**
- **Express.js**: Plugin architecture and middleware system
- **Node.js**: Manual extension and integration
- **Benefit**: Easy feature addition, better modularity

**When to Use Express.js vs Node.js:**

**Use Express.js when:**
- Building web applications or APIs
- Need rapid development
- Want built-in web features
- Working with teams
- Need extensive middleware
- Building production applications

**Use Node.js when:**
- Building non-web applications
- Need complete control over HTTP handling
- Building custom protocols
- Performance is critical
- Minimal dependencies required
- Learning Node.js fundamentals

**Real-world Impact:**

1. **Development Speed**: Express.js can reduce development time by 50-70%
2. **Code Quality**: Cleaner, more maintainable code structure
3. **Team Productivity**: Easier onboarding and collaboration
4. **Maintenance**: Easier to maintain and update applications
5. **Scalability**: Better architecture for scaling applications
6. **Security**: Built-in security features reduce vulnerabilities
7. **Testing**: Easier to write and maintain tests
8. **Documentation**: Better API documentation and examples

**Best Practices with Express.js:**

1. **Use middleware appropriately**: Don't over-engineer simple applications
2. **Organize routes**: Use modular routing for large applications
3. **Handle errors properly**: Implement comprehensive error handling
4. **Use security middleware**: Always include security headers
5. **Optimize for production**: Use compression, caching, and other optimizations
6. **Test thoroughly**: Write tests for all routes and middleware
7. **Document APIs**: Use tools like Swagger for API documentation
8. **Monitor performance**: Use logging and monitoring tools

Express.js transforms Node.js from a low-level HTTP server into a powerful web application framework, making it the preferred choice for most web development projects while still maintaining the performance and flexibility of Node.js.`
},
{
  id: 'nodejs-11',
  title: 'How to Implement Error Handling in Node.js',
  description: 'Understanding different error handling patterns and implementation strategies in Node.js applications, including try-catch, promises, async/await, and middleware approaches.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// Error Handling Implementation in Node.js

// 1. BASIC TRY-CATCH ERROR HANDLING
function divideNumbers(a, b) {
try {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
} catch (error) {
  console.error('Error in division:', error.message);
  throw error; // Re-throw to let caller handle
}
}

// Usage
try {
const result = divideNumbers(10, 0);
console.log('Result:', result);
} catch (error) {
console.error('Caught error:', error.message);
}

// 2. ASYNC/AWAIT ERROR HANDLING
async function fetchUserData(userId) {
try {
  const response = await fetch(\`https://api.example.com/users/\${userId}\`);
  
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  
  const userData = await response.json();
  return userData;
} catch (error) {
  console.error('Failed to fetch user data:', error.message);
  throw new Error('User data fetch failed');
}
}

// Usage with async/await
async function getUserProfile(userId) {
try {
  const userData = await fetchUserData(userId);
  console.log('User data:', userData);
  return userData;
} catch (error) {
  console.error('Error getting user profile:', error.message);
  return null;
}
}

// 3. PROMISE-BASED ERROR HANDLING
function readFileAsync(filename) {
return new Promise((resolve, reject) => {
  const fs = require('fs');
  
  fs.readFile(filename, 'utf8', (error, data) => {
    if (error) {
      reject(new Error(\`Failed to read file: \${error.message}\`));
    } else {
      resolve(data);
    }
  });
});
}

// Usage with .then() and .catch()
readFileAsync('config.json')
.then(data => {
  console.log('File content:', data);
})
.catch(error => {
  console.error('File read error:', error.message);
});

// 4. EXPRESS.JS ERROR HANDLING MIDDLEWARE
const express = require('express');
const app = express();

// Custom error class
class AppError extends Error {
constructor(message, statusCode) {
  super(message);
  this.statusCode = statusCode;
  this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
  this.isOperational = true;

  Error.captureStackTrace(this, this.constructor);
}
}

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
err.statusCode = err.statusCode || 500;
err.status = err.status || 'error';

if (process.env.NODE_ENV === 'development') {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
} else {
  // Production error response
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // Programming or unknown errors
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
}
});

// 5. ROUTE-LEVEL ERROR HANDLING
app.get('/users/:id', async (req, res, next) => {
try {
  const userId = req.params.id;
  
  if (!userId || isNaN(userId)) {
    throw new AppError('Invalid user ID', 400);
  }
  
  const user = await getUserById(userId);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  res.json({
    status: 'success',
    data: { user }
  });
} catch (error) {
  next(error); // Pass to error handling middleware
}
});

// 6. GLOBAL ERROR HANDLERS
// Unhandled promise rejections
process.on('unhandledRejection', (err) => {
console.log('UNHANDLED REJECTION! 💥 Shutting down...');
console.log(err.name, err.message);
process.exit(1);
});

// Uncaught exceptions
process.on('uncaughtException', (err) => {
console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
console.log(err.name, err.message);
process.exit(1);
});

// 7. DATABASE ERROR HANDLING
async function createUser(userData) {
try {
  const { name, email, password } = userData;
  
  // Validation
  if (!name || !email || !password) {
    throw new AppError('Missing required fields', 400);
  }
  
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists', 409);
  }
  
  // Create user
  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 12)
  });
  
  return user;
} catch (error) {
  if (error.code === 11000) {
    // MongoDB duplicate key error
    throw new AppError('Email already exists', 409);
  }
  throw error;
}
}

// 8. FILE SYSTEM ERROR HANDLING
const fs = require('fs').promises;

async function processFile(filename) {
try {
  const content = await fs.readFile(filename, 'utf8');
  const processed = content.toUpperCase();
  await fs.writeFile(\`\${filename}.processed\`, processed);
  return 'File processed successfully';
} catch (error) {
  if (error.code === 'ENOENT') {
    throw new AppError('File not found', 404);
  } else if (error.code === 'EACCES') {
    throw new AppError('Permission denied', 403);
  } else {
    throw new AppError('File processing failed', 500);
  }
}
}

// 9. NETWORK ERROR HANDLING
const axios = require('axios');

async function makeApiCall(url, options = {}) {
try {
  const response = await axios({
    url,
    method: options.method || 'GET',
    timeout: options.timeout || 5000,
    headers: options.headers || {},
    data: options.data
  });
  
  return response.data;
} catch (error) {
  if (error.code === 'ECONNREFUSED') {
    throw new AppError('Service unavailable', 503);
  } else if (error.code === 'ETIMEDOUT') {
    throw new AppError('Request timeout', 408);
  } else if (error.response) {
    // Server responded with error status
    throw new AppError(
      error.response.data.message || 'API request failed',
      error.response.status
    );
  } else {
    throw new AppError('Network error', 500);
  }
}
}

// 10. VALIDATION ERROR HANDLING
const Joi = require('joi');

const userSchema = Joi.object({
name: Joi.string().min(2).max(50).required(),
email: Joi.string().email().required(),
age: Joi.number().min(18).max(120).optional()
});

function validateUserData(userData) {
try {
  const { error, value } = userSchema.validate(userData);
  
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    throw new AppError(\`Validation error: \${errorMessage}\`, 400);
  }
  
  return value;
} catch (error) {
  throw error;
}
}

// 11. MIDDLEWARE ERROR HANDLING
function asyncHandler(fn) {
return (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
}

// Usage with asyncHandler
app.get('/products/:id', asyncHandler(async (req, res, next) => {
const product = await Product.findById(req.params.id);

if (!product) {
  throw new AppError('Product not found', 404);
}

res.json({
  status: 'success',
  data: { product }
});
}));

// 12. LOGGING ERROR HANDLING
const winston = require('winston');

const logger = winston.createLogger({
level: 'error',
format: winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
),
transports: [
  new winston.transports.File({ filename: 'error.log' }),
  new winston.transports.Console({
    format: winston.format.simple()
  })
]
});

function logError(error, req = null) {
const errorLog = {
  message: error.message,
  stack: error.stack,
  statusCode: error.statusCode,
  timestamp: new Date().toISOString(),
  url: req ? req.url : null,
  method: req ? req.method : null,
  ip: req ? req.ip : null
};

logger.error(errorLog);
}

// 13. RETRY MECHANISM WITH ERROR HANDLING
async function retryOperation(operation, maxRetries = 3, delay = 1000) {
for (let attempt = 1; attempt <= maxRetries; attempt++) {
  try {
    return await operation();
  } catch (error) {
    if (attempt === maxRetries) {
      throw error;
    }
    
    console.log(\`Attempt \${attempt} failed, retrying in \${delay}ms...\`);
    await new Promise(resolve => setTimeout(resolve, delay));
    delay *= 2; // Exponential backoff
  }
}
}

// Usage
const result = await retryOperation(async () => {
return await makeApiCall('https://api.example.com/data');
});

// 14. CIRCUIT BREAKER PATTERN
class CircuitBreaker {
constructor(failureThreshold = 5, resetTimeout = 60000) {
  this.failureThreshold = failureThreshold;
  this.resetTimeout = resetTimeout;
  this.failureCount = 0;
  this.lastFailureTime = null;
  this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
}

async execute(operation) {
  if (this.state === 'OPEN') {
    if (Date.now() - this.lastFailureTime > this.resetTimeout) {
      this.state = 'HALF_OPEN';
    } else {
      throw new Error('Circuit breaker is OPEN');
    }
  }

  try {
    const result = await operation();
    this.onSuccess();
    return result;
  } catch (error) {
    this.onFailure();
    throw error;
  }
}

onSuccess() {
  this.failureCount = 0;
  this.state = 'CLOSED';
}

onFailure() {
  this.failureCount++;
  this.lastFailureTime = Date.now();
  
  if (this.failureCount >= this.failureThreshold) {
    this.state = 'OPEN';
  }
}
}

// Usage
const breaker = new CircuitBreaker();
const result = await breaker.execute(() => makeApiCall('https://api.example.com/data'));

// 15. ERROR MONITORING AND ALERTING
class ErrorMonitor {
constructor() {
  this.errorCounts = new Map();
  this.alertThreshold = 10;
}

trackError(error, context = {}) {
  const errorKey = \`\${error.name}:\${error.message}\`;
  const count = this.errorCounts.get(errorKey) || 0;
  this.errorCounts.set(errorKey, count + 1);

  // Log error
  logError(error, context);

  // Check if alert should be sent
  if (count + 1 >= this.alertThreshold) {
    this.sendAlert(errorKey, count + 1, context);
  }
}

sendAlert(errorKey, count, context) {
  console.log(\`ALERT: Error "\${errorKey}" occurred \${count} times\`);
  // Send to monitoring service (e.g., Sentry, LogRocket)
}
}

const errorMonitor = new ErrorMonitor();

// Wrap error handling
function monitoredErrorHandler(error, req, res, next) {
errorMonitor.trackError(error, { req });
next(error);
}`,
  testCases: [
    { 
      input: `try {
const result = divideNumbers(10, 0);
} catch (error) {
console.error('Error:', error.message);
}`, 
      output: `Error: Division by zero is not allowed` 
    },
    {
      input: `async function handleUser(userId) {
try {
  const user = await fetchUserData(userId);
  return user;
} catch (error) {
  console.error('User fetch failed:', error.message);
  return null;
}
}`,
      output: `// Proper async error handling`
    },
    {
      input: `app.use((err, req, res, next) => {
res.status(err.statusCode || 500).json({
  status: 'error',
  message: err.message
});
});`,
      output: `// Express error handling middleware`
    }
  ],
  explanation: `**Error handling in Node.js** is crucial for building robust and reliable applications. Here are the key implementation patterns and strategies:

**1. Basic Try-Catch Error Handling**
- **Synchronous operations**: Use try-catch blocks for immediate error handling
- **Error propagation**: Re-throw errors when appropriate to let higher levels handle
- **Error logging**: Always log errors for debugging and monitoring

**2. Async/Await Error Handling**
- **Async functions**: Use try-catch with async/await for cleaner error handling
- **Promise rejection**: Handle promise rejections properly
- **Error boundaries**: Implement error boundaries for different async operations

**3. Promise-Based Error Handling**
- **.catch() method**: Handle promise rejections
- **Promise chaining**: Proper error propagation in promise chains
- **Error transformation**: Transform errors into meaningful messages

**4. Express.js Error Handling Middleware**
- **Error middleware**: Must be defined last in the middleware stack
- **Custom error classes**: Create specific error types for different scenarios
- **Environment-specific responses**: Different error responses for development vs production

**5. Route-Level Error Handling**
- **Try-catch in routes**: Handle errors within route handlers
- **Next(error)**: Pass errors to error handling middleware
- **Validation errors**: Handle input validation errors appropriately

**6. Global Error Handlers**
- **Unhandled rejections**: Catch unhandled promise rejections
- **Uncaught exceptions**: Handle uncaught exceptions
- **Graceful shutdown**: Implement proper shutdown procedures

**7. Database Error Handling**
- **Connection errors**: Handle database connection issues
- **Query errors**: Handle SQL/NoSQL query errors
- **Validation errors**: Handle data validation failures
- **Duplicate key errors**: Handle unique constraint violations

**8. File System Error Handling**
- **File not found**: Handle missing files gracefully
- **Permission errors**: Handle access permission issues
- **I/O errors**: Handle file system operation failures

**9. Network Error Handling**
- **Connection errors**: Handle network connectivity issues
- **Timeout errors**: Handle request timeouts
- **HTTP errors**: Handle different HTTP status codes
- **Retry logic**: Implement retry mechanisms for transient failures

**10. Validation Error Handling**
- **Input validation**: Validate user input before processing
- **Schema validation**: Use libraries like Joi for structured validation
- **Custom validation**: Implement business logic validation

**11. Middleware Error Handling**
- **AsyncHandler**: Wrap async route handlers to catch errors
- **Error propagation**: Ensure errors reach error handling middleware
- **Context preservation**: Maintain request context in error handling

**12. Logging Error Handling**
- **Structured logging**: Use structured logging for better error tracking
- **Error context**: Include relevant context with error logs
- **Log levels**: Use appropriate log levels for different error types

**13. Retry Mechanisms**
- **Exponential backoff**: Implement exponential backoff for retries
- **Maximum retries**: Set reasonable limits for retry attempts
- **Retry conditions**: Only retry on appropriate error types

**14. Circuit Breaker Pattern**
- **Failure threshold**: Track failure counts
- **State management**: Manage circuit breaker states (CLOSED, OPEN, HALF_OPEN)
- **Automatic recovery**: Allow automatic recovery after timeout

**15. Error Monitoring and Alerting**
- **Error tracking**: Track error frequencies and patterns
- **Alerting**: Send alerts for critical errors
- **Performance monitoring**: Monitor error impact on performance

**Best Practices for Error Handling:**

**1. Error Classification:**
- **Operational errors**: Expected errors that can be handled
- **Programming errors**: Bugs that need fixing
- **System errors**: External system failures

**2. Error Messages:**
- **User-friendly**: Provide meaningful messages to users
- **Developer-friendly**: Include technical details for debugging
- **Security**: Don't expose sensitive information in error messages

**3. Error Logging:**
- **Structured format**: Use structured logging for better analysis
- **Context information**: Include relevant context with errors
- **Log levels**: Use appropriate log levels (error, warn, info, debug)

**4. Error Recovery:**
- **Graceful degradation**: Continue operation when possible
- **Fallback mechanisms**: Provide alternative solutions
- **State management**: Maintain application state during errors

**5. Testing Error Handling:**
- **Unit tests**: Test error handling logic
- **Integration tests**: Test error scenarios in context
- **Error simulation**: Simulate various error conditions

**Common Error Handling Patterns:**

**1. Error-First Callbacks:**
- Traditional Node.js pattern
- First parameter is error object
- Check error before processing result

**2. Promise Error Handling:**
- Use .catch() for promise rejections
- Chain error handlers appropriately
- Transform errors as needed

**3. Async/Await Error Handling:**
- Use try-catch with async functions
- Handle errors at appropriate levels
- Maintain error context

**4. Middleware Error Handling:**
- Centralized error handling in Express
- Environment-specific error responses
- Proper error propagation

**5. Global Error Handlers:**
- Catch unhandled errors
- Implement graceful shutdown
- Log critical errors

**Error Handling in Different Contexts:**

**1. Web Applications:**
- HTTP status codes
- User-friendly error messages
- Error logging and monitoring

**2. APIs:**
- Consistent error response format
- Proper HTTP status codes
- Error documentation

**3. Background Jobs:**
- Retry mechanisms
- Dead letter queues
- Error monitoring

**4. Database Operations:**
- Connection error handling
- Transaction rollback
- Data validation errors

**5. External Services:**
- Network error handling
- Timeout management
- Circuit breaker patterns

**Monitoring and Debugging:**

**1. Error Tracking:**
- Error frequency analysis
- Error pattern recognition
- Performance impact assessment

**2. Alerting:**
- Critical error alerts
- Error threshold monitoring
- Escalation procedures

**3. Debugging:**
- Stack trace analysis
- Error context preservation
- Reproducible test cases

**4. Performance Impact:**
- Error handling overhead
- Memory usage monitoring
- Response time impact

Effective error handling is essential for building reliable Node.js applications. It involves understanding different error types, implementing appropriate handling strategies, and maintaining proper monitoring and logging throughout the application lifecycle.`
},
{
  id: 'nodejs-12',
  title: 'How Node.js Works Asynchronously Despite Being Single-Threaded',
  description: 'Understanding the fundamental architecture of Node.js, how it achieves asynchronous operations using the event loop, libuv, and non-blocking I/O while maintaining a single-threaded execution model.',
  difficulty: 'Hard',
  category: 'nodejs',
  solution: `// Node.js Asynchronous Architecture - Single Threaded but Non-Blocking

// 1. THE EVENT LOOP - CORE OF ASYNCHRONOUS OPERATIONS
console.log('1. Start');

setTimeout(() => {
console.log('2. Timer callback');
}, 0);

Promise.resolve().then(() => {
console.log('3. Promise microtask');
});

console.log('4. End');

// Output:
// 1. Start
// 4. End
// 3. Promise microtask
// 2. Timer callback

// 2. UNDERSTANDING THE EVENT LOOP PHASES
function demonstrateEventLoopPhases() {
console.log('=== Event Loop Phase Demonstration ===');

// Phase 1: Timers
setTimeout(() => {
  console.log('Timer phase - setTimeout');
}, 0);

// Phase 2: Pending callbacks (I/O callbacks)
setImmediate(() => {
  console.log('Check phase - setImmediate');
});

// Phase 3: Poll (I/O operations)
const fs = require('fs');
fs.readFile(__filename, () => {
  console.log('Poll phase - File I/O callback');
  
  // Nested timers
  setTimeout(() => {
    console.log('Nested timer in I/O callback');
  }, 0);
  
  setImmediate(() => {
    console.log('Nested setImmediate in I/O callback');
  });
});

// Phase 4: Check (setImmediate)
setImmediate(() => {
  console.log('Check phase - Another setImmediate');
});

// Phase 5: Close callbacks
const server = require('http').createServer();
server.on('close', () => {
  console.log('Close phase - Server close event');
});

// Microtasks (highest priority)
Promise.resolve().then(() => {
  console.log('Microtask - Promise resolved');
});

process.nextTick(() => {
  console.log('Microtask - process.nextTick');
});
}

// 3. LIBUV THREAD POOL - HANDLING CPU-INTENSIVE TASKS
const crypto = require('crypto');

function demonstrateThreadPool() {
console.log('=== Thread Pool Demonstration ===');

// CPU-intensive task that uses thread pool
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('Thread pool task completed:', derivedKey.toString('hex').substring(0, 20) + '...');
});

// Another thread pool task
crypto.pbkdf2('password2', 'salt2', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('Thread pool task 2 completed:', derivedKey.toString('hex').substring(0, 20) + '...');
});

console.log('Thread pool tasks initiated (non-blocking)');
}

// 4. NON-BLOCKING I/O OPERATIONS
const fs = require('fs');

function demonstrateNonBlockingIO() {
console.log('=== Non-Blocking I/O Demonstration ===');

// Non-blocking file read
fs.readFile(__filename, 'utf8', (err, data) => {
  if (err) {
    console.error('File read error:', err);
    return;
  }
  console.log('File read completed, length:', data.length);
});

// Non-blocking file write
fs.writeFile('test.txt', 'Hello World', (err) => {
  if (err) {
    console.error('File write error:', err);
    return;
  }
  console.log('File write completed');
});

console.log('I/O operations initiated (non-blocking)');
}

// 5. ASYNC/AWAIT WITH EVENT LOOP
async function demonstrateAsyncAwait() {
console.log('=== Async/Await with Event Loop ===');

console.log('1. Starting async function');

// Simulate async operation
const result = await new Promise((resolve) => {
  setTimeout(() => {
    resolve('Async operation completed');
  }, 1000);
});

console.log('2. Result:', result);

// Multiple async operations
const promises = [
  new Promise(resolve => setTimeout(() => resolve('Task 1'), 500)),
  new Promise(resolve => setTimeout(() => resolve('Task 2'), 300)),
  new Promise(resolve => setTimeout(() => resolve('Task 3'), 700))
];

const results = await Promise.all(promises);
console.log('3. All tasks completed:', results);
}

// 6. CALLBACK QUEUE vs MICROTASK QUEUE
function demonstrateQueuePriority() {
console.log('=== Queue Priority Demonstration ===');

// Microtask (highest priority)
Promise.resolve().then(() => {
  console.log('Microtask 1');
});

// Timer (lower priority)
setTimeout(() => {
  console.log('Timer 1');
}, 0);

// Another microtask
Promise.resolve().then(() => {
  console.log('Microtask 2');
});

// Another timer
setTimeout(() => {
  console.log('Timer 2');
}, 0);

// process.nextTick (highest priority microtask)
process.nextTick(() => {
  console.log('process.nextTick');
});

console.log('Synchronous code');
}

// 7. EVENT LOOP BLOCKING vs NON-BLOCKING
function demonstrateBlockingVsNonBlocking() {
console.log('=== Blocking vs Non-Blocking ===');

// BLOCKING OPERATION (blocks event loop)
function blockingOperation() {
  console.log('Starting blocking operation...');
  const start = Date.now();
  
  // Simulate CPU-intensive work
  while (Date.now() - start < 2000) {
    // Blocking the main thread
  }
  
  console.log('Blocking operation completed');
}

// NON-BLOCKING OPERATION (doesn't block event loop)
function nonBlockingOperation() {
  console.log('Starting non-blocking operation...');
  
  setTimeout(() => {
    console.log('Non-blocking operation completed');
  }, 2000);
}

// Demonstrate blocking
console.log('1. Before blocking operation');
blockingOperation();
console.log('2. After blocking operation');

// Demonstrate non-blocking
console.log('3. Before non-blocking operation');
nonBlockingOperation();
console.log('4. After non-blocking operation (immediate)');
}

// 8. WORKER THREADS FOR CPU-INTENSIVE TASKS
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function demonstrateWorkerThreads() {
if (isMainThread) {
  console.log('=== Worker Threads Demonstration ===');
  
  // Create worker thread for CPU-intensive task
  const worker = new Worker(__filename, {
    workerData: { number: 1000000 }
  });
  
  worker.on('message', (result) => {
    console.log('Worker result:', result);
  });
  
  worker.on('error', (error) => {
    console.error('Worker error:', error);
  });
  
  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error('Worker stopped with exit code', code);
    }
  });
  
  console.log('Worker thread created for CPU-intensive task');
} else {
  // Worker thread code
  const { number } = workerData;
  
  // CPU-intensive calculation
  let result = 0;
  for (let i = 0; i < number; i++) {
    result += Math.sqrt(i);
  }
  
  parentPort.postMessage(result);
}
}

// 9. EVENT EMITTER PATTERN
const EventEmitter = require('events');

function demonstrateEventEmitter() {
console.log('=== Event Emitter Pattern ===');

const myEmitter = new EventEmitter();

// Register event listeners
myEmitter.on('data', (data) => {
  console.log('Received data:', data);
});

myEmitter.on('error', (error) => {
  console.error('Error occurred:', error);
});

// Emit events asynchronously
setTimeout(() => {
  myEmitter.emit('data', 'Hello from event emitter');
}, 1000);

setTimeout(() => {
  myEmitter.emit('error', new Error('Something went wrong'));
}, 2000);

console.log('Event listeners registered');
}

// 10. STREAMS - ASYNCHRONOUS DATA PROCESSING
const fs = require('fs');

function demonstrateStreams() {
console.log('=== Streams - Asynchronous Data Processing ===');

// Create readable stream
const readStream = fs.createReadStream(__filename, 'utf8');
const writeStream = fs.createWriteStream('output.txt');

let dataCount = 0;

readStream.on('data', (chunk) => {
  dataCount++;
  console.log(\`Received chunk \${dataCount}, size: \${chunk.length}\`);
});

readStream.on('end', () => {
  console.log('File reading completed');
});

readStream.on('error', (error) => {
  console.error('Stream error:', error);
});

// Pipe data asynchronously
readStream.pipe(writeStream);

writeStream.on('finish', () => {
  console.log('File writing completed');
});

console.log('Stream processing initiated');
}

// 11. ASYNCHRONOUS ITERATION
async function demonstrateAsyncIteration() {
console.log('=== Asynchronous Iteration ===');

// Async generator function
async function* asyncGenerator() {
  for (let i = 0; i < 5; i++) {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i;
  }
}

// Async iteration
for await (const value of asyncGenerator()) {
  console.log('Async iteration value:', value);
}

console.log('Async iteration completed');
}

// 12. PERFORMANCE COMPARISON
function demonstratePerformance() {
console.log('=== Performance Comparison ===');

const iterations = 1000000;

// Synchronous operation
console.time('Synchronous');
let syncResult = 0;
for (let i = 0; i < iterations; i++) {
  syncResult += i;
}
console.timeEnd('Synchronous');

// Asynchronous operation
console.time('Asynchronous');
const promises = [];
for (let i = 0; i < 1000; i++) {
  promises.push(
    new Promise(resolve => {
      setTimeout(() => resolve(i), 0);
    })
  );
}

Promise.all(promises).then(() => {
  console.timeEnd('Asynchronous');
});
}

// 13. EVENT LOOP MONITORING
function monitorEventLoop() {
console.log('=== Event Loop Monitoring ===');

let lastCheck = Date.now();

setInterval(() => {
  const now = Date.now();
  const delay = now - lastCheck - 1000; // Should be ~1000ms
  
  if (delay > 100) {
    console.log(\`Event loop lag detected: \${delay}ms\`);
  }
  
  lastCheck = now;
}, 1000);

console.log('Event loop monitoring started');
}

// 14. PRACTICAL EXAMPLE: WEB SERVER
const http = require('http');

function createAsyncServer() {
console.log('=== Asynchronous Web Server ===');

const server = http.createServer((req, res) => {
  console.log(\`Request received: \${req.method} \${req.url}\`);
  
  // Simulate async database query
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Hello from async server',
      timestamp: new Date().toISOString(),
      url: req.url
    }));
  }, Math.random() * 1000); // Random delay
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log('Try: curl http://localhost:3000/api/users');
});

return server;
}

// 15. DEBUGGING EVENT LOOP
function debugEventLoop() {
console.log('=== Event Loop Debugging ===');

// Monitor event loop phases
const originalSetImmediate = setImmediate;
setImmediate = function(callback, ...args) {
  console.log('setImmediate called');
  return originalSetImmediate(callback, ...args);
};

const originalSetTimeout = setTimeout;
setTimeout = function(callback, delay, ...args) {
  console.log(\`setTimeout called with delay: \${delay}ms\`);
  return originalSetTimeout(callback, delay, ...args);
};

// Test
setTimeout(() => console.log('Timer executed'), 100);
setImmediate(() => console.log('Immediate executed'));

console.log('Event loop debugging enabled');
}`,
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
    },
    {
      input: `async function test() {
console.log('1');
await new Promise(resolve => setTimeout(resolve, 100));
console.log('2');
}
test();
console.log('3');`,
      output: `1
3
2`
    },
    {
      input: `const fs = require('fs');
fs.readFile(__filename, () => console.log('File read'));
console.log('After readFile call');`,
      output: `After readFile call
File read`
    }
  ],
  explanation: `**Node.js achieves asynchronous operations despite being single-threaded** through a sophisticated architecture built around the **Event Loop**, **libuv**, and **non-blocking I/O operations**. Here's how it works:

**1. The Event Loop - Core Mechanism**

The Event Loop is the heart of Node.js's asynchronous architecture:

**Event Loop Phases:**
1. **Timers**: Executes callbacks scheduled by setTimeout() and setInterval()
2. **Pending callbacks**: Executes I/O callbacks deferred to the next loop iteration
3. **Idle, prepare**: Used internally by Node.js
4. **Poll**: Retrieves new I/O events and executes I/O callbacks
5. **Check**: Executes setImmediate() callbacks
6. **Close callbacks**: Executes close event callbacks

**2. Single Threaded but Non-Blocking**

**Main Thread (Event Loop):**
- **Single-threaded**: Only one piece of code executes at a time
- **Non-blocking**: Never waits for I/O operations to complete
- **Event-driven**: Responds to events as they occur

**3. libuv Thread Pool**

**Background Threads:**
- **4 threads by default** (configurable)
- **Handles CPU-intensive tasks**: File system operations, crypto, compression
- **Prevents blocking**: Keeps main thread free for other operations

**4. How Asynchronous Operations Work**

**I/O Operations:**
1. **Request initiated** on main thread
2. **Operation delegated** to libuv thread pool or OS
3. **Main thread continues** processing other tasks
4. **Callback queued** when operation completes
5. **Event loop executes** callback in appropriate phase

**5. Queue System**

**Microtask Queue (Highest Priority):**
- **Promises**: .then(), .catch(), .finally()
- **process.nextTick()**: Highest priority microtask
- **queueMicrotask()**: Custom microtasks

**Macrotask Queue (Lower Priority):**
- **Timers**: setTimeout, setInterval
- **I/O callbacks**: File system, network operations
- **setImmediate**: Check phase callbacks
- **Close callbacks**: Cleanup operations

**6. Non-Blocking I/O**

**File System Operations:**
- **Asynchronous**: Operations don't block the main thread
- **Callback-based**: Results delivered via callbacks
- **Stream-based**: Large files processed in chunks

**Network Operations:**
- **Event-driven**: HTTP requests handled asynchronously
- **Connection pooling**: Efficient resource management
- **Real-time**: WebSocket and SSE support

**7. Event-Driven Architecture**

**Event Emitters:**
- **Built-in events**: HTTP, file system, streams
- **Custom events**: Application-specific events
- **Event listeners**: Respond to events asynchronously

**8. Worker Threads**

**CPU-Intensive Tasks:**
- **Separate threads**: Heavy computations in background
- **Message passing**: Communication between threads
- **Shared memory**: Efficient data sharing (optional)

**9. Streams and Backpressure**

**Asynchronous Data Processing:**
- **Readable streams**: Data sources (files, HTTP responses)
- **Writable streams**: Data destinations (files, HTTP requests)
- **Transform streams**: Data processing pipelines
- **Backpressure**: Automatic flow control

**10. Async/Await and Promises**

**Modern Asynchronous Patterns:**
- **Promise-based**: Cleaner than callbacks
- **Async/await**: Synchronous-looking async code
- **Error handling**: Try-catch for async operations
- **Parallel execution**: Promise.all(), Promise.race()

**11. Performance Benefits**

**Concurrency without Threading:**
- **No thread overhead**: No context switching
- **Memory efficient**: Single process, shared memory
- **Scalable**: Thousands of concurrent connections
- **Fast**: No thread synchronization overhead

**12. Event Loop Blocking**

**What Blocks the Event Loop:**
- **CPU-intensive operations**: Heavy calculations
- **Synchronous I/O**: Blocking file operations
- **Infinite loops**: Never-ending code execution
- **Large JSON parsing**: Synchronous data processing

**13. Best Practices**

**Keep Event Loop Free:**
- **Use async I/O**: Always prefer asynchronous operations
- **Break up heavy tasks**: Use setImmediate() or process.nextTick()
- **Use worker threads**: For CPU-intensive operations
- **Monitor performance**: Track event loop lag

**14. Debugging Asynchronous Code**

**Tools and Techniques:**
- **Event loop monitoring**: Track loop performance
- **Async stack traces**: Better debugging information
- **Performance profiling**: Identify bottlenecks
- **Memory leak detection**: Monitor resource usage

**15. Real-World Applications**

**Web Servers:**
- **Concurrent connections**: Handle thousands simultaneously
- **Real-time applications**: WebSocket, SSE support
- **API servers**: RESTful and GraphQL APIs
- **Microservices**: Lightweight, scalable services

**Why This Architecture Works:**

**1. I/O Bound Applications:**
- **Most web applications** are I/O bound (database, file system, network)
- **Node.js excels** at handling many concurrent I/O operations
- **Event loop** efficiently manages thousands of connections

**2. Non-Blocking Nature:**
- **No waiting**: Operations don't block the main thread
- **High throughput**: Process many requests concurrently
- **Responsive**: Application remains responsive under load

**3. Event-Driven Model:**
- **Natural fit**: Web applications are inherently event-driven
- **Scalable**: Easy to add new event handlers
- **Maintainable**: Clear separation of concerns

**4. JavaScript's Single-Threaded Nature:**
- **No race conditions**: No shared memory issues
- **Simpler programming model**: No thread synchronization
- **Deterministic**: Predictable execution order

**Performance Characteristics:**

**Advantages:**
- **High concurrency**: Thousands of concurrent connections
- **Low memory usage**: Single process, shared memory
- **Fast startup**: No thread initialization overhead
- **Efficient I/O**: Non-blocking operations

**Considerations:**
- **CPU-intensive tasks**: May block event loop
- **Single point of failure**: One process handles everything
- **Memory limits**: Single process memory constraints
- **Debugging complexity**: Asynchronous code can be complex

Node.js's single-threaded, event-driven architecture makes it particularly well-suited for I/O-intensive applications like web servers, APIs, and real-time applications, where the ability to handle many concurrent operations efficiently is more important than raw computational power.`
},
{
  id: 'nodejs-13',
  title: 'SOAP vs REST APIs, HTTP Methods, and API Design Principles',
  description: 'Understanding the differences between SOAP and REST APIs, HTTP methods (GET, POST, PUT, PATCH, DELETE), when to use each, and related API design concepts.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// SOAP vs REST APIs and HTTP Methods

// 1. SOAP API EXAMPLE
const soap = require('soap');

// SOAP Client Example
const soapClient = soap.createClient('http://example.com/soap?wsdl');

function callSoapService() {
const args = {
  userId: 123,
  action: 'getUserDetails'
};

soapClient.getUser(args, (err, result) => {
  if (err) {
    console.error('SOAP Error:', err);
    return;
  }
  console.log('SOAP Response:', result);
});
}

// SOAP Server Example
const soapServer = soap.listen(app, '/soap', {
getUser: function(args) {
  return {
    userId: args.userId,
    name: 'John Doe',
    email: 'john@example.com'
  };
}
}, xml);

// 2. REST API EXAMPLE
const express = require('express');
const app = express();

// REST API Endpoints
app.get('/api/users/:id', (req, res) => {
const userId = req.params.id;
// Get user by ID
res.json({
  id: userId,
  name: 'John Doe',
  email: 'john@example.com'
});
});

app.post('/api/users', (req, res) => {
const userData = req.body;
// Create new user
res.status(201).json({
  id: 123,
  ...userData,
  createdAt: new Date()
});
});

app.put('/api/users/:id', (req, res) => {
const userId = req.params.id;
const userData = req.body;
// Replace entire user resource
res.json({
  id: userId,
  ...userData,
  updatedAt: new Date()
});
});

app.patch('/api/users/:id', (req, res) => {
const userId = req.params.id;
const updates = req.body;
// Partial update
res.json({
  id: userId,
  ...updates,
  updatedAt: new Date()
});
});

app.delete('/api/users/:id', (req, res) => {
const userId = req.params.id;
// Delete user
res.status(204).send();
});

// 3. HTTP METHODS COMPARISON

// GET - Retrieve data (Safe, Idempotent)
app.get('/api/products', (req, res) => {
// Safe: No side effects
// Idempotent: Same result every time
const products = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' }
];
res.json(products);
});

// POST - Create new resource (Not Safe, Not Idempotent)
app.post('/api/orders', (req, res) => {
const orderData = req.body;

// Not Safe: Creates new resource
// Not Idempotent: Multiple calls create multiple orders
const newOrder = {
  id: Date.now(),
  ...orderData,
  status: 'pending',
  createdAt: new Date()
};

res.status(201).json(newOrder);
});

// PUT - Replace entire resource (Not Safe, Idempotent)
app.put('/api/users/:id', (req, res) => {
const userId = req.params.id;
const userData = req.body;

// Not Safe: Modifies resource
// Idempotent: Multiple calls have same effect
const updatedUser = {
  id: userId,
  name: userData.name,
  email: userData.email,
  updatedAt: new Date()
};

res.json(updatedUser);
});

// PATCH - Partial update (Not Safe, Not Idempotent)
app.patch('/api/users/:id', (req, res) => {
const userId = req.params.id;
const updates = req.body;

// Not Safe: Modifies resource
// Not Idempotent: Multiple calls may have different effects
const currentUser = { id: userId, name: 'John', email: 'john@example.com' };
const updatedUser = { ...currentUser, ...updates, updatedAt: new Date() };

res.json(updatedUser);
});

// DELETE - Remove resource (Not Safe, Idempotent)
app.delete('/api/users/:id', (req, res) => {
const userId = req.params.id;

// Not Safe: Removes resource
// Idempotent: Multiple calls have same effect (resource deleted)
res.status(204).send();
});

// 4. WHEN TO USE POST vs PUT

// POST - When you don't know the resource ID
app.post('/api/articles', (req, res) => {
const articleData = req.body;

// Server generates ID
const newArticle = {
  id: generateId(), // Server decides the ID
  ...articleData,
  createdAt: new Date()
};

res.status(201).json(newArticle);
});

// PUT - When you know the resource ID
app.put('/api/articles/:id', (req, res) => {
const articleId = req.params.id;
const articleData = req.body;

// Client specifies ID
const updatedArticle = {
  id: articleId, // Client knows the ID
  ...articleData,
  updatedAt: new Date()
};

res.json(updatedArticle);
});

// 5. REST API DESIGN PRINCIPLES

// Resource-based URLs
app.get('/api/users', (req, res) => {
// Collection of users
res.json({ users: [] });
});

app.get('/api/users/:id', (req, res) => {
// Specific user
res.json({ user: {} });
});

app.get('/api/users/:id/orders', (req, res) => {
// User's orders (sub-resource)
res.json({ orders: [] });
});

// HTTP Status Codes
app.get('/api/users/:id', (req, res) => {
const user = findUser(req.params.id);

if (!user) {
  return res.status(404).json({ error: 'User not found' });
}

res.status(200).json({ user });
});

app.post('/api/users', (req, res) => {
try {
  const user = createUser(req.body);
  res.status(201).json({ user });
} catch (error) {
  res.status(400).json({ error: error.message });
}
});

// 6. API VERSIONING

// URL Versioning
app.get('/api/v1/users', (req, res) => {
// Version 1 API
res.json({ version: 'v1', users: [] });
});

app.get('/api/v2/users', (req, res) => {
// Version 2 API
res.json({ version: 'v2', users: [] });
});

// Header Versioning
app.get('/api/users', (req, res) => {
const version = req.headers['api-version'] || 'v1';

if (version === 'v1') {
  res.json({ version: 'v1', users: [] });
} else if (version === 'v2') {
  res.json({ version: 'v2', users: [] });
}
});

// 7. API AUTHENTICATION

// JWT Authentication
const jwt = require('jsonwebtoken');

app.post('/api/login', (req, res) => {
const { username, password } = req.body;

if (authenticateUser(username, password)) {
  const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
  res.json({ token });
} else {
  res.status(401).json({ error: 'Invalid credentials' });
}
});

// Middleware for protected routes
function authenticateToken(req, res, next) {
const token = req.headers.authorization?.split(' ')[1];

if (!token) {
  return res.status(401).json({ error: 'Access token required' });
}

jwt.verify(token, 'secret', (err, user) => {
  if (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
  req.user = user;
  next();
});
}

app.get('/api/protected', authenticateToken, (req, res) => {
res.json({ message: 'Protected data', user: req.user });
});

// 8. API RATE LIMITING

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes
max: 100, // limit each IP to 100 requests per windowMs
message: 'Too many requests from this IP'
});

app.use('/api/', limiter);

// 9. API DOCUMENTATION

// Swagger/OpenAPI Documentation
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
definition: {
  openapi: '3.0.0',
  info: {
    title: 'User API',
    version: '1.0.0',
    description: 'A simple user API'
  }
},
apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 10. API TESTING

// Unit Testing
const request = require('supertest');

describe('User API', () => {
it('should get user by ID', async () => {
  const response = await request(app)
    .get('/api/users/123')
    .expect(200);
  
  expect(response.body).toHaveProperty('user');
});

it('should create new user', async () => {
  const userData = { name: 'John', email: 'john@example.com' };
  
  const response = await request(app)
    .post('/api/users')
    .send(userData)
    .expect(201);
  
  expect(response.body).toHaveProperty('user.id');
});
});

// 11. API ERROR HANDLING

// Global error handler
app.use((err, req, res, next) => {
console.error(err.stack);

if (err.name === 'ValidationError') {
  return res.status(400).json({
    error: 'Validation Error',
    details: err.message
  });
}

if (err.name === 'UnauthorizedError') {
  return res.status(401).json({
    error: 'Unauthorized',
    message: 'Invalid token'
  });
}

res.status(500).json({
  error: 'Internal Server Error',
  message: 'Something went wrong'
});
});

// 12. API CACHING

const mcache = require('memory-cache');

function cache(duration) {
return (req, res, next) => {
  const key = 'cache-' + req.originalUrl || req.url;
  const cachedBody = mcache.get(key);
  
  if (cachedBody) {
    res.send(JSON.parse(cachedBody));
    return;
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      mcache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  }
};
}

app.get('/api/products', cache(300), (req, res) => {
// Cache for 5 minutes
res.json({ products: [] });
});

// 13. API MONITORING

// Request logging
app.use((req, res, next) => {
const start = Date.now();

res.on('finish', () => {
  const duration = Date.now() - start;
  console.log(\`\${req.method} \${req.url} - \${res.statusCode} - \${duration}ms\`);
});

next();
});

// 14. API SECURITY

const helmet = require('helmet');
const cors = require('cors');

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
origin: 'http://localhost:3000',
credentials: true
}));

// Input validation
const { body, validationResult } = require('express-validator');

app.post('/api/users', [
body('email').isEmail(),
body('name').isLength({ min: 2 })
], (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

// Process valid data
res.status(201).json({ message: 'User created' });
});

// 15. API PERFORMANCE

// Compression
const compression = require('compression');
app.use(compression());

// Database connection pooling
const pool = mysql.createPool({
host: 'localhost',
user: 'root',
password: 'password',
database: 'test',
connectionLimit: 10
});

// Async database operations
app.get('/api/users', async (req, res) => {
try {
  const [rows] = await pool.promise().query('SELECT * FROM users');
  res.json({ users: rows });
} catch (error) {
  res.status(500).json({ error: 'Database error' });
}
});`,
  testCases: [
    { 
      input: `// REST API GET request
app.get('/api/users/:id', (req, res) => {
res.json({ user: { id: req.params.id } });
});`, 
      output: `// Safe and idempotent operation` 
    },
    {
      input: `// POST vs PUT comparison
app.post('/api/users', (req, res) => {
// Creates new resource with server-generated ID
res.status(201).json({ id: Date.now() });
});

app.put('/api/users/:id', (req, res) => {
// Replaces resource with client-specified ID
res.json({ id: req.params.id });
}`,
      output: `// POST for creation, PUT for replacement`
    },
    {
      input: `// SOAP vs REST
// SOAP: XML-based, complex, stateful
// REST: JSON-based, simple, stateless`,
      output: `// Different architectural styles`
    }
  ],
  explanation: `**SOAP vs REST APIs and HTTP Methods** are fundamental concepts in web service design. Understanding their differences and when to use each is crucial for building effective APIs.

**1. SOAP vs REST Comparison**

**SOAP (Simple Object Access Protocol):**
- **Protocol**: XML-based messaging protocol
- **Stateful**: Maintains state between requests
- **Complex**: Heavy and verbose
- **Standards**: WS-Security, WS-Addressing, WS-ReliableMessaging
- **Transport**: HTTP, SMTP, TCP
- **Use Cases**: Enterprise applications, financial services, healthcare

**REST (Representational State Transfer):**
- **Architecture Style**: Resource-based, stateless
- **Stateless**: Each request is independent
- **Simple**: Lightweight and easy to understand
- **Standards**: HTTP methods, status codes, headers
- **Transport**: HTTP/HTTPS only
- **Use Cases**: Web APIs, mobile apps, public APIs

**2. HTTP Methods Deep Dive**

**GET - Retrieve Data:**
- **Safe**: No side effects on server
- **Idempotent**: Same result every time
- **Cacheable**: Can be cached
- **Use Cases**: Fetching data, searching, filtering

**POST - Create New Resource:**
- **Not Safe**: Creates new resource
- **Not Idempotent**: Multiple calls create multiple resources
- **Not Cacheable**: Cannot be cached
- **Use Cases**: Creating new records, form submissions, file uploads

**PUT - Replace Entire Resource:**
- **Not Safe**: Modifies existing resource
- **Idempotent**: Multiple calls have same effect
- **Not Cacheable**: Cannot be cached
- **Use Cases**: Complete resource updates, upserts

**PATCH - Partial Update:**
- **Not Safe**: Modifies existing resource
- **Not Idempotent**: Multiple calls may have different effects
- **Not Cacheable**: Cannot be cached
- **Use Cases**: Partial updates, field modifications

**DELETE - Remove Resource:**
- **Not Safe**: Removes resource
- **Idempotent**: Multiple calls have same effect
- **Not Cacheable**: Cannot be cached
- **Use Cases**: Resource deletion, cleanup operations

**3. Why POST vs PUT?**

**Use POST when:**
- **Creating new resources** with server-generated IDs
- **You don't know the resource ID** beforehand
- **Processing form data** or file uploads
- **Triggering actions** that don't fit CRUD operations

**Use PUT when:**
- **Replacing entire resources** with known IDs
- **You know the exact resource location**
- **Upsert operations** (create or update)
- **Complete resource replacement**

**4. REST API Design Principles**

**Resource-Based URLs:**
- Use nouns, not verbs
- Hierarchical structure
- Consistent naming conventions
- Plural for collections

**HTTP Status Codes:**
- **2xx Success**: 200 OK, 201 Created, 204 No Content
- **3xx Redirection**: 301 Moved, 304 Not Modified
- **4xx Client Error**: 400 Bad Request, 401 Unauthorized, 404 Not Found
- **5xx Server Error**: 500 Internal Server Error, 503 Service Unavailable

**Stateless Design:**
- Each request contains all necessary information
- No server-side session storage
- Scalable and cacheable

**5. API Versioning Strategies**

**URL Versioning:**
- \`/api/v1/users\`, \`/api/v2/users\`
- Clear and explicit
- Easy to understand
- Can run multiple versions simultaneously

**Header Versioning:**
- \`Accept: application/vnd.api+json;version=1\`
- Clean URLs
- More complex implementation
- Better for mobile apps

**6. Authentication and Security**

**JWT (JSON Web Tokens):**
- Stateless authentication
- Self-contained user information
- Scalable across services
- Secure when properly implemented

**OAuth 2.0:**
- Authorization framework
- Third-party access
- Refresh tokens
- Industry standard

**7. API Best Practices**

**Performance:**
- Use caching strategies
- Implement pagination
- Optimize database queries
- Use compression

**Security:**
- Validate all inputs
- Use HTTPS
- Implement rate limiting
- Add security headers

**Documentation:**
- Use OpenAPI/Swagger
- Provide examples
- Include error responses
- Keep documentation updated

**8. Common API Patterns**

**CRUD Operations:**
- Create: POST /resources
- Read: GET /resources/:id
- Update: PUT /resources/:id
- Delete: DELETE /resources/:id

**Search and Filtering:**
- GET /resources?search=term&filter=active
- Query parameters for filtering
- Consistent parameter naming

**Pagination:**
- GET /resources?page=1&limit=10
- Include metadata in response
- Consistent pagination strategy

**9. Error Handling**

**Consistent Error Format:**
- Standard error structure
- Meaningful error messages
- Appropriate HTTP status codes
- Error codes for programmatic handling

**Validation Errors:**
- Field-level error messages
- Clear validation rules
- Helpful error descriptions

**10. API Testing**

**Unit Testing:**
- Test individual endpoints
- Mock external dependencies
- Test error scenarios
- Validate response formats

**Integration Testing:**
- Test complete workflows
- Database integration
- External service integration
- Performance testing

**11. Monitoring and Analytics**

**Request Logging:**
- Track request/response times
- Monitor error rates
- Log important events
- Performance metrics

**Health Checks:**
- Endpoint availability
- Database connectivity
- External service status
- System resources

**12. API Evolution**

**Backward Compatibility:**
- Maintain old endpoints
- Add new fields as optional
- Use versioning strategies
- Gradual deprecation

**Migration Strategies:**
- Feature flags
- A/B testing
- Gradual rollout
- Rollback procedures

**13. Real-World Considerations**

**Scalability:**
- Horizontal scaling
- Load balancing
- Database optimization
- Caching strategies

**Reliability:**
- Circuit breakers
- Retry mechanisms
- Fallback strategies
- Monitoring and alerting

**14. Industry Standards**

**OpenAPI Specification:**
- Standard API documentation
- Code generation
- Testing tools
- Ecosystem support

**GraphQL:**
- Alternative to REST
- Single endpoint
- Flexible queries
- Real-time subscriptions

**15. Choosing Between SOAP and REST**

**Choose SOAP when:**
- Enterprise integration required
- Complex security requirements
- Transactional operations
- Legacy system integration

**Choose REST when:**
- Building web APIs
- Mobile app backends
- Public APIs
- Simple CRUD operations

**Performance Comparison:**

**SOAP:**
- **Pros**: Standards-based, enterprise features, security
- **Cons**: Verbose, complex, slower, limited browser support

**REST:**
- **Pros**: Simple, fast, cacheable, browser-friendly
- **Cons**: No built-in standards, limited security features

Understanding these differences helps in choosing the right approach for your specific use case and building APIs that are efficient, maintainable, and user-friendly.`
},
{
  id: 'nodejs-14',
  title: 'How to Migrate PHP APIs to Node.js APIs',
  description: 'Understanding the process of migrating PHP APIs to Node.js, including architecture differences, migration strategies, data handling, authentication, and best practices for a successful transition.',
  difficulty: 'Hard',
  category: 'nodejs',
  solution: `// PHP to Node.js API Migration Guide

// 1. PHP API STRUCTURE (Before Migration)
/*
// PHP API Example
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

class UserController {
  private $db;
  
  public function __construct($db) {
      $this->db = $db;
  }
  
  public function getUsers() {
      $query = "SELECT * FROM users";
      $result = $this->db->query($query);
      $users = $result->fetch_all(MYSQLI_ASSOC);
      
      echo json_encode([
          'status' => 'success',
          'data' => $users
      ]);
  }
  
  public function createUser($data) {
      $name = $data['name'];
      $email = $data['email'];
      
      $query = "INSERT INTO users (name, email) VALUES (?, ?)";
      $stmt = $this->db->prepare($query);
      $stmt->bind_param("ss", $name, $email);
      
      if ($stmt->execute()) {
          echo json_encode([
              'status' => 'success',
              'message' => 'User created successfully'
          ]);
      } else {
          echo json_encode([
              'status' => 'error',
              'message' => 'Failed to create user'
          ]);
      }
  }
}
?>
*/

// 2. NODE.JS API STRUCTURE (After Migration)
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
const pool = mysql.createPool({
host: 'localhost',
user: 'root',
password: 'password',
database: 'test',
connectionLimit: 10
});

// User Controller (Equivalent to PHP class)
class UserController {
constructor(db) {
  this.db = db;
}

async getUsers(req, res) {
  try {
    const [rows] = await this.db.query('SELECT * FROM users');
    res.json({
      status: 'success',
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users'
    });
  }
}

async createUser(req, res) {
  try {
    const { name, email } = req.body;
    const [result] = await this.db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create user'
    });
  }
}
}

const userController = new UserController(pool);

// Routes
app.get('/api/users', (req, res) => userController.getUsers(req, res));
app.post('/api/users', (req, res) => userController.createUser(req, res));

// 3. MIGRATION STRATEGY - PHASED APPROACH

// Phase 1: Setup Node.js Environment
const path = require('path');
require('dotenv').config();

// Environment configuration
const config = {
port: process.env.PORT || 3000,
database: {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'test'
},
jwt: {
  secret: process.env.JWT_SECRET || 'your-secret-key',
  expiresIn: '24h'
}
};

// Phase 2: Database Migration
const { Sequelize, DataTypes } = require('sequelize');

// Database connection with Sequelize
const sequelize = new Sequelize(
config.database.database,
config.database.user,
config.database.password,
{
  host: config.database.host,
  dialect: 'mysql',
  logging: false
}
);

// User Model (Equivalent to PHP model)
const User = sequelize.define('User', {
id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
},
name: {
  type: DataTypes.STRING,
  allowNull: false
},
email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
},
password: {
  type: DataTypes.STRING,
  allowNull: false
},
createdAt: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW
},
updatedAt: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW
}
});

// 4. AUTHENTICATION MIGRATION

// PHP Session-based Auth to JWT
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Authentication middleware
const authenticateToken = (req, res, next) => {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

if (!token) {
  return res.status(401).json({ error: 'Access token required' });
}

jwt.verify(token, config.jwt.secret, (err, user) => {
  if (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
  req.user = user;
  next();
});
};

// Login endpoint (replaces PHP session login)
app.post('/api/login', async (req, res) => {
try {
  const { email, password } = req.body;
  
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
  
  res.json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
} catch (error) {
  res.status(500).json({ error: 'Login failed' });
}
});

// 5. DATA HANDLING MIGRATION

// PHP $_POST/$_GET to Express req.body/req.query
app.get('/api/users', async (req, res) => {
try {
  const { page = 1, limit = 10, search } = req.query;
  const offset = (page - 1) * limit;
  
  let whereClause = {};
  if (search) {
    whereClause = {
      [Sequelize.Op.or]: [
        { name: { [Sequelize.Op.like]: \`%\${search}%\` } },
        { email: { [Sequelize.Op.like]: \`%\${search}%\` } }
      ]
    };
  }
  
  const { count, rows } = await User.findAndCountAll({
    where: whereClause,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['createdAt', 'DESC']]
  });
  
  res.json({
    status: 'success',
    data: rows,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: count,
      pages: Math.ceil(count / limit)
    }
  });
} catch (error) {
  res.status(500).json({ error: 'Failed to fetch users' });
}
});

// 6. FILE UPLOAD MIGRATION

// PHP move_uploaded_file to Multer
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
destination: (req, file, cb) => {
  cb(null, 'uploads/');
},
filename: (req, file, cb) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
}
});

const upload = multer({ 
storage: storage,
limits: {
  fileSize: 5 * 1024 * 1024 // 5MB limit
},
fileFilter: (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
}
});

// File upload endpoint
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
try {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    status: 'success',
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      path: req.file.path
    }
  });
} catch (error) {
  res.status(500).json({ error: 'File upload failed' });
}
});

// 7. ERROR HANDLING MIGRATION

// PHP try-catch to Express error handling
const errorHandler = (err, req, res, next) => {
console.error(err.stack);

if (err.name === 'SequelizeValidationError') {
  return res.status(400).json({
    status: 'error',
    message: 'Validation error',
    errors: err.errors.map(e => ({
      field: e.path,
      message: e.message
    }))
  });
}

if (err.name === 'SequelizeUniqueConstraintError') {
  return res.status(409).json({
    status: 'error',
    message: 'Duplicate entry'
  });
}

res.status(500).json({
  status: 'error',
  message: 'Internal server error'
});
};

app.use(errorHandler);

// 8. CACHING MIGRATION

// PHP APCu/Memcached to Redis
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

// Caching middleware
const cache = (duration) => {
return async (req, res, next) => {
  const key = 'cache:' + req.originalUrl;
  
  try {
    const cached = await client.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      client.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    next();
  } catch (error) {
    next();
  }
};
};

// Cached endpoint
app.get('/api/products', cache(300), async (req, res) => {
// Product fetching logic
res.json({ products: [] });
});

// 9. API RATE LIMITING

// PHP rate limiting to Express rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes
max: 100, // limit each IP to 100 requests per windowMs
message: {
  status: 'error',
  message: 'Too many requests from this IP'
}
});

app.use('/api/', limiter);

// 10. LOGGING MIGRATION

// PHP error_log to Winston
const winston = require('winston');

const logger = winston.createLogger({
level: 'info',
format: winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
),
transports: [
  new winston.transports.File({ filename: 'error.log', level: 'error' }),
  new winston.transports.File({ filename: 'combined.log' }),
  new winston.transports.Console({
    format: winston.format.simple()
  })
]
});

// Logging middleware
app.use((req, res, next) => {
logger.info({
  method: req.method,
  url: req.url,
  ip: req.ip,
  userAgent: req.get('User-Agent')
});
next();
});

// 11. VALIDATION MIGRATION

// PHP validation to Joi
const Joi = require('joi');

const userSchema = Joi.object({
name: Joi.string().min(2).max(50).required(),
email: Joi.string().email().required(),
password: Joi.string().min(6).required()
});

const validateUser = (req, res, next) => {
const { error } = userSchema.validate(req.body);
if (error) {
  return res.status(400).json({
    status: 'error',
    message: 'Validation error',
    errors: error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }))
  });
}
next();
};

app.post('/api/users', validateUser, async (req, res) => {
// User creation logic
});

// 12. DATABASE MIGRATION SCRIPT

// Migration script to transfer data
const migrateData = async () => {
try {
  // Connect to old PHP database
  const oldDb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'old_php_db'
  });
  
  // Fetch data from old database
  const [oldUsers] = await oldDb.promise().query('SELECT * FROM users');
  
  // Insert into new database
  for (const user of oldUsers) {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password, // Assuming already hashed
      createdAt: user.created_at,
      updatedAt: user.updated_at
    });
  }
  
  console.log('Data migration completed');
} catch (error) {
  console.error('Migration failed:', error);
}
};

// 13. API VERSIONING

// Versioned API endpoints
const v1Router = express.Router();
const v2Router = express.Router();

// V1 API (old PHP style)
v1Router.get('/users', async (req, res) => {
// Legacy response format
res.json({
  status: 'success',
  data: await User.findAll()
});
});

// V2 API (new Node.js style)
v2Router.get('/users', async (req, res) => {
// New response format with pagination
const { page = 1, limit = 10 } = req.query;
const offset = (page - 1) * limit;

const { count, rows } = await User.findAndCountAll({
  limit: parseInt(limit),
  offset: parseInt(offset)
});

res.json({
  data: rows,
  meta: {
    page: parseInt(page),
    limit: parseInt(limit),
    total: count,
    pages: Math.ceil(count / limit)
  }
});
});

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// 14. TESTING MIGRATION

// PHPUnit to Jest
const request = require('supertest');

describe('User API', () => {
it('should create a new user', async () => {
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  };
  
  const response = await request(app)
    .post('/api/users')
    .send(userData)
    .expect(201);
  
  expect(response.body).toHaveProperty('status', 'success');
  expect(response.body).toHaveProperty('id');
});

it('should get users with pagination', async () => {
  const response = await request(app)
    .get('/api/users?page=1&limit=10')
    .expect(200);
  
  expect(response.body).toHaveProperty('data');
  expect(response.body).toHaveProperty('pagination');
});
});

// 15. DEPLOYMENT MIGRATION

// PM2 configuration for production
const pm2Config = {
apps: [{
  name: 'api-server',
  script: 'app.js',
  instances: 'max',
  exec_mode: 'cluster',
  env: {
    NODE_ENV: 'development'
  },
  env_production: {
    NODE_ENV: 'production',
    PORT: 3000
  }
}]
};

// Docker configuration
const dockerfile = \`
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`;

// Start server
const PORT = config.port;
app.listen(PORT, () => {
console.log(\`Server running on port \${PORT}\`);
logger.info(\`Server started on port \${PORT}\`);
});

module.exports = app;`,
  testCases: [
    { 
      input: `// PHP to Node.js migration
// PHP: $_POST['name']
// Node.js: req.body.name`, 
      output: `// Data access pattern migration` 
    },
    {
      input: `// Authentication migration
// PHP: $_SESSION['user_id']
// Node.js: JWT token in Authorization header`,
      output: `// Session-based to token-based auth`
    },
    {
      input: `// Database migration
// PHP: mysqli_query($conn, $sql)
// Node.js: await db.query(sql, params)`,
      output: `// Synchronous to asynchronous database operations`
    }
  ],
  explanation: `**Migrating PHP APIs to Node.js** involves understanding architectural differences, data handling patterns, and implementing equivalent functionality in a new technology stack. Here's a comprehensive guide:

**1. Architecture Differences**

**PHP (Traditional):**
- **Synchronous**: Blocking I/O operations
- **Session-based**: Server-side session storage
- **Procedural**: Function-based programming
- **Apache/Nginx**: Traditional web server setup
- **Shared hosting**: Easy deployment

**Node.js (Modern):**
- **Asynchronous**: Non-blocking I/O operations
- **Stateless**: JWT tokens, no server-side sessions
- **Event-driven**: Event loop architecture
- **Express.js**: Web framework
- **Cloud-native**: Containerized deployment

**2. Migration Strategy**

**Phased Approach:**
1. **Analysis**: Audit existing PHP API
2. **Planning**: Design Node.js architecture
3. **Setup**: Configure Node.js environment
4. **Migration**: Port endpoints one by one
5. **Testing**: Validate functionality
6. **Deployment**: Gradual rollout
7. **Monitoring**: Performance tracking

**3. Key Migration Areas**

**Database Operations:**
- **PHP**: mysqli_query(), PDO
- **Node.js**: mysql2, Sequelize, Prisma
- **Changes**: Async/await, connection pooling, ORM

**Authentication:**
- **PHP**: $_SESSION, session_start()
- **Node.js**: JWT tokens, bcrypt
- **Changes**: Stateless authentication, token validation

**File Handling:**
- **PHP**: move_uploaded_file(), $_FILES
- **Node.js**: Multer, fs.promises
- **Changes**: Stream-based processing, async file operations

**Error Handling:**
- **PHP**: try-catch, error_reporting()
- **Node.js**: Express error middleware, async error handling
- **Changes**: Centralized error handling, promise rejection

**4. Data Access Patterns**

**Request Data:**
- **PHP**: $_POST, $_GET, $_REQUEST
- **Node.js**: req.body, req.query, req.params
- **Changes**: Middleware parsing, validation

**Response Handling:**
- **PHP**: echo json_encode(), header()
- **Node.js**: res.json(), res.status()
- **Changes**: Express response methods, status codes

**Database Queries:**
- **PHP**: Synchronous database calls
- **Node.js**: Promise-based async queries
- **Changes**: Connection pooling, prepared statements

**5. Authentication Migration**

**Session to Token:**
- **PHP Sessions**: Server-side storage, session cookies
- **JWT Tokens**: Client-side storage, Authorization header
- **Benefits**: Stateless, scalable, mobile-friendly

**Password Handling:**
- **PHP**: password_hash(), password_verify()
- **Node.js**: bcrypt.hash(), bcrypt.compare()
- **Changes**: Same hashing algorithms, async operations

**6. Performance Optimizations**

**Caching:**
- **PHP**: APCu, Memcached
- **Node.js**: Redis, in-memory caching
- **Benefits**: Faster response times, reduced database load

**Connection Pooling:**
- **PHP**: Limited connection management
- **Node.js**: Built-in connection pooling
- **Benefits**: Better resource utilization, scalability

**Async Operations:**
- **PHP**: Blocking I/O
- **Node.js**: Non-blocking I/O
- **Benefits**: Higher concurrency, better throughput

**7. Security Considerations**

**Input Validation:**
- **PHP**: Manual validation, filter_input()
- **Node.js**: Joi, express-validator
- **Benefits**: Structured validation, type safety

**SQL Injection Prevention:**
- **PHP**: Prepared statements
- **Node.js**: Parameterized queries, ORM
- **Benefits**: Automatic escaping, query building

**CORS Handling:**
- **PHP**: Manual header setting
- **Node.js**: cors middleware
- **Benefits**: Configurable, automatic handling

**8. Testing Migration**

**Unit Testing:**
- **PHP**: PHPUnit
- **Node.js**: Jest, Mocha
- **Benefits**: Better async testing, mocking

**Integration Testing:**
- **PHP**: Manual API testing
- **Node.js**: Supertest, automated testing
- **Benefits**: Automated test suites, CI/CD integration

**9. Deployment Changes**

**Environment Setup:**
- **PHP**: Apache/Nginx + PHP-FPM
- **Node.js**: PM2, Docker, Kubernetes
- **Benefits**: Containerization, auto-scaling

**Process Management:**
- **PHP**: Web server process management
- **Node.js**: PM2, cluster mode
- **Benefits**: Process monitoring, auto-restart

**10. Monitoring and Logging**

**Error Tracking:**
- **PHP**: error_log(), custom logging
- **Node.js**: Winston, Bunyan, Sentry
- **Benefits**: Structured logging, error aggregation

**Performance Monitoring:**
- **PHP**: Limited built-in monitoring
- **Node.js**: New Relic, DataDog, custom metrics
- **Benefits**: Real-time monitoring, alerting

**11. API Versioning**

**Backward Compatibility:**
- **PHP**: Manual version handling
- **Node.js**: Express routers, middleware
- **Benefits**: Clean separation, gradual migration

**Version Management:**
- **PHP**: URL-based versioning
- **Node.js**: Header-based or URL-based
- **Benefits**: Flexible versioning strategies

**12. Data Migration**

**Database Schema:**
- **PHP**: Direct SQL migrations
- **Node.js**: Sequelize migrations, Prisma
- **Benefits**: Version-controlled schema changes

**Data Transfer:**
- **PHP**: Export/import scripts
- **Node.js**: Migration scripts, ETL processes
- **Benefits**: Automated data transfer, validation

**13. Common Challenges**

**Learning Curve:**
- **Async Programming**: Understanding promises and async/await
- **Event Loop**: Grasping non-blocking I/O
- **Error Handling**: Managing async error propagation

**Performance Tuning:**
- **Memory Management**: Avoiding memory leaks
- **Event Loop Blocking**: Keeping operations non-blocking
- **Database Optimization**: Connection pooling and query optimization

**14. Best Practices**

**Code Organization:**
- **MVC Pattern**: Separate concerns
- **Middleware**: Reusable components
- **Error Handling**: Centralized error management

**Security:**
- **Input Validation**: Validate all inputs
- **Authentication**: Implement proper JWT handling
- **Rate Limiting**: Prevent abuse

**Performance:**
- **Caching**: Implement appropriate caching strategies
- **Database**: Use connection pooling and indexing
- **Monitoring**: Track performance metrics

**15. Migration Checklist**

**Pre-Migration:**
- [ ] Audit existing PHP API
- [ ] Document all endpoints and functionality
- [ ] Plan Node.js architecture
- [ ] Set up development environment

**During Migration:**
- [ ] Port endpoints one by one
- [ ] Implement authentication system
- [ ] Set up database connections
- [ ] Add error handling
- [ ] Implement validation

**Post-Migration:**
- [ ] Test all functionality
- [ ] Performance testing
- [ ] Security audit
- [ ] Documentation update
- [ ] Deployment planning

**Benefits of Migration:**

**Performance:**
- **Higher Throughput**: Non-blocking I/O
- **Better Scalability**: Event-driven architecture
- **Reduced Latency**: Optimized database operations

**Developer Experience:**
- **Modern JavaScript**: ES6+ features
- **Rich Ecosystem**: npm packages
- **Better Tooling**: Modern development tools

**Maintenance:**
- **Type Safety**: TypeScript support
- **Better Testing**: Comprehensive testing frameworks
- **Monitoring**: Advanced monitoring capabilities

**Cost Benefits:**
- **Resource Efficiency**: Lower server requirements
- **Development Speed**: Faster feature development
- **Maintenance Costs**: Reduced operational overhead

Migrating from PHP to Node.js requires careful planning and execution, but the benefits in terms of performance, scalability, and developer experience make it a worthwhile investment for modern API development.`
},
{
  id: 'nodejs-15',
  title: 'Event Pool, Event Loop, and Similar Concepts in Node.js',
  description: 'Understanding the core concepts of event pool, event loop, thread pool, and how they work together to enable Node.js asynchronous operations.',
  difficulty: 'Hard',
  category: 'nodejs',
  solution: `// Event Pool, Event Loop, and Related Concepts

// 1. EVENT LOOP - CORE MECHANISM
console.log('1. Start');

setTimeout(() => {
console.log('2. Timer callback');
}, 0);

Promise.resolve().then(() => {
console.log('3. Promise microtask');
});

process.nextTick(() => {
console.log('4. process.nextTick');
});

console.log('5. End');

// Output:
// 1. Start
// 5. End
// 4. process.nextTick
// 3. Promise microtask
// 2. Timer callback

// 2. EVENT LOOP PHASES
function demonstrateEventLoopPhases() {
console.log('=== Event Loop Phase Demonstration ===');

// Phase 1: Timers
setTimeout(() => {
  console.log('Phase 1: Timer phase - setTimeout');
}, 0);

// Phase 2: Pending callbacks (I/O callbacks)
setImmediate(() => {
  console.log('Phase 2: Check phase - setImmediate');
});

// Phase 3: Poll (I/O operations)
const fs = require('fs');
fs.readFile(__filename, () => {
  console.log('Phase 3: Poll phase - File I/O callback');
  
  // Nested timers
  setTimeout(() => {
    console.log('Nested timer in I/O callback');
  }, 0);
  
  setImmediate(() => {
    console.log('Nested setImmediate in I/O callback');
  });
});

// Phase 4: Check (setImmediate)
setImmediate(() => {
  console.log('Phase 4: Check phase - Another setImmediate');
});

// Phase 5: Close callbacks
const server = require('http').createServer();
server.on('close', () => {
  console.log('Phase 5: Close phase - Server close event');
});

// Microtasks (highest priority)
Promise.resolve().then(() => {
  console.log('Microtask: Promise resolved');
});

process.nextTick(() => {
  console.log('Microtask: process.nextTick');
});
}

// 3. THREAD POOL (LIBUV)
const crypto = require('crypto');

function demonstrateThreadPool() {
console.log('=== Thread Pool Demonstration ===');

// CPU-intensive task that uses thread pool
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('Thread pool task completed:', derivedKey.toString('hex').substring(0, 20) + '...');
});

// Another thread pool task
crypto.pbkdf2('password2', 'salt2', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('Thread pool task 2 completed:', derivedKey.toString('hex').substring(0, 20) + '...');
});

console.log('Thread pool tasks initiated (non-blocking)');
}

// 4. EVENT POOL vs CALLBACK QUEUE
function demonstrateEventPool() {
console.log('=== Event Pool vs Callback Queue ===');

// Event Pool (Microtask Queue) - Higher Priority
Promise.resolve().then(() => {
  console.log('Event Pool: Promise 1');
});

Promise.resolve().then(() => {
  console.log('Event Pool: Promise 2');
});

// Callback Queue (Macrotask Queue) - Lower Priority
setTimeout(() => {
  console.log('Callback Queue: Timer 1');
}, 0);

setTimeout(() => {
  console.log('Callback Queue: Timer 2');
}, 0);

// process.nextTick (Highest Priority Microtask)
process.nextTick(() => {
  console.log('Event Pool: process.nextTick');
});

console.log('Synchronous code');
}

// 5. EVENT EMITTER PATTERN
const EventEmitter = require('events');

function demonstrateEventEmitter() {
console.log('=== Event Emitter Pattern ===');

const myEmitter = new EventEmitter();

// Register event listeners
myEmitter.on('data', (data) => {
  console.log('Event Pool: Received data:', data);
});

myEmitter.on('error', (error) => {
  console.error('Event Pool: Error occurred:', error);
});

// Emit events asynchronously
setTimeout(() => {
  myEmitter.emit('data', 'Hello from event emitter');
}, 1000);

setTimeout(() => {
  myEmitter.emit('error', new Error('Something went wrong'));
}, 2000);

console.log('Event listeners registered');
}

// 6. EVENT LOOP MONITORING
function monitorEventLoop() {
console.log('=== Event Loop Monitoring ===');

let lastCheck = Date.now();

setInterval(() => {
  const now = Date.now();
  const delay = now - lastCheck - 1000; // Should be ~1000ms
  
  if (delay > 100) {
    console.log(\`Event loop lag detected: \${delay}ms\`);
  }
  
  lastCheck = now;
}, 1000);

console.log('Event loop monitoring started');
}

// 7. EVENT LOOP BLOCKING SCENARIOS
function demonstrateEventLoopBlocking() {
console.log('=== Event Loop Blocking ===');

// BLOCKING OPERATION (blocks event loop)
function blockingOperation() {
  console.log('Starting blocking operation...');
  const start = Date.now();
  
  // Simulate CPU-intensive work
  while (Date.now() - start < 2000) {
    // Blocking the main thread
  }
  
  console.log('Blocking operation completed');
}

// NON-BLOCKING OPERATION (doesn't block event loop)
function nonBlockingOperation() {
  console.log('Starting non-blocking operation...');
  
  setTimeout(() => {
    console.log('Non-blocking operation completed');
  }, 2000);
}

// Demonstrate blocking
console.log('1. Before blocking operation');
blockingOperation();
console.log('2. After blocking operation');

// Demonstrate non-blocking
console.log('3. Before non-blocking operation');
nonBlockingOperation();
console.log('4. After non-blocking operation (immediate)');
}

// 8. WORKER THREADS FOR CPU-INTENSIVE TASKS
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function demonstrateWorkerThreads() {
if (isMainThread) {
  console.log('=== Worker Threads Demonstration ===');
  
  // Create worker thread for CPU-intensive task
  const worker = new Worker(__filename, {
    workerData: { number: 1000000 }
  });
  
  worker.on('message', (result) => {
    console.log('Worker result:', result);
  });
  
  worker.on('error', (error) => {
    console.error('Worker error:', error);
  });
  
  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error('Worker stopped with exit code', code);
    }
  });
  
  console.log('Worker thread created for CPU-intensive task');
} else {
  // Worker thread code
  const { number } = workerData;
  
  // CPU-intensive calculation
  let result = 0;
  for (let i = 0; i < number; i++) {
    result += Math.sqrt(i);
  }
  
  parentPort.postMessage(result);
}
}

// 9. EVENT LOOP PRIORITY ORDER
function demonstratePriorityOrder() {
console.log('=== Event Loop Priority Order ===');

// 1. process.nextTick (highest priority microtask)
process.nextTick(() => {
  console.log('1. process.nextTick');
});

// 2. Promise microtasks
Promise.resolve().then(() => {
  console.log('2. Promise microtask');
});

// 3. setImmediate (check phase)
setImmediate(() => {
  console.log('3. setImmediate');
});

// 4. setTimeout (timer phase)
setTimeout(() => {
  console.log('4. setTimeout');
}, 0);

console.log('Synchronous code');
}

// 10. EVENT LOOP DEBUGGING
function debugEventLoop() {
console.log('=== Event Loop Debugging ===');

// Monitor event loop phases
const originalSetImmediate = setImmediate;
setImmediate = function(callback, ...args) {
  console.log('setImmediate called');
  return originalSetImmediate(callback, ...args);
};

const originalSetTimeout = setTimeout;
setTimeout = function(callback, delay, ...args) {
  console.log(\`setTimeout called with delay: \${delay}ms\`);
  return originalSetTimeout(callback, delay, ...args);
};

// Test
setTimeout(() => console.log('Timer executed'), 100);
setImmediate(() => console.log('Immediate executed'));

console.log('Event loop debugging enabled');
}

// 11. EVENT LOOP PERFORMANCE
function measureEventLoopPerformance() {
console.log('=== Event Loop Performance ===');

const iterations = 1000000;

// Synchronous operation
console.time('Synchronous');
let syncResult = 0;
for (let i = 0; i < iterations; i++) {
  syncResult += i;
}
console.timeEnd('Synchronous');

// Asynchronous operation
console.time('Asynchronous');
const promises = [];
for (let i = 0; i < 1000; i++) {
  promises.push(
    new Promise(resolve => {
      setTimeout(() => resolve(i), 0);
    })
  );
}

Promise.all(promises).then(() => {
  console.timeEnd('Asynchronous');
});
}

// 12. EVENT LOOP BEST PRACTICES
function eventLoopBestPractices() {
console.log('=== Event Loop Best Practices ===');

// GOOD: Non-blocking operations
setTimeout(() => {
  console.log('Non-blocking operation');
}, 0);

// GOOD: Use setImmediate for immediate execution
setImmediate(() => {
  console.log('Immediate execution');
});

// GOOD: Break up heavy tasks
function heavyTask() {
  const data = new Array(1000000).fill(0);
  
  // Break into chunks
  let index = 0;
  function processChunk() {
    const chunk = data.slice(index, index + 1000);
    // Process chunk
    index += 1000;
    
    if (index < data.length) {
      setImmediate(processChunk);
    }
  }
  
  processChunk();
}

// BAD: Blocking the event loop
function blockingTask() {
  const start = Date.now();
  while (Date.now() - start < 1000) {
    // This blocks the event loop
  }
}
}

// 13. EVENT LOOP IN PRACTICAL APPLICATIONS
function practicalEventLoopExample() {
console.log('=== Practical Event Loop Example ===');

const express = require('express');
const app = express();

// Middleware that doesn't block
app.use((req, res, next) => {
  console.log(\`Request: \${req.method} \${req.url}\`);
  next();
});

// Non-blocking route handler
app.get('/api/users', async (req, res) => {
  try {
    // Simulate database query
    const users = await new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ]);
      }, 100);
    });
    
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Blocking route handler (BAD)
app.get('/api/blocking', (req, res) => {
  const start = Date.now();
  while (Date.now() - start < 2000) {
    // This blocks the event loop
  }
  res.json({ message: 'Blocking operation completed' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
}

// 14. EVENT LOOP MONITORING TOOLS
function eventLoopMonitoringTools() {
console.log('=== Event Loop Monitoring Tools ===');

// Built-in monitoring
const usage = process.cpuUsage();
const memory = process.memoryUsage();

console.log('CPU Usage:', usage);
console.log('Memory Usage:', memory);

// Custom monitoring
setInterval(() => {
  const usage = process.cpuUsage();
  const memory = process.memoryUsage();
  
  console.log(\`CPU: \${usage.user / 1000}ms user, \${usage.system / 1000}ms system\`);
  console.log(\`Memory: \${Math.round(memory.heapUsed / 1024 / 1024)}MB used\`);
}, 5000);
}

// 15. EVENT LOOP OPTIMIZATION
function eventLoopOptimization() {
console.log('=== Event Loop Optimization ===');

// Optimize with clustering
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(\`Master \${process.pid} is running\`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    cluster.fork(); // Replace dead worker
  });
} else {
  // Worker process
  console.log(\`Worker \${process.pid} started\`);
  
  // Worker can handle requests
  const http = require('http');
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World');
  }).listen(8000);
}
}`,
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
    },
    {
      input: `process.nextTick(() => console.log('nextTick'));
setImmediate(() => console.log('setImmediate'));
setTimeout(() => console.log('setTimeout'), 0);`,
      output: `nextTick
setImmediate
setTimeout`
    },
    {
      input: `const crypto = require('crypto');
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, key) => {
console.log('Thread pool task completed');
});`,
      output: `// Uses libuv thread pool for CPU-intensive task`
    }
  ],
  explanation: `**Event Pool, Event Loop, and Related Concepts** are fundamental to understanding how Node.js achieves asynchronous operations. Here's a comprehensive breakdown:

**1. Event Loop - The Core Mechanism**

The Event Loop is the heart of Node.js's asynchronous architecture:

**Event Loop Phases:**
1. **Timers**: Executes callbacks scheduled by setTimeout() and setInterval()
2. **Pending callbacks**: Executes I/O callbacks deferred to the next loop iteration
3. **Idle, prepare**: Used internally by Node.js
4. **Poll**: Retrieves new I/O events and executes I/O callbacks
5. **Check**: Executes setImmediate() callbacks
6. **Close callbacks**: Executes close event callbacks

**2. Event Pool vs Callback Queue**

**Event Pool (Microtask Queue):**
- **Higher Priority**: Executed before next event loop iteration
- **Includes**: Promises, process.nextTick(), queueMicrotask()
- **Execution**: All microtasks are processed before moving to next phase

**Callback Queue (Macrotask Queue):**
- **Lower Priority**: Executed in event loop phases
- **Includes**: setTimeout, setInterval, setImmediate, I/O callbacks
- **Execution**: One macrotask per event loop iteration

**3. Thread Pool (libuv)**

**Background Threads:**
- **4 threads by default** (configurable)
- **Handles CPU-intensive tasks**: File system operations, crypto, compression
- **Prevents blocking**: Keeps main thread free for other operations

**4. Priority Order**

**Execution Priority:**
1. **process.nextTick()**: Highest priority microtask
2. **Promise microtasks**: .then(), .catch(), .finally()
3. **setImmediate()**: Check phase callback
4. **setTimeout/setInterval**: Timer phase callback
5. **I/O callbacks**: Poll phase callbacks

**5. Event Emitter Pattern**

**Event-Driven Architecture:**
- **Event Emitters**: Built-in Node.js pattern
- **Event Listeners**: Respond to events asynchronously
- **Custom Events**: Application-specific events

**6. Event Loop Blocking**

**What Blocks the Event Loop:**
- **CPU-intensive operations**: Heavy calculations
- **Synchronous I/O**: Blocking file operations
- **Infinite loops**: Never-ending code execution
- **Large JSON parsing**: Synchronous data processing

**7. Worker Threads**

**CPU-Intensive Tasks:**
- **Separate threads**: Heavy computations in background
- **Message passing**: Communication between threads
- **Shared memory**: Efficient data sharing (optional)

**8. Event Loop Monitoring**

**Performance Tracking:**
- **Lag detection**: Monitor event loop delays
- **CPU usage**: Track process resource usage
- **Memory monitoring**: Watch for memory leaks

**9. Best Practices**

**Keep Event Loop Free:**
- **Use async I/O**: Always prefer asynchronous operations
- **Break up heavy tasks**: Use setImmediate() or process.nextTick()
- **Use worker threads**: For CPU-intensive operations
- **Monitor performance**: Track event loop lag

**10. Practical Applications**

**Web Servers:**
- **Concurrent connections**: Handle thousands simultaneously
- **Non-blocking I/O**: Efficient request processing
- **Real-time applications**: WebSocket, SSE support

**11. Performance Characteristics**

**Advantages:**
- **High concurrency**: Thousands of concurrent connections
- **Low memory usage**: Single process, shared memory
- **Fast startup**: No thread initialization overhead
- **Efficient I/O**: Non-blocking operations

**Considerations:**
- **CPU-intensive tasks**: May block event loop
- **Single point of failure**: One process handles everything
- **Memory limits**: Single process memory constraints
- **Debugging complexity**: Asynchronous code can be complex

**12. Event Loop Optimization**

**Clustering:**
- **Multiple processes**: Utilize all CPU cores
- **Load balancing**: Distribute requests across workers
- **Fault tolerance**: Auto-restart failed workers

**13. Monitoring Tools**

**Built-in Monitoring:**
- **process.cpuUsage()**: Track CPU usage
- **process.memoryUsage()**: Monitor memory consumption
- **Custom metrics**: Application-specific monitoring

**14. Common Patterns**

**Async/Await:**
- **Promise-based**: Cleaner than callbacks
- **Error handling**: Try-catch for async operations
- **Parallel execution**: Promise.all(), Promise.race()

**Event-Driven:**
- **Event emitters**: Built-in events and custom events
- **Event listeners**: Respond to events asynchronously
- **Event delegation**: Efficient event handling

**15. Real-World Impact**

**Scalability:**
- **Horizontal scaling**: Multiple Node.js processes
- **Vertical scaling**: Single process optimization
- **Load balancing**: Distribute load across instances

**Performance:**
- **Response time**: Faster request processing
- **Throughput**: Higher request handling capacity
- **Resource utilization**: Efficient CPU and memory usage

Understanding these concepts is crucial for building efficient Node.js applications and optimizing performance. The event loop, thread pool, and event-driven architecture work together to provide the non-blocking, asynchronous behavior that makes Node.js particularly well-suited for I/O-intensive applications.`
},
{
  id: 'nodejs-3',
  title: 'What are Exit Codes in Node.js',
  description: 'Understanding Node.js exit codes, their meanings, how to use them, and best practices for proper application termination and error handling.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// Node.js Exit Codes Overview

// 1. WHAT ARE EXIT CODES?
// Exit codes are numeric values returned by a process when it terminates
// They indicate whether the process completed successfully or encountered an error

// 2. STANDARD EXIT CODES

// Success codes
console.log('Success exit code:', 0); // 0 = Success

// Common error codes
const exitCodes = {
0: 'Success - No error occurred',
1: 'Uncaught Fatal Exception - Unhandled exception',
2: 'Unused - Reserved by Bash for builtin misuse',
3: 'Internal JavaScript Parse Error - Invalid JavaScript syntax',
4: 'Internal JavaScript Evaluation Failure - Invalid JavaScript code',
5: 'Fatal Error - V8 engine fatal error',
6: 'Non-function Internal Exception Handler - Uncaught exception',
7: 'Internal Exception Handler Run-Time Failure - Exception handler error',
8: 'Unused - Reserved by Node.js',
9: 'Invalid Argument - Invalid argument passed',
10: 'Internal JavaScript Run-Time Failure - JavaScript runtime error',
11: 'Invalid Debug Argument - Invalid debug argument',
12: 'Signal Exits - Process terminated by signal',
13: 'Unfinished Top-Level Await - Top-level await not resolved',
14: 'Unused - Reserved by Node.js',
15: 'Unused - Reserved by Node.js'
};

// 3. CUSTOM EXIT CODES

// Define custom exit codes for your application
const CUSTOM_EXIT_CODES = {
CONFIG_ERROR: 100,
DATABASE_ERROR: 101,
NETWORK_ERROR: 102,
VALIDATION_ERROR: 103,
AUTHENTICATION_ERROR: 104
};

// 4. USING EXIT CODES

// Method 1: process.exit()
console.log('Starting application...');

// Simulate an error condition
const hasError = true;

if (hasError) {
console.error('Application error occurred');
process.exit(1); // Exit with error code 1
}

// Method 2: process.exitCode (set exit code without exiting)
process.exitCode = 5; // Will exit with code 5 when process ends

// Method 3: Throwing uncaught exceptions
// This will cause exit code 1
// throw new Error('Uncaught exception');

// 5. PRACTICAL EXAMPLES

// Example 1: Configuration validation
function validateConfig() {
const config = {
  port: process.env.PORT,
  database: process.env.DATABASE_URL
};

if (!config.port) {
  console.error('PORT environment variable is required');
  process.exit(CUSTOM_EXIT_CODES.CONFIG_ERROR);
}

if (!config.database) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(CUSTOM_EXIT_CODES.CONFIG_ERROR);
}

return config;
}

// Example 2: Database connection
async function connectDatabase() {
try {
  // Simulate database connection
  const isConnected = Math.random() > 0.5;
  
  if (!isConnected) {
    throw new Error('Database connection failed');
  }
  
  console.log('Database connected successfully');
} catch (error) {
  console.error('Database error:', error.message);
  process.exit(CUSTOM_EXIT_CODES.DATABASE_ERROR);
}
}

// Example 3: Graceful shutdown
process.on('SIGINT', () => {
console.log('\\nReceived SIGINT. Shutting down gracefully...');

// Cleanup operations
cleanup();

// Exit with success code
process.exit(0);
});

process.on('SIGTERM', () => {
console.log('\\nReceived SIGTERM. Shutting down gracefully...');

// Cleanup operations
cleanup();

// Exit with success code
process.exit(0);
});

function cleanup() {
console.log('Performing cleanup operations...');
// Close database connections, file handles, etc.
}

// 6. EXIT CODE HANDLING IN SCRIPTS

// package.json script example
const packageJsonScripts = {
"scripts": {
  "start": "node app.js",
  "test": "node test.js",
  "build": "node build.js"
}
};

// Shell script to check exit codes
const shellScript = \`
#!/bin/bash
node app.js
if [ $? -eq 0 ]; then
  echo "Application exited successfully"
else
  echo "Application failed with exit code $?"
fi
\`;

// 7. TESTING EXIT CODES

// Test script to demonstrate different exit codes
function testExitCodes() {
const testCases = [
  { name: 'Success', code: 0, condition: true },
  { name: 'Config Error', code: 100, condition: false },
  { name: 'Database Error', code: 101, condition: Math.random() > 0.7 }
];

for (const test of testCases) {
  if (!test.condition) {
    console.error(\`Test failed: \${test.name}\`);
    process.exit(test.code);
  }
}

console.log('All tests passed');
process.exit(0);
}

// 8. EXIT CODE BEST PRACTICES

// Best Practice 1: Use descriptive exit codes
const EXIT_CODES = {
SUCCESS: 0,
INVALID_ARGUMENTS: 1,
CONFIGURATION_ERROR: 2,
DATABASE_CONNECTION_ERROR: 3,
NETWORK_ERROR: 4,
PERMISSION_ERROR: 5,
VALIDATION_ERROR: 6
};

// Best Practice 2: Log exit codes
function exitWithCode(code, message) {
console.error(\`Exiting with code \${code}: \${message}\`);
process.exit(code);
}

// Best Practice 3: Handle cleanup before exit
function gracefulExit(code) {
console.log('Performing cleanup...');

// Close database connections
// Clear timers
// Close file handles

console.log('Cleanup completed');
process.exit(code);
}

// 9. MONITORING EXIT CODES

// Example: Process monitoring
const childProcess = require('child_process');

const child = childProcess.spawn('node', ['worker.js']);

child.on('close', (code) => {
console.log(\`Child process exited with code \${code}\`);

switch (code) {
  case 0:
    console.log('Worker completed successfully');
    break;
  case 1:
    console.log('Worker encountered a fatal error');
    break;
  case 100:
    console.log('Worker configuration error');
    break;
  default:
    console.log(\`Worker exited with unknown code: \${code}\`);
}
});

// 10. EXIT CODE DOCUMENTATION

const exitCodeDocumentation = {
'Standard Codes': {
  0: 'Success',
  1: 'Uncaught Fatal Exception',
  2: 'Unused (Bash builtin misuse)',
  3: 'Internal JavaScript Parse Error',
  4: 'Internal JavaScript Evaluation Failure',
  5: 'Fatal Error (V8)',
  6: 'Non-function Internal Exception Handler',
  7: 'Internal Exception Handler Run-Time Failure',
  8: 'Unused (Node.js reserved)',
  9: 'Invalid Argument',
  10: 'Internal JavaScript Run-Time Failure',
  11: 'Invalid Debug Argument',
  12: 'Signal Exits',
  13: 'Unfinished Top-Level Await',
  14: 'Unused (Node.js reserved)',
  15: 'Unused (Node.js reserved)'
},
'Custom Codes (100+)': {
  100: 'Configuration Error',
  101: 'Database Error',
  102: 'Network Error',
  103: 'Validation Error',
  104: 'Authentication Error'
}
};`,
  testCases: [
    { 
      input: `console.log('Success');
process.exit(0);`, 
      output: `Success` 
    },
    {
      input: `const exitCodes = {
SUCCESS: 0,
ERROR: 1,
CONFIG_ERROR: 100
};
console.log(exitCodes.SUCCESS);`,
      output: `0`
    },
    {
      input: `process.exitCode = 5;
console.log('Exit code set to:', process.exitCode);`,
      output: `Exit code set to: 5`
    }
  ],
  explanation: `**Exit codes in Node.js** are numeric values that indicate how a process terminated. They are crucial for:

**Standard Exit Codes (0-15):**
- **0**: Success - No error occurred
- **1**: Uncaught Fatal Exception - Most common error code
- **2**: Unused (reserved by Bash)
- **3**: Internal JavaScript Parse Error - Syntax errors
- **4**: Internal JavaScript Evaluation Failure - Runtime errors
- **5**: Fatal Error - V8 engine errors
- **6-15**: Various internal Node.js errors

**Custom Exit Codes (100+):**
- **100+**: Available for application-specific errors
- Common custom codes: 100 (config error), 101 (database error), 102 (network error)

**How to Use Exit Codes:**

1. **process.exit(code)**: Immediately terminate with specific code
2. **process.exitCode**: Set exit code without terminating
3. **Uncaught exceptions**: Automatically exit with code 1
4. **Signal handlers**: Handle SIGINT/SIGTERM for graceful shutdown

**Best Practices:**
- Use 0 for success, non-zero for errors
- Document custom exit codes (100+)
- Handle cleanup before exit
- Log exit codes for debugging
- Use descriptive error codes for different failure types

**Real-world Usage:**
- **CI/CD pipelines**: Check exit codes to determine build success
- **Process monitoring**: Track application health
- **Error handling**: Provide specific error information
- **Graceful shutdown**: Clean up resources before exit

**Why Exit Codes Matter:**
- Enable automated error detection and handling
- Improve debugging and troubleshooting
- Allow proper integration with external systems
- Provide clear success/failure indicators
- Essential for production monitoring and alerting

Understanding exit codes is fundamental for building robust Node.js applications that can be properly monitored, debugged, and integrated with other systems.`
},
{
  id: 'nodejs-4',
  title: 'Uncaught Failures and Exceptional Errors in Node.js',
  description: 'Understanding uncaught exceptions, error handling strategies, process crashes, and best practices for managing exceptional errors in Node.js applications.',
  difficulty: 'Hard',
  category: 'nodejs',
  solution: `// Uncaught Failures and Exceptional Errors in Node.js

// 1. WHAT ARE UNCAUGHT EXCEPTIONS?
// Uncaught exceptions are errors that are not handled by try-catch blocks
// They cause the Node.js process to crash with exit code 1

// 2. TYPES OF UNCAUGHT EXCEPTIONS

// Synchronous uncaught exceptions
function synchronousError() {
// This will crash the process
throw new Error('Synchronous uncaught exception');
}

// Asynchronous uncaught exceptions
function asynchronousError() {
// This will also crash the process
setTimeout(() => {
  throw new Error('Asynchronous uncaught exception');
}, 1000);
}

// Promise rejections (unhandled)
function unhandledPromiseRejection() {
// This will cause an unhandled promise rejection
Promise.reject(new Error('Unhandled promise rejection'));
}

// 3. HANDLING UNCAUGHT EXCEPTIONS

// Method 1: process.on('uncaughtException')
process.on('uncaughtException', (error) => {
console.error('Uncaught Exception:', error.message);
console.error('Stack trace:', error.stack);

// Log the error
console.error('Process will exit in 5 seconds...');

// Graceful shutdown
setTimeout(() => {
  process.exit(1);
}, 5000);
});

// Method 2: process.on('unhandledRejection')
process.on('unhandledRejection', (reason, promise) => {
console.error('Unhandled Rejection at:', promise);
console.error('Reason:', reason);

// Don't exit immediately, just log
console.error('Application continues running...');
});

// Method 3: Domain-based error handling (deprecated but still works)
const domain = require('domain');

const d = domain.create();
d.on('error', (error) => {
console.error('Domain caught error:', error.message);
// Handle the error gracefully
});

d.run(() => {
// Code that might throw errors
throw new Error('Domain error');
});

// 4. PREVENTING UNCAUGHT EXCEPTIONS

// Always wrap async operations in try-catch
async function safeAsyncOperation() {
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  console.error('Caught async error:', error.message);
  // Handle the error appropriately
  return null;
}
}

// Handle promise rejections
function safePromiseOperation() {
return riskyPromise()
  .then(result => {
    return result;
  })
  .catch(error => {
    console.error('Caught promise error:', error.message);
    // Handle the error appropriately
    return null;
  });
}

// 5. ERROR HANDLING PATTERNS

// Pattern 1: Express.js error handling
const express = require('express');
const app = express();

// Error handling middleware
app.use((error, req, res, next) => {
console.error('Express error:', error.message);

// Log error details
console.error('Stack:', error.stack);
console.error('URL:', req.url);
console.error('Method:', req.method);

// Send appropriate response
res.status(500).json({
  error: 'Internal Server Error',
  message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
});
});

// Pattern 2: Async error wrapper
function asyncHandler(fn) {
return (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
}

// Usage
app.get('/api/data', asyncHandler(async (req, res) => {
const data = await fetchData();
res.json(data);
}));

// Pattern 3: Process monitoring
let uncaughtExceptionCount = 0;
const MAX_CRASHES = 5;

process.on('uncaughtException', (error) => {
uncaughtExceptionCount++;

console.error(\`Uncaught Exception #\${uncaughtExceptionCount}:\`, error.message);

if (uncaughtExceptionCount >= MAX_CRASHES) {
  console.error('Too many crashes, exiting permanently');
  process.exit(1);
}

// Restart the application or specific service
console.log('Restarting application...');
});

// 6. DEBUGGING UNCAUGHT EXCEPTIONS

// Enable source maps for better stack traces
// require('source-map-support').install();

// Enhanced error logging
process.on('uncaughtException', (error) => {
const errorInfo = {
  message: error.message,
  stack: error.stack,
  timestamp: new Date().toISOString(),
  processId: process.pid,
  memoryUsage: process.memoryUsage(),
  uptime: process.uptime()
};

console.error('Detailed error info:', JSON.stringify(errorInfo, null, 2));

// Send to external logging service
// sendToLoggingService(errorInfo);
});

// 7. RECOVERY STRATEGIES

// Strategy 1: Graceful degradation
process.on('uncaughtException', (error) => {
console.error('Critical error:', error.message);

// Close database connections
// closeDatabaseConnections();

// Save any pending data
// savePendingData();

// Notify monitoring systems
// notifyMonitoring(error);

// Exit gracefully
process.exit(1);
});

// Strategy 2: Restart specific modules
let moduleRestartCount = 0;

process.on('uncaughtException', (error) => {
if (error.message.includes('database')) {
  console.log('Database error detected, restarting database module...');
  // restartDatabaseModule();
} else if (error.message.includes('network')) {
  console.log('Network error detected, restarting network module...');
  // restartNetworkModule();
} else {
  console.error('Unknown error, exiting...');
  process.exit(1);
}
});

// Strategy 3: Circuit breaker pattern
class CircuitBreaker {
constructor() {
  this.failureCount = 0;
  this.lastFailureTime = null;
  this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
}

call(fn) {
  if (this.state === 'OPEN') {
    if (Date.now() - this.lastFailureTime > 60000) { // 1 minute
      this.state = 'HALF_OPEN';
    } else {
      throw new Error('Circuit breaker is OPEN');
    }
  }
  
  try {
    const result = fn();
    this.onSuccess();
    return result;
  } catch (error) {
    this.onFailure();
    throw error;
  }
}

onSuccess() {
  this.failureCount = 0;
  this.state = 'CLOSED';
}

onFailure() {
  this.failureCount++;
  this.lastFailureTime = Date.now();
  
  if (this.failureCount >= 5) {
    this.state = 'OPEN';
  }
}
}

// 8. MONITORING AND ALERTING

// Custom error monitoring
class ErrorMonitor {
constructor() {
  this.errorCount = 0;
  this.lastErrorTime = null;
  this.errorThreshold = 10;
  this.timeWindow = 60000; // 1 minute
}

recordError(error) {
  this.errorCount++;
  this.lastErrorTime = Date.now();
  
  // Check if we should alert
  if (this.shouldAlert()) {
    this.sendAlert(error);
  }
}

shouldAlert() {
  return this.errorCount >= this.errorThreshold &&
         (Date.now() - this.lastErrorTime) < this.timeWindow;
}

sendAlert(error) {
  console.error('ALERT: High error rate detected!');
  console.error('Error count:', this.errorCount);
  console.error('Last error:', error.message);
  
  // Send to external monitoring service
  // sendToMonitoringService({
  //   type: 'HIGH_ERROR_RATE',
  //   errorCount: this.errorCount,
  //   lastError: error.message
  // });
}

reset() {
  this.errorCount = 0;
  this.lastErrorTime = null;
}
}

const errorMonitor = new ErrorMonitor();

process.on('uncaughtException', (error) => {
errorMonitor.recordError(error);

// Continue with normal error handling
console.error('Uncaught Exception:', error.message);
process.exit(1);
});

// 9. BEST PRACTICES

// Best Practice 1: Always handle promises
Promise.resolve()
.then(() => {
  throw new Error('Promise error');
})
.catch(error => {
  console.error('Handled promise error:', error.message);
});

// Best Practice 2: Use async/await with try-catch
async function safeFunction() {
try {
  const result = await riskyAsyncOperation();
  return result;
} catch (error) {
  console.error('Handled async error:', error.message);
  // Handle appropriately
  return null;
}
}

// Best Practice 3: Validate inputs
function validateInput(input) {
if (!input) {
  throw new Error('Input is required');
}

if (typeof input !== 'string') {
  throw new Error('Input must be a string');
}

return input;
}

// Best Practice 4: Use error boundaries
function withErrorBoundary(fn) {
return (...args) => {
  try {
    return fn(...args);
  } catch (error) {
    console.error('Error boundary caught:', error.message);
    // Handle gracefully
    return null;
  }
};
}

// 10. COMMON UNCAUGHT EXCEPTION SCENARIOS

// Scenario 1: Undefined variable
// const undefinedVariable = someUndefinedVariable; // This will crash

// Scenario 2: JSON parse error
function parseJSON(jsonString) {
try {
  return JSON.parse(jsonString);
} catch (error) {
  console.error('JSON parse error:', error.message);
  return null;
}
}

// Scenario 3: File system errors
const fs = require('fs');

function readFileSafely(filename) {
try {
  return fs.readFileSync(filename, 'utf8');
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('File not found:', filename);
  } else {
    console.error('File read error:', error.message);
  }
  return null;
}
}

// Scenario 4: Network errors
const http = require('http');

function makeRequest(url) {
return new Promise((resolve, reject) => {
  const req = http.request(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve(data));
  });
  
  req.on('error', (error) => {
    console.error('Network error:', error.message);
    reject(error);
  });
  
  req.end();
});
}`,
  testCases: [
    { 
      input: `try {
throw new Error('Test error');
} catch (error) {
console.log('Caught:', error.message);
}`, 
      output: `Caught: Test error` 
    },
    {
      input: `process.on('uncaughtException', (error) => {
console.log('Uncaught:', error.message);
});
throw new Error('Uncaught test');`,
      output: `Uncaught: Uncaught test`
    },
    {
      input: `Promise.reject(new Error('Promise error'))
.catch(error => console.log('Handled:', error.message));`,
      output: `Handled: Promise error`
    }
  ],
  explanation: `**Uncaught failures and exceptional errors** in Node.js are critical issues that can crash your application. Understanding how to handle them is essential for building robust applications.

**Types of Uncaught Exceptions:**

1. **Synchronous Exceptions**: Errors thrown in synchronous code without try-catch
2. **Asynchronous Exceptions**: Errors in callbacks, timers, or event handlers
3. **Unhandled Promise Rejections**: Promise rejections without .catch() handlers
4. **Process-level Errors**: System-level errors that affect the entire process

**Key Handling Strategies:**

1. **process.on('uncaughtException')**: Catch all uncaught exceptions
2. **process.on('unhandledRejection')**: Handle unhandled promise rejections
3. **Domain-based handling**: Isolate error contexts (deprecated but functional)
4. **Error boundaries**: Wrap risky operations in error handlers

**Prevention Techniques:**

- **Always use try-catch** for synchronous operations
- **Handle promise rejections** with .catch() or try-catch with async/await
- **Validate inputs** before processing
- **Use error boundaries** for critical operations
- **Implement circuit breakers** for external dependencies

**Recovery Strategies:**

1. **Graceful degradation**: Continue with reduced functionality
2. **Module restart**: Restart specific failed modules
3. **Process restart**: Restart the entire application
4. **Circuit breaker**: Temporarily disable failing operations

**Monitoring and Alerting:**

- **Track error rates** and patterns
- **Set up alerts** for high error frequencies
- **Log detailed error information** for debugging
- **Monitor process health** and restart when necessary

**Best Practices:**

- **Never ignore uncaught exceptions** - always handle them
- **Log errors appropriately** with context and stack traces
- **Implement graceful shutdown** procedures
- **Use external monitoring** services for production
- **Test error scenarios** thoroughly
- **Document error handling** procedures

**Why This Matters:**

- **Prevents application crashes** and data loss
- **Improves user experience** with graceful error handling
- **Enables proper debugging** and troubleshooting
- **Supports high availability** and reliability
- **Essential for production applications** and monitoring

Understanding uncaught failures and exceptional errors is crucial for building production-ready Node.js applications that can handle failures gracefully and maintain high availability.`
},
{
  id: 'nodejs-5',
  title: 'Major Steps to Optimize Performance of Node.js App for High Volume',
  description: 'Understanding comprehensive performance optimization strategies for Node.js applications handling large volumes of traffic, including profiling, caching, database optimization, and scaling techniques.',
  difficulty: 'Hard',
  category: 'nodejs',
  solution: `// Major Steps to Optimize Node.js App Performance for High Volume

// 1. PERFORMANCE PROFILING AND MONITORING

// Use built-in profiler
const profiler = require('v8-profiler-next');

// Start profiling
profiler.startProfiling('CPU Profile');

// Stop profiling after some time
setTimeout(() => {
const profile = profiler.stopProfiling();
profile.export((error, result) => {
  require('fs').writeFileSync('./profile.cpuprofile', result);
  profile.delete();
});
}, 30000);

// Memory profiling
const heapProfiler = require('v8-profiler-next');
heapProfiler.startProfiling('Heap Profile');

setTimeout(() => {
const profile = heapProfiler.stopProfiling();
profile.export((error, result) => {
  require('fs').writeFileSync('./profile.heapprofile', result);
  profile.delete();
});
}, 30000);

// 2. CODE OPTIMIZATION

// Optimize 1: Avoid blocking operations
// BAD - Blocking
function blockingOperation() {
const result = require('crypto').randomBytes(1000000); // Blocks event loop
return result;
}

// GOOD - Non-blocking
function nonBlockingOperation() {
return new Promise((resolve) => {
  setImmediate(() => {
    const result = require('crypto').randomBytes(1000000);
    resolve(result);
  });
});
}

// Optimize 2: Use worker threads for CPU-intensive tasks
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
// Main thread
function heavyComputation(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: data
    });
    
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(\`Worker stopped with exit code \${code}\`));
    });
  });
}
} else {
// Worker thread
const result = performHeavyComputation(workerData);
parentPort.postMessage(result);
}

// Optimize 3: Optimize loops and data structures
// BAD - Inefficient array operations
function inefficientArrayOps() {
const arr = [];
for (let i = 0; i < 1000000; i++) {
  arr.push(i); // Resizes array multiple times
}
return arr;
}

// GOOD - Pre-allocate array
function efficientArrayOps() {
const arr = new Array(1000000);
for (let i = 0; i < 1000000; i++) {
  arr[i] = i; // No resizing
}
return arr;
}

// 3. CACHING STRATEGIES

// In-memory caching with LRU
const LRU = require('lru-cache');

const cache = new LRU({
max: 500, // Maximum number of items
maxAge: 1000 * 60 * 5, // 5 minutes
updateAgeOnGet: true
});

function getCachedData(key) {
let data = cache.get(key);
if (!data) {
  data = fetchDataFromDatabase(key);
  cache.set(key, data);
}
return data;
}

// Redis caching
const redis = require('redis');
const client = redis.createClient();

async function getCachedUser(userId) {
const cached = await client.get(\`user:\${userId}\`);
if (cached) {
  return JSON.parse(cached);
}

const user = await fetchUserFromDatabase(userId);
await client.setex(\`user:\${userId}\`, 3600, JSON.stringify(user)); // 1 hour TTL
return user;
}

// 4. DATABASE OPTIMIZATION

// Connection pooling
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
host: 'localhost',
user: 'user',
password: 'password',
database: 'mydb',
connectionLimit: 20, // Optimize based on your needs
acquireTimeout: 60000,
timeout: 60000,
reconnect: true
});

// Optimized queries with indexing
async function getOptimizedUsers() {
const [rows] = await pool.execute(
  'SELECT id, name, email FROM users WHERE status = ? LIMIT 1000',
  ['active']
);
return rows;
}

// Batch operations
async function batchInsertUsers(users) {
const values = users.map(user => [user.name, user.email, user.status]);
const [result] = await pool.execute(
  'INSERT INTO users (name, email, status) VALUES ?',
  [values]
);
return result;
}

// 5. ASYNC/AWAIT OPTIMIZATION

// Parallel execution
async function parallelOperations() {
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
]);

return { users, posts, comments };
}

// Sequential vs Parallel
// BAD - Sequential
async function sequentialOps() {
const user = await fetchUser(1);
const posts = await fetchPosts(user.id);
const comments = await fetchComments(posts[0].id);
return { user, posts, comments };
}

// GOOD - Parallel where possible
async function parallelOps() {
const user = await fetchUser(1);
const [posts, comments] = await Promise.all([
  fetchPosts(user.id),
  fetchComments(user.id)
]);
return { user, posts, comments };
}

// 6. MEMORY OPTIMIZATION

// Stream processing for large files
const fs = require('fs');
const csv = require('csv-parser');

function processLargeFile(filename) {
return new Promise((resolve, reject) => {
  const results = [];
  
  fs.createReadStream(filename)
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
      // Process in chunks to avoid memory issues
      if (results.length >= 1000) {
        processChunk(results.splice(0, 1000));
      }
    })
    .on('end', () => {
      if (results.length > 0) {
        processChunk(results);
      }
      resolve();
    })
    .on('error', reject);
});
}

// Garbage collection optimization
const v8 = require('v8');

// Set memory limits
v8.setFlagsFromString('--max_old_space_size=4096'); // 4GB heap

// Monitor memory usage
setInterval(() => {
const memUsage = process.memoryUsage();
console.log('Memory usage:', {
  rss: Math.round(memUsage.rss / 1024 / 1024) + ' MB',
  heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + ' MB',
  heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + ' MB'
});
}, 30000);

// 7. NETWORK OPTIMIZATION

// HTTP/2 for better performance
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
key: fs.readFileSync('key.pem'),
cert: fs.readFileSync('cert.pem')
});

server.on('stream', (stream, headers) => {
stream.respond({
  'content-type': 'application/json',
  ':status': 200
});

stream.end(JSON.stringify({ message: 'Hello HTTP/2!' }));
});

// Compression middleware
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression({
level: 6, // Balance between compression and CPU usage
threshold: 1024, // Only compress responses > 1KB
filter: (req, res) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
}
}));

// 8. LOAD BALANCING AND CLUSTERING

// Built-in clustering
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
console.log(\`Master \${process.pid} is running\`);

// Fork workers
for (let i = 0; i < numCPUs; i++) {
  cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
  console.log(\`Worker \${worker.process.pid} died\`);
  // Replace the dead worker
  cluster.fork();
});
} else {
// Worker process
require('./app.js');
}

// PM2 for process management
const pm2Config = {
apps: [{
  name: 'my-app',
  script: 'app.js',
  instances: 'max', // Use all CPU cores
  exec_mode: 'cluster',
  max_memory_restart: '1G',
  env: {
    NODE_ENV: 'production'
  }
}]
};

// 9. MONITORING AND METRICS

// Application metrics
const prometheus = require('prom-client');
const register = new prometheus.Registry();

// HTTP request duration histogram
const httpRequestDuration = new prometheus.Histogram({
name: 'http_request_duration_seconds',
help: 'Duration of HTTP requests in seconds',
labelNames: ['method', 'route', 'status_code'],
buckets: [0.1, 0.5, 1, 2, 5]
});

register.registerMetric(httpRequestDuration);

// Custom metrics
const activeConnections = new prometheus.Gauge({
name: 'active_connections',
help: 'Number of active connections'
});

// 10. MICROSERVICES OPTIMIZATION

// Service discovery and load balancing
const consul = require('consul')();

// Register service
consul.agent.service.register({
name: 'my-service',
port: 3000,
check: {
  http: 'http://localhost:3000/health',
  interval: '10s'
}
});

// Circuit breaker pattern
const CircuitBreaker = require('opossum');

const breaker = new CircuitBreaker(asyncFunction, {
timeout: 3000,
errorThresholdPercentage: 50,
resetTimeout: 30000
});

// 11. CONFIGURATION OPTIMIZATION

// Environment-specific configs
const config = {
development: {
  poolSize: 10,
  cacheTTL: 300,
  compression: false
},
production: {
  poolSize: 50,
  cacheTTL: 3600,
  compression: true,
  cluster: true
}
}[process.env.NODE_ENV || 'development'];

// 12. PERFORMANCE TESTING

// Load testing with Artillery
const artilleryConfig = {
config: {
  target: 'http://localhost:3000',
  phases: [
    { duration: 60, arrivalRate: 10 },
    { duration: 120, arrivalRate: 50 },
    { duration: 60, arrivalRate: 100 }
  ]
},
scenarios: [
  {
    name: 'API endpoints',
    requests: [
      { get: { url: '/api/users' } },
      { get: { url: '/api/posts' } }
    ]
  }
]
};

// 13. OPTIMIZATION CHECKLIST

const optimizationChecklist = {
'Code Level': [
  'Use async/await instead of callbacks',
  'Implement proper error handling',
  'Avoid blocking operations',
  'Use worker threads for CPU-intensive tasks',
  'Optimize loops and data structures'
],
'Caching': [
  'Implement in-memory caching (LRU)',
  'Use Redis for distributed caching',
  'Cache database queries',
  'Implement CDN for static assets'
],
'Database': [
  'Use connection pooling',
  'Optimize queries with proper indexing',
  'Implement batch operations',
  'Use read replicas for read-heavy workloads'
],
'Infrastructure': [
  'Use load balancers',
  'Implement horizontal scaling',
  'Use CDN for static content',
  'Optimize server configurations'
],
'Monitoring': [
  'Implement application metrics',
  'Set up alerting',
  'Monitor resource usage',
  'Track performance bottlenecks'
]
};

// 14. PERFORMANCE MONITORING DASHBOARD

class PerformanceMonitor {
constructor() {
  this.metrics = {
    requests: 0,
    errors: 0,
    responseTime: [],
    memoryUsage: [],
    cpuUsage: []
  };
}

recordRequest(duration, success) {
  this.metrics.requests++;
  this.metrics.responseTime.push(duration);
  
  if (!success) {
    this.metrics.errors++;
  }
  
  // Keep only last 1000 measurements
  if (this.metrics.responseTime.length > 1000) {
    this.metrics.responseTime.shift();
  }
}

getStats() {
  const avgResponseTime = this.metrics.responseTime.reduce((a, b) => a + b, 0) / this.metrics.responseTime.length;
  const errorRate = (this.metrics.errors / this.metrics.requests) * 100;
  
  return {
    totalRequests: this.metrics.requests,
    errorRate: errorRate.toFixed(2) + '%',
    avgResponseTime: avgResponseTime.toFixed(2) + 'ms',
    memoryUsage: process.memoryUsage()
  };
}
}

const monitor = new PerformanceMonitor();

// Middleware to record metrics
app.use((req, res, next) => {
const start = Date.now();

res.on('finish', () => {
  const duration = Date.now() - start;
  const success = res.statusCode < 400;
  monitor.recordRequest(duration, success);
});

next();
});`,
  testCases: [
    { 
      input: `const cache = new Map();
function getCachedData(key) {
if (cache.has(key)) {
  return cache.get(key);
}
const data = fetchData(key);
cache.set(key, data);
return data;
}`, 
      output: `// Caching implementation for performance optimization` 
    },
    {
      input: `async function parallelFetch() {
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);
return { users, posts };
}`,
      output: `// Parallel execution for better performance`
    },
    {
      input: `const pool = mysql.createPool({
connectionLimit: 20,
acquireTimeout: 60000
});`,
      output: `// Database connection pooling configuration`
    }
  ],
  explanation: `**Performance optimization for high-volume Node.js applications** requires a comprehensive approach across multiple layers. Here are the major steps:

**1. Performance Profiling and Monitoring:**
- Use V8 profiler to identify bottlenecks
- Monitor CPU, memory, and I/O usage
- Set up real-time performance dashboards
- Track key metrics like response time, throughput, error rates

**2. Code-Level Optimizations:**
- **Avoid blocking operations** in the event loop
- **Use worker threads** for CPU-intensive tasks
- **Optimize data structures** and algorithms
- **Implement proper async/await** patterns
- **Use parallel execution** where possible

**3. Caching Strategies:**
- **In-memory caching** with LRU eviction
- **Redis caching** for distributed systems
- **Database query caching**
- **CDN for static assets**
- **Application-level caching** for frequently accessed data

**4. Database Optimization:**
- **Connection pooling** to reuse connections
- **Query optimization** with proper indexing
- **Batch operations** for bulk data processing
- **Read replicas** for read-heavy workloads
- **Database sharding** for horizontal scaling

**5. Memory Management:**
- **Stream processing** for large files
- **Garbage collection optimization**
- **Memory leak detection** and prevention
- **Efficient data structures**
- **Memory usage monitoring**

**6. Network Optimization:**
- **HTTP/2** for multiplexing and compression
- **Response compression** (gzip, brotli)
- **Connection pooling** for external APIs
- **Load balancing** across multiple servers
- **CDN implementation**

**7. Scaling Strategies:**
- **Horizontal scaling** with clustering
- **Load balancing** with nginx/HAProxy
- **Microservices architecture**
- **Container orchestration** (Docker, Kubernetes)
- **Auto-scaling** based on metrics

**8. Infrastructure Optimization:**
- **Server configuration** tuning
- **Network optimization**
- **Storage optimization** (SSDs, RAID)
- **Cloud provider optimization**
- **Geographic distribution**

**9. Monitoring and Alerting:**
- **Application performance monitoring** (APM)
- **Real-time metrics** collection
- **Automated alerting** for performance issues
- **Log aggregation** and analysis
- **Performance regression** detection

**10. Testing and Validation:**
- **Load testing** with tools like Artillery
- **Stress testing** to find breaking points
- **Performance regression** testing
- **A/B testing** for optimization validation
- **Continuous performance** monitoring

**Key Performance Metrics to Track:**
- **Response time** (p50, p95, p99)
- **Throughput** (requests per second)
- **Error rate** and availability
- **Resource utilization** (CPU, memory, I/O)
- **Database performance** metrics

**Best Practices for High Volume:**
- **Start with profiling** to identify bottlenecks
- **Optimize the critical path** first
- **Implement caching** at multiple levels
- **Use async operations** everywhere possible
- **Monitor everything** in production
- **Plan for horizontal scaling** from the start
- **Test at scale** before deployment
- **Implement circuit breakers** for external dependencies
- **Use connection pooling** for all external services
- **Optimize for the 95th percentile** response times

**Why Performance Optimization Matters:**
- **User experience** and satisfaction
- **Cost reduction** through efficient resource usage
- **Scalability** to handle growth
- **Competitive advantage** in the market
- **Reliability** and availability
- **SEO benefits** from faster loading times

Performance optimization is an ongoing process that requires continuous monitoring, testing, and refinement to maintain optimal performance as your application scales.`
},
{
  id: 'nodejs-6',
  title: 'What is Child Process, How to Create Child Process and What is Significant About Child Process',
  description: 'Understanding child processes in Node.js, different methods to create them, their significance in handling CPU-intensive tasks, and best practices for process management.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// Child Processes in Node.js

// 1. WHAT IS A CHILD PROCESS?
// A child process is a separate process created by the parent Node.js process
// It runs independently and can execute different code, handle CPU-intensive tasks
// and communicate with the parent process through IPC (Inter-Process Communication)

// 2. WHY USE CHILD PROCESSES?

// Problem: Node.js is single-threaded
function cpuIntensiveTask() {
let result = 0;
for (let i = 0; i < 1000000000; i++) {
  result += Math.sqrt(i);
}
return result;
}

// This blocks the event loop for a long time
// console.log(cpuIntensiveTask()); // Blocks everything

// Solution: Use child process
// This allows the main process to continue handling other requests

// 3. METHODS TO CREATE CHILD PROCESSES

// Method 1: spawn() - Most flexible, streams data
const { spawn } = require('child_process');

function createSpawnProcess() {
// Spawn a new process
const child = spawn('node', ['worker.js'], {
  stdio: ['pipe', 'pipe', 'pipe'] // stdin, stdout, stderr
});

// Send data to child process
child.stdin.write('Hello from parent\\n');
child.stdin.end();

// Receive data from child process
child.stdout.on('data', (data) => {
  console.log('Child output:', data.toString());
});

child.stderr.on('data', (data) => {
  console.error('Child error:', data.toString());
});

// Handle process completion
child.on('close', (code) => {
  console.log(\`Child process exited with code \${code}\`);
});

return child;
}

// Method 2: exec() - Simpler, buffers output
const { exec } = require('child_process');

function createExecProcess() {
exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  if (stderr) {
    console.error('Stderr:', stderr);
    return;
  }
  console.log('Stdout:', stdout);
});
}

// Method 3: execFile() - Execute files directly
const { execFile } = require('child_process');

function createExecFileProcess() {
execFile('node', ['worker.js'], (error, stdout, stderr) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Output:', stdout);
});
}

// Method 4: fork() - Specialized for Node.js processes
const { fork } = require('child_process');

function createForkProcess() {
// Fork creates a new Node.js process
const child = fork('./worker.js', ['arg1', 'arg2'], {
  silent: false, // Inherit parent's stdio
  execArgv: ['--max-old-space-size=4096'] // Pass Node.js options
});

// Send message to child
child.send({ type: 'task', data: 'process this data' });

// Receive message from child
child.on('message', (message) => {
  console.log('Message from child:', message);
});

// Handle process events
child.on('exit', (code, signal) => {
  console.log(\`Child exited with code \${code} and signal \${signal}\`);
});

child.on('error', (error) => {
  console.error('Child process error:', error);
});

return child;
}

// 4. WORKER.JS EXAMPLE (Child Process File)
// This would be in a separate file called worker.js

/*
const { parentPort } = require('worker_threads');

// Receive message from parent
parentPort.on('message', (message) => {
console.log('Worker received:', message);

// Do some work
const result = heavyComputation(message.data);

// Send result back to parent
parentPort.postMessage({
  type: 'result',
  data: result
});
});

function heavyComputation(data) {
let result = 0;
for (let i = 0; i < 1000000; i++) {
  result += Math.sqrt(i);
}
return result;
}
*/

// 5. PRACTICAL EXAMPLES

// Example 1: CPU-intensive task in child process
function runCPUIntensiveTask() {
const child = fork('./cpuWorker.js');

child.send({ task: 'compute', data: 1000000 });

child.on('message', (result) => {
  console.log('Computation result:', result);
  child.kill(); // Terminate child process
});
}

// Example 2: File processing with spawn
function processLargeFile(filename) {
const child = spawn('grep', ['error', filename]);

let output = '';

child.stdout.on('data', (data) => {
  output += data.toString();
});

child.on('close', (code) => {
  console.log('File processing complete');
  console.log('Found errors:', output.split('\\n').length - 1);
});
}

// Example 3: Database backup with exec
function backupDatabase() {
const command = 'mysqldump -u root -p database_name > backup.sql';

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('Backup failed:', error);
    return;
  }
  console.log('Database backup completed successfully');
});
}

// Example 4: Multiple child processes for parallel processing
function parallelProcessing() {
const tasks = ['task1', 'task2', 'task3', 'task4'];
const children = [];

tasks.forEach((task, index) => {
  const child = fork('./worker.js');
  
  child.send({ task, index });
  
  child.on('message', (result) => {
    console.log(\`Task \${task} completed: \${result}\`);
    child.kill();
  });
  
  children.push(child);
});

// Wait for all children to complete
Promise.all(children.map(child => {
  return new Promise((resolve) => {
    child.on('exit', resolve);
  });
})).then(() => {
  console.log('All tasks completed');
});
}

// 6. COMMUNICATION BETWEEN PROCESSES

// IPC (Inter-Process Communication) with fork()
function ipcExample() {
const child = fork('./ipcWorker.js');

// Send data to child
child.send({
  type: 'calculation',
  numbers: [1, 2, 3, 4, 5]
});

// Receive data from child
child.on('message', (message) => {
  switch (message.type) {
    case 'result':
      console.log('Calculation result:', message.data);
      break;
    case 'progress':
      console.log('Progress:', message.percent + '%');
      break;
    case 'error':
      console.error('Child error:', message.error);
      break;
  }
});
}

// 7. PROCESS MANAGEMENT

// Process pool for managing multiple child processes
class ProcessPool {
constructor(size) {
  this.size = size;
  this.processes = [];
  this.queue = [];
  this.active = 0;
}

async execute(task) {
  return new Promise((resolve, reject) => {
    if (this.active < this.size) {
      this.runTask(task, resolve, reject);
    } else {
      this.queue.push({ task, resolve, reject });
    }
  });
}

runTask(task, resolve, reject) {
  this.active++;
  
  const child = fork('./worker.js');
  
  child.send(task);
  
  child.on('message', (result) => {
    resolve(result);
    this.active--;
    child.kill();
    
    // Process next task in queue
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      this.runTask(next.task, next.resolve, next.reject);
    }
  });
  
  child.on('error', (error) => {
    reject(error);
    this.active--;
    child.kill();
  });
}
}

// Usage of process pool
const pool = new ProcessPool(4);

async function useProcessPool() {
const tasks = Array.from({ length: 10 }, (_, i) => ({ id: i, data: i * 1000 }));

const results = await Promise.all(
  tasks.map(task => pool.execute(task))
);

console.log('All tasks completed:', results);
}

// 8. ERROR HANDLING AND MONITORING

function robustChildProcess() {
const child = fork('./worker.js');

// Set timeout for child process
const timeout = setTimeout(() => {
  console.log('Child process timeout, killing...');
  child.kill('SIGKILL');
}, 30000); // 30 seconds

child.send({ task: 'longRunningTask' });

child.on('message', (result) => {
  clearTimeout(timeout);
  console.log('Task completed:', result);
  child.kill();
});

child.on('error', (error) => {
  clearTimeout(timeout);
  console.error('Child process error:', error);
});

child.on('exit', (code, signal) => {
  clearTimeout(timeout);
  if (code !== 0) {
    console.error(\`Child process exited with code \${code}\`);
  }
});
}

// 9. SIGNIFICANCE OF CHILD PROCESSES

const childProcessSignificance = {
'CPU Intensive Tasks': {
  description: 'Handle heavy computations without blocking the main event loop',
  example: 'Image processing, data analysis, mathematical computations'
},
'Parallel Processing': {
  description: 'Execute multiple tasks simultaneously across different processes',
  example: 'Processing multiple files, handling multiple requests'
},
'Process Isolation': {
  description: 'Isolate failures and prevent one process from affecting others',
  example: 'Microservices architecture, fault tolerance'
},
'Resource Management': {
  description: 'Better control over memory and CPU usage',
  example: 'Memory leaks in child processes don\'t affect parent'
},
'Scalability': {
  description: 'Scale horizontally by adding more processes',
  example: 'Load balancing across multiple worker processes'
},
'Security': {
  description: 'Run untrusted code in isolated processes',
  example: 'Sandboxed execution, plugin systems'
}
};

// 10. BEST PRACTICES

const bestPractices = {
'Process Creation': [
  'Use fork() for Node.js processes',
  'Use spawn() for external commands',
  'Use exec() for simple commands with buffered output',
  'Always handle process events (exit, error, message)'
],
'Communication': [
  'Use IPC for parent-child communication',
  'Keep messages small and serializable',
  'Handle communication errors gracefully',
  'Use timeouts for long-running operations'
],
'Resource Management': [
  'Always kill child processes when done',
  'Implement process pools for multiple workers',
  'Monitor memory and CPU usage',
  'Set appropriate timeouts'
],
'Error Handling': [
  'Handle all process events',
  'Implement retry mechanisms',
  'Log errors appropriately',
  'Graceful degradation on failures'
]
};

// 11. PERFORMANCE COMPARISON

function performanceComparison() {
console.log('Performance Comparison:');

// Single-threaded (blocking)
const start1 = Date.now();
cpuIntensiveTask();
const time1 = Date.now() - start1;
console.log(\`Single-threaded: \${time1}ms\`);

// Multi-process (non-blocking)
const start2 = Date.now();
const child = fork('./cpuWorker.js');

child.send({ task: 'compute' });

child.on('message', (result) => {
  const time2 = Date.now() - start2;
  console.log(\`Multi-process: \${time2}ms\`);
  console.log('Result:', result);
  child.kill();
});
}

// 12. REAL-WORLD USE CASES

const realWorldUseCases = {
'Web Servers': {
  description: 'Handle multiple requests with worker processes',
  implementation: 'PM2, cluster module'
},
'Data Processing': {
  description: 'Process large datasets in parallel',
  implementation: 'Map-reduce patterns, batch processing'
},
'File Operations': {
  description: 'Handle large file uploads/downloads',
  implementation: 'Stream processing, chunked operations'
},
'API Aggregation': {
  description: 'Fetch data from multiple sources',
  implementation: 'Parallel API calls, result aggregation'
},
'Background Jobs': {
  description: 'Run long-running tasks in background',
  implementation: 'Job queues, task scheduling'
}
};`,
  testCases: [
    { 
      input: `const { fork } = require('child_process');
const child = fork('./worker.js');
child.send({ data: 'test' });
child.on('message', (msg) => console.log('Received:', msg));`, 
      output: `// Child process communication example` 
    },
    {
      input: `const { spawn } = require('child_process');
const child = spawn('ls', ['-la']);
child.stdout.on('data', (data) => console.log(data.toString()));`,
      output: `// Spawn child process for external command`
    },
    {
      input: `const { exec } = require('child_process');
exec('echo "Hello World"', (error, stdout) => {
console.log(stdout.trim());
});`,
      output: `Hello World`
    }
  ],
  explanation: `**Child processes in Node.js** are separate processes created by the parent Node.js process that run independently and can handle CPU-intensive tasks without blocking the main event loop.

**What is a Child Process?**

A child process is a separate process that:
- Runs independently of the parent process
- Has its own memory space and event loop
- Can execute different code or external commands
- Communicates with the parent through IPC (Inter-Process Communication)
- Can handle CPU-intensive tasks without blocking the main thread

**How to Create Child Processes:**

1. **spawn()** - Most flexible method
 - Creates a new process with streams for stdin/stdout/stderr
 - Best for long-running processes with continuous data exchange
 - Example: Running external commands, file processing

2. **exec()** - Simple buffered execution
 - Executes a command and buffers the output
 - Best for simple commands with limited output
 - Example: Running shell commands, simple scripts

3. **execFile()** - Direct file execution
 - Executes a file directly without shell interpretation
 - More secure than exec() for user input
 - Example: Running executable files, scripts

4. **fork()** - Specialized for Node.js
 - Creates a new Node.js process
 - Enables IPC communication between parent and child
 - Best for Node.js-specific tasks
 - Example: CPU-intensive computations, parallel processing

**Significance of Child Processes:**

**1. CPU-Intensive Task Handling:**
- Node.js is single-threaded and can't handle CPU-intensive tasks efficiently
- Child processes allow heavy computations without blocking the event loop
- Enables responsive applications even during heavy processing

**2. Parallel Processing:**
- Multiple child processes can run simultaneously
- Significantly improves performance for parallelizable tasks
- Enables true multi-core utilization

**3. Process Isolation:**
- Failures in child processes don't affect the parent process
- Provides fault tolerance and stability
- Enables graceful error handling and recovery

**4. Resource Management:**
- Better control over memory and CPU usage
- Memory leaks in child processes are isolated
- Can terminate problematic processes without affecting others

**5. Scalability:**
- Horizontal scaling by adding more worker processes
- Load balancing across multiple processes
- Better resource utilization across CPU cores

**6. Security:**
- Run untrusted code in isolated processes
- Sandboxed execution for plugins or user code
- Reduced security risks from malicious code

**Key Benefits:**

- **Non-blocking operations** for CPU-intensive tasks
- **Improved performance** through parallel processing
- **Better resource utilization** across multiple CPU cores
- **Enhanced stability** through process isolation
- **Scalable architecture** for high-load applications
- **Fault tolerance** and error isolation

**Common Use Cases:**

- **Web servers** with worker processes
- **Data processing** and batch operations
- **File operations** and stream processing
- **API aggregation** from multiple sources
- **Background jobs** and task scheduling
- **Microservices** architecture

**Best Practices:**

- Always handle process events (exit, error, message)
- Implement proper error handling and timeouts
- Use process pools for managing multiple workers
- Keep IPC messages small and serializable
- Always kill child processes when done
- Monitor resource usage and implement limits

Child processes are essential for building scalable, high-performance Node.js applications that can handle CPU-intensive tasks while maintaining responsiveness and reliability.`
},
{
  id: 'nodejs-7',
  title: 'Why Google Uses V8 Engine for Node.js',
  description: 'Understanding the V8 JavaScript engine, its architecture, performance characteristics, and why it was chosen as the foundation for Node.js, including its benefits and technical advantages.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// Why Google Uses V8 Engine for Node.js

// 1. WHAT IS V8 ENGINE?

// V8 is Google's open-source JavaScript engine written in C++
// It compiles JavaScript directly to native machine code before execution
// Originally developed for Google Chrome browser

// V8 Engine Architecture
const v8Architecture = {
'Parser': 'Converts JavaScript code to Abstract Syntax Tree (AST)',
'Ignition': 'Interpreter that executes bytecode',
'TurboFan': 'Optimizing compiler that generates machine code',
'Orinoco': 'Garbage collector for memory management',
'Liftoff': 'Baseline compiler for WebAssembly'
};

// 2. V8 ENGINE FEATURES

// Feature 1: Just-In-Time (JIT) Compilation
function demonstrateJIT() {
// V8 compiles frequently executed code to machine code
let sum = 0;

// This loop gets optimized by V8's TurboFan compiler
for (let i = 0; i < 1000000; i++) {
  sum += i;
}

return sum;
}

// Feature 2: Hidden Classes and Inline Caching
function demonstrateHiddenClasses() {
// V8 optimizes object property access
const obj1 = { x: 1, y: 2 };
const obj2 = { x: 3, y: 4 };

// Both objects have the same hidden class
// V8 can optimize property access
return obj1.x + obj2.x;
}

// Feature 3: Garbage Collection
function demonstrateGC() {
// V8's Orinoco garbage collector manages memory automatically
const largeArray = new Array(1000000);

// When this function ends, V8 will clean up the memory
return largeArray.length;
}

// 3. WHY V8 WAS CHOSEN FOR NODE.JS

// Reason 1: Performance
const performanceComparison = {
'V8 Engine': {
  'Compilation': 'JIT compilation to native code',
  'Optimization': 'Advanced optimization techniques',
  'Memory': 'Efficient garbage collection',
  'Speed': 'Near-native performance'
},
'Other Engines': {
  'Compilation': 'Interpreted or basic compilation',
  'Optimization': 'Limited optimization',
  'Memory': 'Basic memory management',
  'Speed': 'Slower execution'
}
};

// Reason 2: Event Loop Implementation
// V8's event loop is perfect for Node.js's non-blocking I/O model
const eventLoopExample = {
'V8 Event Loop': [
  'Call Stack',
  'Microtask Queue (Promises)',
  'Macrotask Queue (setTimeout, setInterval)',
  'I/O Callback Queue',
  'Check Queue (setImmediate)',
  'Close Callback Queue'
]
};

// Reason 3: Memory Management
function demonstrateV8Memory() {
// V8's garbage collector is highly optimized
const v8MemoryFeatures = {
  'Generational GC': 'Separates young and old objects',
  'Incremental GC': 'Minimizes pause times',
  'Concurrent GC': 'Runs alongside application code',
  'Memory Pooling': 'Efficient memory allocation'
};

return v8MemoryFeatures;
}

// 4. V8 ENGINE ARCHITECTURE DETAILS

// Compilation Pipeline
const compilationPipeline = {
'Step 1: Parsing': {
  'Scanner': 'Converts source code to tokens',
  'Parser': 'Creates Abstract Syntax Tree (AST)',
  'PreParser': 'Quick parsing for lazy compilation'
},
'Step 2: Compilation': {
  'Ignition': 'Generates bytecode from AST',
  'TurboFan': 'Optimizes hot code paths',
  'Liftoff': 'Fast baseline compilation'
},
'Step 3: Execution': {
  'Bytecode Interpreter': 'Executes bytecode',
  'Optimized Code': 'Executes compiled machine code',
  'Deoptimization': 'Falls back to bytecode if needed'
}
};

// 5. V8 OPTIMIZATION TECHNIQUES

// Technique 1: Inline Caching
function inlineCachingExample() {
const objects = [
  { type: 'user', name: 'John' },
  { type: 'user', name: 'Jane' },
  { type: 'user', name: 'Bob' }
];

// V8 optimizes this property access through inline caching
let totalLength = 0;
for (const obj of objects) {
  totalLength += obj.name.length; // Optimized access
}

return totalLength;
}

// Technique 2: Hidden Classes
function hiddenClassExample() {
// V8 creates hidden classes for object shapes
const user1 = { id: 1, name: 'John', email: 'john@example.com' };
const user2 = { id: 2, name: 'Jane', email: 'jane@example.com' };

// Both objects share the same hidden class
// V8 optimizes property access
return user1.name + user2.name;
}

// Technique 3: Function Optimization
function optimizedFunction() {
// V8 optimizes frequently called functions
let result = 0;

// This function gets optimized after several calls
for (let i = 0; i < 1000; i++) {
  result += Math.sqrt(i);
}

return result;
}

// 6. V8 AND NODE.JS INTEGRATION

// How Node.js uses V8
const nodejsV8Integration = {
'Event Loop': 'Built on V8\'s event loop',
'JavaScript Engine': 'V8 executes all JavaScript code',
'C++ Bindings': 'Node.js provides C++ APIs to V8',
'Memory Management': 'V8 handles garbage collection',
'Performance': 'V8\'s optimizations benefit Node.js'
};

// V8 API Usage in Node.js
const v8 = require('v8');

// Access V8 heap statistics
function getV8Stats() {
const heapStats = v8.getHeapStatistics();
return {
  totalHeapSize: heapStats.total_heap_size,
  usedHeapSize: heapStats.used_heap_size,
  heapSizeLimit: heapStats.heap_size_limit,
  totalAvailableSize: heapStats.total_available_size
};
}

// Set V8 flags
function configureV8() {
// Increase heap size
v8.setFlagsFromString('--max_old_space_size=4096');

// Enable optimization
v8.setFlagsFromString('--optimize-for-size');
}

// 7. PERFORMANCE BENEFITS

// Benchmark: V8 vs Other Engines
const performanceBenchmarks = {
'V8 Engine': {
  'Execution Speed': 'Very Fast (JIT compiled)',
  'Memory Usage': 'Efficient (Generational GC)',
  'Startup Time': 'Fast (Lazy compilation)',
  'Optimization': 'Advanced (TurboFan)'
},
'SpiderMonkey (Firefox)': {
  'Execution Speed': 'Fast',
  'Memory Usage': 'Good',
  'Startup Time': 'Medium',
  'Optimization': 'Good'
},
'JavaScriptCore (Safari)': {
  'Execution Speed': 'Fast',
  'Memory Usage': 'Good',
  'Startup Time': 'Fast',
  'Optimization': 'Good'
}
};

// 8. V8 ENGINE EVOLUTION

// V8 Version History
const v8Evolution = {
'2008': 'Initial release with Chrome',
'2009': 'Node.js adopts V8',
'2015': 'Ignition and TurboFan introduced',
'2017': 'Orinoco garbage collector',
'2018': 'Liftoff WebAssembly compiler',
'2020': 'Sparkplug compiler',
'2022': 'Maglev compiler',
'2023': 'Turboshaft optimization'
};

// 9. V8 ENGINE FEATURES FOR NODE.JS

// Feature 1: Async/Await Support
async function v8AsyncSupport() {
// V8 natively supports async/await
const result = await Promise.resolve('Hello V8');
return result;
}

// Feature 2: ES6+ Features
function v8ES6Features() {
// V8 supports all modern JavaScript features
const features = {
  'Arrow Functions': () => 'supported',
  'Destructuring': ({ a, b }) => ({ a, b }),
  'Template Literals': \`V8 supports \${'template literals'}\`,
  'Classes': class Example { constructor() {} },
  'Modules': 'ES6 modules supported',
  'Generators': function* gen() { yield 1; },
  'Proxies': new Proxy({}, {}),
  'WeakMap/WeakSet': new WeakMap()
};

return features;
}

// Feature 3: WebAssembly Support
async function v8WebAssembly() {
// V8 supports WebAssembly
const wasmCode = new Uint8Array([
  0x00, 0x61, 0x73, 0x6d, // WASM magic number
  0x01, 0x00, 0x00, 0x00  // Version
]);

const wasmModule = await WebAssembly.compile(wasmCode);
return wasmModule;
}

// 10. V8 ENGINE OPTIMIZATION TECHNIQUES

// Optimization 1: Function Inlining
function demonstrateInlining() {
// V8 inlines small functions
function add(a, b) {
  return a + b;
}

let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += add(i, 1); // This gets inlined
}

return sum;
}

// Optimization 2: Loop Optimization
function demonstrateLoopOptimization() {
// V8 optimizes loops
const array = new Array(1000000);

// This loop gets optimized
for (let i = 0; i < array.length; i++) {
  array[i] = i * 2;
}

return array;
}

// Optimization 3: Type Specialization
function demonstrateTypeSpecialization() {
// V8 specializes code for specific types
let sum = 0;

// V8 optimizes for number operations
for (let i = 0; i < 1000000; i++) {
  sum += i; // Optimized for numbers
}

return sum;
}

// 11. V8 ENGINE MEMORY MANAGEMENT

// Memory Management Features
const v8MemoryManagement = {
'Generational Garbage Collection': {
  'Young Generation': 'New objects, collected frequently',
  'Old Generation': 'Surviving objects, collected less frequently',
  'Large Object Space': 'Large objects bypass young generation'
},
'Incremental Marking': 'Reduces pause times',
'Concurrent Sweeping': 'Runs alongside application',
'Memory Pooling': 'Efficient allocation patterns'
};

// Memory Usage Monitoring
function monitorV8Memory() {
const memUsage = process.memoryUsage();
const v8Stats = v8.getHeapStatistics();

return {
  'RSS': memUsage.rss,
  'Heap Used': memUsage.heapUsed,
  'Heap Total': memUsage.heapTotal,
  'External': memUsage.external,
  'V8 Heap Size': v8Stats.total_heap_size,
  'V8 Heap Used': v8Stats.used_heap_size
};
}

// 12. V8 ENGINE AND NODE.JS ECOSYSTEM

// Ecosystem Benefits
const ecosystemBenefits = {
'Performance': 'Fast execution enables high-performance applications',
'Compatibility': 'Same engine as Chrome ensures compatibility',
'Tooling': 'Chrome DevTools work with Node.js',
'Community': 'Large V8 community contributes to Node.js',
'Innovation': 'V8 improvements automatically benefit Node.js',
'Standards': 'Implements latest JavaScript standards quickly'
};

// 13. V8 ENGINE CONFIGURATION

// V8 Flags for Node.js
const v8Flags = {
'Memory Management': [
  '--max_old_space_size=4096', // 4GB heap
  '--initial_old_space_size=512', // Initial heap size
  '--max_semi_space_size=64' // Young generation size
],
'Performance': [
  '--optimize-for-size', // Optimize for memory usage
  '--max_optimization_count=1000', // Optimization limit
  '--allow_natives_syntax' // Allow V8 intrinsics
],
'Debugging': [
  '--trace_opt', // Trace optimizations
  '--trace_deopt', // Trace deoptimizations
  '--prof' // Enable profiling
]
};

// 14. FUTURE OF V8 AND NODE.JS

// Upcoming V8 Features
const futureV8Features = {
'Performance': [
  'Turboshaft optimization pipeline',
  'Improved garbage collection',
  'Better JIT compilation'
],
'Language Features': [
  'Latest ECMAScript proposals',
  'Enhanced WebAssembly support',
  'Improved debugging capabilities'
],
'Memory': [
  'More efficient memory usage',
  'Better memory profiling',
  'Reduced garbage collection pauses'
]
};

// 15. WHY V8 IS PERFECT FOR NODE.JS

const whyV8IsPerfect = {
'Performance': 'JIT compilation provides near-native speed',
'Memory Efficiency': 'Advanced garbage collection',
'Event Loop': 'Perfect for non-blocking I/O',
'Standards Compliance': 'Implements latest JavaScript features',
'Tooling': 'Excellent debugging and profiling tools',
'Community': 'Large, active development community',
'Innovation': 'Continuous performance improvements',
'Stability': 'Battle-tested in Chrome browser',
'Scalability': 'Handles large applications efficiently',
'Future-Proof': 'Regular updates and new features'
};`,
  testCases: [
    { 
      input: `const v8 = require('v8');
const stats = v8.getHeapStatistics();
console.log('Heap size:', stats.total_heap_size);`, 
      output: `// V8 heap statistics access` 
    },
    {
      input: `function optimizedLoop() {
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}
return sum;
}`,
      output: `// V8 JIT optimization example`
    },
    {
      input: `const v8 = require('v8');
v8.setFlagsFromString('--max_old_space_size=4096');
console.log('V8 configured for 4GB heap');`,
      output: `V8 configured for 4GB heap`
    }
  ],
  explanation: `**Google uses the V8 engine for Node.js** because it provides exceptional performance, advanced optimization techniques, and a robust foundation for server-side JavaScript execution.

**What is V8 Engine?**

V8 is Google's open-source JavaScript engine that:
- **Compiles JavaScript to native machine code** using Just-In-Time (JIT) compilation
- **Provides near-native performance** through advanced optimization techniques
- **Manages memory efficiently** with sophisticated garbage collection
- **Supports modern JavaScript features** and ECMAScript standards
- **Powers Google Chrome** and other Chromium-based browsers

**Why V8 Was Chosen for Node.js:**

**1. Performance Excellence:**
- **JIT Compilation**: Converts JavaScript to optimized machine code
- **TurboFan Optimizer**: Advanced compiler for hot code paths
- **Hidden Classes**: Optimizes object property access
- **Inline Caching**: Speeds up function calls and property access

**2. Event Loop Architecture:**
- **Perfect for Node.js**: V8's event loop aligns with Node.js's non-blocking I/O model
- **Efficient Task Queuing**: Handles microtasks and macrotasks effectively
- **Async/Await Support**: Native support for modern asynchronous patterns

**3. Memory Management:**
- **Generational Garbage Collection**: Separates young and old objects for efficiency
- **Incremental Marking**: Reduces pause times during garbage collection
- **Concurrent Sweeping**: Runs alongside application code
- **Memory Pooling**: Efficient allocation patterns

**4. Advanced Optimization Techniques:**
- **Function Inlining**: Reduces function call overhead
- **Loop Optimization**: Optimizes frequently executed loops
- **Type Specialization**: Creates specialized code for specific data types
- **Dead Code Elimination**: Removes unused code paths

**5. Standards Compliance:**
- **Latest ECMAScript Features**: Implements modern JavaScript standards quickly
- **WebAssembly Support**: Enables high-performance code execution
- **Future-Proof**: Regular updates with new language features

**6. Ecosystem Benefits:**
- **Chrome DevTools**: Same debugging tools work with Node.js
- **Large Community**: Extensive documentation and support
- **Battle-Tested**: Proven reliability in Chrome browser
- **Continuous Innovation**: Regular performance improvements

**V8 Engine Architecture:**

**Compilation Pipeline:**
1. **Parsing**: Converts source code to Abstract Syntax Tree (AST)
2. **Ignition**: Generates bytecode from AST
3. **TurboFan**: Optimizes hot code paths to machine code
4. **Execution**: Runs optimized code with fallback to bytecode

**Memory Management:**
- **Young Generation**: New objects, collected frequently
- **Old Generation**: Surviving objects, collected less frequently
- **Large Object Space**: Large objects bypass young generation

**Performance Benefits:**

**Speed:**
- **JIT Compilation**: Near-native execution speed
- **Optimization**: Advanced code optimization techniques
- **Efficient Data Structures**: Optimized for JavaScript patterns

**Memory Efficiency:**
- **Smart Garbage Collection**: Minimal memory overhead
- **Memory Pooling**: Efficient allocation patterns
- **Reduced Pause Times**: Incremental and concurrent GC

**Scalability:**
- **Multi-core Support**: Efficiently utilizes multiple CPU cores
- **Large Application Support**: Handles complex applications
- **Resource Management**: Efficient CPU and memory usage

**Why V8 is Perfect for Node.js:**

1. **Performance**: JIT compilation provides exceptional speed
2. **Memory Efficiency**: Advanced garbage collection
3. **Event Loop**: Perfect alignment with Node.js architecture
4. **Standards Compliance**: Latest JavaScript features
5. **Tooling**: Excellent debugging and profiling capabilities
6. **Community**: Large, active development community
7. **Innovation**: Continuous performance improvements
8. **Stability**: Battle-tested in production environments
9. **Scalability**: Handles large-scale applications
10. **Future-Proof**: Regular updates and new features

**Real-world Impact:**

- **High-Performance Applications**: Enables fast server-side applications
- **Scalable Architecture**: Supports large-scale deployments
- **Developer Experience**: Excellent debugging and profiling tools
- **Ecosystem Growth**: Drives Node.js adoption and innovation
- **Standards Leadership**: Influences JavaScript language development

V8's combination of performance, memory efficiency, and advanced optimization techniques makes it the ideal engine for Node.js, enabling high-performance server-side JavaScript applications that can compete with traditional server technologies.`
},
{
  id: 'nodejs-8',
  title: 'Code Works in Staging/UAT but Fails in Production - Debugging Approach',
  description: 'Understanding systematic approaches to debug production issues when code works in staging and UAT environments, including environment differences, monitoring strategies, and debugging techniques.',
  difficulty: 'Hard',
  category: 'nodejs',
  solution: `// Code Works in Staging/UAT but Fails in Production - Debugging Approach

// 1. SYSTEMATIC DEBUGGING APPROACH

// Step 1: Immediate Response and Assessment
class ProductionDebugger {
constructor() {
  this.issueLog = [];
  this.environmentDiff = {};
  this.monitoringData = {};
}

// Immediate response checklist
immediateResponse() {
  return {
    '1. Assess Impact': 'Determine severity and user impact',
    '2. Rollback Decision': 'Consider immediate rollback if critical',
    '3. Enable Debugging': 'Turn on verbose logging',
    '4. Monitor Metrics': 'Watch error rates and performance',
    '5. Team Alert': 'Notify relevant team members'
  };
}
}

// 2. ENVIRONMENT DIFFERENCES ANALYSIS

// Common environment differences that cause issues
const environmentDifferences = {
'Infrastructure': {
  'CPU/Memory': 'Different resource allocations',
  'Network': 'Latency, bandwidth, firewall rules',
  'Storage': 'Disk space, I/O performance',
  'Load Balancers': 'Different configurations'
},
'Configuration': {
  'Environment Variables': 'Missing or different values',
  'Database Connections': 'Connection pools, timeouts',
  'External Services': 'API endpoints, credentials',
  'Feature Flags': 'Different feature toggles'
},
'Data': {
  'Database Size': 'Production has more data',
  'Data Types': 'Different data characteristics',
  'User Load': 'Higher concurrent users',
  'Data Volume': 'Larger datasets'
},
'Dependencies': {
  'Node.js Version': 'Different runtime versions',
  'Package Versions': 'Different npm package versions',
  'System Libraries': 'OS-level differences',
  'Third-party Services': 'Different service versions'
}
};

// 3. DEBUGGING TOOLS AND TECHNIQUES

// Enhanced logging for production debugging
class ProductionLogger {
constructor() {
  this.logLevel = process.env.LOG_LEVEL || 'info';
  this.requestId = null;
}

// Structured logging with context
log(level, message, context = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: level,
    message: message,
    requestId: this.requestId,
    environment: process.env.NODE_ENV,
    version: process.env.APP_VERSION,
    ...context
  };
  
  console.log(JSON.stringify(logEntry));
}

// Request-specific logging
startRequest(req) {
  this.requestId = req.headers['x-request-id'] || this.generateId();
  this.log('info', 'Request started', {
    method: req.method,
    url: req.url,
    userAgent: req.headers['user-agent'],
    ip: req.ip
  });
}

// Error logging with stack traces
logError(error, context = {}) {
  this.log('error', error.message, {
    stack: error.stack,
    name: error.name,
    code: error.code,
    ...context
  });
}

generateId() {
  return Math.random().toString(36).substr(2, 9);
}
}

// 4. MONITORING AND METRICS

// Production monitoring setup
class ProductionMonitor {
constructor() {
  this.metrics = {
    requests: 0,
    errors: 0,
    responseTime: [],
    memoryUsage: [],
    cpuUsage: []
  };
}

// Track request metrics
trackRequest(duration, success) {
  this.metrics.requests++;
  this.metrics.responseTime.push(duration);
  
  if (!success) {
    this.metrics.errors++;
  }
}

// Memory monitoring
trackMemory() {
  const memUsage = process.memoryUsage();
  this.metrics.memoryUsage.push({
    timestamp: Date.now(),
    rss: memUsage.rss,
    heapUsed: memUsage.heapUsed,
    heapTotal: memUsage.heapTotal,
    external: memUsage.external
  });
}

// Get current metrics
getMetrics() {
  const avgResponseTime = this.metrics.responseTime.length > 0 
    ? this.metrics.responseTime.reduce((a, b) => a + b, 0) / this.metrics.responseTime.length 
    : 0;
  
  const errorRate = this.metrics.requests > 0 
    ? (this.metrics.errors / this.metrics.requests) * 100 
    : 0;
  
  return {
    totalRequests: this.metrics.requests,
    errorRate: errorRate.toFixed(2) + '%',
    avgResponseTime: avgResponseTime.toFixed(2) + 'ms',
    memoryUsage: this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1]
  };
}
}

// 5. ENVIRONMENT COMPARISON TOOL

// Compare environments systematically
class EnvironmentComparator {
constructor() {
  this.comparisons = {};
}

// Compare environment variables
compareEnvVars(stagingEnv, prodEnv) {
  const differences = {};
  
  for (const [key, stagingValue] of Object.entries(stagingEnv)) {
    const prodValue = prodEnv[key];
    
    if (stagingValue !== prodValue) {
      differences[key] = {
        staging: stagingValue,
        production: prodValue,
        type: 'different'
      };
    }
  }
  
  // Check for missing variables
  for (const [key, prodValue] of Object.entries(prodEnv)) {
    if (!stagingEnv.hasOwnProperty(key)) {
      differences[key] = {
        staging: 'missing',
        production: prodValue,
        type: 'missing_in_staging'
      };
    }
  }
  
  return differences;
}

// Compare system resources
async compareSystemResources() {
  const os = require('os');
  
  return {
    'CPU Cores': {
      staging: 'Check staging CPU cores',
      production: os.cpus().length,
      type: 'system'
    },
    'Memory': {
      staging: 'Check staging memory',
      production: Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB',
      type: 'system'
    },
    'Node.js Version': {
      staging: 'Check staging Node version',
      production: process.version,
      type: 'runtime'
    },
    'Platform': {
      staging: 'Check staging platform',
      production: os.platform(),
      type: 'system'
    }
  };
}

// Compare database connections
async compareDatabaseConfig() {
  // This would compare actual database configurations
  return {
    'Connection Pool Size': {
      staging: 'Check staging pool size',
      production: process.env.DB_POOL_SIZE || 'default',
      type: 'database'
    },
    'Connection Timeout': {
      staging: 'Check staging timeout',
      production: process.env.DB_TIMEOUT || 'default',
      type: 'database'
    }
  };
}
}

// 6. DEBUGGING STRATEGIES

// Strategy 1: Gradual debugging approach
class GradualDebugger {
constructor() {
  this.steps = [];
  this.currentStep = 0;
}

// Step-by-step debugging process
async debugStepByStep() {
  const steps = [
    {
      name: 'Check Application Logs',
      action: () => this.checkApplicationLogs(),
      description: 'Look for error messages and stack traces'
    },
    {
      name: 'Verify Environment Variables',
      action: () => this.verifyEnvironmentVariables(),
      description: 'Ensure all required env vars are set correctly'
    },
    {
      name: 'Check Database Connectivity',
      action: () => this.checkDatabaseConnectivity(),
      description: 'Verify database connections and queries'
    },
    {
      name: 'Monitor Resource Usage',
      action: () => this.monitorResourceUsage(),
      description: 'Check CPU, memory, and disk usage'
    },
    {
      name: 'Test External Dependencies',
      action: () => this.testExternalDependencies(),
      description: 'Verify third-party service connections'
    },
    {
      name: 'Compare with Staging',
      action: () => this.compareWithStaging(),
      description: 'Systematic comparison of environments'
    }
  ];
  
  for (const step of steps) {
    console.log(\`\\n=== Step \${this.currentStep + 1}: \${step.name} ===\`);
    console.log(\`Description: \${step.description}\`);
    
    try {
      await step.action();
      console.log('✓ Step completed successfully');
    } catch (error) {
      console.error('✗ Step failed:', error.message);
      return { step: step.name, error: error.message };
    }
    
    this.currentStep++;
  }
  
  return { success: true, message: 'All debugging steps completed' };
}

// Individual debugging methods
async checkApplicationLogs() {
  // Simulate log checking
  console.log('Checking application logs...');
  // In real implementation, this would read log files
}

async verifyEnvironmentVariables() {
  const requiredVars = [
    'NODE_ENV',
    'DATABASE_URL',
    'API_KEY',
    'REDIS_URL'
  ];
  
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(\`Missing environment variables: \${missing.join(', ')}\`);
  }
  
  console.log('All required environment variables are set');
}

async checkDatabaseConnectivity() {
  // Simulate database connectivity check
  console.log('Checking database connectivity...');
  // In real implementation, this would test actual DB connection
}

async monitorResourceUsage() {
  const os = require('os');
  const memUsage = process.memoryUsage();
  
  console.log('Resource Usage:');
  console.log('- CPU Load:', os.loadavg());
  console.log('- Memory RSS:', Math.round(memUsage.rss / 1024 / 1024) + ' MB');
  console.log('- Heap Used:', Math.round(memUsage.heapUsed / 1024 / 1024) + ' MB');
}

async testExternalDependencies() {
  console.log('Testing external dependencies...');
  // In real implementation, this would test API connections
}

async compareWithStaging() {
  console.log('Comparing with staging environment...');
  // In real implementation, this would compare configurations
}
}

// 7. PRODUCTION-SPECIFIC DEBUGGING TECHNIQUES

// Technique 1: Feature flag debugging
class FeatureFlagDebugger {
constructor() {
  this.featureFlags = new Map();
}

// Check if feature flags are causing issues
checkFeatureFlags() {
  const flags = {
    'NEW_FEATURE': process.env.NEW_FEATURE === 'true',
    'OPTIMIZATION': process.env.OPTIMIZATION === 'true',
    'CACHE_ENABLED': process.env.CACHE_ENABLED === 'true'
  };
  
  console.log('Feature Flags Status:', flags);
  
  // Temporarily disable features to isolate issues
  return flags;
}

// Temporarily disable a feature
disableFeature(featureName) {
  console.log(\`Temporarily disabling feature: \${featureName}\`);
  // In real implementation, this would update feature flags
}
}

// Technique 2: Load testing comparison
class LoadTestComparer {
constructor() {
  this.stagingResults = {};
  this.productionResults = {};
}

// Compare performance under load
async compareLoadPerformance() {
  console.log('Comparing load performance between staging and production...');
  
  // In real implementation, this would run actual load tests
  return {
    staging: {
      avgResponseTime: '50ms',
      errorRate: '0.1%',
      throughput: '1000 req/s'
    },
    production: {
      avgResponseTime: '200ms',
      errorRate: '5%',
      throughput: '500 req/s'
    }
  };
}
}

// Technique 3: Database query analysis
class DatabaseAnalyzer {
constructor() {
  this.slowQueries = [];
}

// Analyze slow queries
async analyzeSlowQueries() {
  console.log('Analyzing slow database queries...');
  
  // In real implementation, this would query database logs
  return {
    slowQueries: this.slowQueries,
    recommendations: [
      'Add database indexes',
      'Optimize query structure',
      'Increase connection pool size'
    ]
  };
}

// Compare query performance
async compareQueryPerformance() {
  console.log('Comparing query performance between environments...');
  
  // In real implementation, this would run the same queries on both environments
  return {
    staging: {
      avgQueryTime: '10ms',
      slowQueries: 0
    },
    production: {
      avgQueryTime: '100ms',
      slowQueries: 5
    }
  };
}
}

// 8. ROLLBACK AND RECOVERY STRATEGIES

// Rollback strategy
class RollbackStrategy {
constructor() {
  this.rollbackSteps = [];
}

// Immediate rollback if critical
async immediateRollback() {
  console.log('Initiating immediate rollback...');
  
  const steps = [
    'Stop new deployments',
    'Revert to previous stable version',
    'Restart application services',
    'Verify system stability',
    'Monitor error rates'
  ];
  
  for (const step of steps) {
    console.log(\`- \${step}\`);
    // In real implementation, this would execute actual rollback steps
  }
  
  return { success: true, message: 'Rollback completed' };
}

// Gradual rollback with monitoring
async gradualRollback() {
  console.log('Initiating gradual rollback...');
  
  return {
    step1: 'Reduce traffic to new version',
    step2: 'Monitor error rates',
    step3: 'If stable, continue; if not, full rollback',
    step4: 'Verify all systems are working'
  };
}
}

// 9. PREVENTION STRATEGIES

// Prevention checklist
const preventionStrategies = {
'Before Deployment': [
  'Environment parity testing',
  'Load testing in staging',
  'Database migration testing',
  'Configuration validation',
  'Health check verification'
],
'During Deployment': [
  'Blue-green deployment',
  'Canary releases',
  'Gradual traffic shifting',
  'Real-time monitoring',
  'Rollback readiness'
],
'After Deployment': [
  'Post-deployment monitoring',
  'Performance comparison',
  'Error rate tracking',
  'User feedback collection',
  'Automated health checks'
]
};

// 10. DEBUGGING CHECKLIST

const debuggingChecklist = {
'Immediate Actions': [
  '✓ Assess impact and severity',
  '✓ Enable verbose logging',
  '✓ Check application logs',
  '✓ Monitor error rates',
  '✓ Consider rollback if critical'
],
'Environment Analysis': [
  '✓ Compare environment variables',
  '✓ Check system resources',
  '✓ Verify database connectivity',
  '✓ Test external dependencies',
  '✓ Compare with staging configuration'
],
'Code Analysis': [
  '✓ Review recent changes',
  '✓ Check for environment-specific code',
  '✓ Verify feature flags',
  '✓ Test database queries',
  '✓ Analyze performance metrics'
],
'Infrastructure Check': [
  '✓ Verify server resources',
  '✓ Check network connectivity',
  '✓ Monitor load balancer health',
  '✓ Verify SSL certificates',
  '✓ Check firewall rules'
],
'Data Analysis': [
  '✓ Compare data volumes',
  '✓ Check for data type differences',
  '✓ Verify database indexes',
  '✓ Analyze query performance',
  '✓ Check for data corruption'
]
};

// 11. COMMON PRODUCTION ISSUES AND SOLUTIONS

const commonIssues = {
'Memory Leaks': {
  symptoms: ['Gradual memory increase', 'Application slowdown', 'Out of memory errors'],
  solutions: ['Profile memory usage', 'Check for unclosed connections', 'Implement proper cleanup']
},
'Database Issues': {
  symptoms: ['Connection timeouts', 'Slow queries', 'Connection pool exhaustion'],
  solutions: ['Optimize queries', 'Increase connection pool', 'Add database indexes']
},
'Network Issues': {
  symptoms: ['Timeout errors', 'Connection refused', 'Slow response times'],
  solutions: ['Check firewall rules', 'Verify DNS resolution', 'Test network connectivity']
},
'Configuration Issues': {
  symptoms: ['Feature flags not working', 'Missing environment variables', 'Wrong API endpoints'],
  solutions: ['Verify environment variables', 'Check configuration files', 'Test external services']
},
'Load Issues': {
  symptoms: ['High CPU usage', 'Memory pressure', 'Slow response times'],
  solutions: ['Scale horizontally', 'Optimize code', 'Implement caching']
}
};

// 12. MONITORING AND ALERTING SETUP

class ProductionAlerting {
constructor() {
  this.alerts = [];
  this.thresholds = {
    errorRate: 5, // 5% error rate
    responseTime: 2000, // 2 seconds
    memoryUsage: 80, // 80% memory usage
    cpuUsage: 90 // 90% CPU usage
  };
}

// Set up monitoring alerts
setupAlerts() {
  console.log('Setting up production monitoring alerts...');
  
  const alertTypes = [
    'High error rate alert',
    'Slow response time alert',
    'High memory usage alert',
    'High CPU usage alert',
    'Database connection alert',
    'External service failure alert'
  ];
  
  return alertTypes;
}

// Check if alert should be triggered
shouldAlert(metric, value) {
  const threshold = this.thresholds[metric];
  return value > threshold;
}
}

// 13. POST-INCIDENT ANALYSIS

class PostIncidentAnalysis {
constructor() {
  this.incidentData = {};
}

// Conduct post-incident review
async conductReview() {
  console.log('Conducting post-incident analysis...');
  
  const reviewSteps = [
    'Gather all logs and metrics',
    'Timeline reconstruction',
    'Root cause analysis',
    'Impact assessment',
    'Prevention measures',
    'Documentation update'
  ];
  
  return reviewSteps;
}

// Update runbooks and documentation
updateDocumentation() {
  console.log('Updating documentation and runbooks...');
  
  return {
    'Updated Documents': [
      'Deployment checklist',
      'Rollback procedures',
      'Monitoring setup',
      'Troubleshooting guide',
      'Environment comparison tool'
    ]
  };
}
}`,
  testCases: [
    { 
      input: `const logger = new ProductionLogger();
logger.log('error', 'Database connection failed', { 
dbHost: 'prod-db.example.com',
errorCode: 'ECONNREFUSED' 
});`, 
      output: `// Structured error logging for production debugging` 
    },
    {
      input: `const monitor = new ProductionMonitor();
monitor.trackRequest(150, true);
const metrics = monitor.getMetrics();
console.log('Error rate:', metrics.errorRate);`,
      output: `Error rate: 0.00%`
    },
    {
      input: `const debugger = new GradualDebugger();
debugger.verifyEnvironmentVariables();`,
      output: `All required environment variables are set`
    }
  ],
  explanation: `**When code works in staging/UAT but fails in production**, it's a common and challenging scenario that requires a systematic debugging approach. Here's a comprehensive strategy:

**Immediate Response Strategy:**

1. **Assess Impact**: Determine severity and user impact
2. **Rollback Decision**: Consider immediate rollback if critical
3. **Enable Debugging**: Turn on verbose logging and monitoring
4. **Team Alert**: Notify relevant team members
5. **Monitor Metrics**: Watch error rates and performance indicators

**Systematic Debugging Approach:**

**Step 1: Environment Differences Analysis**
- **Infrastructure**: CPU, memory, network, storage differences
- **Configuration**: Environment variables, database connections, external services
- **Data**: Database size, data types, user load, data volume
- **Dependencies**: Node.js version, package versions, system libraries

**Step 2: Enhanced Logging and Monitoring**
- **Structured Logging**: Include request IDs, timestamps, context
- **Error Tracking**: Capture stack traces, error codes, user context
- **Performance Metrics**: Response times, memory usage, CPU utilization
- **Real-time Monitoring**: Set up alerts for critical thresholds

**Step 3: Gradual Debugging Process**
1. **Check Application Logs**: Look for error messages and stack traces
2. **Verify Environment Variables**: Ensure all required variables are set
3. **Check Database Connectivity**: Test connections and query performance
4. **Monitor Resource Usage**: Check CPU, memory, and disk usage
5. **Test External Dependencies**: Verify third-party service connections
6. **Compare with Staging**: Systematic environment comparison

**Common Production-Specific Issues:**

**1. Memory Leaks:**
- **Symptoms**: Gradual memory increase, application slowdown
- **Solutions**: Profile memory usage, check for unclosed connections

**2. Database Issues:**
- **Symptoms**: Connection timeouts, slow queries, pool exhaustion
- **Solutions**: Optimize queries, increase connection pool, add indexes

**3. Network Issues:**
- **Symptoms**: Timeout errors, connection refused, slow responses
- **Solutions**: Check firewall rules, verify DNS, test connectivity

**4. Configuration Issues:**
- **Symptoms**: Feature flags not working, missing env vars
- **Solutions**: Verify environment variables, check configurations

**5. Load Issues:**
- **Symptoms**: High CPU usage, memory pressure, slow responses
- **Solutions**: Scale horizontally, optimize code, implement caching

**Debugging Tools and Techniques:**

**1. Enhanced Logging:**
- Structured logging with context and request IDs
- Error logging with stack traces and error codes
- Performance logging with timing information

**2. Monitoring and Metrics:**
- Real-time performance monitoring
- Error rate tracking and alerting
- Resource usage monitoring
- Custom metrics for business logic

**3. Environment Comparison:**
- Systematic comparison of configurations
- Database connection and query analysis
- External dependency testing
- Load testing comparison

**Rollback and Recovery Strategies:**

**1. Immediate Rollback:**
- Stop new deployments
- Revert to previous stable version
- Restart application services
- Verify system stability

**2. Gradual Rollback:**
- Reduce traffic to new version
- Monitor error rates
- Full rollback if needed
- Verify all systems working

**Prevention Strategies:**

**Before Deployment:**
- Environment parity testing
- Load testing in staging
- Database migration testing
- Configuration validation

**During Deployment:**
- Blue-green deployment
- Canary releases
- Gradual traffic shifting
- Real-time monitoring

**After Deployment:**
- Post-deployment monitoring
- Performance comparison
- Error rate tracking
- Automated health checks

**Key Success Factors:**

1. **Systematic Approach**: Follow a structured debugging process
2. **Environment Parity**: Ensure staging matches production
3. **Comprehensive Monitoring**: Set up proper logging and alerting
4. **Quick Rollback**: Have rollback procedures ready
5. **Team Communication**: Keep stakeholders informed
6. **Documentation**: Update runbooks and procedures
7. **Post-Incident Analysis**: Learn from each incident

**Why This Approach Works:**

- **Reduces Downtime**: Quick identification and resolution
- **Prevents Recurrence**: Systematic analysis prevents future issues
- **Improves Reliability**: Better monitoring and alerting
- **Enhances Team Skills**: Systematic debugging improves team capabilities
- **Builds Confidence**: Structured approach reduces stress and uncertainty

This systematic approach ensures that production issues are resolved quickly and efficiently while building a more robust and reliable system.`
},
{
  id: 'nodejs-9',
  title: 'What is Middleware and How Middleware Works',
  description: 'Understanding middleware in Node.js, its purpose, how it works in the request-response cycle, different types of middleware, and best practices for implementing custom middleware.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// What is Middleware and How Middleware Works

// 1. WHAT IS MIDDLEWARE?

// Middleware is software that acts as a bridge between different applications or components
// In Node.js/Express, middleware functions have access to request (req), response (res), and next() function
// They can execute code, modify request/response objects, end the request-response cycle, or call the next middleware

// 2. MIDDLEWARE CONCEPTS

// Basic middleware structure
function basicMiddleware(req, res, next) {
// Execute any code
console.log('Middleware executing...');

// Modify request/response objects
req.timestamp = new Date();

// Call next() to pass control to the next middleware
next();
}

// 3. HOW MIDDLEWARE WORKS - THE REQUEST-RESPONSE CYCLE

// Express application with middleware chain
const express = require('express');
const app = express();

// Middleware 1: Logging middleware
app.use((req, res, next) => {
console.log(new Date().toISOString() + ' - ' + req.method + ' ' + req.url);
next(); // Pass control to next middleware
});

// Middleware 2: Authentication middleware
app.use((req, res, next) => {
const token = req.headers.authorization;

if (!token) {
  return res.status(401).json({ error: 'No token provided' });
}

// Verify token logic here...
req.user = { id: 1, name: 'John' }; // Add user to request
next(); // Pass control to next middleware
});

// Middleware 3: Request processing
app.use((req, res, next) => {
req.processed = true;
next();
});

// Route handler (final middleware)
app.get('/api/data', (req, res) => {
res.json({ 
  message: 'Data retrieved',
  user: req.user,
  timestamp: req.timestamp,
  processed: req.processed
});
});

// 4. TYPES OF MIDDLEWARE

// 4.1 Application-level middleware
// Applied to all routes
app.use((req, res, next) => {
console.log('Application-level middleware');
next();
});

// 4.2 Router-level middleware
// Applied to specific routes
const router = express.Router();

router.use((req, res, next) => {
console.log('Router-level middleware');
next();
});

// 4.3 Error-handling middleware
// Must have 4 parameters (err, req, res, next)
app.use((err, req, res, next) => {
console.error('Error:', err.message);
res.status(500).json({ error: 'Internal server error' });
});

// 4.4 Built-in middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static('public')); // Serve static files

// 4.5 Third-party middleware
const cors = require('cors');
const helmet = require('helmet');

app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers

// 5. CUSTOM MIDDLEWARE EXAMPLES

// 5.1 Request timing middleware
function requestTimer(req, res, next) {
req.startTime = Date.now();

res.on('finish', () => {
  const duration = Date.now() - req.startTime;
  console.log(\`\${req.method} \${req.url} - \${duration}ms\`);
});

next();
}

// 5.2 Request ID middleware
function requestId(req, res, next) {
req.id = req.headers['x-request-id'] || generateId();
res.setHeader('x-request-id', req.id);
next();
}

function generateId() {
return Math.random().toString(36).substr(2, 9);
}

// 5.3 Rate limiting middleware
class RateLimiter {
constructor(limit, windowMs) {
  this.limit = limit;
  this.windowMs = windowMs;
  this.requests = new Map();
}

middleware(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  
  if (!this.requests.has(ip)) {
    this.requests.set(ip, []);
  }
  
  const userRequests = this.requests.get(ip);
  
  // Remove old requests outside the window
  const validRequests = userRequests.filter(time => now - time < this.windowMs);
  
  if (validRequests.length >= this.limit) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  validRequests.push(now);
  this.requests.set(ip, validRequests);
  
  next();
}
}

const rateLimiter = new RateLimiter(100, 60000); // 100 requests per minute

// 5.4 Authentication middleware
function authenticate(req, res, next) {
const token = req.headers.authorization?.replace('Bearer ', '');

if (!token) {
  return res.status(401).json({ error: 'Authentication required' });
}

try {
  // Verify JWT token (simplified)
  const decoded = verifyToken(token);
  req.user = decoded;
  next();
} catch (error) {
  return res.status(401).json({ error: 'Invalid token' });
}
}

function verifyToken(token) {
// Simplified token verification
return { id: 1, name: 'User', role: 'admin' };
}

// 5.5 Validation middleware
function validateUser(req, res, next) {
const { name, email, age } = req.body;

const errors = [];

if (!name || name.length < 2) {
  errors.push('Name must be at least 2 characters');
}

if (!email || !email.includes('@')) {
  errors.push('Valid email is required');
}

if (!age || age < 18) {
  errors.push('Age must be 18 or older');
}

if (errors.length > 0) {
  return res.status(400).json({ errors });
}

next();
}

// 5.6 Caching middleware
class CacheMiddleware {
constructor() {
  this.cache = new Map();
}

middleware(ttl = 300000) { // 5 minutes default
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return res.json(cached.data);
    }
    
    // Store original send method
    const originalSend = res.json;
    
    // Override send method to cache response
    res.json = function(data) {
      this.cache.set(key, {
        data: data,
        timestamp: Date.now()
      });
      
      originalSend.call(this, data);
    }.bind(this);
    
    next();
  };
}
}

const cacheMiddleware = new CacheMiddleware();

// 6. MIDDLEWARE EXECUTION ORDER

// Middleware execution order example
app.use((req, res, next) => {
console.log('1. First middleware');
next();
});

app.use((req, res, next) => {
console.log('2. Second middleware');
next();
});

app.use('/api', (req, res, next) => {
console.log('3. API-specific middleware');
next();
});

app.get('/api/users', (req, res, next) => {
console.log('4. Route-specific middleware');
next();
}, (req, res) => {
console.log('5. Route handler');
res.json({ users: [] });
});

// 7. CONDITIONAL MIDDLEWARE

// Middleware that runs conditionally
function conditionalMiddleware(condition) {
return (req, res, next) => {
  if (condition(req)) {
    // Execute middleware logic
    console.log('Conditional middleware executed');
  }
  next();
};
}

// Usage examples
app.use(conditionalMiddleware(req => req.method === 'POST'));
app.use(conditionalMiddleware(req => req.path.startsWith('/admin')));

// 8. ASYNC MIDDLEWARE

// Async middleware with proper error handling
async function asyncMiddleware(req, res, next) {
try {
  // Async operation
  const data = await fetchDataFromDatabase();
  req.data = data;
  next();
} catch (error) {
  next(error); // Pass error to error handling middleware
}
}

async function fetchDataFromDatabase() {
// Simulate async database operation
return new Promise(resolve => {
  setTimeout(() => resolve({ id: 1, name: 'Test' }), 100);
});
}

// 9. MIDDLEWARE FACTORY

// Factory function to create middleware with configuration
function createLoggerMiddleware(options = {}) {
const { level = 'info', format = 'simple' } = options;

return (req, res, next) => {
  const logData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.headers['user-agent']
  };
  
       if (format === 'json') {
     console.log(JSON.stringify(logData));
   } else {
     console.log('[' + logData.timestamp + '] ' + logData.method + ' ' + logData.url);
   }
  
  next();
};
}

// Usage
const simpleLogger = createLoggerMiddleware();
const jsonLogger = createLoggerMiddleware({ format: 'json' });

// 10. MIDDLEWARE COMPOSITION

// Compose multiple middleware functions
function compose(...middlewares) {
return (req, res, next) => {
  let index = 0;
  
  function executeNext() {
    if (index >= middlewares.length) {
      return next();
    }
    
    const middleware = middlewares[index++];
    middleware(req, res, executeNext);
  }
  
  executeNext();
};
}

// Usage
const composedMiddleware = compose(
requestTimer,
requestId,
authenticate
);

app.use('/api/protected', composedMiddleware);

// 11. MIDDLEWARE ERROR HANDLING

// Error handling middleware
function errorHandler(err, req, res, next) {
console.error('Error:', err);

// Log error details
console.error('Stack:', err.stack);
console.error('URL:', req.url);
console.error('Method:', req.method);

// Send appropriate error response
if (err.name === 'ValidationError') {
  return res.status(400).json({ error: err.message });
}

if (err.name === 'UnauthorizedError') {
  return res.status(401).json({ error: 'Unauthorized' });
}

// Default error
res.status(500).json({ error: 'Internal server error' });
}

// 12. MIDDLEWARE TESTING

// Testing middleware
function testMiddleware(middleware) {
return (req, res, next) => {
  const originalSend = res.send;
  const originalJson = res.json;
  
  // Track if response was sent
  let responseSent = false;
  
  res.send = function(data) {
    responseSent = true;
    originalSend.call(this, data);
  };
  
  res.json = function(data) {
    responseSent = true;
    originalJson.call(this, data);
  };
  
  // Execute middleware
  middleware(req, res, (error) => {
    if (error && !responseSent) {
      console.error('Middleware error:', error);
    }
    next();
  });
};
}

// 13. MIDDLEWARE BEST PRACTICES

const middlewareBestPractices = {
'Order Matters': [
  'Place security middleware first',
  'Put logging middleware early',
  'Handle errors last',
  'Consider middleware execution order'
],
'Error Handling': [
  'Always handle errors in async middleware',
  'Use next(error) to pass errors',
  'Implement proper error handling middleware',
  'Log errors appropriately'
],
'Performance': [
  'Keep middleware lightweight',
  'Use caching where appropriate',
  'Avoid blocking operations',
  'Profile middleware performance'
],
'Security': [
  'Validate input in middleware',
  'Sanitize data',
  'Implement rate limiting',
  'Use security headers'
],
'Maintainability': [
  'Keep middleware focused and single-purpose',
  'Use middleware factories for configuration',
  'Document middleware behavior',
  'Test middleware thoroughly'
]
};

// 14. COMPLETE MIDDLEWARE EXAMPLE

// Complete Express application with various middleware
const completeApp = express();

// Security middleware
completeApp.use(helmet());
completeApp.use(cors());

// Logging middleware
completeApp.use(requestTimer);
completeApp.use(requestId);

// Body parsing middleware
completeApp.use(express.json());
completeApp.use(express.urlencoded({ extended: true }));

// Rate limiting
completeApp.use(rateLimiter.middleware.bind(rateLimiter));

// Authentication for protected routes
completeApp.use('/api/protected', authenticate);

// Validation middleware for specific routes
completeApp.post('/api/users', validateUser);

// Caching for GET requests
completeApp.use('/api/data', cacheMiddleware.middleware());

// Error handling (must be last)
completeApp.use(errorHandler);

// 15. MIDDLEWARE PATTERNS

const middlewarePatterns = {
'Chain of Responsibility': 'Middleware chain processes requests sequentially',
'Decorator Pattern': 'Add functionality without modifying existing code',
'Pipeline Pattern': 'Data flows through multiple processing stages',
'Interceptor Pattern': 'Intercept and modify requests/responses',
'Filter Pattern': 'Filter requests based on conditions'
};

// 16. MIDDLEWARE MONITORING

class MiddlewareMonitor {
constructor() {
  this.metrics = new Map();
}

// Monitor middleware performance
monitor(middlewareName) {
  return (req, res, next) => {
    const startTime = Date.now();
    
    // Store original end method
    const originalEnd = res.end;
    
    res.end = function() {
      const duration = Date.now() - startTime;
      
      if (!this.metrics.has(middlewareName)) {
        this.metrics.set(middlewareName, []);
      }
      
      this.metrics.get(middlewareName).push(duration);
      
      originalEnd.apply(this, arguments);
    }.bind(this);
    
    next();
  };
}

// Get middleware performance stats
getStats() {
  const stats = {};
  
  for (const [name, durations] of this.metrics) {
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    stats[name] = {
      count: durations.length,
      avgDuration: avg.toFixed(2) + 'ms',
      minDuration: Math.min(...durations) + 'ms',
      maxDuration: Math.max(...durations) + 'ms'
    };
  }
  
  return stats;
}
}

const monitor = new MiddlewareMonitor();

// Usage
app.use('/api', monitor.monitor('api-middleware'));`,
  testCases: [
    { 
      input: `function basicMiddleware(req, res, next) {
req.timestamp = new Date();
next();
}`, 
      output: `// Basic middleware function` 
    },
    {
      input: `app.use((req, res, next) => {
console.log(req.method, req.url);
next();
});`,
      output: `// Application-level middleware`
    },
    {
      input: `app.use((err, req, res, next) => {
console.error(err.message);
res.status(500).json({ error: 'Server error' });
});`,
      output: `// Error handling middleware`
    }
  ],
  explanation: `**Middleware in Node.js** is software that acts as a bridge between different applications or components, processing requests and responses in a chain-like manner.

**What is Middleware?**

Middleware functions in Node.js/Express:
- **Have access** to request (req), response (res), and next() function
- **Can execute code** during the request-response cycle
- **Can modify** request and response objects
- **Can end** the request-response cycle
- **Can call** the next middleware in the stack

**How Middleware Works:**

**1. Request-Response Cycle:**
1. **Request arrives** at the server
2. **Middleware chain executes** in order
3. **Each middleware** can process the request
4. **Route handler** processes the final request
5. **Response sent** back to client

**2. Middleware Flow:**
\`\`\`
Request → Middleware 1 → Middleware 2 → ... → Route Handler → Response
\`\`\`

**3. The next() Function:**
- **Passes control** to the next middleware
- **If not called**, request hangs
- **Can pass errors** to error handling middleware

**Types of Middleware:**

**1. Application-level Middleware:**
- Applied to **all routes** in the application
- Example: Logging, authentication, CORS

**2. Router-level Middleware:**
- Applied to **specific routes** or route groups
- Example: API-specific middleware

**3. Error-handling Middleware:**
- Must have **4 parameters** (err, req, res, next)
- Handles errors from other middleware
- Should be placed **last** in the middleware stack

**4. Built-in Middleware:**
- **express.json()**: Parse JSON request bodies
- **express.urlencoded()**: Parse URL-encoded bodies
- **express.static()**: Serve static files

**5. Third-party Middleware:**
- **cors**: Enable Cross-Origin Resource Sharing
- **helmet**: Security headers
- **morgan**: HTTP request logging

**Custom Middleware Examples:**

**1. Request Timing:**
- Track request duration
- Log performance metrics
- Monitor response times

**2. Authentication:**
- Verify user tokens
- Add user data to request
- Protect routes

**3. Validation:**
- Validate request data
- Check required fields
- Sanitize input

**4. Rate Limiting:**
- Limit requests per IP
- Prevent abuse
- Protect resources

**5. Caching:**
- Cache responses
- Improve performance
- Reduce server load

**Middleware Execution Order:**

**Important**: Middleware executes in the order it's defined:
1. **Security middleware** (helmet, cors)
2. **Logging middleware** (request timing, logging)
3. **Body parsing middleware** (express.json, express.urlencoded)
4. **Authentication middleware** (verify tokens)
5. **Route-specific middleware** (validation, caching)
6. **Route handlers**
7. **Error handling middleware** (last)

**Best Practices:**

**1. Order Matters:**
- Place security middleware first
- Put logging middleware early
- Handle errors last
- Consider execution order carefully

**2. Error Handling:**
- Always handle errors in async middleware
- Use next(error) to pass errors
- Implement proper error handling middleware
- Log errors appropriately

**3. Performance:**
- Keep middleware lightweight
- Use caching where appropriate
- Avoid blocking operations
- Profile middleware performance

**4. Security:**
- Validate input in middleware
- Sanitize data
- Implement rate limiting
- Use security headers

**5. Maintainability:**
- Keep middleware focused and single-purpose
- Use middleware factories for configuration
- Document middleware behavior
- Test middleware thoroughly

**Common Middleware Patterns:**

**1. Chain of Responsibility:**
- Middleware chain processes requests sequentially
- Each middleware can handle or pass the request

**2. Decorator Pattern:**
- Add functionality without modifying existing code
- Wrap existing functionality with new behavior

**3. Pipeline Pattern:**
- Data flows through multiple processing stages
- Each stage transforms the data

**4. Interceptor Pattern:**
- Intercept and modify requests/responses
- Add cross-cutting concerns

**Why Middleware is Important:**

1. **Modularity**: Break down complex logic into reusable pieces
2. **Separation of Concerns**: Each middleware has a specific responsibility
3. **Reusability**: Middleware can be shared across different routes
4. **Maintainability**: Easy to add, remove, or modify functionality
5. **Testing**: Individual middleware can be tested in isolation
6. **Flexibility**: Can be applied conditionally or globally

**Real-world Applications:**

- **Authentication**: Verify user credentials
- **Logging**: Track requests and responses
- **Caching**: Improve performance
- **Validation**: Ensure data integrity
- **Rate Limiting**: Prevent abuse
- **CORS**: Handle cross-origin requests
- **Compression**: Reduce response size
- **Security**: Add security headers

Middleware is a fundamental concept in Node.js that enables building modular, maintainable, and scalable applications by providing a clean way to handle cross-cutting concerns and request processing logic.`
},
{
  id: 'nodejs-10',
  title: 'Advantages of Express.js over Node.js',
  description: 'Understanding the key advantages and benefits that Express.js provides as a web framework built on top of Node.js, and how it simplifies web application development.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// Express.js vs Node.js - Key Advantages

// 1. ROUTING SIMPLIFICATION
// Node.js (Vanilla) - Complex routing
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
const parsedUrl = url.parse(req.url, true);
const path = parsedUrl.pathname;

if (path === '/users' && req.method === 'GET') {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ users: [] }));
} else if (path === '/users' && req.method === 'POST') {
  // Handle POST logic
} else if (path.startsWith('/users/')) {
  const userId = path.split('/')[2];
  // Handle specific user logic
} else {
  res.writeHead(404);
  res.end('Not Found');
}
});

// Express.js - Simple routing
const express = require('express');
const app = express();

app.get('/users', (req, res) => {
res.json({ users: [] });
});

app.post('/users', (req, res) => {
// Handle POST logic
});

app.get('/users/:id', (req, res) => {
const userId = req.params.id;
// Handle specific user logic
});

// 2. MIDDLEWARE SUPPORT
// Node.js (Vanilla) - Manual middleware implementation
const server2 = http.createServer((req, res) => {
// Manual authentication check
const token = req.headers.authorization;
if (!token) {
  res.writeHead(401);
  res.end('Unauthorized');
  return;
}

// Manual body parsing
let body = '';
req.on('data', chunk => {
  body += chunk.toString();
});

req.on('end', () => {
  try {
    const data = JSON.parse(body);
    // Process data
  } catch (error) {
    res.writeHead(400);
    res.end('Invalid JSON');
  }
});
});

// Express.js - Built-in middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Custom middleware
app.use((req, res, next) => {
const token = req.headers.authorization;
if (!token) {
  return res.status(401).json({ error: 'Unauthorized' });
}
next();
});

// 3. ERROR HANDLING
// Node.js (Vanilla) - Manual error handling
const server3 = http.createServer((req, res) => {
try {
  // Route logic
} catch (error) {
  res.writeHead(500);
  res.end('Internal Server Error');
}
});

// Express.js - Centralized error handling
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ error: 'Something went wrong!' });
});

// 4. TEMPLATE ENGINE SUPPORT
// Express.js - Built-in template support
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/dashboard', (req, res) => {
res.render('dashboard', { user: req.user });
});

// 5. STATIC FILE SERVING
// Express.js - Simple static file serving
app.use(express.static('public'));

// 6. REQUEST VALIDATION
// Express.js - Easy parameter extraction
app.get('/users/:id/posts/:postId', (req, res) => {
const { id, postId } = req.params;
const { page, limit } = req.query;

console.log('User ID:', id);
console.log('Post ID:', postId);
console.log('Page:', page);
console.log('Limit:', limit);
});

// 7. RESPONSE HELPERS
// Express.js - Convenient response methods
app.get('/api/data', (req, res) => {
// JSON response
res.json({ success: true, data: [] });

// Status codes
res.status(201).json({ message: 'Created' });

// Redirect
res.redirect('/dashboard');

// Send file
res.sendFile('/path/to/file.pdf');
});

// 8. ROUTE ORGANIZATION
// Express.js - Modular routing
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// 9. CORS HANDLING
// Express.js - Easy CORS setup
const cors = require('cors');

app.use(cors({
origin: 'http://localhost:3000',
credentials: true
}));

// 10. REQUEST LOGGING
// Express.js - Built-in logging
const morgan = require('morgan');

app.use(morgan('combined')); // Log all requests

// 11. SECURITY MIDDLEWARE
// Express.js - Security headers
const helmet = require('helmet');

app.use(helmet()); // Add security headers

// 12. RATE LIMITING
// Express.js - Rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes
max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// 13. FILE UPLOAD HANDLING
// Express.js - File uploads
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
res.json({ filename: req.file.filename });
});

// 14. SESSION MANAGEMENT
// Express.js - Session handling
const session = require('express-session');

app.use(session({
secret: 'your-secret-key',
resave: false,
saveUninitialized: false
}));

// 15. COMPRESSION
// Express.js - Response compression
const compression = require('compression');

app.use(compression()); // Compress all responses

// 16. DEVELOPMENT TOOLS
// Express.js - Development utilities
if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev')); // Colored logging
}

// 17. API DOCUMENTATION
// Express.js - Auto-generated API docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 18. TESTING SUPPORT
// Express.js - Easy testing
const request = require('supertest');

describe('User API', () => {
it('should get users', async () => {
  const response = await request(app)
    .get('/api/users')
    .expect(200);
  
  expect(response.body).toHaveProperty('users');
});
});

// 19. PRODUCTION READY FEATURES
// Express.js - Production optimizations
app.set('trust proxy', 1); // Trust first proxy
app.set('view cache', true); // Enable view caching

// 20. EXTENSIBILITY
// Express.js - Plugin ecosystem
app.use(require('express-ws')(app)); // WebSocket support
app.use(require('socket.io')(server)); // Real-time features`,
  testCases: [
    { 
      input: `// Express.js routing
app.get('/users', (req, res) => {
res.json({ users: [] });
});`, 
      output: `// Simple and clean routing` 
    },
    {
      input: `// Express.js middleware
app.use(express.json());
app.use((req, res, next) => {
console.log(req.method, req.url);
next();
});`,
      output: `// Easy middleware implementation`
    },
    {
      input: `// Express.js error handling
app.use((err, req, res, next) => {
res.status(500).json({ error: err.message });
});`,
      output: `// Centralized error handling`
    }
  ],
  explanation: `**Express.js** is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Here are the key advantages of Express.js over vanilla Node.js:

**1. Simplified Routing**
- **Express.js**: Clean, declarative routing with HTTP method support
- **Node.js**: Manual URL parsing and method checking required
- **Benefit**: Faster development, cleaner code, better maintainability

**2. Built-in Middleware Support**
- **Express.js**: Extensive middleware ecosystem and easy integration
- **Node.js**: Manual implementation of cross-cutting concerns
- **Benefit**: Reusable components, faster development, better architecture

**3. Request/Response Enhancement**
- **Express.js**: Enhanced req/res objects with convenient methods
- **Node.js**: Basic HTTP request/response objects
- **Benefit**: Easier data access, better developer experience

**4. Template Engine Integration**
- **Express.js**: Built-in support for multiple template engines
- **Node.js**: Manual template rendering and file serving
- **Benefit**: Easy server-side rendering, better separation of concerns

**5. Static File Serving**
- **Express.js**: One-line static file serving
- **Node.js**: Manual file system operations and MIME type handling
- **Benefit**: Faster development, better performance

**6. Error Handling**
- **Express.js**: Centralized error handling with middleware
- **Node.js**: Manual try-catch blocks throughout the application
- **Benefit**: Consistent error handling, better debugging

**7. Security Features**
- **Express.js**: Built-in security middleware and best practices
- **Node.js**: Manual security implementation required
- **Benefit**: Better security out of the box, reduced vulnerabilities

**8. Development Tools**
- **Express.js**: Rich ecosystem of development and debugging tools
- **Node.js**: Limited built-in development support
- **Benefit**: Faster debugging, better development experience

**9. Community and Ecosystem**
- **Express.js**: Large community, extensive documentation, many plugins
- **Node.js**: Core functionality only, limited web-specific features
- **Benefit**: More resources, faster problem-solving, better support

**10. Production Readiness**
- **Express.js**: Built-in production optimizations and best practices
- **Node.js**: Manual optimization and configuration required
- **Benefit**: Better performance, easier deployment

**11. Code Organization**
- **Express.js**: Clear separation of routes, middleware, and handlers
- **Node.js**: Monolithic server code with mixed concerns
- **Benefit**: Better maintainability, easier testing, cleaner architecture

**12. API Development**
- **Express.js**: Optimized for RESTful API development
- **Node.js**: Manual API structure and response handling
- **Benefit**: Faster API development, better API design

**13. Testing Support**
- **Express.js**: Excellent testing utilities and frameworks
- **Node.js**: Manual test setup and HTTP client simulation
- **Benefit**: Easier testing, better test coverage

**14. Performance Optimizations**
- **Express.js**: Built-in performance features and optimizations
- **Node.js**: Manual performance tuning required
- **Benefit**: Better performance out of the box

**15. Extensibility**
- **Express.js**: Plugin architecture and middleware system
- **Node.js**: Manual extension and integration
- **Benefit**: Easy feature addition, better modularity

**When to Use Express.js vs Node.js:**

**Use Express.js when:**
- Building web applications or APIs
- Need rapid development
- Want built-in web features
- Working with teams
- Need extensive middleware
- Building production applications

**Use Node.js when:**
- Building non-web applications
- Need complete control over HTTP handling
- Building custom protocols
- Performance is critical
- Minimal dependencies required
- Learning Node.js fundamentals

**Real-world Impact:**

1. **Development Speed**: Express.js can reduce development time by 50-70%
2. **Code Quality**: Cleaner, more maintainable code structure
3. **Team Productivity**: Easier onboarding and collaboration
4. **Maintenance**: Easier to maintain and update applications
5. **Scalability**: Better architecture for scaling applications
6. **Security**: Built-in security features reduce vulnerabilities
7. **Testing**: Easier to write and maintain tests
8. **Documentation**: Better API documentation and examples

**Best Practices with Express.js:**

1. **Use middleware appropriately**: Don't over-engineer simple applications
2. **Organize routes**: Use modular routing for large applications
3. **Handle errors properly**: Implement comprehensive error handling
4. **Use security middleware**: Always include security headers
5. **Optimize for production**: Use compression, caching, and other optimizations
6. **Test thoroughly**: Write tests for all routes and middleware
7. **Document APIs**: Use tools like Swagger for API documentation
8. **Monitor performance**: Use logging and monitoring tools

Express.js transforms Node.js from a low-level HTTP server into a powerful web application framework, making it the preferred choice for most web development projects while still maintaining the performance and flexibility of Node.js.`
},
{
  id: 'nodejs-11',
  title: 'How to Implement Error Handling in Node.js',
  description: 'Understanding different error handling patterns and implementation strategies in Node.js applications, including try-catch, promises, async/await, and middleware approaches.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// Error Handling Implementation in Node.js

// 1. BASIC TRY-CATCH ERROR HANDLING
function divideNumbers(a, b) {
try {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
} catch (error) {
  console.error('Error in division:', error.message);
  throw error; // Re-throw to let caller handle
}
}

// Usage
try {
const result = divideNumbers(10, 0);
console.log('Result:', result);
} catch (error) {
console.error('Caught error:', error.message);
}

// 2. ASYNC/AWAIT ERROR HANDLING
async function fetchUserData(userId) {
try {
  const response = await fetch(\`https://api.example.com/users/\${userId}\`);
  
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  
  const userData = await response.json();
  return userData;
} catch (error) {
  console.error('Failed to fetch user data:', error.message);
  throw new Error('User data fetch failed');
}
}

// Usage with async/await
async function getUserProfile(userId) {
try {
  const userData = await fetchUserData(userId);
  console.log('User data:', userData);
  return userData;
} catch (error) {
  console.error('Error getting user profile:', error.message);
  return null;
}
}

// 3. PROMISE-BASED ERROR HANDLING
function readFileAsync(filename) {
return new Promise((resolve, reject) => {
  const fs = require('fs');
  
  fs.readFile(filename, 'utf8', (error, data) => {
    if (error) {
      reject(new Error(\`Failed to read file: \${error.message}\`));
    } else {
      resolve(data);
    }
  });
});
}

// Usage with .then() and .catch()
readFileAsync('config.json')
.then(data => {
  console.log('File content:', data);
})
.catch(error => {
  console.error('File read error:', error.message);
});

// 4. EXPRESS.JS ERROR HANDLING MIDDLEWARE
const express = require('express');
const app = express();

// Custom error class
class AppError extends Error {
constructor(message, statusCode) {
  super(message);
  this.statusCode = statusCode;
  this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
  this.isOperational = true;

  Error.captureStackTrace(this, this.constructor);
}
}

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
err.statusCode = err.statusCode || 500;
err.status = err.status || 'error';

if (process.env.NODE_ENV === 'development') {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
} else {
  // Production error response
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // Programming or unknown errors
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
}
});

// 5. ROUTE-LEVEL ERROR HANDLING
app.get('/users/:id', async (req, res, next) => {
try {
  const userId = req.params.id;
  
  if (!userId || isNaN(userId)) {
    throw new AppError('Invalid user ID', 400);
  }
  
  const user = await getUserById(userId);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  res.json({
    status: 'success',
    data: { user }
  });
} catch (error) {
  next(error); // Pass to error handling middleware
}
});

// 6. GLOBAL ERROR HANDLERS
// Unhandled promise rejections
process.on('unhandledRejection', (err) => {
console.log('UNHANDLED REJECTION! 💥 Shutting down...');
console.log(err.name, err.message);
process.exit(1);
});

// Uncaught exceptions
process.on('uncaughtException', (err) => {
console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
console.log(err.name, err.message);
process.exit(1);
});

// 7. DATABASE ERROR HANDLING
async function createUser(userData) {
try {
  const { name, email, password } = userData;
  
  // Validation
  if (!name || !email || !password) {
    throw new AppError('Missing required fields', 400);
  }
  
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists', 409);
  }
  
  // Create user
  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 12)
  });
  
  return user;
} catch (error) {
  if (error.code === 11000) {
    // MongoDB duplicate key error
    throw new AppError('Email already exists', 409);
  }
  throw error;
}
}

// 8. FILE SYSTEM ERROR HANDLING
const fs = require('fs').promises;

async function processFile(filename) {
try {
  const content = await fs.readFile(filename, 'utf8');
  const processed = content.toUpperCase();
  await fs.writeFile(\`\${filename}.processed\`, processed);
  return 'File processed successfully';
} catch (error) {
  if (error.code === 'ENOENT') {
    throw new AppError('File not found', 404);
  } else if (error.code === 'EACCES') {
    throw new AppError('Permission denied', 403);
  } else {
    throw new AppError('File processing failed', 500);
  }
}
}

// 9. NETWORK ERROR HANDLING
const axios = require('axios');

async function makeApiCall(url, options = {}) {
try {
  const response = await axios({
    url,
    method: options.method || 'GET',
    timeout: options.timeout || 5000,
    headers: options.headers || {},
    data: options.data
  });
  
  return response.data;
} catch (error) {
  if (error.code === 'ECONNREFUSED') {
    throw new AppError('Service unavailable', 503);
  } else if (error.code === 'ETIMEDOUT') {
    throw new AppError('Request timeout', 408);
  } else if (error.response) {
    // Server responded with error status
    throw new AppError(
      error.response.data.message || 'API request failed',
      error.response.status
    );
  } else {
    throw new AppError('Network error', 500);
  }
}
}

// 10. VALIDATION ERROR HANDLING
const Joi = require('joi');

const userSchema = Joi.object({
name: Joi.string().min(2).max(50).required(),
email: Joi.string().email().required(),
age: Joi.number().min(18).max(120).optional()
});

function validateUserData(userData) {
try {
  const { error, value } = userSchema.validate(userData);
  
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    throw new AppError(\`Validation error: \${errorMessage}\`, 400);
  }
  
  return value;
} catch (error) {
  throw error;
}
}

// 11. MIDDLEWARE ERROR HANDLING
function asyncHandler(fn) {
return (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
}

// Usage with asyncHandler
app.get('/products/:id', asyncHandler(async (req, res, next) => {
const product = await Product.findById(req.params.id);

if (!product) {
  throw new AppError('Product not found', 404);
}

res.json({
  status: 'success',
  data: { product }
});
}));

// 12. LOGGING ERROR HANDLING
const winston = require('winston');

const logger = winston.createLogger({
level: 'error',
format: winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
),
transports: [
  new winston.transports.File({ filename: 'error.log' }),
  new winston.transports.Console({
    format: winston.format.simple()
  })
]
});

function logError(error, req = null) {
const errorLog = {
  message: error.message,
  stack: error.stack,
  statusCode: error.statusCode,
  timestamp: new Date().toISOString(),
  url: req ? req.url : null,
  method: req ? req.method : null,
  ip: req ? req.ip : null
};

logger.error(errorLog);
}

// 13. RETRY MECHANISM WITH ERROR HANDLING
async function retryOperation(operation, maxRetries = 3, delay = 1000) {
for (let attempt = 1; attempt <= maxRetries; attempt++) {
  try {
    return await operation();
  } catch (error) {
    if (attempt === maxRetries) {
      throw error;
    }
    
    console.log(\`Attempt \${attempt} failed, retrying in \${delay}ms...\`);
    await new Promise(resolve => setTimeout(resolve, delay));
    delay *= 2; // Exponential backoff
  }
}
}

// Usage
const result = await retryOperation(async () => {
return await makeApiCall('https://api.example.com/data');
});

// 14. CIRCUIT BREAKER PATTERN
class CircuitBreaker {
constructor(failureThreshold = 5, resetTimeout = 60000) {
  this.failureThreshold = failureThreshold;
  this.resetTimeout = resetTimeout;
  this.failureCount = 0;
  this.lastFailureTime = null;
  this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
}

async execute(operation) {
  if (this.state === 'OPEN') {
    if (Date.now() - this.lastFailureTime > this.resetTimeout) {
      this.state = 'HALF_OPEN';
    } else {
      throw new Error('Circuit breaker is OPEN');
    }
  }

  try {
    const result = await operation();
    this.onSuccess();
    return result;
  } catch (error) {
    this.onFailure();
    throw error;
  }
}

onSuccess() {
  this.failureCount = 0;
  this.state = 'CLOSED';
}

onFailure() {
  this.failureCount++;
  this.lastFailureTime = Date.now();
  
  if (this.failureCount >= this.failureThreshold) {
    this.state = 'OPEN';
  }
}
}

// Usage
const breaker = new CircuitBreaker();
const result = await breaker.execute(() => makeApiCall('https://api.example.com/data'));

// 15. ERROR MONITORING AND ALERTING
class ErrorMonitor {
constructor() {
  this.errorCounts = new Map();
  this.alertThreshold = 10;
}

trackError(error, context = {}) {
  const errorKey = \`\${error.name}:\${error.message}\`;
  const count = this.errorCounts.get(errorKey) || 0;
  this.errorCounts.set(errorKey, count + 1);

  // Log error
  logError(error, context);

  // Check if alert should be sent
  if (count + 1 >= this.alertThreshold) {
    this.sendAlert(errorKey, count + 1, context);
  }
}

sendAlert(errorKey, count, context) {
  console.log(\`ALERT: Error "\${errorKey}" occurred \${count} times\`);
  // Send to monitoring service (e.g., Sentry, LogRocket)
}
}

const errorMonitor = new ErrorMonitor();

// Wrap error handling
function monitoredErrorHandler(error, req, res, next) {
errorMonitor.trackError(error, { req });
next(error);
}`,
  testCases: [
    { 
      input: `try {
const result = divideNumbers(10, 0);
} catch (error) {
console.error('Error:', error.message);
}`, 
      output: `Error: Division by zero is not allowed` 
    },
    {
      input: `async function handleUser(userId) {
try {
  const user = await fetchUserData(userId);
  return user;
} catch (error) {
  console.error('User fetch failed:', error.message);
  return null;
}
}`,
      output: `// Proper async error handling`
    },
    {
      input: `app.use((err, req, res, next) => {
res.status(err.statusCode || 500).json({
  status: 'error',
  message: err.message
});
});`,
      output: `// Express error handling middleware`
    }
  ],
  explanation: `**Error handling in Node.js** is crucial for building robust and reliable applications. Here are the key implementation patterns and strategies:

**1. Basic Try-Catch Error Handling**
- **Synchronous operations**: Use try-catch blocks for immediate error handling
- **Error propagation**: Re-throw errors when appropriate to let higher levels handle
- **Error logging**: Always log errors for debugging and monitoring

**2. Async/Await Error Handling**
- **Async functions**: Use try-catch with async/await for cleaner error handling
- **Promise rejection**: Handle promise rejections properly
- **Error boundaries**: Implement error boundaries for different async operations

**3. Promise-Based Error Handling**
- **.catch() method**: Handle promise rejections
- **Promise chaining**: Proper error propagation in promise chains
- **Error transformation**: Transform errors into meaningful messages

**4. Express.js Error Handling Middleware**
- **Error middleware**: Must be defined last in the middleware stack
- **Custom error classes**: Create specific error types for different scenarios
- **Environment-specific responses**: Different error responses for development vs production

**5. Route-Level Error Handling**
- **Try-catch in routes**: Handle errors within route handlers
- **Next(error)**: Pass errors to error handling middleware
- **Validation errors**: Handle input validation errors appropriately

**6. Global Error Handlers**
- **Unhandled rejections**: Catch unhandled promise rejections
- **Uncaught exceptions**: Handle uncaught exceptions
- **Graceful shutdown**: Implement proper shutdown procedures

**7. Database Error Handling**
- **Connection errors**: Handle database connection issues
- **Query errors**: Handle SQL/NoSQL query errors
- **Validation errors**: Handle data validation failures
- **Duplicate key errors**: Handle unique constraint violations

**8. File System Error Handling**
- **File not found**: Handle missing files gracefully
- **Permission errors**: Handle access permission issues
- **I/O errors**: Handle file system operation failures

**9. Network Error Handling**
- **Connection errors**: Handle network connectivity issues
- **Timeout errors**: Handle request timeouts
- **HTTP errors**: Handle different HTTP status codes
- **Retry logic**: Implement retry mechanisms for transient failures

**10. Validation Error Handling**
- **Input validation**: Validate user input before processing
- **Schema validation**: Use libraries like Joi for structured validation
- **Custom validation**: Implement business logic validation

**11. Middleware Error Handling**
- **AsyncHandler**: Wrap async route handlers to catch errors
- **Error propagation**: Ensure errors reach error handling middleware
- **Context preservation**: Maintain request context in error handling

**12. Logging Error Handling**
- **Structured logging**: Use structured logging for better error tracking
- **Error context**: Include relevant context with error logs
- **Log levels**: Use appropriate log levels for different error types

**13. Retry Mechanisms**
- **Exponential backoff**: Implement exponential backoff for retries
- **Maximum retries**: Set reasonable limits for retry attempts
- **Retry conditions**: Only retry on appropriate error types

**14. Circuit Breaker Pattern**
- **Failure threshold**: Track failure counts
- **State management**: Manage circuit breaker states (CLOSED, OPEN, HALF_OPEN)
- **Automatic recovery**: Allow automatic recovery after timeout

**15. Error Monitoring and Alerting**
- **Error tracking**: Track error frequencies and patterns
- **Alerting**: Send alerts for critical errors
- **Performance monitoring**: Monitor error impact on performance

**Best Practices for Error Handling:**

**1. Error Classification:**
- **Operational errors**: Expected errors that can be handled
- **Programming errors**: Bugs that need fixing
- **System errors**: External system failures

**2. Error Messages:**
- **User-friendly**: Provide meaningful messages to users
- **Developer-friendly**: Include technical details for debugging
- **Security**: Don't expose sensitive information in error messages

**3. Error Logging:**
- **Structured format**: Use structured logging for better analysis
- **Context information**: Include relevant context with errors
- **Log levels**: Use appropriate log levels (error, warn, info, debug)

**4. Error Recovery:**
- **Graceful degradation**: Continue operation when possible
- **Fallback mechanisms**: Provide alternative solutions
- **State management**: Maintain application state during errors

**5. Testing Error Handling:**
- **Unit tests**: Test error handling logic
- **Integration tests**: Test error scenarios in context
- **Error simulation**: Simulate various error conditions

**Common Error Handling Patterns:**

**1. Error-First Callbacks:**
- Traditional Node.js pattern
- First parameter is error object
- Check error before processing result

**2. Promise Error Handling:**
- Use .catch() for promise rejections
- Chain error handlers appropriately
- Transform errors as needed

**3. Async/Await Error Handling:**
- Use try-catch with async functions
- Handle errors at appropriate levels
- Maintain error context

**4. Middleware Error Handling:**
- Centralized error handling in Express
- Environment-specific error responses
- Proper error propagation

**5. Global Error Handlers:**
- Catch unhandled errors
- Implement graceful shutdown
- Log critical errors

**Error Handling in Different Contexts:**

**1. Web Applications:**
- HTTP status codes
- User-friendly error messages
- Error logging and monitoring

**2. APIs:**
- Consistent error response format
- Proper HTTP status codes
- Error documentation

**3. Background Jobs:**
- Retry mechanisms
- Dead letter queues
- Error monitoring

**4. Database Operations:**
- Connection error handling
- Transaction rollback
- Data validation errors

**5. External Services:**
- Network error handling
- Timeout management
- Circuit breaker patterns

**Monitoring and Debugging:**

**1. Error Tracking:**
- Error frequency analysis
- Error pattern recognition
- Performance impact assessment

**2. Alerting:**
- Critical error alerts
- Error threshold monitoring
- Escalation procedures

**3. Debugging:**
- Stack trace analysis
- Error context preservation
- Reproducible test cases

**4. Performance Impact:**
- Error handling overhead
- Memory usage monitoring
- Response time impact

Effective error handling is essential for building reliable Node.js applications. It involves understanding different error types, implementing appropriate handling strategies, and maintaining proper monitoring and logging throughout the application lifecycle.`
},
{
  id: 'nodejs-12',
  title: 'How Node.js Works Asynchronously Despite Being Single-Threaded',
  description: 'Understanding the fundamental architecture of Node.js, how it achieves asynchronous operations using the event loop, libuv, and non-blocking I/O while maintaining a single-threaded execution model.',
  difficulty: 'Hard',
  category: 'nodejs',
  solution: `// Node.js Asynchronous Architecture - Single Threaded but Non-Blocking

// 1. THE EVENT LOOP - CORE OF ASYNCHRONOUS OPERATIONS
console.log('1. Start');

setTimeout(() => {
console.log('2. Timer callback');
}, 0);

Promise.resolve().then(() => {
console.log('3. Promise microtask');
});

console.log('4. End');

// Output:
// 1. Start
// 4. End
// 3. Promise microtask
// 2. Timer callback

// 2. UNDERSTANDING THE EVENT LOOP PHASES
function demonstrateEventLoopPhases() {
console.log('=== Event Loop Phase Demonstration ===');

// Phase 1: Timers
setTimeout(() => {
  console.log('Timer phase - setTimeout');
}, 0);

// Phase 2: Pending callbacks (I/O callbacks)
setImmediate(() => {
  console.log('Check phase - setImmediate');
});

// Phase 3: Poll (I/O operations)
const fs = require('fs');
fs.readFile(__filename, () => {
  console.log('Poll phase - File I/O callback');
  
  // Nested timers
  setTimeout(() => {
    console.log('Nested timer in I/O callback');
  }, 0);
  
  setImmediate(() => {
    console.log('Nested setImmediate in I/O callback');
  });
});

// Phase 4: Check (setImmediate)
setImmediate(() => {
  console.log('Check phase - Another setImmediate');
});

// Phase 5: Close callbacks
const server = require('http').createServer();
server.on('close', () => {
  console.log('Close phase - Server close event');
});

// Microtasks (highest priority)
Promise.resolve().then(() => {
  console.log('Microtask - Promise resolved');
});

process.nextTick(() => {
  console.log('Microtask - process.nextTick');
});
}

// 3. LIBUV THREAD POOL - HANDLING CPU-INTENSIVE TASKS
const crypto = require('crypto');

function demonstrateThreadPool() {
console.log('=== Thread Pool Demonstration ===');

// CPU-intensive task that uses thread pool
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('Thread pool task completed:', derivedKey.toString('hex').substring(0, 20) + '...');
});

// Another thread pool task
crypto.pbkdf2('password2', 'salt2', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('Thread pool task 2 completed:', derivedKey.toString('hex').substring(0, 20) + '...');
});

console.log('Thread pool tasks initiated (non-blocking)');
}

// 4. NON-BLOCKING I/O OPERATIONS
const fs = require('fs');

function demonstrateNonBlockingIO() {
console.log('=== Non-Blocking I/O Demonstration ===');

// Non-blocking file read
fs.readFile(__filename, 'utf8', (err, data) => {
  if (err) {
    console.error('File read error:', err);
    return;
  }
  console.log('File read completed, length:', data.length);
});

// Non-blocking file write
fs.writeFile('test.txt', 'Hello World', (err) => {
  if (err) {
    console.error('File write error:', err);
    return;
  }
  console.log('File write completed');
});

console.log('I/O operations initiated (non-blocking)');
}

// 5. ASYNC/AWAIT WITH EVENT LOOP
async function demonstrateAsyncAwait() {
console.log('=== Async/Await with Event Loop ===');

console.log('1. Starting async function');

// Simulate async operation
const result = await new Promise((resolve) => {
  setTimeout(() => {
    resolve('Async operation completed');
  }, 1000);
});

console.log('2. Result:', result);

// Multiple async operations
const promises = [
  new Promise(resolve => setTimeout(() => resolve('Task 1'), 500)),
  new Promise(resolve => setTimeout(() => resolve('Task 2'), 300)),
  new Promise(resolve => setTimeout(() => resolve('Task 3'), 700))
];

const results = await Promise.all(promises);
console.log('3. All tasks completed:', results);
}

// 6. CALLBACK QUEUE vs MICROTASK QUEUE
function demonstrateQueuePriority() {
console.log('=== Queue Priority Demonstration ===');

// Microtask (highest priority)
Promise.resolve().then(() => {
  console.log('Microtask 1');
});

// Timer (lower priority)
setTimeout(() => {
  console.log('Timer 1');
}, 0);

// Another microtask
Promise.resolve().then(() => {
  console.log('Microtask 2');
});

// Another timer
setTimeout(() => {
  console.log('Timer 2');
}, 0);

// process.nextTick (highest priority microtask)
process.nextTick(() => {
  console.log('process.nextTick');
});

console.log('Synchronous code');
}

// 7. EVENT LOOP BLOCKING vs NON-BLOCKING
function demonstrateBlockingVsNonBlocking() {
console.log('=== Blocking vs Non-Blocking ===');

// BLOCKING OPERATION (blocks event loop)
function blockingOperation() {
  console.log('Starting blocking operation...');
  const start = Date.now();
  
  // Simulate CPU-intensive work
  while (Date.now() - start < 2000) {
    // Blocking the main thread
  }
  
  console.log('Blocking operation completed');
}

// NON-BLOCKING OPERATION (doesn't block event loop)
function nonBlockingOperation() {
  console.log('Starting non-blocking operation...');
  
  setTimeout(() => {
    console.log('Non-blocking operation completed');
  }, 2000);
}

// Demonstrate blocking
console.log('1. Before blocking operation');
blockingOperation();
console.log('2. After blocking operation');

// Demonstrate non-blocking
console.log('3. Before non-blocking operation');
nonBlockingOperation();
console.log('4. After non-blocking operation (immediate)');
}

// 8. WORKER THREADS FOR CPU-INTENSIVE TASKS
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function demonstrateWorkerThreads() {
if (isMainThread) {
  console.log('=== Worker Threads Demonstration ===');
  
  // Create worker thread for CPU-intensive task
  const worker = new Worker(__filename, {
    workerData: { number: 1000000 }
  });
  
  worker.on('message', (result) => {
    console.log('Worker result:', result);
  });
  
  worker.on('error', (error) => {
    console.error('Worker error:', error);
  });
  
  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error('Worker stopped with exit code', code);
    }
  });
  
  console.log('Worker thread created for CPU-intensive task');
} else {
  // Worker thread code
  const { number } = workerData;
  
  // CPU-intensive calculation
  let result = 0;
  for (let i = 0; i < number; i++) {
    result += Math.sqrt(i);
  }
  
  parentPort.postMessage(result);
}
}

// 9. EVENT EMITTER PATTERN
const EventEmitter = require('events');

function demonstrateEventEmitter() {
console.log('=== Event Emitter Pattern ===');

const myEmitter = new EventEmitter();

// Register event listeners
myEmitter.on('data', (data) => {
  console.log('Received data:', data);
});

myEmitter.on('error', (error) => {
  console.error('Error occurred:', error);
});

// Emit events asynchronously
setTimeout(() => {
  myEmitter.emit('data', 'Hello from event emitter');
}, 1000);

setTimeout(() => {
  myEmitter.emit('error', new Error('Something went wrong'));
}, 2000);

console.log('Event listeners registered');
}

// 10. STREAMS - ASYNCHRONOUS DATA PROCESSING
const fs = require('fs');

function demonstrateStreams() {
console.log('=== Streams - Asynchronous Data Processing ===');

// Create readable stream
const readStream = fs.createReadStream(__filename, 'utf8');
const writeStream = fs.createWriteStream('output.txt');

let dataCount = 0;

readStream.on('data', (chunk) => {
  dataCount++;
  console.log(\`Received chunk \${dataCount}, size: \${chunk.length}\`);
});

readStream.on('end', () => {
  console.log('File reading completed');
});

readStream.on('error', (error) => {
  console.error('Stream error:', error);
});

// Pipe data asynchronously
readStream.pipe(writeStream);

writeStream.on('finish', () => {
  console.log('File writing completed');
});

console.log('Stream processing initiated');
}

// 11. ASYNCHRONOUS ITERATION
async function demonstrateAsyncIteration() {
console.log('=== Asynchronous Iteration ===');

// Async generator function
async function* asyncGenerator() {
  for (let i = 0; i < 5; i++) {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i;
  }
}

// Async iteration
for await (const value of asyncGenerator()) {
  console.log('Async iteration value:', value);
}

console.log('Async iteration completed');
}

// 12. PERFORMANCE COMPARISON
function demonstratePerformance() {
console.log('=== Performance Comparison ===');

const iterations = 1000000;

// Synchronous operation
console.time('Synchronous');
let syncResult = 0;
for (let i = 0; i < iterations; i++) {
  syncResult += i;
}
console.timeEnd('Synchronous');

// Asynchronous operation
console.time('Asynchronous');
const promises = [];
for (let i = 0; i < 1000; i++) {
  promises.push(
    new Promise(resolve => {
      setTimeout(() => resolve(i), 0);
    })
  );
}

Promise.all(promises).then(() => {
  console.timeEnd('Asynchronous');
});
}

// 13. EVENT LOOP MONITORING
function monitorEventLoop() {
console.log('=== Event Loop Monitoring ===');

let lastCheck = Date.now();

setInterval(() => {
  const now = Date.now();
  const delay = now - lastCheck - 1000; // Should be ~1000ms
  
  if (delay > 100) {
    console.log(\`Event loop lag detected: \${delay}ms\`);
  }
  
  lastCheck = now;
}, 1000);

console.log('Event loop monitoring started');
}

// 14. PRACTICAL EXAMPLE: WEB SERVER
const http = require('http');

function createAsyncServer() {
console.log('=== Asynchronous Web Server ===');

const server = http.createServer((req, res) => {
  console.log(\`Request received: \${req.method} \${req.url}\`);
  
  // Simulate async database query
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Hello from async server',
      timestamp: new Date().toISOString(),
      url: req.url
    }));
  }, Math.random() * 1000); // Random delay
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log('Try: curl http://localhost:3000/api/users');
});

return server;
}

// 15. DEBUGGING EVENT LOOP
function debugEventLoop() {
console.log('=== Event Loop Debugging ===');

// Monitor event loop phases
const originalSetImmediate = setImmediate;
setImmediate = function(callback, ...args) {
  console.log('setImmediate called');
  return originalSetImmediate(callback, ...args);
};

const originalSetTimeout = setTimeout;
setTimeout = function(callback, delay, ...args) {
  console.log(\`setTimeout called with delay: \${delay}ms\`);
  return originalSetTimeout(callback, delay, ...args);
};

// Test
setTimeout(() => console.log('Timer executed'), 100);
setImmediate(() => console.log('Immediate executed'));

console.log('Event loop debugging enabled');
}`,
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
    },
    {
      input: `async function test() {
console.log('1');
await new Promise(resolve => setTimeout(resolve, 100));
console.log('2');
}
test();
console.log('3');`,
      output: `1
3
2`
    },
    {
      input: `const fs = require('fs');
fs.readFile(__filename, () => console.log('File read'));
console.log('After readFile call');`,
      output: `After readFile call
File read`
    }
  ],
  explanation: `**Node.js achieves asynchronous operations despite being single-threaded** through a sophisticated architecture built around the **Event Loop**, **libuv**, and **non-blocking I/O operations**. Here's how it works:

**1. The Event Loop - Core Mechanism**

The Event Loop is the heart of Node.js's asynchronous architecture:

**Event Loop Phases:**
1. **Timers**: Executes callbacks scheduled by setTimeout() and setInterval()
2. **Pending callbacks**: Executes I/O callbacks deferred to the next loop iteration
3. **Idle, prepare**: Used internally by Node.js
4. **Poll**: Retrieves new I/O events and executes I/O callbacks
5. **Check**: Executes setImmediate() callbacks
6. **Close callbacks**: Executes close event callbacks

**2. Single Threaded but Non-Blocking**

**Main Thread (Event Loop):**
- **Single-threaded**: Only one piece of code executes at a time
- **Non-blocking**: Never waits for I/O operations to complete
- **Event-driven**: Responds to events as they occur

**3. libuv Thread Pool**

**Background Threads:**
- **4 threads by default** (configurable)
- **Handles CPU-intensive tasks**: File system operations, crypto, compression
- **Prevents blocking**: Keeps main thread free for other operations

**4. How Asynchronous Operations Work**

**I/O Operations:**
1. **Request initiated** on main thread
2. **Operation delegated** to libuv thread pool or OS
3. **Main thread continues** processing other tasks
4. **Callback queued** when operation completes
5. **Event loop executes** callback in appropriate phase

**5. Queue System**

**Microtask Queue (Highest Priority):**
- **Promises**: .then(), .catch(), .finally()
- **process.nextTick()**: Highest priority microtask
- **queueMicrotask()**: Custom microtasks

**Macrotask Queue (Lower Priority):**
- **Timers**: setTimeout, setInterval
- **I/O callbacks**: File system, network operations
- **setImmediate**: Check phase callbacks
- **Close callbacks**: Cleanup operations

**6. Non-Blocking I/O**

**File System Operations:**
- **Asynchronous**: Operations don't block the main thread
- **Callback-based**: Results delivered via callbacks
- **Stream-based**: Large files processed in chunks

**Network Operations:**
- **Event-driven**: HTTP requests handled asynchronously
- **Connection pooling**: Efficient resource management
- **Real-time**: WebSocket and SSE support

**7. Event-Driven Architecture**

**Event Emitters:**
- **Built-in events**: HTTP, file system, streams
- **Custom events**: Application-specific events
- **Event listeners**: Respond to events asynchronously

**8. Worker Threads**

**CPU-Intensive Tasks:**
- **Separate threads**: Heavy computations in background
- **Message passing**: Communication between threads
- **Shared memory**: Efficient data sharing (optional)

**9. Streams and Backpressure**

**Asynchronous Data Processing:**
- **Readable streams**: Data sources (files, HTTP responses)
- **Writable streams**: Data destinations (files, HTTP requests)
- **Transform streams**: Data processing pipelines
- **Backpressure**: Automatic flow control

**10. Async/Await and Promises**

**Modern Asynchronous Patterns:**
- **Promise-based**: Cleaner than callbacks
- **Async/await**: Synchronous-looking async code
- **Error handling**: Try-catch for async operations
- **Parallel execution**: Promise.all(), Promise.race()

**11. Performance Benefits**

**Concurrency without Threading:**
- **No thread overhead**: No context switching
- **Memory efficient**: Single process, shared memory
- **Scalable**: Thousands of concurrent connections
- **Fast**: No thread synchronization overhead

**12. Event Loop Blocking**

**What Blocks the Event Loop:**
- **CPU-intensive operations**: Heavy calculations
- **Synchronous I/O**: Blocking file operations
- **Infinite loops**: Never-ending code execution
- **Large JSON parsing**: Synchronous data processing

**13. Best Practices**

**Keep Event Loop Free:**
- **Use async I/O**: Always prefer asynchronous operations
- **Break up heavy tasks**: Use setImmediate() or process.nextTick()
- **Use worker threads**: For CPU-intensive operations
- **Monitor performance**: Track event loop lag

**14. Debugging Asynchronous Code**

**Tools and Techniques:**
- **Event loop monitoring**: Track loop performance
- **Async stack traces**: Better debugging information
- **Performance profiling**: Identify bottlenecks
- **Memory leak detection**: Monitor resource usage

**15. Real-World Applications**

**Web Servers:**
- **Concurrent connections**: Handle thousands simultaneously
- **Real-time applications**: WebSocket, SSE support
- **API servers**: RESTful and GraphQL APIs
- **Microservices**: Lightweight, scalable services

**Why This Architecture Works:**

**1. I/O Bound Applications:**
- **Most web applications** are I/O bound (database, file system, network)
- **Node.js excels** at handling many concurrent I/O operations
- **Event loop** efficiently manages thousands of connections

**2. Non-Blocking Nature:**
- **No waiting**: Operations don't block the main thread
- **High throughput**: Process many requests concurrently
- **Responsive**: Application remains responsive under load

**3. Event-Driven Model:**
- **Natural fit**: Web applications are inherently event-driven
- **Scalable**: Easy to add new event handlers
- **Maintainable**: Clear separation of concerns

**4. JavaScript's Single-Threaded Nature:**
- **No race conditions**: No shared memory issues
- **Simpler programming model**: No thread synchronization
- **Deterministic**: Predictable execution order

**Performance Characteristics:**

**Advantages:**
- **High concurrency**: Thousands of concurrent connections
- **Low memory usage**: Single process, shared memory
- **Fast startup**: No thread initialization overhead
- **Efficient I/O**: Non-blocking operations

**Considerations:**
- **CPU-intensive tasks**: May block event loop
- **Single point of failure**: One process handles everything
- **Memory limits**: Single process memory constraints
- **Debugging complexity**: Asynchronous code can be complex

Node.js's single-threaded, event-driven architecture makes it particularly well-suited for I/O-intensive applications like web servers, APIs, and real-time applications, where the ability to handle many concurrent operations efficiently is more important than raw computational power.`
},
{
  id: 'nodejs-13',
  title: 'SOAP vs REST APIs, HTTP Methods, and API Design Principles',
  description: 'Understanding the differences between SOAP and REST APIs, HTTP methods (GET, POST, PUT, PATCH, DELETE), when to use each, and related API design concepts.',
  difficulty: 'Medium',
  category: 'nodejs',
  solution: `// SOAP vs REST APIs and HTTP Methods

// 1. SOAP API EXAMPLE
const soap = require('soap');

// SOAP Client Example
const soapClient = soap.createClient('http://example.com/soap?wsdl');

function callSoapService() {
const args = {
  userId: 123,
  action: 'getUserDetails'
};

soapClient.getUser(args, (err, result) => {
  if (err) {
    console.error('SOAP Error:', err);
    return;
  }
  console.log('SOAP Response:', result);
});
}

// SOAP Server Example
const soapServer = soap.listen(app, '/soap', {
getUser: function(args) {
  return {
    userId: args.userId,
    name: 'John Doe',
    email: 'john@example.com'
  };
}
}, xml);

// 2. REST API EXAMPLE
const express = require('express');
const app = express();

// REST API Endpoints
app.get('/api/users/:id', (req, res) => {
const userId = req.params.id;
// Get user by ID
res.json({
  id: userId,
  name: 'John Doe',
  email: 'john@example.com'
});
});

app.post('/api/users', (req, res) => {
const userData = req.body;
// Create new user
res.status(201).json({
  id: 123,
  ...userData,
  createdAt: new Date()
});
});

app.put('/api/users/:id', (req, res) => {
const userId = req.params.id;
const userData = req.body;
// Replace entire user resource
res.json({
  id: userId,
  ...userData,
  updatedAt: new Date()
});
});

app.patch('/api/users/:id', (req, res) => {
const userId = req.params.id;
const updates = req.body;
// Partial update
res.json({
  id: userId,
  ...updates,
  updatedAt: new Date()
});
});

app.delete('/api/users/:id', (req, res) => {
const userId = req.params.id;
// Delete user
res.status(204).send();
});

// 3. HTTP METHODS COMPARISON

// GET - Retrieve data (Safe, Idempotent)
app.get('/api/products', (req, res) => {
// Safe: No side effects
// Idempotent: Same result every time
const products = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' }
];
res.json(products);
});

// POST - Create new resource (Not Safe, Not Idempotent)
app.post('/api/orders', (req, res) => {
const orderData = req.body;

// Not Safe: Creates new resource
// Not Idempotent: Multiple calls create multiple orders
const newOrder = {
  id: Date.now(),
  ...orderData,
  status: 'pending',
  createdAt: new Date()
};

res.status(201).json(newOrder);
});

// PUT - Replace entire resource (Not Safe, Idempotent)
app.put('/api/users/:id', (req, res) => {
const userId = req.params.id;
const userData = req.body;

// Not Safe: Modifies resource
// Idempotent: Multiple calls have same effect
const updatedUser = {
  id: userId,
  name: userData.name,
  email: userData.email,
  updatedAt: new Date()
};

res.json(updatedUser);
});

// PATCH - Partial update (Not Safe, Not Idempotent)
app.patch('/api/users/:id', (req, res) => {
const userId = req.params.id;
const updates = req.body;

// Not Safe: Modifies resource
// Not Idempotent: Multiple calls may have different effects
const currentUser = { id: userId, name: 'John', email: 'john@example.com' };
const updatedUser = { ...currentUser, ...updates, updatedAt: new Date() };

res.json(updatedUser);
});

// DELETE - Remove resource (Not Safe, Idempotent)
app.delete('/api/users/:id', (req, res) => {
const userId = req.params.id;

// Not Safe: Removes resource
// Idempotent: Multiple calls have same effect (resource deleted)
res.status(204).send();
});

// 4. WHEN TO USE POST vs PUT

// POST - When you don't know the resource ID
app.post('/api/articles', (req, res) => {
const articleData = req.body;

// Server generates ID
const newArticle = {
  id: generateId(), // Server decides the ID
  ...articleData,
  createdAt: new Date()
};

res.status(201).json(newArticle);
});

// PUT - When you know the resource ID
app.put('/api/articles/:id', (req, res) => {
const articleId = req.params.id;
const articleData = req.body;

// Client specifies ID
const updatedArticle = {
  id: articleId, // Client knows the ID
  ...articleData,
  updatedAt: new Date()
};

res.json(updatedArticle);
});

// 5. REST API DESIGN PRINCIPLES

// Resource-based URLs
app.get('/api/users', (req, res) => {
// Collection of users
res.json({ users: [] });
});

app.get('/api/users/:id', (req, res) => {
// Specific user
res.json({ user: {} });
});

app.get('/api/users/:id/orders', (req, res) => {
// User's orders (sub-resource)
res.json({ orders: [] });
});

// HTTP Status Codes
app.get('/api/users/:id', (req, res) => {
const user = findUser(req.params.id);

if (!user) {
  return res.status(404).json({ error: 'User not found' });
}

res.status(200).json({ user });
});

app.post('/api/users', (req, res) => {
try {
  const user = createUser(req.body);
  res.status(201).json({ user });
} catch (error) {
  res.status(400).json({ error: error.message });
}
});

// 6. API VERSIONING

// URL Versioning
app.get('/api/v1/users', (req, res) => {
// Version 1 API
res.json({ version: 'v1', users: [] });
});

app.get('/api/v2/users', (req, res) => {
// Version 2 API
res.json({ version: 'v2', users: [] });
});

// Header Versioning
app.get('/api/users', (req, res) => {
const version = req.headers['api-version'] || 'v1';

if (version === 'v1') {
  res.json({ version: 'v1', users: [] });
} else if (version === 'v2') {
  res.json({ version: 'v2', users: [] });
}
});

// 7. API AUTHENTICATION

// JWT Authentication
const jwt = require('jsonwebtoken');

app.post('/api/login', (req, res) => {
const { username, password } = req.body;

if (authenticateUser(username, password)) {
  const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
  res.json({ token });
} else {
  res.status(401).json({ error: 'Invalid credentials' });
}
});

// Middleware for protected routes
function authenticateToken(req, res, next) {
const token = req.headers.authorization?.split(' ')[1];

if (!token) {
  return res.status(401).json({ error: 'Access token required' });
}

jwt.verify(token, 'secret', (err, user) => {
  if (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
  req.user = user;
  next();
});
}

app.get('/api/protected', authenticateToken, (req, res) => {
res.json({ message: 'Protected data', user: req.user });
});

// 8. API RATE LIMITING

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes
max: 100, // limit each IP to 100 requests per windowMs
message: 'Too many requests from this IP'
});

app.use('/api/', limiter);

// 9. API DOCUMENTATION

// Swagger/OpenAPI Documentation
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
definition: {
  openapi: '3.0.0',
  info: {
    title: 'User API',
    version: '1.0.0',
    description: 'A simple user API'
  }
},
apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 10. API TESTING

// Unit Testing
const request = require('supertest');

describe('User API', () => {
it('should get user by ID', async () => {
  const response = await request(app)
    .get('/api/users/123')
    .expect(200);
  
  expect(response.body).toHaveProperty('user');
});

it('should create new user', async () => {
  const userData = { name: 'John', email: 'john@example.com' };
  
  const response = await request(app)
    .post('/api/users')
    .send(userData)
    .expect(201);
  
  expect(response.body).toHaveProperty('user.id');
});
});

// 11. API ERROR HANDLING

// Global error handler
app.use((err, req, res, next) => {
console.error(err.stack);

if (err.name === 'ValidationError') {
  return res.status(400).json({
    error: 'Validation Error',
    details: err.message
  });
}

if (err.name === 'UnauthorizedError') {
  return res.status(401).json({
    error: 'Unauthorized',
    message: 'Invalid token'
  });
}

res.status(500).json({
  error: 'Internal Server Error',
  message: 'Something went wrong'
});
});

// 12. API CACHING

const mcache = require('memory-cache');

function cache(duration) {
return (req, res, next) => {
  const key = 'cache-' + req.originalUrl || req.url;
  const cachedBody = mcache.get(key);
  
  if (cachedBody) {
    res.send(JSON.parse(cachedBody));
    return;
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      mcache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  }
};
}

app.get('/api/products', cache(300), (req, res) => {
// Cache for 5 minutes
res.json({ products: [] });
});

// 13. API MONITORING

// Request logging
app.use((req, res, next) => {
const start = Date.now();

res.on('finish', () => {
  const duration = Date.now() - start;
  console.log(\`\${req.method} \${req.url} - \${res.statusCode} - \${duration}ms\`);
});

next();
});

// 14. API SECURITY

const helmet = require('helmet');
const cors = require('cors');

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
origin: 'http://localhost:3000',
credentials: true
}));

// Input validation
const { body, validationResult } = require('express-validator');

app.post('/api/users', [
body('email').isEmail(),
body('name').isLength({ min: 2 })
], (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

// Process valid data
res.status(201).json({ message: 'User created' });
});

// 15. API PERFORMANCE

// Compression
const compression = require('compression');
app.use(compression());

// Database connection pooling
const pool = mysql.createPool({
host: 'localhost',
user: 'root',
password: 'password',
database: 'test',
connectionLimit: 10
});

// Async database operations
app.get('/api/users', async (req, res) => {
try {
  const [rows] = await pool.promise().query('SELECT * FROM users');
  res.json({ users: rows });
} catch (error) {
  res.status(500).json({ error: 'Database error' });
}
});`,
  testCases: [
    { 
      input: `// REST API GET request
app.get('/api/users/:id', (req, res) => {
res.json({ user: { id: req.params.id } });
});`, 
      output: `// Safe and idempotent operation` 
    },
    {
      input: `// POST vs PUT comparison
app.post('/api/users', (req, res) => {
// Creates new resource with server-generated ID
res.status(201).json({ id: Date.now() });
});

app.put('/api/users/:id', (req, res) => {
// Replaces resource with client-specified ID
res.json({ id: req.params.id });
}`,
      output: `// POST for creation, PUT for replacement`
    },
    {
      input: `// SOAP vs REST
// SOAP: XML-based, complex, stateful
// REST: JSON-based, simple, stateless`,
      output: `// Different architectural styles`
    }
  ],
  explanation: `**SOAP vs REST APIs and HTTP Methods** are fundamental concepts in web service design. Understanding their differences and when to use each is crucial for building effective APIs.

**1. SOAP vs REST Comparison**

**SOAP (Simple Object Access Protocol):**
- **Protocol**: XML-based messaging protocol
- **Stateful**: Maintains state between requests
- **Complex**: Heavy and verbose
- **Standards**: WS-Security, WS-Addressing, WS-ReliableMessaging
- **Transport**: HTTP, SMTP, TCP
- **Use Cases**: Enterprise applications, financial services, healthcare

**REST (Representational State Transfer):**
- **Architecture Style**: Resource-based, stateless
- **Stateless**: Each request is independent
- **Simple**: Lightweight and easy to understand
- **Standards**: HTTP methods, status codes, headers
- **Transport**: HTTP/HTTPS only
- **Use Cases**: Web APIs, mobile apps, public APIs

**2. HTTP Methods Deep Dive**

**GET - Retrieve Data:**
- **Safe**: No side effects on server
- **Idempotent**: Same result every time
- **Cacheable**: Can be cached
- **Use Cases**: Fetching data, searching, filtering

**POST - Create New Resource:**
- **Not Safe**: Creates new resource
- **Not Idempotent**: Multiple calls create multiple resources
- **Not Cacheable**: Cannot be cached
- **Use Cases**: Creating new records, form submissions, file uploads

**PUT - Replace Entire Resource:**
- **Not Safe**: Modifies existing resource
- **Idempotent**: Multiple calls have same effect
- **Not Cacheable**: Cannot be cached
- **Use Cases**: Complete resource updates, upserts

**PATCH - Partial Update:**
- **Not Safe**: Modifies existing resource
- **Not Idempotent**: Multiple calls may have different effects
- **Not Cacheable**: Cannot be cached
- **Use Cases**: Partial updates, field modifications

**DELETE - Remove Resource:**
- **Not Safe**: Removes resource
- **Idempotent**: Multiple calls have same effect
- **Not Cacheable**: Cannot be cached
- **Use Cases**: Resource deletion, cleanup operations

**3. Why POST vs PUT?**

**Use POST when:**
- **Creating new resources** with server-generated IDs
- **You don't know the resource ID** beforehand
- **Processing form data** or file uploads
- **Triggering actions** that don't fit CRUD operations

**Use PUT when:**
- **Replacing entire resources** with known IDs
- **You know the exact resource location**
- **Upsert operations** (create or update)
- **Complete resource replacement**

**4. REST API Design Principles**

**Resource-Based URLs:**
- Use nouns, not verbs
- Hierarchical structure
- Consistent naming conventions
- Plural for collections

**HTTP Status Codes:**
- **2xx Success**: 200 OK, 201 Created, 204 No Content
- **3xx Redirection**: 301 Moved, 304 Not Modified
- **4xx Client Error**: 400 Bad Request, 401 Unauthorized, 404 Not Found
- **5xx Server Error**: 500 Internal Server Error, 503 Service Unavailable

**Stateless Design:**
- Each request contains all necessary information
- No server-side session storage
- Scalable and cacheable

**5. API Versioning Strategies**

**URL Versioning:**
- \`/api/v1/users\`, \`/api/v2/users\`
- Clear and explicit
- Easy to understand
- Can run multiple versions simultaneously

**Header Versioning:**
- \`Accept: application/vnd.api+json;version=1\`
- Clean URLs
- More complex implementation
- Better for mobile apps

**6. Authentication and Security**

**JWT (JSON Web Tokens):**
- Stateless authentication
- Self-contained user information
- Scalable across services
- Secure when properly implemented

**OAuth 2.0:**
- Authorization framework
- Third-party access
- Refresh tokens
- Industry standard

**7. API Best Practices**

**Performance:**
- Use caching strategies
- Implement pagination
- Optimize database queries
- Use compression

**Security:**
- Validate all inputs
- Use HTTPS
- Implement rate limiting
- Add security headers

**Documentation:**
- Use OpenAPI/Swagger
- Provide examples
- Include error responses
- Keep documentation updated

**8. Common API Patterns**

**CRUD Operations:**
- Create: POST /resources
- Read: GET /resources/:id
- Update: PUT /resources/:id
- Delete: DELETE /resources/:id

**Search and Filtering:**
- GET /resources?search=term&filter=active
- Query parameters for filtering
- Consistent parameter naming

**Pagination:**
- GET /resources?page=1&limit=10
- Include metadata in response
- Consistent pagination strategy

**9. Error Handling**

**Consistent Error Format:**
- Standard error structure
- Meaningful error messages
- Appropriate HTTP status codes
- Error codes for programmatic handling

**Validation Errors:**
- Field-level error messages
- Clear validation rules
- Helpful error descriptions

**10. API Testing**

**Unit Testing:**
- Test individual endpoints
- Mock external dependencies
- Test error scenarios
- Validate response formats

**Integration Testing:**
- Test complete workflows
- Database integration
- External service integration
- Performance testing

**11. Monitoring and Analytics**

**Request Logging:**
- Track request/response times
- Monitor error rates
- Log important events
- Performance metrics

**Health Checks:**
- Endpoint availability
- Database connectivity
- External service status
- System resources

**12. API Evolution**

**Backward Compatibility:**
- Maintain old endpoints
- Add new fields as optional
- Use versioning strategies
- Gradual deprecation

**Migration Strategies:**
- Feature flags
- A/B testing
- Gradual rollout
- Rollback procedures

**13. Real-World Considerations**

**Scalability:**
- Horizontal scaling
- Load balancing
- Database optimization
- Caching strategies

**Reliability:**
- Circuit breakers
- Retry mechanisms
- Fallback strategies
- Monitoring and alerting

**14. Industry Standards**

**OpenAPI Specification:**
- Standard API documentation
- Code generation
- Testing tools
- Ecosystem support

**GraphQL:**
- Alternative to REST
- Single endpoint
- Flexible queries
- Real-time subscriptions

**15. Choosing Between SOAP and REST**

**Choose SOAP when:**
- Enterprise integration required
- Complex security requirements
- Transactional operations
- Legacy system integration

**Choose REST when:**
- Building web APIs
- Mobile app backends
- Public APIs
- Simple CRUD operations

**Performance Comparison:**

**SOAP:**
- **Pros**: Standards-based, enterprise features, security
- **Cons**: Verbose, complex, slower, limited browser support

**REST:**
- **Pros**: Simple, fast, cacheable, browser-friendly
- **Cons**: No built-in standards, limited security features

Understanding these differences helps in choosing the right approach for your specific use case and building APIs that are efficient, maintainable, and user-friendly.`
},
{
  id: 'nodejs-14',
  title: 'How to Migrate PHP APIs to Node.js APIs',
  description: 'Understanding the process of migrating PHP APIs to Node.js, including architecture differences, migration strategies, data handling, authentication, and best practices for a successful transition.',
  difficulty: 'Hard',
  category: 'nodejs',
  solution: `// PHP to Node.js API Migration Guide

// 1. PHP API STRUCTURE (Before Migration)
/*
// PHP API Example
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

class UserController {
  private $db;
  
  public function __construct($db) {
      $this->db = $db;
  }
  
  public function getUsers() {
      $query = "SELECT * FROM users";
      $result = $this->db->query($query);
      $users = $result->fetch_all(MYSQLI_ASSOC);
      
      echo json_encode([
          'status' => 'success',
          'data' => $users
      ]);
  }
  
  public function createUser($data) {
      $name = $data['name'];
      $email = $data['email'];
      
      $query = "INSERT INTO users (name, email) VALUES (?, ?)";
      $stmt = $this->db->prepare($query);
      $stmt->bind_param("ss", $name, $email);
      
      if ($stmt->execute()) {
          echo json_encode([
              'status' => 'success',
              'message' => 'User created successfully'
          ]);
      } else {
          echo json_encode([
              'status' => 'error',
              'message' => 'Failed to create user'
          ]);
      }
  }
}
?>
*/

// 2. NODE.JS API STRUCTURE (After Migration)
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
const pool = mysql.createPool({
host: 'localhost',
user: 'root',
password: 'password',
database: 'test',
connectionLimit: 10
});

// User Controller (Equivalent to PHP class)
class UserController {
constructor(db) {
  this.db = db;
}

async getUsers(req, res) {
  try {
    const [rows] = await this.db.query('SELECT * FROM users');
    res.json({
      status: 'success',
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch users'
    });
  }
}

async createUser(req, res) {
  try {
    const { name, email } = req.body;
    const [result] = await this.db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create user'
    });
  }
}
}

const userController = new UserController(pool);

// Routes
app.get('/api/users', (req, res) => userController.getUsers(req, res));
app.post('/api/users', (req, res) => userController.createUser(req, res));

// 3. MIGRATION STRATEGY - PHASED APPROACH

// Phase 1: Setup Node.js Environment
const path = require('path');
require('dotenv').config();

// Environment configuration
const config = {
port: process.env.PORT || 3000,
database: {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'test'
},
jwt: {
  secret: process.env.JWT_SECRET || 'your-secret-key',
  expiresIn: '24h'
}
};

// Phase 2: Database Migration
const { Sequelize, DataTypes } = require('sequelize');

// Database connection with Sequelize
const sequelize = new Sequelize(
config.database.database,
config.database.user,
config.database.password,
{
  host: config.database.host,
  dialect: 'mysql',
  logging: false
}
);

// User Model (Equivalent to PHP model)
const User = sequelize.define('User', {
id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
},
name: {
  type: DataTypes.STRING,
  allowNull: false
},
email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
},
password: {
  type: DataTypes.STRING,
  allowNull: false
},
createdAt: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW
},
updatedAt: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW
}
});

// 4. AUTHENTICATION MIGRATION

// PHP Session-based Auth to JWT
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Authentication middleware
const authenticateToken = (req, res, next) => {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

if (!token) {
  return res.status(401).json({ error: 'Access token required' });
}

jwt.verify(token, config.jwt.secret, (err, user) => {
  if (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
  req.user = user;
  next();
});
};

// Login endpoint (replaces PHP session login)
app.post('/api/login', async (req, res) => {
try {
  const { email, password } = req.body;
  
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
  
  res.json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
} catch (error) {
  res.status(500).json({ error: 'Login failed' });
}
});

// 5. DATA HANDLING MIGRATION

// PHP $_POST/$_GET to Express req.body/req.query
app.get('/api/users', async (req, res) => {
try {
  const { page = 1, limit = 10, search } = req.query;
  const offset = (page - 1) * limit;
  
  let whereClause = {};
  if (search) {
    whereClause = {
      [Sequelize.Op.or]: [
        { name: { [Sequelize.Op.like]: \`%\${search}%\` } },
        { email: { [Sequelize.Op.like]: \`%\${search}%\` } }
      ]
    };
  }
  
  const { count, rows } = await User.findAndCountAll({
    where: whereClause,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['createdAt', 'DESC']]
  });
  
  res.json({
    status: 'success',
    data: rows,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: count,
      pages: Math.ceil(count / limit)
    }
  });
} catch (error) {
  res.status(500).json({ error: 'Failed to fetch users' });
}
});

// 6. FILE UPLOAD MIGRATION

// PHP move_uploaded_file to Multer
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
destination: (req, file, cb) => {
  cb(null, 'uploads/');
},
filename: (req, file, cb) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
}
});

const upload = multer({ 
storage: storage,
limits: {
  fileSize: 5 * 1024 * 1024 // 5MB limit
},
fileFilter: (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
}
});

// File upload endpoint
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
try {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    status: 'success',
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      path: req.file.path
    }
  });
} catch (error) {
  res.status(500).json({ error: 'File upload failed' });
}
});

// 7. ERROR HANDLING MIGRATION

// PHP try-catch to Express error handling
const errorHandler = (err, req, res, next) => {
console.error(err.stack);

if (err.name === 'SequelizeValidationError') {
  return res.status(400).json({
    status: 'error',
    message: 'Validation error',
    errors: err.errors.map(e => ({
      field: e.path,
      message: e.message
    }))
  });
}

if (err.name === 'SequelizeUniqueConstraintError') {
  return res.status(409).json({
    status: 'error',
    message: 'Duplicate entry'
  });
}

res.status(500).json({
  status: 'error',
  message: 'Internal server error'
});
};

app.use(errorHandler);

// 8. CACHING MIGRATION

// PHP APCu/Memcached to Redis
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

// Caching middleware
const cache = (duration) => {
return async (req, res, next) => {
  const key = 'cache:' + req.originalUrl;
  
  try {
    const cached = await client.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      client.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    next();
  } catch (error) {
    next();
  }
};
};

// Cached endpoint
app.get('/api/products', cache(300), async (req, res) => {
// Product fetching logic
res.json({ products: [] });
});

// 9. API RATE LIMITING

// PHP rate limiting to Express rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes
max: 100, // limit each IP to 100 requests per windowMs
message: {
  status: 'error',
  message: 'Too many requests from this IP'
}
});

app.use('/api/', limiter);

// 10. LOGGING MIGRATION

// PHP error_log to Winston
const winston = require('winston');

const logger = winston.createLogger({
level: 'info',
format: winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
),
transports: [
  new winston.transports.File({ filename: 'error.log', level: 'error' }),
  new winston.transports.File({ filename: 'combined.log' }),
  new winston.transports.Console({
    format: winston.format.simple()
  })
]
});

// Logging middleware
app.use((req, res, next) => {
logger.info({
  method: req.method,
  url: req.url,
  ip: req.ip,
  userAgent: req.get('User-Agent')
});
next();
});

// 11. VALIDATION MIGRATION

// PHP validation to Joi
const Joi = require('joi');

const userSchema = Joi.object({
name: Joi.string().min(2).max(50).required(),
email: Joi.string().email().required(),
password: Joi.string().min(6).required()
});

const validateUser = (req, res, next) => {
const { error } = userSchema.validate(req.body);
if (error) {
  return res.status(400).json({
    status: 'error',
    message: 'Validation error',
    errors: error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }))
  });
}
next();
};

app.post('/api/users', validateUser, async (req, res) => {
// User creation logic
});

// 12. DATABASE MIGRATION SCRIPT

// Migration script to transfer data
const migrateData = async () => {
try {
  // Connect to old PHP database
  const oldDb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'old_php_db'
  });
  
  // Fetch data from old database
  const [oldUsers] = await oldDb.promise().query('SELECT * FROM users');
  
  // Insert into new database
  for (const user of oldUsers) {
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password, // Assuming already hashed
      createdAt: user.created_at,
      updatedAt: user.updated_at
    });
  }
  
  console.log('Data migration completed');
} catch (error) {
  console.error('Migration failed:', error);
}
};

// 13. API VERSIONING

// Versioned API endpoints
const v1Router = express.Router();
const v2Router = express.Router();

// V1 API (old PHP style)
v1Router.get('/users', async (req, res) => {
// Legacy response format
res.json({
  status: 'success',
  data: await User.findAll()
});
});

// V2 API (new Node.js style)
v2Router.get('/users', async (req, res) => {
// New response format with pagination
const { page = 1, limit = 10 } = req.query;
const offset = (page - 1) * limit;

const { count, rows } = await User.findAndCountAll({
  limit: parseInt(limit),
  offset: parseInt(offset)
});

res.json({
  data: rows,
  meta: {
    page: parseInt(page),
    limit: parseInt(limit),
    total: count,
    pages: Math.ceil(count / limit)
  }
});
});

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// 14. TESTING MIGRATION

// PHPUnit to Jest
const request = require('supertest');

describe('User API', () => {
it('should create a new user', async () => {
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  };
  
  const response = await request(app)
    .post('/api/users')
    .send(userData)
    .expect(201);
  
  expect(response.body).toHaveProperty('status', 'success');
  expect(response.body).toHaveProperty('id');
});

it('should get users with pagination', async () => {
  const response = await request(app)
    .get('/api/users?page=1&limit=10')
    .expect(200);
  
  expect(response.body).toHaveProperty('data');
  expect(response.body).toHaveProperty('pagination');
});
});

// 15. DEPLOYMENT MIGRATION

// PM2 configuration for production
const pm2Config = {
apps: [{
  name: 'api-server',
  script: 'app.js',
  instances: 'max',
  exec_mode: 'cluster',
  env: {
    NODE_ENV: 'development'
  },
  env_production: {
    NODE_ENV: 'production',
    PORT: 3000
  }
}]
};

// Docker configuration
const dockerfile = \`
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`;

// Start server
const PORT = config.port;
app.listen(PORT, () => {
console.log(\`Server running on port \${PORT}\`);
logger.info(\`Server started on port \${PORT}\`);
});

module.exports = app;`,
  testCases: [
    { 
      input: `// PHP to Node.js migration
// PHP: $_POST['name']
// Node.js: req.body.name`, 
      output: `// Data access pattern migration` 
    },
    {
      input: `// Authentication migration
// PHP: $_SESSION['user_id']
// Node.js: JWT token in Authorization header`,
      output: `// Session-based to token-based auth`
    },
    {
      input: `// Database migration
// PHP: mysqli_query($conn, $sql)
// Node.js: await db.query(sql, params)`,
      output: `// Synchronous to asynchronous database operations`
    }
  ],
  explanation: `**Migrating PHP APIs to Node.js** involves understanding architectural differences, data handling patterns, and implementing equivalent functionality in a new technology stack. Here's a comprehensive guide:

**1. Architecture Differences**

**PHP (Traditional):**
- **Synchronous**: Blocking I/O operations
- **Session-based**: Server-side session storage
- **Procedural**: Function-based programming
- **Apache/Nginx**: Traditional web server setup
- **Shared hosting**: Easy deployment

**Node.js (Modern):**
- **Asynchronous**: Non-blocking I/O operations
- **Stateless**: JWT tokens, no server-side sessions
- **Event-driven**: Event loop architecture
- **Express.js**: Web framework
- **Cloud-native**: Containerized deployment

**2. Migration Strategy**

**Phased Approach:**
1. **Analysis**: Audit existing PHP API
2. **Planning**: Design Node.js architecture
3. **Setup**: Configure Node.js environment
4. **Migration**: Port endpoints one by one
5. **Testing**: Validate functionality
6. **Deployment**: Gradual rollout
7. **Monitoring**: Performance tracking

**3. Key Migration Areas**

**Database Operations:**
- **PHP**: mysqli_query(), PDO
- **Node.js**: mysql2, Sequelize, Prisma
- **Changes**: Async/await, connection pooling, ORM

**Authentication:**
- **PHP**: $_SESSION, session_start()
- **Node.js**: JWT tokens, bcrypt
- **Changes**: Stateless authentication, token validation

**File Handling:**
- **PHP**: move_uploaded_file(), $_FILES
- **Node.js**: Multer, fs.promises
- **Changes**: Stream-based processing, async file operations

**Error Handling:**
- **PHP**: try-catch, error_reporting()
- **Node.js**: Express error middleware, async error handling
- **Changes**: Centralized error handling, promise rejection

**4. Data Access Patterns**

**Request Data:**
- **PHP**: $_POST, $_GET, $_REQUEST
- **Node.js**: req.body, req.query, req.params
- **Changes**: Middleware parsing, validation

**Response Handling:**
- **PHP**: echo json_encode(), header()
- **Node.js**: res.json(), res.status()
- **Changes**: Express response methods, status codes

**Database Queries:**
- **PHP**: Synchronous database calls
- **Node.js**: Promise-based async queries
- **Changes**: Connection pooling, prepared statements

**5. Authentication Migration**

**Session to Token:**
- **PHP Sessions**: Server-side storage, session cookies
- **JWT Tokens**: Client-side storage, Authorization header
- **Benefits**: Stateless, scalable, mobile-friendly

**Password Handling:**
- **PHP**: password_hash(), password_verify()
- **Node.js**: bcrypt.hash(), bcrypt.compare()
- **Changes**: Same hashing algorithms, async operations

**6. Performance Optimizations**

**Caching:**
- **PHP**: APCu, Memcached
- **Node.js**: Redis, in-memory caching
- **Benefits**: Faster response times, reduced database load

**Connection Pooling:**
- **PHP**: Limited connection management
- **Node.js**: Built-in connection pooling
- **Benefits**: Better resource utilization, scalability

**Async Operations:**
- **PHP**: Blocking I/O
- **Node.js**: Non-blocking I/O
- **Benefits**: Higher concurrency, better throughput

**7. Security Considerations**

**Input Validation:**
- **PHP**: Manual validation, filter_input()
- **Node.js**: Joi, express-validator
- **Benefits**: Structured validation, type safety

**SQL Injection Prevention:**
- **PHP**: Prepared statements
- **Node.js**: Parameterized queries, ORM
- **Benefits**: Automatic escaping, query building

**CORS Handling:**
- **PHP**: Manual header setting
- **Node.js**: cors middleware
- **Benefits**: Configurable, automatic handling

**8. Testing Migration**

**Unit Testing:**
- **PHP**: PHPUnit
- **Node.js**: Jest, Mocha
- **Benefits**: Better async testing, mocking

**Integration Testing:**
- **PHP**: Manual API testing
- **Node.js**: Supertest, automated testing
- **Benefits**: Automated test suites, CI/CD integration

**9. Deployment Changes**

**Environment Setup:**
- **PHP**: Apache/Nginx + PHP-FPM
- **Node.js**: PM2, Docker, Kubernetes
- **Benefits**: Containerization, auto-scaling

**Process Management:**
- **PHP**: Web server process management
- **Node.js**: PM2, cluster mode
- **Benefits**: Process monitoring, auto-restart

**10. Monitoring and Logging**

**Error Tracking:**
- **PHP**: error_log(), custom logging
- **Node.js**: Winston, Bunyan, Sentry
- **Benefits**: Structured logging, error aggregation

**Performance Monitoring:**
- **PHP**: Limited built-in monitoring
- **Node.js**: New Relic, DataDog, custom metrics
- **Benefits**: Real-time monitoring, alerting

**11. API Versioning**

**Backward Compatibility:**
- **PHP**: Manual version handling
- **Node.js**: Express routers, middleware
- **Benefits**: Clean separation, gradual migration

**Version Management:**
- **PHP**: URL-based versioning
- **Node.js**: Header-based or URL-based
- **Benefits**: Flexible versioning strategies

**12. Data Migration**

**Database Schema:**
- **PHP**: Direct SQL migrations
- **Node.js**: Sequelize migrations, Prisma
- **Benefits**: Version-controlled schema changes

**Data Transfer:**
- **PHP**: Export/import scripts
- **Node.js**: Migration scripts, ETL processes
- **Benefits**: Automated data transfer, validation

**13. Common Challenges**

**Learning Curve:**
- **Async Programming**: Understanding promises and async/await
- **Event Loop**: Grasping non-blocking I/O
- **Error Handling**: Managing async error propagation

**Performance Tuning:**
- **Memory Management**: Avoiding memory leaks
- **Event Loop Blocking**: Keeping operations non-blocking
- **Database Optimization**: Connection pooling and query optimization

**14. Best Practices**

**Code Organization:**
- **MVC Pattern**: Separate concerns
- **Middleware**: Reusable components
- **Error Handling**: Centralized error management

**Security:**
- **Input Validation**: Validate all inputs
- **Authentication**: Implement proper JWT handling
- **Rate Limiting**: Prevent abuse

**Performance:**
- **Caching**: Implement appropriate caching strategies
- **Database**: Use connection pooling and indexing
- **Monitoring**: Track performance metrics

**15. Migration Checklist**

**Pre-Migration:**
- [ ] Audit existing PHP API
- [ ] Document all endpoints and functionality
- [ ] Plan Node.js architecture
- [ ] Set up development environment

**During Migration:**
- [ ] Port endpoints one by one
- [ ] Implement authentication system
- [ ] Set up database connections
- [ ] Add error handling
- [ ] Implement validation

**Post-Migration:**
- [ ] Test all functionality
- [ ] Performance testing
- [ ] Security audit
- [ ] Documentation update
- [ ] Deployment planning

**Benefits of Migration:**

**Performance:**
- **Higher Throughput**: Non-blocking I/O
- **Better Scalability**: Event-driven architecture
- **Reduced Latency**: Optimized database operations

**Developer Experience:**
- **Modern JavaScript**: ES6+ features
- **Rich Ecosystem**: npm packages
- **Better Tooling**: Modern development tools

**Maintenance:**
- **Type Safety**: TypeScript support
- **Better Testing**: Comprehensive testing frameworks
- **Monitoring**: Advanced monitoring capabilities

**Cost Benefits:**
- **Resource Efficiency**: Lower server requirements
- **Development Speed**: Faster feature development
- **Maintenance Costs**: Reduced operational overhead

Migrating from PHP to Node.js requires careful planning and execution, but the benefits in terms of performance, scalability, and developer experience make it a worthwhile investment for modern API development.`
},
{
  id: 'nodejs-15',
  title: 'Event Pool, Event Loop, and Similar Concepts in Node.js',
  description: 'Understanding the core concepts of event pool, event loop, thread pool, and how they work together to enable Node.js asynchronous operations.',
  difficulty: 'Hard',
  category: 'nodejs',
  solution: `// Event Pool, Event Loop, and Related Concepts

// 1. EVENT LOOP - CORE MECHANISM
console.log('1. Start');

setTimeout(() => {
console.log('2. Timer callback');
}, 0);

Promise.resolve().then(() => {
console.log('3. Promise microtask');
});

process.nextTick(() => {
console.log('4. process.nextTick');
});

console.log('5. End');

// Output:
// 1. Start
// 5. End
// 4. process.nextTick
// 3. Promise microtask
// 2. Timer callback

// 2. EVENT LOOP PHASES
function demonstrateEventLoopPhases() {
console.log('=== Event Loop Phase Demonstration ===');

// Phase 1: Timers
setTimeout(() => {
  console.log('Phase 1: Timer phase - setTimeout');
}, 0);

// Phase 2: Pending callbacks (I/O callbacks)
setImmediate(() => {
  console.log('Phase 2: Check phase - setImmediate');
});

// Phase 3: Poll (I/O operations)
const fs = require('fs');
fs.readFile(__filename, () => {
  console.log('Phase 3: Poll phase - File I/O callback');
  
  // Nested timers
  setTimeout(() => {
    console.log('Nested timer in I/O callback');
  }, 0);
  
  setImmediate(() => {
    console.log('Nested setImmediate in I/O callback');
  });
});

// Phase 4: Check (setImmediate)
setImmediate(() => {
  console.log('Phase 4: Check phase - Another setImmediate');
});

// Phase 5: Close callbacks
const server = require('http').createServer();
server.on('close', () => {
  console.log('Phase 5: Close phase - Server close event');
});

// Microtasks (highest priority)
Promise.resolve().then(() => {
  console.log('Microtask: Promise resolved');
});

process.nextTick(() => {
  console.log('Microtask: process.nextTick');
});
}

// 3. THREAD POOL (LIBUV)
const crypto = require('crypto');

function demonstrateThreadPool() {
console.log('=== Thread Pool Demonstration ===');

// CPU-intensive task that uses thread pool
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('Thread pool task completed:', derivedKey.toString('hex').substring(0, 20) + '...');
});

// Another thread pool task
crypto.pbkdf2('password2', 'salt2', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log('Thread pool task 2 completed:', derivedKey.toString('hex').substring(0, 20) + '...');
});

console.log('Thread pool tasks initiated (non-blocking)');
}

// 4. EVENT POOL vs CALLBACK QUEUE
function demonstrateEventPool() {
console.log('=== Event Pool vs Callback Queue ===');

// Event Pool (Microtask Queue) - Higher Priority
Promise.resolve().then(() => {
  console.log('Event Pool: Promise 1');
});

Promise.resolve().then(() => {
  console.log('Event Pool: Promise 2');
});

// Callback Queue (Macrotask Queue) - Lower Priority
setTimeout(() => {
  console.log('Callback Queue: Timer 1');
}, 0);

setTimeout(() => {
  console.log('Callback Queue: Timer 2');
}, 0);

// process.nextTick (Highest Priority Microtask)
process.nextTick(() => {
  console.log('Event Pool: process.nextTick');
});

console.log('Synchronous code');
}

// 5. EVENT EMITTER PATTERN
const EventEmitter = require('events');

function demonstrateEventEmitter() {
console.log('=== Event Emitter Pattern ===');

const myEmitter = new EventEmitter();

// Register event listeners
myEmitter.on('data', (data) => {
  console.log('Event Pool: Received data:', data);
});

myEmitter.on('error', (error) => {
  console.error('Event Pool: Error occurred:', error);
});

// Emit events asynchronously
setTimeout(() => {
  myEmitter.emit('data', 'Hello from event emitter');
}, 1000);

setTimeout(() => {
  myEmitter.emit('error', new Error('Something went wrong'));
}, 2000);

console.log('Event listeners registered');
}

// 6. EVENT LOOP MONITORING
function monitorEventLoop() {
console.log('=== Event Loop Monitoring ===');

let lastCheck = Date.now();

setInterval(() => {
  const now = Date.now();
  const delay = now - lastCheck - 1000; // Should be ~1000ms
  
  if (delay > 100) {
    console.log(\`Event loop lag detected: \${delay}ms\`);
  }
  
  lastCheck = now;
}, 1000);

console.log('Event loop monitoring started');
}

// 7. EVENT LOOP BLOCKING SCENARIOS
function demonstrateEventLoopBlocking() {
console.log('=== Event Loop Blocking ===');

// BLOCKING OPERATION (blocks event loop)
function blockingOperation() {
  console.log('Starting blocking operation...');
  const start = Date.now();
  
  // Simulate CPU-intensive work
  while (Date.now() - start < 2000) {
    // Blocking the main thread
  }
  
  console.log('Blocking operation completed');
}

// NON-BLOCKING OPERATION (doesn't block event loop)
function nonBlockingOperation() {
  console.log('Starting non-blocking operation...');
  
  setTimeout(() => {
    console.log('Non-blocking operation completed');
  }, 2000);
}

// Demonstrate blocking
console.log('1. Before blocking operation');
blockingOperation();
console.log('2. After blocking operation');

// Demonstrate non-blocking
console.log('3. Before non-blocking operation');
nonBlockingOperation();
console.log('4. After non-blocking operation (immediate)');
}

// 8. WORKER THREADS FOR CPU-INTENSIVE TASKS
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function demonstrateWorkerThreads() {
if (isMainThread) {
  console.log('=== Worker Threads Demonstration ===');
  
  // Create worker thread for CPU-intensive task
  const worker = new Worker(__filename, {
    workerData: { number: 1000000 }
  });
  
  worker.on('message', (result) => {
    console.log('Worker result:', result);
  });
  
  worker.on('error', (error) => {
    console.error('Worker error:', error);
  });
  
  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error('Worker stopped with exit code', code);
    }
  });
  
  console.log('Worker thread created for CPU-intensive task');
} else {
  // Worker thread code
  const { number } = workerData;
  
  // CPU-intensive calculation
  let result = 0;
  for (let i = 0; i < number; i++) {
    result += Math.sqrt(i);
  }
  
  parentPort.postMessage(result);
}
}

// 9. EVENT LOOP PRIORITY ORDER
function demonstratePriorityOrder() {
console.log('=== Event Loop Priority Order ===');

// 1. process.nextTick (highest priority microtask)
process.nextTick(() => {
  console.log('1. process.nextTick');
});

// 2. Promise microtasks
Promise.resolve().then(() => {
  console.log('2. Promise microtask');
});

// 3. setImmediate (check phase)
setImmediate(() => {
  console.log('3. setImmediate');
});

// 4. setTimeout (timer phase)
setTimeout(() => {
  console.log('4. setTimeout');
}, 0);

console.log('Synchronous code');
}

// 10. EVENT LOOP DEBUGGING
function debugEventLoop() {
console.log('=== Event Loop Debugging ===');

// Monitor event loop phases
const originalSetImmediate = setImmediate;
setImmediate = function(callback, ...args) {
  console.log('setImmediate called');
  return originalSetImmediate(callback, ...args);
};

const originalSetTimeout = setTimeout;
setTimeout = function(callback, delay, ...args) {
  console.log(\`setTimeout called with delay: \${delay}ms\`);
  return originalSetTimeout(callback, delay, ...args);
};

// Test
setTimeout(() => console.log('Timer executed'), 100);
setImmediate(() => console.log('Immediate executed'));

console.log('Event loop debugging enabled');
}

// 11. EVENT LOOP PERFORMANCE
function measureEventLoopPerformance() {
console.log('=== Event Loop Performance ===');

const iterations = 1000000;

// Synchronous operation
console.time('Synchronous');
let syncResult = 0;
for (let i = 0; i < iterations; i++) {
  syncResult += i;
}
console.timeEnd('Synchronous');

// Asynchronous operation
console.time('Asynchronous');
const promises = [];
for (let i = 0; i < 1000; i++) {
  promises.push(
    new Promise(resolve => {
      setTimeout(() => resolve(i), 0);
    })
  );
}

Promise.all(promises).then(() => {
  console.timeEnd('Asynchronous');
});
}

// 12. EVENT LOOP BEST PRACTICES
function eventLoopBestPractices() {
console.log('=== Event Loop Best Practices ===');

// GOOD: Non-blocking operations
setTimeout(() => {
  console.log('Non-blocking operation');
}, 0);

// GOOD: Use setImmediate for immediate execution
setImmediate(() => {
  console.log('Immediate execution');
});

// GOOD: Break up heavy tasks
function heavyTask() {
  const data = new Array(1000000).fill(0);
  
  // Break into chunks
  let index = 0;
  function processChunk() {
    const chunk = data.slice(index, index + 1000);
    // Process chunk
    index += 1000;
    
    if (index < data.length) {
      setImmediate(processChunk);
    }
  }
  
  processChunk();
}

// BAD: Blocking the event loop
function blockingTask() {
  const start = Date.now();
  while (Date.now() - start < 1000) {
    // This blocks the event loop
  }
}
}

// 13. EVENT LOOP IN PRACTICAL APPLICATIONS
function practicalEventLoopExample() {
console.log('=== Practical Event Loop Example ===');

const express = require('express');
const app = express();

// Middleware that doesn't block
app.use((req, res, next) => {
  console.log(\`Request: \${req.method} \${req.url}\`);
  next();
});

// Non-blocking route handler
app.get('/api/users', async (req, res) => {
  try {
    // Simulate database query
    const users = await new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ]);
      }, 100);
    });
    
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Blocking route handler (BAD)
app.get('/api/blocking', (req, res) => {
  const start = Date.now();
  while (Date.now() - start < 2000) {
    // This blocks the event loop
  }
  res.json({ message: 'Blocking operation completed' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
}

// 14. EVENT LOOP MONITORING TOOLS
function eventLoopMonitoringTools() {
console.log('=== Event Loop Monitoring Tools ===');

// Built-in monitoring
const usage = process.cpuUsage();
const memory = process.memoryUsage();

console.log('CPU Usage:', usage);
console.log('Memory Usage:', memory);

// Custom monitoring
setInterval(() => {
  const usage = process.cpuUsage();
  const memory = process.memoryUsage();
  
  console.log(\`CPU: \${usage.user / 1000}ms user, \${usage.system / 1000}ms system\`);
  console.log(\`Memory: \${Math.round(memory.heapUsed / 1024 / 1024)}MB used\`);
}, 5000);
}

// 15. EVENT LOOP OPTIMIZATION
function eventLoopOptimization() {
console.log('=== Event Loop Optimization ===');

// Optimize with clustering
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(\`Master \${process.pid} is running\`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    cluster.fork(); // Replace dead worker
  });
} else {
  // Worker process
  console.log(\`Worker \${process.pid} started\`);
  
  // Worker can handle requests
  const http = require('http');
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World');
  }).listen(8000);
}
}`,
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
    },
    {
      input: `process.nextTick(() => console.log('nextTick'));
setImmediate(() => console.log('setImmediate'));
setTimeout(() => console.log('setTimeout'), 0);`,
      output: `nextTick
setImmediate
setTimeout`
    },
    {
      input: `const crypto = require('crypto');
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, key) => {
console.log('Thread pool task completed');
});`,
      output: `// Uses libuv thread pool for CPU-intensive task`
    }
  ],
  explanation: `**Event Pool, Event Loop, and Related Concepts** are fundamental to understanding how Node.js achieves asynchronous operations. Here's a comprehensive breakdown:

**1. Event Loop - The Core Mechanism**

The Event Loop is the heart of Node.js's asynchronous architecture:

**Event Loop Phases:**
1. **Timers**: Executes callbacks scheduled by setTimeout() and setInterval()
2. **Pending callbacks**: Executes I/O callbacks deferred to the next loop iteration
3. **Idle, prepare**: Used internally by Node.js
4. **Poll**: Retrieves new I/O events and executes I/O callbacks
5. **Check**: Executes setImmediate() callbacks
6. **Close callbacks**: Executes close event callbacks

**2. Event Pool vs Callback Queue**

**Event Pool (Microtask Queue):**
- **Higher Priority**: Executed before next event loop iteration
- **Includes**: Promises, process.nextTick(), queueMicrotask()
- **Execution**: All microtasks are processed before moving to next phase

**Callback Queue (Macrotask Queue):**
- **Lower Priority**: Executed in event loop phases
- **Includes**: setTimeout, setInterval, setImmediate, I/O callbacks
- **Execution**: One macrotask per event loop iteration

**3. Thread Pool (libuv)**

**Background Threads:**
- **4 threads by default** (configurable)
- **Handles CPU-intensive tasks**: File system operations, crypto, compression
- **Prevents blocking**: Keeps main thread free for other operations

**4. Priority Order**

**Execution Priority:**
1. **process.nextTick()**: Highest priority microtask
2. **Promise microtasks**: .then(), .catch(), .finally()
3. **setImmediate()**: Check phase callback
4. **setTimeout/setInterval**: Timer phase callback
5. **I/O callbacks**: Poll phase callbacks

**5. Event Emitter Pattern**

**Event-Driven Architecture:**
- **Event Emitters**: Built-in Node.js pattern
- **Event Listeners**: Respond to events asynchronously
- **Custom Events**: Application-specific events

**6. Event Loop Blocking**

**What Blocks the Event Loop:**
- **CPU-intensive operations**: Heavy calculations
- **Synchronous I/O**: Blocking file operations
- **Infinite loops**: Never-ending code execution
- **Large JSON parsing**: Synchronous data processing

**7. Worker Threads**

**CPU-Intensive Tasks:**
- **Separate threads**: Heavy computations in background
- **Message passing**: Communication between threads
- **Shared memory**: Efficient data sharing (optional)

**8. Event Loop Monitoring**

**Performance Tracking:**
- **Lag detection**: Monitor event loop delays
- **CPU usage**: Track process resource usage
- **Memory monitoring**: Watch for memory leaks

**9. Best Practices**

**Keep Event Loop Free:**
- **Use async I/O**: Always prefer asynchronous operations
- **Break up heavy tasks**: Use setImmediate() or process.nextTick()
- **Use worker threads**: For CPU-intensive operations
- **Monitor performance**: Track event loop lag

**10. Practical Applications**

**Web Servers:**
- **Concurrent connections**: Handle thousands simultaneously
- **Non-blocking I/O**: Efficient request processing
- **Real-time applications**: WebSocket, SSE support

**11. Performance Characteristics**

**Advantages:**
- **High concurrency**: Thousands of concurrent connections
- **Low memory usage**: Single process, shared memory
- **Fast startup**: No thread initialization overhead
- **Efficient I/O**: Non-blocking operations

**Considerations:**
- **CPU-intensive tasks**: May block event loop
- **Single point of failure**: One process handles everything
- **Memory limits**: Single process memory constraints
- **Debugging complexity**: Asynchronous code can be complex

**12. Event Loop Optimization**

**Clustering:**
- **Multiple processes**: Utilize all CPU cores
- **Load balancing**: Distribute requests across workers
- **Fault tolerance**: Auto-restart failed workers

**13. Monitoring Tools**

**Built-in Monitoring:**
- **process.cpuUsage()**: Track CPU usage
- **process.memoryUsage()**: Monitor memory consumption
- **Custom metrics**: Application-specific monitoring

**14. Common Patterns**

**Async/Await:**
- **Promise-based**: Cleaner than callbacks
- **Error handling**: Try-catch for async operations
- **Parallel execution**: Promise.all(), Promise.race()

**Event-Driven:**
- **Event emitters**: Built-in events and custom events
- **Event listeners**: Respond to events asynchronously
- **Event delegation**: Efficient event handling

**15. Real-World Impact**

**Scalability:**
- **Horizontal scaling**: Multiple Node.js processes
- **Vertical scaling**: Single process optimization
- **Load balancing**: Distribute load across instances

**Performance:**
- **Response time**: Faster request processing
- **Throughput**: Higher request handling capacity
- **Resource utilization**: Efficient CPU and memory usage

Understanding these concepts is crucial for building efficient Node.js applications and optimizing performance. The event loop, thread pool, and event-driven architecture work together to provide the non-blocking, asynchronous behavior that makes Node.js particularly well-suited for I/O-intensive applications.`
  },
  {
    id: 'nodegen-1',
    title: 'How to Optimize SQL, PostgreSQL, and MongoDB Queries',
    description: 'Short tips and examples for optimizing queries in SQL, PostgreSQL, and MongoDB.',
    difficulty: 'Medium',
    category: 'nodejs',
    solution: `// SQL Optimization Example
SELECT * FROM users WHERE email = 'test@example.com';
-- Add an index on the 'email' column for faster lookups

// PostgreSQL Optimization Example
EXPLAIN ANALYZE SELECT * FROM orders WHERE status = 'shipped';
-- Use EXPLAIN to analyze query plans and add indexes as needed

// MongoDB Optimization Example
db.users.createIndex({ email: 1 });
db.users.find({ email: 'test@example.com' });
// Use indexes and project only needed fields: db.users.find({ email: 'test@example.com' }, { name: 1 })`,
    testCases: [
      {
        input: `CREATE INDEX idx_email ON users(email);
SELECT name, email FROM users WHERE email = 'test@example.com';`,
        output: `// Uses index for faster lookup`
      },
      {
        input: `db.users.createIndex({ email: 1 });
db.users.find({ email: 'test@example.com' }, { name: 1, email: 1 });`,
        output: `// Uses index and projects only needed fields`
      }
    ],
    explanation: `**Tips:**
- Use indexes on columns/fields used in WHERE, JOIN, or SORT.
- Avoid SELECT *; fetch only needed columns/fields.
- Use query analyzers (EXPLAIN, MongoDB explain()) to find slow parts.
- In MongoDB, use projection to limit returned fields.
- Avoid N+1 queries (fetching in loops).
- Batch updates/inserts when possible.`
  },
  {
    id: 'nodegen-2',
    title: 'How Database Engine Processes a Query',
    description: 'Short scenario and example of how a database engine processes a query.',
    difficulty: 'Easy',
    category: 'nodejs',
    solution: `-- Scenario: Fetching a user by email
SELECT * FROM users WHERE email = 'test@example.com';

-- Steps:
-- 1. Parse SQL
-- 2. Check permissions
-- 3. Build query plan (use index if available)
-- 4. Fetch data from disk/memory
-- 5. Return result to client`,
    testCases: [
      {
        input: `SELECT * FROM users WHERE email = 'test@example.com';`,
        output: `// 1. Parse SQL
// 2. Check permissions  
// 3. Use index on email column
// 4. Fetch row from disk/memory
// 5. Return result`
      }
    ],
    explanation: `**Example:**
- You run: SELECT * FROM users WHERE email = 'test@example.com';
- The engine parses the query, checks permissions, uses an index if present, fetches the row, and returns it.
- If no index, it scans the whole table (slower).`
  },
  {
    id: 'nodegen-3',
    title: 'Caching in DB: Avoiding Repeated Data Fetch',
    description: 'Short answer and example for caching in databases to avoid fetching the same data repeatedly.',
    difficulty: 'Easy',
    category: 'nodejs',
    solution: `// Example: Using Redis as a cache for user profiles
const redis = require('redis');
const client = redis.createClient();

function getUserProfile(userId) {
  client.get(userId, (err, cached) => {
    if (cached) {
      return JSON.parse(cached); // Return from cache
    }
    // Fetch from DB and cache it
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
      client.set(userId, JSON.stringify(result));
      return result;
    });
  });
}`,
    testCases: [
      {
        input: `// First request
getUserProfile(123); // Fetches from DB and caches

// Second request  
getUserProfile(123); // Returns from cache`,
        output: `// First: DB query + cache set
// Second: Cache hit (faster)`
      }
    ],
    explanation: `**Caching:**
- Store frequently accessed data in memory (e.g., Redis, Memcached).
- On request, check cache first; if not found, fetch from DB and cache it.
- Reduces DB load and speeds up response time.`
  },
  {
    id: 'nodegen-4',
    title: 'Should Every API Pass JWT Token? Steps',
    description: 'Step-by-step: Should every API pass a JWT token from backend?',
    difficulty: 'Easy',
    category: 'nodejs',
    solution: `// Steps for JWT in APIs
1. Client logs in and receives JWT from backend
2. Client stores JWT (in memory, localStorage, etc.)
3. For every API request, client sends JWT in Authorization header
4. Backend verifies JWT on each request
5. If valid, backend processes request; else, returns 401 Unauthorized`,
    testCases: [
      {
        input: `// Login request
POST /login
{ "email": "user@example.com", "password": "password" }

// Protected API request
GET /api/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
        output: `// Login: Returns JWT token
// Profile: Verifies JWT and returns user data`
      }
    ],
    explanation: `**JWT Flow:**
- Every protected API should require a JWT in the Authorization header.
- Backend should verify JWT for each request to ensure security.
- Public APIs (login, register) may not require JWT.`
  },
  {
    id: 'nodegen-5',
    title: 'Why Sessions Are Needed?',
    description: 'Simple explanation and example for why sessions are needed in web apps.',
    difficulty: 'Easy',
    category: 'nodejs',
    solution: `// Example: Session usage in Express
const session = require('express-session');
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }));

app.post('/login', (req, res) => {
  // On successful login
  req.session.userId = user.id;
  res.send('Logged in');
});

app.get('/dashboard', (req, res) => {
  if (req.session.userId) {
    res.send('Welcome!');
  } else {
    res.status(401).send('Please log in');
  }
});`,
    testCases: [
      {
        input: `// User logs in
POST /login
{ "email": "user@example.com", "password": "password" }

// Session is created
req.session.userId = 123;

// User visits dashboard
GET /dashboard
// Session contains userId, so user is authenticated`,
        output: `// Login: Creates session with userId
// Dashboard: Checks session and allows access`
      }
    ],
    explanation: `**Why Sessions?**
- Sessions store user data between requests (e.g., login state).
- HTTP is stateless; sessions allow tracking users across requests.
- Used for authentication, shopping carts, etc.`
  },
  {
    id: 'nodegen-6',
    title: 'Validation of Request Body Params (Payload)',
    description: 'How to validate request body parameters in Node.js APIs.',
    difficulty: 'Easy',
    category: 'nodejs',
    solution: `// Example: Using express-validator for payload validation
const { body, validationResult } = require('express-validator');

app.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Proceed with registration
});`,
    testCases: [
      {
        input: `// Valid request
POST /register
{
  "email": "user@example.com",
  "password": "password123"
}

// Invalid request
POST /register
{
  "email": "invalid-email",
  "password": "123"
}`,
        output: `// Valid: Proceeds with registration
// Invalid: Returns 400 with validation errors`
      }
    ],
    explanation: `**Validation:**
- Always validate incoming data to prevent bad/malicious input.
- Use libraries like express-validator, Joi, or Yup.
- Return errors if validation fails; proceed if valid.`
  }
]
