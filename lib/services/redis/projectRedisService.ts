import {
  BaseRedisService,
  BaseEntity,
  DataValidationResult,
} from "./baseRedisService";
import { RedisKeys } from "@/lib/redis/client";
import { Project } from "@/lib/types/project";

/**
 * Redis Service for Projects
 * Handles all Redis operations for project entities
 * Extends BaseRedisService with project-specific logic
 */

// Extend Project interface to ensure it matches BaseEntity
interface RedisProject extends Project, BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  published?: boolean;
}

export class ProjectRedisService extends BaseRedisService<RedisProject> {
  protected entityType = "projects";
  protected keyPrefix = "data:projects";

  private static instance: ProjectRedisService;

  private constructor() {
    super();
  }

  static getInstance(): ProjectRedisService {
    if (!ProjectRedisService.instance) {
      ProjectRedisService.instance = new ProjectRedisService();
    }
    return ProjectRedisService.instance;
  }

  /**
   * Get all published projects
   */
  async getPublishedProjects(): Promise<RedisProject[]> {
    return await this.getByIndex(this.getPublishedIndexKey());
  }

  /**
   * Get project by ID
   */
  async getProject(id: string): Promise<RedisProject | null> {
    return await this.getFromRedis(id);
  }

  /**
   * Get project by slug
   */
  async getProjectBySlug(slug: string): Promise<RedisProject | null> {
    try {
      // In our system, the slug IS the id
      // First, get all projects and find by id (which is the slug)
      const allProjects = await this.getByIndex(this.getListIndexKey());

      return allProjects.find((project) => project.id === slug) || null;
    } catch (error) {
      console.error(`Failed to get project by slug ${slug}:`, error);
      return null;
    }
  }

  /**
   * Get multiple projects by IDs
   */
  async getProjectsByIds(ids: string[]): Promise<RedisProject[]> {
    return await this.getManyFromRedis(ids);
  }

  /**
   * Save project to Redis
   */
  async saveProject(project: RedisProject): Promise<void> {
    await this.saveToRedis(project);
  }

  /**
   * Update project
   */
  async updateProject(
    id: string,
    updates: Partial<RedisProject>
  ): Promise<RedisProject | null> {
    const existingProject = await this.getProject(id);

    if (!existingProject) {
      return null;
    }

    const updatedProject = {
      ...existingProject,
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    await this.saveProject(updatedProject);
    return updatedProject;
  }

  /**
   * Delete project
   */
  async deleteProject(id: string): Promise<boolean> {
    return await this.deleteFromRedis(id);
  }

  /**
   * Get projects count
   */
  async getProjectsCount(publishedOnly: boolean = false): Promise<number> {
    const indexKey = publishedOnly
      ? this.getPublishedIndexKey()
      : this.getListIndexKey();
    return await this.getEntityCount(indexKey);
  }

  /**
   * Search projects by title or tags
   */
  async searchProjects(query: string): Promise<RedisProject[]> {
    try {
      const allProjects = await this.getByIndex(this.getListIndexKey());
      const searchTerm = query.toLowerCase();

      return allProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm) ||
          project.description?.toLowerCase().includes(searchTerm) ||
          project.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error(`Failed to search projects with query "${query}":`, error);
      return [];
    }
  }

  /**
   * Get projects by tag
   */
  async getProjectsByTag(tag: string): Promise<RedisProject[]> {
    try {
      const allProjects = await this.getByIndex(this.getListIndexKey());

      return allProjects.filter((project) => project.tags?.includes(tag));
    } catch (error) {
      console.error(`Failed to get projects by tag "${tag}":`, error);
      return [];
    }
  }

  /**
   * Bulk import projects (for data migration)
   */
  async bulkImportProjects(
    projects: RedisProject[]
  ): Promise<{ successful: number; failed: number; errors: string[] }> {
    let successful = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const project of projects) {
      try {
        await this.saveProject(project);
        successful++;
      } catch (error) {
        failed++;
        errors.push(
          `Failed to import project ${project.id}: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }

    return { successful, failed, errors };
  }

  /**
   * Implementation of abstract methods
   */
  protected async validateEntity(
    entity: RedisProject
  ): Promise<DataValidationResult> {
    // Required fields for projects
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

    // Validate required fields for published projects
    if (entity.published) {
      const publishedRequiredFields = ["description"];
      for (const field of publishedRequiredFields) {
        if (!(field in entity) || !entity[field as keyof RedisProject]) {
          errors.push(`Published projects must have ${field}`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  protected getEntityKey(id: string): string {
    return RedisKeys.project(id);
  }

  protected getPublishedIndexKey(): string {
    return RedisKeys.publishedProjects();
  }

  protected getListIndexKey(): string {
    return "index:all:projects";
  }
}

// Export singleton instance
export const projectRedisService = ProjectRedisService.getInstance();
