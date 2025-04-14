import db from '../config/db.js';
import queries from '../config/queries.js';

export const createUserTable = async () => {
  await db.execute(queries.createTable);
};

export const insertUser = async (name, age) => {
  await db.execute(queries.insertUser, [name, age]);
};

export const insertMultipleUsers = async (users) => {
  await db.query(queries.insertMultipleUsers, [users]);
};

export const getAllUsers = async () => {
  const [rows] = await db.execute(queries.getAllUsers);
  return rows;
};

export const getUserById = async (id) => {
  const [user] = await db.execute(queries.getUserById, [id]);
  return user;
};

export const updateUser = async (id, name, age) => {
  await db.execute(queries.updateUser, [name, age, id]);
};

export const deleteUser = async (id) => {
  await db.execute(queries.deleteUser, [id]);
};
