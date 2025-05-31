import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";
import { hybridDataService } from "@/lib/services/hybridDataService";
import { auditRedisService } from "@/lib/services/redis/auditRedisService";
import { featureFlags } from "@/lib/redis/feature-flags";
import {
  GetProjectParamsSchema,
  UpdateProjectParamsSchema,
  GetResourceParamsSchema,
  UpdateResourceParamsSchema,
} from "@/lib/utils/validation";
import { MCP_CONFIG } from "@/lib/utils/constants";

/**
 * MCP Routes with Redis Backend Support
 * Uses hybridDataService for production compatibility
 * Resolves EROFS (read-only file system) errors in production
 */

const handler = createMcpHandler(
  (server) => {
    // Project tools
    server.tool("list_projects", "Get all projects", {}, async () => {
      try {
        console.log("🔧 MCP: Getting all projects via hybrid service");
        const projects = await hybridDataService.getProjects();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  data: projects,
                  meta: {
                    total: projects.length,
                    timestamp: new Date().toISOString(),
                    source: "hybrid_data_service",
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error: any) {
        console.error("❌ MCP: Failed to list projects:", error);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: false,
                  error: {
                    code: "LIST_PROJECTS_ERROR",
                    message: error.message,
                    timestamp: new Date().toISOString(),
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      }
    });

    server.tool(
      "get_project",
      "Get a single project by ID",
      GetProjectParamsSchema.shape,
      async ({ id }) => {
        try {
          console.log(`🔧 MCP: Getting project ${id} via hybrid service`);
          const project = await hybridDataService.getProject(id);

          if (!project) {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: false,
                      error: {
                        code: "PROJECT_NOT_FOUND",
                        message: `Project with ID "${id}" not found`,
                        timestamp: new Date().toISOString(),
                      },
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    success: true,
                    data: project,
                    meta: {
                      timestamp: new Date().toISOString(),
                      source: "hybrid_data_service",
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        } catch (error: any) {
          console.error(`❌ MCP: Failed to get project ${id}:`, error);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    success: false,
                    error: {
                      code: "PROJECT_NOT_FOUND",
                      message: error.message,
                      timestamp: new Date().toISOString(),
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }
      }
    );

    server.tool(
      "update_project",
      "Update an existing project",
      UpdateProjectParamsSchema.shape,
      async ({ id, data }) => {
        try {
          console.log(`🔧 MCP: Updating project ${id} via hybrid service`);

          // Check if MCP tools are enabled for Redis operations
          const mcpEnabled = await featureFlags.getFlag("redis_mcp_tools");
          console.log(`MCP Redis operations enabled: ${mcpEnabled}`);

          const updatedProject = await hybridDataService.updateProject(
            id,
            data
          );

          if (!updatedProject) {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: false,
                      error: {
                        code: "PROJECT_NOT_FOUND",
                        message: `Project with ID "${id}" not found`,
                        timestamp: new Date().toISOString(),
                      },
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }

          // Log the MCP update in audit trail
          await auditRedisService.logEntry({
            action: "update",
            entityType: "project",
            entityId: id,
            source: "mcp",
            changes: {
              field: "project_data",
              oldValue: "previous_state",
              newValue: "updated_via_mcp",
              updateData: data,
            },
          });

          console.log(`✅ MCP: Project ${id} updated successfully`);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    success: true,
                    data: updatedProject,
                    meta: {
                      timestamp: new Date().toISOString(),
                      message: "Project updated successfully via MCP",
                      source: "hybrid_data_service",
                      mcpEnabled: mcpEnabled,
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        } catch (error: any) {
          console.error(`❌ MCP: Failed to update project ${id}:`, error);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    success: false,
                    error: {
                      code: "UPDATE_PROJECT_ERROR",
                      message: error.message,
                      timestamp: new Date().toISOString(),
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }
      }
    );

    // Resource tools
    server.tool("list_resources", "Get all resources", {}, async () => {
      try {
        console.log("🔧 MCP: Getting all resources via hybrid service");
        const resources = await hybridDataService.getResources();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  data: resources,
                  meta: {
                    total: resources.length,
                    timestamp: new Date().toISOString(),
                    source: "hybrid_data_service",
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error: any) {
        console.error("❌ MCP: Failed to list resources:", error);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: false,
                  error: {
                    code: "LIST_RESOURCES_ERROR",
                    message: error.message,
                    timestamp: new Date().toISOString(),
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      }
    });

    server.tool(
      "get_resource",
      "Get a single resource by ID",
      GetResourceParamsSchema.shape,
      async ({ id }) => {
        try {
          console.log(`🔧 MCP: Getting resource ${id} via hybrid service`);
          const resource = await hybridDataService.getResource(id);

          if (!resource) {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: false,
                      error: {
                        code: "RESOURCE_NOT_FOUND",
                        message: `Resource with ID "${id}" not found`,
                        timestamp: new Date().toISOString(),
                      },
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    success: true,
                    data: resource,
                    meta: {
                      timestamp: new Date().toISOString(),
                      source: "hybrid_data_service",
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        } catch (error: any) {
          console.error(`❌ MCP: Failed to get resource ${id}:`, error);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    success: false,
                    error: {
                      code: "RESOURCE_NOT_FOUND",
                      message: error.message,
                      timestamp: new Date().toISOString(),
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }
      }
    );

    server.tool(
      "update_resource",
      "Update an existing resource",
      UpdateResourceParamsSchema.shape,
      async ({ id, data }) => {
        try {
          console.log(`🔧 MCP: Updating resource ${id} via hybrid service`);

          // Check if MCP tools are enabled for Redis operations
          const mcpEnabled = await featureFlags.getFlag("redis_mcp_tools");
          console.log(`MCP Redis operations enabled: ${mcpEnabled}`);

          const updatedResource = await hybridDataService.updateResource(
            id,
            data
          );

          if (!updatedResource) {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      success: false,
                      error: {
                        code: "RESOURCE_NOT_FOUND",
                        message: `Resource with ID "${id}" not found`,
                        timestamp: new Date().toISOString(),
                      },
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }

          // Log the MCP update in audit trail
          await auditRedisService.logEntry({
            action: "update",
            entityType: "resource",
            entityId: id,
            source: "mcp",
            changes: {
              field: "resource_data",
              oldValue: "previous_state",
              newValue: "updated_via_mcp",
              updateData: data,
            },
          });

          console.log(`✅ MCP: Resource ${id} updated successfully`);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    success: true,
                    data: updatedResource,
                    meta: {
                      timestamp: new Date().toISOString(),
                      message: "Resource updated successfully via MCP",
                      source: "hybrid_data_service",
                      mcpEnabled: mcpEnabled,
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        } catch (error: any) {
          console.error(`❌ MCP: Failed to update resource ${id}:`, error);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    success: false,
                    error: {
                      code: "UPDATE_RESOURCE_ERROR",
                      message: error.message,
                      timestamp: new Date().toISOString(),
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }
      }
    );

    // Utility tools
    server.tool(
      "get_audit_log",
      "Get recent audit log entries",
      { limit: z.number().optional() },
      async ({ limit = 50 }) => {
        try {
          console.log(
            `🔧 MCP: Getting audit log (limit: ${limit}) via Redis service`
          );
          const auditLog = await auditRedisService.getRecentActivity(limit);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    success: true,
                    data: auditLog,
                    meta: {
                      total: auditLog.length,
                      timestamp: new Date().toISOString(),
                      source: "redis_audit_service",
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        } catch (error: any) {
          console.error("❌ MCP: Failed to get audit log:", error);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    success: false,
                    error: {
                      code: "AUDIT_LOG_ERROR",
                      message: error.message,
                      timestamp: new Date().toISOString(),
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }
      }
    );

    server.tool("get_audit_stats", "Get audit statistics", {}, async () => {
      try {
        console.log("🔧 MCP: Getting audit stats via Redis service");
        const stats = await auditRedisService.getStats();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  data: stats,
                  meta: {
                    timestamp: new Date().toISOString(),
                    source: "redis_audit_service",
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error: any) {
        console.error("❌ MCP: Failed to get audit stats:", error);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: false,
                  error: {
                    code: "AUDIT_STATS_ERROR",
                    message: error.message,
                    timestamp: new Date().toISOString(),
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      }
    });

    // New tool: Get migration status
    server.tool(
      "get_migration_status",
      "Get current Redis migration status",
      {},
      async () => {
        try {
          console.log("🔧 MCP: Getting migration status");
          const migrationProgress = await featureFlags.getMigrationProgress();
          const operationStats = hybridDataService.getOperationStats();

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    success: true,
                    data: {
                      migrationStatus: migrationProgress,
                      operationStats,
                      currentTime: new Date().toISOString(),
                    },
                    meta: {
                      timestamp: new Date().toISOString(),
                      source: "migration_system",
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        } catch (error: any) {
          console.error("❌ MCP: Failed to get migration status:", error);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    success: false,
                    error: {
                      code: "MIGRATION_STATUS_ERROR",
                      message: error.message,
                      timestamp: new Date().toISOString(),
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }
      }
    );
  },
  {
    capabilities: {
      redisUrl: process.env.REDIS_REDIS_URL,
      basePath: "",
      verboseLogs: true,
      maxDuration: 60,
    },
  }
);

export { handler as GET, handler as POST };
