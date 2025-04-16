import rateLimit from 'express-rate-limit';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';


export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    res.status(HTTP_STATUS_CODES.TooManyRequests).json({
      message: 'Too many requests from this IP, please try again later.',
    });
  },
});


export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5, 
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    res.status(HTTP_STATUS_CODES.TooManyRequests).json({
      message: 'Too many login attempts. Please try again after 10 minutes.',
    });
  },
});
