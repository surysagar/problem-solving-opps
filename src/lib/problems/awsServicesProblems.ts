import { Problem } from '@/types'

export const awsServicesProblems: Problem[] = [
  {
    id: 'aws-1',
    title: 'AWS Lambda - Serverless Functions',
    description: 'Understanding AWS Lambda, its use cases, benefits, and implementation patterns for serverless computing.',
    difficulty: 'Medium',
    category: 'aws-services',
    solution: `// AWS Lambda Function Example (Node.js)
exports.handler = async (event) => {
  try {
    // Parse the incoming event
    const body = JSON.parse(event.body || '{}');
    
    // Process the request
    const result = await processRequest(body);
    
    // Return response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'Success',
        data: result,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error.message
      })
    };
  }
};

async function processRequest(data) {
  // Your business logic here
  return { processed: true, input: data };
}

// Lambda with DynamoDB Integration
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.dynamoHandler = async (event) => {
  const params = {
    TableName: 'Users',
    Item: {
      id: event.userId,
      name: event.name,
      email: event.email,
      createdAt: new Date().toISOString()
    }
  };
  
  try {
    await dynamodb.put(params).promise();
    return { success: true };
  } catch (error) {
    throw new Error('Failed to save to DynamoDB');
  }
};

// Lambda with S3 Integration
const s3 = new AWS.S3();

exports.s3Handler = async (event) => {
  const bucketName = 'my-bucket';
  const key = 'uploads/' + Date.now() + '.json';
  
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: JSON.stringify(event.data),
    ContentType: 'application/json'
  };
  
  try {
    const result = await s3.putObject(params).promise();
    return { 
      success: true, 
      location: \`s3://\${bucketName}/\${key}\` 
    };
  } catch (error) {
    throw new Error('Failed to upload to S3');
  }
};`,
    testCases: [
      { input: '{"name": "John", "email": "john@example.com"}', output: '{"message": "Success", "data": {"processed": true, "input": {"name": "John", "email": "john@example.com"}}}' }
    ],
    explanation: `AWS Lambda is a serverless compute service that runs code in response to events.

Key Features:
- Pay only for compute time used
- Automatic scaling
- No server management required
- Supports multiple languages (Node.js, Python, Java, etc.)

Common Use Cases:
- API endpoints
- Data processing
- File processing
- Scheduled tasks
- Real-time stream processing

Benefits:
- Cost-effective for sporadic workloads
- High availability and fault tolerance
- Easy integration with other AWS services
- Automatic scaling and load balancing

Best Practices:
- Keep functions small and focused
- Use environment variables for configuration
- Implement proper error handling
- Use connection pooling for databases
- Optimize cold start times`
  },
  {
    id: 'aws-2',
    title: 'Amazon ECS - Container Orchestration',
    description: 'Understanding Amazon ECS (Elastic Container Service) for running and managing Docker containers at scale.',
    difficulty: 'Hard',
    category: 'aws-services',
    solution: `// ECS Task Definition (JSON)
{
  "family": "web-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "web",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/web-app:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "DATABASE_URL",
          "value": "postgresql://user:pass@rds-endpoint:5432/db"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/web-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}

// ECS Service Definition
{
  "cluster": "production-cluster",
  "serviceName": "web-service",
  "taskDefinition": "web-app:1",
  "desiredCount": 3,
  "launchType": "FARGATE",
  "networkConfiguration": {
    "awsvpcConfiguration": {
      "subnets": ["subnet-12345678", "subnet-87654321"],
      "securityGroups": ["sg-12345678"],
      "assignPublicIp": "ENABLED"
    }
  },
  "loadBalancer": {
    "targetGroupArn": "arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/web-tg/1234567890123456",
    "containerName": "web",
    "containerPort": 80
  }
}

// Dockerfile for ECS
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 80

CMD ["npm", "start"]

// Application Load Balancer Integration
const AWS = require('aws-sdk');
const ecs = new AWS.ECS();

async function updateService(serviceName, taskDefinition) {
  const params = {
    cluster: 'production-cluster',
    service: serviceName,
    taskDefinition: taskDefinition,
    desiredCount: 3
  };
  
  try {
    const result = await ecs.updateService(params).promise();
    console.log('Service updated:', result);
    return result;
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
}

// Auto Scaling Configuration
{
  "autoScalingGroupName": "ecs-asg",
  "minSize": 1,
  "maxSize": 10,
  "desiredCapacity": 3,
  "targetTrackingScalingPolicies": [
    {
      "policyName": "cpu-target-tracking",
      "targetValue": 70.0,
      "predefinedMetricSpecification": {
        "predefinedMetricType": "ECSServiceAverageCPUUtilization",
        "resourceLabel": "web-service"
      }
    }
  ]
}`,
    testCases: [],
    explanation: `Amazon ECS is a fully managed container orchestration service.

Key Features:
- Run Docker containers without managing servers
- Automatic scaling and load balancing
- Integration with other AWS services
- Support for both EC2 and Fargate launch types

ECS Components:
1. Cluster: Logical grouping of tasks/services
2. Task Definition: Blueprint for your application
3. Task: Running instance of a task definition
4. Service: Maintains desired number of tasks
5. Container: Docker container running your application

Launch Types:
- FARGATE: Serverless, no EC2 management
- EC2: More control, manage EC2 instances

Best Practices:
- Use Fargate for most workloads
- Implement proper health checks
- Use Application Load Balancer for traffic distribution
- Set up auto scaling based on metrics
- Use ECR for container image storage
- Implement proper logging and monitoring`
  },
  {
    id: 'aws-3',
    title: 'Amazon S3 - Object Storage',
    description: 'Understanding Amazon S3 for scalable object storage, file management, and data archiving.',
    difficulty: 'Medium',
    category: 'aws-services',
    solution: `// S3 Basic Operations (Node.js)
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Upload file to S3
async function uploadFile(bucketName, key, fileContent) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileContent,
    ContentType: 'application/json',
    ACL: 'private'
  };
  
  try {
    const result = await s3.putObject(params).promise();
    console.log('File uploaded successfully:', result);
    return result;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

// Download file from S3
async function downloadFile(bucketName, key) {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  
  try {
    const result = await s3.getObject(params).promise();
    return result.Body.toString();
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
}

// List objects in bucket
async function listObjects(bucketName, prefix = '') {
  const params = {
    Bucket: bucketName,
    Prefix: prefix,
    MaxKeys: 100
  };
  
  try {
    const result = await s3.listObjectsV2(params).promise();
    return result.Contents.map(obj => ({
      key: obj.Key,
      size: obj.Size,
      lastModified: obj.LastModified
    }));
  } catch (error) {
    console.error('List error:', error);
    throw error;
  }
}

// Generate presigned URL for secure access
async function generatePresignedUrl(bucketName, key, expiresIn = 3600) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: expiresIn
  };
  
  try {
    const url = await s3.getSignedUrlPromise('getObject', params);
    return url;
  } catch (error) {
    console.error('Presigned URL error:', error);
    throw error;
  }
}

// S3 Bucket Policy Example
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    },
    {
      "Sid": "DenyUnencryptedObjectUploads",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::my-bucket/*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": "AES256"
        }
      }
    }
  ]
}

// S3 Lifecycle Configuration
{
  "Rules": [
    {
      "ID": "MoveToIA",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "logs/"
      },
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        }
      ]
    },
    {
      "ID": "DeleteOldVersions",
      "Status": "Enabled",
      "NoncurrentVersionTransitions": [
        {
          "NoncurrentDays": 30,
          "StorageClass": "GLACIER"
        }
      ],
      "NoncurrentVersionExpiration": {
        "NoncurrentDays": 90
      }
    }
  ]
}

// S3 Event Notification (Lambda trigger)
exports.s3Handler = async (event) => {
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key);
    
    console.log(\`File \${key} was uploaded to bucket \${bucket}\`);
    
    // Process the uploaded file
    await processUploadedFile(bucket, key);
  }
};

async function processUploadedFile(bucket, key) {
  // Your processing logic here
  console.log(\`Processing file: \${key}\`);
}`,
    testCases: [],
    explanation: `Amazon S3 is a scalable object storage service for data storage, backup, and archiving.

Key Features:
- 99.999999999% (11 9's) durability
- 99.99% availability
- Virtually unlimited storage
- Global edge locations with CloudFront

Storage Classes:
- S3 Standard: Frequently accessed data
- S3 Standard-IA: Infrequently accessed data
- S3 One Zone-IA: Single AZ storage
- S3 Glacier: Long-term archival
- S3 Glacier Deep Archive: Lowest cost storage

Use Cases:
- Static website hosting
- Data lakes and analytics
- Backup and disaster recovery
- Application assets (images, videos)
- Log storage and analysis

Best Practices:
- Use appropriate storage classes
- Implement lifecycle policies
- Enable versioning for critical data
- Use bucket policies for access control
- Enable server-side encryption
- Use presigned URLs for secure access
- Implement proper error handling`
  },
  {
    id: 'aws-4',
    title: 'API Gateway - REST & HTTP APIs',
    description: 'Understanding Amazon API Gateway for building, deploying, and managing RESTful and HTTP APIs.',
    difficulty: 'Medium',
    category: 'aws-services',
    solution: `// API Gateway REST API Definition (OpenAPI 3.0)
{
  "openapi": "3.0.0",
  "info": {
    "title": "User Management API",
    "version": "1.0.0"
  },
  "paths": {
    "/users": {
      "get": {
        "summary": "Get all users",
        "responses": {
          "200": {
            "description": "List of users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          }
        },
        "x-amazon-apigateway-integration": {
          "uri": "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:123456789012:function:getUsers/invocations",
          "passthroughBehavior": "when_no_match",
          "httpMethod": "POST",
          "type": "aws_proxy"
        }
      },
      "post": {
        "summary": "Create a new user",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateUserRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "User created successfully"
          }
        }
      }
    },
    "/users/{id}": {
      "get": {
        "summary": "Get user by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "User details"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "User": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "email": {
            "type": "string"
          }
        }
      },
      "CreateUserRequest": {
        "type": "object",
        "required": ["name", "email"],
        "properties": {
          "name": {
            "type": "string"
          },
          "email": {
            "type": "string"
          }
        }
      }
    }
  }
}

// Lambda Integration with API Gateway
exports.apiHandler = async (event) => {
  const method = event.httpMethod;
  const path = event.path;
  const body = event.body ? JSON.parse(event.body) : {};
  
  try {
    switch (method) {
      case 'GET':
        if (path === '/users') {
          return await getUsers();
        } else if (path.startsWith('/users/')) {
          const userId = path.split('/')[2];
          return await getUserById(userId);
        }
        break;
        
      case 'POST':
        if (path === '/users') {
          return await createUser(body);
        }
        break;
        
      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ message: 'Method not allowed' })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};

// CORS Configuration
{
  "cors": {
    "allowOrigin": "*",
    "allowHeaders": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "allowMethods": "GET,POST,PUT,DELETE,OPTIONS",
    "maxAge": "86400"
  }
}

// API Gateway Authorizer (Lambda)
exports.authorizer = async (event) => {
  const token = event.authorizationToken;
  
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return {
      principalId: decoded.userId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: event.methodArn
          }
        ]
      }
    };
  } catch (error) {
    throw new Error('Unauthorized');
  }
};

// Request/Response Transformation
{
  "requestTemplates": {
    "application/json": "{\n  \"userId\": \"$input.params('id')\",\n  \"body\": $input.json('$')\n}"
  },
  "responseTemplates": {
    "application/json": "#set($inputRoot = $input.path('$'))\n{\n  \"status\": \"success\",\n  \"data\": $inputRoot\n}"
  }
}

// API Gateway Usage Plan
{
  "usagePlan": {
    "name": "Basic Plan",
    "description": "Basic usage plan for API",
    "quota": {
      "limit": 1000,
      "period": "DAY"
    },
    "throttle": {
      "burstLimit": 100,
      "rateLimit": 50
    }
  }
}`,
    testCases: [],
    explanation: `Amazon API Gateway is a fully managed service for creating, publishing, maintaining, monitoring, and securing APIs.

Key Features:
- RESTful and HTTP APIs
- WebSocket APIs
- Automatic scaling
- Built-in security features
- API versioning and deployment stages

API Types:
1. REST API: Full-featured REST API
2. HTTP API: Lightweight, fast HTTP API
3. WebSocket API: Real-time bidirectional communication

Integration Types:
- Lambda function
- HTTP endpoint
- AWS service
- Mock integration

Security Features:
- API keys
- Lambda authorizers
- Cognito user pools
- IAM roles and policies
- WAF integration

Best Practices:
- Use HTTP APIs for simple use cases
- Implement proper authentication
- Set up usage plans and throttling
- Use CloudWatch for monitoring
- Implement proper error handling
- Use API Gateway caching
- Set up CORS properly`
  },
  {
    id: 'aws-5',
    title: 'Amazon RDS - Relational Database Service',
    description: 'Understanding Amazon RDS for managed relational databases including MySQL, PostgreSQL, Oracle, and SQL Server.',
    difficulty: 'Hard',
    category: 'aws-services',
    solution: `// RDS Connection Example (Node.js)
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// Database Operations
class UserService {
  async createUser(userData) {
    const query = \`
      INSERT INTO users (name, email, created_at)
      VALUES ($1, $2, NOW())
      RETURNING id, name, email, created_at
    \`;
    
    try {
      const result = await pool.query(query, [userData.name, userData.email]);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  
  async getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }
  
  async updateUser(id, userData) {
    const query = \`
      UPDATE users 
      SET name = $1, email = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *
    \`;
    
    try {
      const result = await pool.query(query, [userData.name, userData.email, id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
  
  async deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

// RDS Parameter Group Configuration
{
  "ParameterGroupName": "custom-postgres-params",
  "DBParameterGroupFamily": "postgres13",
  "Description": "Custom PostgreSQL parameters",
  "Parameters": [
    {
      "ParameterName": "max_connections",
      "ParameterValue": "200",
      "ApplyMethod": "pending-reboot"
    },
    {
      "ParameterName": "shared_preload_libraries",
      "ParameterValue": "pg_stat_statements",
      "ApplyMethod": "pending-reboot"
    },
    {
      "ParameterName": "log_statement",
      "ParameterValue": "all",
      "ApplyMethod": "immediate"
    }
  ]
}

// RDS Subnet Group
{
  "DBSubnetGroupName": "my-db-subnet-group",
  "DBSubnetGroupDescription": "Subnet group for RDS instances",
  "SubnetIds": [
    "subnet-12345678",
    "subnet-87654321"
  ]
}

// RDS Security Group
{
  "GroupName": "rds-security-group",
  "Description": "Security group for RDS access",
  "IpPermissions": [
    {
      "IpProtocol": "tcp",
      "FromPort": 5432,
      "ToPort": 5432,
      "IpRanges": [
        {
          "CidrIp": "10.0.0.0/16",
          "Description": "VPC CIDR"
        }
      ]
    }
  ]
}

// RDS Backup Configuration
{
  "BackupRetentionPeriod": 7,
  "PreferredBackupWindow": "03:00-04:00",
  "PreferredMaintenanceWindow": "sun:04:00-sun:05:00",
  "MultiAZ": true,
  "StorageEncrypted": true,
  "KmsKeyId": "arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012"
}

// RDS Read Replica Configuration
{
  "SourceDBInstanceIdentifier": "main-db",
  "DBInstanceIdentifier": "read-replica-1",
  "DBInstanceClass": "db.t3.micro",
  "AvailabilityZone": "us-east-1a",
  "PubliclyAccessible": false,
  "AutoMinorVersionUpgrade": true,
  "StorageEncrypted": true
}

// CloudWatch Monitoring
const AWS = require('aws-sdk');
const cloudwatch = new AWS.CloudWatch();

async function getRDSMetrics(dbInstanceIdentifier) {
  const params = {
    Namespace: 'AWS/RDS',
    MetricName: 'CPUUtilization',
    Dimensions: [
      {
        Name: 'DBInstanceIdentifier',
        Value: dbInstanceIdentifier
      }
    ],
    StartTime: new Date(Date.now() - 3600000), // 1 hour ago
    EndTime: new Date(),
    Period: 300, // 5 minutes
    Statistics: ['Average', 'Maximum']
  };
  
  try {
    const result = await cloudwatch.getMetricStatistics(params).promise();
    return result.Datapoints;
  } catch (error) {
    console.error('Error getting metrics:', error);
    throw error;
  }
}`,
    testCases: [],
    explanation: `Amazon RDS is a managed relational database service supporting multiple database engines.

Supported Engines:
- MySQL
- PostgreSQL
- MariaDB
- Oracle
- SQL Server
- Aurora (MySQL and PostgreSQL compatible)

Key Features:
- Automated backups and snapshots
- Multi-AZ deployments for high availability
- Read replicas for read scaling
- Automatic patching and updates
- Encryption at rest and in transit

Deployment Options:
1. Single AZ: Cost-effective for dev/test
2. Multi-AZ: High availability for production
3. Read Replicas: Scale read operations
4. Aurora: Cloud-native database

Best Practices:
- Use Multi-AZ for production workloads
- Enable automated backups
- Use parameter groups for customization
- Implement proper security groups
- Monitor performance metrics
- Use read replicas for read-heavy workloads
- Enable encryption for sensitive data
- Regular maintenance windows`
  },
  {
    id: 'aws-6',
    title: 'MongoDB Atlas - Document Database',
    description: 'Understanding MongoDB Atlas as a fully managed document database service with global distribution.',
    difficulty: 'Medium',
    category: 'aws-services',
    solution: `// MongoDB Atlas Connection (Node.js)
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    return client.db('myDatabase');
  } catch (error) {
    console.error('Connection error:', error);
    throw error;
  }
}

// MongoDB Operations
class UserService {
  constructor() {
    this.collection = null;
  }
  
  async initialize() {
    const db = await connectToMongoDB();
    this.collection = db.collection('users');
  }
  
  async createUser(userData) {
    try {
      const result = await this.collection.insertOne({
        name: userData.name,
        email: userData.email,
        createdAt: new Date(),
        profile: {
          age: userData.age,
          location: userData.location
        }
      });
      
      return result.insertedId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  
  async getUserById(id) {
    try {
      const user = await this.collection.findOne({ _id: new ObjectId(id) });
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }
  
  async updateUser(id, updateData) {
    try {
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: {
            ...updateData,
            updatedAt: new Date()
          }
        }
      );
      
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
  
  async deleteUser(id) {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
  
  async findUsersByLocation(location) {
    try {
      const users = await this.collection.find({
        'profile.location': location
      }).toArray();
      
      return users;
    } catch (error) {
      console.error('Error finding users:', error);
      throw error;
    }
  }
  
  async aggregateUserStats() {
    try {
      const pipeline = [
        {
          $group: {
            _id: '$profile.location',
            count: { $sum: 1 },
            avgAge: { $avg: '$profile.age' }
          }
        },
        {
          $sort: { count: -1 }
        }
      ];
      
      const stats = await this.collection.aggregate(pipeline).toArray();
      return stats;
    } catch (error) {
      console.error('Error aggregating stats:', error);
      throw error;
    }
  }
}

// MongoDB Atlas Schema Design
const userSchema = {
  _id: ObjectId,
  name: String,
  email: String,
  createdAt: Date,
  updatedAt: Date,
  profile: {
    age: Number,
    location: String,
    interests: [String],
    social: {
      twitter: String,
      linkedin: String
    }
  },
  preferences: {
    theme: String,
    notifications: Boolean,
    language: String
  },
  metadata: {
    lastLogin: Date,
    loginCount: Number,
    isActive: Boolean
  }
};

// MongoDB Atlas Indexes
{
  "indexes": [
    {
      "key": { "email": 1 },
      "unique": true,
      "name": "email_unique"
    },
    {
      "key": { "profile.location": 1 },
      "name": "location_index"
    },
    {
      "key": { "createdAt": -1 },
      "name": "created_at_desc"
    },
    {
      "key": { "profile.interests": 1 },
      "name": "interests_index"
    },
    {
      "key": { "name": "text", "profile.location": "text" },
      "name": "text_search"
    }
  ]
}

// MongoDB Atlas Change Streams
async function watchCollectionChanges() {
  const pipeline = [
    {
      $match: {
        operationType: { $in: ['insert', 'update', 'delete'] }
      }
    }
  ];
  
  const changeStream = this.collection.watch(pipeline);
  
  changeStream.on('change', (change) => {
    console.log('Change detected:', change);
    
    // Handle different operation types
    switch (change.operationType) {
      case 'insert':
        console.log('New document:', change.fullDocument);
        break;
      case 'update':
        console.log('Updated document:', change.documentKey);
        break;
      case 'delete':
        console.log('Deleted document:', change.documentKey);
        break;
    }
  });
}

// MongoDB Atlas Backup and Restore
async function createBackup() {
  try {
    // MongoDB Atlas handles backups automatically
    // You can also create manual snapshots
    const result = await this.collection.aggregate([
      { $out: 'users_backup_' + new Date().toISOString().split('T')[0] }
    ]).toArray();
    
    console.log('Backup created successfully');
    return result;
  } catch (error) {
    console.error('Backup error:', error);
    throw error;
  }
}

// MongoDB Atlas Performance Optimization
async function optimizeQueries() {
  // Use projection to limit returned fields
  const users = await this.collection.find(
    { 'profile.location': 'New York' },
    { projection: { name: 1, email: 1, 'profile.age': 1 } }
  ).toArray();
  
  // Use aggregation for complex queries
  const userStats = await this.collection.aggregate([
    { $match: { 'profile.age': { $gte: 18 } } },
    { $group: { _id: '$profile.location', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]).toArray();
  
  return { users, userStats };
}`,
    testCases: [],
    explanation: `MongoDB Atlas is a fully managed cloud database service for MongoDB.

Key Features:
- Global distribution across AWS regions
- Automatic scaling and sharding
- Built-in security and compliance
- Automated backups and point-in-time recovery
- Real-time analytics and monitoring

Deployment Models:
1. Shared Clusters: Cost-effective for development
2. Dedicated Clusters: Production workloads
3. Serverless: Pay-per-use model

Data Models:
- Document-based (JSON-like BSON)
- Flexible schema design
- Rich query language
- Aggregation framework

Use Cases:
- Content management systems
- Real-time analytics
- IoT data storage
- Mobile applications
- E-commerce platforms

Best Practices:
- Design proper indexes
- Use appropriate data types
- Implement connection pooling
- Monitor query performance
- Use aggregation for complex queries
- Implement proper error handling
- Use change streams for real-time updates
- Regular backup verification`
  }
]; 