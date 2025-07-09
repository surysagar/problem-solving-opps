import { Problem } from '@/types'

export const reactNextProblems: Problem[] = [
  {
    id: 'react-next-comprehensive',
    title: 'React & Next.js Core Concepts',
    description: 'Comprehensive overview of React.lazy, Suspense, keys, performance hooks, Context, state updates, and useEffect.',
    difficulty: 'Medium',
    category: 'react-next',
    solution: `// 1. React.lazy under the hood
// React.lazy uses webpack's dynamic import under the hood
// It creates separate bundles that are only loaded when needed
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// 2. Lazy and Suspense best use case
// Use for conditional rendering and route-based code splitting
function App() {
  const [showComponent, setShowComponent] = useState(false);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {showComponent && <LazyComponent />}
    </Suspense>
  );
}

// 3. Key prop for list items
// Keys help React identify items for efficient re-rendering
// CRUD operations benefit from stable keys
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

function ItemList() {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// 4. useMemo for performance optimization
// Memoizes computed values, only recalculates when dependencies change
function ExpensiveComponent({ data }) {
  const expensiveValue = useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]); // Only recalculates when data changes
  
  return <div>{expensiveValue}</div>;
}

// 5. React.memo for component memoization
// Prevents re-renders when props haven't changed
const MemoizedComponent = React.memo(({ value }) => {
  console.log("Rendered");
  return <div>{value}</div>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  return <MemoizedComponent value="Hello" />;
};

// 6. React Context for state management
// Avoids prop drilling, useful for global state
const NotificationContext = React.createContext();

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  
  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

// Usage without prop drilling
function NotificationButton() {
  const { setNotifications } = useContext(NotificationContext);
  // Can access state directly without props
}

// 7. State Updates are Asynchronous
// React batches state updates for performance
function StateExample() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1); // This doesn't immediately update
    setCount(count + 1); // This uses the same value as above
    // Use functional updates for sequential updates
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };
}

// 8. React.memo re-render behavior
// Only re-renders when props change
const MemoizedComponent = React.memo(({ value }) => {
  console.log("Rendered");
  return <div>{value}</div>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  return <MemoizedComponent value="Hello" />;
};

// 9. useEffect and dependency arrays
function EffectExample() {
  const [data, setData] = useState(null);
  
  // Runs after every render
  useEffect(() => {
    console.log('Effect runs after every render');
  });
  
  // Runs only once on mount
  useEffect(() => {
    console.log('Effect runs only once');
  }, []);
  
  // Runs when data changes
  useEffect(() => {
    if (data) {
      console.log('Data changed:', data);
    }
  }, [data]);
  
  // Runs when component unmounts (cleanup)
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);
    
    return () => {
      clearInterval(timer); // Cleanup on unmount
    };
  }, []);
}`,
    testCases: [],
    explanation: `React.lazy uses webpack's dynamic import to create separate bundles that are loaded on-demand. Suspense provides fallback UI during loading. Keys help React efficiently update lists by identifying unique items. useMemo memoizes expensive calculations, only recalculating when dependencies change. React.memo prevents unnecessary re-renders when props haven't changed. Context provides global state access without prop drilling, useful for notifications, translations, and nested state. State updates are batched for performance, so multiple setState calls in the same event handler are batched together. useEffect runs side effects with different behaviors based on dependency arrays: empty array runs once on mount, no array runs after every render, and specific dependencies run when those values change.`
  },
  {
    id: 'react-next-props-immutability',
    title: 'Props Immutability and State Management',
    description: 'Understanding why props are immutable and readonly in React functional components, and how this relates to state management patterns.',
    difficulty: 'Medium',
    category: 'react-next',
    solution: `// 1. Props are Immutable and Readonly
// Props represent "state that is managed by the component owner"
// They cannot be modified within the component

function SayHi(props) {
  // props.name = "Jim"; // TypeError: Cannot assign to read only property 'name'
  return <h1>Hi {props.name}!</h1>;
}

// 2. Why Props are Immutable
// - Components should manage their own state
// - Props are essentially "state managed by the component owner"
// - Mutating props could conflict with setState() calls from parent
// - Ensures predictable data flow (unidirectional)

// 3. Correct Way to Handle Props
function UserProfile({ user, onUpdateUser }) {
  // Don't modify props directly
  // user.name = "New Name"; // ❌ Wrong
  
  // Instead, call parent's update function
  const handleNameChange = (newName) => {
    onUpdateUser({ ...user, name: newName }); // ✅ Correct
  };
  
  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={() => handleNameChange("Jim")}>
        Change Name
      </button>
    </div>
  );
}

// 4. State Management in Functional Components
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(prevCount => prevCount + 1); // ✅ Manage own state
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// 5. Redux Reducers and Immutability
// Reducers are pure functions that return immutable data structures
import { INCREMENT } from '../actionTypes/default';
import { Map } from 'immutable';

export default (state = Map({number: 0}), action = {}) => {
  switch (action.type) {
    case INCREMENT:
      // Return new immutable data structure
      return state.update('number', num => num + 1);
    default:
      return state;
  }
};

// 6. JavaScript Spread Operator for Immutability
// Create new objects instead of mutating existing ones
const initialState = {
  user: { name: 'John', age: 30 },
  settings: { theme: 'dark' }
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_USER_NAME':
      // ❌ Wrong - mutating state directly
      // state.user.name = action.payload;
      // return state;
      
      // ✅ Correct - return new immutable object
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload
        }
      };
      
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      };
      
    default:
      return state;
  }
}

// 7. React State Updates and Immutability
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build App', completed: false }
  ]);
  
  const toggleTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };
  
  const addTodo = (text) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: Date.now(), text, completed: false }
    ]);
  };
  
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
        </div>
      ))}
    </div>
  );
}

// 8. Angular Input Properties (Similar Concept)
// In Angular, @Input properties are also immutable
@Component({
  selector: 'app-user',
  template: '<h2>{{ user.name }}</h2>'
})
export class UserComponent {
  @Input() user: User;
  
  // Don't modify @Input properties directly
  // this.user.name = 'New Name'; // ❌ Wrong
}

// 9. Immutability Benefits
// - Predictable state changes
// - Easier debugging and testing
// - Better performance with React.memo and useMemo
// - Prevents side effects and bugs
// - Enables time-travel debugging in Redux DevTools

// 10. Common Immutability Patterns
const updateNestedObject = (state, path, value) => {
  const newState = { ...state };
  let current = newState;
  
  for (let i = 0; i < path.length - 1; i++) {
    current[path[i]] = { ...current[path[i]] };
    current = current[path[i]];
  }
  
  current[path[path.length - 1]] = value;
  return newState;
};

// Usage
const newState = updateNestedObject(
  state,
  ['user', 'profile', 'settings'],
  { theme: 'light' }
);`,
    testCases: [
      {
        input: 'SayHi({ name: "Alice" })',
        output: '<h1>Hi Alice!</h1>'
      },
      {
        input: 'userReducer(initialState, { type: "UPDATE_USER_NAME", payload: "Jim" }).user.name',
        output: 'Jim'
      },
      {
        input: 'Map({number: 0}).update("number", num => num + 1).get("number")',
        output: '1'
      }
    ],
    explanation: `Props immutability is a fundamental concept in React that ensures predictable data flow and prevents bugs. Here's why props are immutable:

## **Why Props are Immutable:**

1. **Component Ownership**: Props represent "state managed by the component owner" - the parent component
2. **Predictable Data Flow**: Unidirectional data flow prevents confusion about where state changes originate
3. **Conflict Prevention**: Mutating props could conflict with setState() calls from the parent
4. **Performance**: Immutable props enable React's optimization strategies

## **Key Concepts:**

### **Props vs State:**
- **Props**: Read-only, managed by parent component
- **State**: Mutable, managed by the component itself

### **Redux Reducers:**
- Pure functions that return immutable data structures
- Use libraries like Immutable.js or spread operators
- Never mutate the state directly

### **Immutable Patterns:**
- **Spread Operator**: Create new objects/arrays
- **Map/Set**: Use immutable data structures
- **Functional Updates**: Use callbacks in setState

## **Benefits of Immutability:**

1. **Predictable State Changes**: Easy to track what changed and when
2. **Better Performance**: React can optimize re-renders
3. **Easier Testing**: Pure functions are easier to test
4. **Debugging**: Time-travel debugging in Redux DevTools
5. **Prevents Bugs**: Eliminates side effects from mutations

## **Common Patterns:**

- **Object Updates**: Use spread operator to create new objects
- **Array Updates**: Use map, filter, or spread for new arrays
- **Nested Updates**: Create new objects at each level
- **Redux Actions**: Always return new state objects

This immutability principle applies across React, Redux, Angular, and other modern frameworks, ensuring robust and maintainable applications.`
  }
] 