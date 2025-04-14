import db from '../config/db.js';
import queries from '../config/queries.js';

// Add a new product
export const addProduct = async (name, description, price, sellerId) => {
  await db.execute(queries.addProduct, [name, description, price, sellerId]);
};

// Get all products
export const getAllProducts = async () => {
  const [rows] = await db.execute(queries.getAllProducts);
  return rows;
};

// Get product by ID
export const getProductById = async (id) => {
  const [rows] = await db.execute(queries.getProductById, [id]);
  return rows[0];
};

// Update product
export const updateProduct = async (id, name, description, price) => {
  await db.execute(queries.updateProduct, [name, description, price, id]);
};

// Delete product
export const deleteProduct = async (id) => {
  await db.execute(queries.deleteProduct, [id]);
};
