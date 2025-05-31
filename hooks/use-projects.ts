import { useState, useEffect } from "react";
import { Project } from "@/lib/types/project";
import { ApiResponse } from "@/lib/types/api";
import { FEATURE_REQUEST_PROJECTS } from "@/lib/data/feature-requests";

interface UseProjectsReturn {
  projects: Array<Project & { featureRequest?: boolean }>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<
    Array<Project & { featureRequest?: boolean }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/projects");
      const data: ApiResponse<Project[]> = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || "Failed to fetch projects");
      }

      // Merge API data with feature request projects
      const apiProjects = (data.data || []).map((project) => ({
        ...project,
        featureRequest: false,
      }));
      const allProjects = [...apiProjects];

      // Sort: featured first, then by creation date (newest first)
      allProjects.sort((a, b) => {
        if (a.metadata.featured && !b.metadata.featured) return -1;
        if (!a.metadata.featured && b.metadata.featured) return 1;
        return (
          new Date(b.metadata.createdAt).getTime() -
          new Date(a.metadata.createdAt).getTime()
        );
      });

      setProjects(allProjects);
    } catch (err: any) {
      console.error("Error fetching projects:", err);
      setError(err.message || "Failed to fetch projects");

      // On error, fallback to just feature request items
      setProjects(FEATURE_REQUEST_PROJECTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const refetch = () => {
    fetchProjects();
  };

  return {
    projects,
    loading,
    error,
    refetch,
  };
}
