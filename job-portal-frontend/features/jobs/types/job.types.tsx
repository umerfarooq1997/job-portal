export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "freelance";

export type JobStatus = "active" | "closed";

export interface Job {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  employmentType: EmploymentType;
  status: JobStatus;
  createdBy: string;
}

export interface CreateJobData {
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  employmentType: EmploymentType;
  status: JobStatus;
}

export interface JobsResponse {
  success: boolean;
  data: Job[];
}

export interface JobResponse {
  success: boolean;
  data: Job;
}
