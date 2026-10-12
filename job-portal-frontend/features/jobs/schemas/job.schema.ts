import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.number().min(0, "Salary cannot be negative"),
  employmentType: z.enum([
    "full-time",
    "part-time",
    "contract",
    "internship",
    "freelance",
  ]),
  status: z.enum(["active", "closed"]),
});

export type JobFormData = z.infer<typeof jobSchema>;
