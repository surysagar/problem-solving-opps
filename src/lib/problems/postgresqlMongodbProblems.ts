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
  },
  // --- Database Operations ---
  {
    id: 'pg-mongo-create-table',
    title: 'CREATE TABLE vs Create Collection',
    description: 'How to create a table in PostgreSQL and a collection in MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INT
);

// MongoDB
// No explicit schema needed, collection is created on first insert
// Optionally, you can create with validation:
db.createCollection('users', {
  validator: { $jsonSchema: { bsonType: 'object', required: ['name', 'age'] } }
});
`,
    testCases: [],
    explanation: 'PostgreSQL requires a schema for tables. MongoDB collections are schema-less by default, but you can add validation.'
  },
  {
    id: 'pg-mongo-insert',
    title: 'INSERT INTO vs insertOne',
    description: 'Insert a record in PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
INSERT INTO users (name, age) VALUES ('Alice', 30);

// MongoDB
db.users.insertOne({ name: 'Alice', age: 30 });
`,
    testCases: [],
    explanation: 'Both databases allow inserting records, but MongoDB uses JSON-like documents.'
  },
  {
    id: 'pg-mongo-select',
    title: 'SELECT vs find',
    description: 'Fetch data from PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
SELECT * FROM users WHERE age > 25;

// MongoDB
db.users.find({ age: { $gt: 25 } });
`,
    testCases: [],
    explanation: 'SQL uses SELECT, MongoDB uses find with JSON-style queries.'
  },
  {
    id: 'pg-mongo-update',
    title: 'UPDATE vs updateOne',
    description: 'Update a record in PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
UPDATE users SET age = 31 WHERE name = 'Alice';

// MongoDB
db.users.updateOne({ name: 'Alice' }, { $set: { age: 31 } });
`,
    testCases: [],
    explanation: 'UPDATE in SQL, updateOne in MongoDB with $set.'
  },
  {
    id: 'pg-mongo-delete',
    title: 'DELETE vs deleteOne',
    description: 'Delete a record in PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
DELETE FROM users WHERE name = 'Alice';

// MongoDB
db.users.deleteOne({ name: 'Alice' });
`,
    testCases: [],
    explanation: 'DELETE in SQL, deleteOne in MongoDB.'
  },
  {
    id: 'pg-mongo-add-column',
    title: 'ALTER TABLE ADD COLUMN vs Add Field',
    description: 'Add a column/field in PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
ALTER TABLE users ADD COLUMN email VARCHAR(100);

// MongoDB (no schema change needed, just update a document)
db.users.updateMany({}, { $set: { email: null } });
`,
    testCases: [],
    explanation: 'PostgreSQL requires ALTER TABLE, MongoDB just adds the field to documents.'
  },
  {
    id: 'pg-mongo-drop-column',
    title: 'ALTER TABLE DROP COLUMN vs Remove Field',
    description: 'Remove a column/field in PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
ALTER TABLE users DROP COLUMN email;

// MongoDB
// Remove field from all documents
db.users.updateMany({}, { $unset: { email: '' } });
`,
    testCases: [],
    explanation: 'ALTER TABLE DROP COLUMN in SQL, $unset in MongoDB.'
  },
  {
    id: 'pg-mongo-drop-table',
    title: 'DROP TABLE vs drop',
    description: 'Drop a table/collection in PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
DROP TABLE users;

// MongoDB
db.users.drop();
`,
    testCases: [],
    explanation: 'DROP TABLE in SQL, drop() in MongoDB.'
  },
  // --- Syntax/Query Operations ---
  {
    id: 'pg-mongo-operators',
    title: 'Operators: WHERE, AND, OR, LIKE, IN',
    description: 'Comparison and logical operators in PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
SELECT * FROM users WHERE age > 25 AND name LIKE 'A%';
SELECT * FROM users WHERE age IN (25, 30, 35);

// MongoDB
db.users.find({ age: { $gt: 25 }, name: { $regex: /^A/ } });
db.users.find({ age: { $in: [25, 30, 35] } });
`,
    testCases: [],
    explanation: 'SQL uses WHERE, AND, OR, LIKE, IN. MongoDB uses $gt, $in, $regex, etc.'
  },
  {
    id: 'pg-mongo-join',
    title: 'JOIN vs $lookup',
    description: 'How to join tables/collections in PostgreSQL and MongoDB.',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
SELECT users.name, orders.total
FROM users
JOIN orders ON users.id = orders.user_id;

// MongoDB (aggregation with $lookup)
db.users.aggregate([
  {
    $lookup: {
      from: 'orders',
      localField: '_id',
      foreignField: 'user_id',
      as: 'orders'
    }
  }
]);
`,
    testCases: [],
    explanation: 'SQL uses JOIN, MongoDB uses $lookup in aggregation.'
  },
  {
    id: 'pg-mongo-index',
    title: 'CREATE INDEX vs createIndex',
    description: 'Create an index in PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
CREATE INDEX idx_name ON users(name);

// MongoDB
db.users.createIndex({ name: 1 });
`,
    testCases: [],
    explanation: 'CREATE INDEX in SQL, createIndex in MongoDB.'
  },
  {
    id: 'pg-mongo-count',
    title: 'COUNT: COUNT(*) vs countDocuments()',
    description: 'Count records in PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
SELECT COUNT(*) FROM users;

// MongoDB
db.users.countDocuments({});
`,
    testCases: [],
    explanation: 'COUNT(*) in SQL, countDocuments in MongoDB.'
  },
  {
    id: 'pg-mongo-group-by',
    title: 'GROUP BY vs $group',
    description: 'Group and aggregate data in PostgreSQL and MongoDB.',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
SELECT age, COUNT(*) FROM users GROUP BY age;

// MongoDB
db.users.aggregate([
  { $group: { _id: '$age', count: { $sum: 1 } } }
]);
`,
    testCases: [],
    explanation: 'GROUP BY in SQL, $group in MongoDB aggregation.'
  },
  {
    id: 'pg-mongo-order-by',
    title: 'ORDER BY vs sort()',
    description: 'Sort data in PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
SELECT * FROM users ORDER BY age DESC;

// MongoDB
db.users.find().sort({ age: -1 });
`,
    testCases: [],
    explanation: 'ORDER BY in SQL, sort() in MongoDB.'
  },
  {
    id: 'pg-mongo-limit',
    title: 'LIMIT vs limit()',
    description: 'Limit the number of results in PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
SELECT * FROM users LIMIT 5;

// MongoDB
db.users.find().limit(5);
`,
    testCases: [],
    explanation: 'LIMIT in SQL, limit() in MongoDB.'
  },
  {
    id: 'pg-mongo-distinct',
    title: 'DISTINCT vs distinct()',
    description: 'Get unique values in PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
SELECT DISTINCT age FROM users;

// MongoDB
db.users.distinct('age');
`,
    testCases: [],
    explanation: 'DISTINCT in SQL, distinct() in MongoDB.'
  },
  {
    id: 'pg-mongo-avg-sum',
    title: 'AVG, SUM, MIN, MAX',
    description: 'Aggregate functions in PostgreSQL and MongoDB.',
    difficulty: 'Easy',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
SELECT AVG(age), SUM(age), MIN(age), MAX(age) FROM users;

// MongoDB
db.users.aggregate([
  {
    $group: {
      _id: null,
      avgAge: { $avg: '$age' },
      sumAge: { $sum: '$age' },
      minAge: { $min: '$age' },
      maxAge: { $max: '$age' }
    }
  }
]);
`,
    testCases: [],
    explanation: 'Aggregate functions in SQL, $group with operators in MongoDB.'
  },
  {
    id: 'pg-mongo-union',
    title: 'UNION vs $unionWith',
    description: 'Combine results from multiple queries in PostgreSQL and MongoDB.',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
SELECT name FROM users
UNION
SELECT name FROM admins;

// MongoDB
db.users.aggregate([
  { $unionWith: 'admins' },
  { $project: { name: 1 } }
]);
`,
    testCases: [],
    explanation: 'UNION in SQL, $unionWith in MongoDB aggregation.'
  },
  {
    id: 'pg-mongo-case',
    title: 'CASE vs $cond',
    description: 'Conditional logic in PostgreSQL and MongoDB.',
    difficulty: 'Medium',
    category: 'postgresql-mongodb',
    solution: `// PostgreSQL
SELECT name, CASE WHEN age >= 18 THEN 'Adult' ELSE 'Minor' END as status FROM users;

// MongoDB
db.users.aggregate([
  {
    $project: {
      name: 1,
      status: {
        $cond: [ { $gte: ['$age', 18] }, 'Adult', 'Minor' ]
      }
    }
  }
]);
`,
    testCases: [],
    explanation: 'CASE in SQL, $cond in MongoDB aggregation.'
  }
] 