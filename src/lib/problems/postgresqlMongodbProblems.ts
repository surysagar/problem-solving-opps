import { Problem } from '@/types'

export const postgresqlMongodbProblems: Problem[] = [
  {
    id: 'pg-mongo-1',
    title: 'Architecture: PostgreSQL vs MongoDB',
    description: 'Understand the architectural differences between PostgreSQL (relational, client-server, ACID) and MongoDB (NoSQL, document-oriented, distributed).',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL: Relational, schema-based
// MongoDB: Document-oriented, flexible schema

// PostgreSQL: Create a table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

// MongoDB: Insert a document
use mydb;
db.users.insertOne({ name: 'Alice', email: 'alice@example.com' });
`,
    testCases: [],
    explanation: 'PostgreSQL uses a strict schema and relational tables, ideal for structured data and complex queries. MongoDB uses collections and documents, allowing flexible, unstructured, or semi-structured data.'
  },
  {
    id: 'pg-mongo-2',
    title: 'ACID Compliance',
    description: 'Compare ACID compliance in PostgreSQL and MongoDB.',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL: Transaction example
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

// MongoDB: Multi-document transaction (since 4.0)
const session = db.getMongo().startSession();
session.startTransaction();
db.accounts.updateOne({ _id: 1 }, { $inc: { balance: -100 } }, { session });
db.accounts.updateOne({ _id: 2 }, { $inc: { balance: 100 } }, { session });
session.commitTransaction();
`,
    testCases: [],
    explanation: 'PostgreSQL is fully ACID compliant for all transactions. MongoDB is ACID compliant at the document level and supports multi-document transactions since v4.0.'
  },
  {
    id: 'pg-mongo-3',
    title: 'Schema Flexibility',
    description: 'See how schema flexibility differs between PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL: Add a new column (schema migration)
ALTER TABLE users ADD COLUMN age INT;

// MongoDB: Add a new field to a document (no migration needed)
db.users.updateOne({ name: 'Alice' }, { $set: { age: 30 } });
`,
    testCases: [],
    explanation: 'PostgreSQL requires schema migrations for new columns. MongoDB allows adding new fields to documents at any time.'
  },
  {
    id: 'pg-mongo-4',
    title: 'Query Language and Syntax',
    description: 'Compare SQL (PostgreSQL) and MQL (MongoDB Query Language) for querying data.',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL: Find users older than 25
SELECT * FROM users WHERE age > 25;

// MongoDB: Find users older than 25
db.users.find({ age: { $gt: 25 } });
`,
    testCases: [],
    explanation: 'PostgreSQL uses SQL, a declarative language for relational data. MongoDB uses MQL, a flexible, JSON-like query language for documents.'
  },
  {
    id: 'pg-mongo-5',
    title: 'Foreign Key Support and Relationships',
    description: 'How do PostgreSQL and MongoDB handle relationships between data?',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL: Foreign key constraint
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  total NUMERIC
);

// MongoDB: Reference another document
const userId = ObjectId('...');
db.orders.insertOne({ user_id: userId, total: 99.99 });
// (No enforced foreign key, but can reference _id)
`,
    testCases: [],
    explanation: 'PostgreSQL enforces foreign key constraints for referential integrity. MongoDB allows references but does not enforce them.'
  },
  {
    id: 'pg-mongo-6',
    title: 'Aggregation and Analytics',
    description: 'See how both databases handle aggregations and analytics.',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL: Aggregate query
SELECT user_id, COUNT(*) FROM orders GROUP BY user_id;

// MongoDB: Aggregation pipeline
db.orders.aggregate([
  { $group: { _id: '$user_id', count: { $sum: 1 } } }
]);
`,
    testCases: [],
    explanation: 'Both databases support aggregation, but PostgreSQL uses SQL GROUP BY, while MongoDB uses an aggregation pipeline.'
  },
  {
    id: 'pg-mongo-7',
    title: 'Replication and Scalability',
    description: 'How do PostgreSQL and MongoDB handle replication and scaling?',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL: Streaming replication (setup example)
-- On primary:
ALTER SYSTEM SET wal_level = replica;
SELECT pg_start_backup('label');

// MongoDB: Replica set initiation
rs.initiate({
  _id: 'rs0',
  members: [
    { _id: 0, host: 'localhost:27017' },
    { _id: 1, host: 'localhost:27018' }
  ]
});
`,
    testCases: [],
    explanation: 'PostgreSQL uses streaming replication and supports synchronous/asynchronous replicas. MongoDB uses replica sets for high availability and automatic failover.'
  },
  {
    id: 'pg-mongo-8',
    title: 'Basic Feature Comparison',
    description: 'Compare fundamental features like data storage, schema, joins, and indexing between PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL: Structured data with joins
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));
CREATE TABLE posts (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), content TEXT);

SELECT u.name, p.content FROM users u JOIN posts p ON u.id = p.user_id;

// MongoDB: Document with embedded data
db.users.insertOne({
  name: 'John',
  posts: [
    { content: 'First post' },
    { content: 'Second post' }
  ]
});

db.users.find({ 'posts.content': 'First post' });
`,
    testCases: [],
    explanation: 'PostgreSQL uses structured tables with foreign keys and JOIN operations. MongoDB uses flexible documents that can embed related data directly.'
  },
  {
    id: 'pg-mongo-9',
    title: 'Full Text Search Comparison',
    description: 'Compare full-text search capabilities in both databases.',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL: Full text search with tsvector
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT
);

CREATE INDEX idx_articles_search ON articles USING GIN(to_tsvector('english', title || ' ' || content));

SELECT * FROM articles WHERE to_tsvector('english', title || ' ' || content) @@ to_tsquery('mongodb & database');

// MongoDB: Text search
db.articles.createIndex({ title: 'text', content: 'text' });
db.articles.find({ $text: { $search: 'mongodb database' } });
`,
    testCases: [],
    explanation: 'PostgreSQL uses tsvector and GIN indexes for powerful full-text search. MongoDB has built-in text search with Atlas Search using Lucene.'
  },
  {
    id: 'pg-mongo-10',
    title: 'Sharding and Horizontal Scaling',
    description: 'Compare horizontal scaling approaches in both databases.',
    difficulty: 'Hard',
    category: 'postgresql-mongodb',
    solution: `// MongoDB: Native sharding
sh.enableSharding('mydb');
sh.shardCollection('mydb.users', { 'email': 'hashed' });

// PostgreSQL: Manual partitioning
CREATE TABLE users_2023 PARTITION OF users
FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE users_2024 PARTITION OF users
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
`,
    testCases: [],
    explanation: 'MongoDB has native sharding support for automatic data distribution. PostgreSQL requires manual partitioning setup for horizontal scaling.'
  },
  {
    id: 'pg-mongo-11',
    title: 'Geospatial Data Handling',
    description: 'Compare geospatial capabilities in PostgreSQL and MongoDB.',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL: PostGIS extension
CREATE EXTENSION postgis;

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  geom GEOMETRY(POINT, 4326)
);

INSERT INTO locations (name, geom) VALUES ('Office', ST_GeomFromText('POINT(-74.006 40.7128)', 4326));

SELECT name, ST_Distance(geom, ST_GeomFromText('POINT(-74.006 40.7128)', 4326)) as distance
FROM locations ORDER BY distance;

// MongoDB: GeoJSON
db.locations.insertOne({
  name: 'Office',
  location: {
    type: 'Point',
    coordinates: [-74.006, 40.7128]
  }
});

db.locations.createIndex({ location: '2dsphere' });
db.locations.find({
  location: {
    $near: {
      $geometry: { type: 'Point', coordinates: [-74.006, 40.7128] },
      $maxDistance: 1000
    }
  }
});
`,
    testCases: [],
    explanation: 'PostgreSQL uses PostGIS extension for powerful geospatial operations. MongoDB has native GeoJSON support with 2dsphere indexes.'
  },
  {
    id: 'pg-mongo-12',
    title: 'JSON Support Comparison',
    description: 'Compare JSON handling capabilities in both databases.',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL: JSONB with rich functions
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  metadata JSONB
);

INSERT INTO products (name, metadata) VALUES (
  'Laptop',
  '{"brand": "Dell", "specs": {"ram": "16GB", "storage": "512GB"}}'
);

SELECT name, metadata->>'brand' as brand,
       metadata->'specs'->>'ram' as ram
FROM products WHERE metadata->>'brand' = 'Dell';

// MongoDB: Native BSON
db.products.insertOne({
  name: 'Laptop',
  brand: 'Dell',
  specs: { ram: '16GB', storage: '512GB' }
});

db.products.find({ 'brand': 'Dell' }, { 'specs.ram': 1 });
`,
    testCases: [],
    explanation: 'PostgreSQL has rich JSONB support with powerful querying functions. MongoDB uses native BSON format for optimal performance.'
  },
  {
    id: 'pg-mongo-13',
    title: 'Stored Procedures and Functions',
    description: 'Compare stored procedure capabilities in both databases.',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL: PL/pgSQL function
CREATE OR REPLACE FUNCTION get_user_orders(user_id INT)
RETURNS TABLE(order_id INT, total NUMERIC) AS $$
BEGIN
  RETURN QUERY
  SELECT o.id, o.total
  FROM orders o
  WHERE o.user_id = get_user_orders.user_id;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM get_user_orders(123);

// MongoDB: JavaScript function
db.system.js.save({
  _id: 'getUserOrders',
  value: function(userId) {
    return db.orders.find({ user_id: userId }).toArray();
  }
});

db.eval('getUserOrders(123)');
`,
    testCases: [],
    explanation: 'PostgreSQL has full support for stored procedures in multiple languages. MongoDB has limited JavaScript-based functions.'
  },
  {
    id: 'pg-mongo-14',
    title: 'Use Case Scenarios',
    description: 'Compare how both databases handle different real-world scenarios.',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// E-commerce: PostgreSQL for orders
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  total NUMERIC(10,2),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Complex order analytics
SELECT u.name, COUNT(o.id), SUM(o.total)
FROM users u JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= '2024-01-01'
GROUP BY u.id, u.name;

// E-commerce: MongoDB for product catalog
db.products.insertOne({
  name: 'Smartphone',
  category: 'Electronics',
  variants: [
    { color: 'Black', price: 599, stock: 10 },
    { color: 'White', price: 599, stock: 5 }
  ],
  tags: ['mobile', '5G', 'camera']
});

db.products.find({ 'variants.stock': { $gt: 0 }, tags: '5G' });
`,
    testCases: [],
    explanation: 'PostgreSQL excels at transactional data with complex relationships. MongoDB is ideal for flexible, document-based data like product catalogs.'
  },
  {
    id: 'pg-mongo-15',
    title: 'Security and Access Control',
    description: 'Compare security features and access control mechanisms.',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL: Row-level security
CREATE TABLE sensitive_data (
  id SERIAL PRIMARY KEY,
  user_id INT,
  data TEXT
);

ALTER TABLE sensitive_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_data_policy ON sensitive_data
  FOR ALL USING (user_id = current_user_id());

-- Users can only see their own data
SELECT * FROM sensitive_data;

// MongoDB: Role-based access
use admin;
db.createRole({
  role: 'readWriteAppData',
  privileges: [
    { resource: { db: 'myapp', collection: 'users' }, actions: ['find', 'update'] }
  ],
  roles: []
});

db.grantRolesToUser('appuser', ['readWriteAppData']);
`,
    testCases: [],
    explanation: 'PostgreSQL offers row-level security and fine-grained permissions. MongoDB uses role-based access control with collection-level permissions.'
  }
] 