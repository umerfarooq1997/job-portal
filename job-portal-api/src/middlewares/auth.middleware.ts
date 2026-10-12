import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { verifyToken } from "../utils/jwt.js";
import { asyncHandler } from "./asyncHandler.js";
import { userRepository } from "../repositories/user.repositories.js";

export const authMiddleware = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new UnauthorizedError("Authentication required");
    }

    const payload = verifyToken(token);

    const user = await userRepository.findById(payload.id);

    if (!user) {
      throw new UnauthorizedError("User not found!");
    }

    const authenticatedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };

    req.user = authenticatedUser;
    next();
  },
);
