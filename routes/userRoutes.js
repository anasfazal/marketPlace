import express from 'express';
import {
  registerUser,
  getUser,
  updateUserDetails,
  deleteUserAccount
} from '../controllers/userController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Only admins can manage users
router.post('/register', verifyToken, isAdmin, registerUser);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, isAdmin, updateUserDetails);
router.delete('/:id', verifyToken, isAdmin, deleteUserAccount);

export default router;
