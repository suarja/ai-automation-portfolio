import { NextResponse } from "next/server";
import {
  DataMigrationService,
  MigrationStats,
} from "@/scripts/migrate-to-redis";
import { featureFlags } from "@/lib/redis/feature-flags";

/**
 * Migration API Endpoint
 * Provides endpoints to run and monitor the data migration process
 */

// Store migration progress globally (in production, use Redis or database)
let currentMigration: {
  running: boolean;
  stats: MigrationStats | null;
  error: string | null;
} = {
  running: false,
  stats: null,
  error: null,
};

/**
 * POST /api/migration/run
 * Start the data migration process
 */
export async function POST(request: Request) {
  try {
    // Check if migration is already running
    if (currentMigration.running) {
      return NextResponse.json(
        {
          success: false,
          error: "Migration is already in progress",
          currentStats: currentMigration.stats,
        },
        { status: 409 }
      );
    }

    // Check if migration has already been completed
    const migrationProgress = await featureFlags.getMigrationProgress();
    if (migrationProgress.completed) {
      return NextResponse.json(
        {
          success: false,
          error: "Migration has already been completed",
          migrationStatus: migrationProgress,
        },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const options = {
      batchSize: body.batchSize || 5,
      validateIntegrity: body.validateIntegrity !== false,
      enableProgressLogging: body.enableProgressLogging !== false,
      enableRollback: body.enableRollback !== false,
      skipIfExists: body.skipIfExists !== false,
    };

    console.log("🚀 Starting migration via API with options:", options);

    // Start migration in background
    currentMigration.running = true;
    currentMigration.error = null;

    // Run migration asynchronously
    const migrationService = new DataMigrationService(options);

    // Start migration without blocking the response
    migrationService
      .migrateAll()
      .then((stats) => {
        console.log("✅ Migration completed successfully");
        currentMigration.stats = stats;
        currentMigration.running = false;
      })
      .catch((error) => {
        console.error("❌ Migration failed:", error);
        currentMigration.error = error.message;
        currentMigration.running = false;
      });

    return NextResponse.json({
      success: true,
      message: "Migration started in background",
      migrationId: "redis_migration_" + Date.now(),
      options,
      checkStatusUrl: "/api/migration/run",
    });
  } catch (error) {
    console.error("❌ Failed to start migration:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to start migration",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/migration/run
 * Get current migration status and progress
 */
export async function GET() {
  try {
    const migrationProgress = await featureFlags.getMigrationProgress();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),

      // Current migration run status
      currentRun: {
        running: currentMigration.running,
        stats: currentMigration.stats,
        error: currentMigration.error,
      },

      // Overall migration progress from feature flags
      migrationStatus: migrationProgress,

      // Migration actions available
      actions: {
        canStart: !currentMigration.running && !migrationProgress.completed,
        canPause: migrationProgress.started && !migrationProgress.paused,
        canResume: migrationProgress.started && migrationProgress.paused,
        canRollback: migrationProgress.started,
      },
    });
  } catch (error) {
    console.error("❌ Failed to get migration status:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to get migration status",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/migration/run
 * Control migration (pause, resume, rollback)
 */
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const action = body.action;

    if (!action) {
      return NextResponse.json(
        {
          success: false,
          error: "Action is required",
          validActions: ["pause", "resume", "rollback"],
        },
        { status: 400 }
      );
    }

    let result;
    switch (action) {
      case "pause":
        await featureFlags.pauseMigration();
        result = { action: "paused", message: "Migration paused successfully" };
        break;

      case "resume":
        await featureFlags.resumeMigration();
        result = {
          action: "resumed",
          message: "Migration resumed successfully",
        };
        break;

      case "rollback":
        const reason = body.reason || "Manual rollback via API";
        await featureFlags.emergencyRollback(reason);

        // Reset current migration state
        currentMigration.running = false;
        currentMigration.stats = null;
        currentMigration.error = "Rolled back: " + reason;

        result = {
          action: "rolledback",
          message: "Migration rolled back successfully",
          reason,
        };
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid action",
            validActions: ["pause", "resume", "rollback"],
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      result,
    });
  } catch (error) {
    console.error("❌ Failed to control migration:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to control migration",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/migration/run
 * Reset migration state (for development/testing)
 */
export async function DELETE() {
  try {
    console.log("🔄 Resetting migration state...");

    // Reset feature flags to initial state
    await featureFlags.setFlags({
      redis_read_projects: false,
      redis_read_resources: false,
      redis_write_projects: false,
      redis_write_resources: false,
      redis_mcp_tools: false,
      migration_mode: "json",
      migration_started: false,
      migration_completed: false,
      migration_paused: false,
      rollback_enabled: true,
    });

    // Reset current migration tracking
    currentMigration.running = false;
    currentMigration.stats = null;
    currentMigration.error = null;

    return NextResponse.json({
      success: true,
      message: "Migration state reset successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Failed to reset migration state:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to reset migration state",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
