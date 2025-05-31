import { redisManager, RedisKeys } from "@/lib/redis/client";
import { featureFlags } from "@/lib/redis/feature-flags";

/**
 * Base Redis Service
 * Provides common Redis operations with validation, error handling, and audit logging
 * Following architecture from creative-redis-architecture.md
 */

export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  published?: boolean;
}

export interface DataValidationResult {
  valid: boolean;
  errors: string[];
}

export interface AuditLogEntry {
  timestamp: string;
  action: string;
  entityType: string;
  entityId: string;
  changes?: any;
  source: string;
  userId?: string;
}

/**
 * Base Redis Service Class
 * Provides common functionality for all Redis-based services
 */
export abstract class BaseRedisService<T extends BaseEntity> {
  protected abstract entityType: string;
  protected abstract keyPrefix: string;

  /**
   * Get entity from Redis by ID
   */
  protected async getFromRedis(id: string): Promise<T | null> {
    try {
      const client = await redisManager.getClient("read");
      const key = this.getEntityKey(id);
      const data = await client.get(key);

      if (!data) {
        return null;
      }

      const entity = JSON.parse(data as string) as T;

      // Update last accessed timestamp
      await this.updateLastAccessed(id);

      return entity;
    } catch (error) {
      console.error(
        `Failed to get ${this.entityType} ${id} from Redis:`,
        error
      );
      throw error;
    }
  }

  /**
   * Save entity to Redis
   */
  protected async saveToRedis(entity: T): Promise<void> {
    try {
      const client = await redisManager.getClient("write");
      const key = this.getEntityKey(entity.id);

      // Add/update timestamps
      const now = new Date().toISOString();
      const entityWithTimestamp = {
        ...entity,
        updatedAt: now,
        createdAt: entity.createdAt || now,
      };

      // Validate entity before saving
      const validation = await this.validateEntity(entityWithTimestamp);
      if (!validation.valid) {
        throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
      }

      // Save to Redis
      await client.set(key, JSON.stringify(entityWithTimestamp));

      // Update indexes
      await this.updateIndexes(entityWithTimestamp);

      // Log to audit trail
      await this.logAction("save", entity.id, entityWithTimestamp);
    } catch (error) {
      console.error(
        `Failed to save ${this.entityType} ${entity.id} to Redis:`,
        error
      );
      throw error;
    }
  }

  /**
   * Delete entity from Redis
   */
  protected async deleteFromRedis(id: string): Promise<boolean> {
    try {
      const client = await redisManager.getClient("write");
      const key = this.getEntityKey(id);

      // Get entity before deletion for audit log
      const existingEntity = await this.getFromRedis(id);

      // Delete from Redis
      const deleted = await client.del(key);

      if (deleted > 0 && existingEntity) {
        // Remove from indexes
        await this.removeFromIndexes(existingEntity);

        // Log deletion
        await this.logAction("delete", id, existingEntity);
      }

      return deleted > 0;
    } catch (error) {
      console.error(
        `Failed to delete ${this.entityType} ${id} from Redis:`,
        error
      );
      throw error;
    }
  }

  /**
   * Get multiple entities by IDs
   */
  protected async getManyFromRedis(ids: string[]): Promise<T[]> {
    if (ids.length === 0) return [];

    try {
      const client = await redisManager.getClient("read");
      const keys = ids.map((id) => this.getEntityKey(id));

      // Use pipeline for efficient batch retrieval
      const pipeline = client.pipeline();
      keys.forEach((key) => pipeline.get(key));

      const results = await pipeline.exec();
      const entities: T[] = [];

      for (let i = 0; i < results.length; i++) {
        const data = results[i];
        if (data && typeof data === "string") {
          try {
            entities.push(JSON.parse(data) as T);
          } catch (parseError) {
            console.error(
              `Failed to parse ${this.entityType} data for ID ${ids[i]}:`,
              parseError
            );
          }
        }
      }

      return entities;
    } catch (error) {
      console.error(
        `Failed to get multiple ${this.entityType} from Redis:`,
        error
      );
      throw error;
    }
  }

  /**
   * Get entities by index (e.g., published entities)
   */
  protected async getByIndex(indexKey: string): Promise<T[]> {
    try {
      const client = await redisManager.getClient("read");

      // Get IDs from index (set or sorted set)
      const ids = await client.smembers(indexKey);

      if (ids.length === 0) {
        return [];
      }

      return await this.getManyFromRedis(ids);
    } catch (error) {
      console.error(
        `Failed to get ${this.entityType} by index ${indexKey}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Update entity indexes
   */
  protected async updateIndexes(entity: T): Promise<void> {
    try {
      const client = await redisManager.getClient("write");

      // Add to published index if published
      if (entity.published) {
        const publishedKey = this.getPublishedIndexKey();
        await client.sadd(publishedKey, entity.id);
      } else {
        // Remove from published index if not published
        const publishedKey = this.getPublishedIndexKey();
        await client.srem(publishedKey, entity.id);
      }

      // Add to general entity list
      const listKey = this.getListIndexKey();
      await client.sadd(listKey, entity.id);
    } catch (error) {
      console.error(
        `Failed to update indexes for ${this.entityType} ${entity.id}:`,
        error
      );
      // Don't throw - index update failure shouldn't break the main operation
    }
  }

  /**
   * Remove entity from indexes
   */
  protected async removeFromIndexes(entity: T): Promise<void> {
    try {
      const client = await redisManager.getClient("write");

      // Remove from all indexes
      const publishedKey = this.getPublishedIndexKey();
      const listKey = this.getListIndexKey();

      await Promise.all([
        client.srem(publishedKey, entity.id),
        client.srem(listKey, entity.id),
      ]);
    } catch (error) {
      console.error(
        `Failed to remove ${this.entityType} ${entity.id} from indexes:`,
        error
      );
      // Don't throw - index cleanup failure shouldn't break deletion
    }
  }

  /**
   * Update last accessed timestamp for caching
   */
  protected async updateLastAccessed(id: string): Promise<void> {
    try {
      const client = await redisManager.getClient("write");
      const accessKey = `access:${this.entityType}:${id}`;

      // Set with TTL for automatic cleanup
      await client.set(accessKey, Date.now().toString(), { ex: 86400 }); // 24 hours
    } catch (error) {
      // Silent fail - access tracking is not critical
      console.warn(
        `Failed to update access time for ${this.entityType} ${id}:`,
        error
      );
    }
  }

  /**
   * Log action to audit trail
   */
  protected async logAction(
    action: string,
    entityId: string,
    data?: any
  ): Promise<void> {
    try {
      const client = await redisManager.getClient("write");

      const logEntry: AuditLogEntry = {
        timestamp: new Date().toISOString(),
        action,
        entityType: this.entityType,
        entityId,
        changes: data,
        source: "redis_service",
      };

      // Add to sorted set with timestamp as score
      await client.zadd(RedisKeys.auditEntries(), {
        score: Date.now(),
        member: JSON.stringify(logEntry),
      });
    } catch (error) {
      console.error(
        `Failed to log action for ${this.entityType} ${entityId}:`,
        error
      );
      // Don't throw - audit logging failure shouldn't break the main operation
    }
  }

  /**
   * Abstract methods to be implemented by subclasses
   */
  protected abstract validateEntity(entity: T): Promise<DataValidationResult>;
  protected abstract getEntityKey(id: string): string;
  protected abstract getPublishedIndexKey(): string;
  protected abstract getListIndexKey(): string;

  /**
   * Common validation helper
   */
  protected validateRequiredFields(
    entity: T,
    requiredFields: string[]
  ): DataValidationResult {
    const errors: string[] = [];

    for (const field of requiredFields) {
      if (
        !(field in entity) ||
        (entity as any)[field] === undefined ||
        (entity as any)[field] === null
      ) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Check if migration flags allow Redis operations
   */
  protected async isRedisEnabled(
    operation: "read" | "write"
  ): Promise<boolean> {
    try {
      const entityType = this.entityType as "projects" | "resources";
      return await featureFlags.isRedisEnabled(operation, entityType);
    } catch (error) {
      console.error("Failed to check Redis enablement:", error);
      // Default to false for safety
      return false;
    }
  }

  /**
   * Get entity count from index
   */
  protected async getEntityCount(indexKey?: string): Promise<number> {
    try {
      const client = await redisManager.getClient("read");
      const key = indexKey || this.getListIndexKey();

      return await client.scard(key);
    } catch (error) {
      console.error(`Failed to get ${this.entityType} count:`, error);
      return 0;
    }
  }
}
