import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(HTTP_STATUS_CODES.Unauthorized).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(HTTP_STATUS_CODES.Unauthorized).json({ message: 'Invalid token' });
  }
};


export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(HTTP_STATUS_CODES.Forbidden).json({ message: 'Admin access required' });
  }
  next();
};

export const isSeller = (req, res, next) => {
  if (req.user.role !== 'seller') {
    return res.status(HTTP_STATUS_CODES.Forbidden).json({ message: 'Seller access required' });
  }
  next();
};

export const isCustomer = (req, res, next) => {
  if (req.user.role !== 'customer') {
    return res.status(HTTP_STATUS_CODES.Forbidden).json({ message: 'Customer access required' });
  }
  next();
};
