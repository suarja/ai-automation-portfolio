import { Redis } from "@upstash/redis";

/**
 * Redis Client Configuration
 * Implements dual client setup (read/write + read-only) with comprehensive error handling
 * Following architecture from creative-redis-architecture.md
 */

// Environment variable validation
const requiredEnvVars = {
  url: process.env.REDIS_KV_REST_API_URL,
  token: process.env.REDIS_KV_REST_API_TOKEN,
  readOnlyToken: process.env.REDIS_KV_REST_API_READ_ONLY_TOKEN,
};

// Validate environment variables
for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    throw new Error(
      `Missing required environment variable: REDIS_KV_REST_API_${key.toUpperCase()}`
    );
  }
}

/**
 * Primary Redis client with read/write capabilities
 * Used for all write operations and administrative tasks
 */
export const redis = new Redis({
  url: requiredEnvVars.url!,
  token: requiredEnvVars.token!,
  retry: {
    retries: 3,
    backoff: (retryCount) => Math.exp(retryCount) * 50, // Exponential backoff
  },
});

/**
 * Read-only Redis client for optimized read operations
 * Used for read-heavy operations to distribute load
 */
export const redisReadOnly = new Redis({
  url: requiredEnvVars.url!,
  token: requiredEnvVars.readOnlyToken!,
  retry: {
    retries: 3,
    backoff: (retryCount) => Math.exp(retryCount) * 50,
  },
});

/**
 * Redis client factory with connection validation
 * Provides health checks and connection management
 */
export class RedisClientManager {
  private static instance: RedisClientManager;
  private isHealthy = true;
  private lastHealthCheck = 0;
  private readonly HEALTH_CHECK_INTERVAL = 30000; // 30 seconds

  private constructor() {}

  static getInstance(): RedisClientManager {
    if (!RedisClientManager.instance) {
      RedisClientManager.instance = new RedisClientManager();
    }
    return RedisClientManager.instance;
  }

  /**
   * Perform health check on Redis connections
   */
  async healthCheck(): Promise<boolean> {
    const now = Date.now();

    // Skip if recently checked
    if (
      now - this.lastHealthCheck < this.HEALTH_CHECK_INTERVAL &&
      this.isHealthy
    ) {
      return this.isHealthy;
    }

    try {
      // Test both clients with a simple ping
      const [primaryHealth, readOnlyHealth] = await Promise.allSettled([
        redis.ping(),
        redisReadOnly.ping(),
      ]);

      this.isHealthy =
        primaryHealth.status === "fulfilled" &&
        readOnlyHealth.status === "fulfilled";

      this.lastHealthCheck = now;

      if (!this.isHealthy) {
        console.error("Redis health check failed:", {
          primary: primaryHealth.status,
          readOnly: readOnlyHealth.status,
        });
      }

      return this.isHealthy;
    } catch (error) {
      console.error("Redis health check error:", error);
      this.isHealthy = false;
      this.lastHealthCheck = now;
      return false;
    }
  }

  /**
   * Get the appropriate Redis client based on operation type
   */
  async getClient(operation: "read" | "write" = "read"): Promise<Redis> {
    const isHealthy = await this.healthCheck();

    if (!isHealthy) {
      throw new Error("Redis clients are not healthy");
    }

    return operation === "write" ? redis : redisReadOnly;
  }

  /**
   * Execute operation with circuit breaker pattern
   */
  async executeWithFallback<T>(
    operation: () => Promise<T>,
    fallback?: () => Promise<T>
  ): Promise<T> {
    try {
      const isHealthy = await this.healthCheck();

      if (!isHealthy && fallback) {
        console.warn("Redis unhealthy, using fallback");
        return await fallback();
      }

      return await operation();
    } catch (error) {
      console.error("Redis operation failed:", error);

      if (fallback) {
        console.warn("Using fallback after Redis error");
        return await fallback();
      }

      throw error;
    }
  }
}

/**
 * Utility functions for Redis key management
 */
export const RedisKeys = {
  // Data keys following namespace design from creative phase
  project: (id: string) => `data:projects:${id}`,
  resource: (id: string) => `data:resources:${id}`,

  // Index keys for efficient queries
  publishedProjects: () => `index:published:projects`,
  publishedResources: () => `index:published:resources`,
  featuredProjects: () => `index:featured:projects`,
  featuredResources: () => `index:featured:resources`,

  // Audit and metadata keys
  auditEntries: () => `audit:entries`,
  auditStats: () => `audit:stats`,
  schemaVersion: () => `meta:schema:version`,

  // Cache keys for API responses
  cacheProjects: () => `cache:api:projects`,
  cacheResources: () => `cache:api:resources`,
  cacheProject: (id: string) => `cache:api:projects:${id}`,
  cacheResource: (id: string) => `cache:api:resources:${id}`,
} as const;

/**
 * Redis connection testing utility
 */
export async function testRedisConnection(): Promise<{
  primary: boolean;
  readOnly: boolean;
  latency: { primary: number; readOnly: number };
}> {
  const startTime = Date.now();

  const [primaryResult, readOnlyResult] = await Promise.allSettled([
    redis.ping(),
    redisReadOnly.ping(),
  ]);

  const midTime = Date.now();

  // Test basic set/get operations
  const testKey = `test:connection:${Date.now()}`;
  const testValue = "connection-test";

  const [setResult, getResult] = await Promise.allSettled([
    redis.set(testKey, testValue, { ex: 10 }), // 10 second TTL
    redis.get(testKey),
  ]);

  const endTime = Date.now();

  // Cleanup test key
  try {
    await redis.del(testKey);
  } catch (error) {
    console.warn("Failed to cleanup test key:", error);
  }

  return {
    primary:
      primaryResult.status === "fulfilled" && setResult.status === "fulfilled",
    readOnly: readOnlyResult.status === "fulfilled",
    latency: {
      primary: midTime - startTime,
      readOnly: endTime - midTime,
    },
  };
}

// Export singleton instance
export const redisManager = RedisClientManager.getInstance();
