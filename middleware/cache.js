import redisClient from '../config/redis.js';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

export const cacheMiddleware = (resourceType) => {
  return async (req, res, next) => {
    const cacheKey = `${resourceType}:${req.originalUrl}`;
    
    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(HTTP_STATUS_CODES.OK).json({
          status: HTTP_STATUS_CODES.OK,
          fromCache: true,
          data: JSON.parse(cachedData)
        });
      }

      const originalJson = res.json;
      res.json = (body) => {
        let ttl = 300; // Default 5 minutes
        
        switch(resourceType) {
          case 'products':
            ttl = 3600; // 1 hour for product listings
            break;
          case 'user':
            ttl = 1800; // 30 minutes for user data
            break;
          case 'cart':
            ttl = 300; // 5 minutes for cart data
            break;
        }

        redisClient.setex(cacheKey, ttl, JSON.stringify(body.data));
        originalJson.call(res, body);
      };
      
      next();
    } catch (err) {
      console.error('Cache error:', err);
      next();
    }
  };
};