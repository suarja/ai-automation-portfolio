import {
  BaseRedisService,
  BaseEntity,
  DataValidationResult,
} from "./baseRedisService";
import { RedisKeys } from "@/lib/redis/client";
import { Resource } from "@/lib/types/resource";

/**
 * Redis Service for Resources
 * Handles all Redis operations for resource entities
 * Extends BaseRedisService with resource-specific logic
 */

// Extend Resource interface to ensure it matches BaseEntity
interface RedisResource extends Resource, BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  published?: boolean;
}

export class ResourceRedisService extends BaseRedisService<RedisResource> {
  protected entityType = "resources";
  protected keyPrefix = "data:resources";

  private static instance: ResourceRedisService;

  private constructor() {
    super();
  }

  static getInstance(): ResourceRedisService {
    if (!ResourceRedisService.instance) {
      ResourceRedisService.instance = new ResourceRedisService();
    }
    return ResourceRedisService.instance;
  }

  /**
   * Get all published resources
   */
  async getPublishedResources(): Promise<RedisResource[]> {
    return await this.getByIndex(this.getPublishedIndexKey());
  }

  /**
   * Get resource by ID
   */
  async getResource(id: string): Promise<RedisResource | null> {
    return await this.getFromRedis(id);
  }

  /**
   * Get resource by slug
   */
  async getResourceBySlug(slug: string): Promise<RedisResource | null> {
    try {
      // In our system, the slug IS the id
      // First, get all resources and find by id (which is the slug)
      const allResources = await this.getByIndex(this.getListIndexKey());

      return allResources.find((resource) => resource.id === slug) || null;
    } catch (error) {
      console.error(`Failed to get resource by slug ${slug}:`, error);
      return null;
    }
  }

  /**
   * Get multiple resources by IDs
   */
  async getResourcesByIds(ids: string[]): Promise<RedisResource[]> {
    return await this.getManyFromRedis(ids);
  }

  /**
   * Save resource to Redis
   */
  async saveResource(resource: RedisResource): Promise<void> {
    await this.saveToRedis(resource);
  }

  /**
   * Update resource
   */
  async updateResource(
    id: string,
    updates: Partial<RedisResource>
  ): Promise<RedisResource | null> {
    const existingResource = await this.getResource(id);

    if (!existingResource) {
      return null;
    }

    const updatedResource = {
      ...existingResource,
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    await this.saveResource(updatedResource);
    return updatedResource;
  }

  /**
   * Delete resource
   */
  async deleteResource(id: string): Promise<boolean> {
    return await this.deleteFromRedis(id);
  }

  /**
   * Get resources count
   */
  async getResourcesCount(publishedOnly: boolean = false): Promise<number> {
    const indexKey = publishedOnly
      ? this.getPublishedIndexKey()
      : this.getListIndexKey();
    return await this.getEntityCount(indexKey);
  }

  /**
   * Search resources by title or tags
   */
  async searchResources(query: string): Promise<RedisResource[]> {
    try {
      const allResources = await this.getByIndex(this.getListIndexKey());
      const searchTerm = query.toLowerCase();

      return allResources.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm) ||
          resource.description?.toLowerCase().includes(searchTerm) ||
          resource.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error(`Failed to search resources with query "${query}":`, error);
      return [];
    }
  }

  /**
   * Get resources by tag
   */
  async getResourcesByTag(tag: string): Promise<RedisResource[]> {
    try {
      const allResources = await this.getByIndex(this.getListIndexKey());

      return allResources.filter((resource) => resource.tags?.includes(tag));
    } catch (error) {
      console.error(`Failed to get resources by tag "${tag}":`, error);
      return [];
    }
  }

  /**
   * Get resources by type (free/paid/feature request)
   */
  async getResourcesByType(
    type: "free" | "paid" | "feature_request"
  ): Promise<RedisResource[]> {
    try {
      const allResources = await this.getByIndex(this.getListIndexKey());

      return allResources.filter((resource) => {
        if (type === "feature_request") {
          return resource.featureRequest === true;
        }
        if (type === "free") {
          return !resource.price || resource.price === 0;
        }
        if (type === "paid") {
          return resource.price && resource.price > 0;
        }
        return false;
      });
    } catch (error) {
      console.error(`Failed to get resources by type "${type}":`, error);
      return [];
    }
  }

  /**
   * Update download stats
   */
  async incrementDownloadCount(id: string): Promise<number> {
    try {
      const resource = await this.getResource(id);
      if (!resource) {
        throw new Error(`Resource ${id} not found`);
      }

      const newDownloadCount = (resource.metadata?.downloadCount || 0) + 1;

      await this.updateResource(id, {
        metadata: {
          ...resource.metadata,
          downloadCount: newDownloadCount,
          updatedAt: new Date().toISOString(),
        },
      });

      // Log download event
      await this.logAction("download", id, { downloadCount: newDownloadCount });

      return newDownloadCount;
    } catch (error) {
      console.error(
        `Failed to increment download count for resource ${id}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Bulk import resources (for data migration)
   */
  async bulkImportResources(
    resources: RedisResource[]
  ): Promise<{ successful: number; failed: number; errors: string[] }> {
    let successful = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const resource of resources) {
      try {
        await this.saveResource(resource);
        successful++;
      } catch (error) {
        failed++;
        errors.push(
          `Failed to import resource ${resource.id}: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }

    return { successful, failed, errors };
  }

  /**
   * Get popular resources by download count
   */
  async getPopularResources(limit: number = 10): Promise<RedisResource[]> {
    try {
      const allResources = await this.getByIndex(this.getPublishedIndexKey());

      return allResources
        .filter((resource) => !resource.featureRequest) // Exclude feature requests
        .sort(
          (a, b) =>
            (b.metadata?.downloadCount || 0) - (a.metadata?.downloadCount || 0)
        )
        .slice(0, limit);
    } catch (error) {
      console.error(`Failed to get popular resources:`, error);
      return [];
    }
  }

  /**
   * Implementation of abstract methods
   */
  protected async validateEntity(
    entity: RedisResource
  ): Promise<DataValidationResult> {
    // Required fields for resources
    const requiredFields = ["id", "title"];
    const baseValidation = this.validateRequiredFields(entity, requiredFields);

    if (!baseValidation.valid) {
      return baseValidation;
    }

    const errors: string[] = [];

    // Validate id format (which acts as slug)
    if (entity.id && !/^[a-z0-9-]+$/.test(entity.id)) {
      errors.push(
        "ID must contain only lowercase letters, numbers, and hyphens"
      );
    }

    // Validate published status
    if (
      entity.published !== undefined &&
      typeof entity.published !== "boolean"
    ) {
      errors.push("Published must be a boolean value");
    }

    // Validate tags array
    if (entity.tags && !Array.isArray(entity.tags)) {
      errors.push("Tags must be an array");
    }

    // Validate price
    if (
      entity.price !== undefined &&
      typeof entity.price !== "string" &&
      typeof entity.price !== "number"
    ) {
      errors.push("Price must be a string or number");
    }

    // Validate download count (from metadata)
    if (
      entity.metadata?.downloadCount !== undefined &&
      (typeof entity.metadata.downloadCount !== "number" ||
        entity.metadata.downloadCount < 0)
    ) {
      errors.push("Download count must be a non-negative number");
    }

    // Validate required fields for published resources
    if (entity.published) {
      const publishedRequiredFields = ["description"];
      for (const field of publishedRequiredFields) {
        if (!(field in entity) || !entity[field as keyof RedisResource]) {
          errors.push(`Published resources must have ${field}`);
        }
      }

      // Non-feature request resources need download link
      if (!entity.featureRequest && !entity.downloadLink) {
        errors.push(
          "Published non-feature request resources must have downloadLink"
        );
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  protected getEntityKey(id: string): string {
    return RedisKeys.resource(id);
  }

  protected getPublishedIndexKey(): string {
    return RedisKeys.publishedResources();
  }

  protected getListIndexKey(): string {
    return "index:all:resources";
  }
}

// Export singleton instance
export const resourceRedisService = ResourceRedisService.getInstance();
