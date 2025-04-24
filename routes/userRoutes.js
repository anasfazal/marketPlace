import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { 
  registerUser,
  getUser,
  updateUserDetails,
  deleteUserAccount
} from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

router.post('/register',
  asyncHandler(authenticate),
  asyncHandler(authorize('admin')),
  asyncHandler(registerUser)
);

router.get('/:id',
  asyncHandler(authenticate),
  cacheMiddleware('user'),
  asyncHandler(getUser)
);

router.put('/:id',
  asyncHandler(authenticate),
  asyncHandler(authorize('admin')),
  asyncHandler(updateUserDetails)
);

router.delete('/:id',
  asyncHandler(authenticate),
  asyncHandler(authorize('admin')),
  asyncHandler(deleteUserAccount)
);

export default router;