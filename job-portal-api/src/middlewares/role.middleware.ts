import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors/ForbiddenError.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

type UserRole = "candidate" | "employee" | "admin";

export const requireRole = (...requiredRole: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("Authentication required");
    }

    const checkRole = requiredRole.includes(req.user.role);

    if (!checkRole) {
      throw new ForbiddenError("Permission Denied!");
    }

    next();
  };
};
