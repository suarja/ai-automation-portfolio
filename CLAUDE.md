# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start Next.js dev server on localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture Overview

This is a **Next.js 15 portfolio application** focused on simplicity and modularity. It serves as a general tech portfolio with a bento-style layout showcasing projects, resources, blog posts, and professional profile.

### Current Architecture (SIMPLIFIED)

**Philosophy:** Keep it simple, modular, and maintainable.

The application uses a **simplified JSON-based architecture**:

**Key Principle:** Direct JSON file operations for content management.

```typescript
// ✅ CORRECT - Simple direct access
import { ProjectService } from '@/lib/services/projectService';
const projects = await ProjectService.listProjects();

// Alternative: API routes for client-side fetching
const response = await fetch('/api/projects');
const data = await response.json();
```

### Data Flow

1. Frontend hooks (`use-projects.ts`, `use-resources.ts`) → API routes
2. API routes (`/api/projects`, `/api/resources`) → Service layer
3. Services read from JSON files in `public/data/`
4. Blog posts use MDX files with Next.js native support

**Note:** Legacy Redis/MCP infrastructure exists in the codebase but is **disabled**. Do not remove it, but do not use it for new features.

### Service Layer (Active)

**Primary Services:**
- `lib/services/projectService.ts` - Project CRUD with JSON files
- `lib/services/resourceService.ts` - Resource CRUD with JSON files
- `lib/services/fileOperations.ts` - Atomic file operations with copy-on-write pattern

**Blog (MDX):**
- Blog posts stored as `.mdx` files
- Next.js native MDX support for rendering
- File-based routing in `app/blog/[slug]/`

### Content Sections

The portfolio is organized into four main sections:

1. **Projects** - Tech project case studies
2. **Resources** - Shared tools, templates, and downloads
3. **Blog** - Technical articles, tutorials, reflections (MDX-based)
4. **About/Skills** - Professional profile and technical skills

### Legacy Infrastructure (DISABLED - Do Not Use)

The following systems exist in the codebase but are **disabled**. Keep them for now, but do not use for new features:

- `lib/services/hybridDataService.ts` - Hybrid Redis/JSON layer
- `lib/services/redis/*` - Redis service implementations
- `lib/redis/*` - Redis client and feature flags
- `app/api/mcp/route.ts` - MCP integration endpoint

**Why disabled?** Project direction changed to simplify architecture and focus on portfolio functionality rather than complex data migration.

### API Routes Structure

```
app/api/
├── projects/
│   ├── route.ts              # GET /api/projects
│   └── [slug]/route.ts       # GET/PUT/DELETE single project
├── resources/
│   ├── route.ts              # GET /api/resources
│   └── [slug]/route.ts       # GET/PUT/DELETE single resource
└── (legacy endpoints - disabled)
    ├── mcp/                  # MCP integration (not used)
    ├── migration/            # Redis migration (not used)
    └── test-hybrid/          # Testing endpoint (not used)
```

All active API routes follow this pattern:
1. Import appropriate service (`ProjectService`, `ResourceService`)
2. Call service methods to read/write JSON files
3. Return standardized `ApiResponse` format
4. Handle errors with proper HTTP status codes

### Data Storage

**Current Approach:** JSON files in `public/data/`

```
public/data/
├── projects.json    # All project data
└── resources.json   # All resource data
```

**Blog Approach:** MDX files with Next.js

```
app/blog/
├── posts/           # MDX files for blog posts
│   ├── post-1.mdx
│   └── post-2.mdx
└── [slug]/
    └── page.tsx     # Dynamic blog post page
```

**File Operations:**
- Atomic writes using copy-on-write pattern
- SHA256 checksums for integrity
- Automatic backup on modification
- Rollback capability on errors

### Frontend Structure

**Component Organization:**
```
components/
├── ui/               # Radix UI components (Shadcn)
├── project-card.tsx  # Project display component
├── resource-card.tsx # Resource display component
└── [...]

hooks/
├── use-projects.ts   # Project data fetching
└── use-resources.ts  # Resource data fetching
```

**Data Fetching Pattern:**
- Hooks fetch from API routes (not direct file access)
- API routes use JSON services (`ProjectService`, `ResourceService`)
- All responses use standardized `ApiResponse<T>` format

### Data Models

**Project Type:**
```typescript
interface Project {
  id: string;          // Also acts as slug
  title: string;
  result: string;
  tags: string[];
  image: string;
  client: { type, size, objective };
  challenge: string;
  solution: { description, tools[], features[], screenshots[] };
  testimonial: { text, author, avatar };
  results: string[];
  insight: { title, text, resourceLink? };
  metadata: { createdAt, updatedAt, featured, status };
}
```

**Resource Type:**
```typescript
interface Resource {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  price: string;
  downloadLink: string;
  gallery: string[];
  metadata: { createdAt, updatedAt, featured, status, downloadCount? };
}
```

**Blog Post Type (MDX):**
```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  featured: boolean;
  coverImage?: string;
}
```

## Code Style & Conventions

From `.cursor/rules`:

**Code Quality:**
- Maximum 150 lines per file - refactor if exceeded
- Functional, declarative programming (avoid OOP and classes)
- Semantic variable naming with auxiliary verbs (`isLoading`, `hasError`)
- Lowercase with dashes for files/directories (`auth-wizard`)
- DRY principles
- Named exports for components

**Next.js 15 Conventions:**
- Use App Router and React Server Components (RSC)
- Zustand for state management in client components
- Shadcn UI: `npx shadcn@latest add` for new components
- Mobile-first responsive design
- Minimize `use client` - prefer server-side logic
- PWA structure

**Error Handling:**
- Guard clauses at function start
- If-return patterns to reduce nesting
- Zod for schema validation
- Proper error logging with user-friendly messages

## Important Rules When Modifying

1. **Keep it simple** - Favor straightforward solutions over complex abstractions
2. **Use JSON services directly** - No need for hybrid layers or Redis
3. **Don't remove legacy code** - Redis/MCP code is disabled but kept for reference
4. **Modular design** - Each section (Projects, Resources, Blog, About) should be independent
5. **Bento-style UI** - Maintain the card-based layout that works well
6. **MDX for blog** - Use Next.js native MDX support, no custom markdown parser needed

## Current Implementation Status

**Active Features:**
- ✅ Projects section with JSON data
- ✅ Resources section with JSON data
- ✅ Bento-style card layout
- ✅ Dark theme support
- ⚠️ Blog section (to be implemented with MDX)
- ⚠️ About/Skills section (to be added)

**Disabled/Legacy (Do Not Use):**
- ❌ Redis data layer
- ❌ HybridDataService
- ❌ MCP integration
- ❌ Migration scripts and feature flags

**Critical Files for Data Operations:**
1. `lib/services/projectService.ts` - Project data management
2. `lib/services/resourceService.ts` - Resource data management
3. `lib/services/fileOperations.ts` - Safe file read/write
4. `app/api/*/route.ts` - API endpoints
5. `hooks/use-*.ts` - Frontend data fetching
6. `public/data/*.json` - Content storage

## Project Documentation System

The repository uses a comprehensive documentation system in `ProjectDocs/`:

```
ProjectDocs/
├── Build_Notes/
│   ├── active/      # Current development tasks
│   ├── completed/   # Finished tasks
│   └── archived/    # Deprecated notes
└── contexts/
    ├── projectContext.md  # Master project overview
    └── [feature]Flow.md   # Feature-specific flows
```

When working on significant features, reference these documentation files for context.

## Adding New Features

### To Add a New Blog Post:
1. Create an MDX file in `app/blog/posts/`
2. Add frontmatter with metadata (title, date, tags, etc.)
3. Write content using MDX (Markdown + React components)
4. Blog listing page will auto-discover new posts

### To Add a New Project/Resource:
1. Add entry to `public/data/projects.json` or `resources.json`
2. Include all required fields (see Data Models above)
3. Changes reflected immediately on next build

### To Modify UI Components:
1. Components in `components/` follow functional patterns
2. Use Shadcn UI for new components: `npx shadcn@latest add [component]`
3. Keep files under 150 lines - refactor if exceeded
4. Maintain mobile-first responsive design

## Deployment Notes

**Platform:** Vercel

**Build Process:**
- Static generation for most pages
- API routes run as serverless functions
- MDX compilation at build time

**Environment Variables:**
Currently none required (Redis variables can be ignored)

**Important:**
- JSON files in `public/data/` are part of the build
- Content changes require redeployment
- For future: consider CMS integration if frequent updates needed
