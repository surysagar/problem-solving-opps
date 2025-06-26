import { Problem } from '@/types'

export const architectureIntermediateProblems: Problem[] = [
  {
    id: 'arch-inter-angular-architecture',
    title: 'What is the architecture of a basic Angular app?',
    description: 'Angular uses component-based architecture with modules, services (DI), routing, and templates. It follows MVVM.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Angular App Structure Example
src/
  app/
    app.module.ts
    app.component.ts
    app-routing.module.ts
    features/
      feature.module.ts
    services/
      data.service.ts

// Angular uses modules, components, services, and routing.
// MVVM: Component = ViewModel, Template = View`,
    testCases: [],
    explanation: 'Angular organizes code into modules, components, and services. It uses dependency injection, built-in routing, and templates for UI.'
  },
  {
    id: 'arch-inter-react-architecture',
    title: 'What is the architecture of a basic React app?',
    description: 'React is a component-based library with a unidirectional data flow, often using Redux or Context API for state management.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// React App Structure Example
src/
  App.js
  components/
    Header.js
    Footer.js
  features/
    UserList.js
    ProductList.js
  store/
    index.js

// React uses components, props, and state. Data flows one way from parent to child.`,
    testCases: [],
    explanation: 'React apps are built from components. State flows down via props, and state management is often handled by Context API or Redux.'
  },
  {
    id: 'arch-inter-data-binding',
    title: 'How does data binding differ between Angular and React?',
    description: 'Angular: Two-way binding ([(ngModel)]). React: One-way binding with props, useState.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Angular Two-way Binding
<input [(ngModel)]="username" />

// React One-way Binding
<input value={username} onChange={e => setUsername(e.target.value)} />`,
    testCases: [],
    explanation: 'Angular supports two-way binding with [(ngModel)], while React uses one-way binding with props and state.'
  },
  {
    id: 'arch-inter-angular-services',
    title: 'What is the role of services in Angular?',
    description: 'Services hold business logic and reusable methods, injected via DI (dependency injection).',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Angular Service Example
@Injectable({ providedIn: 'root' })
export class DataService {
  getData() {
    return [1, 2, 3];
  }
}

// Inject in component constructor
constructor(private dataService: DataService) {}`,
    testCases: [],
    explanation: 'Services in Angular encapsulate business logic and are injected into components or other services using Angular DI.'
  },
  {
    id: 'arch-inter-react-state',
    title: 'How is state managed in React?',
    description: 'useState, useReducer, Context API, or external libraries like Redux or Zustand.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// useState Example
const [count, setCount] = useState(0);

// Context API Example
const MyContext = React.createContext();

// Redux Example
// store.dispatch({ type: 'INCREMENT' });`,
    testCases: [],
    explanation: 'React state can be managed locally with useState/useReducer, globally with Context API, or with libraries like Redux/Zustand.'
  },
  {
    id: 'arch-inter-ngmodule',
    title: 'What is the role of NgModule in Angular?',
    description: 'Organizes components, directives, pipes, and services into cohesive blocks.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Angular NgModule Example
@NgModule({
  declarations: [AppComponent, MyComponent],
  imports: [BrowserModule, FormsModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}`,
    testCases: [],
    explanation: 'NgModule groups related code into functional blocks, making Angular apps modular and maintainable.'
  },
  {
    id: 'arch-inter-jsx',
    title: 'What is JSX in React?',
    description: 'JavaScript XML, a syntax extension to JavaScript used with React.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// JSX Example
const element = <h1>Hello, world!</h1>;

// JSX allows you to write HTML-like code in JavaScript files.`,
    testCases: [],
    explanation: 'JSX is a syntax extension for JavaScript that lets you write HTML-like code in React components.'
  },
  {
    id: 'arch-inter-lifecycle',
    title: 'Compare lifecycle hooks in Angular vs React.',
    description: 'Angular: ngOnInit, ngOnChanges, etc. React: useEffect, componentDidMount, componentDidUpdate.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Angular Lifecycle
ngOnInit() { /* runs on init */ }
ngOnChanges() { /* runs on input changes */ }

// React Lifecycle
useEffect(() => { /* runs on mount/update */ }, [deps]);
// or class methods: componentDidMount, componentDidUpdate`,
    testCases: [],
    explanation: 'Angular uses lifecycle hooks like ngOnInit, ngOnChanges. React uses useEffect or class lifecycle methods.'
  },
  {
    id: 'arch-inter-angular-cli',
    title: 'What is Angular CLI and its architectural impact?',
    description: 'CLI scaffolds project structure and enforces best practices.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Angular CLI Example
ng new my-app
ng generate component my-component
ng generate service my-service

// CLI enforces best practices and project structure.`,
    testCases: [],
    explanation: 'Angular CLI generates boilerplate code, enforces best practices, and helps maintain a consistent project structure.'
  },
  {
    id: 'arch-inter-cra',
    title: 'What is create-react-app (CRA)?',
    description: 'A CLI to scaffold a React project with built-in Webpack, Babel, etc.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Create React App Example
npx create-react-app my-app

// CRA sets up Webpack, Babel, and project structure for you.`,
    testCases: [],
    explanation: 'CRA is a CLI tool that scaffolds a React project with sensible defaults and build tools.'
  },
  {
    id: 'arch-inter-1',
    title: 'Microservices Architecture',
    description: 'Understanding microservices architecture patterns, communication, and design principles.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Microservices Communication Example
// Service A - User Service
class UserService {
  async getUserById(id: string) {
    // Database query
    const user = await this.userRepository.findById(id);
    
    // Call other microservice for additional data
    const userProfile = await this.profileService.getProfile(id);
    
    return {
      ...user,
      profile: userProfile
    };
  }
}

// Service B - Profile Service
class ProfileService {
  async getProfile(userId: string) {
    return await this.profileRepository.findByUserId(userId);
  }
}

// API Gateway Pattern
class ApiGateway {
  async routeRequest(path: string, method: string, body?: any) {
    const route = this.routes.find(r => 
      r.path === path && r.method === method
    );
    
    if (!route) {
      throw new Error('Route not found');
    }
    
    // Forward request to appropriate microservice
    return await this.forwardToService(route.service, body);
  }
}

// Service Discovery
class ServiceRegistry {
  private services = new Map();
  
  register(serviceName: string, url: string) {
    this.services.set(serviceName, url);
  }
  
  getService(serviceName: string) {
    return this.services.get(serviceName);
  }
}

// Circuit Breaker Pattern
class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  
  async execute(operation: () => Promise<any>) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > 60000) {
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
  
  private onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= 5) {
      this.state = 'OPEN';
    }
  }
}`,
    testCases: [],
    explanation: `Microservices Architecture breaks down applications into small, independent services.

Key Principles:
- Single Responsibility: Each service has one business capability
- Loose Coupling: Services communicate through well-defined APIs
- High Cohesion: Related functionality is grouped together
- Independent Deployment: Services can be deployed separately

Communication Patterns:
1. Synchronous: HTTP/REST, gRPC
2. Asynchronous: Message queues, event-driven
3. Service Mesh: Istio, Linkerd for service-to-service communication

Design Patterns:
- API Gateway: Single entry point for all clients
- Service Discovery: Dynamic service location
- Circuit Breaker: Fault tolerance and resilience
- Event Sourcing: Event-driven data storage
- CQRS: Command Query Responsibility Segregation

Benefits:
- Independent scaling
- Technology diversity
- Fault isolation
- Faster development cycles

Challenges:
- Distributed system complexity
- Data consistency
- Network latency
- Operational overhead`
  },
  {
    id: 'arch-inter-2',
    title: 'Event-Driven Architecture',
    description: 'Understanding event-driven patterns, event sourcing, and message-driven systems.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Event-Driven Architecture Example
// Event Bus
class EventBus {
  private handlers = new Map();
  
  subscribe(eventType: string, handler: Function) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType).push(handler);
  }
  
  publish(event: any) {
    const handlers = this.handlers.get(event.type) || [];
    handlers.forEach(handler => handler(event));
  }
}

// Event Store
class EventStore {
  private events: any[] = [];
  
  append(streamId: string, event: any) {
    this.events.push({
      streamId,
      event,
      timestamp: new Date(),
      version: this.getNextVersion(streamId)
    });
  }
  
  getEvents(streamId: string) {
    return this.events.filter(e => e.streamId === streamId);
  }
  
  private getNextVersion(streamId: string) {
    const streamEvents = this.getEvents(streamId);
    return streamEvents.length + 1;
  }
}

// Aggregate Root
class Order {
  private id: string;
  private items: any[] = [];
  private status: string = 'pending';
  private events: any[] = [];
  
  constructor(id: string) {
    this.id = id;
  }
  
  addItem(item: any) {
    this.items.push(item);
    this.raiseEvent('ItemAdded', { item });
  }
  
  confirm() {
    this.status = 'confirmed';
    this.raiseEvent('OrderConfirmed', { orderId: this.id });
  }
  
  private raiseEvent(type: string, data: any) {
    const event = { type, data, timestamp: new Date() };
    this.events.push(event);
  }
  
  getUncommittedEvents() {
    return this.events;
  }
  
  markEventsAsCommitted() {
    this.events = [];
  }
}

// Message Queue Implementation
class MessageQueue {
  private queue: any[] = [];
  private consumers: Function[] = [];
  
  publish(message: any) {
    this.queue.push(message);
    this.notifyConsumers();
  }
  
  subscribe(consumer: Function) {
    this.consumers.push(consumer);
  }
  
  private notifyConsumers() {
    if (this.queue.length > 0) {
      const message = this.queue.shift();
      this.consumers.forEach(consumer => consumer(message));
    }
  }
}

// Saga Pattern for Distributed Transactions
class OrderSaga {
  async execute(orderData: any) {
    try {
      // Step 1: Create Order
      const order = await this.createOrder(orderData);
      
      // Step 2: Reserve Inventory
      await this.reserveInventory(order.items);
      
      // Step 3: Process Payment
      await this.processPayment(order.total);
      
      // Step 4: Confirm Order
      await this.confirmOrder(order.id);
      
    } catch (error) {
      // Compensating actions
      await this.compensate(error);
    }
  }
  
  private async compensate(error: any) {
    // Rollback operations
    console.log('Compensating for error:', error);
  }
}`,
    testCases: [],
    explanation: `Event-Driven Architecture uses events to trigger and communicate between decoupled services.

Key Concepts:
- Events: Something that happened in the system
- Event Handlers: Code that responds to events
- Event Store: Persistent storage of all events
- Event Sourcing: Reconstructing state from events

Patterns:
1. Event Sourcing: Store events instead of state
2. CQRS: Separate read and write models
3. Saga Pattern: Distributed transaction management
4. Event Streaming: Real-time event processing

Benefits:
- Loose coupling between components
- Scalability and performance
- Audit trail and debugging
- Temporal queries and analytics

Use Cases:
- E-commerce order processing
- Financial transaction systems
- IoT data processing
- Real-time analytics
- User activity tracking`
  },
  {
    id: 'arch-inter-routing-diff',
    title: 'How does routing differ in Angular and React?',
    description: 'Angular: Built-in router. React: Uses react-router-dom.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Angular Routing
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

// React Routing
import { BrowserRouter, Route, Routes } from 'react-router-dom';
<Route path="/home" element={<Home />} />
<Route path="/about" element={<About />} />`,
    testCases: [],
    explanation: 'Angular has built-in routing, while React uses the react-router-dom library for client-side routing.'
  },
  {
    id: 'arch-inter-di-angular',
    title: 'How does Angular manage dependency injection?',
    description: 'Uses decorators like @Injectable() and hierarchical injectors.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Angular DI Example
@Injectable({ providedIn: 'root' })
export class MyService {}

@Component({...})
export class MyComponent {
  constructor(private myService: MyService) {}
}

// Angular uses hierarchical injectors: Module → Component → Service`,
    testCases: [],
    explanation: 'Angular DI uses decorators and hierarchical injectors to provide services to components and other services.'
  },
  {
    id: 'arch-inter-lazy-angular',
    title: 'How to implement lazy loading in Angular?',
    description: 'Use Angular routing\'s loadChildren.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Angular Lazy Loading
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  }
];

// This loads the module only when the route is accessed.`,
    testCases: [],
    explanation: 'Angular lazy loading uses loadChildren to load feature modules on-demand, improving initial load time.'
  },
  {
    id: 'arch-inter-lazy-react',
    title: 'How to implement lazy loading in React?',
    description: 'Use React.lazy() and Suspense.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// React Lazy Loading
import React, { Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`,
    testCases: [],
    explanation: 'React lazy loading uses React.lazy() with Suspense to load components on-demand with a loading fallback.'
  },
  {
    id: 'arch-inter-smart-dumb',
    title: 'What are smart and dumb components?',
    description: 'Smart: Business logic, connected to state. Dumb: Pure UI, uses props.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Smart Component (Container)
function UserListContainer() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);
  
  return <UserList users={users} />;
}

// Dumb Component (Presentational)
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}`,
    testCases: [],
    explanation: 'Smart components handle business logic and state, while dumb components are pure UI components that receive data via props.'
  },
  {
    id: 'arch-inter-feature-modules',
    title: 'How to implement feature modules in Angular?',
    description: 'Create separate modules for isolated features with own routing.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Feature Module Example
@NgModule({
  declarations: [FeatureComponent, FeatureListComponent],
  imports: [CommonModule, FeatureRoutingModule],
  providers: [FeatureService]
})
export class FeatureModule {}

// Feature Routing
const routes: Routes = [
  { path: '', component: FeatureComponent },
  { path: 'list', component: FeatureListComponent }
];`,
    testCases: [],
    explanation: 'Feature modules in Angular encapsulate related functionality with their own components, services, and routing.'
  },
  {
    id: 'arch-inter-share-angular',
    title: 'How do you share data between components in Angular?',
    description: '@Input/@Output, shared services, RxJS Subject.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// @Input/@Output
@Component({...})
export class ChildComponent {
  @Input() data: any;
  @Output() dataChange = new EventEmitter();
}

// Shared Service
@Injectable()
export class SharedService {
  private dataSubject = new Subject();
  data$ = this.dataSubject.asObservable();
  
  updateData(data: any) {
    this.dataSubject.next(data);
  }
}`,
    testCases: [],
    explanation: 'Angular components can share data through @Input/@Output decorators, shared services, or RxJS observables.'
  },
  {
    id: 'arch-inter-share-react',
    title: 'How do you share data between components in React?',
    description: 'Props drilling, Context API, Redux.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Props Drilling
function Parent() {
  const [data, setData] = useState(null);
  return <Child data={data} setData={setData} />;
}

// Context API
const DataContext = React.createContext();
function Provider({ children }) {
  const [data, setData] = useState(null);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}`,
    testCases: [],
    explanation: 'React components can share data through props drilling, Context API for global state, or state management libraries like Redux.'
  },
  {
    id: 'arch-inter-standalone',
    title: 'What are Angular standalone components?',
    description: 'Components that don\'t need to be declared in a module (Angular 14+).',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Standalone Component
@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [CommonModule],
  template: '<div>Standalone Component</div>'
})
export class StandaloneComponent {}

// No need to declare in NgModule!`,
    testCases: [],
    explanation: 'Standalone components in Angular 14+ can be used without being declared in NgModule, simplifying the module system.'
  },
  {
    id: 'arch-inter-ssr',
    title: 'What is SSR (Server-Side Rendering)?',
    description: 'Rendering UI on the server to improve SEO and load time. Angular: Angular Universal. React: Next.js.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// SSR Benefits
// 1. Better SEO (search engines see content)
// 2. Faster initial page load
// 3. Better performance on slow devices

// Angular Universal
ng add @nguniversal/express-engine

// Next.js (React)
// Built-in SSR support
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}`,
    testCases: [],
    explanation: 'SSR renders the initial HTML on the server, improving SEO and initial load performance. Angular uses Universal, React uses Next.js.'
  },
  {
    id: 'arch-inter-change-detection',
    title: 'Compare Angular Change Detection vs React Re-render.',
    description: 'Angular: Zone.js triggers CD tree traversal. React: Virtual DOM diffing.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Angular Change Detection
// Zone.js automatically triggers change detection
// when async operations complete

// React Re-render
// Virtual DOM compares old vs new state
// Only updates what changed

// Angular: More automatic, can be less predictable
// React: More explicit, better performance control`,
    testCases: [],
    explanation: 'Angular uses Zone.js for automatic change detection, while React uses Virtual DOM diffing for efficient re-rendering.'
  },
  {
    id: 'arch-inter-memoization',
    title: 'What is memoization in React?',
    description: 'Using React.memo, useMemo to avoid unnecessary re-renders.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// React.memo Example
const MemoizedComponent = React.memo(function MyComponent(props) {
  return <div>{props.data}</div>;
});

// useMemo Example
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// useCallback Example
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`,
    testCases: [],
    explanation: 'Memoization in React prevents unnecessary re-renders by caching components and values based on their dependencies.'
  },
  {
    id: 'arch-inter-rxjs',
    title: 'What is RxJS and where is it used in Angular?',
    description: 'Reactive Extensions for JavaScript, used for streams, HTTP calls.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// RxJS Example
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const numbers$ = of(1, 2, 3, 4, 5);
const doubled$ = numbers$.pipe(
  filter(n => n % 2 === 0),
  map(n => n * 2)
);

// Used in Angular for HTTP calls, forms, routing
this.http.get('/api/data').subscribe(data => {
  this.data = data;
});`,
    testCases: [],
    explanation: 'RxJS provides reactive programming capabilities in Angular, used for HTTP calls, forms, routing, and state management.'
  },
  {
    id: 'arch-inter-hooks',
    title: 'What are React Hooks?',
    description: 'useState, useEffect, useCallback, etc., replacing class lifecycle methods.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// React Hooks Examples
import { useState, useEffect, useCallback } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return <button onClick={handleClick}>{count}</button>;
}

// Hooks replace class lifecycle methods with functional components.`,
    testCases: [],
    explanation: 'React Hooks allow functional components to use state and lifecycle features, replacing class components.'
  },
  {
    id: 'arch-inter-hoc',
    title: 'What is HOC in React?',
    description: 'Higher-Order Components: Functions returning a component with added functionality.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// HOC Example
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      // Simulate loading
      setTimeout(() => setLoading(false), 1000);
    }, []);
    
    if (loading) {
      return <div>Loading...</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
}

// Usage
const UserListWithLoading = withLoading(UserList);`,
    testCases: [],
    explanation: 'HOCs are functions that take a component and return a new component with additional functionality.'
  },
  {
    id: 'arch-inter-di-hierarchy',
    title: 'What is DI hierarchy in Angular?',
    description: 'Modules → Components → Services (singleton or scoped).',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// DI Hierarchy Example
@NgModule({
  providers: [AppService] // Module level
})
export class AppModule {}

@Component({
  providers: [ComponentService] // Component level
})
export class MyComponent {
  constructor(
    private appService: AppService, // From module
    private componentService: ComponentService // From component
  ) {}
}

// Services can be singleton (root) or scoped to modules/components.`,
    testCases: [],
    explanation: 'Angular DI hierarchy determines service scope: root (singleton), module-level, or component-level providers.'
  },
  {
    id: 'arch-inter-providers',
    title: 'What are providers in Angular?',
    description: 'They register services to the injector.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Providers Example
@NgModule({
  providers: [
    { provide: 'API_URL', useValue: 'https://api.example.com' },
    { provide: DataService, useClass: DataService },
    { provide: 'CACHE_SIZE', useValue: 100 }
  ]
})
export class AppModule {}

// Providers tell Angular how to create and inject dependencies.`,
    testCases: [],
    explanation: 'Providers in Angular tell the DI system how to create and inject dependencies, including services, values, and factories.'
  },
  {
    id: 'arch-inter-side-effects-react',
    title: 'How to manage side effects in React?',
    description: 'Use useEffect, Redux middleware like Thunk or Saga.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// useEffect for Side Effects
useEffect(() => {
  const fetchData = async () => {
    const data = await api.getData();
    setData(data);
  };
  fetchData();
}, []);

// Redux Thunk
const fetchData = () => async (dispatch) => {
  dispatch({ type: 'FETCH_START' });
  try {
    const data = await api.getData();
    dispatch({ type: 'FETCH_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR', payload: error });
  }
};`,
    testCases: [],
    explanation: 'React manages side effects with useEffect for local state, or Redux middleware like Thunk/Saga for global state.'
  },
  {
    id: 'arch-inter-side-effects-angular',
    title: 'How to manage side effects in Angular?',
    description: 'Use RxJS tap(), switchMap(), or Effects (NgRx).',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// RxJS Side Effects
this.http.get('/api/data').pipe(
  tap(data => console.log('Data received:', data)),
  switchMap(data => this.processData(data))
).subscribe();

// NgRx Effects
@Effect()
loadData$ = this.actions$.pipe(
  ofType('[Data] Load'),
  switchMap(() => this.dataService.getData().pipe(
    map(data => ({ type: '[Data] Load Success', payload: data }))
  ))
);`,
    testCases: [],
    explanation: 'Angular manages side effects using RxJS operators like tap() and switchMap(), or NgRx Effects for state management.'
  },
  {
    id: 'arch-inter-webpack',
    title: 'What is the role of Webpack in both Angular and React?',
    description: 'Bundler used under the hood to manage assets and code splitting.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Webpack Configuration
// Both Angular and React use Webpack for:
// - Bundling JavaScript modules
// - Code splitting
// - Asset optimization
// - Development server

// Angular CLI and Create React App
// both configure Webpack automatically

// Custom Webpack configs can be added for advanced use cases.`,
    testCases: [],
    explanation: 'Webpack is the bundler used by both Angular CLI and Create React App to bundle, optimize, and serve applications.'
  },
  {
    id: 'arch-inter-pipes-vs-utils',
    title: 'Explain Angular Pipes vs React Utility Functions.',
    description: 'Angular: Custom/Async Pipes. React: Use pure functions or lodash.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Angular Pipe
@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}

// Usage: {{ 'hello' | reverse }}

// React Utility Function
const reverse = (str) => str.split('').reverse().join('');

// Usage: {reverse('hello')}`,
    testCases: [],
    explanation: 'Angular Pipes transform data in templates, while React uses utility functions or libraries like lodash for data transformation.'
  },
  {
    id: 'arch-inter-directives',
    title: 'What are Angular Directives?',
    description: 'Structural (*ngIf, *ngFor) and Attribute ([ngClass], [style]).',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Structural Directives
<div *ngIf="isVisible">Content</div>
<li *ngFor="let item of items">{{ item }}</li>

// Attribute Directives
<div [ngClass]="{ 'active': isActive }">Content</div>
<div [style.color]="textColor">Content</div>

// Custom Directive
@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  @Input() appHighlight: string;
  
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight);
  }
}`,
    testCases: [],
    explanation: 'Angular directives extend HTML with custom behavior: structural (*ngIf, *ngFor) and attribute ([ngClass], [style]).'
  },
  {
    id: 'arch-inter-portals',
    title: 'What are React Portals?',
    description: 'Render elements outside the root DOM hierarchy (useful for modals).',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// React Portal Example
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className="modal">
      {children}
    </div>,
    document.body
  );
}

// Usage
function App() {
  return (
    <div>
      <h1>App</h1>
      <Modal>Modal content</Modal>
    </div>
  );
}

// Modal renders in document.body, not inside App div`,
    testCases: [],
    explanation: 'React Portals allow rendering components outside their parent DOM hierarchy, useful for modals, tooltips, and overlays.'
  },
  {
    id: 'arch-inter-form-validation-angular',
    title: 'How to handle form validation in Angular?',
    description: 'Template-driven or reactive forms with Validators.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Template-driven Forms
<form #form="ngForm" (ngSubmit)="onSubmit()">
  <input name="email" [(ngModel)]="email" required email>
  <div *ngIf="form.controls.email?.errors?.required">Email is required</div>
</form>

// Reactive Forms
const form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(8)])
});

// Template
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="email">
  <div *ngIf="form.get('email')?.errors?.required">Email is required</div>
</form>`,
    testCases: [],
    explanation: 'Angular provides template-driven and reactive forms with built-in validators for form validation.'
  },
  {
    id: 'arch-inter-form-validation-react',
    title: 'How to handle form validation in React?',
    description: 'Manual with state, or libraries like Formik, React Hook Form.',
    difficulty: 'Medium',
    category: 'architecture-intermediate',
    solution: `// Manual Validation
function Form() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (email && !email.includes('@')) newErrors.email = 'Invalid email';
    setErrors(newErrors);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      {errors.email && <div>{errors.email}</div>}
    </form>
  );
}

// Formik Example
<Formik
  initialValues={{ email: '' }}
  validate={values => {
    const errors = {};
    if (!values.email) errors.email = 'Required';
    return errors;
  }}
  onSubmit={values => console.log(values)}
>
  {({ errors, touched }) => (
    <Form>
      <Field name="email" />
      {errors.email && touched.email && <div>{errors.email}</div>}
    </Form>
  )}
</Formik>`,
    testCases: [],
    explanation: 'React form validation can be done manually with state, or using libraries like Formik and React Hook Form for easier validation.'
  }
] 