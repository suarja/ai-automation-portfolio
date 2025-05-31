export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
    total?: number; // For list endpoints
    page?: number; // For pagination
    limit?: number; // For pagination
  };
}

export interface AuditEntry {
  id: string; // Unique audit ID
  timestamp: string; // ISO timestamp
  action: "create" | "update" | "delete" | "read";
  entityType: "project" | "resource";
  entityId: string; // ID of affected entity
  source: "mcp" | "api" | "admin";
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  metadata: {
    userAgent?: string;
    clientId?: string;
    ipAddress?: string;
    checksum?: string;
  };
}

export interface FileOperationResult {
  success: boolean;
  filePath: string;
  checksum: string;
  timestamp: string;
  error?: string;
}
