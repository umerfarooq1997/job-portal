import { Router } from "express";
import { jobController } from "../controllers/job.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requireRole("employee", "admin"),
  jobController.create,
);

router.get("/", jobController.findAll);
router.get("/:id", jobController.findById);

export default router;
