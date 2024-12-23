import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const createUser = async (userData) => {
  const hashedPassword = bcrypt.hashSync(userData.password, 10);
  const user = new User({ ...userData, password: hashedPassword });
  return await user.save();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
