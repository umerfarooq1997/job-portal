import { Job, type IJob } from "../models/job.model.js";

export const jobRepository = {
  async create(jobData: IJob) {
    return Job.create(jobData);
  },
  async findAll() {
    return Job.find();
  },
  async findById(id: string) {
    return Job.findById(id);
  },
};
