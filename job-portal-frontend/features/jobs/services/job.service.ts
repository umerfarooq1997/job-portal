import { api } from "@/services/api";
import { CreateJobData } from "../types/job.types";

export const jobsService = {
  create(data: CreateJobData) {
    return api.post("/jobs", data);
  },
  findAll() {
    return api.get("/jobs");
  },
  findById(id: string) {
    return api.get(`/jobs/${id}`);
  },
};
