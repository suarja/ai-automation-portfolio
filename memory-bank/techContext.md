# TECHNICAL CONTEXT

## CURRENT TECHNOLOGY STACK

### Frontend Framework

- **Next.js 15**: Latest version with App Router
- **React 19**: Latest React version with new features
- **TypeScript 5**: Full type safety across application

### Styling & UI

- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library for consistent iconography

### Build & Development

- **PostCSS**: CSS processing pipeline
- **ESLint**: Code linting and formatting
- **Package Manager**: Yarn (with fallback to npm/pnpm)

### Current Dependencies Analysis

```json
{
  "next": "15.2.4",
  "react": "^19",
  "typescript": "^5",
  "tailwindcss": "^3.4.17",
  "zod": "^3.24.1",
  "@radix-ui/*": "Latest versions"
}
```

## MCP INTEGRATION REQUIREMENTS

### MCP Server Technology

- **Language**: Node.js/TypeScript (to match existing stack)
- **Protocol**: HTTP/WebSocket for real-time communication
- **Framework**: Express.js or Fastify for HTTP server

### MCP Dependencies to Add

```json
{
  "@modelcontextprotocol/sdk": "latest",
  "@types/ws": "^8.x",
  "ws": "^8.x",
  "express": "^4.x",
  "cors": "^2.x"
}
```

### MCP Server Architecture

```
MCP Server Process
├── WebSocket Handler (real-time updates)
├── HTTP Routes (REST API compatibility)
├── Data Validation Layer (Zod schemas)
└── File System Operations (JSON read/write)
```

## API LAYER REQUIREMENTS

### New API Routes Structure

```
/api/
├── projects/
│   ├── route.ts (GET all projects)
│   └── [id]/
│       └── route.ts (GET, PUT, DELETE single project)
├── resources/
│   ├── route.ts (GET all resources)
│   └── [id]/
│       └── route.ts (GET, PUT, DELETE single resource)
├── mcp/
│   ├── health/
│   │   └── route.ts (MCP server health check)
│   └── sync/
│       └── route.ts (MCP data synchronization)
└── audit/
    └── route.ts (Audit log access)
```

### Data Validation Layer

- **Zod Schemas**: Already in project, expand for API validation
- **Runtime Validation**: All API inputs validated
- **Type Generation**: Shared types between client and server

## FILE SYSTEM ARCHITECTURE

### Data Storage Structure

```
/public/data/
├── projects.json          # Projects data store
├── resources.json         # Resources data store
├── audit-log.json        # Change tracking
└── metadata.json         # System metadata (last updated, etc.)
```

### File Access Patterns

- **Read Operations**: Direct file system access (fast)
- **Write Operations**: Atomic writes with backup
- **Concurrency**: File locking for write operations
- **Backup**: Automatic backup before modifications

## ENVIRONMENT CONFIGURATION

### Required Environment Variables

```bash
# MCP Configuration
MCP_SERVER_PORT=3001
MCP_SERVER_URL=http://localhost:3001
MCP_WEBSOCKET_PORT=3002

# API Security
API_SECRET_KEY=your-secret-key-here
MCP_AUTH_TOKEN=mcp-authentication-token

# Development
NODE_ENV=development|production
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### Security Configuration

- **API Authentication**: JWT or simple token-based
- **CORS Policy**: Configured for MCP client access
- **Rate Limiting**: Prevent abuse of write operations

## PERFORMANCE CONSIDERATIONS

### Caching Strategy

- **Static Generation**: Projects and resources pre-generated at build
- **Incremental Static Regeneration**: Rebuild pages when data changes
- **Client-Side Caching**: SWR or React Query for API calls

### File System Performance

- **JSON Parsing**: Async operations to prevent blocking
- **File Size Monitoring**: Alert if data files grow too large
- **Memory Management**: Stream large JSON files if needed

## DEVELOPMENT WORKFLOW

### Local Development Setup

1. Next.js dev server on port 3000
2. MCP server on port 3001
3. WebSocket server on port 3002
4. File watchers for JSON data changes

### Testing Strategy

- **Unit Tests**: Jest for API routes and MCP functions
- **Integration Tests**: Test MCP server connectivity
- **E2E Tests**: Playwright for full user flows
- **Load Testing**: Validate API performance under load

## DEPLOYMENT ARCHITECTURE

### Vercel Deployment (Recommended)

- **Main App**: Next.js deployed to Vercel
- **MCP Server**: Separate Vercel serverless function or external service
- **Data Storage**: JSON files in repository (version controlled)

### Alternative: Self-Hosted

- **Container**: Docker container with Node.js runtime
- **Process Management**: PM2 for MCP server process
- **Load Balancing**: Nginx for multiple instances

## MONITORING & OBSERVABILITY

### Logging Strategy

- **Application Logs**: Next.js built-in logging
- **MCP Server Logs**: Custom logging for all MCP operations
- **API Access Logs**: Track all data modifications
- **Error Tracking**: Sentry or similar for production errors

### Health Checks

- **API Health**: Simple ping endpoints
- **MCP Connectivity**: Regular connection tests
- **Data Integrity**: Periodic JSON validation
- **Performance Metrics**: Response time tracking

## SECURITY CONSIDERATIONS

### Data Protection

- **Input Sanitization**: All user inputs cleaned
- **SQL Injection**: N/A (no database)
- **XSS Prevention**: React's built-in protection + CSP headers
- **Authentication**: Token-based for write operations

### MCP Security

- **Client Authentication**: Verify MCP client identity
- **Operation Authorization**: Scope-based permissions
- **Audit Trail**: Log all external modifications
- **Rate Limiting**: Prevent abuse from external clients

## SCALABILITY PLANNING

### Current Limitations

- **File-based storage**: Single server limitations
- **Concurrent writes**: File locking required
- **Memory usage**: JSON files loaded into memory

### Future Scaling Options

- **Database migration**: When data grows beyond file limits
- **CDN Integration**: For global data distribution
- **Microservices**: Separate MCP server scaling
- **Caching Layer**: Redis for high-frequency operations
