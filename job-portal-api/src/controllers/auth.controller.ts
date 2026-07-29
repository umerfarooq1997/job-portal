import { Request, Response } from "express";
import { signupUser } from "../services/auth.service.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await signupUser(req.body);

    return res.status(201).json({
      message: "Register API Working",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
