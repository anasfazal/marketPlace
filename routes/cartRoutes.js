import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { 
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart
} from '../controllers/cartController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

router.use(
  asyncHandler(authenticate),
  asyncHandler(authorize('customer'))
);

router.post('/', asyncHandler(addToCart));
router.get('/', 
  cacheMiddleware('cart'),
  asyncHandler(getCart)
);
router.put('/:productId', asyncHandler(updateCartItem));
router.delete('/:productId', asyncHandler(removeFromCart));

export default router;