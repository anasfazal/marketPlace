// routes/userRoutes.js
import express from 'express';
import {
  registerUser,
  getUser,
  updateUserDetails,
  deleteUserAccount
} from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', authenticate, authorize('admin'), registerUser);
router.get('/:id', authenticate, getUser); 
router.put('/:id', authenticate, authorize('admin'), updateUserDetails); 
router.delete('/:id', authenticate, authorize('admin'), deleteUserAccount); 

export default router;
