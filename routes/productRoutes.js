import express from 'express';
import {
  addNewProduct,
  getProducts,
  getProduct,
  updateProductDetails,
  deleteProductById
} from '../controllers/productController.js';
import { verifyToken, isSeller } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/', verifyToken, isSeller, addNewProduct);
router.put('/:id', verifyToken, isSeller, updateProductDetails);
router.delete('/:id', verifyToken, isSeller, deleteProductById);

export default router;
