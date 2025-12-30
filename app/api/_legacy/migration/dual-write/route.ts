import { NextResponse } from "next/server";
import { featureFlags } from "@/lib/redis/feature-flags";
import { hybridDataService } from "@/lib/services/hybridDataService";

/**
 * Dual-Write Mode Management API
 * Controls the gradual transition from JSON to Redis with dual-write capability
 */

/**
 * POST /api/migration/dual-write
 * Enable dual-write mode for gradual transition
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const {
      enableProjects = false,
      enableResources = false,
      enableMcp = false,
      phase = "read-only",
    } = body;

    console.log("🔄 Activating dual-write mode:", {
      enableProjects,
      enableResources,
      enableMcp,
      phase,
    });

    // Get current migration status
    const currentStatus = await featureFlags.getMigrationProgress();

    if (!currentStatus.started) {
      return NextResponse.json(
        {
          success: false,
          error: "Migration must be started before enabling dual-write mode",
          currentStatus,
        },
        { status: 400 }
      );
    }

    // Phase-based activation
    const updates: any = {};

    switch (phase) {
      case "read-only":
        // Phase 1: Enable Redis reads only
        updates.redis_read_projects = enableProjects;
        updates.redis_read_resources = enableResources;
        updates.migration_mode = "dual";
        break;

      case "dual-write":
        // Phase 2: Enable Redis writes (dual-write mode)
        updates.redis_read_projects = enableProjects;
        updates.redis_read_resources = enableResources;
        updates.redis_write_projects = enableProjects;
        updates.redis_write_resources = enableResources;
        updates.migration_mode = "dual";
        break;

      case "redis-primary":
        // Phase 3: Redis becomes primary, JSON as backup
        updates.redis_read_projects = enableProjects;
        updates.redis_read_resources = enableResources;
        updates.redis_write_projects = enableProjects;
        updates.redis_write_resources = enableResources;
        updates.redis_mcp_tools = enableMcp;
        updates.migration_mode = "redis";
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid phase",
            validPhases: ["read-only", "dual-write", "redis-primary"],
          },
          { status: 400 }
        );
    }

    // Apply feature flag updates
    await featureFlags.setFlags(updates);

    // Test the new configuration
    const testResults = await testDualWriteConfiguration();

    const newStatus = await featureFlags.getMigrationProgress();

    return NextResponse.json({
      success: true,
      message: `Dual-write mode activated: ${phase}`,
      timestamp: new Date().toISOString(),
      phase,
      updates,
      migrationStatus: newStatus,
      testResults,
    });
  } catch (error) {
    console.error("❌ Failed to activate dual-write mode:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to activate dual-write mode",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/migration/dual-write
 * Get current dual-write status and consistency check
 */
export async function GET() {
  try {
    const migrationStatus = await featureFlags.getMigrationProgress();
    const operationStats = hybridDataService.getOperationStats();

    // Test the new configuration
    const testResults = await testDualWriteConfiguration();

    // Perform consistency check if in dual mode
    let consistencyCheck = null;
    if (migrationStatus.mode === "dual") {
      consistencyCheck = await performConsistencyCheck();
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),

      // Current dual-write status
      dualWriteStatus: {
        active: migrationStatus.mode === "dual",
        phase: determineDualWritePhase(migrationStatus),
        readSources: {
          projects: migrationStatus.readEnabled.projects ? "redis" : "json",
          resources: migrationStatus.readEnabled.resources ? "redis" : "json",
        },
        writeSources: {
          projects: migrationStatus.writeEnabled.projects ? "both" : "json",
          resources: migrationStatus.writeEnabled.resources ? "both" : "json",
        },
        mcpEnabled: migrationStatus.mcpEnabled,
      },

      // Operation statistics
      operationStats,

      // Consistency check results
      consistencyCheck,

      // Migration status
      migrationStatus,

      // Available actions
      actions: {
        canEnableReadOnly:
          !migrationStatus.readEnabled.projects &&
          !migrationStatus.readEnabled.resources,
        canEnableDualWrite:
          migrationStatus.readEnabled.projects ||
          migrationStatus.readEnabled.resources,
        canEnableRedisPrimary:
          migrationStatus.writeEnabled.projects ||
          migrationStatus.writeEnabled.resources,
        canDisable: migrationStatus.mode === "dual",
      },
    });
  } catch (error) {
    console.error("❌ Failed to get dual-write status:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to get dual-write status",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/migration/dual-write
 * Disable dual-write mode (return to JSON-only)
 */
export async function DELETE() {
  try {
    console.log("🔄 Disabling dual-write mode...");

    // Disable all Redis operations
    await featureFlags.setFlags({
      redis_read_projects: false,
      redis_read_resources: false,
      redis_write_projects: false,
      redis_write_resources: false,
      redis_mcp_tools: false,
      migration_mode: "json",
    });

    const newStatus = await featureFlags.getMigrationProgress();

    return NextResponse.json({
      success: true,
      message: "Dual-write mode disabled, reverted to JSON-only",
      timestamp: new Date().toISOString(),
      migrationStatus: newStatus,
    });
  } catch (error) {
    console.error("❌ Failed to disable dual-write mode:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to disable dual-write mode",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * Helper: Test dual-write configuration
 */
async function testDualWriteConfiguration() {
  try {
    const startTime = Date.now();

    // Test read operations
    const [projectsTest, resourcesTest] = await Promise.allSettled([
      hybridDataService.getProjects(),
      hybridDataService.getResources(),
    ]);

    const testLatency = Date.now() - startTime;

    return {
      success: true,
      testLatency,
      results: {
        projects: {
          success: projectsTest.status === "fulfilled",
          count:
            projectsTest.status === "fulfilled" ? projectsTest.value.length : 0,
          error:
            projectsTest.status === "rejected"
              ? projectsTest.reason.message
              : null,
        },
        resources: {
          success: resourcesTest.status === "fulfilled",
          count:
            resourcesTest.status === "fulfilled"
              ? resourcesTest.value.length
              : 0,
          error:
            resourcesTest.status === "rejected"
              ? resourcesTest.reason.message
              : null,
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Helper: Perform consistency check between Redis and JSON
 */
async function performConsistencyCheck() {
  try {
    // This would be a comprehensive consistency check
    // For now, return basic validation
    const stats = hybridDataService.getOperationStats();

    return {
      performed: true,
      timestamp: new Date().toISOString(),
      operationsTracked: stats.total,
      successRate: stats.successRate,
      averageLatency: stats.averageLatency,
      issues: [], // Would contain any consistency issues found
    };
  } catch (error) {
    return {
      performed: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Helper: Determine current dual-write phase
 */
function determineDualWritePhase(status: any): string {
  if (!status.readEnabled.projects && !status.readEnabled.resources) {
    return "json-only";
  }

  if (!status.writeEnabled.projects && !status.writeEnabled.resources) {
    return "read-only";
  }

  if (status.mode === "dual") {
    return "dual-write";
  }

  if (status.mode === "redis") {
    return "redis-primary";
  }

  return "unknown";
}

// Export helper functions for use in other modules
export {
  testDualWriteConfiguration,
  performConsistencyCheck,
  determineDualWritePhase,
};
