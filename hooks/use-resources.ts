import { useState, useEffect } from "react";
import { Resource } from "@/lib/types/resource";
import { ApiResponse } from "@/lib/types/api";
import { FEATURE_REQUEST_RESOURCES } from "@/lib/data/feature-requests";

interface UseResourcesReturn {
  resources: Array<Resource & { featureRequest?: boolean }>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useResources(): UseResourcesReturn {
  const [resources, setResources] = useState<
    Array<Resource & { featureRequest?: boolean }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/resources");
      const data: ApiResponse<Resource[]> = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || "Failed to fetch resources");
      }

      // Merge API data with feature request resources
      const apiResources = (data.data || []).map((resource) => ({
        ...resource,
        featureRequest: false,
      }));
      const allResources = [...apiResources];

      // Sort: featured first, then by creation date (newest first)
      allResources.sort((a, b) => {
        if (a.metadata.featured && !b.metadata.featured) return -1;
        if (!a.metadata.featured && b.metadata.featured) return 1;
        return (
          new Date(b.metadata.createdAt).getTime() -
          new Date(a.metadata.createdAt).getTime()
        );
      });

      setResources(allResources);
    } catch (err: any) {
      console.error("Error fetching resources:", err);
      setError(err.message || "Failed to fetch resources");

      // On error, fallback to just feature request items
      setResources(FEATURE_REQUEST_RESOURCES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const refetch = () => {
    fetchResources();
  };

  return {
    resources,
    loading,
    error,
    refetch,
  };
}
