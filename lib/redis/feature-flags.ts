import { redis, redisManager, RedisKeys } from "./client";

/**
 * Feature Flag System for Redis Migration
 * Controls gradual migration from JSON to Redis data sources
 * Following migration strategy from creative-migration-strategy.md
 */

export interface MigrationFlags {
  // Data source control
  redis_read_projects: boolean;
  redis_read_resources: boolean;
  redis_write_projects: boolean;
  redis_write_resources: boolean;

  // MCP tools control
  redis_mcp_tools: boolean;

  // Migration mode
  migration_mode: "json" | "dual" | "redis";

  // Migration progress tracking
  migration_started: boolean;
  migration_completed: boolean;

  // Emergency controls
  migration_paused: boolean;
  rollback_enabled: boolean;
}

/**
 * Default feature flags - start with JSON-only mode
 */
const DEFAULT_FLAGS: MigrationFlags = {
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
};

/**
 * Feature Flag Service
 * Manages migration state and provides safe flag operations
 */
export class FeatureFlagService {
  private static instance: FeatureFlagService;
  private readonly FLAGS_KEY = "migration:flags";
  private flagsCache: MigrationFlags | null = null;
  private lastCacheUpdate = 0;
  private readonly CACHE_TTL = 10000; // 10 seconds

  private constructor() {}

  static getInstance(): FeatureFlagService {
    if (!FeatureFlagService.instance) {
      FeatureFlagService.instance = new FeatureFlagService();
    }
    return FeatureFlagService.instance;
  }

  /**
   * Get current migration flags with caching
   */
  async getFlags(): Promise<MigrationFlags> {
    const now = Date.now();

    // Return cached flags if recent
    if (this.flagsCache && now - this.lastCacheUpdate < this.CACHE_TTL) {
      return this.flagsCache;
    }

    try {
      const client = await redisManager.getClient("read");
      const storedFlags = await client.get(this.FLAGS_KEY);

      if (storedFlags) {
        this.flagsCache = {
          ...DEFAULT_FLAGS,
          ...JSON.parse(storedFlags as string),
        };
      } else {
        // Initialize with default flags
        this.flagsCache = DEFAULT_FLAGS;
        await this.saveFlags(this.flagsCache);
      }

      this.lastCacheUpdate = now;
      return this.flagsCache;
    } catch (error) {
      console.error("Failed to get feature flags from Redis:", error);
      // Return default flags on error
      return DEFAULT_FLAGS;
    }
  }

  /**
   * Update a specific flag
   */
  async setFlag(
    key: keyof MigrationFlags,
    value: boolean | string
  ): Promise<void> {
    const flags = await this.getFlags();

    // Type-safe flag update
    (flags as any)[key] = value;

    await this.saveFlags(flags);
    await this.logFlagChange(key, value);
  }

  /**
   * Update multiple flags atomically
   */
  async setFlags(updates: Partial<MigrationFlags>): Promise<void> {
    const flags = await this.getFlags();

    Object.assign(flags, updates);

    await this.saveFlags(flags);

    // Log all changes
    for (const [key, value] of Object.entries(updates)) {
      await this.logFlagChange(key as keyof MigrationFlags, value);
    }
  }

  /**
   * Get a specific flag value
   */
  async getFlag(key: keyof MigrationFlags): Promise<boolean | string> {
    const flags = await this.getFlags();
    return flags[key];
  }

  /**
   * Check if Redis is enabled for a specific operation
   */
  async isRedisEnabled(
    operation: "read" | "write",
    entity: "projects" | "resources"
  ): Promise<boolean> {
    const flags = await this.getFlags();

    if (operation === "read") {
      return entity === "projects"
        ? flags.redis_read_projects
        : flags.redis_read_resources;
    } else {
      return entity === "projects"
        ? flags.redis_write_projects
        : flags.redis_write_resources;
    }
  }

  /**
   * Check if we're in dual-mode (writing to both systems)
   */
  async isDualMode(): Promise<boolean> {
    const flags = await this.getFlags();
    return flags.migration_mode === "dual";
  }

  /**
   * Check if migration is paused
   */
  async isMigrationPaused(): Promise<boolean> {
    const flags = await this.getFlags();
    return flags.migration_paused;
  }

  /**
   * Emergency rollback - disable all Redis operations
   */
  async emergencyRollback(reason: string): Promise<void> {
    const rollbackFlags: Partial<MigrationFlags> = {
      redis_read_projects: false,
      redis_read_resources: false,
      redis_write_projects: false,
      redis_write_resources: false,
      redis_mcp_tools: false,
      migration_mode: "json",
      migration_paused: true,
      rollback_enabled: true,
    };

    await this.setFlags(rollbackFlags);
    await this.logRollback(reason);

    console.error("🚨 EMERGENCY ROLLBACK EXECUTED:", reason);
  }

  /**
   * Start migration process
   */
  async startMigration(): Promise<void> {
    const updates: Partial<MigrationFlags> = {
      migration_started: true,
      migration_paused: false,
      rollback_enabled: true,
    };

    await this.setFlags(updates);
    console.log("🚀 Migration started");
  }

  /**
   * Complete migration process
   */
  async completeMigration(): Promise<void> {
    const updates: Partial<MigrationFlags> = {
      migration_completed: true,
      migration_mode: "redis",
      rollback_enabled: false,
    };

    await this.setFlags(updates);
    console.log("✅ Migration completed");
  }

  /**
   * Pause migration
   */
  async pauseMigration(): Promise<void> {
    await this.setFlag("migration_paused", true);
    console.log("⏸️ Migration paused");
  }

  /**
   * Resume migration
   */
  async resumeMigration(): Promise<void> {
    await this.setFlag("migration_paused", false);
    console.log("▶️ Migration resumed");
  }

  /**
   * Save flags to Redis
   */
  private async saveFlags(flags: MigrationFlags): Promise<void> {
    try {
      const client = await redisManager.getClient("write");
      await client.set(this.FLAGS_KEY, JSON.stringify(flags));

      // Update cache
      this.flagsCache = flags;
      this.lastCacheUpdate = Date.now();
    } catch (error) {
      console.error("Failed to save feature flags to Redis:", error);
      throw error;
    }
  }

  /**
   * Log flag changes for audit
   */
  private async logFlagChange(
    key: keyof MigrationFlags,
    value: boolean | string
  ): Promise<void> {
    try {
      const client = await redisManager.getClient("write");
      const logEntry = {
        timestamp: new Date().toISOString(),
        action: "flag_change",
        flag: key,
        value,
        source: "migration_system",
      };

      // Use sorted set for time-ordered audit log
      await client.zadd(RedisKeys.auditEntries(), {
        score: Date.now(),
        member: JSON.stringify(logEntry),
      });
    } catch (error) {
      console.error("Failed to log flag change:", error);
      // Don't throw - logging failure shouldn't break flag operations
    }
  }

  /**
   * Log rollback events
   */
  private async logRollback(reason: string): Promise<void> {
    try {
      const client = await redisManager.getClient("write");
      const logEntry = {
        timestamp: new Date().toISOString(),
        action: "emergency_rollback",
        reason,
        source: "migration_system",
      };

      await client.zadd(RedisKeys.auditEntries(), {
        score: Date.now(),
        member: JSON.stringify(logEntry),
      });
    } catch (error) {
      console.error("Failed to log rollback:", error);
    }
  }

  /**
   * Get migration progress summary
   */
  async getMigrationProgress(): Promise<{
    started: boolean;
    completed: boolean;
    paused: boolean;
    mode: string;
    readEnabled: { projects: boolean; resources: boolean };
    writeEnabled: { projects: boolean; resources: boolean };
    mcpEnabled: boolean;
  }> {
    const flags = await this.getFlags();

    return {
      started: flags.migration_started,
      completed: flags.migration_completed,
      paused: flags.migration_paused,
      mode: flags.migration_mode,
      readEnabled: {
        projects: flags.redis_read_projects,
        resources: flags.redis_read_resources,
      },
      writeEnabled: {
        projects: flags.redis_write_projects,
        resources: flags.redis_write_resources,
      },
      mcpEnabled: flags.redis_mcp_tools,
    };
  }
}

// Export singleton instance
export const featureFlags = FeatureFlagService.getInstance();
