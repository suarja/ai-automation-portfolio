import { useState, useEffect } from "react";
import { Project } from "@/lib/types/project";
import { ApiResponse } from "@/lib/types/api";
import { FEATURE_REQUEST_PROJECTS } from "@/lib/data/feature-requests";

interface UseProjectReturn {
  project: (Project & { featureRequest?: boolean }) | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProject(slug: string): UseProjectReturn {
  const [project, setProject] = useState<
    (Project & { featureRequest?: boolean }) | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async () => {
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/projects/${slug}`);
      const data: ApiResponse<Project> = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || "Failed to fetch project");
      }

      setProject({ ...data.data!, featureRequest: false });
    } catch (err: any) {
      console.error("Error fetching project:", err);

      // Fallback to feature request projects
      const featureRequestProject = FEATURE_REQUEST_PROJECTS.find(
        (p) => p.id === slug
      );
      if (featureRequestProject) {
        setProject(featureRequestProject);
        setError(null); // Clear error since we found a fallback
      } else {
        setError(err.message || "Failed to fetch project");
        setProject(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [slug]);

  const refetch = () => {
    fetchProject();
  };

  return {
    project,
    loading,
    error,
    refetch,
  };
}
