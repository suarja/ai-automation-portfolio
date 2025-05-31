import {
  Resource,
  CreateResourceInput,
  UpdateResourceInput,
} from "../types/resource";
import { FileOperations } from "./fileOperations";
import { RESOURCES_FILE } from "../utils/constants";
import { ResourceSchema } from "../utils/validation";

export class ResourceService {
  /**
   * Get all resources
   */
  static async listResources(): Promise<Resource[]> {
    try {
      const resources = await FileOperations.safeRead(RESOURCES_FILE);
      return Array.isArray(resources) ? resources : [];
    } catch (error: any) {
      throw new Error(`Failed to list resources: ${error.message}`);
    }
  }

  /**
   * Get a single resource by ID
   */
  static async getResource(id: string): Promise<Resource> {
    try {
      const resources = await this.listResources();
      const resource = resources.find((r) => r.id === id);

      if (!resource) {
        throw new Error(`Resource with ID "${id}" not found`);
      }

      return resource;
    } catch (error: any) {
      throw new Error(`Failed to get resource: ${error.message}`);
    }
  }

  /**
   * Create a new resource
   */
  static async createResource(input: CreateResourceInput): Promise<Resource> {
    try {
      const now = new Date().toISOString();

      // Create full resource object with metadata
      const resource: Resource = {
        ...input,
        id: this.generateResourceId(input.title),
        metadata: {
          createdAt: now,
          updatedAt: now,
          featured: false,
          status: "draft",
          downloadCount: 0,
          ...input.metadata,
        },
      };

      // Validate the resource data
      const validatedResource = ResourceSchema.parse(resource);

      // Update resources file
      const updatedResources = await FileOperations.atomicUpdate(
        RESOURCES_FILE,
        (resources: Resource[]) => {
          // Ensure we have an array
          const resourceList = Array.isArray(resources) ? resources : [];

          // Check for duplicate ID
          if (resourceList.some((r) => r.id === resource.id)) {
            throw new Error(`Resource with ID "${resource.id}" already exists`);
          }

          return [...resourceList, validatedResource];
        }
      );

      return validatedResource;
    } catch (error: any) {
      throw new Error(`Failed to create resource: ${error.message}`);
    }
  }

  /**
   * Update an existing resource
   */
  static async updateResource(
    id: string,
    input: UpdateResourceInput
  ): Promise<Resource> {
    try {
      const now = new Date().toISOString();

      const updatedResources = await FileOperations.atomicUpdate(
        RESOURCES_FILE,
        (resources: Resource[]) => {
          const resourceList = Array.isArray(resources) ? resources : [];
          const resourceIndex = resourceList.findIndex((r) => r.id === id);

          if (resourceIndex === -1) {
            throw new Error(`Resource with ID "${id}" not found`);
          }

          // Merge updates with existing resource
          const updatedResource: Resource = {
            ...resourceList[resourceIndex],
            ...input,
            id, // Ensure ID cannot be changed
            metadata: {
              ...resourceList[resourceIndex].metadata,
              ...input.metadata,
              updatedAt: now,
            },
          };

          // Validate the updated resource
          const validatedResource = ResourceSchema.parse(updatedResource);

          // Replace the resource in the array
          const newResourceList = [...resourceList];
          newResourceList[resourceIndex] = validatedResource;

          return newResourceList;
        }
      );

      // Return the updated resource
      return updatedResources.find((r: Resource) => r.id === id)!;
    } catch (error: any) {
      throw new Error(`Failed to update resource: ${error.message}`);
    }
  }

  /**
   * Delete a resource
   */
  static async deleteResource(id: string): Promise<void> {
    try {
      await FileOperations.atomicUpdate(
        RESOURCES_FILE,
        (resources: Resource[]) => {
          const resourceList = Array.isArray(resources) ? resources : [];
          const resourceExists = resourceList.some((r) => r.id === id);

          if (!resourceExists) {
            throw new Error(`Resource with ID "${id}" not found`);
          }

          return resourceList.filter((r) => r.id !== id);
        }
      );
    } catch (error: any) {
      throw new Error(`Failed to delete resource: ${error.message}`);
    }
  }

  /**
   * Get featured resources
   */
  static async getFeaturedResources(): Promise<Resource[]> {
    try {
      const resources = await this.listResources();
      return resources.filter(
        (r) => r.metadata.featured && r.metadata.status === "published"
      );
    } catch (error: any) {
      throw new Error(`Failed to get featured resources: ${error.message}`);
    }
  }

  /**
   * Search resources by tags or title
   */
  static async searchResources(query: string): Promise<Resource[]> {
    try {
      const resources = await this.listResources();
      const lowercaseQuery = query.toLowerCase();

      return resources.filter((r) => {
        return (
          r.title.toLowerCase().includes(lowercaseQuery) ||
          r.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
          r.description.toLowerCase().includes(lowercaseQuery) ||
          r.longDescription.toLowerCase().includes(lowercaseQuery)
        );
      });
    } catch (error: any) {
      throw new Error(`Failed to search resources: ${error.message}`);
    }
  }

  /**
   * Increment download count for a resource
   */
  static async incrementDownloadCount(id: string): Promise<Resource> {
    try {
      return await this.updateResource(id, {
        metadata: {
          downloadCount:
            (await this.getResource(id)).metadata.downloadCount! + 1,
        },
      });
    } catch (error: any) {
      throw new Error(`Failed to increment download count: ${error.message}`);
    }
  }

  /**
   * Get resources by category (tags)
   */
  static async getResourcesByCategory(category: string): Promise<Resource[]> {
    try {
      const resources = await this.listResources();
      return resources.filter(
        (r) =>
          r.tags.some((tag) => tag.toLowerCase() === category.toLowerCase()) &&
          r.metadata.status === "published"
      );
    } catch (error: any) {
      throw new Error(`Failed to get resources by category: ${error.message}`);
    }
  }

  /**
   * Generate a unique resource ID from title
   */
  private static generateResourceId(title: string): string {
    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50);

    const timestamp = Date.now().toString().slice(-6);
    return `${base}-${timestamp}`;
  }

  /**
   * Initialize resources file with empty array if it doesn't exist
   */
  static async initializeResourcesFile(): Promise<void> {
    try {
      await FileOperations.safeRead(RESOURCES_FILE);
    } catch (error) {
      // File doesn't exist, create it with empty array
      await FileOperations.atomicWrite(RESOURCES_FILE, [], true);
    }
  }
}
