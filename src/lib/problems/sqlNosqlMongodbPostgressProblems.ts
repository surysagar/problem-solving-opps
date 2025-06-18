export const sqlNosqlMongodbPostgressProblems = [
  {
    id: 'sql-vs-nosql-comparison',
    title: 'SQL vs NoSQL Comparison',
    description: 'Compare SQL and NoSQL databases using key characteristics.',
    difficulty: 'Easy',
    category: 'sql-nosql-mongodb-postgress',
    explanation: `
**SQL**
- Data uses Schemas
- Relations!
- Data is distributed across multiple tables
- Horizontal scaling is difficult / impossible; Vertical scaling is possible
- Limitations for lots of (thousands) read

**NoSQL**
- Schema-less
- No (or very few) Relations
- Data is typically merged / nested in a few collections
- Both horizontal and vertical scaling is possible
- Great performance for mass read & write
`,
    solution: 'SQL is best for structured data and complex queries; NoSQL is best for flexible, scalable, and high-volume data.',
    testCases: [
      {
        input: 'SQL: CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));',
        output: 'Creates a relational table with schema.'
      },
      {
        input: 'NoSQL: { "id": 1, "name": "John Doe" }',
        output: 'Stores a document in a collection, schema-less.'
      }
    ],
    example: `// SQL Example: Relational Table
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);

// NoSQL Example: Document
{
  "id": 1,
  "name": "John Doe"
}`
  }
]; 