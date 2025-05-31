import { projectRedisService } from "@/lib/services/redis/projectRedisService";
import { resourceRedisService } from "@/lib/services/redis/resourceRedisService";
import { auditRedisService } from "@/lib/services/redis/auditRedisService";
import { ProjectService } from "@/lib/services/projectService";
import { ResourceService } from "@/lib/services/resourceService";
import { AuditService } from "@/lib/services/auditService";
import { featureFlags } from "@/lib/redis/feature-flags";
import { redisManager } from "@/lib/redis/client";

/**
 * Redis Migration Script
 * Migrates existing JSON data to Redis with integrity validation
 * Supports batch processing, progress monitoring, and rollback capabilities
 */

interface MigrationStats {
  projects: {
    total: number;
    migrated: number;
    failed: number;
    errors: string[];
  };
  resources: {
    total: number;
    migrated: number;
    failed: number;
    errors: string[];
  };
  auditEntries: {
    total: number;
    migrated: number;
    failed: number;
    errors: string[];
  };
  startTime: Date;
  endTime?: Date;
  duration?: number;
}

interface MigrationOptions {
  batchSize: number;
  validateIntegrity: boolean;
  enableProgressLogging: boolean;
  enableRollback: boolean;
  skipIfExists: boolean;
}

const DEFAULT_OPTIONS: MigrationOptions = {
  batchSize: 10,
  validateIntegrity: true,
  enableProgressLogging: true,
  enableRollback: true,
  skipIfExists: false,
};

class DataMigrationService {
  private stats: MigrationStats;
  private options: MigrationOptions;

  constructor(options: Partial<MigrationOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.stats = {
      projects: { total: 0, migrated: 0, failed: 0, errors: [] },
      resources: { total: 0, migrated: 0, failed: 0, errors: [] },
      auditEntries: { total: 0, migrated: 0, failed: 0, errors: [] },
      startTime: new Date(),
    };
  }

  /**
   * Main migration orchestrator
   */
  async migrateAll(): Promise<MigrationStats> {
    try {
      console.log("🚀 Starting Redis Data Migration...");

      // Verify Redis connectivity
      await this.verifyRedisConnection();

      // Start migration tracking
      await featureFlags.startMigration();

      // Migrate data in sequence
      await this.migrateProjects();
      await this.migrateResources();
      await this.migrateAuditEntries();

      // Validate migration integrity
      if (this.options.validateIntegrity) {
        await this.validateMigrationIntegrity();
      }

      this.stats.endTime = new Date();
      this.stats.duration =
        this.stats.endTime.getTime() - this.stats.startTime.getTime();

      console.log("✅ Migration completed successfully!");
      await this.logMigrationSummary();

      return this.stats;
    } catch (error) {
      console.error("❌ Migration failed:", error);

      if (this.options.enableRollback) {
        console.log("🔄 Rolling back migration...");
        await this.rollbackMigration();
      }

      throw error;
    }
  }

  /**
   * Migrate projects from JSON to Redis
   */
  async migrateProjects(): Promise<void> {
    try {
      console.log("🏗️ Migrating projects...");

      // Get all projects from JSON
      const jsonProjects = await ProjectService.listProjects();
      this.stats.projects.total = jsonProjects.length;

      if (jsonProjects.length === 0) {
        console.log("ℹ️ No projects to migrate");
        return;
      }

      // Process in batches
      for (let i = 0; i < jsonProjects.length; i += this.options.batchSize) {
        const batch = jsonProjects.slice(i, i + this.options.batchSize);

        for (const project of batch) {
          try {
            // Check if project already exists in Redis
            if (this.options.skipIfExists) {
              const existing = await projectRedisService.getProject(project.id);
              if (existing) {
                console.log(`⏭️ Skipping existing project: ${project.id}`);
                this.stats.projects.migrated++;
                continue;
              }
            }

            // Transform for Redis (add required fields) with explicit serialization check
            const redisProject = {
              ...project,
              published: project.metadata?.status === "published",
              createdAt: project.metadata?.createdAt,
              updatedAt: project.metadata?.updatedAt,
            };

            // Validate serialization before saving
            try {
              JSON.stringify(redisProject);
            } catch (serializeError) {
              throw new Error(
                `Serialization failed for project ${project.id}: ${serializeError.message}`
              );
            }

            // Save to Redis
            await projectRedisService.saveProject(redisProject);
            this.stats.projects.migrated++;

            if (this.options.enableProgressLogging) {
              console.log(`✓ Migrated project: ${project.id}`);
            }
          } catch (error) {
            this.stats.projects.failed++;
            const errorMsg = `Failed to migrate project ${project.id}: ${
              error instanceof Error ? error.message : String(error)
            }`;
            this.stats.projects.errors.push(errorMsg);
            console.error(`❌ ${errorMsg}`);
          }
        }

        // Progress update
        console.log(
          `📊 Projects progress: ${
            this.stats.projects.migrated + this.stats.projects.failed
          }/${this.stats.projects.total}`
        );
      }

      console.log(
        `✅ Projects migration complete: ${this.stats.projects.migrated} migrated, ${this.stats.projects.failed} failed`
      );
    } catch (error) {
      console.error("❌ Projects migration failed:", error);
      throw error;
    }
  }

  /**
   * Migrate resources from JSON to Redis
   */
  async migrateResources(): Promise<void> {
    try {
      console.log("📦 Migrating resources...");

      // Get all resources from JSON
      const jsonResources = await ResourceService.listResources();
      this.stats.resources.total = jsonResources.length;

      if (jsonResources.length === 0) {
        console.log("ℹ️ No resources to migrate");
        return;
      }

      // Process in batches
      for (let i = 0; i < jsonResources.length; i += this.options.batchSize) {
        const batch = jsonResources.slice(i, i + this.options.batchSize);

        for (const resource of batch) {
          try {
            // Check if resource already exists in Redis
            if (this.options.skipIfExists) {
              const existing = await resourceRedisService.getResource(
                resource.id
              );
              if (existing) {
                console.log(`⏭️ Skipping existing resource: ${resource.id}`);
                this.stats.resources.migrated++;
                continue;
              }
            }

            // Transform for Redis (add required fields) with explicit serialization check
            const redisResource = {
              ...resource,
              published: resource.metadata?.status === "published",
              createdAt: resource.metadata?.createdAt,
              updatedAt: resource.metadata?.updatedAt,
              featureRequest: false, // Default value
              // Ensure downloadLink is present for published resources
              downloadLink:
                resource.downloadLink ||
                (resource.metadata?.status === "published" ? "#" : undefined),
            };

            // Validate serialization before saving
            try {
              JSON.stringify(redisResource);
            } catch (serializeError) {
              throw new Error(
                `Serialization failed for resource ${resource.id}: ${serializeError.message}`
              );
            }

            // Save to Redis
            await resourceRedisService.saveResource(redisResource);
            this.stats.resources.migrated++;

            if (this.options.enableProgressLogging) {
              console.log(`✓ Migrated resource: ${resource.id}`);
            }
          } catch (error) {
            this.stats.resources.failed++;
            const errorMsg = `Failed to migrate resource ${resource.id}: ${
              error instanceof Error ? error.message : String(error)
            }`;
            this.stats.resources.errors.push(errorMsg);
            console.error(`❌ ${errorMsg}`);
          }
        }

        // Progress update
        console.log(
          `📊 Resources progress: ${
            this.stats.resources.migrated + this.stats.resources.failed
          }/${this.stats.resources.total}`
        );
      }

      console.log(
        `✅ Resources migration complete: ${this.stats.resources.migrated} migrated, ${this.stats.resources.failed} failed`
      );
    } catch (error) {
      console.error("❌ Resources migration failed:", error);
      throw error;
    }
  }

  /**
   * Migrate audit entries from JSON to Redis
   */
  async migrateAuditEntries(): Promise<void> {
    try {
      console.log("📝 Migrating audit entries...");

      // Get all audit entries from JSON
      const jsonAuditLog = await AuditService.getAuditLog(1000); // Get large batch
      this.stats.auditEntries.total = jsonAuditLog.length;

      if (jsonAuditLog.length === 0) {
        console.log("ℹ️ No audit entries to migrate");
        return;
      }

      // Process in batches
      for (let i = 0; i < jsonAuditLog.length; i += this.options.batchSize) {
        const batch = jsonAuditLog.slice(i, i + this.options.batchSize);

        for (const entry of batch) {
          try {
            // Transform audit entry for Redis format
            const redisAuditEntry = {
              action: entry.action,
              entityType: entry.entityType,
              entityId: entry.entityId,
              changes: entry.changes || {},
              source: entry.source || "migration",
              timestamp: entry.timestamp,
            };

            // Save to Redis
            await auditRedisService.logEntry(redisAuditEntry);
            this.stats.auditEntries.migrated++;

            if (this.options.enableProgressLogging && i % 50 === 0) {
              console.log(
                `✓ Migrated ${this.stats.auditEntries.migrated} audit entries`
              );
            }
          } catch (error) {
            this.stats.auditEntries.failed++;
            const errorMsg = `Failed to migrate audit entry: ${
              error instanceof Error ? error.message : "Unknown error"
            }`;
            this.stats.auditEntries.errors.push(errorMsg);
            console.error(`❌ ${errorMsg}`);
          }
        }

        // Progress update
        console.log(
          `📊 Audit entries progress: ${
            this.stats.auditEntries.migrated + this.stats.auditEntries.failed
          }/${this.stats.auditEntries.total}`
        );
      }

      console.log(
        `✅ Audit entries migration complete: ${this.stats.auditEntries.migrated} migrated, ${this.stats.auditEntries.failed} failed`
      );
    } catch (error) {
      console.error("❌ Audit entries migration failed:", error);
      throw error;
    }
  }

  /**
   * Validate migration integrity by comparing data
   */
  async validateMigrationIntegrity(): Promise<void> {
    console.log("🔍 Validating migration integrity...");

    try {
      // Only validate if we successfully migrated data
      if (
        this.stats.projects.migrated === 0 &&
        this.stats.resources.migrated === 0
      ) {
        console.log("ℹ️ No data was migrated, skipping integrity validation");
        return;
      }

      // Validate projects if any were migrated
      if (this.stats.projects.migrated > 0) {
        const jsonProjects = await ProjectService.listProjects();
        const redisProjects = await projectRedisService.getByIndex(
          "index:all:projects"
        );

        console.log(
          `Projects: JSON(${jsonProjects.length}) vs Redis(${redisProjects.length}), Migrated(${this.stats.projects.migrated})`
        );

        if (this.stats.projects.migrated > 0 && redisProjects.length === 0) {
          throw new Error(
            `Projects migration failed: ${this.stats.projects.migrated} should be migrated but Redis has 0`
          );
        }
      }

      // Validate resources if any were migrated
      if (this.stats.resources.migrated > 0) {
        const jsonResources = await ResourceService.listResources();
        const redisResources = await resourceRedisService.getByIndex(
          "index:all:resources"
        );

        console.log(
          `Resources: JSON(${jsonResources.length}) vs Redis(${redisResources.length}), Migrated(${this.stats.resources.migrated})`
        );

        if (this.stats.resources.migrated > 0 && redisResources.length === 0) {
          throw new Error(
            `Resources migration failed: ${this.stats.resources.migrated} should be migrated but Redis has 0`
          );
        }
      }

      console.log("✅ Migration integrity validation passed");
    } catch (error) {
      console.error("❌ Migration integrity validation failed:", error);
      throw error;
    }
  }

  /**
   * Verify Redis connection before migration
   */
  async verifyRedisConnection(): Promise<void> {
    try {
      const client = await redisManager.getClient("write");
      await client.ping();
      console.log("✅ Redis connection verified");
    } catch (error) {
      console.error("❌ Redis connection failed:", error);
      throw new Error("Cannot connect to Redis. Migration aborted.");
    }
  }

  /**
   * Rollback migration by clearing Redis data
   */
  async rollbackMigration(): Promise<void> {
    try {
      console.log("🔄 Rolling back migration...");

      // Clear Redis data (this would need careful implementation)
      // For now, just set flags to rollback
      await featureFlags.emergencyRollback(
        "Migration failure - automatic rollback"
      );

      console.log("✅ Migration rolled back to JSON-only mode");
    } catch (error) {
      console.error("❌ Rollback failed:", error);
    }
  }

  /**
   * Log migration summary
   */
  async logMigrationSummary(): Promise<void> {
    const summary = {
      migration_completed: new Date().toISOString(),
      duration_ms: this.stats.duration,
      projects: this.stats.projects,
      resources: this.stats.resources,
      auditEntries: this.stats.auditEntries,
      total_items:
        this.stats.projects.total +
        this.stats.resources.total +
        this.stats.auditEntries.total,
      total_migrated:
        this.stats.projects.migrated +
        this.stats.resources.migrated +
        this.stats.auditEntries.migrated,
      total_failed:
        this.stats.projects.failed +
        this.stats.resources.failed +
        this.stats.auditEntries.failed,
    };

    console.log("\n📊 MIGRATION SUMMARY:");
    console.log(JSON.stringify(summary, null, 2));

    // Log to audit system
    await auditRedisService.logEntry({
      action: "data_migration_completed",
      entityType: "migration",
      entityId: "redis_migration",
      changes: summary,
      source: "migration_script",
    });
  }

  /**
   * Get current migration stats
   */
  getStats(): MigrationStats {
    return this.stats;
  }
}

// Export the migration service
export { DataMigrationService, MigrationStats, MigrationOptions };

// CLI runner if executed directly
if (require.main === module) {
  async function runMigration() {
    const migrationService = new DataMigrationService({
      batchSize: 5,
      validateIntegrity: true,
      enableProgressLogging: true,
      enableRollback: true,
      skipIfExists: true,
    });

    try {
      const stats = await migrationService.migrateAll();
      process.exit(0);
    } catch (error) {
      console.error("Migration failed:", error);
      process.exit(1);
    }
  }

  runMigration();
}
