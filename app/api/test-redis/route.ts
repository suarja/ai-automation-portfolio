import { NextResponse } from "next/server";
import {
  testRedisConnection,
  redisManager,
  RedisKeys,
} from "@/lib/redis/client";

/**
 * Redis Connection Test API Route
 * Tests Redis connectivity and operations in Next.js environment
 */
export async function GET() {
  try {
    console.log("🔧 Testing Redis Connection via API...");

    // Test basic connection
    const connectionTest = await testRedisConnection();

    if (!connectionTest.primary || !connectionTest.readOnly) {
      return NextResponse.json(
        {
          success: false,
          error: "Redis connection failed",
          details: connectionTest,
        },
        { status: 500 }
      );
    }

    // Test health check system
    const healthCheck = await redisManager.healthCheck();

    // Test key generation
    const testKeys = {
      project: RedisKeys.project("test-project"),
      resource: RedisKeys.resource("test-resource"),
      publishedProjects: RedisKeys.publishedProjects(),
      auditEntries: RedisKeys.auditEntries(),
    };

    // Test basic Redis operations
    const client = await redisManager.getClient("write");

    // Test set operation
    const testKey = RedisKeys.project("api-connection-test");
    const testData = {
      id: "api-connection-test",
      title: "Redis API Connection Test",
      timestamp: new Date().toISOString(),
    };

    await client.set(testKey, JSON.stringify(testData), { ex: 30 }); // 30 second TTL

    // Test get operation
    const readClient = await redisManager.getClient("read");
    const retrievedData = await readClient.get(testKey);

    // Test delete operation
    await client.del(testKey);

    // Test circuit breaker pattern
    const circuitBreakerResult = await redisManager.executeWithFallback(
      async () => "Redis operation successful",
      async () => "Fallback executed"
    );

    return NextResponse.json({
      success: true,
      message: "🎉 All Redis tests passed! Ready for migration.",
      results: {
        connectionTest,
        healthCheck,
        testKeys,
        operations: {
          set: "successful",
          get: retrievedData ? "data retrieved" : "no data",
          delete: "successful",
          circuitBreaker: circuitBreakerResult,
        },
        environment: {
          nodeEnv: process.env.NODE_ENV || "development",
          redisUrl: process.env.REDIS_KV_REST_API_URL
            ? "Configured ✅"
            : "Missing ❌",
          redisToken: process.env.REDIS_KV_REST_API_TOKEN
            ? "Configured ✅"
            : "Missing ❌",
          readOnlyToken: process.env.REDIS_KV_REST_API_READ_ONLY_TOKEN
            ? "Configured ✅"
            : "Missing ❌",
          averageLatency: Math.round(
            (connectionTest.latency.primary + connectionTest.latency.readOnly) /
              2
          ),
        },
      },
    });
  } catch (error) {
    console.error("❌ Redis connection test failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Redis test failed",
        message: error instanceof Error ? error.message : "Unknown error",
        details: {
          environment: {
            redisUrl: process.env.REDIS_KV_REST_API_URL
              ? "Configured"
              : "Missing",
            redisToken: process.env.REDIS_KV_REST_API_TOKEN
              ? "Configured"
              : "Missing",
            readOnlyToken: process.env.REDIS_KV_REST_API_READ_ONLY_TOKEN
              ? "Configured"
              : "Missing",
          },
        },
      },
      { status: 500 }
    );
  }
}
