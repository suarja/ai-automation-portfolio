# PROJECT BRIEF

## PROJECT OVERVIEW

**Project Name**: Site Personnel - Portfolio & Automation Showcase  
**Current Status**: Active Next.js 15 portfolio website  
**Objective**: Integrate MCP (Model Context Protocol) and refactor data management to showcase automation capabilities

## CURRENT ARCHITECTURE

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with Radix UI components
- **Content Structure**:
  - Projects showcase with hardcoded data
  - Resources/templates section with hardcoded data
  - Dynamic routes: `/projects/[slug]` and `/resources/[slug]`
- **Current Data Location**: Hardcoded in component files (no database)

## TARGET FEATURES TO IMPLEMENT

### 1. MCP Integration

- **Goal**: Integrate Model Context Protocol to enable remote access to projects and resources
- **Purpose**: Showcase the "magic" of remote data manipulation through AI clients (Claude, etc.)

### 2. API Endpoints Refactoring

- **Current State**: Projects and resources data hardcoded in React components
- **Target State**:
  - Move data to JSON files in `/public` folder (no database required)
  - Create API endpoints for CRUD operations
  - Maintain dynamic routes but fetch data via API

### 3. Showcase Features

**Feature 1: Remote Data Retrieval**

- Demonstrate retrieving projects and resources through MCP clients
- Show real-time data access from external AI tools

**Feature 2: Remote Data Updates**

- Demonstrate updating projects and resources remotely through MCP
- Show the "magic" of remote content management via AI

## TECHNICAL CONSTRAINTS

- **No Database**: Keep it simple with JSON files for data storage
- **Maintain UI**: Preserve current design and user experience
- **Show Value**: Focus on demonstrating automation and remote access capabilities

## SUCCESS CRITERIA

- MCP integration working with external clients (Claude, etc.)
- API endpoints for projects and resources CRUD operations
- Ability to demonstrate remote data retrieval and updates
- Seamless user experience maintained
- Clear showcase of automation "magic"

## PROJECT COMPLEXITY

**Assessment**: Level 3 (Intermediate Feature)

- Requires architectural planning for MCP integration
- API design and implementation
- Data migration from hardcoded to API-driven
- Multiple interconnected components
