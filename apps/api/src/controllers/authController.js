import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { env } from '../config/env.js';

const signToken = (user) =>
  jwt.sign({ userId: user._id, role: user.role, restaurantId: user.restaurantId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  return res.json({ token: signToken(user), user });
};
