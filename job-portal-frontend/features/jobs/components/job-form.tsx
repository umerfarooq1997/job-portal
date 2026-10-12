"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema, type JobFormData } from "../schemas/job.schema";
import Input from "@/components/ui/input-field";
import Button from "@/components/ui/button";

const JobForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      company: "",
      location: "",
      salary: 0,
      employmentType: "full-time",
      status: "active",
    },
  });

  const onSubmit = async (data: JobFormData) => {
    console.log("Job form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 max-w-xl">
      {/* Title */}
      <div>
        <Input
          placeholder="Job title"
          {...register("title")}
        />

        {errors.title && (
          <p className="text-xs mt-1 text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <textarea
          placeholder="Job description"
          {...register("description")}
          className="min-h-32 w-full rounded-md border px-3 py-2 text-sm"
        />

        {errors.description && (
          <p className="text-xs mt-1 text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Company */}
      <div>
        <Input
          placeholder="Company"
          {...register("company")}
        />

        {errors.company && (
          <p className="text-xs mt-1 text-red-500">
            {errors.company.message}
          </p>
        )}
      </div>

      {/* Location */}
      <div>
        <Input
          placeholder="Location"
          {...register("location")}
        />

        {errors.location && (
          <p className="text-xs mt-1 text-red-500">
            {errors.location.message}
          </p>
        )}
      </div>

      {/* Salary */}
      <div>
        <Input
          type="number"
          placeholder="Salary"
          {...register("salary", {
            valueAsNumber: true,
          })}
        />

        {errors.salary && (
          <p className="text-xs mt-1 text-red-500">
            {errors.salary.message}
          </p>
        )}
      </div>

      {/* Employment Type */}
      <div>
        <select
          {...register("employmentType")}
          className="h-10 w-full rounded-md border px-3 text-sm"
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
          <option value="freelance">Freelance</option>
        </select>

        {errors.employmentType && (
          <p className="text-xs mt-1 text-red-500">
            {errors.employmentType.message}
          </p>
        )}
      </div>

      {/* Status */}
      <div>
        <select
          {...register("status")}
          className="h-10 w-full rounded-md border px-3 text-sm"
        >
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>

        {errors.status && (
          <p className="text-xs mt-1 text-red-500">
            {errors.status.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Job"}
      </Button>
    </form>
  );
};

export default JobForm;