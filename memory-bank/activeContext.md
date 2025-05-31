# ACTIVE CONTEXT

## CURRENT PROJECT STATE

**Date**: PLAN Phase - Frontend Integration  
**Mode**: PLAN → IMPLEMENT Transition  
**Status**: Level 3 Frontend Refactoring Planning

## IMMEDIATE OBJECTIVES

1. **MCP Backend**: ✅ COMPLETED and tested with inspector client
2. **Current Phase**: PLAN mode for frontend refactoring with hybrid approach
3. **Focus**: Create API routes and refactor frontend to use dynamic data while preserving feature requests

## FRONTEND REFACTORING CONTEXT

### Problem Statement

**Current Issue**: Frontend still uses hardcoded data despite working MCP backend

- Main page has hardcoded ResourceCard and ProjectCard components
- Project detail pages use static data objects
- Resource detail pages use static data objects
- No integration between frontend and the JSON files we created

### Solution: Hybrid Approach

**Goal**: Combine API data (from JSON files) + static "feature request" items

- Load real projects/resources from `/public/data/*.json` via API routes
- Append hardcoded items marked with `featureRequest={true}`
- Maintain identical UX while making data dynamic
- Preserve feature request modal functionality

## ARCHITECTURAL APPROACH

### Data Sources Strategy:

```
Frontend Data Flow:
├── Primary: Internal API Routes
│   ├── /api/projects → Published projects from JSON
│   ├── /api/resources → Published resources from JSON
│   ├── /api/projects/[slug] → Single project lookup
│   └── /api/resources/[slug] → Single resource lookup
└── Secondary: Static Feature Request Data
    ├── Feature request projects (hardcoded)
    └── Feature request resources (hardcoded)
```

### Implementation Layers:

1. **API Routes** (not MCP - internal consumption only)
2. **React Hooks** for data fetching with hybrid merging
3. **Static Data Extraction** to constants file
4. **Component Updates** to use dynamic data sources

## CURRENT ANALYSIS COMPLETE

### Frontend Structure:

**Main Page (`app/page.tsx`)**:

- 6 ResourceCard components (2 real + 4 featureRequest)
- 4 ProjectCard components (1 real + 3 featureRequest)
- All data currently hardcoded in JSX

**Detail Pages**:

- Project page: hardcoded `projects` object with 2 complete projects
- Resource page: hardcoded `resources` object with 3 complete resources

**Components**:

- ✅ ProjectCard: supports `featureRequest` prop
- ✅ ResourceCard: supports `featureRequest` prop
- Both components ready for dynamic props

## HYBRID DATA MERGING STRATEGY

### Data Priority:

1. **API Data First**: Load published items from JSON files
2. **Feature Requests Second**: Append static placeholder items
3. **Seamless UX**: User sees no difference in behavior
4. **Flexible Content**: Mix of real and preview content

### Feature Request Preservation:

- Items with `featureRequest={true}` trigger modals instead of navigation
- Maintain exact same visual styling and interactions
- Preserve all current functionality without changes

## IMPLEMENTATION PHASES READY

### Phase 1: Internal API Routes ✅ READY

Create 4 API routes that use existing ProjectService and ResourceService:

- `GET /api/projects` - list all published projects
- `GET /api/projects/[slug]` - single project by ID
- `GET /api/resources` - list all published resources
- `GET /api/resources/[slug]` - single resource by ID

### Phase 2: React Hooks ✅ READY

Create custom hooks for data fetching:

- `useProjects()` - fetch and merge API + feature request projects
- `useResources()` - fetch and merge API + feature request resources
- `useProject(slug)` - single project with fallback to hardcoded
- `useResource(slug)` - single resource with fallback to hardcoded

### Phase 3: Static Data Extraction ✅ READY

Extract hardcoded feature request items to:

- `lib/data/feature-requests.ts` - all static placeholder data
- Maintain exact structure matching API interfaces
- Add `featureRequest: true` flags for identification

### Phase 4: Frontend Updates ✅ READY

Update 3 main files to use hooks instead of hardcoded data:

- Homepage: replace hardcoded cards with hook data
- Project page: use `useProject(slug)` hook
- Resource page: use `useResource(slug)` hook

### Phase 5: Testing ✅ READY

Comprehensive validation:

- All current content still displays correctly
- Feature request modals still work
- Navigation functions properly
- Loading states are smooth
- Error handling is graceful

## TECHNICAL SPECIFICATIONS

### API Response Format:

Using existing `ApiResponse<T>` interface for consistency with MCP endpoints.

### Hook Patterns:

Standard React patterns with loading states, error handling, and refetch capabilities.

### Performance Considerations:

- Client-side rendering with loading states
- Proper error boundaries
- Efficient data merging
- Maintained static generation where possible

## SUCCESS CRITERIA

### Must Preserve:

- ✅ **Identical UI/UX**: No visual or behavioral changes
- ✅ **Feature Request Functionality**: Modals work exactly the same
- ✅ **Performance**: No noticeable slowdown
- ✅ **SEO**: Maintain current search optimization

### Must Achieve:

- ✅ **Dynamic Data**: Projects and resources loaded from JSON files
- ✅ **Hybrid System**: API data + feature request items combined
- ✅ **Type Safety**: Full TypeScript coverage maintained
- ✅ **Error Handling**: Graceful fallbacks and loading states

## NEXT IMMEDIATE ACTION

**Ready to start IMPLEMENT phase** with Phase 1: Create internal API routes that leverage our existing service layer.

The plan provides a clear, well-scoped approach to complete the integration loop while preserving all current functionality and user experience.
