import { promises as fs } from "fs";
import { createHash } from "crypto";
import path from "path";
import { AuditEntry, FileOperationResult } from "../types/api";
import { AUDIT_FILE, FILE_OPERATIONS } from "../utils/constants";

export class FileOperations {
  /**
   * Safely read a JSON file with error handling
   */
  static async safeRead(filePath: string): Promise<any> {
    try {
      const data = await fs.readFile(filePath, "utf8");
      return JSON.parse(data);
    } catch (error: any) {
      if (error.code === "ENOENT") {
        // File doesn't exist, return empty array or object
        return path.basename(filePath).includes("audit") ? [] : [];
      }
      throw new Error(`Failed to read file ${filePath}: ${error.message}`);
    }
  }

  /**
   * Atomic write operation using copy-on-write with checksum verification
   */
  static async atomicWrite(
    filePath: string,
    data: any,
    skipAudit = false
  ): Promise<FileOperationResult> {
    const timestamp = new Date().toISOString();

    try {
      // Read current data and compute checksum
      const currentData = await this.safeRead(filePath);
      const currentChecksum = this.computeChecksum(JSON.stringify(currentData));

      // Prepare new data
      const newDataString = JSON.stringify(data, null, 2);
      const newChecksum = this.computeChecksum(newDataString);

      // Create timestamped copy for atomic operation
      const copyPath = `${filePath}.${Date.now()}`;

      try {
        // Ensure directory exists
        await fs.mkdir(path.dirname(filePath), { recursive: true });

        // Write new version to temporary file
        await fs.writeFile(copyPath, newDataString, "utf8");

        // Verify integrity by reading back and checking checksum
        const verification = await fs.readFile(copyPath, "utf8");
        if (this.computeChecksum(verification) !== newChecksum) {
          throw new Error("Data integrity check failed");
        }

        // Atomic move (rename) - this is the atomic operation
        await fs.rename(copyPath, filePath);

        // Log the change to audit trail (skip for audit file itself to avoid recursion)
        if (!skipAudit && filePath !== AUDIT_FILE) {
          await this.auditLog(filePath, {
            action: "update",
            oldChecksum: currentChecksum,
            newChecksum: newChecksum,
            timestamp,
          });
        }

        return {
          success: true,
          filePath,
          checksum: newChecksum,
          timestamp,
        };
      } catch (error) {
        // Clean up temporary file on error
        await fs.unlink(copyPath).catch(() => {
          // Ignore cleanup errors
        });
        throw error;
      }
    } catch (error: any) {
      return {
        success: false,
        filePath,
        checksum: "",
        timestamp,
        error: error.message,
      };
    }
  }

  /**
   * Atomic update operation that applies a function to existing data
   */
  static async atomicUpdate(
    filePath: string,
    updateFn: (data: any) => any
  ): Promise<any> {
    const currentData = await this.safeRead(filePath);
    const newData = updateFn(currentData);
    const result = await this.atomicWrite(filePath, newData);

    if (!result.success) {
      throw new Error(result.error || "Atomic update failed");
    }

    return newData;
  }

  /**
   * Compute SHA256 checksum for data integrity verification
   */
  private static computeChecksum(data: string): string {
    return createHash("sha256").update(data, "utf8").digest("hex");
  }

  /**
   * Log audit entry for file operations
   */
  private static async auditLog(
    filePath: string,
    operation: {
      action: string;
      oldChecksum: string;
      newChecksum: string;
      timestamp: string;
    }
  ): Promise<void> {
    try {
      const auditEntry: AuditEntry = {
        id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: operation.timestamp,
        action: "update",
        entityType: path.basename(filePath).includes("project")
          ? "project"
          : "resource",
        entityId: path.basename(filePath, ".json"),
        source: "api",
        metadata: {
          checksum: operation.newChecksum,
        },
      };

      // Read existing audit log
      const auditLog = await this.safeRead(AUDIT_FILE);

      // Add new entry
      auditLog.push(auditEntry);

      // Keep only recent entries (avoid infinite growth)
      const maxEntries = 1000;
      if (auditLog.length > maxEntries) {
        auditLog.splice(0, auditLog.length - maxEntries);
      }

      // Write updated audit log with skipAudit=true to prevent recursion
      await this.atomicWrite(AUDIT_FILE, auditLog, true);
    } catch (error) {
      // Audit logging should not fail the main operation
      console.warn("Failed to write audit log:", error);
    }
  }

  /**
   * Initialize data files if they don't exist
   */
  static async initializeDataFiles(): Promise<void> {
    const files = [{ path: AUDIT_FILE, initialData: [] }];

    for (const file of files) {
      try {
        await fs.access(file.path);
      } catch (error: any) {
        if (error.code === "ENOENT") {
          // File doesn't exist, create it with initial data
          await this.atomicWrite(file.path, file.initialData, true);
        }
      }
    }
  }
}
