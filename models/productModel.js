import db from '../config/db.js';
import redisClient from '../config/redis.js';
import queries from '../config/queries.js';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

const PRODUCTS_TTL = 3600; 
const PRODUCT_TTL = 1800;

export const productModel = {
  create: async (productData) => {
    try {
      const [result] = await db.query(queries.insertProduct, [
        productData.name,
        productData.description,
        productData.price,
        productData.sellerId
      ]);
      
      await redisClient.del('products:all');
      return result.insertId;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  findAll: async () => {
    try {
      const cacheKey = 'products:all';
      const cachedProducts = await redisClient.get(cacheKey);
      if (cachedProducts) return JSON.parse(cachedProducts);

      const [products] = await db.query(queries.selectAllProducts);
      await redisClient.setex(cacheKey, PRODUCTS_TTL, JSON.stringify(products));
      return products;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  findById: async (id) => {
    try {
      const cacheKey = `products:${id}`;
      const cachedProduct = await redisClient.get(cacheKey);
      if (cachedProduct) return JSON.parse(cachedProduct);

      const [product] = await db.query(queries.selectProductById, [id]);
      if (product[0]) {
        await redisClient.setex(cacheKey, PRODUCT_TTL, JSON.stringify(product[0]));
      }
      return product[0] || null;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  update: async (id, sellerId, updates) => {
    try {
      const [result] = await db.query(queries.updateProduct, [
        updates.name,
        updates.description,
        updates.price,
        id,
        sellerId
      ]);
      
      await redisClient.del(`products:${id}`);
      await redisClient.del('products:all');
      return result.affectedRows > 0;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  delete: async (id, sellerId) => {
    try {
      const [result] = await db.query(queries.deleteProduct, [id, sellerId]);
      await redisClient.del(`products:${id}`);
      await redisClient.del('products:all');
      return result.affectedRows > 0;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  }
};