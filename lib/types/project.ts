export interface Project {
  id: string; // Unique identifier (slug)
  title: string; // Project title
  result: string; // Main achievement/result
  tags: string[]; // Technology tags
  image: string; // Icon/image path
  client: {
    type: string; // Client type/industry
    size: string; // Client size
    objective: string; // Client's objective
  };
  challenge: string; // Problem description
  solution: {
    description: string; // Solution overview
    tools: string[]; // Tools used
    features: string[]; // Key features list
    videoUrl?: string; // Demo video URL
    screenshots: string[]; // Screenshot URLs
    demoLink?: string; // Live demo URL
  };
  description: string; // Detailed description
  testimonial: {
    text: string; // Client testimonial
    author: string; // Client name
    avatar: string; // Avatar image
  };
  results: string[]; // Key results achieved
  insight: {
    title: string; // Insight section title
    text: string; // Insight content
    resourceLink?: {
      text: string; // Link text
      url: string; // Link URL
    };
  };
  metadata: {
    createdAt: string; // Creation timestamp
    updatedAt: string; // Last update timestamp
    featured: boolean; // Featured project flag
    status: "published" | "draft" | "archived";
  };
}

export type CreateProjectInput = Omit<Project, "id" | "metadata"> & {
  metadata?: Partial<Project["metadata"]>;
};

export type UpdateProjectInput = Partial<Omit<Project, "id" | "metadata">> & {
  metadata?: Partial<Project["metadata"]>;
};
