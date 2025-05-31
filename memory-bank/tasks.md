# TASKS - CURRENT PROGRESS

## CURRENT TASK: PLAN Mode - Frontend Refactoring with Hybrid Data Approach

### PLAN MODE STATUS

- **Previous Phase**: ✅ IMPLEMENT Mode Complete (MCP backend working)
- **Current Phase**: 🔄 PLAN Mode - Frontend Integration Planning
- **Complexity Level**: 3 (Intermediate Feature)
- **Focus**: Refactor frontend to use API data with hybrid approach for feature requests

---

## 🎯 FRONTEND REFACTORING OBJECTIVE

**MCP Backend Status**: ✅ Working and tested with inspector client
**Current Issue**: Frontend still uses hardcoded data in pages and main home page
**Goal**: Create hybrid system combining API data + hardcoded "feature request" items

### TARGET FEATURES FOR HYBRID APPROACH

1. **Dynamic Data Loading**: Load projects and resources from JSON files via API
2. **Feature Request Preservation**: Keep hardcoded items marked with `featureRequest={true}`
3. **Seamless UX**: Maintain identical user experience while making data dynamic
4. **Flexible Content**: Allow mixture of real and preview content

---

## 📋 FRONTEND ANALYSIS COMPLETE

### Current Data Flow Discovered:

**Main Page (`app/page.tsx`)**:

- ✅ **Resources Section**: 6 ResourceCard components (2 real + 4 featureRequest)
- ✅ **Projects Section**: 4 ProjectCard components (1 real + 3 featureRequest)
- ❌ **Issue**: All data is hardcoded directly in JSX

**Project Detail Page (`app/projects/[slug]/page.tsx`)**:

- ✅ **Data Source**: Hardcoded `projects` object with 2 complete projects
- ❌ **Issue**: Static data lookup, no API integration

**Resource Detail Page (`app/resources/[slug]/page.tsx`)**:

- ✅ **Data Source**: Hardcoded `resources` object with 3 complete resources
- ❌ **Issue**: Static data lookup, no API integration

### Component Analysis:

**ProjectCard Component**:

- ✅ **Feature Request Support**: `featureRequest` prop triggers modal instead of navigation
- ✅ **Dynamic Ready**: Can accept data from props

**ResourceCard Component**:

- ✅ **Feature Request Support**: `featureRequest` prop triggers modal instead of navigation
- ✅ **Dynamic Ready**: Can accept data from props

---

## 🏗️ HYBRID ARCHITECTURE DESIGN

### Data Layer Strategy:

```
Client Data Sources:
├── API Data (Primary)
│   ├── /api/projects → JSON file data
│   └── /api/resources → JSON file data
└── Static Data (Secondary)
    ├── Feature Request Projects
    └── Feature Request Resources
```

### API Endpoints to Create:

1. **`/api/projects`** - Internal API route (not MCP)

   - Returns published projects from `/public/data/projects.json`
   - Used by frontend for data fetching

2. **`/api/resources`** - Internal API route (not MCP)

   - Returns published resources from `/public/data/resources.json`
   - Used by frontend for data fetching

3. **`/api/projects/[slug]`** - Single project by ID

   - Returns specific project or 404

4. **`/api/resources/[slug]`** - Single resource by ID
   - Returns specific resource or 404

### Hybrid Data Merging Strategy:

```typescript
// Example for homepage resources
const apiResources = await fetch("/api/resources").then((r) => r.json());
const featureRequestResources = staticFeatureRequestData;
const allResources = [...apiResources, ...featureRequestResources];
```

---

## 📝 IMPLEMENTATION PLAN

### Phase 1: API Routes Creation ✅ READY

**Create Internal API Routes** (not MCP, for frontend consumption):

1. **`app/api/projects/route.ts`**:

   - GET handler using ProjectService.listProjects()
   - Filter only published projects
   - Return standardized API response

2. **`app/api/projects/[slug]/route.ts`**:

   - GET handler using ProjectService.getProject(slug)
   - Return single project or 404
   - Handle not found gracefully

3. **`app/api/resources/route.ts`**:

   - GET handler using ResourceService.listResources()
   - Filter only published resources
   - Return standardized API response

4. **`app/api/resources/[slug]/route.ts`**:
   - GET handler using ResourceService.getResource(slug)
   - Return single resource or 404
   - Handle not found gracefully

### Phase 2: Data Fetching Hooks ✅ READY

**Create React Hooks for Data Fetching**:

1. **`hooks/use-projects.ts`**:

   - Custom hook for fetching all projects
   - Handle loading states and errors
   - Return combined API + feature request data

2. **`hooks/use-resources.ts`**:

   - Custom hook for fetching all resources
   - Handle loading states and errors
   - Return combined API + feature request data

3. **`hooks/use-project.ts`**:

   - Custom hook for single project by slug
   - Fallback to hardcoded if not found in API

4. **`hooks/use-resource.ts`**:
   - Custom hook for single resource by slug
   - Fallback to hardcoded if not found in API

### Phase 3: Static Data Extraction ✅ READY

**Extract Feature Request Data to Constants**:

1. **`lib/data/feature-requests.ts`**:

   - Extract all hardcoded feature request projects
   - Extract all hardcoded feature request resources
   - Maintain exact same structure as API data

2. **Data Mapping**:
   - Ensure feature request items have `featureRequest: true` flag
   - Match interface structure with API data
   - Preserve all current functionality

### Phase 4: Frontend Refactoring ✅ READY

**Update Components to Use Dynamic Data**:

1. **Homepage (`app/page.tsx`)**:

   - Replace hardcoded ResourceCard with data from useResources hook
   - Replace hardcoded ProjectCard with data from useProjects hook
   - Implement loading states

2. **Project Page (`app/projects/[slug]/page.tsx`)**:

   - Replace hardcoded projects object with useProject hook
   - Handle loading and error states
   - Maintain exact same UI/UX

3. **Resource Page (`app/resources/[slug]/page.tsx`)**:
   - Replace hardcoded resources object with useResource hook
   - Handle loading and error states
   - Maintain exact same UI/UX

### Phase 5: Testing & Validation ✅ READY

**Comprehensive Testing**:

1. **Data Integrity**: Verify all existing projects/resources still display
2. **Feature Requests**: Ensure featureRequest items still trigger modals
3. **Navigation**: Test all project and resource links work correctly
4. **Loading States**: Verify smooth loading experience
5. **Error Handling**: Test 404 pages and error scenarios

---

## 🔧 TECHNICAL SPECIFICATIONS

### API Response Format:

```typescript
// Consistent with existing ApiResponse interface
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    timestamp: string;
    total?: number;
  };
}
```

### Hook Return Format:

```typescript
interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}
```

### Data Merging Priority:

1. **API Data First**: Always load from JSON files via API
2. **Feature Requests Second**: Append static feature request items
3. **Sorting**: Maintain current display order (featured first, then chronological)
4. **Filtering**: Support tag-based filtering across both data sources

---

## ⚠️ CRITICAL CONSIDERATIONS

### Preserving Current UX:

- ✅ **No Visual Changes**: UI must remain identical
- ✅ **Same Performance**: No noticeable loading delays
- ✅ **Feature Request Behavior**: Modal triggering must work exactly the same
- ✅ **SEO**: Maintain static generation where possible

### Error Handling Strategy:

- **API Unavailable**: Fallback to showing only feature request items
- **Invalid Data**: Skip malformed items, log errors
- **Network Issues**: Show loading state, retry mechanism
- **404 Pages**: Graceful handling with proper error messages

### Performance Optimizations:

- **Static Generation**: Pre-fetch data at build time where possible
- **Caching**: Implement proper cache headers for API routes
- **Lazy Loading**: Load project/resource details on demand
- **Error Boundaries**: Prevent crashes from API failures

---

## 🎯 SUCCESS CRITERIA

### Functional Requirements:

- [ ] All current projects display correctly (2 from API + feature requests)
- [ ] All current resources display correctly (3 from API + feature requests)
- [ ] Project detail pages work for both API and feature request items
- [ ] Resource detail pages work for both API and feature request items
- [ ] Feature request modals trigger correctly
- [ ] Navigation and routing work seamlessly

### Technical Requirements:

- [ ] Clean separation between API data and static data
- [ ] Proper error handling and loading states
- [ ] Type safety maintained throughout
- [ ] No performance degradation
- [ ] MCP backend remains unaffected

### UX Requirements:

- [ ] Identical visual appearance
- [ ] Same interaction patterns
- [ ] Smooth loading experience
- [ ] Proper error messaging
- [ ] Maintained accessibility

---

## 📊 COMPLEXITY ASSESSMENT

**Task Complexity**: Level 3 (Intermediate Feature)

- **Data Integration**: Medium complexity (hybrid approach)
- **Frontend Refactoring**: Medium complexity (4 main components)
- **API Creation**: Low complexity (CRUD operations)
- **Testing Requirements**: Medium complexity (comprehensive validation)

**Estimated Implementation**:

- **Phase 1**: API Routes - 1 hour
- **Phase 2**: React Hooks - 1 hour
- **Phase 3**: Static Data - 30 minutes
- **Phase 4**: Frontend Updates - 2 hours
- **Phase 5**: Testing - 1 hour
- **Total**: ~5.5 hours

**Risk Level**: Low (well-defined requirements, existing patterns)

---

## 🚀 NEXT STEPS

1. **Immediate**: Start Phase 1 - Create internal API routes
2. **Priority**: Maintain exact UX while adding flexibility
3. **Focus**: Clean hybrid data merging strategy
4. **Goal**: Seamless transition from static to dynamic data

**Ready to proceed** with IMPLEMENT phase when user confirms the plan approach.
