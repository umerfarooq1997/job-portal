import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { jobService } from "../services/job.service.js";

export const jobController = {
  create: asyncHandler(async (req, res) => {
    if (!req.user) throw new UnauthorizedError("Authentication required");

    const jobObject = { ...req.body, createdBy: req.user.id };
    const job = await jobService.create(jobObject);

    return res.status(201).json({
      success: true,
      data: job,
    });
  }),
  findAll: asyncHandler(async (req, res) => {
    const jobs = await jobService.findAll();

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  }),
  findById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const job = await jobService.findById(String(id));

    return res.status(200).json({
      success: true,
      data: job,
    });
  }),
};
