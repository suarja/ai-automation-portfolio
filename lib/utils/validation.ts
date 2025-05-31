import { z } from "zod";
import { VALIDATION } from "./constants";

// Base validation schemas
export const ProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(VALIDATION.maxTitleLength),
  result: z.string().min(1),
  tags: z.array(z.string()).max(VALIDATION.maxTagsCount),
  image: z.string().min(1),
  client: z.object({
    type: z.string().min(1),
    size: z.string().min(1),
    objective: z.string().min(1),
  }),
  challenge: z.string().min(1),
  solution: z.object({
    description: z.string().min(1),
    tools: z.array(z.string()),
    features: z.array(z.string()),
    videoUrl: z.string().optional(),
    screenshots: z.array(z.string()).max(VALIDATION.maxScreenshotsCount),
    demoLink: z.string().optional(),
  }),
  description: z.string().min(1).max(VALIDATION.maxDescriptionLength),
  testimonial: z.object({
    text: z.string().min(1),
    author: z.string().min(1),
    avatar: z.string().min(1),
  }),
  results: z.array(z.string()),
  insight: z.object({
    title: z.string().min(1),
    text: z.string().min(1),
    resourceLink: z
      .object({
        text: z.string().min(1),
        url: z.string().url(),
      })
      .optional(),
  }),
  metadata: z.object({
    createdAt: z.string(),
    updatedAt: z.string(),
    featured: z.boolean(),
    status: z.enum(["published", "draft", "archived"]),
  }),
});

export const ResourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(VALIDATION.maxTitleLength),
  description: z.string().min(1),
  longDescription: z.string().min(1).max(VALIDATION.maxDescriptionLength),
  image: z.string().min(1),
  tags: z.array(z.string()).max(VALIDATION.maxTagsCount),
  price: z.string().min(1),
  downloadLink: z.string().url(),
  gallery: z.array(z.string()).max(VALIDATION.maxGalleryCount),
  metadata: z.object({
    createdAt: z.string(),
    updatedAt: z.string(),
    featured: z.boolean(),
    status: z.enum(["published", "draft", "archived"]),
    downloadCount: z.number().optional(),
  }),
});

// MCP tool parameter schemas
export const GetProjectParamsSchema = z.object({
  id: z.string().min(1),
});

export const UpdateProjectParamsSchema = z.object({
  id: z.string().min(1),
  data: ProjectSchema.partial().omit({ id: true }),
});

export const GetResourceParamsSchema = z.object({
  id: z.string().min(1),
});

export const UpdateResourceParamsSchema = z.object({
  id: z.string().min(1),
  data: ResourceSchema.partial().omit({ id: true }),
});

// Audit entry schema
export const AuditEntrySchema = z.object({
  id: z.string().min(1),
  timestamp: z.string(),
  action: z.enum(["create", "update", "delete", "read"]),
  entityType: z.enum(["project", "resource"]),
  entityId: z.string().min(1),
  source: z.enum(["mcp", "api", "admin"]),
  changes: z
    .array(
      z.object({
        field: z.string(),
        oldValue: z.any(),
        newValue: z.any(),
      })
    )
    .optional(),
  metadata: z.object({
    userAgent: z.string().optional(),
    clientId: z.string().optional(),
    ipAddress: z.string().optional(),
    checksum: z.string().optional(),
  }),
});
