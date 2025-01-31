import UserRepository from '../dao/repositories/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserServices {
  async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    return UserRepository.createUser(userData);
  }

  async authenticate(email, password) {
    const user = await UserRepository.getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
      return token;
    }
    throw new Error('Invalid credentials');
  }
}

export default new UserServices();
