import { AuditEntry } from "../types/api";
import { FileOperations } from "./fileOperations";
import { AUDIT_FILE } from "../utils/constants";

export class AuditService {
  /**
   * Get all audit entries
   */
  static async getAuditLog(limit?: number): Promise<AuditEntry[]> {
    try {
      const auditLog = await FileOperations.safeRead(AUDIT_FILE);
      const entries = Array.isArray(auditLog) ? auditLog : [];

      // Sort by timestamp descending (newest first)
      entries.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      // Apply limit if specified
      return limit ? entries.slice(0, limit) : entries;
    } catch (error: any) {
      throw new Error(`Failed to get audit log: ${error.message}`);
    }
  }

  /**
   * Get audit entries for a specific entity
   */
  static async getEntityAuditLog(
    entityType: "project" | "resource",
    entityId: string
  ): Promise<AuditEntry[]> {
    try {
      const auditLog = await this.getAuditLog();
      return auditLog.filter(
        (entry) =>
          entry.entityType === entityType && entry.entityId === entityId
      );
    } catch (error: any) {
      throw new Error(`Failed to get entity audit log: ${error.message}`);
    }
  }

  /**
   * Get audit entries by source
   */
  static async getAuditLogBySource(
    source: "mcp" | "api" | "admin"
  ): Promise<AuditEntry[]> {
    try {
      const auditLog = await this.getAuditLog();
      return auditLog.filter((entry) => entry.source === source);
    } catch (error: any) {
      throw new Error(`Failed to get audit log by source: ${error.message}`);
    }
  }

  /**
   * Get audit entries within a date range
   */
  static async getAuditLogByDateRange(
    startDate: string,
    endDate: string
  ): Promise<AuditEntry[]> {
    try {
      const auditLog = await this.getAuditLog();
      const start = new Date(startDate);
      const end = new Date(endDate);

      return auditLog.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        return entryDate >= start && entryDate <= end;
      });
    } catch (error: any) {
      throw new Error(
        `Failed to get audit log by date range: ${error.message}`
      );
    }
  }

  /**
   * Add a manual audit entry (for API or admin actions)
   */
  static async addAuditEntry(
    entry: Omit<AuditEntry, "id" | "timestamp">
  ): Promise<AuditEntry> {
    try {
      const auditEntry: AuditEntry = {
        ...entry,
        id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
      };

      await FileOperations.atomicUpdate(
        AUDIT_FILE,
        (auditLog: AuditEntry[]) => {
          const entries = Array.isArray(auditLog) ? auditLog : [];

          // Add new entry
          entries.push(auditEntry);

          // Keep only recent entries (avoid infinite growth)
          const maxEntries = 1000;
          if (entries.length > maxEntries) {
            entries.splice(0, entries.length - maxEntries);
          }

          return entries;
        }
      );

      return auditEntry;
    } catch (error: any) {
      throw new Error(`Failed to add audit entry: ${error.message}`);
    }
  }

  /**
   * Clear old audit entries (cleanup operation)
   */
  static async clearOldEntries(olderThanDays: number = 30): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

      let removedCount = 0;

      await FileOperations.atomicUpdate(
        AUDIT_FILE,
        (auditLog: AuditEntry[]) => {
          const entries = Array.isArray(auditLog) ? auditLog : [];
          const initialCount = entries.length;

          const filteredEntries = entries.filter((entry) => {
            const entryDate = new Date(entry.timestamp);
            return entryDate >= cutoffDate;
          });

          removedCount = initialCount - filteredEntries.length;
          return filteredEntries;
        }
      );

      return removedCount;
    } catch (error: any) {
      throw new Error(`Failed to clear old audit entries: ${error.message}`);
    }
  }

  /**
   * Get audit statistics
   */
  static async getAuditStats(): Promise<{
    totalEntries: number;
    entriesByAction: Record<string, number>;
    entriesBySource: Record<string, number>;
    entriesByEntityType: Record<string, number>;
    latestEntry?: AuditEntry;
  }> {
    try {
      const auditLog = await this.getAuditLog();

      const stats = {
        totalEntries: auditLog.length,
        entriesByAction: {} as Record<string, number>,
        entriesBySource: {} as Record<string, number>,
        entriesByEntityType: {} as Record<string, number>,
        latestEntry: auditLog[0], // Already sorted by timestamp desc
      };

      // Count entries by different criteria
      auditLog.forEach((entry) => {
        // By action
        stats.entriesByAction[entry.action] =
          (stats.entriesByAction[entry.action] || 0) + 1;

        // By source
        stats.entriesBySource[entry.source] =
          (stats.entriesBySource[entry.source] || 0) + 1;

        // By entity type
        stats.entriesByEntityType[entry.entityType] =
          (stats.entriesByEntityType[entry.entityType] || 0) + 1;
      });

      return stats;
    } catch (error: any) {
      throw new Error(`Failed to get audit statistics: ${error.message}`);
    }
  }

  /**
   * Initialize audit file if it doesn't exist
   */
  static async initializeAuditFile(): Promise<void> {
    try {
      await FileOperations.safeRead(AUDIT_FILE);
    } catch (error) {
      // File doesn't exist, create it with empty array
      await FileOperations.atomicWrite(AUDIT_FILE, [], true);
    }
  }
}
