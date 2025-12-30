# Legacy API Routes

This folder contains **disabled** API routes from the previous architecture.

## Why disabled?

The project architecture has been simplified to focus on:
- Direct JSON file operations
- MDX-based blog
- Portfolio functionality

## What's here?

- `mcp/` - MCP integration endpoint (not used anymore)
- `migration/` - Redis migration utilities (migration complete/abandoned)
- `test-hybrid/` - Testing endpoint for hybrid data service (no longer needed)

## Should I delete these?

**NO** - Keep these files for reference. They demonstrate:
- How to implement MCP with Next.js
- Redis integration patterns
- Feature flag systems
- Hybrid data architecture

If you need to reference the Redis/MCP implementation in the future, it's all here.

## Can I use these routes?

These routes are **disabled** because they're in the `_legacy` folder (Next.js ignores folders starting with `_`). If you need to re-enable any of them, move them back to `app/api/`.
