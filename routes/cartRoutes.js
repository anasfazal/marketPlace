import express from 'express';
import { addProductToCart, removeProductFromCart, getCartItems, updateCartItemQuantity } from '../controllers/cartController.js';
import { verifyToken, isCustomer } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, isCustomer, addProductToCart);
router.get('/', verifyToken, isCustomer, getCartItems);  
router.put('/:productId', verifyToken, isCustomer, updateCartItemQuantity);  
router.delete('/:productId', verifyToken, isCustomer, removeProductFromCart);  

export default router;
