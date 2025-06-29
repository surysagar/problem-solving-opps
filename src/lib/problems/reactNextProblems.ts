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
  }
] 