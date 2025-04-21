import db from '../config/db.js';
import queries from '../config/queries.js';


export const addToCart = async (customerId, productId, quantity) => {
  await db.execute(queries.addToCart, [customerId, productId, quantity]);
};


export const removeFromCart = async (customerId, productId) => {
  await db.execute(queries.removeFromCart, [customerId, productId]);
};

export const getCartByCustomerId = async (customerId) => {
  const [rows] = await db.execute(queries.getCartByCustomerId, [customerId]);
  return rows;
};


export const updateCartQuantity = async (customerId, productId, quantity) => {
  await db.execute(queries.updateCartQuantity, [quantity, customerId, productId]);
};
