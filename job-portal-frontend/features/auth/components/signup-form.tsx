"use client";

import { useForm } from "react-hook-form";
import { signupSchema, type SignupFormData } from "../schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input-field";
import Button from "@/components/ui/button";
import { authService } from "../services/auth.service";
import { toast } from "sonner";

const SignupForm = () => {
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await authService.signup(data);

      if (response?.success) toast.success(response?.message);
      else toast.error(response?.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-75 grid gap-3">
      <div>
        {/* First Name */}
        <Input placeholder="First Name" {...register("firstName")} />

        {errors.firstName && (
          <p className="text-xs mt-1 text-red-500">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        {/* Last Name */}
        <Input placeholder="Last Name" {...register("lastName")} />

        {errors.lastName && (
          <p className="text-xs mt-1 text-red-500">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        {/* Email */}
        <Input type="email" placeholder="Enter Email" {...register("email")} />

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
          <p className="text-xs mt-1 text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default SignupForm;
