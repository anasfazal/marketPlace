import bcrypt from 'bcrypt';
import {
  insertUser,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
} from '../models/userModel.js';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, age } = req.body;

    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res
        .status(HTTP_STATUS_CODES.Conflict)
        .json({ message: 'User already exists' });
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await insertUser(name, email, hashedPassword, role, age);
    res
      .status(HTTP_STATUS_CODES.Created)
      .json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register error:', error.message);
    res
      .status(HTTP_STATUS_CODES.InternalServerError)
      .json({ message: 'Server error' });
  }
};

// Get user by ID
export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);

    if (!user) {
      return res
        .status(HTTP_STATUS_CODES.NotFound)
        .json({ message: 'User not found' });
    }

    res.status(HTTP_STATUS_CODES.OK).json(user);
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.InternalServerError)
      .json({ message: 'Server error' });
  }
};

// Update user
export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password, role, age } = req.body;

    // ✅ Hash updated password
    const hashedPassword = await bcrypt.hash(password, 10);

    await updateUser(userId, name, email, hashedPassword, role, age);
    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: 'User details updated successfully' });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.InternalServerError)
      .json({ message: 'Server error' });
  }
};

// Delete user
export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUser(userId);
    res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: 'User deleted successfully' });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODES.InternalServerError)
      .json({ message: 'Server error' });
  }
};
