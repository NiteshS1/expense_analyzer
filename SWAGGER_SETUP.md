# Swagger API Documentation Setup

## Overview
Swagger/OpenAPI documentation has been successfully integrated into the Expense Analyzer application. The documentation provides an interactive interface to explore and test your API endpoints.

## What Was Added

### 1. Dependencies
The following packages were installed:
- `swagger-jsdoc` - Generates Swagger/OpenAPI specification from JSDoc comments
- `swagger-ui-express` - Serves Swagger UI for interactive API documentation
- `@types/swagger-jsdoc` (dev) - TypeScript type definitions
- `@types/swagger-ui-express` (dev) - TypeScript type definitions

### 2. New Files
- **`src/config/swagger.ts`** - Swagger configuration and OpenAPI specification
  - Defines API info, servers, security schemes
  - Includes schemas for User, SignupRequest, LoginRequest, and response types
  - Configures which files to scan for Swagger annotations

### 3. Modified Files
- **`src/app.ts`** - Added Swagger UI middleware
  - Imported `swagger-ui-express` and `swaggerSpec`
  - Added route `/api-docs` to serve Swagger UI

- **`src/features/auth/routes/auth.routes.ts`** - Added JSDoc annotations
  - Documented `/signup` endpoint
  - Documented `/login` endpoint
  - Documented `/me` endpoint with Bearer authentication

## How to Access

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:4000/api-docs
   ```

3. You'll see the Swagger UI interface with all documented endpoints.

## How to Use Swagger UI

### Testing Endpoints

1. **Signup (POST /v1/auth/signup)**
   - Click on the endpoint to expand it
   - Click "Try it out"
   - Edit the request body with user details
   - Click "Execute" to test the endpoint

2. **Login (POST /v1/auth/login)**
   - Click on the endpoint to expand it
   - Click "Try it out"
   - Edit the request body with credentials
   - Click "Execute" to get a JWT token

3. **Get User Info (GET /v1/auth/me)**
   - First, obtain a token from the login endpoint
   - Click on the 🔓 lock icon at the top right (or on the endpoint)
   - Enter: `Bearer YOUR_JWT_TOKEN` (with the word "Bearer" and a space)
   - Click "Authorize"
   - Now you can execute the `/me` endpoint

## Adding Documentation to New Endpoints

When you create new routes, add JSDoc comments above them:

```typescript
/**
 * @swagger
 * /v1/your-route:
 *   post:
 *     summary: Brief description
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success response
 */
router.post('/your-route', controller.yourHandler);
```

## Schema Definitions

The following schemas are predefined in `swagger.ts`:
- **User** - User object structure
- **SignupRequest** - Registration payload
- **LoginRequest** - Login payload
- **SuccessResponse** - Generic success response
- **ErrorResponse** - Generic error response
- **LoginResponse** - Login success with token

You can add more schemas in the `components.schemas` section of `swagger.ts`.

## Configuration

The Swagger configuration in `src/config/swagger.ts` includes:
- API title, version, and description
- Server URL (automatically uses your PORT from config)
- Bearer authentication scheme for JWT
- File patterns to scan for annotations: `./src/features/**/routes/*.ts`

## Benefits

✅ Interactive API documentation
✅ Try endpoints directly from browser
✅ Automatic request/response validation
✅ Schema definitions for type safety
✅ Authentication testing with JWT tokens
✅ No changes to existing application logic

## Notes

- Swagger UI is accessible at `/api-docs` endpoint
- All existing functionality remains unchanged
- Documentation is generated from JSDoc comments in route files
- The setup automatically scans route files for annotations

