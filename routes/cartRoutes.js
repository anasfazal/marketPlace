import express from 'express';
import { addProductToCart, removeProductFromCart, getCartItems, updateCartItemQuantity } from '../controllers/cartController.js';
import { verifyToken, isCustomer } from '../middleware/auth.js';

const router = express.Router();

// Customer only
router.post('/', verifyToken, isCustomer, addProductToCart);
router.get('/', verifyToken, isCustomer, getCartItems);  // No need for customerId in params
router.put('/:productId', verifyToken, isCustomer, updateCartItemQuantity);  // No customerId in params
router.delete('/:productId', verifyToken, isCustomer, removeProductFromCart);  // No customerId in params

export default router;
