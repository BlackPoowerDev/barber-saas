import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";
import "dotenv/config";

const client = new Redis(process.env.REDIS_URL);
// const client = new Redis({
//   host: "127.0.0.1",
//   port: 6379,
// });

// GLOBAL (API)
export const globalLimiter = new RateLimiterRedis({
  storeClient: client,
  keyPrefix: "global",
  points: 50,
  duration: 60,
  blockDuration: 60,
});

// LOGIN (mais restrito)
export const loginLimiter = new RateLimiterRedis({
  storeClient: client,
  keyPrefix: "login",
  points: 5,
  duration: 60,
  blockDuration: 300,
});

// REGISTER
export const registerLimiter = new RateLimiterRedis({
  storeClient: client,
  keyPrefix: "register",
  points: 10,
  duration: 60,
  blockDuration: 120,
});
