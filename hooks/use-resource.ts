import { useState, useEffect } from "react";
import { Resource } from "@/lib/types/resource";
import { ApiResponse } from "@/lib/types/api";
import { FEATURE_REQUEST_RESOURCES } from "@/lib/data/feature-requests";

interface UseResourceReturn {
  resource: (Resource & { featureRequest?: boolean }) | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useResource(slug: string): UseResourceReturn {
  const [resource, setResource] = useState<
    (Resource & { featureRequest?: boolean }) | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResource = async () => {
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/resources/${slug}`);
      const data: ApiResponse<Resource> = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || "Failed to fetch resource");
      }

      setResource({ ...data.data!, featureRequest: false });
    } catch (err: any) {
      console.error("Error fetching resource:", err);

      // Fallback to feature request resources
      const featureRequestResource = FEATURE_REQUEST_RESOURCES.find(
        (r) => r.id === slug
      );
      if (featureRequestResource) {
        setResource(featureRequestResource);
        setError(null); // Clear error since we found a fallback
      } else {
        setError(err.message || "Failed to fetch resource");
        setResource(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResource();
  }, [slug]);

  const refetch = () => {
    fetchResource();
  };

  return {
    resource,
    loading,
    error,
    refetch,
  };
}
