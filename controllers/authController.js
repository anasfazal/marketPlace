import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../models/userModel.js';
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HTTP_STATUS_CODES.BadRequest).json({ message: 'Email and password are required' });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(HTTP_STATUS_CODES.Unauthorized).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(HTTP_STATUS_CODES.Unauthorized).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(HTTP_STATUS_CODES.OK).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(HTTP_STATUS_CODES.InternalServerError).json({ message: 'Something went wrong' });
  }
};
