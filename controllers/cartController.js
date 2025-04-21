import { addToCart, removeFromCart, getCartByCustomerId, updateCartQuantity } from '../models/cartModel.js';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

export const addProductToCart = async (req, res) => {
  const customerId = req.user.id; 
  const { productId, quantity } = req.body;

  await addToCart(customerId, productId, quantity);
  res.status(HTTP_STATUS_CODES.Created).json({ message: 'Product added to cart successfully' });
};

export const removeProductFromCart = async (req, res) => {
  const customerId = req.user.id; 
  const { productId } = req.params;

  await removeFromCart(customerId, productId);
  res.status(HTTP_STATUS_CODES.OK).json({ message: 'Product removed from cart successfully' });
};

export const getCartItems = async (req, res) => {
  const customerId = req.user.id;  

  const cartItems = await getCartByCustomerId(customerId);
  if (cartItems.length === 0) {
    return res.status(HTTP_STATUS_CODES.NotFound).json({ message: 'No items in cart' });
  }

  res.status(HTTP_STATUS_CODES.OK).json(cartItems);
};


export const updateCartItemQuantity = async (req, res) => {
  const customerId = req.user.id; 
  const { productId } = req.params;
  const { quantity } = req.body;

  await updateCartQuantity(customerId, productId, quantity);
  res.status(HTTP_STATUS_CODES.OK).json({ message: 'Cart item quantity updated successfully' });
};
