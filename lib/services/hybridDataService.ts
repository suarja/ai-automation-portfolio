import { featureFlags } from "@/lib/redis/feature-flags";
import { projectRedisService } from "./redis/projectRedisService";
import { resourceRedisService } from "./redis/resourceRedisService";
import { auditRedisService } from "./redis/auditRedisService";
import { ProjectService } from "./projectService";
import { ResourceService } from "./resourceService";
import { AuditService } from "./auditService";
import { Project } from "@/lib/types/project";
import { Resource } from "@/lib/types/resource";

/**
 * Hybrid Data Service
 * Manages gradual migration from JSON to Redis based on feature flags
 * Provides dual-read functionality with fallback logic
 */

export interface DataSourceStats {
  source: "json" | "redis" | "both";
  operationType: "read" | "write";
  entityType: "projects" | "resources";
  success: boolean;
  latency: number;
  timestamp: string;
}

export class HybridDataService {
  private static instance: HybridDataService;
  private stats: DataSourceStats[] = [];
  private readonly MAX_STATS = 1000; // Keep last 1000 operations

  private constructor() {}

  static getInstance(): HybridDataService {
    if (!HybridDataService.instance) {
      HybridDataService.instance = new HybridDataService();
    }
    return HybridDataService.instance;
  }

  /**
   * Get projects with dual-read logic
   */
  async getProjects(): Promise<Project[]> {
    const startTime = Date.now();
    let source: "json" | "redis" | "both" = "json";
    let success = false;

    try {
      const redisEnabled = await featureFlags.isRedisEnabled(
        "read",
        "projects"
      );

      if (redisEnabled) {
        source = "redis";
        try {
          // Try Redis first
          const redisProjects =
            await projectRedisService.getPublishedProjects();
          success = true;
          this.recordStats(
            "redis",
            "read",
            "projects",
            success,
            Date.now() - startTime
          );
          return redisProjects as Project[];
        } catch (redisError) {
          console.error("Redis read failed, falling back to JSON:", redisError);

          // Fallback to JSON
          source = "json";
          const jsonProjects = await ProjectService.listProjects();
          success = true;
          this.recordStats(
            "json",
            "read",
            "projects",
            success,
            Date.now() - startTime
          );
          return jsonProjects;
        }
      } else {
        // Use JSON only
        const jsonProjects = await ProjectService.listProjects();
        success = true;
        this.recordStats(
          "json",
          "read",
          "projects",
          success,
          Date.now() - startTime
        );
        return jsonProjects;
      }
    } catch (error) {
      this.recordStats(
        source,
        "read",
        "projects",
        success,
        Date.now() - startTime
      );
      throw error;
    }
  }

  /**
   * Get single project with dual-read logic
   */
  async getProject(slug: string): Promise<Project | null> {
    const startTime = Date.now();
    let source: "json" | "redis" | "both" = "json";
    let success = false;

    try {
      const redisEnabled = await featureFlags.isRedisEnabled(
        "read",
        "projects"
      );

      if (redisEnabled) {
        source = "redis";
        try {
          // Try Redis first
          const redisProject = await projectRedisService.getProjectBySlug(slug);
          success = true;
          this.recordStats(
            "redis",
            "read",
            "projects",
            success,
            Date.now() - startTime
          );
          return redisProject as Project | null;
        } catch (redisError) {
          console.error("Redis read failed, falling back to JSON:", redisError);

          // Fallback to JSON
          source = "json";
          const jsonProject = await ProjectService.getProject(slug);
          success = true;
          this.recordStats(
            "json",
            "read",
            "projects",
            success,
            Date.now() - startTime
          );
          return jsonProject;
        }
      } else {
        // Use JSON only
        const jsonProject = await ProjectService.getProject(slug);
        success = true;
        this.recordStats(
          "json",
          "read",
          "projects",
          success,
          Date.now() - startTime
        );
        return jsonProject;
      }
    } catch (error) {
      this.recordStats(
        source,
        "read",
        "projects",
        success,
        Date.now() - startTime
      );
      throw error;
    }
  }

  /**
   * Get resources with dual-read logic
   */
  async getResources(): Promise<Resource[]> {
    const startTime = Date.now();
    let source: "json" | "redis" | "both" = "json";
    let success = false;

    try {
      const redisEnabled = await featureFlags.isRedisEnabled(
        "read",
        "resources"
      );

      if (redisEnabled) {
        source = "redis";
        try {
          // Try Redis first
          const redisResources =
            await resourceRedisService.getPublishedResources();
          success = true;
          this.recordStats(
            "redis",
            "read",
            "resources",
            success,
            Date.now() - startTime
          );
          return redisResources as Resource[];
        } catch (redisError) {
          console.error("Redis read failed, falling back to JSON:", redisError);

          // Fallback to JSON
          source = "json";
          const jsonResources = await ResourceService.listResources();
          success = true;
          this.recordStats(
            "json",
            "read",
            "resources",
            success,
            Date.now() - startTime
          );
          return jsonResources;
        }
      } else {
        // Use JSON only
        const jsonResources = await ResourceService.listResources();
        success = true;
        this.recordStats(
          "json",
          "read",
          "resources",
          success,
          Date.now() - startTime
        );
        return jsonResources;
      }
    } catch (error) {
      this.recordStats(
        source,
        "read",
        "resources",
        success,
        Date.now() - startTime
      );
      throw error;
    }
  }

  /**
   * Get single resource with dual-read logic
   */
  async getResource(slug: string): Promise<Resource | null> {
    const startTime = Date.now();
    let source: "json" | "redis" | "both" = "json";
    let success = false;

    try {
      const redisEnabled = await featureFlags.isRedisEnabled(
        "read",
        "resources"
      );

      if (redisEnabled) {
        source = "redis";
        try {
          // Try Redis first
          const redisResource = await resourceRedisService.getResourceBySlug(
            slug
          );
          success = true;
          this.recordStats(
            "redis",
            "read",
            "resources",
            success,
            Date.now() - startTime
          );
          return redisResource as Resource | null;
        } catch (redisError) {
          console.error("Redis read failed, falling back to JSON:", redisError);

          // Fallback to JSON
          source = "json";
          const jsonResource = await ResourceService.getResource(slug);
          success = true;
          this.recordStats(
            "json",
            "read",
            "resources",
            success,
            Date.now() - startTime
          );
          return jsonResource;
        }
      } else {
        // Use JSON only
        const jsonResource = await ResourceService.getResource(slug);
        success = true;
        this.recordStats(
          "json",
          "read",
          "resources",
          success,
          Date.now() - startTime
        );
        return jsonResource;
      }
    } catch (error) {
      this.recordStats(
        source,
        "read",
        "resources",
        success,
        Date.now() - startTime
      );
      throw error;
    }
  }

  /**
   * Update project with dual-write logic
   */
  async updateProject(
    slug: string,
    updates: Partial<Project>
  ): Promise<Project | null> {
    const startTime = Date.now();
    let source: "json" | "redis" | "both" = "json";
    let success = false;

    try {
      const redisWriteEnabled = await featureFlags.isRedisEnabled(
        "write",
        "projects"
      );
      const isDualMode = await featureFlags.isDualMode();

      if (redisWriteEnabled && isDualMode) {
        // Dual-write mode: write to both systems
        source = "both";

        const [redisResult, jsonResult] = await Promise.allSettled([
          this.updateProjectInRedis(slug, updates),
          ProjectService.updateProject(slug, updates),
        ]);

        if (
          redisResult.status === "fulfilled" &&
          jsonResult.status === "fulfilled"
        ) {
          success = true;
          this.recordStats(
            "both",
            "write",
            "projects",
            success,
            Date.now() - startTime
          );

          // Validate consistency
          await this.validateProjectConsistency(slug);

          return redisResult.value;
        } else {
          // Handle partial failure
          console.error("Dual-write partial failure:", {
            redisResult,
            jsonResult,
          });

          // If Redis succeeded but JSON failed, we continue with Redis
          if (redisResult.status === "fulfilled") {
            success = true;
            this.recordStats(
              "both",
              "write",
              "projects",
              success,
              Date.now() - startTime
            );
            return redisResult.value;
          }

          throw new Error("Both Redis and JSON write operations failed");
        }
      } else if (redisWriteEnabled) {
        // Redis-only mode
        source = "redis";
        const result = await this.updateProjectInRedis(slug, updates);
        success = true;
        this.recordStats(
          "redis",
          "write",
          "projects",
          success,
          Date.now() - startTime
        );
        return result;
      } else {
        // JSON-only mode
        source = "json";
        const result = await ProjectService.updateProject(slug, updates);
        success = true;
        this.recordStats(
          "json",
          "write",
          "projects",
          success,
          Date.now() - startTime
        );
        return result;
      }
    } catch (error) {
      this.recordStats(
        source,
        "write",
        "projects",
        success,
        Date.now() - startTime
      );
      throw error;
    }
  }

  /**
   * Update resource with dual-write logic
   */
  async updateResource(
    slug: string,
    updates: Partial<Resource>
  ): Promise<Resource | null> {
    const startTime = Date.now();
    let source: "json" | "redis" | "both" = "json";
    let success = false;

    try {
      const redisWriteEnabled = await featureFlags.isRedisEnabled(
        "write",
        "resources"
      );
      const isDualMode = await featureFlags.isDualMode();

      if (redisWriteEnabled && isDualMode) {
        // Dual-write mode: write to both systems
        source = "both";

        const [redisResult, jsonResult] = await Promise.allSettled([
          this.updateResourceInRedis(slug, updates),
          ResourceService.updateResource(slug, updates),
        ]);

        if (
          redisResult.status === "fulfilled" &&
          jsonResult.status === "fulfilled"
        ) {
          success = true;
          this.recordStats(
            "both",
            "write",
            "resources",
            success,
            Date.now() - startTime
          );

          // Validate consistency
          await this.validateResourceConsistency(slug);

          return redisResult.value;
        } else {
          // Handle partial failure
          console.error("Dual-write partial failure:", {
            redisResult,
            jsonResult,
          });

          // If Redis succeeded but JSON failed, we continue with Redis
          if (redisResult.status === "fulfilled") {
            success = true;
            this.recordStats(
              "both",
              "write",
              "resources",
              success,
              Date.now() - startTime
            );
            return redisResult.value;
          }

          throw new Error("Both Redis and JSON write operations failed");
        }
      } else if (redisWriteEnabled) {
        // Redis-only mode
        source = "redis";
        const result = await this.updateResourceInRedis(slug, updates);
        success = true;
        this.recordStats(
          "redis",
          "write",
          "resources",
          success,
          Date.now() - startTime
        );
        return result;
      } else {
        // JSON-only mode
        source = "json";
        const result = await ResourceService.updateResource(slug, updates);
        success = true;
        this.recordStats(
          "json",
          "write",
          "resources",
          success,
          Date.now() - startTime
        );
        return result;
      }
    } catch (error) {
      this.recordStats(
        source,
        "write",
        "resources",
        success,
        Date.now() - startTime
      );
      throw error;
    }
  }

  /**
   * Helper: Update project in Redis
   */
  private async updateProjectInRedis(
    slug: string,
    updates: Partial<Project>
  ): Promise<Project | null> {
    const existingProject = await projectRedisService.getProjectBySlug(slug);
    if (!existingProject) {
      return null;
    }

    return await projectRedisService.updateProject(existingProject.id, updates);
  }

  /**
   * Helper: Update resource in Redis
   */
  private async updateResourceInRedis(
    slug: string,
    updates: Partial<Resource>
  ): Promise<Resource | null> {
    const existingResource = await resourceRedisService.getResourceBySlug(slug);
    if (!existingResource) {
      return null;
    }

    return await resourceRedisService.updateResource(
      existingResource.id,
      updates
    );
  }

  /**
   * Validate data consistency between Redis and JSON
   */
  async validateProjectConsistency(slug: string): Promise<boolean> {
    try {
      const [redisProject, jsonProject] = await Promise.all([
        projectRedisService.getProjectBySlug(slug),
        ProjectService.getProject(slug),
      ]);

      if (!redisProject || !jsonProject) {
        console.warn(
          `Consistency check failed: Project ${slug} missing in one source`
        );
        return false;
      }

      // Compare key fields
      const isConsistent =
        redisProject.title === jsonProject.title &&
        redisProject.description === jsonProject.description &&
        redisProject.published === jsonProject.published;

      if (!isConsistent) {
        console.warn(`Consistency check failed: Project ${slug} data mismatch`);
        await auditRedisService.logEntry({
          action: "consistency_violation",
          entityType: "projects",
          entityId: slug,
          changes: { redis: redisProject, json: jsonProject },
          source: "hybrid_service",
        });
      }

      return isConsistent;
    } catch (error) {
      console.error(
        `Failed to validate project consistency for ${slug}:`,
        error
      );
      return false;
    }
  }

  /**
   * Validate resource consistency between Redis and JSON
   */
  async validateResourceConsistency(slug: string): Promise<boolean> {
    try {
      const [redisResource, jsonResource] = await Promise.all([
        resourceRedisService.getResourceBySlug(slug),
        ResourceService.getResource(slug),
      ]);

      if (!redisResource || !jsonResource) {
        console.warn(
          `Consistency check failed: Resource ${slug} missing in one source`
        );
        return false;
      }

      // Compare key fields
      const isConsistent =
        redisResource.title === jsonResource.title &&
        redisResource.description === jsonResource.description &&
        redisResource.published === jsonResource.published;

      if (!isConsistent) {
        console.warn(
          `Consistency check failed: Resource ${slug} data mismatch`
        );
        await auditRedisService.logEntry({
          action: "consistency_violation",
          entityType: "resources",
          entityId: slug,
          changes: { redis: redisResource, json: jsonResource },
          source: "hybrid_service",
        });
      }

      return isConsistent;
    } catch (error) {
      console.error(
        `Failed to validate resource consistency for ${slug}:`,
        error
      );
      return false;
    }
  }

  /**
   * Record operation statistics
   */
  private recordStats(
    source: "json" | "redis" | "both",
    operationType: "read" | "write",
    entityType: "projects" | "resources",
    success: boolean,
    latency: number
  ): void {
    const stat: DataSourceStats = {
      source,
      operationType,
      entityType,
      success,
      latency,
      timestamp: new Date().toISOString(),
    };

    this.stats.push(stat);

    // Keep only recent stats
    if (this.stats.length > this.MAX_STATS) {
      this.stats = this.stats.slice(-this.MAX_STATS);
    }
  }

  /**
   * Get operation statistics
   */
  getOperationStats(): {
    total: number;
    bySource: Record<string, number>;
    byOperation: Record<string, number>;
    byEntity: Record<string, number>;
    averageLatency: { redis: number; json: number; both: number };
    successRate: number;
  } {
    const total = this.stats.length;
    const bySource: Record<string, number> = {};
    const byOperation: Record<string, number> = {};
    const byEntity: Record<string, number> = {};
    const latencies: Record<string, number[]> = {
      redis: [],
      json: [],
      both: [],
    };
    let successCount = 0;

    for (const stat of this.stats) {
      bySource[stat.source] = (bySource[stat.source] || 0) + 1;
      byOperation[stat.operationType] =
        (byOperation[stat.operationType] || 0) + 1;
      byEntity[stat.entityType] = (byEntity[stat.entityType] || 0) + 1;

      latencies[stat.source].push(stat.latency);

      if (stat.success) successCount++;
    }

    const averageLatency = {
      redis:
        latencies.redis.length > 0
          ? latencies.redis.reduce((a, b) => a + b, 0) / latencies.redis.length
          : 0,
      json:
        latencies.json.length > 0
          ? latencies.json.reduce((a, b) => a + b, 0) / latencies.json.length
          : 0,
      both:
        latencies.both.length > 0
          ? latencies.both.reduce((a, b) => a + b, 0) / latencies.both.length
          : 0,
    };

    return {
      total,
      bySource,
      byOperation,
      byEntity,
      averageLatency,
      successRate: total > 0 ? successCount / total : 0,
    };
  }
}

// Export singleton instance
export const hybridDataService = HybridDataService.getInstance();
