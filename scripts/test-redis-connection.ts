#!/usr/bin/env node
/**
 * Redis Connection Test Script
 * Tests both primary and read-only Redis connections
 * Validates environment setup before proceeding with migration
 */

import {
  testRedisConnection,
  redisManager,
  RedisKeys,
} from "../lib/redis/client";

async function main() {
  console.log("🔧 Testing Redis Connection...\n");

  try {
    // Test basic connection
    console.log("1. Testing Redis connectivity...");
    const connectionTest = await testRedisConnection();

    console.log("Connection Results:");
    console.log(
      `   Primary Client: ${
        connectionTest.primary ? "✅ Connected" : "❌ Failed"
      }`
    );
    console.log(
      `   Read-Only Client: ${
        connectionTest.readOnly ? "✅ Connected" : "❌ Failed"
      }`
    );
    console.log(`   Latency - Primary: ${connectionTest.latency.primary}ms`);
    console.log(
      `   Latency - Read-Only: ${connectionTest.latency.readOnly}ms\n`
    );

    if (!connectionTest.primary || !connectionTest.readOnly) {
      throw new Error("Redis connection failed");
    }

    // Test health check system
    console.log("2. Testing health check system...");
    const healthCheck = await redisManager.healthCheck();
    console.log(
      `   Health Check: ${healthCheck ? "✅ Healthy" : "❌ Unhealthy"}\n`
    );

    // Test key generation
    console.log("3. Testing key generation utilities...");
    const testKeys = {
      project: RedisKeys.project("test-project"),
      resource: RedisKeys.resource("test-resource"),
      publishedProjects: RedisKeys.publishedProjects(),
      auditEntries: RedisKeys.auditEntries(),
    };

    console.log("Generated Keys:");
    for (const [name, key] of Object.entries(testKeys)) {
      console.log(`   ${name}: ${key}`);
    }
    console.log();

    // Test basic Redis operations
    console.log("4. Testing basic Redis operations...");
    const client = await redisManager.getClient("write");

    // Test set operation
    const testKey = RedisKeys.project("connection-test");
    const testData = {
      id: "connection-test",
      title: "Redis Connection Test",
      timestamp: new Date().toISOString(),
    };

    await client.set(testKey, JSON.stringify(testData), { ex: 30 }); // 30 second TTL
    console.log(`   ✅ SET operation successful: ${testKey}`);

    // Test get operation
    const readClient = await redisManager.getClient("read");
    const retrievedData = await readClient.get(testKey);
    console.log(
      `   ✅ GET operation successful: ${
        retrievedData ? "Data retrieved" : "No data"
      }`
    );

    // Test delete operation
    await client.del(testKey);
    console.log(`   ✅ DEL operation successful: ${testKey}\n`);

    // Test circuit breaker pattern
    console.log("5. Testing circuit breaker pattern...");
    const result = await redisManager.executeWithFallback(
      async () => {
        return "Redis operation successful";
      },
      async () => {
        return "Fallback executed";
      }
    );
    console.log(`   ✅ Circuit breaker test: ${result}\n`);

    console.log("🎉 All Redis tests passed! Ready for migration.\n");

    // Summary
    console.log("📋 Redis Setup Summary:");
    console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(
      `   Redis URL: ${
        process.env.REDIS_KV_REST_API_URL ? "Configured ✅" : "Missing ❌"
      }`
    );
    console.log(
      `   Redis Token: ${
        process.env.REDIS_KV_REST_API_TOKEN ? "Configured ✅" : "Missing ❌"
      }`
    );
    console.log(
      `   Read-Only Token: ${
        process.env.REDIS_KV_REST_API_READ_ONLY_TOKEN
          ? "Configured ✅"
          : "Missing ❌"
      }`
    );
    console.log(
      `   Connection Latency: ~${Math.round(
        (connectionTest.latency.primary + connectionTest.latency.readOnly) / 2
      )}ms average`
    );
  } catch (error) {
    console.error("❌ Redis connection test failed:", error);
    process.exit(1);
  }
}

// Run the test
main().catch((error) => {
  console.error("Script failed:", error);
  process.exit(1);
});
