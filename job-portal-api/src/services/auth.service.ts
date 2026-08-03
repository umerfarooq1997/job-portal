import bcrypt from "bcrypt";
import { BadRequestError } from "../errors/BadRequestError.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { userRepository } from "../repositories/user.repositories.js";
import { generateToken } from "../utils/jwt.js";

export const authService = {
  async signup(userData: any) {
    const existingUser = await userRepository.findByEmail(userData.email);

    // If user Exist
    if (existingUser) {
      throw new BadRequestError("An account with this email already exists");
    }

    // Hashing Password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const userToCreate = {
      ...userData,
      password: hashedPassword,
    };

    // Create User
    return userRepository.create(userToCreate);
  },

  async login(userEmail: string, password: string) {
    const user = await userRepository.findByEmail(userEmail);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const { id, firstName, lastName, email, createdAt, role } = user;

    const token = generateToken({ id, role });

    return {
      user: {
        id,
        firstName,
        lastName,
        email,
        createdAt,
      },
      token,
    };
  },
};
