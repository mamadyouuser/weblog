export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  readTime: number;
  image: string;
  likes: number;
  comments: Comment[];
  featured?: boolean;
  views: number;
  status: 'published' | 'draft' | 'archived';
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'author' | 'subscriber';
  avatar: string;
  bio: string;
  joinDate: string;
  articlesCount: number;
  followersCount: number;
  followingCount: number;
}

export const defaultCredentials = {
  username: 'admin',
  password: '123456'
};

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@techblog.com',
    name: 'John Smith',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Tech enthusiast and full-stack developer with 10+ years of experience in web development.',
    joinDate: '2020-01-15',
    articlesCount: 45,
    followersCount: 1250,
    followingCount: 180
  },
  {
    id: 2,
    username: 'sarah_dev',
    email: 'sarah@techblog.com',
    name: 'Sarah Johnson',
    role: 'editor',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Frontend specialist focusing on React and modern web technologies.',
    joinDate: '2021-03-20',
    articlesCount: 28,
    followersCount: 890,
    followingCount: 95
  },
  {
    id: 3,
    username: 'mike_data',
    email: 'mike@techblog.com',
    name: 'Mike Chen',
    role: 'author',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Data scientist and AI researcher passionate about machine learning.',
    joinDate: '2021-07-10',
    articlesCount: 22,
    followersCount: 650,
    followingCount: 120
  }
];

export const mockArticles: Article[] = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the cutting-edge technologies and methodologies that are shaping the future of web development, from AI integration to advanced frameworks.",
    content: `# The Future of Web Development: Trends to Watch in 2024

The web development landscape is evolving at an unprecedented pace. As we move through 2024, several key trends are emerging that will define how we build and interact with web applications.

## AI-Powered Development Tools

Artificial Intelligence is revolutionizing how developers write code. Tools like GitHub Copilot and ChatGPT are becoming integral parts of the development workflow, helping developers:

- **Code Generation**: AI can generate boilerplate code, reducing development time
- **Bug Detection**: Advanced AI models can identify potential issues before they become problems
- **Code Optimization**: AI suggests performance improvements and best practices

## WebAssembly (WASM) Adoption

WebAssembly is gaining traction as a way to run high-performance applications in the browser:

\`\`\`javascript
// Example of loading a WASM module
const wasmModule = await WebAssembly.instantiateStreaming(
  fetch('module.wasm')
);
\`\`\`

### Benefits of WebAssembly:
- Near-native performance in browsers
- Language agnostic development
- Enhanced security through sandboxing

## Progressive Web Apps (PWAs) Evolution

PWAs continue to bridge the gap between web and native applications:

- **Offline Functionality**: Service workers enable robust offline experiences
- **Push Notifications**: Real-time engagement with users
- **App-like Experience**: Native app feel with web technologies

## Serverless Architecture

The shift towards serverless computing is accelerating:

- **Cost Efficiency**: Pay only for what you use
- **Scalability**: Automatic scaling based on demand
- **Reduced Maintenance**: Less infrastructure management

## Conclusion

The future of web development is bright, with AI, WebAssembly, PWAs, and serverless architecture leading the charge. Developers who embrace these technologies will be well-positioned for success in the evolving digital landscape.`,
    author: "John Smith",
    publishDate: "2024-01-15",
    category: "Web Development",
    tags: ["AI", "WebAssembly", "PWA", "Serverless", "Future Tech"],
    readTime: 8,
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    likes: 156,
    views: 2340,
    status: 'published',
    featured: true,
    comments: [
      {
        id: 1,
        author: "Alex Rodriguez",
        content: "Great insights! I'm particularly excited about WebAssembly's potential for gaming applications.",
        date: "2024-01-16",
        likes: 12
      },
      {
        id: 2,
        author: "Emma Wilson",
        content: "The AI development tools section was very informative. Have you tried the latest GitHub Copilot features?",
        date: "2024-01-17",
        likes: 8
      }
    ]
  },
  {
    id: 2,
    title: "Mastering React Hooks: Advanced Patterns and Best Practices",
    excerpt: "Deep dive into advanced React Hooks patterns, custom hooks creation, and performance optimization techniques for modern React applications.",
    content: `# Mastering React Hooks: Advanced Patterns and Best Practices

React Hooks have revolutionized how we write React components. This comprehensive guide explores advanced patterns and best practices for leveraging hooks effectively.

## Understanding Hook Fundamentals

Before diving into advanced patterns, let's review the core principles:

### The Rules of Hooks
- Only call hooks at the top level
- Only call hooks from React functions
- Use the ESLint plugin for hooks

## Advanced useState Patterns

### Functional Updates
\`\`\`javascript
const [count, setCount] = useState(0);

// Instead of this
setCount(count + 1);

// Use functional updates
setCount(prevCount => prevCount + 1);
\`\`\`

### Complex State Management
\`\`\`javascript
const [state, setState] = useState({
  user: null,
  loading: false,
  error: null
});

const updateUser = (userData) => {
  setState(prev => ({
    ...prev,
    user: userData,
    loading: false
  }));
};
\`\`\`

## Custom Hooks for Reusability

### useLocalStorage Hook
\`\`\`javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}
\`\`\`

## Performance Optimization

### useMemo and useCallback
\`\`\`javascript
const ExpensiveComponent = ({ items, filter }) => {
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);

  const handleClick = useCallback((id) => {
    // Handle click logic
  }, []);

  return (
    <div>
      {filteredItems.map(item => (
        <Item key={item.id} onClick={handleClick} />
      ))}
    </div>
  );
};
\`\`\`

## Conclusion

Mastering React Hooks requires understanding both the fundamentals and advanced patterns. By following these best practices, you'll write more efficient and maintainable React applications.`,
    author: "Sarah Johnson",
    publishDate: "2024-01-10",
    category: "React",
    tags: ["React", "Hooks", "JavaScript", "Performance", "Best Practices"],
    readTime: 12,
    image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    likes: 203,
    views: 3120,
    status: 'published',
    featured: true,
    comments: [
      {
        id: 3,
        author: "David Kim",
        content: "The custom hooks section is gold! I've been looking for a good useLocalStorage implementation.",
        date: "2024-01-11",
        likes: 15
      }
    ]
  },
  {
    id: 3,
    title: "Building Scalable APIs with Node.js and Express",
    excerpt: "Learn how to design and implement robust, scalable APIs using Node.js, Express, and modern architectural patterns.",
    content: `# Building Scalable APIs with Node.js and Express

Creating scalable APIs is crucial for modern web applications. This guide covers essential patterns and practices for building robust Node.js APIs.

## Project Structure

A well-organized project structure is the foundation of maintainable code:

\`\`\`
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
└── app.js
\`\`\`

## Middleware Implementation

### Authentication Middleware
\`\`\`javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
\`\`\`

## Error Handling

### Global Error Handler
\`\`\`javascript
const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};
\`\`\`

## Database Integration

### Using Mongoose with MongoDB
\`\`\`javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
\`\`\`

## API Versioning

Implement versioning for backward compatibility:

\`\`\`javascript
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
\`\`\`

## Rate Limiting

Protect your API from abuse:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
\`\`\`

## Conclusion

Building scalable APIs requires careful planning and implementation of best practices. Focus on clean architecture, proper error handling, and security measures to create robust applications.`,
    author: "Mike Chen",
    publishDate: "2024-01-08",
    category: "Backend",
    tags: ["Node.js", "Express", "API", "Backend", "Scalability"],
    readTime: 10,
    image: "https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    likes: 178,
    views: 2890,
    status: 'published',
    comments: [
      {
        id: 4,
        author: "Lisa Zhang",
        content: "Excellent guide! The middleware examples are particularly helpful for beginners.",
        date: "2024-01-09",
        likes: 9
      }
    ]
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "A comprehensive comparison of CSS Grid and Flexbox, with practical examples and guidelines for choosing the right layout method.",
    content: `# CSS Grid vs Flexbox: When to Use Which

Both CSS Grid and Flexbox are powerful layout systems, but they serve different purposes. Understanding when to use each is crucial for effective web design.

## Flexbox: One-Dimensional Layouts

Flexbox excels at distributing space along a single axis:

### Basic Flexbox Setup
\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.flex-item {
  flex: 1;
}
\`\`\`

### Common Flexbox Use Cases
- Navigation bars
- Card layouts
- Centering content
- Equal height columns

## CSS Grid: Two-Dimensional Layouts

Grid provides precise control over both rows and columns:

### Grid Template Areas
\`\`\`css
.grid-container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
\`\`\`

## When to Use Flexbox

Choose Flexbox when:
- Working with one-dimensional layouts
- Distributing space among items
- Aligning items within a container
- Creating responsive navigation

## When to Use Grid

Choose Grid when:
- Creating complex two-dimensional layouts
- Overlapping elements
- Precise positioning is required
- Building magazine-style layouts

## Combining Both

Often, the best approach is using both:

\`\`\`css
.page-layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
}

.navigation {
  display: flex;
  justify-content: space-between;
}
\`\`\`

## Responsive Considerations

### Grid Auto-Fit
\`\`\`css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
\`\`\`

### Flexbox Wrapping
\`\`\`css
.responsive-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-item {
  flex: 1 1 300px;
}
\`\`\`

## Conclusion

Both CSS Grid and Flexbox are essential tools in modern web development. Understanding their strengths and appropriate use cases will help you create more efficient and maintainable layouts.`,
    author: "Sarah Johnson",
    publishDate: "2024-01-05",
    category: "CSS",
    tags: ["CSS", "Grid", "Flexbox", "Layout", "Responsive Design"],
    readTime: 7,
    image: "https://images.pexels.com/photos/11035382/pexels-photo-11035382.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    likes: 142,
    views: 2150,
    status: 'published',
    comments: [
      {
        id: 5,
        author: "Tom Wilson",
        content: "This cleared up so much confusion I had about when to use each layout method!",
        date: "2024-01-06",
        likes: 11
      }
    ]
  },
  {
    id: 5,
    title: "Introduction to Machine Learning with Python",
    excerpt: "Get started with machine learning using Python, covering essential libraries, algorithms, and practical implementation examples.",
    content: `# Introduction to Machine Learning with Python

Machine Learning is transforming industries worldwide. This guide provides a practical introduction to ML using Python's powerful ecosystem.

## Essential Libraries

### Core Libraries
- **NumPy**: Numerical computing
- **Pandas**: Data manipulation
- **Scikit-learn**: Machine learning algorithms
- **Matplotlib/Seaborn**: Data visualization

### Installation
\`\`\`bash
pip install numpy pandas scikit-learn matplotlib seaborn jupyter
\`\`\`

## Data Preprocessing

### Loading and Exploring Data
\`\`\`python
import pandas as pd
import numpy as np

# Load dataset
df = pd.read_csv('data.csv')

# Basic exploration
print(df.head())
print(df.info())
print(df.describe())
\`\`\`

### Handling Missing Values
\`\`\`python
# Check for missing values
print(df.isnull().sum())

# Fill missing values
df['column'].fillna(df['column'].mean(), inplace=True)

# Drop rows with missing values
df.dropna(inplace=True)
\`\`\`

## Feature Engineering

### Encoding Categorical Variables
\`\`\`python
from sklearn.preprocessing import LabelEncoder, OneHotEncoder

# Label encoding
le = LabelEncoder()
df['category_encoded'] = le.fit_transform(df['category'])

# One-hot encoding
df_encoded = pd.get_dummies(df, columns=['category'])
\`\`\`

### Feature Scaling
\`\`\`python
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Standardization
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Normalization
normalizer = MinMaxScaler()
X_normalized = normalizer.fit_transform(X)
\`\`\`

## Building Your First Model

### Linear Regression Example
\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f'MSE: {mse}')
print(f'R²: {r2}')
\`\`\`

## Classification Example

### Random Forest Classifier
\`\`\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

# Create and train the classifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Make predictions
y_pred = clf.predict(X_test)

# Evaluate
print(classification_report(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))
\`\`\`

## Model Validation

### Cross-Validation
\`\`\`python
from sklearn.model_selection import cross_val_score

# Perform cross-validation
scores = cross_val_score(model, X, y, cv=5)
print(f'Cross-validation scores: {scores}')
print(f'Average score: {scores.mean()}')
\`\`\`

## Next Steps

- Explore deep learning with TensorFlow/PyTorch
- Learn about ensemble methods
- Study feature selection techniques
- Practice with real-world datasets

## Conclusion

This introduction covers the fundamentals of machine learning with Python. Practice with different datasets and algorithms to build your expertise in this exciting field.`,
    author: "Mike Chen",
    publishDate: "2024-01-03",
    category: "Machine Learning",
    tags: ["Python", "Machine Learning", "Data Science", "Scikit-learn", "AI"],
    readTime: 15,
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    likes: 267,
    views: 4200,
    status: 'published',
    featured: true,
    comments: [
      {
        id: 6,
        author: "Anna Rodriguez",
        content: "Perfect introduction! The code examples are very clear and easy to follow.",
        date: "2024-01-04",
        likes: 18
      }
    ]
  },
  {
    id: 6,
    title: "DevOps Best Practices: CI/CD Pipeline Implementation",
    excerpt: "Learn how to implement effective CI/CD pipelines using modern DevOps tools and practices for automated deployment and testing.",
    content: `# DevOps Best Practices: CI/CD Pipeline Implementation

Continuous Integration and Continuous Deployment (CI/CD) are fundamental practices in modern software development. This guide covers implementing effective CI/CD pipelines.

## Understanding CI/CD

### Continuous Integration (CI)
- Automated testing on code commits
- Early detection of integration issues
- Consistent build processes

### Continuous Deployment (CD)
- Automated deployment to production
- Reduced manual errors
- Faster time to market

## Pipeline Architecture

### Basic Pipeline Stages
1. **Source**: Code repository triggers
2. **Build**: Compile and package application
3. **Test**: Run automated tests
4. **Deploy**: Deploy to target environment

## GitHub Actions Example

### Basic Workflow
\`\`\`yaml
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

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to production
      run: |
        echo "Deploying to production..."
        # Add deployment commands here
\`\`\`

## Docker Integration

### Dockerfile
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

### Docker Compose for Development
\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules

  database:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
\`\`\`

## Testing Strategies

### Test Pyramid
- **Unit Tests**: Fast, isolated tests
- **Integration Tests**: Component interaction tests
- **End-to-End Tests**: Full application workflow tests

### Example Test Configuration
\`\`\`javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
\`\`\`

## Monitoring and Alerting

### Health Checks
\`\`\`javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
\`\`\`

### Logging Best Practices
\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
\`\`\`

## Security Considerations

### Secret Management
- Use environment variables for sensitive data
- Implement secret rotation
- Use dedicated secret management tools

### Security Scanning
\`\`\`yaml
- name: Run security audit
  run: npm audit --audit-level high

- name: Scan for vulnerabilities
  uses: securecodewarrior/github-action-add-sarif@v1
  with:
    sarif-file: security-scan-results.sarif
\`\`\`

## Deployment Strategies

### Blue-Green Deployment
- Maintain two identical production environments
- Switch traffic between environments
- Zero-downtime deployments

### Rolling Updates
- Gradually replace instances
- Maintain service availability
- Easy rollback capability

## Conclusion

Implementing effective CI/CD pipelines requires careful planning and the right tools. Focus on automation, testing, and monitoring to create reliable deployment processes that enable rapid, safe software delivery.`,
    author: "John Smith",
    publishDate: "2024-01-01",
    category: "DevOps",
    tags: ["DevOps", "CI/CD", "Docker", "GitHub Actions", "Automation"],
    readTime: 13,
    image: "https://images.pexels.com/photos/11035363/pexels-photo-11035363.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    likes: 189,
    views: 3450,
    status: 'published',
    comments: [
      {
        id: 7,
        author: "Carlos Martinez",
        content: "Great comprehensive guide! The GitHub Actions examples are particularly useful.",
        date: "2024-01-02",
        likes: 14
      }
    ]
  },
  {
    id: 7,
    title: "Advanced TypeScript: Utility Types and Generic Patterns",
    excerpt: "Master advanced TypeScript concepts including utility types, conditional types, and complex generic patterns for type-safe applications.",
    content: `# Advanced TypeScript: Utility Types and Generic Patterns

TypeScript's type system is incredibly powerful. This guide explores advanced concepts that will help you write more type-safe and maintainable code.

## Built-in Utility Types

### Partial and Required
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<Partial<User>>;
\`\`\`

### Pick and Omit
\`\`\`typescript
// Select specific properties
type UserSummary = Pick<User, 'id' | 'name'>;

// Exclude specific properties
type UserWithoutId = Omit<User, 'id'>;
\`\`\`

### Record Type
\`\`\`typescript
// Create object type with specific keys and values
type UserRoles = Record<'admin' | 'user' | 'guest', string[]>;

const permissions: UserRoles = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};
\`\`\`

## Advanced Generic Patterns

### Conditional Types
\`\`\`typescript
type ApiResponse<T> = T extends string
  ? { message: T }
  : T extends number
  ? { count: T }
  : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type NumberResponse = ApiResponse<number>; // { count: number }
type ObjectResponse = ApiResponse<User>; // { data: User }
\`\`\`

### Mapped Types
\`\`\`typescript
// Make all properties readonly
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// Add optional modifier
type OptionalUser = {
  [K in keyof User]?: User[K];
};

// Transform property types
type StringifiedUser = {
  [K in keyof User]: string;
};
\`\`\`

## Template Literal Types

### String Manipulation
\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickEvent = EventName<'click'>; // 'onClick'
type HoverEvent = EventName<'hover'>; // 'onHover'

// Path building
type ApiPath<T extends string> = \`/api/\${T}\`;
type UserPath = ApiPath<'users'>; // '/api/users'
\`\`\`

## Advanced Function Types

### Function Overloads
\`\`\`typescript
function processData(data: string): string;
function processData(data: number): number;
function processData(data: boolean): boolean;
function processData(data: unknown): unknown {
  return data;
}
\`\`\`

### Generic Constraints
\`\`\`typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello'); // OK
logLength([1, 2, 3]); // OK
logLength({ length: 10, value: 3 }); // OK
\`\`\`

## Discriminated Unions

### Type Guards
\`\`\`typescript
interface LoadingState {
  status: 'loading';
}

interface SuccessState {
  status: 'success';
  data: any;
}

interface ErrorState {
  status: 'error';
  error: string;
}

type AsyncState = LoadingState | SuccessState | ErrorState;

function handleState(state: AsyncState) {
  switch (state.status) {
    case 'loading':
      // TypeScript knows this is LoadingState
      console.log('Loading...');
      break;
    case 'success':
      // TypeScript knows this is SuccessState
      console.log('Data:', state.data);
      break;
    case 'error':
      // TypeScript knows this is ErrorState
      console.log('Error:', state.error);
      break;
  }
}
\`\`\`

## Custom Utility Types

### Deep Readonly
\`\`\`typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

interface NestedObject {
  user: {
    profile: {
      name: string;
      settings: {
        theme: string;
      };
    };
  };
}

type ReadonlyNested = DeepReadonly<NestedObject>;
// All nested properties are readonly
\`\`\`

### Extract Function Parameters
\`\`\`typescript
type GetParameters<T> = T extends (...args: infer P) => any ? P : never;

function exampleFunction(a: string, b: number, c: boolean) {
  return { a, b, c };
}

type Params = GetParameters<typeof exampleFunction>;
// [string, number, boolean]
\`\`\`

## Practical Examples

### API Client Type Safety
\`\`\`typescript
interface ApiEndpoints {
  '/users': {
    GET: { response: User[] };
    POST: { body: Omit<User, 'id'>; response: User };
  };
  '/users/:id': {
    GET: { response: User };
    PUT: { body: Partial<User>; response: User };
    DELETE: { response: { success: boolean } };
  };
}

class ApiClient {
  async request<
    Path extends keyof ApiEndpoints,
    Method extends keyof ApiEndpoints[Path]
  >(
    path: Path,
    method: Method,
    options?: ApiEndpoints[Path][Method] extends { body: infer B }
      ? { body: B }
      : {}
  ): Promise<ApiEndpoints[Path][Method] extends { response: infer R }
    ? R
    : never> {
    // Implementation here
    throw new Error('Not implemented');
  }
}

const client = new ApiClient();

// Type-safe API calls
const users = await client.request('/users', 'GET');
const newUser = await client.request('/users', 'POST', {
  body: { name: 'John', email: 'john@example.com', age: 30 }
});
\`\`\`

## Conclusion

Advanced TypeScript features enable you to create highly type-safe applications with excellent developer experience. These patterns help catch errors at compile time and provide better IDE support, leading to more maintainable codebases.`,
    author: "Sarah Johnson",
    publishDate: "2023-12-28",
    category: "TypeScript",
    tags: ["TypeScript", "Advanced Types", "Generics", "Type Safety", "JavaScript"],
    readTime: 16,
    image: "https://images.pexels.com/photos/11035364/pexels-photo-11035364.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    likes: 234,
    views: 3890,
    status: 'published',
    featured: true,
    comments: [
      {
        id: 8,
        author: "Robert Chen",
        content: "This is exactly what I needed to understand advanced TypeScript patterns. The API client example is brilliant!",
        date: "2023-12-29",
        likes: 22
      },
      {
        id: 9,
        author: "Maria Garcia",
        content: "The utility types section cleared up so many concepts for me. Thank you for the detailed explanations!",
        date: "2023-12-30",
        likes: 16
      }
    ]
  },
  {
    id: 8,
    title: "Microservices Architecture: Design Patterns and Best Practices",
    excerpt: "Explore microservices architecture patterns, communication strategies, and best practices for building scalable distributed systems.",
    content: `# Microservices Architecture: Design Patterns and Best Practices

Microservices architecture has become the standard for building scalable, maintainable applications. This comprehensive guide covers essential patterns and practices.

## Understanding Microservices

### Core Principles
- **Single Responsibility**: Each service has one business capability
- **Decentralized**: Independent deployment and scaling
- **Technology Agnostic**: Services can use different tech stacks
- **Fault Tolerant**: Failure in one service doesn't bring down the system

### Benefits and Challenges

#### Benefits
- Independent scaling and deployment
- Technology diversity
- Team autonomy
- Fault isolation

#### Challenges
- Distributed system complexity
- Network latency
- Data consistency
- Service discovery

## Service Design Patterns

### Domain-Driven Design (DDD)
\`\`\`typescript
// User Service Domain
interface User {
  id: UserId;
  email: Email;
  profile: UserProfile;
}

interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  save(user: User): Promise<void>;
}

class UserService {
  constructor(private userRepo: UserRepository) {}
  
  async createUser(userData: CreateUserRequest): Promise<User> {
    // Business logic here
    const user = new User(userData);
    await this.userRepo.save(user);
    return user;
  }
}
\`\`\`

### API Gateway Pattern
\`\`\`javascript
// API Gateway with Express
const express = require('express');
const httpProxy = require('http-proxy-middleware');

const app = express();

// Route to User Service
app.use('/api/users', httpProxy({
  target: 'http://user-service:3001',
  changeOrigin: true
}));

// Route to Order Service
app.use('/api/orders', httpProxy({
  target: 'http://order-service:3002',
  changeOrigin: true
}));

// Authentication middleware
app.use('/api', authenticateToken);

app.listen(3000);
\`\`\`

## Communication Patterns

### Synchronous Communication
\`\`\`typescript
// HTTP Client for service-to-service communication
class OrderService {
  constructor(private userServiceClient: UserServiceClient) {}
  
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    // Validate user exists
    const user = await this.userServiceClient.getUser(orderData.userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Create order
    const order = new Order(orderData);
    return await this.orderRepo.save(order);
  }
}
\`\`\`

### Asynchronous Communication
\`\`\`javascript
// Event-driven communication with message queues
const amqp = require('amqplib');

class EventPublisher {
  constructor(private connection: amqp.Connection) {}
  
  async publishEvent(eventType: string, data: any) {
    const channel = await this.connection.createChannel();
    const exchange = 'events';
    
    await channel.assertExchange(exchange, 'topic');
    
    const message = JSON.stringify({
      eventType,
      data,
      timestamp: new Date().toISOString()
    });
    
    channel.publish(exchange, eventType, Buffer.from(message));
  }
}

// Event subscriber
class OrderEventHandler {
  async handleUserCreated(event: UserCreatedEvent) {
    // Initialize user's order history
    console.log('Setting up order history for user:', event.userId);
  }
}
\`\`\`

## Data Management Patterns

### Database per Service
\`\`\`yaml
# Docker Compose for multiple databases
version: '3.8'

services:
  user-service:
    build: ./user-service
    environment:
      - DB_HOST=user-db
    depends_on:
      - user-db
  
  user-db:
    image: postgres:13
    environment:
      POSTGRES_DB: users
      POSTGRES_USER: user_service
      POSTGRES_PASSWORD: password
  
  order-service:
    build: ./order-service
    environment:
      - DB_HOST=order-db
    depends_on:
      - order-db
  
  order-db:
    image: mongodb:4.4
    environment:
      MONGO_INITDB_DATABASE: orders
\`\`\`

### Saga Pattern for Distributed Transactions
\`\`\`typescript
// Orchestrator-based Saga
class OrderSaga {
  async processOrder(orderData: CreateOrderRequest) {
    const sagaId = generateSagaId();
    
    try {
      // Step 1: Reserve inventory
      await this.inventoryService.reserveItems(orderData.items, sagaId);
      
      // Step 2: Process payment
      await this.paymentService.processPayment(orderData.payment, sagaId);
      
      // Step 3: Create order
      const order = await this.orderService.createOrder(orderData, sagaId);
      
      // Step 4: Send confirmation
      await this.notificationService.sendConfirmation(order, sagaId);
      
      return order;
    } catch (error) {
      // Compensate in reverse order
      await this.compensate(sagaId, error);
      throw error;
    }
  }
  
  private async compensate(sagaId: string, error: Error) {
    await this.notificationService.cancelConfirmation(sagaId);
    await this.orderService.cancelOrder(sagaId);
    await this.paymentService.refundPayment(sagaId);
    await this.inventoryService.releaseReservation(sagaId);
  }
}
\`\`\`

## Resilience Patterns

### Circuit Breaker
\`\`\`typescript
class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  
  constructor(
    private threshold: number = 5,
    private timeout: number = 60000
  ) {}
  
  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await fn();
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
    
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
    }
  }
}
\`\`\`

### Retry with Exponential Backoff
\`\`\`typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        break;
      }
      
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}
\`\`\`

## Monitoring and Observability

### Distributed Tracing
\`\`\`javascript
const opentelemetry = require('@opentelemetry/api');
const { NodeSDK } = require('@opentelemetry/auto-instrumentations-node');

// Initialize tracing
const sdk = new NodeSDK({
  serviceName: 'user-service',
  instrumentations: []
});

sdk.start();

// Custom span creation
const tracer = opentelemetry.trace.getTracer('user-service');

async function getUserById(id: string) {
  const span = tracer.startSpan('get-user-by-id');
  
  try {
    span.setAttributes({
      'user.id': id,
      'operation': 'database.query'
    });
    
    const user = await userRepository.findById(id);
    span.setStatus({ code: opentelemetry.SpanStatusCode.OK });
    return user;
  } catch (error) {
    span.recordException(error);
    span.setStatus({
      code: opentelemetry.SpanStatusCode.ERROR,
      message: error.message
    });
    throw error;
  } finally {
    span.end();
  }
}
\`\`\`

### Health Checks
\`\`\`typescript
interface HealthCheck {
  name: string;
  check(): Promise<boolean>;
}

class DatabaseHealthCheck implements HealthCheck {
  name = 'database';
  
  async check(): Promise<boolean> {
    try {
      await this.db.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }
}

class HealthService {
  constructor(private checks: HealthCheck[]) {}
  
  async getHealth() {
    const results = await Promise.all(
      this.checks.map(async check => ({
        name: check.name,
        healthy: await check.check()
      }))
    );
    
    const allHealthy = results.every(r => r.healthy);
    
    return {
      status: allHealthy ? 'healthy' : 'unhealthy',
      checks: results,
      timestamp: new Date().toISOString()
    };
  }
}
\`\`\`

## Deployment and DevOps

### Containerization
\`\`\`dockerfile
# Multi-stage build for Node.js service
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

### Kubernetes Deployment
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 3000
        env:
        - name: DB_HOST
          value: "user-db-service"
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
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
\`\`\`

## Best Practices

### Service Boundaries
- Align with business capabilities
- Minimize cross-service transactions
- Design for failure
- Keep services loosely coupled

### Data Consistency
- Embrace eventual consistency
- Use event sourcing where appropriate
- Implement compensation patterns
- Monitor data consistency

### Security
- Implement service-to-service authentication
- Use API gateways for external access
- Encrypt sensitive data
- Implement proper logging and auditing

## Conclusion

Microservices architecture offers significant benefits but requires careful design and implementation. Focus on proper service boundaries, robust communication patterns, and comprehensive monitoring to build successful distributed systems.`,
    author: "John Smith",
    publishDate: "2023-12-25",
    category: "Architecture",
    tags: ["Microservices", "Architecture", "Distributed Systems", "Design Patterns", "Scalability"],
    readTime: 20,
    image: "https://images.pexels.com/photos/11035365/pexels-photo-11035365.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    likes: 312,
    views: 5670,
    status: 'published',
    featured: true,
    comments: [
      {
        id: 10,
        author: "Jennifer Liu",
        content: "Comprehensive guide! The saga pattern example really helped me understand distributed transactions.",
        date: "2023-12-26",
        likes: 28
      },
      {
        id: 11,
        author: "Ahmed Hassan",
        content: "The circuit breaker implementation is exactly what I was looking for. Great practical examples!",
        date: "2023-12-27",
        likes: 19
      }
    ]
  }
];

export const categories = [
  { id: 1, name: 'Web Development', slug: 'web-development', color: '#3B82F6', articleCount: 2 },
  { id: 2, name: 'React', slug: 'react', color: '#10B981', articleCount: 1 },
  { id: 3, name: 'Backend', slug: 'backend', color: '#F59E0B', articleCount: 1 },
  { id: 4, name: 'CSS', slug: 'css', color: '#8B5CF6', articleCount: 1 },
  { id: 5, name: 'Machine Learning', slug: 'machine-learning', color: '#EF4444', articleCount: 1 },
  { id: 6, name: 'DevOps', slug: 'devops', color: '#06B6D4', articleCount: 1 },
  { id: 7, name: 'TypeScript', slug: 'typescript', color: '#3B82F6', articleCount: 1 },
  { id: 8, name: 'Architecture', slug: 'architecture', color: '#10B981', articleCount: 1 }
];