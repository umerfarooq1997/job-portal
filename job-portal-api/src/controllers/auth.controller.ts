import { authService } from "../services/auth.service.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

export const authController = {
  signup: asyncHandler(async (req, res) => {
    const user = await authService.signup(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      data: user,
    });
  }),
  login: asyncHandler(async (req, res) => {
    console.log(req)
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // We'll improve this later
    });

    return res.status(201).json({
      message: "Login successfully",
      success: true,
      data: user,
    });
  }),
};
