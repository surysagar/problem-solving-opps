import { Problem } from '@/types'

export const miscProblems: Problem[] = [
  {
    id: 'misc-1',
    title: 'What does [_, v] mean in Object.entries?',
    description: 'Understand array destructuring in Object.entries and why _ is used as a throwaway variable.',
    difficulty: 'Easy',
    category: 'misc',
    solution: `const obj = { a: 50, b: 150, c: 200 };
// Object.entries(obj) → [['a', 50], ['b', 150], ['c', 200]]
const filtered = Object.entries(obj).filter(([_, v]) => v > 100);
console.log(filtered); // [['b', 150], ['c', 200]]
// _ is the key (ignored), v is the value (used)`,
    testCases: [
      { input: 'Object.entries({ a: 50, b: 150, c: 200 }).filter(([_, v]) => v > 100)', output: "[['b', 150], ['c', 200]]" }
    ],
    explanation: `In .filter(([_, v]) => v > 100), _ is a throwaway variable for the key, v is the value. This is a common convention to show the key is unused. You could also write ([key, value]) => value > 100 for clarity.`
  },
  {
    id: 'misc-2',
    title: 'Response Object Methods (Web APIs)',
    description: 'Common methods available on the Response object in the Fetch API and their purposes.',
    difficulty: 'Easy',
    category: 'misc',
    solution: `// Response.clone()
// Creates a clone of a Response object.

// Response.error()
// Returns a new Response object associated with a network error.

// Response.redirect()
// Creates a new response with a different URL.

// Body.arrayBuffer()
// Takes a Response stream and reads it to completion. Returns a promise that resolves with an ArrayBuffer.`,
    testCases: [],
    explanation: `These are common methods on the Response object (from the Fetch API):\n- clone(): Makes a copy of the response.\n- error(): Returns a response representing a network error.\n- redirect(): Creates a response for a redirect.\n- arrayBuffer(): Reads the response body and returns a promise that resolves with an ArrayBuffer.\n\nThese methods are useful for handling network responses in web applications.`
  },
  {
    id: 'misc-3',
    title: 'Response Object – Web API (Fetch)',
    description: 'Overview of the Response object used with the Fetch API, including properties, methods, and best practices.',
    difficulty: 'Easy',
    category: 'misc',
    solution: `// Common Use:
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Key Properties:
// status: HTTP status code (e.g., 200, 404)
// statusText: Status message (e.g., "OK", "Not Found")
// ok: true if status is 200–299
// redirected: true if the response was redirected
// type: Type of response (basic, cors, opaque)
// url: Final URL after redirects
// headers: Response headers (Headers object)

// Body Consumption Methods (return Promises):
// response.text()      // Plain text
// response.json()      // JSON
// response.blob()      // Blob (e.g., images)
// response.formData()  // FormData object
// response.arrayBuffer() // Raw binary data

// Streaming the body (advanced):
const reader = response.body.getReader();

// Common Example: Check JSON Response
fetch('/api/user')
  .then(res => {
    if (!res.ok) throw new Error('Failed!');
    return res.json();
  })
  .then(user => console.log(user));

// Note: res.json(), res.text() etc. consume the body and cannot be used again.
// Use .clone() if you need to read it twice:
const resClone = res.clone();
const text = await res.text();
const again = await resClone.json(); // safe now

// Bonus: Check Content-Type Before Parsing
fetch(url)
  .then(res => {
    const contentType = res.headers.get("content-type");
    if (contentType.includes("application/json")) {
      return res.json();
    } else {
      return res.text();
    }
  });`,
    testCases: [],
    explanation: `The Response object represents the response to a Fetch API request.\n\n- Key properties include status, ok, redirected, type, url, and headers.\n- Body consumption methods (json, text, blob, formData, arrayBuffer) return Promises and can only be used once per response.\n- Use .clone() if you need to read the body more than once.\n- You can stream large responses using response.body.getReader().\n- Always check response.ok and content-type before parsing.\n\nThis pattern is essential for robust web API consumption in modern JavaScript.`
  }
]; 