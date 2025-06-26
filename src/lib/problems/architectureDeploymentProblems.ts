import { Problem } from '@/types'

export const architectureDeploymentProblems: Problem[] = [
  {
    id: 'arch-deploy-1',
    title: 'CI/CD Pipeline Architecture',
    description: 'Understanding continuous integration, continuous deployment, and pipeline automation.',
    difficulty: 'Medium',
    category: 'architecture-deployment',
    solution: `// CI/CD Pipeline Implementation
// GitHub Actions Workflow
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linting
      run: npm run lint
    
    - name: Build application
      run: npm run build
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3

  security-scan:
    runs-on: ubuntu-latest
    needs: test
    steps:
    - uses: actions/checkout@v3
    
    - name: Run security scan
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: 'secrets.SNYK_TOKEN'
      with:
        args: --severity-threshold=high

  deploy-staging:
    runs-on: ubuntu-latest
    needs: [test, security-scan]
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to staging
      run: |
        echo "Deploying to staging environment"
        # Deploy commands here
    
    - name: Run smoke tests
      run: npm run test:smoke

  deploy-production:
    runs-on: ubuntu-latest
    needs: [test, security-scan]
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      run: |
        echo "Deploying to production environment"
        # Deploy commands here
    
    - name: Run health checks
      run: npm run test:health

// Docker Configuration
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runtime

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000
CMD ["npm", "start"]

# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/app
    depends_on:
      - db
    restart: unless-stopped
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=app
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:

// Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: app-deployment
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80

// Infrastructure as Code (Terraform)
# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "main-vpc"
  }
}

# Subnets
resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  
  tags = {
    Name = "public-subnet"
  }
}

resource "aws_subnet" "private" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"
  
  tags = {
    Name = "private-subnet"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "main-cluster"
}

# ECS Task Definition
resource "aws_ecs_task_definition" "app" {
  family                   = "app"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  
  container_definitions = jsonencode([
    {
      name  = "app"
      image = "my-app:latest"
      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]
      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        }
      ]
    }
  ])
}

# Application Load Balancer
resource "aws_lb" "main" {
  name               = "main-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = [aws_subnet.public.id]
}

# Blue-Green Deployment Script
#!/bin/bash
# blue-green-deploy.sh

set -e

# Configuration
APP_NAME="my-app"
BLUE_ENV="blue"
GREEN_ENV="green"
CURRENT_ENV=$(aws ssm get-parameter --name "/app/current-environment" --query "Parameter.Value" --output text)

echo "Current environment: $CURRENT_ENV"

# Determine target environment
if [ "$CURRENT_ENV" = "$BLUE_ENV" ]; then
    TARGET_ENV=$GREEN_ENV
else
    TARGET_ENV=$BLUE_ENV
fi

echo "Deploying to $TARGET_ENV environment"

# Deploy to target environment
aws ecs update-service \
    --cluster main-cluster \
    --service $APP_NAME-$TARGET_ENV \
    --task-definition $APP_NAME:$TARGET_ENV

# Wait for deployment to complete
aws ecs wait services-stable \
    --cluster main-cluster \
    --services $APP_NAME-$TARGET_ENV

# Run health checks
HEALTH_CHECK_URL="https://$TARGET_ENV.example.com/health"
for i in {1..30}; do
    if curl -f $HEALTH_CHECK_URL; then
        echo "Health check passed"
        break
    fi
    echo "Health check failed, retrying..."
    sleep 10
done

# Switch traffic
aws ssm put-parameter \
    --name "/app/current-environment" \
    --value $TARGET_ENV \
    --type String \
    --overwrite

echo "Deployment completed successfully"`,
    testCases: [],
    explanation: `CI/CD Pipeline Architecture automates the software delivery process.

Key Components:
- Continuous Integration: Automatically build and test code changes
- Continuous Deployment: Automatically deploy to production
- Pipeline Automation: Streamlined delivery process

Pipeline Stages:
1. Source Control: Code repository (Git)
2. Build: Compile and package application
3. Test: Automated testing (unit, integration, e2e)
4. Security Scan: Vulnerability assessment
5. Deploy: Deploy to staging/production
6. Monitor: Health checks and monitoring

Deployment Strategies:
- Blue-Green: Zero-downtime deployment
- Canary: Gradual rollout
- Rolling: Incremental updates
- Immutable: Replace entire instances

Infrastructure as Code:
- Terraform: Infrastructure provisioning
- CloudFormation: AWS-specific IaC
- Ansible: Configuration management
- Docker: Containerization

Benefits:
- Faster delivery cycles
- Reduced manual errors
- Consistent deployments
- Better collaboration
- Rollback capabilities

Best Practices:
- Automated testing at every stage
- Security scanning in pipeline
- Environment parity
- Monitoring and alerting
- Backup and disaster recovery`
  },
  {
    id: 'arch-deploy-2',
    title: 'Container Orchestration & Kubernetes',
    description: 'Understanding container orchestration, Kubernetes architecture, and cluster management.',
    difficulty: 'Hard',
    category: 'architecture-deployment',
    solution: `// Kubernetes Architecture Components
// Pod Definition
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
  labels:
    app: my-app
spec:
  containers:
  - name: app
    image: my-app:latest
    ports:
    - containerPort: 3000
    env:
    - name: NODE_ENV
      value: "production"
    - name: DATABASE_URL
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: url
    resources:
      requests:
        memory: "128Mi"
        cpu: "100m"
      limits:
        memory: "256Mi"
        cpu: "200m"
    volumeMounts:
    - name: config-volume
      mountPath: /app/config
  volumes:
  - name: config-volume
    configMap:
      name: app-config

// ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  app.properties: |
    server.port=3000
    logging.level=INFO
    cache.enabled=true

// Secret
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  url: cG9zdGdyZXNxbDovL3VzZXI6cGFzc0BkYjozNDMyL2FwcA==
  password: cGFzc3dvcmQxMjM=

// Service
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP

// Ingress
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: app-service
            port:
              number: 80

// Horizontal Pod Autoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: app-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80

// Persistent Volume
apiVersion: v1
kind: PersistentVolume
metadata:
  name: app-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/mnt/data"

// Persistent Volume Claim
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi

// Namespace
apiVersion: v1
kind: Namespace
metadata:
  name: production

// Resource Quota
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: production
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi

// Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: app-network-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: my-app
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: frontend
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: database
    ports:
    - protocol: TCP
      port: 5432

// Custom Resource Definition
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: applications.example.com
spec:
  group: example.com
  versions:
  - name: v1
    served: true
    storage: true
    schema:
      openAPIV3Schema:
        type: object
        properties:
          spec:
            type: object
            properties:
              replicas:
                type: integer
  scope: Namespaced
  names:
    plural: applications
    singular: application
    kind: Application

// Operator Pattern
class ApplicationOperator {
  async reconcile(customResource: any) {
    const { metadata, spec } = customResource;
    
    // Check if deployment exists
    const deployment = await this.getDeployment(metadata.name);
    
    if (!deployment) {
      // Create deployment
      await this.createDeployment(metadata.name, spec);
    } else {
      // Update deployment if needed
      if (deployment.spec.replicas !== spec.replicas) {
        await this.updateDeployment(metadata.name, spec);
      }
    }
  }
  
  private async createDeployment(name: string, spec: any) {
    const deployment = {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: { name },
      spec: {
        replicas: spec.replicas,
        selector: { matchLabels: { app: name } },
        template: {
          metadata: { labels: { app: name } },
          spec: {
            containers: [{
              name,
              image: spec.image,
              ports: [{ containerPort: 3000 }]
            }]
          }
        }
      }
    };
    
    await this.k8sApi.createNamespacedDeployment('default', deployment);
  }
}

// Helm Chart
# Chart.yaml
apiVersion: v2
name: my-app
description: A Helm chart for My Application
version: 1.0.0
appVersion: "1.0.0"

# values.yaml
replicaCount: 3
image:
  repository: my-app
  tag: latest
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  className: nginx
  hosts:
  - host: app.example.com
    paths:
    - path: /
      pathType: Prefix

resources:
  limits:
    cpu: 200m
    memory: 256Mi
  requests:
    cpu: 100m
    memory: 128Mi

# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "my-app.fullname" . }}
  labels:
    {{- include "my-app.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include "my-app.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "my-app.selectorLabels" . | nindent 8 }}
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}
        ports:
        - containerPort: 3000
        resources:
          {{- toYaml .Values.resources | nindent 10 }}`,
    testCases: [],
    explanation: `Kubernetes is a container orchestration platform for automating deployment, scaling, and management.

Key Components:
- Pod: Smallest deployable unit
- Service: Network abstraction for pods
- Deployment: Manages pod replicas
- ConfigMap/Secret: Configuration management
- Ingress: External access to services

Architecture:
1. Control Plane: API server, scheduler, controller manager
2. Worker Nodes: Kubelet, kube-proxy, container runtime
3. etcd: Distributed key-value store
4. Networking: CNI plugins for pod communication

Deployment Strategies:
- Rolling Update: Gradual replacement
- Blue-Green: Zero-downtime deployment
- Canary: Traffic splitting
- Recreate: Stop old, start new

Scaling:
- Horizontal Pod Autoscaler (HPA)
- Vertical Pod Autoscaler (VPA)
- Cluster Autoscaler

Security:
- RBAC: Role-based access control
- Network Policies: Pod-to-pod communication
- Pod Security Standards
- Secrets management

Monitoring:
- Prometheus: Metrics collection
- Grafana: Visualization
- Jaeger: Distributed tracing
- ELK Stack: Logging

Best Practices:
- Resource limits and requests
- Health checks (liveness/readiness)
- Namespace isolation
- Resource quotas
- Network policies`
  },
  {
    id: 'arch-deploy-angular-firebase',
    title: 'How to deploy Angular app on Firebase/Netlify/Vercel?',
    description: 'Build using ng build --prod, deploy dist/ folder.',
    difficulty: 'Medium',
    category: 'architecture-deployment',
    solution: `// Angular Deployment to Firebase
// 1. Build the application
ng build --prod

// 2. Firebase Configuration (firebase.json)
{
  "hosting": {
    "public": "dist/your-app-name",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

// 3. Deploy to Firebase
firebase login
firebase init hosting
firebase deploy

// Netlify Deployment
// 1. Build command: ng build --prod
// 2. Publish directory: dist/your-app-name
// 3. Deploy via Netlify UI or CLI

// Vercel Deployment
// 1. Install Vercel CLI: npm i -g vercel
// 2. Build command: ng build --prod
// 3. Output directory: dist/your-app-name
// 4. Deploy: vercel --prod`,
    testCases: [],
    explanation: 'Angular apps are deployed by building the production bundle and hosting the dist/ folder on static hosting platforms like Firebase, Netlify, or Vercel.'
  },
  {
    id: 'arch-deploy-react-github-pages',
    title: 'How to deploy React app to GitHub Pages/Netlify/Vercel?',
    description: 'Build using npm run build, host build/ folder.',
    difficulty: 'Medium',
    category: 'architecture-deployment',
    solution: `// React Deployment to GitHub Pages
// 1. Add homepage to package.json
{
  "homepage": "https://username.github.io/repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}

// 2. Install gh-pages
npm install --save-dev gh-pages

// 3. Build and deploy
npm run build
npm run deploy

// Netlify Deployment
// 1. Build command: npm run build
// 2. Publish directory: build
// 3. Deploy via Netlify UI or CLI

// Vercel Deployment
// 1. Install Vercel CLI: npm i -g vercel
// 2. Build command: npm run build
// 3. Output directory: build
// 4. Deploy: vercel --prod

// Environment Variables
// Create .env.production for production builds
REACT_APP_API_URL=https://api.production.com
REACT_APP_ENV=production`,
    testCases: [],
    explanation: 'React apps are deployed by building the production bundle and hosting the build/ folder on static hosting platforms like GitHub Pages, Netlify, or Vercel.'
  },
  {
    id: 'arch-deploy-environment-config',
    title: 'What is environment configuration in Angular and React?',
    description: 'Angular: environment.ts, React: .env files',
    difficulty: 'Medium',
    category: 'architecture-deployment',
    solution: `// Angular Environment Configuration
// src/environments/environment.ts (development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  version: '1.0.0'
};

// src/environments/environment.prod.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://api.production.com',
  version: '1.0.0'
};

// Usage in Angular
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {
  private apiUrl = environment.apiUrl;
}

// React Environment Configuration
// .env (development)
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_ENV=development

// .env.production (production)
REACT_APP_API_URL=https://api.production.com
REACT_APP_ENV=production

// Usage in React
const apiUrl = process.env.REACT_APP_API_URL;
const environment = process.env.REACT_APP_ENV;

// Note: React requires REACT_APP_ prefix for environment variables`,
    testCases: [],
    explanation: 'Environment configuration allows different settings for development and production environments. Angular uses TypeScript files, React uses .env files with REACT_APP_ prefix.'
  },
  {
    id: 'arch-deploy-bundle-optimization',
    title: 'How to optimize bundle size before deployment?',
    description: 'Use lazy loading, remove unused packages, tree shaking.',
    difficulty: 'Medium',
    category: 'architecture-deployment',
    solution: `// Angular Bundle Optimization
// 1. Enable production mode
ng build --prod

// 2. Lazy Loading
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  }
];

// 3. Tree Shaking (automatic with --prod)
// Remove unused imports and dead code

// 4. Bundle Analysis
npm install -g webpack-bundle-analyzer
ng build --prod --stats-json
webpack-bundle-analyzer dist/stats.json

// React Bundle Optimization
// 1. Production build
npm run build

// 2. Code Splitting
import React, { lazy, Suspense } from 'react';
const LazyComponent = lazy(() => import('./LazyComponent'));

// 3. Tree Shaking
// Remove unused imports and dead code

// 4. Bundle Analysis
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js

// 5. Remove unused dependencies
npm install -g depcheck
depcheck

// 6. Optimize images
// Use WebP format, compress images
// Use next/image for Next.js apps

// 7. Gzip compression
// Enable on server or CDN

// 8. CDN for libraries
// Use CDN for large libraries like React, Lodash`,
    testCases: [],
    explanation: 'Bundle optimization reduces load times by minimizing JavaScript bundle size through lazy loading, tree shaking, code splitting, and removing unused dependencies.'
  },
  {
    id: 'arch-deploy-cicd-angular-react',
    title: 'What is CI/CD in Angular/React projects?',
    description: 'Use GitHub Actions, GitLab CI, or Jenkins to automate build, test, and deployment.',
    difficulty: 'Medium',
    category: 'architecture-deployment',
    solution: `// GitHub Actions for Angular
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build

  deploy-staging:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/develop'
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to staging
      run: |
        npm run build
        # Deploy to staging environment

  deploy-production:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      run: |
        npm run build
        # Deploy to production environment

// GitLab CI for React
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm run lint
    - npm test

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - build/

deploy-staging:
  stage: deploy
  image: alpine:latest
  script:
    - echo "Deploy to staging"
  only:
    - develop

deploy-production:
  stage: deploy
  image: alpine:latest
  script:
    - echo "Deploy to production"
  only:
    - main

// Jenkins Pipeline
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm run lint'
                sh 'npm test'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh 'echo "Deploy to production"'
            }
        }
    }
}`,
    testCases: [],
    explanation: 'CI/CD automates the software delivery process by building, testing, and deploying applications automatically when code changes are pushed to the repository.'
  }
] 