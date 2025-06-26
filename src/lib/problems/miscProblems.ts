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
  },
  {
    id: 'misc-4',
    title: 'Shadow DOM vs Virtual DOM vs Incremental DOM',
    description: 'Understanding the differences between Shadow DOM, Virtual DOM, and Incremental DOM, plus latest trends in Angular and React.',
    difficulty: 'Hard',
    category: 'misc',
    solution: `// 1. SHADOW DOM (Web Components)
// Encapsulated DOM tree attached to an element
class MyElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = \`
      <style>
        .internal { color: red; } /* Scoped to shadow DOM */
      </style>
      <div class="internal">Shadow DOM content</div>
    \`;
  }
}
customElements.define('my-element', MyElement);

// 2. VIRTUAL DOM (React)
// JavaScript representation of actual DOM
const virtualElement = {
  type: 'div',
  props: {
    className: 'container',
    children: [
      {
        type: 'h1',
        props: { children: 'Hello Virtual DOM' }
      }
    ]
  }
};

// React's reconciliation process
function reconcile(oldVNode, newVNode) {
  // Compare virtual nodes and update real DOM efficiently
  if (oldVNode.type !== newVNode.type) {
    // Replace entire node
    return replaceNode(oldVNode, newVNode);
  }
  // Update props and children
  updateProps(oldVNode.props, newVNode.props);
  reconcileChildren(oldVNode.children, newVNode.children);
}

// 3. INCREMENTAL DOM (Angular, Google Closure)
// Direct DOM manipulation with minimal memory overhead
function renderIncremental() {
  elementOpen('div', null, null, 'class', 'container');
  elementOpen('h1');
  text('Hello Incremental DOM');
  elementClose('h1');
  elementClose('div');
}

// Angular's Ivy renderer (Incremental DOM based)
@Component({
  template: \`
    <div class="container">
      <h1>{{ title }}</h1>
    </div>
  \`
})
class MyComponent {
  title = 'Hello Angular Ivy';
}

// 4. LATEST TRENDS

// React 18+ (Concurrent Features)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); // Concurrent rendering

// React Server Components (RSC)
// Server-side rendered components with client hydration
async function ServerComponent() {
  const data = await fetchData(); // Runs on server
  return <div>{data}</div>;
}

// Angular 17+ (Standalone Components + Signals)
@Component({
  standalone: true,
  template: \`
    <div>{{ count() }}</div>
    <button (click)="increment()">+</button>
  \`
})
class CounterComponent {
  count = signal(0);
  
  increment() {
    this.count.update(c => c + 1);
  }
}

// Vue 3 Composition API + Vite
const { ref, computed } = Vue;
const count = ref(0);
const double = computed(() => count.value * 2);

// Svelte 5 (Runes - New Reactivity System)
let count = $state(0);
let double = $derived(count * 2);`,
    testCases: [],
    explanation: `DOM Technologies Comparison:

1. SHADOW DOM:
- Web standard for encapsulation
- Provides style and DOM isolation
- Used in Web Components
- Scopes CSS and prevents style leakage
- Real DOM tree attached to elements

2. VIRTUAL DOM:
- JavaScript representation of real DOM
- Used by React, Vue 2, and others
- Diffing algorithm compares virtual trees
- Batches DOM updates for performance
- Memory overhead due to keeping virtual tree

3. INCREMENTAL DOM:
- Direct DOM manipulation approach
- Used by Angular Ivy, Google Closure
- Minimal memory footprint
- No virtual tree storage
- Instructions-based rendering

LATEST TRENDS:

ANGULAR (v17+):
- Ivy renderer (Incremental DOM)
- Standalone components
- Signals for fine-grained reactivity
- Server-side rendering improvements
- Deferrable views for performance

REACT (v18+):
- Concurrent features
- Server Components (RSC)
- Automatic batching
- Suspense for data fetching
- Streaming SSR

VUE 3:
- Composition API
- Vite build tool
- Teleport and Fragments
- Better TypeScript support

SVELTE 5:
- Runes reactivity system
- Compile-time optimization
- Smaller bundle sizes
- Better performance

The trend is moving toward:
- Better performance (Incremental DOM, Runes)
- Server-side rendering (RSC, SSR)
- Fine-grained reactivity (Signals, Runes)
- Compile-time optimizations (Svelte, Vite)`
  }
]; 