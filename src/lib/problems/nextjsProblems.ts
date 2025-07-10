import { Problem } from '../../types';

export const nextjsProblems: Problem[] = [
  {
    id: 'nextjs-1',
    title: 'Difficulties in Next.js Without Express and How to Overcome Them',
    description: 'Understanding the challenges of building applications in Next.js without Express.js and how Node.js works without Express server, including solutions and alternatives.',
    difficulty: 'Medium',
    category: 'nextjs',
    solution: `// Next.js Without Express - Challenges and Solutions

// 1. CHALLENGES WITHOUT EXPRESS

// Challenge 1: No Built-in Middleware System
// Express provides easy middleware setup, Next.js doesn't have this built-in

// Challenge 2: No Built-in Body Parsing
// Express automatically parses JSON, form data, etc.

// Challenge 3: No Built-in CORS
// Express has cors middleware, Next.js doesn't

// Challenge 4: No Built-in Error Handling
// Express has error handling middleware

// Challenge 5: No Built-in Static File Serving
// Express serves static files easily

// 2. SOLUTIONS AND ALTERNATIVES

// Solution 1: API Routes for Backend Logic
export default function handler(req, res) {
  // Handle API requests here
  if (req.method === 'POST') {
    // Parse body manually
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = JSON.parse(body);
      res.status(200).json({ message: 'Data received', data });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// Solution 2: Custom Middleware with API Routes
function withMiddleware(handler) {
  return async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Body parsing
    if (req.method === 'POST' || req.method === 'PUT') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          return handler(req, res);
        } catch (error) {
          res.status(400).json({ error: 'Invalid JSON' });
        }
      });
    } else {
      return handler(req, res);
    }
  };
}

// Solution 3: Error Handling
function withErrorHandling(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

// Solution 4: Authentication Middleware
function withAuth(handler) {
  return async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
      // Verify token (using JWT or other method)
      const decoded = verifyToken(token);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

// 3. COMPLETE API ROUTE EXAMPLE
export default withErrorHandling(withMiddleware(async (req, res) => {
  switch (req.method) {
    case 'GET':
      res.status(200).json({ message: 'GET request successful' });
      break;
    case 'POST':
      res.status(201).json({ 
        message: 'POST request successful', 
        data: req.body 
      });
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}));

// 4. NODE.JS WITHOUT EXPRESS SERVER

// Basic HTTP Server
const http = require('http');

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Parse URL
  const url = new URL(req.url, \`http://\${req.headers.host}\`);
  const path = url.pathname;
  const method = req.method;
  
  // Route handling
  if (path === '/api/users' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: [] }));
  } else if (path === '/api/users' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const userData = JSON.parse(body);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User created', user: userData }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

// 5. NEXT.JS API ROUTES WITH FULL FUNCTIONALITY

// pages/api/users.js
import { withErrorHandling, withMiddleware, withAuth } from '../../lib/middleware';

async function usersHandler(req, res) {
  const { method } = req;
  
  switch (method) {
    case 'GET':
      // Get users logic
      const users = await getUsers();
      res.status(200).json(users);
      break;
      
    case 'POST':
      // Create user logic
      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
      break;
      
    case 'PUT':
      // Update user logic
      const updatedUser = await updateUser(req.body);
      res.status(200).json(updatedUser);
      break;
      
    case 'DELETE':
      // Delete user logic
      await deleteUser(req.body.id);
      res.status(204).end();
      break;
      
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}

// Apply middleware
export default withErrorHandling(withMiddleware(withAuth(usersHandler)));

// 6. CUSTOM MIDDLEWARE LIBRARY

// lib/middleware.js
export function withErrorHandling(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export function withMiddleware(handler) {
  return async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    // Body parsing
    if (req.method === 'POST' || req.method === 'PUT') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          return handler(req, res);
        } catch (error) {
          res.status(400).json({ error: 'Invalid JSON' });
        }
      });
    } else {
      return handler(req, res);
    }
  };
}

export function withAuth(handler) {
  return async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

// 7. STATIC FILE SERVING

// Next.js automatically serves static files from public/ directory
// No additional setup needed

// 8. ENVIRONMENT VARIABLES

// .env.local
JWT_SECRET=your-secret-key
DATABASE_URL=your-database-url

// Usage in API routes
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// 9. DATABASE CONNECTIONS

// lib/db.js
import { MongoClient } from 'mongodb';

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }
  
  const client = await MongoClient.connect(process.env.DATABASE_URL);
  cachedClient = client;
  
  return client;
}

// 10. COMPLETE WORKFLOW EXAMPLE

// 1. Setup middleware
// 2. Create API routes
// 3. Handle authentication
// 4. Connect to database
// 5. Implement business logic
// 6. Handle errors
// 7. Return responses

// This approach gives you full control over your backend
// while leveraging Next.js's built-in features for frontend`,
    testCases: [
      {
        input: `// API Route without Express
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js API' });
}`,
        output: `// Returns JSON response without Express middleware`
      },
      {
        input: `// Node.js HTTP server without Express
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello from Node.js' }));
});`,
        output: `// Basic HTTP server without Express framework`
      },
      {
        input: `// Custom middleware in Next.js
function withAuth(handler) {
  return (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'No token' });
    }
    return handler(req, res);
  };
}`,
        output: `// Custom authentication middleware without Express`
      }
    ],
    explanation: `**Next.js Without Express - Challenges and Solutions**

**1. Main Challenges:**

**No Built-in Middleware System:**
- Express provides easy middleware setup with app.use()
- Next.js requires custom middleware implementation
- Solution: Create custom middleware functions

**No Built-in Body Parsing:**
- Express automatically parses JSON, form data
- Next.js requires manual body parsing
- Solution: Implement custom body parsing logic

**No Built-in CORS:**
- Express has cors middleware
- Next.js requires manual CORS headers
- Solution: Set CORS headers in API routes

**No Built-in Error Handling:**
- Express has error handling middleware
- Next.js requires try-catch blocks
- Solution: Create error handling wrappers

**2. Solutions:**

**Custom Middleware:**
\`\`\`javascript
function withMiddleware(handler) {
  return async (req, res) => {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Parse body manually
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk.toString());
      req.on('end', () => {
        req.body = JSON.parse(body);
        return handler(req, res);
      });
    } else {
      return handler(req, res);
    }
  };
}
\`\`\`

**Error Handling:**
\`\`\`javascript
function withErrorHandling(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
\`\`\`

**3. Node.js Without Express Server:**

**Basic HTTP Server:**
\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Manual routing
  if (req.url === '/api/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: [] }));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});
\`\`\`

**4. Advantages of This Approach:**

**Full Control:**
- Complete control over request/response handling
- Custom middleware implementation
- No framework overhead

**Learning Benefits:**
- Better understanding of HTTP protocol
- Deeper knowledge of Node.js
- Customizable to specific needs

**Performance:**
- Minimal overhead
- Optimized for specific use cases
- No unnecessary features

**5. Best Practices:**

**Middleware Composition:**
- Create reusable middleware functions
- Compose multiple middleware together
- Keep middleware focused and single-purpose

**Error Handling:**
- Always wrap handlers in try-catch
- Provide meaningful error messages
- Log errors for debugging

**Security:**
- Validate all inputs
- Implement proper authentication
- Use HTTPS in production

**6. When to Use This Approach:**

**Use When:**
- Building simple APIs
- Learning Node.js fundamentals
- Need complete control
- Performance is critical

**Consider Express When:**
- Building complex applications
- Need rapid development
- Team prefers established patterns
- Require extensive middleware ecosystem

**7. Migration Path:**

**From Express to Next.js:**
1. Move routes to pages/api/
2. Replace Express middleware with custom functions
3. Update request/response handling
4. Test thoroughly

**From Next.js to Express:**
1. Extract API logic to Express routes
2. Replace custom middleware with Express middleware
3. Update server setup
4. Maintain same API endpoints

This approach gives you the flexibility to build exactly what you need while understanding the underlying HTTP and Node.js concepts.`
  }
]; 