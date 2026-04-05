import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

redis.on("connect", () => console.log("Redis conectado"));
redis.on("error", (err) => console.error("Redis erro:", err.message));

// GLOBAL (API)
export const globalLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "global",
  points: 100,
  duration: 60,
  blockDuration: 60
});

// LOGIN (mais restrito)
export const loginLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "login",
  points: 5,
  duration: 60,
  blockDuration: 300
});

// REGISTER
export const registerLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "register",
  points: 10,
  duration: 60,
  blockDuration: 120
});