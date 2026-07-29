import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repositories.js";

export const signupUser = async (userData: any) => {
  const existingUser = await findUserByEmail(userData.email);

  // If user Exist
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create User
  const user = createUser(userData);
  return user;
};
