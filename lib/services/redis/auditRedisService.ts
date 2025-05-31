import { redisManager, RedisKeys } from "@/lib/redis/client";
import { AuditLogEntry } from "./baseRedisService";

/**
 * Redis Audit Service
 * Handles audit logging and change tracking for all entities
 * Provides comprehensive audit trail functionality
 */

export interface AuditQuery {
  entityType?: string;
  entityId?: string;
  action?: string;
  source?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}

export interface AuditStats {
  totalEntries: number;
  entriesByAction: Record<string, number>;
  entriesByEntityType: Record<string, number>;
  entriesBySource: Record<string, number>;
  recentActivity: AuditLogEntry[];
}

export class AuditRedisService {
  private static instance: AuditRedisService;

  private constructor() {}

  static getInstance(): AuditRedisService {
    if (!AuditRedisService.instance) {
      AuditRedisService.instance = new AuditRedisService();
    }
    return AuditRedisService.instance;
  }

  /**
   * Log an audit entry
   */
  async logEntry(entry: Omit<AuditLogEntry, "timestamp">): Promise<void> {
    try {
      const client = await redisManager.getClient("write");

      const fullEntry: AuditLogEntry = {
        ...entry,
        timestamp: new Date().toISOString(),
      };

      // Add to sorted set with timestamp as score for chronological ordering
      await client.zadd(RedisKeys.auditEntries(), {
        score: Date.now(),
        member: JSON.stringify(fullEntry),
      });

      // Update statistics
      await this.updateStats(fullEntry);
    } catch (error) {
      console.error("Failed to log audit entry:", error);
      // Don't throw - audit logging failure shouldn't break business logic
    }
  }

  /**
   * Get audit entries with filtering and pagination
   */
  async getEntries(query: AuditQuery = {}): Promise<AuditLogEntry[]> {
    try {
      const client = await redisManager.getClient("read");
      const limit = query.limit || 100;

      // Get entries in reverse chronological order (newest first)
      let entries: string[];

      if (query.startDate || query.endDate) {
        // Query by date range
        const startScore = query.startDate ? query.startDate.getTime() : 0;
        const endScore = query.endDate ? query.endDate.getTime() : Date.now();

        entries = await client.zrevrangebyscore(
          RedisKeys.auditEntries(),
          endScore,
          startScore,
          { offset: 0, count: limit }
        );
      } else {
        // Get recent entries
        entries = await client.zrevrange(
          RedisKeys.auditEntries(),
          0,
          limit - 1
        );
      }

      // Parse and filter entries
      const parsedEntries: AuditLogEntry[] = [];

      for (const entryStr of entries) {
        try {
          const entry = JSON.parse(entryStr) as AuditLogEntry;

          // Apply filters
          if (query.entityType && entry.entityType !== query.entityType)
            continue;
          if (query.entityId && entry.entityId !== query.entityId) continue;
          if (query.action && entry.action !== query.action) continue;
          if (query.source && entry.source !== query.source) continue;

          parsedEntries.push(entry);
        } catch (parseError) {
          console.error("Failed to parse audit entry:", parseError);
        }
      }

      return parsedEntries;
    } catch (error) {
      console.error("Failed to get audit entries:", error);
      return [];
    }
  }

  /**
   * Get audit entries for a specific entity
   */
  async getEntityHistory(
    entityType: string,
    entityId: string,
    limit: number = 50
  ): Promise<AuditLogEntry[]> {
    return this.getEntries({
      entityType,
      entityId,
      limit,
    });
  }

  /**
   * Get recent activity across all entities
   */
  async getRecentActivity(limit: number = 20): Promise<AuditLogEntry[]> {
    return this.getEntries({ limit });
  }

  /**
   * Get audit statistics
   */
  async getStats(): Promise<AuditStats> {
    try {
      const client = await redisManager.getClient("read");

      // Get stored stats
      const storedStats = await client.hgetall(RedisKeys.auditStats());

      // Get recent activity
      const recentActivity = await this.getRecentActivity(10);

      // Get total count
      const totalEntries = await client.zcard(RedisKeys.auditEntries());

      return {
        totalEntries,
        entriesByAction: this.parseStatsField(storedStats.entriesByAction),
        entriesByEntityType: this.parseStatsField(
          storedStats.entriesByEntityType
        ),
        entriesBySource: this.parseStatsField(storedStats.entriesBySource),
        recentActivity,
      };
    } catch (error) {
      console.error("Failed to get audit stats:", error);
      return {
        totalEntries: 0,
        entriesByAction: {},
        entriesByEntityType: {},
        entriesBySource: {},
        recentActivity: [],
      };
    }
  }

  /**
   * Search audit entries by content
   */
  async searchEntries(
    searchTerm: string,
    limit: number = 50
  ): Promise<AuditLogEntry[]> {
    try {
      // Get recent entries and filter by search term
      const allEntries = await this.getEntries({ limit: limit * 2 }); // Get more to account for filtering

      const searchLower = searchTerm.toLowerCase();

      return allEntries
        .filter(
          (entry) =>
            entry.entityId.toLowerCase().includes(searchLower) ||
            entry.action.toLowerCase().includes(searchLower) ||
            entry.entityType.toLowerCase().includes(searchLower) ||
            entry.source.toLowerCase().includes(searchLower) ||
            (entry.changes &&
              JSON.stringify(entry.changes).toLowerCase().includes(searchLower))
        )
        .slice(0, limit);
    } catch (error) {
      console.error("Failed to search audit entries:", error);
      return [];
    }
  }

  /**
   * Get audit entries by date range
   */
  async getEntriesByDateRange(
    startDate: Date,
    endDate: Date,
    limit: number = 100
  ): Promise<AuditLogEntry[]> {
    return this.getEntries({
      startDate,
      endDate,
      limit,
    });
  }

  /**
   * Clean up old audit entries (retention policy)
   */
  async cleanupOldEntries(retentionDays: number = 90): Promise<number> {
    try {
      const client = await redisManager.getClient("write");

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
      const cutoffScore = cutoffDate.getTime();

      // Remove entries older than cutoff date
      const removedCount = await client.zremrangebyscore(
        RedisKeys.auditEntries(),
        0,
        cutoffScore
      );

      if (removedCount > 0) {
        await this.logEntry({
          action: "cleanup",
          entityType: "audit",
          entityId: "system",
          changes: { removedCount, retentionDays },
          source: "audit_service",
        });
      }

      return removedCount;
    } catch (error) {
      console.error("Failed to cleanup old audit entries:", error);
      return 0;
    }
  }

  /**
   * Update audit statistics
   */
  private async updateStats(entry: AuditLogEntry): Promise<void> {
    try {
      const client = await redisManager.getClient("write");

      // Increment counters for this entry
      await Promise.all([
        client.hincrby(RedisKeys.auditStats(), `action:${entry.action}`, 1),
        client.hincrby(
          RedisKeys.auditStats(),
          `entityType:${entry.entityType}`,
          1
        ),
        client.hincrby(RedisKeys.auditStats(), `source:${entry.source}`, 1),
      ]);
    } catch (error) {
      console.error("Failed to update audit stats:", error);
      // Don't throw - stats update failure shouldn't break audit logging
    }
  }

  /**
   * Parse stats field from Redis hash
   */
  private parseStatsField(field: string | undefined): Record<string, number> {
    if (!field) return {};

    try {
      return JSON.parse(field);
    } catch {
      return {};
    }
  }

  /**
   * Export audit entries for compliance/backup
   */
  async exportEntries(query: AuditQuery = {}): Promise<AuditLogEntry[]> {
    // Remove limit restriction for export
    const exportQuery = { ...query, limit: undefined };

    try {
      const client = await redisManager.getClient("read");

      // Get all matching entries
      const entries = await client.zrevrange(RedisKeys.auditEntries(), 0, -1);

      const parsedEntries: AuditLogEntry[] = [];

      for (const entryStr of entries) {
        try {
          const entry = JSON.parse(entryStr) as AuditLogEntry;

          // Apply filters
          if (
            exportQuery.entityType &&
            entry.entityType !== exportQuery.entityType
          )
            continue;
          if (exportQuery.entityId && entry.entityId !== exportQuery.entityId)
            continue;
          if (exportQuery.action && entry.action !== exportQuery.action)
            continue;
          if (exportQuery.source && entry.source !== exportQuery.source)
            continue;
          if (
            exportQuery.startDate &&
            new Date(entry.timestamp) < exportQuery.startDate
          )
            continue;
          if (
            exportQuery.endDate &&
            new Date(entry.timestamp) > exportQuery.endDate
          )
            continue;

          parsedEntries.push(entry);
        } catch (parseError) {
          console.error(
            "Failed to parse audit entry during export:",
            parseError
          );
        }
      }

      return parsedEntries;
    } catch (error) {
      console.error("Failed to export audit entries:", error);
      return [];
    }
  }

  /**
   * Get audit count by filters
   */
  async getEntryCount(query: Omit<AuditQuery, "limit"> = {}): Promise<number> {
    const entries = await this.getEntries({ ...query, limit: 10000 }); // Large limit for counting
    return entries.length;
  }
}

// Export singleton instance
export const auditRedisService = AuditRedisService.getInstance();
