import { jobRepository } from "../repositories/job.repositories.js";
import { IJob } from "../models/job.model.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export const jobService = {
  async create(jobData: IJob) {
    return jobRepository.create(jobData);
  },
  async findAll() {
    return jobRepository.findAll();
  },
  async findById(id: string) {
    const job = await jobRepository.findById(id);

    if (!job) {
      throw new NotFoundError("Job not found!");
    }

    return job;
  },
};
