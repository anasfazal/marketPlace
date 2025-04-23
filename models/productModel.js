import db from '../config/db.js';
import queries from '../config/queries.js';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

export const productModel = {
  create: async (productData) => {
    try {
      const [result] = await db.query(queries.insertProduct, [
        productData.name,
        productData.description,
        productData.price,
        productData.sellerId
      ]);
      return result.insertId;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  findAll: async () => {
    try {
      const [products] = await db.query(queries.selectAllProducts);
      return products;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  findById: async (id) => {
    try {
      const [product] = await db.query(queries.selectProductById, [id]);
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
      return result.affectedRows > 0;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  delete: async (id, sellerId) => {
    try {
      const [result] = await db.query(queries.deleteProduct, [id, sellerId]);
      return result.affectedRows > 0;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  }
};