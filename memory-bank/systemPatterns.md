# SYSTEM PATTERNS

## ARCHITECTURAL PATTERNS

### API-First Architecture

- **Pattern**: Separate data layer from presentation layer
- **Implementation**: Next.js API routes serving JSON data
- **Benefit**: Enables external access via MCP while maintaining internal consistency

### File-Based Data Storage

- **Pattern**: JSON files in `/public/data/` directory
- **Rationale**: Simple, no database complexity, version controllable
- **Structure**:
  ```
  /public/data/
    ├── projects.json
    ├── resources.json
    └── audit-log.json
  ```

### MCP Server Integration

- **Pattern**: Dedicated MCP server handling external requests
- **Location**: Separate process or serverless function
- **Communication**: HTTP/WebSocket with main application

## DATA FLOW PATTERNS

### Current State (Hardcoded)

```
Component → Hardcoded Data → Render
```

### Target State (API-Driven)

```
Component → API Call → JSON File → Response → Render
```

### MCP Integration Flow

```
MCP Client → MCP Server → API Endpoint → JSON File → Response Chain
```

## SECURITY PATTERNS

### API Authentication

- **Pattern**: Token-based authentication for write operations
- **Implementation**: Environment-based API keys
- **Scope**: Read operations public, write operations authenticated

### Input Validation

- **Pattern**: Schema validation using Zod
- **Application**: All API endpoints validate input structure
- **Error Handling**: Consistent error response format

### Audit Trail

- **Pattern**: Log all data modifications
- **Storage**: Separate audit log JSON file
- **Content**: Timestamp, action type, data changes, source (MCP/direct)

## PERFORMANCE PATTERNS

### Caching Strategy

- **Pattern**: File-system based caching for JSON data
- **Implementation**: Next.js built-in caching + manual cache invalidation
- **Invalidation**: On data modification via API

### Lazy Loading

- **Pattern**: Load project/resource details on demand
- **Implementation**: Dynamic imports for large content blocks
- **Benefit**: Faster initial page loads

## ERROR HANDLING PATTERNS

### Graceful Degradation

- **Pattern**: Fallback to cached/default data if API fails
- **Implementation**: Error boundaries with fallback UI
- **User Experience**: No broken states, always show some content

### Progressive Enhancement

- **Pattern**: Core functionality works without JavaScript
- **Implementation**: Server-side rendering for all content
- **Benefit**: SEO and accessibility maintained

## DEVELOPMENT PATTERNS

### Type Safety

- **Pattern**: End-to-end TypeScript with shared interfaces
- **Implementation**:
  ```typescript
  interface Project {
    id: string;
    title: string;
    // ... other fields
  }
  ```

### API Route Structure

- **Pattern**: RESTful endpoints with standard HTTP methods
- **Structure**:
  ```
  /api/projects/          GET (list all)
  /api/projects/[id]      GET, PUT, DELETE (single project)
  /api/resources/         GET (list all)
  /api/resources/[id]     GET, PUT, DELETE (single resource)
  ```

### Environment Configuration

- **Pattern**: Environment-specific configuration
- **Implementation**:
  ```
  MCP_SERVER_URL=process.env.MCP_SERVER_URL
  API_SECRET_KEY=process.env.API_SECRET_KEY
  ```

## TESTING PATTERNS

### API Testing

- **Pattern**: Unit tests for each API endpoint
- **Tools**: Jest + Supertest for HTTP testing
- **Coverage**: CRUD operations, error cases, validation

### MCP Integration Testing

- **Pattern**: Mock MCP server for testing
- **Implementation**: Test doubles for external MCP calls
- **Scenarios**: Connection failures, data sync validation

## DEPLOYMENT PATTERNS

### Stateless Deployment

- **Pattern**: All state in JSON files, no database connections
- **Benefit**: Simple Vercel deployment, no external dependencies
- **Scaling**: Horizontal scaling possible

### Configuration Management

- **Pattern**: Environment variables for all external connections
- **Security**: API keys and URLs not hardcoded
- **Flexibility**: Different configurations per environment

## MONITORING PATTERNS

### API Monitoring

- **Pattern**: Log all API requests and responses
- **Implementation**: Next.js built-in logging + custom middleware
- **Alerts**: Monitor for unusual patterns or errors

### MCP Health Checks

- **Pattern**: Regular connectivity tests to MCP server
- **Implementation**: Health check endpoint returning system status
- **Fallback**: Graceful degradation if MCP unavailable
