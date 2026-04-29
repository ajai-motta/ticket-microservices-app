# Auth Service

A microservice for user authentication and authorization in the mini-microservices-boilerplate project. This service handles user registration, login, session management, and JWT-based authentication for the entire system.

## Overview

The Auth Service provides a secure authentication layer using JWT tokens and cookie-based sessions. It manages user accounts, password hashing, and provides endpoints for signup, signin, and signout operations.

**Technology Stack:**
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Session Management:** Cookie-session
- **Testing:** Jest & Supertest
- **Container:** Docker

## Features

- 🔐 **Secure User Registration** - Email validation and password strength requirements
- 🔑 **JWT-Based Authentication** - Stateless authentication with signed tokens
- 🍪 **Cookie Session Management** - Automatic session handling via cookies
- 🛡️ **Password Hashing** - Secure password storage using bcrypt
- 📧 **Email Validation** - Input validation for email addresses
- ✅ **Comprehensive Testing** - Unit and integration tests with Jest
- 🐳 **Docker Support** - Ready for containerized deployment
- 🔄 **Kubernetes Ready** - Includes k8s manifests for orchestration

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- MongoDB instance (local or cloud)
- Docker (optional, for containerization)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
export JWT_KEY="your-secret-jwt-key"
export MONGO_URI="mongodb://localhost:27017/auth"
export NODE_ENV="development"
```

### Development

```bash
# Start the development server with auto-reload
npm run dev

# Run tests in watch mode
npm run test

# Build TypeScript
npm run build

# Start the production server
npm start
```

The service will start on `http://localhost:3000`

## API Endpoints

### 1. User Signup

Create a new user account.

```http
POST /api/users/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response (201):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@example.com"
}
```

**Validation Rules:**
- Email must be a valid email address
- Password must be between 4-20 characters

**Sets Cookie:** `express:sess` containing JWT token

### 2. User Signin

Authenticate an existing user.

```http
POST /api/users/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@example.com"
}
```

**Validation Rules:**
- Email must be a valid email address
- Password cannot be empty

**Sets Cookie:** `express:sess` containing JWT token

**Error Responses:**
- `400 Bad Request` - "Invalid Credentials" (user not found or password mismatch)

### 3. Get Current User

Retrieve the authenticated user's information from the session.

```http
GET /api/users/currentuser
```

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@example.com"
}
```

**Response (401):** Returns empty object if not authenticated

### 4. User Signout

Terminate the user session.

```http
POST /api/users/signout
```

**Response (200):**
```json
{}
```

**Effect:** Clears the session cookie

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `JWT_KEY` | Secret key for signing JWT tokens | Yes | `your-super-secret-key` |
| `MONGO_URI` | MongoDB connection string | Yes | `mongodb://localhost:27017/auth` |
| `NODE_ENV` | Environment mode | No | `development`, `production`, `test` |

## Project Structure

```
auth/
├── src/
│   ├── index.ts              # Application entry point
│   ├── app.ts                # Express app configuration
│   ├── models/
│   │   └── user.ts           # Mongoose User model with schema
│   ├── routes/
│   │   ├── signup.ts         # POST /api/users/signup
│   │   ├── signin.ts         # POST /api/users/signin
│   │   ├── signout.ts        # POST /api/users/signout
│   │   ├── current-user.ts   # GET /api/users/currentuser
│   │   └── __test__/         # Route tests
│   └── generalPurpose/
│       └── password.ts       # Password hashing utilities
├── k8s/                      # Kubernetes deployment manifests
├── dist/                     # Compiled JavaScript output
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── jest.config.cjs           # Testing configuration
├── Dockerfile                # Container image definition
└── README.md                 # This file
```

## Database Schema

### User Collection

```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "password": "hashed_password_value"
}
```

**Notes:**
- Email is stored as-is (can be indexed for faster lookups)
- Password is automatically hashed before storage via Mongoose pre-save hook
- The `id` field is mapped from MongoDB's `_id` in JSON responses
- Password field is excluded from JSON responses

## Authentication Flow

1. **Signup:** User provides email and password → password is hashed → user stored in DB → JWT issued
2. **Signin:** User provides credentials → password verified against hash → JWT issued on success
3. **Session:** JWT stored in cookie (secure flag based on NODE_ENV) → included automatically in requests
4. **Currentuser:** Endpoint reads JWT from session cookie and returns user info
5. **Signout:** Session cookie is cleared

## Security Considerations

- ✅ **Password Hashing:** Uses bcrypt for secure password storage
- ✅ **JWT Signing:** Uses HS256 algorithm with a secret key
- ✅ **Cookie Security:** Secure flag enabled in production (HTTPS only)
- ✅ **Input Validation:** Express-validator used for email and password validation
- ✅ **CORS-Ready:** Can be configured with CORS middleware for specific origins
- ✅ **Proxy Trust:** Configured to trust X-Forwarded-* headers from ingress-nginx

## Testing

The service includes comprehensive tests using Jest and Supertest.

```bash
# Run all tests
npm run test

# Run tests in watch mode (default)
npm run test

# Run tests once
npm run test -- --watchAll=false
```

**Test Coverage:**
- Signup endpoint validation and user creation
- Signin authentication and error cases
- Signout session termination
- Current user retrieval
- Password hashing correctness

## Docker Deployment

### Build Image

```bash
docker build -t auth-service:latest .
```

### Run Container

```bash
docker run -p 3000:3000 \
  -e JWT_KEY="your-secret-key" \
  -e MONGO_URI="mongodb://host.docker.internal:27017/auth" \
  -e NODE_ENV="production" \
  auth-service:latest
```

### Production Entrypoint

In production, the Dockerfile runs `npm start` which executes the compiled JavaScript from the `dist` directory.

## Kubernetes Deployment

Kubernetes manifests are located in the `k8s/` directory for deploying to a Kubernetes cluster.

```bash
kubectl apply -f k8s/
```

## Dependencies

### Core Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT creation and verification
- **cookie-session** - Session middleware
- **express-validator** - Input validation

### Shared Dependencies
- **@ajaisgtickets/common** - Shared utilities, error handling, and middleware

### Dev Dependencies
- **typescript** - Type system
- **ts-node** - TypeScript execution
- **jest** - Testing framework
- **ts-jest** - Jest TypeScript support
- **supertest** - HTTP assertion library
- **nodemon** - Development auto-reload
- **mongodb-memory-server** - In-memory MongoDB for testing

## Troubleshooting

### "No env variable" Error
Ensure `JWT_KEY` environment variable is set before starting the service.

### "No mongo env variable" Error
Ensure `MONGO_URI` environment variable points to a valid MongoDB instance.

### Connection Refused to MongoDB
- Check MongoDB is running on the specified URI
- Verify network connectivity if using cloud MongoDB
- Check credentials if authentication is enabled

### Tests Failing
- Ensure MongoDB Memory Server can download the appropriate binary
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility (16+ recommended)

## Contributing

When contributing to this service:
1. Follow the existing code structure
2. Add tests for new endpoints
3. Update this README if adding features
4. Ensure all tests pass before submitting changes

## License

ISC
