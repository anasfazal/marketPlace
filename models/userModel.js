import db from '../config/db.js';
import queries from '../config/queries.js';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

const insertUser = async (name, email, hashedPassword, role, age) => {
  try {
    const [result] = await db.query(queries.insertUser, [name, email, hashedPassword, role, age]);
    return result.insertId;
  } catch (error) {
    error.status = HTTP_STATUS_CODES.InternalServerError;
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [rows] = await db.query(queries.getUserByEmail, [email]);
    return rows[0] || null;
  } catch (error) {
    error.status = HTTP_STATUS_CODES.InternalServerError;
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const [rows] = await db.query(queries.getUserById, [id]);
    return rows[0] || null;
  } catch (error) {
    error.status = HTTP_STATUS_CODES.InternalServerError;
    throw error;
  }
};

const updateUser = async (id, name, email, hashedPassword, role, age) => {
  try {
    const [result] = await db.query(queries.updateUser, [name, email, hashedPassword, role, age, id]);
    return result.affectedRows > 0;
  } catch (error) {
    error.status = HTTP_STATUS_CODES.InternalServerError;
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const [result] = await db.query(queries.deleteUser, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    error.status = HTTP_STATUS_CODES.InternalServerError;
    throw error;
  }
};


export const userModel = {
  insertUser,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser
};
