import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";
import { ProjectService } from "@/lib/services/projectService";
import { ResourceService } from "@/lib/services/resourceService";
import { AuditService } from "@/lib/services/auditService";
import { hybridDataService } from "@/lib/services/hybridDataService";
import {
  GetProjectParamsSchema,
  UpdateProjectParamsSchema,
  GetResourceParamsSchema,
  UpdateResourceParamsSchema,
} from "@/lib/utils/validation";
import { MCP_CONFIG } from "@/lib/utils/constants";

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

          // Log the MCP update in audit trail (keep using AuditService for now)
          await AuditService.addAuditEntry({
            action: "update",
            entityType: "project",
            entityId: id,
            source: "mcp",
            changes: [
              {
                field: "project_data",
                oldValue: "previous_state",
                newValue: "updated_via_mcp_hybrid",
              },
            ],
            metadata: {
              clientId: "mcp_client",
            },
          });

          console.log(
            `✅ MCP: Project ${id} updated successfully via hybrid service`
          );

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
                      message:
                        "Project updated successfully via MCP hybrid service",
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

          // Log the MCP update in audit trail (keep using AuditService for now)
          await AuditService.addAuditEntry({
            action: "update",
            entityType: "resource",
            entityId: id,
            source: "mcp",
            changes: [
              {
                field: "resource_data",
                oldValue: "previous_state",
                newValue: "updated_via_mcp_hybrid",
              },
            ],
            metadata: {
              clientId: "mcp_client",
              hybridService: true,
            },
          });

          console.log(
            `✅ MCP: Resource ${id} updated successfully via hybrid service`
          );

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
                      message:
                        "Resource updated successfully via MCP hybrid service",
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
          const auditLog = await AuditService.getAuditLog(limit);
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
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        } catch (error: any) {
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
        const stats = await AuditService.getAuditStats();
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
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error: any) {
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
  },
  {
    capabilities: {
      redisUrl: process.env.REDIS_REDIS_URL,
      basePath: "",
      verboseLogs: true,
      maxDuration: 60,
    },
  }, // Server options
  {
    basePath: MCP_CONFIG.basePath,
    maxDuration: MCP_CONFIG.maxDuration,
    verboseLogs: MCP_CONFIG.verboseLogs,
  }
);

export { handler as GET, handler as POST };
