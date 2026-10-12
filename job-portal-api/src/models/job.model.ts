import mongoose from "mongoose";

export interface IJob {
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  employmentType:
    | "full-time"
    | "part-time"
    | "contract"
    | "internship"
    | "freelance";
  status: "active" | "closed";
  createdBy: mongoose.Types.ObjectId;
}

const jobSchema = new mongoose.Schema<IJob>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "freelance"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Job = mongoose.model<IJob>("Job", jobSchema);
