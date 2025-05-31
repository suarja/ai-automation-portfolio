export interface Resource {
  id: string; // Unique identifier (slug)
  title: string; // Resource title
  description: string; // Short description
  longDescription: string; // Detailed description
  image: string; // Icon/image path
  tags: string[]; // Category tags
  price: string; // Price (or "Gratuit")
  downloadLink: string; // Download/purchase URL
  gallery: string[]; // Gallery images
  metadata: {
    createdAt: string; // Creation timestamp
    updatedAt: string; // Last update timestamp
    featured: boolean; // Featured resource flag
    status: "published" | "draft" | "archived";
    downloadCount?: number; // Download tracking
  };
}

export type CreateResourceInput = Omit<Resource, "id" | "metadata"> & {
  metadata?: Partial<Resource["metadata"]>;
};

export type UpdateResourceInput = Partial<Omit<Resource, "id" | "metadata">> & {
  metadata?: Partial<Resource["metadata"]>;
};
