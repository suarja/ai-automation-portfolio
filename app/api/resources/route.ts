import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/lib/types/api";
import { Resource } from "@/lib/types/resource";
import { hybridDataService } from "@/lib/services/hybridDataService";

export async function GET(request: NextRequest) {
  try {
    // Get all resources from the hybrid service
    const resources = await hybridDataService.getResources();

    // Filter only published resources for frontend consumption
    const publishedResources = resources.filter(
      (resource) =>
        resource.metadata && resource.metadata.status === "published"
    );

    // Create standardized API response
    const response: ApiResponse<Resource[]> = {
      success: true,
      data: publishedResources,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}`,
        total: publishedResources.length,
      },
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error fetching resources:", error);

    const errorResponse: ApiResponse<never> = {
      success: false,
      error: {
        code: "RESOURCES_FETCH_ERROR",
        message: error.message || "Failed to fetch resources",
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}`,
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
