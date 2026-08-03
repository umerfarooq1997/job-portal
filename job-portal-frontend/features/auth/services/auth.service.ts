import { api } from "@/services/api";
import type { SignupFormData } from "../schemas/signup.schema";
import { LoginFormData } from "../schemas/login.schema";

export const authService = {
  signup(data: SignupFormData) {
    return api.post("/auth/signup", data);
  },
  login(data: LoginFormData) {
    return api.post("/auth/login", data);
  },
};
