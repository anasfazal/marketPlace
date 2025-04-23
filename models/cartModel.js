import db from '../config/db.js';
import queries from '../config/queries.js';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

export const cartModel = {
  getOrCreateCart: async (userId) => {
    try {
      let [cart] = await db.query(queries.getCartByUserId, [userId]);
      
      if (!cart) {
        const [result] = await db.query(queries.createCart, [userId]);
        cart = { id: result.insertId };
      }
      
      return cart.id;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  addItem: async (userId, productId, quantity) => {
    try {
      const cartId = await cartModel.getOrCreateCart(userId);
      await db.query(queries.addToCart, [cartId, productId, quantity]);
      return true;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  getCart: async (userId) => {
    try {
      const [items] = await db.query(queries.getCartDetails, [userId]);
      return items;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  updateItem: async (userId, productId, quantity) => {
    try {
      const cartId = await cartModel.getOrCreateCart(userId);
      const [result] = await db.query(queries.updateCartItem, [
        quantity,
        cartId,
        productId
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  removeItem: async (userId, productId) => {
    try {
      const cartId = await cartModel.getOrCreateCart(userId);
      const [result] = await db.query(queries.removeFromCart, [
        cartId,
        productId
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  }
};