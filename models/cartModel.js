import db from '../config/db.js';
import queries from '../config/queries.js';

// Add an item to the cart
export const addToCart = async (customerId, productId, quantity) => {
  await db.execute(queries.addToCart, [customerId, productId, quantity]);
};

// Remove an item from the cart
export const removeFromCart = async (customerId, productId) => {
  await db.execute(queries.removeFromCart, [customerId, productId]);
};

// Get the cart by customer ID
export const getCartByCustomerId = async (customerId) => {
  const [rows] = await db.execute(queries.getCartByCustomerId, [customerId]);
  return rows;
};

// Update the quantity of an item in the cart
export const updateCartQuantity = async (customerId, productId, quantity) => {
  await db.execute(queries.updateCartQuantity, [quantity, customerId, productId]);
};
