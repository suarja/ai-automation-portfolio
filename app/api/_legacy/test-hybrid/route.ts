import { NextResponse } from "next/server";
import { hybridDataService } from "@/lib/services/hybridDataService";
import { featureFlags } from "@/lib/redis/feature-flags";

/**
 * Hybrid Data Service Test API
 * Tests the hybrid data layer and provides migration statistics
 */
export async function GET() {
  try {
    console.log("🔄 Testing Hybrid Data Service...");

    // Get current migration status
    const migrationProgress = await featureFlags.getMigrationProgress();

    // Test read operations
    const startTime = Date.now();

    const [projects, resources] = await Promise.allSettled([
      hybridDataService.getProjects(),
      hybridDataService.getResources(),
    ]);

    const readLatency = Date.now() - startTime;

    // Get operation statistics
    const operationStats = hybridDataService.getOperationStats();

    // Prepare results
    const results = {
      success: true,
      timestamp: new Date().toISOString(),

      // Migration status
      migrationStatus: migrationProgress,

      // Test results
      testResults: {
        readLatency,
        projects: {
          success: projects.status === "fulfilled",
          count: projects.status === "fulfilled" ? projects.value.length : 0,
          error:
            projects.status === "rejected" ? projects.reason.message : null,
        },
        resources: {
          success: resources.status === "fulfilled",
          count: resources.status === "fulfilled" ? resources.value.length : 0,
          error:
            resources.status === "rejected" ? resources.reason.message : null,
        },
      },

      // Operation statistics
      statistics: operationStats,

      // Data source summary
      dataSources: {
        currentMode: migrationProgress.mode,
        readSources: {
          projects: migrationProgress.readEnabled.projects ? "redis" : "json",
          resources: migrationProgress.readEnabled.resources ? "redis" : "json",
        },
        writeSources: {
          projects: migrationProgress.writeEnabled.projects ? "redis" : "json",
          resources: migrationProgress.writeEnabled.resources
            ? "redis"
            : "json",
        },
        mcpToolsEnabled: migrationProgress.mcpEnabled,
      },

      // Health check
      healthCheck: {
        hybridServiceActive: true,
        featureFlagsAccessible: true,
        operationTracking: operationStats.total > 0,
      },
    };

    return NextResponse.json(results);
  } catch (error) {
    console.error("❌ Hybrid service test failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Hybrid service test failed",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * Test write operations (POST endpoint)
 */
export async function POST() {
  try {
    console.log("🔄 Testing Hybrid Write Operations...");

    const testProjectSlug = "test-hybrid-project";
    const testResourceSlug = "test-hybrid-resource";

    // Test project update
    const projectUpdateResult = await hybridDataService.updateProject(
      testProjectSlug,
      {
        description: `Updated via hybrid service at ${new Date().toISOString()}`,
      }
    );

    // Test resource update
    const resourceUpdateResult = await hybridDataService.updateResource(
      testResourceSlug,
      {
        description: `Updated via hybrid service at ${new Date().toISOString()}`,
      }
    );

    // Get updated statistics
    const operationStats = hybridDataService.getOperationStats();
    const migrationProgress = await featureFlags.getMigrationProgress();

    return NextResponse.json({
      success: true,
      message: "Write operations test completed",
      timestamp: new Date().toISOString(),

      results: {
        projectUpdate: {
          attempted: true,
          success: projectUpdateResult !== null,
          slug: testProjectSlug,
        },
        resourceUpdate: {
          attempted: true,
          success: resourceUpdateResult !== null,
          slug: testResourceSlug,
        },
      },

      statistics: operationStats,
      migrationStatus: migrationProgress,
    });
  } catch (error) {
    console.error("❌ Hybrid write test failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Write operations test failed",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
