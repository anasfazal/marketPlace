import db from '../config/db.js';
import redisClient from '../config/redis.js';
import queries from '../config/queries.js';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

const CART_TTL = 300; 

export const cartModel = {
  getOrCreateCart: async (userId) => {
    try {
      const cacheKey = `cart:${userId}`;
      const cachedCart = await redisClient.get(cacheKey);
      
      if (cachedCart) return JSON.parse(cachedCart).id;

      let [cart] = await db.query(queries.getCartByUserId, [userId]);
      if (!cart) {
        const [result] = await db.query(queries.createCart, [userId]);
        cart = { id: result.insertId };
      }
      
      await redisClient.setex(cacheKey, CART_TTL, JSON.stringify(cart));
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
      await redisClient.del(`cart:items:${userId}`);
      return true;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  getCart: async (userId) => {
    try {
      const cacheKey = `cart:items:${userId}`;
      const cachedItems = await redisClient.get(cacheKey);
      if (cachedItems) return JSON.parse(cachedItems);

      const [items] = await db.query(queries.getCartDetails, [userId]);
      await redisClient.setex(cacheKey, CART_TTL, JSON.stringify(items));
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
      await redisClient.del(`cart:items:${userId}`);
      return result.affectedRows > 0;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  removeItem: async (userId, productId) => {
    try {
      const cartId = await cartModel.getOrCreateCart(userId);
      const [result] = await db.query(queries.removeFromCart, [cartId, productId]);
      await redisClient.del(`cart:items:${userId}`);
      return result.affectedRows > 0;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  }
};