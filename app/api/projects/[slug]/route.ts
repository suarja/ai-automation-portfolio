import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/lib/services/projectService";
import { ApiResponse } from "@/lib/types/api";
import { Project } from "@/lib/types/project";

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params;

    if (!slug) {
      const errorResponse: ApiResponse<never> = {
        success: false,
        error: {
          code: "INVALID_SLUG",
          message: "Project slug is required",
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: `req_${Date.now()}`,
        },
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Get project by ID from the service
    const project = await ProjectService.getProject(slug);

    // Check if project is published
    if (project.metadata.status !== "published") {
      const notFoundResponse: ApiResponse<never> = {
        success: false,
        error: {
          code: "PROJECT_NOT_PUBLISHED",
          message: "Project not found or not published",
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: `req_${Date.now()}`,
        },
      };

      return NextResponse.json(notFoundResponse, { status: 404 });
    }

    // Create standardized API response
    const response: ApiResponse<Project> = {
      success: true,
      data: project,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}`,
      },
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error fetching project:", error);

    // Handle specific "not found" error
    if (error.message.includes("not found")) {
      const notFoundResponse: ApiResponse<never> = {
        success: false,
        error: {
          code: "PROJECT_NOT_FOUND",
          message: "Project not found",
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: `req_${Date.now()}`,
        },
      };

      return NextResponse.json(notFoundResponse, { status: 404 });
    }

    // General error response
    const errorResponse: ApiResponse<never> = {
      success: false,
      error: {
        code: "PROJECT_FETCH_ERROR",
        message: error.message || "Failed to fetch project",
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}`,
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
