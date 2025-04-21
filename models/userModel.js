import db from '../config/db.js';
import queries from '../config/queries.js';


export const insertUser = async (name, email, password, role, age) => {
  await db.execute(queries.insertUser, [name, email, password, role, age]);
};


export const getUserByEmail = async (email) => {
  const [rows] = await db.execute(queries.getUserByEmail, [email]);
  return rows[0]; 
};


export const getUserById = async (id) => {
  const [rows] = await db.execute(queries.getUserById, [id]);
  return rows[0]; 
};


export const updateUser = async (id, name, email, password, role, age) => {
  await db.execute(queries.updateUser, [name, email, password, role, age, id]);
};


export const deleteUser = async (id) => {
  await db.execute(queries.deleteUser, [id]);
};
