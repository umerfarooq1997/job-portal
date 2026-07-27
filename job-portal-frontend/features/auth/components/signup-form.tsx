"use client";

import { useForm } from "react-hook-form";
import { signupSchema, type SignupFormData } from "../schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input-field";

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

  const onSubmit = (data: SignupFormData) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-75 grid gap-3">
      {/* First Name */}
      <Input placeholder="First Name" {...register("firstName")} />

      {errors.firstName && (
        <p className="text-sm text-red-500">{errors.firstName.message}</p>
      )}

      {/* Last Name */}
      <Input placeholder="Last Name" {...register("lastName")} />

      {errors.lastName && (
        <p className="text-sm text-red-500">{errors.lastName.message}</p>
      )}

      {/* Email */}
      <Input type="email" placeholder="Enter Email" {...register("email")} />

      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}

      {/* Password */}
      <Input
        type="password"
        placeholder="Enter Password"
        {...register("password")}
      />

      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}

      {/* Submit Button */}
    </form>
  );
};

export default SignupForm;
