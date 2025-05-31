import {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from "../types/project";
import { FileOperations } from "./fileOperations";
import { PROJECTS_FILE } from "../utils/constants";
import { ProjectSchema } from "../utils/validation";

export class ProjectService {
  /**
   * Get all projects
   */
  static async listProjects(): Promise<Project[]> {
    try {
      const projects = await FileOperations.safeRead(PROJECTS_FILE);
      return Array.isArray(projects) ? projects : [];
    } catch (error: any) {
      throw new Error(`Failed to list projects: ${error.message}`);
    }
  }

  /**
   * Get a single project by ID
   */
  static async getProject(id: string): Promise<Project> {
    try {
      const projects = await this.listProjects();
      const project = projects.find((p) => p.id === id);

      if (!project) {
        throw new Error(`Project with ID "${id}" not found`);
      }

      return project;
    } catch (error: any) {
      throw new Error(`Failed to get project: ${error.message}`);
    }
  }

  /**
   * Create a new project
   */
  static async createProject(input: CreateProjectInput): Promise<Project> {
    try {
      const now = new Date().toISOString();

      // Create full project object with metadata
      const project: Project = {
        ...input,
        id: this.generateProjectId(input.title),
        metadata: {
          createdAt: now,
          updatedAt: now,
          featured: false,
          status: "draft",
          ...input.metadata,
        },
      };

      // Validate the project data
      const validatedProject = ProjectSchema.parse(project);

      // Update projects file
      const updatedProjects = await FileOperations.atomicUpdate(
        PROJECTS_FILE,
        (projects: Project[]) => {
          // Ensure we have an array
          const projectList = Array.isArray(projects) ? projects : [];

          // Check for duplicate ID
          if (projectList.some((p) => p.id === project.id)) {
            throw new Error(`Project with ID "${project.id}" already exists`);
          }

          return [...projectList, validatedProject];
        }
      );

      return validatedProject;
    } catch (error: any) {
      throw new Error(`Failed to create project: ${error.message}`);
    }
  }

  /**
   * Update an existing project
   */
  static async updateProject(
    id: string,
    input: UpdateProjectInput
  ): Promise<Project> {
    try {
      const now = new Date().toISOString();

      const updatedProjects = await FileOperations.atomicUpdate(
        PROJECTS_FILE,
        (projects: Project[]) => {
          const projectList = Array.isArray(projects) ? projects : [];
          const projectIndex = projectList.findIndex((p) => p.id === id);

          if (projectIndex === -1) {
            throw new Error(`Project with ID "${id}" not found`);
          }

          // Merge updates with existing project
          const updatedProject: Project = {
            ...projectList[projectIndex],
            ...input,
            id, // Ensure ID cannot be changed
            metadata: {
              ...projectList[projectIndex].metadata,
              ...input.metadata,
              updatedAt: now,
            },
          };

          // Validate the updated project
          const validatedProject = ProjectSchema.parse(updatedProject);

          // Replace the project in the array
          const newProjectList = [...projectList];
          newProjectList[projectIndex] = validatedProject;

          return newProjectList;
        }
      );

      // Return the updated project
      return updatedProjects.find((p: Project) => p.id === id)!;
    } catch (error: any) {
      throw new Error(`Failed to update project: ${error.message}`);
    }
  }

  /**
   * Delete a project
   */
  static async deleteProject(id: string): Promise<void> {
    try {
      await FileOperations.atomicUpdate(
        PROJECTS_FILE,
        (projects: Project[]) => {
          const projectList = Array.isArray(projects) ? projects : [];
          const projectExists = projectList.some((p) => p.id === id);

          if (!projectExists) {
            throw new Error(`Project with ID "${id}" not found`);
          }

          return projectList.filter((p) => p.id !== id);
        }
      );
    } catch (error: any) {
      throw new Error(`Failed to delete project: ${error.message}`);
    }
  }

  /**
   * Get featured projects
   */
  static async getFeaturedProjects(): Promise<Project[]> {
    try {
      const projects = await this.listProjects();
      return projects.filter(
        (p) => p.metadata.featured && p.metadata.status === "published"
      );
    } catch (error: any) {
      throw new Error(`Failed to get featured projects: ${error.message}`);
    }
  }

  /**
   * Search projects by tags or title
   */
  static async searchProjects(query: string): Promise<Project[]> {
    try {
      const projects = await this.listProjects();
      const lowercaseQuery = query.toLowerCase();

      return projects.filter((p) => {
        return (
          p.title.toLowerCase().includes(lowercaseQuery) ||
          p.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
          p.description.toLowerCase().includes(lowercaseQuery)
        );
      });
    } catch (error: any) {
      throw new Error(`Failed to search projects: ${error.message}`);
    }
  }

  /**
   * Generate a unique project ID from title
   */
  private static generateProjectId(title: string): string {
    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50);

    const timestamp = Date.now().toString().slice(-6);
    return `${base}-${timestamp}`;
  }

  /**
   * Initialize projects file with empty array if it doesn't exist
   */
  static async initializeProjectsFile(): Promise<void> {
    try {
      await FileOperations.safeRead(PROJECTS_FILE);
    } catch (error) {
      // File doesn't exist, create it with empty array
      await FileOperations.atomicWrite(PROJECTS_FILE, [], true);
    }
  }
}
