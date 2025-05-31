import { NextRequest, NextResponse } from "next/server";
import { featureFlags, MigrationFlags } from "@/lib/redis/feature-flags";

/**
 * Migration Feature Flags Management API
 * GET: Retrieve current flags and migration progress
 * POST: Update flags for migration control
 */

export async function GET() {
  try {
    const [flags, progress] = await Promise.all([
      featureFlags.getFlags(),
      featureFlags.getMigrationProgress(),
    ]);

    return NextResponse.json({
      success: true,
      flags,
      progress,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to get migration flags:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve migration flags",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, flags: flagUpdates, flag, value } = body;

    switch (action) {
      case "update_flag":
        if (!flag || value === undefined) {
          return NextResponse.json(
            {
              success: false,
              error: "Missing flag or value for update_flag action",
            },
            { status: 400 }
          );
        }

        await featureFlags.setFlag(flag as keyof MigrationFlags, value);
        break;

      case "update_flags":
        if (!flagUpdates || typeof flagUpdates !== "object") {
          return NextResponse.json(
            {
              success: false,
              error: "Missing flags object for update_flags action",
            },
            { status: 400 }
          );
        }

        await featureFlags.setFlags(flagUpdates);
        break;

      case "start_migration":
        await featureFlags.startMigration();
        break;

      case "pause_migration":
        await featureFlags.pauseMigration();
        break;

      case "resume_migration":
        await featureFlags.resumeMigration();
        break;

      case "complete_migration":
        await featureFlags.completeMigration();
        break;

      case "emergency_rollback":
        const reason = body.reason || "Manual rollback via API";
        await featureFlags.emergencyRollback(reason);
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            error: `Unknown action: ${action}`,
          },
          { status: 400 }
        );
    }

    // Return updated state
    const [updatedFlags, updatedProgress] = await Promise.all([
      featureFlags.getFlags(),
      featureFlags.getMigrationProgress(),
    ]);

    return NextResponse.json({
      success: true,
      message: `Action ${action} completed successfully`,
      flags: updatedFlags,
      progress: updatedProgress,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to update migration flags:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update migration flags",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
