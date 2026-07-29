import { api } from "@/services/api";
import type { SignupFormData } from "../schemas/signup.schema";

export const authService = {
  signup(data: SignupFormData) {
    return api.post("/auth/signup", data);
  },
};
