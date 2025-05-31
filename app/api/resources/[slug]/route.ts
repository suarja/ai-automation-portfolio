import { NextRequest, NextResponse } from "next/server";
import { ResourceService } from "@/lib/services/resourceService";
import { ApiResponse } from "@/lib/types/api";
import { Resource } from "@/lib/types/resource";

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
          message: "Resource slug is required",
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: `req_${Date.now()}`,
        },
      };

      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Get resource by ID from the service
    const resource = await ResourceService.getResource(slug);

    // Check if resource is published
    if (resource.metadata.status !== "published") {
      const notFoundResponse: ApiResponse<never> = {
        success: false,
        error: {
          code: "RESOURCE_NOT_PUBLISHED",
          message: "Resource not found or not published",
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: `req_${Date.now()}`,
        },
      };

      return NextResponse.json(notFoundResponse, { status: 404 });
    }

    // Create standardized API response
    const response: ApiResponse<Resource> = {
      success: true,
      data: resource,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}`,
      },
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error fetching resource:", error);

    // Handle specific "not found" error
    if (error.message.includes("not found")) {
      const notFoundResponse: ApiResponse<never> = {
        success: false,
        error: {
          code: "RESOURCE_NOT_FOUND",
          message: "Resource not found",
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
        code: "RESOURCE_FETCH_ERROR",
        message: error.message || "Failed to fetch resource",
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}`,
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
