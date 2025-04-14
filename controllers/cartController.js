import { addToCart, removeFromCart, getCartByCustomerId, updateCartQuantity } from '../models/cartModel.js';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

// Add product to cart (Customer only)
export const addProductToCart = async (req, res) => {
  const customerId = req.user.id;  // Get customerId from token
  const { productId, quantity } = req.body;

  await addToCart(customerId, productId, quantity);
  res.status(HTTP_STATUS_CODES.Created).json({ message: 'Product added to cart successfully' });
};

// Remove product from cart (Customer only)
export const removeProductFromCart = async (req, res) => {
  const customerId = req.user.id;  // Get customerId from token
  const { productId } = req.params;

  await removeFromCart(customerId, productId);
  res.status(HTTP_STATUS_CODES.OK).json({ message: 'Product removed from cart successfully' });
};

// Get cart items by customer ID
export const getCartItems = async (req, res) => {
  const customerId = req.user.id;  // Get customerId from token

  const cartItems = await getCartByCustomerId(customerId);
  if (cartItems.length === 0) {
    return res.status(HTTP_STATUS_CODES.NotFound).json({ message: 'No items in cart' });
  }

  res.status(HTTP_STATUS_CODES.OK).json(cartItems);
};

// Update cart item quantity (Customer only)
export const updateCartItemQuantity = async (req, res) => {
  const customerId = req.user.id;  // Get customerId from token
  const { productId } = req.params;
  const { quantity } = req.body;

  await updateCartQuantity(customerId, productId, quantity);
  res.status(HTTP_STATUS_CODES.OK).json({ message: 'Cart item quantity updated successfully' });
};
