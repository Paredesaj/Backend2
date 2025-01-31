import User from '../models/User.model';

class UserRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }
}

export default new UserRepository();
