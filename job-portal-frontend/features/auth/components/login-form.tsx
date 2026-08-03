"use client";

import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input-field";
import { authService } from "../services/auth.service";
import { toast } from "sonner";
import Button from "@/components/ui/button";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.login(data);

      if (response.success) {
        toast.success(response.message);
        // We will save token and user data here to use in our dashboard
      } else toast.error(response.message);
    } catch (error: unknown) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-75 grid gap-3">
        <div>
          {/* Email */}
          <Input
            type="email"
            placeholder="Enter Email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-xs mt-1 text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          {/* Password */}
          <Input
            type="password"
            placeholder="Enter Password"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-xs mt-1 text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
