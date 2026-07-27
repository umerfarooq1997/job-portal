import { User } from "../models/user.modal.js";

export const createUser = async (userData: any) => {
  return await User.create(userData);
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
