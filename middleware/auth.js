import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';
import redisClient from '../config/redis.js';

export const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(HTTP_STATUS_CODES.Unauthorized).json({
      status: HTTP_STATUS_CODES.Unauthorized,
      message: 'Authentication required'
    });
  }

  try {
    const isBlacklisted = await redisClient.get(`token:blacklist:${token}`);
    if (isBlacklisted) {
      return res.status(HTTP_STATUS_CODES.Unauthorized).json({
        status: HTTP_STATUS_CODES.Unauthorized,
        message: 'Token revoked'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(HTTP_STATUS_CODES.Unauthorized).json({
      status: HTTP_STATUS_CODES.Unauthorized,
      message: 'Invalid token'
    });
  }
});

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(HTTP_STATUS_CODES.Forbidden).json({
      status: HTTP_STATUS_CODES.Forbidden,
      message: 'Insufficient permissions'
    });
  }
  next();
};

export const addToBlacklist = async (token, expiresAt) => {
  const ttl = Math.floor((expiresAt - Date.now()) / 1000);
  await redisClient.setex(`token:blacklist:${token}`, ttl, '1');
};