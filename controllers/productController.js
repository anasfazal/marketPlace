import {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
  } from '../models/productModel.js';
  import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';
  
  export const addNewProduct = async (req, res) => {
    try {
      const { name, description, price } = req.body;
      const sellerId = req.user.id;
  
      if (!name || !description || !price) {
        return res.status(HTTP_STATUS_CODES.BadRequest).json({ message: 'All fields are required' });
      }
  
      await addProduct(name, description, price, sellerId);
      res.status(HTTP_STATUS_CODES.Created).json({ message: 'Product added successfully' });
    } catch (err) {
      console.error('Error adding product:', err);
      res.status(HTTP_STATUS_CODES.InternalServerError).json({ message: 'Something went wrong' });
    }
  };
  
  export const getProducts = async (req, res) => {
    try {
      const products = await getAllProducts();
      res.status(HTTP_STATUS_CODES.OK).json(products);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(HTTP_STATUS_CODES.InternalServerError).json({ message: 'Something went wrong' });
    }
  };
  
  export const getProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await getProductById(productId);
  
      if (!product) {
        return res.status(HTTP_STATUS_CODES.NotFound).json({ message: 'Product not found' });
      }
  
      res.status(HTTP_STATUS_CODES.OK).json(product);
    } catch (err) {
      console.error('Error fetching product:', err);
      res.status(HTTP_STATUS_CODES.InternalServerError).json({ message: 'Something went wrong' });
    }
  };
  
  export const updateProductDetails = async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, description, price } = req.body;
      const sellerId = req.user.id;
  
      if (!name || !description || !price) {
        return res.status(HTTP_STATUS_CODES.BadRequest).json({ message: 'All fields are required' });
      }
  
      const product = await getProductById(productId);
      if (!product || product.sellerId !== sellerId) {
        return res.status(HTTP_STATUS_CODES.Forbidden).json({ message: 'You do not have permission to update this product' });
      }
  
      await updateProduct(productId, name, description, price);
      res.status(HTTP_STATUS_CODES.OK).json({ message: 'Product updated successfully' });
    } catch (err) {
      console.error('Error updating product:', err);
      res.status(HTTP_STATUS_CODES.InternalServerError).json({ message: 'Something went wrong' });
    }
  };
  
  export const deleteProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const sellerId = req.user.id;
  
      const product = await getProductById(productId);
      if (!product) {
        return res.status(HTTP_STATUS_CODES.NotFound).json({ message: 'Product not found' });
      }
  
      if (product.sellerId !== sellerId) {
        return res.status(HTTP_STATUS_CODES.Forbidden).json({ message: 'You do not have permission to delete this product' });
      }
  
      await deleteProduct(productId);
      res.status(HTTP_STATUS_CODES.OK).json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error('Error deleting product:', err);
      res.status(HTTP_STATUS_CODES.InternalServerError).json({ message: 'Something went wrong' });
    }
  };
  