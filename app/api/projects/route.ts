import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/lib/types/api";
import { Project } from "@/lib/types/project";
import { hybridDataService } from "@/lib/services/hybridDataService";

export async function GET(request: NextRequest) {
  try {
    // Get all projects from the hybrid service
    const projects = await hybridDataService.getProjects();

    // Filter only published projects for frontend consumption
    const publishedProjects = projects.filter(
      (project) => project.metadata && project.metadata.status === "published"
    );

    // Create standardized API response
    const response: ApiResponse<Project[]> = {
      success: true,
      data: publishedProjects,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}`,
        total: publishedProjects.length,
      },
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error fetching projects:", error);

    const errorResponse: ApiResponse<never> = {
      success: false,
      error: {
        code: "PROJECTS_FETCH_ERROR",
        message: error.message || "Failed to fetch projects",
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}`,
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
