import { Problem } from '@/types'

export const architectureAdvancedProblems: Problem[] = [
  {
    id: 'arch-adv-ngrx',
    title: 'What is NgRx in Angular?',
    description: 'Redux pattern-based state management using RxJS.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example NgRx Store Setup
import { createAction, createReducer, on, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');

export const counterReducer = createReducer(0,
  on(increment, state => state + 1),
  on(decrement, state => state - 1),
  on(reset, _ => 0)
);

// Usage in Angular Component
// this.store.dispatch(increment());
// this.store.select('counter').subscribe(count => ...);`,
    testCases: [],
    explanation: 'NgRx is a state management library for Angular based on the Redux pattern. It uses RxJS for reactive state, actions, reducers, selectors, and effects.'
  },
  {
    id: 'arch-adv-redux',
    title: 'What is Redux in React?',
    description: 'Central store for global state using actions, reducers, selectors.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example Redux Store Setup
import { createStore } from 'redux';

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);

// Usage in React Component
// store.dispatch({ type: 'INCREMENT' });
// store.getState();`,
    testCases: [],
    explanation: 'Redux is a predictable state container for JavaScript apps, commonly used with React. It uses a single store, actions, reducers, and selectors.'
  },
  {
    id: 'arch-adv-signals',
    title: 'What is Signals in Angular?',
    description: 'Angular 17+ feature for reactive primitives like useState.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example Angular Signal
import { signal } from '@angular/core';

const count = signal(0);

function increment() {
  count.set(count() + 1);
}

// Usage in template: {{ count() }}`,
    testCases: [],
    explanation: 'Signals are a new reactivity primitive in Angular 17+ for fine-grained reactivity, similar to useState in React.'
  },
  {
    id: 'arch-adv-large-angular',
    title: 'How to architect large-scale Angular apps?',
    description: 'Core module, shared module, lazy-loaded feature modules, state management with NgRx.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example Angular App Structure
src/
  app/
    core/
      services/
      guards/
      interceptors/
    shared/
      components/
      pipes/
      directives/
    features/
      feature-a/
        feature-a.module.ts
        feature-a-routing.module.ts
      feature-b/
        feature-b.module.ts
    app.module.ts
    app-routing.module.ts

// Use NgRx for state management in feature modules.`,
    testCases: [],
    explanation: 'Large Angular apps use a modular structure: core for singleton services, shared for reusable components, feature modules for isolated features, and NgRx for state.'
  },
  {
    id: 'arch-adv-large-react',
    title: 'How to architect large-scale React apps?',
    description: 'Atomic design, folder structure by feature/domain, state via Redux or Zustand.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example React App Structure
src/
  components/
  features/
    user/
      UserList.js
      UserDetails.js
      userSlice.js
    product/
      ProductList.js
      ProductDetails.js
      productSlice.js
  store/
    index.js
  App.js

// Use Redux or Zustand for state management.`,
    testCases: [],
    explanation: 'Large React apps use feature/domain-based folder structure, atomic design for UI, and state management with Redux, Zustand, or Context API.'
  },
  {
    id: 'arch-adv-1',
    title: 'Domain-Driven Design (DDD)',
    description: 'Understanding DDD principles, bounded contexts, aggregates, and strategic design patterns.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Domain-Driven Design Implementation
// Bounded Context: Order Management
class Order {
  private id: OrderId;
  private customerId: CustomerId;
  private items: OrderItem[];
  private status: OrderStatus;
  private total: Money;
  
  constructor(id: OrderId, customerId: CustomerId) {
    this.id = id;
    this.customerId = customerId;
    this.items = [];
    this.status = OrderStatus.DRAFT;
    this.total = Money.ZERO;
  }
  
  addItem(item: OrderItem): void {
    if (this.status !== OrderStatus.DRAFT) {
      throw new Error('Cannot modify confirmed order');
    }
    
    this.items.push(item);
    this.recalculateTotal();
  }
  
  confirm(): void {
    if (this.items.length === 0) {
      throw new Error('Cannot confirm empty order');
    }
    
    this.status = OrderStatus.CONFIRMED;
    DomainEvents.raise(new OrderConfirmedEvent(this.id));
  }
  
  private recalculateTotal(): void {
    this.total = this.items.reduce(
      (sum, item) => sum.add(item.total),
      Money.ZERO
    );
  }
}

// Value Objects
class Money {
  constructor(
    private amount: number,
    private currency: string
  ) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
  }
  
  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }
  
  static ZERO = new Money(0, 'USD');
}

class OrderId {
  constructor(private value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid order ID format');
    }
  }
  
  private isValid(value: string): boolean {
    return /^ORD-\\d{8}-\\d{4}$/.test(value);
  }
  
  toString(): string {
    return this.value;
  }
}

// Aggregate Root
class Customer {
  private id: CustomerId;
  private name: CustomerName;
  private email: Email;
  private orders: OrderId[] = [];
  
  constructor(id: CustomerId, name: CustomerName, email: Email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  
  placeOrder(orderId: OrderId): Order {
    const order = new Order(orderId, this.id);
    this.orders.push(orderId);
    return order;
  }
  
  getOrderHistory(): OrderId[] {
    return [...this.orders];
  }
}

// Repository Pattern
interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
  findByCustomerId(customerId: CustomerId): Promise<Order[]>;
}

class OrderRepositoryImpl implements OrderRepository {
  async findById(id: OrderId): Promise<Order | null> {
    // Database implementation
    const data = await this.db.orders.findOne({ id: id.toString() });
    return data ? this.reconstructOrder(data) : null;
  }
  
  async save(order: Order): Promise<void> {
    // Save to database
    await this.db.orders.updateOne(
      { id: order.id.toString() },
      { $set: this.serializeOrder(order) },
      { upsert: true }
    );
  }
  
  private serializeOrder(order: Order): any {
    // Convert domain object to persistence format
  }
  
  private reconstructOrder(data: any): Order {
    // Convert persistence format to domain object
  }
}

// Domain Events
class DomainEvents {
  private static handlers = new Map();
  
  static subscribe(eventType: string, handler: Function): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType).push(handler);
  }
  
  static raise(event: DomainEvent): void {
    const handlers = this.handlers.get(event.constructor.name) || [];
    handlers.forEach(handler => handler(event));
  }
}

class OrderConfirmedEvent implements DomainEvent {
  constructor(public orderId: OrderId) {}
}

// Application Service
class OrderApplicationService {
  constructor(
    private orderRepository: OrderRepository,
    private customerRepository: CustomerRepository
  ) {}
  
  async placeOrder(command: PlaceOrderCommand): Promise<OrderId> {
    const customer = await this.customerRepository.findById(command.customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }
    
    const orderId = new OrderId(this.generateOrderId());
    const order = customer.placeOrder(orderId);
    
    command.items.forEach(item => {
      order.addItem(new OrderItem(item.productId, item.quantity, item.price));
    });
    
    order.confirm();
    
    await this.orderRepository.save(order);
    return orderId;
  }
  
  private generateOrderId(): string {
    return \`ORD-\${Date.now()}-\${Math.random().toString(36).substr(2, 4)}\`;
  }
}

// CQRS Implementation
class OrderQueryService {
  async getOrderDetails(orderId: string): Promise<OrderDetailsDto> {
    // Read-optimized query
    const order = await this.readDb.orders.findOne({ id: orderId });
    const customer = await this.readDb.customers.findOne({ id: order.customerId });
    
    return {
      orderId: order.id,
      customerName: customer.name,
      items: order.items,
      total: order.total,
      status: order.status
    };
  }
  
  async getCustomerOrders(customerId: string): Promise<OrderSummaryDto[]> {
    return await this.readDb.orders
      .find({ customerId })
      .project({ id: 1, total: 1, status: 1, createdAt: 1 })
      .toArray();
  }
}`,
    testCases: [],
    explanation: `Domain-Driven Design (DDD) is an approach to software development that focuses on modeling software to match a domain.

Key Concepts:
- Ubiquitous Language: Shared language between developers and domain experts
- Bounded Context: Clear boundaries between different parts of the system
- Aggregate Root: Entity that manages consistency within a group of objects
- Value Objects: Immutable objects that represent concepts in the domain

Strategic Design:
1. Bounded Context Mapping: Define clear boundaries
2. Context Mapping: How contexts relate to each other
3. Anti-Corruption Layer: Protect domain from external influences

Tactical Design:
- Entities: Objects with identity
- Value Objects: Immutable objects without identity
- Aggregates: Clusters of related objects
- Repositories: Data access abstraction
- Domain Services: Business logic that doesn't belong to entities
- Domain Events: Notifications of domain occurrences

Benefits:
- Better alignment with business requirements
- Improved maintainability
- Clearer code organization
- Reduced complexity

Patterns:
- CQRS: Command Query Responsibility Segregation
- Event Sourcing: Store events instead of state
- Saga Pattern: Distributed transaction management`
  },
  {
    id: 'arch-adv-2',
    title: 'Hexagonal Architecture (Ports & Adapters)',
    description: 'Understanding hexagonal architecture, dependency inversion, and clean architecture principles.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Hexagonal Architecture Implementation
// Domain Layer (Core)
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}

interface EmailService {
  sendWelcomeEmail(user: User): Promise<void>;
  sendPasswordReset(user: User): Promise<void>;
}

// Domain Entities
class User {
  constructor(
    private id: string,
    private email: string,
    private name: string,
    private passwordHash: string
  ) {}
  
  static create(email: string, name: string, password: string): User {
    const id = crypto.randomUUID();
    const passwordHash = bcrypt.hashSync(password, 10);
    return new User(id, email, name, passwordHash);
  }
  
  changePassword(newPassword: string): void {
    this.passwordHash = bcrypt.hashSync(newPassword, 10);
  }
  
  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }
}

// Application Services (Use Cases)
class UserRegistrationService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService
  ) {}
  
  async registerUser(email: string, name: string, password: string): Promise<string> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const user = User.create(email, name, password);
    await this.userRepository.save(user);
    
    // Send welcome email
    await this.emailService.sendWelcomeEmail(user);
    
    return user.id;
  }
}

class UserAuthenticationService {
  constructor(private userRepository: UserRepository) {}
  
  async authenticate(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }
    
    return user.validatePassword(password) ? user : null;
  }
}

// Ports (Interfaces)
interface UserRepositoryPort {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}

interface EmailServicePort {
  sendWelcomeEmail(user: User): Promise<void>;
  sendPasswordReset(user: User): Promise<void>;
}

// Adapters (Infrastructure)
class MongoUserRepository implements UserRepositoryPort {
  constructor(private db: any) {}
  
  async findById(id: string): Promise<User | null> {
    const data = await this.db.collection('users').findOne({ _id: id });
    return data ? this.mapToUser(data) : null;
  }
  
  async save(user: User): Promise<void> {
    await this.db.collection('users').updateOne(
      { _id: user.id },
      { $set: this.mapToDocument(user) },
      { upsert: true }
    );
  }
  
  async findByEmail(email: string): Promise<User | null> {
    const data = await this.db.collection('users').findOne({ email });
    return data ? this.mapToUser(data) : null;
  }
  
  private mapToUser(data: any): User {
    return new User(data._id, data.email, data.name, data.passwordHash);
  }
  
  private mapToDocument(user: User): any {
    return {
      _id: user.id,
      email: user.email,
      name: user.name,
      passwordHash: user.passwordHash
    };
  }
}

class SendGridEmailService implements EmailServicePort {
  constructor(private sendGridClient: any) {}
  
  async sendWelcomeEmail(user: User): Promise<void> {
    await this.sendGridClient.send({
      to: user.email,
      from: 'noreply@example.com',
      subject: 'Welcome!',
      text: \`Welcome \${user.name}! Thank you for registering.\`
    });
  }
  
  async sendPasswordReset(user: User): Promise<void> {
    await this.sendGridClient.send({
      to: user.email,
      from: 'noreply@example.com',
      subject: 'Password Reset',
      text: 'Click here to reset your password.'
    });
  }
}

// HTTP Adapter (Primary/Driving Adapter)
class UserController {
  constructor(
    private userRegistrationService: UserRegistrationService,
    private userAuthenticationService: UserAuthenticationService
  ) {}
  
  async register(req: any, res: any): Promise<void> {
    try {
      const { email, name, password } = req.body;
      const userId = await this.userRegistrationService.registerUser(email, name, password);
      
      res.status(201).json({ userId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  async login(req: any, res: any): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await this.userAuthenticationService.authenticate(email, password);
      
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
      
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// Dependency Injection Container
class Container {
  private services = new Map();
  
  register(key: string, factory: Function): void {
    this.services.set(key, factory);
  }
  
  resolve<T>(key: string): T {
    const factory = this.services.get(key);
    if (!factory) {
      throw new Error(\`Service \${key} not registered\`);
    }
    return factory(this);
  }
}

// Application Bootstrap
function bootstrap(): Container {
  const container = new Container();
  
  // Register adapters
  container.register('userRepository', (c) => new MongoUserRepository(mongoDb));
  container.register('emailService', (c) => new SendGridEmailService(sendGrid));
  
  // Register application services
  container.register('userRegistrationService', (c) => 
    new UserRegistrationService(c.resolve('userRepository'), c.resolve('emailService'))
  );
  container.register('userAuthenticationService', (c) => 
    new UserAuthenticationService(c.resolve('userRepository'))
  );
  
  // Register controllers
  container.register('userController', (c) => 
    new UserController(c.resolve('userRegistrationService'), c.resolve('userAuthenticationService'))
  );
  
  return container;
}`,
    testCases: [],
    explanation: `Hexagonal Architecture (Ports & Adapters) separates the core business logic from external concerns.

Key Principles:
- Dependency Inversion: High-level modules don't depend on low-level modules
- Separation of Concerns: Business logic is isolated from infrastructure
- Testability: Easy to test business logic in isolation
- Flexibility: Easy to swap implementations

Architecture Layers:
1. Domain Layer: Core business logic and entities
2. Application Layer: Use cases and application services
3. Infrastructure Layer: External concerns (databases, APIs, etc.)

Ports & Adapters:
- Primary/Driving Adapters: Controllers, CLI, etc.
- Secondary/Driven Adapters: Databases, external services, etc.
- Ports: Interfaces that define contracts

Benefits:
- Independent of frameworks
- Independent of UI
- Independent of database
- Independent of external agencies
- Testable business logic

Clean Architecture Principles:
- Dependency Rule: Dependencies point inward
- Stable Dependencies: Depend on stable abstractions
- Stable Abstractions: Abstract interfaces are stable`
  },
  {
    id: 'arch-adv-codesplitting',
    title: 'What is code splitting in React?',
    description: 'Dynamically import modules with React.lazy to reduce bundle size.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example: React Code Splitting
import React, { Suspense } from 'react';
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
`,
    testCases: [],
    explanation: 'Code splitting in React allows you to load parts of your app on demand, reducing initial bundle size and improving performance.'
  },
  {
    id: 'arch-adv-preloading',
    title: 'What is preloading strategy in Angular?',
    description: 'Load modules in background after app is loaded: PreloadAllModules.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example: Angular Preloading Strategy
import { PreloadAllModules, RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
`,
    testCases: [],
    explanation: 'Preloading strategies in Angular allow you to load feature modules in the background after the app loads, improving navigation speed.'
  },
  {
    id: 'arch-adv-guards-angular',
    title: 'How to use guards in Angular for route protection?',
    description: 'Use CanActivate, CanLoad, etc.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example: Angular Route Guard
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    // Add your auth logic here
    return true;
  }
}

// In routes:
// { path: 'admin', canActivate: [AuthGuard], component: AdminComponent }
`,
    testCases: [],
    explanation: 'Angular route guards like CanActivate and CanLoad are used to protect routes based on authentication or other logic.'
  },
  {
    id: 'arch-adv-guards-react',
    title: 'How to protect routes in React?',
    description: 'Create wrapper HOC or use <Navigate /> with state check.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example: React Route Protection
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Usage:
// <PrivateRoute isAuthenticated={userIsLoggedIn}>
//   <Dashboard />
// </PrivateRoute>
`,
    testCases: [],
    explanation: 'In React, you can protect routes by wrapping them in a component that checks authentication and redirects if needed.'
  },
  {
    id: 'arch-adv-observables',
    title: 'What are observables vs promises in Angular?',
    description: 'Observables are cancellable and stream-based; promises are one-time.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example: Observable vs Promise
import { Observable, of } from 'rxjs';

const obs$ = new Observable(observer => {
  observer.next('A');
  observer.next('B');
  observer.complete();
});

const promise = new Promise(resolve => resolve('A'));

// Observables can emit multiple values and be cancelled.
// Promises resolve once and cannot be cancelled.
`,
    testCases: [],
    explanation: 'Observables (RxJS) are used for streams and can emit multiple values over time, while promises resolve once. Observables can be cancelled.'
  },
  {
    id: 'arch-adv-error-angular',
    title: 'How to handle errors globally in Angular?',
    description: 'HTTP interceptor, ErrorHandler, try/catch with RxJS.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example: Angular Global Error Handler
import { ErrorHandler } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error) {
    console.error('An error occurred:', error);
    // Log to service, show user-friendly message, etc.
  }
}

// HTTP Interceptor for API errors
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle HTTP errors globally
        return throwError(() => error);
      })
    );
  }
}`,
    testCases: [],
    explanation: 'Angular provides ErrorHandler for global error handling and HTTP interceptors for API error management.'
  },
  {
    id: 'arch-adv-error-react',
    title: 'How to handle errors globally in React?',
    description: 'Error boundaries, try/catch, axios interceptors.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example: React Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage: <ErrorBoundary><App /></ErrorBoundary>
`,
    testCases: [],
    explanation: 'React uses Error Boundaries to catch JavaScript errors anywhere in the component tree and display fallback UI.'
  },
  {
    id: 'arch-adv-zonejs',
    title: 'Angular Zone.js – pros and cons?',
    description: 'Pros: automatic CD. Cons: performance hit, hard to manage. Angular 18 removes dependency.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example: Zone.js in Angular
// Zone.js automatically triggers change detection
// when async operations complete

// Without Zone.js (Angular 18+):
import { signal } from '@angular/core';
const count = signal(0);

// Manual change detection control
// More predictable performance
`,
    testCases: [],
    explanation: 'Zone.js provides automatic change detection in Angular but can cause performance issues. Angular 18+ removes this dependency for better performance.'
  },
  {
    id: 'arch-adv-state-comparison',
    title: 'React Recoil/Zustand vs Redux – when to use what?',
    description: 'Zustand: lightweight, minimal boilerplate. Redux: predictable state flow, better for large apps.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example: Zustand Store
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Example: Redux Store
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
  },
});

// Zustand: Less boilerplate, easier to use
// Redux: More predictable, better for complex state
`,
    testCases: [],
    explanation: 'Zustand is lightweight with minimal boilerplate, while Redux provides predictable state flow and is better for large applications.'
  },
  {
    id: 'arch-adv-hydration',
    title: 'What is hydration in SSR frameworks?',
    description: 'React/Angular SSR renders HTML, then JS "hydrates" to make it interactive.',
    difficulty: 'Hard',
    category: 'architecture-advanced',
    solution: `// Example: SSR Hydration Process
// 1. Server renders HTML
// 2. Client receives HTML
// 3. JavaScript loads and "hydrates" the HTML
// 4. App becomes interactive

// Next.js automatically handles hydration
// Angular Universal also supports hydration

// Benefits: Better SEO, faster initial load
// Challenges: Hydration mismatches, complexity
`,
    testCases: [],
    explanation: 'Hydration is the process where JavaScript attaches event listeners and makes server-rendered HTML interactive on the client side.'
  }
] 