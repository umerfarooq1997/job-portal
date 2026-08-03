import { User } from "../models/user.model.js";

interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const userRepository = {
  async create(userData: CreateUserData) {
    return User.create(userData);
  },
  async findByEmail(email: string) {
    return User.findOne({ email });
  },
};
