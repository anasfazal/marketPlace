import { RateLimiterRedis } from 'rate-limiter-flexible';
import redisClient from '../config/redis.js';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

const globalLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rl:global',
  points: 100,
  duration: 15 * 60, 
});

const authLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rl:auth',
  points: 5, 
  duration: 10 * 60, 
});

const rateLimitMiddleware = (limiter, customMessage) => {
  return async (req, res, next) => {
    try {
      await limiter.consume(req.ip);
      next();
    } catch {
      res.status(HTTP_STATUS_CODES.TooManyRequests).json({
        message: customMessage,
      });
    }
  };
};

export const globalRateLimiter = rateLimitMiddleware(
  globalLimiter,
  'Too many requests from this IP, please try again later.'
);

export const authRateLimiter = rateLimitMiddleware(
  authLimiter,
  'Too many login attempts. Please try again after 10 minutes.'
);
