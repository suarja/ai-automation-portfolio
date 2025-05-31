import path from "path";

// File paths for JSON data storage
export const DATA_DIR = path.join(process.cwd(), "public", "data");
export const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
export const RESOURCES_FILE = path.join(DATA_DIR, "resources.json");
export const AUDIT_FILE = path.join(DATA_DIR, "audit.json");

// MCP configuration
export const MCP_CONFIG = {
  basePath: "/api",
  maxDuration: 60,
  verboseLogs: true,
} as const;

// File operation configuration
export const FILE_OPERATIONS = {
  maxRetries: 3,
  retryDelay: 100, // milliseconds
  backupRetention: 5, // number of backup files to keep
} as const;

// Validation constants
export const VALIDATION = {
  maxTitleLength: 200,
  maxDescriptionLength: 1000,
  maxTagsCount: 10,
  maxScreenshotsCount: 10,
  maxGalleryCount: 20,
} as const;
