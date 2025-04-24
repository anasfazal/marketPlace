import db from '../config/db.js';
import redisClient from '../config/redis.js';
import queries from '../config/queries.js';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

const USER_TTL = 1800; 

export const userModel = {
  insertUser: async (name, email, hashedPassword, role, age) => {
    try {
      const [result] = await db.query(queries.insertUser, [
        name, email, hashedPassword, role, age
      ]);
      return result.insertId;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  getUserByEmail: async (email) => {
    try {
      const cacheKey = `users:email:${email}`;
      const cachedUser = await redisClient.get(cacheKey);
      if (cachedUser) return JSON.parse(cachedUser);

      const [rows] = await db.query(queries.getUserByEmail, [email]);
      if (rows[0]) {
        await redisClient.setex(cacheKey, USER_TTL, JSON.stringify(rows[0]));
      }
      return rows[0] || null;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const cacheKey = `users:id:${id}`;
      const cachedUser = await redisClient.get(cacheKey);
      if (cachedUser) return JSON.parse(cachedUser);

      const [rows] = await db.query(queries.getUserById, [id]);
      if (rows[0]) {
        await redisClient.setex(cacheKey, USER_TTL, JSON.stringify(rows[0]));
      }
      return rows[0] || null;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  updateUser: async (id, name, email, hashedPassword, role, age) => {
    try {
      const [result] = await db.query(queries.updateUser, [
        name, email, hashedPassword, role, age, id
      ]);
      
      await redisClient.del(`users:id:${id}`);
      await redisClient.del(`users:email:${email}`);
      return result.affectedRows > 0;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const [result] = await db.query(queries.deleteUser, [id]);
      await redisClient.del(`users:id:${id}`);
      return result.affectedRows > 0;
    } catch (error) {
      error.status = HTTP_STATUS_CODES.InternalServerError;
      throw error;
    }
  }
};